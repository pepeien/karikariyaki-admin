import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { NavbarComponent } from './index.component';

// Modules
import { AvatarModule, LogoModule, MenuModule } from '@components';
import { RealmLogoModule } from '../realm-logo';

// Imports
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
    declarations: [NavbarComponent],
    imports: [
        AvatarModule,
        CommonModule,
        FormsBundle,
        LogoModule,
        MaterialBundle,
        MenuModule,
        RealmLogoModule,
    ],
    exports: [NavbarComponent],
})
export class NavbarModule {}
