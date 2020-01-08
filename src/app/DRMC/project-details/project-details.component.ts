import { Component, OnInit } from '@angular/core';
import { AdminSandbox } from '../admin.sandbox';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, TabHeadingDirective } from 'ngx-bootstrap';




@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],

})

export class ProjectDetailsComponent implements OnInit {
  public submitted: boolean = false;
  public txtCMCDate: AbstractControl;
  public txtCSMCNumber: AbstractControl;
  public ddlStatus: AbstractControl;
  public txtProjectTitle: AbstractControl;
  public txtProjectCost: AbstractControl;
  public txtCentralAssist: AbstractControl;
  public txtStateGrant: AbstractControl;
  public txtULB: AbstractControl;
  public txtBeneficiaryShare: AbstractControl;
  public txtNewSanction: AbstractControl;
  public txtAmountInstallment: AbstractControl;
  public ddlScheme: AbstractControl;
  public projectDetail: FormGroup;
  public ddlStateCode: AbstractControl;
  public ddlDistrictCode: AbstractControl;
  public ddlCity: AbstractControl;
  public txtUpgrade: AbstractControl;
  public txtTotalSanction: AbstractControl;
  public ddlComponent: AbstractControl;
  public ddlDuration: AbstractControl;
  public txtOther: AbstractControl;
  public ddlAgency: AbstractControl;
  public txtAgency: AbstractControl;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  scheduleStartDate: string = undefined;
  scheduleEndDate: string = undefined;
  maxStartDate: any;
  State: string;
  District: string;
  City: string;
  Scheme: string;
  Status: string;
  Components: string;
  Duration: string;
  agencyMaster: FormGroup;
  Agency: string;
  txtProjectAgency: AbstractControl;
  selectedFiles = null;
  currentFileUpload: File;
  constructor(private fb: FormBuilder, public adminSandbox: AdminSandbox) { }

  ngOnInit() {
    this.onProjectDetail();
    this.onAgencyDetail();
    const date = new Date();
    //   this.maxStartDate = date;
    this.dpConfig = Object.assign({},
      {
        containerClass: 'theme-blue',
        dateInputFormat: 'DD/MM/YYYY'
      });
    this.adminSandbox.getSchemeData();
    this.adminSandbox.getStateData();
    this.adminSandbox.totalSanction = [];
    this.adminSandbox.installment = [];
    this.adminSandbox.projectDetailMaster = [];
    this.State = '';
    this.District = '';
    this.Status = '';
    this.City = '';
    this.Scheme = '';
    this.Components = '';
    this.Duration = '';
    this.Agency = '';
    this.adminSandbox.ProjectAgency = [];
  }
  public onProjectDetail(): void {
    this.projectDetail = this.fb.group({
      txtCMCDate: ['', [Validators.required]],
      txtCSMCNumber: ['', [Validators.required]],
      ddlStatus: ['', [Validators.required]],
      txtProjectTitle: ['', [Validators.required]],
      txtProjectCost: ['', [Validators.required]],
      txtCentralAssist: ['', [Validators.required]],
      txtStateGrant: ['', [Validators.required]],
      txtULB: ['', [Validators.required]],
      txtBeneficiaryShare: ['', [Validators.required]],
      txtNewSanction: ['', [Validators.required]],
      txtAmountInstallment: ['', [Validators.required]],
      ddlScheme: ['', [Validators.required]],
      ddlStateCode: ['', [Validators.required]],
      ddlDistrictCode: ['', [Validators.required]],
      ddlCity: ['', [Validators.required]],
      txtUpgrade: ['', [Validators.required]],
      txtTotalSanction: [''],
      ddlComponent: ['', [Validators.required]],
      ddlDuration: ['', [Validators.required]],
      txtOther: [''],
      txtProjectAgency: [''],
      ddlAgency: ['']
    });
    this.txtTotalSanction = this.projectDetail.controls['txtTotalSanction'];
    this.ddlComponent = this.projectDetail.controls['ddlComponent'];
    this.ddlDuration = this.projectDetail.controls['ddlDuration'];
    this.txtUpgrade = this.projectDetail.controls['txtUpgrade'];
    this.txtAmountInstallment = this.projectDetail.controls['txtAmountInstallment'];
    this.ddlScheme = this.projectDetail.controls['ddlScheme'];
    this.ddlStateCode = this.projectDetail.controls['ddlStateCode'];
    this.ddlDistrictCode = this.projectDetail.controls['ddlDistrictCode'];
    this.ddlCity = this.projectDetail.controls['ddlCity'];
    this.txtCMCDate = this.projectDetail.controls['txtCMCDate'];
    this.txtOther = this.projectDetail.controls['txtOther'];
    this.txtCSMCNumber = this.projectDetail.controls['txtCSMCNumber'];
    this.ddlStatus = this.projectDetail.controls['ddlStatus'];
    this.txtProjectTitle = this.projectDetail.controls['txtProjectTitle'];
    this.txtProjectCost = this.projectDetail.controls['txtProjectCost'];
    this.txtCentralAssist = this.projectDetail.controls['txtCentralAssist'];
    this.txtStateGrant = this.projectDetail.controls['txtStateGrant'];
    this.txtULB = this.projectDetail.controls['txtULB'];
    this.txtBeneficiaryShare = this.projectDetail.controls['txtBeneficiaryShare'];
    this.txtNewSanction = this.projectDetail.controls['txtNewSanction'];
    this.ddlAgency = this.projectDetail.controls['ddlAgency'];
    this.txtProjectAgency = this.projectDetail.controls['txtProjectAgency'];

  }
  public onAgencyDetail(): void {
    this.agencyMaster = this.fb.group({
      txtAgency: ['', [Validators.required]],

    });
    this.txtAgency = this.agencyMaster.controls['txtAgency'];

  }

  onClickProjectDetail(event: Event, formGroup: any) {
    this.submitted = true;
    event.stopPropagation();
    if (this.projectDetail.valid) {
      this.adminSandbox.postProjectDetailsData(formGroup)
      this.submitted = false;
      this.projectDetail.reset();
      this.State = '';
      this.District = '';
      this.Status = '';
      this.City = '';
      this.Scheme = '';
      this.Components = '';
      this.Duration = '';
      this.Agency = '';
    }
  }
  onClickAgencyMaster(event: Event, formGroup: any) {

    this.submitted = true;
    event.stopPropagation();
    if (this.agencyMaster.valid) {
      this.adminSandbox.postAgencyMaster(formGroup);
      this.submitted = false;
      this.agencyMaster.reset();
    }
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  onClickProjectBulkData(): void {
    this.submitted = true;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.adminSandbox.postProjectDetailsBulkData(this.currentFileUpload);
    this.selectedFiles = undefined;
    this.submitted = false;
  }
}
