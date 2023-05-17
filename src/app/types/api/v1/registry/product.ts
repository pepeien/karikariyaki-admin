import { Observable } from 'rxjs';
import {
	ApiResponseWrapper,
	Product,
	ProductCreatableParams,
	ProductEditableParams,
	ProductQueryableParams,
} from 'karikarihelper';

// Types
import { BaseApi } from '@types';

export class ProductRegistryApiV1 extends BaseApi {
	private _endpoint = `${this.root}/v1/admin/registry/product`;

	public search(params?: ProductQueryableParams): Observable<ApiResponseWrapper<Product[]>> {
		const endpoint = new URL(this._endpoint);

		if (params?._id) {
			endpoint.searchParams.append('id', params._id.trim());
		}

		if (params?.name) {
			endpoint.searchParams.append('name', params.name.trim());
		}

		return this.client.get<ApiResponseWrapper<Product[]>>(endpoint.href, {
			withCredentials: true,
		});
	}

	public save(params: ProductCreatableParams): Observable<ApiResponseWrapper<Product>> {
		const endpoint = new URL(this._endpoint);

		return this.client.post<ApiResponseWrapper<Product>>(
			endpoint.href,
			{
				name: params.name,
			},
			{
				withCredentials: true,
			},
		);
	}

	public edit(
		id: string,
		params: ProductEditableParams,
	): Observable<ApiResponseWrapper<Product>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.patch<ApiResponseWrapper<Product>>(
			endpoint.href,
			{
				name: params.name,
			},
			{
				withCredentials: true,
			},
		);
	}

	public delete(id: string): Observable<ApiResponseWrapper<Product>> {
		const endpoint = new URL(`${this._endpoint}/${id.trim()}`);

		return this.client.delete<ApiResponseWrapper<Product>>(endpoint.href, {
			withCredentials: true,
		});
	}
}
