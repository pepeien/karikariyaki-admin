import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Event, EventOrder, Operator, Product } from 'karikarihelper';

// Animations
import { BasicAnimations } from '@animations';

// Services
import { ApiService, LanguageService } from '@services';

// Components
import { DialogComponent } from '@components';

@Component({
	selector: 'app-registry-event-order-view',
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
export class RegistryEventOrderViewComponent implements OnInit {
	/**
	 * Table
	 */
	public dataList: EventOrder[] = [];

	/**
	 * Editor
	 */
	public isEditorOpen = false;
	public editorType: 'creation' | 'edition' = 'edition';
	public deletionTarget: EventOrder | undefined;
	public editionTarget: EventOrder | undefined;

	/**
	 * Language
	 */
	public languageSource = LanguageService.DEFAULT_LANGUAGE;

	/**
	 * Forms
	 */
	public creationFormGroup = new FormGroup({
		event: new FormControl('', [Validators.required]),
		status: new FormControl('', [Validators.required]),
		operator: new FormControl('', [Validators.required]),
		client: new FormControl('', [Validators.required]),
		product: new FormControl('', [Validators.required]),
		productVariant: new FormControl(''),
	});
	public editionFormGroup = new FormGroup({
		status: new FormControl('', [Validators.required]),
	});

	/**
	 * In House
	 */
	public availableEvents: Event[] = [];
	public availableOperators: Operator[] = [];
	public availableOrderStatus: string[] = [];
	public availableProducts: Product[] = [];

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

	public onCreationInit() {
		this._updateAvailableEvents();
		this._updateAvailableOperators();
		this._updateAvailableProducts();
		this._updateAvailableStatus();

		this.isEditorOpen = true;
		this.editorType = 'creation';
	}

	public onCreation() {
		const event = this.creationFormGroup.controls.event.value as unknown as Event;
		const status = this.creationFormGroup.controls.status.value;
		const operator = this.creationFormGroup.controls.operator.value as unknown as Operator;
		const clientName = this.creationFormGroup.controls.client.value;
		const product = this.creationFormGroup.controls.product.value as unknown as Product;
		const productVariant = this.creationFormGroup.controls.productVariant
			.value as unknown as Product;

		if (
			this.creationFormGroup.invalid ||
			!event ||
			!status ||
			!operator ||
			!clientName ||
			!product
		) {
			return;
		}

		this._apiService.V1.eventOrderRegistry
			.save({
				eventId: event._id,
				status: status,
				operatorId: operator._id,
				clientName: clientName,
				itemId: product._id,
				variantId: productVariant._id ?? undefined,
			})
			.subscribe({
				next: () => {
					this._onSuccessfulResponse();
				},
			});
	}

	public displayEventAutocomplete(event: Event) {
		if (!event) {
			return '';
		}

		return event.name;
	}

	public displayOperatorAutocomplete(operator: Operator) {
		if (!operator) {
			return '';
		}

		return operator.displayName;
	}

	public displayProductAutocomplete(product: Product) {
		if (!product) {
			return '';
		}

		return product.name;
	}

	public displayProductVariantAutocomplete(product: Product) {
		if (!product) {
			return '';
		}

		return product.name;
	}

	public getProductVariants() {
		const product = this.creationFormGroup.controls.product.value as unknown as Product;

		if (!product || !product.variants) {
			return [];
		}

		return product.variants;
	}

	public onEditionInit(item: EventOrder) {
		this.isEditorOpen = true;
		this.editorType = 'edition';

		this.editionFormGroup.controls.status.setValue(item.status);

		this.editionTarget = item;
	}

	public onEdition() {
		if (this.editionFormGroup.invalid || !this.editionTarget || !this.editionTarget._id) {
			return;
		}

		this._apiService.V1.eventOrderRegistry
			.edit(this.editionTarget._id, {
				status: this.editionFormGroup.controls.status.value as string,
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

		this.creationFormGroup.reset();
		this.editionFormGroup.reset();
	}

	public onDeleteInit(item: EventOrder) {
		if (!item || !item._id) {
			return;
		}

		const dialogRef = this._dialog.open(DialogComponent, {
			data: {
				message: this.languageSource['EVENT_ORDER_REGISTRY_DELETE_MESSAGE'],
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

		this._apiService.V1.eventOrderRegistry.delete(this.deletionTarget._id).subscribe({
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
		this._apiService.V1.eventOrderRegistry.search().subscribe({
			next: (response) => {
				if (!response.result) {
					return;
				}

				this.dataList = response.result;
			},
		});
	}

	private _updateAvailableEvents() {
		this._apiService.V1.eventRegistry.search().subscribe({
			next: (response) => {
				if (response.wasSuccessful === false || !response.result) {
					return;
				}

				this.availableEvents = response.result;
			},
		});
	}

	private _updateAvailableOperators() {
		this._apiService.V1.operatorRegistry.search().subscribe({
			next: (response) => {
				if (response.wasSuccessful === false || !response.result) {
					return;
				}

				this.availableOperators = response.result;
			},
		});
	}

	private _updateAvailableProducts() {
		this._apiService.V1.productRegistry.search().subscribe({
			next: (response) => {
				if (response.wasSuccessful === false || !response.result) {
					return;
				}

				this.availableProducts = response.result;
			},
		});
	}

	private _updateAvailableStatus() {
		this._apiService.V1.eventOrderRegistry.status().subscribe({
			next: (response) => {
				if (response.wasSuccessful === false || !response.result) {
					return;
				}

				this.availableOrderStatus = response.result;
			},
		});
	}
}
