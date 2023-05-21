import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { AutocompleteComponent } from './index.component';

// Imports
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
	declarations: [AutocompleteComponent],
	imports: [CommonModule, FormsBundle, MaterialBundle],
	exports: [AutocompleteComponent],
})
export class AutocompleteModule {}
