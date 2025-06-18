import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionShellComponent } from './region-shell.component';

describe('RegionShellComponent', () => {
  let component: RegionShellComponent;
  let fixture: ComponentFixture<RegionShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
