import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AdminSandbox } from '../admin.sandbox';

import { BsDatepickerConfig } from 'ngx-bootstrap';
import { UserService } from 'src/app/admin-service/user.service';


@Component({
  selector: 'app-project-release-fund-flow',
  templateUrl: './project-release-fund-flow.component.html',
  styleUrls: ['./project-release-fund-flow.component.css']
})
export class ProjectReleaseFundFlowComponent implements OnInit {
  public releaseFundFlow: FormGroup;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  scheduleStartDate: string = undefined;
  scheduleEndDate: string = undefined;
  maxStartDate: any;
  public ddlStateCode: AbstractControl;
  public ddlDistrictCode: AbstractControl;
  public ddlCity: AbstractControl;
  public ddlInstallment: AbstractControl;
  public ddlHead: AbstractControl;
  public radioInstallment: AbstractControl;
  public ddlCSMCNumber: AbstractControl;
  public ucSubmission: FormGroup;
  public ddlProjectName: AbstractControl;
  submitted: boolean;
  csmcnumber: string;
  state: string;
  city: string;
  district: string;
  projectName: any;

  HFAAmount:number=0;
  TSPAmount:number=0;
  SCSPAmount:number=0;
  Total:number=0;
  disabled:boolean;


  releaseUC: any[]=[];
  constructor(private fb: FormBuilder, public adminSandbox: AdminSandbox,protected userMasterService: UserService) { }

  ngOnInit() {
    this.releaseFundFlow = this.fb.group({
      itemRows: this.fb.array([this.initItemRows()]),
     // itemRows1: this.fb.array([this.initItemRows1()]),
    });
  
    this.HFAAmount=0;
    this.TSPAmount=0;
    this.SCSPAmount=0;
    this.disabled = true;

    const date = new Date();
    //   this.maxStartDate = date;
    this.dpConfig = Object.assign({},
      {
        containerClass: 'theme-blue',
        dateInputFormat: 'YYYY-MM-DD'
      });

    this.onUCSubmission();
    this.adminSandbox.getStateData();
    this.state = '';
    this.city = '';
    this.district = '';
    this.csmcnumber = '';
    this.projectName = '';
    this.adminSandbox.ReleaseProjectCode=[];
   
  }

  public onUCSubmission(): void {
    this.ucSubmission = this.fb.group({
      ddlStateCode: [''],
      ddlDistrictCode: [''],
      ddlCity: [''],
      ddlInstallment: [''],
      ddlHead: [''],
      radioInstallment: [''],
      ddlCSMCNumber: [''],
      ddlProjectName: [''],
      
    });
    this.ddlStateCode = this.ucSubmission.controls['ddlStateCode'];
    this.ddlDistrictCode = this.ucSubmission.controls['ddlDistrictCode'];
    this.ddlCity = this.ucSubmission.controls['ddlCity'];
    this.ddlInstallment = this.ucSubmission.controls['ddlInstallment'];
    this.ddlHead = this.ucSubmission.controls['ddlHead'];
    this.radioInstallment = this.ucSubmission.controls['radioInstallment'];
    this.ddlCSMCNumber = this.ucSubmission.controls['ddlCSMCNumber'];
    this.ddlProjectName = this.ucSubmission.controls['ddlProjectName'];
   
  }

  RadioButtonInstallment(state:any,district:any,ddlcity:any,project:any,installment:any) {
 
    this.getReleaseFundFlow(state,district,ddlcity,project,installment);
  }
 
  getReleaseFundFlow(statecode: any, districtcode: any, citycode: any, projectName: any,radio:any) {

    this.userMasterService.getReleaseFundFlow(statecode, districtcode, citycode, projectName,radio).subscribe(data => {
    this.releaseUC = data;
    this.releaseFundFlow.setControl('itemRows',this.release(this.releaseUC));

  })}
  release(releasefundflow:any):FormArray{
  
    if(releasefundflow.length==0){
      this.releaseFundFlow = this.fb.group({
        itemRows: this.fb.array([this.initItemRows()]),
      
      }); 
    }
    else{
    const formArray=new FormArray([]);
    releasefundflow.forEach(element => {
      formArray.push(this.fb.group({
        Source:element.Source,
        SanctionNumber:element.SanctionNumber,
        HFAAmount:element.HFAAmount,
        TSPAmount:element.TSPAmount,
        SCSPAmount:element.SCSPAmount,
        ProjectCode:element.ProjectCode,
        Installment:element.Installment,
        TxtSCSPDate:element.TxtSCSPDate,
        Codes:element.Codes,
        Dcode:element.Dcode,
        CityCode:element.CityCode,
        ReleaseId:element.ReleaseId,
        Release:element.Release,
       
       
        Total:+element.HFAAmount+ +element.TSPAmount+ +element.SCSPAmount,          
      }));
    });   
return formArray;
  }}

  get formArr() {
    return this.releaseFundFlow.get('itemRows') as FormArray;
  }
  initItemRows(): FormGroup  {
    return this.fb.group({
      Source:'',
      SanctionNumber:'',
      HFAAmount:'',
      TSPAmount:'',
      SCSPAmount:'',
      ProjectCode:'',
      Installment:'',
      TxtSCSPDate:'',
      Codes:'',
      Dcode:'',
      CityCode:'',
      ReleaseId:'',
      Release:'',
      Total:'',
     
    });
  }
  addNewReleaseRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
  onSubmitReleaseFundFlow(value1:any){
    this.adminSandbox.postReleaseFundFlowInstallment(value1.itemRows);
    
  }
  getTotalHFAAmount(index: number) : number {
    let sum = 0;
    for(let i = 0; i < this.releaseUC.length; i++) {
      sum += +this.releaseUC[i].HFAAmount;
    }
    return sum;
  }
  getTotalTSPAmount(index: number) : number {
        let sum = 0;
        for(let i = 0; i < this.releaseUC.length; i++) {
          sum += +this.releaseUC[i].TSPAmount;
        }
        return sum;
      }
  getTotalSCSPAmount(index: number) : number {
            let sum = 0;
            for(let i = 0; i < this.releaseUC.length; i++) {
              sum += +this.releaseUC[i].SCSPAmount;
            }
            return sum;
          }
  getTotalRelease(index: number) : number {
                let sum = 0;
                for(let i = 0; i < this.releaseUC.length; i++) {
                  sum += +this.releaseUC[i].SCSPAmount + +this.releaseUC[i].TSPAmount + +this.releaseUC[i].HFAAmount;
                  
                }
               // this.Total = sum;
                return sum;
  }
  calculate()
  {
    this.Total=Number(this.HFAAmount)+ Number(this.TSPAmount)+Number(this.SCSPAmount);
    this.disabled = false;
  }
}
 