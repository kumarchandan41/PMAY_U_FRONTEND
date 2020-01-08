import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjRelFundFlowComponent } from './proj-rel-fund-flow.component';

describe('ProjRelFundFlowComponent', () => {
  let component: ProjRelFundFlowComponent;
  let fixture: ComponentFixture<ProjRelFundFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjRelFundFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjRelFundFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
