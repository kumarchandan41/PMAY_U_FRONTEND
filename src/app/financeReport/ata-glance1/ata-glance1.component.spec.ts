import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaGlance1Component } from './ata-glance1.component';

describe('AtaGlance1Component', () => {
  let component: AtaGlance1Component;
  let fixture: ComponentFixture<AtaGlance1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtaGlance1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtaGlance1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
