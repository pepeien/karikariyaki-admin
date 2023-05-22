import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Realm } from 'karikarihelper';

// Animations
import { BasicAnimations } from '@animations';

// Services
import { ApiService, LanguageService } from '@services';

// Components
import { DialogComponent } from '@components';

@Component({
	selector: 'app-registry-operator-view',
	templateUrl: './index.component.html',
	animations: [
		BasicAnimations.horizontalShrinkAnimation,
		trigger('fade', [
			transition(':enter', [
				style({ opacity: 0, flex: 0 }),
				animate('0.5s ease-out', style({ opacity: 1, flex: 1 })),
			]),
			transition(':leave', [
				style({ opacity: 1, flex: 1 }),
				animate('0.3s ease-in', style({ opacity: 0, flex: 0 })),
			]),
		]),
	],
})
export class RegistryRealmViewComponent implements OnInit {
	/**
	 * Table
	 */
	public dataList: Realm[] = [];

	/**
	 * Editor
	 */
	public isEditorOpen = false;
	public editorType: 'creation' | 'edition' = 'edition';
	public deletionTarget: Realm | undefined;
	public editionTarget: Realm | undefined;

	/**
	 * Language
	 */
	public languageSource = LanguageService.DEFAULT_LANGUAGE;

	/**
	 * Forms
	 */
	public creationFormGroup = new FormGroup({
		name: new FormControl('', [Validators.required]),
	});
	public editionFormGroup = new FormGroup({
		name: new FormControl('', [Validators.required]),
	});

	constructor(
		private _apiService: ApiService,
		private _dialog: MatDialog,
		private _languageService: LanguageService,
	) {}

	ngOnInit(): void {
		this._refreshList();

		this._languageService.language.subscribe({
			next: (nextLanguage) => {
				this.languageSource = nextLanguage;
			},
		});
	}

	public isEditionTargetTheSame() {
		if (!this.editionTarget || !this.editionTarget._id) {
			return false;
		}

		return this.editionFormGroup.controls.name.value?.trim() === this.editionTarget.name.trim();
	}

	public onCreationInit() {
		this.onCancel();

		this.isEditorOpen = true;
		this.editorType = 'creation';
	}

	public onCreation() {
		const name = this.creationFormGroup.controls.name.value as string;

		if (this.creationFormGroup.invalid || !name) {
			return;
		}

		this._apiService.V1.realmRegistry
			.save({
				name: name,
			})
			.subscribe({
				next: () => {
					this._onSuccessfulResponse();
				},
			});
	}

	public onEditionInit(item: Realm) {
		this.onCancel();

		this.isEditorOpen = true;
		this.editorType = 'edition';

		this.editionFormGroup.controls.name.setValue(item.name);

		this.editionTarget = item;
	}

	public onEdition() {
		if (this.editionFormGroup.invalid || !this.editionTarget || !this.editionTarget._id) {
			return;
		}

		const nextName = this.editionFormGroup.controls.name.value as string;

		this._apiService.V1.realmRegistry
			.edit(this.editionTarget._id, {
				name: this.editionTarget.name !== nextName ? nextName : undefined,
			})
			.subscribe({
				next: () => {
					this._onSuccessfulResponse();
				},
			});
	}

	public onCancel() {
		this.isEditorOpen = false;
		this.editorType = 'creation';

		this.editionTarget = undefined;

		this.creationFormGroup.reset();
		this.editionFormGroup.reset();
	}

	public onDeleteInit(item: Realm) {
		if (!item || !item._id) {
			return;
		}

		const dialogRef = this._dialog.open(DialogComponent, {
			data: {
				message: this.languageSource['OPERATOR_REGISTRY_DELETE_MESSAGE'],
			},
		});

		dialogRef.afterClosed().subscribe({
			next: (willDelete) => {
				if (willDelete === false) {
					return;
				}

				this.deletionTarget = item;

				this.onDelete();
			},
		});
	}

	public onDelete() {
		if (!this.deletionTarget || !this.deletionTarget._id) {
			return;
		}

		this._apiService.V1.realmRegistry.delete(this.deletionTarget._id).subscribe({
			next: () => {
				this._onSuccessfulResponse();
			},
		});
	}

	private _onSuccessfulResponse() {
		this._refreshList();

		this.onCancel();
	}

	private _refreshList() {
		this._apiService.V1.realmRegistry.search().subscribe({
			next: (response) => {
				if (!response.result) {
					return;
				}

				this.dataList = response.result;
			},
		});
	}
}
