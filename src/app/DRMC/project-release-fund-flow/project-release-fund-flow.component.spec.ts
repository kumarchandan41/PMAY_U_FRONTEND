import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReleaseFundFlowComponent } from './project-release-fund-flow.component';

describe('ProjectReleaseFundFlowComponent', () => {
  let component: ProjectReleaseFundFlowComponent;
  let fixture: ComponentFixture<ProjectReleaseFundFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectReleaseFundFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectReleaseFundFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
