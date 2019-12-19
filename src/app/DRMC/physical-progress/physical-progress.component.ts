import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { AdminSandbox } from '../admin.sandbox';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-physical-progress',
  templateUrl: './physical-progress.component.html',
  styleUrls: ['./physical-progress.component.css']
})
export class PhysicalProgressComponent implements OnInit {
  public ddlStateCode: AbstractControl;
  public ddlDistrictCode:AbstractControl;
  public ddlCity:AbstractControl;
  public ddlScheme:AbstractControl;
  public ddlComponent:AbstractControl;
  public physicalProgress: FormGroup;
  submitted: boolean;
  state: string;
  scheme: string;
  city: string;
  district: string;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  scheduleStartDate: string = undefined;
  scheduleEndDate: string = undefined;
  maxStartDate: any;
  Components: string;
  constructor(private fb: FormBuilder, public adminSandbox: AdminSandbox,
    ) { }

  ngOnInit() {
    this.onPhysicalProcess();
    this.adminSandbox.getStateData();
    this.adminSandbox.getSchemeData();
    this.adminSandbox.projectDetailMaster=[];
    this.state='';
    this.scheme='';
    this.city='';
    this.district='';
    this.Components='';
    const date = new Date();
    //   this.maxStartDate = date;
       this.dpConfig = Object.assign({},
         {
           containerClass: 'theme-blue',
           dateInputFormat: 'DD/MM/YYYY'
         });
   
  }
  public onPhysicalProcess(): void {
    this.physicalProgress = this.fb.group({
      ddlStateCode: [''],
      ddlDistrictCode: [''],
      ddlCity: [''],
      ddlScheme: [''], 
      ddlComponent:['']     
    });
    this.ddlStateCode = this.physicalProgress.controls['ddlStateCode'];
    this.ddlDistrictCode = this.physicalProgress.controls['ddlDistrictCode'];
    this.ddlCity = this.physicalProgress.controls['ddlCity'];
    this.ddlScheme = this.physicalProgress.controls['ddlScheme'];
    this.ddlComponent = this.physicalProgress.controls['ddlComponent'];
  }
  onClickPhysicalProgess(event: Event) {
    this.submitted = true;
      this.adminSandbox.postPhysicalProgress();    
      this.submitted = false;
      this.state='';
  } 
  
}
