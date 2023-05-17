import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Service
import { LanguageService } from '@services';

export interface DialogProps {
	message: string;
}

@Component({
	selector: 'app-dialog',
	templateUrl: 'index.component.html',
})
export class DialogComponent implements OnInit {
	/**
	 * Props
	 */
	public message: string | undefined;

	/**
	 * Language
	 */
	public languageSource = LanguageService.DEFAULT_LANGUAGE;

	constructor(
		public dialogRef: MatDialogRef<DialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: DialogProps,
		private _languageService: LanguageService,
	) {
		if (data.message) {
			this.message = data.message;
		}
	}

	ngOnInit(): void {
		this._languageService.language.subscribe({
			next: (nextLanguage) => {
				this.languageSource = nextLanguage;
			},
		});
	}
}
