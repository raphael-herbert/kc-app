import { Component, input, InputSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { Departement } from '../../../core/models/departement.model';

@Component({
  selector: 'app-departement-list',
  standalone: true,
  imports: [MatCardModule, RouterModule],
  templateUrl: './departement-list.component.html',
  styleUrl: './departement-list.component.scss'
})
export class DepartementListComponent {
  public data: InputSignal<Departement[]> = input.required();
}
