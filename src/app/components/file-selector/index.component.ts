import { Component, Input, OnInit } from '@angular/core';

// Animations
import { BasicAnimations } from '@animations';

// Enums
import { FileType, FileTypes } from '@enums';

// Services
import { LanguageService } from '@services';

@Component({
	selector: 'app-file-selector',
	templateUrl: './index.component.html',
	animations: [BasicAnimations.zoomAnimation],
})
export class FileSelectorComponent implements OnInit {
	@Input()
	public canUploadMultiple = false;
	@Input()
	public willDisplayFileList = true;
	@Input()
	public label: string | undefined;
	@Input()
	public fileTypes: FileType[] = [];
	@Input()
	public onFileUpload: ((files: File[]) => void) | undefined;

	/**
	 * File
	 */
	public uploadedFiles: File[] = [];

	/**
	 * In House
	 */
	public languageSource = LanguageService.DEFAULT_LANGUAGE;

	constructor(private _languageService: LanguageService) {}

	ngOnInit(): void {
		this._languageService.language.subscribe({
			next: (nextLang) => {
				this.languageSource = nextLang;
			},
		});
	}

	public onChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files as FileList;

		if (!files || files.length === 0) {
			return;
		}

		let filesArray = Array.from(files);

		if (this.fileTypes.length > 0) {
			filesArray = filesArray.filter((file) =>
				Object.values(FileTypes).find((fileType) => fileType.toString() === file.type),
			);
		}

		if (this.canUploadMultiple) {
			this.uploadedFiles = this.uploadedFiles.concat(filesArray);
		} else {
			this.uploadedFiles = filesArray;
		}

		if (this.onFileUpload) {
			this.onFileUpload(this.uploadedFiles);
		}
	}

	public fileTypesToSpacedString() {
		let result = '';

		this.fileTypes.forEach((fileType, index) => {
			if (index === this.fileTypes.length - 1) {
				result = result.concat(`.${fileType}`);

				return;
			}

			result = result.concat(`.${fileType},`);
		});

		return result;
	}
}
