import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

// Types
import { InHouseSettings } from '@interfaces';

// Service
import { LanguageService } from '@services';

@Injectable({ providedIn: 'root' })
export class SettingsService {
	private _state: InHouseSettings | null;
	private _subject: ReplaySubject<InHouseSettings>;
	private _observable: Observable<InHouseSettings>;

	constructor() {
		this._state = null;

		this._subject = new ReplaySubject<InHouseSettings>();
		this._observable = this._subject.asObservable();
	}

	public get settings() {
		if (!this._state) {
			const localSettings = JSON.parse(
				window.localStorage.getItem('kk_yaki_settings') ?? 'null',
			);

			if (!localSettings) {
				this.update(this._getDefaultSettings());
			} else {
				this.update(localSettings);
			}
		}

		return this._observable;
	}

	public update(nextState: InHouseSettings) {
		if (this._subject.closed) {
			return;
		}

		this._state = {
			...this._state,
			...nextState,
		};

		window.localStorage.setItem('kk_yaki_settings', JSON.stringify(this._state));

		this._subject.next(this._state);
	}

	private _getDefaultSettings(): InHouseSettings {
		return {
			language: LanguageService.DEFAULT_LANGUAGE_ID,
		};
	}
}
