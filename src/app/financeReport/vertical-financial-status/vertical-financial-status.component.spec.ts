import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalFinancialStatusComponent } from './vertical-financial-status.component';

describe('VerticalFinancialStatusComponent', () => {
  let component: VerticalFinancialStatusComponent;
  let fixture: ComponentFixture<VerticalFinancialStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalFinancialStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalFinancialStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
