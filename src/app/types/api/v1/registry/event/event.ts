import { Observable } from 'rxjs';
import {
	ApiResponseWrapper,
	Event,
	EventCreatableParams,
	EventEditableParams,
	EventQueryableParams,
} from 'karikarihelper';

// Types
import { BaseApi } from '@types';

export class ApiV1EventRegistry extends BaseApi {
	private _endpoint = `${this.root}/v1/admin/registry/event`;

	public search(params?: EventQueryableParams): Observable<ApiResponseWrapper<Event[]>> {
		const endpoint = new URL(this._endpoint);

		if (params?.id) {
			endpoint.searchParams.append('id', params.id.trim());
		}

		if (params?.name) {
			endpoint.searchParams.append('name', params.name.trim());
		}

		if (params?.date) {
			endpoint.searchParams.append('date', params.date.toString());
		}

		return this.client.get<ApiResponseWrapper<Event[]>>(endpoint.href, {
			withCredentials: true,
		});
	}

	public save(params: EventCreatableParams): Observable<ApiResponseWrapper<Event>> {
		const endpoint = new URL(this._endpoint);

		return this.client.post<ApiResponseWrapper<Event>>(
			endpoint.href,
			{
				name: params.name,
				date: params.date,
			},
			{
				withCredentials: true,
			},
		);
	}

	public edit(id: string, params: EventEditableParams): Observable<ApiResponseWrapper<Event>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.patch<ApiResponseWrapper<Event>>(
			endpoint.href,
			{
				name: params.name,
			},
			{
				withCredentials: true,
			},
		);
	}

	public delete(id: string): Observable<ApiResponseWrapper<Event>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.delete<ApiResponseWrapper<Event>>(endpoint.href, {
			withCredentials: true,
		});
	}
}
