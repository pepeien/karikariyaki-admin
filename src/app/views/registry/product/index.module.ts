import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { RegistryProductViewComponent } from './index.component';

// Modules
import { AutocompleteModule, TableModule } from '@components';

// Bundles
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
	declarations: [RegistryProductViewComponent],
	imports: [AutocompleteModule, CommonModule, FormsBundle, MaterialBundle, TableModule],
	exports: [RegistryProductViewComponent],
})
export class RegistryProductViewModule {}
