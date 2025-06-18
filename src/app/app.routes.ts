import { Routes } from '@angular/router';

import { RegionShellComponent } from './features/region/region-shell/region-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: RegionShellComponent,
  },
  {
    path: 'departement',
    loadChildren: () =>
      import('./features/departement/departement.routes').then(m => m.departementRoutes)
  },
  {
    path: '404',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  {
    path: '**',
    redirectTo: '404'
  },
];
