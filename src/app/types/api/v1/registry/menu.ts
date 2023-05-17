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

export class MenuRegistryApiV1 extends BaseApi {
	private _endpoint = `${this.root}/v1/admin/registry/menu`;

	public search(params?: MenuQueryableParams): Observable<ApiResponseWrapper<Menu[]>> {
		const endpoint = new URL(this._endpoint);

		if (params?._id) {
			endpoint.searchParams.append('id', params._id.trim());
		}

		if (params?.realm) {
			endpoint.searchParams.append('realm', params.realm.trim());
		}

		if (params?.title) {
			endpoint.searchParams.append('title', params.title.trim());
		}

		if (params?.parentId) {
			endpoint.searchParams.append('parentId', params.parentId.trim());
		}

		if (params?.isRootOnly) {
			endpoint.searchParams.append('isRootOnly', params.isRootOnly ? 'true' : 'false');
		}

		return this.client.get<ApiResponseWrapper<Menu[]>>(endpoint.href, {
			withCredentials: true,
		});
	}

	public realms(): Observable<ApiResponseWrapper<string[]>> {
		const endpoint = new URL(this._endpoint + '/realms');

		return this.client.get<ApiResponseWrapper<string[]>>(endpoint.href, {
			withCredentials: true,
		});
	}

	public searchSelf(): Observable<ApiResponseWrapper<Menu[]>> {
		const endpoint = new URL(this._endpoint + '/self');

		return this.client.get<ApiResponseWrapper<Menu[]>>(endpoint.href, {
			withCredentials: true,
		});
	}

	public save(params: MenuCreatableParams): Observable<ApiResponseWrapper<Menu>> {
		const endpoint = new URL(this._endpoint);

		return this.client.post<ApiResponseWrapper<Menu>>(
			endpoint.href,
			{
				realm: params.realm,
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
				realm: params.realm,
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
