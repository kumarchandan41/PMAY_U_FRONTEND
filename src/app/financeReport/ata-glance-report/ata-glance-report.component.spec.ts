import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaGlanceReportComponent } from './ata-glance-report.component';

describe('AtaGlanceReportComponent', () => {
  let component: AtaGlanceReportComponent;
  let fixture: ComponentFixture<AtaGlanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtaGlanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtaGlanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
