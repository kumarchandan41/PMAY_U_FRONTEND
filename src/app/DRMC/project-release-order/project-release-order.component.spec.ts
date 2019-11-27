import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReleaseOrderComponent } from './project-release-order.component';

describe('ProjectReleaseOrderComponent', () => {
  let component: ProjectReleaseOrderComponent;
  let fixture: ComponentFixture<ProjectReleaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectReleaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectReleaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
