import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelDemandCityWiseComponent } from './excel-demand-city-wise.component';

describe('ExcelDemandCityWiseComponent', () => {
  let component: ExcelDemandCityWiseComponent;
  let fixture: ComponentFixture<ExcelDemandCityWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelDemandCityWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelDemandCityWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
