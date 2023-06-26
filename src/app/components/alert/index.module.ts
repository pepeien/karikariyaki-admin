import { NgModule } from '@angular/core';

// Components
import { AlertComponent } from './index.component';

// Imports
import { MaterialBundle } from '@imports';

@NgModule({
	declarations: [AlertComponent],
	imports: [MaterialBundle],
	exports: [AlertComponent],
})
export class AlertComponentModule {}
