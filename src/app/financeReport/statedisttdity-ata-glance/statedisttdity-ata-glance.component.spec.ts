import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatedisttdityAtaGlanceComponent } from './statedisttdity-ata-glance.component';

describe('StatedisttdityAtaGlanceComponent', () => {
  let component: StatedisttdityAtaGlanceComponent;
  let fixture: ComponentFixture<StatedisttdityAtaGlanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatedisttdityAtaGlanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatedisttdityAtaGlanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
