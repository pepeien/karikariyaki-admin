import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Ingredient, IngredientType, OperatorRole, Product, Realm } from 'karikarihelper';
import { v4 } from 'uuid';

// Animations
import { AutomaticAnimation, BasicAnimations } from '@animations';

// Services
import { ApiService, LanguageService, OperatorService } from '@services';

// Components
import { DialogComponent } from '@components';
import { MatRadioChange } from '@angular/material/radio';

interface IngredientItem {
	id: string;
	data: Ingredient;
}

@Component({
	selector: 'app-registry-product-view',
	templateUrl: './index.component.html',
	animations: [
		AutomaticAnimation.pop,
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
	public canManageStands = false;
	public isEditorOpen = false;
	public editorType: 'creation' | 'edition' = 'edition';
	public deletionTarget: Product | undefined;
	public editionTarget: Product | undefined;
	public availableRealms: Realm[] = [];
	public selectedRealm: Realm | null = null;
	public availableIngredientTypes = Object.values(IngredientType);
	public selectedIngredientType = this.availableIngredientTypes[0];
	public ingredients: IngredientItem[] = [];

	/**
	 * Language
	 */
	public languageSource = LanguageService.DEFAULT_LANGUAGE;

	/**
	 * Forms
	 */
	public creationFormGroup = new FormGroup({
		name: new FormControl('', [Validators.required]),
		realm: new FormControl({ value: '', disabled: true }, []),
		ingredientName: new FormControl('', []),
	});
	public editionFormGroup = new FormGroup({
		name: new FormControl('', [Validators.required]),
		ingredientName: new FormControl('', []),
	});

	constructor(
		private _apiService: ApiService,
		private _dialog: MatDialog,
		private _languageService: LanguageService,
		private _operatorService: OperatorService,
	) {}

	ngOnInit(): void {
		this._refreshList();

		this._languageService.language.subscribe({
			next: (nextLanguage) => {
				this.languageSource = nextLanguage;
			},
		});

		this._operatorService.operator.subscribe({
			next: (operator) => {
				if (!operator) {
					this.canManageStands = false;

					return;
				}

				this.canManageStands = operator.role === OperatorRole.ADMIN;
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

		this.isEditorOpen = true;
		this.editorType = 'creation';
	}

	public onCreation() {
		if (this.creationFormGroup.invalid) {
			return;
		}

		const realm = this.selectedRealm;

		this._apiService.V1.productRegistry
			.save({
				name: this.creationFormGroup.controls.name.value as string,
				realmId: this.canManageStands ? realm?._id : undefined,
				ingredients: this._extractIngredients(),
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

		this.editionTarget.ingredients.forEach((ingredient) => {
			this.ingredients.unshift({
				id: v4(),
				data: ingredient,
			});
		});
	}

	public onEdition() {
		if (this.editionFormGroup.invalid || !this.editionTarget || !this.editionTarget._id) {
			return;
		}

		this._apiService.V1.productRegistry
			.edit(this.editionTarget._id, {
				name: this.editionFormGroup.controls.name.value as string,
				ingredients: this._extractIngredients(),
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
		this.selectedRealm = null;
		this.selectedIngredientType = this.availableIngredientTypes[0];
		this.ingredients = [];

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

	public onIngredientTypeSelection(event: MatRadioChange) {
		this.selectedIngredientType = event.value as IngredientType;
	}

	public onIngredientRemove(id: string) {
		this.ingredients = this.ingredients.filter((ingredient) => ingredient.id !== id);
	}

	public onIngredientCreation() {
		if (this.isIgredientInvalid()) {
			return;
		}

		const ingredientName = this.editionTarget
			? this.editionFormGroup.controls.ingredientName.value
			: this.creationFormGroup.controls.ingredientName.value;

		this.ingredients.unshift({
			id: v4(),
			data: {
				name: ingredientName ?? '',
				type: this.selectedIngredientType,
			},
		});
	}

	public isCreationInvalid() {
		return this.creationFormGroup.invalid;
	}

	public isEditInvalid() {
		return this.editionFormGroup.invalid;
	}

	public isIgredientInvalid() {
		const ingredientName = this.editionTarget
			? this.editionFormGroup.controls.ingredientName.value
			: this.creationFormGroup.controls.ingredientName.value;

		return !ingredientName || !this.selectedIngredientType;
	}

	private _extractIngredients(): Ingredient[] {
		const result: Ingredient[] = [];

		this.ingredients.forEach((ingredient) => {
			result.unshift(ingredient.data);
		});

		return result;
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
}
