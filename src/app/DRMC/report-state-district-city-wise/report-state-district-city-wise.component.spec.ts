import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStateDistrictCityWiseComponent } from './report-state-district-city-wise.component';

describe('ReportStateDistrictCityWiseComponent', () => {
  let component: ReportStateDistrictCityWiseComponent;
  let fixture: ComponentFixture<ReportStateDistrictCityWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStateDistrictCityWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStateDistrictCityWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
