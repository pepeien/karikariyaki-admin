import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Menu, FileService } from 'karikarihelper';

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
export class RegistryMenuViewComponent implements OnInit {
	/**
	 * Table
	 */
	public dataList: Menu[] = [];

	/**
	 * Editor
	 */
	public isEditorOpen = false;
	public editorType: 'creation' | 'edition' = 'edition';
	public deletionTarget: Menu | undefined;
	public editionTarget: Menu | undefined;
	public selectedPhotoBase64: string | undefined;

	/**
	 * Language
	 */
	public languageSource = LanguageService.DEFAULT_LANGUAGE;

	/**
	 * Forms
	 */
	public creationFormGroup = new FormGroup({
		realm: new FormControl('', [Validators.required]),
		title: new FormControl('', [Validators.required]),
		route: new FormControl(''),
		parent: new FormControl(''),
	});
	public editionFormGroup = new FormGroup({
		realm: new FormControl('', [Validators.required]),
		title: new FormControl('', [Validators.required]),
		route: new FormControl(''),
	});

	/**
	 * In House
	 */
	public availableRealms: string[] = [];
	public availableMenus: Menu[] = [];

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

	public displayMenuAutocomplete(menu: Menu) {
		if (!menu) {
			return '';
		}

		return menu.title;
	}

	public onCreationInit() {
		this.onCancel();

		this._updateAvailableRealms();
		this._updateAvailableMenus();

		this.isEditorOpen = true;
		this.editorType = 'creation';

		this.editionTarget = undefined;
	}

	public onCreation() {
		if (this.creationFormGroup.invalid) {
			return;
		}

		const realm = this.creationFormGroup.controls.realm.value as string;
		const title = this.creationFormGroup.controls.title.value as string;
		const route = this.creationFormGroup.controls.route.value as string;
		const parentId = this.creationFormGroup.controls.parent.value as string;

		this._apiService.V1.menuRegistry
			.save({
				realm: realm ?? undefined,
				title: title ?? undefined,
				icon: this.selectedPhotoBase64 ?? undefined,
				route: route ?? undefined,
				parentId: parentId ?? undefined,
			})
			.subscribe({
				next: () => {
					this._onSuccessfulResponse();
				},
			});
	}

	public onEditionInit(item: Menu) {
		this.onCancel();

		this._updateAvailableRealms();

		this.isEditorOpen = true;
		this.editorType = 'edition';

		this.editionFormGroup.controls.realm.setValue(item.realm);
		this.editionFormGroup.controls.title.setValue(item.title);
		this.editionFormGroup.controls.route.setValue(item.route);

		this.editionTarget = item;
		this.selectedPhotoBase64 = item.icon;
	}

	public onEdition() {
		if (this.editionFormGroup.invalid || !this.editionTarget || !this.editionTarget._id) {
			return;
		}

		const realm = this.editionFormGroup.controls.realm.value ?? undefined;
		const title = this.editionFormGroup.controls.title.value ?? undefined;
		const route = this.editionFormGroup.controls.route.value ?? undefined;

		this._apiService.V1.menuRegistry
			.edit(this.editionTarget._id, {
				realm: this.editionTarget.realm !== realm ? realm : undefined,
				title: this.editionTarget.title !== title ? title : undefined,
				icon: this.selectedPhotoBase64,
				route: this.editionTarget.route !== route ? route : undefined,
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
		this.selectedPhotoBase64 = undefined;

		this.creationFormGroup.reset();
		this.editionFormGroup.reset();
	}

	public onDeleteInit(item: Menu) {
		if (!item || !item._id) {
			return;
		}

		const dialogRef = this._dialog.open(DialogComponent, {
			data: {
				message: this.languageSource['MENU_REGISTRY_DELETE_MESSAGE'],
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

		this._apiService.V1.menuRegistry.delete(this.deletionTarget._id).subscribe({
			next: () => {
				this._onSuccessfulResponse();
			},
		});
	}

	public onFileUpload(files: File[]) {
		if (files.length === 0) {
			return;
		}

		FileService.toBase64(files[0]).then((base64) => {
			if (!base64 || typeof base64 === 'object') {
				this.selectedPhotoBase64 = undefined;

				return;
			}

			this.selectedPhotoBase64 = base64;
		});
	}

	private _onSuccessfulResponse() {
		this._refreshList();

		this.onCancel();
	}

	private _refreshList() {
		this._apiService.V1.menuRegistry.search().subscribe({
			next: (response) => {
				if (!response.result) {
					return;
				}

				this.dataList = response.result;
			},
		});
	}

	private _updateAvailableRealms() {
		this._apiService.V1.menuRegistry.realms().subscribe({
			next: (response) => {
				if (response.wasSuccessful === false || !response.result) {
					return;
				}

				this.availableRealms = response.result;
			},
		});
	}

	private _updateAvailableMenus() {
		this._apiService.V1.menuRegistry.search().subscribe({
			next: (response) => {
				if (response.wasSuccessful === false || !response.result) {
					return;
				}

				this.availableMenus = response.result;
			},
		});
	}
}
