import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { RegistryProductViewComponent } from './index.component';

// Modules
import { TableModule } from '@components';

// Bundles
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
	declarations: [RegistryProductViewComponent],
	imports: [CommonModule, FormsBundle, MaterialBundle, TableModule],
	exports: [RegistryProductViewComponent],
})
export class RegistryProductViewModule {}
