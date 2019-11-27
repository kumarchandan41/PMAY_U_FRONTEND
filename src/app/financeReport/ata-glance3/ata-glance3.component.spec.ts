import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaGlance3Component } from './ata-glance3.component';

describe('AtaGlance3Component', () => {
  let component: AtaGlance3Component;
  let fixture: ComponentFixture<AtaGlance3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtaGlance3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtaGlance3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
