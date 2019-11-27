import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import * as CanvasJS from 'src/assets/canvasjs.min.js';
// import { BuildingServiceService } from 'src/app/service/building-service.service';

import { HttpClient } from '@angular/common/http';
//import { Charts, District, States, City, FinDetails, CompMaster } from 'src/app/model/charts.model';
import { promise } from 'protractor';
import { Observable, never } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { lstatSync } from 'fs';
import { Alert } from 'selenium-webdriver';
//import { NgbModal, NgbActiveModal, NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router } from '@angular/router';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap'; 
import { UrlService } from '../Shared/url.service';
import { States, District, City, User_registration } from '../Shared/CommonModel';
import { AllAssignedRoleComponent } from '../AssignRole/all-assigned-role.component';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService } from '../login-service.service';
//type NewType = States;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  modalRef;

  stateCodes: string = "0";
  districtCodes: string = "0";
  cityCodes: string = "0";
  StateMessage: string;
  DistrictMessage: string;
  CityMessage: string;
  stValue: string;
  distValue: string;
  cityValue: string;
  stateDetails:any;
  districtDetails:any;
  cityDetails:any;


  CommonModel:User_registration;
  userForm:any;

  constructor(private router: Router,private formBuilder:FormBuilder, private service:UrlService, private loginService:LoginServiceService ) { 
    this.StateMessage = "Select State";
    this.DistrictMessage = "Select District";
    this.CityMessage = "Select City";
    this.stValue = "0";
    this.distValue = "0";
    this.cityValue = "0";
  }

  getDistrictDetails(DisttCode) {
    if (DisttCode == "0") {
      this.distValue = "0";
      this.cityValue = "0";
      this.DistrictMessage = "Select District";
    
      this.CityMessage = "Select City";
      this.service.CityDetails = [];
    }
    else {
      this.districtCodes = DisttCode;
      this.service.CityList(DisttCode).toPromise().then(result=>{
        this.cityDetails=result as City[];
      });
  }
}
CheckEmailFormat(event)
{
  const email=event.target.value;

  if (!this.ValidateEmail(email)) {
    alert("Email is not valid format");
  }


}

 ValidateEmail(email) {
  var expr = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
  return expr.match(email);
};


  getStateDetails(stateCodes) {
   // alert(stateCodes);
    if (stateCodes == "0") {
     
      this.distValue = "0";
      this.cityValue = "0";

      this.DistrictMessage = "Select District";
      this.service.DisttDetails = [];
      this.CityMessage = "Select City";
    
    }
    else {
      this.stateCodes = stateCodes;
      this.service.DisttList(stateCodes).toPromise().then(result=>{
   
        this.districtDetails=result as District[];
      });
  }
}

 
  
  ngOnInit() {
    this.userForm=this.formBuilder.group({
      FirstName: ['',[Validators.maxLength(10)]],
      LastName: [''],
      Address: [''],
      Password: [''],
      StateId: [''],
      DisttId: [''],
      CityId: [''],
      ZipCode: [''],
      LastLoginDate: [''],
      PasswordChangeDate: [''],
      EmailId: [''],
      MobileNo: [''],
      PhoneNo: [''],
      TaskName: [''],
    });
    this.service.StateListDetails().toPromise().then(result=>{
      this.stateDetails=result as States[];
    });
  }

  onForSubmit(){
    this.userForm.value.LastLoginDate=this.userForm.value.LastLoginDate.year + "-" + this.userForm.value.LastLoginDate.month + "-" + this.userForm.value.LastLoginDate.day ;
    this.CommonModel=this.userForm.value;
    //alert(this.CommonModel.FirstName);
    this.loginService.CreateUser(this.CommonModel).subscribe(result=>{
      alert(result);
    })
  }
}
