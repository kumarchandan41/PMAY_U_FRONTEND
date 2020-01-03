import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProjectDetailComponent } from './upload-project-detail.component';

describe('UploadProjectDetailComponent', () => {
  let component: UploadProjectDetailComponent;
  let fixture: ComponentFixture<UploadProjectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadProjectDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
