import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

import { GeoService } from '../../../core/services/geo.service';
import { HttpRequestState } from '../../../shared/models/http-request-state.model';
import { Region } from '../../../core/models/region.model';

@Component({
  selector: 'app-region-search',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './region-search.component.html',
  styleUrl: './region-search.component.scss'
})
export class RegionSearchComponent {
  @Output() public regionSelected = new EventEmitter<string>();

  public regionForm = new FormControl<string>('', { nonNullable: true });

  public suggestionsReq$: Observable<HttpRequestState<Region[]>> =
    this.regionForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((region) =>
        this.geoService.searchRegions(region).pipe(
          map((regions) => ({ value: regions, loading: false })),
          startWith({ value: [], loading: true })
        )
      )
  );

  private geoService = inject(GeoService);
}
