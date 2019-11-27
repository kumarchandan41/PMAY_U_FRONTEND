import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMAYuCompWiseComponent } from './pmayu-comp-wise.component';

describe('PMAYuCompWiseComponent', () => {
  let component: PMAYuCompWiseComponent;
  let fixture: ComponentFixture<PMAYuCompWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMAYuCompWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMAYuCompWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
