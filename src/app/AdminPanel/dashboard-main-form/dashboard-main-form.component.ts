import {NgbModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit, ViewChild, TemplateRef, Renderer2, ElementRef } from '@angular/core';
//import * as CanvasJS from 'F:/AngularAll/HFACharts/NBOCharts/src/canvasjs.min.js';
//import * as CanvasJS from '../..//canvasjs.min.js';
import * as CanvasJS from 'src/assets/canvasjs.min.js';
import { States, District, City, Charts, CompMaster } from 'src/app/financeReport/model/chart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/financeReport/service/graph.service';
//import * as CanvasJS from '../src/canvasjs.min.js';

//import { serviceservice } from 'src/app/financeReport/service.service';
 import { HttpClient } from '@angular/common/http';
// import { Charts, District, States, City, FinDetails, CompMaster } from 'src/app/financeReport/chart.model';

 import { promise } from 'protractor';
// import { Observable, never } from 'rxjs';
 import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
 import { lstatSync } from 'fs';
 import { Alert } from 'selenium-webdriver';
// import { NgbModal, NgbActiveModal, NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
//import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
// import { BsModalComponent, BsModalService  } from 'ng2-bs3-modal';
// import { Route, Router } from '@angular/router';
 import { stringify } from 'querystring';
 import {formatDate } from '@angular/common';
 import { EventEmitter, Input, Output } from '@angular/core';
import { GlobalEvent } from 'src/app/Shared/global-event';
// import { GraphService } from 'src/app/financeReport/service/graph.service';


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
  selector: 'app-dashboard-main-form',
  templateUrl: './dashboard-main-form.component.html',
  styleUrls: ['./dashboard-main-form.component.css']
})

export class DashboardMainFormComponent implements OnInit {
  
  modalRef;
  StateDetails: States[];

  
  DisttDetails: Observable<District[]>;
  CityDetails: City[];
  stateCodes: string = "0";
  districtCodes: string = "0";
  cityCodes: string = "0";
  DivisionCodes = "0";
  chart: Charts;
  compArray: string[];
  Houses_Grounded: number;
  SubsidyAmountCredited: number;
  Ground_Total: number;
  Grounded: number;
  Sanctioned: number;
  NoofBeneficiaries: number;  ///////////
  Sanction_Total: any; //*
  Houses_Completed: number;
  Completed1: number;
  GTCompleted: number;
  Houses_Occupied: number;
  Occupied1: number;
  GTOccupied: number;
  CAC: number;
  demand: number;
 // Codes:number="";
  StateMessage: string;
  DistrictMessage: string;
  CityMessage: string;
  Ground_TotalNew: any;
  stmsg: string;
  stValue: string;
  distvalue: string;
  cityvalue: string;
  distValue: string;
  cityValue: string;
  CASanctforRelease: number;
  CA_Committed: number;
  CA_Approved: number;
  nett: number;
  Central_Assistance_Released: number;
  ULBShare: number;
  StateShare: number;
  BeneficiaryShare: number;
  CentralShare: number;
  CumSanctioned: number;
  CASanctioned_15_16: number;
  CASanctioned_16_17: number;
  CASanctioned_17_18: number;
  CASanctioned_18_19: number;
  CumuCAReleased: number;
  CumuCA_Released_15_16: number;
  CumuCA_Released_17_18: number;
  CumuCA_Released_16_17: number;
  CumuCA_Released_18_19: number;
  firstGraph: string[] = [];
  secondGraph: string[] = [];
  leble: string;
  Y: string;
  ULBShare1: string;
  StateShare1: string;
  BeneficiaryShare1: string;
  CentralShare1: string;
  HS_14_15: string;
  HC_14_15: any;
  HO_14_15: any;
  HS_15_16: any;
  HS_16_17: any;
  HS_17_18: any;
  HS_18_19: any;
  HC_15_16: any;
  HC_16_17: any;
  HC_17_18: any;
  HC_18_19: any;
  HO_15_16: any;
  HO_16_17: any;
  HO_17_18: any;
  HO_18_19: any;
  CAI: number;
  CAR: number;
  CAI15: number;
  CAR15: number;
  CAI16: number;
  CAR16: number;
  CAI17: number;
  CAR17: number;
  CAI18: number;
  CAR18: number;
  HG_14_15: string;
  HG_15_16: string;
  HG_16_17: string;
  HG_17_18: string;
  HG_18_19: string;
  label: string;
  y: string;
  Total_Cost: string;
  UC_Recd: number;
  lstComp: CompMaster[];
  SubsTotal: number;
  MIG_SubsTotal: number;
  EWS_LIG_Total: number;
  EWS_LIG_Bene: any;
  MIGBene: number;
  cidCount: string = '';
  // lstCid: Array<any> = new Array<any>();
  lstCid: number[] = [];
  lstDivision: string[] = [];
  TotSubsidy: number;
  CA_SanctforReleaseTotal: number;
  TOT_CA_Approved: number;
  CLSS_LoanTotal: number;
  CLSS_SubsidyTotal: number;
  CLSS_BeneTotal: number;
  Total_CostNew: number;
  Total_CostNw: any;
  Total_CostNw1: string;
  Investment_in_Project: number;
  CentralShareNew: number;
  ////StateShareNew: number; ?
  StateShareNew: any;
  ULBShareNew: number;
  BeneShareNew: number;
  CAR_NEW: number;
  CASanctforReleaseNew: number;
  CAR_new: number;
  CAR_NEW1: string;
  Total_UC_Recd: number;
  cid: number;
  Comp: string;
  total_Demand: number;
  total_DemandNEW: number;
  total_DemandISSR: number;
  total_Demand_: any;
  CLSSBeneficiaries: number;
  ComponentWiseSanctioned: number;
  CASanct_forRelease: number;
  CA_Approvd: number;
  CA_SanctforRelease: number;
  CA_Aproved: number;
  CA_Released: number;
  CASanct_forReleaseN: number;
  CARNew: number;
  UC_RecdNew: number;
  CASanct_forReleas: string;
  CASanct_for_Release: number;
  CASanct_forRelease1: string;
  display='none';
  // @ViewChild('editModal') editModal: TemplateRef<any>;
  CASanct_forReleaseNEW: string;
  CA_ReleasedNew: string;
  clss_total: string;
  Demand_Overall: any;
  total_Demand1_: any;
  CA_ReleasedNw: any;
  CASanct_forReleaseNew: number;
  CASanct_forReleaseNChange: any;
  UC_RecdNewCh: any;
  CA_ApprovdNew: any;
  CA_ReleasedNw1: any;
  clss_totalN: any;
  ZeroDemand: any;
  Bene_New: any;
  GTOccupied_New: any;
  GTCompleted_New: any;
  Ground_Total_New: any;
  CA_Released_Nw: any;
  UC_RecdNew_Ch: any;
  lstHFACodes: import("src/app/financeReport/model/chart.model").getHFACodes[];
  DisabledCheckBox:boolean;
  Houses_Grounded_State: number;
  Sanctioned_State: number;
  ZeroDemand_State: number;
  Demand_State: number;
  CAApproved: number;
  CASanctionedforRelease: number;
  CASanctionedforReleaseN: number;
  No_Bene_EWS_LIG: number;
  No_Beneficiary_MIG: number;
  NoBeneficiary_Total: number;
  CLSS_SubsidyTotal_State: number;
  CAReleased: number;
  UC_RecdExpenditure: number;
  Completed_State: number;
  Occupied_State: number;
  Subsidy_EWS_LIG: number;
  Subsidy_MIG: number;
  ULBShareS: number;
  StateShareS: number;
  BeneficiaryShareS: number;
  CentralShareS: number;
  HS_15_16S: number;
  HS_16_17S: number;
  HS_17_18S: number;
  HS_18_19S: number;
  HC_15_16S: number;
  HC_16_17S: number;
  HC_17_18S: number;
  HC_18_19S: number;
  HO_15_16S: number;
  HO_16_17S: number;
  HO_17_18S: number;
  HO_18_19S: number;
  Ca_Sanct_: any;
  CASanct_forReleaseN1: any;
  GrndTotal: any;
  Sanction_TotalN1: any;
  Division: string;
  totalCost: number;
  EWS_LIG_BeneDIV: string;
  MIG_SubsTotalDIV: string;
  EWS_Subsidy:string;
  HO_14_15S: number;
  Total_Subsidy: string;
  totalSubsidy_State: number;
  strcsv:any;
  boolCheck: boolean;
  boolCheckJn: boolean;
  Sanction_Total_New: any;
  HS_19_20S: number;
  HC_19_20S: number;
  HO_19_20S: number;
  HC_19_20: number;
  HO_19_20: number;
  HS_19_20: number;
  HG_19_20: number;
  CASanctioned_19_20: number;
  CumuCA_Released_19_20: number;
  CAI19: number;
  CAR19: number;
  CAI1: number;
  CAR1: number;
  CAI151: number;
  CAR151: number;
  CAI161: number;
  CAR161: number;
  CAI171: number; 
  CAR171: number; CAI181: number;
  CAR181: number; CAI191: number;
  CAR191: number;
  Sanction_Total_New1: string;
  Sanction_Total_New4: any;
  Codes:string;
  // Demand: number;
  today= new Date();
  jstoday = '';

  selectedColor = '';
  State:string;

 
 
  public backgroundColor: string;
  public show = false;
  display1: string='none';
  CASanct_forRelease_NChange: any;
  GTCompleted_: string;
  ZeroDemand1: any;


  // constructor(private router: Router, public service:GraphService, private modalService: NgbModal) {
  //   this.StateMessage = "Select State";
  //   this.DistrictMessage = "Select District";
  //   this.CityMessage = "Select City";
  //   this.stValue = "0";
  //   this.distValue = "0";
  //   this.cityValue = "0";
    
  //   this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
  //     this.Houses_Grounded = result.Houses_Grounded;
  //   });
  //   this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
  //     this.SubsidyAmountCredited = result.SubsidyAmountCredited;
  //   });
  //   this.service.JNNURMCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
  //     // this.SubsidyAmountCredited = result.SubsidyAmountCredited;
  //   });
  //   this.service.DemandCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
  //     // this.SubsidyAmountCredited = result.SubsidyAmountCredited;
  //   });
  //   this.service.GetStateWiseFinYrData(this.stateCodes).subscribe(result_State => {
  //   });

  //   this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,  this.DivisionCodes);
   
  // }
 

  constructor(private router: Router,
    //private render:Renderer2,
   // private el:ElementRef,
   private gevent:GlobalEvent,
    public service:GraphService,
    private modalService: NgbModal) {
      
  //  GlobalEvent.colorEvent$.subscribe(x=>{
  //   debugger;
  //   console.log(x);
  //   this.setColor(x);

  //  });   
      
    this.StateMessage = "Select State";
    this.DistrictMessage = "Select District";
    this.CityMessage = "Select City";
    this.stValue = "0";
    this.distValue = "0";
    this.cityValue = "0";
    
setInterval(()=>{
 // debugger;
 // console.log(formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530'));
  this.jstoday = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
},1000);
    
    
    this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
      this.Houses_Grounded = result.Houses_Grounded;
    });
    this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
      this.SubsidyAmountCredited = result.SubsidyAmountCredited;
    });
    this.service.JNNURMCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
      // this.SubsidyAmountCredited = result.SubsidyAmountCredited;
    });
    this.service.DemandCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
      // this.SubsidyAmountCredited = result.SubsidyAmountCredited;
    });
    this.service.GetStateWiseFinYrData(this.stateCodes).subscribe(result_State => {
    });
  }
  // onChange(value){
  //   this.selectedColor = value;
  // }
  sendHFA_Codes(HFAName: string, checked: boolean) {
    // alert(HFAName);
  //  alert(this.lstDivision);

   if (HFAName == 'All') {
     this.lstDivision.push(HFAName);
     this.stateCodes = "0";
     this.DivisionCodes = "0";
     this.service.StateList();
   }
   else {
     if (checked) {
       //this.StateDetails=[];
       this.lstDivision.push(HFAName);
       this.DivisionCodes = this.lstDivision.toString();
     }
     else {
       let index = this.lstDivision.findIndex(a => a == HFAName);
       if (index !== -1) {
         this.lstDivision.splice(index, 1);
         this.DivisionCodes = this.lstDivision.toString();
       }
     }
   }
   this.service.GetStateByDIvision(this.lstDivision.toString());
   // alert(this.lstDivision.toString());
   this.service.ChartDivByDiv(this.lstDivision.toString()).subscribe(result => {
   });
   //1


   this.DivisionCodes ='HFA-1';   
   this.BindCAApprovedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
   this.BindDemandGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
   this.BindSancForRel(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
   this.service.DemandDynamic_Report(this.stateCodes, this.districtCodes, this.cityCodes,  this.DivisionCodes);

   this.BindCAReleased(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
   this.BindGroundedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
   this.BindCompletedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
   this.BindOccupiedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
   this.BindClssSubsiGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
   this.BindClssBeneficiary(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
   this.BindColumnGraphHouses1(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
   this.BindColumnGraphFinancialData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
   this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
 }

 
 sendComp(cid: number, checked: boolean) {
  if (checked) {
    //this.cidCount +=cid + ',';
    this.lstCid.push(cid);
    //if(this.stateCodes !="" &&  this.districtCodes !="" && this.cityCodes !="" &&  this.Comp !="")
   // {
    // this.lstCid[cid]=cid;
    this.Comp = this.lstCid.toString();
    this.service.HFACompWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp).subscribe(result => {


      // this.BindCAApprovedGraph(this.stateCodes,this.districtCodes, this.cityCodes,this.cid);
      //***************************************** */
    })
  //}
  }

  else {
    let index = this.lstCid.findIndex(a => a == cid);
    // alert(index);
    //this.lstCid.splice(index,1);
    if (index !== -1) {
      this.lstCid.splice(index, 1);
    }


    //alert(this.lstCid);
    this.Comp = this.lstCid.toString();
    //alert(this.Comp);

    this.service.HFACompWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp).subscribe(result => {
      // this.BindCAApprovedGraph(this.stateCodes,this.districtCodes, this.cityCodes,this.cid);
      //***************************************** */
    })
  }
  this.DivisionCodes ='HFA-1';

 this.BindCAApprovedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
 this.BindDemandGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
 this.BindSancForRel(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);

 this.BindCAReleased(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
 this.BindGroundedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
 this.BindCompletedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
 this.BindOccupiedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
 this.BindClssSubsiGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
 this.BindClssBeneficiary(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
 this.BindColumnGraphHouses1(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
  this.BindColumnGraphFinancialData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
  
  //this.BindGroundedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);

  this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
  this.service.DemandDynamic_Report(this.stateCodes, this.districtCodes, this.cityCodes,  this.DivisionCodes);


  //   alert(this.lstCid);
  //  alert(this.cidCount.substr(0,this.cidCount.length-1));
}
  getStateDetails1(event) {
    this.Codes= event.target.value;
    this.State = event.target.options[event.target.selectedIndex].text;
    this.getDistrictDetails(this.Codes);
    this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
  }
   


  getStateDetails(stateCodes) {
    debugger;
    
   // alert(stateCodes);
   // alert(this.districtCodes);
    if (stateCodes == "0") {
     //  alert(stateCodes);
      this.distValue = "0";
      this.cityValue = "0";
      this.service.StateList();
      this.DistrictMessage = "Select District";
      this.service.DisttDetails = [];
      this.CityMessage = "Select City";
      this.service.CityDetails = [];

      this.DisabledCheckBox=false;
      //---------------------------- nEW cODE -------------------------
      this.stateCodes = stateCodes;
      this.service.DisttList(stateCodes);
    if (stateCodes ==0 )
    {
        this.districtCodes ="0";
         this.cityCodes="0";
         this.stateCodes = "0";
         this.districtCodes = "0";
         this.cityCodes = "0";
         this.service.StateList();
         this.service.DisttList(this.stateCodes);
         this.service.CityList(this.districtCodes);
    }
     
      this.BindGroundedGraph(stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.BindCompletedGraph(stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.BindOccupiedGraph(stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.service.HFACityWiseReportPMayList(stateCodes, this.districtCodes, this.cityCodes);
      this.service.CLSSCityWiseReportPMayList(stateCodes, this.districtCodes, this.cityCodes);
      this.service.JNNURMCityWiseReportPMayList(stateCodes, this.districtCodes, this.cityCodes);
      this.service.GetJNNURM_Detail(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);

      this.service.DemandDynamic_Report(this.stateCodes, this.districtCodes, this.cityCodes,  this.DivisionCodes);
      this.service.GetStateWiseFinYrData_Div(this.stateCodes, this.DivisionCodes);


      this.BindCAApprovedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.BindDemandGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindSancForRel(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindClssSubsiGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindClssBeneficiary(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindCAReleased(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindColumnGraph(this.stateCodes, this.districtCodes, this.cityCodes)
      this.BindColumnGraphHouses1(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindColumnGraphFinancialData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
    }
    else {
      this.stateCodes = stateCodes;
      this.service.DisttList(stateCodes);

      this.service.CityList(this.districtCodes);//
      this.DisabledCheckBox=true;

      this.BindGroundedGraph(stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.BindCompletedGraph(stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.BindOccupiedGraph(stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.service.HFACityWiseReportPMayList(stateCodes, this.districtCodes, this.cityCodes);
      this.service.CLSSCityWiseReportPMayList(stateCodes, this.districtCodes, this.cityCodes);
      this.service.JNNURMCityWiseReportPMayList(stateCodes, this.districtCodes, this.cityCodes);
      this.service.GetJNNURM_Detail(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.service.GetStateWiseFinYrData_Div(this.stateCodes, this.DivisionCodes);

      this.service.DemandDynamic_Report(this.stateCodes, this.districtCodes, this.cityCodes, this.DivisionCodes);

      this.BindCAApprovedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.BindDemandGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindSancForRel(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindClssSubsiGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindClssBeneficiary(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindCAReleased(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindColumnGraph(this.stateCodes, this.districtCodes, this.cityCodes)
      this.BindColumnGraphHouses1(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindColumnGraphFinancialData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)

    }
  }

getDistrictDetails(DisttCode) {
    // alert(DisttCode);
  if (DisttCode == "0") {
      this.distValue = "0";
      this.cityValue = "0";
      this.DistrictMessage = "Select District"; // ?????????????????????
      //this.service.DisttDetails=[];
      this.CityMessage = "Select City";
      this.service.CityDetails = [];
      
      //alert(DisttCode);
      this.getStateDetails(this.stateCodes);

  }
  else {
    
   
      this.districtCodes = DisttCode;
      this.service.CityList(DisttCode);
      this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);

      this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.JNNURMCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.GetJNNURM_Detail(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.service.DemandDynamic_Report(this.stateCodes, this.districtCodes, this.cityCodes,  this.DivisionCodes);


      this.BindGroundedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.BindCompletedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.BindOccupiedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.BindCAApprovedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.BindDemandGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindSancForRel(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindClssSubsiGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindClssBeneficiary(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindCAReleased(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindColumnGraph(this.stateCodes, this.districtCodes, this.cityCodes)
      this.BindColumnGraphHouses1(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindColumnGraphFinancialData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
  }
}
  getCityDetails(cityCode) {
     //alert(cityCode);
    if (cityCode == "0") {
      this.cityCodes = cityCode;
      this.service.CityDetails = [];
     this.getDistrictDetails(this.districtCodes);
    }
    else {
     // alert(cityCode);
    this.cityCodes = cityCode;
     
    // this.service.CityList(cityCode);

   //  alert(this.stateCodes);
   //  alert( this.districtCodes);
    // alert(this.cityCodes);

      this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.JNNURMCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.GetJNNURM_Detail(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.service.DemandDynamic_Report(this.stateCodes, this.districtCodes, this.cityCodes, this.DivisionCodes);

      this.BindGroundedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.BindCompletedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.BindOccupiedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.BindCAApprovedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.BindDemandGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)

      this.BindSancForRel(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindClssSubsiGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)

      this.BindClssBeneficiary(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)

      this.BindCAReleased(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)

      this.BindColumnGraph(this.stateCodes, this.districtCodes, this.cityCodes)

      this.BindColumnGraphHouses1(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      this.BindColumnGraphFinancialData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
    }
  }
  getDistrictDetails2(DisttCode) {
   // alert();
  if (DisttCode == "0") {
      this.distValue = "0";
      this.cityValue = "0";
      this.DistrictMessage = "Select District"; 
    
      this.CityMessage = "Select City";
      this.service.CityDetails = [];
    
      

  }
  else {
    
   this.service.DisttList(DisttCode);
      this.districtCodes = DisttCode;
      this.service.CityList(DisttCode);
      this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);

      this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.JNNURMCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.GetJNNURM_Detail(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.service.DemandDynamic_Report(this.stateCodes, this.districtCodes, this.cityCodes,  this.DivisionCodes);


      // this.BindGroundedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      // this.BindCompletedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      // this.BindOccupiedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      // this.BindCAApprovedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      // this.BindDemandGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      // this.BindSancForRel(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      // this.BindClssSubsiGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      // this.BindClssBeneficiary(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      // this.BindCAReleased(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
       this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      // this.BindColumnGraph(this.stateCodes, this.districtCodes, this.cityCodes)
      // this.BindColumnGraphHouses1(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      // this.BindColumnGraphFinancialData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
  }
}
getCitytDetails2(event) {
  this.Codes= event.target.value;
  this.State = event.target.options[event.target.selectedIndex].text;
    if ( this.Codes == "0") {
      // this.cityCodes = cityCode;
      this.service.CityDetails = [];
    //  this.getDistrictDetails(this.districtCodes);
    }
    else {
     
     
   this.service.CityList(this.Codes);


      this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.JNNURMCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.GetJNNURM_Detail(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      this.service.DemandDynamic_Report(this.stateCodes, this.districtCodes, this.cityCodes, this.DivisionCodes);

      // this.BindGroundedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      // this.BindCompletedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      // this.BindOccupiedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      // this.BindCAApprovedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
      // this.BindDemandGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)

      // this.BindSancForRel(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      // this.BindClssSubsiGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)

      // this.BindClssBeneficiary(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)

      // this.BindCAReleased(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
       this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);

      // this.BindColumnGraph(this.stateCodes, this.districtCodes, this.cityCodes)

      // this.BindColumnGraphHouses1(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
      // this.BindColumnGraphFinancialData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
    }
  } 

  ngOnInit() {
     
     this.gevent.ColorObservable.subscribe(x=>{
       console.log('color:'+x);
       debugger;
       this.setColor(x);
     });
    
    this.backgroundColor = "#ffffff";// "#B3E5FC"// '#FFDD00';
    this.stateCodes = "0";
    this.districtCodes = "0";
    this.cityCodes = "0";
    this.cid = 0;
    this.Comp = "0";
    this.Division = "0";
    this.DivisionCodes = "0";
    this.State="--Select--";

    // this.service.StateList();
    // this.service.DisttList(this.stateCodes);
    // this.service.CityList(this.districtCodes);


    this.DivisionCodes = "HFA-1";
    this.service.StateListbyHFA_1();
    this.service.DisttList(this.stateCodes);
    this.service.CityList(this.districtCodes);


    //***************************************** */

    this.service.getComponent().subscribe(result => {
      this.lstComp = result;
      //***************************************** */
    })
    this.service.getHFA_Details().subscribe(result => {
      this.lstHFACodes = result;
      //***************************************** */
    })
    
    //this.BindGroundedGraph(this.stateCode,this.districtCode,this.cityCode);

this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
    this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
    this.service.JNNURMCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
    this.service.GetJNNURM_Detail(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
    this.service.GetStateWiseFinYrData_Div(this.stateCodes, this.DivisionCodes);

    this.BindGroundedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
    this.BindCompletedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
    this.BindOccupiedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
    this.BindCAApprovedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
    this.BindDemandGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
    this.BindSancForRel(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
    this.BindClssSubsiGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
    this.BindClssBeneficiary(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
    this.BindCAReleased(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
    this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
    this.BindColumnGraph(this.stateCodes, this.districtCodes, this.cityCodes)
    this.BindColumnGraphHouses1(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
    this.BindColumnGraphFinancialData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes)
    this.service.DemandDynamic_Report(this.stateCodes, this.districtCodes, this.cityCodes,  this.DivisionCodes);
 }
  
  public setColor(color:string) {

    
    // switch (type) {
    //   case 'background':
        this.backgroundColor = color;
      //   break;
      //   case 'font':
      //     //this.fontColor = color;
      //     break;      
      // default:
      //   break;
    // }
    // let eleList=document.getElementsByClassName("dynamicColor");
    // for(let ele in eleList){
    //   //  debugger;
    //     eleList[ele]["style"]="background-color:"+color;

    // }
    let eleList=document.getElementsByClassName("dynamicColor");
    for(let i=0;i< eleList.length;i++){
      //  debugger;
        eleList[i]["style"]="background-color:"+color;
    }
    this.backgroundColor = color;
    
    this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
    this.BindDemandGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
    this.BindSancForRel(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
    this.BindCAReleased(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
    this.BindCAApprovedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);  
    this.BindClssSubsiGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
    this.BindClssBeneficiary(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
    this.BindGroundedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
    this.BindCompletedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
    this.BindOccupiedGraph(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
  }

  
  
reset_method(){

}

BindGroundedGraph(stateCode, DisttCode, cityCode, Comp, DivisionCodes) {
  // alert(stateCode);
  // alert(DisttCode);
  // alert(cityCode);
  // alert(Comp);
  // alert(DivisionCodes);

  this.boolCheck =false;
  this.boolCheckJn = false;

  // Physical_Dashboards
  this.service.GetStateWiseFinYrData_Div(stateCode, DivisionCodes).subscribe(result_State => { // new code
    // this.service.GetStateWiseFinYrData(stateCode).subscribe(result_State => { // new code
    this.Demand_Overall = result_State.Demand;
    this.Houses_Grounded_State = result_State.Grounded; //
    this.Sanctioned_State = result_State.HousesSanctioned;//
    this.ZeroDemand_State = result_State.HousesSanctioned;//
    this.Demand_State = result_State.Demand;
    this.CAApproved = result_State.CAApproved;// CAC thus is subsidy  *
    this.CASanctionedforReleaseN = result_State.CASanctionedforRelease; //*
    this.CAReleased = result_State.CAReleased; //CARNew   approved
    this.UC_RecdExpenditure = result_State.Expenditure; //CARNew   approved


    //PMAY_PROJECTS_Fin , state_Master
    this.service.HFACompWiseReportPMayList_Div(stateCode, DisttCode, cityCode, Comp, DivisionCodes).subscribe(resultPMAY => {
      // this.service.HFACityWiseReportPMayList(stateCode,DisttCode,cityCode).subscribe(result => {
      this.Houses_Grounded = resultPMAY.Houses_Grounded;
      this.Sanctioned = resultPMAY.Sanctioned;
      // alert(result.Houses_Grounded);

      // ClssCityWise --> state-distt-city
//        this.service.CLSSCityWiseReportPMayList(stateCode, DisttCode, cityCode).subscribe(result => {
//          this.NoofBeneficiaries = result.NoofBeneficiaries;
        this.service.HFA_sp_CLSS_CompWise(stateCode, DisttCode, cityCode).subscribe(result1_CLSS => {
          this.NoofBeneficiaries =  result1_CLSS.EWS_LIG_Bene  + result1_CLSS.MIG_BeneTotal;

          this.service.GetCLSS_Detail(stateCode, DisttCode, cityCode,Comp,DivisionCodes).subscribe(DivCity_CLSS => {


        //dbo.JnNURM_Copy$  --> State-Distt-City
       // this.service.JNNURMCityWiseReportPMayList(stateCode, DisttCode, cityCode).subscribe(result => {
       //   this.Grounded = result.Grounded;

        this.service.GetJNNURM_Detail(stateCode,DisttCode ,cityCode ,Comp, DivisionCodes).subscribe(resultJN => {
          this.Grounded   = resultJN.Grounded;


          this.compArray = Comp.split(",");
          const value = this.compArray.indexOf("5");
          const value6 = this.compArray.indexOf("6");


          // alert(Comp);
          // alert(value);
          if ((DivisionCodes != 0 && Comp == 0  && stateCode == 0 && DisttCode == 0 && cityCode == 0) ||(DivisionCodes != 0 && Comp == 0  && stateCode != 0 && DisttCode == 0 && cityCode == 0)|| (DivisionCodes == 0 && Comp == 0  && stateCode != 0 && DisttCode == 0 && cityCode == 0)) {
            //  alert('yes');
            this.Ground_TotalNew = this.Houses_Grounded_State;// (this.Houses_Grounded +this.Grounded + this.NoofBeneficiaries);//.toFixed(2);
            this.Sanction_Total_New = this.Sanctioned_State;// this.Sanctioned +  this.NoofBeneficiaries ;
          }
          else if (((Comp == 0 && value == -1) && (stateCode == 0 && DisttCode == 0 && cityCode == 0 && value == -1) && DivisionCodes == 0) || ((stateCode != 0 && DisttCode == 0 && cityCode == 0 && value == -1 && Comp == 0 && DivisionCodes == 0)))
          //if(Comp=='0'  || (stateCode !=0 && DisttCode ==0 && cityCode ==0) || (stateCode ==0 && DisttCode ==0 && cityCode ==0))
          {
            //Page Load
            this.Ground_TotalNew = this.Houses_Grounded_State;// (this.Houses_Grounded +this.Grounded + this.NoofBeneficiaries);//.toFixed(2);
            this.Sanction_Total_New = this.Sanctioned_State;// this.Sanctioned +  this.NoofBeneficiaries ;
          }
          else if ((DivisionCodes == 0 && Comp == 0 && value == -1 && value6 == -1 && stateCode != 0 && DisttCode != 0) || (DivisionCodes == 0 && Comp == 0 && stateCode != 0 && DisttCode != 0 && cityCode != 0) || (DivisionCodes != 0 && Comp == 0 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (DivisionCodes != 0 && Comp == 0 && stateCode != 0 && DisttCode != 0 && cityCode != 0) ) {
           //  alert('city wise Grounded');
            this.Ground_TotalNew = this.Houses_Grounded + <number><any>DivCity_CLSS.Total_Beneficiaries;//.toFixed(2);
            this.Sanction_Total_New = this.Sanctioned + <number><any>DivCity_CLSS.Total_Beneficiaries;// this.NoofBeneficiaries;
           // alert(this.Sanction_Total_New);
          }
          else if ((DivisionCodes != 0 && Comp == 5 && value6 == -1 && value6 == -1 && stateCode == 0 && DisttCode == 0 && cityCode == 0) ||(DivisionCodes != 0 && Comp == 5 && value6 == -1 && value6 == -1 && stateCode != 0 && DisttCode == 0 && cityCode == 0)||(DivisionCodes != 0 && Comp == 5 && value6 == -1 && value6 == -1 && stateCode != 0 && DisttCode != 0 && cityCode == 0) ||(DivisionCodes != 0 && Comp == 5 && value6 == -1 && value6 == -1 && stateCode != 0 && DisttCode == 0 && cityCode != 0)  ) {
             //   alert('5 only city wise Grounded');
             this.Ground_TotalNew =   <number><any>DivCity_CLSS.Total_Beneficiaries;//.toFixed(2);
             this.Sanction_Total_New =   <number><any>DivCity_CLSS.Total_Beneficiaries;// this.NoofBeneficiaries;
            // alert(this.Sanction_Total_New);
           }
          // else if ((DivisionCodes == 0 && Comp != 5  && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (DivisionCodes == 0 && Comp != 5  && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode != 0)  ) {
          //        alert('4Comp wise City wise Sanc-Grounded')
          //        this.Ground_TotalNew = this.Houses_Grounded ;
          //        this.Sanction_Total = this.Sanctioned ;
          // }
          else if ((DivisionCodes == 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (stateCode != 0 && DivisionCodes == 0 && Comp != 0  && DisttCode != 0 && cityCode != 0 )|| (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode == 0) || (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode != 0) || (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0)) {
            // alert('City Multiple Comp wise Sanc- Grounded , division comp'); 
            if (value ==-1 && value6==-1)
            {
              // alert(1);
              this.Ground_TotalNew = this.Houses_Grounded ;
              this.Sanction_Total_New = this.Sanctioned;
            }
            else if (Comp != 0)
            {
              // 1,2,3,4 --> 5 || 6
                if ((Comp != 0 && value6==-1)  )
                {
                //alert('2');
                    var arr=[];
                    arr=Comp.split(',');
                    arr.forEach(a=>{
                    if(a=='5')
                    {
                      arr.forEach(a=>{
                      this.boolCheck = true;
                      })
                    }
                  })
                }
                if ((Comp != 0 && value==-1)  )
                {
                //alert('2');
                      var arr=[];
                      arr=Comp.split(',');
                      arr.forEach(a=>{
                      if(a=='6')
                      {
                        arr.forEach(a=>{
                         
                            this.boolCheckJn = true;
      
                        })
                      }
                    })
                }
                if ((Comp != 0 )  )
                {
                //alert('2');
                      var arr=[];
                      arr=Comp.split(',');
                      arr.forEach(a=>{
                        if(a=='6' )
                        {
                            arr.forEach(a=>{
                            if( a=='5')
                            {
                                  arr.forEach(a=>{
                                  this.boolCheckJn = true;
                                  this.boolCheck = true;
                              })
                            }
                      }) 

                      }
                    })
                }

                if (this.boolCheck != false && this.boolCheckJn == false)
                { // Only 5 - 1-4
                  
                   if (DivisionCodes == 0)
                   {
                 //  alert('aND Ground');
                   this.NoofBeneficiaries = result1_CLSS.EWS_LIG_Bene  + result1_CLSS.MIG_BeneTotal;
                   this.Ground_TotalNew = this.Houses_Grounded + this.NoofBeneficiaries;//.toFixed(2);
                   this.Sanction_Total_New = this.Sanctioned +this.NoofBeneficiaries;
                   // alert(this.NoofBeneficiaries);
                   // alert(this.Sanctioned);


                   }
                   else 
                   {  
                   // alert('aDivision');
                    if (this.Houses_Grounded.toString()=="" || this.Houses_Grounded==null)
                    {
                      this.Houses_Grounded =0;
                    }
                    this.NoofBeneficiaries =<number><any>(DivCity_CLSS.EWS_LIG_Bene +DivCity_CLSS.MIG1_Bene + DivCity_CLSS.MIG2_Bene);
                    this.Ground_TotalNew = this.Houses_Grounded + this.NoofBeneficiaries;
                    this.Sanction_Total_New = this.Sanctioned +this.NoofBeneficiaries;

                  //  alert(this.NoofBeneficiaries);
                   // alert(this.Houses_Grounded);
                   }
                  this.boolCheck = false;
                 // alert(this.Sanctioned);
                  //alert(this.NoofBeneficiaries);

                  //debugger;
                }
                else if (this.boolCheckJn != false && this.boolCheck == false)
                {// Only 6 - 1-4
                 // alert('b');
                this.Ground_TotalNew = this.Houses_Grounded + resultJN.Grounded;//.toFixed(2);
                this.Sanction_Total_New = this.Sanctioned ;
                this.GrndTotal = this.Ground_TotalNew;
                this.boolCheckJn = false;
                }
                else  if (this.boolCheckJn != false && this.boolCheck != false)
                {
                   
                  //  alert('c');
                  // Only 5-6 - 1-4
                    this.Ground_TotalNew = this.Houses_Grounded + this.NoofBeneficiaries + resultJN.Grounded;//.toFixed(2);
                    this.Sanction_Total_New = this.Sanctioned +this.NoofBeneficiaries;
                    this.GrndTotal = this.Ground_TotalNew;
                    this.boolCheck = false;
                    this.boolCheckJn = false;
                  
                }  
            }
          }
          else if ((Comp == '5' && value == 0) || (Comp.length == 1 && value == 0)) {
            //  alert(5);
            this.Ground_TotalNew = this.NoofBeneficiaries;//.toFixed(2);
            this.Sanction_Total_New = this.NoofBeneficiaries;
          }
          else if ((stateCode != 0 && Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0) || (DivisionCodes != 0 && Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0)) //
          {
            //  alert('1-4');
            this.Ground_TotalNew = this.Houses_Grounded;//.toFixed(2);
            this.Sanction_Total_New = this.Sanctioned;
            this.Ground_TotalNew =this.Ground_TotalNew ;
          //  alert( this.Ground_TotalNew);
          }
          //else if ((Comp == '1,6' || Comp == '6,1') || (Comp == '2,6' || Comp == '6,2')|| (Comp == '6,3'|| Comp == '3,6') || (Comp == '6,4'|| Comp == '4,6'))
          else if ((Comp == '1,6' || Comp == '6,1') || (Comp == '2,6' || Comp == '6,2')|| (Comp == '6,3'|| Comp == '3,6') || (Comp == '6,4'|| Comp == '4,6'))
          {
            //alert('1,6');
           // alert(resultPMAY.Houses_Grounded);
           // alert(resultJN.Grounded);
            this.Ground_Total = resultPMAY.Houses_Grounded +resultJN.Grounded;
            this.Ground_TotalNew =this.Ground_Total;
            this.GTCompleted = resultPMAY.Houses_Completed + resultJN.Completed1;
            this.GTOccupied = resultPMAY.Houses_Occupied + resultJN.Occupied1;
          }
          else if ((Comp == '6' && value == -1)) {
            //  alert('6');
            this.Ground_TotalNew = this.Grounded;//.toFixed(2);
            this.Sanction_Total_New = this.Sanctioned;
          }
          else if ((Comp == '1' || Comp == '2' || Comp == '3' || Comp == '4' ||Comp == '1,2' || Comp == '2,1'  ||Comp == '1,2,3'  ||Comp == '2,1,3'||Comp == '3,1,2' ||Comp == '3,2,1' ||Comp == '2,3,1'  ||Comp == '1,2,3,4') && value == -1 && stateCode == 0 && DisttCode == 0 && cityCode == 0 && DivisionCodes ==0) {
            //alert('C');
            this.Ground_TotalNew = this.Houses_Grounded;//.toFixed(2);
            this.Sanction_Total_New = this.Sanctioned;
          }
          else if (Comp.length > 0 && DivisionCodes != 0 )
          {
            // alert('CD');
            this.Ground_TotalNew = resultPMAY.Houses_Grounded;//.toFixed(2);
            this.Sanction_Total_New = resultPMAY.Sanctioned;
          }
          else if ((Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0) || (stateCode != 0 && DisttCode != 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode != 0)) {
            // alert('city wise');
            this.Ground_TotalNew = this.Houses_Grounded + this.Grounded;//.toFixed(2);
            this.Sanction_Total_New = this.Sanctioned;
          }
          else if ((Comp.length > 0 && value >= 0 && value6 >= 0 && Comp == '5.6') || (Comp.length > 0 && value >= 0 && value6 >= 0 && Comp == '6.5')) {
            // alert('5-6');
            this.Ground_TotalNew = (this.Houses_Grounded + this.Grounded + this.NoofBeneficiaries);
            this.Sanction_Total = this.Sanctioned + this.NoofBeneficiaries;
          }
          else if ((Comp.length > 0 && value >= 0 && value6 >= 0)) {
            //  alert('1-6');
            this.Ground_TotalNew = (this.Houses_Grounded + this.Grounded + this.NoofBeneficiaries);
            this.Sanction_Total_New = this.Sanctioned + this.NoofBeneficiaries;
          }
          else if ((Comp.length > 0 && value >= 0 && value6 == -1)) {
            // alert('1-5');
            this.Ground_TotalNew = (this.Houses_Grounded + this.NoofBeneficiaries);
            this.Sanction_Total_New = this.Sanctioned + this.NoofBeneficiaries;
          }
          else if ((Comp.length > 0 && value == -1 && value6 >= 0)) {
            // alert('1-4,6');
            this.Ground_TotalNew = (this.Houses_Grounded + this.Grounded);
            this.Sanction_Total_New = this.Sanctioned;
          }
         //  this.Sanction_Total_New1  = indianFormat(this.Sanction_Total_New) ;

          var formatter = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 0,
          });

          if (this.Ground_TotalNew == null || this.Ground_TotalNew == 0 || this.Ground_TotalNew.toString() == "")
          {
           // alert('Test data');
          this.Ground_Total_New = "Nil";
          //alert(this.Ground_Total_New);
          this.GrndTotal = "Nil";
          // alert(this.GrndTotal);
          }
          else if (this.Ground_TotalNew != 0)
          { //  this.Ground_Total_New = formatter.format(this.Ground_TotalNew);
            //this.GrndTotal = this.Ground_Total_New;
          }
          // alert(this.GrndTotal);
          if (this.GrndTotal == 0) {
            this.GrndTotal = "Nil";
          }
          else {
            this.GrndTotal = indianFormat(this.Ground_TotalNew);
          }

//            if (this.GrndTotal == 0 || this.GrndTotal == "" || this.GrndTotal == null)

          var formatter = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 0,
          });

          this.Sanction_Total_New4 =indianFormat(this.Sanction_Total_New);

          CanvasJS.addColorSet("groundedColors",
            [
              "#FF4500",
              //"#00FF00",
              "#66FF33",
              "#c962a6",
              "#17a2b8",
              "#fd7e14"
            ]);

          let chart = new CanvasJS.Chart("groundedContainer", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            backgroundColor:this.backgroundColor,// "#B3E5FC",
            colorSet: "groundedColors",

            title: {
              text: (this.GrndTotal),//formatter.format(this.GrndTotal)
              verticalAlign: "center",
              dockInsidePlotArea: true,
              fontSize: 18
            },
            data: [{
              type: "doughnut",
              showInLegend: false,
              backgroundColor:this.backgroundColor,// "#B3E5FC",
              toolTipContent: "<b>{name}</b>",
              dataPoints: [  //- this.Houses_Grounded
                { y: this.Sanction_Total_New - this.Ground_TotalNew, name: "Houses Yet to Be Grounded" }, //49.39
                { y: this.Ground_TotalNew, name: "Grounded" }, //45.45
              ]
            }]
          });
          chart.render();
        });
      });

    });
  });
});
}

BindCompletedGraph(stateCode, DisttCode, cityCode, Comp, DivisionCodes) {
  this.service.GetStateWiseFinYrData_Div(stateCode, DivisionCodes).subscribe(result_State => { // new code
    //this.service.GetStateWiseFinYrData(stateCode).subscribe(result_State => { // new code
    this.Demand_Overall = result_State.Demand;
    this.Houses_Grounded_State = result_State.Grounded; //
    this.Sanctioned_State = result_State.HousesSanctioned;//
    this.ZeroDemand_State = result_State.HousesSanctioned;//
    this.Completed_State = result_State.Completed;//

    this.Demand_State = result_State.Demand;
    this.CAApproved = result_State.CAApproved;// CAC thus is subsidy  *
    this.CASanctionedforReleaseN = result_State.CASanctionedforRelease; //*
    this.CAReleased = result_State.CAReleased; //CARNew   approved
    this.UC_RecdExpenditure = result_State.Expenditure; //CARNew   approved

    // alert(this.Completed_State);
    //7
    this.service.HFACompWiseReportPMayList_Div(stateCode, DisttCode, cityCode, Comp, DivisionCodes).subscribe(result1 => {
      this.Houses_Grounded = result1.Houses_Grounded;
      this.Houses_Completed = result1.Houses_Completed;
      this.Houses_Occupied = result1.Houses_Occupied;

      this.Sanctioned = result1.Sanctioned;

     // this.service.CLSSCityWiseReportPMayList(stateCode, DisttCode, cityCode).subscribe(result2 => {
     //   this.NoofBeneficiaries = result2.NoofBeneficiaries;
     this.service.HFA_sp_CLSS_CompWise(stateCode, DisttCode, cityCode).subscribe(result1_CLSS => {
      this.NoofBeneficiaries =  result1_CLSS.EWS_LIG_Bene  + result1_CLSS.MIG_BeneTotal;


      this.service.GetCLSS_Detail(stateCode, DisttCode, cityCode,Comp,DivisionCodes).subscribe(DivCity_CLSS => {
         
       
       this.service.GetJNNURM_Detail(stateCode,DisttCode ,cityCode ,Comp, DivisionCodes).subscribe(resultJN => {
          this.Grounded   = resultJN.Grounded;
          this.Completed1 = resultJN.Completed1;
          this.Occupied1 = resultJN.Occupied1;

          // alert(this.Grounded);
          //});
          this.compArray = Comp.split(",");
          const value = this.compArray.indexOf("5");
          const value6 = this.compArray.indexOf("6");

          // alert(Comp);

          if (DivisionCodes != 0 && Comp == 0  && stateCode == 0 && DisttCode == 0 && cityCode == 0) {
           // alert('Division');
            this.Ground_Total = this.Houses_Grounded_State; // (this.Houses_Grounded +this.Grounded + this.NoofBeneficiaries);
            this.Sanction_Total = this.CAApproved;   //this.Sanctioned +  this.NoofBeneficiaries ;
            this.GTCompleted = this.Completed_State;       //this.Houses_Completed +this.Completed1 + this.NoofBeneficiaries ;
          }
          else if (((Comp == 0 && value == -1) && (stateCode == 0 && DisttCode == 0 && cityCode == 0 && value == -1) && DivisionCodes == 0) || (Comp == 0 && stateCode != 0 && DisttCode == 0 && cityCode == 0) && DivisionCodes == 0)
          {
          //  alert('state wise');
            this.Ground_Total = this.Houses_Grounded_State; // (this.Houses_Grounded +this.Grounded + this.NoofBeneficiaries);
            this.Sanction_Total = this.CAApproved;   //this.Sanctioned +  this.NoofBeneficiaries ;
            this.GTCompleted = this.Completed_State;       //this.Houses_Completed +this.Completed1 + this.NoofBeneficiaries ;
          }
          else if ((DivisionCodes ==0 && Comp == 0 &&   stateCode != 0 && DisttCode != 0 && cityCode == 0) || (DivisionCodes ==0 &&  Comp == 0 &&   stateCode != 0 && DisttCode != 0 && cityCode != 0) ||(DivisionCodes !=0 && Comp == 0 &&   stateCode != 0 && DisttCode != 0 && cityCode == 0)||(DivisionCodes !=0 && Comp == 0 &&   stateCode != 0 && DisttCode != 0 && cityCode != 0) ) {
              // alert('City wise Completes');
            this.Ground_Total = (this.Houses_Grounded + this.NoofBeneficiaries);
            this.GTCompleted = this.Houses_Completed +this.NoofBeneficiaries;
          }
          // else if ((DivisionCodes == 0 && Comp != 5  && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (DivisionCodes == 0 && Comp != 5  && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode != 0)  ) {
          //        alert('4Comp wise City wise Ground Completed')
          //        this.Ground_Total = (this.Houses_Grounded );
          //        this.GTCompleted = this.Houses_Completed ;
          // }
          else if ((DivisionCodes == 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (stateCode != 0 && DivisionCodes == 0 && Comp != 0  && DisttCode != 0 && cityCode != 0 )|| (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0)|| (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode != 0)|| (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode == 0)) {
              //alert('City Multiple Comp wise Completed- Grounded , division comp'); 
            if (value ==-1 && value6==-1)
            {
               // alert(1);
                   this.Ground_Total = (this.Houses_Grounded );
                   this.GTCompleted = this.Houses_Completed ;
            }
            else if (Comp != 0)
            {
              // 1,2,3,4 --> 5 || 6
                if ((Comp != 0 && value6==-1)  )
                {
                //alert('2');
                    var arr=[];
                    arr=Comp.split(',');
                    arr.forEach(a=>{
                    if(a=='5')
                    {
                      arr.forEach(a=>{
                      this.boolCheck = true;
                      })
                    }
                  })
                }
                if ((Comp != 0 && value==-1)  )
                {
                //alert('2');
                      var arr=[];
                      arr=Comp.split(',');
                      arr.forEach(a=>{
                      if(a=='6')
                      {
                        arr.forEach(a=>{
                         
                            this.boolCheckJn = true;
      
                        })
                      }
                    })
                }
                if ((Comp != 0 )  )
                {
                //alert('2');
                      var arr=[];
                      arr=Comp.split(',');
                      arr.forEach(a=>{
                        if(a=='6' )
                        {
                            arr.forEach(a=>{
                            if( a=='5')
                            {
                                  arr.forEach(a=>{
                                  this.boolCheckJn = true;
                                  this.boolCheck = true;
                              })
                            }
                      }) 

                      }
                    })
                }

                if (this.boolCheck != false && this.boolCheckJn == false)
                { // Only 5 - 1-4
                  
                   if (DivisionCodes == 0)
                   {
                     // alert('aND');
                      this.Ground_Total = (this.Houses_Grounded + this.NoofBeneficiaries);
                      this.GTCompleted = this.Houses_Completed +this.NoofBeneficiaries;
                   }
                   else 
                   {  
                     // alert('aD');
                    this.NoofBeneficiaries =<number><any>(DivCity_CLSS.EWS_LIG_Bene +DivCity_CLSS.MIG1_Bene + DivCity_CLSS.MIG2_Bene);
                    this.Ground_Total = this.Houses_Grounded + this.NoofBeneficiaries;
                    this.GTCompleted = this.Houses_Completed +this.NoofBeneficiaries;
                 //   alert(this.NoofBeneficiaries);
                   // alert(this.Houses_Completed);
                   }
                  this.boolCheck = false;
                 // alert(this.Sanctioned);
                  //alert(this.NoofBeneficiaries);

                  //debugger;
                }
                else if (this.boolCheckJn != false && this.boolCheck == false)
                {// Only 6 - 1-4
                 //  alert('b');
                this.Ground_TotalNew = this.Houses_Grounded + resultJN.Grounded;//.toFixed(2);
                this.Sanction_Total_New = this.Sanctioned ;
                this.GrndTotal = this.Ground_TotalNew;
                this.boolCheckJn = false;
                }
                else  if (this.boolCheckJn != false && this.boolCheck != false)
                {
                   
                  //  alert('c');
                  // Only 5-6 - 1-4
                    this.Ground_TotalNew = this.Houses_Grounded + this.NoofBeneficiaries + resultJN.Grounded;//.toFixed(2);
                    this.Sanction_Total_New = this.Sanctioned +this.NoofBeneficiaries;
                    this.GrndTotal = this.Ground_TotalNew;
                    this.boolCheck = false;
                    this.boolCheckJn = false;
                  
                }  
            }
          }





          else if ((Comp == '5' && value == 0) || (Comp.length == 1 && value == 0)) {
            // alert(5);
            this.Ground_Total = (this.NoofBeneficiaries);
            this.Sanction_Total = this.NoofBeneficiaries;
            this.GTCompleted = this.NoofBeneficiaries;
          }
          else if ((stateCode != 0 && Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0) || (DivisionCodes != 0 && Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0)) //
          {
            // alert('1-4 Completed');
            this.Ground_Total = (this.Houses_Grounded);  //+ this.NoofBeneficiaries
            this.Sanction_Total = this.Sanctioned; //+  this.NoofBeneficiaries
            this.GTCompleted = this.Houses_Completed;// + this.NoofBeneficiaries ;
            this.Houses_Occupied = result1.Houses_Occupied;
          }
          else if ((Comp == '1,6' || Comp == '6,1') || (Comp == '2,6' || Comp == '6,2')|| (Comp == '6,3'|| Comp == '3,6') || (Comp == '6,4'|| Comp == '4,6'))
          {
            this.Ground_Total = result1.Houses_Grounded +resultJN.Grounded;
            this.GTCompleted = result1.Houses_Completed + resultJN.Completed1;
            this.GTOccupied = result1.Houses_Occupied + resultJN.Occupied1;
          }
          else if ((Comp == '6' && value == -1)) {
            // alert('6');
            this.Ground_Total = (this.Grounded);
            this.Sanction_Total = this.Sanctioned;
            this.GTCompleted = this.Completed1;
          }
          else if ((Comp == '1' || Comp == '2' || Comp == '3' || Comp == '4' ||Comp == '1,2' || Comp == '2,1'  ||Comp == '1,2,3'  ||Comp == '2,1,3'||Comp == '3,1,2' ||Comp == '3,2,1' ||Comp == '2,3,1'  ||Comp == '1,2,3,4') && value == -1 && stateCode == 0 && DisttCode == 0 && cityCode == 0 && DivisionCodes==0) {
          //else if ((Comp == '1' && value == -1 && stateCode ==0  && DisttCode ==0 && cityCode ==0)) {
            // alert('6');
            this.Ground_Total = (result1.Houses_Grounded) ;// + resultJN.Grounded;
            this.Sanction_Total = this.Sanctioned;
            this.Occupied1   = result1.Houses_Occupied; //resultJN.Occupied1 +
            this.GTCompleted = result1.Houses_Completed;// + resultJN.Completed1;
          }
          //else if (Comp.length > 0 && DivisionCodes != 0 )
         // {
            //alert('CD');
          // this.Houses_Grounded = result1.Houses_Grounded;
          // this.Houses_Completed = result1.Houses_Completed;

          //}
          else if ((Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0) || (stateCode != 0 && DisttCode != 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode != 0)) {
            // alert('1-4 series');
            //  alert(this.Houses_Grounded);
            //  alert(this.Houses_Completed);
            this.Ground_Total = (this.Houses_Grounded);
            this.Sanction_Total = this.Sanctioned;
            this.GTCompleted = this.Houses_Completed;
          }
          else if ((Comp.length > 0 && value >= 0 && value6 >= 0 && Comp == '5.6') || (Comp.length > 0 && value >= 0 && value6 >= 0 && Comp == '6.5')) {
            //  alert('5-6');
            this.Ground_Total = (this.Grounded + this.NoofBeneficiaries);
            this.Sanction_Total = this.NoofBeneficiaries; //this.Sanctioned +
            this.GTCompleted = this.Houses_Completed + this.Completed1;
          }
          else if ((Comp.length > 0 && value >= 0 && value6 >= 0)) {
            // alert('1-6');
            this.Ground_Total = (this.Houses_Grounded + this.Grounded + this.NoofBeneficiaries);
            this.Sanction_Total = this.Sanctioned + this.NoofBeneficiaries;
            this.GTCompleted = this.Houses_Completed + this.Completed1 + this.NoofBeneficiaries;
          }
          else if ((Comp.length > 0 && value >= 0 && value6 == -1)) {
            // alert('1-5');
            this.Ground_Total = (this.Houses_Grounded + this.NoofBeneficiaries);
            this.Sanction_Total = this.Sanctioned + this.NoofBeneficiaries;
            this.GTCompleted = this.Houses_Completed + this.NoofBeneficiaries;
          }
          //alert(this.GTCompleted);

          var formatter = new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 0,
          });

          if (this.GTCompleted != 0)
            this.GTCompleted_New = formatter.format(this.GTCompleted);
          if (this.GTCompleted == 0)
            this.GTCompleted_New = "Nil";

          // alert(this.GTCompleted_New );
          if (this.GTCompleted_New == 0)
            this.GTCompleted_New = 'Nil';
          this.Ground_TotalNew = indianFormat(this.Ground_TotalNew);

          CanvasJS.addColorSet("groundedColors",
            [
              "#FFFF00",
              "#00FF00",
              "#66FF33",
            ]);

          let chart = new CanvasJS.Chart("CompletedContainer", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            backgroundColor: this.backgroundColor,//"#B3E5FC",
            colorSet: "groundedColors",

            title: {
              text: this.GTCompleted_New,//45.45,//"Grounded" +
              verticalAlign: "center",
              dockInsidePlotArea: true,
              fontSize: 18
            },
            data: [{
              type: "doughnut",
              showInLegend: false,
              backgroundColor: this.backgroundColor,//"#B3E5FC",
              toolTipContent: "<b>{name}</b>",
              dataPoints: [
                { y: this.Ground_Total - this.GTCompleted, name:"Houses Yet to Be Grounded" },
                { y: this.GTCompleted, name: "Grounded" },
              ]
            }]
          });
          chart.render();
        });
      });
    });
  });
});
}

BindOccupiedGraph(stateCode, DisttCode, cityCode, Comp, DivisionCodes) {
  this.service.GetStateWiseFinYrData_Div(stateCode, DivisionCodes).subscribe(result_State => { // new code
    this.Demand_Overall = result_State.Demand;
    this.Houses_Grounded_State = result_State.Grounded; //
    this.Sanctioned_State = result_State.HousesSanctioned;//
    this.ZeroDemand_State = result_State.HousesSanctioned;//
    this.Completed_State = result_State.Completed;//
    this.Occupied_State = result_State.Occupied;//
    this.Demand_State = result_State.Demand;
    this.CAApproved = result_State.CAApproved;
    this.CASanctionedforReleaseN = result_State.CASanctionedforRelease; //*
    this.CAReleased = result_State.CAReleased; //CARNew   approved
    this.UC_RecdExpenditure = result_State.Expenditure; //CARNew   approved

  this.service.HFACompWiseReportPMayList_Div(stateCode, DisttCode, cityCode, Comp, DivisionCodes).subscribe(resultPMAY => {
        this.Houses_Grounded = resultPMAY.Houses_Grounded;
        this.Houses_Completed = resultPMAY.Houses_Completed;
        this.Houses_Occupied = resultPMAY.Houses_Occupied;
        this.Sanctioned = resultPMAY.Sanctioned;

  // this.service.CLSSCityWiseReportPMayList(stateCode, DisttCode, cityCode).subscribe(result => {
   //      this.NoofBeneficiaries = result.NoofBeneficiaries;

  this.service.HFA_sp_CLSS_CompWise(stateCode, DisttCode, cityCode).subscribe(result1_CLSS => {
         this.NoofBeneficiaries =  result1_CLSS.EWS_LIG_Bene  + result1_CLSS.MIG_BeneTotal;
  
  this.service.GetCLSS_Detail(stateCode, DisttCode, cityCode,Comp,DivisionCodes).subscribe(DivCity_CLSS => {
     

  this.service.GetJNNURM_Detail(stateCode,DisttCode ,cityCode ,Comp, DivisionCodes).subscribe(resultJN => {
          this.Grounded   = resultJN.Grounded;
          this.Completed1 = resultJN.Completed1;
          this.Occupied1 = resultJN.Occupied1;

        this.compArray = Comp.split(",");
        const value = this.compArray.indexOf("5");
        const value6 = this.compArray.indexOf("6");

        // alert(value);
        // alert(Comp);

        if (DivisionCodes != 0 && Comp == 0) {
          // <<<<<<<<<<<from State Table only>>>>>>>>>
          this.Ground_Total = this.Houses_Grounded_State;// this.Houses_Grounded +this.Grounded + this.NoofBeneficiaries ;
          this.Sanction_Total = this.CAApproved;// this.Sanctioned +  this.NoofBeneficiaries ;
          this.GTCompleted = this.Completed_State;//this.Houses_Completed +this.Completed1 + this.NoofBeneficiaries ;
          this.GTOccupied = this.Occupied_State;// this.Houses_Occupied +this.Occupied1 + this.NoofBeneficiaries ;
        }
        else if (((Comp == 0 && value == -1) && (stateCode == 0 && DisttCode == 0 && cityCode == 0 && value == -1) && DivisionCodes == 0) || ((stateCode != 0 && DisttCode == 0 && cityCode == 0 && value == -1 && Comp == 0 && DivisionCodes == 0))) {
          this.Ground_Total = this.Houses_Grounded_State;// this.Houses_Grounded +this.Grounded + this.NoofBeneficiaries ;
          this.Sanction_Total = this.CAApproved;// this.Sanctioned +  this.NoofBeneficiaries ;
          this.GTCompleted = this.Completed_State;//this.Houses_Completed +this.Completed1 + this.NoofBeneficiaries ;
          this.GTOccupied = this.Occupied_State;// this.Houses_Occupied +this.Occupied1 + this.NoofBeneficiaries ;
        }
        else if ((stateCode != 0 &&  DisttCode != 0 && cityCode == 0  && Comp == 0    && DivisionCodes==0) || (stateCode != 0 && DisttCode != 0 && cityCode != 0 &&  Comp == 0 && DivisionCodes==0 ))
        {
           // alert('City wise Occupied')
          this.GTCompleted = resultPMAY.Houses_Completed + this.NoofBeneficiaries;
          this.GTOccupied = resultPMAY.Houses_Occupied  + this.NoofBeneficiaries;
        }
        else if ((stateCode != 0 &&  Comp.length > 0  && Comp !=6  && value == -1 && DivisionCodes==0 && DisttCode == 0 && cityCode == 0))
        {
          // alert(1);
          // ap has ihsdp =0
          this.Ground_Total = resultPMAY.Houses_Grounded;
          this.GTCompleted = resultPMAY.Houses_Completed;
          this.GTOccupied = resultPMAY.Houses_Occupied;
         // this.GTOccupied = this.Occupied1;
         //alert(this.GTOccupied);
          this.Sanction_Total = resultPMAY.Sanctioned;
        }
        else if ((DivisionCodes == 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (stateCode != 0 && DivisionCodes == 0 && Comp != 0  && DisttCode != 0 && cityCode != 0 )|| (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode == 0) || (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode != 0) || (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0)) {
          //  alert('City Multiple Comp wise Occupied Completed , division comp'); 
          if (value ==-1 && value6==-1)
          {
            //  alert(1);
              this.GTCompleted = resultPMAY.Houses_Completed;
              this.GTOccupied = resultPMAY.Houses_Occupied;
          }
          else if (Comp != 0)
          {
            // 1,2,3,4 --> 5 || 6
              if ((Comp != 0 && value6==-1)  )
              {
              //alert('2');
                  var arr=[];
                  arr=Comp.split(',');
                  arr.forEach(a=>{
                  if(a=='5')
                  {
                    arr.forEach(a=>{
                    this.boolCheck = true;
                    })
                  }
                })
              }
              if ((Comp != 0 && value==-1)  )
              {
              //alert('2');
                    var arr=[];
                    arr=Comp.split(',');
                    arr.forEach(a=>{
                    if(a=='6')
                    {
                      arr.forEach(a=>{
                       
                          this.boolCheckJn = true;
    
                      })
                    }
                  })
              }
              if ((Comp != 0 )  )
              {
              //alert('2');
                    var arr=[];
                    arr=Comp.split(',');
                    arr.forEach(a=>{
                      if(a=='6' )
                      {
                          arr.forEach(a=>{
                          if( a=='5')
                          {
                                arr.forEach(a=>{
                                this.boolCheckJn = true;
                                this.boolCheck = true;
                            })
                          }
                    }) 

                    }
                  })
              }

              if (this.boolCheck != false && this.boolCheckJn == false)
              { // Only 5 - 1-4
              //  alert('p1');
               // alert(DivisionCodes);
                 if (DivisionCodes == 0)
                 {
                  //  alert('1-4,5');
                    this.NoofBeneficiaries =  result1_CLSS.EWS_LIG_Bene  + result1_CLSS.MIG_BeneTotal;
                    this.GTCompleted = <number><any>(resultPMAY.Houses_Completed + this.NoofBeneficiaries);
                    this.GTOccupied = <number><any>(resultPMAY.Houses_Occupied + this.NoofBeneficiaries);
                 }
                 else 
                 {  
                  //alert('1-4,5, Div');
                  this.NoofBeneficiaries = <number><any>(DivCity_CLSS.EWS_LIG_Bene +   DivCity_CLSS.MIG1_Bene + DivCity_CLSS.MIG2_Bene) ;
                  this.GTCompleted = <number><any>(resultPMAY.Houses_Completed + this.NoofBeneficiaries);
                  this.GTOccupied = <number><any>(resultPMAY.Houses_Occupied + this.NoofBeneficiaries);
                 }
                this.boolCheck = false;
               // alert(this.Sanctioned);
                //alert(this.NoofBeneficiaries);

                //debugger;
              }
              else if (this.boolCheckJn != false && this.boolCheck == false)
              {// Only 6 - 1-4
               // alert('b');
              this.Ground_TotalNew = this.Houses_Grounded + resultJN.Grounded;//.toFixed(2);
              this.Sanction_Total_New = this.Sanctioned ;
              this.GrndTotal = this.Ground_TotalNew;
              this.boolCheckJn = false;
              }
              else  if (this.boolCheckJn != false && this.boolCheck != false)
              {
                 
                //  alert('c');
                // Only 5-6 - 1-4
                  this.Ground_TotalNew = this.Houses_Grounded + this.NoofBeneficiaries + resultJN.Grounded;//.toFixed(2);
                  this.Sanction_Total_New = this.Sanctioned +this.NoofBeneficiaries;
                  this.GrndTotal = this.Ground_TotalNew;
                  this.boolCheck = false;
                  this.boolCheckJn = false;
                
              }  
          }
        }

       // }

        else if ((Comp == '5' && value == 0) || (Comp.length == 1 && value == 0)) {
         //  +-
        //  alert(2);
          this.Ground_Total = this.NoofBeneficiaries;
          this.Sanction_Total = this.NoofBeneficiaries;
          this.GTCompleted = this.NoofBeneficiaries;
          this.GTOccupied = this.NoofBeneficiaries;
        }
        else if ((Comp == '1' || Comp == '2' || Comp == '3' || Comp == '4' ||Comp == '1,2' || Comp == '2,1'  ||Comp == '1,2,3'  ||Comp == '2,1,3'||Comp == '3,1,2' ||Comp == '3,2,1' ||Comp == '2,3,1'  ||Comp == '1,2,3,4' ||Comp == '1,2,4,3' ||Comp == '1,4,3,2' ||Comp == '4,3,2,1'||Comp == '4,1,2,3') && value == -1 && stateCode == 0 && DisttCode == 0 && cityCode == 0) {
          //alert('AA');
          //alert(3);
          this.Ground_Total = resultPMAY.Houses_Grounded;
          this.GTCompleted = resultPMAY.Houses_Completed;
          this.GTOccupied = resultPMAY.Houses_Occupied;
          this.Sanction_Total = resultPMAY.Sanctioned;
        }
        else if ((Comp == '1,6' || Comp == '6,1') || (Comp == '2,6' || Comp == '6,2')|| (Comp == '6,3'|| Comp == '3,6') || (Comp == '6,4'|| Comp == '4,6'))
        {
          //alert(4);
          this.Ground_Total = resultPMAY.Houses_Grounded +resultJN.Grounded;
          this.GTCompleted = resultPMAY.Houses_Completed + resultJN.Completed1;
          this.GTOccupied = resultPMAY.Houses_Occupied + resultJN.Occupied1;
        }
        else if ((stateCode != 0 && Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0) || (DivisionCodes != 0 && Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0)) //
        {
         //  alert(5);
          this.Ground_Total = this.Houses_Grounded;
          this.Sanction_Total = this.Sanctioned;
          this.GTCompleted = this.Houses_Completed;
          this.GTOccupied = this.Houses_Occupied;
        }
        else if ((Comp == '6' && value == -1)) {
          //  alert('6');
          this.Ground_Total = resultJN.Grounded;
          this.GTCompleted = resultJN.Completed1;
          this.GTOccupied = resultJN.Occupied1;
          this.Sanction_Total = this.Sanctioned;
        }


        else if ((Comp.length > 0 && value >= 0 && value6 >= 0 && Comp == '5.6') || (Comp.length > 0 && value >= 0 && value6 >= 0 && Comp == '6.5')) {
        //  alert('5-6');
          this.Ground_Total = (this.Houses_Grounded + this.Grounded + this.NoofBeneficiaries);
          this.Sanction_Total = this.Sanctioned + this.NoofBeneficiaries;
          this.GTCompleted = this.Completed1 + this.NoofBeneficiaries;
          this.GTOccupied = this.Occupied1 + this.NoofBeneficiaries;
        }
        else if ((Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0) || (stateCode != 0 && DisttCode != 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode != 0)) {
          //  alert('51-6');

          this.Ground_Total = (this.Houses_Grounded + this.Grounded);
          this.Sanction_Total = this.Sanctioned;
          this.GTCompleted = this.Houses_Completed + this.Completed1;
          this.GTOccupied = this.Houses_Occupied + this.Occupied1;
        }
        else if ((Comp.length > 0 && value >= 0 && value6 >= 0)) {
           // alert('All');
          this.Ground_Total = this.Grounded;
          this.Sanction_Total = this.Sanctioned;
          this.GTCompleted = this.Completed1;
          this.GTOccupied = this.Occupied1;
        }
        else if ((Comp.length > 0 && value >= 0 && value6 == -1)) {
         // alert('New');
         this.Ground_TotalNew = (resultPMAY.Houses_Grounded + this.NoofBeneficiaries);
         this.Sanction_Total = resultPMAY.Sanctioned + this.NoofBeneficiaries;

         this.GTOccupied = resultPMAY.Houses_Occupied + this.NoofBeneficiaries;
       }


        var formatter = new Intl.NumberFormat('en-IN', {
          minimumFractionDigits: 0,
        });

       // alert(this.GTOccupied);

        if (this.GTOccupied != 0 &&this.GTOccupied !=null )
          this.GTOccupied_New = formatter.format(this.GTOccupied);
        if (this.GTOccupied == 0 || this.GTOccupied == null) {
          //alert('aa');
          this.GTOccupied_New = "Nil";
        }

        this.GTCompleted_ = indianFormat(this.GTCompleted);

        //alert(this.GTOccupied_New);
        CanvasJS.addColorSet("groundedColors",
          [
            
            "#5f5783",
            "#00FF00",
            "#17a2b8",
            
            "#00BFFF",
            
            "#5c6771",
            "#fd7e14",
          ]);

        let chart = new CanvasJS.Chart("OccupiedContainer", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          backgroundColor: this.backgroundColor,//"#B3E5FC",
          colorSet: "groundedColors",

          title: {
            text: this.GTOccupied_New,//45.45,//"Grounded" +
            verticalAlign: "center",
            dockInsidePlotArea: true,
            fontSize: 18
          },
          data: [{
            type: "doughnut",
            showInLegend: false,
            backgroundColor: this.backgroundColor,//"#B3E5FC",
            toolTipContent: "<b>{name}</b>",
            dataPoints: [
                { y: this.GTCompleted - this.GTOccupied, name: "Houses Yet to Be Occupied" },
                { y: this.GTOccupied, name: "Houses Occupied" },

            ]
          }]
        });
        chart.render();
      });
    });
  });
});
});
}

BindDemandGraph(stateCode, DisttCode, cityCode, Comp, DivisionCodes) {
  this.DivisionCodes ='HFA-1';
  this.service.GetStateWiseFinYrData_Div(stateCode, DivisionCodes).subscribe(result_State => { // new code
    this.Demand_Overall = result_State.Demand;
    this.Houses_Grounded_State = result_State.Grounded; //
    this.Sanctioned_State = result_State.HousesSanctioned;//
    this.ZeroDemand_State = result_State.HousesSanctioned;//
    this.Demand_State = result_State.Demand;


    //1
    this.service.HFACompWiseReportPMayList_Div(stateCode, DisttCode, cityCode, Comp, DivisionCodes).subscribe(result => {
        this.Houses_Grounded = result.Houses_Grounded;  // PMAY_PROJECTS_Fin
        this.Sanctioned = result.Sanctioned; // EQ OF hOUSES Sanctioned  houses involved
        this.ZeroDemand = result.Sanctioned;
       // alert(this.Sanctioned);

       this.service.GetJNNURM_Detail(stateCode,DisttCode ,cityCode ,Comp, DivisionCodes).subscribe(resultJN => {
        this.Grounded   = resultJN.Grounded;
        this.Completed1 = resultJN.Completed1;
        // ZeroDemand

      this.service.DemandDynamic_Report(stateCode, DisttCode, cityCode,DivisionCodes).subscribe(result2 => {
        this.demand = result2.demand; //DemandCityWise

        this.service.DemandDynamic_Rept(stateCode, DisttCode, cityCode,DivisionCodes ,Comp).subscribe(result_Demand => {
         

               //alert(result2.demand);
          //    alert(this.demand);
        this.service.GetCLSS_Detail(stateCode, DisttCode, cityCode,Comp,DivisionCodes).subscribe(result_clss => {


        this.service.CLSS_Values_List(stateCode).subscribe(result4 => {
        this.No_Bene_EWS_LIG = result4.No_Bene_EWS_LIG;
        this.No_Beneficiary_MIG = result4.No_Beneficiary_MIG;
        this.NoBeneficiary_Total = result4.NoBeneficiary_Total;

              this.compArray = Comp.split(",");
              const value = this.compArray.indexOf("5");
              const value6 = this.compArray.indexOf("6");

              if (((Comp == 0 && value == -1) && (stateCode == 0 && DisttCode == 0 && cityCode == 0 && value == -1) && DivisionCodes == 0))    // if(Comp=='0'  || (stateCode !=0 && DisttCode ==0 && cityCode ==0) || (stateCode ==0 && DisttCode ==0 && cityCode ==0))
              {
                   // alert("Page Load");
                    this.total_Demand_ = "10000000"; //National Level this.demand;;
                    this.Houses_Grounded = this.Houses_Grounded_State;
                    this.Sanctioned = this.Sanctioned_State;
                    this.ZeroDemand = this.ZeroDemand_State;
                    this.ComponentWiseSanctioned = this.ZeroDemand_State;
                    this.demand = this.Demand_State;
                    this.Sanction_Total = this.Sanctioned_State ;// this.ComponentWiseSanctioned;  // center
              }
              else if ((DivisionCodes != 0 && Comp == 0 && DisttCode == 0 && cityCode == 0 && stateCode != 0) ||(DivisionCodes != 0 && Comp == 0 && DisttCode == 0 && cityCode == 0 && stateCode == 0) || (stateCode != 0 && DivisionCodes != 0 && Comp == 0 && DisttCode == 0 && cityCode == 0 )|| (stateCode != 0 && DivisionCodes == 0 && Comp == 0 && DisttCode == 0 && cityCode == 0 )|| (stateCode == 0 && DivisionCodes == 0 && Comp == 0 && DisttCode == 0 && cityCode == 0 )) {
                   // alert('State Table Only')
                    this.total_Demand_ = this.Demand_Overall * 100000;// newch  "10000000"; //National Level this.demand;;
                    this.Houses_Grounded = this.Houses_Grounded_State;
                    this.Sanctioned = this.Sanctioned_State;
                    this.ZeroDemand = this.ZeroDemand_State;
                    this.ComponentWiseSanctioned = this.ZeroDemand_State;
                    this.demand = this.Demand_State;
                    this.Sanction_Total = this.Sanctioned_State ;//this.ComponentWiseSanctioned;
              }
              else if ((DivisionCodes != 0 && Comp == 0 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (DivisionCodes != 0 && Comp == 0 && stateCode != 0 && DisttCode != 0 && cityCode != 0)  ||(DivisionCodes == 0 && Comp == 0 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (DivisionCodes == 0 && Comp == 0 && stateCode != 0 && DisttCode != 0 && cityCode != 0)) {
                // alert('City wise only')
                 this.Sanction_Total = result.Sanctioned + result_clss.Total_Beneficiaries;
                 this.total_Demand_ = result2.demand;
                 this.Demand_Overall = this.total_Demand_;
              }
              else if ((DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (stateCode != 0 && DivisionCodes != 0 && Comp != 0  && DisttCode != 0 && cityCode != 0 ) || (DivisionCodes == 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode == 0) || (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode == 0)|| (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode != 0)|| (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0)|| (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0)) {
             // else if ((DivisionCodes == 0 && Comp != 5   && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (DivisionCodes == 0 && Comp != 5  && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode != 0)  ) {
                 //   alert('4Comp wise City wise')
                    this.boolCheckJn = false;
                    this.boolCheck =false;
                    this.Sanction_Total = result.Sanctioned ;
                    
                    if (value ==-1 && value6==-1)
                    {
                          // alert('CD');
                          // if (Comp=="1")
                          // {
                          //   this.total_Demand_ = result2.ISSR; 
                          // }
                          // else if (Comp=="2")
                          // {
                          //   this.total_Demand_ = result2.BLC; 
                          // }
                          // else if (Comp=="3")
                          // {
                          //   this.total_Demand_ = result2.RAY; 
                          // }
                          // else if (Comp=="4")
                          // {
                          //   this.total_Demand_ = result2.AHP; 
                          // }
                          // this.Demand_Overall = this.total_Demand_;

                          this.total_Demand_ = result_Demand.DemandN;
                          this.Demand_Overall = this.total_Demand_;
                    }
                    else if (Comp != 0)
                    {
                     // alert('New');
                        if ((Comp != 0 && value6==-1)  )
                        {
                        //alert('2');
                            var arr=[];
                            arr=Comp.split(',');
                            arr.forEach(a=>{
                            if(a=='5')
                            {
                              arr.forEach(a=>{
                              
                                  this.boolCheck = true;
                              
                              })
                            }
                          })
                        }
                        if ((Comp != 0 && value==-1)  )
                          {
                          //alert('2');
                                var arr=[];
                                arr=Comp.split(',');
                                arr.forEach(a=>{
                                if(a=='6')
                                {
                                  arr.forEach(a=>{
                                  
                                      this.boolCheckJn = true;
                
                                  })
                                }
                              })
                          }
                         
                          if ((Comp != 0 )  )
                            {
                            //alert('2');
                                  var arr=[];
                                  arr=Comp.split(',');
                                  arr.forEach(a=>{
                                    if(a=='6' )
                                    {
                                        arr.forEach(a=>{
                                        if( a=='5')
                                        {
                                              arr.forEach(a=>{
                                              this.boolCheckJn = true;
                                              this.boolCheck = true;
                                          })
                                        }
                                  }) 

                                  }
                                })
                            }

                            if (this.boolCheck != false && this.boolCheckJn == false)
                            { 
                                 // alert(11);
                                  this.Sanction_Total = result.Sanctioned + result_clss.Total_Beneficiaries;
                                  this.total_Demand_ = result_Demand.DemandN;
                                  this.Demand_Overall = this.total_Demand_;
                             }                              
                    }
             }
             else if ((DivisionCodes != 0 && Comp == 5  && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (DivisionCodes != 0 && Comp == 5  && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode != 0)  ) {
                    //  alert('5Comp wise CLSS Demand /Sanction')
                  // this.Sanction_Total = result.Sanctioned ;
                     this.Sanction_Total  = result_clss.Total_Beneficiaries;
                     this.total_Demand_ = result2.CLSS; 
                     this.Demand_Overall = this.total_Demand_;
             }
            //  else if ((DivisionCodes == 0 && Comp != 0   && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (stateCode != 0 && DivisionCodes == 0 && Comp != 0  && DisttCode != 0 && cityCode != 0 )) {
            //   alert('Multiple Comp city wise demand /Approved');
            //   if (value ==-1 && value6==-1)
            //   {
            //     this.Sanction_Total = result.Sanctioned ;
            //     this.total_Demand_ = result2.AHP + result2.BLC + result2.ISSR;
            //     this.Demand_Overall = this.total_Demand_;
            //   }
              else if ((Comp != 0  && value6==-1)  || (Comp != 0 && value !=-1 && value6!=-1 ))
              {
               // alert('Test');
                this.Sanction_Total = result.Sanctioned + result_clss.Total_Beneficiaries;
                this.total_Demand_ = result2.demand;
                this.Demand_Overall = this.total_Demand_;
              }
         
        
        









              else if (Comp == '1' && stateCode == 0 && DisttCode == 0 && cityCode == 0 && DivisionCodes == 0) {
               // alert(Comp);
                this.total_Demand_ = result2.ISSR;
                this.Sanction_Total = this.Sanctioned ;// this.Sanctioned_State ;//this.ComponentWiseSanctioned;
              }
              else if (Comp == '1' && DivisionCodes == 0 && ((stateCode != 0 && DisttCode == 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode != 0))) {
               //  alert('comp 1 + state distt city');
             //  alert(result2.demand);
                this.Demand_Overall=result2.demand;
                this.total_Demand_ = result2.demand;
                this.Sanction_Total = this.Sanctioned ;// this.Sanctioned_State ;//this.ComponentWiseSanctioned;
              }
              else if (Comp == '2' && DivisionCodes == 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0) {
               // alert('2');
                this.total_Demand_ = result2.BLC;
                this.Sanction_Total = this.Sanctioned ;//this.ComponentWiseSanctioned;
              }
              else if (Comp == '2' && DivisionCodes == 0 && ((stateCode != 0 && DisttCode == 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode != 0))) {
                // alert('1n');
               this.total_Demand_ = result2.BLC;
               this.Sanction_Total = this.Sanctioned ;// this.Sanctioned_State ;//this.ComponentWiseSanctioned;
              }
              else if (Comp == '3' && DivisionCodes == 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0) {
                // alert('3');
                this.total_Demand_ = result2.RAY;
                this.Sanction_Total =this.Sanctioned ;// this.ComponentWiseSanctioned;
              }
              else if (Comp == '3' && DivisionCodes == 0 && ((stateCode != 0 && DisttCode == 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode != 0))) {
               // alert('1n');
               this.total_Demand_ = result2.RAY;
               this.Sanction_Total = this.Sanctioned ;// this.Sanctioned_State ;//this.ComponentWiseSanctioned;
              }
              else if (Comp == '4' && DivisionCodes == 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0) {
               //  alert('4');
                this.total_Demand_ = result2.AHP;
                this.Sanction_Total = this.Sanctioned ;//this.ComponentWiseSanctioned;
              }
              else if (Comp == '4' && DivisionCodes == 0 && ((stateCode != 0 && DisttCode == 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode != 0))) {
               //  alert('1n');
               this.total_Demand_ = result2.AHP;
               this.Sanction_Total = this.Sanctioned ;// this.Sanctioned_State ;//this.ComponentWiseSanctioned;
              }
              else if (Comp == '5' && DivisionCodes == 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0) {
               //  alert('5 clss');
                this.total_Demand_ = result2.CLSS;
                this.Sanction_Total =result_clss.Total_SubsidyAmt;//  this.CLSSBeneficiaries ;//result4.NoBeneficiary_Total;
              }
              else if (Comp == '5' && DivisionCodes == 0 && ((stateCode != 0 && DisttCode == 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode != 0))) {
               //  alert('1n');
               this.total_Demand_ = result2.CLSS;
               this.Sanction_Total = this.CLSSBeneficiaries ;// this.Sanctioned_State ;//this.ComponentWiseSanctioned;
              }
              else if ((Comp == '6' && value6 == 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0 && DivisionCodes==0 )) {
               //  alert('6');
                this.total_Demand_ =  0;// result2.ISSR + result2.BLC + result2.AHP + result2.CLSS;
                this.Sanction_Total =this.Sanctioned ;// this.ComponentWiseSanctioned;//+  this.CLSSBeneficiaries;
              }
              else if (((Comp == '1,2' || Comp == '2,1') && DivisionCodes==0 && (((stateCode == 0 && DisttCode == 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode != 0)|| (stateCode != 0 && DisttCode == 0 && cityCode == 0)|| (stateCode != 0 && DisttCode != 0 && cityCode == 0)|| (stateCode != 0 && DisttCode != 0 && cityCode != 0)))))  {
                //  alert('1,2  State');
                 this.Demand_Overall=result2.ISSR + result2.BLC;
                 this.total_Demand_ = result2.ISSR + result2.BLC;
                 this.Sanction_Total = this.Sanctioned;
              }
              else if (((Comp == '1,2,3' || Comp == '1,3,2' || Comp == '2,1,3' || Comp == '3,1,2' || Comp == '2,3,1' || Comp == '3,2,1')) && DivisionCodes==0 && ((stateCode == 0 && DisttCode == 0 && cityCode == 0)|| (stateCode != 0 && DisttCode != 0 && cityCode != 0)|| (stateCode != 0 && DisttCode == 0 && cityCode == 0)|| (stateCode != 0 && DisttCode != 0 && cityCode == 0)|| (stateCode != 0 && DisttCode != 0 && cityCode != 0)) ){
                // alert('1,2,3 State' );
                 this.total_Demand_ = result2.ISSR + result2.BLC;
                 this.Demand_Overall=result2.ISSR + result2.BLC;
                 this.Sanction_Total = this.Sanctioned;
              }
              else if (((Comp == '1,2,3,4' || Comp == '2,1,3,4' || Comp == '1,2,4,3' || Comp == '4,1,2,3' || Comp == '4,1,3,2' || Comp == '2,1,3,4' || Comp == '3,1,2,4' || Comp == '3,2,1,4') && DivisionCodes == 0 ) && ((stateCode == 0 && DisttCode == 0 && cityCode == 0)|| (stateCode != 0 && DisttCode != 0 && cityCode != 0)|| (stateCode != 0 && DisttCode == 0 && cityCode == 0)|| (stateCode != 0 && DisttCode != 0 && cityCode == 0)|| (stateCode != 0 && DisttCode != 0 && cityCode != 0)) ) {
                 // alert('5');
                 this.total_Demand_ = result2.ISSR + result2.BLC  +result2.AHP;
                 this.Sanction_Total = this.Sanctioned;
              }
              else if (((Comp == '1,2,3,4,5' ||(Comp == '5,4,3,2,1' ||Comp == '5,2,3,4,1' || Comp == '2,1,3,4,5' || Comp == '1,2,4,3,5'|| Comp == '1,2,3,4,5' || Comp == '4,1,2,3,5' || Comp == '4,1,3,2,5' || Comp == '2,1,3,4,5' || Comp == '3,1,2,4,5' || Comp == '3,2,1,4,5') && DivisionCodes == 0)  && (((stateCode == 0 && DisttCode == 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode != 0)|| (stateCode != 0 && DisttCode == 0 && cityCode == 0)|| (stateCode != 0 && DisttCode != 0 && cityCode == 0)|| (stateCode != 0 && DisttCode != 0 && cityCode != 0))))){
                //  alert('5');
                 this.total_Demand_ = result2.ISSR + result2.BLC  +result2.AHP  +result2.CLSS;// + this.CLSSBeneficiaries;
                 this.Sanction_Total = this.Sanctioned  + this.CLSSBeneficiaries;
              }
              else if ((Comp == '1,5' || Comp == '5,1') && value6 == -1 && DivisionCodes == 0 ) {
                // alert('7');
                 this.total_Demand_ =   result2.ISSR + result2.CLSS;// //this.CLSSBeneficiaries;
                 this.Sanction_Total = this.Sanctioned + result_clss.Total_Beneficiaries;// + this.CLSSBeneficiaries;;//this.ComponentWiseSanctioned;//+  this.CLSSBeneficiaries;
                }
              //  else if ((Comp.length > 0 && value >= 0 && value6 == -1)) {
              //   alert('1-5');
              //   this.total_Demand_ = result2.ISSR + result2.BLC + result2.AHP + result2.CLSS;
              //   this.Sanction_Total = this.Sanctioned + this.CLSSBeneficiaries;
              //  }
              else if ((Comp == '6' && value6 == 1  )) {
                //alert('7');
                this.total_Demand_ = "0";//  result2.ISSR + result2.BLC + result2.AHP + result2.CLSS;
                this.Sanction_Total = "0";//this.ComponentWiseSanctioned;//+  this.CLSSBeneficiaries;
               // alert(this.Sanction_Total);
              }
              else if ((Comp == '6' && value == -1)) {
               // alert('aa');
                this.total_Demand_ = 0;// result2.ISSR + result2.BLC + result2.AHP + result2.CLSS;
                this.Sanction_Total = 0;//this.Sanctioned ;// this.ComponentWiseSanctioned;
              }
              else if ((Comp.length > 0 && value == -1 && value6 >= 0) && stateCode == 0 && DisttCode == 0 && cityCode == 0) {
               // alert('1,6');
                if (Comp =="1,6" || Comp =="6,1"  )
                {
                  this.total_Demand_ = result2.ISSR;
                  this.Sanction_Total = this.Sanctioned;
                }
              }
              else if ((Comp.length > 0 && value == 1 && value6 >= 0 ) && stateCode == 0 && DisttCode == 0 && cityCode == 0) {
               // alert('5,6');
                if (Comp =="5,6" || Comp =="6,5"  )
                {
                  this.total_Demand_ =  result2.CLSS;
                  this.Sanction_Total = this.Sanctioned + this.CLSSBeneficiaries;
                }
              }
              //else if ((stateCode != 0 && Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0) ||
              else if  (stateCode != 0 && DivisionCodes != 0 && Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0) //
              {
                    if(Comp ==1)
                    {
                      //alert('H1-1');
                      this.Demand_Overall= result2.ISSR;
                      this.total_Demand_ = result2.ISSR;
                      this.Sanction_Total =this.Sanctioned;
                    // alert(this.total_Demand_);
                    }
                    else if(Comp =='1,2'|| Comp =='2,1')
                    {
                      //alert('H1-1,2');
                      this.Demand_Overall= result2.ISSR + result2.BLC;
                      this.total_Demand_ = result2.ISSR+ result2.BLC;
                      this.Sanction_Total =this.Sanctioned;
                    //  alert(this.total_Demand_);
                    }
                    else if(Comp =='1,2,3'|| Comp =='2,1,3'|| Comp =='2,3,1'|| Comp =='1,3,2'|| Comp =='3,1,2'|| Comp =='3,2,1')
                    {
                    //  alert('H1-1,2');
                      this.Demand_Overall= result2.ISSR + result2.BLC;// + result2.RAY;
                      this.total_Demand_ = result2.ISSR+ result2.BLC;// + result2.RAY;
                      this.Sanction_Total =this.Sanctioned;
                    }
                    else if(Comp =='1,2,3,4'|| Comp =='1,2,4,3'|| Comp =='1,4,2,3'|| Comp =='1,4,3,2'|| Comp =='1,3,2,4'|| Comp =='1,3,4,2'|| Comp =='2,3,4,1'|| Comp =='2,3,1,4'|| Comp =='2,3,4,1'|| Comp =='2,3,1,4'|| Comp =='3,1,4,2'|| Comp =='3,1,2,4'|| Comp =='3,4,1,2'|| Comp =='3,4,2,1'|| Comp =='3,2,1,4' )
                    {
                     // alert('H1-1,2,3,4');
                      this.Demand_Overall= result2.ISSR + result2.BLC + result2.AHP ;// + result2.RAY;
                      this.total_Demand_ = result2.ISSR+ result2.BLC+ result2.AHP;// + result2.RAY;
                      this.Sanction_Total =this.Sanctioned;
                    }
                    else if(Comp =='1,2,3,4,5'|| Comp =='1,2,4,3,5'|| Comp =='1,4,2,3'|| Comp =='1,4,3,2'|| Comp =='1,3,2,4'|| Comp =='1,3,4,2'|| Comp =='2,3,4,1'|| Comp =='2,3,1,4'|| Comp =='2,3,4,1'|| Comp =='2,3,1,4'|| Comp =='3,1,4,2'|| Comp =='3,1,2,4'|| Comp =='3,4,1,2'|| Comp =='3,4,2,1'|| Comp =='3,2,1,4' )
                    {
                      //alert('H1-1,2,3,4,5');
                      this.Demand_Overall= result2.ISSR + result2.BLC + result2.AHP + result2.CLSS ;// + result2.RAY;
                      this.total_Demand_ = result2.ISSR+ result2.BLC+ result2.AHP+ result2.CLSS;// + result2.RAY;
                      this.Sanction_Total =this.Sanctioned;
                    }
                    else if(Comp =='1,2,3,4,5,6'|| Comp =='1,2,4,3,5,6'|| Comp =='1,4,2,3'|| Comp =='1,4,3,2'|| Comp =='1,3,2,4'|| Comp =='1,3,4,2'|| Comp =='2,3,4,1'|| Comp =='2,3,1,4'|| Comp =='2,3,4,1'|| Comp =='2,3,1,4'|| Comp =='3,1,4,2'|| Comp =='3,1,2,4'|| Comp =='3,4,1,2'|| Comp =='3,4,2,1'|| Comp =='3,2,1,4' )
                    {
                      //alert('H1-1,2,3,4,5,6');
                      this.Demand_Overall= result2.ISSR + result2.BLC + result2.AHP + result2.CLSS ;// + result2.RAY;
                      this.total_Demand_ = result2.ISSR+ result2.BLC+ result2.AHP+ result2.CLSS;// + result2.RAY;
                      this.Sanction_Total = this.Sanctioned;// + resultJN.;
                    }
                //this.ZeroDemand =0;
                //this.demand  =0;
              }
              else if ((Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0) || (stateCode != 0 && DisttCode != 0 && cityCode != 0) || (stateCode != 0 && DisttCode != 0 && cityCode == 0)) {
                 //alert('1-4 SnV');

                this.total_Demand_ = result2.ISSR + result2.BLC + result2.AHP + result2.CLSS;
                this.Sanction_Total =this.Sanctioned ;// this.ComponentWiseSanctioned;//+ this.Sanctioned
              }
              // alert(Comp);

            //  alert(this.total_Demand_);
           // this.total_Demand1_  = indianFormat1(this.total_Demand1_);
           // this.Demand_Overall =indianFormat1(<number><any>this.Demand_Overall);
           this.ZeroDemand1 = "";
            
            if (this.demand == 0) {
                this.total_Demand1_ = 0;
                this.ZeroDemand = "Sanctioned";
               }
               else {
                if (this.total_Demand_ != 0) {
                  if ((stateCode == 0 && DisttCode == 0 && cityCode == 0 && Comp == 0 && DivisionCodes == 0)) {
                    this.total_Demand1_ = "1 Cr";
                    this.ZeroDemand1 =  "1  cr";
                    this.ZeroDemand = "Approved/Demand "  ;
                    // + "1  cr";
                  }
                  else if ((stateCode == 0 && DisttCode == 0 && cityCode == 0 && Comp == 0 && DivisionCodes == 0)) {
                    this.total_Demand1_ = this.Demand_Overall;
                    this.ZeroDemand1 =indianFormat(this.total_Demand1_);
                    this.ZeroDemand = "Approved/Demand ";// + indianFormat(this.total_Demand1_); 
                  }
                  else if ((stateCode != 0 && DisttCode == 0 && cityCode == 0)) {
                    this.total_Demand1_ = this.Demand_Overall;
                    this.ZeroDemand1 =  indianFormat(this.total_Demand1_) ;
                    this.ZeroDemand = "Approved/Demand " ;//+ indianFormat(this.total_Demand1_) ; 
                  }
                  else if ((stateCode != 0 && DisttCode == 0 && cityCode == 0) || (stateCode != 0 && DisttCode != 0 && cityCode == 0)) {
                     this.total_Demand1_ = this.Demand_Overall;
                     this.ZeroDemand1 =    indianFormat(this.total_Demand1_) ;
                     this.ZeroDemand = "Approved/Demand "; 
                   }
                  else {
                    this.total_Demand1_ = this.total_Demand_;
                    this.ZeroDemand1 =    indianFormat(this.total_Demand1_) ;
                    this.ZeroDemand = "Approved/Demand ";// + indianFormat(this.total_Demand1_);   
                  }
                }
                else {
                  if (this.total_Demand_ == 0)
                  {
                  this.ZeroDemand1 ="";
                    this.ZeroDemand = "";// "Houses Approved " + this.Sanctioned;
                  }
                }
              }
              
              CanvasJS.addColorSet("groundedColors",
                [
                  "#0000FF",
                  // "#28a745",
                  "#66FF33",
                  //"#0000FF",

                  "#00FF00",
                  "#188534",
                  "#17a2b8"
                ]);
              var formatter = new Intl.NumberFormat('en-IN', {
                minimumFractionDigits: 0,
              });

              let chart = new CanvasJS.Chart("DemandContainer", {
                theme: "light2",
                showInLegend: true,
                animationEnabled: true,
                exportEnabled: false,
                backgroundColor: this.backgroundColor,//"#B3E5FC",
                colorSet: "groundedColors",

                title: {
                  text: formatter.format(this.Sanction_Total), //formatter.format
                  verticalAlign: "center",
                  dockInsidePlotArea: true,
                  fontSize: 18
                },
                data: [{
                  type: "doughnut",
                  showInLegend: false,
                  backgroundColor: this.backgroundColor,//"#B3E5FC",
                  toolTipContent: "<b>{name}</b>",
                  dataPoints: [
                    { y: this.total_Demand_ - this.Sanction_Total, name: "Demand" }, //49.39
                    { y: this.Sanction_Total, name: "Houses Sanctioned" }, //45.45
                  ]
                }]
              });
              chart.render();
            });
          });
        });
      });
    });
  });
 });
}
BindSancForRel(stateCode, DisttCode, cityCode, Comp, DivisionCodes) {
  // current 2
  
  this.DivisionCodes ='HFA-1';   
  this.service.GetStateWiseFinYrData_Div(stateCode, DivisionCodes).subscribe(result_State => { // new code
    this.Demand_Overall = result_State.Demand;
    this.Houses_Grounded_State = result_State.Grounded; //
    this.Sanctioned_State = result_State.HousesSanctioned;//
    this.ZeroDemand_State = result_State.HousesSanctioned;//
    this.Demand_State = result_State.Demand;
    this.CAApproved = result_State.CAApproved;// thus is subsidy  * 125730.69
    this.CASanctionedforReleaseN = result_State.CASanctionedforRelease; //* 69806

    this.service.HFACompWiseReportPMayList_Div(stateCode, DisttCode, cityCode, Comp, DivisionCodes).subscribe(result => {
      if (result.CASanctforRelease != null) {
        this.CASanct_forReleaseN1 = result.CASanctforRelease;
        this.CASanct_forReleaseNEW = result.CASanctforRelease.toString();//.toFixed(2);
      }
      else {
        this.CASanct_forReleaseN1 = 0;
        this.CASanct_forReleaseNEW = "0";
      }
      this.CA_Approvd = result.CentralAssistanceCommitted;
     // alert(this.CA_Approvd);
    

     this.service.GetJNNURM_Detail(stateCode,DisttCode ,cityCode ,Comp, DivisionCodes).subscribe(resultJN => {
        this.Grounded   = resultJN.Grounded;
        this.Completed1 = resultJN.Completed1;

        this.service.GetCLSS_Detail(stateCode, DisttCode, cityCode,Comp,DivisionCodes).subscribe(result_clss => {
       

          // CLSS_MainMaster
        this.service.HFA_sp_CLSS_CompWise(stateCode, DisttCode, cityCode).subscribe(result1 => {
        this.CLSS_SubsidyTotal = result1.EWS_LIG_Subsidy + result1.MIG_SubsidyAmtTotal;
        this.CA_SanctforReleaseTotal = (result.CASanctforRelease + (this.CLSS_SubsidyTotal / 100000));

          // state wise CLSS_MASTER
        this.service.CLSS_Values_List(stateCode).subscribe(result4 => {
          this.CLSS_SubsidyTotal_State = result4.Subsidy_Total;
          this.compArray = Comp.split(",");
          const value = this.compArray.indexOf("5");
          const value6 = this.compArray.indexOf("6");
          //alert(value);

          if ((DivisionCodes != 0 && Comp == 0) && (stateCode == 0 && DisttCode == 0 && cityCode == 0) ||(DivisionCodes != 0 && Comp == 0) && (stateCode != 0 && DisttCode == 0 && cityCode == 0)) {
              //  alert('Division Wise') ;
            this.CASanct_forReleaseN1 = this.CASanctionedforReleaseN;//+ this.CLSS_SubsidyTotal;
            this.CA_Approvd = this.CAApproved;// + this.CLSS_SubsidyTotal;
          }
          else if (((Comp == 0 && value == -1) && (stateCode == 0 && DisttCode == 0 && cityCode == 0 && value == -1 && DivisionCodes != 0)) || ((stateCode != 0 && DisttCode == 0 && cityCode == 0 && value == -1 && Comp == 0 && DivisionCodes != 0))) {
             //    alert('page load WITH state ');
            this.CASanct_forReleaseN1 = this.CASanctionedforReleaseN;//+ this.CLSS_SubsidyTotal;
            this.CA_Approvd = this.CAApproved;// + this.CLSS_SubsidyTotal;
          }
          // else if (((Comp == 0 && value == -1) && (stateCode != 0 && DisttCode != 0 && cityCode == 0 && value == -1 && DivisionCodes == 0)) || ((stateCode != 0 && DisttCode != 0 && cityCode != 0 && value == -1 && Comp == 0 && DivisionCodes == 0))) {
          //     alert('City- Wise');
          //   this.CASanct_forReleaseN1 = this.CASanct_forReleaseN1  + this.CLSS_SubsidyTotal;
          //   this.CA_Approvd = this.CA_Approvd + this.CLSS_SubsidyTotal;
          // }
          // else if ((DivisionCodes == 0 && Comp != 5  && value==-1 && value6==-1 && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (DivisionCodes == 0 && Comp != 5 && value==-1 && value6==-1 && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode != 0)  ) {
          //     alert('4Comp wise City wise Sanc Commit')
          //       this.CASanct_forReleaseN1 = this.CASanct_forReleaseN1 ;
          //       this.CA_Approvd = this.CA_Approvd ;
          // }
          else if ((Comp == '6' && value == -1 && stateCode == 0 && DisttCode == 0 && cityCode == 0)) {
               //  alert('6');
          this.CASanct_forReleaseN1 = 0;// this.CLSS_SubsidyTotal;
          this.CA_Approvd = 0;// this.CLSS_SubsidyTotal;
          this.CASanct_forReleaseNChange =0;
          }
          else if ((DivisionCodes != 0 && Comp == 5 && value6==-1 && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (DivisionCodes != 0 && Comp == 5 && value6==-1 && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode != 0)  ) {
            //   alert('5Comp wise City wise Sanc Commit')
               this.CASanct_forReleaseN1 = result_clss.Total_SubsidyAmt;
               this.CA_Approvd = <number><any>result_clss.Total_SubsidyAmt;
          }
          else if ((DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (stateCode != 0 && DivisionCodes != 0 && Comp != 0  && DisttCode != 0 && cityCode != 0 ) || (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode != 0)|| (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) ||  (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0) ||  (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode == 0)||  (DivisionCodes == 0 && Comp == 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) ||  (DivisionCodes == 0 && Comp == 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0)) {
            // alert('City Multiple Comp wise Sanc -Commit Wise'); 
            this.boolCheck =false;
            // && value6==-1
            if (value ==-1 )
            {
             //  alert(1);
              this.CASanct_forReleaseN1 = this.CASanct_forReleaseN1;
              this.CA_Approvd = this.CA_Approvd ;
            }
            // && value6==-1
            else if ((Comp != 0)  )   
            {
            // alert('2');
             var arr=[];
             arr=Comp.split(',');
             arr.forEach(a=>{
               if(a=='5')
               {
                arr.forEach(a=>{
                  if(a=='1' || a=='2' || a=='3'|| a=='4'|| a=='5'|| a=='6')
                  {
                    this.boolCheck = true;
                  }
                })
               }
             })
             if (this.boolCheck = true)
             {
               //       alert(2);
                      this.CASanct_forReleaseN1 = <number><any>this.CASanct_forReleaseN1 + <number><any>result_clss.Total_SubsidyAmt;
                      this.CA_Approvd =this.CA_Approvd + <number><any>result_clss.Total_SubsidyAmt;
                      this.CA_ApprovdNew = this.CA_Approvd;  
                      this.CASanct_forReleaseNChange = indianFormat1(this.CASanct_forReleaseN1);
                      this.boolCheck = false;
                      this.CA_ApprovdNew =indianFormat1(this.CA_ApprovdNew);
             }
            }
          }



         else if ((Comp == '6' && value == -1 )) {
               //   alert('6');
            this.CASanct_forReleaseN1 = 0;//this.CLSS_SubsidyTotal;
            this.CA_Approvd = 0;//this.CLSS_SubsidyTotal;
        }
          else if (stateCode != 0 && (Comp == 1)) //
          {
              // alert('Test');
            this.CA_Approvd = this.CA_Approvd;
            this.Ca_Sanct_ = this.CASanct_forReleaseN1;
          }
          else if ((stateCode != 0 && Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0) || (DivisionCodes != 0 && Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0)) //
          {
                //   alert('1-4');
            this.CASanct_forReleaseN1 = this.CA_SanctforReleaseTotal;
            this.CA_Approvd = this.CA_Approvd;
          }
          else if ((Comp.length > 0 && value >= 0 && value6 == -1 && DivisionCodes == 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0)  || (Comp.length > 0 && value >=0 && value6 >= 0 && DivisionCodes == 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0)) {
             // alert('1-6 ALL');
          //this.CASanct_forReleaseN1 = this.CA_SanctforReleaseTotal;
          //this.CA_Approvd = this.CA_Approvd;

          this.CASanct_forReleaseN1 = result_clss.Total_SubsidyAmt  + this.CASanct_forReleaseN1 ;
          this.CA_Approvd = <number><any>result_clss.Total_SubsidyAmt + this.CA_Approvd;
          this.CASanct_forReleaseNChange = this.CASanct_forReleaseN1;
        }
        else if ((Comp.length > 0 && value >= 0 && value6 == -1 && DivisionCodes != 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0)  || (Comp.length > 0 && value >=0 && value6 >= 0 && DivisionCodes != 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0)) {
             // alert('1-6 ALL DIV');
        //this.CASanct_forReleaseN1 = this.CA_SanctforReleaseTotal;
        //this.CA_Approvd = this.CA_Approvd;
        result_clss.Total_SubsidyAmt =result_clss.MIG1_SubsidyAmt + result_clss.MIG2_SubsidyAmt +result_clss.EWS_Subsidy + result_clss.LIG_Subsidy;

        this.CASanct_forReleaseN1 = result_clss.Total_SubsidyAmt  + this.CASanct_forReleaseN1;// + result_clss.Total_SubsidyAmt;
        this.CA_Approvd = <number><any>result_clss.Total_SubsidyAmt + this.CA_Approvd ;//+ <number><any>result_clss.Total_SubsidyAmt;
        this.CASanct_forReleaseNChange = this.CASanct_forReleaseN1;
      }
          else if ((Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0 && DivisionCodes != 0 && stateCode != 0 && DisttCode != 0 && cityCode != 0) ) {
              //alert('all no clss jn'); // for 1-4 components only
            this.CASanct_forReleaseN1 = this.CASanct_forReleaseN1;
            this.CA_Approvd = this.CA_Approvd;
          }

        //   else if ((Comp.length > 0 && value >= 0 && value6 == -1)) {
        //     alert('1-5');
        //    this.CASanct_forReleaseN1 = this.CA_SanctforReleaseTotal;
        //    this.CA_Approvd = this.CA_Approvd;
        //  }

          else if ((Comp.length > 0 && value >= 0 && value6 == -1 && Comp != 0 && DivisionCodes != 0 && stateCode != 0 && DisttCode == 0 && cityCode == 0) || (Comp.length > 0 && value >= 0 && value6 == -1 && Comp != 0 && DivisionCodes != 0 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (Comp.length > 0 && value >= 0 && value6 == -1 && Comp != 0 && DivisionCodes != 0 && stateCode != 0 && DisttCode != 0 && cityCode != 0)) {
            //   alert('1-4 clss'); // for 1-4 components + state, distt, city + div
            result_clss.Total_SubsidyAmt =result_clss.MIG1_SubsidyAmt + result_clss.MIG2_SubsidyAmt +result_clss.EWS_Subsidy + result_clss.LIG_Subsidy;

            this.CASanct_forReleaseN1 = result_clss.Total_SubsidyAmt  + this.CASanct_forReleaseN1;// + result_clss.Total_SubsidyAmt;
            this.CA_Approvd = <number><any>result_clss.Total_SubsidyAmt + this.CA_Approvd ;//+ <number><any>result_clss.Total_SubsidyAmt;
            this.CASanct_forReleaseNChange = this.CASanct_forReleaseN1;
         }
         else if ((Comp.length > 0 && value >= 0 && value6 >=0 && Comp != 0 && DivisionCodes != 0 && stateCode != 0 && DisttCode == 0 && cityCode == 0) || (Comp.length > 0 && value >= 0 && value6 == -1 && Comp != 0 && DivisionCodes != 0 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (Comp.length > 0 && value >= 0 && value6 == -1 && Comp != 0 && DivisionCodes != 0 && stateCode != 0 && DisttCode != 0 && cityCode != 0)) {
          //  alert('1-4 clss'); // for 1-4 components + state, distt, city + div
          result_clss.Total_SubsidyAmt =result_clss.MIG1_SubsidyAmt + result_clss.MIG2_SubsidyAmt +result_clss.EWS_Subsidy + result_clss.LIG_Subsidy;
          this.CASanct_forReleaseN1 = result_clss.Total_SubsidyAmt  + this.CASanct_forReleaseN1;// + result_clss.Total_SubsidyAmt;
          this.CA_Approvd = <number><any>result_clss.Total_SubsidyAmt + this.CA_Approvd ;//+ <number><any>result_clss.Total_SubsidyAmt;
          this.CASanct_forReleaseNChange = this.CASanct_forReleaseN1;
         }
          else if ((Comp == '5' && DivisionCodes == 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0) )  {
              //    alert(5); // ok for clss only
              this.CASanct_forReleaseN1 = result_clss.Total_SubsidyAmt  ;
              this.CA_Approvd = <number><any>result_clss.Total_SubsidyAmt;
              this.CASanct_forReleaseNChange = this.CASanct_forReleaseN1;
          }
          else if ((Comp == '5' && DivisionCodes == 0 && stateCode != 0 && DisttCode == 0 && cityCode == 0) )  {
           // alert(5); // ok for clss only
        this.CASanct_forReleaseN1 = result_clss.Total_SubsidyAmt  ;
        this.CA_Approvd = <number><any>result_clss.Total_SubsidyAmt;
    //    this.CASanct_forReleaseNChange = this.CASanct_forReleaseN1;
           }

          else if ((Comp.length > 0 && value >= 0 && value6 >= 0)) {
           //    alert('5-6');
           //this.CASanct_forReleaseN1 = this.CA_SanctforReleaseTotal;
           //this.CA_Approvd = this.CA_Approvd;

           this.CASanct_forReleaseN1 = result_clss.Total_SubsidyAmt  ;
           this.CA_Approvd = <number><any>result_clss.Total_SubsidyAmt;
           this.CASanct_forReleaseNChange = this.CASanct_forReleaseN1;
         }

          else if ((Comp.length > 0 && value >= 0 && value6 >= 0 && Comp == '5.6') || (Comp.length > 0 && value >= 0 && value6 >= 0 && Comp == '6.5')) {
            //  alert('5-6 aa');
            this.CASanct_forReleaseN1 = this.CA_SanctforReleaseTotal;
            this.CA_Approvd = this.CA_Approvd;
          }


          else if ((Comp.length > 0 && value == -1 && value6 >= 0)) {
            //  alert('1-4,6');
            this.CASanct_forReleaseN1 = this.CASanct_forReleaseN1;
            this.CA_Approvd = this.CA_Approvd;
          }
//------------------------------------------------
           
           if (this.CA_Approvd == null)
              this.CA_Approvd = 0;

           if ( this.CASanct_forReleaseN1 >0)
           {
           this.CASanct_forReleaseNChange =  (this.CASanct_forReleaseN1);//.toFixed(2);
           }
           else
           {
             this.CASanct_forReleaseNChange =  (this.CASanct_forReleaseN1);//.toFixed(0);
           }
            this.Ca_Sanct_ = this.CASanct_forReleaseN1;//.toFixed(0);
            this.CA_ApprovdNew = indianFormat1(this.CA_Approvd);//.toFixed(0);
             
           var formatter = new Intl.NumberFormat('en-IN', {
             minimumFractionDigits: 0,
           });

           this.CASanct_forRelease_NChange =indianFormat1(this.CASanct_forReleaseNChange);

          // alert(this.CASanct_forReleaseNChange);
          //alert(this.CASanct_forReleaseN.toFixed(0));
          // alert( this.CA_Approvd);
          if (this.CASanct_forReleaseNChange == "" || this.CASanct_forReleaseNChange == '0' || this.CASanct_forReleaseNChange == null) {

            this.CASanct_forReleaseNChange = "0";
          }
          CanvasJS.addColorSet("groundedColors",
            [//colorSet Array
              "#8A2BE2",
             // "#28a745",
             "#66FF33", 
             "#00FF00",
              "#28a745"
              
            ]);
          let chart = new CanvasJS.Chart("sancforRel", {
            theme: "light2",
            animationEnabled: true,
            backgroundColor: this.backgroundColor,//"#B3E5FC",
            colorSet: "groundedColors",
            exportEnabled: false,
            title: {
              text: formatter.format(this.CASanct_forReleaseNChange),//formatter.format "Sanctioned" +
              verticalAlign: "center",
              dockInsidePlotArea: true,
              fontSize: 18
            },
            data: [{
              backgroundColor:this.backgroundColor,// "#B3E5FC",
              type: "doughnut",
              toolTipContent: "<b>{name}</b>",
              dataPoints: [
                { y: this.CA_Approvd - this.CASanct_forReleaseN1, name: "Pending for Sanction" },
                { y: this.CASanct_forReleaseN1, name: "Sanctioned for Release" },
              ]
            }]

          });
          chart.render();
        });

      });
    });
  });
});
});

}

BindCAReleased(stateCode, DisttCode, cityCode, Comp, DivisionCodes) {//3
  this.DivisionCodes ='HFA-1';
  this.service.GetStateWiseFinYrData_Div(stateCode, DivisionCodes).subscribe(result_State => { // new code
    // this.service.GetStateWiseFinYrData(stateCode).subscribe(result_State => { // new code
    this.CASanctionedforReleaseN = result_State.CASanctionedforRelease; //*
    this.CAReleased = result_State.CAReleased; // approved  ?

    // this.Demand_Overall = result_State.Demand;
    // this.Houses_Grounded_State  = result_State.Grounded; //
    // this.Sanctioned_State= result_State.HousesSanctioned;//
    // this.ZeroDemand_State =result_State.HousesSanctioned;//
    // this.Demand_State =result_State.Demand;
    // this.CAApproved  =result_State.CAApproved ;// thus is subsidy  *

    this.service.HFACompWiseReportPMayList_Div(stateCode, DisttCode, cityCode, Comp, DivisionCodes).subscribe(result => {
      // this.service.HFACompWiseReportPMayList(stateCode,DisttCode,cityCode,Comp).subscribe(result => {
      if (result.CASanctforRelease != null) {
        this.CASanct_for_Release = result.CASanctforRelease;
        this.CA_Released = result.CentralAssistanceReleased;
        this.CA_ReleasedNew = result.CentralAssistanceReleased.toString();//.toFixed(2);
        // alert(result.CentralAssistanceReleased);
        this.CASanct_forRelease1 = this.CASanct_for_Release.toFixed(2);
      }
      else {
        this.CASanct_for_Release = 0;
        this.CA_Released = 0;
        this.CA_ReleasedNew = "0";
        this.CASanct_forRelease1 = "0";
      }

      // clss_MainMaster
      this.service.HFA_sp_CLSS_CompWise(stateCode, DisttCode, cityCode).subscribe(result1 => {
        this.CLSS_SubsidyTotal = result1.EWS_LIG_Subsidy + result1.MIG_SubsidyAmtTotal;
        this.TOT_CA_Approved = result.CentralAssistanceCommitted + this.CLSS_SubsidyTotal;
        //  alert(Comp);

        this.service.GetCLSS_Detail(stateCode, DisttCode, cityCode,Comp,DivisionCodes).subscribe(result_clss => {


        this.compArray = Comp.split(",");
        const value = this.compArray.indexOf("5");
        const value6 = this.compArray.indexOf("6");

       // alert(DivisionCodes);
        // alert(value);
        // alert(value6);
        // alert(stateCode);
        this.CASanct_forRelease = this.CASanct_for_Release;

        if ((DivisionCodes != 0 && Comp == 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0 ) || (DivisionCodes != 0 && Comp == 0 && stateCode != 0 && DisttCode == 0 && cityCode == 0 ) ) {
           // alert('Div');
          this.CASanct_forRelease = this.CASanctionedforReleaseN;//+ this.CLSS_SubsidyTotal;
          this.CA_Released = this.CAReleased;// + this.CLSS_SubsidyTotal;
         // alert(this.CA_Released);
        }
        else if (((Comp == 0 && value == -1) && (stateCode == 0 && DisttCode == 0 && cityCode == 0 && value == -1 && DivisionCodes != 0)) || ((stateCode != 0 && DisttCode == 0 && cityCode == 0 && value == -1 && Comp == 0 && DivisionCodes == 0)))
        {
            // alert('page load')
          this.CASanct_forRelease = this.CASanctionedforReleaseN;//+ this.CLSS_SubsidyTotal;
          this.CA_Released = this.CAReleased;// this.CAApproved ;// + this.CLSS_SubsidyTotal;
        }
        else if (((Comp == 0 && value == -1) && (stateCode != 0 && DisttCode != 0 && cityCode == 0 && value == -1 && DivisionCodes != 0)) || ((Comp == 0 && value == -1) && (stateCode != 0 && DisttCode != 0 && cityCode != 0 && value == -1 && DivisionCodes != 0)) ||(Comp == 0 && value == -1 && stateCode != 0 && DisttCode == 0 && cityCode == 0 && value == -1 && DivisionCodes != 0) ||(Comp == 0 && value == -1 && stateCode != 0 && DisttCode != 0 && cityCode == 0 && value == -1 && DivisionCodes != 0)||(Comp == 0 && value == -1 && stateCode != 0 && DisttCode == 0 && cityCode != 0 && value == -1 && DivisionCodes != 0))
        {
         // alert('City Wise')
          this.CASanct_forRelease = result.CASanctforRelease + this.CLSS_SubsidyTotal;
          this.CA_Released = result.CentralAssistanceReleased  + this.CLSS_SubsidyTotal;
        }
        // else if ((DivisionCodes == 0 && Comp != 5  && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (DivisionCodes == 0 && Comp != 5  && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode != 0)  ) {
        //     alert('4Comp wise City wise Sanc Rel')
        //   this.CASanct_forRelease = result.CASanctforRelease;
        //   this.CA_Released = result.CentralAssistanceReleased ;
        // }
      //  else if ((DivisionCodes == 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (stateCode != 0 && DivisionCodes == 0 && Comp != 0  && DisttCode != 0 && cityCode != 0 )) {
        else if ((DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (stateCode != 0 && DivisionCodes == 0 && Comp != 0  && DisttCode != 0 && cityCode != 0 ) ||(DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode != 0)  || (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) ||  (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0) ||  (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode == 0)||  (DivisionCodes == 0 && Comp == 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) ||  (DivisionCodes != 0 && Comp == 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0)) {
           // alert('City Multiple Comp wise Sanc -Disbursed Wise');
            if (value ==-1   )
            {
              // alert(1);
              this.CASanct_forRelease = result.CASanctforRelease;
              this.CA_Released = result.CentralAssistanceReleased;

            }
            // && value6==-1
            else if ((Comp != 0 )  )
            {
             // alert(2);
                var arr=[];
                arr=Comp.split(',');
                arr.forEach(a=>{
                if(a=='5')
                {
                   arr.forEach(a=>{
                   if(a=='1' || a=='2' || a=='3'|| a=='4'|| a=='5'|| a=='6')
                   {
                        this.boolCheck = true;
                   }
                 })
                }
              })
              if (this.boolCheck = true)
              {
                // alert('with CLSS');

                 
                  this.CASanct_forRelease = result.CASanctforRelease + <number><any>result_clss.Total_SubsidyAmt;
                  this.CA_Released = result.CentralAssistanceReleased  + <number><any>result_clss.Total_SubsidyAmt;
                  this.boolCheck = false;
                 
                 
              }
            }
        }
        
        else if (stateCode != 0 && value == -1 && value6 == -1 && Comp == 1) {
           // alert(1);
          this.CASanct_forRelease = this.CASanct_forRelease;
          this.CA_Released = this.CA_Released;
        }
        else if ((Comp == '5' && value == 0) || (Comp.length == 1 && value == 0)) {
           //  alert('5');
          // this.CASanct_forRelease =   this.CLSS_SubsidyTotal;
         // this.CA_Released = this.CLSS_SubsidyTotal;
           this.CASanct_forRelease = <number><any>result_clss.Total_SubsidyAmt;
           this.CA_Released = <number><any>result_clss.Total_SubsidyAmt;
           this.CA_ReleasedNw = this.CA_Released ;
        }

       else if ((Comp == '6' && value == -1 && DivisionCodes!=0 && stateCode == 0 && DisttCode == 0 && cityCode == 0)) {
         //  alert('6 only');
         this.CASanct_forRelease =0;// this.CASanct_forRelease + this.CLSS_SubsidyTotal;
         this.CA_Released = 0;//this.CA_Released + this.CLSS_SubsidyTotal
         this.CA_ReleasedNw =0;// this.CA_Released ;
      }
        else if ((stateCode != 0 && Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0) || (stateCode != 0 && DivisionCodes != 0 && Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0)) //
        // else if ( stateCode !=0 && (Comp.length >0 && value ==-1 && value6 ==-1  && Comp !=0) )
        {
          //  alert(2);
          this.CASanct_forRelease = this.CASanct_forRelease;
          this.CA_Released = this.CA_Released;
        }
        else if ((Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0 && DivisionCodes==0)) {
           //  alert('Comp ds');    // OK FOR 1
           this.CASanct_forRelease = result.CASanctforRelease;
           this.CA_Released = result.CentralAssistanceReleased;
        }
        else if (((Comp.length > 0 && value >= 0 && value6 == -1) || (Comp.length > 0 && value >= 0 && value6 >= 0))&& DivisionCodes!=0 && stateCode == 0 && DisttCode == 0 && cityCode == 0) {
            // alert('1-5_new');
            this.CASanct_forRelease =result.CASanctforRelease + <number><any>result_clss.Total_SubsidyAmt; //result_clss.Total_SubsidyAmt;
            this.CA_Released =result.CentralAssistanceReleased +  <number><any>result_clss.Total_SubsidyAmt;//.CLSS_SubsidyTotal
            this.CA_Released_Nw= this.CA_Released;
       }
        else if ((Comp.length > 0 && value >= 0 && value6 >= 0 && Comp == '5.6') || (Comp.length > 0 && value >= 0 && value6 >= 0 && Comp == '6.5')) {
          //  alert('5-6');
          this.CASanct_forRelease = <number><any>result_clss.Total_SubsidyAmt;
          this.CA_Released = <number><any>result_clss.Total_SubsidyAmt;
        }
        else if (DivisionCodes != 0 && Comp.length > 0 && value == -1 && value6 == -1 ) {
          // alert('Div-Comp');
          this.CASanct_forRelease = result.CASanctforRelease;//+ this.CLSS_SubsidyTotal;
          this.CA_Released = result.CentralAssistanceReleased;// + this.CLSS_SubsidyTotal;
          this.CA_Released_Nw= this.CA_Released;
        }
        else if (DivisionCodes != 0 && Comp.length > 0 && value >= 0 && value6 == -1 ) {
         // alert('Div-Comp CLSS');
            result_clss.Total_SubsidyAmt =result_clss.MIG1_SubsidyAmt + result_clss.MIG2_SubsidyAmt +result_clss.EWS_Subsidy + result_clss.LIG_Subsidy;
            this.CASanct_forRelease = result.CASanctforRelease  + <number><any>result_clss.Total_SubsidyAmt;
            this.CA_Released = result.CentralAssistanceReleased  + <number><any>result_clss.Total_SubsidyAmt;
            this.CA_Released_Nw= result.CentralAssistanceReleased  + <number><any>result_clss.Total_SubsidyAmt;

         // this.CASanct_forRelease =   <number><any>result_clss.Total_SubsidyAmt;
         // this.CA_Released =   <number><any>result_clss.Total_SubsidyAmt;
         // this.CA_Released_Nw=  <number><any>result_clss.Total_SubsidyAmt;

        }
      //   else if ((Comp.length > 0 && value >= 0 && value6 >= 0 && DivisionCodes==0 && stateCode == 0 && DisttCode == 0 && cityCode == 0)) {
      //     alert('5, 6 only ');
      //    this.CASanct_forRelease = <number><any>result_clss.Total_SubsidyAmt;
      //    this.CA_Released = <number><any>result_clss.Total_SubsidyAmt;
      //    this.CA_ReleasedNw = this.CA_Released ;
      // }

        else if ((Comp.length > 0 && value == -1 && value6 >= 0)) {
          // alert('1-4,6');
          this.CASanct_forRelease = 0;// this.CLSS_SubsidyTotal;
          this.CA_Released = 0;// this.CLSS_SubsidyTotal
        }

        //alert(this.CASanct_forRelease);
        //alert(this.CA_Released);


        // if (Comp.length==1 && value==0)
        // {
        //   this.CASanct_forRelease = this.CLSS_SubsidyTotal;
        //   this.CA_Released =this.CLSS_SubsidyTotal;
        // }
        // else if (Comp.length>=1 && value==-1)
        // {
        //   this.CASanct_forRelease =this.CASanct_forRelease  ;
        //   this.CA_Released =this.CA_Released;
        // }
        // else if (Comp.length>=1 && value==0)
        // {
        //   this.CASanct_forRelease =this.CASanct_forRelease + this.CLSS_SubsidyTotal;
        //   this.CA_Released =this.CA_Released + this.CLSS_SubsidyTotal;
        // }

        var formatter = new Intl.NumberFormat('en-IN', {
          minimumFractionDigits: 0,
        });

        if (this.CA_Released >0)
        {
            this.CA_ReleasedNw = this.CA_Released;//.toFixed(2);
        }
        else
        {
            this.CA_ReleasedNw = this.CA_Released;//.toFixed(0);
        }
        if (this.CA_ReleasedNw == 0 || this.CA_ReleasedNw ==null)
          this.CA_Released_Nw = "Nil";
        if (this.CA_ReleasedNw != 0)
          this.CA_Released_Nw = formatter.format(this.CA_ReleasedNw);
          
        //alert(this.CA_ReleasedNw);
        // this.CA_ReleasedNw1 =formatter.format(this.CA_ReleasedNw);
        //this.CAR_NEW  = this.CLSS_SubsidyTotal/100000 + this.Central_Assistance_Released ;
        // this.CASanctforReleaseNew =this.CASanctforRelease + this.CLSS_SubsidyTotal;
        // this.CAR_NEW1 =this.CAR_NEW.toFixed(2);

        CanvasJS.addColorSet("groundedColors",
          [//colorSet Array

            "#17a2b8",
            //"#28a745",
            "#66FF33",
            "#00FF00",
            "#20c997",
            "#fd7e14",
            "#17a2b8",
            "#6c757d",

          ]);


        let chart = new CanvasJS.Chart("caReleased", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          colorSet: "groundedColors",
          backgroundColor: this.backgroundColor,//"#B3E5FC",
          title: {
            text: this.CA_Released_Nw,// this.Central_Assistance_Released,// CA RELEASED
            verticalAlign: "center",
            dockInsidePlotArea: true,
            fontSize: 18
          },
          //  backgroundColor: "#CAE9F5",
          // axisX:{
          //   labelFontWeight: "bold",
          //  },

          data: [{
            backgroundColor: this.backgroundColor,//"#B3E5FC",
            type: "doughnut",

            //showInLegend: true,
            //toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
            toolTipContent: "<b>{name}</b>",
            //indexLabel: "{name} - #percent%",
            // indexLabel: "{name}",
            dataPoints: [
              { y: this.CASanct_forRelease - this.CA_Released, name: "Pending for Release" },
              { y: this.CA_Released, name: "CAssitance Released" },
            ]
          }]
        });
        chart.render();
      });
    });
  });
});

}
BindCAApprovedGraph(stateCode, DisttCode, cityCode, Comp, DivisionCodes) {
  //4
  this.DivisionCodes ='HFA-1';
  this.service.GetStateWiseFinYrData_Div(stateCode, DivisionCodes).subscribe(result_State => { // new code
    //this.service.GetStateWiseFinYrData(stateCode).subscribe(result_State => { // new code
    this.Demand_Overall = result_State.Demand;
    this.Houses_Grounded_State = result_State.Grounded; //
    this.Sanctioned_State = result_State.HousesSanctioned;//
    this.ZeroDemand_State = result_State.HousesSanctioned;//
    this.Demand_State = result_State.Demand;
    this.CAApproved = result_State.CAApproved;// CAC thus is subsidy  *
    this.CASanctionedforReleaseN = result_State.CASanctionedforRelease; //*
    this.CAReleased = result_State.CAReleased; //CARNew   approved
    this.UC_RecdExpenditure = result_State.Expenditure; //CARNew   approved


    this.service.HFACompWiseReportPMayList_Div(stateCode, DisttCode, cityCode, Comp, DivisionCodes).subscribe(result => {
      //this.service.HFACompWiseReportPMayList(stateCode,DisttCode,cityCode,Comp).subscribe(result => {
      if (result.CentralAssistanceCommitted != null) {
        this.CAC = result.CentralAssistanceCommitted;//.Central_Assistance_Committed ;
        this.CARNew = result.CentralAssistanceReleased;//.Central_Assistance_Released ;
        this.UC_RecdNew = result.UC_Received; // expenditure
      }
      else {
        this.CAC = 0;
        this.CARNew = 0;
        this.UC_RecdNew = 0;
      }

       // CLSS_MainMaster
      this.service.HFA_sp_CLSS_CompWise(stateCode, DisttCode, cityCode).subscribe(result1 => {
        this.CLSS_SubsidyTotal = result1.EWS_LIG_Subsidy + result1.MIG_SubsidyAmtTotal;
        //  this.TOT_CA_Approved = result.CA_Approved  +this.CLSS_SubsidyTotal;
        //    this.Total_UC_Recd  =this.UC_Recd + this.CLSS_SubsidyTotal;///100000;

        this.service.GetCLSS_Detail(stateCode, DisttCode, cityCode,Comp,DivisionCodes).subscribe(result_clss => {

        this.compArray = Comp.split(",");
        const value = this.compArray.indexOf("5");
        const value6 = this.compArray.indexOf("6");


        if ((DivisionCodes != 0 && Comp == 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0 ) || (DivisionCodes != 0 && Comp == 0 && stateCode != 0 && DisttCode == 0 && cityCode == 0 )) {
           // alert('State Table');
          this.CARNew = this.CAReleased;// + this.CLSS_SubsidyTotal;
          this.UC_RecdNew = this.UC_RecdExpenditure;// + this.CLSS_SubsidyTotal;
        }
        // else if (DivisionCodes != 0 && Comp == 0 && stateCode != 0 && DisttCode == 0 && cityCode == 0 )  {
        //   // alert('State Table');
        //    this.CARNew = this.CAReleased + this.CLSS_SubsidyTotal;
        //    this.UC_RecdNew = this.UC_RecdExpenditure  + this.CLSS_SubsidyTotal;
        //  }
        // if(Comp=='0'  || (stateCode !=0 && DisttCode ==0 && cityCode ==0) || (stateCode ==0 && DisttCode ==0 && cityCode ==0))
        else if (((Comp == 0 && value == -1) && (stateCode == 0 && DisttCode == 0 && cityCode == 0 && value == -1 && DivisionCodes != 0)) || ((stateCode != 0 && DisttCode == 0 && cityCode == 0 && value == -1 && Comp == 0 && DivisionCodes != 0))) {
            // alert('page Load');
          this.CARNew = this.CAReleased;// + this.CLSS_SubsidyTotal;
          this.UC_RecdNew = this.UC_RecdExpenditure;// + this.CLSS_SubsidyTotal;
        }
        else if (((Comp == 0 && value == -1) && (stateCode != 0 && DisttCode != 0 && cityCode == 0 && value == -1 && DivisionCodes != 0)) || ((stateCode != 0 && DisttCode != 0 && cityCode != 0 && value == -1 && Comp == 0 && DivisionCodes != 0) )) {
         //  alert('City wise');
          this.CARNew = this.CARNew   + this.CLSS_SubsidyTotal;
          this.UC_RecdNew = result.UC_Received   + this.CLSS_SubsidyTotal;
        }
        else if (((Comp == 0 && value == -1 && stateCode != 0 && DisttCode != 0 && cityCode == 0 && value == -1 && DivisionCodes != 0)) ||  (Comp == 0 && value == -1 && stateCode != 0 && DisttCode != 0 && cityCode != 0 && value == -1 && DivisionCodes != 0)) {
         // alert('City wise Div wise');
          this.CARNew = result.CentralAssistanceReleased  + <number><any>result_clss.Total_SubsidyAmt;
          this.UC_RecdNew = result.UC_Received + <number><any>result_clss.Total_SubsidyAmt;
        }
        else if ((DivisionCodes == 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (stateCode != 0 && DivisionCodes == 0 && Comp != 0  && DisttCode != 0 && cityCode != 0 ) || (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) ||  (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0) ||  (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode == 0)||  (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode != 0) ) {
          // alert('City Multiple Comp wise Rel-Utilized');
          this.boolCheck =false;
        if (value ==-1 )
        {
           //  alert(1); //&& value6==-1
            this.CARNew = result.CentralAssistanceReleased;
            this.UC_RecdNew = result.UC_Received;

             
        }
        // && value6==-1
        else if ((Comp != 0)  )
        {
             // alert('2');
             var arr=[];
             arr=Comp.split(',');
             arr.forEach(a=>{
               if(a=='5')
               {
                arr.forEach(a=>{
                  if(a=='1' || a=='2' || a=='3'|| a=='4'|| a=='5'|| a=='6')
                  {
                    this.boolCheck = true;
                  }
                })
               }
             })


             if (this.boolCheck = true)
             {
               //alert(result.CentralAssistanceReleased);
               //alert(result_clss.Total_SubsidyAmt); 
               
                  this.CARNew = <number><any>result.CentralAssistanceReleased  + <number><any>result_clss.Total_SubsidyAmt;
                  this.UC_RecdNew = <number><any>result.UC_Received + <number><any>result_clss.Total_SubsidyAmt;
                  this.boolCheck = false;

                 // alert(result.CentralAssistanceReleased);
                 // alert(result_clss.Total_SubsidyAmt);
                  
             }          
          }
        }





        else if ((Comp == '5' && value == 0) || (Comp.length == 1 && value == 0)&& (stateCode == 0 && DisttCode == 0 && cityCode == 0) ) {
          //  alert('CLSS');

          // this.CARNew = this.CLSS_SubsidyTotal ;//<number><any>result_clss.Total_SubsidyAmt;
          // this.UC_RecdNew =this.CLSS_SubsidyTotal ;// <number><any>result_clss.Total_SubsidyAmt;
          this.CARNew = <number><any>result_clss.Total_SubsidyAmt;
          this.UC_RecdNew = <number><any>result_clss.Total_SubsidyAmt;


          //{ y: this.CARNew - this.UC_RecdNew, name: "Utilization Pending" }, //45.45
          //{ y: this.UC_RecdNew, name: "UC Receieved" }, //49.39

        }
        else if ((stateCode != 0 && Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0) || (DivisionCodes != 0 && Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0)) //
        //      else if ( stateCode !=0 && (Comp.length >0 && value ==-1 && value6 ==-1  && Comp !=0) )
        {
          this.CARNew = this.CARNew;
          this.UC_RecdNew = this.UC_RecdNew;
        }
        else if ((Comp == '6' && value == -1)) {
          //  alert('6');
          this.CARNew = this.CARNew;
          this.UC_RecdNew = this.UC_RecdNew;
         // this.CARNew = this.CLSS_SubsidyTotal +this.CAReleased ;
         // this.UC_RecdNew =  this.UC_RecdExpenditure + this.CLSS_SubsidyTotal ;
        }
        else if ((Comp.length > 0 && value == -1 && value6 == -1 && Comp != 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0 && DivisionCodes==0)) {
          // alert('Comp');
          this.CARNew = this.CARNew;
          this.UC_RecdNew = this.UC_RecdNew;
          this.UC_RecdNewCh =this.UC_RecdNew;
          //alert(this.UC_RecdNew);
        }
        else if ((Comp.length > 0 && value >= 0 && value6 >= 0 && Comp == '5.6') || (Comp.length > 0 && value >= 0 && value6 >= 0 && Comp == '6.5')) {
          // alert('5-6');
          this.CARNew = this.CARNew + this.CLSS_SubsidyTotal;
          this.UC_RecdNew = this.UC_RecdNew + this.CLSS_SubsidyTotal;
        }
        else if (Comp.length == 1 && value == 0) {
          this.CARNew = this.CLSS_SubsidyTotal;
          this.UC_RecdNew = this.CLSS_SubsidyTotal;
        }
        else if (Comp.length >= 1 && value == 0) {
          this.CARNew = this.CARNew + this.CLSS_SubsidyTotal;
          this.UC_RecdNew = this.UC_RecdNew + this.CLSS_SubsidyTotal;
        }
        else if ((Comp.length > 0 && value >= 0 && value6 >= 0)) {
           //  alert('1-6');
          this.CARNew = this.CARNew + this.CLSS_SubsidyTotal;
          this.UC_RecdNew = this.UC_RecdNew + this.CLSS_SubsidyTotal;
        }
        else if ((Comp.length > 0 && value >= 0 && value6 == -1)) {
          //alert('1-5');
          this.CARNew = this.CARNew + this.CLSS_SubsidyTotal;
          this.UC_RecdNew = this.UC_RecdNew + this.CLSS_SubsidyTotal;
        }
        else if ((Comp.length > 0 && value == -1 && value6 >= 0)) {
          //alert('1-4,6');
          this.CARNew = this.CARNew;
          this.UC_RecdNew = this.UC_RecdNew;
        }
        var formatter = new Intl.NumberFormat('en-IN', {
          minimumFractionDigits: 0,
        });

        if (this.UC_RecdNew !=0 || this.UC_RecdNew !=null)
        {
        this.UC_RecdNewCh = this.UC_RecdNew;//.toFixed(2);
        //   nf.format(123456.789); // ‘$123,456.79’
        }
        else
        {
          this.UC_RecdNewCh = this.UC_RecdNew;;//.toFixed(0);
        }

        if (this.UC_RecdNewCh != 0)
          this.UC_RecdNew_Ch = formatter.format(this.UC_RecdNewCh);
        if (this.UC_RecdNewCh == 0)
          this.UC_RecdNew_Ch = "Nil";


        CanvasJS.addColorSet("groundedColors",
          [
            "#f98787",
            "#66FF33",              
            
          
            "#28a745",
            "#00FF00",
            "#fd7e14",
            "#17a2b8"
          ]);

        let chart = new CanvasJS.Chart("CAApprovedContainer", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          showInLegend: true,
 
          backgroundColor: this.backgroundColor,//"#B3E5FC",
          colorSet: "groundedColors",

          title: {
            text: this.UC_RecdNew_Ch, // Uc Recd  exce  + subsidy from clss
            verticalAlign: "center",
            dockInsidePlotArea: true,
            fontSize: 18
          },
          data: [{
            type: "doughnut",
            showInLegend: false,
            backgroundColor: this.backgroundColor,//"#B3E5FC",
            toolTipContent: "<b>{name}</b>",
            dataPoints: [
              { y: this.CARNew - this.UC_RecdNew, name: "Utilization Pending" }, //45.45
              { y: this.UC_RecdNew, name: "UC Receieved" }, //49.39

            ]
          }]
        });
        chart.render();
      });
    });
  });
  });
}


GetPsyChart(stateCode, DisttCode, cityCode, Comp, DivisionCodes) {
  this.DivisionCodes ='HFA-1';

  this.service.GetStateWiseFinYrData_Div(stateCode, DivisionCodes).subscribe(result_State => { // new code
    this.ULBShareS = result_State.ULBShare;
    this.StateShareS = result_State.StateShare;
    this.BeneficiaryShareS = result_State.BeneficiaryShare;
    this.CentralShareS = result_State.CentralShare;
    this.totalCost = result_State.totalCost;//Investment
     
    this.service.HFACompWiseReportPMayList_Div(stateCode, DisttCode, cityCode, Comp, DivisionCodes).subscribe(result => {
      this.ULBShare = (result.ULBShare);
      this.StateShare = (result.StateShare);
      this.BeneficiaryShare = (result.BeneficiaryShare);
      this.CentralShare = (result.CentralShare);
      this.CA_Approved = result.CA_Approved;
      this.Investment_in_Project = result.Investment_in_Project;
      // CLSS_MainMaster
      this.service.HFA_sp_CLSS_CompWise(stateCode, DisttCode, cityCode).subscribe(result1 => {
        this.CLSS_LoanTotal = result1.MIG_Loan_AmtTotal + result1.EWS_LIG_Loan_Amt;
        this.CLSS_SubsidyTotal = result1.EWS_LIG_Subsidy + result1.MIG_SubsidyAmtTotal;
        this.CLSS_BeneTotal = result1.EWS_LIG_Bene + result1.MIG_Loan_AmtTotal;

        this.service.GetCLSS_Detail(stateCode, DisttCode, cityCode,Comp,DivisionCodes).subscribe(result_clss => {
        this.compArray = Comp.split(",");
        const value = this.compArray.indexOf("5");
        const value6 = this.compArray.indexOf("6");

       // this.service.CLSS_Values_List(stateCode).subscribe(result_CLSSState => {
        this.service.CLSS_Values_ListNew(stateCode,DivisionCodes).subscribe(result_State => {

        //   alert('stateCode');

       if ((DivisionCodes != 0 && Comp == 0 && DisttCode == 0 && cityCode == 0 && stateCode == 0) || (stateCode != 0 && DivisionCodes != 0 && Comp == 0 && DisttCode == 0 && cityCode == 0 )|| (stateCode != 0 && DivisionCodes == 0 && Comp == 0 && DisttCode == 0 && cityCode == 0 )|| (stateCode == 0 && DivisionCodes == 0 && Comp == 0 && DisttCode == 0 && cityCode == 0 )) {
            //  alert('Page Load');

              this.ULBShareNew = this.ULBShareS;
              this.StateShareNew = this.StateShareS;
              this.BeneShareNew = this.BeneficiaryShareS;
              this.CentralShareNew = this.CentralShareS;
              this.Total_CostNw = this.totalCost;
             // alert(this.totalCost);

       }
       else  if ((DivisionCodes == 0 && Comp == 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (DivisionCodes != 0 && Comp == 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0) ) {
         //alert('Distt- city wise');
          this.Total_Subsidy =  result_clss.EWS_Subsidy	+ result_clss.LIG_Subsidy	+ result_clss.MIG1_SubsidyAmt	+ result_clss.MIG2_SubsidyAmt
           this.ULBShareNew =   this.ULBShare   ;
           this.StateShareNew = (result.StateShare ) ;
           this.BeneShareNew = (result.BeneficiaryShare +(<number><any>result_clss.Total_LoanAmt - <number><any>result_clss.Total_SubsidyAmt));
           this.CentralShareNew = <number><any>(result.CentralShare + this.Total_Subsidy);
            this.Total_CostNw = result.Investment_in_Project + <number><any>result_clss.Total_LoanAmt;
      }
      else if ((DivisionCodes != 0 && Comp == 5   && DisttCode == 0 && cityCode == 0 && stateCode != 0) ||(DivisionCodes != 0 && Comp == 5   && DisttCode == 0 && cityCode == 0 && stateCode == 0) ||(DivisionCodes != 0 && Comp == 5   && DisttCode == 0 && cityCode == 0 && stateCode == 0)  ) {
       //  alert(' CLSS Div Comp State wise Cost of Project');
              this.ULBShareNew = 0 ;
              this.StateShareNew = 0;
              this.BeneShareNew = result_State.Loan_TOTAL -result_State.Subsidy_Total;
              this.CentralShareNew =  result_State.Subsidy_Total ;
              this.Total_CostNw =  result_State.Loan_TOTAL;
     }
      else if ((DivisionCodes != 0 && Comp == 5   && DisttCode == 0 && cityCode == 0 && stateCode != 0) || (DivisionCodes != 0 && Comp == 5   && DisttCode != 0 && cityCode == 0 && stateCode != 0)|| (DivisionCodes != 0 && Comp == 5   && DisttCode != 0 && cityCode != 0 && stateCode != 0) ) {
           //alert(' CLSS Div Comp City wise Cost of Project');
            this.ULBShareNew =  0;
            this.StateShareNew = 0;
            this.BeneShareNew = ((<number><any>result_clss.Total_LoanAmt - <number><any>result_clss.Total_SubsidyAmt));
            this.CentralShareNew = <number><any>(result_clss.Total_SubsidyAmt);
             this.Total_CostNw = <number><any>(result_clss.Total_LoanAmt) ;
    }
    else if ((DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (stateCode != 0 && DivisionCodes != 0 && Comp != 0  && DisttCode != 0 && cityCode != 0 ) || (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode != 0)|| (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) ||  (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0) ||  (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode == 0)||  (DivisionCodes == 0 && Comp == 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) ||  (DivisionCodes == 0 && Comp == 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0)) {
     // alert('City Multiple Comp wise Cost of Project'); 
      this.boolCheck =false;
      // && value6==-1
      if (value ==-1 )
      {
//           alert('1-4');
            this.ULBShareNew = result.ULBShare;
            this.StateShareNew = result.StateShare;
            this.BeneShareNew = result.BeneficiaryShare;
            this.CentralShareNew = result.CentralShare;
            this.Total_CostNw = result.Investment_in_Project;
       }
      // && value6==-1
      else if ((Comp != 0)  )   
      {
      // alert('2');
       var arr=[];
       arr=Comp.split(',');
       arr.forEach(a=>{
         if(a=='5')
         {
          arr.forEach(a=>{
            if(a=='1' || a=='2' || a=='3'|| a=='4'|| a=='5'|| a=='6')
            {
              this.boolCheck = true;
            }
          })
         }
       })
       if (this.boolCheck = true)
       {
              // alert('1-4,5');
                 this.ULBShareNew = result.ULBShare + 0;
                 this.StateShareNew = result.StateShare +0;
                 this.BeneShareNew = (result.BeneficiaryShare +(<number><any>result_clss.Total_LoanAmt - <number><any>result_clss.Total_SubsidyAmt));
                 this.CentralShareNew = <number><any>(result.CentralShare + result_clss.Total_SubsidyAmt);
                  this.Total_CostNw = <number><any>(result.Investment_in_Project) + <number><any>(result_clss.Total_LoanAmt);
    
       }
      }
    }




    else  if ((DivisionCodes != 0 && Comp != 0  && Comp != 5 && Comp != 6  && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (DivisionCodes != 0 && Comp != 0 && Comp != 5 && Comp != 6  && DisttCode != 0 && cityCode != 0 && stateCode != 0) ) {
       //  alert('Distt- city wise -COMP Wise');
     // this.Total_Subsidy =   result_clss.EWS_Subsidy	+ result_clss.LIG_Subsidy	+ result_clss.MIG1_SubsidyAmt	+ result_clss.MIG2_SubsidyAmt
      // this.ULBShareNew =   this.ULBShare   ;
      // this.StateShareNew = (result.StateShare ) ;
      // this.BeneShareNew = (result.BeneficiaryShare +(<number><any>result_clss.Total_LoanAmt - <number><any>result_clss.Total_SubsidyAmt));
      // this.CentralShareNew = <number><any>(result.CentralShare + this.Total_Subsidy);
       // this.Total_CostNw = result.Investment_in_Project;
     }

     else  if ((DivisionCodes != 0 && Comp == 5    && Comp != 6  && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (DivisionCodes != 0 && Comp == 5  && Comp != 6  && DisttCode != 0 && cityCode != 0 && stateCode != 0) ) {
     // alert('Distt- city wise -CLSS Wise');
       this.Total_Subsidy =  result_clss.EWS_Subsidy	+ result_clss.LIG_Subsidy	+ result_clss.MIG1_SubsidyAmt	+ result_clss.MIG2_SubsidyAmt
       this.ULBShareNew =   0; 
       this.StateShareNew = 0; 
       this.BeneShareNew = ( (<number><any>result_clss.Total_LoanAmt - <number><any>result_clss.Total_SubsidyAmt));
       this.CentralShareNew = <number><any>( this.Total_Subsidy);
       this.Total_CostNw = <number><any>result_clss.Total_LoanAmt ;
   }







//-----------------------------------------------------------
        //else if ((Comp == '1' || Comp == '2' || Comp == '3' || Comp == '4') || (DisttCode != 0 && cityCode == 0) || (DisttCode != 0 && cityCode != 0)) {
        else if ((Comp == '1' || Comp == '2' || Comp == '3' || Comp == '4'||Comp == '1,2' ||Comp == '2,1' ||Comp == '1,2,3' ||Comp == '1,3,2'||Comp == '2,3,1'||Comp == '2,1,3'||Comp == '3,1.2'||Comp == '3,2.1' ||Comp == '1,2,3,4' ||Comp == '1,2,4,3' ||Comp == '1,4,2,3'||Comp == '1,4,3,2' ||Comp == '1,3,4,2'||Comp == '1,3,2,4' ||Comp == '4,1,3,2'||Comp == '4,1,2,3' ||Comp == '4,2,1,3' ||Comp == '4,2,3,1') && stateCode ==0 && DisttCode == 0 && cityCode == 0 ) {
         //  alert('ULBShareNew');
          this.Total_CostNw = this.Investment_in_Project;
          this.CentralShareNew = this.CentralShare;
          this.StateShareNew = result.StateShare + 0;
          this.ULBShareNew = result.ULBShare + 0;
          //  alert(this.ULBShareNew);
          this.BeneShareNew = result.BeneficiaryShare;
        }
        else if ((Comp == '1' || Comp == '2' || Comp == '3' || Comp == '4'||Comp == '1,2' ||Comp == '2,1' ||Comp == '1,2,3' ||Comp == '1,3,2'||Comp == '2,3,1'||Comp == '2,1,3'||Comp == '3,1.2'||Comp == '3,2.1' ||Comp == '1,2,3,4' ||Comp == '1,2,4,3' ||Comp == '1,4,2,3'||Comp == '1,4,3,2' ||Comp == '1,3,4,2'||Comp == '1,3,2,4' ||Comp == '4,1,3,2'||Comp == '4,1,2,3' ||Comp == '4,2,1,3' ||Comp == '4,2,3,1') && stateCode !=0 && DisttCode == 0 && cityCode == 0 ) {
         // alert('ULBShareNew1');
         this.Total_CostNw = this.Investment_in_Project;
         this.CentralShareNew = this.CentralShare;
         this.StateShareNew = result.StateShare + 0;
         this.ULBShareNew = result.ULBShare + 0;
         //  alert(this.ULBShareNew);
         this.BeneShareNew = result.BeneficiaryShare;
        }
        else if (Comp == '5') {
         // alert('5');
          this.Total_CostNw = this.CLSS_LoanTotal;
          this.CentralShareNew = this.CLSS_SubsidyTotal;
          this.StateShareNew = 0;
          this.ULBShareNew = 0;
          this.BeneShareNew = this.CLSS_LoanTotal - this.CLSS_SubsidyTotal;
        }
        else if (Comp == '6') {
          this.StateShareNew =0;
          this.ULBShareNew =0;
          this.BeneShareNew =0;
          this.CentralShareNew=0;
          this.Total_CostNw =0;
          this.Investment_in_Project=0;
          this.CLSS_LoanTotal=0;
        }
        else if ((stateCode != 0 && Comp.length > 0 && value == -1 && Comp != 0) || (DivisionCodes != 0 && Comp.length > 0 && value == -1 && Comp != 0) || (DivisionCodes != 0 && value == -1 && Comp == 0)) //
        {
          //alert('zz');
          this.Total_CostNw = this.Investment_in_Project;// + this.CLSS_LoanTotal;
          this.CentralShareNew = this.CentralShare;//+ this.CLSS_SubsidyTotal;
          this.StateShareNew = result.StateShare + 0;
          this.ULBShareNew = result.ULBShare + 0;
          this.BeneShareNew = result.BeneficiaryShare;;//+  this.CLSS_LoanTotal -this.CLSS_SubsidyTotal;

        }
        //  this.compArray=Comp.split(",");
        //  const value=this.compArray.indexOf("5");

        // alert(Comp.length);
        // alert(value);
        else if ((( Comp.length >= 1 && value == 0) ||( Comp.length >= 1 && value6 >= 0) && DivisionCodes ==0 && stateCode ==0 && DisttCode == 0 && cityCode == 0 )) {
         // alert('comp1');
          this.Total_CostNw = this.Investment_in_Project + this.CLSS_LoanTotal;
          this.CentralShareNew = this.CentralShare + this.CLSS_SubsidyTotal;
          this.StateShareNew = result.StateShare + 0;
          this.ULBShareNew = result.ULBShare + 0;
          this.BeneShareNew = result.BeneficiaryShare + this.CLSS_LoanTotal - this.CLSS_SubsidyTotal;
        }
        else if ((( Comp.length >= 1 && value == 0) ||( Comp.length >= 1 && value6 >= 0) && DivisionCodes ==0 && stateCode !=0 && DisttCode == 0 && cityCode == 0 )) {
         // alert('comp1');
          this.Total_CostNw = this.Investment_in_Project + this.CLSS_LoanTotal;
          this.CentralShareNew = this.CentralShare + this.CLSS_SubsidyTotal;
          this.StateShareNew = result.StateShare + 0;
          this.ULBShareNew = result.ULBShare + 0;
          this.BeneShareNew = result.BeneficiaryShare + this.CLSS_LoanTotal - this.CLSS_SubsidyTotal;
        }

       else if ((( Comp.length >= 1 && value == 0) ||( Comp.length >= 1 && value6 >= 0) && ((Comp == '1' || Comp == '2' || Comp == '3' || Comp == '4'||Comp == '1,2' ||Comp == '2,1' ||Comp == '1,2,3' ||Comp == '1,3,2'||Comp == '2,3,1'||Comp == '2,1,3'||Comp == '3,1.2'||Comp == '3,2.1' ||Comp == '1,2,3,4' ||Comp == '1,2,4,3' ||Comp == '1,4,2,3'||Comp == '1,4,3,2' ||Comp == '1,3,4,2'||Comp == '1,3,2,4' ||Comp == '4,1,3,2'||Comp == '4,1,2,3' ||Comp == '4,2,1,3' ||Comp == '4,2,3,1') && DivisionCodes ==0 && stateCode ==0 && DisttCode == 0 && cityCode == 0 ))) {
         // alert('comp1');
          this.Total_CostNw = this.Investment_in_Project + this.CLSS_LoanTotal;
          this.CentralShareNew = this.CentralShare + this.CLSS_SubsidyTotal;
          this.StateShareNew = result.StateShare + 0;
          this.ULBShareNew = result.ULBShare + 0;
          this.BeneShareNew = result.BeneficiaryShare + this.CLSS_LoanTotal - this.CLSS_SubsidyTotal;
        }
        else if ((( Comp.length >= 1 && value == 0) ||( Comp.length >= 1 && value6 >= 0) && ((Comp == '1' || Comp == '2' || Comp == '3' || Comp == '4'||Comp == '1,2' ||Comp == '2,1' ||Comp == '1,2,3' ||Comp == '1,3,2'||Comp == '2,3,1'||Comp == '2,1,3'||Comp == '3,1.2'||Comp == '3,2.1' ||Comp == '1,2,3,4' ||Comp == '1,2,4,3' ||Comp == '1,4,2,3'||Comp == '1,4,3,2' ||Comp == '1,3,4,2'||Comp == '1,3,2,4' ||Comp == '4,1,3,2'||Comp == '4,1,2,3' ||Comp == '4,2,1,3' ||Comp == '4,2,3,1') && DivisionCodes ==0 && stateCode !=0 && DisttCode == 0 && cityCode == 0 ))) {
         // alert('comp2');
          this.Total_CostNw = this.Investment_in_Project + this.CLSS_LoanTotal;
          this.CentralShareNew = this.CentralShare + this.CLSS_SubsidyTotal;
          this.StateShareNew = result.StateShare + 0;
          this.ULBShareNew = result.ULBShare + 0;
          this.BeneShareNew = result.BeneficiaryShare + this.CLSS_LoanTotal - this.CLSS_SubsidyTotal;
        }

        else if ((( Comp.length >= 1 && value == 0) ||( Comp.length >= 1 && value6 >= 0) && DivisionCodes !=0 && stateCode ==0 && DisttCode == 0 && cityCode == 0 )) {
         // alert('comp5');
          this.Total_CostNw = this.Investment_in_Project + this.CLSS_LoanTotal;
          this.CentralShareNew = this.CentralShare + this.CLSS_SubsidyTotal;
          this.StateShareNew = result.StateShare + 0;
          this.ULBShareNew = result.ULBShare + 0;
          this.BeneShareNew = result.BeneficiaryShare + this.CLSS_LoanTotal - this.CLSS_SubsidyTotal;
        }
        else if ((( Comp.length >= 1 && value == 0) ||( Comp.length >= 1 && value6 >= 0) && DivisionCodes !=0 && stateCode !=0 && DisttCode == 0 && cityCode == 0 )) {
          //alert('comp1');
          this.Total_CostNw = this.Investment_in_Project + this.CLSS_LoanTotal;
          this.CentralShareNew = this.CentralShare + this.CLSS_SubsidyTotal;
          this.StateShareNew = result.StateShare + 0;
          this.ULBShareNew = result.ULBShare + 0;
          this.BeneShareNew = result.BeneficiaryShare + this.CLSS_LoanTotal - this.CLSS_SubsidyTotal;
        }

        else if ((( Comp.length >= 1 && value == 0) ||( Comp.length >= 1 && value6 >= 0) && ((Comp == '1' || Comp == '2' || Comp == '3' || Comp == '4'||Comp == '1,2' ||Comp == '2,1' ||Comp == '1,2,3' ||Comp == '1,3,2'||Comp == '2,3,1'||Comp == '2,1,3'||Comp == '3,1.2'||Comp == '3,2.1' ||Comp == '1,2,3,4' ||Comp == '1,2,4,3' ||Comp == '1,4,2,3'||Comp == '1,4,3,2' ||Comp == '1,3,4,2'||Comp == '1,3,2,4' ||Comp == '4,1,3,2'||Comp == '4,1,2,3' ||Comp == '4,2,1,3' ||Comp == '4,2,3,1') && DivisionCodes !=0 && stateCode ==0 && DisttCode == 0 && cityCode == 0 ))) {
          //alert('comp1');
          this.Total_CostNw = this.Investment_in_Project + this.CLSS_LoanTotal;
          this.CentralShareNew = this.CentralShare + this.CLSS_SubsidyTotal;
          this.StateShareNew = result.StateShare + 0;
          this.ULBShareNew = result.ULBShare + 0;
          this.BeneShareNew = result.BeneficiaryShare + this.CLSS_LoanTotal - this.CLSS_SubsidyTotal;
        }
        else if ((( Comp.length >= 1 && value == 0) ||( Comp.length >= 1 && value6 >= 0) && ((Comp == '1' || Comp == '2' || Comp == '3' || Comp == '4'||Comp == '1,2' ||Comp == '2,1' ||Comp == '1,2,3' ||Comp == '1,3,2'||Comp == '2,3,1'||Comp == '2,1,3'||Comp == '3,1.2'||Comp == '3,2.1' ||Comp == '1,2,3,4' ||Comp == '1,2,4,3' ||Comp == '1,4,2,3'||Comp == '1,4,3,2' ||Comp == '1,3,4,2'||Comp == '1,3,2,4' ||Comp == '4,1,3,2'||Comp == '4,1,2,3' ||Comp == '4,2,1,3' ||Comp == '4,2,3,1') && DivisionCodes !=0 && stateCode !=0 && DisttCode == 0 && cityCode == 0 ))) {
          //alert('comp2');
          this.Total_CostNw = this.Investment_in_Project + this.CLSS_LoanTotal;
          this.CentralShareNew = this.CentralShare + this.CLSS_SubsidyTotal;
          this.StateShareNew = result.StateShare + 0;
          this.ULBShareNew = result.ULBShare + 0;
          this.BeneShareNew = result.BeneficiaryShare + this.CLSS_LoanTotal - this.CLSS_SubsidyTotal;
        }
        else if ((( Comp.length >= 1 && value == 0) ||( Comp.length >= 1 && value6 >= 0) && ((Comp == '1' || Comp == '2' || Comp == '3' || Comp == '4'||Comp == '1,2' ||Comp == '2,1' ||Comp == '1,2,3' ||Comp == '1,3,2'||Comp == '2,3,1'||Comp == '2,1,3'||Comp == '3,1.2'||Comp == '3,2.1' ||Comp == '1,2,3,4' ||Comp == '1,2,4,3' ||Comp == '1,4,2,3'||Comp == '1,4,3,2' ||Comp == '1,3,4,2'||Comp == '1,3,2,4' ||Comp == '4,1,3,2'||Comp == '4,1,2,3' ||Comp == '4,2,1,3' ||Comp == '4,2,3,1') && DivisionCodes !=0 && stateCode !=0 && DisttCode != 0 && cityCode == 0 ))) {
          //alert('comp2');
          this.Total_CostNw = this.Investment_in_Project + this.CLSS_LoanTotal;
          this.CentralShareNew = this.CentralShare + this.CLSS_SubsidyTotal;
          this.StateShareNew = result.StateShare + 0;
          this.ULBShareNew = result.ULBShare + 0;
          this.BeneShareNew = result.BeneficiaryShare + this.CLSS_LoanTotal - this.CLSS_SubsidyTotal;
        }
        else if ((( Comp.length >= 1 && value == 0) ||( Comp.length >= 1 && value6 >= 0) && ((Comp == '1' || Comp == '2' || Comp == '3' || Comp == '4'||Comp == '1,2' ||Comp == '2,1' ||Comp == '1,2,3' ||Comp == '1,3,2'||Comp == '2,3,1'||Comp == '2,1,3'||Comp == '3,1.2'||Comp == '3,2.1' ||Comp == '1,2,3,4' ||Comp == '1,2,4,3' ||Comp == '1,4,2,3'||Comp == '1,4,3,2' ||Comp == '1,3,4,2'||Comp == '1,3,2,4' ||Comp == '4,1,3,2'||Comp == '4,1,2,3' ||Comp == '4,2,1,3' ||Comp == '4,2,3,1') && DivisionCodes !=0 && stateCode !=0 && DisttCode != 0 && cityCode != 0 ))) {
         // alert('comp2');
          this.Total_CostNw = this.Investment_in_Project + this.CLSS_LoanTotal;
          this.CentralShareNew = this.CentralShare + this.CLSS_SubsidyTotal;
          this.StateShareNew = result.StateShare + 0;
          this.ULBShareNew = result.ULBShare + 0;
          this.BeneShareNew = result.BeneficiaryShare + this.CLSS_LoanTotal - this.CLSS_SubsidyTotal;
        }


        // alert(this.StateShareNew);
        // this.StateShareNew =indianFormat1(this.StateShareNew);
        this.Total_CostNw = indianFormat(this.Total_CostNw);

        let chart = new CanvasJS.Chart("chartContainer1", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // backgroundColor: "#B3E5FC",
          backgroundColor: this.backgroundColor,
          labelFontWeight: "25px",
          labelFontSize: "25px",
          // toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
          colorSet: "customColorSet1",
          data: [{
            type: "pie",
            cursor: "pointer",
            //colorSet:
            startAngle: 25,
            //  backgroundColor: "#0074D9",
            backgroundColor: this.backgroundColor,
            labelFontWeight: "28px",
            indexLabelFontSize: 10,
            showInLegend: false,
            toolTipContent: "{name}: {y}",
            indexLabelWrap: true,
            indexLabel: "{name}: {y}",
            fontSize: "25px",
            //.toFixed(2) ..toFixed(2).toFixed(2).toFixed(2)
            dataPoints: [
              { y:  ( this.StateShareNew.toFixed(2) ), name: "SS", color: "#007bff", link: "http://google.com/" },
              { y:  (this.ULBShareNew.toFixed(2)), name: "US", color: "#FFFF00", link: "http:/yahoo.com/" },
              { y:  (this.BeneShareNew.toFixed(2)), name: "BS", color: "#dc3545", link: "http://gmail.com/" },
              { y:  (this.CentralShareNew.toFixed(2)), name: "Central Share", color: "#66FF33", link: "http://google.com/" }
            ]  
          }]
        });
        //---------------------------------------------------------  <!--28a745-->
        //http://jsfiddle.net/canvasjs/qK3Se/
        // chart.options.data[0].click = function(e){
        //   this.modalService.open(this.editModal);
        //   var dataSeries = e.dataSeries;
        //   var dataPoint = e.dataPoint;
        //   var dataPointIndex = e.dataPointIndex;
        //   if(!dataPoint.exploded)

        //   for(var i = 0; i < dataSeries.dataPoints.length; i++){
        //           if(i === dataPointIndex){
        //               continue;
        //      }
        //      dataSeries.dataPoints[i].exploded = false;
        //   }
        // };
        //---------------------------------------------------------
        chart.render();
      })
    })
  })
})
})
}
BindColumnGraph(stateCode, DisttCode, cityCode) {
  //CompBar
  //      this.service.CompBar(stateCode,DisttCode,cityCode).subscribe(result:FinDetails => {
  //     //  result.forEach((key)=>{
  //     //  this.firstGraph.push({'label':key.CAI});

  //      for(let res in result)
  //      {
  //       this.firstGraph.push(res)
  //      }





  //  let chart = new CanvasJS.Chart("chartContainer_", {
  //       theme: "light2",
  //      animationEnabled: true,
  //      exportEnabled: false,
  //      title: {
  //        text: "Financial Progress(Lakhs)"
  //      },
  //      backgroundColor: "#CAE9F5",
  //      colorSet: "greenShades",
  //      axisY:{
  //        labelFontSize: 12
  //      },
  //      axisX:{
  //        labelFontSize: 12
  //      },
  //      data: [{
  //        backgroundColor: "#CAE9F5",
  //        type: "column",
  //        indexLabel: "{y}",
  //       // indexLabelPlacement: "outside",
  //       // indexLabelOrientation: "horizontal",

  //       dataPoints:key
  //      },
  //      {
  //        type: "column",
  //       // name: "Oil Production (million/day)",
  //       // legendText: "Oil Production",
  //        axisYType: "secondary",
  //       // showInLegend: true,
  //        dataPoints:key
  //      }
  //       ]

  //    //}]
  //  });
  //    chart.render();
  //   });
  // });

}
//3rd row
BindColumnGraphHouses1(stateCode, DisttCode, cityCode, Comp, DivisionCodes) {
  this.service.GetStateWiseFinYrData_Div(stateCode, DivisionCodes).subscribe(resultS => { // new code
    this.HS_15_16S = resultS.HS15_16;
    this.HS_16_17S = resultS.HS_16_17;
    this.HS_17_18S = resultS.HS17_18;
    this.HS_18_19S = resultS.HS18_19;
    this.HS_19_20S = resultS.HS19_20; //



    this.HC_15_16S = resultS.HC_15_16;
    this.HC_16_17S = resultS.HC_16_17;
    this.HC_17_18S = resultS.HC_17_18;
    this.HC_18_19S = resultS.HC_18_19;
    this.HC_19_20S = resultS.HC_19_20; //


    this.HO_14_15S = resultS.HO_14_15;

    this.HO_15_16S = resultS.HO_15_16;
    this.HO_16_17S = resultS.HO_16_17;
    this.HO_17_18S = resultS.HO_17_18;
    this.HO_18_19S = resultS.HO_18_19;
    this.HO_19_20S = resultS.HO_19_20; //


    // this.service.HFACompWiseReportPMayList_Div(stateCode,DisttCode,cityCode,Comp,DivisionCodes).subscribe(result => {
    this.service.FIN_Data1415(stateCode, DisttCode, cityCode, Comp).subscribe(result => {
      //  this.service.FIN_PHY_Houses1415(stateCode,DisttCode,cityCode).subscribe(result => {
      this.HS_14_15 = result.HS_14_15;
      this.HC_14_15 = result.HC_14_15;
      this.HO_14_15 = result.HO_14_15;
      this.HG_14_15 = result.HG_14_15;

      // alert(result.HS_14_15);

      this.service.FIN_Data1516(stateCode, DisttCode, cityCode, Comp).subscribe(result1 => {
        //  this.service.FIN_PHY_Houses1516(stateCode,DisttCode,cityCode).subscribe(result1 => {
        this.HS_15_16 = result1.HS_15_16;
        this.HC_15_16 = result1.HC_15_16;
        this.HO_15_16 = result1.HO_15_16;
        this.HG_15_16 = result.HG_15_16;
          //alert(result1.HS_15_16);

        this.service.FIN_Data1617(stateCode, DisttCode, cityCode, Comp).subscribe(result2 => {
          // this.service.FIN_PHY_Houses1617(stateCode,DisttCode,cityCode).subscribe(result2 => {
          this.HS_16_17 = result2.HS_16_17;
          this.HC_16_17 = result2.HC_16_17;
          this.HO_16_17 = result2.HO_16_17;
          this.HG_16_17 = result.HG_16_17;

          this.service.FIN_Data1718(stateCode, DisttCode, cityCode, Comp).subscribe(result3 => {
            //this.service.FIN_PHY_Houses1718(stateCode,DisttCode,cityCode).subscribe(result3 => {
            this.HS_17_18 = result3.HS_17_18;
            this.HC_17_18 = result3.HC_17_18;
            this.HO_17_18 = result3.HO_17_18;
            this.HG_17_18 = result3.HG_17_18;

            this.service.FIN_Data1819(stateCode, DisttCode, cityCode, Comp).subscribe(result4 => {
              //this.service.FIN_PHY_Houses1819(stateCode,DisttCode,cityCode).subscribe(result4 => {
              this.HS_18_19 = result4.HS_18_19;
              this.HC_18_19 = result4.HC_18_19;
              this.HO_18_19 = result4.HO_18_19;
              this.HG_18_19 = result4.HG_18_19;

              
              this.service.FIN_Data1920(stateCode, DisttCode, cityCode, Comp).subscribe(result5 => {
                //this.service.FIN_PHY_Houses1819(stateCode,DisttCode,cityCode).subscribe(result4 => {
                this.HS_19_20 = <number><any>result5.HS_19_20;
                this.HC_19_20 = <number><any>result5.HC_19_20;
                this.HO_19_20 = <number><any>result5.HO_19_20;
                this.HG_19_20 = <number><any>result5.HG_19_20;
  

              this.compArray = Comp.split(",");
              const value = this.compArray.indexOf("5");

              if ((Comp==0 && value ==-1 && DivisionCodes == 0 && stateCode ==0 && DisttCode ==0 && cityCode ==0 && value ==-1) || (Comp==0 && value ==-1 && DivisionCodes == 0 && stateCode !=0 && DisttCode ==0 && cityCode ==0 && value ==-1) || (Comp==0 && value ==-1 && DivisionCodes != 0 && stateCode ==0 && DisttCode ==0 && cityCode ==0 && value ==-1) || (Comp==0 && value ==-1 && DivisionCodes != 0 && stateCode !=0 && DisttCode ==0 && cityCode ==0 && value ==-1))
              {
                 //alert('Page load');
                this.HG_14_15 =  "0";
                this.HS_14_15 ="0" ;
                if (resultS.HC_14_15 ==null || resultS.HC_14_15 ==0)
                {
                this.HC_14_15 = 0;
                }
                else
                {
                  this.HC_14_15 = resultS.HC_14_15;
                }

                if (resultS.HC_14_15 ==null || resultS.HC_14_15 ==0)
                {
                    this.HO_14_15 = 0;
                }
                else
                {
                  this.HO_14_15 = <number><any>resultS.HO_14_15;
                }
                this.HS_15_16 = this.HS_15_16S ;
                this.HS_16_17 = resultS.HS_16_17;
                this.HS_17_18 = resultS.HS17_18;
                this.HS_18_19 = resultS.HS18_19;
                this.HS_19_20 = resultS.HS19_20; 

                this.HC_15_16 = resultS.HC_15_16;
                this.HC_16_17 = resultS.HC_16_17;
                this.HC_17_18 = resultS.HC_17_18;
                this.HC_18_19 = resultS.HC_18_19;
                this.HC_19_20 = resultS.HC_19_20;
                 

                this.HO_15_16 = resultS.HO_15_16;
                this.HO_16_17 = resultS.HO_16_17;
                this.HO_17_18 = resultS.HO_17_18;
                this.HO_18_19 = resultS.HO_18_19;
                this.HO_19_20 = resultS.HO_19_20;
              }
              else if ((DivisionCodes != 0 && Comp == 0 &&  stateCode ==0 && DisttCode ==0 && cityCode ==0 ) ||(DivisionCodes != 0 && Comp == 0 &&  stateCode !=0 && DisttCode ==0 && cityCode ==0 ))
              // if (((Comp==0 && value ==-1)  && (stateCode ==0 && DisttCode ==0 && cityCode ==0 && value ==-1))   )
              {
              //  alert('Div New');

                this.HG_14_15 =  "0";
                this.HS_14_15 ="0" ;
                if (resultS.HC_14_15 ==null || resultS.HC_14_15 ==0)
                {
                this.HC_14_15 = 0;
                }
                else
                {
                  this.HC_14_15 = resultS.HC_14_15;
                }

                if (resultS.HO_14_15 ==null || resultS.HO_14_15 ==0)
                {
                    this.HO_14_15 = 0;
                }
                else
                {
                  this.HO_14_15 = <number><any>resultS.HO_14_15;
                }
                // this.HG_14_15 =  "0";
                // this.HS_14_15 ="0" ;
                // this.HC_14_15 = resultS.HC_14_15;
                // this.HO_14_15 = <number><any>resultS.HO_14_15;

               // alert(this.HS_15_16S);
                if (this.HS_15_16S ==null || this.HS_15_16S ==0)
                {
                  this.HS_15_16 = 0;
                }
                else
                {
                    this.HS_15_16 = this.HS_15_16S;//.toString();
                }

                if (this.HC_15_16S ==null || this.HC_15_16S ==0)
                {
                  this.HC_15_16 = 0;
                }
                else
                {
                  this.HC_15_16 = this.HC_15_16S;//.toString();
                }

                if (this.HO_15_16S ==null || this.HO_15_16S ==0)
                {
                  this.HO_15_16 = 0;
                }
                else
                {
                  this.HO_15_16 = this.HO_15_16S;//.toString();
                }

                // if (this.HO_15_16S ==null || this.HO_18_19S ==0)
                // {
                //   this.HO_18_19 = 0;
                // }
                // else
                // {
                //   this.HO_18_19 = this.HO_18_19S;//.toString();
                // }




                //this.HG_15_16 = "0" ;

                this.HS_16_17 = this.HS_16_17S;//.toString();
                this.HC_16_17 = this.HC_16_17S;//.toString();
                this.HO_16_17 = this.HO_16_17S;//.toString();
                this.HO_18_19 = this.HO_18_19S;//.toString();

                //this.HG_16_17 = "0";

                this.HS_17_18 = this.HS_17_18S;//.toString();
                this.HC_17_18 = this.HC_17_18S;//.toString();
                this.HO_17_18 = this.HO_17_18S;//.toString();
                this.HO_18_19 = this.HO_18_19S;//.toString();

                //this.HG_17_18 = "0";

                //alert(this.HS_15_16);

              }
              else if (Comp !=5 && Comp !=6 &&  DivisionCodes == 0 && Comp >= 0 &&  stateCode ==0 && DisttCode ==0 && cityCode ==0 )
              // if (((Comp==0 && value ==-1)  && (stateCode ==0 && DisttCode ==0 && cityCode ==0 && value ==-1))   )
              {
              //  alert('Comp');
                this.HS_14_15 = result.HS_14_15;
                this.HC_14_15 = result.HC_14_15;
                this.HO_14_15 = result.HO_14_15;
                this.HG_14_15 = result.HG_14_15;

                this.HS_15_16 = result1.HS_15_16;
                this.HC_15_16 = result1.HC_15_16;
                this.HO_15_16 = result1.HO_15_16;
                this.HG_15_16 = result.HG_15_16;

                this.HS_16_17 = result2.HS_16_17;
                this.HC_16_17 = result2.HC_16_17;
                this.HO_16_17 = result2.HO_16_17;
                this.HG_16_17 = result.HG_16_17;

                  //this.service.FIN_PHY_Houses1718(stateCode,DisttCode,cityCode).subscribe(result3 => {
                  this.HS_17_18 = result3.HS_17_18;
                  this.HC_17_18 = result3.HC_17_18;
                  this.HO_17_18 = result3.HO_17_18;
                  this.HG_17_18 = result3.HG_17_18;

                    //this.service.FIN_PHY_Houses1819(stateCode,DisttCode,cityCode).subscribe(result4 => {
                    this.HS_18_19 = result4.HS_18_19;
                    this.HC_18_19 = result4.HC_18_19;
                    this.HO_18_19 = result4.HO_18_19;
                    this.HG_18_19 = result4.HG_18_19;

                    this.HS_19_20 = <number><any>result5.HS_19_20;
                    this.HC_19_20 = <number><any>result5.HC_19_20;
                    this.HO_19_20 = <number><any>result5.HO_19_20;
                    this.HG_19_20 = <number><any>result5.HG_19_20;
              }
              else if ((Comp ==5 || Comp ==6 )&&  DivisionCodes == 0  &&  stateCode ==0 && DisttCode ==0 && cityCode ==0 )
              {
                    this.HS_14_15 = "0";
                    this.HC_14_15 = "0";
                    this.HO_14_15 = "0";
                    this.HG_14_15 = "0";

                    this.HS_15_16 = "0";
                    this.HC_15_16 = "0";
                    this.HO_15_16 = "0";
                    this.HG_15_16 = "0";

                    this.HS_16_17 = "0";
                    this.HC_16_17 = "0";
                    this.HO_16_17 = "0";
                    this.HG_16_17 = "0";

                    this.HS_17_18 = "0";
                    this.HC_17_18 = "0";
                    this.HO_17_18 = "0";
                    this.HG_17_18 = "0";

                    this.HS_18_19 = "0";
                    this.HC_18_19 = "0";
                    this.HO_18_19 = "0";
                    this.HG_18_19 = "0";

                    this.HS_19_20 = 0;
                    this.HC_19_20 = 0;
                    this.HO_19_20 = 0;
                    this.HG_19_20 = 0;
              }

              //this.HO_18_19 =indianFormat(this.HO_18_19);

              let chart = new CanvasJS.Chart("YtWiseHouses", {
                theme: "light2",

                animationEnabled: true,
                exportEnabled: false,
                title: {
                  text: "(Physical Progress(Lakhs) "
                },
                backgroundColor: "#B3E5FC",
                colorSet: "greenShades",

                data: [{
                  backgroundColor: "#B3E5FC",
                  bevelEnabled: true,
                  //     indexLabelPlacement:"auto",
                  indexLabelOrientation: "vertical",
                  type: "column",
                  showInLegend: true,
                  legendText: "Sanctioned",
                  indexLabel: "{y}", // HS
                  stValue: "HS",
                  indexLabelFontSize: 14,
                  fontSize: "35",
                  dataPoints: [
                    { label: "14-15", y: this.HS_14_15 },
                    { label: "15-16", y: this.HS_15_16 },
                    { label: "16-17", y: this.HS_16_17 },
                    { label: "17-18", y: this.HS_17_18 },
                    { label: "18-19", y: this.HS_18_19 },  
                    { label: "19-20", y: this.HS_19_20 }
                  ]
                },
                {
                  type: "column",
                  dockInsidePlotArea: true,
                  indexLabel: "{y} ", //HG
                  bevelEnabled: true,
                  showInLegend: true,
                  legendText: "Grounded",


                  stValue: "HG",
                  indexLabelFontSize: 14,
                  indexLabelOrientation: "vertical",
                  dataPoints: [
                    { label: "14-15", y: this.HG_14_15 },
                    { label: "15-16", y: this.HG_15_16 },
                    { label: "16-17", y: this.HG_16_17 },
                    { label: "17-18", y: this.HG_17_18 },
                    { label: "18-19", y: this.HG_18_19 },
                    { label: "19-20", y: this.HG_19_20 }
                  ]
                }
                  ,
                {
                  type: "column",
                  dockInsidePlotArea: true,
                  indexLabel: "{y} ", //HC
                  stValue: "HC",
                  showInLegend: true,
                  legendText: "Completed",
                  bevelEnabled: true,
                  indexLabelFontSize: 14,
                  indexLabelOrientation: "vertical",
                  dataPoints: [
                    { label: "14-15", y: (this.HC_14_15) },
                    { label: "15-16", y: this.HC_15_16 },
                    { label: "16-17", y: this.HC_16_17 },
                    { label: "17-18", y: this.HC_17_18 },
                    { label: "18-19", y: this.HC_18_19 },
                    { label: "19-20", y: this.HC_19_20 }
                  ]
                }
                  ,
                {
                  type: "column",
                  //  dockInsidePlotArea:true,
                  indexLabel: "{y} ", //HO
                  stValue: "HO",
                  showInLegend: true,
                  legendText: "Occupied",
                  indexLabelFontSize: 14,
                  indexLabelOrientation: "vertical",
                  dataPoints: [
                    { label: "14-15", y: this.HO_14_15 },
                    { label: "15-16", y: this.HO_15_16 },
                    { label: "16-17", y: this.HO_16_17 },
                    { label: "17-18", y: this.HO_17_18 },
                    { label: "18-19", y: this.HO_18_19 },
                    { label: "19-20", y: this.HO_19_20 }
                  ]
                }],
                options: {
                  legend: {
                    display: true,
                    labels: {
                      fontColor: 'rgb(255, 99, 132)'
                    }
                  }
                }
              });
              chart.render();
            })
          })
        })
      })
    })
  })
})
}

BindColumnGraphFinancialData(stateCode, DisttCode, cityCode, Comp, DivisionCodes) {

  this.service.GetStateWiseFinYrData_Div(stateCode, DivisionCodes).subscribe(result => { // new code
    this.CumSanctioned = result.CumSanctioned;
    this.CASanctioned_15_16 = result.CASanctioned_15_16;
    this.CASanctioned_16_17 = result.CASanctioned_16_17;
    this.CASanctioned_17_18 = result.CASanctioned_17_18;
    this.CASanctioned_18_19 = result.CASanctioned_18_19;
    this.CASanctioned_19_20 = result.CASanctioned_19_20;
    

    this.CumuCAReleased = result.CumuCAReleased;
    this.CumuCA_Released_15_16 = result.CumuCA_Released_15_16;
    this.CumuCA_Released_16_17 = result.CumuCA_Released_16_17;
    this.CumuCA_Released_17_18 = result.CumuCA_Released_17_18;
    this.CumuCA_Released_18_19 = result.CumuCA_Released_18_19;
    this.CumuCA_Released_19_20 = result.CumuCA_Released_18_19;


     this.service.FIN_Prog1415(stateCode, DisttCode, cityCode, Comp).subscribe(result0 => {
      this.CAI1 = result0.CAI / 1;
      this.CAR1 = result0.CAR / 1;

      this.service.FIN_Prog1516(stateCode, DisttCode, cityCode, Comp).subscribe(result1 => {
        this.CAI151 = result1.CAI / 1;
        this.CAR151 = result1.CAR / 1;

        this.service.FIN_Prog1617(stateCode, DisttCode, cityCode, Comp).subscribe(result2 => {
          this.CAI161 = result2.CAI / 1;
          this.CAR161 = result2.CAR / 1;

          this.service.FIN_Prog1718(stateCode, DisttCode, cityCode, Comp).subscribe(result3 => {
            this.CAI171 = result3.CAI / 1;
            this.CAR171 = result3.CAR / 1;

            this.service.FIN_Prog1819(stateCode, DisttCode, cityCode, Comp).subscribe(result4 => {
              this.CAI181 = result4.CAI / 1;
              this.CAR181 = result4.CAR / 1;

              this.service.FIN_Prog1920(stateCode, DisttCode, cityCode, Comp).subscribe(result5 => {
                this.CAI191 = result5.CAI / 1;
                this.CAR191 = result5.CAR / 1;

                
              this.compArray = Comp.split(",");
              const value = this.compArray.indexOf("5");

              if ((DivisionCodes != 0 && Comp == 0 && stateCode ==0 && DisttCode ==0 && cityCode ==0) || (DivisionCodes == 0 && Comp == 0 && stateCode !=0 && DisttCode ==0 && cityCode ==0) || (DivisionCodes != 0 && Comp == 0 && stateCode !=0 && DisttCode ==0 && cityCode ==0)|| (DivisionCodes == 0 && Comp == 0 && stateCode ==0 && DisttCode ==0 && cityCode ==0))
              {
                this.CAI = this.CASanctioned_15_16;
                this.CAR = this.CumuCA_Released_15_16;

                this.CAI15 = this.CASanctioned_15_16;
                this.CAR15 = this.CumuCA_Released_15_16;

                this.CAI16 = this.CASanctioned_16_17;
                this.CAR16 = this.CumuCA_Released_16_17;

                this.CAI17 = this.CASanctioned_17_18;
                this.CAR17 = this.CumuCA_Released_17_18;

                this.CAI18 = this.CASanctioned_18_19;
                this.CAR18 = this.CumuCA_Released_18_19;

                this.CAI19 = this.CASanctioned_19_20;
                this.CAR19 = this.CumuCA_Released_19_20;
              }
              if ((DivisionCodes != 0 && Comp == 0 && stateCode !=0 && DisttCode !=0 && cityCode ==0) || (DivisionCodes == 0 && Comp == 0 && stateCode !=0 && DisttCode !=0 && cityCode !=0) || (DivisionCodes != 0 && Comp > 0 && stateCode !=0 && DisttCode ==0 && cityCode ==0))
              {
                this.CAI = this.CAI1;
                this.CAR = this.CAR1;

                this.CAI15 = this.CAI151;
                this.CAR15 = this.CAR151;

                this.CAI16 = this.CAI161;
                this.CAR16 = this.CAR161;

                this.CAI17 = this.CAI171;
                this.CAR17 = this.CAR171;

                this.CAI18 = this.CAI181;
                this.CAR18 = this.CAR181;

                this.CAI19 = this.CAI191;
                this.CAR19 = this.CAR191;
              }

              let chart = new CanvasJS.Chart("chartContainer2", {
                theme: "light2",
                animationEnabled: true,
                exportEnabled: false,
                title: {
                  text: "Financial Progress(Lakhs) (CA ,CAR)"

                },
                backgroundColor: "#B3E5FC",
                colorSet: "greenShades",

                data: [{
                  backgroundColor: "#B3E5FC",
                  type: "column",
                  indexLabelFontSize: 14,
                  indexLabel: "{y}",
                  showInLegend: true,
                  legendText: "CA Involved",

                  name: "Central assist Involved",
                  indexLabelPlacement: "outside",
                  indexLabelOrientation: "vertical",

                  dataPoints: [
                    { label: "14-15", y: this.CAI },//CA_Committed },
                    { label: "15-16", y: this.CAI15 },
                    { label: "16-17", y: this.CAI16 },
                    { label: "17-18", y: this.CAI17 },
                    { label: "18-19", y: this.CAI18 },
                    { label: "19-20", y: this.CAI19 }
                  ]
                },
                {
                  type: "column",
                  indexLabel: "{y}",
                  name: "Central assist Rel",
                  // legendText: "Oil Production",
                  showInLegend: true,
                  legendText: "CA Released",

                  indexLabelPlacement: "outside",
                  indexLabelFontSize: 14,
                  // axisYType: "secondary",
                  // indexLabelPlacement: "outside",

                  indexLabelOrientation: "vertical",

                  // showInLegend: true,
                  dataPoints: [
                    { label: "14-15", y: this.CAR },
                    { label: "15-16", y: this.CAR15 },
                    { label: "16-17", y: this.CAR16 },
                    { label: "17-18", y: this.CAR17 },
                    { label: "18-19", y: this.CAR18 },
                    { label: "19-20", y: this.CAR19 }
                  ]
                }
                ]
              });
              chart.render();
            })
          })
        })
      })
    })
  })
})
}


BindClssSubsiGraph(stateCode, DisttCode, cityCode, Comp,DivisionCodes ) {
  // STATE WISE MASTER TABLE
  this.DivisionCodes ='HFA-1';
  //CLSS_MASTER
  this.service.CLSS_Values_ListNew(stateCode,DivisionCodes).subscribe(result_State => {

  //CLSS_MASTER
  this.service.CLSS_Values_List(stateCode).subscribe(result4 => {
    this.No_Bene_EWS_LIG = result4.No_Bene_EWS_LIG;
    this.No_Beneficiary_MIG = result4.No_Beneficiary_MIG;
    this.NoBeneficiary_Total = result4.NoBeneficiary_Total;
    this.Subsidy_EWS_LIG = result4.Subsidy_EWS_LIG;
    this.Subsidy_MIG = result4.Subsidy_MIG;

    //CLSS_MainMaster  clss_mainmaster
    this.service.HFA_sp_CLSS_CompWise(stateCode, DisttCode, cityCode).subscribe(result => {
      this.compArray = Comp.split(",");
      const value = this.compArray.indexOf("5");

      // state wise    clss_mainmaster
       this.service.GetCLSS_Detail(stateCode, DisttCode, cityCode,Comp,DivisionCodes).subscribe(result1 => {
       this.EWS_LIG_BeneDIV = result1.EWS_Subsidy + result1.LIG_Subsidy;
       this.MIG_SubsTotalDIV = result1.MIG1_SubsidyAmt + result1.MIG2_SubsidyAmt ;

       this.compArray = Comp.split(",");
       const value = this.compArray.indexOf("5");
       const value6 = this.compArray.indexOf("6");
      //  alert(Comp);
      //  alert(value);
      //  alert(value6);
        //  alert(Comp.length); 
      if (((Comp == 0 && value == -1) && DivisionCodes !=0  && (stateCode == 0 && DisttCode == 0 && cityCode == 0 )))
      {
           //   alert('Page Load');
          this.EWS_LIG_Total = result_State.Subsidy_EWS_LIG;
          this.MIG_SubsTotal = result_State.Subsidy_MIG;
      }
      else if (Comp ==0 && DivisionCodes !=0 && stateCode == 0 && DisttCode == 0 && cityCode == 0 )
      {
         //  alert('Subsidy Division wise');
        this.EWS_LIG_Total =result_State.Subsidy_EWS_LIG;// <number><any>result1.EWS_Subsidy + <number><any>result1.LIG_Subsidy;//<number><any>this.EWS_LIG_BeneDIV;
        this.MIG_SubsTotal = result_State.Subsidy_MIG ;//<number><any>result1.MIG2_SubsidyAmt + <number><any>result1.MIG1_SubsidyAmt;
      }
      else if (Comp ==0 && DivisionCodes !=0 && stateCode != 0 && DisttCode == 0 && cityCode == 0 )
      {
         // alert('CLSS state wise');
        this.EWS_LIG_Total  =result4.Subsidy_EWS_LIG;
        this.MIG_SubsTotal  = result4.Subsidy_MIG;
        this.clss_totalN  =this.EWS_LIG_Total + this.MIG_SubsTotal;
      }
      else if ((Comp ==0 && DivisionCodes !=0 && stateCode != 0 && DisttCode != 0 && cityCode == 0 ) || (Comp ==0 && DivisionCodes !=0 && stateCode != 0 && DisttCode != 0 && cityCode != 0 ) ||(Comp ==5 && DivisionCodes !=0 && stateCode == 0 && DisttCode == 0 && cityCode == 0 ))
      {
         // alert('CLSS city wise Subsidy....');
        this.EWS_LIG_Total  =<number><any>this.EWS_LIG_BeneDIV;
        this.MIG_SubsTotal  = <number><any>this.MIG_SubsTotalDIV;
        this.clss_totalN= this.EWS_LIG_Total  + this.MIG_SubsTotal ;
      }
      else if ((DivisionCodes != 0 && Comp == 5  && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (DivisionCodes != 0 && Comp == 5  && Comp != 6 && stateCode != 0 && DisttCode != 0 && cityCode != 0)  ) {
         //  alert('4Comp wise City wise CLSS')
         this.EWS_LIG_Total  =<number><any>this.EWS_LIG_BeneDIV;
         this.MIG_SubsTotal  = <number><any>this.MIG_SubsTotalDIV;
         this.clss_totalN= this.EWS_LIG_Total  + this.MIG_SubsTotal ;
      }
     
     // new code
    //  else if ((DivisionCodes == 0 && value==-1 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (DivisionCodes == 0 && value==-1   && stateCode != 0 && DisttCode != 0 && cityCode != 0)  ) {
    //      alert('4Comp wise City wise No CLSS');
    //   this.EWS_LIG_Total  = 0; 
    //   this.MIG_SubsTotal  = 0; 
    //   this.clss_totalN    = 0; 
    //  }

    //  else if ((DivisionCodes == 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (stateCode != 0 && DivisionCodes == 0 && Comp != 0  && DisttCode != 0 && cityCode != 0 )) {
    //        alert('City Multiple Comp wise Sanc -Commit Wise');
    //      this.EWS_LIG_Total  =<number><any>this.EWS_LIG_BeneDIV;
    //      this.MIG_SubsTotal  = <number><any>this.MIG_SubsTotalDIV;
    //      this.clss_totalN= this.EWS_LIG_Total  + this.MIG_SubsTotal ;
    //  }
     // new code
     else if ((DivisionCodes != 0 &&   value==-1 && stateCode != 0 && DisttCode != 0 && cityCode == 0) ||(DivisionCodes != 0 &&   value==-1 && stateCode != 0 && DisttCode != 0 && cityCode != 0) ||(DivisionCodes == 0 &&   value==-1 && stateCode != 0 && DisttCode == 0 && cityCode == 0) || (DivisionCodes == 0  && value==-1   && stateCode == 0 && DisttCode == 0 && cityCode == 0)   || (DivisionCodes != 0 && value==-1  && stateCode == 0 && DisttCode == 0 && cityCode == 0)  ) {
      // alert('Dt Sept 19');
      this.EWS_LIG_Total  = 0; 
      this.MIG_SubsTotal  = 0; 
      this.clss_totalN    = 0; 
     }
     else if ((DivisionCodes != 0 &&  Comp.length >0 && value==1 && stateCode == 0 && DisttCode == 0 && cityCode == 0) || (DivisionCodes != 0 &&  Comp.length >0 && value==1 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (DivisionCodes == 0 &&  Comp.length >0  && value==-1   && stateCode != 0 && DisttCode != 0 && cityCode != 0) || (DivisionCodes == 0 &&  Comp.length >0  && value==1   && stateCode == 0 && DisttCode == 0 && cityCode == 0) || (DivisionCodes == 0 &&  Comp.length >0  && value==1   && stateCode != 0 && DisttCode == 0 && cityCode == 0) || (DivisionCodes == 0 &&  Comp.length >0    && stateCode != 0 && DisttCode == 0 && cityCode == 0) ||(DivisionCodes != 0 &&  Comp.length >0 && value==1 && stateCode == 0 && DisttCode == 0 && cityCode == 0) || (DivisionCodes == 0 &&  Comp.length >0    && stateCode != 0 && DisttCode != 0 && cityCode != 0) ) {
      //  alert('Dt Sept 19');
        this.EWS_LIG_Total  =<number><any>this.EWS_LIG_BeneDIV;
        this.MIG_SubsTotal  = <number><any>this.MIG_SubsTotalDIV;
        this.clss_totalN= this.EWS_LIG_Total  + this.MIG_SubsTotal ; 
     }
     else if ((DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (stateCode != 0 && DivisionCodes != 0 && Comp != 0  && DisttCode != 0 && cityCode != 0 ) || (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode == 0) || (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode != 0)|| (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0)|| (DivisionCodes == 0 && Comp == 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0)|| (DivisionCodes == 0 && Comp == 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0) ) {
       if (value ==-1 && value6==-1)
       {
          // alert('1-4');
          this.EWS_LIG_Total  =<number><any>this.EWS_LIG_BeneDIV;
          this.MIG_SubsTotal  = <number><any>this.MIG_SubsTotalDIV;
          this.clss_totalN= this.EWS_LIG_Total  + this.MIG_SubsTotal ;
       }
       else if (Comp != 0)
       {
         // 1,2,3,4 --> 5 || 6
           if ((Comp != 0 && value6==-1)  )
           {
           //alert('2');
               var arr=[];
               arr=Comp.split(',');
               arr.forEach(a=>{
               if(a=='5')
               {
                 arr.forEach(a=>{
                 this.boolCheck = true;
                 })
               }
             })
           }
           if ((Comp != 0 && value==-1)  )
           {
           //alert('2');
                 var arr=[];
                 arr=Comp.split(',');
                 arr.forEach(a=>{
                 if(a=='6')
                 {
                   arr.forEach(a=>{
                    
                       this.boolCheckJn = true;
 
                   })
                 }
               })
           }
           if ((Comp != 0 )  )
           {
           //alert('2');
                 var arr=[];
                 arr=Comp.split(',');
                 arr.forEach(a=>{
                   if(a=='6' )
                   {
                       arr.forEach(a=>{
                       if( a=='5')
                       {
                             arr.forEach(a=>{
                             this.boolCheckJn = true;
                             this.boolCheck = true;
                         })
                       }
                 }) 

                 }
               })
           }

           if (this.boolCheck != false && this.boolCheckJn == false)
           { // Only 5 - 1-4
              if (DivisionCodes == 0)
              {
               //  alert('1-4,5');
               this.EWS_LIG_Total  =<number><any>this.EWS_LIG_BeneDIV;
               this.MIG_SubsTotal  = <number><any>this.MIG_SubsTotalDIV;
               this.clss_totalN= this.EWS_LIG_Total  + this.MIG_SubsTotal ;
              }
              else 
              {  
              // alert('1-4,5, Div');
              this.EWS_LIG_Total  =<number><any>this.EWS_LIG_BeneDIV;
              this.MIG_SubsTotal  = <number><any>this.MIG_SubsTotalDIV;
              this.clss_totalN= this.EWS_LIG_Total  + this.MIG_SubsTotal ;
              }
             this.boolCheck = false;
            // alert(this.Sanctioned);
             //alert(this.NoofBeneficiaries);

             //debugger;
           }
            
       } 
     }
     else if ((Comp == '5' || Comp == '0' || Comp == '' ) && stateCode != 0 && DisttCode == 0 && cityCode == 0) {
            // alert('aa');
         this.EWS_LIG_Total =<number><any>this.EWS_LIG_BeneDIV;// <number><any>result1.EWS_Subsidy + <number><any>result1.LIG_Subsidy;//<number><any>this.EWS_LIG_BeneDIV;
         this.MIG_SubsTotal =<number><any> this.MIG_SubsTotalDIV  ;//<number><any>result1.MIG2_SubsidyAmt + <number><any>result1.MIG1_SubsidyAmt;
     }
     else if (Comp == 6 && value6 >= 0 ) {
           // alert('ABC1');
         this.EWS_LIG_Total = 0;
         this.MIG_SubsTotal = 0;
     }
    //  else if ((Comp == '1' && value == -1  && stateCode == 0 && DisttCode == 0 && cityCode == 0 && DivisionCodes ==0) || (Comp == '1' && value == -1  && stateCode != 0 && DisttCode == 0 && cityCode == 0 && DivisionCodes ==0)){
    //     alert('ABC2');
    //      this.EWS_LIG_Total = 0;
    //      this.MIG_SubsTotal = 0;
    //  }
     else if ((DivisionCodes == 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode == 0) ) {
     //  alert('Test');
       if (value ==-1 && value6==-1)
        {
            // alert(1);
        }
        else if (Comp != 0)
        {
            // alert(2); 
        }
     }
      // else if ((Comp.length == 1 && value == 0) || (Comp.length >= 1 &&  value6 >= 0) ) {
      //     alert('ABC');
      //   this.EWS_LIG_Total = <number><any>result1.EWS_Subsidy + <number><any>result1.LIG_Subsidy;
      //   this.MIG_SubsTotal = <number><any>result1.MIG1_SubsidyAmt + <number><any>result1.MIG2_SubsidyAmt;
      // }
      // else if (Comp.length >= 1 && value >= 1) {
      //    alert('ABC4');
      //   this.EWS_LIG_Total = result.EWS_LIG_Subsidy;
      //   this.MIG_SubsTotal = result.MIG_SubsidyAmtTotal;
      // }

      this.clss_total = (this.EWS_LIG_Total + this.MIG_SubsTotal).toFixed(2);
      this.clss_totalN  =this.clss_total;

      var formatter = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 0,
      });

      if (Comp.length == 1 && value == 0)
      {
        // alert('cde');
       // this.EWS_LIG_Total = <number><any>result1.EWS_Subsidy + <number><any>result1.LIG_Subsidy;
       // this.MIG_SubsTotal = <number><any>result1.MIG2_SubsidyAmt + <number><any>result1.MIG1_SubsidyAmt;
       // this.clss_totalN = (this.EWS_LIG_Total + this.MIG_SubsTotal);

       // this.EWS_LIG_BeneDIV = result1.EWS_Subsidy +result1.LIG_Subsidy;
       // this.MIG_SubsTotalDIV = result1.MIG1_SubsidyAmt + result1.MIG2_SubsidyAmt ;
       // this.clss_totalN =this.EWS_LIG_BeneDIV  + this.MIG_SubsTotalDIV
        this.clss_totalN = <number><any>result1.Total_SubsidyAmt;
      }
      else
      {
           this.clss_totalN = (this.EWS_LIG_Total + this.MIG_SubsTotal);//.toFixed(0);
      }

      var formatter = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 0,
      });


      if (this.clss_totalN == 0)
        this.clss_totalN = "Nil";
      else
      if (this.clss_totalN !=null || this.clss_totalN !=0  )
      {
        this.clss_totalN =  formatter.format(this.clss_totalN.toFixed(2));
       // this.clss_totalN = this.clss_totalN.toFixed(2);
      }
      else
      {
         (this.clss_totalN) = formatter.format(this.clss_totalN);
      }

      //this.clss_totalN =this.totalSubsidy_State;

      CanvasJS.addColorSet("groundedColors",
        [//colorSet Array

          "#fd7e14",
          "#17a2b8"
          
        ]);

      let chart = new CanvasJS.Chart("clssSubsi", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: false,

        colorSet: "groundedColors",
        backgroundColor: this.backgroundColor,//"#B3E5FC",

        title: {
          text: (this.clss_totalN),//.toFixed(2),//.toFixed(2),//this.SubsidyAmountCredited,//"Subsidy" +
          verticalAlign: "center",
          dockInsidePlotArea: true,
          fontSize: 18
        },
        // backgroundColor: "#CAE9F5",
        data: [{
          backgroundColor: this.backgroundColor,//"#B3E5FC",
          type: "doughnut",
          indexLabel: "{name}  {y}",
          toolTipContent: "<b>{name}  {y}</b>",
          dataPoints: [
            { y: this.EWS_LIG_Total, name: "EWS /LIG" },
            { y: this.MIG_SubsTotal, name: "MIG" },
          ]
        }]
      });
      chart.render();
    })
  });
});
});
}
BindClssBeneficiary(stateCode, DisttCode, cityCode, Comp ,DivisionCodes) {
  this.DivisionCodes ='HFA-1';
  //CLSS_MASTER
  this.service.CLSS_Values_ListNew(stateCode,DivisionCodes).subscribe(result_State => {


   // CLSS_MASTER
  this.service.CLSS_Values_List(stateCode).subscribe(result4 => {
    this.No_Bene_EWS_LIG = result4.No_Bene_EWS_LIG;
    this.No_Beneficiary_MIG = result4.No_Beneficiary_MIG;
    this.NoBeneficiary_Total = result4.NoBeneficiary_Total;
    this.Subsidy_EWS_LIG = result4.Subsidy_EWS_LIG;
    this.Subsidy_MIG = result4.Subsidy_MIG;


    //this.service.GetCLSS_Detail(stateCode, DisttCode, cityCode,Comp,DivisionCodes).subscribe(result => {
    this.service.HFA_sp_CLSS_CompWise(stateCode, DisttCode, cityCode).subscribe(result => {
      this.compArray = Comp.split(",");
      const value = this.compArray.indexOf("5");
      //alert(Comp);
      //alert(value) ;

     
      this.service.GetCLSS_Detail(stateCode, DisttCode, cityCode,Comp,DivisionCodes).subscribe(result1 => {
        this.EWS_LIG_Bene = <number><any>result1.EWS_Bene +<number><any>result1.LIG_Bene;
       // this.MIGBene = (result1.MIG1_Bene + result1.MIG2_Bene ;
          this.MIGBene = <number><any>result1.MIG1_Bene + <number><any>result1.MIG2_Bene;
          //this.MIG_SubsTotal = <number><any>this.MIG_SubsTotalDIV;


      this.compArray = Comp.split(",");
      const value = this.compArray.indexOf("5");
      const value6 = this.compArray.indexOf("6");
         //  alert(Comp);
         // alert(value);
         // alert(value6);
         //   alert(Comp.length); 
      if (((Comp == 0 && value == -1) && DivisionCodes !=0 && (stateCode == 0 && DisttCode == 0 && cityCode == 0 && value == -1)))
      {
        // all zero
       //  alert('page load');
        this.EWS_LIG_Bene = this.No_Bene_EWS_LIG;
        this.MIGBene = this.No_Beneficiary_MIG;
      }
      else if (((Comp == 0 && value == -1) && DivisionCodes !=0 && (stateCode != 0 && DisttCode == 0 && cityCode == 0 && Comp == 0)  ) ||(Comp == 0 && value == -1) && DivisionCodes !=0 && (stateCode != 0 && DisttCode == 0 && cityCode == 0 && Comp == 0))
      {
        // alert('State wise Only');
        this.EWS_LIG_Bene = this.No_Bene_EWS_LIG;
        this.MIGBene = this.No_Beneficiary_MIG;
      }
      else if (Comp ==0  &&  DivisionCodes !=0 && stateCode == 0 && DisttCode == 0 && cityCode == 0)  
      {
        // alert('CLSS Bene Div Wise');
        this.EWS_LIG_Bene = result_State.No_Bene_EWS_LIG ;
        this.MIGBene =  result_State.No_Beneficiary_MIG;
      }

      

      // else if (Comp >0  &&  DivisionCodes ==0 && stateCode != 0 && DisttCode != 0 && cityCode != 0 )  
      // {
      //    alert('5Sept 2019  aa');
      //    this.EWS_LIG_Bene = <number><any>result1.EWS_Bene +<number><any>result1.LIG_Bene;
      //    this.MIGBene = <number><any>result1.MIG1_Bene + <number><any>result1.MIG2_Bene;
      // }
      // else if (((Comp ==0  &&  DivisionCodes ==0 && stateCode != 0 && DisttCode != 0 && cityCode == 0) || (Comp ==0  &&  DivisionCodes ==0 && stateCode != 0 && DisttCode != 0 && cityCode != 0)) || (Comp ==5  &&  DivisionCodes !=0 && stateCode == 0 && DisttCode == 0 && cityCode == 0))
      // {
      //      alert('CLSS Bene city Wise.');
      //   this.EWS_LIG_Bene = <number><any>result1.EWS_Bene +<number><any>result1.LIG_Bene;
      //   this.MIGBene = <number><any>result1.MIG1_Bene + <number><any>result1.MIG2_Bene;
      // }
      else if ((DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (stateCode != 0 && DivisionCodes != 0 && Comp != 0  && DisttCode != 0 && cityCode != 0 )|| (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode == 0) ||  (DivisionCodes != 0 && Comp != 0 && DisttCode == 0 && cityCode == 0 && stateCode != 0)|| (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0)|| (DivisionCodes != 0 && Comp != 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0) || (DivisionCodes == 0 && Comp == 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0)|| (DivisionCodes == 0 && Comp == 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0)|| (DivisionCodes != 0 && Comp == 0 && DisttCode != 0 && cityCode == 0 && stateCode != 0) || (DivisionCodes != 0 && Comp == 0 && DisttCode != 0 && cityCode != 0 && stateCode != 0)  ) {
       // alert('City Wise CLSS in all respect'); 
        if (value ==-1 && value6==-1)
        {
           // alert('1-4');
            if ((Comp != 0 && value6==-1)  )
            {
                var arr=[];
                arr=Comp.split(',');
                arr.forEach(a=>{
                if(a=='5')
                {
                  arr.forEach(a=>{
                  this.boolCheck = true;
                  })
                }
              })
            }
            if (this.boolCheck == false && (Comp != 0 && value6==-1))
            {
             // alert('Test');
              this.EWS_LIG_Bene = 0;
              this.MIGBene = 0;  
            }
            else 
            {
            this.EWS_LIG_Bene = <number><any>result1.EWS_Bene +<number><any>result1.LIG_Bene;
            this.MIGBene = <number><any>result1.MIG1_Bene + <number><any>result1.MIG2_Bene;
            }
        }
        else if (Comp != 0)
        {
          // 1,2,3,4 --> 5 || 6
            if ((Comp != 0 && value6==-1)  )
            {
            //alert('2');
                var arr=[];
                arr=Comp.split(',');
                arr.forEach(a=>{
                if(a=='5')
                {
                  arr.forEach(a=>{
                  this.boolCheck = true;
                  })
                }
              })
            }
            if ((Comp != 0 && value==-1)  )
            {
            //alert('2');
                  var arr=[];
                  arr=Comp.split(',');
                  arr.forEach(a=>{
                  if(a=='6')
                  {
                    arr.forEach(a=>{
                     
                        this.boolCheckJn = true;
  
                    })
                  }
                })
            }
            if ((Comp != 0 )  )
            {
            //alert('2');
                  var arr=[];
                  arr=Comp.split(',');
                  arr.forEach(a=>{
                    if(a=='6' )
                    {
                        arr.forEach(a=>{
                        if( a=='5')
                        {
                              arr.forEach(a=>{
                              this.boolCheckJn = true;
                              this.boolCheck = true;
                          })
                        }
                  }) 

                  }
                })
            }

            if (this.boolCheck != false && this.boolCheckJn == false)
            { // Only 5 - 1-4
               if (DivisionCodes == 0)
               {
                  // alert('1-4,5');
                  this.EWS_LIG_Bene = <number><any>result1.EWS_Bene +<number><any>result1.LIG_Bene;
                  this.MIGBene = <number><any>result1.MIG1_Bene + <number><any>result1.MIG2_Bene;
               }
               else 
               {  
                 //alert('1-4,5, Div');
                this.EWS_LIG_Bene = <number><any>result1.EWS_Bene +<number><any>result1.LIG_Bene;
                this.MIGBene = <number><any>result1.MIG1_Bene + <number><any>result1.MIG2_Bene;
               }
              this.boolCheck = false;
             // alert(this.Sanctioned);
              //alert(this.NoofBeneficiaries);

              //debugger;
            }
             
        } 
      }

      //--------------------------------------------------------------------------------------------------
      else if (   (DivisionCodes == 0 && value==-1   && stateCode == 0 && DisttCode == 0 && cityCode == 0) || (DivisionCodes == 0 && value==-1   && stateCode != 0 && DisttCode == 0 && cityCode == 0) || (DivisionCodes == 0 && value==-1   && stateCode != 0 && DisttCode == 0 && cityCode == 0)|| (DivisionCodes != 0 && value==-1 &&  Comp.length >0   && stateCode == 0 && DisttCode == 0 && cityCode == 0)  ) {
        // alert('Dt Sept 19');
        this.EWS_LIG_Bene  = 0; 
        this.MIGBene  = 0; 
       }


      // else if ((((Comp ==0 )) && ( DivisionCodes !=0 ||stateCode != 0 || DisttCode == 0 || cityCode == 0)))
      // {
      //   // all zero
      //     alert('CLSS Or Jn  Div ');
      //   this.EWS_LIG_Bene = result_State.No_Bene_EWS_LIG;// this.No_Bene_EWS_LIG;
      //   this.MIGBene = result_State.No_Beneficiary_MIG;// this.No_Beneficiary_MIG;
      // }
      

      else if ((((Comp !=5 || Comp != 6)  && value ==-1 && value6==-1 )  && ( DivisionCodes !=0 ||stateCode != 0 || DisttCode != 0 || cityCode != 0)))
      {
        // all zero
           //  alert('CLSS Or Jn');

        this.EWS_LIG_Bene = 0;// this.No_Bene_EWS_LIG;
        this.MIGBene = 0;//this.No_Beneficiary_MIG;
      }
      else if (Comp ==0 && value == -1 && DivisionCodes !=0 && stateCode == 0 && DisttCode == 0 && cityCode == 0 )
      {
        // alert('only DivisionCodes');

        // this.EWS_LIG_Bene = this.EWS_LIG_Bene ;
         //this.MIGBene =this.MIGBene ;

         this.EWS_LIG_Bene =result_State.No_Bene_EWS_LIG;
         this.MIGBene = result_State.No_Beneficiary_MIG
      }
      else if ((Comp == '1' && value == -1  && stateCode == 0 && DisttCode == 0 && cityCode == 0 && DivisionCodes ==0) || (Comp == '1' && value == -1  && stateCode != 0 && DisttCode == 0 && cityCode == 0 && DivisionCodes ==0)){
       // alert(11);
      this.EWS_LIG_Bene = 0;
      this.MIGBene = 0;
    }
      else if (Comp != '5' && value == -1 && stateCode != 0 && DisttCode == 0 && cityCode == 0 && DivisionCodes ==0) {
        // alert(12);
        //this.EWS_LIG_Bene = this.EWS_LIG_Bene ;
        //this.MIGBene = result.MIG_BeneTotal;

         this.EWS_LIG_Bene = 0;//result4.No_Bene_EWS_LIG;
         this.MIGBene = 0;//result4.No_Beneficiary_MIG;
      }
      else if ((Comp == '5' || Comp == '0') && stateCode == 0 && DisttCode == 0 && cityCode == 0) {
         // alert(14);
        this.EWS_LIG_Bene = result.EWS_LIG_Bene;
        this.MIGBene = result.MIG_BeneTotal;
      }
      else if ((Comp == '5' || Comp == '0') && stateCode != 0 && DisttCode == 0 && cityCode == 0) {
        // alert(14);
         this.EWS_LIG_Bene = result.EWS_LIG_Bene;
         this.MIGBene = result.MIG_BeneTotal;
      }
      else if (Comp.length >= 1 && value == -1 ) {
          // alert();
        this.EWS_LIG_Bene = 0;
        this.MIGBene = 0;
      }
      else if (Comp.length == 1 && value == 0) {
        // alert(15);
        this.EWS_LIG_Bene = result.EWS_LIG_Bene;
        this.MIGBene = result.MIG_BeneTotal;
      }
      else if (Comp.length >= 1 && value >= 1 ) {
       // alert(16);
        this.EWS_LIG_Bene = result.EWS_LIG_Bene;
        this.MIGBene = result.MIG_BeneTotal;
      }
      else if (Comp.length = 1 && value == -1) {
       // alert(17);
        this.EWS_LIG_Bene = 0;
        this.MIGBene = 0;
      }
      //--------------------------------

      var formatter = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 0,
      });

      this.Bene_New = this.EWS_LIG_Bene + this.MIGBene;
      if (this.Bene_New == 0)
        this.Bene_New = "Nil";
      else
        this.Bene_New = formatter.format(this.Bene_New);

      CanvasJS.addColorSet("groundedColors",
        [//colorSet Array
          "#fd7e14",
          "#17a2b8"
        ]);

      let chart = new CanvasJS.Chart("clssBene", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: false,
        //  backgroundColor: "#CAE9F5",
        colorSet: "groundedColors",
        backgroundColor: this.backgroundColor, //"#B3E5FC",

        title: {
          text: (this.Bene_New),// "Released" +
          verticalAlign: "center",
          dockInsidePlotArea: true,
          fontSize: 18
        },
        data: [{
          backgroundColor: this.backgroundColor,//"#B3E5FC",

          type: "doughnut",
          //showInLegend: true,
          //toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
          toolTipContent: "<b>{name} {y}</b>",
          //indexLabel: "{name} - #percent%",
          indexLabel: "{name}  - {y}",
          dataPoints: [
            { y: this.EWS_LIG_Bene, name: "EWS /LIG" },
            { y: this.MIGBene, name: "MIG" },
          ]
        }]
      });
      chart.render();
    });
  });
});
});
}
  
}

