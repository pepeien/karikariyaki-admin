import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Event, EventOrder, Operator, OrderItem, Product } from 'karikarihelper';
import { v4 } from 'uuid';

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
	 * Consts
	 */
	public readonly MIN_PRODUCT_COUNT = 1;
	public readonly MAX_PRODUCT_COUNT = 100;

	/**
	 * Primitives
	 */
	public productCount = 1;

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
		event: new FormControl({ value: '', disabled: true }, [Validators.required]),
		status: new FormControl({ value: '', disabled: true }, [Validators.required]),
		operator: new FormControl({ value: '', disabled: true }, [Validators.required]),
		client: new FormControl('', [Validators.required]),
		items: new FormControl({ value: '', disabled: true }, []),
	});
	public editionFormGroup = new FormGroup({
		status: new FormControl({ value: '', disabled: true }, [Validators.required]),
	});

	/**
	 * In House
	 */
	public availableEvents: Event[] = [];
	public availableOperators: Operator[] = [];
	public availableOrderStatus: string[] = [];
	public availableProducts: Product[] = [];

	public selectedEvent: Event | null = null;
	public selectedStatus: string | null = null;
	public selectedOperator: Operator | null = null;
	public selectedItem: Product | null = null;
	public selectedItems: OrderItem[] = [];

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

	public isCreationInvalid() {
		return (
			this.creationFormGroup.invalid ||
			this.creationFormGroup.controls.status.disabled ||
			this.creationFormGroup.controls.event.disabled ||
			this.creationFormGroup.controls.items.disabled ||
			!this.selectedEvent ||
			!this.selectedStatus ||
			!this.selectedOperator ||
			!this.selectedItems ||
			this.selectedItems.length === 0
		);
	}

	public isEditionInvalid() {
		return (
			this.editionFormGroup.invalid ||
			this.editionFormGroup.controls.status.disabled ||
			!this.selectedStatus
		);
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
		const event = this.selectedEvent;
		const status = this.selectedStatus;
		const operator = this.selectedOperator;
		const clientName = this.creationFormGroup.controls.client.value;
		const items = this.selectedItems;

		if (
			this.creationFormGroup.invalid ||
			!event ||
			!status ||
			!operator ||
			!clientName ||
			!items
		) {
			return;
		}

		this._apiService.V1.eventOrderRegistry
			.save({
				eventId: event._id,
				status: status,
				operatorId: operator._id,
				clientName: clientName,
				itemsId: this._extractObjectIdsFromProducts(items),
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

	public displayStatusAutocomplete(status: string) {
		if (!status) {
			return '';
		}

		return this.languageSource[status];
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

	public getItemsList(): Product[] {
		return (this.creationFormGroup.controls.items.value as unknown as Product[]) ?? [];
	}

	public getProductCount(product: Product): number {
		return this.getItemsList().filter((item) => item._id === product._id).length;
	}

	public onEditionInit(item: EventOrder) {
		this._updateAvailableStatus();

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

	public onManualProductCount(target: EventTarget | null) {
		if (!target) {
			return;
		}

		const typedTarget = target as HTMLInputElement;

		const valueAsNumber = parseInt(typedTarget.value);

		if (isNaN(valueAsNumber) || valueAsNumber < this.MIN_PRODUCT_COUNT) {
			this.productCount = this.MIN_PRODUCT_COUNT;

			typedTarget.value = this.productCount.toString();

			return;
		}

		if (valueAsNumber > this.MAX_PRODUCT_COUNT) {
			this.productCount = this.MAX_PRODUCT_COUNT;

			typedTarget.value = this.productCount.toString();

			return;
		}

		this.productCount = valueAsNumber;
	}

	public onProductCountDecrement() {
		if (
			this.productCount < this.MIN_PRODUCT_COUNT ||
			this.productCount > this.MAX_PRODUCT_COUNT
		) {
			return;
		}

		this.productCount--;
	}

	public onProductCountIncrement() {
		this.productCount++;
	}

	public onProductConfirmation() {
		if (!this.selectedItem) {
			return;
		}

		for (let i = 0; i < this.productCount; i++) {
			this.selectedItems.push({
				id: v4(),
				product: this.selectedItem,
			});
		}

		this.productCount = this.MIN_PRODUCT_COUNT;

		this.creationFormGroup.controls.items.reset();
	}

	public onItemDeletion(id: string) {
		this.selectedItems = this.selectedItems.filter((item) => item.id !== id);
	}

	public onEventSelection(nextSelectedEvents: Event[]) {
		if (!nextSelectedEvents) {
			this.selectedEvent = null;

			return;
		}

		this.selectedEvent = nextSelectedEvents[0];
	}

	public onStatusSelection(nextSelectedStatus: string[]) {
		if (!nextSelectedStatus) {
			this.selectedStatus = null;

			return;
		}

		this.selectedStatus = nextSelectedStatus[0];
	}

	public onOperatorSelection(nextSelectedOperator: Operator[]) {
		if (!nextSelectedOperator) {
			this.selectedOperator = null;

			return;
		}

		this.selectedOperator = nextSelectedOperator[0];
	}

	public onProductSelection(nextSelectedProducts: Product[]) {
		if (!nextSelectedProducts) {
			this.selectedItem = null;

			return;
		}

		this.selectedItem = nextSelectedProducts[0];
	}

	private _extractObjectIdsFromProducts(items: OrderItem[]) {
		const result: string[] = [];

		items.forEach((item) => {
			result.push(item.product._id);
		});

		return result;
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
