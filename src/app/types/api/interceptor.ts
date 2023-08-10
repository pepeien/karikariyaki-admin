import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@services';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private _alertService: AlertService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((response: HttpErrorResponse) => {
                if (response.error instanceof ErrorEvent) {
                    return throwError(() => response.error.message);
                }

                const errorDescriptions = response.error.description as string[];

                errorDescriptions.forEach((errorDescription) => {
                    this._alertService.pushWarning(errorDescription);
                });

                return throwError(() => errorDescriptions);
            }),
        );
    }
}
