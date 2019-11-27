import { Component, OnInit } from '@angular/core';

//import * as CanvasJS from 'F:/AngularAll/HFACharts/NBOCharts/src/canvasjs.min.js';
import * as CanvasJS from 'src/assets/canvasjs.min.js';
//import * as CanvasJS from 'src/canvasjs.min.js';

import { GraphService } from 'src/app/financeReport/service/graph.service';

//import { BuildingServiceService } from 'src/app/service/building-service.service';
import{HttpClient} from '@angular/common/http';


import { promise } from 'protractor';
import { Observable, never } from 'rxjs';

import { States, District, City, Charts, CompMaster } from 'src/app/financeReport/model/chart';

//import { Charts } from 'src/app/model/charts.model';

import { Alert } from 'selenium-webdriver';
import jsPDF from 'jspdf';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas';  
//import {  District, States, City } from 'src/app/model/charts.model';
//import { Observable } from 'rxjs';

import * as $ from 'jspdf'; 
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbModal, NgbModalConfig,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router } from '@angular/router';


const localString = (number, format = 'en-IN') => {
  return (
    Number(number).toLocaleString(format, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    })
  )
}

const indianFormat = (number, currency = 'INR') => {
  const currencyList = [{ 'INR': 'en-IN' }, { 'USD': 'en-US' }, { 'EGP': 'en-EG' }, { 'RMB': 'en-CN' }, { 'HKD': 'en-HK' }]
  const code = currencyList.find(o => {
    return o[currency]
  })
  if (currency !== '0') {
    return number > 0 ? localString(number, code[currency]) : number < 0 ? `(${localString(Math.abs(number), code[currency])})` : `--`
  } else {
    return '0'
  }
}

const localString1 = (number, format = 'en-IN') => {
  return (
    Number(number).toLocaleString(format, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    })
  )
}
const indianFormat1 = (number, currency = 'INR') => {
  const currencyList = [{ 'INR': 'en-IN' }, { 'USD': 'en-US' }, { 'EGP': 'en-EG' }, { 'RMB': 'en-CN' }, { 'HKD': 'en-HK' }]
  const code = currencyList.find(o => {
    return o[currency]
  })
  if (currency !== '0') {
    return number > 0 ? localString1(number, code[currency]) : number < 0 ? `(${localString1(Math.abs(number), code[currency])})` : `0`
  } else {
    return '0'
  }
}



@Component({
  selector: 'app-ata-glance5',
  templateUrl: './ata-glance5.component.html',
  styleUrls: ['./ata-glance5.component.css']
})
export class AtaGlance5Component implements OnInit {

 // StateDetails : States[];
  // DisttDetails : Observable<District[]>;
  // CityDetails  : City[];
  stateCodes:string="0";
  districtCodes:string="0";
  cityCodes:string="0";
  
  StateMessage: string;
  DistrictMessage: string;
  CityMessage: string;
  Houses_Grounded: number;
  SubsidyAmountCredited: number;
  NoOfprojApproved: number;
  ProjCostApproved: number;
  HousesSanctioned: number;
  Occupied: number;
  Completed: number;
  Grounded: number;
  CentralAssisRel: number;
  CentralShare: number;
  distValue: string;
  cityValue: string;
  stValue: string;
  
  //Display
  NoPApprovedJN:number;
  NoPApprovedRAY:number;
  NoPApprovedCLSS:number;
  HOcc_JN: number;
  HOcc_RAY: number;
  HOcc_CLSS: any;
  HOcc_ISSR: number;
  HOcc_AHP: number;
  HOcc_BLCS: number;
  HOcc_Total: number;
  ProjApp_JN: number;
  ProjCostApp_JN: number;
  Grounded_JN: number;
  Completed_JN: number;
  Occupied_JN: number;
  HS_JN: number;
  CARel_JN: number;
  CShare_JN: number;
  ProjApp_Total: any;
  ProjApp_RAY: number;
  ProjApp_CLSS: number;
  ProjApp_ISSR: number;
  ProjApp_AHP: number;
  ProjApp_BLCS: number;
  PCApp_Total: any;
  NoPCApprovedJN: any;
  ProjCApp_RAY: any;
  ProjCApp_CLSS: any;
  ProjCApp_ISSR: any;
  ProjCApp_AHP: any;
  ProjCApp_BLCS: any;
  CAS_Total: any;
  CAS_RAY: number;
  CAS_CLSS: number;
  CAS_ISSR: number;
  CAS_AHP: number;
  CAS_BLCS: number;
  CAR_Total: any;
  CAR_RAY: number;
  CAR_CLSS: number;
  CAR_ISSR: number;
  CAR_AHP: number;
  CAR_BLCS: number;
  HS_BLCS: any;
  HS_AHP: any;
  NoOfprojRay: number;
  ProjCostRay: any;
  CentralShareRay: number;
  CARay: number;
  CSRay: number;
  HSRay: number;
  HGRay: number;
  HCRay: number;
  HORay: number;
  NoOfprojISSR: number;
  ProjCostISSR: any;
  CSISSR: number;
  CAISSR: number;
  HSISSR: number;
  HGISSR: number;
  HCISSR: number;
  HOISSR: number;
  NoOfprojAHP: number;
  ProjCostAHP: number;
  CSAHP: number;
  CAAHP: number;
  HSAHP: number;
  HGAHP: number;
  HCAHP: number;
  HOAHP: number;
  NoOfprojBLCS: number;
  ProjCostBLCS: any; //??????????????
  CSBLCS: number;
  CABLCS: number;
  HSBLCS: number;
  HGBLCS: number;
  HCBLCS: number;
  HOBLCS: number;
  proj_Total: any;
  HSCLSS: number;
  HS_Total: any;
  HG_Total: any;
  HC_Total: any;
  HO_Total: any;
  CLSSLoanAmt: any;
  SubsidyAmtCr: any;
  NoofBene: any;
  NoOfprojRay1: string;
  States_UT: string;
  District:string; // new 
  City:string;     // new 
  division: any;
  OccupiedJN: number;
  HGrnd_JN: number;
  HComp_JN: number;
  //router: any;

  lblStateDisttCity: any;
  lblStateHeader: any;
  lblDistHeader: any;
  lblCityHeader: any;
  not7ShowHide: boolean = false;
  not8ShowHide: boolean = false;

  constructor(private router:Router, public service: GraphService) {
    this.division ="HFA-5";
     //this.division ="HFA-1";
     this.stValue="0";
     this.distValue="0";
     this.cityValue="0";
     this.StateMessage="Select State";
     this.DistrictMessage="Select District";
     this.CityMessage="Select City";
       this.service.HFACityWiseReportPMayList(this.stateCodes,this.districtCodes,this.cityCodes).subscribe(result=>{
       this.Houses_Grounded = result.Houses_Grounded;    
      });
      this.service.HFACityWiseReportPMayList(this.stateCodes,this.districtCodes,this.cityCodes).subscribe(result=>{
       this.Houses_Grounded = result.Houses_Grounded;    
      });
 
       this.service.CLSSCityWiseReportPMayList(this.stateCodes,this.districtCodes,this.cityCodes).subscribe(result=>{
       this.SubsidyAmountCredited = result.SubsidyAmountCredited;    
      });
      this.service.CLSSCityWiseReportPMayListNew(this.stateCodes,this.districtCodes,this.cityCodes,this.division).subscribe(resultCLSSState=>{
     });
 
     //this.service.JNNURMCityWiseAtAGlance(this.stateCodes,this.districtCodes,this.cityCodes).subscribe(result=>{
      // this.SubsidyAmountCredited = result.SubsidyAmountCredited;    
      //});
 
      
      this.service.HFA_JNNURN_AtAGlanceNew(this.stateCodes,this.districtCodes,this.cityCodes,this.division).subscribe(result=>{
       // this.SubsidyAmountCredited = result.SubsidyAmountCredited;    
       });
  
       this.service.CLSS_StateWiseReportPMayList(this.stateCodes,this.division).subscribe(resultCLSSState=>{
       });
 
       
      this.service.DemandCityWiseReportPMayList(this.stateCodes,this.districtCodes,this.cityCodes).subscribe(result=>{
       // this.SubsidyAmountCredited = result.SubsidyAmountCredited;    
       });
   }
  ngOnInit() {
    this.division ="HFA-5";
    this.stateCodes = "0";
    this.districtCodes = "0";
    this.cityCodes = "0";
    this.service.StateListbyHFA_51();
    this.service.DisttList(this.stateCodes);
    this.service.CityList(this.districtCodes);
    this.States_UT ="Delhi";
    
    this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
//    this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);

    this.service.CLSSCityWiseReportPMayListNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division);

    this.division = "0";
    this.service.HFA_JNNURN_AtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(resultJN => {
      // this.NoPApprovedJN  =resultJN.NoOfprojApproved;
      // this.ProjCostApp_JN=resultJN.ProjCostApproved;
      // this.CShare_JN=resultJN.CentralShare;
      // this.CARel_JN=resultJN.CentralAssisRel;
      // this.HS_JN=resultJN.HousesSanctioned;
      // this.Grounded_JN=resultJN.GroundedJN;
      // this.Completed_JN=resultJN.CompletedJN;
      // this.OccupiedJN=resultJN.OccupiedJN;

      // this.HGrnd_JN=resultJN.Grounded;
      // this.HComp_JN=resultJN.Completed;
      // this.HOcc_JN=resultJN.Occupied;

      this.service.HFA_JNNURN_AtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(resultJN => {
        this.NoPApprovedJN = resultJN.NoOfprojApproved;
        this.ProjCostApp_JN = resultJN.ProjCostApproved;
        this.CShare_JN = resultJN.CentralShare;
        this.CARel_JN = resultJN.CentralAssisRel;
        this.HS_JN = resultJN.HousesSanctioned;

        this.Grounded_JN = resultJN.GroundedJN;
        this.Completed_JN = resultJN.CompletedJN ;//CompletedJN;
        this.OccupiedJN = resultJN.OccupiedJN;

        this.HGrnd_JN = resultJN.Grounded;
        this.HComp_JN = resultJN.Completed;
        this.HOcc_JN = resultJN.Occupied;


      if(this.HComp_JN > 0)
      {
          this.not7ShowHide=false;
      }
       else{
          this.not7ShowHide=true;
       }
      if(this.HOcc_JN > 0)
      {
         this.not8ShowHide=false;
      }
      else{
         this.not8ShowHide=true;
      }

       
       

        if (this.NoPApprovedJN.toString() == "")
          this.NoPApprovedJN = 0;
        if (this.ProjCostApp_JN.toString() == "")
          this.ProjCostApp_JN = 0;

        if (this.CShare_JN.toString() == "")
          this.CShare_JN = 0;

        if (this.CARel_JN.toString() == "")
          this.CARel_JN = 0;

        if (this.HS_JN.toString() == "")
          this.HS_JN = 0;

        if (this.Grounded_JN.toString() == "")
          this.Grounded_JN = 0;

        //     
        //-------------------------------------------------------

        this.service.CompRAYAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result1 => {

          // this.service.CompRAYAtAGlance(this.stateCodes,this.districtCodes,this.cityCodes).subscribe(result1=>{
          this.NoOfprojRay = result1.NoOfprojApproved;
          this.ProjCostRay = result1.Project_Cost;
          this.CSRay = result1.CentralShare;
          this.CARay = result1.CentralAssisRel;
          this.HSRay = result1.HousesSanctioned;
          this.HGRay = result1.Grounded;
          this.HCRay = result1.Completed;
          this.HORay = result1.Occupied;
          //alert(this.ProjCostRay);
          //-----------------------------------
          this.service.CompISSRAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result2 => {

            // this.service.CompISSRAtAGlance(this.stateCodes,this.districtCodes,this.cityCodes).subscribe(result2=>{
            this.NoOfprojISSR = result2.NoOfprojApproved;
            this.ProjCostISSR = result2.Project_Cost;
            this.CSISSR = result2.CentralShare;
            this.CAISSR = result2.CentralAssisRel;
            this.HSISSR = result2.HousesSanctioned;
            this.HGISSR = result2.Grounded;
            this.HCISSR = result2.Completed;
            this.HOISSR = result2.Occupied;
            //  alert(result2.Project_Cost);
            //------------------------------------
            this.service.CompAHPAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result3 => {

              // this.service.CompAHPAtAGlance(this.stateCodes,this.districtCodes,this.cityCodes).subscribe(result3=>{
              this.NoOfprojAHP = result3.NoOfprojApproved;
              this.ProjCostAHP = result3.Project_Cost;
              this.CSAHP = result3.CentralShare;
              this.CAAHP = result3.CentralAssisRel;
              this.HSAHP = result3.HousesSanctioned;
              this.HGAHP = result3.Grounded;
              this.HCAHP = result3.Completed;
              this.HOAHP = result3.Occupied;


              //-----------------------------------

              this.service.CompBLCSAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result4 => {

                //  this.service.CompBLCSAtAGlance(this.stateCodes,this.districtCodes,this.cityCodes).subscribe(result4=>{
                this.NoOfprojBLCS = result4.NoOfprojApproved;
                this.ProjCostBLCS = result4.Project_Cost;
                this.CSBLCS = result4.CentralShare;
                this.CABLCS = result4.CentralAssisRel;
                this.HSBLCS = result4.HousesSanctioned;
                this.HGBLCS = result4.Grounded;
                this.HCBLCS = result4.Completed;
                this.HOBLCS = result4.Occupied;

                //--------------------------
                //  CLSSCityWiseReportPMayListNew
                // this.service.CLSSCityWiseReportPMayList(this.stateCodes,this.districtCodes,this.cityCodes).subscribe(result5=>{
                // this.HOcc_CLSS=0;// fixed
                // this.CLSSLoanAmt=result5.Loan_Amount;
                // this.SubsidyAmtCr=result5.SubsidyAmountCredited;
                // this.NoofBene=result5.NoofBeneficiaries;
                this.service.CLSS_StateWiseReportPMayList(this.stateCodes, this.division).subscribe(resultCLSSState => {
                  this.HOcc_CLSS = 0;// fixed
                  // alert(resultCLSSState.Loan_EWS_LIG);
                  this.CLSSLoanAmt = <number><any>resultCLSSState.LoanTotal;// + <number><any>resultCLSSState.Loan_MIG;
                  this.SubsidyAmtCr = <number><any>resultCLSSState.SubsidyTotal;//+<number><any>resultCLSSState.Subsidy_MIG;
                  this.NoofBene = <number><any>resultCLSSState.totalBene;// +<number><any>resultCLSSState.No_Beneficiary_MIG;


                  //this.HOcc_RAY=result1.Occupied;

                  // this.HOcc_ISSR=12;
                  // this.HOcc_AHP=13;
                  // this.HOcc_BLCS=14;
                   
                  this.proj_Total = this.NoOfprojRay + this.HOcc_CLSS + this.NoOfprojISSR + this.NoOfprojAHP + this.NoOfprojBLCS;
                  this.ProjApp_Total = this.ProjCostRay + this.CLSSLoanAmt + this.ProjCostISSR + this.ProjCostAHP + this.ProjCostBLCS;
                  
                  //CAS_Total =CSRay + SubsidyAmtCr + CSISSR + CSAHP + CSBLCS 

                  this.CAS_Total = this.CSRay + this.SubsidyAmtCr + this.CSISSR + this.CSAHP + this.CSBLCS;
                  
                  
                  this.CAR_Total = this.CARay + this.SubsidyAmtCr + this.CAISSR + this.CAAHP + this.CABLCS;
                  this.HS_Total = this.HSRay + this.NoofBene + this.HSISSR + this.HSAHP + this.HSBLCS;


                  this.HG_Total = this.HGRay + this.NoofBene + this.HGISSR + this.HGAHP + this.HGBLCS + this.HGrnd_JN;
                  this.HC_Total = this.HCRay + this.NoofBene + this.HCISSR + this.HCAHP + this.HCBLCS + this.HComp_JN;
                  this.HO_Total = this.HORay + this.NoofBene + this.HOISSR + this.HOAHP + this.HOBLCS + this.HOcc_JN;

                  this.proj_Total = indianFormat(this.proj_Total);
                  this.ProjApp_Total = indianFormat1(this.ProjApp_Total);
                  this.CAS_Total = indianFormat1(this.CAS_Total);
                  this.CAR_Total = indianFormat1(this.CAR_Total);
                  this.HS_Total = indianFormat(this.HS_Total);
                  this.HG_Total = indianFormat(this.HG_Total);
                  this.HC_Total = indianFormat(this.HC_Total);
                  this.HO_Total = indianFormat(this.HO_Total);

                });
              });
            });
          });
        });
      });
    })

    // this.NoPApprovedRAY=1;
    // this.NoPApprovedJN=11;
    this.NoPApprovedCLSS = 0; //?

  }
  getStateDetails(stateCodes) {
    this.division ="HFA-5";
    //this.division ="HFA-1";
    // this.lblStateDisttCity =   this.States_UT;
    //alert(this.districtCodes);
    if (stateCodes == 0) {
      //alert(0);
      this.lblStateDisttCity = "All India";
    }
    else if (stateCodes != 0 && this.districtCodes.toString() == "0" && this.cityCodes.toString() == "0") {
      //alert(1);
      this.service.GetStateNameByCode(stateCodes).subscribe(resultName => {
        this.lblStateHeader = resultName.States_UT;
        this.lblStateDisttCity = this.lblStateHeader;
      });
    }
    else if (stateCodes != 0 && this.districtCodes.toString() != "0" && this.cityCodes.toString() == "0") {
      //alert(2);
      this.service.GetDisttNameByCode(stateCodes).subscribe(resultDisttName => {
        this.lblStateDisttCity = resultDisttName.District;
        this.lblStateDisttCity = this.lblDistHeader + " district of " + this.lblStateHeader;
      });
    }
    else if (stateCodes != 0 && this.districtCodes != "0" && this.cityCodes != "0") {
      this.service.GetCityNameByCode(this.cityCodes).subscribe(resultCityName => {
        this.lblCityHeader = resultCityName.City;
        this.lblStateDisttCity = this.lblCityHeader + " " + this.lblDistHeader + " district of " + this.lblStateHeader;
      });
    }


    if (stateCodes == "0") {
      this.division = "0";
      this.stateCodes = "0";
      this.districtCodes = "0";
      this.cityCodes = "0";
      this.service.StateList();
      this.service.DisttList(this.stateCodes);
      this.service.CityList(this.districtCodes);
      //  this.States_UT ="Delhi";


      this.distValue = "0";

      // this.service.StateList();
      //this.service.DisttList(this.stateCodes);
      //this.service.CityList(this.districtCodes);

      this.DistrictMessage = "Select District";
      this.service.DisttDetails = [];
      this.cityValue = "0";
      this.CityMessage = "Select City";
      this.service.CityDetails = [];
      this.districtCodes = "0";
      this.cityCodes = "0";
      if (stateCodes == 0) {
        this.districtCodes = "0";
        this.cityCodes = "0";
      }

      this.service.HFA_JNNURN_AtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result => {
        this.NoPApprovedJN = result.NoOfprojApproved;
        this.ProjCostApp_JN = result.ProjCostApproved;
        this.CShare_JN = result.CentralShare;
        this.CARel_JN = result.CentralAssisRel;
        this.HS_JN = result.HousesSanctioned;

        this.Grounded_JN = result.GroundedJN;
        this.Completed_JN = result.CompletedJN ;//CompletedJN;
        this.OccupiedJN = result.OccupiedJN;

        this.HGrnd_JN = result.Grounded;
        this.HComp_JN = result.Completed;
        this.HOcc_JN = result.Occupied;

        if(this.HComp_JN > 0)
        {
            this.not7ShowHide=false;
        }
         else{
            this.not7ShowHide=true;
         }
        if(this.HOcc_JN > 0)
        {
           this.not8ShowHide=false;
        }
        else{
           this.not8ShowHide=true;
        }

        this.service.CompRAYAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result1 => {
          this.NoOfprojRay = result1.NoOfprojApproved;
          this.ProjCostRay = result1.Project_Cost;
          this.CSRay = result1.CentralShare;
          this.CARay = result1.CentralAssisRel;
          this.HSRay = result1.HousesSanctioned;
          this.HGRay = result1.Grounded;
          this.HCRay = result1.Completed;
          this.HORay = result1.Occupied;
          this.service.CompISSRAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result2 => {
            this.NoOfprojISSR = result2.NoOfprojApproved;
            this.ProjCostISSR = result2.Project_Cost;
            this.CSISSR = result2.CentralShare;
            this.CAISSR = result2.CentralAssisRel;
            this.HSISSR = result2.HousesSanctioned;
            this.HGISSR = result2.Grounded;
            this.HCISSR = result2.Completed;
            this.HOISSR = result2.Occupied;
            this.service.CompAHPAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result3 => {
              this.NoOfprojAHP = result3.NoOfprojApproved;
              this.ProjCostAHP = result3.Project_Cost;
              this.CSAHP = result3.CentralShare;
              this.CAAHP = result3.CentralAssisRel;
              this.HSAHP = result3.HousesSanctioned;
              this.HGAHP = result3.Grounded;
              this.HCAHP = result3.Completed;
              this.HOAHP = result3.Occupied;

              this.service.CompBLCSAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result4 => {
                this.NoOfprojBLCS = result4.NoOfprojApproved;
                this.ProjCostBLCS = result4.Project_Cost;
                this.CSBLCS = result4.CentralShare;
                this.CABLCS = result4.CentralAssisRel;
                this.HSBLCS = result4.HousesSanctioned;
                this.HGBLCS = result4.Grounded;
                this.HCBLCS = result4.Completed;
                this.HOBLCS = result4.Occupied;

                this.service.CLSS_StateWiseReportPMayList(this.stateCodes, this.division).subscribe(resultCLSSState => {
                  this.HOcc_CLSS = 0;// fixed
                  this.CLSSLoanAmt = <number><any>resultCLSSState.LoanTotal;// + <number><any>resultCLSSState.Loan_MIG;
                  this.SubsidyAmtCr = <number><any>resultCLSSState.SubsidyTotal;//+<number><any>resultCLSSState.Subsidy_MIG;
                  this.NoofBene = <number><any>resultCLSSState.totalBene;// +<number><any>resultCLSSState.No_Beneficiary_MIG;


                  this.proj_Total = this.NoOfprojRay + this.HOcc_CLSS + this.NoOfprojISSR + this.NoOfprojAHP + this.NoOfprojBLCS;
                  this.ProjApp_Total = this.ProjCostRay + this.CLSSLoanAmt + this.ProjCostISSR + this.ProjCostAHP + this.ProjCostBLCS;
                  this.CAS_Total = this.CSRay + this.SubsidyAmtCr + this.CSISSR + this.CSAHP + this.CSBLCS;
                  this.CAR_Total = this.CARay + this.SubsidyAmtCr + this.CAISSR + this.CAAHP + this.CABLCS;
                  this.HS_Total = this.HSRay + this.NoofBene + this.HSISSR + this.HSAHP + this.HSBLCS;
                  //this.HG_Total = this.HGRay + this.NoofBene  +this.HGISSR + this.HGAHP + this.HGBLCS ;
                  // this.HC_Total = this.HCRay + this.NoofBene  +this.HCISSR + this.HCAHP + this.HCBLCS ;
                  // this.HO_Total = this.HORay + this.NoofBene  +this.HOISSR + this.HOAHP + this.HOBLCS ;

                  this.HG_Total = this.HGRay + this.NoofBene + this.HGISSR + this.HGAHP + this.HGBLCS + this.HGrnd_JN;
                  this.HC_Total = this.HCRay + this.NoofBene + this.HCISSR + this.HCAHP + this.HCBLCS + this.HComp_JN;
                  this.HO_Total = this.HORay + this.NoofBene + this.HOISSR + this.HOAHP + this.HOBLCS + this.HOcc_JN;

                  this.proj_Total = indianFormat(this.proj_Total);
                  this.ProjApp_Total = indianFormat1(this.ProjApp_Total);
                  this.CAS_Total = indianFormat1(this.CAS_Total);
                  this.CAR_Total = indianFormat1(this.CAR_Total);
                  this.HS_Total = indianFormat(this.HS_Total);
                  this.HG_Total = indianFormat(this.HG_Total);
                  this.HC_Total = indianFormat(this.HC_Total);
                  this.HO_Total = indianFormat(this.HO_Total);

                  this.lblStateDisttCity = this.stateCodes;
                });
              });
            });
          });
        });
      });
      this.division ="HFA-5";
    }
    else {
      this.stateCodes = stateCodes;
      this.service.DisttList(stateCodes);

      this.service.CityList(this.districtCodes);//

      this.service.HFACityWiseReportPMayList(stateCodes, this.districtCodes, this.cityCodes);
      this.service.CLSSCityWiseReportPMayList(stateCodes, this.districtCodes, this.cityCodes);
      // this.service.JNNURMCityWiseAtAGlance(stateCodes,this.districtCodes,this.cityCodes);

      this.service.HFA_JNNURN_AtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result => {
        this.NoPApprovedJN = result.NoOfprojApproved;
        this.ProjCostApp_JN = result.ProjCostApproved;
        this.CShare_JN = result.CentralShare;
        this.CARel_JN = result.CentralAssisRel;
        this.HS_JN = result.HousesSanctioned;

        this.Grounded_JN = result.GroundedJN;
        this.Completed_JN = result.CompletedJN;//CompletedJN;
        this.OccupiedJN = result.OccupiedJN;


        this.HGrnd_JN = result.Grounded;
        this.HComp_JN = result.Completed;
        this.HOcc_JN = result.Occupied;

        if(this.HComp_JN > 0)
        {
            this.not7ShowHide=false;
        }
         else{
            this.not7ShowHide=true;
         }
        if(this.HOcc_JN > 0)
        {
           this.not8ShowHide=false;
        }
        else{
           this.not8ShowHide=true;
        }        
        this.service.CompRAYAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result1 => {
          this.NoOfprojRay = result1.NoOfprojApproved;
          this.ProjCostRay = result1.Project_Cost;
          this.CSRay = result1.CentralShare;
          this.CARay = result1.CentralAssisRel;
          this.HSRay = result1.HousesSanctioned;
          this.HGRay = result1.Grounded;
          this.HCRay = result1.Completed;
          this.HORay = result1.Occupied;
          this.service.CompISSRAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result2 => {
            this.NoOfprojISSR = result2.NoOfprojApproved;
            this.ProjCostISSR = result2.Project_Cost;
            this.CSISSR = result2.CentralShare;
            this.CAISSR = result2.CentralAssisRel;
            this.HSISSR = result2.HousesSanctioned;
            this.HGISSR = result2.Grounded;
            this.HCISSR = result2.Completed;
            this.HOISSR = result2.Occupied;
            this.service.CompAHPAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result3 => {
              this.NoOfprojAHP = result3.NoOfprojApproved;
              this.ProjCostAHP = result3.Project_Cost;
              this.CSAHP = result3.CentralShare;
              this.CAAHP = result3.CentralAssisRel;
              this.HSAHP = result3.HousesSanctioned;
              this.HGAHP = result3.Grounded;
              this.HCAHP = result3.Completed;
              this.HOAHP = result3.Occupied;

              this.service.CompBLCSAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result4 => {
                this.NoOfprojBLCS = result4.NoOfprojApproved;
                this.ProjCostBLCS = result4.Project_Cost;
                this.CSBLCS = result4.CentralShare;
                this.CABLCS = result4.CentralAssisRel;
                this.HSBLCS = result4.HousesSanctioned;
                this.HGBLCS = result4.Grounded;
                this.HCBLCS = result4.Completed;
                this.HOBLCS = result4.Occupied;

                this.service.CLSS_StateWiseReportPMayList(this.stateCodes, this.division).subscribe(resultCLSSState => {
                  this.HOcc_CLSS = 0;// fixed
                  this.CLSSLoanAmt = <number><any>resultCLSSState.LoanTotal;// + <number><any>resultCLSSState.Loan_MIG;
                  this.SubsidyAmtCr = <number><any>resultCLSSState.SubsidyTotal;//+<number><any>resultCLSSState.Subsidy_MIG;
                  this.NoofBene = <number><any>resultCLSSState.totalBene;// +<number><any>resultCLSSState.No_Beneficiary_MIG;


                  //  this.HOcc_RAY=result1.Occupied;

                  //--------------------
                  if (result.NoOfprojApproved != null) {
                    this.NoPApprovedJN = result.NoOfprojApproved;
                    this.HOcc_JN = result.Occupied;
                    this.ProjApp_JN = result.NoOfprojApproved;
                    this.ProjCostApp_JN = result.ProjCostApproved;

                    this.HS_JN = result.HousesSanctioned;

                    this.CARel_JN = result.CentralAssisRel;
                    this.CShare_JN = result.CentralShare;



                    this.Grounded_JN = result.GroundedJN;
                    this.Completed_JN = result.CompletedJN;//CompletedJN;
                    this.OccupiedJN = result.OccupiedJN;


                    this.HGrnd_JN = result.Grounded;
                    this.HComp_JN = result.Completed;
                    this.HOcc_JN = result.Occupied;


                  }
                  else {
                    this.NoPApprovedJN = 0;//result.NoOfprojApproved;
                    this.HOcc_JN = 0;//result.Occupied;
                    this.ProjApp_JN = 0;//result.NoOfprojApproved;
                    this.ProjCostApp_JN = 0;//result.ProjCostApproved;
                    this.Grounded_JN = 0;//result.Grounded;
                    this.Completed_JN = 0;//result.Completed;
                    this.Occupied_JN = 0;//result.Occupied;
                    this.HS_JN = 0;//result.HousesSanctioned;
                    this.CARel_JN = 0;//result.CentralAssisRel;
                    this.CShare_JN = 0;//result.CentralShare;

                  }
                  if (result1.NoOfprojApproved != null) {
                    // alert(result1.NoOfprojApproved);
                    // this.NoPApprovedJN=result.NoOfprojApproved;
                    this.HOcc_RAY = result1.Occupied;
                    this.NoOfprojRay = result1.NoOfprojApproved;
                    // alert(this.NoOfprojRay);
                    this.ProjCostRay = result1.Project_Cost;

                    this.CSRay = result1.CentralShare;
                    this.CARay = result1.CentralAssisRel;
                    this.HSRay = result1.HousesSanctioned;
                    this.HGRay = result1.Grounded;
                    this.HCRay = result1.Completed;
                    this.HORay = result1.Occupied;


                    // alert(this.HOcc_RAY);
                    // this.HOcc_CLSS=0;// fixed
                    //  this.HOcc_ISSR=12;
                    //  this.HOcc_AHP=13;
                    //  this.HOcc_BLCS=14;
                    //  this.HOcc_Total =this.HOcc_JN + this.HOcc_RAY + this.HOcc_CLSS + this.HOcc_ISSR +this.HOcc_AHP + this.HOcc_BLCS
                  }
                  else {
                    //  alert();
                    // this.NoPApprovedJN=result.NoOfprojApproved;


                    this.NoOfprojRay = 0;// result1.NoOfprojApproved;

                    //this.NoOfprojRay1= "zero";
                    // alert(this.NoOfprojRay);
                    this.ProjCostRay = 0;//result1.Project_Cost;
                    this.CSRay = 0;//result1.CentralShare;
                    this.CARay = 0;//result1.CentralAssisRel;
                    this.HSRay = 0;//result1.HousesSanctioned;
                    this.HGRay = 0;//result1.Grounded;
                    this.HCRay = 0;//result1.Completed;
                    this.HORay = 0;//result1.Occupied;
                    this.HOcc_RAY = 0;


                    //   this.HOcc_CLSS=0;// fixed
                    //   this.HOcc_ISSR=12;
                    //   this.HOcc_AHP=13;
                    //   this.HOcc_BLCS=14;
                    //this.HOcc_Total =this.HOcc_JN + this.HOcc_RAY + this.HOcc_CLSS + this.HOcc_ISSR +this.HOcc_AHP + this.HOcc_BLCS
                  }

                  if (result2.NoOfprojApproved != null) {
                    this.NoOfprojISSR = result2.NoOfprojApproved;
                    this.ProjCostISSR = result2.Project_Cost;
                    this.CSISSR = result2.CentralShare;
                    this.CAISSR = result2.CentralAssisRel;
                    this.HSISSR = result2.HousesSanctioned;
                    this.HGISSR = result2.Grounded;
                    this.HCISSR = result2.Completed;
                    this.HOISSR = result2.Occupied;
                  }
                  else {
                    this.NoOfprojISSR = 0;//result2.NoOfprojApproved;
                    this.ProjCostISSR = 0;//result2.Project_Cost;
                    this.CSISSR = 0;//result2.CentralShare;
                    this.CAISSR = 0;//result2.CentralAssisRel;
                    this.HSISSR = 0;//result2.HousesSanctioned;
                    this.HGISSR = 0;//result2.Grounded;
                    this.HCISSR = 0;//result2.Completed;
                    this.HOISSR = 0;//result2.Occupied;
                  }
                  if (result3.NoOfprojApproved != null) {
                    this.NoOfprojAHP = result3.NoOfprojApproved;
                    this.ProjCostAHP = result3.Project_Cost;
                    this.CSAHP = result3.CentralShare;
                    this.CAAHP = result3.CentralAssisRel;
                    this.HSAHP = result3.HousesSanctioned;
                    this.HGAHP = result3.Grounded;
                    this.HCAHP = result3.Completed;
                    this.HOAHP = result3.Occupied;
                  }
                  else {
                    this.NoOfprojAHP = 0;//result3.NoOfprojApproved;
                    this.ProjCostAHP = 0;//result3.Project_Cost;
                    this.CSAHP = 0;//result3.CentralShare;
                    this.CAAHP = 0;//result3.CentralAssisRel;
                    this.HSAHP = 0;//result3.HousesSanctioned;
                    this.HGAHP = 0;//result3.Grounded;
                    this.HCAHP = 0;//result3.Completed;
                    this.HOAHP = 0;//result3.Occupied;
                  }

                  if (result4.NoOfprojApproved != null) {

                    this.NoOfprojBLCS = result4.NoOfprojApproved;
                    this.ProjCostBLCS = result4.Project_Cost;
                    this.CSBLCS = result4.CentralShare;
                    this.CABLCS = result4.CentralAssisRel;
                    this.HSBLCS = result4.HousesSanctioned;
                    this.HGBLCS = result4.Grounded;
                    this.HCBLCS = result4.Completed;
                    this.HOBLCS = result4.Occupied;
                  }
                  else {
                    this.NoOfprojBLCS = 0;//result4.NoOfprojApproved;
                    this.ProjCostBLCS = 0;//result4.Project_Cost;
                    this.CSBLCS = 0;//result4.CentralShare;
                    this.CABLCS = 0;//result4.CentralAssisRel;
                    this.HSBLCS = 0;//result4.HousesSanctioned;
                    this.HGBLCS = 0;//result4.Grounded;
                    this.HCBLCS = 0;//result4.Completed;
                    this.HOBLCS = 0;//result4.Occupied;
                  }
                  if (resultCLSSState != null) {
                    this.CLSSLoanAmt = <number><any>resultCLSSState.LoanTotal;// + <number><any>resultCLSSState.Loan_MIG;
                    this.SubsidyAmtCr = <number><any>resultCLSSState.SubsidyTotal;//+<number><any>resultCLSSState.Subsidy_MIG;
                    this.NoofBene = <number><any>resultCLSSState.totalBene;// +<number><any>resultCLSSState.No_Beneficiary_MIG;
                  }
                  else {
                    this.CLSSLoanAmt = 0;//result5.Loan_Amount;
                    this.SubsidyAmtCr = 0;//result5.SubsidyAmountCredited;
                    this.NoofBene = 0;//result5.NoofBeneficiaries;

                  }
                  if (this.CLSSLoanAmt == "" || this.CLSSLoanAmt == null)
                    this.CLSSLoanAmt = 0

                  if (this.SubsidyAmtCr == "" || this.SubsidyAmtCr == null)
                    this.SubsidyAmtCr = 0
                  if (this.NoofBene == "" || this.NoofBene == null)
                    this.NoofBene = 0


                  this.proj_Total = this.NoOfprojRay + this.HOcc_CLSS + this.NoOfprojISSR + this.NoOfprojAHP + this.NoOfprojBLCS;
                  this.ProjApp_Total = this.ProjCostRay + this.CLSSLoanAmt + this.ProjCostISSR + this.ProjCostAHP + this.ProjCostBLCS;
                  this.CAS_Total = this.CSRay + this.SubsidyAmtCr + this.CSISSR + this.CSAHP + this.CSBLCS;
                  this.CAR_Total = this.CARay + this.SubsidyAmtCr + this.CAISSR + this.CAAHP + this.CABLCS;
                  this.HS_Total = this.HSRay + this.NoofBene + this.HSISSR + this.HSAHP + this.HSBLCS;
                  //     this.HG_Total =  this.HGRay + this.NoofBene  +this.HGISSR + this.HGAHP + this.HGBLCS ;
                  //     this.HC_Total =  this.HCRay + this.NoofBene  +this.HCISSR + this.HCAHP + this.HCBLCS ;
                  //     this.HO_Total = this.HORay + this.NoofBene  +this.HOISSR + this.HOAHP + this.HOBLCS ;

                  this.HG_Total = this.HGRay + this.NoofBene + this.HGISSR + this.HGAHP + this.HGBLCS + this.HGrnd_JN;
                  this.HC_Total = this.HCRay + this.NoofBene + this.HCISSR + this.HCAHP + this.HCBLCS + this.HComp_JN;
                  this.HO_Total = this.HORay + this.NoofBene + this.HOISSR + this.HOAHP + this.HOBLCS + this.HOcc_JN;


                  this.proj_Total = indianFormat(this.proj_Total);
                  this.ProjApp_Total = indianFormat1(this.ProjApp_Total);
                  this.CAS_Total = indianFormat1(this.CAS_Total);
                  this.CAR_Total = indianFormat1(this.CAR_Total);
                  this.HS_Total = indianFormat(this.HS_Total);
                  this.HG_Total = indianFormat(this.HG_Total);
                  this.HC_Total = indianFormat(this.HC_Total);
                  this.HO_Total = indianFormat(this.HO_Total);


                });
              });
            });
          });
        });
      });

      // this.proj_Total =this.NoPApprovedJN + this.NoOfprojRay + this.HOcc_CLSS + this.NoOfprojISSR +this.NoOfprojAHP + this.NoOfprojBLCS ;
      // this.ProjApp_Total =this.ProjCostApp_JN + this.ProjCostRay + this.CLSSLoanAmt + this.ProjCostISSR +this.ProjCostAHP + this.ProjCostBLCS ;
      // this.CAS_Total =this.CARel_JN + this.CSRay + this.SubsidyAmtCr  +this.CSISSR + this.CSAHP + this.ProjCostBLCS ;
      // this.CAR_Total =this.CARel_JN + this.CARay + this.SubsidyAmtCr  +this.CAISSR + this.CAAHP + this.CABLCS ;
      // this.HS_Total =this.HS_JN + this.HSRay + this.NoofBene  +this.HSISSR + this.HSAHP + this.HSBLCS ;
      // this.HG_Total =this.Grounded_JN + this.HGRay + this.NoofBene  +this.HGISSR + this.HGAHP + this.HGBLCS ;
      // this.HC_Total =this.Completed_JN + this.HCRay + this.NoofBene  +this.HCISSR + this.HCAHP + this.HCBLCS ;
      // this.HO_Total =this.HOcc_JN + this.HORay + this.NoofBene  +this.HOISSR + this.HOAHP + this.HOBLCS ;
      //-------------------------------------
    }

  }
  getDistrictDetails(DisttCode) {
    //  this.stateCodes,this.districtCodes,this.cityCodes
    this.division ="HFA-5";
    if (this.stateCodes == "0") {
      this.lblStateDisttCity = "All India";
    }
    else if (this.stateCodes != "0" && DisttCode == "0" && this.cityCodes == "0") {
      this.service.GetStateNameByCode(this.stateCodes).subscribe(resultName => {
        this.lblStateHeader = resultName.States_UT;
      });
    }
    else if (this.stateCodes != "0" && DisttCode != "0" && this.cityCodes == "0") {
      this.service.GetDisttNameByCode(DisttCode).subscribe(resultDisttName => {
        this.lblDistHeader = resultDisttName.District;
        this.lblStateDisttCity = this.lblDistHeader + " district of " + this.lblStateHeader;
      });
    }
    else if (this.stateCodes != "0" && DisttCode != "0" && this.cityCodes != "0") {

      this.service.GetCityNameByCode(this.cityCodes).subscribe(resultCityName => {
        this.lblCityHeader = resultCityName.City;
        this.lblStateDisttCity = this.lblCityHeader + " " + this.lblDistHeader + " district of " + this.lblStateHeader;
      });
    }


    //   alert(DisttCode);
    //this.division ="HFA-1";
    if (DisttCode == "0") {
      this.cityValue = "0";
      this.CityMessage = "Select City";
      this.service.CityDetails = [];
      this.cityCodes = "0";

      this.distValue = "0";
      this.cityValue = "0";
      if (DisttCode == "0") {
        this.districtCodes = "0";
        this.cityCodes = "0";
      }



      this.service.HFA_JNNURN_AtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result => {
        this.NoPApprovedJN = result.NoOfprojApproved;
        this.ProjCostApp_JN = result.ProjCostApproved;
        this.CShare_JN = result.CentralShare;
        this.CARel_JN = result.CentralAssisRel;
        this.HS_JN = result.HousesSanctioned;
        this.Grounded_JN = result.GroundedJN;
        this.Completed_JN = result.CompletedJN;//CompletedJN;
        this.OccupiedJN = result.OccupiedJN;

        this.HGrnd_JN = result.Grounded;
        this.HComp_JN = result.Completed;
        this.HOcc_JN = result.Occupied;

        if(this.HComp_JN > 0)
        {
            this.not7ShowHide=false;
        }
         else{
            this.not7ShowHide=true;
         }
        if(this.HOcc_JN > 0)
        {
           this.not8ShowHide=false;
        }
        else{
           this.not8ShowHide=true;
        }

        this.service.CompRAYAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result1 => {
          this.NoOfprojRay = result1.NoOfprojApproved;
          this.ProjCostRay = result1.Project_Cost;
          this.CSRay = result1.CentralShare;
          this.CARay = result1.CentralAssisRel;
          this.HSRay = result1.HousesSanctioned;
          this.HGRay = result1.Grounded;
          this.HCRay = result1.Completed;
          this.HORay = result1.Occupied;
          this.service.CompISSRAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result2 => {
            this.NoOfprojISSR = result2.NoOfprojApproved;
            this.ProjCostISSR = result2.Project_Cost;
            this.CSISSR = result2.CentralShare;
            this.CAISSR = result2.CentralAssisRel;
            this.HSISSR = result2.HousesSanctioned;
            this.HGISSR = result2.Grounded;
            this.HCISSR = result2.Completed;
            this.HOISSR = result2.Occupied;
            this.service.CompAHPAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result3 => {
              this.NoOfprojAHP = result3.NoOfprojApproved;
              this.ProjCostAHP = result3.Project_Cost;
              this.CSAHP = result3.CentralShare;
              this.CAAHP = result3.CentralAssisRel;
              this.HSAHP = result3.HousesSanctioned;
              this.HGAHP = result3.Grounded;
              this.HCAHP = result3.Completed;
              this.HOAHP = result3.Occupied;

              this.service.CompBLCSAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result4 => {
                this.NoOfprojBLCS = result4.NoOfprojApproved;
                this.ProjCostBLCS = result4.Project_Cost;
                this.CSBLCS = result4.CentralShare;
                this.CABLCS = result4.CentralAssisRel;
                this.HSBLCS = result4.HousesSanctioned;
                this.HGBLCS = result4.Grounded;
                this.HCBLCS = result4.Completed;
                this.HOBLCS = result4.Occupied;

                this.service.CLSSCityWiseReportPMayListNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(resultCLSSState => {
                  this.HOcc_CLSS = 0;// fixed
                  this.CLSSLoanAmt = <number><any>resultCLSSState.TotalLoanAmt;// + <number><any>resultCLSSState.Loan_MIG;
                  this.SubsidyAmtCr = <number><any>resultCLSSState.TotalSubsidy;//+<number><any>resultCLSSState.Subsidy_MIG;
                  this.NoofBene = <number><any>resultCLSSState.TotalBeneficiary;// +<number><any>resultCLSSState.No_Beneficiary_MIG;

                  // alert(this.CLSSLoanAmt);

                  if (this.CLSSLoanAmt == "" || this.CLSSLoanAmt == null)
                    this.CLSSLoanAmt = 0

                  if (this.SubsidyAmtCr == "" || this.SubsidyAmtCr == null)
                    this.SubsidyAmtCr = 0
                  if (this.NoofBene == "" || this.NoofBene == null)
                    this.NoofBene = 0
                  //--------------------------

                  //this.HOcc_RAY=result1.Occupied;

                  // this.HOcc_ISSR=12;
                  // this.HOcc_AHP=13;
                  // this.HOcc_BLCS=14;

                  // this.ProjApp_Total =this.NoPApprovedJN + this.ProjApp_RAY + this.ProjApp_CLSS + this.ProjApp_ISSR +this.ProjApp_AHP + this.ProjApp_BLCS
                  // this.PCApp_Total =this.NoPCApprovedJN + this.ProjCApp_RAY + this.ProjCApp_CLSS + this.ProjCApp_ISSR +this.ProjCApp_AHP + this.ProjCApp_BLCS
                  // this.CAS_Total =this.ProjCostApp_JN + this.CAS_RAY + this.CAS_CLSS + this.CAS_ISSR +this.CAS_AHP + this.CAS_BLCS
                  // this.CAR_Total =this.CARel_JN + this.CAR_RAY + this.CAR_CLSS + this.CAR_ISSR +this.CAR_AHP + this.CAR_BLCS
                  // this.HS_Total =this.HS_JN + this.HS_RAY + this.HS_CLSS + this.HS_ISSR +this.HS_AHP + this.HS_BLCS

                  //this.HOcc_Total =this.HOcc_JN + this.HOcc_RAY + this.HOcc_CLSS + this.HOcc_ISSR +this.HOcc_AHP + this.HOcc_BLCS ;
                  if (this.ProjCostRay.toString() == "")
                    this.ProjCostRay = 0;
                  if (this.CLSSLoanAmt.toString() == "")
                    this.CLSSLoanAmt = 0
                  if (this.ProjCostISSR.toString() == "")
                    this.ProjCostISSR = 0
                  if (this.ProjCostAHP.toString() == "")
                    this.ProjCostAHP = 0
                  if (this.ProjCostBLCS.toString() == "")
                    this.ProjCostBLCS = 0

                  // this.Grounded_JN=result.GroundedJN;
                  //     this.Completed_JN=result.CompletedJN;
                  //     this.OccupiedJN=result.OccupiedJN;
                  // alert(this.HGRay);
                  // alert(this.NoofBene);
                  // alert(this.HGISSR);
                  // alert(this.HGAHP);
                  // alert(this.HGBLCS);
                  // alert(this.Grounded_JN);
                  this.proj_Total = this.NoOfprojRay + this.HOcc_CLSS + this.NoOfprojISSR + this.NoOfprojAHP + this.NoOfprojBLCS;
                  this.ProjApp_Total = this.ProjCostRay + this.CLSSLoanAmt + this.ProjCostISSR + this.ProjCostAHP + this.ProjCostBLCS;
                  this.CAS_Total = this.CSRay + this.SubsidyAmtCr + this.CSISSR + this.CSAHP + this.CSBLCS;
                  this.CAR_Total = this.CARay + this.SubsidyAmtCr + this.CAISSR + this.CAAHP + this.CABLCS;
                  this.HS_Total = this.HSRay + this.NoofBene + this.HSISSR + this.HSAHP + this.HSBLCS;
                  this.HG_Total = this.HGRay + this.NoofBene + this.HGISSR + this.HGAHP + this.HGBLCS + this.HGrnd_JN;
                  this.HC_Total = this.HCRay + this.NoofBene + this.HCISSR + this.HCAHP + this.HCBLCS + this.HComp_JN;
                  this.HO_Total = this.HORay + this.NoofBene + this.HOISSR + this.HOAHP + this.HOBLCS + this.HOcc_JN;

                  this.proj_Total = indianFormat(this.proj_Total);
                  this.ProjApp_Total = indianFormat1(this.ProjApp_Total);
                  this.CAS_Total = indianFormat1(this.CAS_Total);
                  this.CAR_Total = indianFormat1(this.CAR_Total);
                  this.HS_Total = indianFormat(this.HS_Total);
                  this.HG_Total = indianFormat(this.HG_Total);
                  this.HC_Total = indianFormat(this.HC_Total);
                  this.HO_Total = indianFormat(this.HO_Total);


                });
              });
            });
          });
        });
      });

    }
    else {
      // this.division ="HFA-1";

      this.districtCodes = DisttCode;
      this.service.CityList(DisttCode);
      this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.JNNURMCityWiseAtAGlance(this.stateCodes, this.districtCodes, this.cityCodes);
      //alert(DisttCode);
      //-------------------------------

      //------------------------

      this.service.HFA_JNNURN_AtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result => {
        this.NoPApprovedJN = result.NoOfprojApproved;
        this.ProjCostApp_JN = result.ProjCostApproved;
        this.CShare_JN = result.CentralShare;
        this.CARel_JN = result.CentralAssisRel;
        this.HS_JN = result.HousesSanctioned;
        this.Grounded_JN = result.GroundedJN;
        this.Completed_JN = result.CompletedJN;//CompletedJN;
        this.OccupiedJN = result.OccupiedJN;
        this.HGrnd_JN = result.Grounded;
        this.HComp_JN = result.Completed;
        this.HOcc_JN = result.Occupied;
        //alert(this.Grounded_JN);
        
        
        if(this.HComp_JN > 0)
        {
            this.not7ShowHide=false;
        }
         else{
            this.not7ShowHide=true;
         }
        if(this.HOcc_JN > 0)
        {
           this.not8ShowHide=false;
        }
        else{
           this.not8ShowHide=true;
        }

        this.service.CompRAYAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result1 => {
          this.NoOfprojRay = result1.NoOfprojApproved;
          this.ProjCostRay = result1.Project_Cost;
          this.CSRay = result1.CentralShare;
          this.CARay = result1.CentralAssisRel;
          this.HSRay = result1.HousesSanctioned;
          this.HGRay = result1.Grounded;
          this.HCRay = result1.Completed;
          this.HORay = result1.Occupied;
          this.service.CompISSRAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result2 => {
            this.NoOfprojISSR = result2.NoOfprojApproved;
            this.ProjCostISSR = result2.Project_Cost;
            this.CSISSR = result2.CentralShare;
            this.CAISSR = result2.CentralAssisRel;
            this.HSISSR = result2.HousesSanctioned;
            this.HGISSR = result2.Grounded;
            this.HCISSR = result2.Completed;
            this.HOISSR = result2.Occupied;
            this.service.CompAHPAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result3 => {
              this.NoOfprojAHP = result3.NoOfprojApproved;
              this.ProjCostAHP = result3.Project_Cost;
              this.CSAHP = result3.CentralShare;
              this.CAAHP = result3.CentralAssisRel;
              this.HSAHP = result3.HousesSanctioned;
              this.HGAHP = result3.Grounded;
              this.HCAHP = result3.Completed;
              this.HOAHP = result3.Occupied;

              this.service.CompBLCSAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result4 => {
                this.NoOfprojBLCS = result4.NoOfprojApproved;
                this.ProjCostBLCS = result4.Project_Cost;
                this.CSBLCS = result4.CentralShare;
                this.CABLCS = result4.CentralAssisRel;
                this.HSBLCS = result4.HousesSanctioned;
                this.HGBLCS = result4.Grounded;
                this.HCBLCS = result4.Completed;
                this.HOBLCS = result4.Occupied;

                this.service.CLSSCityWiseReportPMayListNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(resultCLSSState => {
                  this.HOcc_CLSS = 0;// fixed
                  this.CLSSLoanAmt = <number><any>resultCLSSState.TotalLoanAmt;// + <number><any>resultCLSSState.Loan_MIG;
                  this.SubsidyAmtCr = <number><any>resultCLSSState.TotalSubsidy;//+<number><any>resultCLSSState.Subsidy_MIG;
                  this.NoofBene = <number><any>resultCLSSState.TotalBeneficiary;// +<number><any>resultCLSSState.No_Beneficiary_MIG;
                  // alert(this.CLSSLoanAmt);

                  //--------------
                  if (result.NoOfprojApproved != null && result.NoOfprojApproved != 0) {
                    // alert(result.NoOfprojApproved);
                    this.NoPApprovedJN = result.NoOfprojApproved;
                    this.HOcc_JN = result.Occupied;
                    this.ProjApp_JN = result.NoOfprojApproved;
                    this.ProjCostApp_JN = result.ProjCostApproved;

                    this.Grounded_JN = result.GroundedJN;
                    this.Completed_JN = result.CompletedJN;//CompletedJN;
                    this.OccupiedJN = result.OccupiedJN;


                    this.HGrnd_JN = result.Grounded;
                    this.HComp_JN = result.Completed;
                    this.HOcc_JN = result.Occupied;

                    this.HS_JN = result.HousesSanctioned;
                    this.CARel_JN = result.CentralAssisRel;
                    this.CShare_JN = result.CentralShare;


                    this.HS_JN = result.HousesSanctioned;
                    // this.Grounded_JN=result.GroundedJN;
                    // this.Completed_JN=result.CompletedJN;
                    // this.OccupiedJN=result.OccupiedJN;

                    this.HGrnd_JN = result.Grounded;
                    this.HComp_JN = result.Completed;
                    this.HOcc_JN = result.Occupied;

                  }
                  else {
                    // alert(2);
                    this.NoPApprovedJN = 0;//result.NoOfprojApproved;
                    this.HOcc_JN = 0;//result.Occupied;
                    this.ProjApp_JN = 0;//result.NoOfprojApproved;
                    this.ProjCostApp_JN = 0;//result.ProjCostApproved;
                    this.Grounded_JN = 0;//result.Grounded;
                    this.Completed_JN = 0;//result.Completed;
                    this.Occupied_JN = 0;//result.Occupied;
                    this.HS_JN = 0;//result.HousesSanctioned;
                    this.CARel_JN = 0;//result.CentralAssisRel;
                    this.CShare_JN = 0;//result.CentralShare;
                  }

                  if (result1.NoOfprojApproved != null) {
                    // alert(result1.NoOfprojApproved);
                    // this.NoPApprovedJN=result.NoOfprojApproved;
                    this.HOcc_RAY = result1.Occupied;
                    this.NoOfprojRay = result1.NoOfprojApproved;
                    // alert(this.NoOfprojRay);
                    this.ProjCostRay = result1.Project_Cost;

                    this.CSRay = result1.CentralShare;
                    this.CARay = result1.CentralAssisRel;
                    this.HSRay = result1.HousesSanctioned;
                    this.HGRay = result1.Grounded;
                    this.HCRay = result1.Completed;
                    this.HORay = result1.Occupied;


                    // alert(this.HOcc_RAY);
                    // this.HOcc_CLSS=0;// fixed
                    //  this.HOcc_ISSR=12;
                    //  this.HOcc_AHP=13;
                    //  this.HOcc_BLCS=14;
                    //  this.HOcc_Total =this.HOcc_JN + this.HOcc_RAY + this.HOcc_CLSS + this.HOcc_ISSR +this.HOcc_AHP + this.HOcc_BLCS
                  }
                  else {
                    //  alert();
                    // this.NoPApprovedJN=result.NoOfprojApproved;


                    this.NoOfprojRay = 0;// result1.NoOfprojApproved;

                    //this.NoOfprojRay1= "zero";
                    // alert(this.NoOfprojRay);
                    this.ProjCostRay = 0;//result1.Project_Cost;
                    this.CSRay = 0;//result1.CentralShare;
                    this.CARay = 0;//result1.CentralAssisRel;
                    this.HSRay = 0;//result1.HousesSanctioned;
                    this.HGRay = 0;//result1.Grounded;
                    this.HCRay = 0;//result1.Completed;
                    this.HORay = 0;//result1.Occupied;
                    this.HOcc_RAY = 0;


                    //   this.HOcc_CLSS=0;// fixed
                    //   this.HOcc_ISSR=12;
                    //   this.HOcc_AHP=13;
                    //   this.HOcc_BLCS=14;
                    this.HOcc_Total = this.HOcc_JN + this.HOcc_RAY + this.HOcc_CLSS + this.HOcc_ISSR + this.HOcc_AHP + this.HOcc_BLCS
                  }

                  if (result2.NoOfprojApproved != null) {
                    this.NoOfprojISSR = result2.NoOfprojApproved;
                    this.ProjCostISSR = result2.Project_Cost;
                    this.CSISSR = result2.CentralShare;
                    this.CAISSR = result2.CentralAssisRel;
                    this.HSISSR = result2.HousesSanctioned;
                    this.HGISSR = result2.Grounded;
                    this.HCISSR = result2.Completed;
                    this.HOISSR = result2.Occupied;
                  }
                  else {
                    this.NoOfprojISSR = 0;//result2.NoOfprojApproved;
                    this.ProjCostISSR = 0;//result2.Project_Cost;
                    this.CSISSR = 0;//result2.CentralShare;
                    this.CAISSR = 0;//result2.CentralAssisRel;
                    this.HSISSR = 0;//result2.HousesSanctioned;
                    this.HGISSR = 0;//result2.Grounded;
                    this.HCISSR = 0;//result2.Completed;
                    this.HOISSR = 0;//result2.Occupied;
                  }
                  if (result3.NoOfprojApproved != null) {
                    this.NoOfprojAHP = result3.NoOfprojApproved;
                    this.ProjCostAHP = result3.Project_Cost;
                    this.CSAHP = result3.CentralShare;
                    this.CAAHP = result3.CentralAssisRel;
                    this.HSAHP = result3.HousesSanctioned;
                    this.HGAHP = result3.Grounded;
                    this.HCAHP = result3.Completed;
                    this.HOAHP = result3.Occupied;
                  }
                  else {
                    this.NoOfprojAHP = 0;//result3.NoOfprojApproved;
                    this.ProjCostAHP = 0;//result3.Project_Cost;
                    this.CSAHP = 0;//result3.CentralShare;
                    this.CAAHP = 0;//result3.CentralAssisRel;
                    this.HSAHP = 0;//result3.HousesSanctioned;
                    this.HGAHP = 0;//result3.Grounded;
                    this.HCAHP = 0;//result3.Completed;
                    this.HOAHP = 0;//result3.Occupied;
                  }

                  if (result4.NoOfprojApproved != null) {
                    this.NoOfprojBLCS = result4.NoOfprojApproved;
                    this.ProjCostBLCS = result4.Project_Cost;
                    this.CSBLCS = result4.CentralShare;
                    this.CABLCS = result4.CentralAssisRel;
                    this.HSBLCS = result4.HousesSanctioned;
                    this.HGBLCS = result4.Grounded;
                    this.HCBLCS = result4.Completed;
                    this.HOBLCS = result4.Occupied;
                  }
                  else {
                    this.NoOfprojBLCS = 0;//result4.NoOfprojApproved;
                    this.ProjCostBLCS = 0;//result4.Project_Cost;
                    this.CSBLCS = 0;//result4.CentralShare;
                    this.CABLCS = 0;//result4.CentralAssisRel;
                    this.HSBLCS = 0;//result4.HousesSanctioned;
                    this.HGBLCS = 0;//result4.Grounded;
                    this.HCBLCS = 0;//result4.Completed;
                    this.HOBLCS = 0;//result4.Occupied;
                  }

                  if (this.CLSSLoanAmt == "" || this.CLSSLoanAmt == null)
                    this.CLSSLoanAmt = 0

                  if (this.SubsidyAmtCr == "" || this.SubsidyAmtCr == null)
                    this.SubsidyAmtCr = 0
                  if (this.NoofBene == "" || this.NoofBene == null)
                    this.NoofBene = 0


                  // this.Grounded_JN=result.GroundedJN;
                  //     this.Completed_JN=result.CompletedJN;
                  //     this.OccupiedJN=result.OccupiedJN;

                  this.proj_Total = this.NoOfprojRay + this.HOcc_CLSS + this.NoOfprojISSR + this.NoOfprojAHP + this.NoOfprojBLCS;
                  this.ProjApp_Total = this.ProjCostRay + this.CLSSLoanAmt + this.ProjCostISSR + this.ProjCostAHP + this.ProjCostBLCS;
                  this.CAS_Total = this.CSRay + this.SubsidyAmtCr + this.CSISSR + this.CSAHP + this.CSBLCS;
                  this.CAR_Total = this.CARay + this.SubsidyAmtCr + this.CAISSR + this.CAAHP + this.CABLCS;
                  this.HS_Total = this.HSRay + this.NoofBene + this.HSISSR + this.HSAHP + this.HSBLCS;
                  this.HG_Total = this.HGRay + this.NoofBene + this.HGISSR + this.HGAHP + this.HGBLCS + this.HGrnd_JN;
                  this.HC_Total = this.HCRay + this.NoofBene + this.HCISSR + this.HCAHP + this.HCBLCS + this.HComp_JN;
                  this.HO_Total = this.HORay + this.NoofBene + this.HOISSR + this.HOAHP + this.HOBLCS + this.HOcc_JN;


                  this.proj_Total = indianFormat(this.proj_Total);
                  this.ProjApp_Total = indianFormat1(this.ProjApp_Total);
                  this.CAS_Total = indianFormat1(this.CAS_Total);
                  this.CAR_Total = indianFormat1(this.CAR_Total);
                  this.HS_Total = indianFormat(this.HS_Total);
                  this.HG_Total = indianFormat(this.HG_Total);
                  this.HC_Total = indianFormat(this.HC_Total);
                  this.HO_Total = indianFormat(this.HO_Total);


                  //  this.proj_Total =this.NoPApprovedJN + this.NoOfprojRay + this.HOcc_CLSS + this.NoOfprojISSR +this.NoOfprojAHP + this.NoOfprojBLCS ;
                  //  this.ProjApp_Total =this.ProjCostApp_JN + this.ProjCostRay + this.CLSSLoanAmt + this.ProjCostISSR +this.ProjCostAHP + this.ProjCostBLCS ;
                  //  this.CAS_Total =this.CARel_JN + this.CSRay + this.SubsidyAmtCr  +this.CSISSR + this.CSAHP + this.ProjCostBLCS ;
                  //  this.CAR_Total =this.CARel_JN + this.CARay + this.SubsidyAmtCr  +this.CAISSR + this.CAAHP + this.CABLCS ;
                  //  this.HS_Total =this.HS_JN + this.HSRay + this.NoofBene  +this.HSISSR + this.HSAHP + this.HSBLCS ;
                  //  this.HG_Total =this.Grounded_JN + this.HGRay + this.NoofBene  +this.HGISSR + this.HGAHP + this.HGBLCS ;
                  //  this.HC_Total =this.Completed_JN + this.HCRay + this.NoofBene  +this.HCISSR + this.HCAHP + this.HCBLCS ;
                  //  this.HO_Total =this.HOcc_JN + this.HORay + this.NoofBene  +this.HOISSR + this.HOAHP + this.HOBLCS ;
                });
              });
            });
          });
        });
      });
      //alert(1);
      if (this.SubsidyAmtCr = "")
        this.SubsidyAmtCr = 0
      if (this.CLSSLoanAmt = "")
        this.CLSSLoanAmt = 0
      if (this.NoofBene = "")
        this.NoofBene = 0

      if (this.HOcc_CLSS = "")
        this.HOcc_CLSS = 0

      if (this.ProjCostRay = "")
        this.ProjCostRay = 0

      if (this.ProjCostISSR = "")
        this.ProjCostISSR = 0

      this.proj_Total = this.NoOfprojRay + this.HOcc_CLSS + this.NoOfprojISSR + this.NoOfprojAHP + this.NoOfprojBLCS;
      this.ProjApp_Total = this.ProjCostRay + this.CLSSLoanAmt + this.ProjCostISSR + this.ProjCostAHP + this.ProjCostBLCS;
      this.CAS_Total = this.CSRay + this.SubsidyAmtCr + this.CSISSR + this.CSAHP + this.CSBLCS;

      this.CAR_Total = this.CARay + this.SubsidyAmtCr + this.CAISSR + this.CAAHP + this.CABLCS;
      this.HS_Total = this.HSRay + this.NoofBene + this.HSISSR + this.HSAHP + this.HSBLCS;

      //this.HG_Total =  this.HGRay + this.NoofBene  +this.HGISSR + this.HGAHP + this.HGBLCS ;
      //this.HC_Total =  this.HCRay + this.NoofBene  +this.HCISSR + this.HCAHP + this.HCBLCS ;
      //this.HO_Total = this.HORay + this.NoofBene  +this.HOISSR + this.HOAHP + this.HOBLCS ;



      this.HG_Total = this.HGRay + this.NoofBene + this.HGISSR + this.HGAHP + this.HGBLCS + this.HGrnd_JN;
      this.HC_Total = this.HCRay + this.NoofBene + this.HCISSR + this.HCAHP + this.HCBLCS + this.HComp_JN;
      this.HO_Total = this.HORay + this.NoofBene + this.HOISSR + this.HOAHP + this.HOBLCS + this.HOcc_JN;

      this.proj_Total = indianFormat(this.proj_Total);
      this.ProjApp_Total = indianFormat1(this.ProjApp_Total);
      this.CAS_Total = indianFormat1(this.CAS_Total);
      this.CAR_Total = indianFormat1(this.CAR_Total);
      this.HS_Total = indianFormat(this.HS_Total);
      this.HG_Total = indianFormat(this.HG_Total);
      this.HC_Total = indianFormat(this.HC_Total);
      this.HO_Total = indianFormat(this.HO_Total);

    }


  }
  getCityDetails(cityCode) {
    this.division ="HFA-5";
    //alert(cityCode);
    if (this.stateCodes == "0") {
      // alert(0);
      this.lblStateDisttCity = "All India";
    }
    else if (this.stateCodes != "0" && this.districtCodes == "0" && cityCode == "0") {
      // alert(1);
      this.service.GetStateNameByCode(this.stateCodes).subscribe(resultName => {
        this.lblStateHeader = resultName.States_UT;
      });
    }
    else if (this.stateCodes != "0" && this.districtCodes != "0" && cityCode == "0") {
      // alert(2);
      this.service.GetDisttNameByCode(this.districtCodes).subscribe(resultDisttName => {
        this.lblDistHeader = resultDisttName.District;
        this.lblStateDisttCity = this.lblDistHeader + " district of " + this.lblStateHeader;
      });
    }
    else if (this.stateCodes != "0" && this.districtCodes != "0" && cityCode != "0") {
      //alert(3);
      this.service.GetCityNameByCode(cityCode).subscribe(resultCityName => {
        this.lblCityHeader = resultCityName.City;
        //alert(resultCityName.City);

        ''
        this.lblStateDisttCity = this.lblCityHeader + " City of " + this.lblStateHeader;
      });
    }


    if (cityCode == "0") {
      this.cityValue = "0";
      this.CityMessage = "Select City";
      this.service.CityDetails = [];

      //-----------
      this.service.HFA_JNNURN_AtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result => {
        this.NoPApprovedJN = result.NoOfprojApproved;
        this.ProjCostApp_JN = result.ProjCostApproved;
        this.CShare_JN = result.CentralShare;
        this.CARel_JN = result.CentralAssisRel;
        this.HS_JN = result.HousesSanctioned;
        this.Grounded_JN = result.GroundedJN;
        this.Completed_JN = result.CompletedJN;//CompletedJN;
        this.OccupiedJN = result.OccupiedJN;
        this.HGrnd_JN = result.Grounded;
        this.HComp_JN = result.Completed;
        this.HOcc_JN = result.Occupied;

        if(this.HComp_JN > 0)
        {
            this.not7ShowHide=false;
        }
         else{
            this.not7ShowHide=true;
         }
        if(this.HOcc_JN > 0)
        {
           this.not8ShowHide=false;
        }
        else{
           this.not8ShowHide=true;
        }

        this.service.CompRAYAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result1 => {
          this.NoOfprojRay = result1.NoOfprojApproved;
          this.ProjCostRay = result1.Project_Cost;
          this.CSRay = result1.CentralShare;
          this.CARay = result1.CentralAssisRel;
          this.HSRay = result1.HousesSanctioned;
          this.HGRay = result1.Grounded;
          this.HCRay = result1.Completed;
          this.HORay = result1.Occupied;


          this.service.CompISSRAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result2 => {
            this.NoOfprojISSR = result2.NoOfprojApproved;
            this.ProjCostISSR = result2.Project_Cost;
            this.CSISSR = result2.CentralShare;
            this.CAISSR = result2.CentralAssisRel;
            this.HSISSR = result2.HousesSanctioned;
            this.HGISSR = result2.Grounded;
            this.HCISSR = result2.Completed;
            this.HOISSR = result2.Occupied;


            this.service.CompAHPAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result3 => {
              this.NoOfprojAHP = result3.NoOfprojApproved;
              this.ProjCostAHP = result3.Project_Cost;
              this.CSAHP = result3.CentralShare;
              this.CAAHP = result3.CentralAssisRel;
              this.HSAHP = result3.HousesSanctioned;
              this.HGAHP = result3.Grounded;
              this.HCAHP = result3.Completed;
              this.HOAHP = result3.Occupied;



              this.service.CompBLCSAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result4 => {
                this.NoOfprojBLCS = result4.NoOfprojApproved;
                this.ProjCostBLCS = result4.Project_Cost;
                this.CSBLCS = result4.CentralShare;
                this.CABLCS = result4.CentralAssisRel;
                this.HSBLCS = result4.HousesSanctioned;
                this.HGBLCS = result4.Grounded;
                this.HCBLCS = result4.Completed;
                this.HOBLCS = result4.Occupied;

                //  this.service.CLSSCityWiseReportPMayListNew(this.stateCodes,this.districtCodes,this.cityCodes,this.division).subscribe(resultCLSSState=>{
                //  this.HOcc_CLSS=0;// fixed
                //  this.CLSSLoanAmt= <number><any>resultCLSSState.Loan_Amount ;// + <number><any>resultCLSSState.Loan_MIG;
                //  this.SubsidyAmtCr= <number><any>resultCLSSState.SubsidyAmountCredited ;//+<number><any>resultCLSSState.Subsidy_MIG;
                //  this.NoofBene=  <number><any>resultCLSSState.NoofBeneficiaries ;// +<number><any>resultCLSSState.No_Beneficiary_MIG;



                this.service.CLSSCityWiseReportPMayListNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(resultCLSSState => {
                  this.HOcc_CLSS = 0;// fixed
                  this.CLSSLoanAmt = <number><any>resultCLSSState.TotalLoanAmt;// + <number><any>resultCLSSState.Loan_MIG;
                  this.SubsidyAmtCr = <number><any>resultCLSSState.TotalSubsidy;//+<number><any>resultCLSSState.Subsidy_MIG;
                  this.NoofBene = <number><any>resultCLSSState.TotalBeneficiary;// +<number><any>resultCLSSState.No_Beneficiary_MIG;



                  // this.service.CLSS_StateWiseReportPMayList(this.stateCodes,this.division).subscribe(resultCLSSState=>{
                  //   this.HOcc_CLSS=0;// fixed
                  //  this.CLSSLoanAmt= <number><any>resultCLSSState.LoanTotal ;// + <number><any>resultCLSSState.Loan_MIG;
                  //  this.SubsidyAmtCr= <number><any>resultCLSSState.SubsidyTotal ;//+<number><any>resultCLSSState.Subsidy_MIG;
                  //  this.NoofBene=  <number><any>resultCLSSState.totalBene ;// +<number><any>resultCLSSState.No_Beneficiary_MIG;    //--------------------------

                  //this.HOcc_RAY=result1.Occupied;

                  // this.HOcc_ISSR=12;
                  // this.HOcc_AHP=13;
                  // this.HOcc_BLCS=14;

                  // this.ProjApp_Total =this.NoPApprovedJN + this.ProjApp_RAY + this.ProjApp_CLSS + this.ProjApp_ISSR +this.ProjApp_AHP + this.ProjApp_BLCS
                  // this.PCApp_Total =this.NoPCApprovedJN + this.ProjCApp_RAY + this.ProjCApp_CLSS + this.ProjCApp_ISSR +this.ProjCApp_AHP + this.ProjCApp_BLCS
                  // this.CAS_Total =this.ProjCostApp_JN + this.CAS_RAY + this.CAS_CLSS + this.CAS_ISSR +this.CAS_AHP + this.CAS_BLCS
                  // this.CAR_Total =this.CARel_JN + this.CAR_RAY + this.CAR_CLSS + this.CAR_ISSR +this.CAR_AHP + this.CAR_BLCS
                  // this.HS_Total =this.HS_JN + this.HS_RAY + this.HS_CLSS + this.HS_ISSR +this.HS_AHP + this.HS_BLCS

                  //this.HOcc_Total =this.HOcc_JN + this.HOcc_RAY + this.HOcc_CLSS + this.HOcc_ISSR +this.HOcc_AHP + this.HOcc_BLCS ;

                  this.proj_Total = this.NoOfprojRay + this.HOcc_CLSS + this.NoOfprojISSR + this.NoOfprojAHP + this.NoOfprojBLCS;
                  this.ProjApp_Total = this.ProjCostRay + this.CLSSLoanAmt + this.ProjCostISSR + this.ProjCostAHP + this.ProjCostBLCS;
                  this.CAS_Total = this.CSRay + this.SubsidyAmtCr + this.CSISSR + this.CSAHP + this.CSBLCS;
                  this.CAR_Total = this.CARay + this.SubsidyAmtCr + this.CAISSR + this.CAAHP + this.CABLCS;
                  this.HS_Total = this.HSRay + this.NoofBene + this.HSISSR + this.HSAHP + this.HSBLCS;
                  //    this.HG_Total =  this.HGRay + this.NoofBene  +this.HGISSR + this.HGAHP + this.HGBLCS ;
                  //    this.HC_Total =  this.HCRay + this.NoofBene  +this.HCISSR + this.HCAHP + this.HCBLCS ;
                  //   this.HO_Total =  this.HORay + this.NoofBene  +this.HOISSR + this.HOAHP + this.HOBLCS ;

                  this.HG_Total = this.HGRay + this.NoofBene + this.HGISSR + this.HGAHP + this.HGBLCS + this.HGrnd_JN;
                  this.HC_Total = this.HCRay + this.NoofBene + this.HCISSR + this.HCAHP + this.HCBLCS + this.HComp_JN;
                  this.HO_Total = this.HORay + this.NoofBene + this.HOISSR + this.HOAHP + this.HOBLCS + this.HOcc_JN;

                  this.proj_Total = indianFormat(this.proj_Total);
                  this.ProjApp_Total = indianFormat1(this.ProjApp_Total);
                  this.CAS_Total = indianFormat1(this.CAS_Total);
                  this.CAR_Total = indianFormat1(this.CAR_Total);
                  this.HS_Total = indianFormat(this.HS_Total);
                  this.HG_Total = indianFormat(this.HG_Total);
                  this.HC_Total = indianFormat(this.HC_Total);
                  this.HO_Total = indianFormat(this.HO_Total);

                });
              });
            });
          });
        });
      });

      //----------

    }
    else {
      //alert(DisttCode);
      //-------------------------------

      this.cityCodes = cityCode;
      //this.service.CityList(cityCode);

      this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.JNNURMCityWiseAtAGlance(this.stateCodes, this.districtCodes, this.cityCodes);


      //------------------------
      this.service.HFA_JNNURN_AtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result => {
        this.NoPApprovedJN = result.NoOfprojApproved;
        this.ProjCostApp_JN = result.ProjCostApproved;
        this.CShare_JN = result.CentralShare;
        this.CARel_JN = result.CentralAssisRel;
        this.HS_JN = result.HousesSanctioned;
        this.Grounded_JN = result.GroundedJN;
        this.Completed_JN = result.CompletedJN;
        this.OccupiedJN = result.OccupiedJN;
        this.HGrnd_JN = result.Grounded;
        this.HComp_JN = result.Completed;
        this.HOcc_JN = result.Occupied;          //alert(this.CShare_JN);
        
       // alert(this.Grounded_JN);
       // alert(result.Grounded);
        
        if(this.HComp_JN > 0)
        {
            this.not7ShowHide=false;
        }
         else{
            this.not7ShowHide=true;
         }
        if(this.HOcc_JN > 0)
        {
           this.not8ShowHide=false;
        }
        else{
           this.not8ShowHide=true;
        }        

        this.service.CompRAYAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result1 => {
          this.NoOfprojRay = result1.NoOfprojApproved;
          this.ProjCostRay = result1.Project_Cost;
          this.CSRay = result1.CentralShare;
          this.CARay = result1.CentralAssisRel;
          this.HSRay = result1.HousesSanctioned;
          this.HGRay = result1.Grounded;
          this.HCRay = result1.Completed;
          this.HORay = result1.Occupied;
          //-----RAY END------------------------------
          //-----------------------------------
          this.service.CompISSRAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result2 => {
            this.NoOfprojISSR = result2.NoOfprojApproved;
            this.ProjCostISSR = result2.Project_Cost;
            this.CSISSR = result2.CentralShare;
            this.CAISSR = result2.CentralAssisRel;
            this.HSISSR = result2.HousesSanctioned;
            this.HGISSR = result2.Grounded;
            this.HCISSR = result2.Completed;
            this.HOISSR = result2.Occupied;

            //------------------------------------
            this.service.CompAHPAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result3 => {
              this.NoOfprojAHP = result3.NoOfprojApproved;
              this.ProjCostAHP = result3.Project_Cost;
              this.CSAHP = result3.CentralShare;
              this.CAAHP = result3.CentralAssisRel;
              this.HSAHP = result3.HousesSanctioned;
              this.HGAHP = result3.Grounded;
              this.HCAHP = result3.Completed;
              this.HOAHP = result3.Occupied;

              //--------------
              this.service.CompBLCSAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result4 => {
                this.NoOfprojBLCS = result4.NoOfprojApproved;
                this.ProjCostBLCS = result4.Project_Cost;
                this.CSBLCS = result4.CentralShare;
                this.CABLCS = result4.CentralAssisRel;
                this.HSBLCS = result4.HousesSanctioned;
                this.HGBLCS = result4.Grounded;
                this.HCBLCS = result4.Completed;
                this.HOBLCS = result4.Occupied;

                this.service.CLSSCityWiseReportPMayListNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(resultCLSSState => {
                  this.HOcc_CLSS = 0;// fixed
                  this.CLSSLoanAmt = <number><any>resultCLSSState.TotalLoanAmt;// + <number><any>resultCLSSState.Loan_MIG;
                  this.SubsidyAmtCr = <number><any>resultCLSSState.TotalSubsidy;//+<number><any>resultCLSSState.Subsidy_MIG;
                  this.NoofBene = <number><any>resultCLSSState.TotalBeneficiary;// +<number><any>resultCLSSState.No_Beneficiary_MIG;

                  // this.service.CLSS_StateWiseReportPMayList(this.stateCodes,this.division).subscribe(resultCLSSState=>{
                  //   this.HOcc_CLSS=0;// fixed
                  //  this.CLSSLoanAmt= <number><any>resultCLSSState.LoanTotal ;// + <number><any>resultCLSSState.Loan_MIG;
                  //  this.SubsidyAmtCr= <number><any>resultCLSSState.SubsidyTotal ;//+<number><any>resultCLSSState.Subsidy_MIG;
                  //  this.NoofBene=  <number><any>resultCLSSState.totalBene ;// +<number><any>resultCLSSState.No_Beneficiary_MIG;
                  //--------------

                  //--------------
                  if (result.NoOfprojApproved != null && result.NoOfprojApproved != 0) {
                    // alert(result.NoOfprojApproved);
                    this.NoPApprovedJN = result.NoOfprojApproved;
                    this.HOcc_JN = result.Occupied;
                    this.ProjApp_JN = result.NoOfprojApproved;
                    this.ProjCostApp_JN = result.ProjCostApproved;
                    this.Grounded_JN = result.GroundedJN;

                    this.Completed_JN = result.CompletedJN;
                    this.Occupied_JN = result.OccupiedJN;
                    this.HS_JN = result.HousesSanctioned;
                    this.CARel_JN = result.CentralAssisRel;
                    this.CShare_JN = result.CentralShare;
                  }
                  else {
                    // alert(2);
                    this.NoPApprovedJN = 0;//result.NoOfprojApproved;
                    this.HOcc_JN = 0;//result.Occupied;
                    this.ProjApp_JN = 0;//result.NoOfprojApproved;
                    this.ProjCostApp_JN = 0;//result.ProjCostApproved;
                    this.Grounded_JN = 0;//result.Grounded;
                    this.Completed_JN = 0;//result.Completed;
                    this.Occupied_JN = 0;//result.Occupied;
                    this.HS_JN = 0;//result.HousesSanctioned;
                    this.CARel_JN = 0;//result.CentralAssisRel;
                    this.CShare_JN = 0;//result.CentralShare;
                  }
                  if (result1.NoOfprojApproved != null) {
                    // alert(result1.NoOfprojApproved);
                    // this.NoPApprovedJN=result.NoOfprojApproved;
                    this.HOcc_RAY = result1.Occupied;
                    this.NoOfprojRay = result1.NoOfprojApproved;
                    // alert(this.NoOfprojRay);
                    this.ProjCostRay = result1.Project_Cost;

                    this.CSRay = result1.CentralShare;
                    this.CARay = result1.CentralAssisRel;
                    this.HSRay = result1.HousesSanctioned;
                    this.HGRay = result1.Grounded;
                    this.HCRay = result1.Completed;
                    this.HORay = result1.Occupied;


                    // alert(this.HOcc_RAY);
                    // this.HOcc_CLSS=0;// fixed
                    //  this.HOcc_ISSR=12;
                    //  this.HOcc_AHP=13;
                    //  this.HOcc_BLCS=14;
                    //  this.HOcc_Total =this.HOcc_JN + this.HOcc_RAY + this.HOcc_CLSS + this.HOcc_ISSR +this.HOcc_AHP + this.HOcc_BLCS
                  }
                  else {
                    //  alert();
                    // this.NoPApprovedJN=result.NoOfprojApproved;


                    this.NoOfprojRay = 0;// result1.NoOfprojApproved;

                    //this.NoOfprojRay1= "zero";
                    // alert(this.NoOfprojRay);
                    this.ProjCostRay = 0;//result1.Project_Cost;
                    this.CSRay = 0;//result1.CentralShare;
                    this.CARay = 0;//result1.CentralAssisRel;
                    this.HSRay = 0;//result1.HousesSanctioned;
                    this.HGRay = 0;//result1.Grounded;
                    this.HCRay = 0;//result1.Completed;
                    this.HORay = 0;//result1.Occupied;
                    this.HOcc_RAY = 0;


                    //   this.HOcc_CLSS=0;// fixed
                    //   this.HOcc_ISSR=12;
                    //   this.HOcc_AHP=13;
                    //   this.HOcc_BLCS=14;
                    this.HOcc_Total = this.HOcc_JN + this.HOcc_RAY + this.HOcc_CLSS + this.HOcc_ISSR + this.HOcc_AHP + this.HOcc_BLCS
                  }

                  if (result2.NoOfprojApproved != null) {
                    this.NoOfprojISSR = result2.NoOfprojApproved;
                    this.ProjCostISSR = result2.Project_Cost;
                    this.CSISSR = result2.CentralShare;
                    this.CAISSR = result2.CentralAssisRel;
                    this.HSISSR = result2.HousesSanctioned;
                    this.HGISSR = result2.Grounded;
                    this.HCISSR = result2.Completed;
                    this.HOISSR = result2.Occupied;
                  }
                  else {
                    this.NoOfprojISSR = 0;//result2.NoOfprojApproved;
                    this.ProjCostISSR = 0;//result2.Project_Cost;
                    this.CSISSR = 0;//result2.CentralShare;
                    this.CAISSR = 0;//result2.CentralAssisRel;
                    this.HSISSR = 0;//result2.HousesSanctioned;
                    this.HGISSR = 0;//result2.Grounded;
                    this.HCISSR = 0;//result2.Completed;
                    this.HOISSR = 0;//result2.Occupied;
                  }
                  if (result3.NoOfprojApproved != null) {
                    this.NoOfprojAHP = result3.NoOfprojApproved;
                    this.ProjCostAHP = result3.Project_Cost;
                    this.CSAHP = result3.CentralShare;
                    this.CAAHP = result3.CentralAssisRel;
                    this.HSAHP = result3.HousesSanctioned;
                    this.HGAHP = result3.Grounded;
                    this.HCAHP = result3.Completed;
                    this.HOAHP = result3.Occupied;
                  }
                  else {
                    this.NoOfprojAHP = 0;//result3.NoOfprojApproved;
                    this.ProjCostAHP = 0;//result3.Project_Cost;
                    this.CSAHP = 0;//result3.CentralShare;
                    this.CAAHP = 0;//result3.CentralAssisRel;
                    this.HSAHP = 0;//result3.HousesSanctioned;
                    this.HGAHP = 0;//result3.Grounded;
                    this.HCAHP = 0;//result3.Completed;
                    this.HOAHP = 0;//result3.Occupied;
                  }

                  if (result4.NoOfprojApproved != null) {
                    this.NoOfprojBLCS = result4.NoOfprojApproved;
                    this.ProjCostBLCS = result4.Project_Cost;
                    this.CSBLCS = result4.CentralShare;
                    this.CABLCS = result4.CentralAssisRel;
                    this.HSBLCS = result4.HousesSanctioned;
                    this.HGBLCS = result4.Grounded;
                    this.HCBLCS = result4.Completed;
                    this.HOBLCS = result4.Occupied;
                  }
                  else {
                    this.NoOfprojBLCS = 0;//result4.NoOfprojApproved;
                    this.ProjCostBLCS = 0;//result4.Project_Cost;
                    this.CSBLCS = 0;//result4.CentralShare;
                    this.CABLCS = 0;//result4.CentralAssisRel;
                    this.HSBLCS = 0;//result4.HousesSanctioned;
                    this.HGBLCS = 0;//result4.Grounded;
                    this.HCBLCS = 0;//result4.Completed;
                    this.HOBLCS = 0;//result4.Occupied;
                  }

                  this.proj_Total = this.NoOfprojRay + this.HOcc_CLSS + this.NoOfprojISSR + this.NoOfprojAHP + this.NoOfprojBLCS;
                  this.ProjApp_Total = this.ProjCostRay + this.CLSSLoanAmt + this.ProjCostISSR + this.ProjCostAHP + this.ProjCostBLCS;
                  this.CAS_Total = this.CSRay + this.SubsidyAmtCr + this.CSISSR + this.CSAHP + this.CSBLCS;
                  this.CAR_Total = this.CARay + this.SubsidyAmtCr + this.CAISSR + this.CAAHP + this.CABLCS;
                  this.HS_Total = this.HSRay + this.NoofBene + this.HSISSR + this.HSAHP + this.HSBLCS;
                  //     this.HG_Total =  this.HGRay + this.NoofBene  +this.HGISSR + this.HGAHP + this.HGBLCS ;
                  //     this.HC_Total =  this.HCRay + this.NoofBene  +this.HCISSR + this.HCAHP + this.HCBLCS ;
                  //     this.HO_Total =  this.HORay + this.NoofBene  +this.HOISSR + this.HOAHP + this.HOBLCS ;

                  this.HG_Total = this.HGRay + this.NoofBene + this.HGISSR + this.HGAHP + this.HGBLCS + this.HGrnd_JN;
                  this.HC_Total = this.HCRay + this.NoofBene + this.HCISSR + this.HCAHP + this.HCBLCS + this.HComp_JN;
                  this.HO_Total = this.HORay + this.NoofBene + this.HOISSR + this.HOAHP + this.HOBLCS + this.HOcc_JN;


                  this.proj_Total = indianFormat(this.proj_Total);
                  this.ProjApp_Total = indianFormat1(this.ProjApp_Total);
                  this.CAS_Total = indianFormat1(this.CAS_Total);
                  this.CAR_Total = indianFormat1(this.CAR_Total);
                  this.HS_Total = indianFormat(this.HS_Total);
                  this.HG_Total = indianFormat(this.HG_Total);
                  this.HC_Total = indianFormat(this.HC_Total);
                  this.HO_Total = indianFormat(this.HO_Total);

                });
              });
            });
          });
        });
      });
    }
  }
  BindGroundedGraph(stateCode, DisttCode, cityCode) {
    this.service.JNNURMCityWiseAtAGlance(stateCode, DisttCode, cityCode).subscribe(result => {
      this.NoOfprojApproved = result.NoOfprojApproved;
      this.ProjCostApproved = result.ProjCostApproved
      this.HousesSanctioned = result.HousesSanctioned;

      this.Occupied = result.Occupied;
      this.Completed = result.Completed;
      this.Grounded = result.Grounded;

      this.CentralAssisRel = result.CentralAssisRel;
      this.CentralShare = result.CentralShare;
    });
  }

  AdminPage() {
    //alert('aa');
    this.router.navigate(['/dashboardhfa1']);
  }

  public pdfReport11() {
    //drpdown @media print 

    window.print();

  }

  public pdfReport(){
   // alert();
   var data = document.getElementById('tblPdf');
   html2canvas(data).then(canvas => {  
     // Few necessary setting options  
     var imgWidth = 295;   
     var pageHeight = 295;    
     var imgHeight = canvas.height * imgWidth / canvas.width;  
     var heightLeft = imgHeight;  
  
     const contentDataURL = canvas.toDataURL('image/png')  
     let pdf = new jspdf('l', 'mm', 'a4'); // A4 size page of PDF  
     var position = 0; 
     pdf.text(140, 25, "At a Glance");
     pdf.text(85, 35, "Physical and Financial Progress under JnNURM & PMAY (U)");
  
     pdf.autoTable({html:'#printme',
     theme : 'grid',
     startY:55,
     styles:{
       minCellHeight:10,
     },
     columnStyles: {
       0: {cellWidth: 15},
       1: {cellWidth: 70},
       2: {cellWidth: 20},
       3: {cellWidth: 20},
       4: {cellWidth: 20},
       5: {cellWidth: 20},
       6: {cellWidth: 20},
       8: {cellWidth: 20},
       7: {cellWidth: 20},
       9: {cellWidth: 30},
       // etc
     }});
    // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
   pdf.save('PDFReport.pdf');
  });
  }
}
