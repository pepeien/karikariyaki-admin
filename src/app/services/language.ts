import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { Observable, ReplaySubject } from 'rxjs';
import { InHouseLang, LangKey, Langs } from 'karikarihelper';

// Services
import { SettingsService } from '@services';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    public static DEFAULT_LANGUAGE_ID: LangKey = 'ptBr';
    public static DEFAULT_LANGUAGE = Langs[LanguageService.DEFAULT_LANGUAGE_ID];

    private _languageSubject: ReplaySubject<InHouseLang>;
    private _languageObersavable: Observable<InHouseLang>;

    constructor(
        @Inject(DOCUMENT)
        private _document: Document,
        private _meta: Meta,
        private _settingsService: SettingsService,
    ) {
        this._languageSubject = new ReplaySubject<InHouseLang>();
        this._languageObersavable = this._languageSubject.asObservable();

        this._settingsService.settings.subscribe({
            next: (settings) => {
                if (!settings.language) {
                    return;
                }

                const nextLang = Langs[settings.language];

                if (!this._meta.getTag('charset')) {
                    this._meta.addTag({
                        charset: 'UTF-8',
                    });
                }

                const nextLangMetaName = nextLang['LANGUAGE_META_NAME'];

                if (nextLangMetaName) {
                    this._document.documentElement.lang = nextLangMetaName;
                }

                this._languageSubject.next(Langs[settings.language]);
            },
        });
    }

    public get language() {
        return this._languageObersavable;
    }
}
