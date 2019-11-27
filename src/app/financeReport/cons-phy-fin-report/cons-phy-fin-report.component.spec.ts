import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsPhyFinReportComponent } from './cons-phy-fin-report.component';

describe('ConsPhyFinReportComponent', () => {
  let component: ConsPhyFinReportComponent;
  let fixture: ComponentFixture<ConsPhyFinReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsPhyFinReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsPhyFinReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
