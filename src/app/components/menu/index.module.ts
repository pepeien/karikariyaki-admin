import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { MenuComponent } from './index.component';

@NgModule({
	declarations: [MenuComponent],
	imports: [CommonModule],
	providers: [],
	exports: [MenuComponent],
})
export class MenuModule {}
