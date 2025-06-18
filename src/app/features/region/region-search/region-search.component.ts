import { AsyncPipe, CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import {
  catchError,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
  timer,
} from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
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
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './region-search.component.html',
  styleUrl: './region-search.component.scss'
})
export class RegionSearchComponent implements AfterViewInit {

  @ViewChild('regionInput') regionInput!: ElementRef<HTMLInputElement>;

  public ngAfterViewInit(): void {
    this.regionInput.nativeElement.focus();
  }

  @Output() public regionSelected = new EventEmitter<string>();
  
  public regionForm = new FormControl<string>('', { nonNullable: true });

  public suggestionsReq$: Observable<HttpRequestState<Region[]>> = this.regionForm.valueChanges.pipe(
    distinctUntilChanged(),
    switchMap((region) => {
      if (!region) {
        return of({ value: [], loading: false });
      }
      return of(region).pipe(
        debounceTime(300),
        switchMap((debouncedRegion) =>
          this.geoService.searchRegions(debouncedRegion).pipe(
            map((regions) => ({ value: regions, loading: false })),
            startWith({ value: [], loading: true }),
            catchError((err: HttpErrorResponse) =>
              of({ value: [], loading: false, error: err })
            )
          )
        )
      );
    }),
    shareReplay(1)
  );

  /* avoid loading state flickering for fast networks */
  public delayedLoading$: Observable<boolean> = this.suggestionsReq$.pipe(
    switchMap((req) => {
      if (req.loading) {
        return timer(300).pipe(map(() => true));
      } else {
        return of(false);
      }
    })
  );

  public noData$: Observable<boolean> = this.suggestionsReq$.pipe(
    map((req) => 
      !req.loading &&
      !req.error &&
      req.value.length === 0 && 
      this.regionForm.value.length > 0
    )
  );

  /** view model */
  public vm$ = combineLatest([this.suggestionsReq$, this.delayedLoading$, this.noData$]).pipe(
    map(([req, loading, noData]) => ({ req, loading, noData }))
  );

  private geoService = inject(GeoService);
}
