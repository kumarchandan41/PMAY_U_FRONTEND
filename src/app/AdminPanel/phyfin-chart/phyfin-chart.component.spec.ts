import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhyfinChartComponent } from './phyfin-chart.component';

describe('PhyfinChartComponent', () => {
  let component: PhyfinChartComponent;
  let fixture: ComponentFixture<PhyfinChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhyfinChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhyfinChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
