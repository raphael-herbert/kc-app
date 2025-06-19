import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

import { DepartementListComponent } from './departement-list.component';

describe('DepartementListComponent', () => {
  let component: DepartementListComponent;
  let fixture: ComponentFixture<DepartementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DepartementListComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartementListComponent);
    component = fixture.componentInstance;
    const componentRef = fixture.componentRef
    componentRef.setInput('data', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
