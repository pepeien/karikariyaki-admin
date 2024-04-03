import { NgModule } from '@angular/core';

// Components
import { HomeViewComponent } from './index.component';

// Modules
import { CommonModule } from '@angular/common';
import { ChartModule } from '@components';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaterialBundle } from '@imports';

@NgModule({
    declarations: [HomeViewComponent],
    imports: [CommonModule, ChartModule, MatDatepickerModule, MaterialBundle],
    exports: [HomeViewComponent],
})
export class HomeViewModule {}
