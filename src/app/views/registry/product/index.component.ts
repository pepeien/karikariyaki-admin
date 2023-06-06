import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Product, Realm } from 'karikarihelper';

// Animations
import { BasicAnimations } from '@animations';

// Services
import { ApiService, LanguageService } from '@services';

// Components
import { DialogComponent } from '@components';

@Component({
	selector: 'app-registry-product-view',
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
export class RegistryProductViewComponent implements OnInit {
	/**
	 * Table
	 */
	public dataList: Product[] = [];

	/**
	 * Editor
	 */
	public isEditorOpen = false;
	public editorType: 'creation' | 'edition' = 'edition';
	public deletionTarget: Product | undefined;
	public editionTarget: Product | undefined;
	public availableRealms: Realm[] = [];
	public selectedRealm: Realm | null = null;
	public availableProducts: Product[] = [];
	public selectedProduct: Product | null = null;

	/**
	 * Language
	 */
	public languageSource = LanguageService.DEFAULT_LANGUAGE;

	/**
	 * Forms
	 */
	public creationFormGroup = new FormGroup({
		name: new FormControl('', [Validators.required]),
		realm: new FormControl({ value: '', disabled: true }, [Validators.required]),
		parent: new FormControl({ value: '', disabled: true }),
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

	public displayRealmAutocomplete(realm: Realm) {
		if (!realm) {
			return '';
		}

		return realm.name;
	}

	public displayProductAutocomplete(product: Product) {
		if (!product) {
			return '';
		}

		return product.name;
	}

	public onCreationInit() {
		this.onCancel();

		this._updateAvailableRealms();
		this._updateAvailableProducts();

		this.isEditorOpen = true;
		this.editorType = 'creation';
	}

	public onCreation() {
		if (this.creationFormGroup.invalid || !this.selectedRealm) {
			return;
		}

		const realm = this.selectedRealm;
		const parent = this.selectedProduct;

		this._apiService.V1.productRegistry
			.save({
				name: this.creationFormGroup.controls.name.value as string,
				realmId: realm._id,
				parentId: parent ? parent._id : undefined,
			})
			.subscribe({
				next: () => {
					this._onSuccessfulResponse();
				},
			});
	}

	public onEditionInit(item: Product) {
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

		this._apiService.V1.productRegistry
			.edit(this.editionTarget._id, {
				name: this.editionFormGroup.controls.name.value as string,
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

		this.selectedProduct = null;
		this.selectedProduct = null;

		this.creationFormGroup.reset();
		this.editionFormGroup.reset();
	}

	public onDeleteInit(item: Product) {
		if (!item || !item._id) {
			return;
		}

		const dialogRef = this._dialog.open(DialogComponent, {
			data: {
				message: this.languageSource['PRODUCT_REGISTRY_DELETE_MESSAGE'],
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

		this._apiService.V1.productRegistry.delete(this.deletionTarget._id).subscribe({
			next: () => {
				this._onSuccessfulResponse();
			},
		});
	}

	public onRealmSelection(selectedRealms: Realm[]) {
		if (selectedRealms.length === 0) {
			this.selectedRealm = null;

			return;
		}

		this.selectedRealm = selectedRealms[0];
	}

	public onProductSelection(selectedProducts: Product[]) {
		if (selectedProducts.length === 0) {
			this.selectedRealm = null;

			return;
		}

		this.selectedProduct = selectedProducts[0];
	}

	public isCreationInvalid() {
		return this.creationFormGroup.invalid || !this.selectedRealm;
	}

	public isEditInvalid() {
		return this.editionFormGroup.invalid;
	}

	private _onSuccessfulResponse() {
		this._refreshList();

		this.onCancel();
	}

	private _refreshList() {
		this._apiService.V1.productRegistry.search().subscribe({
			next: (response) => {
				if (!response.result) {
					return;
				}

				this.dataList = response.result;
			},
		});
	}

	private _updateAvailableRealms() {
		this._apiService.V1.realmRegistry.search().subscribe({
			next: (response) => {
				if (response.wasSuccessful === false || !response.result) {
					this.availableRealms = [];

					return;
				}

				this.availableRealms = response.result;
			},
		});
	}

	private _updateAvailableProducts() {
		this._apiService.V1.productRegistry.search().subscribe({
			next: (response) => {
				if (response.wasSuccessful === false || !response.result) {
					this.availableRealms = [];

					return;
				}

				this.availableProducts = response.result.filter((product) => !product.parent);
			},
		});
	}
}
