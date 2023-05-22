import { Observable } from 'rxjs';
import {
	ApiResponseWrapper,
	Realm,
	RealmCreatableParams,
	RealmEditableParams,
	RealmQueryableParams,
} from 'karikarihelper';

// Types
import { BaseApi } from '@types';

export class RealmRegistryApiV1 extends BaseApi {
	private _endpoint = `${this.root}/v1/admin/registry/realm`;

	public search(params?: RealmQueryableParams): Observable<ApiResponseWrapper<Realm[]>> {
		const endpoint = new URL(this._endpoint);

		if (params?.id) {
			endpoint.searchParams.append('id', params.id.trim());
		}

		if (params?.name) {
			endpoint.searchParams.append('name', params?.name.trim());
		}

		return this.client.get<ApiResponseWrapper<Realm[]>>(endpoint.href, {
			withCredentials: true,
		});
	}

	public save(params: RealmCreatableParams): Observable<ApiResponseWrapper<Realm>> {
		const endpoint = new URL(this._endpoint);

		return this.client.post<ApiResponseWrapper<Realm>>(
			endpoint.href,
			{
				name: params.name,
			},
			{
				withCredentials: true,
			},
		);
	}

	public edit(id: string, params: RealmEditableParams): Observable<ApiResponseWrapper<Realm>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.patch<ApiResponseWrapper<Realm>>(
			endpoint.href,
			{
				name: params.name,
			},
			{
				withCredentials: true,
			},
		);
	}

	public delete(id: string): Observable<ApiResponseWrapper<Realm>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.delete<ApiResponseWrapper<Realm>>(endpoint.href, {
			withCredentials: true,
		});
	}
}
