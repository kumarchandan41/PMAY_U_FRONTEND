import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelStatescoreComponent } from './excel-statescore.component';

describe('ExcelStatescoreComponent', () => {
  let component: ExcelStatescoreComponent;
  let fixture: ComponentFixture<ExcelStatescoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelStatescoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelStatescoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
