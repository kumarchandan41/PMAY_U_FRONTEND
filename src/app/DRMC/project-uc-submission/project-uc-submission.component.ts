import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AdminSandbox } from '../admin.sandbox';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { UserService } from 'src/app/admin-service/user.service';


@Component({
  selector: 'app-project-uc-submission',
  templateUrl: './project-uc-submission.component.html',
  styleUrls: ['./project-uc-submission.component.css']
})
export class ProjectUcSubmissionComponent implements OnInit {
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
  public controls:AbstractControl;
  submitted: boolean;
  csmcnumber: string;
  state: string;
  city: string;
  district: string;
  projectName: any;
  releaseUC: any[] = [];
  arr:[];


  constructor(private fb: FormBuilder, public adminSandbox: AdminSandbox, protected userMasterService: UserService) { }

  ngOnInit() {
    this.adminSandbox.totalReleaseInstallment1=[];
    this.adminSandbox.totalReleaseInstallment2=[];
    this.adminSandbox.totalReleaseInstallment3=[];
    this.adminSandbox.totalUCInstallment1=[];
    this.adminSandbox.totalUCInstallment2=[];
    this.adminSandbox.totalUCInstallment3=[];
    this.releaseFundFlow = this.fb.group({
      itemRows: this.fb.array([this.initItemRows('')]),
      // itemRows1: this.fb.array([this.initItemRows1()]),
    });

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
    this.adminSandbox.ReleaseProjectCode = [];

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
  RadioButtonInstallment(state: any, district: any, ddlcity: any, project: any) {
    this.getUCSubmission(state, district, ddlcity, project);
  }

  getUCSubmission(statecode: any, districtcode: any, citycode: any, projectName: any) {
    this.userMasterService.getUCSubmission(statecode, districtcode, citycode, projectName).subscribe(data => {
      this.releaseUC = data;
      this.releaseFundFlow.setControl('itemRows', this.releaseUCSubmission(this.releaseUC));
    })
  }

  releaseUCSubmission(releasefundflow: any): FormArray {
    if (releasefundflow.length == 0) {
      this.releaseFundFlow = this.fb.group({
        itemRows: this.fb.array([this.initItemRows('')]),
      });
    }
    else {
      const formArray = new FormArray([]);
      releasefundflow.forEach(element => {
        formArray.push(this.fb.group({
      
          Source: element.Source,
          SanctionNumber: element.SanctionNumber,
          TotalRelease: element.TotalRelease,
          ProjectCode: element.ProjectCode,  
          TxtSCSPDate: element.TxtSCSPDate,
          Codes: element.Codes,
          Dcode: element.Dcode,
          CityCode: element.CityCode,
          ReleaseId: element.ReleaseId,
          Release: element.Release,
          Installment:element.Installment,
          LetterNo: element.LetterNo,
          UCDate: element.UCDate,
          UCAmount: element.UCAmount,
          UCID: element.UCID,
        }));
      });
      return formArray;
    }
  }

  get formArr() {
    return this.releaseFundFlow.get('itemRows') as FormArray;
  }
  initItemRows(UC: any): FormGroup {
    return this.fb.group({
      Source: UC.Source,
      SanctionNumber: UC.SanctionNumber,
      TotalRelease: UC.TotalRelease,
      ProjectCode: UC.ProjectCode,
      Installment: UC.Installment,
      TxtSCSPDate: UC.TxtSCSPDate,
      Codes: UC.Codes,
      Dcode: UC.Dcode,
      CityCode: UC.CityCode,
      ReleaseId: UC.ReleaseId,
      Release: UC.Release,
      UCID: '',
      LetterNo: '',
      UCAmount: '',
      UCDate: ''
    });
  }

  addNewReleaseRow(UCValue: any, i: any) {
     debugger;
   
   // alert(i);
   // alert(UCValue);
    
    // this.formArr.push(this.initItemRows(UCValue.itemRows[i]));
   // UCValue.itemRows[i + 1].Source='';
   // UCValue.itemRows[i + 1].SanctionNumber='';
    //UCValue.itemRows[i + 1].TotalRelease='';
    const uc1:any={};
    this.formArr.insert(i+1,this.initItemRows(uc1)) ;
    //   UCValue.itemRows[i + 1].Source='';
  // UCValue.itemRows[i + 1].SanctionNumber='';
  //  UCValue.itemRows[i + 1].TotalRelease='';
    
   
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
  onSubmitReleaseFundFlow(UCValue: any, i: any) {
 
    this.adminSandbox.postUCSubmission(UCValue.itemRows[i]);
    
  }
  
}
