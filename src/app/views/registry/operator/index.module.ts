import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { RegistryOperatorViewComponent } from './index.component';

// Modules
import { FileSelectorModule, TableModule } from '@components';

// Bundles
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
	declarations: [RegistryOperatorViewComponent],
	imports: [CommonModule, FileSelectorModule, FormsBundle, MaterialBundle, TableModule],
	exports: [RegistryOperatorViewComponent],
})
export class RegistryOperatorViewModule {}
