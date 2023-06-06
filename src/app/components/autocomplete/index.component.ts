import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
	selector: 'app-auto-complete',
	templateUrl: './index.component.html',
})
export class AutocompleteComponent<T> implements OnInit, OnChanges {
	@Input()
	public label!: string;
	@Input()
	public data!: T[];
	@Input()
	public canChooseMultiple = false;
	@Input()
	public formGroup!: FormGroup;
	@Input()
	public controlName!: string;
	@Input()
	public optionGetter: ((item: T) => string) | null = null;

	@Output()
	public onSelection = new EventEmitter<T[]>();

	/**
	 * Data
	 */
	public filteredData!: Observable<T[]>;

	/**
	 * Optional
	 */
	private _selectedItems: T[] = new Array<T>();

	ngOnInit(): void {
		if (this.canChooseMultiple === false) {
			this.filteredData = this.formGroup.controls[this.controlName].valueChanges.pipe(
				startWith<string>(''),
				map((value) => this._filter(value)),
			);

			return;
		}

		this.filteredData = this.formGroup.controls[this.controlName].valueChanges.pipe(
			startWith<string>(''),
			map((value) => this._filterMany(value)),
		);
	}

	ngOnChanges(changes: SimpleChanges): void {
		const dataChanges = changes['data'];

		if (dataChanges && dataChanges.previousValue !== dataChanges.currentValue) {
			if (dataChanges.currentValue.length > 0) {
				this.formGroup.controls[this.controlName].enable();
			} else {
				this.formGroup.controls[this.controlName].disable();
			}
		}
	}

	public onCheckboxClick(event: Event, value: T) {
		if (!this.controlName) {
			return;
		}

		event.stopPropagation();

		const wasAlreadySelected =
			this._selectedItems.find(
				(item) => this.execOptionGetter(item) === this.execOptionGetter(value),
			) !== undefined;

		if (this.canChooseMultiple) {
			this._selectedItems = wasAlreadySelected
				? (this._selectedItems = this._selectedItems.filter(
						(item) => this.execOptionGetter(item) !== this.execOptionGetter(value),
				  ))
				: this._selectedItems.concat([value]);

			this.formGroup.controls[this.controlName].setValue(
				this.execMultipleOptionGetter(this._selectedItems),
			);
		} else {
			this._selectedItems = wasAlreadySelected ? [] : [value];

			this.formGroup.controls[this.controlName].setValue(
				this._selectedItems.length === 0 ? '' : this.execOptionGetter(value),
			);
		}

		this.onSelection.emit(this._selectedItems);
	}

	public execOptionGetter(value: string | T): string {
		if (!this.optionGetter) {
			if (typeof value === 'string') {
				return value;
			}

			return '';
		}

		if (typeof value === 'string') {
			return value;
		}

		return this.optionGetter(value as T);
	}

	public execMultipleOptionGetter(value: T[]): string {
		let result = '';

		value.forEach((item) => {
			if (!this.optionGetter) {
				return;
			}

			result += `${this.optionGetter(item)}, `;
		});

		return result;
	}

	public isCheckboxSelected(value: T) {
		return (
			this._selectedItems.findIndex(
				(item) => this.execOptionGetter(item) === this.execOptionGetter(value),
			) !== -1
		);
	}

	private _filter(target: string): T[] {
		if (!target) {
			this._selectedItems = [];

			this.onSelection.emit(this._selectedItems);

			return this.data.slice();
		}

		const convertedTarget = this.execOptionGetter(target).toLocaleLowerCase();

		return this.data.filter((value) =>
			this.execOptionGetter(value).toLowerCase().includes(convertedTarget),
		);
	}

	private _filterMany(target: string): T[] {
		if (target === null || target === undefined) {
			this._selectedItems = [];

			this.onSelection.emit(this._selectedItems);

			return this.data.slice();
		}

		const splittedTarget = target.split(',');

		if (splittedTarget[splittedTarget.length - 1].trim().length === 0) {
			return this.data.slice();
		}

		let filteredData: T[] = [];

		for (const entry of splittedTarget) {
			if (entry.trim().length === 0) {
				continue;
			}

			filteredData = filteredData.concat(
				this.data.filter((value) =>
					this.execOptionGetter(value).toLowerCase().includes(entry.trim().toLowerCase()),
				),
			);
		}

		return filteredData;
	}
}
