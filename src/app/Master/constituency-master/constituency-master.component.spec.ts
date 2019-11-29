import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstituencyMasterComponent } from './constituency-master.component';

describe('ConstituencyMasterComponent', () => {
  let component: ConstituencyMasterComponent;
  let fixture: ComponentFixture<ConstituencyMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstituencyMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstituencyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
