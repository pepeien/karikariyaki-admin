import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

	/**
	 * Data
	 */
	public filteredData!: Observable<T[]>;

	/**
	 * Optional
	 */
	private _selectedItems: T[] = new Array<T>();

	private _lastFilter = '';

	ngOnInit(): void {
		if (this.canChooseMultiple === false) {
			this.filteredData = this.formGroup.controls[this.controlName].valueChanges.pipe(
				startWith<string | T>(''),
				map((value) => this._filter(value, this.data)),
			);

			return;
		}

		this.filteredData = this.formGroup.controls[this.controlName].valueChanges.pipe(
			startWith<string | T[]>(''),
			map((value) =>
				this._filterMany(typeof value === 'string' ? value : this._lastFilter, this.data),
			),
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

	public onCheckboxClick(value: T) {
		const foundItemIndex = this._selectedItems.findIndex(
			(item) => this.execOptionGetter(item) === this.execOptionGetter(value),
		);

		if (foundItemIndex === -1) {
			this._selectedItems.push(value);
		} else {
			this._selectedItems.splice(foundItemIndex, 1);
		}

		this.formGroup.controls[this.controlName].setValue(this._selectedItems);
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

	public execMultipleOptionGetter(value: string | T[]): string {
		if (!this.optionGetter) {
			if (typeof value === 'string') {
				return value;
			}

			return '';
		}

		if (typeof value === 'string') {
			return value;
		}

		if (Array.isArray(value) === false) {
			return this.optionGetter(value as T);
		}

		let result = '';

		value.forEach((item, index) => {
			if (!this.optionGetter) {
				return;
			}

			if (index === 0) {
				result += this.optionGetter(item);

				return;
			}

			result += `, ${this.optionGetter(item)}`;
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

	private _filter(target: string | T, data: T[]): T[] {
		if (!target) {
			return data.slice();
		}

		const formattedTarget = this.execOptionGetter(target).toLocaleLowerCase();

		return data.filter((value) =>
			this.execOptionGetter(value).toLowerCase().includes(formattedTarget),
		);
	}

	private _filterMany(target: string, data: T[]): T[] {
		if (!target) {
			return data.slice();
		}

		this._lastFilter = target;

		return data.filter((value) =>
			this.execOptionGetter(value).toLowerCase().includes(target.toLowerCase()),
		);
	}
}
