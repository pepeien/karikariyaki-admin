import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { IngredientCreatorComponent } from './index.component';

// Imports
import { FormsBundle, MaterialBundle } from '@imports';
import { AutocompleteModule } from '../autocomplete';

@NgModule({
    declarations: [IngredientCreatorComponent],
    imports: [AutocompleteModule, CommonModule, FormsBundle, MaterialBundle],
    exports: [IngredientCreatorComponent],
})
export class IngredientCreatorModule {}
