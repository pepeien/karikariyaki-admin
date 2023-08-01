import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Types
import { ApiV1 } from '@types';

@Injectable()
export class ApiService {
    constructor(private _client: HttpClient) {}

    public get V1() {
        return new ApiV1(this._client);
    }
}
