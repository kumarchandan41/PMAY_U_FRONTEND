import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortfallDetailComponent } from './shortfall-detail.component';

describe('ShortfallDetailComponent', () => {
  let component: ShortfallDetailComponent;
  let fixture: ComponentFixture<ShortfallDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortfallDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortfallDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
