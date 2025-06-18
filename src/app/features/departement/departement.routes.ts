import { Routes } from '@angular/router';

import { departementResolver } from './departement.resolver';
import { DepartementShellComponent } from './departement-shell/departement-shell.component';

export const departementRoutes: Routes = [
  {
    path: ':code',
    component: DepartementShellComponent,
    resolve: {
      departement: departementResolver
    }
  }
];