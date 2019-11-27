import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsPhyFinReportNewComponent } from './cons-phy-fin-report-new.component';

describe('ConsPhyFinReportNewComponent', () => {
  let component: ConsPhyFinReportNewComponent;
  let fixture: ComponentFixture<ConsPhyFinReportNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsPhyFinReportNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsPhyFinReportNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
