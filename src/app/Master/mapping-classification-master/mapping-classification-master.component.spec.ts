import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingClassificationMasterComponent } from './mapping-classification-master.component';

describe('MappingClassificationMasterComponent', () => {
  let component: MappingClassificationMasterComponent;
  let fixture: ComponentFixture<MappingClassificationMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingClassificationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingClassificationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
