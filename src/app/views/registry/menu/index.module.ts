import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { RegistryMenuViewComponent } from './index.component';

// Modules
import { AutocompleteModule, FileSelectorModule, TableModule } from '@components';

// Bundles
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
    declarations: [RegistryMenuViewComponent],
    imports: [
        AutocompleteModule,
        CommonModule,
        FileSelectorModule,
        FormsBundle,
        MaterialBundle,
        TableModule,
    ],
    exports: [RegistryMenuViewComponent],
})
export class RegistryMenuViewModule {}
