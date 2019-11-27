import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDistrictWiseComponent } from './report-district-wise.component';

describe('ReportDistrictWiseComponent', () => {
  let component: ReportDistrictWiseComponent;
  let fixture: ComponentFixture<ReportDistrictWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDistrictWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDistrictWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
