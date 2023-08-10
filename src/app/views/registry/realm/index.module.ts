import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { RegistryRealmViewComponent } from './index.component';

// Modules
import { TableModule } from '@components';

// Bundles
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
    declarations: [RegistryRealmViewComponent],
    imports: [CommonModule, FormsBundle, MaterialBundle, TableModule],
    exports: [RegistryRealmViewComponent],
})
export class RegistryRealmViewModule {}
