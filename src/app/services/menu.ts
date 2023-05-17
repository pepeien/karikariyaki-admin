import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Menu } from 'karikarihelper';

// Services
import { ApiService } from '@services';

@Injectable({ providedIn: 'root' })
export class MenuService {
	/**
	 * Primitives
	 */
	private _isFetching = false;

	/**
	 * In House
	 */
	private _menu: Menu[];
	private _menuSubject: ReplaySubject<Menu[]>;
	private _menuObersavable: Observable<Menu[]>;

	constructor(private _apiService: ApiService) {
		this._menu = [];

		this._menuSubject = new ReplaySubject<Menu[]>();
		this._menuObersavable = this._menuSubject.asObservable();
	}

	public get menu() {
		return this._menuObersavable;
	}

	public update() {
		if (this._isFetching === false) {
			this._isFetching = true;

			this._apiService.V1.menuRegistry
				.search({ realm: 'INSIDE', isRootOnly: true })
				.subscribe({
					next: (response) => {
						this._menu = response.result ?? [];

						this._isFetching = false;

						this._menuSubject.next(this._menu);
					},
					error: () => {
						this._menu = [];

						this._isFetching = false;

						this._menuSubject.next(this._menu);
					},
				});
		}
	}
}
