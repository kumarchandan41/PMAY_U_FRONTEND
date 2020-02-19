import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatedisttcityReportComponent } from './statedisttcity-report.component';

describe('StatedisttcityReportComponent', () => {
  let component: StatedisttcityReportComponent;
  let fixture: ComponentFixture<StatedisttcityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatedisttcityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatedisttcityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
