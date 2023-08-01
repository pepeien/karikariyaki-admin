import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// Types
import { InHouseAlert } from '@interfaces';

// Services
import { LanguageService } from '@services';

// Components
import { AlertComponent } from '@components';

let processorTimeout: number;

@Injectable({ providedIn: 'root' })
export class AlertService {
    /**
     * Consts
     */
    private readonly ALERT_DEFAULT_SCREEN_TIME_IN_MS = 2500;
    private readonly QUEUE_PROCESSING_SPAN_TRESHOLD = 100;

    /**
     * Language
     */
    public languageSource = LanguageService.DEFAULT_LANGUAGE;

    /**
     * In House
     */
    private _queue: InHouseAlert[] = [];

    constructor(
        private _snackBar: MatSnackBar,
        private _languageService: LanguageService,
    ) {
        this._languageService.language.subscribe({
            next: (nextLanguage) => {
                this.languageSource = nextLanguage;
            },
        });
    }

    public push(alert: InHouseAlert) {
        this._queue.push(alert);

        clearTimeout(processorTimeout);

        processorTimeout = window.setTimeout(() => {
            this._processNextAlert();
        }, this.QUEUE_PROCESSING_SPAN_TRESHOLD);
    }

    public pushNotification(message: string) {
        this.push({
            type: 'NOTIFICATION',
            message: message,
        });
    }

    public pushCaution(message: string) {
        this.push({
            type: 'CAUTION',
            message: message,
        });
    }

    public pushWarning(message: string) {
        this.push({
            type: 'WARNING',
            message: message,
        });
    }

    private _processNextAlert() {
        if (this._queue.length === 0) {
            return;
        }

        const alert = this._queue[this._queue.length - 1];

        const alertDuration = alert.duration ?? this.ALERT_DEFAULT_SCREEN_TIME_IN_MS;

        this._snackBar
            .openFromComponent(AlertComponent, {
                panelClass: ['app-alert__wrapper'],
                duration: alertDuration,
                horizontalPosition: 'right',
                verticalPosition: 'bottom',
                data: {
                    ...alert,
                    message: this.languageSource[alert.message] ?? alert.message,
                    duration: alertDuration,
                },
            })
            .afterDismissed()
            .subscribe({
                next: () => {
                    this._queue.pop();

                    this._processNextAlert();
                },
            });
    }
}
