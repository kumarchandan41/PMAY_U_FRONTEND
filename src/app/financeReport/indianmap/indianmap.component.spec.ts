import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndianmapComponent } from './indianmap.component';

describe('IndianmapComponent', () => {
  let component: IndianmapComponent;
  let fixture: ComponentFixture<IndianmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndianmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndianmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
