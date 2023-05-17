import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Services
import { LanguageService } from '@services';

@Component({
	selector: 'app-table',
	templateUrl: './index.component.html',
})
export class TableComponent<T> implements OnChanges {
	@Input()
	public data?: T[];
	@Input()
	public onEdit?: (item: T) => void;
	@Input()
	public onDelete?: (item: T) => void;

	/**
	 * Consts
	 */
	public readonly SETTINGS_HEADER = 'inhouse-settings';

	/**
	 * Table
	 */
	@ViewChild('tableSortRef')
	public tableSortRef = new MatSort();

	public headerList: string[] = [];
	public dataList = new MatTableDataSource<T>([]);

	/**
	 * In House
	 */
	public languageSource = LanguageService.DEFAULT_LANGUAGE;

	constructor(private _languageService: LanguageService) {}

	ngOnInit(): void {
		this._languageService.language.subscribe({
			next: (nextLanguage) => {
				this.languageSource = nextLanguage;
			},
		});
	}

	ngAfterViewInit(): void {
		this.dataList.sort = this.tableSortRef;
	}

	ngOnChanges(changes: SimpleChanges): void {
		const nextData = changes['data']?.currentValue;

		if (nextData && nextData.length === 0) {
			this.headerList = [];
			this.dataList.data = [];
		}

		if (nextData && nextData.length > 0) {
			this.headerList = Object.keys(nextData[0]).concat(this.SETTINGS_HEADER);

			this.dataList.data = nextData;
		}
	}

	public isObject(target: string | object) {
		if (!!!target) {
			return;
		}

		return typeof target === 'object';
	}

	public generateObjectString(target: object) {
		if (Array.isArray(target)) {
			return `[] ${target.length} elements`;
		}

		return JSON.stringify(target);
	}
}
