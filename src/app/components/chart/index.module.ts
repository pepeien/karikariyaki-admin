import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ChartComponent } from './index.component';

// Imports
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
    declarations: [ChartComponent],
    imports: [CommonModule, FormsBundle, MaterialBundle],
    exports: [ChartComponent],
})
export class ChartModule {}
