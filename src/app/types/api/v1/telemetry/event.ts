import { Observable } from 'rxjs';
import { ApiResponseWrapper, Telemetry } from 'karikarihelper';

// Types
import { BaseApi } from '@types';

export class ApiV1EventTelemetry extends BaseApi {
    private _endpoint = `${this.root}/v1/admin/telemetry/event`;

    public getMostPopularProduct(): Observable<ApiResponseWrapper<Telemetry<string>>> {
        const endpoint = new URL(`${this._endpoint}/popular-product`);

        return this.client.get<ApiResponseWrapper<Telemetry<string>>>(endpoint.href, {
            withCredentials: true,
        });
    }

    public getFasterStand(): Observable<ApiResponseWrapper<Telemetry<number>>> {
        const endpoint = new URL(`${this._endpoint}/faster-stand`);

        return this.client.get<ApiResponseWrapper<Telemetry<number>>>(endpoint.href, {
            withCredentials: true,
        });
    }

    public getOrderQueue(): Observable<ApiResponseWrapper<Telemetry<number>>> {
        const endpoint = new URL(`${this._endpoint}/order-queue`);

        return this.client.get<ApiResponseWrapper<Telemetry<number>>>(endpoint.href, {
            withCredentials: true,
        });
    }
}
