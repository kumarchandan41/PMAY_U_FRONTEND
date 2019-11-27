import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBriefDetailComponent } from './project-brief-detail.component';

describe('ProjectBriefDetailComponent', () => {
  let component: ProjectBriefDetailComponent;
  let fixture: ComponentFixture<ProjectBriefDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBriefDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBriefDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
