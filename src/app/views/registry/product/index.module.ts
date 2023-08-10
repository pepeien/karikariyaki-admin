import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { RegistryProductViewComponent } from './index.component';

// Modules
import { AutocompleteModule, IngredientCreatorModule, TableModule } from '@components';

// Bundles
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
    declarations: [RegistryProductViewComponent],
    imports: [
        AutocompleteModule,
        CommonModule,
        FormsBundle,
        IngredientCreatorModule,
        MaterialBundle,
        TableModule,
    ],
    exports: [RegistryProductViewComponent],
})
export class RegistryProductViewModule {}
