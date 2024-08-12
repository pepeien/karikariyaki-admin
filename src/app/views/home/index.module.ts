import { NgModule } from '@angular/core';

// Components
import { HomeViewComponent } from './index.component';

// Modules
import { CommonModule } from '@angular/common';
import { ChartModule, TableModule } from '@components';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaterialBundle } from '@imports';

@NgModule({
    declarations: [HomeViewComponent],
    imports: [CommonModule, ChartModule, MatDatepickerModule, MaterialBundle, TableModule],
    exports: [HomeViewComponent],
})
export class HomeViewModule {}
