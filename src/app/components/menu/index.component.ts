import { Component, Input, OnInit } from '@angular/core';
import { RouterEvent, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Menu, StringService } from 'karikarihelper';

// Animations
import { BasicAnimations } from '@animations';

// Services
import { LanguageService } from '@services';

@Component({
	selector: 'app-menu',
	templateUrl: './index.component.html',
	animations: [
		BasicAnimations.fadeAnimation,
		BasicAnimations.rotateCounterClock180Animation,
		BasicAnimations.verticalShrinkAnimation,
	],
})
export class MenuComponent implements OnInit {
	@Input()
	public data: Menu[] = [];
	@Input()
	public depth = 0;
	@Input()
	public callback: (() => void) | undefined;

	/**
	 * In House
	 */
	public languageSource = LanguageService.DEFAULT_LANGUAGE;

	/**
	 * Animation
	 */
	private _activeNodes: Set<string> = new Set();
	private _result: string[] = [];

	private _currentRoute = '-';

	constructor(private _languageService: LanguageService, private _router: Router) {}

	ngOnInit(): void {
		const rasterizedWindowURL = StringService.removeLeadingAndTrailingSlashes(this._router.url);

		if (StringService.hasValue(rasterizedWindowURL)) {
			this._currentRoute = rasterizedWindowURL as string;

			this._result = [];
			this._updateMenuActiveItems();
		}

		this._languageService.language.subscribe({
			next: (nextLanguage) => {
				this.languageSource = nextLanguage;
			},
		});
		this._router.events
			.pipe(filter((e): e is RouterEvent => e instanceof RouterEvent))
			.subscribe({
				next: (e) => {
					const rasterizedEventURL = StringService.removeLeadingAndTrailingSlashes(e.url);

					if (
						StringService.hasValue(rasterizedEventURL) &&
						this._currentRoute !== rasterizedEventURL
					) {
						this._currentRoute = rasterizedEventURL as string;

						this._result = [];
						this._updateMenuActiveItems();
					}
				},
			});
	}

	public isActive(node: Menu) {
		return this._activeNodes.has(node._id) ? true : false;
	}

	public isDisabled(node: Menu) {
		return this.isExpandable(node) === false && node.route === null;
	}

	public isExpandable(node: Menu) {
		return !!node.children && node.children.length > 0;
	}

	public onClick(node: Menu) {
		if (!node.children || node.children.length === 0) {
			if (node.route !== null) {
				this._router
					.navigate(['/' + node.route])
					.then((response) => {
						if (!response) {
							return;
						}

						if (this.callback) {
							this.callback();
						}
					})
					.catch(() => {
						this._router.navigate(['/']);
					});
			}

			return;
		}

		if (this.isActive(node)) {
			this._activeNodes.delete(node._id);

			return;
		}

		this._activeNodes.add(node._id);
	}

	private _updateMenuActiveItems(tree: Menu[] = this.data) {
		for (let i = 0; i < tree.length; i++) {
			const node = tree[i];

			if (node.route === this._currentRoute) {
				this._result.push(node._id);

				this._activeNodes.clear();

				this._result.forEach((nodeId) => {
					this._activeNodes.add(nodeId);
				});

				break;
			}

			const isLeaf = !node.children || node.children.length === 0;

			if (isLeaf) {
				const isLastSibling = i === tree.length - 1;

				if (isLastSibling) {
					this._result = this._result.slice(0, -1);
				}

				continue;
			}

			this._result.push(node._id);

			this._updateMenuActiveItems(node.children);
		}
	}
}
