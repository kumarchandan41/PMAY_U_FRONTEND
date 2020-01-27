import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as CanvasJS from 'src/assets/canvasjs.min.js';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable, never } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { lstatSync } from 'fs';
import { Alert } from 'selenium-webdriver';
import { NgbModal, NgbActiveModal, NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { Route } from '@angular/router';
//import { Excel_PMAY_Data } from 'src/app/financeReport/model/excelfile';
//import { BuildingServiceService } from 'src/app/login/Services/building-service.service';
// import { States } from 'src/app/Shared/CommonModel';
// import { District } from 'src/app/financeReport/model/chart';
// import { City } from 'src/app/financeReport/model/chart.model';

import { Excel_PMAY_Data } from 'src/app/financeReport/model/excelfile';
import { BuildingServiceService } from 'src/app/login/Services/building-service.service';
// import { States } from 'src/app/Shared/CommonModel';
// import { District } from 'src/app/financeReport/model/chart';
// import { City } from 'src/app/financeReport/model/chart.model';
import { States, District, City, Charts, CompMaster } from 'src/app/financeReport/model/chart';


@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  StateMessage: string;
  DistrictMessage: string;
  CityMessage: string;
  modalRef;
  StateDetails: States[];
  DisttDetails: Observable<District[]>;
  CityDetails: City[];
  stateCodes: string = "0";
  districtCodes: string = "0";
  cityCodes: string = "0";
  distvalue: string;
  cityvalue: string;
  distValue: string;
  cityValue: string;

  constructor(private formBuilder: FormBuilder ,private route:Router,private formbulider: FormBuilder, private router: ActivatedRoute, public service: BuildingServiceService) { 

  }

  ngOnInit() {
  //  this.ComponentDetails=this.ComponentDetails;
    this.stateCodes = "0";
    this.districtCodes = "0";
    this.cityCodes = "0";
    // this.SelectComp="Select Component"
    // this.Division = "0";
    // this.DivisionCodes = "0";
    this.service.StateList();
    this.service.DisttList(this.stateCodes);
    this.service.CityList(this.districtCodes);
    //***************************************** */
    this.router.params.subscribe(p => {
  //  this.id = p['ID'];
  //  this.GetDetailsById(this.id);
  });
  }


  getDistrictDetails(stateCodes) {
    if (stateCodes == "0") {
      this.DistrictMessage = "Select District";
      this.service.DisttDetails = [];
      this.CityMessage = "Select City";
      this.service.CityDetails = [];
    }
    else{
      this.service.DisttList(stateCodes);
    }
  }
  getCityDetails(DisttCode) {
      if (DisttCode == "0") {
          this.distValue = "0";
          this.cityValue = "0";
          this.DistrictMessage = "Select District"; // ?????????????????????
          //this.service.DisttDetails=[];
          this.CityMessage = "Select City";
          this.service.CityDetails = [];
      }
      else {
          this.districtCodes = DisttCode;
          this.service.CityList(DisttCode);
}
}
}
