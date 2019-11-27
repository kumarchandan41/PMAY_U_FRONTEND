import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStateWiseComponent } from './report-state-wise.component';

describe('ReportStateWiseComponent', () => {
  let component: ReportStateWiseComponent;
  let fixture: ComponentFixture<ReportStateWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStateWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStateWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
