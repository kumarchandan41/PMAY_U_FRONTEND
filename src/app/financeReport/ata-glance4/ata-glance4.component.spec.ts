import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaGlance4Component } from './ata-glance4.component';

describe('AtaGlance4Component', () => {
  let component: AtaGlance4Component;
  let fixture: ComponentFixture<AtaGlance4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtaGlance4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtaGlance4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
