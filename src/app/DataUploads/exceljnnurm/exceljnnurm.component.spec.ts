import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceljnnurmComponent } from './exceljnnurm.component';

describe('ExceljnnurmComponent', () => {
  let component: ExceljnnurmComponent;
  let fixture: ComponentFixture<ExceljnnurmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceljnnurmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceljnnurmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
