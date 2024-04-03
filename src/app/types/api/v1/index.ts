import { HttpClient } from '@angular/common/http';

// Types
import { ApiV1OperatorAuth } from '@types';
import { Registry } from './registry';
import { Telemetry } from './telemetry';

export class ApiV1 {
    private _client: HttpClient;

    constructor(client: HttpClient) {
        this._client = client;
    }

    public get operator() {
        return new ApiV1OperatorAuth(this._client);
    }

    public get registry() {
        return new Registry(this._client);
    }

    public get telemetry() {
        return new Telemetry(this._client);
    }
}
