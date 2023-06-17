import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { IngredientSelectorComponent } from './index.component';

// Imports
import { FormsBundle, MaterialBundle } from '@imports';
import { AutocompleteModule } from '../autocomplete';

@NgModule({
	declarations: [IngredientSelectorComponent],
	imports: [AutocompleteModule, CommonModule, FormsBundle, MaterialBundle],
	exports: [IngredientSelectorComponent],
})
export class IngredientSelectorModule {}
