import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Operator } from 'karikarihelper';

// Services
import { ApiService } from '@services';

@Injectable({ providedIn: 'root' })
export class OperatorService {
	/**
	 * Primitives
	 */
	private _isFetching = false;

	/**
	 * In House
	 */
	private _operator: Operator | null;
	private _operatorSubject: ReplaySubject<Operator | null>;
	private _operatorObersavable: Observable<Operator | null>;

	constructor(private _apiService: ApiService) {
		this._operator = null;

		this._operatorSubject = new ReplaySubject<Operator | null>();
		this._operatorObersavable = this._operatorSubject.asObservable();
	}

	public get operator() {
		if (!this._operator && this._isFetching === false) {
			this._isFetching = true;

			this._apiService.V1.operatorRegistry.searchSelf().subscribe({
				next: (response) => {
					if (response.wasSuccessful === false || !response.result) {
						return;
					}

					this._operator = response.result;

					this.update();

					this._isFetching = false;
				},
				error: () => {
					this._operator = null;

					this.update();

					this._isFetching = false;
				},
			});
		}

		return this._operatorObersavable;
	}

	public update() {
		if (this._operatorSubject.closed) {
			return;
		}

		this._operatorSubject.next(this._operator);
	}

	public signIn(operator: Operator) {
		if (!operator) {
			return;
		}

		if (this._operatorSubject.closed) {
			this._onInit();
		}

		this._operator = operator;

		this.update();
	}

	public signOut() {
		this._apiService.V1.operatorAdmin.signOut().subscribe({
			next: () => {
				this._onCleanUp();
			},
			error: () => {
				this._onCleanUp();
			},
		});
	}

	private _onCleanUp() {
		this._operator = null;

		this.update();
	}

	private _onInit() {
		this._operatorSubject = new ReplaySubject<Operator | null>();

		this._operatorObersavable = this._operatorSubject.asObservable();
	}
}
