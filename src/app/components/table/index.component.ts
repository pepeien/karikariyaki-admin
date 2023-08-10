import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Services
import { LanguageService } from '@services';

export class PaginatorIntlService extends MatPaginatorIntl {
    /**
     * Services
     */
    private _languageService!: LanguageService;

    /**
     * In House
     */
    private _languageSource = LanguageService.DEFAULT_LANGUAGE;

    public override getRangeLabel = (page: number, pageSize: number, length: number) => {
        const connector = this._languageSource['PAGINATOR_RANGE_CONNECTOR_LABEL'];

        if (length === 0 || pageSize === 0) {
            return '0 ' + connector + ' ' + length;
        }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;

        const endIndex =
            startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

        return startIndex + 1 + ' - ' + endIndex + ' ' + connector + ' ' + length;
    };

    public injectLanguageService(languageService: LanguageService) {
        this._languageService = languageService;

        this._languageService.language.subscribe({
            next: (nextLanguage) => {
                this._languageSource = nextLanguage;

                this._translateLabels();
            },
        });

        this._translateLabels();
    }

    private _translateLabels() {
        super.itemsPerPageLabel = this._languageSource['PAGINATOR_ITEMS_PER_PAGE_LABEL'];
        super.nextPageLabel = this._languageSource['PAGINATOR_NEXT_PAGE_LABEL'];
        super.lastPageLabel = this._languageSource['PAGINATOR_LAST_PAGE_LABEL'];
        super.previousPageLabel = this._languageSource['PAGINATOR_PREVIOUS_PAGE_LABEL'];
        super.firstPageLabel = this._languageSource['PAGINATOR_FIRST_PAGE_LABEL'];

        this.changes.next();
    }
}

@Component({
    selector: 'app-table',
    templateUrl: './index.component.html',
    providers: [
        {
            provide: MatPaginatorIntl,
            useFactory: (languageService: LanguageService) => {
                const service = new PaginatorIntlService();

                service.injectLanguageService(languageService);

                return service;
            },
            deps: [LanguageService],
        },
    ],
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
    @ViewChild('tablePaginatorRef')
    public tablePaginatorRef!: MatPaginator;

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
        this.dataList.paginator = this.tablePaginatorRef;
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
        if (target === null || target === undefined) {
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
