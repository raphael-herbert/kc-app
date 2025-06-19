import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { map, of, timer } from 'rxjs';

import { GeoService } from '../../../core/services/geo.service';
import { RegionSearchComponent } from './region-search.component';

describe('RegionSearchComponent', () => {
  let component: RegionSearchComponent;
  let fixture: ComponentFixture<RegionSearchComponent>;
  let geoServiceMock: jasmine.SpyObj<GeoService>;

  beforeEach(async () => {
    geoServiceMock = jasmine.createSpyObj('GeoService', ['searchRegions']);

    await TestBed.configureTestingModule({
      imports: [
        RegionSearchComponent,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [{ provide: GeoService, useValue: geoServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('suggestions should be undefined initially', () => {
    const observerSpy = subscribeSpyTo(component.suggestionsReq$);
    expect(observerSpy.getLastValue()).toBeUndefined();
  });

  it('suggestion should react to region form value setting', fakeAsync(() => {
    const retValue = { code: '00', nom: 'Normandie' };
    const observerSpy = subscribeSpyTo(component.suggestionsReq$);
    geoServiceMock.searchRegions.and.returnValue(of([retValue]));

    component.regionForm.setValue('Normandie');

    tick(350); // > debounceTime
    fixture.detectChanges();

    expect(observerSpy.getLastValue()?.value).toEqual([retValue]);
  }));

  it('should show loading after 300ms if request is pending', fakeAsync(() => {
    const retValue = { code: '00', nom: 'Normandie' };
    const observerSpy = subscribeSpyTo(component.vm$);
    geoServiceMock.searchRegions.and.returnValue(
      timer(500).pipe(map(() => [retValue]))
    );

    component.regionForm.setValue('Normandie');

    tick(500); // < debounceTime + API call
    fixture.detectChanges();

    expect(observerSpy.getLastValue()).toBeUndefined();

    tick(250); // > debounceTime + API call
    fixture.detectChanges();

    expect(observerSpy.getLastValue()).toBeDefined();

    discardPeriodicTasks();
  }));

  it('should show noData if no regions found and form has value', fakeAsync(() => {
    const observerSpy = subscribeSpyTo(component.vm$);
    geoServiceMock.searchRegions.and.returnValue(of([]));

    component.regionForm.setValue('Normandie');

    tick(350); // > debounceTime
    fixture.detectChanges();

    expect(observerSpy.getLastValue()?.noData).toBeTruthy();
  }));
});
