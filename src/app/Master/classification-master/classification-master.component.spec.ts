import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationMasterComponent } from './classification-master.component';

describe('ClassificationMasterComponent', () => {
  let component: ClassificationMasterComponent;
  let fixture: ComponentFixture<ClassificationMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificationMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
