import { NgModule, inject } from '@angular/core';
import { CanActivateFn, Router, RouterModule, Routes } from '@angular/router';
import { Menu, StringService } from 'karikarihelper';

// Views
import {
    HomeViewComponent,
    RegistryClientViewComponent,
    RegistryMenuViewComponent,
    RegistryOperatorViewComponent,
    RegistryProductViewComponent,
    RegistryEventViewComponent,
    RegistryEventOrderViewComponent,
    RegistryRealmViewComponent,
} from '@views';

// Services
import { MenuService } from '@services';

const menuGuard: CanActivateFn = (route, state) => {
    let ownsCredentials = false;

    const isRouteAccessible = (route: string, menuList: Menu[]) => {
        for (const menu of menuList) {
            if (menu.route === StringService.removeLeadingAndTrailingSlashes(route.trim())) {
                ownsCredentials = true;
            }

            if (menu.children) {
                isRouteAccessible(route, menu.children);
            }
        }
    };

    return new Promise<boolean>((resolve, reject) => {
        const menuService = inject(MenuService);
        const router = inject(Router);

        menuService.menu.subscribe({
            next: (menus) => {
                isRouteAccessible(state.url, menus);

                if (ownsCredentials === false) {
                    router.navigate(['']);
                }

                resolve(ownsCredentials);
            },
            error: () => {
                router.navigate(['']);

                resolve(false);
            },
        });
    });
};

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeViewComponent,
    },
    {
        path: 'registry',
        canActivate: [menuGuard],
        children: [
            {
                path: 'client',
                component: RegistryClientViewComponent,
            },
            {
                path: 'event',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        component: RegistryEventViewComponent,
                    },
                    {
                        path: 'order',
                        pathMatch: 'full',
                        component: RegistryEventOrderViewComponent,
                    },
                ],
            },
            {
                path: 'menu',
                pathMatch: 'full',
                component: RegistryMenuViewComponent,
            },
            {
                path: 'operator',
                pathMatch: 'full',
                component: RegistryOperatorViewComponent,
            },
            {
                path: 'product',
                pathMatch: 'full',
                component: RegistryProductViewComponent,
            },
            {
                path: 'realm',
                pathMatch: 'full',
                component: RegistryRealmViewComponent,
            },
        ],
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
