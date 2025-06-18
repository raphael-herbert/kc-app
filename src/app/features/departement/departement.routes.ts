import { Routes } from '@angular/router';

import { communesResolver } from './departement.resolver';
import { DepartementShellComponent } from './departement-shell/departement-shell.component';

export const departementRoutes: Routes = [
  {
    path: ':code',
    component: DepartementShellComponent,
    resolve: {
      communes: communesResolver
    }
  }
];