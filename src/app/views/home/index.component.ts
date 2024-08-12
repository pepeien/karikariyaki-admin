import { Component } from '@angular/core';
import { ChartData, ChartDataset } from 'chart.js/auto';
import { Event, EventOrder, OperatorRole, OrderStatus, Realm, Telemetry } from 'karikarihelper';

// Services
import { ApiService, LanguageService } from '@services';

// Components
import { ChartFilter } from '@components';

@Component({
    selector: 'app-home-view',
    templateUrl: './index.component.html',
})
export class HomeViewComponent {
    /**
     * In House
     */
    public languageSource = LanguageService.DEFAULT_LANGUAGE;

    /**
     * Telemetry
     */
    public eventChartFilters: ChartFilter[] = [];
    public eventChartData: ChartData = { labels: [], datasets: [] };

    public operatorChartFilters: ChartFilter[] = [];
    public operatorChartData: ChartData = { labels: [], datasets: [] };

    public realmChartFilters: ChartFilter[] = [];
    public realmChartData: ChartData = { labels: [], datasets: [] };

    public mostPopularProductTelemetry: Telemetry<string> = {
        title: '',
        data: '',
    };
    public fasterStandTelemetry: Telemetry<number> = {
        title: '',
        data: 0,
    };
    public orderQueueTelemetry: Telemetry<number> = {
        title: '',
        data: 0,
    };

    public upcomingEvents: Event[] = [];

    /**
     * Table
     */
    public orders: any[] = [];

    constructor(private _apiService: ApiService, private _languageService: LanguageService) {
        this._languageService.language.subscribe({
            next: (nextLanguage) => {
                this.languageSource = nextLanguage;
            },
        });

        this._apiService.V1.registry.realm.search().subscribe({
            next: (realmResponse) => {
                if (!realmResponse.result) {
                    return;
                }

                const realms = realmResponse.result.filter((realm) => realm.name !== 'Admin');
                this._setupStandsChart(realms);
                this._setupOperatorsChart(realms);
                this._setupEventsChart(realms);
            },
        });

        this._apiService.V1.telemetry.event.getMostPopularProduct().subscribe({
            next: (telemetryResponse) => {
                if (!telemetryResponse.result) {
                    return;
                }

                this.mostPopularProductTelemetry = telemetryResponse.result;
            },
        });
        this._apiService.V1.telemetry.event.getFasterStand().subscribe({
            next: (telemetryResponse) => {
                if (!telemetryResponse.result) {
                    return;
                }

                this.fasterStandTelemetry = telemetryResponse.result;
            },
        });
        this._apiService.V1.telemetry.event.getOrderQueue().subscribe({
            next: (telemetryResponse) => {
                if (!telemetryResponse.result) {
                    return;
                }

                this.orderQueueTelemetry = telemetryResponse.result;
            },
        });

        this._apiService.V1.registry.eventOrder.search().subscribe({
            next: (response) => {
                if (!response.result) {
                    return;
                }

                const orderStatusDisplay = (status: OrderStatus): string => {
                    switch (status) {
                        case OrderStatus.COOKING:
                            return this.languageSource['EVENT_ORDER_VIEW_COOKING_TITLE'];

                        case OrderStatus.READY:
                            return this.languageSource['EVENT_ORDER_VIEW_READY_TITLE'];

                        default:
                            return status as string;
                    }
                };

                this.orders = response.result
                    .filter((order) => order.status !== OrderStatus.PICKED_UP)
                    .map((order) => {
                        return {
                            'Event Name': order.event.name,
                            'Operator Name': order.operator.displayName,
                            'Realm Name': order.realm.name,
                            Client: order.client,
                            'Item Count': order.items.length,
                            Status: orderStatusDisplay(order.status),
                        };
                    });
            },
        });
    }

    public getMostOrderedProductDescription(): string {
        if (this.mostPopularProductTelemetry.data.trim() === '') {
            return this.languageSource['TELEMETRY_MOST_ORDERED_PRODUCT_EMPTY'];
        }

        return `${this.languageSource['TELEMETRY_MOST_ORDERED_PRODUCT_PREFIX']} "${this.mostPopularProductTelemetry.data}"`;
    }

    public getFasterStandDescription(): string {
        if (this.fasterStandTelemetry.title.trim() === '' || this.fasterStandTelemetry.data === 0) {
            return this.languageSource['TELEMETRY_FASTER_STAND_EMPTY'];
        }

        return `${this.languageSource['TELEMETRY_FASTER_STAND_PREFIX']} "${
            this.fasterStandTelemetry.title
        }" ${this.languageSource['TELEMETRY_FASTER_STAND_MID']} ${this._msToReadable(
            this.fasterStandTelemetry.data,
        )} ${this.languageSource['TELEMETRY_FASTER_STAND_SUFFIX']}`;
    }

    public getPendingOrdersDescription(): string {
        if (this.orderQueueTelemetry.data === 0) {
            return this.languageSource['TELEMETRY_PENDING_ORDERS_EMPTY'];
        }

        return `${this.languageSource['TELEMETRY_PENDING_ORDERS_PREFIX']} ${this.orderQueueTelemetry.data} ${this.languageSource['TELEMETRY_PENDING_ORDERS_SUFFIX']}`;
    }

    public getEventReadableDate(event: Event): string {
        const date = new Date(event.date);

        return `${date.getDate()} ${date.toLocaleString(this.languageSource['LANGUAGE_META_NAME'], {
            month: 'long',
            year: 'numeric',
        })}`;
    }

    private _setupStandsChart(realms: Realm[]) {
        this.realmChartData = {
            labels: realms.map((realm) => realm.name),
            datasets: [
                {
                    data: realms.map((realm) => realm.users.length),
                },
            ],
        };
        this.realmChartFilters.push({
            title: this.languageSource['MENU_REGISTRY_REALM_TITLE'],
            labels: realms.map((realm) => realm.name),
        });
    }

    private _setupOperatorsChart(realms: Realm[]) {
        this.operatorChartData = {
            labels: Object.values(OperatorRole).map((value) => this.languageSource[value]),
            datasets: [],
        };

        realms.forEach((realm) => {
            const dataset: ChartDataset = {
                label: realm.name,
                data: Object.values(OperatorRole).map(
                    (value) => realm.users.filter((user) => user.role == value).length,
                ),
            };

            this.operatorChartData.datasets.push(dataset);
        });
    }

    private _setupEventsChart(realms: Realm[]) {
        this._apiService.V1.registry.event.search().subscribe({
            next: (eventResponse) => {
                if (!eventResponse.result) {
                    return;
                }

                const events = eventResponse.result;

                this.eventChartData = {
                    labels: events.map((event) => event.name),
                    datasets: realms.map((realm) => ({
                        label: realm.name,
                        data: events.map(
                            (event) =>
                                event.orders.filter((order) => order.realm._id === realm._id)
                                    .length,
                        ),
                        tension: 0.4,
                        fill: true,
                    })),
                };
                this.eventChartFilters.push({
                    title: this.languageSource['MENU_REGISTRY_EVENT_INDEX_TITLE'],
                    labels: (this.eventChartData.labels as string[]) ?? [],
                });
                this.eventChartFilters.push({
                    title: this.languageSource['MENU_REGISTRY_REALM_TITLE'],
                    labels: this.eventChartData.datasets.map((dataset) => dataset.label ?? ''),
                });

                this.upcomingEvents = events.filter(
                    (event) => new Date(event.date).getTime() > Date.now(),
                );

                const latestEvent = events[events.length - 1];

                const orderTimingMap: Map<string, number> = new Map<string, number>();

                realms.forEach((realm) => {
                    let totalOrderTimingInSeconds = 0;
                    let totalOrderItemCount = 0;

                    latestEvent.orders
                        .filter((order) => order.realm._id === realm._id)
                        .forEach((order) => {
                            totalOrderTimingInSeconds +=
                                (new Date(order.updatedAt).getTime() -
                                    new Date(order.createdAt).getTime()) /
                                1000;

                            totalOrderItemCount += order.items.length;
                        });

                    if (totalOrderItemCount === 0) {
                        orderTimingMap.set(realm.name, totalOrderTimingInSeconds);

                        return;
                    }

                    orderTimingMap.set(realm.name, totalOrderTimingInSeconds / totalOrderItemCount);
                });
            },
        });
    }

    private _msToReadable(timeInMs: number): string {
        const timeInSeconds = timeInMs / 1000;

        if (timeInSeconds <= 0) {
            return `0 ${this.languageSource['TIME_SECONDS']}`;
        }

        if (timeInSeconds < 60) {
            if (timeInSeconds === 1) {
                return `${timeInSeconds.toFixed(1)} ${this.languageSource['TIME_SECOND']}`;
            }

            return `${timeInSeconds.toFixed(1)} ${this.languageSource['TIME_SECONDS']}`;
        }

        const timeInMinutes = timeInSeconds / 60;

        if (timeInMinutes < 60) {
            if (timeInMinutes === 1) {
                return `${timeInMinutes} ${this.languageSource['TIME_MINUTE']}`;
            }

            return `${timeInMinutes} ${this.languageSource['TIME_MINUTES']}`;
        }

        const timeInHours = timeInMinutes / 60;

        if (timeInMinutes < 24) {
            if (timeInHours === 1) {
                return `${timeInHours} ${this.languageSource['TIME_HOUR']}`;
            }

            return `${timeInHours} ${this.languageSource['TIME_HOURS']}`;
        }

        const timeIndays = timeInHours / 24;

        if (timeIndays === 1) {
            return `${timeIndays} ${this.languageSource['TIME_DAY']}`;
        }

        return `${timeIndays} ${this.languageSource['TIME_DAYS']}`;
    }
}
