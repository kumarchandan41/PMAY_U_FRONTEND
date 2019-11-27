import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUcSubmissionComponent } from './project-uc-submission.component';

describe('ProjectUcSubmissionComponent', () => {
  let component: ProjectUcSubmissionComponent;
  let fixture: ComponentFixture<ProjectUcSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectUcSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUcSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
