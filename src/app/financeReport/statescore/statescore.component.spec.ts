import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatescoreComponent } from './statescore.component';

describe('StatescoreComponent', () => {
  let component: StatescoreComponent;
  let fixture: ComponentFixture<StatescoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatescoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatescoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
