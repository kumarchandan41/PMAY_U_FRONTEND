import { Component, OnInit } from '@angular/core';
import { AdminSandbox } from '../admin.sandbox';
import { FormBuilder, AbstractControl, FormGroup, Validators,FormArray } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-project-brief-detail',
  templateUrl: './project-brief-detail.component.html',
  styleUrls: ['./project-brief-detail.component.css']
})
export class ProjectBriefDetailComponent implements OnInit {
  public ProjectSlum: FormGroup;
  public projectBriefDetail: FormGroup;
  public ddlStateCode: AbstractControl;
  public ddlDistrictCode:AbstractControl;
  public ddlCity:AbstractControl;
  public ddlScheme:AbstractControl;
  public ddlComponent:AbstractControl;
  public ddlProjectName:AbstractControl;
  public txtNodalAgency:AbstractControl;
  public txtImplementingAgency:AbstractControl;
  public txtSLSMC:AbstractControl;
  public radioSlum:AbstractControl;
  public txtNameSlum:AbstractControl;
  public txtCoveredSlum:AbstractControl;
  public txtHousingCost:AbstractControl;
  public txtInfrastructure:AbstractControl;
  public txtOther:AbstractControl;
  public txtGeneral:AbstractControl;
  public txtSC:AbstractControl;
  public txtST:AbstractControl;
  public txtOBC:AbstractControl;
  public txtMinority:AbstractControl;
  public txtOthersEWS:AbstractControl;
  public txtJoint:AbstractControl;
  public txtFemale:AbstractControl;
  public txtMale:AbstractControl;
  public txtTransgender:AbstractControl;
  public submitted: boolean = false;
  public txtSelectFile:AbstractControl;
  public txtTotalHouses:AbstractControl;
  State: string;
  District: string;
  City: string;
  Scheme: string;
  ProjectName:string;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  scheduleStartDate: string = undefined;
  scheduleEndDate: string = undefined;
  maxStartDate: any;
  Components: string;
  selectedFiles = null;
  currentFileUpload: File;
  private fieldArray: any[]= [];
  newAttribute: any[]=[];

  Slum: boolean = false;

  constructor(private fb: FormBuilder, public adminSandbox: AdminSandbox) { }

  ngOnInit() {
    this.adminSandbox.getProjectBriefDetail();
    this.ProjectSlum = this.fb.group({
      itemRows: this.fb.array([this.initItemRows()]),
 
    });
    this.onProjectBriefDetail();
    this.adminSandbox.getStateData();
    this.adminSandbox.getSchemeData();
    const date = new Date();
    //   this.maxStartDate = date;
       this.dpConfig = Object.assign({},
         {
           containerClass: 'theme-blue',
           dateInputFormat: 'DD/MM/YYYY'
         });
    this.State = '';
    this.District = '';
    this.ProjectName='';
    this.City = '';
    this.Scheme = '';
    this.Components = '';
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  public onProjectBriefDetail(): void {
    this.projectBriefDetail = this.fb.group({
      ddlStateCode: ['', [Validators.required]],
      ddlDistrictCode: ['', [Validators.required]],
      ddlCity: ['', [Validators.required]],
      ddlScheme: ['', [Validators.required]],
      ddlComponent: ['', [Validators.required]],
      ddlProjectName: ['', [Validators.required]],
      txtNodalAgency: ['', [Validators.required]],
      txtImplementingAgency: ['', [Validators.required]],
      txtSLSMC: ['', [Validators.required]],
      radioSlum: ['', [Validators.required]],
      txtHousingCost: ['', [Validators.required]],
      txtInfrastructure: ['', [Validators.required]],
      txtOther: ['', [Validators.required]],
      txtGeneral: ['', [Validators.required]],
      txtSC: ['', [Validators.required]],
      txtST: ['', [Validators.required]],
      txtOBC: ['', [Validators.required]],
      txtMinority: ['', [Validators.required]],
      txtOthersEWS:  ['', [Validators.required]],
      txtJoint:  ['', [Validators.required]],
      txtFemale: ['', [Validators.required]],
      txtMale: ['', [Validators.required]],
      txtTransgender: ['', [Validators.required]],
      txtSelectFile:['',[Validators.required]],
      txtTotalHouses:['']
    });
    this.ddlStateCode = this.projectBriefDetail.controls['ddlStateCode'];
    this.txtTotalHouses = this.projectBriefDetail.controls['txtTotalHouses'];
    this.ddlDistrictCode = this.projectBriefDetail.controls['ddlDistrictCode'];
    this.ddlCity = this.projectBriefDetail.controls['ddlCity'];
    this.ddlScheme = this.projectBriefDetail.controls['ddlScheme'];
    this.ddlComponent = this.projectBriefDetail.controls['ddlComponent'];
    this.ddlProjectName = this.projectBriefDetail.controls['ddlProjectName'];
    this.txtNodalAgency = this.projectBriefDetail.controls['txtNodalAgency'];
    this.txtImplementingAgency = this.projectBriefDetail.controls['txtImplementingAgency'];
    this.txtSLSMC = this.projectBriefDetail.controls['txtSLSMC'];
    this.radioSlum = this.projectBriefDetail.controls['radioSlum'];

    this.txtHousingCost = this.projectBriefDetail.controls['txtHousingCost'];
    this.txtInfrastructure = this.projectBriefDetail.controls['txtInfrastructure'];
    this.txtOther = this.projectBriefDetail.controls['txtOther'];
    this.txtGeneral = this.projectBriefDetail.controls['txtGeneral'];
    this.txtSC = this.projectBriefDetail.controls['txtSC'];
    this.txtST = this.projectBriefDetail.controls['txtST'];
    this.txtOBC = this.projectBriefDetail.controls['txtOBC'];
    this.txtMinority = this.projectBriefDetail.controls['txtMinority'];
    this.txtOthersEWS = this.projectBriefDetail.controls['txtOthersEWS'];
    this.txtJoint = this.projectBriefDetail.controls['txtJoint'];
    this.txtFemale = this.projectBriefDetail.controls['txtFemale'];
    this.txtMale = this.projectBriefDetail.controls['txtMale'];
    this.txtTransgender = this.projectBriefDetail.controls['txtTransgender'];
    this.txtSelectFile=this.projectBriefDetail.controls['txtSelectFile'];

  }
  onClickProjectBriefDetail(event: Event, form: any) {
    this.submitted = true;
    event.stopPropagation();
    if (this.projectBriefDetail.valid) {
      this.currentFileUpload = this.selectedFiles.item(0);
     this.adminSandbox.projectBriefDeatil(this.currentFileUpload,form)
      this.submitted = false;    
    this.projectBriefDetail.reset();
    this.State = '';
    this.District = '';
    this.ProjectName='';
    this.City = '';
    this.Scheme = '';
    this.Components = '';
   // this.adminSandbox.Slum=[];
    this.ProjectSlum.reset();
    
 
     
    }
  }

get formArr() {
  return this.ProjectSlum.get('itemRows') as FormArray;
}
initItemRows(): FormGroup  {
  return this.fb.group({
    SlumName:'',
    SlumCovered:'',
    ProjectCode:''
  
   
  });
}
addNewReleaseRow() {
  this.formArr.push(this.initItemRows());
}
onSubmitProjectSlum(value1:any){
  this.adminSandbox.SlumArray(value1.itemRows); 
}
showSlum(){
  this.Slum=true;
 
}
hideSlum(){
  this.Slum=false;
}
hidebothSlum(){
  this.Slum=false;  
}
}
