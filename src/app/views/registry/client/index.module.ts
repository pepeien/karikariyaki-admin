import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { RegistryClientViewComponent } from './index.component';

// Modules
import { AutocompleteModule, FileSelectorModule, TableModule } from '@components';

// Bundles
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
    declarations: [RegistryClientViewComponent],
    imports: [
        AutocompleteModule,
        CommonModule,
        FileSelectorModule,
        FormsBundle,
        MaterialBundle,
        TableModule,
    ],
    exports: [RegistryClientViewComponent],
})
export class RegistryClientViewModule {}
