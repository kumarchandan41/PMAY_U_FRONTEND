import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRelFundFlowComponent } from './project-rel-fund-flow.component';

describe('ProjectRelFundFlowComponent', () => {
  let component: ProjectRelFundFlowComponent;
  let fixture: ComponentFixture<ProjectRelFundFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectRelFundFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRelFundFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
