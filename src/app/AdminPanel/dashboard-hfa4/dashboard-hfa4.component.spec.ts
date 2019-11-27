import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHFA4Component } from './dashboard-hfa4.component';

describe('DashboardHFA4Component', () => {
  let component: DashboardHFA4Component;
  let fixture: ComponentFixture<DashboardHFA4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHFA4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHFA4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
