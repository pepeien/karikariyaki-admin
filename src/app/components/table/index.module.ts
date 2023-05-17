import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { TableComponent } from './index.component';

// Modules
import { MaterialBundle } from '@imports';

@NgModule({
	declarations: [TableComponent],
	imports: [CommonModule, MaterialBundle],
	exports: [TableComponent],
})
export class TableModule {}
