import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { Chart, ChartData, ChartType } from 'chart.js/auto';
import { v4 } from 'uuid';

// Animations
import { AutomaticAnimation } from '@animations';

export interface ChartFilter {
    title: string;
    labels: string[];
}

@Component({
    selector: 'app-chart',
    templateUrl: './index.component.html',
    animations: [AutomaticAnimation.slideFromBottom, AutomaticAnimation.fade],
})
export class ChartComponent implements AfterViewInit, OnChanges {
    // Props
    @Input()
    public title!: string;
    @Input()
    public type!: ChartType;
    @Input()
    public data!: ChartData;
    @Input()
    public filters!: ChartFilter[];
    @Input()
    public onFilter!: (data: ChartData) => void;

    // Chart.JS
    public isFiltering = false;
    public id = v4();
    public chart: Chart | undefined;

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    ngAfterViewInit(): void {
        this.chart = new Chart(this.id, {
            type: this.type,
            data: {
                labels: [],
                datasets: [],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });

        this._changeDetectorRef.detectChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.chart) {
            return;
        }

        if (changes['data']) {
            this.chart.data = changes['data'].currentValue as ChartData;

            this.chart.update();
        }
    }

    public onFilterButtonClick() {
        this.isFiltering = !this.isFiltering;
    }

    public onCleanFilter() {}

    public onFilterClick(label: string) {}

    public getFilterIndex(label: string): number {
        return 1;
    }
}
