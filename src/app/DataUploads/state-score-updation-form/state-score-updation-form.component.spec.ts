import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateScoreUpdationFormComponent } from './state-score-updation-form.component';

describe('StateScoreUpdationFormComponent', () => {
  let component: StateScoreUpdationFormComponent;
  let fixture: ComponentFixture<StateScoreUpdationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateScoreUpdationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateScoreUpdationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
