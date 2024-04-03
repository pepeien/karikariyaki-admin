import { HttpClient } from '@angular/common/http';

// Types
import { ApiV1EventTelemetry } from '@types';

export class Telemetry {
    private _client: HttpClient;

    constructor(client: HttpClient) {
        this._client = client;
    }

    public get event() {
        return new ApiV1EventTelemetry(this._client);
    }
}
