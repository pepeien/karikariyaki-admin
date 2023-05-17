import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { RegistryEventViewComponent } from './index.component';

// Modules
import { TableModule } from '@components';

// Bundles
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
	declarations: [RegistryEventViewComponent],
	imports: [CommonModule, FormsBundle, MaterialBundle, TableModule],
	exports: [RegistryEventViewComponent],
})
export class RegistryEventViewModule {}
