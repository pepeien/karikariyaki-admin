import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

// Types
import { InHouseAlert } from '@interfaces';

@Component({
	selector: 'app-alert-logo',
	templateUrl: './index.component.html',
})
export class AlertComponent {
	constructor(
		@Inject(MAT_SNACK_BAR_DATA)
		public data: InHouseAlert,
		public ref: MatSnackBarRef<AlertComponent>,
	) {}
}
