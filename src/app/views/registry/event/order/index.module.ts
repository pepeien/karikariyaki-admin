import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { RegistryEventOrderViewComponent } from './index.component';

// Modules
import { AutocompleteModule, TableModule } from '@components';

// Bundles
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
	declarations: [RegistryEventOrderViewComponent],
	imports: [AutocompleteModule, CommonModule, FormsBundle, MaterialBundle, TableModule],
	exports: [RegistryEventOrderViewComponent],
})
export class RegistryEventOrderViewModule {}