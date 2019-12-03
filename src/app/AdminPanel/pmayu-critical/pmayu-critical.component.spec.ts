import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMAYuCriticalComponent } from './pmayu-critical.component';

describe('PMAYuCriticalComponent', () => {
  let component: PMAYuCriticalComponent;
  let fixture: ComponentFixture<PMAYuCriticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMAYuCriticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMAYuCriticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
