import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CommuneListComponent } from './commune-list.component';

describe('CommuneListComponent', () => {
  let component: CommuneListComponent;
  let fixture: ComponentFixture<CommuneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommuneListComponent,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommuneListComponent);
    component = fixture.componentInstance
    const componentRef = fixture.componentRef
    componentRef.setInput('data', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
