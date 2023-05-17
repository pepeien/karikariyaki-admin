import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { DialogComponent } from './index.component';

// Bundles
import { MaterialBundle } from '@imports';

@NgModule({
	declarations: [DialogComponent],
	imports: [CommonModule, MaterialBundle],
	exports: [DialogComponent],
})
export class DialogModule {}
