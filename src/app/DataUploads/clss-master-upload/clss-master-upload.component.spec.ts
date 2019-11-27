import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClssMasterUploadComponent } from './clss-master-upload.component';

describe('ClssMasterUploadComponent', () => {
  let component: ClssMasterUploadComponent;
  let fixture: ComponentFixture<ClssMasterUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClssMasterUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClssMasterUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
