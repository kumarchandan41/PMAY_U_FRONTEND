import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaGlanceComponent } from './ata-glance.component';

describe('AtaGlanceComponent', () => {
  let component: AtaGlanceComponent;
  let fixture: ComponentFixture<AtaGlanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtaGlanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtaGlanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
