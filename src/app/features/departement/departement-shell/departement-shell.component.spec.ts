import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartementShellComponent } from './departement-shell.component';

describe('DepartementShellComponent', () => {
  let component: DepartementShellComponent;
  let fixture: ComponentFixture<DepartementShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartementShellComponent]
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
