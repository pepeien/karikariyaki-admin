import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { FileSelectorComponent } from './index.component';

// Bundles
import { MaterialBundle } from '@imports';

@NgModule({
	declarations: [FileSelectorComponent],
	imports: [CommonModule, MaterialBundle],
	exports: [FileSelectorComponent],
})
export class FileSelectorModule {}
