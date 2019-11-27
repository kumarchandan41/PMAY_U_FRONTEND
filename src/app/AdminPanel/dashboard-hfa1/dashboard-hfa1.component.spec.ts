import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHFA1Component } from './dashboard-hfa1.component';

describe('DashboardHFA1Component', () => {
  let component: DashboardHFA1Component;
  let fixture: ComponentFixture<DashboardHFA1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHFA1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHFA1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
