import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Commune } from '../models/commune.model';
import { Departement } from '../models/departement.model';
import { Region } from '../models/region.model';

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  private readonly BASE_URL = 'https://geo.api.gouv.fr';

  private http = inject(HttpClient);

  searchRegions(name: string): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.BASE_URL}/regions`, {
      params: { nom: name },
    });
  }

  getDepartementsByRegionCode(codeRegion: string): Observable<Departement[]> {
    return this.http.get<Departement[]>(`${this.BASE_URL}/regions/${codeRegion}/departements`);
  }

  getCommunesByDepartementCode(codeDepartement: string): Observable<Commune[]> {
    return this.http.get<Commune[]>(`${this.BASE_URL}/departements/${codeDepartement}/communes`);
  }
}