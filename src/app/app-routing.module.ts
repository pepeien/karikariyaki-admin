import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Views
import {
	HomeViewComponent,
	RegistryMenuViewComponent,
	RegistryOperatorViewComponent,
	RegistryProductViewComponent,
	RegistryProductVariantViewComponent,
	RegistryEventViewComponent,
	RegistryEventOrderViewComponent,
} from '@views';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: HomeViewComponent,
	},
	{
		path: 'registry',
		children: [
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
				children: [
					{
						path: '',
						pathMatch: 'full',
						component: RegistryProductViewComponent,
					},
					{
						path: 'variant',
						pathMatch: 'full',
						component: RegistryProductVariantViewComponent,
					},
				],
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
