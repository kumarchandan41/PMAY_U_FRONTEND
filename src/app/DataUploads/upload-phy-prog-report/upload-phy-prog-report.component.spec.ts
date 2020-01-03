import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPhyProgReportComponent } from './upload-phy-prog-report.component';

describe('UploadPhyProgReportComponent', () => {
  let component: UploadPhyProgReportComponent;
  let fixture: ComponentFixture<UploadPhyProgReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPhyProgReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPhyProgReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
