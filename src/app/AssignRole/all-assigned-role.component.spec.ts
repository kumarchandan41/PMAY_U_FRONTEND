import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAssignedRoleComponent } from './all-assigned-role.component';

describe('AllAssignedRoleComponent', () => {
  let component: AllAssignedRoleComponent;
  let fixture: ComponentFixture<AllAssignedRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAssignedRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAssignedRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
