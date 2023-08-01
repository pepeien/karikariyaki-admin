import { HttpClient } from '@angular/common/http';

// Types
import {
    ApiV1EventOrderRegistry,
    ApiV1EventRegistry,
    ApiV1MenuRegistry,
    ApiV1OperatorRegistry,
    ApiV1ProductRegistry,
    ApiV1RealmRegistry,
} from '@types';

export class Registry {
    private _client: HttpClient;

    constructor(client: HttpClient) {
        this._client = client;
    }

    public get event() {
        return new ApiV1EventRegistry(this._client);
    }

    public get eventOrder() {
        return new ApiV1EventOrderRegistry(this._client);
    }

    public get menu() {
        return new ApiV1MenuRegistry(this._client);
    }

    public get operator() {
        return new ApiV1OperatorRegistry(this._client);
    }

    public get product() {
        return new ApiV1ProductRegistry(this._client);
    }

    public get realm() {
        return new ApiV1RealmRegistry(this._client);
    }
}
