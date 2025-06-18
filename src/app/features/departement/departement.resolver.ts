import { catchError, EMPTY } from 'rxjs';
import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';

import { Commune } from '../../core/models/commune.model';
import { GeoService } from '../../core/services/geo.service';

export const communesResolver: ResolveFn<Commune[]> = (route) => {
  const router = inject(Router);
  const geoService = inject(GeoService);
  const code = route.paramMap.get('code') ?? '';

  return geoService.getCommunesByDepartementCode(code).pipe(
    catchError(() => {
      router.navigate(['/404']);
      return EMPTY;
    })
  );
};
