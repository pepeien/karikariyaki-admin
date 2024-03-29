import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Ingredient, OperatorRole, Product, Realm } from 'karikarihelper';

// Animations
import { AutomaticAnimation, BasicAnimations } from '@animations';

// Services
import { ApiService, LanguageService, OperatorService } from '@services';

// Components
import { DialogComponent } from '@components';

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
    public ingredients: Ingredient[] = [];

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
    });
    public editionFormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
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

        this._apiService.V1.registry.product
            .save({
                name: this.creationFormGroup.controls.name.value as string,
                realmId: this.canManageStands ? realm?._id : undefined,
                ingredients: this.ingredients,
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

        this._apiService.V1.registry.product
            .edit(this.editionTarget._id, {
                name: this.editionFormGroup.controls.name.value as string,
                ingredients: this.ingredients,
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

        this._apiService.V1.registry.product.delete(this.deletionTarget._id).subscribe({
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

    public onIngredientCreation(ingredients: Ingredient[]) {
        this.ingredients = ingredients;
    }

    public isCreationInvalid() {
        return this.creationFormGroup.invalid;
    }

    public isEditInvalid() {
        return this.editionFormGroup.invalid;
    }

    private _onSuccessfulResponse() {
        this._refreshList();

        this.onCancel();
    }

    private _refreshList() {
        this._apiService.V1.registry.product.search().subscribe({
            next: (response) => {
                if (!response.result) {
                    return;
                }

                this.dataList = response.result;
            },
        });
    }

    private _updateAvailableRealms() {
        this._apiService.V1.registry.realm.search().subscribe({
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
