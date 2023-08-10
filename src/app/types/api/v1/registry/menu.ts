import { Observable } from 'rxjs';
import {
    ApiResponseWrapper,
    Menu,
    MenuCreatableParams,
    MenuEditableParams,
    MenuQueryableParams,
} from 'karikarihelper';

// Types
import { BaseApi } from '@types';

export class ApiV1MenuRegistry extends BaseApi {
    private _endpoint = `${this.root}/v1/admin/registry/menu`;

    public search(params?: MenuQueryableParams): Observable<ApiResponseWrapper<Menu[]>> {
        const endpoint = new URL(this._endpoint);

        if (params?.id) {
            endpoint.searchParams.append('id', params.id.trim());
        }

        if (params?.title) {
            endpoint.searchParams.append('title', params.title.trim());
        }

        if (params?.parentId) {
            endpoint.searchParams.append('parentId', params.parentId.trim());
        }

        return this.client.get<ApiResponseWrapper<Menu[]>>(endpoint.href, {
            withCredentials: true,
        });
    }

    public searchSelf(): Observable<ApiResponseWrapper<Menu[]>> {
        const endpoint = new URL(`${this._endpoint}/self`);

        return this.client.get<ApiResponseWrapper<Menu[]>>(endpoint.href, {
            withCredentials: true,
        });
    }

    public save(params: MenuCreatableParams): Observable<ApiResponseWrapper<Menu>> {
        const endpoint = new URL(this._endpoint);

        return this.client.post<ApiResponseWrapper<Menu>>(
            endpoint.href,
            {
                title: params.title,
                icon: params.icon,
                route: params.route,
                parentId: params.parentId,
            },
            {
                withCredentials: true,
            },
        );
    }

    public edit(id: string, params: MenuEditableParams): Observable<ApiResponseWrapper<Menu>> {
        const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

        return this.client.patch<ApiResponseWrapper<Menu>>(
            endpoint.href,
            {
                title: params.title,
                icon: params.icon,
                route: params.route,
            },
            {
                withCredentials: true,
            },
        );
    }

    public delete(id: string): Observable<ApiResponseWrapper<Menu>> {
        const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

        return this.client.delete<ApiResponseWrapper<Menu>>(endpoint.href, {
            withCredentials: true,
        });
    }
}
