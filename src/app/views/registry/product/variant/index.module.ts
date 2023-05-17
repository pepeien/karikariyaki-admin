import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { RegistryProductVariantViewComponent } from './index.component';

// Modules
import { TableModule } from '@components';

// Bundles
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
	declarations: [RegistryProductVariantViewComponent],
	imports: [CommonModule, FormsBundle, MaterialBundle, TableModule],
	exports: [RegistryProductVariantViewComponent],
})
export class RegistryProductVariantViewModule {}
