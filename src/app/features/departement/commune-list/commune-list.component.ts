import { AfterViewInit, Component, computed, input, InputSignal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';

import { Commune } from '../../../core/models/commune.model';

@Component({
  selector: 'app-commune-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, TranslateModule],
  templateUrl: './commune-list.component.html',
  styleUrl: './commune-list.component.scss',
})
export class CommuneListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public data: InputSignal<Commune[] | null> = input.required();
  public displayedColumns: string[] = ['nom', 'code', 'population'];
  public dataSource = computed(() =>  new MatTableDataSource<Commune>(this.data() ?? []));

  public ngAfterViewInit() {
    this.dataSource().paginator = this.paginator;
  }
}
