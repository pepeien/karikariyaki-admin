import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-auto-complete',
	templateUrl: './index.component.html',
})
export class AutocompleteComponent<T> implements OnChanges {
	@Input()
	public label!: string;
	@Input()
	public data!: T[];
	@Input()
	public formGroup!: FormGroup;
	@Input()
	public controlName!: string;
	@Input()
	public optionGetter: ((item: T) => string) | null = null;

	/**
	 * Data
	 */
	public filteredData: T[] = [];

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

	public filterDataList() {
		const formControl = this.formGroup.controls[this.controlName] as FormControl<
			T | string | null
		>;

		this.filteredData = this._filter(formControl.value);
	}

	public execOptionGetter(value: string | T | null): string {
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

	private _filter(target: string | T | null): T[] {
		if (!target) {
			return this.data;
		}

		const formattedTarget = this.execOptionGetter(target).toLocaleLowerCase();

		return this.data.filter((value) =>
			this.execOptionGetter(value).toLowerCase().includes(formattedTarget),
		);
	}
}
