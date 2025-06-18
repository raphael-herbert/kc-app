import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map, Observable } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';

import { Commune } from '../../../core/models/commune.model';
import { CommuneListComponent } from '../commune-list/commune-list.component';
import { Departement } from '../../../core/models/departement.model';

@Component({
  selector: 'app-departement-shell',
  standalone: true,
  imports: [
    AsyncPipe,
    CommuneListComponent,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    TranslateModule,
    RouterModule,
  ],
  templateUrl: './departement-shell.component.html',
  styleUrl: './departement-shell.component.scss',
})
export class DepartementShellComponent {
  public departement: Departement =
    inject(Router).getCurrentNavigation()?.extras.state?.['departement'];

  public communes$: Observable<Commune[]> = inject(ActivatedRoute).data.pipe(
    map((data) => data['communes'])
  );
}
