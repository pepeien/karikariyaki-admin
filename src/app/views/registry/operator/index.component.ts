import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FileService, Operator } from 'karikarihelper';

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
export class RegistryOperatorViewComponent implements OnInit {
	/**
	 * Table
	 */
	public dataList: Operator[] = [];

	/**
	 * Editor
	 */
	public isEditorOpen = false;
	public editorType: 'creation' | 'edition' = 'edition';
	public deletionTarget: Operator | undefined;
	public editionTarget: Operator | undefined;
	public selectedPhotoBase64: string | undefined;

	/**
	 * Language
	 */
	public languageSource = LanguageService.DEFAULT_LANGUAGE;

	/**
	 * Forms
	 */
	public creationFormGroup = new FormGroup({
		displayName: new FormControl('', [Validators.required]),
		userName: new FormControl('', [Validators.required]),
	});
	public editionFormGroup = new FormGroup({
		displayName: new FormControl('', [Validators.required]),
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

		return (
			this.editionFormGroup.controls.displayName.value?.trim() ===
				this.editionTarget.displayName.trim() &&
			this.selectedPhotoBase64 === this.editionTarget.photo
		);
	}

	public onCreationInit() {
		this.onCancel();

		this.isEditorOpen = true;
		this.editorType = 'creation';
	}

	public onCreation() {
		if (this.creationFormGroup.invalid || !this.selectedPhotoBase64) {
			return;
		}

		this._apiService.V1.operatorRegistry
			.save({
				userName: this.creationFormGroup.controls.userName.value as string,
				displayName: this.creationFormGroup.controls.displayName.value as string,
				photo: this.selectedPhotoBase64,
			})
			.subscribe({
				next: () => {
					this._onSuccessfulResponse();
				},
			});
	}

	public onEditionInit(item: Operator) {
		this.onCancel();

		this.isEditorOpen = true;
		this.editorType = 'edition';

		this.editionFormGroup.controls.displayName.setValue(item.displayName);

		this.selectedPhotoBase64 = item.photo;

		this.editionTarget = item;
	}

	public onEdition() {
		if (this.editionFormGroup.invalid || !this.editionTarget || !this.editionTarget._id) {
			return;
		}

		const nextDisplayName = this.editionFormGroup.controls.displayName.value as string;

		this._apiService.V1.operatorRegistry
			.edit(this.editionTarget._id, {
				displayName:
					this.editionTarget.displayName !== nextDisplayName
						? nextDisplayName
						: undefined,
				photo:
					this.editionTarget.photo !== this.selectedPhotoBase64
						? this.selectedPhotoBase64
						: undefined,
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

	public onDeleteInit(item: Operator) {
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

		this._apiService.V1.operatorRegistry.delete(this.deletionTarget._id).subscribe({
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
		this._apiService.V1.operatorRegistry.search().subscribe({
			next: (response) => {
				if (!response.result) {
					return;
				}

				this.dataList = response.result;
			},
		});
	}
}
