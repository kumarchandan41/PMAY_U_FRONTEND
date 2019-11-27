import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelPhyDashboardComponent } from './excel-phy-dashboard.component';

describe('ExcelPhyDashboardComponent', () => {
  let component: ExcelPhyDashboardComponent;
  let fixture: ComponentFixture<ExcelPhyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelPhyDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelPhyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
