import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalMonitoringComponent } from './critical-monitoring.component';

describe('CriticalMonitoringComponent', () => {
  let component: CriticalMonitoringComponent;
  let fixture: ComponentFixture<CriticalMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticalMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
