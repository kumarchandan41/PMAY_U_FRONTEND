import { Component, OnInit } from '@angular/core';

//import * as CanvasJS from 'F:/AngularAll/HFACharts/NBOCharts/src/canvasjs.min.js';
import * as CanvasJS from 'src/assets/canvasjs.min.js';
//import * as CanvasJS from 'src/canvasjs.min.js';

import { GraphService } from 'src/app/financeReport/service/graph.service';

//import { BuildingServiceService } from 'src/app/service/building-service.service';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable, never } from 'rxjs';
//import { Charts } from 'src/app/model/charts.model';
import { Alert } from 'selenium-webdriver';
import jsPDF from 'jspdf';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
//import 'jspdf-autotable';
//import {  District, States, City } from 'src/app/model/charts.model';
//import { Observable } from 'rxjs'

//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Houses_Status } from '../model/chart';
import { float } from 'html2canvas/dist/types/css/property-descriptors/float';
import * as $ from 'jquery';

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
  selector: 'app-vertical-financial-status',
  templateUrl: './vertical-financial-status.component.html',
  styleUrls: ['./vertical-financial-status.component.css']
})

export class VerticalFinancialStatusComponent implements OnInit {
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

  Compid: any;
  totalNumber:number=0;
  fistNumber:number=0;
  secondNumber:number;
  HouseInvolved1:number=0;
  HouseInvolved2:number=0;
  HouseInvolved3:number=0;
  HouseInvolved4:number=0;
  HouseInvolved5:number=0;
  HouseInvolved6:number=0;
  THouseInvolved: number=0; 
 
FundsDisbursed_in_Houses1:any=0;
FundsDisbursed_in_Houses2:any=0;
FundsDisbursed_in_Houses3:any=0;
FundsDisbursed_in_Houses4:any=0;
FundsDisbursed_in_Houses5:any=0;
FundsDisbursed_in_Houses6:number=0;
FundsDisbursed_in_Houses7:number=0;
FundsDisbursed_in_Houses8:number=0;
FundsDisbursed_in_Houses9:number=0;
FundsDisbursed_in_Houses10:number=0;
TFundsDisbursed_in_Houses: any=0;

HouseInvolved1_AHP:any=0;
HouseInvolved2_AHP:any=0;
HouseInvolved3_AHP:number=0;
HouseInvolved4_AHP:number=0;
HouseInvolved5_AHP:number=0;
THouseInvolved_AHP:any=0;

Houses_Grounded1:number=0;
Houses_Grounded2:number=0;
Houses_Grounded3:number=0;
Houses_Grounded4:number=0;
Houses_Grounded5:number=0;
Houses_Grounded6:number=0;
Houses_Grounded7:number=0;
Houses_Grounded8:number=0;
 
Houses_Completed1:number=0;
Houses_Completed2:number=0;
Houses_Completed3:number=0;
Houses_Completed4:number=0;
Houses_Completed5:number=0;
Houses_Completed6:number=0;
Houses_Completed7:number=0;//
Houses_Completed8:number=0;

HousesOccupied0:any=0;
HousesOccupied1:number=0;
HousesOccupied2:number=0;
HousesOccupied3:number=0;
HousesOccupied4:number=0;
HousesOccupied5:any=0;
//HousesOccupied6:number=0;
HousesOccupied7:number=0;
HousesOccupied8:number=0;
lstComponent: string[] = [];

HousesStatus:Houses_Status[];

//THouseInvolved :number;
  THouses_Grounded: number=0;
  THouses_Completed: number=0;
  THousesOccupied: number=0;
  TotalFundsDisbursed: number=0;
  Houses_Grounded1_AHP: any=0;
  Houses_Grounded2_AHP: any=0;
  Houses_Grounded3_AHP: any=0;
  Houses_Grounded4_AHP: any=0;
  Houses_Grounded5_AHP: any=0;
  THouses_Grounded_AHP: any=0;
  Houses_Completed1_AHP: any=0;
  Houses_Completed2_AHP: any=0;
  Houses_Completed3_AHP: any=0;
  Houses_Completed4_AHP: any=0;
  Houses_Completed5_AHP: any=0;
  HousesOccupied1_AHP: any=0;
  HousesOccupied2_AHP: any=0;
  HousesOccupied3_AHP: any=0;
  HousesOccupied4_AHP: any=0;
  HousesOccupied5_AHP: any=0;
  THousesOccupied_AHP: any=0;

  HouseInvolved0_ISSR: any=0;         
  FundsDisbursed_in_Houses0_ISSR: any=0; 
  Houses_Grounded0_ISSR: any=0; 
  Houses_Completed0_ISSR: any=0; 
  HousesOccupied0_ISSR: any=0; 

  
  HouseInvolved1_ISSR: any=0;
  HouseInvolved2_ISSR: any=0;
  HouseInvolved3_ISSR: number=0;
  HouseInvolved4_ISSR: number=0;
  HouseInvolved5_ISSR: number=0;
  THouseInvolved_ISSR: number=0;
  FundsDisbursed_in_Houses1_ISSR: number=0;
  FundsDisbursed_in_Houses2_ISSR: number=0;
  FundsDisbursed_in_Houses3_ISSR: number=0;
  FundsDisbursed_in_Houses4_ISSR: number=0;
  FundsDisbursed_in_Houses5_ISSR: number=0;
  TotalFundsDisbursed_ISSR: number=0;
  Houses_Grounded1_ISSR: number=0;
  Houses_Grounded2_ISSR: number=0;
  Houses_Grounded3_ISSR: number=0;
  Houses_Grounded4_ISSR: number=0;
  Houses_Grounded5_ISSR: number=0;
  THouses_Grounded_ISSR: number=0;
  Houses_Completed1_ISSR: number=0;
  Houses_Completed2_ISSR: number=0;
  Houses_Completed3_ISSR: number=0;
  Houses_Completed4_ISSR: number=0;
  Houses_Completed5_ISSR: number=0;
  THouses_Completed_ISSR: number=0;
  HousesOccupied1_ISSR: number=0;
  HousesOccupied2_ISSR: number=0;
  HousesOccupied3_ISSR: number=0;
  HousesOccupied4_ISSR: number=0;
  HousesOccupied5_ISSR: any=0;
  THousesOccupied_ISSR : number=0;

  //stateCode: string = "0";
  //districtCode: string = "0";
  //cityCode: string = "0";
  
  First17BLC: any=0;
  First16BLC: any=0;

  
  compId  : string = "0";
  HouseInvolvedT1: number=0; 
  HouseInvolvedT2: number=0; 
  HouseInvolvedT3: any=0; 
  HouseInvolvedT4: number=0; 
  HouseInvolvedT5: number=0; 
  HouseInvolvedT6: number=0; 
  FundsDisbursed_in_HousesT1: number=0; 
  FundsDisbursed_in_HousesT2: number=0; 
  FundsDisbursed_in_HousesT3: number=0; 
  FundsDisbursed_in_HousesT4: number=0; 
  FundsDisbursed_in_HousesT5: number=0; 
  FundsDisbursed_in_HousesT6: number=0; 
  TFundsDisbursed_in_HousesT: number=0; 
  Houses_GroundedT1: number=0; 
  Houses_GroundedT2: number=0; 
  Houses_GroundedT3: number=0; 
  Houses_GroundedT4: number=0; 
  Houses_GroundedT5: number=0; 
  Houses_GroundedT6: number=0; 
  THouses_GroundedT: number=0; 


  Houses_CompletedT1:number=0; 
  Houses_CompletedT2:number=0; 
  Houses_CompletedT3:number=0; 
  Houses_CompletedT4:number=0; 
  Houses_CompletedT5:number=0; 
  Houses_CompletedT6:number=0; 
  THouses_CompletedT:number=0; 

  HousesOccupiedT1: number=0; 
  HousesOccupiedT2: number=0;  
  HousesOccupiedT3: number=0;  
  HousesOccupiedT4: number=0;
  HousesOccupiedT5: number=0;
  HousesOccupiedT6 : number=0;
  THousesOccupiedT : number=0;
  THouseInvolvedT: number=0; 
  display='none';
  StateName:string = "All India";
   
  Houses_GroundedJN_T: any=0;
  THouses_CompletedJN: any=0;
  HousesOccupiedJNT: any=0;
  FundsDisbursed_in_Houses01: any=0;
   
  Bene2014_15_CLSS: any=0;
  Bene2015_16_CLSS: any=0;
  Bene2016_17_CLSS: any=0;
  Bene2017_18_CLSS: any=0;
  Bene2018_19_CLSS: any=0;
  Bene2019_20_CLSS: any=0;
  Bene2020_21_CLSS: any=0;
  Bene2021_22_CLSS: any=0;
  BeneCLSS_Total: any=0;
  TotalFundsDisbursedAHP: any;
  Sub2018_19_CL: any=0;

  //Sub2018_19_CL: any=0;
  Sub2019_20_CL: any=0;
 // Sub2019_20_CL: any=0;
  // stateCodes: string = "0";
  // districtCodes: string = "0";
  // cityCodes: string = "0";
  //StateMessage: string;
  //DistrictMessage: string;
  //CityMessage: string;
  distValue: string;
  cityValue: string;
  stValue: string;
  //stateCodes: string = "0";
  //districtCodes: string = "0";
  //cityCodes: string = "0";
  FundsDisbursed_in_Houses5_AHP: any=0;
  FundsDisbursed_in_Houses4_AHP: any=0;
  FundsDisbursed_in_Houses3_AHP: any=0;
  FundsDisbursed_in_Houses2_AHP: any=0;
  FundsDisbursed_in_Houses1_AHP: any=0;
  THouses_Completed_AHP: any;
  Third14: any;
  Third15: any;
  UC_Received14: any;
  UC_Received15: any;
  //HouseInvolved01 = 0;
    HouseInvolved01: any=0; 

    Houses_Grounded01: any=0;
    Houses_Completed01: any=0;
    HousesOccupied01: any=0;
    Houses_Grounded0: any=0;

    HouseInvolved0_AHP: any=0;
    FundsDisbursed_in_Houses0_AHP: any=0;
    Houses_Grounded0_AHP: any=0;
    Houses_Completed0_AHP: any=0;
    HousesOccupied0_AHP: any=0;
  THouseInvolvedGT: any=0;
  TFundsDisbursed_in_HousesGT: any=0;
  THouses_GroundedGT: any=0;
  THouses_CompletedGT: any=0;
  THousesOccupiedGT: any=0;
  lstHousesStatus:Houses_Status[];
Year:string;
Cid:string;
  lblStateDisttCity: string;
  THouseInvolved1_ISSR: any=0;
  TFundsDisbursed_in_Houses1_ISSR: any=0;
  THouses_Grounded1_ISSR: any=0;
  THouses_Completed1_ISSR: any=0;
  THousesOccupied1_ISSR: any=0;
 //----------------------------------
  sTotalPC: any=0;
  sTotalCAI   : any=0;  
  Total14: any=0;  
  Total15  : any=0;  
  sTotalInst1 : any=0;
  sTotalInst2 : any=0;
  sTotalInst3 : any=0;
  sTotal : any=0;
  sTotalUC: any=0;
  PC14 : any=0;
  PC15: any=0;
  CAI14: any=0;
  CAI15: any=0;
  First14: any=0;
  First15: any=0;
  Second14: any=0;
  Second15: any=0;


 PC19ISS: any=0;
                  CAI19ISS : any=0;
                  First19ISS : any=0;
                  Second19ISS : any=0;
                  Third19ISS : any=0;
                  UC_Received19ISS : any=0;
                  Total19ISS : any=0;
                 
                 
                  PC18ISS: any=0;
                CAI18ISS : any=0;
                First18ISS: any=0;
                Second18ISS : any=0;
                Third18ISS : any=0;
                UC_Received18ISS : any=0;
                Total18ISS : any=0;
               
                 PC17ISS: any=0;
              CAI17ISS : any=0;
              First17ISS : any=0;
              Second17ISS : any=0;
              Third17ISS : any=0;
              UC_Received17ISS : any=0;
              Total17ISS : any=0;
             
             
                PC16ISS: any=0;
            CAI16ISS : any=0;
            First16ISS : any=0;
            Second16ISS : any=0;
            Third16ISS : any=0;
            UC_Received16ISS : any=0;
            Total16ISS : any=0;
           
            PC15ISS: any=0;
          CAI15ISS : any=0;
          First15ISS : any=0;
          Second15ISS : any=0;
          Third15ISS : any=0;
          UC_Received15ISS : any=0;
          Total15ISS : any=0;
         
         
          PC14ISS : any=0;
        CAI14ISS : any=0;
        First14ISS : any=0;
       Second14ISS : any=0;
        Third14ISS : any=0;
        UC_Received14ISS : any=0;
        Total14ISS  : any=0;
       
       
        PC19AHP : any=0;
               CAI19AHP : any=0;
                First19AHP : any=0;
                Second19AHP : any=0;
                Third19AHP : any=0;
                UC_Received19AHP : any=0;
                Total19AHP  : any=0;
               
    PC18AHP : any=0;
              CAI18AHP : any=0;
              First18AHP : any=0;
             Second18AHP : any=0;
             Third18AHP : any=0;
             UC_Received18AHP : any=0;
             Total18AHP  : any=0;
             
             
             PC17AHP : any=0;
            CAI17AHP : any=0;
           First17AHP : any=0;
           Second17AHP : any=0;
           Third17AHP : any=0;
           UC_Received17AHP : any=0;
           Total17AHP  : any=0;
           
          PC16AHP : any=0;
         CAI16AHP : any=0;
          First16AHP : any=0;
          Second16AHP : any=0;
          Third16AHP : any=0;
         UC_Received16AHP : any=0;
          Total16AHP  : any=0;
         
        
           PC15AHP : any=0;
        CAI15AHP : any=0;
        First15AHP : any=0;
        Second15AHP : any=0;
        Third15AHP : any=0;
        UC_Received15AHP : any=0;
        Total15AHP  : any=0;
  
             PC14AHP: any=0;
      CAI14AHP : any=0;
      First14AHP : any=0;
      Second14AHP : any=0;
      Third14AHP : any=0;
      UC_Received14AHP : any=0;
      Total14AHP  : any=0;
     
     PC19: any=0;
            CAI19 : any=0;
            First19 : any=0;
            Second19 : any=0;
            Third19 : any=0;
            UC_Received19 : any=0;
            Total19  : any=0;
           
     PC18: any=0;
          CAI18 : any=0;
          First18 : any=0;
         Second18 : any=0;
         Third18 : any=0;
         UC_Received18 : any=0;
         Total18 : any=0;            
     PC17: any=0;
        CAI17 : any=0;
        First17 : any=0;
       Second17 : any=0;
       Third17 : any=0;
       UC_Received17 : any=0;
       Total17  : any=0;
       
    PC16 : any=0;
       CAI16 : any=0;
       First16 : any=0;
       Second16: any=0;
       Third16 : any=0;
       UC_Received16 : any=0;
       Total16: any=0;
       
PC15BLC : any=0;
      CAI15BLC : any=0;
      First15BLC : any=0;
      Second15BLC : any=0;
      Third15BLC: any=0;
      UC_Received15BLC : any=0;
      Total15BLC : any=0;
     
 PC_BLC14 : any=0;
        CAI_BLC14 : any=0;
        First_BLC14 : any=0;
        Second_BLC14 : any=0;
        Third_BLC14 : any=0;
        UC_Received_BLC14 : any=0; 
        Total_BLC14  : any=0;
        // sTotalPC =  0;
        // sTotalCAI =  0;
        // sTotalInst1 =  0;
        // sTotalInst2 =  0;
        // sTotalInst3 =  0;
        // sTotal =  0;
        // sTotalUC =  0;
         Loan_TOTAL_CL: any=0;
        Sub2014_15_CL: any=0;
        Sub2015_16_CL: any=0;
        Sub2016_17_CL: any=0;
        Sub2017_18_CL: any=0;
    //    Sub2018_19_CL: any=0;
      //Sub2019_20_CL: any=0;
    UC_Received_CL: any=0;
    TcolBLC1: any=0;
    TcolBLC2: any=0;
    TcolBLC3: any=0;
    TcolBLC4: any=0;
    TcolBLC5: any=0;
    TcolBLC6: any=0;
  PC18T: any=0;
  PC16BLC: any=0;
  CAI16BLC: any=0;
  CAI17BLC: any=0;
  PC17BLC: any=0;
  CAI18BLC: any=0;
  PC18BLC: any=0;
  PC19BLC: any=0;
  CAI19BLC: any=0;
  TcolBLC7: any=0;
  T_AHP_PC: any=0;
  T_AHP_CAI: any=0;
  T_AHP_First: any=0;
  T_AHP_Second: any=0;
  T_AHP_Third: any=0;
  T_AHP_TotalInst: any=0;
  T_AHP_TotalUC: any=0;
  Tot_AHP_PC: any=0;
  Tot_ISS_CAI: any=0;
  Tot_ISS_PC: any=0;
  Tot_ISS_OneInst: any=0;
  Tot_ISS_TwoInst: any=0;
  Tot_ISS_ThreeInst: any=0;
  Tot_ISS_Inst: any=0;
  Tot_ISS_UC: any=0;
  CA_SANCT_CLSS: any=0;
  FirstI_CLSS: any=0;
  SecondI_CLSS: any=0;
  ThirdI_CLSS: any=0;
  totalI_CLSS: any=0;
  Total_UC_RecdClss: any=0;
  Col1_1415: any=0;
  Col1_1516: any=0;
  Col1_1617: any=0;
  Col1_1718: any=0;
  Col1_1819: any=0;
  Col1_1920: any=0;
  Col1_Total: any=0;
  Col2_1415: any=0;
  Col2_1516: any=0;
  Col2_1617: any=0;
  Col2_1718: any=0;
  Col2_1819: any=0;
  Col2_1920: any=0;
  Col2_Total: any=0;
  Col3_1415: any=0;
  Col3_1516: any=0;
  Col3_1617: any=0;
  Col3_1718: any=0;
  Col3_1819: any=0;
  Col3_1920: any=0;
  Col3_Total: any=0;
  Col4_1415: any=0;
  Col4_1516: any=0;
  Col4_1617: any=0;
  Col4_1718: any=0;
  Col4_1819: any=0;
  Col4_1920: any=0;
  Col4_Total: any=0;
  Col5_1415: any=0;
  Col5_1516: any=0;
  Col5_1617: any=0;
  Col5_1718: any=0;
  Col5_1819: any=0;
  Col5_1920: any=0;
  Col5_Total: any=0;
  Col6_1415: any=0;
  Col6_1516: any=0;
  Col6_1617: any=0;
  Col6_1718: any=0;
  Col6_1819: any=0;
  Col6_1920: any=0;
  Col6_Total: any=0;
  Col7_1415: any=0;
  Col7_1516: any=0;
  Col7_1617: any=0;
  Col7_1718: any=0;
  Col7_1819: any=0;
  Col7_1920: any=0;
  Col7_Total: any=0;
  Loan_TOTAL_14_15 : any=0;
  Loan_TOTAL_15_16: any=0;
  Loan_TOTAL_16_17: any=0;
  Loan_TOTAL_17_18: any=0;
  Loan_TOTAL_18_19: any=0;
  Loan_TOTAL_19_20: any=0;
  Loan_TOTAL_20_21: any=0;
  First18BLC: any=0;
  First19BLC: any=0;
  Second16BLC: any=0;
  Second17BLC: any=0;
  UC_Received16BLC: any=0;
  CentralDisplay:any;
  PCOST: any;
  TotalUC: string;
  Inst_III: string;
  TotalCAR: string;
  Inst_II: string;
  Inst_I: string;
  DisplayTable: string;
  DisplyaGraph: string;
  RdStatus: any;
//----------------------------------- 




  constructor(private router: Router,private routers: ActivatedRoute, public service: GraphService) { 
    this.stValue = "0";
    this.distValue = "0";
    this.cityValue = "0";
    this.StateMessage = "All India";
    this.DistrictMessage = "Select District";
    this.CityMessage = "Select City";
    this.service.GetStatusofHouses_CompWise(this.Compid).subscribe(result => {
     // this.Houses_Grounded = result.Houses_Grounded;
    });

  }
  BindGetStatus(stateCode:string,districtCode:string,cityCode:string,compId:string)
  {

    //alert(stateCode);
      this.service.GetStatusofHouses_Sanctioned(stateCode,districtCode,cityCode,compId).subscribe(result=>{
      //alert(result[6].Housesinvolved.toString());
      this.HouseInvolvedT1=result[0].Housesinvolved;
      this.HouseInvolvedT2=result[1].Housesinvolved;
      this.HouseInvolvedT3=result[2].Housesinvolved;
      this.HouseInvolvedT4=result[3].Housesinvolved;
      this.HouseInvolvedT5=result[4].Housesinvolved;
      this.HouseInvolvedT6=result[5].Housesinvolved;

      this.THouseInvolvedT =this.HouseInvolvedT1+this.HouseInvolvedT2 +this.HouseInvolvedT3 +this.HouseInvolvedT4 +this.HouseInvolvedT5 +this.HouseInvolvedT6; 
      //this.HouseInvolved7=result[6].Housesinvolved.toString();
//      this.HouseInvolved8=result[7].Housesinvolved.toString();
     // this.HouseInvolved9=result[8].Housesinvolved.toString();
     // this.HouseInvolved10=result[9].Housesinvolved.toString();
      
      //alert(result[0].FundsDisbursed_in_Houses.toString());


      this.FundsDisbursed_in_HousesT1=result[0].FundsDisbursed_in_Houses;
      //console.log(this.FundsDisbursed_in_Houses1.toLocaleString('en-IN'));
      
      this.FundsDisbursed_in_HousesT2=result[1].FundsDisbursed_in_Houses;
      this.FundsDisbursed_in_HousesT3=result[2].FundsDisbursed_in_Houses;
      this.FundsDisbursed_in_HousesT4=result[3].FundsDisbursed_in_Houses;
      this.FundsDisbursed_in_HousesT5=result[4].FundsDisbursed_in_Houses;
      this.FundsDisbursed_in_HousesT6=result[5].FundsDisbursed_in_Houses;
      
      this.TFundsDisbursed_in_HousesT =this.FundsDisbursed_in_HousesT1 + this.FundsDisbursed_in_HousesT2 +this.FundsDisbursed_in_HousesT3 +this.FundsDisbursed_in_HousesT4+this.FundsDisbursed_in_HousesT5+this.FundsDisbursed_in_HousesT6;
      // this.FundsDisbursed_in_Houses7=result[6].FundsDisbursed_in_Houses.toString();
      // this.FundsDisbursed_in_Houses8=result[7].FundsDisbursed_in_Houses.toString();
      // this.FundsDisbursed_in_Houses9=result[8].FundsDisbursed_in_Houses.toString();
      // this.FundsDisbursed_in_Houses10=result[9].FundsDisbursed_in_Houses.toString();
      
      this.Houses_GroundedT1=result[0].Houses_Grounded;
      this.Houses_GroundedT2=result[1].Houses_Grounded;
      this.Houses_GroundedT3=result[2].Houses_Grounded;
      this.Houses_GroundedT4=result[3].Houses_Grounded;
      this.Houses_GroundedT5=result[4].Houses_Grounded;
      this.Houses_GroundedT6=result[5].Houses_Grounded;
      //this.Houses_Grounded7=result[6].Houses_Grounded.toString();
      //this.Houses_Grounded8=result[7].Houses_Grounded.toString();
      this.THouses_GroundedT =this.Houses_GroundedT1 + this.Houses_GroundedT2+this.Houses_GroundedT3 +this.Houses_GroundedT4 +this.Houses_GroundedT5+this.Houses_GroundedT6;
      

      this.Houses_CompletedT1=result[0].Houses_Completed;
      this.Houses_CompletedT2=result[1].Houses_Completed;
      this.Houses_CompletedT3=result[2].Houses_Completed;
      this.Houses_CompletedT4=result[3].Houses_Completed;
      this.Houses_CompletedT5=result[4].Houses_Completed;
      this.Houses_CompletedT6=0;//result[5].Houses_Completed;
      //this.Houses_Completed7=result[6].Houses_Completed.toString();
      //this.Houses_Completed8=result[7].Houses_Completed.toString();
      this.THouses_CompletedT =this.Houses_CompletedT1 +this.Houses_CompletedT2 +this.Houses_CompletedT3 +this.Houses_CompletedT4 +this.Houses_CompletedT5 +this.Houses_CompletedT6;
      

      this.HousesOccupiedT1=result[0].HousesOccupied;
      this.HousesOccupiedT2=result[1].HousesOccupied;
      this.HousesOccupiedT3=result[2].HousesOccupied;
      this.HousesOccupiedT4=result[3].HousesOccupied;
      this.HousesOccupiedT5=result[4].HousesOccupied;
      this.HousesOccupiedT6=result[5].HousesOccupied;
      //this.Houses_Completed7=result[6].Houses_Completed.toString();
      //this.Houses_Completed8=result[7].Houses_Completed.toString();
      this.THousesOccupiedT= this.HousesOccupiedT1 +this.HousesOccupiedT2 +this.HousesOccupiedT3 + this.HousesOccupiedT4 +this.HousesOccupiedT5 +this.HousesOccupiedT6;
  
    })
  }
  ngOnInit() {
    this.districtCodes = "0";
    this.cityCodes = "0";
    this.Compid="0";
    this.stateCode="0";
    this.HouseInvolved1=0;
    this.HouseInvolved2=0;
    this.THouseInvolved=0;
    this.fistNumber=0;
    this.secondNumber=0;
    this.service.StateList();
    this.service.DisttList(this.stateCodes);
    this.service.CityList(this.districtCodes);
    // this.States_UT ="Delhi";
    this.lblStateDisttCity = "All India";
     //this.LoadData(this.stateCodes,this.districtCodes,this.cityCodes);
  //   this.GetFilterDatanew(this.stateCodes,this.districtCodes ,this.cityCodes, this.Compid );
     this.GetFinancialData(this.stateCodes,this.districtCodes ,this.cityCodes, this.Compid);

     //stateCodes, districtCodes, cityCodes, Compid

     this.DisplyaGraph = "none";
     this.DisplayTable = "block";
} 
test($event)
{
    var data:string;
    const checked=$event.target.checked;
  if (checked)
  {
    this.CentralDisplay ='block';
  }   
  else 
  {
    this.CentralDisplay ='none';
  }
}
ProjectCost($event)
{
    var data:string;
    const checked=$event.target.checked;
    if (checked)
    {
      this.PCOST ='block';
    }   
    else 
    {
      this.PCOST ='none';
    }
}

checkForm($event)
{
  debugger;
     this.RdStatus=$event.target.value;      
     if(this.RdStatus === 'Phy1')
     {

         this.router.navigate(['/Admin/VerticalHousesDetails'])
     }
     else{
          this.router.navigate(['/Admin/VerticalFinancialDetails'])
     }
}



Firstinst($event)
{
    var data:string;
    const checked=$event.target.checked;
    if (checked)
    {
      this.Inst_I ='block';
    }   
    else 
    {
      this.Inst_I ='none';
    }
}

Secondinst($event)
{
    var data:string;
    const checked=$event.target.checked;
    if (checked)
    {
      this.Inst_II ='block';
    }   
    else 
    {
      this.Inst_II ='none';
    }
}
Thirdinst($event)
{
    var data:string;
    const checked=$event.target.checked;
    if (checked)
    {
      this.Inst_III ='block';
    }   
    else 
    {
      this.Inst_III ='none';
    }
}
 
TotalCA($event)
{
    var data:string;
    const checked=$event.target.checked;
    if (checked)
    {
      this.TotalCAR ='block';
    }   
    else 
    {
      this.TotalCAR ='none';
    }
}

ShowPageM(status: string) {
  if (status === "graph") {
    this.DisplyaGraph = "block";
    this.DisplayTable = "none";
  }
  else {
    this.DisplyaGraph = "none";
    this.DisplayTable = "block";
  }
}


UCrecd($event)
{
    var data:string;
    const checked=$event.target.checked;
    if (checked)
    {
      this.TotalUC ='block';
    }   
    else 
    {
      this.TotalUC ='none';
    }
}
download_csv(csv, filename) {
  var csvFile;
  var downloadLink;

  // CSV FILE
  csvFile = new Blob([csv], {type: "text/csv"});

  // Download link
  downloadLink = document.createElement("a");

  // File name
  downloadLink.download = filename;

  // We have to create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);

  // Make sure that the link is not displayed
  downloadLink.style.display = "none";

  // Add the link to your DOM
  document.body.appendChild(downloadLink);

  // Lanzamos
  downloadLink.click();
}

export_table_to_csv(html, filename) {
var csv = [];
var rows = document.querySelectorAll("table tr");

  for (var i = 0; i < rows.length; i++) {
  var row = [], cols = rows[i].querySelectorAll("td, th");
  
      for (var j = 0; j < cols.length; j++) {
          row.push(cols[j].textContent.replace(/,/g,''));
          console.log(cols[j].textContent);
          console.log(cols[j].textContent.replace('/,/g',''));
      }
      
  csv.push(row.join(","));		
}

  // Download CSV
  this.download_csv(csv.join("\n"), filename);
}

exportExcel(){
  

  // var path = 'data:application/vnd.ms-excel,' + encodeURIComponent($('.bodyataglance').html());
  // window.open(path);
  var html = document.querySelector(".bodyataglance").outerHTML;
  this.export_table_to_csv(html, "export.csv");

}

// document.querySelector("button").addEventListener("click", function () {
//   var html = document.querySelector("table").outerHTML;
// export_table_to_csv(html, "table.csv");
// });



LoadData(stateCode:string,districtCode:string,cityCode:string)
{
  this.THouseInvolved1_ISSR=0;
  this.TFundsDisbursed_in_Houses1_ISSR=0;
  this.THouses_Grounded1_ISSR=0;
  this.THouses_Completed1_ISSR=0;
  this.THousesOccupied1_ISSR=0;

  this.FundsDisbursed_in_Houses01 ="0";

  this.Compid ="BLCS";
   this.service.GetStatusofHouses_CompWise("BLCS").subscribe(result=>{
   this.HouseInvolved1=result[0].Housesinvolved;
   this.HouseInvolved2=result[1].Housesinvolved;
   this.HouseInvolved3=result[2].Housesinvolved;
   this.HouseInvolved4=result[3].Housesinvolved;
   this.HouseInvolved5=result[4].Housesinvolved;
   

  this.FundsDisbursed_in_Houses1=result[0].FundsDisbursed_in_Houses;
  this.FundsDisbursed_in_Houses2=result[1].FundsDisbursed_in_Houses;
  this.FundsDisbursed_in_Houses3=result[2].FundsDisbursed_in_Houses;
  this.FundsDisbursed_in_Houses4=result[3].FundsDisbursed_in_Houses;
  this.FundsDisbursed_in_Houses5=result[4].FundsDisbursed_in_Houses;

  this.FundsDisbursed_in_HousesT2 =this.FundsDisbursed_in_Houses1 + this.FundsDisbursed_in_Houses2 +this.FundsDisbursed_in_Houses3 +this.FundsDisbursed_in_Houses4+this.FundsDisbursed_in_Houses5;


    this.Houses_Grounded1=result[0].Houses_Grounded;
    this.Houses_Grounded2=result[1].Houses_Grounded;
    this.Houses_Grounded3=result[2].Houses_Grounded;
    this.Houses_Grounded4=result[3].Houses_Grounded;
    this.Houses_Grounded5=result[4].Houses_Grounded;
    this.THouses_Grounded =this.Houses_Grounded1 + this.Houses_Grounded2+this.Houses_Grounded3 +this.Houses_Grounded4 +this.Houses_Grounded5;
    

    this.Houses_Completed1=result[0].Houses_Completed;
    this.Houses_Completed2=result[1].Houses_Completed;
    this.Houses_Completed3=result[2].Houses_Completed;
    this.Houses_Completed4=result[3].Houses_Completed;
    this.Houses_Completed5=result[4].Houses_Completed;
     this.Houses_Completed6= 0;//result[5].Houses_Completed; //
    //this.Houses_Completed7=result[6].Houses_Completed.toString();
    //this.Houses_Completed8=result[7].Houses_Completed.toString();
    this.THouses_Completed = this.Houses_Completed1 +this.Houses_Completed2 +this.Houses_Completed3 +this.Houses_Completed4 +this.Houses_Completed5;
    

    this.HousesOccupied1=result[0].HousesOccupied;
    this.HousesOccupied2=result[1].HousesOccupied;
    this.HousesOccupied3=result[2].HousesOccupied;
    this.HousesOccupied4=result[3].HousesOccupied;
    if (result[4].HousesOccupied ==0)
    {
      this.HousesOccupied5= 0;
    }
    else 
    this.HousesOccupied5=indianFormat(result[4].HousesOccupied);
//---------------------------------------------------------------------------------------
  this.Compid ="AHP";
  this.service.GetStatusofHouses_CompWise("AHP").subscribe(resultAHP=>{
    this.HouseInvolved1_AHP=resultAHP[0].Housesinvolved;
    this.HouseInvolved2_AHP=resultAHP[1].Housesinvolved;
    this.HouseInvolved3_AHP=resultAHP[2].Housesinvolved;
    this.HouseInvolved4_AHP=resultAHP[3].Housesinvolved;
    this.HouseInvolved5_AHP=resultAHP[4].Housesinvolved; //


    this.FundsDisbursed_in_Houses1_AHP=resultAHP[0].FundsDisbursed_in_Houses;
    this.FundsDisbursed_in_Houses2_AHP=resultAHP[1].FundsDisbursed_in_Houses;
    this.FundsDisbursed_in_Houses3_AHP=resultAHP[2].FundsDisbursed_in_Houses;
    if (resultAHP[3].FundsDisbursed_in_Houses ==0)
    {
      this.FundsDisbursed_in_Houses4_AHP=0;
    }
    else
    this.FundsDisbursed_in_Houses4_AHP=(resultAHP[3].FundsDisbursed_in_Houses);
   
     this.FundsDisbursed_in_Houses5_AHP= resultAHP[4].FundsDisbursed_in_Houses; //
    
     this.TotalFundsDisbursedAHP= this.FundsDisbursed_in_Houses1_AHP +this.FundsDisbursed_in_Houses2_AHP +this.FundsDisbursed_in_Houses3_AHP + this.FundsDisbursed_in_Houses4_AHP +this.FundsDisbursed_in_Houses5_AHP;


    this.Houses_Grounded1_AHP=resultAHP[0].Houses_Grounded;
    this.Houses_Grounded2_AHP=resultAHP[1].Houses_Grounded;
    this.Houses_Grounded3_AHP=resultAHP[2].Houses_Grounded;
    this.Houses_Grounded4_AHP=resultAHP[3].Houses_Grounded;
    this.Houses_Grounded5_AHP=resultAHP[4].Houses_Grounded; // 0;//
    this.THouses_Grounded_AHP =this.Houses_Grounded1 + this.Houses_Grounded2+this.Houses_Grounded3 +this.Houses_Grounded4 +this.Houses_Grounded5;
    

    this.Houses_Completed1_AHP=resultAHP[0].Houses_Completed;
    this.Houses_Completed2_AHP=resultAHP[1].Houses_Completed;
    this.Houses_Completed3_AHP=resultAHP[2].Houses_Completed;
    this.Houses_Completed4_AHP=resultAHP[3].Houses_Completed;
    this.Houses_Completed5_AHP=  resultAHP[4].Houses_Completed; //0; //
         // alert(this.Houses_Completed5_AHP);
    


    this.THouses_Completed_AHP =this.Houses_Completed1_AHP +this.Houses_Completed2_AHP +this.Houses_Completed3_AHP +this.Houses_Completed4_AHP +this.Houses_Completed5_AHP;
    this.THouses_Completed =0;

    this.HousesOccupied1_AHP=resultAHP[0].HousesOccupied;
    this.HousesOccupied2_AHP=resultAHP[1].HousesOccupied;
    this.HousesOccupied3_AHP=resultAHP[2].HousesOccupied;
    this.HousesOccupied4_AHP=resultAHP[3].HousesOccupied;

    this.HousesOccupied5_AHP= resultAHP[4].HousesOccupied; //0;//
     
     


        this.THousesOccupied_AHP= this.HousesOccupied1 +this.HousesOccupied2 +this.HousesOccupied3 + this.HousesOccupied4 +this.HousesOccupied5;
        this.THouseInvolvedGT    =  this.HouseInvolved1 + this.HouseInvolved1_AHP + this.HouseInvolved1_ISSR +  this.Bene2015_16_CLSS;
 
 //////////////////////////////////////////
    this.Compid ="ISSR";
   this.service.sp_GetHousesStatus_ISSR_FinYearWise(0,0,0,"ISSR","2014-15").subscribe(resultISSR=>{

    this.HouseInvolved0_ISSR=resultISSR[0].Housesinvolved;
    this.FundsDisbursed_in_Houses0_ISSR=resultISSR[0].FundsDisbursed_in_Houses;
    this.Houses_Grounded0_ISSR=resultISSR[0].Houses_Grounded;
    this.Houses_Completed0_ISSR=resultISSR[0].Houses_Completed;
    this.HousesOccupied0_ISSR=resultISSR[0].HousesOccupied; 


    this.service.sp_GetHousesStatus_ISSR_FinYearWise(this.stateCode,this.districtCodes ,this.cityCodes,"ISSR","2015-16").subscribe(result_ISSR1=>{
      this.HouseInvolved1_ISSR=result_ISSR1[0].Housesinvolved;
      this.FundsDisbursed_in_Houses1_ISSR=result_ISSR1[0].FundsDisbursed_in_Houses;
      this.Houses_Grounded1_ISSR=result_ISSR1[0].Houses_Grounded;
      this.Houses_Completed1_ISSR=result_ISSR1[0].Houses_Completed;
      this.HousesOccupied1_ISSR=result_ISSR1[0].HousesOccupied; 

      this.service.sp_GetHousesStatus_ISSR_FinYearWise(this.stateCode,this.districtCodes ,this.cityCodes,"ISSR","2016-17").subscribe(result_ISSR1=>{
        this.HouseInvolved2_ISSR=result_ISSR1[0].Housesinvolved;
        this.FundsDisbursed_in_Houses2_ISSR=result_ISSR1[0].FundsDisbursed_in_Houses;
        this.Houses_Grounded2_ISSR=result_ISSR1[0].Houses_Grounded;
        this.Houses_Completed2_ISSR=result_ISSR1[0].Houses_Completed;
        this.HousesOccupied2_ISSR=result_ISSR1[0].HousesOccupied; 
  

        this.service.sp_GetHousesStatus_ISSR_FinYearWise(this.stateCode,this.districtCodes ,this.cityCodes,"ISSR","2017-18").subscribe(result_ISSR3=>{
          this.HouseInvolved3_ISSR=result_ISSR3[0].Housesinvolved;
          this.FundsDisbursed_in_Houses3_ISSR=result_ISSR3[0].FundsDisbursed_in_Houses;
          this.Houses_Grounded3_ISSR=result_ISSR3[0].Houses_Grounded;
          this.Houses_Completed3_ISSR=result_ISSR3[0].Houses_Completed;
          this.HousesOccupied3_ISSR=result_ISSR3[0].HousesOccupied; 


          this.service.sp_GetHousesStatus_ISSR_FinYearWise(this.stateCode,this.districtCodes ,this.cityCodes,"ISSR","2018-19").subscribe(result_ISSR4=>{
            this.HouseInvolved4_ISSR=result_ISSR4[0].Housesinvolved;
            this.FundsDisbursed_in_Houses4_ISSR=result_ISSR4[0].FundsDisbursed_in_Houses;
            this.Houses_Grounded4_ISSR=result_ISSR4[0].Houses_Grounded;
            this.Houses_Completed4_ISSR=result_ISSR4[0].Houses_Completed;
            this.HousesOccupied4_ISSR=result_ISSR4[0].HousesOccupied; 


            this.service.sp_GetHousesStatus_ISSR_FinYearWise(this.stateCode,this.districtCodes ,this.cityCodes,"ISSR","2019-20").subscribe(result_ISSR5=>{
              this.HouseInvolved5_ISSR=result_ISSR5[0].Housesinvolved;
              this.FundsDisbursed_in_Houses5_ISSR=result_ISSR5[0].FundsDisbursed_in_Houses;
              this.Houses_Grounded5_ISSR=result_ISSR5[0].Houses_Grounded;
              this.Houses_Completed5_ISSR=result_ISSR5[0].Houses_Completed;
              this.HousesOccupied5_ISSR=result_ISSR5[0].HousesOccupied; 


    // this.HouseInvolved0_ISSR=resultISSR[0].Housesinvolved;
    // this.FundsDisbursed_in_Houses0_ISSR=resultISSR[0].FundsDisbursed_in_Houses;

    // this.HouseInvolved1_ISSR= (this.HouseInvolved1_ISSR);
    // this.THouseInvolved_ISSR = this.HouseInvolved1_ISSR; 
    // this.FundsDisbursed_in_Houses1_ISSR=resultISSR[0].FundsDisbursed_in_Houses;
    // this.TotalFundsDisbursed_ISSR =  this.FundsDisbursed_in_Houses1_ISSR;
    // this.Houses_Grounded1_ISSR=resultISSR[0].Houses_Grounded;
    // this.Houses_Grounded5_ISSR = 0; 
    // this.THouses_Grounded_ISSR =this.Houses_Grounded1_ISSR;
     

    // this.Houses_Completed1_ISSR=resultISSR[0].Houses_Completed;
    // this.THouses_Completed_ISSR =this.Houses_Completed1;
    // // +this.Houses_Completed2 +this.Houses_Completed3 +this.Houses_Completed4 +this.Houses_Completed5;
    

   // this.HousesOccupied1_ISSR=resultISSR[0].HousesOccupied;
  //  this.THousesOccupied_ISSR= this.HousesOccupied1_ISSR ;//+this.HousesOccupied2_ISSR +this.HousesOccupied3_ISSR + this.HousesOccupied4_ISSR ;
//-----------------------------------------JNNURM-------------------------------------------------   
    this.service.sp_GetHousesStatusForVertical(this.stateCode).subscribe(resultJN=>{
      this.Houses_GroundedJN_T=resultJN[0].Houses_Grounded;
      this.THouses_CompletedJN=resultJN[0].Houses_Completed;
      this.HousesOccupiedJNT=resultJN[0].HousesOccupied;

this.stateCode ="0";
this.districtCode="0";
this.cityCode ="0";

//    this.BindGetStatus(this.stateCode, this.districtCode, this.cityCode, this.compId);

  this.service.GetCLSS_Houses_VerticalWise(this.stateCode).subscribe(result_CLSS=>{
    this.Bene2014_15_CLSS=result_CLSS[0].Bene2014_15;
  //  alert(result_CLSS[0].Bene2014_15);
    this.Bene2015_16_CLSS=result_CLSS[0].Bene2015_16;
    this.Bene2016_17_CLSS=result_CLSS[0].Bene2016_17;
    this.Bene2017_18_CLSS=result_CLSS[0].Bene2017_18;
    this.Bene2018_19_CLSS=result_CLSS[0].Bene2018_19;
    this.Bene2019_20_CLSS=result_CLSS[0].Bene2019_20;

    this.BeneCLSS_Total = parseFloat(this.Bene2014_15_CLSS) + parseFloat(this.Bene2015_16_CLSS) + parseFloat(this.Bene2016_17_CLSS) 
    +parseFloat(this.Bene2017_18_CLSS) +parseFloat(this.Bene2018_19_CLSS) +parseFloat(this.Bene2019_20_CLSS);// +parseFloat(this.Bene2019_20_CLSS); 
    
    
    this.Bene2020_21_CLSS=result_CLSS[0].Bene2020_21;
    this.Bene2021_22_CLSS=result_CLSS[0].Bene2021_22;
  
//----------------------------------------------- 
  this.HouseInvolvedT1=   this.HouseInvolved01 +this.HouseInvolved0_AHP + this.HouseInvolved0_ISSR +this.Bene2014_15_CLSS ;
  this.FundsDisbursed_in_HousesT1 = parseFloat(this.Bene2014_15_CLSS) + parseFloat(this.FundsDisbursed_in_Houses0_ISSR) + 
  parseFloat(this.FundsDisbursed_in_Houses0_AHP) +parseFloat(this.FundsDisbursed_in_Houses01);
  this.Houses_GroundedT1 = this.Houses_GroundedJN_T +this.Bene2014_15_CLSS + this.Houses_Grounded0_ISSR +  this.Houses_Grounded0_AHP + this.Houses_Grounded0;
  this.Houses_CompletedT1 = this.THouses_CompletedJN +this.Bene2014_15_CLSS + this.Houses_Completed0_ISSR +  this.Houses_Completed0_AHP + this.Houses_Completed01;
  this.HousesOccupiedT1 = this.HousesOccupiedJNT +this.Bene2014_15_CLSS + this.HousesOccupied0_ISSR +  this.HousesOccupied0_AHP + this.HousesOccupied01;


 

 // alert(this.Houses_CompletedT3);

  this.HouseInvolvedT2 = this.HouseInvolved2 +  this.HouseInvolved2_AHP +this.HouseInvolved2_ISSR +this.Bene2015_16_CLSS;
  this.FundsDisbursed_in_HousesT2 =      this.TFundsDisbursed_in_Houses +   
   this.TotalFundsDisbursedAHP + this.TFundsDisbursed_in_Houses1_ISSR +this.BeneCLSS_Total;
  
  
  this.Houses_GroundedT2 =     this.Houses_Grounded1 +this.Houses_Grounded1_AHP + this.Houses_Grounded1_ISSR +
  this.Bene2015_16_CLSS;       
  
  
   this.Houses_CompletedT3 = this.Houses_Completed2 + this.Houses_Completed2_AHP + this.Houses_Completed2_ISSR 
   + this.Bene2016_17_CLSS;

  
  

  this.Houses_CompletedT2 =      this.Houses_Completed1 +    this.Houses_Completed1_AHP + this.Houses_Completed1_ISSR +this.Bene2015_16_CLSS;
  this.HousesOccupiedT2 =      this.HousesOccupied1 +    this.HousesOccupied1_AHP +this.HousesOccupied1_ISSR +this.Bene2015_16_CLSS;
  
 
  
  this.HouseInvolvedT3 = this.HouseInvolved3 +  this.HouseInvolved3_AHP +this.HouseInvolved3_ISSR +this.Bene2016_17_CLSS;
  
  this.FundsDisbursed_in_HousesT3 =      this.FundsDisbursed_in_Houses2 +    this.FundsDisbursed_in_Houses2_AHP +
   this.FundsDisbursed_in_Houses2_ISSR +this.Bene2016_17_CLSS;
   
  
  this.Houses_GroundedT3 =     this.Houses_Grounded2 +this.Houses_Grounded2_AHP + this.Houses_Grounded2_ISSR
   +this.Bene2016_17_CLSS;                                 

   this.HousesOccupiedT3 = this.Bene2016_17_CLSS + this.HousesOccupied2_ISSR + this.HousesOccupied2_AHP 
   + this.HousesOccupied2;


//  this.Houses_CompletedT3 =      this.Houses_Completed3 +    this.Houses_Completed3_AHP + this.Houses_Completed3_ISSR +this.Bene2016_17_CLSS;
 // this.HousesOccupiedT3 =      this.HousesOccupied3 +    this.HousesOccupied3_AHP +this.HousesOccupied3_ISSR +this.Bene2016_17_CLSS;
  
  // this.Houses_CompletedT3 =  this.Houses_Completed2_AHP +this.Houses_Completed2
  //  +this.Houses_Completed2_ISSR +this.Bene2016_17_CLSS +this.Houses_CompletedT3;
  
   this.Houses_CompletedT4 = this.Houses_Completed3  + this.Houses_Completed3_AHP + this.Houses_Completed3_ISSR 
  + this.Bene2017_18_CLSS ;
  //HousesOccupiedT4

  this.HousesOccupiedT6 = parseInt(this.Bene2019_20_CLSS) + parseInt(this.HousesOccupied5_ISSR) + parseInt(this.HousesOccupied5_AHP)
   +parseInt(this.HousesOccupied5);



this.HouseInvolvedT4 = this.HouseInvolved3 + this.HouseInvolved3_AHP+this.HouseInvolved3_ISSR + this.Bene2017_18_CLSS ;

this.FundsDisbursed_in_HousesT4 = this.FundsDisbursed_in_Houses3  +this.FundsDisbursed_in_Houses3_AHP +
 this.Bene2017_18_CLSS + this.FundsDisbursed_in_Houses3_ISSR;

//  this.FundsDisbursed_in_HousesT4 = this.FundsDisbursed_in_Houses3  +this.FundsDisbursed_in_Houses3_AHP
//     this.FundsDisbursed_in_Houses3_ISSR + this.Bene2017_18_CLSS;
    


this.Houses_GroundedT4 = this.Houses_Grounded3 + this.Houses_Grounded3_AHP +this.Bene2017_18_CLSS;
//this.Houses_CompletedT4 =this.Houses_Completed3 + this.Houses_Completed3_AHP +this.Bene2017_18_CLSS;

this.HousesOccupiedT4 =this.HousesOccupied3  + this.HousesOccupied3_AHP +this.Bene2017_18_CLSS + this.HousesOccupied3_ISSR;

this.HouseInvolvedT5         =this.HouseInvolved4 +this.HouseInvolved4_AHP  +this.HouseInvolved4_ISSR +this.Bene2018_19_CLSS ;
this.FundsDisbursed_in_HousesT5  =this.FundsDisbursed_in_Houses4 +this. FundsDisbursed_in_Houses4_AHP +this.Bene2018_19_CLSS;
this.Houses_GroundedT5 =  this.Houses_Grounded4  +this.Houses_Grounded4_AHP  +this.Bene2018_19_CLSS;
this.Houses_CompletedT5 = this.Houses_Completed4  +this.Houses_Completed4_AHP  +this.Bene2018_19_CLSS;
this.HousesOccupiedT5 = this.HousesOccupied4  +this.HousesOccupied4_AHP  +this.Bene2018_19_CLSS;

 
  this.HouseInvolvedT6 = this.HouseInvolved5 + this.HouseInvolved5_AHP +this.HouseInvolved5_ISSR +this.Bene2019_20_CLSS;
  this.FundsDisbursed_in_HousesT6 = this.FundsDisbursed_in_Houses5 + this.FundsDisbursed_in_Houses5_AHP + this.FundsDisbursed_in_Houses5_ISSR +this.Bene2019_20_CLSS;
  this.Houses_GroundedT6 = this.Houses_Grounded5 +this.Houses_Grounded5_AHP + this.Houses_Grounded5_ISSR +this.Bene2019_20_CLSS;                                 
  this.Houses_CompletedT6 = this.Houses_Completed5 + this.Houses_Completed5_AHP + this.Houses_Completed5_ISSR +this.Bene2019_20_CLSS;
  //this.HousesOccupiedT6 =this.HousesOccupied5_AHP + this.HousesOccupied5_ISSR  +this.Bene2019_20_CLSS +this.HousesOccupiedT6;
   
 
  this.THouseInvolvedGT = this.HouseInvolvedT1 +this.HouseInvolvedT2 +this.HouseInvolvedT3 +this.HouseInvolvedT4 +this.HouseInvolvedT5 +this.HouseInvolvedT6;
  
  this.THouses_GroundedGT = this.Houses_GroundedT1 +this.Houses_GroundedT2 +this.Houses_GroundedT3 +this.Houses_GroundedT4+ +this.Houses_GroundedT5 +this.Houses_GroundedT6;
  this.THouses_CompletedGT =this.Houses_CompletedT1 +this.Houses_CompletedT2 +this.Houses_CompletedT3 +this.Houses_CompletedT4 +this.Houses_CompletedT5 +this.Houses_CompletedT6;
  this.THousesOccupiedGT  =this.HousesOccupiedT1 + this.HousesOccupiedT2 + this.HousesOccupiedT3 +this.HousesOccupiedT4 +this.HousesOccupiedT5 +this.HousesOccupiedT6 ;
   



  


  this.HouseInvolvedT4 = this.Bene2017_18_CLSS +this.HouseInvolved3_ISSR + this.HouseInvolved3_AHP + this.HouseInvolved3;



  //----------------------------- new code
this.THouseInvolved =this.HouseInvolved01  +this.HouseInvolved1 + this.HouseInvolved2 +this.HouseInvolved3 +
this.HouseInvolved4 +this.HouseInvolved5;
//alert(0);

//     this.THouseInvolved = this.HouseInvolved0 +this.HouseInvolved1 +this.HouseInvolved2 +this.HouseInvolved3 +this.HouseInvolved4 +this.HouseInvolved5;
   
//this.THouseInvolved = this.HouseInvolved01 + this.HouseInvolved1 + this.HouseInvolved2 +this.HouseInvolved3 + this.HouseInvolved4 + this.HouseInvolved5;

    this.TFundsDisbursed_in_Houses = parseFloat(this.FundsDisbursed_in_Houses01) +  parseFloat(this.FundsDisbursed_in_Houses1) + parseFloat(this.FundsDisbursed_in_Houses2) 
     +  parseFloat(this.FundsDisbursed_in_Houses3) + parseFloat(this.FundsDisbursed_in_Houses4)  +parseFloat(this.FundsDisbursed_in_Houses5);
   
   
   this.THouses_Grounded =this.Houses_Grounded01 +this.Houses_Grounded1 +this.Houses_Grounded2 +this.Houses_Grounded3 +this.Houses_Grounded4 +this.Houses_Grounded5;
   this.THouses_Completed = this.Houses_Completed01 + this.Houses_Completed1 +this.Houses_Completed2 +this.Houses_Completed3 +this.Houses_Completed4 +this.Houses_Completed5;
   this.THousesOccupied   = this.HousesOccupied01 +this.HousesOccupied1 +this.HousesOccupied2 +this.HousesOccupied3 +this.HousesOccupied4 +this.HousesOccupied5;


   this.THouseInvolved_AHP  =this.HouseInvolved0_AHP + this.HouseInvolved1_AHP+ this.HouseInvolved2_AHP+ this.HouseInvolved3_AHP+ this.HouseInvolved4_AHP+ this.HouseInvolved5_AHP; 
   this.TotalFundsDisbursedAHP =this.FundsDisbursed_in_Houses0_AHP +this.FundsDisbursed_in_Houses1_AHP +this.FundsDisbursed_in_Houses2_AHP + this.FundsDisbursed_in_Houses3_AHP +this.FundsDisbursed_in_Houses4_AHP +this.FundsDisbursed_in_Houses5_AHP;
   this.THouses_Grounded_AHP = this.Houses_Grounded0_AHP + this.Houses_Grounded1_AHP + this.Houses_Grounded2_AHP + this.Houses_Grounded3_AHP + this.Houses_Grounded4_AHP + this.Houses_Grounded5_AHP;
   this.THouses_Completed_AHP= this.Houses_Completed0_AHP +this.Houses_Completed1_AHP +this.Houses_Completed2_AHP +this.Houses_Completed3_AHP +this.Houses_Completed4_AHP +this.Houses_Completed5_AHP;
   this.THousesOccupied_AHP = this.HousesOccupied0_AHP +this.HousesOccupied1_AHP +this.HousesOccupied2_AHP +this.HousesOccupied3_AHP +this.HousesOccupied4_AHP +this.HousesOccupied5_AHP;
   
    this.HouseInvolvedT2 = this.HouseInvolved1  + this.HouseInvolved1_AHP + this.HouseInvolved1_ISSR + this.Bene2015_16_CLSS;


    this.FundsDisbursed_in_HousesT2 = this.Bene2015_16_CLSS + this.FundsDisbursed_in_Houses1_ISSR + 
    this.FundsDisbursed_in_Houses1_AHP + this.FundsDisbursed_in_Houses1;
    //this.FundsDisbursed_in_HousesT3 = this.FundsDisbursed_in_Houses2 + this.FundsDisbursed_in_Houses2_AHP + this.Bene2016_17_CLSS;

    this.HouseInvolvedT3 = this.HouseInvolved2 + this.HouseInvolved2_AHP + this.Bene2016_17_CLSS;
//    this.HouseInvolvedT4 = this.HouseInvolved3 + this.HouseInvolved3_AHP + this.Bene2017_18_CLSS ;
    

   this.Houses_GroundedT4    =this.Bene2017_18_CLSS + this.Houses_Grounded3_ISSR + this.Houses_Grounded3_AHP 
    + this.Houses_Grounded3;
    this.Houses_GroundedT5 =  this.Houses_Grounded4  +this.Houses_Grounded4_AHP  +this.Bene2018_19_CLSS+ this.Houses_Grounded4_ISSR;
    

    

    // this.Houses_GroundedT4 = this.Houses_Grounded3 + this.Houses_Grounded3_AHP +this.Bene2017_18_CLSS;
    // this.Houses_CompletedT4 =this.Houses_Completed3 + this.Houses_Completed3_AHP +this.Bene2017_18_CLSS;
    // this.HousesOccupiedT4 =this.HousesOccupied3  + this.HousesOccupied3_AHP +this.Bene2017_18_CLSS;
     
    this.HouseInvolvedT5         = this.HouseInvolved4_ISSR +this.HouseInvolved4 +this.HouseInvolved4_AHP 
     +this.Bene2018_19_CLSS ;

    
    this.THouseInvolvedGT = this.HouseInvolvedT1 +this.HouseInvolvedT2 +this.HouseInvolvedT3 +this.HouseInvolvedT4 +this.HouseInvolvedT5 +this.HouseInvolvedT6; 

    this.FundsDisbursed_in_HousesT5  =this.FundsDisbursed_in_Houses4 +this. FundsDisbursed_in_Houses4_AHP +this.Bene2018_19_CLSS;
    this.Houses_CompletedT5 = this.Houses_Completed4  +this.Houses_Completed4_AHP +this.Houses_Completed4_ISSR  +this.Bene2018_19_CLSS;
    this.HousesOccupiedT5 = this.HousesOccupied4  +this.HousesOccupied4_AHP  +this.Bene2018_19_CLSS;
    //-------------------------------------------------------------------
    this.THouseInvolvedGT =this.HouseInvolvedT1 +this.HouseInvolvedT2 + this.HouseInvolvedT3 + this.HouseInvolvedT4 +this.HouseInvolvedT5 +this.HouseInvolvedT6; 
    
    
   // this.TFundsDisbursed_in_HousesGT = this.FundsDisbursed_in_HousesT3 + this.FundsDisbursed_in_HousesT1 + this.FundsDisbursed_in_HousesT2  +this.FundsDisbursed_in_HousesT4 +this.FundsDisbursed_in_HousesT5;
  
//   this.HouseInvolvedT1 =this.HouseInvolved01 + this.HouseInvolved0_AHP + this.HouseInvolved0_ISSR + this.Bene2014_15_CLSS ;

this.HouseInvolvedT1=    this.Bene2014_15_CLSS + this.HouseInvolved0_ISSR +
this.HouseInvolved0_AHP +this.HouseInvolved01;

this.HouseInvolvedT3 = this.Bene2016_17_CLSS + this.HouseInvolved2_ISSR + this.HouseInvolved2_AHP + this.HouseInvolved2 ;


   this.TFundsDisbursed_in_HousesGT = this.FundsDisbursed_in_HousesT1 +this.FundsDisbursed_in_HousesT2 + 
   this.FundsDisbursed_in_HousesT3 + this.FundsDisbursed_in_HousesT4 + this.FundsDisbursed_in_HousesT5 + 
   this.FundsDisbursed_in_HousesT6;
   
   this.THouseInvolvedGT =this.HouseInvolvedT1 +this.HouseInvolvedT2 + this.HouseInvolvedT3 + this.HouseInvolvedT4 + this.HouseInvolvedT5 + this.HouseInvolvedT6;
   this.TFundsDisbursed_in_HousesGT =this.FundsDisbursed_in_HousesT1 +this.FundsDisbursed_in_HousesT2 +this.FundsDisbursed_in_HousesT3 +this.FundsDisbursed_in_HousesT4 +this.FundsDisbursed_in_HousesT5 +this.FundsDisbursed_in_HousesT6;
   this.THouses_GroundedGT =this.Houses_GroundedT1 + this.Houses_GroundedT2 +this.Houses_GroundedT3  +this.Houses_GroundedT4 +  this.Houses_GroundedT5+  this.Houses_GroundedT6;
   this.THouses_CompletedGT = this.Houses_CompletedT1 + this.Houses_CompletedT2 +this.Houses_CompletedT3 +this.Houses_CompletedT4 +this.Houses_CompletedT5+this.Houses_CompletedT6 ;
   this.THousesOccupiedGT =this.HousesOccupiedT1 +this.HousesOccupiedT2 +this.HousesOccupiedT3 +this.HousesOccupiedT4 +this.HousesOccupiedT5+ this.HousesOccupiedT6;
  
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

openModalDialog(cid,year,type){
    this.StateName=this.StateName;
    this.Year=year;
    this.Cid=cid;
      if (cid =="JNNURM")
      {
              this.service.sp_GetHousesStatusForVerticalJN(this.stateCode,"0","0").subscribe(resut=>{ 
              this.lstHousesStatus=resut;
              this.display='block';
            })
          }
      else{
        this.service.sp_GetDetailsDataPopUp(this.stateCode,cid,year,type).subscribe(resut=>{
        this.lstHousesStatus=resut;
        this.display='block';
      })
  }
}

closeModalDialog(){
this.display='none';
}
AdminPage()
{
  this.router.navigate(['/Admin/VerticalHousesDetails']);
}   

GetFilterDatanew (stateCode,districtCodes ,cityCodes, Compid)
{
  this.HouseInvolved01=0;
  this.HouseInvolved1 =0;
  this.HouseInvolved2 =0;
  this.HouseInvolved3 =0;
  this.HouseInvolved4 =0;
  this.HouseInvolved5 =0;
  this.HouseInvolved6 =0;
  this.THouseInvolved =0;

  this.TFundsDisbursed_in_Houses  = 0;
  this.FundsDisbursed_in_Houses01 = 0;
  this.FundsDisbursed_in_Houses2_ISSR=0;
  this.FundsDisbursed_in_Houses1=0;
  this.FundsDisbursed_in_Houses2=0;
  this.FundsDisbursed_in_Houses3=0;
  this.FundsDisbursed_in_Houses4=0;
  this.FundsDisbursed_in_Houses5=0;
  this.Houses_Grounded1=0;
  this.Houses_Grounded2=0;
  this.Houses_Grounded3=0;
  this.Houses_Grounded4=0;
  this.Houses_Grounded5=0;
  
  this.THouses_Grounded =0;
  this.Houses_Completed1 =0;
  this.Houses_Completed2 =0;
  this.Houses_Completed3 =0;
  this.Houses_Completed4 =0;
  this.Houses_Completed5 =0;
  this.THouses_Completed = 0;
  this.HousesOccupied1=0;
  this.HousesOccupied2=0;
  this.HousesOccupied3=0;
  this.HousesOccupied4=0;
  this.HousesOccupied5=0;
  this.FundsDisbursed_in_Houses1_AHP= 0;
  this.FundsDisbursed_in_Houses2_AHP= 0;
  this.FundsDisbursed_in_Houses3_AHP= 0;
  this.FundsDisbursed_in_Houses4_AHP= 0;
  this.FundsDisbursed_in_Houses5_AHP= 0;
  this.TotalFundsDisbursedAHP= 0;
 
  this.FundsDisbursed_in_Houses01=0;
  this.Houses_Grounded01=0;
  this.Houses_Completed01=0;
  this.HousesOccupied01 = 0;
  this.HouseInvolvedT1 =0;

  this.THouseInvolved1_ISSR =0;
   this.TFundsDisbursed_in_Houses1_ISSR =0;
  this.THouses_Grounded1_ISSR =0;
  this.THouses_Completed1_ISSR =0;
  this.THousesOccupied1_ISSR =0;


  this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"BLCS","2014-15").subscribe(result_BLCS=>{
    try{
    this.HouseInvolved01=result_BLCS[0].Housesinvolved;
   // alert(0);
    this.FundsDisbursed_in_Houses01 = result_BLCS[0].FundsDisbursed_in_Houses;
    this.Houses_Grounded01 = result_BLCS[0].Houses_Grounded;
    this.Houses_Completed01 = result_BLCS[0].Houses_Completed;
    this.HousesOccupied01 = result_BLCS[0].HousesOccupied;
    }
    catch{}
    finally{}


    this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"BLCS","2015-16").subscribe(result_BLCS15=>{
      this.HouseInvolved1=result_BLCS15[0].Housesinvolved;
      this.fistNumber=this.HouseInvolved1;
      this.FundsDisbursed_in_Houses1 = result_BLCS15[0].FundsDisbursed_in_Houses;
      this.Houses_Grounded1 = result_BLCS15[0].Houses_Grounded;
      this.Houses_Completed1 = result_BLCS15[0].Houses_Completed;
      this.HousesOccupied1 = result_BLCS15[0].HousesOccupied;

      this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"BLCS","2016-17").subscribe(result_BLCS16=>{
        try{this.HouseInvolved2=result_BLCS16[0].Housesinvolved;
            this.secondNumber= this.HouseInvolved2;
            this.FundsDisbursed_in_Houses2 = result_BLCS16[0].FundsDisbursed_in_Houses;
            this.Houses_Grounded2 = result_BLCS16[0].Houses_Grounded;
            this.Houses_Completed2 = result_BLCS16[0].Houses_Completed;
            this.HousesOccupied2 = result_BLCS16[0].HousesOccupied;
          }
          catch{}
          finally{}
  
          this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"BLCS","2017-18").subscribe(result_BLCS17=>{
            this.HouseInvolved3=result_BLCS17[0].Housesinvolved;
            this.FundsDisbursed_in_Houses3 = result_BLCS17[0].FundsDisbursed_in_Houses;
            this.Houses_Grounded3 = result_BLCS17[0].Houses_Grounded;
            this.Houses_Completed3 = result_BLCS17[0].Houses_Completed;
            this.HousesOccupied3 = result_BLCS17[0].HousesOccupied;
     //     })
           // alert();
    this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"BLCS","2018-19").subscribe(result_BLCS18=>{
              this.HouseInvolved4=result_BLCS18[0].Housesinvolved;
              this.FundsDisbursed_in_Houses4 = result_BLCS18[0].FundsDisbursed_in_Houses;
              this.Houses_Grounded4 = result_BLCS18[0].Houses_Grounded;
              this.Houses_Completed4 = result_BLCS18[0].Houses_Completed;
              this.HousesOccupied4= result_BLCS18[0].HousesOccupied;
     //       })
     
    this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"BLCS","2019-20").subscribe(result_BLCS19=>{
      try{
        this.HouseInvolved5=result_BLCS19[0].Housesinvolved;
                  this.FundsDisbursed_in_Houses5 = result_BLCS19[0].FundsDisbursed_in_Houses;
                  this.Houses_Grounded5 = result_BLCS19[0].Houses_Grounded;
                  this.Houses_Completed5 = result_BLCS19[0].Houses_Completed;
                  this.HousesOccupied5= result_BLCS19[0].HousesOccupied;
                }
                catch{}
                finally{}
              this.THouseInvolved =  this.HouseInvolved01 +this.HouseInvolved1 + this.HouseInvolved2+ this.HouseInvolved3 + this.HouseInvolved4 +this.HouseInvolved5;
              this.TFundsDisbursed_in_Houses  = this.FundsDisbursed_in_Houses01 +this.FundsDisbursed_in_Houses1 +this.FundsDisbursed_in_Houses2 +this.FundsDisbursed_in_Houses3+this.FundsDisbursed_in_Houses4+this.FundsDisbursed_in_Houses5;

              this.THouses_Grounded =this.Houses_Grounded01 +this.Houses_Grounded1 +this.Houses_Grounded2 +this.Houses_Grounded3 +this.Houses_Grounded4 +this.Houses_Grounded5;
              this.THouses_Completed = this.Houses_Completed01 + this.Houses_Completed1 +this.Houses_Completed2 +this.Houses_Completed3 +this.Houses_Completed4 +this.Houses_Completed5;
              this.THousesOccupied   = this.HousesOccupied01 +this.HousesOccupied1 +this.HousesOccupied2 +this.HousesOccupied3 +this.HousesOccupied4 +this.HousesOccupied5;
  
   //----------------------------------------Block 1 End

   this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"AHP","2014-15").subscribe(result_AHP=>{
   try {
    this.HouseInvolved0_AHP=result_AHP[0].Housesinvolved;
    this.FundsDisbursed_in_Houses0_AHP = result_AHP[0].FundsDisbursed_in_Houses;
    this.Houses_Grounded0_AHP = result_AHP[0].Houses_Grounded;
    this.Houses_Completed0_AHP = result_AHP[0].Houses_Completed;
    this.HousesOccupied0_AHP = result_AHP[0].HousesOccupied;
  }
  catch{}
  finally{}
 // })
//           alert(6);
this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"AHP","2015-16").subscribe(result_AHP15=>{
  try {   this.HouseInvolved1_AHP=result_AHP15[0].Housesinvolved;
    this.FundsDisbursed_in_Houses1_AHP = result_AHP15[0].FundsDisbursed_in_Houses;
    this.Houses_Grounded1_AHP = result_AHP15[0].Houses_Grounded;
    this.Houses_Completed1_AHP = result_AHP15[0].Houses_Completed;
    this.HousesOccupied1_AHP = result_AHP15[0].HousesOccupied;
  }
  catch{}
  finally{}
 // })         
               
//           alert(7);
this.HouseInvolved2_AHP =0;
this.FundsDisbursed_in_Houses2_AHP =0;
this.Houses_Grounded2_AHP = 0;
this.Houses_Completed2_AHP =0;
this.HousesOccupied2_AHP =0;
this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"AHP","2016-17").subscribe(result_AHP16=>{
      try {  
      this.HouseInvolved2_AHP=result_AHP16[0].Housesinvolved;
      this.FundsDisbursed_in_Houses2_AHP = result_AHP16[0].FundsDisbursed_in_Houses;
      this.Houses_Grounded2_AHP = result_AHP16[0].Houses_Grounded;
      this.Houses_Completed2_AHP = result_AHP16[0].Houses_Completed;
      this.HousesOccupied2_AHP = result_AHP16[0].HousesOccupied;
    }
    catch{}
    finally{}
   // })         
//             alert(8);
      this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"AHP","2017-18").subscribe(result_AHP=>{
        try {  this.HouseInvolved3_AHP=result_AHP[0].Housesinvolved;
        this.FundsDisbursed_in_Houses3_AHP = result_AHP[0].FundsDisbursed_in_Houses;
        this.Houses_Grounded3_AHP = result_AHP[0].Houses_Grounded;
        this.Houses_Completed3_AHP = result_AHP[0].Houses_Completed;
        this.HousesOccupied3_AHP = result_AHP[0].HousesOccupied;
      }
      catch{}
      finally{}
      //})      
//                  alert(9);
this.HouseInvolved4_AHP= 0;
this.FundsDisbursed_in_Houses4_AHP =0;
this.Houses_Grounded4_AHP =0;
this.Houses_Completed4_AHP =0;
this.HousesOccupied4_AHP = 0;
        this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"AHP","2018-19").subscribe(result_AHP18=>{
          try {   this.HouseInvolved4_AHP=result_AHP18[0].Housesinvolved;
          this.FundsDisbursed_in_Houses4_AHP = result_AHP18[0].FundsDisbursed_in_Houses;
          this.Houses_Grounded4_AHP = result_AHP18[0].Houses_Grounded;
          this.Houses_Completed4_AHP = result_AHP18[0].Houses_Completed;
          this.HousesOccupied4_AHP = result_AHP18[0].HousesOccupied;
        }
        catch{}
        finally{}
        //})           
//                 alert(10);
this.HouseInvolved5_AHP =0;
this.FundsDisbursed_in_Houses5_AHP =0;
this.Houses_Grounded5_AHP =  0;
this.Houses_Completed5_AHP = 0;
this.HousesOccupied5_AHP =0;

          this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"AHP","2019-20").subscribe(result_AHP19=>{
            try { 
            this.HouseInvolved5_AHP=result_AHP19[0].Housesinvolved;
            this.FundsDisbursed_in_Houses5_AHP = result_AHP19[0].FundsDisbursed_in_Houses;
            this.Houses_Grounded5_AHP = result_AHP19[0].Houses_Grounded;
            this.Houses_Completed5_AHP = result_AHP19[0].Houses_Completed;
            this.HousesOccupied5_AHP = result_AHP19[0].HousesOccupied;
          }
          catch{}
          finally{}
          //})
          this.THouseInvolved_AHP  =this.HouseInvolved0_AHP + this.HouseInvolved1_AHP+ this.HouseInvolved2_AHP+ this.HouseInvolved3_AHP+ this.HouseInvolved4_AHP+ this.HouseInvolved5_AHP; 
          this.TotalFundsDisbursedAHP =this.FundsDisbursed_in_Houses0_AHP +this.FundsDisbursed_in_Houses1_AHP +this.FundsDisbursed_in_Houses2_AHP + this.FundsDisbursed_in_Houses3_AHP +this.FundsDisbursed_in_Houses4_AHP +this.FundsDisbursed_in_Houses5_AHP;
          this.THouses_Grounded_AHP = this.Houses_Grounded0_AHP + this.Houses_Grounded1_AHP + this.Houses_Grounded2_AHP + this.Houses_Grounded3_AHP + this.Houses_Grounded4_AHP + this.Houses_Grounded5_AHP;
          this.THouses_Completed_AHP= this.Houses_Completed0_AHP +this.Houses_Completed1_AHP +this.Houses_Completed2_AHP +this.Houses_Completed3_AHP +this.Houses_Completed4_AHP +this.Houses_Completed5_AHP;
          this.THousesOccupied_AHP = this.HousesOccupied0_AHP +this.HousesOccupied1_AHP +this.HousesOccupied2_AHP +this.HousesOccupied3_AHP +this.HousesOccupied4_AHP +this.HousesOccupied5_AHP;
         
//-------------------------------ISSR        
        this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode,districtCodes ,cityCodes,"ISSR","2014-15").subscribe(result_ISSR0=>{
          this.HouseInvolved0_ISSR=result_ISSR0[0].Housesinvolved;
          this.FundsDisbursed_in_Houses0_ISSR=result_ISSR0[0].FundsDisbursed_in_Houses;
          this.Houses_Grounded0_ISSR=result_ISSR0[0].Houses_Grounded;
          this.Houses_Completed0_ISSR=result_ISSR0[0].Houses_Completed;
          this.HousesOccupied0_ISSR=result_ISSR0[0].HousesOccupied; 
      
this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode,districtCodes ,cityCodes,"ISSR","2015-16").subscribe(result_ISSR=>{
this.HouseInvolved1_ISSR=result_ISSR[0].Housesinvolved;
this.FundsDisbursed_in_Houses1_ISSR=result_ISSR[0].FundsDisbursed_in_Houses;
this.Houses_Grounded1_ISSR=result_ISSR[0].Houses_Grounded;
this.Houses_Completed1_ISSR=result_ISSR[0].Houses_Completed;
this.HousesOccupied1_ISSR=result_ISSR[0].HousesOccupied; 

this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode,districtCodes ,cityCodes,"ISSR","2016-17").subscribe(result_ISSR2=>{
try {
this.HouseInvolved2_ISSR=result_ISSR2[0].Housesinvolved;
this.Houses_Grounded2_ISSR=result_ISSR2[0].Houses_Grounded;
this.Houses_Completed2_ISSR=result_ISSR2[0].Houses_Completed;
this.HousesOccupied2_ISSR=result_ISSR2[0].HousesOccupied; 
}
catch{}
finally{}

 this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode,districtCodes ,cityCodes,"ISSR","2017-18").subscribe(result_ISSR3=>{
  this.HouseInvolved3_ISSR=result_ISSR3[0].Housesinvolved;
  this.FundsDisbursed_in_Houses3_ISSR=result_ISSR3[0].FundsDisbursed_in_Houses;
  this.Houses_Grounded3_ISSR=result_ISSR3[0].Houses_Grounded;
  this.Houses_Completed3_ISSR=result_ISSR3[0].Houses_Completed;
  this.HousesOccupied3_ISSR=result_ISSR3[0].HousesOccupied; 


  this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode,districtCodes ,cityCodes,"ISSR","2018-19").subscribe(result_ISSR3=>{
    this.HouseInvolved4_ISSR=result_ISSR3[0].Housesinvolved;
    this.FundsDisbursed_in_Houses4_ISSR=result_ISSR3[0].FundsDisbursed_in_Houses;
    this.Houses_Grounded4_ISSR=result_ISSR3[0].Houses_Grounded;
    this.Houses_Completed4_ISSR=result_ISSR3[0].Houses_Completed;
    this.HousesOccupied4_ISSR=result_ISSR3[0].HousesOccupied; 

    this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode,districtCodes ,cityCodes,"ISSR","2019-20").subscribe(result_ISSR3=>{
      this.HouseInvolved5_ISSR=result_ISSR3[0].Housesinvolved;
      this.FundsDisbursed_in_Houses5_ISSR=result_ISSR3[0].FundsDisbursed_in_Houses;
      this.Houses_Grounded5_ISSR=result_ISSR3[0].Houses_Grounded;
      this.Houses_Completed5_ISSR=result_ISSR3[0].Houses_Completed;
      this.HousesOccupied5_ISSR=result_ISSR3[0].HousesOccupied; 
  
      this.THouseInvolved1_ISSR = this.HouseInvolved0_ISSR +this.HouseInvolved1_ISSR +this.HouseInvolved2_ISSR + this.HouseInvolved3_ISSR +this.HouseInvolved4_ISSR +this.HouseInvolved5_ISSR;
      this.TFundsDisbursed_in_Houses1_ISSR =this.FundsDisbursed_in_Houses0_ISSR +this.FundsDisbursed_in_Houses1_ISSR +this.FundsDisbursed_in_Houses2_ISSR +this.FundsDisbursed_in_Houses3_ISSR +this.FundsDisbursed_in_Houses4_ISSR +this.FundsDisbursed_in_Houses5_ISSR;
      this.THouses_Grounded1_ISSR = this.Houses_Grounded0_ISSR +this.Houses_Grounded1_ISSR+this.Houses_Grounded2_ISSR+this.Houses_Grounded3_ISSR+this.Houses_Grounded4_ISSR+this.Houses_Grounded5_ISSR;
      this.THouses_Completed1_ISSR =this.Houses_Completed0_ISSR +this.Houses_Completed1_ISSR +this.Houses_Completed2_ISSR +this.Houses_Completed3_ISSR +this.Houses_Completed4_ISSR +this.Houses_Completed5_ISSR;
      this.THousesOccupied1_ISSR = this.HousesOccupied0_ISSR + this.HousesOccupied1_ISSR + this.HousesOccupied2_ISSR + this.HousesOccupied3_ISSR +  this.HousesOccupied4_ISSR + this.HousesOccupied5_ISSR;


      //-----------------------------------------JNNURM-------------------------------------------------   
this.service.sp_GetHousesStatusForVerticalJN(stateCode,districtCodes ,cityCodes).subscribe(resultJN=>{
  this.Houses_GroundedJN_T=resultJN[0].Houses_Grounded;
  this.THouses_CompletedJN=resultJN[0].Houses_Completed;
  this.HousesOccupiedJNT=resultJN[0].HousesOccupied;
  this.Houses_GroundedJN_T = this.Houses_GroundedJN_T;
  this.THouses_CompletedJN =this.THouses_CompletedJN;
  this.HousesOccupiedJNT =this.HousesOccupiedJNT;

  //--------------------------- clss
  this.service.GetCLSS_Houses_VerticalWise(this.stateCode).subscribe(result_CLSS=>{
    this.Bene2014_15_CLSS=result_CLSS[0].Bene2014_15;
    this.Bene2015_16_CLSS=result_CLSS[0].Bene2015_16;
    this.Bene2016_17_CLSS=result_CLSS[0].Bene2016_17;
    this.Bene2017_18_CLSS=result_CLSS[0].Bene2017_18;
    this.Bene2018_19_CLSS=result_CLSS[0].Bene2018_19;
    this.Bene2019_20_CLSS=result_CLSS[0].Bene2019_20;
  
    this.BeneCLSS_Total =parseFloat(this.Bene2014_15_CLSS) + parseFloat(this.Bene2015_16_CLSS) + parseFloat(this.Bene2016_17_CLSS) +
    parseFloat(this.Bene2017_18_CLSS) +parseFloat(this.Bene2018_19_CLSS) +parseFloat(this.Bene2019_20_CLSS);// +parseFloat(this.Bene2019_20_CLSS); 
  
  //  this.Bene2020_21_CLSS=result_CLSS[0].Bene2020_21;
  //  this.Bene2021_22_CLSS=result_CLSS[0].Bene2021_22;
  
  
  
  this.FundsDisbursed_in_HousesT1 =this.Bene2014_15_CLSS ;

//--------------------------------------------
  this.HouseInvolvedT1=   this.HouseInvolved01 +this.HouseInvolved0_AHP + this.HouseInvolved0_ISSR +this.Bene2014_15_CLSS ;
  this.FundsDisbursed_in_HousesT1 = parseFloat(this.Bene2014_15_CLSS) + parseFloat(this.FundsDisbursed_in_Houses0_ISSR) + 
  parseFloat(this.FundsDisbursed_in_Houses0_AHP) +parseFloat(this.FundsDisbursed_in_Houses01);
  this.Houses_GroundedT1 = this.Houses_GroundedJN_T +this.Bene2014_15_CLSS + this.Houses_Grounded0_ISSR +  this.Houses_Grounded0_AHP + this.Houses_Grounded0;
  this.Houses_CompletedT1 = this.THouses_CompletedJN +this.Bene2014_15_CLSS + this.Houses_Completed0_ISSR +  this.Houses_Completed0_AHP + this.Houses_Completed01;
  this.HousesOccupiedT1 = this.HousesOccupiedJNT +this.Bene2014_15_CLSS + this.HousesOccupied0_ISSR +  this.HousesOccupied0_AHP + this.HousesOccupied01;


 // this.HouseInvolvedT2 = this.HouseInvolved2 +  this.HouseInvolved2_AHP +this.HouseInvolved2_ISSR +this.Bene2015_16_CLSS;
  this.HouseInvolvedT2 = this.HouseInvolved1  + this.HouseInvolved1_AHP + this.HouseInvolved1_ISSR + this.Bene2015_16_CLSS;
 
  // this.FundsDisbursed_in_HousesT2 =      this.TFundsDisbursed_in_Houses +   
  // this.TotalFundsDisbursedAHP + this.TFundsDisbursed_in_Houses1_ISSR +this.BeneCLSS_Total;

  this.FundsDisbursed_in_HousesT2 = this.Bene2015_16_CLSS + this.FundsDisbursed_in_Houses1_ISSR + 
    this.FundsDisbursed_in_Houses1_AHP + this.FundsDisbursed_in_Houses1;
    //this.FundsDisbursed_in_HousesT3 = this.FundsDisbursed_in_Houses2 + this.FundsDisbursed_in_Houses2_AHP + this.Bene2016_17_CLSS;

    this.HouseInvolvedT3 = this.HouseInvolved2 + this.HouseInvolved2_AHP + this.Bene2016_17_CLSS;
//    this.HouseInvolvedT4 = this.HouseInvolved3 + this.HouseInvolved3_AHP + this.Bene2017_18_CLSS ;
this.HouseInvolvedT3 =this.Bene2016_17_CLSS +this.HouseInvolved2_ISSR + 
this.HouseInvolved2_AHP +this.HouseInvolved2;


   this.Houses_GroundedT4    =this.Bene2017_18_CLSS + this.Houses_Grounded3_ISSR + this.Houses_Grounded3_AHP 
    + this.Houses_Grounded3;
    this.Houses_GroundedT5 =  this.Houses_Grounded4  +this.Houses_Grounded4_AHP  +this.Bene2018_19_CLSS+ this.Houses_Grounded4_ISSR;
    

    

    // this.Houses_GroundedT4 = this.Houses_Grounded3 + this.Houses_Grounded3_AHP +this.Bene2017_18_CLSS;
    // this.Houses_CompletedT4 =this.Houses_Completed3 + this.Houses_Completed3_AHP +this.Bene2017_18_CLSS;
    // this.HousesOccupiedT4 =this.HousesOccupied3  + this.HousesOccupied3_AHP +this.Bene2017_18_CLSS;
     
    this.HouseInvolvedT5         = this.HouseInvolved4_ISSR +this.HouseInvolved4 +this.HouseInvolved4_AHP 
     +this.Bene2018_19_CLSS ;

 
  this.Houses_GroundedT2 =this.Houses_Grounded1 +this.Houses_Grounded1_AHP + this.Houses_Grounded1_ISSR + this.Bene2015_16_CLSS;        
  this.Houses_CompletedT2 = this.Houses_Completed1 + this.Houses_Completed1_AHP + this.Houses_Completed1_ISSR +this.Bene2015_16_CLSS;
  this.HousesOccupiedT2 = this.HousesOccupied1 + this.HousesOccupied1_AHP +this.HousesOccupied1_ISSR +this.Bene2015_16_CLSS;
         
     
  this.Houses_CompletedT3 = this.Houses_Completed2 + this.Houses_Completed2_AHP + this.Houses_Completed2_ISSR 
      + this.Bene2016_17_CLSS;
   
      this.HouseInvolvedT4 = this.HouseInvolved3 + this.HouseInvolved3_AHP + this.HouseInvolved3_ISSR 
      + this.Bene2017_18_CLSS;
      this.HouseInvolvedT5 = this.HouseInvolved4 + this.HouseInvolved4_AHP + this.HouseInvolved4_ISSR 
      + this.Bene2018_19_CLSS;

      
      this.HouseInvolvedT6 =this.HouseInvolved5 + this.HouseInvolved5_AHP + this.HouseInvolved5_ISSR + this.Bene2019_20_CLSS;


      this.THouseInvolvedGT = this.HouseInvolvedT1 +this.HouseInvolvedT2 + this.HouseInvolvedT3  
      +this.HouseInvolvedT4 +this.HouseInvolvedT5 +this.HouseInvolvedT6;
      this.TFundsDisbursed_in_HousesGT =this.FundsDisbursed_in_HousesT1 +this.FundsDisbursed_in_HousesT2 +this.FundsDisbursed_in_HousesT3 +this.FundsDisbursed_in_HousesT4 +this.FundsDisbursed_in_HousesT5 +this.FundsDisbursed_in_HousesT6;
      this.THouses_GroundedGT =this.Houses_GroundedT1 +this.Houses_GroundedT2 +this.Houses_GroundedT3 +this.Houses_GroundedT4 +this.Houses_GroundedT5 +this.Houses_GroundedT6;
      this.THouses_CompletedGT =this.Houses_CompletedT1 +this.Houses_CompletedT2 +this.Houses_CompletedT3 +this.Houses_CompletedT4 +this.Houses_CompletedT5 +this.Houses_CompletedT6;
      this.THousesOccupiedGT =this.HousesOccupiedT1 +this.HousesOccupiedT2 +this.HousesOccupiedT3 +this.HousesOccupiedT4 +this.HousesOccupiedT5 +this.HousesOccupiedT6;
      
 })
}) 

//-----------------------------

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


GetFilterData (stateCode,districtCodes ,cityCodes, Compid)
{
//alert(stateCode);
this.HouseInvolved01=0;

  this.HouseInvolved1 =0;
  this.HouseInvolved2 =0;
  this.HouseInvolved3 =0;
  this.HouseInvolved4 =0;
  this.HouseInvolved5 =0;
  this.HouseInvolved6 =0;
  this.THouseInvolved =0;
  this.FundsDisbursed_in_Houses1=0;
  this.FundsDisbursed_in_Houses2=0;
  this.FundsDisbursed_in_Houses3=0;
  this.FundsDisbursed_in_Houses4=0;
  this.FundsDisbursed_in_Houses5=0;
  this.Houses_Grounded1=0;
  this.Houses_Grounded2=0;
  this.Houses_Grounded3=0;
  this.Houses_Grounded4=0;
  this.Houses_Grounded5=0;
  
  this.THouses_Grounded =0;
  this.Houses_Completed1 =0;
  this.Houses_Completed2 =0;
  this.Houses_Completed3 =0;
  this.Houses_Completed4 =0;
  this.Houses_Completed5 =0;
  this.THouses_Completed = 0;
  this.HousesOccupied1=0;
  this.HousesOccupied2=0;
  this.HousesOccupied3=0;
  this.HousesOccupied4=0;
  this.HousesOccupied5=0;
  this.FundsDisbursed_in_Houses1_AHP= 0;
  this.FundsDisbursed_in_Houses2_AHP= 0;
  this.FundsDisbursed_in_Houses3_AHP= 0;
  this.FundsDisbursed_in_Houses4_AHP= 0;
  this.FundsDisbursed_in_Houses5_AHP= 0;
  this.TotalFundsDisbursedAHP= 0;
 
  this.FundsDisbursed_in_Houses01=0;
  this.Houses_Grounded01=0;
  this.Houses_Completed01=0;
  this.HousesOccupied01 = 0;
  this.HouseInvolvedT1 =0;

  this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"BLCS","2014-15").subscribe(result_BLCS=>{
    try{
    this.HouseInvolved01=result_BLCS[0].Housesinvolved;
   // alert(0);
    this.FundsDisbursed_in_Houses01 = result_BLCS[0].FundsDisbursed_in_Houses;
    this.Houses_Grounded01 = result_BLCS[0].Houses_Grounded;
    this.Houses_Completed01 = result_BLCS[0].Houses_Completed;
    this.HousesOccupied01 = result_BLCS[0].HousesOccupied;
    }
    catch{}
    finally{}
  })
  this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"BLCS","2015-16").subscribe(result_BLCS15=>{
       this.HouseInvolved1=result_BLCS15[0].Housesinvolved;
       this.fistNumber=this.HouseInvolved1;
       this.FundsDisbursed_in_Houses1 = result_BLCS15[0].FundsDisbursed_in_Houses;
       this.Houses_Grounded1 = result_BLCS15[0].Houses_Grounded;
       this.Houses_Completed1 = result_BLCS15[0].Houses_Completed;
       this.HousesOccupied1 = result_BLCS15[0].HousesOccupied;
     // })
    
  this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"BLCS","2016-17").subscribe(result_BLCS16=>{
    try{this.HouseInvolved2=result_BLCS16[0].Housesinvolved;
        this.secondNumber= this.HouseInvolved2;
        this.FundsDisbursed_in_Houses2 = result_BLCS16[0].FundsDisbursed_in_Houses;
        this.Houses_Grounded2 = result_BLCS16[0].Houses_Grounded;
        this.Houses_Completed2 = result_BLCS16[0].Houses_Completed;
        this.HousesOccupied2 = result_BLCS16[0].HousesOccupied;
      }
      catch{}
      finally{}
    //  })
   // this.totalNumber=this.fistNumber + this.secondNumber;
    //alert(this.totalNumber);
    
  this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"BLCS","2017-18").subscribe(result_BLCS17=>{
          this.HouseInvolved3=result_BLCS17[0].Housesinvolved;
          this.FundsDisbursed_in_Houses3 = result_BLCS17[0].FundsDisbursed_in_Houses;
          this.Houses_Grounded3 = result_BLCS17[0].Houses_Grounded;
          this.Houses_Completed3 = result_BLCS17[0].Houses_Completed;
          this.HousesOccupied3 = result_BLCS17[0].HousesOccupied;
   //     })
         // alert();
  this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"BLCS","2018-19").subscribe(result_BLCS18=>{
            this.HouseInvolved4=result_BLCS18[0].Housesinvolved;
            this.FundsDisbursed_in_Houses4 = result_BLCS18[0].FundsDisbursed_in_Houses;
            this.Houses_Grounded4 = result_BLCS18[0].Houses_Grounded;
            this.Houses_Completed4 = result_BLCS18[0].Houses_Completed;
            this.HousesOccupied4= result_BLCS18[0].HousesOccupied;
   //       })
  //           alert(4);
  // alert(this.HouseInvolved01);
  //    alert(this.HouseInvolved1);
  //    alert(this.HouseInvolved2);
  //    alert(this.HouseInvolved3);
  //    alert(this.HouseInvolved4);
  //    alert(this.HouseInvolved5);
     

  this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"BLCS","2019-20").subscribe(result_BLCS19=>{
    try{
    this.HouseInvolved5=result_BLCS19[0].Housesinvolved;
              this.FundsDisbursed_in_Houses5 = result_BLCS19[0].FundsDisbursed_in_Houses;
              this.Houses_Grounded5 = result_BLCS19[0].Houses_Grounded;
              this.Houses_Completed5 = result_BLCS19[0].Houses_Completed;
              this.HousesOccupied5= result_BLCS19[0].HousesOccupied;
            }
            catch{}
            finally{}
     //\       }) 
     
     this.THouseInvolved = this.HouseInvolved01 +this.HouseInvolved1 +this.HouseInvolved2 +this.HouseInvolved3 +this.HouseInvolved4+this.HouseInvolved5;
              
  //             alert(5);
            this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"AHP","2014-15").subscribe(result_AHP=>{
            this.HouseInvolved0_AHP=result_AHP[0].Housesinvolved;
            this.FundsDisbursed_in_Houses0_AHP = result_AHP[0].FundsDisbursed_in_Houses;
            this.Houses_Grounded0_AHP = result_AHP[0].Houses_Grounded;
            this.Houses_Completed0_AHP = result_AHP[0].Houses_Completed;
            this.HousesOccupied0_AHP = result_AHP[0].HousesOccupied;
          })
  //           alert(6);
  this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"AHP","2015-16").subscribe(result_AHP=>{
            this.HouseInvolved1_AHP=result_AHP[0].Housesinvolved;
            this.FundsDisbursed_in_Houses1_AHP = result_AHP[0].FundsDisbursed_in_Houses;
            this.Houses_Grounded1_AHP = result_AHP[0].Houses_Grounded;
            this.Houses_Completed1_AHP = result_AHP[0].Houses_Completed;
            this.HousesOccupied1_AHP = result_AHP[0].HousesOccupied;
          })         
  //           alert(7);
            this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"AHP","2016-17").subscribe(result_AHP=>{
              this.HouseInvolved2_AHP=result_AHP[0].Housesinvolved;
              this.FundsDisbursed_in_Houses2_AHP = result_AHP[0].FundsDisbursed_in_Houses;
              this.Houses_Grounded2_AHP = result_AHP[0].Houses_Grounded;
              this.Houses_Completed2_AHP = result_AHP[0].Houses_Completed;
              this.HousesOccupied2_AHP = result_AHP[0].HousesOccupied;
            })         
  //             alert(8);
              this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"AHP","2017-18").subscribe(result_AHP=>{
                this.HouseInvolved3_AHP=result_AHP[0].Housesinvolved;
                this.FundsDisbursed_in_Houses3_AHP = result_AHP[0].FundsDisbursed_in_Houses;
                this.Houses_Grounded3_AHP = result_AHP[0].Houses_Grounded;
                this.Houses_Completed3_AHP = result_AHP[0].Houses_Completed;
                this.HousesOccupied3_AHP = result_AHP[0].HousesOccupied;
              })      
  //               alert(9);
                this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"AHP","2018-19").subscribe(result_AHP=>{
                  this.HouseInvolved4_AHP=result_AHP[0].Housesinvolved;
                  this.FundsDisbursed_in_Houses4_AHP = result_AHP[0].FundsDisbursed_in_Houses;
                  this.Houses_Grounded4_AHP = result_AHP[0].Houses_Grounded;
                  this.Houses_Completed4_AHP = result_AHP[0].Houses_Completed;
                  this.HousesOccupied4_AHP = result_AHP[0].HousesOccupied;
                })           
  //                 alert(10);
                  this.service.GetStatusofHouses_CompWiseNew(stateCode,districtCodes ,cityCodes,"AHP","2019-20").subscribe(result_AHP=>{
                    this.HouseInvolved5_AHP=result_AHP[0].Housesinvolved;
                    this.FundsDisbursed_in_Houses5_AHP = result_AHP[0].FundsDisbursed_in_Houses;
                    this.Houses_Grounded5_AHP = result_AHP[0].Houses_Grounded;
                    this.Houses_Completed5_AHP = result_AHP[0].Houses_Completed;
                    this.HousesOccupied5_AHP = result_AHP[0].HousesOccupied;
                  })
  //                   this.HouseInvolved0_ISSR ="0";
  //                   this.FundsDisbursed_in_Houses0_ISSR="0";
  //                   this.Houses_Grounded0_ISSR ="0";
  //                   this.Houses_Completed0_ISSR ="0";
  //                   this.HousesOccupied0_ISSR ="0";

       this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode,districtCodes ,cityCodes,"ISSR","2014-15").subscribe(result_ISSR0=>{
                      this.HouseInvolved0_ISSR=result_ISSR0[0].Housesinvolved;
                      this.FundsDisbursed_in_Houses0_ISSR=result_ISSR0[0].FundsDisbursed_in_Houses;
                      this.Houses_Grounded0_ISSR=result_ISSR0[0].Houses_Grounded;
                      this.Houses_Completed0_ISSR=result_ISSR0[0].Houses_Completed;
                      this.HousesOccupied0_ISSR=result_ISSR0[0].HousesOccupied; 
                    })
        this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode,districtCodes ,cityCodes,"ISSR","2015-16").subscribe(result_ISSR=>{
          this.HouseInvolved1_ISSR=result_ISSR[0].Housesinvolved;
          this.FundsDisbursed_in_Houses1_ISSR=result_ISSR[0].FundsDisbursed_in_Houses;
          this.Houses_Grounded1_ISSR=result_ISSR[0].Houses_Grounded;
          this.Houses_Completed1_ISSR=result_ISSR[0].Houses_Completed;
          this.HousesOccupied1_ISSR=result_ISSR[0].HousesOccupied; 
        })
          this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode,districtCodes ,cityCodes,"ISSR","2016-17").subscribe(result_ISSR2=>{
           try {
            this.HouseInvolved2_ISSR=result_ISSR2[0].Housesinvolved;
            this.Houses_Grounded2_ISSR=result_ISSR2[0].Houses_Grounded;
            this.Houses_Completed2_ISSR=result_ISSR2[0].Houses_Completed;
            this.HousesOccupied2_ISSR=result_ISSR2[0].HousesOccupied; 
           }
           catch{}
           finally{}
          })
             this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode,districtCodes ,cityCodes,"ISSR","2017-18").subscribe(result_ISSR3=>{
              this.HouseInvolved3_ISSR=result_ISSR3[0].Housesinvolved;
              this.FundsDisbursed_in_Houses3_ISSR=result_ISSR3[0].FundsDisbursed_in_Houses;
              this.Houses_Grounded3_ISSR=result_ISSR3[0].Houses_Grounded;
              this.Houses_Completed3_ISSR=result_ISSR3[0].Houses_Completed;
              this.HousesOccupied3_ISSR=result_ISSR3[0].HousesOccupied; 
            })
//-----------------------------------------JNNURM-------------------------------------------------   
this.service.sp_GetHousesStatusForVerticalJN(stateCode,districtCodes ,cityCodes).subscribe(resultJN=>{
  this.Houses_GroundedJN_T=resultJN[0].Houses_Grounded;
  this.THouses_CompletedJN=resultJN[0].Houses_Completed;
  this.HousesOccupiedJNT=resultJN[0].HousesOccupied;
}) 

//-----------------------------
this.service.GetCLSS_Houses_VerticalWise(this.stateCode).subscribe(result_CLSS=>{
  this.Bene2014_15_CLSS=result_CLSS[0].Bene2014_15;
  this.Bene2015_16_CLSS=result_CLSS[0].Bene2015_16;
  this.Bene2016_17_CLSS=result_CLSS[0].Bene2016_17;
  this.Bene2017_18_CLSS=result_CLSS[0].Bene2017_18;
  this.Bene2018_19_CLSS=result_CLSS[0].Bene2018_19;
  this.Bene2019_20_CLSS=result_CLSS[0].Bene2019_20;
})
  this.BeneCLSS_Total =parseFloat(this.Bene2014_15_CLSS) + parseFloat(this.Bene2015_16_CLSS) + parseFloat(this.Bene2016_17_CLSS) +
  parseFloat(this.Bene2017_18_CLSS) +parseFloat(this.Bene2018_19_CLSS) +parseFloat(this.Bene2019_20_CLSS);// +parseFloat(this.Bene2019_20_CLSS); 

//  this.Bene2020_21_CLSS=result_CLSS[0].Bene2020_21;
//  this.Bene2021_22_CLSS=result_CLSS[0].Bene2021_22;



this.FundsDisbursed_in_HousesT1 =this.Bene2014_15_CLSS ;





//-----------------------------
//this.THouseInvolved =this.HouseInvolved01  +this.HouseInvolved1 + this.HouseInvolved2 +this.HouseInvolved3 +
//this.HouseInvolved4 +this.HouseInvolved5;

  
    this.TFundsDisbursed_in_Houses = parseFloat(this.FundsDisbursed_in_Houses01) +  parseFloat(this.FundsDisbursed_in_Houses1) + parseFloat(this.FundsDisbursed_in_Houses2) 
     +  parseFloat(this.FundsDisbursed_in_Houses3) + parseFloat(this.FundsDisbursed_in_Houses4)  +parseFloat(this.FundsDisbursed_in_Houses5);
   
   
   this.THouses_Grounded =this.Houses_Grounded01 +this.Houses_Grounded1 +this.Houses_Grounded2 +this.Houses_Grounded3 +this.Houses_Grounded4 +this.Houses_Grounded5;
   this.THouses_Completed = this.Houses_Completed01 + this.Houses_Completed1 +this.Houses_Completed2 +this.Houses_Completed3 +this.Houses_Completed4 +this.Houses_Completed5;
   this.THousesOccupied   = this.HousesOccupied01 +this.HousesOccupied1 +this.HousesOccupied2 +this.HousesOccupied3 +this.HousesOccupied4 +this.HousesOccupied5;


   this.THouseInvolved_AHP  =this.HouseInvolved0_AHP + this.HouseInvolved1_AHP+ this.HouseInvolved2_AHP+ this.HouseInvolved3_AHP+ this.HouseInvolved4_AHP+ this.HouseInvolved5_AHP; 
   this.TotalFundsDisbursedAHP =this.FundsDisbursed_in_Houses0_AHP +this.FundsDisbursed_in_Houses1_AHP +this.FundsDisbursed_in_Houses2_AHP + this.FundsDisbursed_in_Houses3_AHP +this.FundsDisbursed_in_Houses4_AHP +this.FundsDisbursed_in_Houses5_AHP;
   this.THouses_Grounded_AHP = this.Houses_Grounded0_AHP + this.Houses_Grounded1_AHP + this.Houses_Grounded2_AHP + this.Houses_Grounded3_AHP + this.Houses_Grounded4_AHP + this.Houses_Grounded5_AHP;
   this.THouses_Completed_AHP= this.Houses_Completed0_AHP +this.Houses_Completed1_AHP +this.Houses_Completed2_AHP +this.Houses_Completed3_AHP +this.Houses_Completed4_AHP +this.Houses_Completed5_AHP;
   this.THousesOccupied_AHP = this.HousesOccupied0_AHP +this.HousesOccupied1_AHP +this.HousesOccupied2_AHP +this.HousesOccupied3_AHP +this.HousesOccupied4_AHP +this.HousesOccupied5_AHP;
   
    this.HouseInvolvedT2 = this.HouseInvolved1  + this.HouseInvolved1_AHP + this.HouseInvolved1_ISSR + this.Bene2015_16_CLSS;
    this.FundsDisbursed_in_HousesT3 = this.FundsDisbursed_in_Houses2 + this.FundsDisbursed_in_Houses2_AHP + this.Bene2016_17_CLSS;

    this.HouseInvolvedT3 = this.HouseInvolved2 + this.HouseInvolved2_AHP + this.Bene2016_17_CLSS;

    this.Houses_GroundedT3 =  this.Houses_Grounded2 +this.Houses_Grounded2_AHP +this.Bene2016_17_CLSS ; 
    
    this.HouseInvolvedT4 = this.HouseInvolved3 + this.HouseInvolved3_AHP + this.Bene2017_18_CLSS ;

    this.FundsDisbursed_in_HousesT4 = this.FundsDisbursed_in_Houses3  +this.FundsDisbursed_in_Houses3_AHP + this.Bene2017_18_CLSS;
    this.Houses_GroundedT4 = this.Houses_Grounded3 + this.Houses_Grounded3_AHP +this.Bene2017_18_CLSS;
    this.Houses_CompletedT4 =this.Houses_Completed3 + this.Houses_Completed3_AHP +this.Bene2017_18_CLSS;
    this.HousesOccupiedT4 =this.HousesOccupied3  + this.HousesOccupied3_AHP +this.Bene2017_18_CLSS;

    this.HouseInvolvedT5         =this.HouseInvolved4 +this.HouseInvolved4_AHP  +this.Bene2018_19_CLSS ;
    this.FundsDisbursed_in_HousesT5  =this.FundsDisbursed_in_Houses4 +this. FundsDisbursed_in_Houses4_AHP +this.Bene2018_19_CLSS;
    this.Houses_GroundedT5 =  this.Houses_Grounded4  +this.Houses_Grounded4_AHP  +this.Bene2018_19_CLSS;
    this.Houses_CompletedT5 = this.Houses_Completed4  +this.Houses_Completed4_AHP  +this.Bene2018_19_CLSS;
    this.HousesOccupiedT5 = this.HousesOccupied4  +this.HousesOccupied4_AHP  +this.Bene2018_19_CLSS;
    
    this.HouseInvolvedT1 = this.Bene2014_15_CLSS +this.HouseInvolved0_ISSR +this.HouseInvolved0_AHP +this.HouseInvolved01;
    this.Houses_CompletedT3 = this.Houses_Completed2 + this.Houses_Completed2_AHP + this.Houses_Completed2_ISSR 
    + this.Bene2016_17_CLSS;


    //     //-------------------------------------------------------------------
//     this.THouseInvolvedGT =this.HouseInvolvedT1 +this.HouseInvolvedT2 + this.HouseInvolvedT3 + this.HouseInvolvedT4 +this.HouseInvolvedT5 +this.HouseInvolvedT6; 
    
    
//     this.TFundsDisbursed_in_HousesGT = this.FundsDisbursed_in_HousesT3 + this.FundsDisbursed_in_HousesT1 + this.FundsDisbursed_in_HousesT2  +this.FundsDisbursed_in_HousesT4 +this.FundsDisbursed_in_HousesT5;
//     this.THouses_GroundedGT = this.Houses_GroundedT2 +this.Houses_GroundedT3  +this.Houses_GroundedT4 +  this.Houses_GroundedT5;
//     this.THouses_CompletedGT =  this.Houses_CompletedT2 +this.Houses_CompletedT3 +this.Houses_CompletedT4 +this.Houses_CompletedT5 ;
//     this.THousesOccupiedGT =this.HousesOccupiedT2 +this.HousesOccupiedT3 +this.HousesOccupiedT4 +this.HousesOccupiedT5;

//     this.HouseInvolvedT1=    this.HouseInvolved0_ISSR + this.HouseInvolved1_ISSR +this.HouseInvolved2_ISSR +this.HouseInvolved3_ISSR + this.HouseInvolved4_ISSR + this.HouseInvolved5_ISSR;

  }) 
  }) 
  })    
  })
  })
// })
// })
// })
// })
// })
// })
// })
// })
// })
// })
//  })
//  })
//})
}



getStateDetails(stateCodes) {
     this.stateCode=  stateCodes.value;
     this.StateName=stateCodes[stateCodes.selectedIndex].text;
 if (this.stateCode =="0" )
 {
        this.lblStateDisttCity = "All India";
        this.districtCodes ="0";
        this.cityCodes="0";
        this.stateCodes = "0";
        this.districtCodes = "0";
        this.cityCodes = "0";
        this.service.StateList();
        this.service.DisttList(this.stateCode);
        this.service.CityList(this.districtCodes);
        // this.ngOnInit();
        this.LoadData(this.stateCodes,this.districtCodes,this.cityCodes);
        this.GetFinancialData(this.stateCodes,this.districtCodes ,this.cityCodes, this.Compid);
   }
   else 
   {
      this.service.GetStateNameByCode(this.stateCode).subscribe(resultName => {
      this.lblStateDisttCity = resultName.States_UT;
    });

        this.districtCodes ="0";
        this.cityCodes="0";
       // this.stateCodes = "0";
        this.districtCodes = "0";
        this.cityCodes = "0";

      this.service.DisttList( this.stateCode);
      this.service.CityList(this.districtCodes);//
    //  this.GetFilterDatanew(this.stateCode,this.districtCodes ,this.cityCodes, this.Compid );
      this.GetFinancialData(this.stateCodes,this.districtCodes ,this.cityCodes, this.Compid);
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
        this.LoadData(this.stateCodes,this.districtCodes,this.cityCodes);
    }
    else {
        
      this.cityValue = "0";
      this.districtCodes = DisttCode;
        this.service.CityList(DisttCode);
        //this.GetFilterData();
       // this.GetFilterDatanew(this.stateCode,this.districtCodes ,this.cityCodes, this.Compid );
        this.GetFinancialData(this.stateCodes,this.districtCodes ,this.cityCodes, this.Compid);

    }

}

public pdfReport() {
      window.print();
}


getCityDetails(cityCode) {
      //alert(cityCode);
    if (cityCode == "0") {
      this.cityCodes = cityCode;
      this.service.CityDetails = [];
      this.getDistrictDetails(this.districtCodes);
      this.LoadData(this.stateCodes,this.districtCodes,this.cityCodes);
    }
    else {
      // alert(cityCode);
    this.cityCodes = cityCode;
    //this.GetFilterData();
    
    //this.GetFilterDatanew(this.stateCode,this.districtCodes ,this.cityCodes, this.Compid );
    this.GetFinancialData(this.stateCodes,this.districtCodes ,this.cityCodes, this.Compid);

    }
  }

  GetFinancialData1 (stateCodes, districtCodes, cityCodes, Compid)
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
          this.First16BLC = result_Fin16[0].FirstInstallmentReleased;
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
          this.First17BLC = result_Fin17[0].FirstInstallmentReleased;
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
            this.First18BLC = result_Fin18[0].FirstInstallmentReleased;
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
              this.First19BLC = result_Fin19[0].FirstInstallmentReleased;
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
              this.First14AHP= 0;
              this.Second14AHP =0;
              this.Third14AHP =   0;
              this.Total14AHP  =0;
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
alert(this.PC14AHP);
        
        
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
           //   this.fINrESET_CLSS();
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
            
            this.PC15BLC=0;
            this.CAI15BLC = 0;
            this.First15BLC = 0;
            this.Second15BLC = 0;
            this.Third15BLC = 0;
            this.UC_Received15BLC = 0;
            this.Total15BLC = 0;

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
        this.Second16BLC = 0;
        this.Second17BLC = 0;
        this.Second18 = 0;
        this.Second19 = 0;
        this.TcolBLC2 = 0;

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
//-----------start
//-------------------\Ewset
this.Col7_1415 =0;
           this.Col7_1516 =0;
           this.Col7_1617 =0;
           this.Col7_1718 =0;
           this.Col7_1819 =0;
           this.Col7_1920 =0;
           this.Col7_Total =  0;

            //---------------------------- Total of BLC Block   

           this.TcolBLC1 =0;
           this.TcolBLC2 = 0;

           this.TcolBLC3 = 0;
           this.TcolBLC4 =0;
           this.TcolBLC5 =0;
           this.TcolBLC6 = 0;
           this.TcolBLC7 =0;
           

           this.T_AHP_PC =0;
           this.T_AHP_CAI = 0;
           this.T_AHP_First = 0;
           this.T_AHP_Second = 0;
           this.T_AHP_Third = 0;
           this.T_AHP_TotalInst = 0;
           this.T_AHP_TotalUC = 0;
           
          // alert(this.T_AHP_TotalInst);
          // alert(this.T_AHP_TotalUC);

          this.Tot_ISS_PC = 0;
          this.Tot_ISS_CAI =0;
          this.Tot_ISS_OneInst = 0;
          this.Tot_ISS_TwoInst= 0;
          this.Tot_ISS_ThreeInst  =0;
          this.Tot_ISS_Inst =0;
          this.Tot_ISS_UC =0;

          this.CA_SANCT_CLSS = 0; 
          this.FirstI_CLSS =0; 
          this.SecondI_CLSS =0;
          this.ThirdI_CLSS =0;
          this.totalI_CLSS =0;
          this.Total_UC_RecdClss  =0; 
         
          this.Col1_1415  =0;
          this.Col1_1516 = 0;
          this.Col1_1617 =0;
          this.Col1_1718 = 0;
          this.Col1_1819 = 0;
          this.Col1_1920 =0;
          this.Col1_Total = 0;
          
          this.Col2_1415 =0;
          this.Col2_1516 = 0;
          this.Col2_1617 =0;
          this.Col2_1718 = 0;
          this.Col2_1819 =0;
          this.Col2_1920 =0;
          this.Col2_Total =  0;

          this.Col3_1415 =0;
          this.Col3_1516 =0;
          this.Col3_1617 =0;
          this.Col3_1718 =0;
          this.Col3_1819 =0;
          this.Col3_1920 =0;
          this.Col3_Total =  0;
          
          this.Col4_1415 =0;
          this.Col4_1516 =0;
          this.Col4_1617 =0;
          this.Col4_1718 =0;
          this.Col4_1819 = 0;
          this.Col4_1920 =0;
          this.Col4_Total =  0;
           
          this.Col5_1415 =0;
          this.Col5_1516 =0;
          this.Col5_1617 =0;
          this.Col5_1718 =0;
          this.Col5_1819 =0;
          this.Col5_1920 =0;
          this.Col5_Total =  0;

          this.Col6_1415 =0;
          this.Col6_1516 =0;
          this.Col6_1617 =0;
          this.Col6_1718 =0;
          this.Col6_1819 =0;
          this.Col6_1920 =0;
          this.Col6_Total =  0;

          this.CAI16BLC=0;

          this.Loan_TOTAL_14_15=0;
                this.Loan_TOTAL_15_16=0;
                this.Loan_TOTAL_16_17 =0;
                this.Loan_TOTAL_17_18 =0;
                this.Loan_TOTAL_18_19 =0;
                this.Loan_TOTAL_19_20 =0;
                this.Loan_TOTAL_20_21=0;
                this.First16BLC =0; 
                this.First16AHP =0; 
                this.First16ISS =0;
                this.Sub2016_17_CL=0;

                this.Second_BLC14 =0;
                this.Second14AHP =0;
                this.Second14ISS =0;
                this.Second16BLC =0;
                this.UC_Received16=0;
                
//------------end
          

    this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"BLCS","2014-15").subscribe(result_Fin14=>{
    try { 
        this.PC_BLC14=result_Fin14[0].Project_Cost;
        this.CAI_BLC14 = result_Fin14[0].Central_Assistance_involved;
        this.First_BLC14 = result_Fin14[0].FirstInstallmentReleased;
        this.Second_BLC14 = result_Fin14[0].SecondInstallmentReleased;
        this.Third_BLC14 = result_Fin14[0].ThirdInstallmentReleased;
        this.UC_Received_BLC14 = result_Fin14[0].UC_Received; 
        this.Total_BLC14  =  this.First_BLC14 +   this.Second_BLC14 + this.Third_BLC14;
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


      
      this.PC16BLC= 0;
      this.CAI16 = 0;
      this.UC_Received16BLC = 0;
      this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"BLCS","2016-17").subscribe(result_Fin16=>{
        try { 
        this.PC16BLC=result_Fin16[0].Project_Cost;
        this.CAI16BLC  = result_Fin16[0].Central_Assistance_involved;
        this.First16BLC = result_Fin16[0].FirstInstallmentReleased;
        this.Second16BLC = result_Fin16[0].SecondInstallmentReleased;
        this.Third16 = result_Fin16[0].ThirdInstallmentReleased;
        this.UC_Received16BLC = result_Fin16[0].UC_Received;
        this.Total16  =  this.First16BLC +   this.Second16BLC + this.Third16;
        }
        catch{}
        finally{}

        this.PC17= 0;
        this.CAI17 =0;
        this.UC_Received17 =0;
      this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"BLCS","2017-18").subscribe(result_Fin17=>{
        try { 
        this.PC17BLC=result_Fin17[0].Project_Cost;
        this.CAI17BLC = result_Fin17[0].Central_Assistance_involved;
        this.First17BLC = result_Fin17[0].FirstInstallmentReleased;
        this.Second17BLC = result_Fin17[0].SecondInstallmentReleased;
        this.Third17 = result_Fin17[0].ThirdInstallmentReleased;
        this.UC_Received17AHP = result_Fin17[0].UC_Received;
        this.Total17  =  this.First17BLC +   this.Second17BLC + this.Third17;
        }
        catch{}
        finally{}
        
        

        this.PC18= 0;
        this.CAI18 =0;
        this.UC_Received18 =0;
        this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"BLCS","2018-19").subscribe(result_Fin18=>{
          try { 
          this.PC18BLC=result_Fin18[0].Project_Cost;
          this.CAI18BLC = result_Fin18[0].Central_Assistance_involved;
          this.First18BLC = result_Fin18[0].FirstInstallmentReleased;
          this.Second18 = result_Fin18[0].SecondInstallmentReleased;
          this.Third18 = result_Fin18[0].ThirdInstallmentReleased;
          this.UC_Received18 = result_Fin18[0].UC_Received;
          this.Total18  =  this.First18BLC +   this.Second18 + this.Third18;
          }
          catch{}
          finally{}




          this.PC19= 0;
          this.CAI19 =0;
          this.UC_Received19 =0; 
          this.service.GetFinancialPMAY_Data(stateCodes,districtCodes ,cityCodes,"BLCS","2019-20").subscribe(result_Fin19=>{
            try { 
            this.PC19BLC=result_Fin19[0].Project_Cost;
            this.CAI19BLC = result_Fin19[0].Central_Assistance_involved;
            this.First19BLC = result_Fin19[0].FirstInstallmentReleased;
            this.Second19 = result_Fin19[0].SecondInstallmentReleased;
            this.Third19 = result_Fin19[0].ThirdInstallmentReleased;
            this.UC_Received19 = result_Fin19[0].UC_Received;
            this.Total19  =  this.First19BLC +   this.Second19 + this.Third19;
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

                this.Loan_TOTAL_14_15 =result_CLSSFin19[0].Loan_TOTAL_14_15;
                this.Loan_TOTAL_15_16 =result_CLSSFin19[0].Loan_TOTAL_15_16;
                this.Loan_TOTAL_16_17 =result_CLSSFin19[0].Loan_TOTAL_16_17;
                this.Loan_TOTAL_17_18 =result_CLSSFin19[0].Loan_TOTAL_17_18;
                this.Loan_TOTAL_18_19 =result_CLSSFin19[0].Loan_TOTAL_18_19;
                this.Loan_TOTAL_19_20 =result_CLSSFin19[0].Loan_TOTAL_19_20;
                this.Loan_TOTAL_20_21 =result_CLSSFin19[0].Loan_TOTAL_20_21;
                

                this.Sub2014_15_CL = result_CLSSFin19[0].Subsidy2014_15;
                this.Sub2015_16_CL = result_CLSSFin19[0].Subsidy2015_16;
                this.Sub2016_17_CL = result_CLSSFin19[0].Subsidy2016_17;
                this.Sub2017_18_CL = result_CLSSFin19[0].Subsidy2017_18,
                this.Sub2018_19_CL = result_CLSSFin19[0].Subsidy2018_19,
                this.Sub2019_20_CL = result_CLSSFin19[0].Subsidy2019_20,
                this.UC_Received_CL = result_CLSSFin19[0].UC_Received; 
             //   alert(this.UC_Received_CL);

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
           // this.fINrESET_CLSS();
           }
           
           
            this.PC14 =this.PC14ISS +this.PC14AHP + this.PC_BLC14 +this.Loan_TOTAL_14_15;
            
            this.CAI14 =this.CAI_BLC14 + this.CAI14AHP +this.CAI14ISS +this.Sub2014_15_CL;
            this.First14 = this.First_BLC14 + this.First14AHP +this.First14ISS +this.Sub2014_15_CL;
            this.Second14 =this.Second_BLC14 +this.Second14AHP +this.Second14ISS ;
            this.Third14 =this.Third_BLC14 +this.Third14AHP +this.Third14ISS;
            this.UC_Received14  =  this.UC_Received_BLC14 + this.UC_Received14AHP + this.UC_Received14ISS;
              
            this.PC15=this.PC15ISS +this.PC15AHP + this.PC15BLC +this.Loan_TOTAL_15_16;
            this.CAI15 =this.CAI15BLC + this.CAI15AHP +this.CAI15ISS +this.Sub2015_16_CL;
            this.First15 = this.First15BLC + this.First15AHP +this.First15ISS +this.Sub2015_16_CL;
            this.Second15 =this.Second15BLC +this.Second15AHP +this.Second15ISS;
            this.Third15 =this.Third15BLC +this.Third15AHP +this.Third15ISS;
            this.UC_Received15  =  this.UC_Received15BLC + this.UC_Received15AHP   + this.UC_Received15ISS;
          //  alert(this.CAI15 );
            

            this.PC16=this.PC16ISS +this.PC16AHP + this.PC16BLC  +this.Loan_TOTAL_16_17;
            this.CAI16 =this.CAI16 + this.CAI16AHP +this.CAI16ISS  +this.Sub2016_17_CL;
            this.First16 = this.First16BLC + this.First16AHP +this.First16ISS  +this.Sub2016_17_CL;
            this.Second16 =this.Second16BLC +this.Second16AHP +this.Second16ISS;
            this.Third16 =this.Third16 +this.Third16AHP +this.Third16ISS;
            this.UC_Received16  =  this.UC_Received16BLC + this.UC_Received15AHP   + this.UC_Received16ISS;
            
            
            this.PC17=this.PC17ISS +this.PC17AHP + this.PC17BLC  +this.Loan_TOTAL_17_18;
            this.CAI17 =this.CAI17 + this.CAI17AHP +this.CAI17ISS +this.Sub2017_18_CL;

           // this.First17 = this.First17BLC + this.First17AHP +this.First17ISS  +this.Sub2017_18_CL;
            this.Second17 =this.Second17BLC +this.Second17AHP +this.Second17ISS;
            this.Third17 =this.Third17 +this.Third17AHP +this.Third17ISS;
            this.UC_Received17  =  this.UC_Received17 + this.UC_Received17AHP   + this.UC_Received17ISS;
            


            this.PC18T=this.PC18ISS +this.PC18AHP + this.PC18BLC  +this.Loan_TOTAL_18_19;
            this.CAI18 =this.CAI18 + this.CAI18AHP +this.CAI18ISS +this.Sub2018_19_CL;
            this.First18 = this.First18BLC + this.First18AHP +this.First18ISS  +this.Sub2018_19_CL;  //First18BLC
            this.Second18 =this.Second18  +this.Second18AHP +this.Second18ISS;
            this.Third18 =this.Third18 +this.Third18AHP +this.Third18ISS;
            this.UC_Received18  =  this.UC_Received18 + this.UC_Received18AHP   + this.UC_Received18ISS;
            //alert(this.CAI18);
             

            this.PC19= this.PC19ISS + this.PC19AHP + this.PC19BLC  +this.Loan_TOTAL_19_20;
            this.CAI19 = this.CAI19 + this.CAI19AHP + this.CAI19ISS +this.Sub2019_20_CL;
            this.First19 = this.First19BLC + this.First19AHP + this.First19ISS  +this.Sub2019_20_CL;
            this.Second19 = this.Second19  +this.Second19AHP +this.Second19ISS;
            this.Third19 = this.Third19 +this.Third19AHP +this.Third19ISS;
            this.UC_Received19  =  this.UC_Received19 + this.UC_Received19AHP + this.UC_Received19ISS;
           // alert(this.CAI19);

            this.sTotalPC =this.PC14 +this.PC15 +this.PC16 +this.PC17 +this.PC18T +this.PC19  + this.Loan_TOTAL_CL;
             

             
            this.sTotalCAI =this.CAI14+this.CAI15+this.CAI16+this.CAI17+this.CAI18+this.CAI19;
            this.sTotalInst2 = this.Second14 +this.Second15 +this.Second16+this.Second17 +this.Second18 +this.Second19;
            // this.Total14 =this.First14 + this.Second14 + this.Third14;
            // this.Total15 =this.First15 + this.Second15 + this.Third15;
            // this.Total16 =this.First16 + this.Second16 + this.Third16;
            // this.Total17 =this.First17 + this.Second17 + this.Third17;
            // this.Total18 =this.First18 + this.Second18 + this.Third18;
            // this.Total19 =this.First19 + this.Second19 + this.Third19;

         //   this.sTotal = this.Total14 +this.Total15 +this.Total16 +this.Total17 +this.Total18 +this.Total19;
            this.sTotalInst1 =this.First14 +this.First15 +this.First16 +this.First17 +this.First18 +this.First19;
            this.sTotalUC = this.UC_Received14 +this.UC_Received15 +this.UC_Received16 +this.UC_Received17 +this.UC_Received18 +this.UC_Received19 ;
            

            this.sTotalPC = this.PC14 + this.PC15 +this.PC16 +this.PC17 + this.PC18T +this.PC19;
            this.sTotalCAI =this.CAI14 +this.CAI15 +this.CAI16 +this.CAI17 +this.CAI18 +this.CAI19;
            this.sTotalInst1 = this.First14 +this.First15 +this.First16 +this.First17 +this.First18 +this.First19;  
            this.sTotalInst2 = this.Second14 +this.Second15 +this.Second16 +this.Second17 +this.Second18 +this.Second19;  
            this.sTotalInst3 = this.Third14 +this.Third15 +this.Third16 +this.Third17 +this.Third18 +this.Third19;  
            
            this.sTotal =this.sTotalInst1 +this.sTotalInst2 +this.sTotalInst3;
            this.sTotalUC =this.UC_Received14 +this.UC_Received15 +this.UC_Received16 +this.UC_Received17 +this.UC_Received18 +this.UC_Received19;
                        
            
            //---------------------------- Total of BLC Block   

            this.TcolBLC1 =this.PC_BLC14 +this.PC15BLC +this.PC16BLC +this.PC17BLC +this.PC18BLC +this.PC19BLC;
            this.TcolBLC2 = this.CAI_BLC14 + this.CAI15BLC +this.CAI16BLC +this.CAI17BLC +this.CAI18BLC +this.CAI19BLC;
            this.TcolBLC3 = this.First_BLC14 + this.First15BLC +this.First16BLC +this.First17BLC +this.First18BLC +this.First19BLC; //?
                    

            this.TcolBLC4 =this.Second_BLC14 +this.Second15BLC +this.Second16BLC +this.Second17BLC +this.Second18+this.Second19;
            this.TcolBLC5 =this.Third_BLC14 +this.Third15BLC+this.Third16+this.Third17 +this.Third18 +this.Third19;
            this.TcolBLC6 = this.Total_BLC14 +this.Total15BLC +this.Total16 +this.Total17 +this.Total18 +this.Total19;
            this.TcolBLC7 =this.UC_Received_BLC14 +this.UC_Received15BLC +this.UC_Received16BLC +this.UC_Received17 +this.UC_Received18 +this.UC_Received19;
            
            

            this.T_AHP_PC =this.PC14AHP + this.PC15AHP + this.PC16AHP +this.PC17AHP +this.PC18AHP +this.PC19AHP;
            this.T_AHP_CAI = this.CAI14AHP   +this.CAI15AHP  +this.CAI16AHP      +this.CAI17AHP        +this.CAI18AHP    +this.CAI19AHP ;
            this.T_AHP_First = this.First14AHP + this.First15AHP + this.First16AHP  +this.First17AHP + this.First18AHP   +   this.First19AHP;
            this.T_AHP_Second = this.Second14AHP +this.Second15AHP +this.Second16AHP +this.Second17AHP +this.Second18AHP +this.Second19AHP;
            this.T_AHP_Third = this.Third14AHP +this.Third15AHP+this.Third16AHP+this.Third17AHP+this.Third18AHP+this.Third19AHP;
            this.T_AHP_TotalInst = this.Total14AHP +this.Total15AHP +this.Total16AHP+this.Total17AHP+this.Total18AHP+this.Total19AHP;
            this.T_AHP_TotalUC = this.UC_Received14AHP +this.UC_Received15AHP +this.UC_Received16AHP+this.UC_Received17AHP+this.UC_Received18AHP +this.UC_Received19AHP;
            
           // alert(this.T_AHP_TotalInst);
           // alert(this.T_AHP_TotalUC);

           this.Tot_ISS_PC = this.PC14ISS +this.PC15ISS  +this.PC16ISS +this.PC17ISS +this.PC18ISS +this.PC19ISS;
           this.Tot_ISS_CAI =this.CAI14ISS  + this.CAI15ISS + this.CAI16ISS + this.CAI17ISS + this.CAI18ISS + this.CAI19ISS;
           this.Tot_ISS_OneInst = this.First14ISS +this.First15ISS +this.First16ISS +this.First17ISS +this.First18ISS +this.First19ISS;
           this.Tot_ISS_TwoInst= this.Second14ISS +this.Second15ISS +this.Second16ISS +this.Second17ISS +this.Second18ISS +this.Second19ISS;
           this.Tot_ISS_ThreeInst  =this.Third14ISS +this.Third15ISS +this.Third16ISS +this.Third17ISS +this.Third18ISS +this.Third19ISS;
           this.Tot_ISS_Inst =this.Total14ISS +this.Total15ISS+this.Total16ISS+this.Total17ISS+this.Total18ISS+this.Total19ISS;
           this.Tot_ISS_UC =this.UC_Received14ISS +this.UC_Received15ISS+this.UC_Received16ISS+this.UC_Received17ISS+this.UC_Received18ISS+this.UC_Received19ISS;

           this.CA_SANCT_CLSS = this.Sub2014_15_CL +this.Sub2015_16_CL +this.Sub2016_17_CL +this.Sub2017_18_CL +this.Sub2018_19_CL +this.Sub2019_20_CL; 
           this.FirstI_CLSS =this.Sub2014_15_CL +this.Sub2015_16_CL +this.Sub2016_17_CL +this.Sub2017_18_CL +this.Sub2018_19_CL +this.Sub2019_20_CL; 
           this.SecondI_CLSS =0;
           this.ThirdI_CLSS =0;
           this.totalI_CLSS =this.FirstI_CLSS + this.SecondI_CLSS +this.ThirdI_CLSS;
           
           this.Total_UC_RecdClss  =this.Sub2014_15_CL +this.Sub2015_16_CL +this.Sub2016_17_CL +this.Sub2017_18_CL +this.Sub2018_19_CL +this.Sub2019_20_CL ; 
          
 
           this.Col1_1415  =this.PC_BLC14  +this.PC14AHP +this.PC14ISS;  
           this.Col1_1516 = this.PC15BLC  +this.PC15AHP +this.PC15ISS;
           this.Col1_1617 =this.PC16BLC +this.PC16AHP +this.PC16ISS;
           this.Col1_1718 = this.PC17BLC + this.PC17AHP + this.PC17ISS;
           this.Col1_1819 = this.PC18BLC +this.PC18AHP +this.PC18ISS;
           this.Col1_1920 =this.PC19BLC +this.PC19AHP +this.PC19ISS;
           this.Col1_Total = this.Col1_1415 +this.Col1_1516 +this.Col1_1617 +this.Col1_1718 + this.Col1_1819 +this.Col1_1920 + this.Loan_TOTAL_CL; // extra
 

           this.Col2_1415 =this.CAI_BLC14 +this.CAI14AHP +this.CAI14ISS +this.Sub2014_15_CL;
           this.Col2_1516 = this.CAI15BLC +this.CAI15AHP +this.CAI15ISS +this.Sub2015_16_CL;
           this.Col2_1617 =this.CAI16BLC +this.CAI16AHP +this.CAI16ISS +this.Sub2016_17_CL;
           this.Col2_1718 = this.CAI17BLC +this.CAI17AHP +this.CAI17ISS +this.Sub2017_18_CL;
           this.Col2_1819 =this.CAI18BLC +this.CAI18AHP +this.CAI18ISS +this.Sub2018_19_CL;
           this.Col2_1920 =this.CAI19BLC +this.CAI19AHP +this.First19ISS +this.Sub2019_20_CL;
           this.Col2_Total =  this.Col2_1415 + this.Col2_1516 + this.Col2_1617+this.Col2_1718 +this.Col2_1819 +this.Col2_1920;

           this.Col3_1415 =this.First_BLC14 + this.First14AHP + this.First14ISS + this.Sub2014_15_CL;
           this.Col3_1516 =this.First15BLC + this.First15AHP + this.First15ISS + this.Sub2015_16_CL;  // OK
           this.Col3_1617 =this.First16BLC + this.First16AHP + this.First16ISS + this.Sub2016_17_CL; // OK
           this.Col3_1718 =this.First17BLC + this.First17AHP + this.First17ISS + this.Sub2017_18_CL; // OK
           this.Col3_1819 =this.First18BLC + this.First18AHP + this.First18ISS + this.Sub2018_19_CL;
           this.Col3_1920 =this.First19BLC + this.First19AHP + this.First19ISS + this.Sub2019_20_CL;
           this.Col3_Total =  this.Col3_1415 + this.Col3_1516 + this.Col3_1617 + this.Col3_1718 + this.Col3_1819 + this.Col3_1920;
           
           this.Col4_1415 =0;
           this.Col4_1415 =this.Second_BLC14 +this.Second14AHP +this.Second14ISS +0;

            
           this.Col4_1516 =this.Second15BLC +this.Second15AHP +this.Second15ISS +0;
           
           this.Col4_1617 =this.Second16BLC +this.Second16AHP +this.Second16ISS + 0;

            
           this.Col4_1718 =this.Second17BLC +this.Second17AHP +this.Second17ISS +0;
           
           this.Col4_1819 = this.Second18 +this.Second18AHP +this.Second18ISS +0;
           this.Col4_1920 =this.Second19 +this.Second19AHP +this.Second19ISS +0;
           this.Col4_Total =  this.Col4_1415 + this.Col4_1516 + this.Col4_1617 + this.Col4_1718 + this.Col4_1819 + this.Col4_1920;
            
           this.Col5_1415 =this.Third_BLC14 +this.Third14AHP +this.Third14ISS + 0;
           this.Col5_1516 =this.Third15BLC +this.Third15AHP +this.Third15ISS +0;
           this.Col5_1617 =this.Third16 +this.Third16AHP +this.Third16ISS +0;
           this.Col5_1718 =this.Third17 +this.Third17AHP +this.Third17ISS +0;
           this.Col5_1819 =this.Third18 +this.Third18AHP +this.Third18ISS +0;
           this.Col5_1920 =this.Third19 +this.Third19AHP +this.Third19ISS +0;
           this.Col5_Total =  this.Col5_1415 + this.Col5_1516 + this.Col5_1617 + this.Col5_1718 + this.Col5_1819 + this.Col5_1920;

           this.Col6_1415 =this.Total_BLC14 +this.Total14AHP +this.Total14ISS +this.Sub2014_15_CL;
           this.Col6_1516 =this.Total15BLC +this.Total15AHP +this.Total15ISS +this.Sub2015_16_CL;
           this.Col6_1617 =this.Total16 +this.Total16AHP +this.Total16ISS +this.Sub2016_17_CL;
           this.Col6_1718 =this.Total17 +this.Total17AHP +this.Total17ISS +this.Sub2017_18_CL;
           this.Col6_1819 =this.Total18 +this.Total18AHP +this.Total18ISS +this.Sub2018_19_CL ;
           this.Col6_1920 =this.Total19 +this.Total19AHP+this.Total19ISS +this.Sub2019_20_CL;
           this.Col6_Total =  this.Col6_1415 + this.Col6_1516 + this.Col6_1617 + this.Col6_1718 + this.Col6_1819 + this.Col6_1920;

  
           this.Col7_1415 =this.UC_Received_BLC14 +this.UC_Received14AHP +this.UC_Received14ISS +this.Sub2014_15_CL;
           this.Col7_1516 =this.UC_Received15BLC +this.UC_Received15AHP +this.UC_Received15ISS +this.Sub2015_16_CL;
           this.Col7_1617 =this.UC_Received16BLC +this.UC_Received16AHP +this.UC_Received16ISS +this.Sub2016_17_CL;
           this.Col7_1718 =this.UC_Received17 +this.UC_Received17AHP+this.UC_Received17ISS+this.Sub2017_18_CL;
           this.Col7_1819 =this.UC_Received18 +this.UC_Received18AHP +this.UC_Received18ISS +this.Sub2018_19_CL;
           this.Col7_1920 =this.UC_Received19 +this.UC_Received19AHP +this.UC_Received19ISS +this.Sub2019_20_CL;
           this.Col7_Total =  this.Col7_1415 + this.Col7_1516 + this.Col7_1617 + this.Col7_1718 + this.Col7_1819 + this.Col7_1920;

 
           //this.Total_UC_RecdClss  =this.Sub2014_15_CL +this.Sub2015_16_CL +this.Sub2016_17_CL +this.Sub2017_18_CL +this.Sub2018_19_CL +this.Sub2019_20_CL + this.Loan_TOTAL_CL; 
          
          if (this.PC_BLC14 =="0")
          {
            this.PC_BLC14 ="-";
          }
          if (this.CAI_BLC14 =="0")
          {
            this.CAI_BLC14 ="-";
          } 
          if (this.First_BLC14 =="0")
          {
            this.First_BLC14 ="-";
          } 
          if (this.Second_BLC14 =="0")
          {
            this.Second_BLC14 ="-";
          } 
          if (this.Third_BLC14 =="0")
          {
            this.Third_BLC14 ="-";
          } 
          if (this.Total_BLC14 =="0")
          {
            this.Total_BLC14 ="-";
          } 
          if (this.UC_Received_BLC14 =="0")
          {
            this.UC_Received_BLC14 ="-";
          } 
           
           //2015-16
           if (this.PC15BLC =="0")
           {
             this.PC15BLC ="-";
           }
           if (this.CAI15BLC =="0")
          {
            this.CAI15BLC ="-";
          }
          if (this.First15BLC =="0")
          {
            this.First15BLC ="-";
          }
          if (this.Second15BLC =="0")
          {
            this.Second15BLC ="-";
          }
          if (this.Third15BLC =="0")
          {
            this.Third15BLC ="-";
          }
          if (this.Total15BLC =="0")
          {
            this.Total15BLC ="-";
          }
          if (this.UC_Received15BLC =="0")
          {
            this.UC_Received15BLC ="-";
          }       
   // 16-17

    
   

   if (this.First16BLC =="0")
   {
     this.First16BLC ="-";
   }

   if (this.Second16BLC =="0")
   {
     this.Second16BLC ="-";
   }

          if (this.PC16BLC =="0")
          {
            this.PC16BLC ="-";
          }
          if (this.CAI16BLC =="0")
          {
            this.CAI16BLC ="-";
          }

          if (this.First16 =="0")
          {
            this.First16 ="-";
          }
          if (this.Second16 =="0")
          {
            this.Second16 ="-";
          }
          if (this.Third16 =="0")
          {
            this.Third16 ="-";
          }
          if (this.Total16 =="0")
          {
            this.Total16 ="-";
          }
          if (this.UC_Received16BLC =="0")
          {
            this.UC_Received16BLC ="-";
          }
          if (this.UC_Received16 =="0")
          {
            this.UC_Received16 ="-";
          }
          // 2017-18  

           
           

           if (this.First17BLC =="0")
           {
             this.First17BLC ="-";
           }
           if (this.Second17BLC =="0")
           {
             this.Second17BLC ="-";
           }

           if (this.PC17BLC =="0")
           {
             this.PC17BLC ="-";
           }
 
           if (this.CAI17BLC =="0")
           {
             this.CAI17BLC ="-";
           }
           if (this.First17 =="0")
           {
             this.First17 ="-";
           }
           if (this.Second17 =="0")
           {
             this.Second17 ="-";
           }
           if (this.Third17 =="0")
           {
             this.Third17 ="-";
           }
           if (this.Total17 =="0")
           {
             this.Total17 ="-";
           }
           if (this.UC_Received17 =="0")
           {
             this.UC_Received17 ="-";
           }

            
            //2018-19
            if (this.PC18BLC =="0")
           {
             this.PC18BLC ="-";
           }
           if (this.CAI18BLC =="0")
           {
             this.CAI18BLC ="-";
           }
           if (this.First18BLC =="0")
           {
             this.First18BLC ="-";
           }
           if (this.Second18 =="0")
           {
             this.Second18 ="-";
           }
           if (this.Third18 =="0")
           {
             this.Third18 ="-";
           }
           if (this.Total18 =="0")
           {
             this.Total18 ="-";
           }
           if (this.UC_Received18 =="0")
           {
             this.UC_Received18 ="-";
           }

           

           // 2019-20

           

            if (this.PC19BLC =="0")
           {
             this.PC19BLC ="-";
           }
           
           if (this.CAI19BLC =="0")
           {
             this.CAI19BLC ="-";
           }

           if (this.First19BLC =="0")
           {
             this.First19BLC ="-";
           }
           if (this.Second19 =="0")
           {
             this.Second19 ="-";
           }
           if (this.Third19 =="0")
           {
             this.Third19 ="-";
           }
           if (this.Total19 =="0")
           {
             this.Total19 ="-";
           }
           if (this.UC_Received19 =="0")
           {
             this.UC_Received19 ="-";
           }

           
            
          //Total</td>
          if (this.TcolBLC1 =="0")
           {
             this.TcolBLC1 ="-";
           }
           if (this.TcolBLC2 =="0")
           {
             this.TcolBLC2 ="-";
           }
           if (this.TcolBLC3 =="0")
           {
             this.TcolBLC3 ="-";
           }
           if (this.TcolBLC4 =="0")
           {
             this.TcolBLC4 ="-";
           }
           if (this.TcolBLC5 =="0")
           {
             this.TcolBLC5 ="-";
           }
           if (this.TcolBLC6 =="0")
           {
             this.TcolBLC6 ="-";
           }
           if (this.TcolBLC7 =="0")
           {
             this.TcolBLC7 ="-";
           }

            //2014-15 AHP
            if (this.PC14AHP =="0")
           {
             this.PC14AHP ="-";
           }
           if (this.CAI14AHP =="0")
           {
             this.CAI14AHP ="-";
           }
           if (this.First14AHP =="0")
           {
             this.First14AHP ="-";
           }
           if (this.Second14AHP =="0")
           {
             this.Second14AHP ="-";
           }
           if (this.Third14AHP =="0")
           {
             this.Third14AHP ="-";
           }
           if (this.Total14AHP =="0")
           {
             this.Total14AHP ="-";
           }
           if (this.UC_Received14AHP =="0")
           {
             this.UC_Received14AHP ="-";
           }
          
           //2015-16
           if (this.PC15AHP =="0")
           {
             this.PC15AHP ="-";
           }
           if (this.CAI15AHP =="0")
           {
             this.CAI15AHP ="-";
           }
           if (this.First15AHP =="0")
           {
             this.First15AHP ="-";
           }
           if (this.Second15AHP =="0")
           {
             this.Second15AHP ="-";
           }
           if (this.Third15AHP =="0")
           {
             this.Third15AHP ="-";
           }
           if (this.Total15AHP =="0")
           {
             this.Total15AHP ="-";
           }
           if (this.UC_Received15AHP =="0")
           {
             this.UC_Received15AHP ="-";
           }
            //2016-17
            if (this.PC16AHP =="0")
           {
             this.PC16AHP ="-";
           } 
           if (this.CAI16AHP =="0")
           {
             this.CAI16AHP ="-";
           }
           if (this.First16AHP =="0")
           {
             this.First16AHP ="-";
           }
           if (this.Second16AHP =="0")
           {
             this.Second16AHP ="-";
           }
           if (this.Third16AHP =="0")
           {
             this.Third16AHP ="-";
           }
           if (this.Total16AHP =="0")
           {
             this.Total16AHP ="-";
           }
           if (this.UC_Received16AHP =="0")
           {
             this.UC_Received16AHP ="-";
           }
               
               
           //2017-18
           if (this.PC17AHP =="0")
           {
             this.PC17AHP ="-";
           } 
           if (this.CAI17AHP =="0")
           {
             this.CAI17AHP ="-";
           }
           if (this.First17AHP =="0")
           {
             this.First17AHP ="-";
           }
           if (this.Second17AHP =="0")
           {
             this.Second17AHP ="-";
           }
           if (this.Third17AHP =="0")
           {
             this.Third17AHP ="-";
           }
           if (this.Total17AHP =="0")
           {
             this.Total17AHP ="-";
           }
           if (this.UC_Received17AHP =="0")
           {
             this.UC_Received17AHP ="-";
           } 
           //2018-19

           if (this.PC18AHP =="0")
           {
             this.PC18AHP ="-";
           } 
           if (this.CAI18AHP =="0")
           {
             this.CAI18AHP ="-";
           }
           if (this.First18AHP =="0")
           {
             this.First18AHP ="-";
           }
           if (this.Second18AHP =="0")
           {
             this.Second18AHP ="-";
           }
           if (this.Third18AHP =="0")
           {
             this.Third18AHP ="-";
           }
           if (this.Total18AHP =="0")
           {
             this.Total18AHP ="-";
           }
           if (this.UC_Received18AHP =="0")
           {
             this.UC_Received18AHP ="-";
           }
           //2019-20
           if (this.PC19AHP =="0")
           {
             this.PC19AHP ="-";
           } 
           if (this.CAI19AHP =="0")
           {
             this.CAI19AHP ="-";
           }
           if (this.First19AHP =="0")
           {
             this.First19AHP ="-";
           }
           if (this.Second19AHP =="0")
           {
             this.Second19AHP ="-";
           }
           if (this.Third19AHP =="0")
           {
             this.Third19AHP ="-";
           }
           if (this.Total19AHP =="0")
           {
             this.Total19AHP ="-";
           }
           if (this.UC_Received19AHP =="0")
           {
             this.UC_Received19AHP ="-";
           } 
           //Total</td>
           if (this.T_AHP_PC =="0")
           {
             this.T_AHP_PC ="-";
           } 
           if (this.T_AHP_CAI =="0")
           {
             this.T_AHP_CAI ="-";
           }
           if (this.T_AHP_First =="0")
           {
             this.T_AHP_First ="-";
           }
           if (this.T_AHP_Second =="0")
           {
             this.T_AHP_Second ="-";
           }
           if (this.T_AHP_Third =="0")
           {
             this.T_AHP_Third ="-";
           }
           if (this.T_AHP_TotalInst =="0")
           {
             this.T_AHP_TotalInst ="-";
           }
           if (this.T_AHP_TotalUC =="0")
           {
             this.T_AHP_TotalUC ="-";
           } 
          
          
           //2014-15:-
           if (this.PC14ISS =="0")
           {
             this.PC14ISS ="-";
           } 
           if (this.CAI14ISS =="0")
           {
             this.CAI14ISS ="-";
           }
           if (this.First14ISS =="0")
           {
             this.First14ISS ="-";
           }
           if (this.Second14ISS =="0")
           {
             this.Second14ISS ="-";
           }
           if (this.Third14ISS =="0")
           {
             this.Third14ISS ="-";
           }
           if (this.Total14ISS =="0")
           {
             this.Total14ISS ="-";
           }
           if (this.UC_Received14ISS =="0")
           {
             this.UC_Received14ISS ="-";
           }  
           // 2015-16

           if (this.PC15ISS =="0")
           {
             this.PC15ISS ="-";
           } 
           if (this.CAI15ISS =="0")
           {
             this.CAI15ISS ="-";
           }
           if (this.First15ISS =="0")
           {
             this.First15ISS ="-";
           }
           if (this.Second15ISS =="0")
           {
             this.Second15ISS ="-";
           }
           if (this.Third15ISS =="0")
           {
             this.Third15ISS ="-";
           }
           if (this.Total15ISS =="0")
           {
             this.Total15ISS ="-";
           }
           if (this.UC_Received15ISS =="0")
           {
             this.UC_Received15ISS ="-";
           }
          //2016-17
          if (this.PC16ISS =="0")
           {
             this.PC16ISS ="-";
           } 
           if (this.CAI16ISS =="0")
           {
             this.CAI16ISS ="-";
           }

           if (this.First16ISS =="0")
           {
             this.First16ISS ="-";
           }
           if (this.Second16ISS =="0")
           {
             this.Second16ISS ="-";
           }
           if (this.Third16ISS =="0")
           {
             this.Third16ISS ="-";
           }
           if (this.Total16ISS =="0")
           {
             this.Total16ISS ="-";
           }
           if (this.UC_Received16ISS =="0")
           {
             this.UC_Received16ISS ="-";
           }
                  
          // 2017-18
          if (this.PC17ISS =="0")
           {
             this.PC17ISS ="-";
           } 
           if (this.CAI17ISS =="0")
           {
             this.CAI17ISS ="-";
           }

           if (this.First17ISS =="0")
           {
             this.First17ISS ="-";
           }
           if (this.Second17ISS =="0")
           {
             this.Second17ISS ="-";
           }
           if (this.Third17ISS =="0")
           {
             this.Third17ISS ="-";
           }
           if (this.Total17ISS =="0")
           {
             this.Total17ISS ="-";
           }
           if (this.UC_Received17ISS =="0")
           {
             this.UC_Received17ISS ="-";
           }
          // 2018-19
          if (this.PC18ISS =="0")
           {
             this.PC18ISS ="-";
           } 
           if (this.CAI18ISS =="0")
           {
             this.CAI18ISS ="-";
           }

           if (this.First18ISS =="0")
           {
             this.First18ISS ="-";
           }
           if (this.Second18ISS =="0")
           {
             this.Second18ISS ="-";
           }
           if (this.Third18ISS =="0")
           {
             this.Third18ISS ="-";
           }
           if (this.Total18ISS =="0")
           {
             this.Total18ISS ="-";
           }
           if (this.UC_Received18ISS =="0")
           {
             this.UC_Received18ISS ="-";
           } 
         //2019-20
         if (this.PC19ISS =="0")
         {
           this.PC19ISS ="-";
         } 
         if (this.CAI19ISS =="0")
         {
           this.CAI19ISS ="-";
         }

         if (this.First19ISS =="0")
         {
           this.First19ISS ="-";
         }
         if (this.Second19ISS =="0")
         {
           this.Second19ISS ="-";
         }
         if (this.Third19ISS =="0")
         {
           this.Third19ISS ="-";
         }
         if (this.Total19ISS =="0")
         {
           this.Total19ISS ="-";
         }
         if (this.UC_Received19ISS =="0")
         {
           this.UC_Received19ISS ="-";
         }
        //Total 
        if (this.Tot_ISS_PC =="0")
         {
           this.Tot_ISS_PC ="-";
         } 
         if (this.Tot_ISS_CAI =="0")
         {
           this.Tot_ISS_CAI ="-";
         }

         if (this.Tot_ISS_OneInst =="0")
         {
           this.Tot_ISS_OneInst ="-";
         }
         if (this.Tot_ISS_TwoInst =="0")
         {
           this.Tot_ISS_TwoInst ="-";
         }
         if (this.Tot_ISS_ThreeInst =="0")
         {
           this.Tot_ISS_ThreeInst ="-";
         }
         if (this.Tot_ISS_Inst =="0")
         {
           this.Tot_ISS_Inst ="-";
         }
         if (this.Tot_ISS_UC =="0")
         {
           this.Tot_ISS_UC ="-";
         }
                
        
         if (this.Loan_TOTAL_14_15 =="0")
         {
           this.Loan_TOTAL_14_15 ="-";
         }
         if (this.Sub2014_15_CL =="0")
         {
           this.Sub2014_15_CL ="-";
         }
         if (this.Sub2014_15_CL =="0")
         {
           this.Sub2014_15_CL ="-";
         }
         if (this.Sub2014_15_CL =="0")
         {
           this.Sub2014_15_CL ="-";
         }
         if (this.Sub2014_15_CL =="0")
         {
           this.Sub2014_15_CL ="-";
         }
        
         if (this.Loan_TOTAL_15_16 =="0")
         {
           this.Loan_TOTAL_15_16 ="-";
         }
         if (this.Loan_TOTAL_16_17 =="0")
         {
           this.Loan_TOTAL_16_17 ="-";
         }
         if (this.Loan_TOTAL_17_18 =="0")
         {
           this.Loan_TOTAL_17_18 ="-";
         }
         if (this.Loan_TOTAL_18_19 =="0")
         {
           this.Loan_TOTAL_18_19 ="-";
         }
         if (this.Loan_TOTAL_19_20 =="0")
         {
           this.Loan_TOTAL_19_20 ="-";
         }
         

         if (this.Col1_1415 =="0")
         {
           this.Col1_1415 ="-";
         }
         if (this.Col2_1415 =="0")
         {
           this.Col2_1415 ="-";
         }
         if (this.Col3_1415 =="0")
         {
           this.Col3_1415 ="-";
         }
         if (this.Col4_1415 =="0")
         {
           this.Col4_1415 ="-";
         }
         if (this.Col5_1415 =="0")
         {
           this.Col5_1415 ="-";
         }
         if (this.Col6_1415 =="0")
         {
           this.Col6_1415 ="-";
         }
         if (this.Col7_1415 =="0")
         {
           this.Col7_1415 ="-";
         }

         
         if (this.Col1_1516 =="0")
         {
           this.Col1_1516 ="-";
         }
         if (this.Col2_1516 =="0")
         {
           this.Col2_1516 ="-";
         }
         if (this.Col3_1516 =="0")
         {
           this.Col3_1516 ="-";
         }
         if (this.Col4_1516 =="0")
         {
           this.Col4_1516 ="-";
         }
         if (this.Col5_1516 =="0")
         {
           this.Col5_1516 ="-";
         }
         if (this.Col6_1516 =="0")
         {
           this.Col6_1516 ="-";
         }
         if (this.Col7_1516 =="0")
         {
           this.Col7_1516 ="-";
         }

         if (this.Col1_1617 =="0")
         {
           this.Col1_1617 ="-";
         }        
         if (this.Col2_1617 =="0")
         {
           this.Col2_1617 ="-";
         }
         if (this.Col3_1617 =="0")
         {
           this.Col3_1617 ="-";
         }
         if (this.Col4_1617 =="0")
         {
           this.Col4_1617 ="-";
         }
         if (this.Col5_1617 =="0")
         {
           this.Col5_1617 ="-";
         }
         if (this.Col6_1617 =="0")
         {
           this.Col6_1617 ="-";
         }
         if (this.Col7_1617 =="0")
         {
           this.Col7_1617 ="-";
         }

         
         if (this.Col1_1718 =="0")
         {
           this.Col1_1718 ="-";
         }        
         if (this.Col2_1718 =="0")
         {
           this.Col2_1718 ="-";
         }
         if (this.Col3_1718 =="0")
         {
           this.Col3_1718 ="-";
         }
         if (this.Col4_1718 =="0")
         {
           this.Col4_1718 ="-";
         }
         if (this.Col5_1718 =="0")
         {
           this.Col5_1718 ="-";
         }
         if (this.Col6_1718 =="0")
         {
           this.Col6_1718 ="-";
         }
         if (this.Col7_1718 =="0")
         {
           this.Col7_1718 ="-";
         }


         
         if (this.Col1_1819 =="0")
         {
           this.Col1_1819 ="-";
         }        
         if (this.Col2_1819 =="0")
         {
           this.Col2_1819 ="-";
         }
         if (this.Col3_1819 =="0")
         {
           this.Col3_1819 ="-";
         }
         if (this.Col4_1819 =="0")
         {
           this.Col4_1819 ="-";
         }
         if (this.Col5_1819 =="0")
         {
           this.Col5_1819 ="-";
         }
         if (this.Col6_1819 =="0")
         {
           this.Col6_1819 ="-";
         }
         if (this.Col7_1819 =="0")
         {
           this.Col7_1819 ="-";
         }
         
         
         if (this.Col1_1920 =="0")
         {
           this.Col1_1920 ="-";
         }        
         if (this.Col2_1920 =="0")
         {
           this.Col2_1920 ="-";
         }
         if (this.Col3_1920 =="0")
         {
           this.Col3_1920 ="-";
         }
         if (this.Col4_1920 =="0")
         {
           this.Col4_1920 ="-";
         }
         if (this.Col5_1920 =="0")
         {
           this.Col5_1920 ="-";
         }
         if (this.Col6_1920 =="0")
         {
           this.Col6_1920 ="-";
         }
         if (this.Col7_1920 =="0")
         {
           this.Col7_1920 ="-";
         }
      
      
         
         if (this.Col1_Total =="0")
         {
           this.Col1_Total ="-";
         }        
         if (this.Col2_Total =="0")
         {
           this.Col2_Total ="-";
         }
         if (this.Col3_Total =="0")
         {
           this.Col3_Total ="-";
         }
         if (this.Col4_Total =="0")
         {
           this.Col4_Total ="-";
         }
         if (this.Col5_Total =="0")
         {
           this.Col5_Total ="-";
         }
         if (this.Col6_Total =="0")
         {
           this.Col6_Total ="-";
         }
         if (this.Col7_Total =="0")
         {
           this.Col7_Total ="-";
         }  
            

         if (this.Loan_TOTAL_CL =="0")
         {
           this.Loan_TOTAL_CL ="-";
         }    
         if (this.CA_SANCT_CLSS =="0")
         {
           this.CA_SANCT_CLSS ="-";
         }   
         if (this.FirstI_CLSS =="0")
         {
           this.FirstI_CLSS ="-";
         }   
         if (this.SecondI_CLSS =="0")
         {
           this.SecondI_CLSS ="-";
         }
         if (this.ThirdI_CLSS =="0")
         {
           this.ThirdI_CLSS ="-";
         }         
         
         if (this.totalI_CLSS =="0")
         {
           this.totalI_CLSS ="-";
         }
         if (this.Total_UC_RecdClss =="0")
         {
           this.Total_UC_RecdClss ="-";
         }
           
           
               
            
  
   
    
     
      
      
                  
          
          
          
           

           
                   
          
          
          
           

           
                          
          
          
          
           

           
          
          
          
           

           
                  
          
          
          
           
          
                   
           
           
           
            
           
            
 
          
         

                
               

                
                
                        
                
               
                
               

                
                
                
               

               


            
            

            
            
            
            
            
            
           
            
            
            
            
            
            
            
            
            
            
            
            
       
          
           
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