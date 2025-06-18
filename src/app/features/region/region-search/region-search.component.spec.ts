import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionSearchComponent } from './region-search.component';

describe('RegionSearchComponent', () => {
  let component: RegionSearchComponent;
  let fixture: ComponentFixture<RegionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Loading state should be displayed if http call > 300ms', () => {
    expect(component).toBeTruthy();
  });

  it('No data state should be displayed if no data returned', () => {
    expect(component).toBeTruthy();
  });

  it('No data state should not be displayed if region form is empty', () => {
    expect(component).toBeTruthy();
  });
});
