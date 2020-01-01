import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsReportComponent } from './project-details-report.component';

describe('Statescore1Component', () => {
  let component: ProjectDetailsReportComponent;
  let fixture: ComponentFixture<ProjectDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDetailsReportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
