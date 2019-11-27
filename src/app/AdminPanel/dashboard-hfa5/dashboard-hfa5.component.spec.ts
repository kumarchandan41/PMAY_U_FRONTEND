import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHFA5Component } from './dashboard-hfa5.component';

describe('DashboardHFA5Component', () => {
  let component: DashboardHFA5Component;
  let fixture: ComponentFixture<DashboardHFA5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHFA5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHFA5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
