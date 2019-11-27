import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalHousesStatusComponent } from './vertical-houses-status.component';

describe('VerticalHousesStatusComponent', () => {
  let component: VerticalHousesStatusComponent;
  let fixture: ComponentFixture<VerticalHousesStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalHousesStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalHousesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
