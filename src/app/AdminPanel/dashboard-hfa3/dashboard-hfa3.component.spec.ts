import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHFA3Component } from './dashboard-hfa3.component';

describe('DashboardHFA3Component', () => {
  let component: DashboardHFA3Component;
  let fixture: ComponentFixture<DashboardHFA3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHFA3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHFA3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
