import { Component, OnInit } from '@angular/core';

// Service
import { OperatorService } from '@services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	public isLoggedIn = false;

	constructor(private _operatorService: OperatorService) {}

	ngOnInit(): void {
		this._operatorService.operator.subscribe({
			next: (currentOperator) => {
				if (!currentOperator) {
					this.isLoggedIn = false;

					return;
				}

				this.isLoggedIn = true;
			},
			error: () => {
				this.isLoggedIn = false;
			},
		});
	}
}
