import { HttpClient } from '@angular/common/http';

// Envs
import { environment } from 'src/environments/environment';

export class BaseApi {
	protected root = environment.rootURI;

	protected client: HttpClient;

	constructor(client: HttpClient) {
		this.root = this.root.replace(/\/+$/, '');

		this.client = client;
	}
}
