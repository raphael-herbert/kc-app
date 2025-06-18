import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, inject } from '@angular/core';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';

import { Departement } from '../../../core/models/departement.model';
import { DepartementListComponent } from '../departement-list/departement-list.component';
import { GeoService } from '../../../core/services/geo.service';
import { HttpRequestState } from '../../../shared/models/http-request-state.model';
import { RegionSearchComponent } from '../region-search/region-search.component';

@Component({
  selector: 'app-region-shell',
  standalone: true,
  imports: [
    AsyncPipe,
    DepartementListComponent,
    MatProgressSpinnerModule,
    MatToolbarModule,
    RegionSearchComponent,
    TranslateModule,
  ],
  templateUrl: './region-shell.component.html',
  styleUrl: './region-shell.component.scss',
})
export class RegionShellComponent {
  public regionSelected = new EventEmitter<string>();

  public departementsReq$: Observable<HttpRequestState<Departement[]>> = this.regionSelected.pipe(
    switchMap((region) =>
      this.geoService.getDepartementsByRegionCode(region).pipe(
        map((departements) => ({ value: departements, loading: false })),
        startWith({ value: [], loading: true }) 
      )
    ),
    startWith({ value: [], loading: false })
  );

  private geoService = inject(GeoService);
}
