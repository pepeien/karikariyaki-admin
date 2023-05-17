import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

// Interface
import { InHouseLang } from '@interfaces';

// Languages
import { LangKey, Langs } from '@langs';

// Services
import { SettingsService } from '@services';

@Injectable({ providedIn: 'root' })
export class LanguageService {
	public static DEFAULT_LANGUAGE_ID: LangKey = 'enUs';
	public static DEFAULT_LANGUAGE = Langs[LanguageService.DEFAULT_LANGUAGE_ID];

	private _languageSubject: ReplaySubject<InHouseLang>;
	private _languageObersavable: Observable<InHouseLang>;

	constructor(private _settingsService: SettingsService) {
		this._languageSubject = new ReplaySubject<InHouseLang>();
		this._languageObersavable = this._languageSubject.asObservable();

		this._settingsService.settings.subscribe({
			next: (settings) => {
				if (!settings.language) {
					return;
				}

				this._languageSubject.next(Langs[settings.language]);
			},
		});
	}

	public get language() {
		return this._languageObersavable;
	}
}
