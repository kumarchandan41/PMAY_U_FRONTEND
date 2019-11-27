import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisttMasterComponent } from './distt-master.component';

describe('DisttMasterComponent', () => {
  let component: DisttMasterComponent;
  let fixture: ComponentFixture<DisttMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisttMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisttMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
