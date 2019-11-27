import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelClssmainmasterComponent } from './excel-clssmainmaster.component';

describe('ExcelClssmainmasterComponent', () => {
  let component: ExcelClssmainmasterComponent;
  let fixture: ComponentFixture<ExcelClssmainmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelClssmainmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelClssmainmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
