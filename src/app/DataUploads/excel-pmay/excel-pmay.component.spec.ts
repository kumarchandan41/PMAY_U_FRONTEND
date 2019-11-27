import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelPMAYComponent } from './excel-pmay.component';

describe('ExcelPMAYComponent', () => {
  let component: ExcelPMAYComponent;
  let fixture: ComponentFixture<ExcelPMAYComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelPMAYComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelPMAYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
