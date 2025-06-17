import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';

import { GeoService } from '../../../core/services/geo.service';
import { RegionSearchComponent } from '../region-search/region-search.component';
import { DepartementListComponent } from "../departement-list/departement-list.component";

@Component({
  selector: 'app-region-shell',
  standalone: true,
  imports: [AsyncPipe, TranslateModule, MatToolbarModule, RegionSearchComponent, DepartementListComponent],
  templateUrl: './region-shell.component.html',
  styleUrl: './region-shell.component.scss'
})
export class RegionShellComponent {
  public regionSelected = signal<string>('');

  public departements = [];

  private geoService = inject(GeoService);
}
