import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { DepartementShellComponent } from './departement-shell.component';

describe('DepartementShellComponent', () => {
  let component: DepartementShellComponent;
  let fixture: ComponentFixture<DepartementShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DepartementShellComponent,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              communes: [
                { nom: 'Commune 1', code: '001' },
                { nom: 'Commune 2', code: '002' },
              ]
            })
          }
        },
        {
          provide: Router,
          useValue: {
            getCurrentNavigation: () => ({
              extras: {
                state: {
                  departement: {
                    nom: 'Seine-Maritime',
                    code: '76'
                  }
                }
              }
            })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartementShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
