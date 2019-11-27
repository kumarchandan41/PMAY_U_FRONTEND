import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/canvasjs.min.js';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable, never } from 'rxjs';
import { Alert } from 'selenium-webdriver';
import jsPDF from 'jspdf';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as $ from 'jspdf';
import { NgbActiveModal, NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router } from '@angular/router';
import { Houses_Status } from '../model/chart';
import { float } from 'html2canvas/dist/types/css/property-descriptors/float';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


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
  selector: 'app-cons-phy-fin-report-new',
  templateUrl: './cons-phy-fin-report-new.component.html',
  styleUrls: ['./cons-phy-fin-report-new.component.css']
})
export class ConsPhyFinReportNewComponent implements OnInit {
  // StateDetails : States[];
  // DisttDetails : Observable<District[]>;
  // CityDetails  : City[];
  //stateCode:string,districtCode:string,cityCode:string,compId:string
  stateCode: string= "0";
  districtCode:string= "0";
  cityCode:string = "0";


  HousesOccupied6:any="0";


  stateCodes: string = "0";
  districtCodes: string = "0";
  cityCodes: string = "0";

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


  NoPApprovedJN: number;
  NoPApprovedRAY: number;
  NoPApprovedCLSS: number;
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
  NoOfprojBLCS1: any;
  
  ProjCostBLCS: any;  
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
  NoofBene1: any;

  NoOfprojRay1: string;
  States_UT: string;
  District: string; // new 
  City: string;     // new 
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
  NoPApprovedJN1:any;
  NoOfprojRay_1: any;
  HS_JN1: string;
  Grounded_JN1: any;
  HGrnd_JN1: string;
  CARel_JN1: string;
  CShare_JN1: string;
  ProjCostApp_JN1: string;
  Completed_JN1: string;
  HOcc_JN1: string;
  NoOfprojISSR1: string;
  NoOfprojAHP1: any;
  OccupiedJN1: any;
  HComp_JN1: any;
  CSRay1: string;
  SubsidyAmtCr1: any;
  ProjCostRay1: any;
  CLSSLoanAmt1: any;
  ProjCostISSR1: any;
  ProjCostAHP1: any;
  ProjCostBLCS1: string;
  CSISSR1: string;
  CARay1: string;
  CAISSR1: any;
  CAAHP1: any;
  CABLCS1: string;
  HSRay1: string;
  HSISSR1: string;
  HGISSR1: string;
  HGAHP1: any;
  HGBLCS1: any;
  HCRay1: string;
  HCISSR1: string;
  HCAHP1: string;
  HCBLCS1: string;
  HORay1: string;
  HOISSR1: string;
  HOAHP1: string;
  HOBLCS1: string;
  CSAHP1: string;
  CSBLCS1: string;
  HGRay1: string;
  Compid  :string ="0";
  compId:string = "0";
HouseInvolved1:any=0;
HouseInvolved2:any=0;
HouseInvolved3:any=0;
HouseInvolved4:any=0;
HouseInvolved5:any=0;
HouseInvolved6:any=0;
HouseInvolved7:number=0;
HouseInvolved8:number=0;
HouseInvolved9:number=0;
HouseInvolved10:number=0;

HouseInvolved1B14: number=0;
  FundsDisbursed_in_Houses1B14 : any=0;
  Houses_Grounded1B14 : number=0;
  Houses_Completed1B14 : number=0;
  HousesOccupied1B14 : number=0;

//FundsDisbursed_in_Houses:string="0";
FundsDisbursed_in_Houses1:number=0;
FundsDisbursed_in_Houses2:any=0;
FundsDisbursed_in_Houses3:any=0;
FundsDisbursed_in_Houses4:any=0;
FundsDisbursed_in_Houses5:any=0;
FundsDisbursed_in_Houses6:number=0;
FundsDisbursed_in_Houses7:number=0;
FundsDisbursed_in_Houses8:number=0;
FundsDisbursed_in_Houses9:number=0;
FundsDisbursed_in_Houses10:number=0;

Houses_Grounded1:any=0;
Houses_Grounded2:number=0;
Houses_Grounded3:number=0;
Houses_Grounded4:number=0;
Houses_Grounded5:number=0;
Houses_Grounded6:number=0;
Houses_Grounded7:number=0;
Houses_Grounded8:number=0;
 
Houses_Completed1:number=0;
Houses_Completed2:any=0;
Houses_Completed3:number=0;
Houses_Completed4:number=0;
Houses_Completed5:number=0;
Houses_Completed6:any=0;
Houses_Completed7:number=0;
Houses_Completed8:number=0;

HousesOccupied1:number=0;
HousesOccupied2:number=0;

HousesOccupied2BLCS:number=0;  
Houses_Completed2BLCS:number=0;    
Houses_Grounded2BLCS  :number=0;
FundsDisbursed_in_Houses2BLCS :number=0;
HouseInvolved2BLCS:number=0;

HousesOccupied3:number=0;
HousesOccupied4:number=0;
 
HousesOccupied5:number=0;
//HousesOccupied6:number=0;
HousesOccupied7:number=0;
HousesOccupied8:number=0;
lstComponent: string[] = [];

HousesStatus:Houses_Status[];
TFundsDisbursed_in_Houses: any=0;
THouseInvolved :number=0;
  THouses_Grounded: number=0;
  THouses_Completed: number=0;
  THousesOccupied: number=0;
comp_id :string;
HousesOccupied21 : number=0;
Houses_Completed21: number=0;
Houses_Grounded21 : number=0; 
FundsDisbursed_in_Houses21 : number=0; 
HouseInvolved21: any=0;
  HousesOccupied1_: any=0;
  HouseInvolved2_: any=0;
  HouseInvolved1ISSR: number=0;
  FundsDisbursed_ISSR_Houses1: number=0;
  Houses_ISSRGrounded1: number=0;
  Houses_ISSRCompleted1: number;
  Houses_ISSROccupied1 :number=0;
  HouseInvolved31: number=0;
  FundsDisbursed_in_Houses31: number=0;
  Houses_Grounded31: number=0;
  Houses_Completed31: number=0;
  HousesOccupied31 : number=0;
  HouseInvolved41: number=0;
  FundsDisbursed_in_Houses41: number=0;
  Houses_Grounded41: number =0 ;
  Houses_Completed41: number=0;
  HousesOccupied41: number=0;

   
  HouseInvolved51: number=0;
  FundsDisbursed_in_Houses51: number=0;
  Houses_Grounded51: number=0;
  Houses_Completed51: number=0;
  HousesOccupied51: number=0;

   HouseInvolved61: number=0;
 FundsDisbursed_in_Houses61: number=0; 
 Houses_Grounded61: number=0;
 Houses_Completed61: number=0;
HousesOccupied61: number=0;
  Houses_GroundedJN1: number=0;
  Houses_CompletedJN1: number=0;
  HousesOccupiedJN1: number =0;

  THouses_CompletedJN: any =0;
  HousesOccupiedJNT: any =0;


  Bene2014_15_CLSS: any=0;
  Bene2015_16_CLSS: any=0;
  Bene2016_17_CLSS: any=0;
  Bene2017_18_CLSS: any=0;
  Bene2018_19_CLSS: any=0;
  Bene2019_20_CLSS: any=0;
  HouseInvolved31_16ISSR:any=0;
  display='block';
 

HouseInvolved01 :any =0;
FundsDisbursed_in_Houses01 :any =0;
Houses_Grounded01 :any =0;
Houses_Completed01 :any =0;
HousesOccupied01:any =0;


HouseInvolved11:any =0;
FundsDisbursed_in_Houses11:any =0;
Houses_Grounded11:any =0;
Houses_Completed11:any =0;
HousesOccupied11:any =0;

HouseInvolved_21:any =0;
FundsDisbursed_in_Houses_21:any =0;
Houses_Grounded_21:any =0;
Houses_Completed_21:any =0;
HousesOccupied_21:any =0;

HouseInvolved_31:any =0;
FundsDisbursed_in_Houses_31:any =0;
Houses_Grounded_31:any =0;
Houses_Completed_31:any =0;
HousesOccupied_31:any =0;

HouseInvolved_41:any =0;
FundsDisbursed_in_Houses_41:any =0;
Houses_Grounded_41:any =0;
Houses_Completed_41:any =0;
HousesOccupied_41:any =0;


HouseInvolved_51:any =0;
FundsDisbursed_in_Houses_51:any =0;
Houses_Grounded_51:any =0;
Houses_Completed_51:any =0;
HousesOccupied_51:any =0;


THouseInvolved11:any =0  ;
TFundsDisbursed_in_Houses11:any =0  ;
THouses_Grounded11:any =0  ;
THouses_Completed11:any =0;  
THousesOccupied11:any =0; 

HouseInvolved01_AHP :any=0;
FundsDisbursed_in_Houses01_AHP:any=0;
Houses_Grounded01_AHP:any=0;
Houses_Completed01_AHP:any=0;
HousesOccupied01_AHP:any=0;


HouseInvolved11_AHP:any=0;
FundsDisbursed_in_Houses11_AHP:any=0;
Houses_Grounded11_AHP:any=0;
Houses_Completed11_AHP:any=0;
HousesOccupied11_AHP:any=0;

HouseInvolved21_AHP:any=0;
FundsDisbursed_in_Houses21_AHP:any=0;
Houses_Grounded21_AHP:any=0;
Houses_Completed21_AHP:any=0;
HousesOccupied21_AHP:any=0;

HouseInvolved31_AHP:any=0;
FundsDisbursed_in_Houses31_AHP:any=0;
Houses_Grounded31_AHP:any=0;
Houses_Completed31_AHP:any=0;
HousesOccupied31_AHP:any=0;

HouseInvolved41_AHP:any=0;
FundsDisbursed_in_Houses41_AHP:any=0;
Houses_Grounded41_AHP:any=0;
Houses_Completed41_AHP:any=0;
HousesOccupied41_AHP:any=0;

HouseInvolved51_AHP:any=0;
FundsDisbursed_in_Houses51_AHP:any=0;
Houses_Grounded51_AHP:any=0;
Houses_Completed51_AHP:any=0;
HousesOccupied51_AHP:any=0;

THouseInvolved_AHP1:any=0;
TotalFundsDisbursedAHP1:any=0;
THouses_Grounded_AHP1:any=0;
THouses_Completed_AHP1:any=0;
THousesOccupied_AHP1:any=0;

HouseInvolved01_ISSR :any=0;
FundsDisbursed_in_Houses01_ISSR:any=0;
Houses_Grounded01_ISSR:any=0;
Houses_Completed01_ISSR:any=0;
HousesOccupied01_ISSR:any=0;


HouseInvolved11_ISSR :any=0;
FundsDisbursed_in_Houses11_ISSR:any=0;
Houses_Grounded11_ISSR:any=0;
Houses_Completed11_ISSR:any=0;
HousesOccupied11_ISSR:any=0;

HouseInvolved12_ISSR :any=0;
FundsDisbursed_in_Houses12_ISSR:any=0;
Houses_Grounded12_ISSR:any=0;
Houses_Completed12_ISSR:any=0;
HousesOccupied12_ISSR:any=0;


HouseInvolved13_ISSR:any=0;
FundsDisbursed_in_Houses13_ISSR:any=0;
Houses_Grounded13_ISSR:any=0;
Houses_Completed13_ISSR:any=0;
HousesOccupied13_ISSR:any=0;

HouseInvolved14_ISSR:any=0;
FundsDisbursed_in_Houses14_ISSR:any=0;
Houses_Grounded14_ISSR:any=0;
Houses_Completed14_ISSR:any=0;
HousesOccupied14_ISSR:any=0;

HouseInvolved15_ISSR:any=0;
FundsDisbursed_in_Houses15_ISSR:any=0;
Houses_Grounded15_ISSR:any=0;
Houses_Completed15_ISSR:any=0;
HousesOccupied15_ISSR:any=0;

THouseInvolved1_ISSR: any=0;
TFundsDisbursed_in_Houses1_ISSR: any=0;
THouses_Grounded1_ISSR: any=0;
THouses_Completed1_ISSR: any=0;
THousesOccupied1_ISSR: any=0;
HouseInvolved21_ISSR :any=0;
FundsDisbursed_in_Houses21_ISSR :any=0;
Houses_Grounded21_ISSR :any=0;
Houses_Completed21_ISSR :any=0;
HousesOccupied21_ISSR :any=0;
Houses_GroundedJN_T: number=0;

Houses_CompletedJNC: any=0;
HousesOccupiedJNO: any=0;
Houses_GroundedJNG: any=0;
BeneCLSS_Total: any=0;
RdStatus:string;
display1="block";
display2="none";
  HouseInvolved11_: number;
  HouseInvolved2new: any;
  PC14: number=0;
  CAI14: number=0;
  First14: number=0;
  Second14: number=0;
  Third14: number=0;
  UC_Received14: number=0;
  PC15: number=0;
  CAI15: number=0;
  First15: number=0;
  Second15: number=0;
  Third15: number=0;
  UC_Received15: number=0;
  PC16: number=0;
  CAI16: number=0;
  First16: number=0;
  Second16: number=0;
  Third16: number=0;
  UC_Received16: number=0;
  PC17: number=0;
  CAI17: number=0;
  First17: number=0;
  Second17: number=0;
  Third17: number=0;
  UC_Received17: number=0;

  PC18: number=0;
  CAI18: number=0;
  First18: number=0;
  Second18: number=0;
  Third18: number=0;
  UC_Received18: number=0;

  PC19: number=0;
  CAI19: number=0;
  First19: number=0;
  Second19: number=0;
  Third19: number=0;
  UC_Received19: number=0;
  Total14 : number=0;
  Total15 : number=0;
  Total16 : number=0;
  Total17 : number=0;
  Total18 : number=0;
  Total19 : number=0;
  sTotalPC: number=0;
  sTotalCAI: number=0;
  sTotalInst1: number=0;
  sTotalInst2: number=0;
  sTotalInst3: number=0;
  sTotalUC: number=0;
  sTotal: number=0;

  PC14AHP: number=0;
  CAI14AHP: number=0;
  First14AHP: number=0;
  Second14AHP: number=0;
  Third14AHP: number=0;
  UC_Received14AHP: number=0;
  Total14AHP: number=0;

  PC_BLC14: number=0;
  CAI_BLC14: number=0;
  First_BLC14: number=0;
  Second_BLC14: number=0;
  Third_BLC14: number=0;
  UC_Received_BLC14: number=0;
  Total_BLC14: number=0;
  PC14ISSR: any=0;
  PC14ISS: number=0;
  CAI14ISS: number=0;
  First14ISS: number=0;
  Second14ISS: number=0;
  Third14ISS: number=0;
  UC_Received14ISS: number=0;

  PC15AHP: number=0;
  CAI15AHP: number=0;
  First15AHP: number=0;
  Second15AHP: number=0;
  Third15AHP: number=0;
  UC_Received15AHP: number=0;
  Total15AHP: number=0;

  PC15ISS: number=0;
            CAI15ISS: number=0;
            First15ISS: number=0;
            Second15ISS: number=0;
            Third15ISS: number=0;
            UC_Received15ISS: number=0;
            Total15ISS: number=0;
            PC15BLC: number=0;
            CAI15BLC: number=0;
            First15BLC: number=0;
            Second15BLC: number=0;
            Third15BLC: number=0;
            UC_Received15BLC: number=0;
            Total15BLC: number=0;
  Total14ISS: number=0;
  
  Loan_TOTAL_CL: number=0;
  Sub2014_15_CL: number=0;
  Sub2015_16_CL: number=0;
  Sub2016_17_CL: number=0;
  Sub2017_18_CL: number=0;
  Sub2018_19_CL: number=0;  
  Sub2019_20_CL: number=0;
  UC_Received_CL: number=0;
  THouseInvolvedNew: number;
               
  HousesOccupied114AHP: number=0;  
  Houses_Completed114AHP: number=0;
  Houses_Grounded114AHP: number=0;
  FundsDisbursed_in_Houses114AHP: number=0;
  HouseInvolved114AHP: any=0;
  HouseInvolved2_15AHP: any=0;
  FundsDisbursed_in_Houses2_15AHP :any=0;
  Houses_Grounded2_15AHP:any=0;
  Houses_Completed2_15AHP:any=0;
  HousesOccupied2_15AHP:any=0;
  HouseInvolved21_ISSR_15: number=0;
  FundsDisbursed_in_Houses21_ISSR_15: number=0;
  Houses_Grounded21_ISSR_15: number=0;
  Houses_Completed21_ISSR_15: number=0;
  HousesOccupied21_ISSR_15: number=0;
  HousesOccupied3_16BLCS: number =0;
  Houses_Completed3_16BLCS: number=0;
  Houses_Grounded3_16BLCS: number=0;

  FundsDisbursed_in_Houses3_16BLCS: number=0;
  HouseInvolved3_16BLCS: number =0;
  HousesOccupied3_16AHP: number =0;
  Houses_Completed3_16AHP: number =0;
  Houses_Grounded3_16AHP: number=0;
  FundsDisbursed_in_Houses3_16AHP: number=0;
  HouseInvolved3_16AHP: number=0;
  FundsDisbursed_in_Houses31_16ISSR: number=0;
  HousesOccupied31_16ISSR: number=0;
  Houses_Completed31_16ISSR: number=0;
  Houses_Grounded31_16ISSR: number=0;
  HousesOccupied4_17AHP: number=0;

  HouseInvolved4_17BLC:any=0;
      FundsDisbursed_in_Houses4_17BLC:any=0;
      Houses_Grounded4_17BLC:any=0;
      HousesOccupied4_17BLC :any=0;
      Houses_Completed4_17BLC:any=0;
  Houses_Completed4_17AHP: number;
  Houses_Grounded4_17AHP: number;
  FundsDisbursed_in_Houses4_17AHP: number;
  HouseInvolved4_17AHP: number;
  HousesOccupied41_17ISSR: number;
  Houses_Completed41_17ISSR: number;
  Houses_Grounded41_17ISSR: number;
  FundsDisbursed_in_Houses41_17ISSR: number;
  HouseInvolved41_17ISSR: number;
      

  HousesOccupied5_18BLCS :any=0;
    Houses_Completed5_18BLCS  :any=0;
    Houses_Grounded5_18BLCS  :any=0;
  FundsDisbursed_in_Houses5_18BLCS :any=0;
  HouseInvolved5_18BLCS :any=0;
  HouseInvolved5_18AHP :any=0;
  FundsDisbursed_in_Houses5_18AHP :any=0;
  Houses_Grounded5_18AHP :any=0;
  Houses_Completed5_18AHP :any=0;
  HousesOccupied5_18AHP :any=0;
  HousesOccupied51_18ISSR: number;
  Houses_Completed51_18ISSR: number;
  Houses_Grounded51_18ISSR: number;
  FundsDisbursed_in_Houses51_18ISSR: number;
  HouseInvolved51_18ISSR: number;
  HouseInvolved6_19BLC :any=0; 
  FundsDisbursed_in_Houses6_19BLC :any=0;
  Houses_Grounded6_19BLC:any=0;
   Houses_Completed6_19BLC :any=0;
   HousesOccupied6_19BLC:any=0;
  HouseInvolved6_19AHP:any=0;
   FundsDisbursed_in_Houses6_19AHP:any=0;
    Houses_Grounded6_19AHP :any=0;
    Houses_Completed6_19AHP :any=0;
  HousesOccupied6_19AHP:any=0;
  HousesOccupied61_19ISSR: number;
  Houses_Completed61_19ISSR: number;
  Houses_Grounded61_19ISSR: number;
  FundsDisbursed_in_Houses61_19ISSR: number;
  HouseInvolved61_19ISSR: number;
  //display3:string='none';
  Header:string;
  
  PC16AHP: number;
  CAI16AHP: number;
  First16AHP : number;
  Second16AHP : number;
  Third16AHP: number;
  UC_Received16AHP: number;
  PC16ISS: number;
  CAI16ISS: number;
  First16ISS: number;
  Second16ISS: number;
  Third16ISS: number;
  UC_Received16ISS: number;
  Total16ISS: number;
  //Total15AHP : number;
  PC16BLC: number=0;
  CAI16BLC: number=0;
  First16BLC: number=0;
  Second16BLC: number=0;
  Third16BLC: number=0;

  PC17ISS: number=0;
                CAI17ISS: number=0;
                First17ISS: number=0;
                Second17ISS: number=0;
                Third17ISS: number=0;
                UC_Received17ISS: number=0;
                Total17ISS: number=0;
  PC17AHP: number =0;
  CAI17AHP: number =0;
  First17AHP: number =0;
  Second17AHP: number =0;
  Third17AHP: number =0;
  UC_Received17AHP: number =0;
  Total17AHP : number =0;
  First17BLC: number =0;
  Second17BLC: number =0;
  Third17BLC: number =0;
  PC18ISS: number =0;
  CAI18ISS: number =0;
  First18ISS: number =0;
  Second18ISS: number =0;
  Third18ISS: number =0;
  UC_Received18ISS: number =0;
  Total18ISS: number =0;
  PC18AHP: number =0;
  Houses_Grounded1new:number;
  CAI18AHP: number =0;
  First18BLC: number =0;
  First18AHP: number =0;
  Second18BLC: number =0;
  Second18AHP: number =0;
  Third18BLC: number =0;
  Third18AHP: number =0;
  UC_Received18AHP: number;
  Total18AHP: number;
  PC19ISS: number;
  JvrmDisplay:string="initial";
  Bene2015_16_CLSSNew: any;
  PC19AHP: number;
  CAI19AHP: number;
  First19AHP: number;
  Second19AHP: number;
                  Third19AHP: number;
                  UC_Received19AHP: number;
                  Total19AHP: number;
  CAI19ISS: number;
  First19ISS: number;
  Second19ISS: number;
  Third19ISS: number;
  UC_Received19ISS: number;
  Total19ISS: number;
  Total16AHP: number;
  // HouseInvolved311: any;
  // HouseInvolved411: any;
  // HouseInvolved511: any;
  // HouseInvolved611: any;

  Houses_Grounded1B141: any;
  Houses_Completed3New: any =0;
   
  display5:string='none';
  thHouses_GroundedJNG2: string;
  //test: string='hello welcome';
   
 
// declaration end

  constructor(private router: Router, public service: GraphService) {
    this.stValue = "0";
    this.distValue = "0";
    this.cityValue = "0";
    this.StateMessage = "All India";
    this.DistrictMessage = "Select District";
    this.CityMessage = "Select City";
    //this.Houses_Grounded1new=0;

    this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
      this.Houses_Grounded = result.Houses_Grounded;
    });

    this.service.GetStatusofHouses_Sanctioned(this.stateCodes, this.districtCodes, this.cityCodes, this.Compid);
     
    this.service.GetCLSS_Houses_VerticalWise(this.stateCode).subscribe;
          this.service.sp_GetHousesStatusFor2014_15(this.stateCode,this.districtCodes,this.cityCode, this.Compid);
           this.service.sp_GetHousesStatus_ISSR_2014_15(this.stateCode,this.districtCodes,this.cityCode,this.Compid); 
          this.service.sp_GetHousesStatusForVertical(this.stateCode);
          
 this.service.sp_GetHousesStatusFor2015_16(this.stateCode,this.districtCodes,this.cityCode,this.Compid);
 this.service.sp_GetHousesStatus_ISSR_2015_16(this.stateCode,this.districtCodes,this.cityCode,this.Compid);
 this.BindGetStatus(this.stateCodes, this.districtCodes, this.cityCodes, this.Compid); 
 

  }

  ngOnInit() {
    this.Header="Status of Houses Sanctioned in Respective Years under PMAY(U)";
    this.RdStatus="Phy";
    //this.division ="HFA-1";
    this.stateCodes = "0";
    this.districtCodes = "0";
    this.cityCodes = "0";
    this.Compid="0";
    this.service.StateList();
    this.service.DisttList(this.stateCodes);
    this.service.CityList(this.districtCodes);
    // this.States_UT ="Delhi";
    this.lblStateDisttCity = "All India";
    this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
    this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
    this.service.CLSSCityWiseReportPMayListNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division);

    this.division = "0";
    this.JvrmDisplay="initial";
    
//     this.BindGetStatus(this.stateCodes, this.districtCodes, this.cityCodes, this.Compid);
    this.NoPApprovedCLSS = 0; //?
    this.FundsDisbursed_in_Houses1B14=0;
   this.GetFinancialData (this.stateCodes, this.districtCodes, this.cityCodes, this.Compid);
   this.BindGetStatus(this.stateCodes, this.districtCodes, this.cityCodes, this.Compid);
}

openModalDialog(){
  this.thHouses_GroundedJNG2=this.Houses_GroundedJNG;
 // this.test ="10000";
   this.display5='block';  
}
 
 ResetVariables_CLSS()
 {
 
   
     //this.Bene2014_15_CLSS 
      this.HouseInvolved1ISSR =0;// +this.Bene2014_15_CLSS;

  this.HouseInvolved114AHP  =0;
  this.HouseInvolved1B14 =0;
//   this.Bene2014_15_CLSS =0;
    
   
this.FundsDisbursed_in_Houses114AHP=0; 
this.FundsDisbursed_in_Houses1B14 =0;
//this.Bene2014_15_CLSS =0;
 this.FundsDisbursed_ISSR_Houses1=0;

this.Houses_Grounded114AHP =0;
this.Houses_Grounded1B14 =0;
//this.Bene2014_15_CLSS =0;
  this.Houses_GroundedJNG=0; 
         this.Houses_ISSRGrounded1=0;
this.Houses_Completed114AHP =0;
this.Houses_Completed1B14 =0;
//  this.Bene2014_15_CLSS =0;
    this.Houses_CompletedJNC=0; 
        this.Houses_ISSRCompleted1=0;
this.HousesOccupied1B14  =0;
this.HousesOccupied114AHP =0;
//this.Bene2014_15_CLSS =0;
 this.HousesOccupiedJNO =0;
     this.Houses_ISSROccupied1=0;


//---------------------------------------
 this.HouseInvolved2_15AHP =0;
 this.HouseInvolved2BLCS =0;
//  this.Bene2015_16_CLSS =0;
           this.HouseInvolved21_ISSR_15 =0;
 this.FundsDisbursed_in_Houses2_15AHP =0;
 this.FundsDisbursed_in_Houses2BLCS =0;
//   this.Bene2015_16_CLSS =0;
            this.FundsDisbursed_in_Houses21_ISSR_15=0;
 this.Houses_Grounded2_15AHP =0;
  this.Houses_Grounded2BLCS =0;
//   this.Bene2015_16_CLSS=0;
            this.Houses_Grounded21_ISSR_15=0;
 this.Houses_Completed2_15AHP =0;
 this.Houses_Completed2BLCS =0;
//   this.Bene2015_16_CLSS =0;
            this.Houses_Completed21_ISSR_15 =0;
 this.HousesOccupied2_15AHP =0;
  this.HousesOccupied2BLCS =0;
//    this.Bene2015_16_CLSS =0;
              this.HousesOccupied21_ISSR_15=0;
//  -------------------
this.HouseInvolved3_16AHP =0;
this.HouseInvolved3_16BLCS =0;
//this.Bene2016_17_CLSS =0;
    this.HouseInvolved31_16ISSR=0;
this.FundsDisbursed_in_Houses3_16AHP=0;
this.FundsDisbursed_in_Houses3_16BLCS =0;
//this.Bene2016_17_CLSS =0;
     this.FundsDisbursed_in_Houses31_16ISSR =0;

this.Houses_Grounded3_16BLCS =0;
 this.Houses_Grounded3_16AHP =0;
 // this.Bene2016_17_CLSS =0;
            this.Houses_Grounded31_16ISSR =0;
this.Houses_Completed3_16AHP =0;
 this.Houses_Completed3_16BLCS =0;
 // `this.Bene2016_17_CLSS =0;
           this.Houses_Completed31_16ISSR =0;
this.HousesOccupied3_16AHP =0;
 this.HousesOccupied3_16BLCS =0;
 // this.Bene2016_17_CLSS =0;
             this.HousesOccupied31_16ISSR =0;
//-------------------

this.HouseInvolved4_17BLC  =0;
this.HouseInvolved4_17AHP =0;
//this.Bene2017_18_CLSS =0;
 this.HouseInvolved41_17ISSR =0;
this.FundsDisbursed_in_Houses4_17BLC =0;
this.FundsDisbursed_in_Houses4_17AHP =0;
//this.Bene2017_18_CLSS =0;
    this.FundsDisbursed_in_Houses41_17ISSR =0;
this.Houses_Grounded4_17AHP =0;
this.Houses_Grounded4_17BLC =0;
//this.Bene2017_18_CLSS =0;
    this.Houses_Grounded41_17ISSR =0;
this.Houses_Completed4_17BLC =0;
this.Houses_Completed4_17AHP =0;
//this.Bene2017_18_CLSS =0;
     this.Houses_Completed41_17ISSR =0;
this.HousesOccupied4_17AHP =0;
this.Houses_Completed4_17BLC =0;
//this.Bene2017_18_CLSS =0;
       this.HousesOccupied41_17ISSR =0;
//-------------------
// 18-19 
this.HouseInvolved5_18BLCS =0;
this.HouseInvolved5_18AHP =0;
//this.Bene2018_19_CLSS =0;
      this.HouseInvolved51_18ISSR =0;
this.FundsDisbursed_in_Houses5_18BLCS=0; 
this.FundsDisbursed_in_Houses5_18AHP  =0;
//this.Bene2018_19_CLSS =0;
   this.FundsDisbursed_in_Houses51_18ISSR=0;
this.Houses_Grounded5_18AHP =0;
this.Houses_Grounded5_18BLCS =0;
//this.Bene2018_19_CLSS =0;
      this.Houses_Grounded51_18ISSR =0;
this.Houses_Completed5_18AHP =0;
this.Houses_Completed5_18BLCS =0;
//this.Bene2018_19_CLSS =0;
        this.Houses_Completed51_18ISSR =0;
this.HousesOccupied5_18AHP =0;
this.HousesOccupied5_18BLCS =0;
//this.Bene2018_19_CLSS =0;
     this.HousesOccupied51_18ISSR =0;
//-------------------
// 19-20
//   this.HouseInvolved6  =this.HouseInvolved6_19BLC  +this.HouseInvolved6_19AHP + this.Bene2019_20_CLSS + this.HouseInvolved61_19ISSR;
this.HouseInvolved6_19BLC  =0;
this.HouseInvolved6_19AHP =0;
//this.Bene2019_20_CLSS =0;
   this.HouseInvolved61_19ISSR =0;
this.FundsDisbursed_in_Houses6_19BLC=0; 
this.FundsDisbursed_in_Houses6_19AHP =0;
//this.Bene2019_20_CLSS =0;
    this.FundsDisbursed_in_Houses61_19ISSR=0;
this.Houses_Grounded6_19BLC =0;
this.Houses_Grounded6_19AHP =0;
//this.Bene2019_20_CLSS =0;
     this.Houses_Grounded61_19ISSR=0;

this.Houses_Completed6_19BLC =0;
this.Houses_Completed6_19AHP =0;
//this.Bene2019_20_CLSS =0;
     this.Houses_Completed61_19ISSR=0;
this.HousesOccupied6_19BLC  =0;
this.HousesOccupied6_19AHP =0;
//this.Bene2019_20_CLSS =0;
       this.HousesOccupied61_19ISSR=0; 
//-------------------

    


       
 }


 
ResetVariables_JN()
{
  
       
  this.HouseInvolved114AHP  =0;
  this.HouseInvolved1B14 =0;
   this.Bene2014_15_CLSS =0;
   this.HouseInvolved1ISSR=0;
   
this.FundsDisbursed_in_Houses114AHP=0; 
this.FundsDisbursed_in_Houses1B14 =0;
this.Bene2014_15_CLSS =0;
  this.FundsDisbursed_ISSR_Houses1=0;

this.Houses_Grounded114AHP =0;
this.Houses_Grounded1B14 =0;
this.Bene2014_15_CLSS =0;
 //  this.Houses_GroundedJNG=0; 
        this.Houses_ISSRGrounded1=0;
this.Houses_Completed114AHP =0;
this.Houses_Completed1B14 =0;
  this.Bene2014_15_CLSS =0;
 //    this.Houses_CompletedJNC=0; 
         this.Houses_ISSRCompleted1=0;
this.HousesOccupied1B14  =0;
this.HousesOccupied114AHP =0;
this.Bene2014_15_CLSS =0;
// this.HousesOccupiedJNO =0;
      this.Houses_ISSROccupied1=0;


//---------------------------------------
 this.HouseInvolved2_15AHP =0;
 this.HouseInvolved2BLCS =0;
  this.Bene2015_16_CLSS =0;
            this.HouseInvolved21_ISSR_15 =0;
 this.FundsDisbursed_in_Houses2_15AHP =0;
 this.FundsDisbursed_in_Houses2BLCS =0;
   this.Bene2015_16_CLSS =0;
             this.FundsDisbursed_in_Houses21_ISSR_15=0;
 this.Houses_Grounded2_15AHP =0;
  this.Houses_Grounded2BLCS =0;
   this.Bene2015_16_CLSS=0;
             this.Houses_Grounded21_ISSR_15=0;
 this.Houses_Completed2_15AHP =0;
 this.Houses_Completed2BLCS =0;
   this.Bene2015_16_CLSS =0;
             this.Houses_Completed21_ISSR_15 =0;
 this.HousesOccupied2_15AHP =0;
  this.HousesOccupied2BLCS =0;
    this.Bene2015_16_CLSS =0;
               this.HousesOccupied21_ISSR_15=0;
//  -------------------
this.HouseInvolved3_16AHP =0;
this.HouseInvolved3_16BLCS =0;
this.Bene2016_17_CLSS =0;
     this.HouseInvolved31_16ISSR=0;
this.FundsDisbursed_in_Houses3_16AHP=0;
this.FundsDisbursed_in_Houses3_16BLCS =0;
this.Bene2016_17_CLSS =0;
      this.FundsDisbursed_in_Houses31_16ISSR =0;

this.Houses_Grounded3_16BLCS =0;
 this.Houses_Grounded3_16AHP =0;
  this.Bene2016_17_CLSS =0;
             this.Houses_Grounded31_16ISSR =0;
this.Houses_Completed3_16AHP =0;
 this.Houses_Completed3_16BLCS =0;
 this.Bene2016_17_CLSS =0;
            this.Houses_Completed31_16ISSR =0;
this.HousesOccupied3_16AHP =0;
 this.HousesOccupied3_16BLCS =0;
  this.Bene2016_17_CLSS =0;
             this.HousesOccupied31_16ISSR =0;
//-------------------

this.HouseInvolved4_17BLC  =0;
this.HouseInvolved4_17AHP =0;
this.Bene2017_18_CLSS =0;
     this.HouseInvolved41_17ISSR =0;
this.FundsDisbursed_in_Houses4_17BLC =0;
this.FundsDisbursed_in_Houses4_17AHP =0;
this.Bene2017_18_CLSS =0;
    this.FundsDisbursed_in_Houses41_17ISSR =0;
this.Houses_Grounded4_17AHP =0;
this.Houses_Grounded4_17BLC =0;
this.Bene2017_18_CLSS =0;
    this.Houses_Grounded41_17ISSR =0;
this.Houses_Completed4_17BLC =0;
this.Houses_Completed4_17AHP =0;
this.Bene2017_18_CLSS =0;
      this.Houses_Completed41_17ISSR =0;
this.HousesOccupied4_17AHP =0;
this.Houses_Completed4_17BLC =0;
this.Bene2017_18_CLSS =0;
       this.HousesOccupied41_17ISSR =0;
//-------------------
// 18-19 
this.HouseInvolved5_18BLCS =0;
this.HouseInvolved5_18AHP =0;
this.Bene2018_19_CLSS =0;
       this.HouseInvolved51_18ISSR =0;
this.FundsDisbursed_in_Houses5_18BLCS=0; 
this.FundsDisbursed_in_Houses5_18AHP  =0;
this.Bene2018_19_CLSS =0;
   this.FundsDisbursed_in_Houses51_18ISSR=0;
this.Houses_Grounded5_18AHP =0;
this.Houses_Grounded5_18BLCS =0;
this.Bene2018_19_CLSS =0;
       this.Houses_Grounded51_18ISSR =0;
this.Houses_Completed5_18AHP =0;
this.Houses_Completed5_18BLCS =0;
this.Bene2018_19_CLSS =0;
        this.Houses_Completed51_18ISSR =0;
this.HousesOccupied5_18AHP =0;
this.HousesOccupied5_18BLCS =0;
this.Bene2018_19_CLSS =0;
     this.HousesOccupied51_18ISSR =0;
//-------------------
// 19-20
//   this.HouseInvolved6  =this.HouseInvolved6_19BLC  +this.HouseInvolved6_19AHP + this.Bene2019_20_CLSS + this.HouseInvolved61_19ISSR;
this.HouseInvolved6_19BLC  =0;
this.HouseInvolved6_19AHP =0;
this.Bene2019_20_CLSS =0;
   this.HouseInvolved61_19ISSR =0;
this.FundsDisbursed_in_Houses6_19BLC=0; 
this.FundsDisbursed_in_Houses6_19AHP =0;
this.Bene2019_20_CLSS =0;
    this.FundsDisbursed_in_Houses61_19ISSR=0;
this.Houses_Grounded6_19BLC =0;
this.Houses_Grounded6_19AHP =0;
this.Bene2019_20_CLSS =0;
     this.Houses_Grounded61_19ISSR=0;

this.Houses_Completed6_19BLC =0;
this.Houses_Completed6_19AHP =0;
this.Bene2019_20_CLSS =0;
      this.Houses_Completed61_19ISSR=0;
this.HousesOccupied6_19BLC  =0;
this.HousesOccupied6_19AHP =0;
this.Bene2019_20_CLSS =0;
      this.HousesOccupied61_19ISSR=0; 
//-------------------

}
ResetVariables_ISSR()
{        
 
         this.HouseInvolved114AHP  =0;
           this.HouseInvolved1B14 =0;
            this.Bene2014_15_CLSS =0;
             
            
  this.FundsDisbursed_in_Houses114AHP=0; 
  this.FundsDisbursed_in_Houses1B14 =0;
   this.Bene2014_15_CLSS =0;
     // this.FundsDisbursed_ISSR_Houses1=0;
      
       this.Houses_Grounded114AHP =0;
        this.Houses_Grounded1B14 =0;
         this.Bene2014_15_CLSS =0;
           this.Houses_GroundedJNG=0; 
      //       this.Houses_ISSRGrounded1=0;
        this.Houses_Completed114AHP =0;
         this.Houses_Completed1B14 =0;
           this.Bene2014_15_CLSS =0;
             this.Houses_CompletedJNC=0; 
      //        this.Houses_ISSRCompleted1=0;
       this.HousesOccupied1B14  =0;
       this.HousesOccupied114AHP =0;
        this.Bene2014_15_CLSS =0;
          this.HousesOccupiedJNO =0;
       //     this.Houses_ISSROccupied1=0;

   
   //---------------------------------------
          this.HouseInvolved2_15AHP =0;
          this.HouseInvolved2BLCS =0;
           this.Bene2015_16_CLSS =0;
//           this.HouseInvolved21_ISSR_15 =0;
          this.FundsDisbursed_in_Houses2_15AHP =0;
          this.FundsDisbursed_in_Houses2BLCS =0;
            this.Bene2015_16_CLSS =0;
//            this.FundsDisbursed_in_Houses21_ISSR_15=0;
          this.Houses_Grounded2_15AHP =0;
           this.Houses_Grounded2BLCS =0;
            this.Bene2015_16_CLSS=0;
//            this.Houses_Grounded21_ISSR_15=0;
          this.Houses_Completed2_15AHP =0;
          this.Houses_Completed2BLCS =0;
            this.Bene2015_16_CLSS =0;
//            this.Houses_Completed21_ISSR_15 =0;
          this.HousesOccupied2_15AHP =0;
           this.HousesOccupied2BLCS =0;
             this.Bene2015_16_CLSS =0;
//              this.HousesOccupied21_ISSR_15=0;
  //  -------------------
 this.HouseInvolved3_16AHP =0;
  this.HouseInvolved3_16BLCS =0;
   this.Bene2016_17_CLSS =0;
//    this.HouseInvolved31_16ISSR=0;
   this.FundsDisbursed_in_Houses3_16AHP=0;
    this.FundsDisbursed_in_Houses3_16BLCS =0;
     this.Bene2016_17_CLSS =0;
//     this.FundsDisbursed_in_Houses31_16ISSR =0;

         this.Houses_Grounded3_16BLCS =0;
          this.Houses_Grounded3_16AHP =0;
           this.Bene2016_17_CLSS =0;
//            this.Houses_Grounded31_16ISSR =0;
         this.Houses_Completed3_16AHP =0;
          this.Houses_Completed3_16BLCS =0;
          this.Bene2016_17_CLSS =0;
//           this.Houses_Completed31_16ISSR =0;
         this.HousesOccupied3_16AHP =0;
          this.HousesOccupied3_16BLCS =0;
           this.Bene2016_17_CLSS =0;
//            this.HousesOccupied31_16ISSR =0;
    //-------------------
    
 this.HouseInvolved4_17BLC  =0;
  this.HouseInvolved4_17AHP =0;
   this.Bene2017_18_CLSS =0;
//    this.HouseInvolved41_17ISSR =0;
  this.FundsDisbursed_in_Houses4_17BLC =0;
  this.FundsDisbursed_in_Houses4_17AHP =0;
   this.Bene2017_18_CLSS =0;
//   this.FundsDisbursed_in_Houses41_17ISSR =0;
 this.Houses_Grounded4_17AHP =0;
 this.Houses_Grounded4_17BLC =0;
  this.Bene2017_18_CLSS =0;
//   this.Houses_Grounded41_17ISSR =0;
   this.Houses_Completed4_17BLC =0;
   this.Houses_Completed4_17AHP =0;
    this.Bene2017_18_CLSS =0;
//     this.Houses_Completed41_17ISSR =0;
   this.HousesOccupied4_17AHP =0;
    this.Houses_Completed4_17BLC =0;
     this.Bene2017_18_CLSS =0;
//      this.HousesOccupied41_17ISSR =0;
//-------------------
    // 18-19 
   this.HouseInvolved5_18BLCS =0;
    this.HouseInvolved5_18AHP =0;
     this.Bene2018_19_CLSS =0;
//      this.HouseInvolved51_18ISSR =0;
   this.FundsDisbursed_in_Houses5_18BLCS=0; 
   this.FundsDisbursed_in_Houses5_18AHP  =0;
    this.Bene2018_19_CLSS =0;
  //  this.FundsDisbursed_in_Houses51_18ISSR=0;
   this.Houses_Grounded5_18AHP =0;
    this.Houses_Grounded5_18BLCS =0;
     this.Bene2018_19_CLSS =0;
//      this.Houses_Grounded51_18ISSR =0;
   this.Houses_Completed5_18AHP =0;
    this.Houses_Completed5_18BLCS =0;
      this.Bene2018_19_CLSS =0;
//       this.Houses_Completed51_18ISSR =0;
  this.HousesOccupied5_18AHP =0;
   this.HousesOccupied5_18BLCS =0;
    this.Bene2018_19_CLSS =0;
 //    this.HousesOccupied51_18ISSR =0;
//-------------------
   // 19-20
//   this.HouseInvolved6  =this.HouseInvolved6_19BLC  +this.HouseInvolved6_19AHP + this.Bene2019_20_CLSS + this.HouseInvolved61_19ISSR;
 this.HouseInvolved6_19BLC  =0;
 this.HouseInvolved6_19AHP =0;
  this.Bene2019_20_CLSS =0;
 //  this.HouseInvolved61_19ISSR =0;
   this.FundsDisbursed_in_Houses6_19BLC=0; 
    this.FundsDisbursed_in_Houses6_19AHP =0;
     this.Bene2019_20_CLSS =0;
  //   this.FundsDisbursed_in_Houses61_19ISSR=0;
   this.Houses_Grounded6_19BLC =0;
    this.Houses_Grounded6_19AHP =0;
     this.Bene2019_20_CLSS =0;
  //    this.Houses_Grounded61_19ISSR=0;
  
      this.Houses_Completed6_19BLC =0;
   this.Houses_Completed6_19AHP =0;
    this.Bene2019_20_CLSS =0;
//     this.Houses_Completed61_19ISSR=0;
   this.HousesOccupied6_19BLC  =0;
    this.HousesOccupied6_19AHP =0;
     this.Bene2019_20_CLSS =0;
 //     this.HousesOccupied61_19ISSR=0; 
//-------------------
  

}

ResetVariables_AHP()
{
      // 14-15 Total  Houses_Grounded1
     
       
//  this.HouseInvolved114AHP  =0;
  this.HouseInvolved1B14 =0;
   this.Bene2014_15_CLSS =0;
   this.HouseInvolved1ISSR=0;
   
//this.FundsDisbursed_in_Houses114AHP=0; 
this.FundsDisbursed_in_Houses1B14 =0;
this.Bene2014_15_CLSS =0;
  this.FundsDisbursed_ISSR_Houses1=0;

//this.Houses_Grounded114AHP =0;
this.Houses_Grounded1B14 =0;
this.Bene2014_15_CLSS =0;
    this.Houses_GroundedJNG=0; 
        this.Houses_ISSRGrounded1=0;
//this.Houses_Completed114AHP =0;
this.Houses_Completed1B14 =0;
  this.Bene2014_15_CLSS =0;
      this.Houses_CompletedJNC=0; 
         this.Houses_ISSRCompleted1=0;
this.HousesOccupied1B14  =0;
//this.HousesOccupied114AHP =0;
this.Bene2014_15_CLSS =0;
 this.HousesOccupiedJNO =0;
      this.Houses_ISSROccupied1=0;


//---------------------------------------
// this.HouseInvolved2_15AHP =0;
 this.HouseInvolved2BLCS =0;
  this.Bene2015_16_CLSS =0;
            this.HouseInvolved21_ISSR_15 =0;
// this.FundsDisbursed_in_Houses2_15AHP =0;
 this.FundsDisbursed_in_Houses2BLCS =0;
   this.Bene2015_16_CLSS =0;
             this.FundsDisbursed_in_Houses21_ISSR_15=0;
// this.Houses_Grounded2_15AHP =0;
  this.Houses_Grounded2BLCS =0;
   this.Bene2015_16_CLSS=0;
             this.Houses_Grounded21_ISSR_15=0;
// this.Houses_Completed2_15AHP =0;
 this.Houses_Completed2BLCS =0;
   this.Bene2015_16_CLSS =0;
             this.Houses_Completed21_ISSR_15 =0;
// this.HousesOccupied2_15AHP =0;
  this.HousesOccupied2BLCS =0;
    this.Bene2015_16_CLSS =0;
               this.HousesOccupied21_ISSR_15=0;
//  -------------------
//this.HouseInvolved3_16AHP =0;
this.HouseInvolved3_16BLCS =0;
this.Bene2016_17_CLSS =0;
     this.HouseInvolved31_16ISSR=0;
//this.FundsDisbursed_in_Houses3_16AHP=0;
this.FundsDisbursed_in_Houses3_16BLCS =0;
this.Bene2016_17_CLSS =0;
      this.FundsDisbursed_in_Houses31_16ISSR =0;

this.Houses_Grounded3_16BLCS =0;
// this.Houses_Grounded3_16AHP =0;
  this.Bene2016_17_CLSS =0;
             this.Houses_Grounded31_16ISSR =0;
//this.Houses_Completed3_16AHP =0;
 this.Houses_Completed3_16BLCS =0;
 this.Bene2016_17_CLSS =0;
            this.Houses_Completed31_16ISSR =0;
//this.HousesOccupied3_16AHP =0;
 this.HousesOccupied3_16BLCS =0;
  this.Bene2016_17_CLSS =0;
             this.HousesOccupied31_16ISSR =0;
//-------------------

this.HouseInvolved4_17BLC  =0;
//this.HouseInvolved4_17AHP =0;
this.Bene2017_18_CLSS =0;
     this.HouseInvolved41_17ISSR =0;
this.FundsDisbursed_in_Houses4_17BLC =0;
//this.FundsDisbursed_in_Houses4_17AHP =0;
this.Bene2017_18_CLSS =0;
    this.FundsDisbursed_in_Houses41_17ISSR =0;
//this.Houses_Grounded4_17AHP =0;
this.Houses_Grounded4_17BLC =0;
this.Bene2017_18_CLSS =0;
    this.Houses_Grounded41_17ISSR =0;
this.Houses_Completed4_17BLC =0;
//this.Houses_Completed4_17AHP =0;
this.Bene2017_18_CLSS =0;
      this.Houses_Completed41_17ISSR =0;
//this.HousesOccupied4_17AHP =0;
this.Houses_Completed4_17BLC =0;
this.Bene2017_18_CLSS =0;
       this.HousesOccupied41_17ISSR =0;
//-------------------
// 18-19 
this.HouseInvolved5_18BLCS =0;
//this.HouseInvolved5_18AHP =0;
this.Bene2018_19_CLSS =0;
       this.HouseInvolved51_18ISSR =0;
this.FundsDisbursed_in_Houses5_18BLCS=0; 
//this.FundsDisbursed_in_Houses5_18AHP  =0;
this.Bene2018_19_CLSS =0;
   this.FundsDisbursed_in_Houses51_18ISSR=0;
//this.Houses_Grounded5_18AHP =0;
this.Houses_Grounded5_18BLCS =0;
this.Bene2018_19_CLSS =0;
       this.Houses_Grounded51_18ISSR =0;
//this.Houses_Completed5_18AHP =0;
this.Houses_Completed5_18BLCS =0;
this.Bene2018_19_CLSS =0;
        this.Houses_Completed51_18ISSR =0;
//this.HousesOccupied5_18AHP =0;
this.HousesOccupied5_18BLCS =0;
this.Bene2018_19_CLSS =0;
     this.HousesOccupied51_18ISSR =0;
//-------------------
// 19-20
this.HouseInvolved6_19BLC  =0;
//this.HouseInvolved6_19AHP =0;
this.Bene2019_20_CLSS =0;
   this.HouseInvolved61_19ISSR =0;
this.FundsDisbursed_in_Houses6_19BLC=0; 
//this.FundsDisbursed_in_Houses6_19AHP =0;
this.Bene2019_20_CLSS =0;
    this.FundsDisbursed_in_Houses61_19ISSR=0;
this.Houses_Grounded6_19BLC =0;
//this.Houses_Grounded6_19AHP =0;
this.Bene2019_20_CLSS =0;
     this.Houses_Grounded61_19ISSR=0;

this.Houses_Completed6_19BLC =0;
//this.Houses_Completed6_19AHP =0;
this.Bene2019_20_CLSS =0;
      this.Houses_Completed61_19ISSR=0;
this.HousesOccupied6_19BLC  =0;
//this.HousesOccupied6_19AHP =0;
this.Bene2019_20_CLSS =0;
      this.HousesOccupied61_19ISSR=0; 
//-------------------  
}

ResetVariables_BLC()
{
      // 14-15 Total  Houses_Grounded1
     
  this.HouseInvolved114AHP  =0;
//this.HouseInvolved1B14 =0;
this.Bene2014_15_CLSS =0;
this.HouseInvolved1ISSR=0;

this.FundsDisbursed_in_Houses114AHP=0; 
//this.FundsDisbursed_in_Houses1B14 =0;
this.Bene2014_15_CLSS =0;
this.FundsDisbursed_ISSR_Houses1=0;

this.Houses_Grounded114AHP =0;
//this.Houses_Grounded1B14 =0;
this.Bene2014_15_CLSS =0;
 this.Houses_GroundedJNG=0; 
     this.Houses_ISSRGrounded1=0;
this.Houses_Completed114AHP =0;
//this.Houses_Completed1B14 =0;
this.Bene2014_15_CLSS =0;
   this.Houses_CompletedJNC=0; 
      this.Houses_ISSRCompleted1=0;
//this.HousesOccupied1B14  =0;
this.HousesOccupied114AHP =0;
this.Bene2014_15_CLSS =0;
this.HousesOccupiedJNO =0;
   this.Houses_ISSROccupied1=0;


//---------------------------------------
 this.HouseInvolved2_15AHP =0;
//this.HouseInvolved2BLCS =0;
this.Bene2015_16_CLSS =0;
         this.HouseInvolved21_ISSR_15 =0;
 this.FundsDisbursed_in_Houses2_15AHP =0;
//this.FundsDisbursed_in_Houses2BLCS =0;
this.Bene2015_16_CLSS =0;
          this.FundsDisbursed_in_Houses21_ISSR_15=0;
 this.Houses_Grounded2_15AHP =0;
//this.Houses_Grounded2BLCS =0;
this.Bene2015_16_CLSS=0;
          this.Houses_Grounded21_ISSR_15=0;
 this.Houses_Completed2_15AHP =0;
//this.Houses_Completed2BLCS =0;
this.Bene2015_16_CLSS =0;
          this.Houses_Completed21_ISSR_15 =0;
 this.HousesOccupied2_15AHP =0;
//this.HousesOccupied2BLCS =0;
 this.Bene2015_16_CLSS =0;
            this.HousesOccupied21_ISSR_15=0;
//  -------------------
this.HouseInvolved3_16AHP =0;
//this.HouseInvolved3_16BLCS =0;
this.Bene2016_17_CLSS =0;
  this.HouseInvolved31_16ISSR=0;
this.FundsDisbursed_in_Houses3_16AHP=0;
//this.FundsDisbursed_in_Houses3_16BLCS =0;
this.Bene2016_17_CLSS =0;
   this.FundsDisbursed_in_Houses31_16ISSR =0;

//this.Houses_Grounded3_16BLCS =0;
 this.Houses_Grounded3_16AHP =0;
this.Bene2016_17_CLSS =0;
          this.Houses_Grounded31_16ISSR =0;
this.Houses_Completed3_16AHP =0;
//this.Houses_Completed3_16BLCS =0;
this.Bene2016_17_CLSS =0;
         this.Houses_Completed31_16ISSR =0;
this.HousesOccupied3_16AHP =0;
//this.HousesOccupied3_16BLCS =0;
this.Bene2016_17_CLSS =0;
          this.HousesOccupied31_16ISSR =0;
//-------------------

//this.HouseInvolved4_17BLC  =0;
this.HouseInvolved4_17AHP =0;
this.Bene2017_18_CLSS =0;
  this.HouseInvolved41_17ISSR =0;
//this.FundsDisbursed_in_Houses4_17BLC =0;
this.FundsDisbursed_in_Houses4_17AHP =0;
this.Bene2017_18_CLSS =0;
 this.FundsDisbursed_in_Houses41_17ISSR =0;
this.Houses_Grounded4_17AHP =0;
//this.Houses_Grounded4_17BLC =0;
this.Bene2017_18_CLSS =0;
 this.Houses_Grounded41_17ISSR =0;
//this.Houses_Completed4_17BLC =0;
this.Houses_Completed4_17AHP =0;
this.Bene2017_18_CLSS =0;
   this.Houses_Completed41_17ISSR =0;
this.HousesOccupied4_17AHP =0;
//this.Houses_Completed4_17BLC =0;
this.Bene2017_18_CLSS =0;
    this.HousesOccupied41_17ISSR =0;
//-------------------
// 18-19 
//this.HouseInvolved5_18BLCS =0;
this.HouseInvolved5_18AHP =0;
this.Bene2018_19_CLSS =0;
    this.HouseInvolved51_18ISSR =0;
//this.FundsDisbursed_in_Houses5_18BLCS=0; 
this.FundsDisbursed_in_Houses5_18AHP  =0;
this.Bene2018_19_CLSS =0;
this.FundsDisbursed_in_Houses51_18ISSR=0;
this.Houses_Grounded5_18AHP =0;
//this.Houses_Grounded5_18BLCS =0;
this.Bene2018_19_CLSS =0;
    this.Houses_Grounded51_18ISSR =0;
this.Houses_Completed5_18AHP =0;
//this.Houses_Completed5_18BLCS =0;
this.Bene2018_19_CLSS =0;
     this.Houses_Completed51_18ISSR =0;
this.HousesOccupied5_18AHP =0;
//this.HousesOccupied5_18BLCS =0;
this.Bene2018_19_CLSS =0;
  this.HousesOccupied51_18ISSR =0;
//-------------------
// 19-20
//   this.HouseInvolved6  =this.HouseInvolved6_19BLC  +this.HouseInvolved6_19AHP + this.Bene2019_20_CLSS + this.HouseInvolved61_19ISSR;
//this.HouseInvolved6_19BLC  =0;
this.HouseInvolved6_19AHP =0;
this.Bene2019_20_CLSS =0;
this.HouseInvolved61_19ISSR =0;
//this.FundsDisbursed_in_Houses6_19BLC=0; 
this.FundsDisbursed_in_Houses6_19AHP =0;
this.Bene2019_20_CLSS =0;
 this.FundsDisbursed_in_Houses61_19ISSR=0;
//this.Houses_Grounded6_19BLC =0;
this.Houses_Grounded6_19AHP =0;
this.Bene2019_20_CLSS =0;
  this.Houses_Grounded61_19ISSR=0;

  // this.Houses_Completed3_16AHP 
  // this.Houses_Completed3_16BLCS
  // this.Bene2016_17_CLSS 
  //  this.Houses_Completed31_16ISSR;
  

//this.Houses_Completed6_19BLC =0;
this.Houses_Completed6_19AHP =0;
this.Bene2019_20_CLSS =0;
   this.Houses_Completed61_19ISSR=0;
//this.HousesOccupied6_19BLC  =0;
this.HousesOccupied6_19AHP =0;
this.Bene2019_20_CLSS =0;
   this.HousesOccupied61_19ISSR=0; 
   
//-------------------  

       

}
ResetVariables_CLSS_BLC()
{
  this.HouseInvolved114AHP  =0;
  //this.HouseInvolved1B14 =0;
 // this.Bene2014_15_CLSS =0;
  this.HouseInvolved1ISSR=0;
  
  this.FundsDisbursed_in_Houses114AHP=0; 
  //this.FundsDisbursed_in_Houses1B14 =0;
 // this.Bene2014_15_CLSS =0;
  this.FundsDisbursed_ISSR_Houses1=0;
  
  this.Houses_Grounded114AHP =0;
  //this.Houses_Grounded1B14 =0;
  //this.Bene2014_15_CLSS =0;
   this.Houses_GroundedJNG=0; 
       this.Houses_ISSRGrounded1=0;
  this.Houses_Completed114AHP =0;
  //this.Houses_Completed1B14 =0;
  //this.Bene2014_15_CLSS =0;
     this.Houses_CompletedJNC=0; 
        this.Houses_ISSRCompleted1=0;
  //this.HousesOccupied1B14  =0;
  this.HousesOccupied114AHP =0;
  //this.Bene2014_15_CLSS =0;
  this.HousesOccupiedJNO =0;
     this.Houses_ISSROccupied1=0;
  
  
  //---------------------------------------
   this.HouseInvolved2_15AHP =0;
  //this.HouseInvolved2BLCS =0;
  //this.Bene2015_16_CLSS =0;
           this.HouseInvolved21_ISSR_15 =0;
   this.FundsDisbursed_in_Houses2_15AHP =0;
  //this.FundsDisbursed_in_Houses2BLCS =0;
  //this.Bene2015_16_CLSS =0;
            this.FundsDisbursed_in_Houses21_ISSR_15=0;
   this.Houses_Grounded2_15AHP =0;
  //this.Houses_Grounded2BLCS =0;
  //this.Bene2015_16_CLSS=0;
            this.Houses_Grounded21_ISSR_15=0;
   this.Houses_Completed2_15AHP =0;
  //this.Houses_Completed2BLCS =0;
  //this.Bene2015_16_CLSS =0;
            this.Houses_Completed21_ISSR_15 =0;
   this.HousesOccupied2_15AHP =0;
  //this.HousesOccupied2BLCS =0;
  // this.Bene2015_16_CLSS =0;
              this.HousesOccupied21_ISSR_15=0;
  //  -------------------
  this.HouseInvolved3_16AHP =0;
  //this.HouseInvolved3_16BLCS =0;
  //this.Bene2016_17_CLSS =0;
    this.HouseInvolved31_16ISSR=0;
  this.FundsDisbursed_in_Houses3_16AHP=0;
  //this.FundsDisbursed_in_Houses3_16BLCS =0;
  //this.Bene2016_17_CLSS =0;
     this.FundsDisbursed_in_Houses31_16ISSR =0;
  
  //this.Houses_Grounded3_16BLCS =0;
   this.Houses_Grounded3_16AHP =0;
  //this.Bene2016_17_CLSS =0;
            this.Houses_Grounded31_16ISSR =0;
  this.Houses_Completed3_16AHP =0;
  //this.Houses_Completed3_16BLCS =0;
  //this.Bene2016_17_CLSS =0;
           this.Houses_Completed31_16ISSR =0;
  this.HousesOccupied3_16AHP =0;
  //this.HousesOccupied3_16BLCS =0;
  //this.Bene2016_17_CLSS =0;
            this.HousesOccupied31_16ISSR =0;
  //-------------------
  
  //this.HouseInvolved4_17BLC  =0;
  this.HouseInvolved4_17AHP =0;
  //this.Bene2017_18_CLSS =0;
    this.HouseInvolved41_17ISSR =0;
  //this.FundsDisbursed_in_Houses4_17BLC =0;
  this.FundsDisbursed_in_Houses4_17AHP =0;
  //this.Bene2017_18_CLSS =0;
   this.FundsDisbursed_in_Houses41_17ISSR =0;
  this.Houses_Grounded4_17AHP =0;
  //this.Houses_Grounded4_17BLC =0;
 // this.Bene2017_18_CLSS =0;
   this.Houses_Grounded41_17ISSR =0;
  //this.Houses_Completed4_17BLC =0;
  this.Houses_Completed4_17AHP =0;
  //this.Bene2017_18_CLSS =0;
     this.Houses_Completed41_17ISSR =0;
  this.HousesOccupied4_17AHP =0;
  //this.Houses_Completed4_17BLC =0;
  //this.Bene2017_18_CLSS =0;
      this.HousesOccupied41_17ISSR =0;
  //-------------------
  // 18-19 
  //this.HouseInvolved5_18BLCS =0;
  this.HouseInvolved5_18AHP =0;
  //this.Bene2018_19_CLSS =0;
      this.HouseInvolved51_18ISSR =0;
  //this.FundsDisbursed_in_Houses5_18BLCS=0; 
  this.FundsDisbursed_in_Houses5_18AHP  =0;
  //this.Bene2018_19_CLSS =0;
  this.FundsDisbursed_in_Houses51_18ISSR=0;
  this.Houses_Grounded5_18AHP =0;
  //this.Houses_Grounded5_18BLCS =0;
  this.Bene2018_19_CLSS =0;
      this.Houses_Grounded51_18ISSR =0;
  this.Houses_Completed5_18AHP =0;
  //this.Houses_Completed5_18BLCS =0;
  //this.Bene2018_19_CLSS =0;
       this.Houses_Completed51_18ISSR =0;
  this.HousesOccupied5_18AHP =0;
  //this.HousesOccupied5_18BLCS =0;
  //this.Bene2018_19_CLSS =0;
    this.HousesOccupied51_18ISSR =0;
  //-------------------
  // 19-20
  //   this.HouseInvolved6  =this.HouseInvolved6_19BLC  +this.HouseInvolved6_19AHP + this.Bene2019_20_CLSS + this.HouseInvolved61_19ISSR;
  //this.HouseInvolved6_19BLC  =0;
  this.HouseInvolved6_19AHP =0;
  //this.Bene2019_20_CLSS =0;
  this.HouseInvolved61_19ISSR =0;
  //this.FundsDisbursed_in_Houses6_19BLC=0; 
  this.FundsDisbursed_in_Houses6_19AHP =0;
  //this.Bene2019_20_CLSS =0;
   this.FundsDisbursed_in_Houses61_19ISSR=0;
  //this.Houses_Grounded6_19BLC =0;
  this.Houses_Grounded6_19AHP =0;
  //this.Bene2019_20_CLSS =0;
    this.Houses_Grounded61_19ISSR=0;
  
    // this.Houses_Completed3_16AHP 
    // this.Houses_Completed3_16BLCS
    // this.Bene2016_17_CLSS 
    //  this.Houses_Completed31_16ISSR;
    
  
  //this.Houses_Completed6_19BLC =0;
  this.Houses_Completed6_19AHP =0;
  //this.Bene2019_20_CLSS =0;
     this.Houses_Completed61_19ISSR=0;
  //this.HousesOccupied6_19BLC  =0;
  this.HousesOccupied6_19AHP =0;
  //this.Bene2019_20_CLSS =0;
     this.HousesOccupied61_19ISSR=0; 
  //-------------------  

}

ResetVariables_CLSS_JNNURM()
{
      
   
     //this.Bene2014_15_CLSS 
     this.HouseInvolved1ISSR =0;// +this.Bene2014_15_CLSS;

     this.HouseInvolved114AHP  =0;
     this.HouseInvolved1B14 =0;
   //   this.Bene2014_15_CLSS =0;
       
      
   this.FundsDisbursed_in_Houses114AHP=0; 
   this.FundsDisbursed_in_Houses1B14 =0;
   //this.Bene2014_15_CLSS =0;
    this.FundsDisbursed_ISSR_Houses1=0;
   
   this.Houses_Grounded114AHP =0;
   this.Houses_Grounded1B14 =0;
   //this.Bene2014_15_CLSS =0;
   //  this.Houses_GroundedJNG=0; 
            this.Houses_ISSRGrounded1=0;
   this.Houses_Completed114AHP =0;
   this.Houses_Completed1B14 =0;
   //  this.Bene2014_15_CLSS =0;
    //   this.Houses_CompletedJNC=0; 
           this.Houses_ISSRCompleted1=0;
   this.HousesOccupied1B14  =0;
   this.HousesOccupied114AHP =0;
   //this.Bene2014_15_CLSS =0;
    //this.HousesOccupiedJNO =0;
        this.Houses_ISSROccupied1=0;
   
   
   //---------------------------------------
    this.HouseInvolved2_15AHP =0;
    this.HouseInvolved2BLCS =0;
   //  this.Bene2015_16_CLSS =0;
              this.HouseInvolved21_ISSR_15 =0;
    this.FundsDisbursed_in_Houses2_15AHP =0;
    this.FundsDisbursed_in_Houses2BLCS =0;
   //   this.Bene2015_16_CLSS =0;
               this.FundsDisbursed_in_Houses21_ISSR_15=0;
    this.Houses_Grounded2_15AHP =0;
     this.Houses_Grounded2BLCS =0;
   //   this.Bene2015_16_CLSS=0;
               this.Houses_Grounded21_ISSR_15=0;
    this.Houses_Completed2_15AHP =0;
    this.Houses_Completed2BLCS =0;
   //   this.Bene2015_16_CLSS =0;
               this.Houses_Completed21_ISSR_15 =0;
    this.HousesOccupied2_15AHP =0;
     this.HousesOccupied2BLCS =0;
   //    this.Bene2015_16_CLSS =0;
                 this.HousesOccupied21_ISSR_15=0;
   //  -------------------
   this.HouseInvolved3_16AHP =0;
   this.HouseInvolved3_16BLCS =0;
   //this.Bene2016_17_CLSS =0;
       this.HouseInvolved31_16ISSR=0;
   this.FundsDisbursed_in_Houses3_16AHP=0;
   this.FundsDisbursed_in_Houses3_16BLCS =0;
   //this.Bene2016_17_CLSS =0;
        this.FundsDisbursed_in_Houses31_16ISSR =0;
   
   this.Houses_Grounded3_16BLCS =0;
    this.Houses_Grounded3_16AHP =0;
    // this.Bene2016_17_CLSS =0;
               this.Houses_Grounded31_16ISSR =0;
   this.Houses_Completed3_16AHP =0;
    this.Houses_Completed3_16BLCS =0;
    // `this.Bene2016_17_CLSS =0;
              this.Houses_Completed31_16ISSR =0;
   this.HousesOccupied3_16AHP =0;
    this.HousesOccupied3_16BLCS =0;
    // this.Bene2016_17_CLSS =0;
                this.HousesOccupied31_16ISSR =0;
   //-------------------
   
   this.HouseInvolved4_17BLC  =0;
   this.HouseInvolved4_17AHP =0;
   //this.Bene2017_18_CLSS =0;
    this.HouseInvolved41_17ISSR =0;
   this.FundsDisbursed_in_Houses4_17BLC =0;
   this.FundsDisbursed_in_Houses4_17AHP =0;
   //this.Bene2017_18_CLSS =0;
       this.FundsDisbursed_in_Houses41_17ISSR =0;
   this.Houses_Grounded4_17AHP =0;
   this.Houses_Grounded4_17BLC =0;
   //this.Bene2017_18_CLSS =0;
       this.Houses_Grounded41_17ISSR =0;
   this.Houses_Completed4_17BLC =0;
   this.Houses_Completed4_17AHP =0;
   //this.Bene2017_18_CLSS =0;
        this.Houses_Completed41_17ISSR =0;
   this.HousesOccupied4_17AHP =0;
   this.Houses_Completed4_17BLC =0;
   //this.Bene2017_18_CLSS =0;
          this.HousesOccupied41_17ISSR =0;
   //-------------------
   // 18-19 
   this.HouseInvolved5_18BLCS =0;
   this.HouseInvolved5_18AHP =0;
   //this.Bene2018_19_CLSS =0;
         this.HouseInvolved51_18ISSR =0;
   this.FundsDisbursed_in_Houses5_18BLCS=0; 
   this.FundsDisbursed_in_Houses5_18AHP  =0;
   //this.Bene2018_19_CLSS =0;
      this.FundsDisbursed_in_Houses51_18ISSR=0;
   this.Houses_Grounded5_18AHP =0;
   this.Houses_Grounded5_18BLCS =0;
   //this.Bene2018_19_CLSS =0;
         this.Houses_Grounded51_18ISSR =0;
   this.Houses_Completed5_18AHP =0;
   this.Houses_Completed5_18BLCS =0;
   //this.Bene2018_19_CLSS =0;
           this.Houses_Completed51_18ISSR =0;
   this.HousesOccupied5_18AHP =0;
   this.HousesOccupied5_18BLCS =0;
   //this.Bene2018_19_CLSS =0;
        this.HousesOccupied51_18ISSR =0;
   //-------------------
   // 19-20
   //   this.HouseInvolved6  =this.HouseInvolved6_19BLC  +this.HouseInvolved6_19AHP + this.Bene2019_20_CLSS + this.HouseInvolved61_19ISSR;
   this.HouseInvolved6_19BLC  =0;
   this.HouseInvolved6_19AHP =0;
   //this.Bene2019_20_CLSS =0;
      this.HouseInvolved61_19ISSR =0;
   this.FundsDisbursed_in_Houses6_19BLC=0; 
   this.FundsDisbursed_in_Houses6_19AHP =0;
   //this.Bene2019_20_CLSS =0;
       this.FundsDisbursed_in_Houses61_19ISSR=0;
   this.Houses_Grounded6_19BLC =0;
   this.Houses_Grounded6_19AHP =0;
   //this.Bene2019_20_CLSS =0;
        this.Houses_Grounded61_19ISSR=0;
   
   this.Houses_Completed6_19BLC =0;
   this.Houses_Completed6_19AHP =0;
   //this.Bene2019_20_CLSS =0;
        this.Houses_Completed61_19ISSR=0;
   this.HousesOccupied6_19BLC  =0;
   this.HousesOccupied6_19AHP =0;
   //this.Bene2019_20_CLSS =0;
          this.HousesOccupied61_19ISSR=0; 
   //-------------------
}

ResetVariables_CLSS_AHP()
{
 //this.Bene2014_15_CLSS 
 this.HouseInvolved1ISSR =0;// +this.Bene2014_15_CLSS;

 //this.HouseInvolved114AHP  =0;
 this.HouseInvolved1B14 =0;
//   this.Bene2014_15_CLSS =0;
   
  
//this.FundsDisbursed_in_Houses114AHP=0; 
this.FundsDisbursed_in_Houses1B14 =0;
//this.Bene2014_15_CLSS =0;
this.FundsDisbursed_ISSR_Houses1=0;

//this.Houses_Grounded114AHP =0;
this.Houses_Grounded1B14 =0;
//this.Bene2014_15_CLSS =0;
 this.Houses_GroundedJNG=0; 
 
 this.Houses_ISSRGrounded1=0;
//this.Houses_Completed114AHP =0;
this.Houses_Completed1B14 =0;
//  this.Bene2014_15_CLSS =0;

this.Houses_CompletedJNC=0; 
       this.Houses_ISSRCompleted1=0;
this.HousesOccupied1B14  =0;
//this.HousesOccupied114AHP =0;
//this.Bene2014_15_CLSS =0;
this.HousesOccupiedJNO =0;
    this.Houses_ISSROccupied1=0;


//---------------------------------------
//this.HouseInvolved2_15AHP =0;
this.HouseInvolved2BLCS =0;
//  this.Bene2015_16_CLSS =0;
          this.HouseInvolved21_ISSR_15 =0;
//this.FundsDisbursed_in_Houses2_15AHP =0;
this.FundsDisbursed_in_Houses2BLCS =0;
//   this.Bene2015_16_CLSS =0;
           this.FundsDisbursed_in_Houses21_ISSR_15=0;
this.Houses_Grounded2_15AHP =0;
 this.Houses_Grounded2BLCS =0;
//   this.Bene2015_16_CLSS=0;
           this.Houses_Grounded21_ISSR_15=0;
//this.Houses_Completed2_15AHP =0;
this.Houses_Completed2BLCS =0;
//   this.Bene2015_16_CLSS =0;
           this.Houses_Completed21_ISSR_15 =0;
//this.HousesOccupied2_15AHP =0;
 this.HousesOccupied2BLCS =0;
//    this.Bene2015_16_CLSS =0;
             this.HousesOccupied21_ISSR_15=0;
//  -------------------
//this.HouseInvolved3_16AHP =0;
this.HouseInvolved3_16BLCS =0;
//this.Bene2016_17_CLSS =0;
   this.HouseInvolved31_16ISSR=0;
//this.FundsDisbursed_in_Houses3_16AHP=0;
this.FundsDisbursed_in_Houses3_16BLCS =0;
//this.Bene2016_17_CLSS =0;
    this.FundsDisbursed_in_Houses31_16ISSR =0;

this.Houses_Grounded3_16BLCS =0;
//this.Houses_Grounded3_16AHP =0;
// this.Bene2016_17_CLSS =0;
           this.Houses_Grounded31_16ISSR =0;
//this.Houses_Completed3_16AHP =0;
this.Houses_Completed3_16BLCS =0;
// `this.Bene2016_17_CLSS =0;
          this.Houses_Completed31_16ISSR =0;
//this.HousesOccupied3_16AHP =0;
this.HousesOccupied3_16BLCS =0;
// this.Bene2016_17_CLSS =0;
            this.HousesOccupied31_16ISSR =0;
//-------------------

this.HouseInvolved4_17BLC  =0;
//this.HouseInvolved4_17AHP =0;
//this.Bene2017_18_CLSS =0;
this.HouseInvolved41_17ISSR =0;
this.FundsDisbursed_in_Houses4_17BLC =0;
//this.FundsDisbursed_in_Houses4_17AHP =0;
//this.Bene2017_18_CLSS =0;
   this.FundsDisbursed_in_Houses41_17ISSR =0;
//this.Houses_Grounded4_17AHP =0;
this.Houses_Grounded4_17BLC =0;
//this.Bene2017_18_CLSS =0;
   this.Houses_Grounded41_17ISSR =0;
this.Houses_Completed4_17BLC =0;
//this.Houses_Completed4_17AHP =0;
//this.Bene2017_18_CLSS =0;
    this.Houses_Completed41_17ISSR =0;
//this.HousesOccupied4_17AHP =0;
this.Houses_Completed4_17BLC =0;
//this.Bene2017_18_CLSS =0;
      this.HousesOccupied41_17ISSR =0;
//-------------------
// 18-19 
this.HouseInvolved5_18BLCS =0;
//this.HouseInvolved5_18AHP =0;
//this.Bene2018_19_CLSS =0;
     this.HouseInvolved51_18ISSR =0;
this.FundsDisbursed_in_Houses5_18BLCS=0; 
//this.FundsDisbursed_in_Houses5_18AHP  =0;
//this.Bene2018_19_CLSS =0;
  this.FundsDisbursed_in_Houses51_18ISSR=0;
//this.Houses_Grounded5_18AHP =0;
this.Houses_Grounded5_18BLCS =0;
//this.Bene2018_19_CLSS =0;
     this.Houses_Grounded51_18ISSR =0;
//this.Houses_Completed5_18AHP =0;
this.Houses_Completed5_18BLCS =0;
//this.Bene2018_19_CLSS =0;
       this.Houses_Completed51_18ISSR =0;
//this.HousesOccupied5_18AHP =0;
this.HousesOccupied5_18BLCS =0;
//this.Bene2018_19_CLSS =0;
    this.HousesOccupied51_18ISSR =0;
//-------------------
// 19-20
//   this.HouseInvolved6  =this.HouseInvolved6_19BLC  +this.HouseInvolved6_19AHP + this.Bene2019_20_CLSS + this.HouseInvolved61_19ISSR;
this.HouseInvolved6_19BLC  =0;
//this.HouseInvolved6_19AHP =0;
//this.Bene2019_20_CLSS =0;
  this.HouseInvolved61_19ISSR =0;
this.FundsDisbursed_in_Houses6_19BLC=0; 
//this.FundsDisbursed_in_Houses6_19AHP =0;
//this.Bene2019_20_CLSS =0;
   this.FundsDisbursed_in_Houses61_19ISSR=0;
this.Houses_Grounded6_19BLC =0;
//this.Houses_Grounded6_19AHP =0;
//this.Bene2019_20_CLSS =0;
    this.Houses_Grounded61_19ISSR=0;

this.Houses_Completed6_19BLC =0;
//this.Houses_Completed6_19AHP =0;
//this.Bene2019_20_CLSS =0;
    this.Houses_Completed61_19ISSR=0;
this.HousesOccupied6_19BLC  =0;
//this.HousesOccupied6_19AHP =0;
//this.Bene2019_20_CLSS =0;
      this.HousesOccupied61_19ISSR=0; 
//-------------------
}

ResetVariables_clss_issrtest()
{
     //this.Bene2014_15_CLSS 
     this.HouseInvolved1ISSR =0;// +this.Bene2014_15_CLSS;

     this.HouseInvolved114AHP  =0;
     this.HouseInvolved1B14 =0;
   //   this.Bene2014_15_CLSS =0;
       
      
   this.FundsDisbursed_in_Houses114AHP=0; 
   this.FundsDisbursed_in_Houses1B14 =0;
   //this.Bene2014_15_CLSS =0;
    this.FundsDisbursed_ISSR_Houses1=0;
   
   this.Houses_Grounded114AHP =0;
   this.Houses_Grounded1B14 =0;
   //this.Bene2014_15_CLSS =0;
     this.Houses_GroundedJNG=0; 
            this.Houses_ISSRGrounded1=0;
   this.Houses_Completed114AHP =0;
   this.Houses_Completed1B14 =0;
   //  this.Bene2014_15_CLSS =0;
       this.Houses_CompletedJNC=0; 
           this.Houses_ISSRCompleted1=0;
   this.HousesOccupied1B14  =0;
   this.HousesOccupied114AHP =0;
   //this.Bene2014_15_CLSS =0;
    this.HousesOccupiedJNO =0;
        this.Houses_ISSROccupied1=0;
   
   
   //---------------------------------------
    this.HouseInvolved2_15AHP =0;
    this.HouseInvolved2BLCS =0;
   //  this.Bene2015_16_CLSS =0;
              this.HouseInvolved21_ISSR_15 =0;
    this.FundsDisbursed_in_Houses2_15AHP =0;
    this.FundsDisbursed_in_Houses2BLCS =0;
   //   this.Bene2015_16_CLSS =0;
               this.FundsDisbursed_in_Houses21_ISSR_15=0;
    this.Houses_Grounded2_15AHP =0;
     this.Houses_Grounded2BLCS =0;
   //   this.Bene2015_16_CLSS=0;
               this.Houses_Grounded21_ISSR_15=0;
    this.Houses_Completed2_15AHP =0;
    this.Houses_Completed2BLCS =0;
   //   this.Bene2015_16_CLSS =0;
               this.Houses_Completed21_ISSR_15 =0;
    this.HousesOccupied2_15AHP =0;
     this.HousesOccupied2BLCS =0;
   //    this.Bene2015_16_CLSS =0;
                 this.HousesOccupied21_ISSR_15=0;
   //  -------------------
   this.HouseInvolved3_16AHP =0;
   this.HouseInvolved3_16BLCS =0;
   //this.Bene2016_17_CLSS =0;
       this.HouseInvolved31_16ISSR=0;
   this.FundsDisbursed_in_Houses3_16AHP=0;
   this.FundsDisbursed_in_Houses3_16BLCS =0;
   //this.Bene2016_17_CLSS =0;
        this.FundsDisbursed_in_Houses31_16ISSR =0;
   
   this.Houses_Grounded3_16BLCS =0;
    this.Houses_Grounded3_16AHP =0;
    // this.Bene2016_17_CLSS =0;
               this.Houses_Grounded31_16ISSR =0;
   this.Houses_Completed3_16AHP =0;
    this.Houses_Completed3_16BLCS =0;
    // `this.Bene2016_17_CLSS =0;
              this.Houses_Completed31_16ISSR =0;
   this.HousesOccupied3_16AHP =0;
    this.HousesOccupied3_16BLCS =0;
    // this.Bene2016_17_CLSS =0;
                this.HousesOccupied31_16ISSR =0;
   //-------------------
   
   this.HouseInvolved4_17BLC  =0;
   this.HouseInvolved4_17AHP =0;
   //this.Bene2017_18_CLSS =0;
    this.HouseInvolved41_17ISSR =0;
   this.FundsDisbursed_in_Houses4_17BLC =0;
   this.FundsDisbursed_in_Houses4_17AHP =0;
   //this.Bene2017_18_CLSS =0;
       this.FundsDisbursed_in_Houses41_17ISSR =0;
   this.Houses_Grounded4_17AHP =0;
   this.Houses_Grounded4_17BLC =0;
   //this.Bene2017_18_CLSS =0;
       this.Houses_Grounded41_17ISSR =0;
   this.Houses_Completed4_17BLC =0;
   this.Houses_Completed4_17AHP =0;
   //this.Bene2017_18_CLSS =0;
        this.Houses_Completed41_17ISSR =0;
   this.HousesOccupied4_17AHP =0;
   this.Houses_Completed4_17BLC =0;
   //this.Bene2017_18_CLSS =0;
          this.HousesOccupied41_17ISSR =0;
   //-------------------
   // 18-19 
   this.HouseInvolved5_18BLCS =0;
   this.HouseInvolved5_18AHP =0;
   //this.Bene2018_19_CLSS =0;
         this.HouseInvolved51_18ISSR =0;
   this.FundsDisbursed_in_Houses5_18BLCS=0; 
   this.FundsDisbursed_in_Houses5_18AHP  =0;
   //this.Bene2018_19_CLSS =0;
      this.FundsDisbursed_in_Houses51_18ISSR=0;
   this.Houses_Grounded5_18AHP =0;
   this.Houses_Grounded5_18BLCS =0;
   //this.Bene2018_19_CLSS =0;
         this.Houses_Grounded51_18ISSR =0;
   this.Houses_Completed5_18AHP =0;
   this.Houses_Completed5_18BLCS =0;
   //this.Bene2018_19_CLSS =0;
           this.Houses_Completed51_18ISSR =0;
   this.HousesOccupied5_18AHP =0;
   this.HousesOccupied5_18BLCS =0;
   //this.Bene2018_19_CLSS =0;
        this.HousesOccupied51_18ISSR =0;
   //-------------------
   // 19-20
   //   this.HouseInvolved6  =this.HouseInvolved6_19BLC  +this.HouseInvolved6_19AHP + this.Bene2019_20_CLSS + this.HouseInvolved61_19ISSR;
   this.HouseInvolved6_19BLC  =0;
   this.HouseInvolved6_19AHP =0;
   //this.Bene2019_20_CLSS =0;
      this.HouseInvolved61_19ISSR =0;
   this.FundsDisbursed_in_Houses6_19BLC=0; 
   this.FundsDisbursed_in_Houses6_19AHP =0;
   //this.Bene2019_20_CLSS =0;
       this.FundsDisbursed_in_Houses61_19ISSR=0;
   this.Houses_Grounded6_19BLC =0;
   this.Houses_Grounded6_19AHP =0;
   //this.Bene2019_20_CLSS =0;
        this.Houses_Grounded61_19ISSR=0;
   
   this.Houses_Completed6_19BLC =0;
   this.Houses_Completed6_19AHP =0;
   //this.Bene2019_20_CLSS =0;
        this.Houses_Completed61_19ISSR=0;
   this.HousesOccupied6_19BLC  =0;
   this.HousesOccupied6_19AHP =0;
   //this.Bene2019_20_CLSS =0;
          this.HousesOccupied61_19ISSR=0; 
   //-------------------
   
       
   
   
       
}

ResetVariables_JN1()
{
  this.HouseInvolved01  =0;
      this.FundsDisbursed_in_Houses01 =0; 
      this.Houses_Grounded01   =0;
      this.Houses_Completed01   =0;
      this.HousesOccupied01   =0;
      
this.HouseInvolved11  =0;
        this.FundsDisbursed_in_Houses11  =0;
        this.Houses_Grounded11   =0;
        this.Houses_Completed11   =0;
        this.HousesOccupied11   =0;
     this.HouseInvolved_21  =0;
          this.FundsDisbursed_in_Houses_21 =0;  
          this.Houses_Grounded_21   =0;
          this.Houses_Completed_21   =0;
          this.HousesOccupied_21 =0;
            
     this.HouseInvolved_31  =0;
            this.FundsDisbursed_in_Houses_31 =0;  
            this.Houses_Grounded_31   =0;
            this.Houses_Completed_31   =0;
            this.HousesOccupied_31   =0;
            
     this.HouseInvolved_41  =0;
              this.FundsDisbursed_in_Houses_41  =0; 
              this.Houses_Grounded_41   =0;
              this.Houses_Completed_41   =0;
              this.HousesOccupied_41 =0;
               
     this.HouseInvolved_51  =0;
                this.FundsDisbursed_in_Houses_51 =0;  
                this.Houses_Grounded_51   =0;
                this.Houses_Completed_51   =0;
                this.HousesOccupied_51  =0;
//=---------------------------------------------------
 this.HouseInvolved01_AHP =0;
                  this.FundsDisbursed_in_Houses01_AHP  =0;
                  this.Houses_Grounded01_AHP  =0;
                  this.Houses_Completed01_AHP =0;
                  this.HousesOccupied01_AHP  =0; 
 
     this.HouseInvolved11_AHP =0;
                    this.FundsDisbursed_in_Houses11_AHP  =0;
                    this.Houses_Grounded11_AHP =0;
                    this.Houses_Completed11_AHP  =0;
                    this.HousesOccupied11_AHP  =0;
                   
     this.HouseInvolved21_AHP =0;
                      this.FundsDisbursed_in_Houses21_AHP  =0;
                      this.Houses_Grounded21_AHP  =0;
                      this.Houses_Completed21_AHP  =0;
                      this.HousesOccupied21_AHP =0;
 
  this.HouseInvolved31_AHP =0;
                        this.FundsDisbursed_in_Houses31_AHP  =0;
                        this.Houses_Grounded31_AHP  =0;
                        this.Houses_Completed31_AHP =0;
                        this.HousesOccupied31_AHP =0;
                                                                                 
                          this.HouseInvolved41_AHP =0;
                          this.FundsDisbursed_in_Houses41_AHP  =0;
                          this.Houses_Grounded41_AHP =0;
                          this.Houses_Completed41_AHP  =0;
                          this.HousesOccupied41_AHP  =0;
                                                          
                
 this.HouseInvolved51_AHP =0;
                            this.FundsDisbursed_in_Houses51_AHP =0;
                            this.Houses_Grounded51_AHP =0;
                            this.Houses_Completed51_AHP  =0;
                            this.HousesOccupied51_AHP  =0;
                                                     
           //-------ISSR
               this.THouseInvolved1_ISSR  =0;
                this.HouseInvolved01_ISSR =0;
                this.HouseInvolved11_ISSR =0;
                this.HouseInvolved12_ISSR  =0;
                this.HouseInvolved13_ISSR  =0;
                this.HouseInvolved14_ISSR  =0;
                this.HouseInvolved15_ISSR          =0;
              this.TFundsDisbursed_in_Houses1_ISSR  =0;
              this.FundsDisbursed_in_Houses01_ISSR  =0;
              this.FundsDisbursed_in_Houses11_ISSR  =0;
              this.FundsDisbursed_in_Houses12_ISSR  =0;
              this.FundsDisbursed_in_Houses13_ISSR  =0;
              this.FundsDisbursed_in_Houses14_ISSR  =0;
              this.FundsDisbursed_in_Houses15_ISSR  =0;
              this.THouses_Grounded1_ISSR  =0;
              this.Houses_Grounded01_ISSR  =0;
              this.Houses_Grounded11_ISSR  =0;
              this.Houses_Grounded12_ISSR  =0;
              this.Houses_Grounded13_ISSR  =0;
              this.Houses_Grounded14_ISSR  =0;
              this.Houses_Grounded15_ISSR =0;
              
              this.THouses_Completed1_ISSR  =0;
              this.Houses_Completed01_ISSR  =0;
              this.Houses_Completed11_ISSR  =0;
              this.Houses_Completed12_ISSR  =0;
              this.Houses_Completed13_ISSR  =0;
              this.Houses_Completed14_ISSR  =0;
              this.Houses_Completed15_ISSR =0;
              this.THousesOccupied1_ISSR  =0;
              this.HousesOccupied01_ISSR  =0;
              this.HousesOccupied11_ISSR  =0;
              this.HousesOccupied12_ISSR  =0;
              this.HousesOccupied13_ISSR  =0;
              this.HousesOccupied14_ISSR  =0;
              this.HousesOccupied15_ISSR =0;
//------------



                //   this.Bene2014_15_CLSS =0;
                // this.Bene2015_16_CLSS  =0;
                // this.Bene2016_17_CLSS  =0;
                // this.Bene2017_18_CLSS  =0;
                // this.Bene2018_19_CLSS  =0;
                // this.Bene2019_20_CLSS  =0;
}


closeModalDialog(){
this.display5='none';
}

closeModalDialogFin(){
//  this.display3='none';
   }
 
  sendComp($event) {
     var data: string;
     const checked=$event.target.checked;
       if (checked) {
         if( $event.target.value =="ALL")
         {
             data="'ISSR,'AHP','BLC','CLSS','JNNURM'";
         }
         else{
              document.getElementById("chkAll").removeAttribute('checked');
              let result=$event.target.value;
              this.lstComponent.push(result);
              data = this.lstComponent.toString();    
         }
       }
       else{
         const index=this.lstComponent.indexOf($event.target.value);
         data = this.lstComponent.splice(index,1).toString();
       }
   
       this.comp_id="'" +data  + "'";
       if (data == null ||data == '')
           data ="0";
       
       this.Compid=data;
       this.GetFinancialData (this.stateCodes, this.districtCodes, this.cityCodes, data);
       this.BindGetStatus(this.stateCodes, this.districtCodes, this.cityCodes, data);
   
       //this.GetFilterData (this.stateCodes, this.districtCodes, this.cityCodes, data);   
     }

  
 
  checkRadio($event)
  {
    
    this.RdStatus=$event.target.value;
    if(this.RdStatus === 'Phy')
    {
      this.JvrmDisplay="initial";
this.display1="block";
this.display2="none";

this.Header="Status of Houses Sanctioned in Respective Years under PMAY(U)";
    }
    else{
      this.JvrmDisplay="none";
      this.display1="none";
      this.display2="block";
      this.Header="Financial Progress under PMAY(U)";
    }
  }

  getStateDetails(stateCodes) {  
    this.stateCode=stateCodes;
    if (typeof this.comp_id=== "undefined")
    {
        this.comp_id ="0";
    }

    if (stateCodes == "0") {
       this.districtCodes="0";
       this.cityCodes="0";
      this.lblStateDisttCity = "All India";
      this.service.GetStateNameByCode(stateCodes).subscribe(resultName => {
         this.BindGetStatus(stateCodes, this.districtCodes, this.cityCodes, this.comp_id);
      });
    //  this.GetFilterData (stateCodes, this.districtCodes, this.cityCodes, this.comp_id);
     
      this.GetFinancialData (stateCodes, this.districtCodes, this.cityCodes, this.comp_id);
      this.BindGetStatus(stateCodes, this.districtCodes, this.cityCodes, this.comp_id);
    }
    else if (stateCodes != "0" && this.districtCodes == "0" && this.cityCodes.toString() == "0") {
      this.service.GetStateNameByCode(stateCodes).subscribe(resultName => {
        this.lblStateHeader = resultName.States_UT;
        this.lblStateDisttCity = this.lblStateHeader;
       // this.comp_id
      });
      
      //this.GetFilterData (stateCodes, this.districtCodes, this.cityCodes, this.comp_id);
      this.GetFinancialData (stateCodes, this.districtCodes, this.cityCodes, this.comp_id);
      this.BindGetStatus(stateCodes, this.districtCodes, this.cityCodes, this.comp_id);
     
    }
    else if (stateCodes != 0 && this.districtCodes.toString() != "0" && this.cityCodes.toString() == "0") {
      this.service.GetDisttNameByCode(this.districtCodes).subscribe(resultDisttName => {
        this.lblStateDisttCity = resultDisttName.District;
        this.lblStateDisttCity = this.lblDistHeader + " district of " + this.lblStateHeader;
        this.BindGetStatus(stateCodes, this.districtCodes, this.cityCodes, this.comp_id);
      });

    //  this.GetFilterData (stateCodes, this.districtCodes, this.cityCodes, this.comp_id); 
      this.GetFinancialData (stateCodes, this.districtCodes, this.cityCodes, this.comp_id);
      this.BindGetStatus(stateCodes, this.districtCodes, this.cityCodes, this.comp_id);
    }
    else if (stateCodes != 0 && this.districtCodes != "0" && this.cityCodes != "0") {
      this.service.GetCityNameByCode(this.cityCodes).subscribe(resultCityName => {
        this.lblCityHeader = resultCityName.City;
        this.lblStateDisttCity = this.lblCityHeader + " " + this.lblDistHeader + " district of " + this.lblStateHeader;
        this.BindGetStatus(stateCodes, this.districtCodes, this.cityCodes, this.comp_id);
      });
     // this.GetFilterData (stateCodes, this.districtCodes, this.cityCodes, this.comp_id);
      this.GetFinancialData (stateCodes, this.districtCodes, this.cityCodes, this.comp_id);
    }


    if (stateCodes == "0") {
      this.stateCodes = "0";
      this.districtCodes = "0";
      this.cityCodes = "0";

     

      this.service.StateList();
      this.service.DisttList(this.stateCodes);
      this.service.CityList(this.districtCodes);

      this.distValue = "0";

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

      if (stateCodes == "400") 
      {
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
              // this.NoOfprojRay_1 = indianFormat(result1.NoOfprojApproved);
              // this.ProjCostRay1 = indianFormat(result1.Project_Cost);
              // this.CSRay1 = indianFormat1(result1.CentralShare);
              // this.CARay1 = indianFormat1(result1.CentralAssisRel);

              this.service.CompISSRAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result2 => {
                this.NoOfprojISSR = result2.NoOfprojApproved;
                this.ProjCostISSR = result2.Project_Cost;
                this.CSISSR = result2.CentralShare;
                this.CAISSR = result2.CentralAssisRel;
                this.HSISSR = result2.HousesSanctioned;
                this.HGISSR = result2.Grounded;
                this.HCISSR = result2.Completed;
                this.HOISSR = result2.Occupied;
                // this.NoOfprojISSR1 = indianFormat(result2.NoOfprojApproved);
                // this.ProjCostISSR1 = indianFormat1(result2.Project_Cost);
                // this.CSISSR1 = indianFormat1(result2.CentralShare);


                this.service.CompAHPAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result3 => {
                  this.NoOfprojAHP = result3.NoOfprojApproved;
                  this.ProjCostAHP = result3.Project_Cost;
                  this.CSAHP = result3.CentralShare;
                  this.CAAHP = result3.CentralAssisRel;
                  this.HSAHP = result3.HousesSanctioned;
                  this.HGAHP = result3.Grounded;
                  this.HCAHP = result3.Completed;
                  this.HOAHP = result3.Occupied;
                  // this.NoOfprojAHP1 = indianFormat(result3.NoOfprojApproved);
                  // this.ProjCostAHP1 = indianFormat1(result3.Project_Cost);
                  // this.CSAHP1 = indianFormat1(result3.CentralShare);
                  


                  this.service.CompBLCSAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result4 => {
                    this.NoOfprojBLCS = result4.NoOfprojApproved;
                    this.ProjCostBLCS = result4.Project_Cost;
                    this.CSBLCS = result4.CentralShare;
                    this.CABLCS = result4.CentralAssisRel;
                    this.HSBLCS = result4.HousesSanctioned;
                    this.HGBLCS = result4.Grounded;
                    this.HCBLCS = result4.Completed;
                    this.HOBLCS = result4.Occupied;

                    // this.NoOfprojBLCS1 = indianFormat(result4.NoOfprojApproved);
                    // this.ProjCostBLCS1 = indianFormat1(result4.Project_Cost);
                    // this.CSBLCS1 = indianFormat1(result4.CentralShare);
                  
                    this.service.CLSS_StateWiseReportPMayList(this.stateCodes, this.division).subscribe(resultCLSSState => {
                      this.HOcc_CLSS = 0;// fixed
                      this.CLSSLoanAmt = <number><any>resultCLSSState.LoanTotal;// + <number><any>resultCLSSState.Loan_MIG;
                      this.SubsidyAmtCr = <number><any>resultCLSSState.SubsidyTotal;//+<number><any>resultCLSSState.Subsidy_MIG;
                      this.NoofBene = <number><any>resultCLSSState.totalBene;// +<number><any>resultCLSSState.No_Beneficiary_MIG;

                  //   this.CLSSLoanAmt1 = indianFormat1(<number><any>resultCLSSState.LoanTotal);
                  //   this.SubsidyAmtCr1 = indianFormat1(<number><any>resultCLSSState.SubsidyTotal);
                  //   this.NoofBene1 = indianFormat(<number><any>resultCLSSState.totalBene);
                  //   this.NoOfprojBLCS1 = indianFormat(result4.NoOfprojApproved);

                      this.NoPApprovedCLSS = 0; //?

                      
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

                      if (this.proj_Total!=0)
                      this.proj_Total = indianFormat(this.proj_Total);

                      if (this.ProjApp_Total!=0)
                          this.ProjApp_Total = indianFormat1(this.ProjApp_Total);
                      
                          if (this.CAS_Total!=0)
                      this.CAS_Total = indianFormat1(this.CAS_Total);
                      if (this.CAR_Total!=0) 
                      this.CAR_Total = indianFormat1(this.CAR_Total);
                      if (this.HS_Total!=0) 
                      this.HS_Total = indianFormat(this.HS_Total);
                      if (this.HG_Total!=0) 
                      
                      this.HG_Total = indianFormat(this.HG_Total);
                      if (this.HC_Total!=0) 
                      this.HC_Total = indianFormat(this.HC_Total);

                      if (this.HO_Total!=0) 
                      this.HO_Total = indianFormat(this.HO_Total);

                      this.lblStateDisttCity = this.stateCodes;
                    });
                  });
                });
              });
            });
          });
      }

      
    }
    else { 
      this.stateCodes = stateCodes;
      this.service.DisttList(stateCodes);
      this.service.CityList(this.districtCodes);//
   if (stateCodes==400)
   {  
      this.service.HFACityWiseReportPMayList(stateCodes, this.districtCodes, this.cityCodes);
      this.service.CLSSCityWiseReportPMayList(stateCodes, this.districtCodes, this.cityCodes);
      
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

        this.Grounded_JN1 = indianFormat(result.GroundedJN);
        this.Completed_JN1 = indianFormat(result.CompletedJN) ;//CompletedJN;
        this.OccupiedJN1 = indianFormat(result.OccupiedJN);
        this.NoPApprovedJN1 = indianFormat(result.NoOfprojApproved);
        this.ProjCostApp_JN1 = indianFormat1(result.ProjCostApproved);
        this.CShare_JN1 = indianFormat1(result.CentralShare);


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
          this.NoOfprojRay_1 = indianFormat(result1.NoOfprojApproved);

          this.service.CompISSRAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result2 => {
            this.NoOfprojISSR = result2.NoOfprojApproved;
            this.ProjCostISSR = result2.Project_Cost;
            this.CSISSR = result2.CentralShare;
            this.CAISSR = result2.CentralAssisRel;
            this.HSISSR = result2.HousesSanctioned;
            this.HGISSR = result2.Grounded;
            this.HCISSR = result2.Completed;
            this.HOISSR = result2.Occupied;
            this.NoOfprojISSR1 = indianFormat(result2.NoOfprojApproved);

            this.service.CompAHPAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result3 => {
              this.NoOfprojAHP = result3.NoOfprojApproved;
              this.ProjCostAHP = result3.Project_Cost;
              this.CSAHP = result3.CentralShare;
              this.CAAHP = result3.CentralAssisRel;
              this.HSAHP = result3.HousesSanctioned;
              this.HGAHP = result3.Grounded;
              this.HCAHP = result3.Completed;
              this.HOAHP = result3.Occupied;
              this.NoOfprojAHP1 = indianFormat(result3.NoOfprojApproved);

              this.service.CompBLCSAtAGlanceNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(result4 => {
                this.NoOfprojBLCS = result4.NoOfprojApproved;
                this.ProjCostBLCS = result4.Project_Cost;
                this.CSBLCS = result4.CentralShare;
                this.CABLCS = result4.CentralAssisRel;
                this.HSBLCS = result4.HousesSanctioned;
                this.HGBLCS = result4.Grounded;
                this.HCBLCS = result4.Completed;
                this.HOBLCS = result4.Occupied;
                this.NoOfprojBLCS1 = indianFormat(result4.NoOfprojApproved);

                this.service.CLSS_StateWiseReportPMayList(this.stateCodes, this.division).subscribe(resultCLSSState => {
                  this.HOcc_CLSS = 0;// fixed
                  this.CLSSLoanAmt = <number><any>resultCLSSState.LoanTotal;// + <number><any>resultCLSSState.Loan_MIG;
                  this.SubsidyAmtCr = <number><any>resultCLSSState.SubsidyTotal;//+<number><any>resultCLSSState.Subsidy_MIG;
                  this.NoofBene = <number><any>resultCLSSState.totalBene;// +<number><any>resultCLSSState.No_Beneficiary_MIG;

                  this.NoPApprovedCLSS = 0; //?

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
    }
  }

  }



  getDistrictDetails(DisttCode) {
    this.districtCode=DisttCode;
    //  this.stateCodes,this.districtCodes,this.cityCodes
if (typeof this.comp_id=== "undefined")
    {
        this.comp_id ="0";
    }
    
    if (DisttCode == "0") {
      this.lblStateDisttCity = "All India";
      this.BindGetStatus(this.stateCodes, DisttCode, this.cityCodes, this.comp_id);
      this.GetFinancialData (this.stateCodes, DisttCode, this.cityCodes, this.Compid);

    }
    else if (this.stateCodes != "0" && DisttCode == "0" && this.cityCodes == "0") {
      this.service.GetStateNameByCode(this.stateCodes).subscribe(resultName => {
        this.lblStateHeader = resultName.States_UT;
      });
    //  this.GetFilterData (this.stateCodes, DisttCode, this.cityCodes, this.comp_id);
    this.BindGetStatus(this.stateCodes, DisttCode, this.cityCodes, this.comp_id);  
    this.GetFinancialData (this.stateCodes, DisttCode, this.cityCodes, this.Compid);
      
    }
    else if (this.stateCodes != "0" && DisttCode != "0" && this.cityCodes == "0") {
      // this.service.GetDisttNameByCode(DisttCode).subscribe(resultDisttName => {
      //   this.lblDistHeader = resultDisttName.District;
      //   this.lblStateDisttCity = this.lblDistHeader + " district of " + this.lblStateHeader;
      // });
      this.service.GetDisttNameByCode(DisttCode).subscribe(resultDisttName => {
        this.lblStateDisttCity = resultDisttName.District;
        this.lblStateDisttCity = this.lblDistHeader + " district of " + this.lblStateHeader;
        this.BindGetStatus(this.stateCodes, DisttCode, this.cityCodes, this.comp_id);
      });
      this.BindGetStatus(this.stateCodes, DisttCode, this.cityCodes, this.comp_id);
       this.GetFinancialData (this.stateCodes, DisttCode, this.cityCodes, this.Compid);
    }
    else if (this.stateCodes != "0" && DisttCode != "0" && this.cityCodes != "0") {

      this.service.GetCityNameByCode(this.cityCodes).subscribe(resultCityName => {
        this.lblCityHeader = resultCityName.City;
        this.lblStateDisttCity = this.lblCityHeader + " " + this.lblDistHeader + " district of " + this.lblStateHeader;
      });
      this.BindGetStatus(this.stateCodes, DisttCode, this.cityCodes, this.comp_id);
      //this.GetFilterData (this.stateCodes, DisttCode, this.cityCodes, this.comp_id);
      this.GetFinancialData (this.stateCodes, DisttCode, this.cityCodes, this.Compid);

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
    if (typeof this.comp_id=== "undefined")
    {
        this.comp_id ="0";
    }
    
    this.cityCode=cityCode;
    if (this.stateCodes == "0") {
      this.lblStateDisttCity = "All India";
      this.BindGetStatus(this.stateCodes, this.districtCodes, cityCode, this.comp_id);
      this.GetFinancialData (this.stateCodes, this.districtCodes, cityCode, this.Compid);
    }
    else if (this.stateCodes != "0" && this.districtCodes == "0" && cityCode == "0") {
      this.service.GetStateNameByCode(this.stateCodes).subscribe(resultName => {
        this.lblStateHeader = resultName.States_UT;
      });
      this.BindGetStatus(this.stateCodes, this.districtCodes, cityCode, this.comp_id);
      this.GetFinancialData (this.stateCodes, this.districtCodes, cityCode, this.Compid);
    }
    else if (this.stateCodes != "0" && this.districtCodes != "0" && cityCode == "0") {
      this.service.GetDisttNameByCode(this.districtCodes).subscribe(resultDisttName => {
        this.lblDistHeader = resultDisttName.District;
        this.lblStateDisttCity = this.lblDistHeader + " district of " + this.lblStateHeader;
      });
      this.BindGetStatus(this.stateCodes, this.districtCodes, cityCode, this.comp_id);
      this.GetFinancialData (this.stateCodes, this.districtCodes, cityCode, this.Compid);
    }
    else if (this.stateCodes != "0" && this.districtCodes != "0" && cityCode != "0") {
      this.service.GetCityNameByCode(cityCode).subscribe(resultCityName => {
        this.lblCityHeader = resultCityName.City;
        //alert(resultCityName.City);

       // this.BindGetStatus(this.stateCodes, this.districtCodes, cityCode, this.comp_id);
        this.lblStateDisttCity = this.lblCityHeader + " City of " + this.lblStateHeader;
      });
      this.BindGetStatus(this.stateCodes, this.districtCodes, cityCode, this.comp_id);
      this.GetFinancialData (this.stateCodes, this.districtCodes,cityCode, this.Compid);
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

                 this.service.CLSSCityWiseReportPMayListNew(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(resultCLSSState => {
                  this.HOcc_CLSS = 0;// fixed
                  this.CLSSLoanAmt = <number><any>resultCLSSState.TotalLoanAmt;// + <number><any>resultCLSSState.Loan_MIG;
                  this.SubsidyAmtCr = <number><any>resultCLSSState.TotalSubsidy;//+<number><any>resultCLSSState.Subsidy_MIG;
                  this.NoofBene = <number><any>resultCLSSState.TotalBeneficiary;// +<number><any>resultCLSSState.No_Beneficiary_MIG;



 
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
  // BindGroundedGraph(stateCode, DisttCode, cityCode) {
  //   this.service.JNNURMCityWiseAtAGlance(stateCode, DisttCode, cityCode).subscribe(result => {
  //     this.NoOfprojApproved = result.NoOfprojApproved;
  //     this.ProjCostApproved = result.ProjCostApproved
  //     this.HousesSanctioned = result.HousesSanctioned;

  //     this.Occupied = result.Occupied;
  //     this.Completed = result.Completed;
  //     this.Grounded = result.Grounded;

  //     this.CentralAssisRel = result.CentralAssisRel;
  //     this.CentralShare = result.CentralShare;
  //   });
  // }

  AdminPage() {
    //alert('aa');
    this.router.navigate(['/dashboard']);
  }
  public pdfReport() {
      window.print();
  }

  BindGetStatus(stateCode:string,districtCode:string,cityCode:string,compId:string)
  {
   //   alert(compId);
     // if (compId =="0")
       //     compId == "'ISSR,'AHP','BLC','CLSS','JNNURM'";
       this.HousesOccupied6 =0;
       this.HousesOccupied6_19BLC=0;  
        this.HousesOccupied6_19AHP =0;
        this.Bene2019_20_CLSS =0;
         this.HousesOccupied61_19ISSR=0;
         this.FundsDisbursed_in_Houses1B14 =0;
         
          //--------------------------------------2014-15------------------------------------------------------
           // CLSS
          this.service.GetCLSS_Houses_VerticalWise(stateCode).subscribe(result_CLSSAll=>{
          // ahp 
          this.service.sp_GetHousesStatusFor2014_15(stateCode,districtCode,cityCode,'AHP').subscribe(result_14_15AHP=>{
          
          // blc 
          this.service.sp_GetHousesStatusFor2014_15(stateCode,districtCode,cityCode,'BLCS').subscribe(result_14_15_BLCS=>{
          
            // ISSR','RAY','RAY_AHP 
            this.service.sp_GetHousesStatus_ISSR_2014_15(stateCode,districtCode,cityCode,compId).subscribe(resultISSR_14_15=>{
            // JN
            this.service.sp_GetHousesStatusForVertical(stateCode).subscribe(resultJN=>{
            this.Bene2014_15_CLSS=result_CLSSAll[0].Bene2014_15;  
            
            
             //-- ahp , blc------------------------------------------------------> TFundsDisbursed_in_Houses
            try {
              if (result_14_15AHP[0].Housesinvolved == 0) {
                this.HouseInvolved114AHP = 0;
              }
              else {
                this.HouseInvolved114AHP = result_14_15AHP[0].Housesinvolved;
              }
            }
            catch
            {
              this.HouseInvolved114AHP= 0;
            }
            
          try {
            if (result_14_15AHP[0].FundsDisbursed_in_Houses == 0) {
              this.FundsDisbursed_in_Houses114AHP = 0;
            }
            else {
              this.FundsDisbursed_in_Houses114AHP = result_14_15AHP[0].FundsDisbursed_in_Houses;
            }
          }
          catch
          {
            this.FundsDisbursed_in_Houses114AHP= 0;
          }
  
          try {
            if (result_14_15AHP[0].Houses_Grounded == 0) {
              this.Houses_Grounded114AHP = 0;
            }
            else {
              this.Houses_Grounded114AHP = result_14_15AHP[0].Houses_Grounded;
            }
          }
          catch
          {
            this.Houses_Grounded114AHP= 0;
          }
  
          try {
            if (result_14_15AHP[0].Houses_Completed == 0) {
              this.Houses_Completed114AHP = 0;
            }
            else {
              this.Houses_Completed114AHP = result_14_15AHP[0].Houses_Completed;
            }
          }
          catch
          {
            this.Houses_Completed114AHP= 0;
          }
           try {
            if (result_14_15AHP[0].HousesOccupied == 0) {
              this.HousesOccupied114AHP = 0;
            }
            else {
              this.HousesOccupied114AHP = result_14_15AHP[0].HousesOccupied;
            }
          }
          catch
          {
            this.HousesOccupied114AHP= 0;
          }
        

          //----------------AHP END--- -----------------------------------------------------  
        //-- BLCS Start------------------------------------------------------ 
             try {
              if (result_14_15_BLCS[0].Housesinvolved == 0) {
                this.HouseInvolved1B14 = 0;
              }
              else {
                this.HouseInvolved1B14 = result_14_15_BLCS[0].Housesinvolved;
              }
            }
            catch
            {
              this.HouseInvolved1B14= 0;
            }

          try {
            if (result_14_15_BLCS[0].FundsDisbursed_in_Houses == 0) {
              this.FundsDisbursed_in_Houses1B14 = 0;
            }
            else {
              this.FundsDisbursed_in_Houses1B14 = result_14_15_BLCS[0].FundsDisbursed_in_Houses;
            }
          }
          catch
          {
            this.FundsDisbursed_in_Houses1B14= 0;
          }
          
          try {
            if (result_14_15_BLCS[0].Houses_Grounded == 0) {
              this.Houses_Grounded1B14 = 0;
            }
            else {
              this.Houses_Grounded1B14 = result_14_15_BLCS[0].Houses_Grounded;
            }
          }
          catch
          {
            this.Houses_Grounded1B14= 0;
          }
          
          try {
            if (result_14_15_BLCS[0].Houses_Completed == 0) {
              this.Houses_Completed1B14 = 0;
            }
            else {
              this.Houses_Completed1B14 = result_14_15_BLCS[0].Houses_Completed;
            }
          }
          catch
          {
            this.Houses_Completed1B14= 0;
          }
          
          try {
            if (result_14_15_BLCS[0].HousesOccupied == 0) {
              this.HousesOccupied1B14 = 0;
            }
            else {
              this.HousesOccupied1B14 = result_14_15_BLCS[0].HousesOccupied;
            }
          }
          catch
          {
            this.HousesOccupied1B14= 0;
          }
         
        //----------------BLCS END--- -----------------------------------------------------  
  
       // <<<<<<<<<<<<<<<2014-15  FOR JNNURM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>           
       this.Houses_GroundedJNG=resultJN[0].Houses_Grounded;
       this.Houses_CompletedJNC=resultJN[0].Houses_Completed;
       this.HousesOccupiedJNO=resultJN[0].HousesOccupied;

       // <<<<<<<<<<<<<<<2014-15  FOR JNNURM >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>           
        try {
          if (resultISSR_14_15[0].Housesinvolved == 0) {
            this.HouseInvolved1ISSR = 0;
          }
          else {
            this.HouseInvolved1ISSR = resultISSR_14_15[0].Housesinvolved;
          }
        }
        catch
        {
          this.HouseInvolved1ISSR= 0;
        }
   
        try {
        if (resultISSR_14_15[0].FundsDisbursed_in_Houses == 0) {
          this.FundsDisbursed_ISSR_Houses1 = 0;
        }
        else {
          this.FundsDisbursed_ISSR_Houses1 = resultISSR_14_15[0].FundsDisbursed_in_Houses;
        }
      }
      catch
      {
        this.FundsDisbursed_ISSR_Houses1= 0;
      }
  
      try {
        if (resultISSR_14_15[0].Houses_Grounded == 0) {
          this.Houses_ISSRGrounded1 = 0;
        }
        else {
          this.Houses_ISSRGrounded1 = resultISSR_14_15[0].Houses_Grounded;
        }
      }
      catch
      {
        this.Houses_ISSRGrounded1= 0;
      }
      
      try {
        if (resultISSR_14_15[0].Houses_Completed == 0) {
          this.Houses_ISSRCompleted1 = 0;
        }
        else {
          this.Houses_ISSRCompleted1 = resultISSR_14_15[0].Houses_Completed;
        }
      }
      catch
      {
        this.Houses_ISSRCompleted1= 0;
      }
  
      try {
        if (resultISSR_14_15[0].HousesOccupied == 0) {
          this.Houses_ISSROccupied1 = 0;
        }
        else {
          this.Houses_ISSROccupied1 = resultISSR_14_15[0].HousesOccupied;
        }
      }
      catch
      {
        this.Houses_ISSROccupied1= 0;
      }
      //--------------------------------------2014-15 End------------------------------------------------------
          this.service.sp_GetHousesStatusFor2015_16(stateCode,districtCode,cityCode,'AHP').subscribe(result_15_16AHP=>{
          this.service.sp_GetHousesStatusFor2015_16(stateCode,districtCode,cityCode,'BLCS').subscribe(result_15_16BLCS=>{
          this.service.sp_GetHousesStatus_ISSR_2015_16(stateCode,districtCode,cityCode,'ISSR').subscribe(resultISSR_15_16=>{
          //-----------------AHP----------------------------------------
          
          this.Bene2015_16_CLSS=result_CLSSAll[0].Bene2015_16;
          
          try {
          if (result_15_16AHP[0].Housesinvolved == 0) {
            this.HouseInvolved2_15AHP = 0;
          }
          else {
            this.HouseInvolved2_15AHP = result_15_16AHP[0].Housesinvolved;
          }
        }
        catch
        {
          this.HouseInvolved2_15AHP= 0;
        }
         //-------------------------- 
  
        try {
          if (result_15_16AHP[0].FundsDisbursed_in_Houses == 0) {
            this.FundsDisbursed_in_Houses2_15AHP = 0;
          }
          else {
            this.FundsDisbursed_in_Houses2_15AHP = result_15_16AHP[0].FundsDisbursed_in_Houses;
          }
        }
        catch
        {
          this.FundsDisbursed_in_Houses2_15AHP= 0;
        }
        try {
          if (result_15_16AHP[0].Houses_Grounded == 0) {
            this.Houses_Grounded2_15AHP = 0;
          }
          else {
            this.Houses_Grounded2_15AHP = result_15_16AHP[0].Houses_Grounded;
          }
        }
        catch
        {
          this.Houses_Grounded2_15AHP= 0;
        }
       
  
        try {
          if (result_15_16AHP[0].Houses_Completed == 0) {
            this.Houses_Completed2_15AHP = 0;
          }
          else {
            this.Houses_Completed2_15AHP = result_15_16AHP[0].Houses_Completed;
          }
        }
        catch
        {
          this.Houses_Completed2_15AHP= 0;
        }
       
        
  
        try {
          if (result_15_16AHP[0].HousesOccupied == 0) {
            this.HousesOccupied2_15AHP = 0;
          }
          else {
            this.HousesOccupied2_15AHP = result_15_16AHP[0].HousesOccupied;
          }
        }
        catch
        {
          this.HousesOccupied2_15AHP= 0;
        }
         
        //---------------------AHP END----------------------------------
   

       //-----------------BLCS Start----------------------------------------
                try {
                if (result_15_16BLCS[0].Housesinvolved == 0) {
                  this.HouseInvolved2BLCS = 0;   
                }
                else {
                  this.HouseInvolved2BLCS = result_15_16BLCS[0].Housesinvolved;
                }
              }
              catch
              {
                this.HouseInvolved2BLCS= 0;
              }
              try {
                if (result_15_16BLCS[0].FundsDisbursed_in_Houses == 0) {
                  this.FundsDisbursed_in_Houses2BLCS = 0;
                }
                else {
                  this.FundsDisbursed_in_Houses2BLCS = result_15_16BLCS[0].FundsDisbursed_in_Houses;
                }
              }
              catch
              {
                this.FundsDisbursed_in_Houses2BLCS= 0;
              }
              try {
                if (result_15_16BLCS[0].Houses_Grounded == 0) {
                  this.Houses_Grounded2BLCS = 0;
                }
                else {
                  this.Houses_Grounded2BLCS = result_15_16BLCS[0].Houses_Grounded;
                }
              }
              catch
              {
                this.Houses_Grounded2BLCS= 0;
              }
  
              try {
                if (result_15_16BLCS[0].Houses_Completed == 0) {
                  this.Houses_Completed2BLCS = 0;
                }
                else {
                  this.Houses_Completed2BLCS = result_15_16BLCS[0].Houses_Completed;
                }
              }
              catch
              {
                this.Houses_Completed2BLCS= 0;
              }
  
              try {
                if (result_15_16BLCS[0].HousesOccupied == 0) {
                  this.HousesOccupied2BLCS = 0;
                }
                else {
                  this.HousesOccupied2BLCS = result_15_16BLCS[0].HousesOccupied;
                }
              }
              catch
              {
                this.HousesOccupied2BLCS= 0;
              }
              //---------------------BLCS END----------------------------------
          try {
            if (resultISSR_15_16[0].Housesinvolved == 0 || resultISSR_15_16[0].Housesinvolved == "" || resultISSR_15_16[0].Housesinvolved == '') {
              this.HouseInvolved21_ISSR_15 = 0;
  
            }
            else {
              this.HouseInvolved21_ISSR_15 = resultISSR_15_16[0].Housesinvolved;
            }
          }
          catch   
          {
            this.HouseInvolved21_ISSR_15= 0;
          }
          
          try {
            if (resultISSR_15_16[0].FundsDisbursed_in_Houses == 0) {
              this.FundsDisbursed_in_Houses21_ISSR_15 = 0;
            }
            else {
              this.FundsDisbursed_in_Houses21_ISSR_15 = resultISSR_15_16[0].FundsDisbursed_in_Houses;
            }
          }
          catch
          {
            this.FundsDisbursed_in_Houses21_ISSR_15= 0;
          }
          
          try {
            if (resultISSR_15_16[0].Houses_Grounded == 0) {
              this.Houses_Grounded21_ISSR_15 = 0;
            }
            else {
              this.Houses_Grounded21_ISSR_15 = resultISSR_15_16[0].Houses_Grounded;
            }
          }
          catch
          {
            this.Houses_Grounded21_ISSR_15= 0;
          }
  
          try {
            if (resultISSR_15_16[0].Houses_Completed == 0) {
              this.Houses_Completed21_ISSR_15 = 0;
            }
            else {
              this.Houses_Completed21_ISSR_15 = resultISSR_15_16[0].Houses_Completed;
            }
          }
          catch
          {
            this.Houses_Completed21_ISSR_15= 0;
          }
  
          try {
            if (resultISSR_15_16[0].HousesOccupied == 0) {
              this.HousesOccupied21_ISSR_15 = 0;
            }
            else {
              this.HousesOccupied21_ISSR_15 = resultISSR_15_16[0].HousesOccupied;
            }
          }
          catch
          {
            this.HousesOccupied21_ISSR_15= 0;
          }
   
           
           this.FundsDisbursed_in_Houses2 =parseInt(this.FundsDisbursed_in_Houses2);
  
  //----------------------------------15-16 END  --------------------------------------------------------------------------
       
        
        this.service.sp_GetHousesStatusFor2016_17(stateCode,districtCode,cityCode,'BLCS').subscribe(result_16_17BLCS=>{
          this.service.sp_GetHousesStatusFor2016_17(stateCode,districtCode,cityCode,'AHP').subscribe(result_16_17AHP=>{
       
          this.service.sp_GetHousesStatus_ISSR_2016_17(stateCode,districtCode,cityCode,compId).subscribe(resultISSR_16_17=>{
      
      
          this.Bene2016_17_CLSS=result_CLSSAll[0].Bene2016_17;
         
          try {
          if (result_16_17BLCS[0].Housesinvolved == 0) {
            this.HouseInvolved3_16BLCS = 0;
          }
          else {
            this.HouseInvolved3_16BLCS = result_16_17BLCS[0].Housesinvolved;
          }
        }
        catch
        {
          this.HouseInvolved3_16BLCS= 0;
        }
        
        try {
          if (result_16_17BLCS[0].FundsDisbursed_in_Houses == 0) {
            this.FundsDisbursed_in_Houses3_16BLCS = 0;
          }
          else {
            this.FundsDisbursed_in_Houses3_16BLCS = result_16_17BLCS[0].FundsDisbursed_in_Houses;
          }
        }
        catch
        {
          this.FundsDisbursed_in_Houses3_16BLCS= 0;
        }
  
        try {
          if (result_16_17BLCS[0].Houses_Grounded == 0) {
            this.Houses_Grounded3_16BLCS = 0;
          }
          else {
            this.Houses_Grounded3_16BLCS = result_16_17BLCS[0].Houses_Grounded;
          }
        }
        catch
        {
          this.Houses_Grounded3_16BLCS= 0;
        }
  
        try {
          if (result_16_17BLCS[0].Houses_Completed == 0) {
            this.Houses_Completed3_16BLCS = 0;
          }
          else {
            this.Houses_Completed3_16BLCS = result_16_17BLCS[0].Houses_Completed;
          }
        }
        catch
        {
          this.Houses_Completed3_16BLCS= 0;
        }
  
        try {
          if (result_16_17BLCS[0].HousesOccupied == 0) {
            this.HousesOccupied3_16BLCS = 0;
          }
          else {
            this.HousesOccupied3_16BLCS = result_16_17BLCS[0].HousesOccupied;
          }
        }
        catch
        {
          this.HousesOccupied3_16BLCS= 0;
        }
  
  //---------------------------------------------
  
  
        try {
          if (result_16_17AHP[0].Housesinvolved == 0) {
            this.HouseInvolved3_16AHP = 0;
          }
          else {
            this.HouseInvolved3_16AHP = result_16_17AHP[0].Housesinvolved;
          }
        }
        catch
        {
          this.HouseInvolved3_16AHP= 0;
        }
  
        try {
          if (result_16_17AHP[0].FundsDisbursed_in_Houses == 0) {
            this.FundsDisbursed_in_Houses3_16AHP = 0;
          }
          else {
            this.FundsDisbursed_in_Houses3_16AHP = result_16_17AHP[0].FundsDisbursed_in_Houses;
          }
        }
        catch
        {
          this.FundsDisbursed_in_Houses3_16AHP= 0;
        }
  
        try {
          if (result_16_17AHP[0].Houses_Grounded == 0) {
            this.Houses_Grounded3_16AHP = 0;
          }
          else {
            this.Houses_Grounded3_16AHP = result_16_17AHP[0].Houses_Grounded;
          }
        }
        catch
        {
          this.Houses_Grounded3_16AHP= 0;
        }
  
        try {
          if (result_16_17AHP[0].Houses_Completed == 0) {
            this.Houses_Completed3_16AHP = 0;
          }
          else {
            this.Houses_Completed3_16AHP = result_16_17AHP[0].Houses_Completed;
          }
        }
        catch
        {
          this.Houses_Completed3_16AHP= 0;
        }
  
        try {
          if (result_16_17AHP[0].HousesOccupied == 0) {
            this.HousesOccupied3_16AHP = 0;
          }
          else {
            this.HousesOccupied3_16AHP = result_16_17AHP[0].HousesOccupied;
          }
        }
        catch
        {
          this.HousesOccupied3_16AHP= 0;
        }
  
        //------------------------------------------
        try {
          if (resultISSR_16_17[0].Housesinvolved == 0) {
            this.HouseInvolved31_16ISSR = 0;
          }
          else {
            this.HouseInvolved31_16ISSR = resultISSR_16_17[0].Housesinvolved;
          }
        }
        catch
        {
          this.HouseInvolved31_16ISSR= 0;
        }
  
        try {
          if (resultISSR_16_17[0].FundsDisbursed_in_Houses == 0) {
            this.FundsDisbursed_in_Houses31_16ISSR = 0;
          }
          else {
            this.FundsDisbursed_in_Houses31_16ISSR = resultISSR_16_17[0].FundsDisbursed_in_Houses;
          }
        }
        catch
        {
          this.FundsDisbursed_in_Houses31_16ISSR= 0;
        }
  
        try {
          if (resultISSR_16_17[0].Houses_Grounded == 0) {
            this.Houses_Grounded31_16ISSR = 0;
          }
          else {
            this.Houses_Grounded31_16ISSR = resultISSR_16_17[0].Houses_Grounded;
          }
        }
        catch
        {
          this.Houses_Grounded31_16ISSR= 0;
        }
  
        try {
          if (resultISSR_16_17[0].Houses_Completed == 0) {
            this.Houses_Completed31_16ISSR = 0;
          }
          else {
            this.Houses_Completed31_16ISSR = resultISSR_16_17[0].Houses_Completed;
          }
        }
        catch
        {
          this.Houses_Completed31_16ISSR= 0;
        }
  
        try {
          if (resultISSR_16_17[0].HousesOccupied == 0) {
            this.HousesOccupied31_16ISSR = 0;
          }
          else {
            this.HousesOccupied31_16ISSR = resultISSR_16_17[0].HousesOccupied;
          }
        }
        catch
        {
          this.HousesOccupied31_16ISSR= 0;
        }
       
  
   
         
//        this.FundsDisbursed_in_Houses3  =parseInt(this.FundsDisbursed_in_Houses3) ;
  
        
    
  //---------------------------------------------- 16-17 END
   
      
    this.service.sp_GetHousesStatusFor2017_18(stateCode,districtCode,cityCode,'BLCS').subscribe(result_17_18BLC=>{
  
      this.service.sp_GetHousesStatusFor2017_18(stateCode,districtCode,cityCode,'AHP').subscribe(result_17_18AHP=>{
          this.service.sp_GetHousesStatus_ISSR_2017_18(stateCode,districtCode,cityCode,compId).subscribe(resultISSR_17_18=>{


            this.Bene2017_18_CLSS=result_CLSSAll[0].Bene2017_18;
          try {
          if (result_17_18BLC[0].Housesinvolved == 0) {
            this.HouseInvolved4_17BLC = 0;
          }
          else {
            this.HouseInvolved4_17BLC = result_17_18BLC[0].Housesinvolved;
          }
        }
        catch
        {
          this.HouseInvolved4_17BLC= 0;
        }
  
        try {
          if (result_17_18BLC[0].FundsDisbursed_in_Houses == 0) {
            this.FundsDisbursed_in_Houses4_17BLC = 0;
          }
          else {
            this.FundsDisbursed_in_Houses4_17BLC = result_17_18BLC[0].FundsDisbursed_in_Houses;
          }
        }
        catch
        {
          this.FundsDisbursed_in_Houses4_17BLC= 0;
        }
  
        try {
          if (result_17_18BLC[0].Houses_Grounded == 0) {
            this.Houses_Grounded4_17BLC = 0;
          }
          else {
            this.Houses_Grounded4_17BLC = result_17_18BLC[0].Houses_Grounded;
          }
        }
        catch
        {
          this.Houses_Grounded4_17BLC= 0;
        }
  
        
        try {
          if (result_17_18BLC[0].Houses_Completed == 0) {
            this.Houses_Completed4_17BLC = 0;
          }
          else {
            this.Houses_Completed4_17BLC = result_17_18BLC[0].Houses_Completed;
          }
        }
        catch
        {
          this.Houses_Completed4_17BLC= 0;
        }
  
        try {
          if (result_17_18BLC[0].HousesOccupied == 0) {
            this.HousesOccupied4_17BLC = 0;
          }
          else {
            this.HousesOccupied4_17BLC = result_17_18BLC[0].HousesOccupied;
          }
        }
        catch
        {
          this.HousesOccupied4_17BLC= 0;
        }
  
  
  //----------------------------------------------------------------------
  
  try {
    if (result_17_18AHP[0].Housesinvolved == 0) {
      this.HouseInvolved4_17AHP = 0;
    }
    else {
      this.HouseInvolved4_17AHP = result_17_18AHP[0].Housesinvolved;
    } 
  }
  catch
  {
    this.HouseInvolved4_17AHP= 0;
  }
   
  try {
    if (result_17_18AHP[0].FundsDisbursed_in_Houses == 0) {
      this.FundsDisbursed_in_Houses4_17AHP = 0;
    }
    else {
      this.FundsDisbursed_in_Houses4_17AHP = result_17_18AHP[0].FundsDisbursed_in_Houses;
    }
  }
  catch
  {
    this.FundsDisbursed_in_Houses4_17AHP= 0;
  }
  
  try {
    if (result_17_18AHP[0].Houses_Grounded == 0) {
      this.Houses_Grounded4_17AHP = 0;
    }
    else {
      this.Houses_Grounded4_17AHP = result_17_18AHP[0].Houses_Grounded;
    }
  }
  catch
  {
    this.Houses_Grounded4_17AHP= 0;
  }
  
  try {
    if (result_17_18AHP[0].Houses_Completed == 0) {
      this.Houses_Completed4_17AHP = 0;
    }
    else {
      this.Houses_Completed4_17AHP = result_17_18AHP[0].Houses_Completed;
    }
  }
  catch
  {
    this.Houses_Completed4_17AHP= 0;
  }
  
  try {
    if (result_17_18AHP[0].HousesOccupied == 0) {
      this.HousesOccupied4_17AHP = 0;
    }
    else {
      this.HousesOccupied4_17AHP = result_17_18AHP[0].HousesOccupied;
    }
  }
  catch
  {
    this.HousesOccupied4_17AHP= 0;
  }
  
  
  //----------------------------------------------------------------------
        try {
          if (resultISSR_17_18[0].Housesinvolved == 0) {
            this.HouseInvolved41_17ISSR  = 0;
          }
          else {
            this.HouseInvolved41_17ISSR = resultISSR_17_18[0].Housesinvolved;
          }
        }
        catch
        {
          this.HouseInvolved41_17ISSR= 0;
        }
  
        try {
          if (resultISSR_17_18[0].FundsDisbursed_in_Houses == 0) {
            this.FundsDisbursed_in_Houses41_17ISSR = 0;
          }
          else {
            this.FundsDisbursed_in_Houses41_17ISSR = resultISSR_17_18[0].FundsDisbursed_in_Houses;
          }
        }
        catch
        {
          this.FundsDisbursed_in_Houses41_17ISSR= 0;
        }
  
        try {
          if (resultISSR_17_18[0].Houses_Grounded == 0) {
            this.Houses_Grounded41_17ISSR = 0;
          }
          else {
            this.Houses_Grounded41_17ISSR = resultISSR_17_18[0].Houses_Grounded;
          }
        }
        catch
        {
          this.Houses_Grounded41_17ISSR= 0;
        }
  
        try {
          if (resultISSR_17_18[0].Houses_Completed == 0) {
            this.Houses_Completed41_17ISSR = 0;
          }
          else {
            this.Houses_Completed41_17ISSR = resultISSR_17_18[0].Houses_Completed;
          }
        }
        catch
        {
          this.Houses_Completed41_17ISSR= 0;
        }
  
        try {
          if (resultISSR_17_18[0].HousesOccupied == 0) {
            this.HousesOccupied41_17ISSR = 0;
          }
          else {
            this.HousesOccupied41_17ISSR = resultISSR_17_18[0].HousesOccupied;
          }
        }
        catch
        {
          this.HousesOccupied41_17ISSR= 0;
        }
  
       
        this.FundsDisbursed_in_Houses4  = parseInt(this.FundsDisbursed_in_Houses4 );
      
        // //-----------------------------------------------------------
       
        
        this.service.sp_GetHousesStatusFor2018_19(stateCode,districtCode,cityCode,'BLCS').subscribe(result_18_19BLCS=>{
          this.service.sp_GetHousesStatusFor2018_19(stateCode,districtCode,cityCode,'AHP').subscribe(result_18_19AHP=>{
       
          this.service.sp_GetHousesStatus_ISSR_2018_19(stateCode,districtCode,cityCode,'ISSR').subscribe(resultISSR_18_19=>{
            this.Bene2018_19_CLSS=result_CLSSAll[0].Bene2018_19;
         
            try {
                if (result_18_19BLCS[0].Housesinvolved == 0) {
                  this.HouseInvolved5_18BLCS = 0;
                }
                else {
                  this.HouseInvolved5_18BLCS = result_18_19BLCS[0].Housesinvolved;
                }
              }
              catch
              {
                this.HouseInvolved5_18BLCS= 0;
              }
        
              try {
                if (result_18_19BLCS[0].FundsDisbursed_in_Houses == 0) {
                  this.FundsDisbursed_in_Houses5_18BLCS = 0;
                }
                else {
                  this.FundsDisbursed_in_Houses5_18BLCS = result_18_19BLCS[0].FundsDisbursed_in_Houses;
                }
              }
              catch
              {
                this.FundsDisbursed_in_Houses5_18BLCS= 0;
              }
              
  
              try {
                if (result_18_19BLCS[0].Houses_Grounded == 0) {
                  this.Houses_Grounded5_18BLCS = 0;
                }
                else {
                  this.Houses_Grounded5_18BLCS = result_18_19BLCS[0].Houses_Grounded;
                }
              }
              catch
              {
                this.Houses_Grounded5_18BLCS= 0;
              }
  
  
              try {
                if (result_18_19BLCS[0].Houses_Completed == 0) {
                  this.Houses_Completed5_18BLCS = 0;
                }
                else {
                  this.Houses_Completed5_18BLCS = result_18_19BLCS[0].Houses_Completed;
                }
              }
              catch
              {
                this.Houses_Completed5_18BLCS= 0;
              }
  
              try {
                if (result_18_19BLCS[0].HousesOccupied == 0) {
                  this.HousesOccupied5_18BLCS = 0;
                }
                else {
                  this.HousesOccupied5_18BLCS = result_18_19BLCS[0].HousesOccupied;
                }
              }
              catch
              {
                this.HousesOccupied5_18BLCS= 0;
              }
              
  //-------------------------------------------
              try {
                if (result_18_19AHP[0].Housesinvolved == 0) {
                  this.HouseInvolved5_18AHP = 0;
                }
                else {
                  this.HouseInvolved5_18AHP = result_18_19AHP[0].Housesinvolved;
                }
              }
              catch
              {
                this.HouseInvolved5_18AHP= 0;
              }
        
              try {
                if (result_18_19AHP[0].FundsDisbursed_in_Houses == 0) {
                  this.FundsDisbursed_in_Houses5_18AHP = 0;
                }
                else {
                  this.FundsDisbursed_in_Houses5_18AHP = result_18_19AHP[0].FundsDisbursed_in_Houses;
                }
              }
              catch
              {
                this.FundsDisbursed_in_Houses5_18AHP= 0;
              }
              
              try {
                if (result_18_19AHP[0].Houses_Grounded == 0) {
                  this.Houses_Grounded5_18AHP = 0;
                }
                else {
                  this.Houses_Grounded5_18AHP = result_18_19AHP[0].Houses_Grounded;
                }
              }
              catch
              {
                this.Houses_Grounded5_18AHP= 0;
              }
              
  
              try {
                if (result_18_19AHP[0].Houses_Completed == 0) {
                  this.Houses_Completed5_18AHP = 0;
                }
                else {
                  this.Houses_Completed5_18AHP = result_18_19AHP[0].Houses_Completed;
                }
              }
              catch
              {
                this.Houses_Completed5_18AHP= 0;
              }
  
  
              try {
                if (result_18_19AHP[0].HousesOccupied == 0) {
                  this.HousesOccupied5_18AHP = 0;
                }
                else {
                  this.HousesOccupied5_18AHP = result_18_19AHP[0].HousesOccupied;
                }
              }
              catch
              {
                this.HousesOccupied5_18AHP= 0;
              }
       //-----------------------------------
       
       try {
        if (resultISSR_18_19[0].Housesinvolved == 0) {
          this.HouseInvolved51_18ISSR = 0;
        }
        else {
          this.HouseInvolved51_18ISSR = resultISSR_18_19[0].Housesinvolved;
        }
      }
      catch
      {
        this.HouseInvolved51_18ISSR= 0;
      }
  
      try {
        if (resultISSR_18_19[0].FundsDisbursed_in_Houses == 0) {
          this.FundsDisbursed_in_Houses51_18ISSR = 0;
        }
        else {
          this.FundsDisbursed_in_Houses51_18ISSR = resultISSR_18_19[0].FundsDisbursed_in_Houses;
        }
      }
      catch
      {
        this.FundsDisbursed_in_Houses51_18ISSR= 0;
      }
  
      try {
        if (resultISSR_18_19[0].Houses_Grounded == 0) {
          this.Houses_Grounded51_18ISSR = 0;
        }
        else {
          this.Houses_Grounded51_18ISSR = resultISSR_18_19[0].Houses_Grounded;
        }
      }
      catch
      {
        this.Houses_Grounded51_18ISSR= 0;
      }
  
      try {
        if (resultISSR_18_19[0].Houses_Completed == 0) {
          this.Houses_Completed51_18ISSR = 0;
        }
        else {
          this.Houses_Completed51_18ISSR = resultISSR_18_19[0].Houses_Completed;
        }
      }
      catch
      {
        this.Houses_Completed51_18ISSR= 0;
      }
  
      try {
        if (resultISSR_18_19[0].HousesOccupied == 0) {
          this.HousesOccupied51_18ISSR = 0;
        }
        else {
          this.HousesOccupied51_18ISSR = resultISSR_18_19[0].HousesOccupied;
        }
      }
      catch
      {
        this.HousesOccupied51_18ISSR= 0;
      }
                 
    
   // //-----------------------------------------------------------
    
   
   this.service.sp_GetHousesStatusFor2019_20(stateCode,districtCode,cityCode,'BLCS').subscribe(result_19_20BLC=>{
   this.service.sp_GetHousesStatusFor2019_20(stateCode,districtCode,cityCode,'AHP').subscribe(result_19_20AHP=>{
   this.service.sp_GetHousesStatus_ISSR_2019_20(stateCode,districtCode,cityCode,'ISSR').subscribe(resultISSR_19_20=>{
   this.Bene2019_20_CLSS=result_CLSSAll[0].Bene2019_20;
       try {
          if (result_19_20BLC[0].Housesinvolved == 0) {
            this.HouseInvolved6_19BLC = 0;
          }
          else {
            this.HouseInvolved6_19BLC = result_19_20BLC[0].Housesinvolved;
          }
        }
        catch
        {
          this.HouseInvolved6_19BLC= 0;
        }
  
        try {
          if (result_19_20BLC[0].FundsDisbursed_in_Houses == 0) {
            this.FundsDisbursed_in_Houses6_19BLC = 0;
          }
          else {
            this.FundsDisbursed_in_Houses6_19BLC = result_19_20BLC[0].FundsDisbursed_in_Houses;
          }
        }
        catch
        {
          this.FundsDisbursed_in_Houses6_19BLC= 0;
        }
  
        
        try {
          if (result_19_20BLC[0].Houses_Grounded == 0) {
            this.Houses_Grounded6_19BLC = 0;
          }
          else {
            this.Houses_Grounded6_19BLC = result_19_20BLC[0].Houses_Grounded;
          }
        }
        catch
        {
          this.Houses_Grounded6_19BLC= 0;
        }
        
  
        try {
          if (result_19_20BLC[0].Houses_Completed == 0) {
            this.Houses_Completed6_19BLC = 0;
          }
          else {
            this.Houses_Completed6_19BLC = result_19_20BLC[0].Houses_Completed;
          }
        }
        catch
        {
          this.Houses_Completed6_19BLC= 0;
        }
  
  
        try {
          if (result_19_20BLC[0].HousesOccupied == 0) {
            this.HousesOccupied6_19BLC = 0;
          }
          else {
            this.HousesOccupied6_19BLC = result_19_20BLC[0].HousesOccupied;
          }
        }
        catch
        {
          this.HousesOccupied6_19BLC= 0;
        }
  
  
  //-----------------------------------
  
  try {
    if (result_19_20AHP[0].Housesinvolved == 0) {
      this.HouseInvolved6_19AHP = 0;
    }
    else {
      this.HouseInvolved6_19AHP = result_19_20AHP[0].Housesinvolved;
    }
  }
  catch
  {
    this.HouseInvolved6_19AHP= 0;
  }
  
  try {
    if (result_19_20AHP[0].FundsDisbursed_in_Houses == 0) {
      this.FundsDisbursed_in_Houses6_19AHP = 0;
    }
    else {
      this.FundsDisbursed_in_Houses6_19AHP = result_19_20AHP[0].FundsDisbursed_in_Houses;
    }
  }
  catch
  {
    this.FundsDisbursed_in_Houses6_19AHP= 0;
  }
  
  try {
    if (result_19_20AHP[0].Houses_Grounded == 0) {
      this.Houses_Grounded6_19AHP = 0;
    }
    else {
      this.Houses_Grounded6_19AHP = result_19_20AHP[0].Houses_Grounded;
    }
  }
  catch
  {
    this.Houses_Grounded6_19AHP= 0;
  }
  
  try {
    if (result_19_20AHP[0].Houses_Completed == 0) {
      this.Houses_Completed6_19AHP = 0;
    }
    else {
      this.Houses_Completed6_19AHP = result_19_20AHP[0].Houses_Completed;
    }
  }
  catch
  {
    this.Houses_Completed6_19AHP= 0;
  }
  
  try {
    if (result_19_20AHP[0].HousesOccupied == 0) {
      this.HousesOccupied6_19AHP = 0;
    }
    else {
      this.HousesOccupied6_19AHP = result_19_20AHP[0].HousesOccupied;
    }
  }
  catch
  {
    this.HousesOccupied6_19AHP= 0;
  }
  //----------------------------------
  
  try {
  if (resultISSR_19_20[0].Housesinvolved == 0) {
    this.HouseInvolved61_19ISSR = 0;
  }
  else {
    this.HouseInvolved61_19ISSR = resultISSR_19_20[0].Housesinvolved;
  }
  }
  catch
  {
  this.HouseInvolved61_19ISSR= 0;
  }
  
  try {
  if (resultISSR_19_20[0].FundsDisbursed_in_Houses == 0) {
    this.FundsDisbursed_in_Houses61_19ISSR = 0;
  }
  else {
    this.FundsDisbursed_in_Houses61_19ISSR = resultISSR_19_20[0].FundsDisbursed_in_Houses;
  }
  }
  catch
  {
  this.FundsDisbursed_in_Houses61_19ISSR= 0;
  }
  
  try {
  if (resultISSR_19_20[0].Houses_Grounded == 0) {
    this.Houses_Grounded61_19ISSR = 0;
  }
  else {
    this.Houses_Grounded61_19ISSR = resultISSR_19_20[0].Houses_Grounded;
  }
  }
  catch
  {
  this.Houses_Grounded61_19ISSR= 0;
  }
  
  try {
  if (resultISSR_19_20[0].Houses_Completed == 0) {
    this.Houses_Completed61_19ISSR = 0;
  }
  else {
    this.Houses_Completed61_19ISSR = resultISSR_19_20[0].Houses_Completed;
  }
  }
  catch
  {
  this.Houses_Completed61_19ISSR= 0;
  }
  
  try {
  if (resultISSR_19_20[0].HousesOccupied == 0) {
    this.HousesOccupied61_19ISSR = 0;
  }
  else {
    this.HousesOccupied61_19ISSR = resultISSR_19_20[0].HousesOccupied;
  }
  }
  catch
  {
        this.HousesOccupied61_19ISSR= 0;
  }
      
  compId = compId.replace(/'/g, "");
      
  if (compId =="0" ||compId =='ALL' || compId == "'ISSR,'AHP','BLC','CLSS','JNNURM'")
  {

  }
  else
  {
     if (compId =='CLSS,JnNURM')
     {
        this.ResetVariables_CLSS_JNNURM();
     }
     else if (compId =='ISSR')
     {
          this.ResetVariables_ISSR();
     }
     else if (compId =='ISSR,JnNURM')
     {
        //this.ResetVariables_ISSR();
        //this.ResetVariables_ISSR();
         // this.ResetVariables_CLSS();
     }
     else if (compId =='CLSS')
     {
      // alert('MYCOMP');
          this.Houses_GroundedJNG=0;
          this.Houses_CompletedJNC=0;
          this.HousesOccupiedJNO=0;
          
          this.ResetVariables_CLSS();
     }
     else if (compId =='CLSS,BLCS')
     {
        this.ResetVariables_CLSS_BLC();
        this.Houses_GroundedJNG=0;
        this.Houses_CompletedJNC=0;
        this.HousesOccupiedJNO=0;
     }
     else if (compId.trim() =='JnNURM')
     {
          this.ResetVariables_JN();
     } 
     else if ( compId =='AHP')
     {
        this.ResetVariables_AHP();
        // this.Houses_GroundedJNG=0;
        // this.Houses_CompletedJNC=0;
        // this.HousesOccupiedJNO=0;
     }
     else if ( compId =='BLCS')
     {
        this.ResetVariables_BLC();
        this.Houses_GroundedJNG=0;
        this.Houses_CompletedJNC=0;
        this.HousesOccupiedJNO=0;

     }
     else if ( compId =="'CLSS,AHP'")
     {
        this.ResetVariables_CLSS_AHP();
        this.Houses_GroundedJNG=0;
        this.Houses_CompletedJNC=0;
        this.HousesOccupiedJNO=0;
     }
     else if ( compId =="'BLCS,AHP'")
     {
        this.Houses_GroundedJNG=0;
        this.Houses_CompletedJNC=0;
        this.HousesOccupiedJNO=0;
     }
     else if (( compId =="'CLSS,BLCS,AHP'") ||( compId =="'BLCS,CLSS,AHP'")||( compId =="'AHP,CLSS,BLCS'"))
     {
  
        this.Houses_GroundedJNG=0;
        this.Houses_CompletedJNC=0;
        this.HousesOccupiedJNO=0;
     }
  
  }
  
    // 14-15  
      this.HouseInvolved1=   this.HouseInvolved114AHP +  this.HouseInvolved1B14 + this.Bene2014_15_CLSS + this.HouseInvolved1ISSR;// +this.Bene2014_15_CLSS;
      this.FundsDisbursed_in_Houses1 = this.FundsDisbursed_in_Houses114AHP + this.FundsDisbursed_in_Houses1B14+ this.Bene2014_15_CLSS +   this.FundsDisbursed_ISSR_Houses1;
      this.Houses_Grounded1 = this.Houses_Grounded114AHP + this.Houses_Grounded1B14 + this.Bene2014_15_CLSS +  this.Houses_GroundedJNG+  this.Houses_ISSRGrounded1;
      this.Houses_Completed1 = this.Houses_Completed114AHP + this.Houses_Completed1B14 +  this.Bene2014_15_CLSS +  this.Houses_CompletedJNC + this.Houses_ISSRCompleted1;
      this.HousesOccupied1 = this.HousesOccupied1B14  +this.HousesOccupied114AHP + this.Bene2014_15_CLSS +  this.HousesOccupiedJNO+  this.Houses_ISSROccupied1;
  
  // 15-16
         this.HouseInvolved2  =this.HouseInvolved2_15AHP +this.HouseInvolved2BLCS + this.Bene2015_16_CLSS +this.HouseInvolved21_ISSR_15 ;
         this.FundsDisbursed_in_Houses2  =this.FundsDisbursed_in_Houses2_15AHP +this.FundsDisbursed_in_Houses2BLCS +  this.Bene2015_16_CLSS +this.FundsDisbursed_in_Houses21_ISSR_15;
         this.Houses_Grounded2 = this.Houses_Grounded2_15AHP + this.Houses_Grounded2BLCS + this.Bene2015_16_CLSS +this.Houses_Grounded21_ISSR_15;
         this.Houses_Completed2 =this.Houses_Completed2_15AHP +this.Houses_Completed2BLCS +  this.Bene2015_16_CLSS +this.Houses_Completed21_ISSR_15 ;
         this.HousesOccupied2 =this.HousesOccupied2_15AHP + this.HousesOccupied2BLCS +  this.Bene2015_16_CLSS + this.HousesOccupied21_ISSR_15;
   
 
       // // 16-17 
        this.HouseInvolved3 = this.HouseInvolved3_16AHP + this.HouseInvolved3_16BLCS + this.Bene2016_17_CLSS + this.HouseInvolved31_16ISSR;
        this.FundsDisbursed_in_Houses3  =this.FundsDisbursed_in_Houses3_16AHP+ this.FundsDisbursed_in_Houses3_16BLCS + this.Bene2016_17_CLSS +this.FundsDisbursed_in_Houses31_16ISSR;
        this.Houses_Grounded3  =this.Houses_Grounded3_16BLCS + this.Houses_Grounded3_16AHP + this.Bene2016_17_CLSS + this.Houses_Grounded31_16ISSR;
        this.Houses_Completed3 =this.Houses_Completed3_16AHP + this.Houses_Completed3_16BLCS +this.Bene2016_17_CLSS + this.Houses_Completed31_16ISSR;

        this.HousesOccupied3 =this.HousesOccupied3_16AHP + this.HousesOccupied3_16BLCS + this.Bene2016_17_CLSS+ this.HousesOccupied31_16ISSR;
        
        // 17-18
        this.HouseInvolved4   =this.HouseInvolved4_17BLC  + this.HouseInvolved4_17AHP+ this.Bene2017_18_CLSS + this.HouseInvolved41_17ISSR;
        this.FundsDisbursed_in_Houses4 =this.FundsDisbursed_in_Houses4_17BLC +this.FundsDisbursed_in_Houses4_17AHP + this.Bene2017_18_CLSS +this.FundsDisbursed_in_Houses41_17ISSR;
        this.Houses_Grounded4  =this.Houses_Grounded4_17AHP +this.Houses_Grounded4_17BLC + this.Bene2017_18_CLSS + this.Houses_Grounded41_17ISSR;
        this.Houses_Completed4 =this.Houses_Completed4_17BLC +this.Houses_Completed4_17AHP + this.Bene2017_18_CLSS + this.Houses_Completed41_17ISSR;
        this.HousesOccupied4 =this.HousesOccupied4_17AHP + this.Houses_Completed4_17BLC + this.Bene2017_18_CLSS + this.HousesOccupied41_17ISSR;
  
  
  // 18-19 
  this.HouseInvolved5  =this.HouseInvolved5_18BLCS + this.HouseInvolved5_18AHP + this.Bene2018_19_CLSS + this.HouseInvolved51_18ISSR;
  this.FundsDisbursed_in_Houses5 =this.FundsDisbursed_in_Houses5_18BLCS +this.FundsDisbursed_in_Houses5_18AHP  + this.Bene2018_19_CLSS +this.FundsDisbursed_in_Houses51_18ISSR;
  this.Houses_Grounded5  =this.Houses_Grounded5_18AHP + this.Houses_Grounded5_18BLCS + this.Bene2018_19_CLSS + this.Houses_Grounded51_18ISSR;
  this.Houses_Completed5 =this.Houses_Completed5_18AHP + this.Houses_Completed5_18BLCS +  this.Bene2018_19_CLSS + this.Houses_Completed51_18ISSR;
  this.HousesOccupied5 =this.HousesOccupied5_18AHP + this.HousesOccupied5_18BLCS + this.Bene2018_19_CLSS + this.HousesOccupied51_18ISSR;
  
  
  // 19-20
  this.HouseInvolved6  =this.HouseInvolved6_19BLC  +this.HouseInvolved6_19AHP + this.Bene2019_20_CLSS + this.HouseInvolved61_19ISSR;
  this.FundsDisbursed_in_Houses6 =this.FundsDisbursed_in_Houses6_19BLC + this.FundsDisbursed_in_Houses6_19AHP + this.Bene2019_20_CLSS +this.FundsDisbursed_in_Houses61_19ISSR;
  this.Houses_Grounded6  =this.Houses_Grounded6_19BLC+ this.Houses_Grounded6_19AHP + this.Bene2019_20_CLSS + this.Houses_Grounded61_19ISSR;
  this.Houses_Completed6 =this.Houses_Completed6_19BLC +this.Houses_Completed6_19AHP + this.Bene2019_20_CLSS + this.Houses_Completed61_19ISSR;
  this.HousesOccupied6 =this.HousesOccupied6_19BLC  + this.HousesOccupied6_19AHP + this.Bene2019_20_CLSS + this.HousesOccupied61_19ISSR;
  
  this.THouseInvolvedNew  = parseFloat(this.HouseInvolved1) +parseFloat(this.HouseInvolved2) +parseFloat(this.HouseInvolved3) +parseFloat(this.HouseInvolved4) +parseFloat(this.HouseInvolved5) +parseFloat(this.HouseInvolved6);
  
  this.TFundsDisbursed_in_Houses   =this.FundsDisbursed_in_Houses1 +this.FundsDisbursed_in_Houses2 +this.FundsDisbursed_in_Houses3 +this.FundsDisbursed_in_Houses4 +this.FundsDisbursed_in_Houses5 +this.FundsDisbursed_in_Houses6;     
  this.THouses_Grounded  =this.Houses_Grounded1 +this.Houses_Grounded2 + this.Houses_Grounded3 +this.Houses_Grounded4 +this.Houses_Grounded5 +this.Houses_Grounded6;
  this.THouses_Completed =this.Houses_Completed1 +this.Houses_Completed2  +this.Houses_Completed3 +this.Houses_Completed4  +this.Houses_Completed5  +this.Houses_Completed6 ;
  this.THousesOccupied =this.HousesOccupied1 +this.HousesOccupied2+ this.HousesOccupied3 +this.HousesOccupied4 +this.HousesOccupied5 +this.HousesOccupied6 ;  
  this.FundsDisbursed_in_Houses2 = parseInt(this.FundsDisbursed_in_Houses2);
  this.FundsDisbursed_in_Houses4 = parseInt(this.FundsDisbursed_in_Houses4);
  this.FundsDisbursed_in_Houses5= parseInt(this.FundsDisbursed_in_Houses5);
  this.TFundsDisbursed_in_Houses =parseInt(this.TFundsDisbursed_in_Houses);


  this.THouseInvolved11 =this.HouseInvolved01 +    this.HouseInvolved11 +  this.HouseInvolved_21 + this.HouseInvolved_31 + this.HouseInvolved_41 +  this.HouseInvolved_51;
  this.TFundsDisbursed_in_Houses11 =this.FundsDisbursed_in_Houses01 + this.FundsDisbursed_in_Houses11 +this.FundsDisbursed_in_Houses_21 + this.FundsDisbursed_in_Houses_31 +this.FundsDisbursed_in_Houses_41 +this.FundsDisbursed_in_Houses_51;
 
  
  this.THouseInvolved11 =this.HouseInvolved1B14 + this.HouseInvolved2BLCS +this.HouseInvolved3_16BLCS + this.HouseInvolved4_17BLC +this.HouseInvolved5_18BLCS +this.HouseInvolved6_19BLC;


      });
      });
      });
      });
    });
  });
});
});
      //----------------------------------------------------------------------------------
    });
      });
    });
   });
  });
  });
  });
  });
  });
  }); 
  });
  }); 
  }

  ResetPopupJn()
  {
      
      this.HouseInvolved01 =0; 
      this.HouseInvolved11 =0;
       this.HouseInvolved_21 =0;
       this.HouseInvolved_31 =0;
        this.HouseInvolved_41 =0;
         this.HouseInvolved_51=0;
         
      this.FundsDisbursed_in_Houses01=0; 
        this.FundsDisbursed_in_Houses11 =0;
         this.FundsDisbursed_in_Houses_21 =0;
           this.FundsDisbursed_in_Houses3 =0;
            this.FundsDisbursed_in_Houses_41 =0; 
            this.FundsDisbursed_in_Houses_51=0;
      this.Houses_Grounded01 =0;
      this.Houses_Grounded11 =0;
      this.Houses_Grounded_21 =0;
      this.Houses_Grounded_31 =0;
      this.Houses_Grounded_41 =0;
      this.Houses_Grounded_51=0;
     
       this.Houses_Completed01 =0;
        this.Houses_Completed11 =0;
        this.Houses_Completed_21 =0;
        this.Houses_Completed_31 =0;
        this.Houses_Completed_41 =0;
        this.Houses_Completed_51=0;
       this.HousesOccupied01=0;
       this.HousesOccupied11 =0;
       this.HousesOccupied_21 =0;
       this.HousesOccupied_31 =0;
       this.HousesOccupied_41 =0;
       this.HousesOccupied_51=0;
       this.FundsDisbursed_in_Houses31_AHP=0;
  }

  fINrESET_CLSS()
  {
    this.sTotalPC =  0;
          this.sTotalCAI =  0;
          this.sTotalInst1 =  0;
          this.sTotalInst2 =  0;
          this.sTotalInst3 =  0;
          this.sTotal =  0;
          this.sTotalUC =  0; 
    this.PC19ISS= 0;
                    this.CAI19ISS = 0;
                    this.First19ISS = 0;
                    this.Second19ISS = 0;
                    this.Third19ISS = 0;
                    this.UC_Received19ISS = 0;
                    this.Total19ISS =  0;
                    
                    
                    this.PC18ISS= 0;
                  this.CAI18ISS = 0;
                  this.First18ISS = 0;
                  this.Second18ISS = 0;
                  this.Third18ISS = 0;
                  this.UC_Received18ISS = 0;
                  this.Total18ISS =  0;
                  
                   this.PC17ISS= 0;
                this.CAI17ISS = 0;
                this.First17ISS = 0;
                this.Second17ISS = 0;
                this.Third17ISS = 0;
                this.UC_Received17ISS = 0;
                this.Total17ISS =  0;
                
                
                  this.PC16ISS= 0;
              this.CAI16ISS = 0;
              this.First16ISS = 0;
              this.Second16ISS = 0;
              this.Third16ISS = 0;
              this.UC_Received16ISS = 0;
              this.Total16ISS =  0;
              
              this.PC15ISS= 0;
            this.CAI15ISS = 0;
            this.First15ISS = 0;
            this.Second15ISS = 0;
            this.Third15ISS = 0;
            this.UC_Received15ISS = 0;
            this.Total15ISS =  0;
            
            
            this.PC14ISS= 0;
          this.CAI14ISS = 0;
          this.First14ISS = 0;
          this.Second14ISS = 0;
          this.Third14ISS = 0;
          this.UC_Received14ISS = 0;
          this.Total14ISS  =  0;
          
          
          this.PC19AHP= 0;
                  this.CAI19AHP = 0;
                  this.First19AHP = 0;
                  this.Second19AHP = 0;
                  this.Third19AHP = 0;
                  this.UC_Received19AHP = 0;
                  this.Total19AHP  =  0;
                  
       this.PC18AHP= 0;
                this.CAI18AHP = 0;
                this.First18AHP = 0;
                this.Second18AHP = 0;
                this.Third18AHP = 0;
                this.UC_Received18AHP = 0;
                this.Total18AHP  =  0;
                
                
                this.PC17AHP= 0;
              this.CAI17AHP = 0;
              this.First17AHP = 0;
              this.Second17AHP = 0;
              this.Third17AHP = 0;
              this.UC_Received17AHP = 0;
              this.Total17AHP  =  0;
              
            this.PC16AHP= 0;
            this.CAI16AHP = 0;
            this.First16AHP = 0;
            this.Second16AHP = 0;
            this.Third16AHP = 0;
            this.UC_Received16AHP = 0;
            this.Total16AHP  =  0;
            
           
              this.PC15AHP= 0;
          this.CAI15AHP = 0;
          this.First15AHP = 0;
          this.Second15AHP = 0;
          this.Third15AHP = 0;
          this.UC_Received15AHP = 0;
          this.Total15AHP  =  0;
          
               this.PC14AHP= 0;
        this.CAI14AHP = 0;
        this.First14AHP = 0;
        this.Second14AHP = 0;
        this.Third14AHP = 0;
        this.UC_Received14AHP = 0;
        this.Total14AHP  =  0;
        
       this.PC19=0;
              this.CAI19 = 0;
              this.First19 = 0;
              this.Second19 = 0;
              this.Third19 = 0;
              this.UC_Received19 = 0;;
              this.Total19  =  0;
              
       this.PC18=0;
            this.CAI18 = 0;
            this.First18 = 0;
            this.Second18 = 0;
            this.Third18 = 0;
            this.UC_Received18 = 0;
            this.Total18  =  0;            
       this.PC17=0;
          this.CAI17 = 0;
          this.First17 = 0;
          this.Second17 = 0;
          this.Third17 = 0;
          this.UC_Received17 = 0;
          this.Total17  =  0;
          
       this.PC16=0;
          this.CAI16 = 0;
          this.First16 = 0;
          this.Second16 = 0;
          this.Third16 = 0;
          this.UC_Received16 = 0;
          this.Total16  =  0;
          
   this.PC15BLC=0;
        this.CAI15BLC = 0;
        this.First15BLC = 0;
        this.Second15BLC = 0;
        this.Third15BLC = 0;
        this.UC_Received15BLC = 0;
        this.Total15BLC  =  0;
        
        this.PC_BLC14=0;
        this.CAI_BLC14 = 0;
        this.First_BLC14 = 0;
        this.Second_BLC14 = 0;
        this.Third_BLC14 = 0;
        this.UC_Received_BLC14 = 0; 
        this.Total_BLC14  =  0;

        this.First_BLC14   =  0;
         this.First14AHP  =  0;
         this.First14ISS  =  0;
        this.Second_BLC14  =  0;
        this.Second14AHP  =  0;
        this.Second14ISS  =  0;
        this.Third_BLC14  =  0;
        this.Third14AHP  =  0;
        this.Third14ISS =  0;
        this.UC_Received_BLC14 =  0;
         this.UC_Received14AHP  =  0;
          this.UC_Received14ISS =  0;
        
        // this.Loan_TOTAL_CL=result_CLSSFin19[0].Loan_TOTAL;
        // this.Sub2014_15_CL = result_CLSSFin19[0].Subsidy2014_15;
        // this.Sub2015_16_CL = result_CLSSFin19[0].Subsidy2015_16;
        // this.Sub2016_17_CL = result_CLSSFin19[0].Subsidy2016_17;
        // this.Sub2017_18_CL = result_CLSSFin19[0].Subsidy2017_18,
        // this.Sub2018_19_CL = result_CLSSFin19[0].Subsidy2017_18,
        // this.Sub2019_20_CL = result_CLSSFin19[0].Subsidy2017_18,
        // this.UC_Received_CL = result_CLSSFin19[0].UC_Received; 

        this.First15AHP = 0;
        this.Second15AHP =0;
        this.Third15AHP = 0;
        this.UC_Received15AHP = 0;
        
        this.First16AHP = 0;
        this.Second16AHP =0;
        this.Third16AHP = 0;
        this.UC_Received16AHP = 0;

        
        this.First17AHP = 0;
        this.Second17AHP =0;
        this.Third17AHP = 0;
        this.UC_Received17AHP = 0;

        
        this.First18AHP = 0;
        this.Second18AHP =0;
        this.Third18AHP = 0;
        this.UC_Received18AHP = 0;

        this.First19AHP = 0;
        this.Second19AHP =0;
        this.Third19AHP = 0;
        this.UC_Received19AHP = 0;

        this.First15BLC = 0;
        this.Second15BLC =0;
        this.Third15BLC = 0;
        this.UC_Received15BLC = 0;

        this.First16BLC = 0;
        this.Second16BLC =0;
        this.Third16BLC = 0;
        this.UC_Received16 = 0;

        this.First17BLC = 0;
        this.Second17BLC =0;
        this.Third17BLC = 0;
        this.UC_Received17 = 0;


        this.First18BLC = 0;
        this.Second18BLC =0;
        this.Third18BLC = 0;
        this.UC_Received18 = 0;


        this.First19 = 0;
        this.Second19 =0;
        this.Third19 = 0;
        this.UC_Received19ISS = 0;


  }
  SendData()
  {
      this.router.navigate(['/Admin/VerticalHousesDetails'],{ queryParams: { 
      stateCode: this.stateCode,
      distCode:this.districtCode,
      cityCode:this.cityCode,
      compId:this.Compid
    } });
  }
  SendDataFin()
  {
    debugger;
    this.router.navigate(['/Admin/VerticalFinancialDetails'],{ queryParams: { 
      stateCode: this.stateCode,
      distCode:this.districtCode,
      cityCode:this.cityCode,
      compId:this.Compid
    } });
  }

  GetFinancialData (stateCodes, districtCodes, cityCodes, Compid)
  {    
   // alert(stateCodes);
    this.sTotalPC= 0;
    this.sTotalCAI   = 0;    
    this.sTotalInst1 = 0;
    this.sTotalInst2 = 0;
    this.sTotalInst3 = 0;
    this.sTotal = 0;
    this.sTotalUC= 0;


    this.PC19ISS= 0;
                    this.CAI19ISS = 0;
                    this.First19ISS = 0;
                    this.Second19ISS = 0;
                    this.Third19ISS = 0;
                    this.UC_Received19ISS = 0;
                    this.Total19ISS =  0;
                    
                    
                    this.PC18ISS= 0;
                  this.CAI18ISS = 0;
                  this.First18ISS = 0;
                  this.Second18ISS = 0;
                  this.Third18ISS = 0;
                  this.UC_Received18ISS = 0;
                  this.Total18ISS =  0;
                  
                   this.PC17ISS= 0;
                this.CAI17ISS = 0;
                this.First17ISS = 0;
                this.Second17ISS = 0;
                this.Third17ISS = 0;
                this.UC_Received17ISS = 0;
                this.Total17ISS =  0;
                
                
                  this.PC16ISS= 0;
              this.CAI16ISS = 0;
              this.First16ISS = 0;
              this.Second16ISS = 0;
              this.Third16ISS = 0;
              this.UC_Received16ISS = 0;
              this.Total16ISS =  0;
              
              this.PC15ISS= 0;
            this.CAI15ISS = 0;
            this.First15ISS = 0;
            this.Second15ISS = 0;
            this.Third15ISS = 0;
            this.UC_Received15ISS = 0;
            this.Total15ISS =  0;
            
            
            this.PC14ISS= 0;
          this.CAI14ISS = 0;
          this.First14ISS = 0;
          this.Second14ISS = 0;
          this.Third14ISS = 0;
          this.UC_Received14ISS = 0;
          this.Total14ISS  =  0;
          
          
          this.PC19AHP= 0;
                  this.CAI19AHP = 0;
                  this.First19AHP = 0;
                  this.Second19AHP = 0;
                  this.Third19AHP = 0;
                  this.UC_Received19AHP = 0;
                  this.Total19AHP  =  0;
                  
       this.PC18AHP= 0;
                this.CAI18AHP = 0;
                this.First18AHP = 0;
                this.Second18AHP = 0;
                this.Third18AHP = 0;
                this.UC_Received18AHP = 0;
                this.Total18AHP  =  0;
                
                
                this.PC17AHP= 0;
              this.CAI17AHP = 0;
              this.First17AHP = 0;
              this.Second17AHP = 0;
              this.Third17AHP = 0;
              this.UC_Received17AHP = 0;
              this.Total17AHP  =  0;
              
            this.PC16AHP= 0;
            this.CAI16AHP = 0;
            this.First16AHP = 0;
            this.Second16AHP = 0;
            this.Third16AHP = 0;
            this.UC_Received16AHP = 0;
            this.Total16AHP  =  0;
            
           
              this.PC15AHP= 0;
          this.CAI15AHP = 0;
          this.First15AHP = 0;
          this.Second15AHP = 0;
          this.Third15AHP = 0;
          this.UC_Received15AHP = 0;
          this.Total15AHP  =  0;
          
               this.PC14AHP= 0;
        this.CAI14AHP = 0;
        this.First14AHP = 0;
        this.Second14AHP = 0;
        this.Third14AHP = 0;
        this.UC_Received14AHP = 0;
        this.Total14AHP  =  0;
        
       this.PC19=0;
              this.CAI19 = 0;
              this.First19 = 0;
              this.Second19 = 0;
              this.Third19 = 0;
              this.UC_Received19 = 0;;
              this.Total19  =  0;
              
       this.PC18=0;
            this.CAI18 = 0;
            this.First18 = 0;
            this.Second18 = 0;
            this.Third18 = 0;
            this.UC_Received18 = 0;
            this.Total18  =  0;            
       this.PC17=0;
          this.CAI17 = 0;
          this.First17 = 0;
          this.Second17 = 0;
          this.Third17 = 0;
          this.UC_Received17 = 0;
          this.Total17  =  0;
          
       this.PC16=0;
          this.CAI16 = 0;
          this.First16 = 0;
          this.Second16 = 0;
          this.Third16 = 0;
          this.UC_Received16 = 0;
          this.Total16  =  0;
          
   this.PC15BLC=0;
        this.CAI15BLC = 0;
        this.First15BLC = 0;
        this.Second15BLC = 0;
        this.Third15BLC = 0;
        this.UC_Received15BLC = 0;
        this.Total15BLC  =  0;
        
 this.PC_BLC14=0;
          this.CAI_BLC14 = 0;
          this.First_BLC14 = 0;
          this.Second_BLC14 = 0;
          this.Third_BLC14 = 0;
          this.UC_Received_BLC14 = 0; 
          this.Total_BLC14  =  0;
          this.sTotalPC =  0;
          this.sTotalCAI =  0;
          this.sTotalInst1 =  0;
          this.sTotalInst2 =  0;
          this.sTotalInst3 =  0;
          this.sTotal =  0;
          this.sTotalUC =  0;
                        
                                              
          
            this.CAI_BLC14 =0;
            this.PC_BLC14=  0;
          this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"BLCS","2014-15").subscribe(result_Fin14=>{
      try { 
          this.PC_BLC14=result_Fin14[0].Project_Cost;
          this.CAI_BLC14 = result_Fin14[0].Central_Assistance_involved;
          this.First_BLC14 = result_Fin14[0].FirstInstallmentReleased;
          this.Second_BLC14 = result_Fin14[0].SecondInstallmentReleased;
          this.Third_BLC14 = result_Fin14[0].ThirdInstallmentReleased;
          this.UC_Received_BLC14 = result_Fin14[0].UC_Received; 
          this.Total_BLC14  =  this.First_BLC14 +   this.Second_BLC14 + this.Third_BLC14;
         // alert(this.PC_BLC14);

      }
      catch{}
      finally{
        //alert(this.PC_BLC14);
      }



      this.PC15BLC= 0;
      this.CAI15BLC =0;
      this.UC_Received15BLC =0;
      this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"BLCS","2015-16").subscribe(result_Fin15=>{
        try { 
        this.PC15BLC=result_Fin15[0].Project_Cost;
        this.CAI15BLC = result_Fin15[0].Central_Assistance_involved;
        this.First15BLC = result_Fin15[0].FirstInstallmentReleased;
        this.Second15BLC = result_Fin15[0].SecondInstallmentReleased;
        this.Third15BLC = result_Fin15[0].ThirdInstallmentReleased;
        this.UC_Received15BLC = result_Fin15[0].UC_Received;
        this.Total15BLC  =  this.First15BLC +   this.Second15BLC + this.Third15BLC;
        }
        catch{}
        finally{}

       // alert(this.PC15BLC);


        
        this.PC16= 0;
        this.CAI16 = 0;
        this.UC_Received16 = 0;
        this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"BLCS","2016-17").subscribe(result_Fin16=>{
          try { 
          this.PC16=result_Fin16[0].Project_Cost;
          this.CAI16  = result_Fin16[0].Central_Assistance_involved;
          this.First16 = result_Fin16[0].FirstInstallmentReleased;
          this.Second16 = result_Fin16[0].SecondInstallmentReleased;
          this.Third16 = result_Fin16[0].ThirdInstallmentReleased;
          this.UC_Received16 = result_Fin16[0].UC_Received;
          this.Total16  =  this.First16 +   this.Second16 + this.Third16;
          }
          catch{}
          finally{}
  
          this.PC17= 0;
          this.CAI17 =0;
          this.UC_Received17 =0;
        this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"BLCS","2017-18").subscribe(result_Fin17=>{
          try { 
          this.PC17=result_Fin17[0].Project_Cost;
          this.CAI17 = result_Fin17[0].Central_Assistance_involved;
          this.First17 = result_Fin17[0].FirstInstallmentReleased;
          this.Second17 = result_Fin17[0].SecondInstallmentReleased;
          this.Third17 = result_Fin17[0].ThirdInstallmentReleased;
          this.UC_Received17 = result_Fin17[0].UC_Received;
          this.Total17  =  this.First17 +   this.Second17 + this.Third17;
          }
          catch{}
          finally{}

          

          this.PC18= 0;
          this.CAI18 =0;
          this.UC_Received18 =0;
          this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"BLCS","2018-19").subscribe(result_Fin18=>{
            try { 
            this.PC18=result_Fin18[0].Project_Cost;
            this.CAI18 = result_Fin18[0].Central_Assistance_involved;
            this.First18 = result_Fin18[0].FirstInstallmentReleased;
            this.Second18 = result_Fin18[0].SecondInstallmentReleased;
            this.Third18 = result_Fin18[0].ThirdInstallmentReleased;
            this.UC_Received18 = result_Fin18[0].UC_Received;
            this.Total18  =  this.First18 +   this.Second18 + this.Third18;
            }
            catch{}
            finally{}




            this.PC19= 0;
            this.CAI19 =0;
            this.UC_Received19 =0; 
            this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"BLCS","2019-20").subscribe(result_Fin19=>{
              try { 
              this.PC19=result_Fin19[0].Project_Cost;
              this.CAI19 = result_Fin19[0].Central_Assistance_involved;
              this.First19 = result_Fin19[0].FirstInstallmentReleased;
              this.Second19 = result_Fin19[0].SecondInstallmentReleased;
              this.Third19 = result_Fin19[0].ThirdInstallmentReleased;
              this.UC_Received19 = result_Fin19[0].UC_Received;
              this.Total19  =  this.First19 +   this.Second19 + this.Third19;
              }
              catch{}
              finally{}
       


              this.PC14AHP= 0;
              this.CAI14AHP =0;
              this.UC_Received14AHP = 0;
        this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"AHP","2014-15").subscribe(result_FinAH14=>{
        try { 
        this.PC14AHP= result_FinAH14[0].Project_Cost;
        this.CAI14AHP = result_FinAH14[0].Central_Assistance_involved;
        this.First14AHP = result_FinAH14[0].FirstInstallmentReleased;
        this.Second14AHP = result_FinAH14[0].SecondInstallmentReleased;
        this.Third14AHP = result_FinAH14[0].ThirdInstallmentReleased;
        this.UC_Received14AHP = result_FinAH14[0].UC_Received;
        this.Total14AHP  =  this.First14AHP +   this.Second14AHP + this.Third14AHP;
  
        }
        catch{}
        finally{}

        
        
        this.PC15AHP= 0;
        this.CAI15AHP =0;
        this.UC_Received15AHP =0;
        this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"AHP","2015-16").subscribe(result_FinAH15=>{
          try { 
          this.PC15AHP= result_FinAH15[0].Project_Cost;
          this.CAI15AHP = result_FinAH15[0].Central_Assistance_involved;
          this.First15AHP = result_FinAH15[0].FirstInstallmentReleased;
          this.Second15AHP = result_FinAH15[0].SecondInstallmentReleased;
          this.Third15AHP = result_FinAH15[0].ThirdInstallmentReleased;
          this.UC_Received15AHP = result_FinAH15[0].UC_Received;
          this.Total15AHP  =  this.First15AHP +   this.Second15AHP + this.Third15AHP;
          
          }
          catch{}
          finally{}
           

        
          this.PC16AHP= 0;
          this.CAI16AHP =0;
          this.UC_Received16AHP =0;
          this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"AHP","2016-17").subscribe(result_FinAH16=>{
            try { 
            this.PC16AHP= result_FinAH16[0].Project_Cost;
            this.CAI16AHP = result_FinAH16[0].Central_Assistance_involved;
            this.First16AHP = result_FinAH16[0].FirstInstallmentReleased;
            this.Second16AHP = result_FinAH16[0].SecondInstallmentReleased;
            this.Third16AHP = result_FinAH16[0].ThirdInstallmentReleased;
            this.UC_Received16AHP = result_FinAH16[0].UC_Received;
            this.Total16AHP  =  this.First16AHP +   this.Second16AHP + this.Third16AHP;
            
            }
            catch{}
            finally{}
 

            this.PC17AHP= 0;
            this.CAI17AHP =0;
            this.UC_Received17AHP =0;
           // this.UC_Received18AHP    this.UC_Received17AHP 
            this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"AHP","2017-18").subscribe(result_FinAH17=>{
              try { 
              this.PC17AHP= result_FinAH17[0].Project_Cost;
              this.CAI17AHP = result_FinAH17[0].Central_Assistance_involved;
              this.First17AHP = result_FinAH17[0].FirstInstallmentReleased;
              this.Second17AHP = result_FinAH17[0].SecondInstallmentReleased;
              this.Third17AHP = result_FinAH17[0].ThirdInstallmentReleased;
              this.UC_Received17AHP = result_FinAH17[0].UC_Received;
              this.Total17AHP  =  this.First17AHP +   this.Second17AHP + this.Third17AHP;
              
              }
              catch{}
              finally{}
              this.UC_Received17 =  
              this.PC18AHP= 0;
              this.CAI18AHP =0;


              
              this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"AHP","2018-19").subscribe(result_FinAH18=>{
                try { 
                this.PC18AHP= result_FinAH18[0].Project_Cost;
                this.CAI18AHP = result_FinAH18[0].Central_Assistance_involved;
                this.First18AHP = result_FinAH18[0].FirstInstallmentReleased;
                this.Second18AHP = result_FinAH18[0].SecondInstallmentReleased;
                this.Third18AHP = result_FinAH18[0].ThirdInstallmentReleased;
                this.UC_Received18AHP = result_FinAH18[0].UC_Received;
                this.Total18AHP  =  this.First18AHP +   this.Second18AHP + this.Third18AHP;
                
                }
                catch{}
                finally{}
               
                this.CAI19AHP =0;
                this.PC19AHP =0;
                this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"AHP","2019-20").subscribe(result_FinAH19=>{
                  try { 
                  this.PC19AHP= result_FinAH19[0].Project_Cost;
                  this.CAI19AHP = result_FinAH19[0].Central_Assistance_involved;
                  this.First19AHP = result_FinAH19[0].FirstInstallmentReleased;
                  this.Second19AHP = result_FinAH19[0].SecondInstallmentReleased;
                  this.Third19AHP = result_FinAH19[0].ThirdInstallmentReleased;
                  this.UC_Received19AHP = result_FinAH19[0].UC_Received;
                  this.Total19AHP  =  this.First19AHP +   this.Second19AHP + this.Third19AHP;
                  
                  }
                  catch{}
                  finally{}
  
                  
                this.PC14ISS =0;
                this.CAI14ISS = 0;
                this.UC_Received14ISS = 0;
        this.service.GetFinancialISSR_Data(stateCodes,districtCodes ,cityCodes,"ISSR","2014-15").subscribe(result_FinISSR_14=>{
          try { 
          this.PC14ISS= result_FinISSR_14[0].Project_Cost;
          this.CAI14ISS = result_FinISSR_14[0].Central_Assistance_involved;
          this.First14ISS = result_FinISSR_14[0].FirstInstallmentReleased;
          this.Second14ISS = result_FinISSR_14[0].SecondInstallmentReleased;
          this.Third14ISS = result_FinISSR_14[0].ThirdInstallmentReleased;
          this.UC_Received14ISS = result_FinISSR_14[0].UC_Received;
          this.Total14ISS  =  this.First14ISS +   this.Second14ISS + this.Third14ISS;
          
          }
          catch{}
          finally{}

          this.PC15ISS= 0;
          this.CAI15ISS =0;
          this.UC_Received15ISS=0;
          this.service.GetFinancialISSR_Data(stateCodes,districtCodes ,cityCodes,"ISSR","2015-16").subscribe(result_FinISSR_15=>{
            try { 
            this.PC15ISS= result_FinISSR_15[0].Project_Cost;
            this.CAI15ISS = result_FinISSR_15[0].Central_Assistance_involved;
            this.First15ISS = result_FinISSR_15[0].FirstInstallmentReleased;
            this.Second15ISS = result_FinISSR_15[0].SecondInstallmentReleased;
            this.Third15ISS = result_FinISSR_15[0].ThirdInstallmentReleased;
            this.UC_Received15ISS = result_FinISSR_15[0].UC_Received;
            this.Total15ISS =  this.First15ISS +   this.Second15ISS + this.Third15ISS;
              
            }
            catch{}
            finally{}
            this.PC16ISS= 0;
            this.CAI16ISS =0;
            this.UC_Received16ISS= 0;
            this.service.GetFinancialISSR_Data(stateCodes,districtCodes ,cityCodes,"ISSR","2016-17").subscribe(result_FinISSR_16=>{
              try { 
              this.PC16ISS= result_FinISSR_16[0].Project_Cost;
              this.CAI16ISS = result_FinISSR_16[0].Central_Assistance_involved;
              this.First16ISS = result_FinISSR_16[0].FirstInstallmentReleased;
              this.Second16ISS = result_FinISSR_16[0].SecondInstallmentReleased;
              this.Third16ISS = result_FinISSR_16[0].ThirdInstallmentReleased;
              this.UC_Received16ISS = result_FinISSR_16[0].UC_Received;
              this.Total16ISS =  this.First16ISS +   this.Second16ISS + this.Third16ISS;
              
              }
              catch{}
              finally{}
           //   alert(this.CAI16ISS);

              this.PC17ISS= 0;
              this.CAI17ISS = 0;
              this.UC_Received17ISS= 0;
              this.service.GetFinancialISSR_Data(stateCodes,districtCodes ,cityCodes,"ISSR","2017-18").subscribe(result_FinISSR_17=>{
                try { 
                this.PC17ISS= result_FinISSR_17[0].Project_Cost;
                this.CAI17ISS = result_FinISSR_17[0].Central_Assistance_involved;
                this.First17ISS = result_FinISSR_17[0].FirstInstallmentReleased;
                this.Second17ISS = result_FinISSR_17[0].SecondInstallmentReleased;
                this.Third17ISS = result_FinISSR_17[0].ThirdInstallmentReleased;
                this.UC_Received17ISS = result_FinISSR_17[0].UC_Received;
                this.Total17ISS =  this.First17ISS +   this.Second17ISS + this.Third17ISS;
                
                }
                catch{}
                finally{}
                this.PC18ISS= 0;
                this.PC19ISS= 0;
                this.CAI18ISS =0;

                this.service.GetFinancialISSR_Data(stateCodes,districtCodes ,cityCodes,"ISSR","2018-19").subscribe(result_FinISSR_18=>{
                  try { 
                  this.PC18ISS= result_FinISSR_18[0].Project_Cost;
                  this.CAI18ISS = result_FinISSR_18[0].Central_Assistance_involved;
                  this.First18ISS = result_FinISSR_18[0].FirstInstallmentReleased;
                  this.Second18ISS = result_FinISSR_18[0].SecondInstallmentReleased;
                  this.Third18ISS = result_FinISSR_18[0].ThirdInstallmentReleased;
                  this.UC_Received18ISS = result_FinISSR_18[0].UC_Received;
                  this.Total18ISS =  this.First18ISS +   this.Second18ISS + this.Third18ISS;
                  
                  }
                  catch{}
                  finally{}
                  
                  this.CAI19ISS=0; 
                  this.PC19ISS =0;
                  this.service.GetFinancialISSR_Data(stateCodes,districtCodes ,cityCodes,"ISSR","2019-20").subscribe(result_FinISSR_19=>{
                    try { 
                    this.PC19ISS= result_FinISSR_19[0].Project_Cost;
                    this.CAI19ISS = result_FinISSR_19[0].Central_Assistance_involved;
                    this.First19ISS = result_FinISSR_19[0].FirstInstallmentReleased;
                    this.Second19ISS = result_FinISSR_19[0].SecondInstallmentReleased;
                    this.Third19ISS = result_FinISSR_19[0].ThirdInstallmentReleased;
                    this.UC_Received19ISS = result_FinISSR_19[0].UC_Received;
                    this.Total19ISS =  this.First19ISS +   this.Second19ISS + this.Third19ISS;
                    
                    }
                    catch{}
                    finally{}

              //this.Sub2015_16_CL First18ISS 
              this.service.GetFinancialCLSS_Data(stateCodes).subscribe(result_CLSSFin19=>{
                try 
                { 
                  this.Loan_TOTAL_CL=result_CLSSFin19[0].Loan_TOTAL;
                  this.Sub2014_15_CL = result_CLSSFin19[0].Subsidy2014_15;
                  this.Sub2015_16_CL = result_CLSSFin19[0].Subsidy2015_16;
                  this.Sub2016_17_CL = result_CLSSFin19[0].Subsidy2016_17;
                  this.Sub2017_18_CL = result_CLSSFin19[0].Subsidy2017_18,
                  this.Sub2018_19_CL = result_CLSSFin19[0].Subsidy2018_19,
                  this.Sub2019_20_CL = result_CLSSFin19[0].Subsidy2019_20,
                  this.UC_Received_CL = result_CLSSFin19[0].UC_Received; 
                }
                catch{}
                finally{}
                            
              // this.First14 = this.First14 +   this.Sub2014_15_CL ;
              // this.First15 = this.First15 +   this.Sub2015_16_CL ;
              // this.First16 = this.First16 +   this.Sub2016_17_CL ;
              // this.First17 = this.First17 +   this.Sub2017_18_CL ;
              // this.First18 = this.First18 +   this.Sub2018_19_CL ;
              // this.First19 = this.First19 +   this.Sub2019_20_CL ;

              
              //this.PC_BLC14 +this.PC15BLC +this.PC16 +this.PC17  +this.PC18 +this.PC19
             // PC14AHP +           this.PC14ISS this.PC15AHP             this.PC16AHP  this.PC17AHP 
             //this.PC18AHP        

             if (Compid =="CLSS")
             {
              // alert(0);
              this.fINrESET_CLSS();
             }
             
 
              this.PC14 =this.PC14ISS +this.PC14AHP + this.PC_BLC14;
              
              this.CAI14 =this.CAI_BLC14 + this.CAI14AHP +this.CAI14ISS +this.Sub2014_15_CL;
              this.First14 = this.First_BLC14 + this.First14AHP +this.First14ISS +this.Sub2014_15_CL;
              this.Second14 =this.Second_BLC14 +this.Second14AHP +this.Second14ISS ;
              this.Third14 =this.Third_BLC14 +this.Third14AHP +this.Third14ISS;
              this.UC_Received14  =  this.UC_Received_BLC14 + this.UC_Received14AHP + this.UC_Received14ISS;
                
               this.PC15=this.PC15ISS +this.PC15AHP + this.PC15BLC;
              this.CAI15 =this.CAI15BLC + this.CAI15AHP +this.CAI15ISS +this.Sub2015_16_CL;
              this.First15 = this.First15BLC + this.First15AHP +this.First15ISS +this.Sub2015_16_CL;
              this.Second15 =this.Second15BLC +this.Second15AHP +this.Second15ISS;
              this.Third15 =this.Third15BLC +this.Third15AHP +this.Third15ISS;
              this.UC_Received15  =  this.UC_Received15BLC + this.UC_Received15AHP   + this.UC_Received15ISS;
            //  alert(this.CAI15 );
              

              this.PC16=this.PC16ISS +this.PC16AHP + this.PC16;
              this.CAI16 =this.CAI16 + this.CAI16AHP +this.CAI16ISS  +this.Sub2016_17_CL;
              this.First16 = this.First16BLC + this.First16 +this.First16ISS  +this.Sub2016_17_CL;
              this.Second16 =this.Second16 +this.Second16AHP +this.Second16ISS;
              this.Third16 =this.Third16 +this.Third16AHP +this.Third16ISS;
              this.UC_Received16  =  this.UC_Received16 + this.UC_Received15AHP   + this.UC_Received16ISS;
              //alert(this.CAI16 );
              
              this.PC17=this.PC17ISS +this.PC17AHP + this.PC17;
              this.CAI17 =this.CAI17 + this.CAI17AHP +this.CAI17ISS +this.Sub2017_18_CL;

              this.First17 = this.First17BLC + this.First17AHP +this.First17ISS  +this.Sub2017_18_CL;
              this.Second17 =this.Second17 +this.Second17AHP +this.Second17ISS;
              this.Third17 =this.Third17 +this.Third17AHP +this.Third17ISS;
              this.UC_Received17  =  this.UC_Received17 + this.UC_Received17AHP   + this.UC_Received17ISS;
              


              this.PC18=this.PC18ISS +this.PC18AHP + this.PC18;
              this.CAI18 =this.CAI18 + this.CAI18AHP +this.CAI18ISS +this.Sub2018_19_CL;
              this.First18 = this.First18 + this.First18AHP +this.First18ISS  +this.Sub2018_19_CL;
              this.Second18 =this.Second18  +this.Second18AHP +this.Second18ISS;
              this.Third18 =this.Third18 +this.Third18AHP +this.Third18ISS;
              this.UC_Received18  =  this.UC_Received18 + this.UC_Received18AHP   + this.UC_Received18ISS;
              //alert(this.CAI18);

             


              this.PC19= this.PC19ISS + this.PC19AHP + this.PC19;
              this.CAI19 = this.CAI19 + this.CAI19AHP + this.CAI19ISS +this.Sub2019_20_CL;
              this.First19 = this.First19 + this.First19AHP + this.First19ISS  +this.Sub2019_20_CL;
              this.Second19 = this.Second19  +this.Second19AHP +this.Second19ISS;
              this.Third19 = this.Third19 +this.Third19AHP +this.Third19ISS;
              this.UC_Received19  =  this.UC_Received19 + this.UC_Received19AHP + this.UC_Received19ISS;
             // alert(this.CAI19);
 
              this.sTotalPC =this.PC14 +this.PC15 +this.PC16 +this.PC17 +this.PC18 +this.PC19  + this.Loan_TOTAL_CL;
               

               
              this.sTotalCAI =this.CAI14+this.CAI15+this.CAI16+this.CAI17+this.CAI18+this.CAI19;
              this.sTotalInst2 = this.Second14 +this.Second15 +this.Second16+this.Second17 +this.Second18 +this.Second19;
              this.Total14 =this.First14 + this.Second14 + this.Third14;
              this.Total15 =this.First15 + this.Second15 + this.Third15;
              this.Total16 =this.First16 + this.Second16 + this.Third16;
              this.Total17 =this.First17 + this.Second17 + this.Third17;
              this.Total18 =this.First18 + this.Second18 + this.Third18;
              this.Total19 =this.First19 + this.Second19 + this.Third19;

              this.sTotal = this.Total14 +this.Total15 +this.Total16 +this.Total17 +this.Total18 +this.Total19;
              this.sTotalInst1 =this.First14 +this.First15 +this.First16 +this.First17 +this.First18 +this.First19;
              this.sTotalUC = this.UC_Received14 +this.UC_Received15 +this.UC_Received16 +this.UC_Received17 +this.UC_Received18 +this.UC_Received19 ;
              

              this.sTotalPC = this.PC14 + this.PC15 +this.PC16 +this.PC17 + this.PC18 +this.PC19  + this.Loan_TOTAL_CL;;
              
              this.sTotalCAI =this.CAI14 +this.CAI15 +this.CAI16 +this.CAI17 +this.CAI18 +this.CAI19;
              this.sTotalInst1 = this.First14 +this.First15 +this.First16 +this.First17 +this.First18 +this.First19;  
              this.sTotalInst2 = this.Second14 +this.Second15 +this.Second16 +this.Second17 +this.Second18 +this.Second19;  
              this.sTotalInst3 = this.Third14 +this.Third15 +this.Third16 +this.Third17 +this.Third18 +this.Third19;  
              this.sTotal =this.sTotalInst1 +this.sTotalInst2 +this.sTotalInst3;
              this.sTotalUC =this.UC_Received14 +this.UC_Received15 +this.UC_Received16 +this.UC_Received17 +this.UC_Received18 +this.UC_Received19;
              
            })
            }) 
          }) 
          }) 
          }) 

          }) 
          }) 
          }) 
            })
             })
            })
          })
        })
      })
        })

        })
      })
      })
   })
  }
  
}

