import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCodeWiseReportComponent } from './project-code-wise-report.component';

describe('ProjectCodeWiseReportComponent', () => {
  let component: ProjectCodeWiseReportComponent;
  let fixture: ComponentFixture<ProjectCodeWiseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCodeWiseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCodeWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
