import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home-page',
        pathMatch: 'full'
    },
    {
        path: 'home-page',
        loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
      path: '**',
      redirectTo: '/home-page',
      pathMatch: 'full'
    }

];