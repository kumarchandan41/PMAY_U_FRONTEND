import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelCLSSCityMainComponent } from './excel-clsscity-main.component';

describe('ExcelCLSSCityMainComponent', () => {
  let component: ExcelCLSSCityMainComponent;
  let fixture: ComponentFixture<ExcelCLSSCityMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelCLSSCityMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelCLSSCityMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
