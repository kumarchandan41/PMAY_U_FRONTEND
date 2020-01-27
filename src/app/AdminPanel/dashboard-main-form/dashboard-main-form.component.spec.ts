import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMainFormComponent } from './dashboard-main-form.component';

describe('DashboardMainFormComponent', () => {
  let component: DashboardMainFormComponent;
  let fixture: ComponentFixture<DashboardMainFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMainFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
