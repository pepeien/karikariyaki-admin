import { Observable } from 'rxjs';
import {
    ApiResponseWrapper,
    Operator,
    OperatorCreatableParams,
    OperatorEditableParams,
    OperatorQueryableParams,
} from 'karikarihelper';

// Types
import { BaseApi } from '@types';

export class ApiV1OperatorRegistry extends BaseApi {
    private _endpoint = `${this.root}/v1/admin/registry/operator`;

    public search(params?: OperatorQueryableParams): Observable<ApiResponseWrapper<Operator[]>> {
        const endpoint = new URL(this._endpoint);

        if (params?.id) {
            endpoint.searchParams.append('id', params.id.trim());
        }

        if (params?.displayName) {
            endpoint.searchParams.append('displayName', params?.displayName.trim());
        }

        if (params?.realmId) {
            endpoint.searchParams.append('realmId', params.realmId.trim());
        }

        return this.client.get<ApiResponseWrapper<Operator[]>>(endpoint.href, {
            withCredentials: true,
        });
    }

    public roles(): Observable<ApiResponseWrapper<string[]>> {
        const endpoint = new URL(this._endpoint + '/roles');

        return this.client.get<ApiResponseWrapper<string[]>>(endpoint.href, {
            withCredentials: true,
        });
    }

    public searchSelf(): Observable<ApiResponseWrapper<Operator>> {
        const endpoint = new URL(`${this._endpoint}/self`);

        return this.client.get<ApiResponseWrapper<Operator>>(endpoint.href, {
            withCredentials: true,
        });
    }

    public save(params: OperatorCreatableParams): Observable<ApiResponseWrapper<Operator>> {
        const endpoint = new URL(this._endpoint);

        return this.client.post<ApiResponseWrapper<Operator>>(
            endpoint.href,
            {
                displayName: params.displayName,
                userName: params.userName,
                realmId: params.realmId,
                role: params.role,
                photo: params.photo,
            },
            {
                withCredentials: true,
            },
        );
    }

    public edit(
        id: string,
        params: OperatorEditableParams,
    ): Observable<ApiResponseWrapper<Operator>> {
        const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

        return this.client.patch<ApiResponseWrapper<Operator>>(
            endpoint.href,
            {
                displayName: params.displayName,
                role: params.role,
                photo: params.photo,
            },
            {
                withCredentials: true,
            },
        );
    }

    public delete(id: string): Observable<ApiResponseWrapper<Operator>> {
        const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

        return this.client.delete<ApiResponseWrapper<Operator>>(endpoint.href, {
            withCredentials: true,
        });
    }
}
