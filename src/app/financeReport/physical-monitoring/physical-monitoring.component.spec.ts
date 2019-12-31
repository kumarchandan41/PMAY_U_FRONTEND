import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalMonitoringComponent } from './physical-monitoring.component';

describe('PhysicalMonitoringComponent', () => {
  let component: PhysicalMonitoringComponent;
  let fixture: ComponentFixture<PhysicalMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
