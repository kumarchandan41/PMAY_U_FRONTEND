import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Statescore1Component } from './statescore1.component';

describe('Statescore1Component', () => {
  let component: Statescore1Component;
  let fixture: ComponentFixture<Statescore1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Statescore1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Statescore1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
