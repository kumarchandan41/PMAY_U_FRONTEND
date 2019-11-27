import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaGlance5Component } from './ata-glance5.component';

describe('AtaGlance5Component', () => {
  let component: AtaGlance5Component;
  let fixture: ComponentFixture<AtaGlance5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtaGlance5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtaGlance5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
