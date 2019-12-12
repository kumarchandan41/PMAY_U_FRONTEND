import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
//import { Observable } from 'rxjs';
import * as $ from 'jspdf';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Houses_Status } from '../model/chart';
//import { float } from 'html2canvas/dist/types/css/property-descriptors/float';
//import { ExportAsConfig, SupportedExtensions, ExportAsService } from 'ngx-export-as';
import * as XLSX from 'xlsx';
//  Graph 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef, Renderer2 } from '@angular/core';
import { States, District, City, Charts, CompMaster } from 'src/app/financeReport/model/chart';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { lstatSync } from 'fs';

import { stringify } from 'querystring';
import { formatDate } from '@angular/common';
import { EventEmitter, Input, Output } from '@angular/core';
import { GlobalEvent } from 'src/app/Shared/global-event';

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
  selector: 'app-vertical-houses-status',
  templateUrl: './vertical-houses-status.component.html',
  styleUrls: ['./vertical-houses-status.component.css']
})
export class VerticalHousesStatusComponent implements OnInit {
  Compid: any;
  totalNumber: number = 0;
  fistNumber: number = 0;
  secondNumber: number;
  HouseInvolved1: any = 0;
  HouseInvolved2: any = 0;
  HouseInvolved3: any = 0;
  HouseInvolved4: any = 0;
  HouseInvolved5: any = 0;
  HouseInvolved6: any = 0;
  THouseInvolved: any = 0;
  // HouseInvolved7:number=0;
  // HouseInvolved8:number=0;
  // HouseInvolved9:number=0;
  // HouseInvolved10:number=0;

  FundsDisbursed_in_Houses1: any = 0;
  FundsDisbursed_in_Houses2: any = 0;
  FundsDisbursed_in_Houses3: any = 0;
  FundsDisbursed_in_Houses4: any = 0;
  FundsDisbursed_in_Houses5: any = 0;
  FundsDisbursed_in_Houses6: any = 0;
  FundsDisbursed_in_Houses7: any = 0;
  FundsDisbursed_in_Houses8: any = 0;
  FundsDisbursed_in_Houses9: any = 0;
  FundsDisbursed_in_Houses10: any = 0;
  TFundsDisbursed_in_Houses: any = 0;

  HouseInvolved1_AHP: any = 0;
  HouseInvolved2_AHP: any = 0;
  HouseInvolved3_AHP: any = 0;
  HouseInvolved4_AHP: any = 0;
  HouseInvolved5_AHP: any = 0;
  THouseInvolved_AHP: any = 0;

  Houses_Grounded1: any = 0;
  Houses_Grounded2: any = 0;
  Houses_Grounded3: any = 0;
  Houses_Grounded4: any = 0;
  Houses_Grounded5: any = 0;
  Houses_Grounded6: any = 0;
  Houses_Grounded7: any = 0;
  Houses_Grounded8: any = 0;

  Houses_Completed1: any = 0;
  Houses_Completed2: any = 0;
  Houses_Completed3: any = 0;
  Houses_Completed4: any = 0;
  Houses_Completed5: any = 0;
  Houses_Completed6: any = 0;
  Houses_Completed7: any = 0;
  Houses_Completed8: any = 0;

  HousesOccupied0: any = 0;
  HousesOccupied1: any = 0;
  HousesOccupied2: any = 0;
  HousesOccupied3: any = 0;
  HousesOccupied4: any = 0;
  HousesOccupied5: any = 0;
  HousesOccupied6: any = 0;
  HousesOccupied7: any = 0;
  HousesOccupied8: any = 0;
  lstComponent: string[] = [];

  HousesStatus: Houses_Status[];

  //THouseInvolved :number;
  THouses_Grounded: any = 0;
  THouses_Completed: any = 0;
  THousesOccupied: any = 0;
  TotalFundsDisbursed: any = 0;
  Houses_Grounded1_AHP: any = 0;
  Houses_Grounded2_AHP: any = 0;
  Houses_Grounded3_AHP: any = 0;
  Houses_Grounded4_AHP: any = 0;
  Houses_Grounded5_AHP: any = 0;
  THouses_Grounded_AHP: any = 0;
  Houses_Completed1_AHP: any = 0;
  Houses_Completed2_AHP: any = 0;
  Houses_Completed3_AHP: any = 0;
  Houses_Completed4_AHP: any = 0;
  Houses_Completed5_AHP: any = 0;
  HousesOccupied1_AHP: any = 0;
  HousesOccupied2_AHP: any = 0;
  HousesOccupied3_AHP: any = 0;
  HousesOccupied4_AHP: any = 0;
  HousesOccupied5_AHP: any = 0;
  THousesOccupied_AHP: any = 0;

  HouseInvolved0_ISSR: any = 0;
  FundsDisbursed_in_Houses0_ISSR: any = 0;
  Houses_Grounded0_ISSR: any = 0;
  Houses_Completed0_ISSR: any = 0;
  HousesOccupied0_ISSR: any = 0;


  HouseInvolved1_ISSR: any = 0;
  HouseInvolved2_ISSR: any = 0;
  HouseInvolved3_ISSR: any = 0;
  HouseInvolved4_ISSR: any = 0;
  HouseInvolved5_ISSR: any = 0;
  THouseInvolved_ISSR: any = 0;
  FundsDisbursed_in_Houses1_ISSR: any = 0;
  FundsDisbursed_in_Houses2_ISSR: any = 0;
  FundsDisbursed_in_Houses3_ISSR: any = 0;
  FundsDisbursed_in_Houses4_ISSR: any = 0;
  FundsDisbursed_in_Houses5_ISSR: any = 0;
  TotalFundsDisbursed_ISSR: any = 0;
  Houses_Grounded1_ISSR: any = 0;
  Houses_Grounded2_ISSR: any = 0;
  Houses_Grounded3_ISSR: any = 0;
  Houses_Grounded4_ISSR: any = 0;
  Houses_Grounded5_ISSR: any = 0;
  THouses_Grounded_ISSR: any = 0;
  Houses_Completed1_ISSR: any = 0;
  Houses_Completed2_ISSR: any = 0;
  Houses_Completed3_ISSR: any = 0;
  Houses_Completed4_ISSR: any = 0;
  Houses_Completed5_ISSR: any = 0;
  THouses_Completed_ISSR: any = 0;
  HousesOccupied1_ISSR: any = 0;
  HousesOccupied2_ISSR: any = 0;
  HousesOccupied3_ISSR: any = 0;
  HousesOccupied4_ISSR: any = 0;
  HousesOccupied5_ISSR: any = 0;
  THousesOccupied_ISSR: any = 0;

  stateCode: string = "0";
  districtCode: string = "0";
  cityCode: string = "0";
  compId: string = "0";
  HouseInvolvedT1: any = 0;
  HouseInvolvedT2: any = 0;
  HouseInvolvedT3: any = 0;
  HouseInvolvedT4: any = 0;
  HouseInvolvedT5: any = 0;
  HouseInvolvedT6: any = 0;
  FundsDisbursed_in_HousesT1: any = 0;
  FundsDisbursed_in_HousesT2: any = 0;
  FundsDisbursed_in_HousesT3: any = 0;
  FundsDisbursed_in_HousesT4: any = 0;
  FundsDisbursed_in_HousesT5: any = 0;
  FundsDisbursed_in_HousesT6: any = 0;
  TFundsDisbursed_in_HousesT: any = 0;
  Houses_GroundedT1: any = 0;
  Houses_GroundedT2: any = 0;
  Houses_GroundedT3: any = 0;
  Houses_GroundedT4: any = 0;
  Houses_GroundedT5: any = 0;
  Houses_GroundedT6: any = 0;
  THouses_GroundedT: any = 0;


  Houses_CompletedT1: any = 0;
  Houses_CompletedT2: any = 0;
  Houses_CompletedT3: any = 0;
  Houses_CompletedT4: any = 0;
  Houses_CompletedT5: any = 0;
  Houses_CompletedT6: any = 0;
  THouses_CompletedT: any = 0;

  HousesOccupiedT1: any = 0;
  HousesOccupiedT2: any = 0;
  HousesOccupiedT3: any = 0;
  HousesOccupiedT4: any = 0;
  HousesOccupiedT5: any = 0;
  HousesOccupiedT6: any = 0;
  THousesOccupiedT: any = 0;
  THouseInvolvedT: any = 0;
  display = 'none';
  StateName: string = "All India";

  Houses_GroundedJN_T: any = 0;
  THouses_CompletedJN: any = 0;
  HousesOccupiedJNT: any = 0;
  FundsDisbursed_in_Houses01: any = 0;

  Bene2014_15_CLSS: any = 0;
  Bene2015_16_CLSS: any = 0;
  Bene2016_17_CLSS: any = 0;
  Bene2017_18_CLSS: any = 0;
  Bene2018_19_CLSS: any = 0;
  Bene2019_20_CLSS: any = 0;
  Bene2020_21_CLSS: any = 0;
  Bene2021_22_CLSS: any = 0;
  BeneCLSS_Total: any = 0;
  TotalFundsDisbursedAHP: any = 0;
  // stateCodes: string = "0";
  // districtCodes: string = "0";
  // cityCodes: string = "0";
  StateMessage: string;
  DistrictMessage: string;
  CityMessage: string;
  distValue: string;
  cityValue: string;
  stValue: string;
  stateCodes: string = "0";
  districtCodes: string = "0";
  cityCodes: string = "0";
  FundsDisbursed_in_Houses5_AHP: any = 0;
  FundsDisbursed_in_Houses4_AHP: any = 0;
  FundsDisbursed_in_Houses3_AHP: any = 0;
  FundsDisbursed_in_Houses2_AHP: any = 0;
  FundsDisbursed_in_Houses1_AHP: any = 0;
  THouses_Completed_AHP: any = 0;

  //HouseInvolved01 = 0;
  HouseInvolved01: any = 0;

  Houses_Grounded01: any = 0;
  Houses_Completed01: any = 0;
  HousesOccupied01: any = 0;
  Houses_Grounded0: any = 0;

  HouseInvolved0_AHP: any = 0;
  FundsDisbursed_in_Houses0_AHP: any = 0;
  Houses_Grounded0_AHP: any = 0;
  Houses_Completed0_AHP: any = 0;
  HousesOccupied0_AHP: any = 0;
  THouseInvolvedGT: any = 0;
  TFundsDisbursed_in_HousesGT: any = 0;
  THouses_GroundedGT: any = 0;
  THouses_CompletedGT: any = 0;
  THousesOccupiedGT: any = 0;
  lstHousesStatus: Houses_Status[];
  Year: string;
  Cid: string;
  lblStateDisttCity: string;
  THouseInvolved1_ISSR: any = 0;
  TFundsDisbursed_in_Houses1_ISSR: any = 0;
  THouses_Grounded1_ISSR: any = 0;
  THouses_Completed1_ISSR: any = 0;
  THousesOccupied1_ISSR: any = 0;
  blc_1415_1: any = 0;
  blc_1415_2: any = 0;
  blc_1516_1: any = 0;
  blc_1516_2: any = 0;
  blc_1617_1: any = 0;
  blc_1617_2: any = 0;
  blc_1718_1: any = 0;
  blc_1718_2: any = 0;
  blc_1819_1: any = 0;
  blc_1819_2: any = 0;
  blc_1920_1: any = 0;
  blc_1920_2: any = 0;
  blc_1_TOT: any = 0;
  blc_2_TOT: any = 0;
  AHP_1415_1: any = 0;
  AHP_1415_2: any = 0;
  AHP_1516_1: any = 0;
  AHP_1516_2: any = 0;
  AHP_1617_1: any = 0;
  AHP_1617_2: any = 0;
  AHP_1718_1: any = 0;
  AHP_1718_2: any = 0;
  AHP_1819_1: any = 0;
  AHP_1819_2: any = 0;
  AHP_1920_1: any = 0;

  AHP_1920_2: any = 0;
  AHP_1_TOT: any = 0;
  AHP_2_TOT: any = 0;
  ISSR_1415_1: any = 0;
  ISSR_1415_2: any = 0;
  ISSR_1516_1: any = 0;
  ISSR_1516_2: any = 0;
  ISSR_1617_1: any = 0;
  ISSR_1617_2: any = 0;
  ISSR_1718_1: any = 0;
  ISSR_1718_2: any = 0;
  ISSR_1819_1: any = 0;
  ISSR_1819_2: any = 0;
  ISSR_1920_1: any = 0;
  ISSR_1920_2: any = 0;
  ISSR_1_TOT: any = 0;
  ISSR_2_TOT: any = 0;
  CLSS_1415_1: any = 0;
  CLSS_1415_2: any = 0;
  CLSS_1516_1: any = 0;
  CLSS_1516_2: any = 0;
  CLSS_1617_1: any = 0;
  CLSS_1617_2: any = 0;
  CLSS_1718_1: any = 0;
  CLSS_1718_2: any = 0;
  CLSS_1819_1: any = 0;
  CLSS_1819_2: any = 0;
  CLSS_1920_1: any = 0;
  CLSS_1920_2: any = 0;
  CLSS_1_TOT: any = 0;
  CLSS_2_TOT: any = 0;

  PMAY1415_1: any = 0;
  PMAY1415_2: any = 0;

  PMAY1516_1: any = 0;
  PMAY1516_2: any = 0;

  PMAY1617_1: any = 0;
  PMAY1617_2: any = 0;

  PMAY1718_1: any = 0;
  PMAY1718_2: any = 0;

  PMAY1819_1: any = 0;
  PMAY1819_2: any = 0;


  PMAY1920_1: any = 0;
  PMAY1920_2: any = 0;
  PMAYT_1: any = 0;
  PMAYT_2: any = 0;
  //--------------------------- graph
  StateDetails: States[];
  State: string;
  DisttDetails: Observable<District[]>;
  CityDetails: City[];
  // stateCodes: string = "0";
  // districtCodes: string = "0";
  // cityCodes: string = "0";
  distvalue: string;
  cityvalue: string;
  // distValue: string;
  // cityValue: string; 
  modalRef_G;
  display_G = 'none';
  display1_G = 'none';
  Codes_G: string;
  chart: Charts;
  compArray_G: string[];
  Houses_Grounded_G: any;
  SubsidyAmountCredited_G: any;

  StateMessage_G: string;
  DistrictMessage_G: string;
  CityMessage_G: string;

  stValue_G: string;


  firstGraph_G: string[] = [];
  secondGraph_G: string[] = [];
  leble_G: string;
  Y_G: string;

  HS_14_15_G: string;

  HC_14_15_G: any;
  HO_14_15_G: any;
  HS_15_16_G: any;
  HS_16_17_G: any;
  HS_17_18_G: any;
  HS_18_19_G: any;

  HC_15_16_G: any;
  HC_16_17_G: any;
  HC_17_18_G: any;
  HC_18_19_G: any;
  HO_15_16_G: any;
  HO_16_17_G: any;
  HO_17_18_G: any;
  HO_18_19_G: any;


  HG_14_15_G: string;
  HG_15_16_G: string;
  HG_16_17_G: string;
  HG_17_18_G: string;
  HG_18_19_G: string;


  label_G: string;
  y_G: string;
  Total_Cost_G: string;
  UC_Recd_G: number;
  lstComp_G: CompMaster[];
  SubsTotal_G: number;
  MIG_SubsTotal_G: number;
  EWS_LIG_Total_G: number;
  EWS_LIG_Bene_G: any;
  MIGBene_G: number;
  cidCount_G: string = '';
  lstCid_G: number[] = [];
  lstYear_G: string[] = [];
  lstYearBene_G: string[] = [];

  selectedYear_G: any;
  lstDivision_G: string[] = [];

  StateShareNew_G: any;


  cid_G: number;
  Comp_G: string;
  total_Demand_G: number;
  total_DemandNEW_G: number;
  total_DemandISSR_G: number;
  total_Demand__G: any;
  CLSSBeneficiaries_G: number;
  ComponentWiseSanctioned_G: number;
  CASanct_forRelease_G: number;
  CA_Approvd_G: number;
  CA_SanctforRelease_G: number;
  CA_Aproved_G: number;
  CA_Released_G: number;
  CASanct_forReleaseN_G: number;
  CARNew_G: number;
  UC_RecdNew_G: number;
  CASanct_forReleas_G: string;
  CASanct_for_Release_G: number;
  CASanct_forRelease1_G: string;

  DisabledCheckBox_G: boolean;


  HS_15_16S_G: number;
  HS_16_17S_G: number;
  HS_17_18S_G: number;
  HS_18_19S_G: number;
  HC_15_16S_G: number;
  HC_16_17S_G: number;
  HC_17_18S_G: number;
  HC_18_19S_G: number;
  HO_15_16S_G: number;
  HO_16_17S_G: number;
  HO_17_18S_G: number;
  HO_18_19S_G: number;

  Ca_Sanct__G: any;
  CASanct_forReleaseN1_G: any;
  GrndTotal_G: any;
  Sanction_TotalN1_G: any;
  Division_G: string;
  totalCost_G: number;
  EWS_LIG_BeneDIV_G: string;
  MIG_SubsTotalDIV_G: string;
  EWS_Subsidy_G: string;
  HO_14_15S_G: number;
  Total_Subsidy_G: string;
  totalSubsidy_State_G: number;

  Sanction_Total_New_G: number;
  HS_19_20S_G: number;
  HC_19_20S_G: number;
  HO_19_20S_G: number;
  HC_19_20_G: number;
  HO_19_20_G: number;
  HS_19_20_G: number;
  HG_19_20_G: number;
  CASanctioned_19_20_G: number;
  CumuCA_Released_19_20_G: number;



  Fin_Year_G: any;
  page_G: string;
  isDone_G = true;
  Sanction_Total_New4_G: any;
  today_G = new Date();
  jstoday_G = '';
  selectedColor_G = '';
  public backgroundColor_G: string;
  public show_G = false;
  GTCompleted__New_G: any;
  Ground_Total__New_G: any;
  GTCompletedNew__G: any;
  CASanct_forReleaseN_Change_G: any;
  Housesinvolved_G: any;
  FundsDisbursed_in_Houses_G: any;
  Houses_Grounde_G: any;
  Houses_Complete_G: any;
  First_Houses_G: any;
  Second_Houses_G: any;
  Third_Houses_G: any;
  Fin_Year14_15_G: any;
  Housesinvolved14_15_G: any;
  FundsDisbursed_in_Houses14_15_G: any = 0;
  Houses_Grounde14_15_G: any = 0;
  Houses_Complete14_15_G: any = 0;
  First_Houses14_15_G: any = 0;
  Second_Houses14_15_G: any = 0;
  Third_Houses14_15_G: any = 0;

  Fin_Year15_16_G: any = 0;
  Housesinvolved15_16_G: any = 0;
  FundsDisbursed_in_Houses15_16_G: any = 0;
  Houses_Grounde15_16_G: any = 0;
  Houses_Complete15_16_G: any = 0;
  First_Houses15_16_G: any = 0;
  Second_Houses15_16_G: any = 0;
  Third_Houses15_16_G: any = 0;

  Fin_Year16_17_G: any = 0;
  Housesinvolved16_17_G: any = 0;
  FundsDisbursed_in_Houses16_17_G: any = 0;
  Houses_Grounde16_17_G: any = 0;
  Houses_Complete16_17_G: any = 0;
  First_Houses16_17_G: any = 0;
  Second_Houses16_17_G: any = 0;
  Third_Houses16_17_G: any = 0;
  Fin_Year17_18_G: any = 0;
  Housesinvolved17_18_G: any = 0;
  FundsDisbursed_in_Houses17_18_G: any = 0;
  Houses_Grounde17_18_G: any = 0;
  Houses_Complete17_18_G: any = 0;
  First_Houses17_18_G: any = 0;
  Third_Houses17_18_G: any = 0;
  Second_Houses17_18_G: any = 0;

  Fin_Year18_19_G: any = 0;
  Housesinvolved18_19_G: any = 0;
  FundsDisbursed_in_Houses18_19_G: any = 0;
  Houses_Grounde18_19_G: any = 0;
  Houses_Complete18_19_G: any = 0;
  First_Houses18_19_G: any = 0;
  Third_Houses18_19_G: any = 0;
  Second_Houses18_19_G: any = 0;

  Fin_Year19_20_G: any;
  Housesinvolved19_20_G: any = 0;
  FundsDisbursed_in_Houses19_20_G: any = 0;
  Houses_Grounde19_20_G: any = 0;
  Houses_Complete19_20_G: any = 0;
  First_Houses19_20_G: any = 0;
  Third_Houses19_20_G: any = 0;
  Second_Houses19_20_G: any = 0;
  HousesOccupied18_19_G: any = 0;
  HousesOccupied17_18_G: any = 0;
  HousesOccupied16_17_G: any = 0;
  HousesOccupied15_16_G: any = 0;
  HousesOccupied14_15_G: any = 0;
  HousesOccupied19_20_G: any = 0;
  First_Houses20_21_G: any = 0;
  HousesOccupied20_21_G: any = 0;
  Second_Houses20_21_G: any = 0;
  Third_Houses20_21_G: any = 0;
  FundsDisbursed_in_Houses20_21_G: any = 0;
  Housesinvolved20_21_G: any = 0;
  Houses_Grounde20_21_G: any = 0;
  Houses_Complete20_21_G: any = 0;
  a_G: any;
  b_G: any;
  c_G: any;
  d_G: any;
  e_G: any;
  f_G: any;
  g_G: any;
  h_G: any;
  i_G: any;
  selectedYearsBene_G: string;
  public ReleasedFundsCol: number;


  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  title = 'Excel';
  RdStatus: any;
  DisplayTable: string;
  DisplyaGraph: string;
  FundsFirst: string;
  SConst: string;
  FundsThird: string;
  FundsSecond: string;
  Grounded: string;
  Completed: string;
  Occupied: string;
  //  PMAYT_1: any;

  constructor(private router: Router, private routers: ActivatedRoute, public service: GraphService, private gevent: GlobalEvent, private modalService: NgbModal) {
    this.stValue = "0";
    this.distValue = "0";
    this.cityValue = "0";
    this.StateMessage = "All India";
    this.DistrictMessage = "Select District";
    this.CityMessage = "Select City";
    this.service.GetStatusofHouses_CompWise(this.Compid).subscribe(result => {
      // this.Houses_Grounded = result.Houses_Grounded;
    });
    // Graph Code 
    this.StateMessage_G = "Select State";
    this.DistrictMessage_G = "Select District";
    this.CityMessage_G = "Select City";
    this.stValue_G = "0";
    this.distValue = "0";
    this.cityValue = "0";
    setInterval(() => {
      this.jstoday_G = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    }, 1000);


    this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
      this.Houses_Grounded_G = result.Houses_Grounded;
    });
    this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
      this.SubsidyAmountCredited_G = result.SubsidyAmountCredited;
    });
    this.service.JNNURMCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
    });
    this.service.DemandCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
    });

    this.service.GetStateWiseFinYrData(this.stateCodes).subscribe(result_State => {
    });

    this.service.sp_create_PMAY_DATAConsNew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G).subscribe(result_PMU => {
    });

    this.service.sp_create_BLC_DATANew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G).subscribe(result_PMU => {
    });

    this.service.sp_create_AHP_DATANew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G).subscribe(result_PMU => {
    });

    this.service.sp_create_ISSR_DATANew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G).subscribe(result_PMU => {
    });


  }
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // wb.Props.Title="Hello";
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');
  }

  // exportAs(type: SupportedExtensions) {
  //   this.config.type = type;
  //   this.exportAsService.save(this.config, 'myFile').subscribe(() => {
  //    });
  // }  

  BindGetStatus(stateCode: string, districtCode: string, cityCode: string, compId: string) {

    //alert(stateCode);
    this.service.GetStatusofHouses_Sanctioned(stateCode, districtCode, cityCode, compId).subscribe(result => {
      //alert(result[6].Housesinvolved.toString());
      this.HouseInvolvedT1 = result[0].Housesinvolved;
      this.HouseInvolvedT2 = result[1].Housesinvolved;
      this.HouseInvolvedT3 = result[2].Housesinvolved;
      this.HouseInvolvedT4 = result[3].Housesinvolved;
      this.HouseInvolvedT5 = result[4].Housesinvolved;
      this.HouseInvolvedT6 = result[5].Housesinvolved;

      this.THouseInvolvedT = this.HouseInvolvedT1 + this.HouseInvolvedT2 + this.HouseInvolvedT3 + this.HouseInvolvedT4 + this.HouseInvolvedT5 + this.HouseInvolvedT6;
      //this.HouseInvolved7=result[6].Housesinvolved.toString();
      //      this.HouseInvolved8=result[7].Housesinvolved.toString();
      // this.HouseInvolved9=result[8].Housesinvolved.toString();
      // this.HouseInvolved10=result[9].Housesinvolved.toString();

      //alert(result[0].FundsDisbursed_in_Houses.toString());


      this.FundsDisbursed_in_HousesT1 = result[0].FundsDisbursed_in_Houses;
      //console.log(this.FundsDisbursed_in_Houses1.toLocaleString('en-IN'));

      this.FundsDisbursed_in_HousesT2 = result[1].FundsDisbursed_in_Houses;
      this.FundsDisbursed_in_HousesT3 = result[2].FundsDisbursed_in_Houses;
      this.FundsDisbursed_in_HousesT4 = result[3].FundsDisbursed_in_Houses;
      this.FundsDisbursed_in_HousesT5 = result[4].FundsDisbursed_in_Houses;
      this.FundsDisbursed_in_HousesT6 = result[5].FundsDisbursed_in_Houses;

      this.TFundsDisbursed_in_HousesT = this.FundsDisbursed_in_HousesT1 + this.FundsDisbursed_in_HousesT2 + this.FundsDisbursed_in_HousesT3 + this.FundsDisbursed_in_HousesT4 + this.FundsDisbursed_in_HousesT5 + this.FundsDisbursed_in_HousesT6;
      // this.FundsDisbursed_in_Houses7=result[6].FundsDisbursed_in_Houses.toString();
      // this.FundsDisbursed_in_Houses8=result[7].FundsDisbursed_in_Houses.toString();
      // this.FundsDisbursed_in_Houses9=result[8].FundsDisbursed_in_Houses.toString();
      // this.FundsDisbursed_in_Houses10=result[9].FundsDisbursed_in_Houses.toString();

      this.Houses_GroundedT1 = result[0].Houses_Grounded;
      this.Houses_GroundedT2 = result[1].Houses_Grounded;
      this.Houses_GroundedT3 = result[2].Houses_Grounded;
      this.Houses_GroundedT4 = result[3].Houses_Grounded;
      this.Houses_GroundedT5 = result[4].Houses_Grounded;
      this.Houses_GroundedT6 = result[5].Houses_Grounded;
      //this.Houses_Grounded7=result[6].Houses_Grounded.toString();
      //this.Houses_Grounded8=result[7].Houses_Grounded.toString();
      this.THouses_GroundedT = this.Houses_GroundedT1 + this.Houses_GroundedT2 + this.Houses_GroundedT3 + this.Houses_GroundedT4 + this.Houses_GroundedT5 + this.Houses_GroundedT6;


      this.Houses_CompletedT1 = result[0].Houses_Completed;
      this.Houses_CompletedT2 = result[1].Houses_Completed;
      this.Houses_CompletedT3 = result[2].Houses_Completed;
      this.Houses_CompletedT4 = result[3].Houses_Completed;
      this.Houses_CompletedT5 = result[4].Houses_Completed;
      this.Houses_CompletedT6 = 0;//result[5].Houses_Completed;
      //this.Houses_Completed7=result[6].Houses_Completed.toString();
      //this.Houses_Completed8=result[7].Houses_Completed.toString();
      this.THouses_CompletedT = this.Houses_CompletedT1 + this.Houses_CompletedT2 + this.Houses_CompletedT3 + this.Houses_CompletedT4 + this.Houses_CompletedT5 + this.Houses_CompletedT6;


      this.HousesOccupiedT1 = result[0].HousesOccupied;
      this.HousesOccupiedT2 = result[1].HousesOccupied;
      this.HousesOccupiedT3 = result[2].HousesOccupied;
      this.HousesOccupiedT4 = result[3].HousesOccupied;
      this.HousesOccupiedT5 = result[4].HousesOccupied;
      this.HousesOccupiedT6 = result[5].HousesOccupied;
      //this.Houses_Completed7=result[6].Houses_Completed.toString();
      //this.Houses_Completed8=result[7].Houses_Completed.toString();
      this.THousesOccupiedT = this.HousesOccupiedT1 + this.HousesOccupiedT2 + this.HousesOccupiedT3 + this.HousesOccupiedT4 + this.HousesOccupiedT5 + this.HousesOccupiedT6;

    })
  }
  ngOnInit() {
    this.ReleasedFundsCol = 3;
    this.districtCodes = "0";
    this.cityCodes = "0";
    this.Compid = "0";
    this.stateCode = "0";
    this.HouseInvolved1 = 0;
    this.HouseInvolved2 = 0;
    this.THouseInvolved = 0;
    this.fistNumber = 0;
    this.secondNumber = 0;

    this.service.StateList();
    this.service.DisttList(this.stateCodes);
    this.service.CityList(this.districtCodes);
    // this.States_UT ="Delhi";
    this.lblStateDisttCity = "All India";

    //   this.routers.queryParams.subscribe(p => {
    //   this.stateCodes = p['stateCode'];
    //   this.districtCodes = p['distCode'];
    //   this.cityCodes = p['cityCode'];


    //   this.service.DisttList(this.stateCodes);
    //   this.districtCodes = p['distCode'];

    //   this.service.CityList(this.districtCodes);
    //   this.cityCodes = p['cityCode'];

    //   this.Compid = p['compId'];    


    // //    this.LoadData(this.stateCodes,this.districtCodes,this.cityCodes);
    // this.GetFilterDatanew(this.stateCodes,this.districtCodes ,this.cityCodes, this.Compid);
    //   }); 


    this.GetFilterDatanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Compid);

    //------------------------------------------

    //     this.GetFilterDatanew(this.stateCode,this.districtCodes ,this.cityCodes, this.Compid );
    // this.getStateDetails(0);
    // Graph Code 
    this.stateCodes = "0";
    this.districtCodes = "0";
    this.cityCodes = "0";
    //  this.cid = 0;
    //  this.Comp = "0";
    //  this.Division = "0";
    //  this.DivisionCodes = "0";
    this.State = "--Select--";

    this.service.StateList();
    this.service.DisttList(this.stateCodes);
    this.service.CityList(this.districtCodes);
    //***************************************** */
    // this.service.getComponent().subscribe(result => {
    //   this.lstComp = result;
    //   //***************************************** */
    // })
    // this.service.getHFA_Details().subscribe(result => {
    //   this.lstHFACodes = result;
    //   //***************************************** */
    // })

    //this.BindGroundedGraph(this.stateCode,this.districtCode,this.cityCode);
    // this.DivisionCodes ='HFA-1';

    //this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);
    this.BindPMayData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "0");
    this.BindBLC_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "0");
    this.BindAHP_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "0");
    this.BindISSRData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "0");

    this.DisplyaGraph = "none";
    this.DisplayTable = "block";
  }


  LoadData(stateCode: string, districtCode: string, cityCode: string) {

    this.THouseInvolved1_ISSR = 0;

    this.TFundsDisbursed_in_Houses1_ISSR = 0;
    this.THouses_Grounded1_ISSR = 0;
    this.THouses_Completed1_ISSR = 0;
    this.THousesOccupied1_ISSR = 0;

    this.FundsDisbursed_in_Houses01 = "0";

    this.Compid = "BLCS";
    this.service.GetStatusofHouses_CompWise("BLCS").subscribe(result => {
      this.HouseInvolved1 = result[0].Housesinvolved;
      this.HouseInvolved2 = result[1].Housesinvolved;
      this.HouseInvolved3 = result[2].Housesinvolved;
      this.HouseInvolved4 = result[3].Housesinvolved;
      this.HouseInvolved5 = result[4].Housesinvolved;


      this.FundsDisbursed_in_Houses1 = result[0].FundsDisbursed_in_Houses;
      this.FundsDisbursed_in_Houses2 = result[1].FundsDisbursed_in_Houses;
      this.FundsDisbursed_in_Houses3 = result[2].FundsDisbursed_in_Houses;
      this.FundsDisbursed_in_Houses4 = result[3].FundsDisbursed_in_Houses;
      this.FundsDisbursed_in_Houses5 = result[4].FundsDisbursed_in_Houses;

      this.FundsDisbursed_in_HousesT2 = this.FundsDisbursed_in_Houses1 + this.FundsDisbursed_in_Houses2 + this.FundsDisbursed_in_Houses3 + this.FundsDisbursed_in_Houses4 + this.FundsDisbursed_in_Houses5;


      this.Houses_Grounded1 = result[0].Houses_Grounded;
      this.Houses_Grounded2 = result[1].Houses_Grounded;
      this.Houses_Grounded3 = result[2].Houses_Grounded;
      this.Houses_Grounded4 = result[3].Houses_Grounded;
      this.Houses_Grounded5 = result[4].Houses_Grounded;
      this.THouses_Grounded = this.Houses_Grounded1 + this.Houses_Grounded2 + this.Houses_Grounded3 + this.Houses_Grounded4 + this.Houses_Grounded5;


      this.Houses_Completed1 = result[0].Houses_Completed;
      this.Houses_Completed2 = result[1].Houses_Completed;
      this.Houses_Completed3 = result[2].Houses_Completed;
      this.Houses_Completed4 = result[3].Houses_Completed;
      this.Houses_Completed5 = result[4].Houses_Completed;
      this.Houses_Completed6 = 0;//result[5].Houses_Completed; //
      //this.Houses_Completed7=result[6].Houses_Completed.toString();
      //this.Houses_Completed8=result[7].Houses_Completed.toString();
      this.THouses_Completed = this.Houses_Completed1 + this.Houses_Completed2 + this.Houses_Completed3 + this.Houses_Completed4 + this.Houses_Completed5;


      this.HousesOccupied1 = result[0].HousesOccupied;
      this.HousesOccupied2 = result[1].HousesOccupied;
      this.HousesOccupied3 = result[2].HousesOccupied;
      this.HousesOccupied4 = result[3].HousesOccupied;
      if (result[4].HousesOccupied == 0) {
        this.HousesOccupied5 = 0;
      }
      else
        this.HousesOccupied5 = indianFormat(result[4].HousesOccupied);
      //---------------------------------------------------------------------------------------
      this.Compid = "AHP";
      this.service.GetStatusofHouses_CompWise("AHP").subscribe(resultAHP => {
        this.HouseInvolved1_AHP = resultAHP[0].Housesinvolved;
        this.HouseInvolved2_AHP = resultAHP[1].Housesinvolved;
        this.HouseInvolved3_AHP = resultAHP[2].Housesinvolved;
        this.HouseInvolved4_AHP = resultAHP[3].Housesinvolved;
        this.HouseInvolved5_AHP = resultAHP[4].Housesinvolved; //


        this.FundsDisbursed_in_Houses1_AHP = resultAHP[0].FundsDisbursed_in_Houses;
        this.FundsDisbursed_in_Houses2_AHP = resultAHP[1].FundsDisbursed_in_Houses;
        this.FundsDisbursed_in_Houses3_AHP = resultAHP[2].FundsDisbursed_in_Houses;
        if (resultAHP[3].FundsDisbursed_in_Houses == 0) {
          this.FundsDisbursed_in_Houses4_AHP = 0;
        }
        else
          this.FundsDisbursed_in_Houses4_AHP = (resultAHP[3].FundsDisbursed_in_Houses);

        this.FundsDisbursed_in_Houses5_AHP = resultAHP[4].FundsDisbursed_in_Houses; //

        this.TotalFundsDisbursedAHP = this.FundsDisbursed_in_Houses1_AHP + this.FundsDisbursed_in_Houses2_AHP + this.FundsDisbursed_in_Houses3_AHP + this.FundsDisbursed_in_Houses4_AHP + this.FundsDisbursed_in_Houses5_AHP;


        this.Houses_Grounded1_AHP = resultAHP[0].Houses_Grounded;
        this.Houses_Grounded2_AHP = resultAHP[1].Houses_Grounded;
        this.Houses_Grounded3_AHP = resultAHP[2].Houses_Grounded;
        this.Houses_Grounded4_AHP = resultAHP[3].Houses_Grounded;
        this.Houses_Grounded5_AHP = resultAHP[4].Houses_Grounded; // 0;//
        this.THouses_Grounded_AHP = this.Houses_Grounded1 + this.Houses_Grounded2 + this.Houses_Grounded3 + this.Houses_Grounded4 + this.Houses_Grounded5;


        this.Houses_Completed1_AHP = resultAHP[0].Houses_Completed;
        this.Houses_Completed2_AHP = resultAHP[1].Houses_Completed;
        this.Houses_Completed3_AHP = resultAHP[2].Houses_Completed;
        this.Houses_Completed4_AHP = resultAHP[3].Houses_Completed;
        this.Houses_Completed5_AHP = resultAHP[4].Houses_Completed; //0; //
        // alert(this.Houses_Completed5_AHP);



        this.THouses_Completed_AHP = this.Houses_Completed1_AHP + this.Houses_Completed2_AHP + this.Houses_Completed3_AHP + this.Houses_Completed4_AHP + this.Houses_Completed5_AHP;
        this.THouses_Completed = 0;

        this.HousesOccupied1_AHP = resultAHP[0].HousesOccupied;
        this.HousesOccupied2_AHP = resultAHP[1].HousesOccupied;
        this.HousesOccupied3_AHP = resultAHP[2].HousesOccupied;
        this.HousesOccupied4_AHP = resultAHP[3].HousesOccupied;

        this.HousesOccupied5_AHP = resultAHP[4].HousesOccupied; //0;//




        this.THousesOccupied_AHP = this.HousesOccupied1 + this.HousesOccupied2 + this.HousesOccupied3 + this.HousesOccupied4 + this.HousesOccupied5;
        this.THouseInvolvedGT = this.HouseInvolved1 + this.HouseInvolved1_AHP + this.HouseInvolved1_ISSR + this.Bene2015_16_CLSS;

        //////////////////////////////////////////
        this.Compid = "ISSR";
        this.service.sp_GetHousesStatus_ISSR_FinYearWise(0, 0, 0, "ISSR", "2014-15").subscribe(resultISSR => {

          this.HouseInvolved0_ISSR = resultISSR[0].Housesinvolved;
          this.FundsDisbursed_in_Houses0_ISSR = resultISSR[0].FundsDisbursed_in_Houses;
          this.Houses_Grounded0_ISSR = resultISSR[0].Houses_Grounded;
          this.Houses_Completed0_ISSR = resultISSR[0].Houses_Completed;
          this.HousesOccupied0_ISSR = resultISSR[0].HousesOccupied;


          this.service.sp_GetHousesStatus_ISSR_FinYearWise(this.stateCode, this.districtCodes, this.cityCodes, "ISSR", "2015-16").subscribe(result_ISSR1 => {
            this.HouseInvolved1_ISSR = result_ISSR1[0].Housesinvolved;
            this.FundsDisbursed_in_Houses1_ISSR = result_ISSR1[0].FundsDisbursed_in_Houses;
            this.Houses_Grounded1_ISSR = result_ISSR1[0].Houses_Grounded;
            this.Houses_Completed1_ISSR = result_ISSR1[0].Houses_Completed;
            this.HousesOccupied1_ISSR = result_ISSR1[0].HousesOccupied;

            this.service.sp_GetHousesStatus_ISSR_FinYearWise(this.stateCode, this.districtCodes, this.cityCodes, "ISSR", "2016-17").subscribe(result_ISSR1 => {
              this.HouseInvolved2_ISSR = result_ISSR1[0].Housesinvolved;
              this.FundsDisbursed_in_Houses2_ISSR = result_ISSR1[0].FundsDisbursed_in_Houses;
              this.Houses_Grounded2_ISSR = result_ISSR1[0].Houses_Grounded;
              this.Houses_Completed2_ISSR = result_ISSR1[0].Houses_Completed;
              this.HousesOccupied2_ISSR = result_ISSR1[0].HousesOccupied;


              this.service.sp_GetHousesStatus_ISSR_FinYearWise(this.stateCode, this.districtCodes, this.cityCodes, "ISSR", "2017-18").subscribe(result_ISSR3 => {
                this.HouseInvolved3_ISSR = result_ISSR3[0].Housesinvolved;
                this.FundsDisbursed_in_Houses3_ISSR = result_ISSR3[0].FundsDisbursed_in_Houses;
                this.Houses_Grounded3_ISSR = result_ISSR3[0].Houses_Grounded;
                this.Houses_Completed3_ISSR = result_ISSR3[0].Houses_Completed;
                this.HousesOccupied3_ISSR = result_ISSR3[0].HousesOccupied;


                this.service.sp_GetHousesStatus_ISSR_FinYearWise(this.stateCode, this.districtCodes, this.cityCodes, "ISSR", "2018-19").subscribe(result_ISSR4 => {
                  this.HouseInvolved4_ISSR = result_ISSR4[0].Housesinvolved;
                  this.FundsDisbursed_in_Houses4_ISSR = result_ISSR4[0].FundsDisbursed_in_Houses;
                  this.Houses_Grounded4_ISSR = result_ISSR4[0].Houses_Grounded;
                  this.Houses_Completed4_ISSR = result_ISSR4[0].Houses_Completed;
                  this.HousesOccupied4_ISSR = result_ISSR4[0].HousesOccupied;


                  this.service.sp_GetHousesStatus_ISSR_FinYearWise(this.stateCode, this.districtCodes, this.cityCodes, "ISSR", "2019-20").subscribe(result_ISSR5 => {
                    this.HouseInvolved5_ISSR = result_ISSR5[0].Housesinvolved;
                    this.FundsDisbursed_in_Houses5_ISSR = result_ISSR5[0].FundsDisbursed_in_Houses;
                    this.Houses_Grounded5_ISSR = result_ISSR5[0].Houses_Grounded;
                    this.Houses_Completed5_ISSR = result_ISSR5[0].Houses_Completed;
                    this.HousesOccupied5_ISSR = result_ISSR5[0].HousesOccupied;


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
                    this.service.sp_GetHousesStatusForVertical(this.stateCode).subscribe(resultJN => {
                      this.Houses_GroundedJN_T = resultJN[0].Houses_Grounded;
                      this.THouses_CompletedJN = resultJN[0].Houses_Completed;
                      this.HousesOccupiedJNT = resultJN[0].HousesOccupied;

                      this.stateCode = "0";
                      this.districtCode = "0";
                      this.cityCode = "0";

                      //    this.BindGetStatus(this.stateCode, this.districtCode, this.cityCode, this.compId);

                      this.service.GetCLSS_Houses_VerticalWise(this.stateCode).subscribe(result_CLSS => {
                        this.Bene2014_15_CLSS = result_CLSS[0].Bene2014_15;
                        //  alert(result_CLSS[0].Bene2014_15);
                        this.Bene2015_16_CLSS = result_CLSS[0].Bene2015_16;
                        this.Bene2016_17_CLSS = result_CLSS[0].Bene2016_17;
                        this.Bene2017_18_CLSS = result_CLSS[0].Bene2017_18;
                        this.Bene2018_19_CLSS = result_CLSS[0].Bene2018_19;
                        this.Bene2019_20_CLSS = result_CLSS[0].Bene2019_20;

                        this.BeneCLSS_Total = parseFloat(this.Bene2014_15_CLSS) + parseFloat(this.Bene2015_16_CLSS) + parseFloat(this.Bene2016_17_CLSS)
                          + parseFloat(this.Bene2017_18_CLSS) + parseFloat(this.Bene2018_19_CLSS) + parseFloat(this.Bene2019_20_CLSS);// +parseFloat(this.Bene2019_20_CLSS); 


                        this.Bene2020_21_CLSS = result_CLSS[0].Bene2020_21;
                        this.Bene2021_22_CLSS = result_CLSS[0].Bene2021_22;

                        //----------------------------------------------- 
                        this.HouseInvolvedT1 = this.HouseInvolved01 + this.HouseInvolved0_AHP + this.HouseInvolved0_ISSR + this.Bene2014_15_CLSS;
                        this.FundsDisbursed_in_HousesT1 = parseFloat(this.Bene2014_15_CLSS) + parseFloat(this.FundsDisbursed_in_Houses0_ISSR) +
                          parseFloat(this.FundsDisbursed_in_Houses0_AHP) + parseFloat(this.FundsDisbursed_in_Houses01);
                        this.Houses_GroundedT1 = this.Houses_GroundedJN_T + this.Bene2014_15_CLSS + this.Houses_Grounded0_ISSR + this.Houses_Grounded0_AHP + this.Houses_Grounded0;
                        this.Houses_CompletedT1 = this.THouses_CompletedJN + this.Bene2014_15_CLSS + this.Houses_Completed0_ISSR + this.Houses_Completed0_AHP + this.Houses_Completed01;
                        this.HousesOccupiedT1 = this.HousesOccupiedJNT + this.Bene2014_15_CLSS + this.HousesOccupied0_ISSR + this.HousesOccupied0_AHP + this.HousesOccupied01;




                        // alert(this.Houses_CompletedT3);

                        this.HouseInvolvedT2 = this.HouseInvolved2 + this.HouseInvolved2_AHP + this.HouseInvolved2_ISSR + this.Bene2015_16_CLSS;
                        this.FundsDisbursed_in_HousesT2 = this.TFundsDisbursed_in_Houses +
                          this.TotalFundsDisbursedAHP + this.TFundsDisbursed_in_Houses1_ISSR + this.BeneCLSS_Total;


                        this.Houses_GroundedT2 = this.Houses_Grounded1 + this.Houses_Grounded1_AHP + this.Houses_Grounded1_ISSR +
                          this.Bene2015_16_CLSS;


                        this.Houses_CompletedT3 = this.Houses_Completed2 + this.Houses_Completed2_AHP + this.Houses_Completed2_ISSR
                          + this.Bene2016_17_CLSS;




                        this.Houses_CompletedT2 = this.Houses_Completed1 + this.Houses_Completed1_AHP + this.Houses_Completed1_ISSR + this.Bene2015_16_CLSS;
                        this.HousesOccupiedT2 = this.HousesOccupied1 + this.HousesOccupied1_AHP + this.HousesOccupied1_ISSR + this.Bene2015_16_CLSS;



                        this.HouseInvolvedT3 = this.HouseInvolved3 + this.HouseInvolved3_AHP + this.HouseInvolved3_ISSR + this.Bene2016_17_CLSS;

                        this.FundsDisbursed_in_HousesT3 = this.FundsDisbursed_in_Houses2 + this.FundsDisbursed_in_Houses2_AHP +
                          this.FundsDisbursed_in_Houses2_ISSR + this.Bene2016_17_CLSS;


                        this.Houses_GroundedT3 = this.Houses_Grounded2 + this.Houses_Grounded2_AHP + this.Houses_Grounded2_ISSR
                          + this.Bene2016_17_CLSS;

                        this.HousesOccupiedT3 = this.Bene2016_17_CLSS + this.HousesOccupied2_ISSR + this.HousesOccupied2_AHP
                          + this.HousesOccupied2;


                        //  this.Houses_CompletedT3 =      this.Houses_Completed3 +    this.Houses_Completed3_AHP + this.Houses_Completed3_ISSR +this.Bene2016_17_CLSS;
                        // this.HousesOccupiedT3 =      this.HousesOccupied3 +    this.HousesOccupied3_AHP +this.HousesOccupied3_ISSR +this.Bene2016_17_CLSS;

                        // this.Houses_CompletedT3 =  this.Houses_Completed2_AHP +this.Houses_Completed2
                        //  +this.Houses_Completed2_ISSR +this.Bene2016_17_CLSS +this.Houses_CompletedT3;

                        this.Houses_CompletedT4 = this.Houses_Completed3 + this.Houses_Completed3_AHP + this.Houses_Completed3_ISSR
                          + this.Bene2017_18_CLSS;
                        //HousesOccupiedT4

                        this.HousesOccupiedT6 = parseInt(this.Bene2019_20_CLSS) + parseInt(this.HousesOccupied5_ISSR) + parseInt(this.HousesOccupied5_AHP)
                          + parseInt(this.HousesOccupied5);



                        this.HouseInvolvedT4 = this.HouseInvolved3 + this.HouseInvolved3_AHP + this.HouseInvolved3_ISSR + this.Bene2017_18_CLSS;

                        this.FundsDisbursed_in_HousesT4 = this.FundsDisbursed_in_Houses3 + this.FundsDisbursed_in_Houses3_AHP +
                          this.Bene2017_18_CLSS + this.FundsDisbursed_in_Houses3_ISSR;

                        //  this.FundsDisbursed_in_HousesT4 = this.FundsDisbursed_in_Houses3  +this.FundsDisbursed_in_Houses3_AHP
                        //     this.FundsDisbursed_in_Houses3_ISSR + this.Bene2017_18_CLSS;



                        this.Houses_GroundedT4 = this.Houses_Grounded3 + this.Houses_Grounded3_AHP + this.Bene2017_18_CLSS;
                        //this.Houses_CompletedT4 =this.Houses_Completed3 + this.Houses_Completed3_AHP +this.Bene2017_18_CLSS;

                        this.HousesOccupiedT4 = this.HousesOccupied3 + this.HousesOccupied3_AHP + this.Bene2017_18_CLSS + this.HousesOccupied3_ISSR;

                        this.HouseInvolvedT5 = this.HouseInvolved4 + this.HouseInvolved4_AHP + this.HouseInvolved4_ISSR + this.Bene2018_19_CLSS;
                        this.FundsDisbursed_in_HousesT5 = this.FundsDisbursed_in_Houses4 + this.FundsDisbursed_in_Houses4_AHP + this.Bene2018_19_CLSS;
                        this.Houses_GroundedT5 = this.Houses_Grounded4 + this.Houses_Grounded4_AHP + this.Bene2018_19_CLSS;
                        this.Houses_CompletedT5 = this.Houses_Completed4 + this.Houses_Completed4_AHP + this.Bene2018_19_CLSS;
                        this.HousesOccupiedT5 = this.HousesOccupied4 + this.HousesOccupied4_AHP + this.Bene2018_19_CLSS;


                        this.HouseInvolvedT6 = this.HouseInvolved5 + this.HouseInvolved5_AHP + this.HouseInvolved5_ISSR + this.Bene2019_20_CLSS;
                        this.FundsDisbursed_in_HousesT6 = this.FundsDisbursed_in_Houses5 + this.FundsDisbursed_in_Houses5_AHP + this.FundsDisbursed_in_Houses5_ISSR + this.Bene2019_20_CLSS;
                        this.Houses_GroundedT6 = this.Houses_Grounded5 + this.Houses_Grounded5_AHP + this.Houses_Grounded5_ISSR + this.Bene2019_20_CLSS;
                        this.Houses_CompletedT6 = this.Houses_Completed5 + this.Houses_Completed5_AHP + this.Houses_Completed5_ISSR + this.Bene2019_20_CLSS;
                        //this.HousesOccupiedT6 =this.HousesOccupied5_AHP + this.HousesOccupied5_ISSR  +this.Bene2019_20_CLSS +this.HousesOccupiedT6;


                        this.THouseInvolvedGT = this.HouseInvolvedT1 + this.HouseInvolvedT2 + this.HouseInvolvedT3 + this.HouseInvolvedT4 + this.HouseInvolvedT5 + this.HouseInvolvedT6;

                        this.THouses_GroundedGT = this.Houses_GroundedT1 + this.Houses_GroundedT2 + this.Houses_GroundedT3 + this.Houses_GroundedT4 + +this.Houses_GroundedT5 + this.Houses_GroundedT6;
                        this.THouses_CompletedGT = this.Houses_CompletedT1 + this.Houses_CompletedT2 + this.Houses_CompletedT3 + this.Houses_CompletedT4 + this.Houses_CompletedT5 + this.Houses_CompletedT6;
                        this.THousesOccupiedGT = this.HousesOccupiedT1 + this.HousesOccupiedT2 + this.HousesOccupiedT3 + this.HousesOccupiedT4 + this.HousesOccupiedT5 + this.HousesOccupiedT6;







                        this.HouseInvolvedT4 = this.Bene2017_18_CLSS + this.HouseInvolved3_ISSR + this.HouseInvolved3_AHP + this.HouseInvolved3;



                        //----------------------------- new code
                        this.THouseInvolved = this.HouseInvolved01 + this.HouseInvolved1 + this.HouseInvolved2 + this.HouseInvolved3 +
                          this.HouseInvolved4 + this.HouseInvolved5;
                        //alert(0);

                        //     this.THouseInvolved = this.HouseInvolved0 +this.HouseInvolved1 +this.HouseInvolved2 +this.HouseInvolved3 +this.HouseInvolved4 +this.HouseInvolved5;

                        //this.THouseInvolved = this.HouseInvolved01 + this.HouseInvolved1 + this.HouseInvolved2 +this.HouseInvolved3 + this.HouseInvolved4 + this.HouseInvolved5;

                        this.TFundsDisbursed_in_Houses = parseFloat(this.FundsDisbursed_in_Houses01) + parseFloat(this.FundsDisbursed_in_Houses1) + parseFloat(this.FundsDisbursed_in_Houses2)
                          + parseFloat(this.FundsDisbursed_in_Houses3) + parseFloat(this.FundsDisbursed_in_Houses4) + parseFloat(this.FundsDisbursed_in_Houses5);


                        this.THouses_Grounded = this.Houses_Grounded01 + this.Houses_Grounded1 + this.Houses_Grounded2 + this.Houses_Grounded3 + this.Houses_Grounded4 + this.Houses_Grounded5;
                        this.THouses_Completed = this.Houses_Completed01 + this.Houses_Completed1 + this.Houses_Completed2 + this.Houses_Completed3 + this.Houses_Completed4 + this.Houses_Completed5;
                        this.THousesOccupied = this.HousesOccupied01 + this.HousesOccupied1 + this.HousesOccupied2 + this.HousesOccupied3 + this.HousesOccupied4 + this.HousesOccupied5;


                        this.THouseInvolved_AHP = this.HouseInvolved0_AHP + this.HouseInvolved1_AHP + this.HouseInvolved2_AHP + this.HouseInvolved3_AHP + this.HouseInvolved4_AHP + this.HouseInvolved5_AHP;
                        this.TotalFundsDisbursedAHP = this.FundsDisbursed_in_Houses0_AHP + this.FundsDisbursed_in_Houses1_AHP + this.FundsDisbursed_in_Houses2_AHP + this.FundsDisbursed_in_Houses3_AHP + this.FundsDisbursed_in_Houses4_AHP + this.FundsDisbursed_in_Houses5_AHP;
                        this.THouses_Grounded_AHP = this.Houses_Grounded0_AHP + this.Houses_Grounded1_AHP + this.Houses_Grounded2_AHP + this.Houses_Grounded3_AHP + this.Houses_Grounded4_AHP + this.Houses_Grounded5_AHP;
                        this.THouses_Completed_AHP = this.Houses_Completed0_AHP + this.Houses_Completed1_AHP + this.Houses_Completed2_AHP + this.Houses_Completed3_AHP + this.Houses_Completed4_AHP + this.Houses_Completed5_AHP;
                        this.THousesOccupied_AHP = this.HousesOccupied0_AHP + this.HousesOccupied1_AHP + this.HousesOccupied2_AHP + this.HousesOccupied3_AHP + this.HousesOccupied4_AHP + this.HousesOccupied5_AHP;

                        this.HouseInvolvedT2 = this.HouseInvolved1 + this.HouseInvolved1_AHP + this.HouseInvolved1_ISSR + this.Bene2015_16_CLSS;


                        this.FundsDisbursed_in_HousesT2 = this.Bene2015_16_CLSS + this.FundsDisbursed_in_Houses1_ISSR +
                          this.FundsDisbursed_in_Houses1_AHP + this.FundsDisbursed_in_Houses1;
                        //this.FundsDisbursed_in_HousesT3 = this.FundsDisbursed_in_Houses2 + this.FundsDisbursed_in_Houses2_AHP + this.Bene2016_17_CLSS;

                        this.HouseInvolvedT3 = this.HouseInvolved2 + this.HouseInvolved2_AHP + this.Bene2016_17_CLSS;
                        //    this.HouseInvolvedT4 = this.HouseInvolved3 + this.HouseInvolved3_AHP + this.Bene2017_18_CLSS ;


                        this.Houses_GroundedT4 = this.Bene2017_18_CLSS + this.Houses_Grounded3_ISSR + this.Houses_Grounded3_AHP
                          + this.Houses_Grounded3;
                        this.Houses_GroundedT5 = this.Houses_Grounded4 + this.Houses_Grounded4_AHP + this.Bene2018_19_CLSS + this.Houses_Grounded4_ISSR;




                        // this.Houses_GroundedT4 = this.Houses_Grounded3 + this.Houses_Grounded3_AHP +this.Bene2017_18_CLSS;
                        // this.Houses_CompletedT4 =this.Houses_Completed3 + this.Houses_Completed3_AHP +this.Bene2017_18_CLSS;
                        // this.HousesOccupiedT4 =this.HousesOccupied3  + this.HousesOccupied3_AHP +this.Bene2017_18_CLSS;

                        this.HouseInvolvedT5 = this.HouseInvolved4_ISSR + this.HouseInvolved4 + this.HouseInvolved4_AHP
                          + this.Bene2018_19_CLSS;


                        this.THouseInvolvedGT = this.HouseInvolvedT1 + this.HouseInvolvedT2 + this.HouseInvolvedT3 + this.HouseInvolvedT4 + this.HouseInvolvedT5 + this.HouseInvolvedT6;

                        this.FundsDisbursed_in_HousesT5 = this.FundsDisbursed_in_Houses4 + this.FundsDisbursed_in_Houses4_AHP + this.Bene2018_19_CLSS;
                        this.Houses_CompletedT5 = this.Houses_Completed4 + this.Houses_Completed4_AHP + this.Houses_Completed4_ISSR + this.Bene2018_19_CLSS;
                        this.HousesOccupiedT5 = this.HousesOccupied4 + this.HousesOccupied4_AHP + this.Bene2018_19_CLSS;
                        //-------------------------------------------------------------------
                        this.THouseInvolvedGT = this.HouseInvolvedT1 + this.HouseInvolvedT2 + this.HouseInvolvedT3 + this.HouseInvolvedT4 + this.HouseInvolvedT5 + this.HouseInvolvedT6;


                        // this.TFundsDisbursed_in_HousesGT = this.FundsDisbursed_in_HousesT3 + this.FundsDisbursed_in_HousesT1 + this.FundsDisbursed_in_HousesT2  +this.FundsDisbursed_in_HousesT4 +this.FundsDisbursed_in_HousesT5;

                        //   this.HouseInvolvedT1 =this.HouseInvolved01 + this.HouseInvolved0_AHP + this.HouseInvolved0_ISSR + this.Bene2014_15_CLSS ;

                        this.HouseInvolvedT1 = this.Bene2014_15_CLSS + this.HouseInvolved0_ISSR +
                          this.HouseInvolved0_AHP + this.HouseInvolved01;

                        this.HouseInvolvedT3 = this.Bene2016_17_CLSS + this.HouseInvolved2_ISSR + this.HouseInvolved2_AHP + this.HouseInvolved2;


                        this.TFundsDisbursed_in_HousesGT = this.FundsDisbursed_in_HousesT1 + this.FundsDisbursed_in_HousesT2 +
                          this.FundsDisbursed_in_HousesT3 + this.FundsDisbursed_in_HousesT4 + this.FundsDisbursed_in_HousesT5 +
                          this.FundsDisbursed_in_HousesT6;

                        this.THouseInvolvedGT = this.HouseInvolvedT1 + this.HouseInvolvedT2 + this.HouseInvolvedT3 + this.HouseInvolvedT4 + this.HouseInvolvedT5 + this.HouseInvolvedT6;
                        this.TFundsDisbursed_in_HousesGT = this.FundsDisbursed_in_HousesT1 + this.FundsDisbursed_in_HousesT2 + this.FundsDisbursed_in_HousesT3 + this.FundsDisbursed_in_HousesT4 + this.FundsDisbursed_in_HousesT5 + this.FundsDisbursed_in_HousesT6;
                        this.THouses_GroundedGT = this.Houses_GroundedT1 + this.Houses_GroundedT2 + this.Houses_GroundedT3 + this.Houses_GroundedT4 + this.Houses_GroundedT5 + this.Houses_GroundedT6;
                        this.THouses_CompletedGT = this.Houses_CompletedT1 + this.Houses_CompletedT2 + this.Houses_CompletedT3 + this.Houses_CompletedT4 + this.Houses_CompletedT5 + this.Houses_CompletedT6;
                        this.THousesOccupiedGT = this.HousesOccupiedT1 + this.HousesOccupiedT2 + this.HousesOccupiedT3 + this.HousesOccupiedT4 + this.HousesOccupiedT5 + this.HousesOccupiedT6;

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

  openModalDialog(cid, year, type) {
    this.StateName = this.StateName;
    this.Year = year;
    this.Cid = cid;
    if (cid == "JNNURM") {
      this.service.sp_GetHousesStatusForVerticalJN(this.stateCode, "0", "0").subscribe(resut => {
        this.lstHousesStatus = resut;
        this.display = 'block';
      })
    }
    else {
      this.service.sp_GetDetailsDataPopUp(this.stateCode, cid, year, type).subscribe(resut => {
        this.lstHousesStatus = resut;
        this.display = 'block';
      })
    }
  }

  checkForm($event) {
    debugger;
    this.RdStatus = $event.target.value;
    if (this.RdStatus === 'Phy1') {

      this.router.navigate(['/Admin/VerticalHousesDetails'])
    }
    else {
      this.router.navigate(['/Admin/VerticalFinancialDetails'])
    }
  }
  closeModalDialog() {
    this.display = 'none';
  }
  AdminPage() {
    this.router.navigate(['/Admin/ConsphyfinChart1']);
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

  HSubjConst($event) {
    var data: string;
    const checked = $event.target.checked;
    if (checked) {
      this.SConst = 'table-cell';
    }
    else {
      this.SConst = 'none';
    }
  }
  CASanct($event) {
    var data: string;
    const checked = $event.target.checked;
    if (checked) {
      this.FundsFirst = 'table-cell';
      this.ReleasedFundsCol = this.ReleasedFundsCol + 1
    }
    else {
      this.FundsFirst = 'none';
      this.ReleasedFundsCol = this.ReleasedFundsCol - 1
    }
  }
  CASanct2($event) {
    var data: string;
    const checked = $event.target.checked;
    if (checked) {
      this.FundsSecond = 'table-cell';
      this.ReleasedFundsCol = this.ReleasedFundsCol + 1
    }
    else {
      this.FundsSecond = 'none';
      this.ReleasedFundsCol = this.ReleasedFundsCol - 1
    }
  }

  CASanct3($event) {
    var data: string;
    const checked = $event.target.checked;
    if (checked) {
      this.FundsThird = 'table-cell';
      this.ReleasedFundsCol = this.ReleasedFundsCol + 1

    }
    else {
      this.FundsThird = 'none';
      this.ReleasedFundsCol = this.ReleasedFundsCol - 1
    }
  }
  sendGround($event) {
    var data: string;
    const checked = $event.target.checked;
    if (checked) {
      this.Grounded = 'table-cell';
    }
    else {
      this.Grounded = 'none';
    }
  }
  sendComp($event) {
    var data: string;
    const checked = $event.target.checked;
    if (checked) {
      this.Completed = 'table-cell';
    }
    else {
      this.Completed = 'none';
    }
  }

  sendOccu($event) {
    var data: string;
    const checked = $event.target.checked;
    if (checked) {
      this.Occupied = 'table-cell';
    }
    else {
      this.Occupied = 'none';
    }
  }
  GetFilterDatanew(stateCode, districtCodes, cityCodes, Compid) {
    //alert(stateCode);
    this.blc_1415_1 = 0;
    this.blc_1415_2 = 0;
    this.blc_1516_1 = 0;
    this.blc_1516_2 = 0;
    this.blc_1617_1 = 0;
    this.blc_1617_2 = 0;

    this.blc_1718_1 = 0;
    this.blc_1718_2 = 0;
    this.blc_1819_1 = 0;
    this.blc_1819_2 = 0;
    this.blc_1920_1 = 0;
    this.blc_1920_2 = 0;

    this.AHP_1415_1 = 0;
    this.AHP_1415_2 = 0;

    this.AHP_1516_1 = 0;
    this.AHP_1516_1 = 0;
    this.AHP_1617_1 = 0;
    this.AHP_1617_1 = 0;
    this.AHP_1718_1 = 0;
    this.AHP_1718_1 = 0;
    this.AHP_1819_1 = 0;
    this.AHP_1819_1 = 0;
    this.Houses_GroundedJN_T = 0;
    this.THouses_CompletedJN = 0;
    this.HousesOccupiedJNT = 0;


    // Block 14-15 Col 1
    this.HouseInvolvedT1 = 0;
    this.HouseInvolved01 = 0;
    this.HouseInvolved0_AHP = 0;
    this.HouseInvolved0_ISSR = 0;
    this.Bene2014_15_CLSS = 0;
    this.HouseInvolvedT2 = 0;
    this.HouseInvolved1 = 0;
    this.HouseInvolved1_AHP = 0;
    this.HouseInvolved1_ISSR = 0;
    this.Bene2015_16_CLSS = 0;
    this.HouseInvolvedT3 = 0;
    this.HouseInvolved2 = 0;
    this.HouseInvolved2_AHP = 0;
    this.HouseInvolved2_ISSR = 0;
    this.Bene2016_17_CLSS = 0;
    this.HouseInvolvedT4 = 0;
    this.HouseInvolved3 = 0;
    this.HouseInvolved3_AHP = 0;
    this.HouseInvolved3_ISSR = 0;
    this.Bene2017_18_CLSS = 0;
    this.HouseInvolvedT5 = 0;
    this.HouseInvolved4 = 0;
    this.HouseInvolved4_AHP = 0;
    this.HouseInvolved4_ISSR = 0;
    this.Bene2018_19_CLSS = 0;
    this.HouseInvolvedT6 = 0;
    this.HouseInvolved5 = 0;
    this.HouseInvolved5_AHP = 0;
    this.HouseInvolved5_ISSR = 0;
    this.Bene2019_20_CLSS = 0;



    this.THouseInvolved1_ISSR = 0;
    this.TFundsDisbursed_in_Houses1_ISSR = 0;
    this.ISSR_1_TOT = 0;
    this.ISSR_2_TOT = 0;
    this.THouses_Grounded1_ISSR = 0;
    this.THouses_Completed1_ISSR = 0;
    this.THousesOccupied1_ISSR = 0;

    this.ISSR_1516_1 = 0;
    this.ISSR_1516_2 = 0;

    this.HouseInvolved2_ISSR = 0;
    this.FundsDisbursed_in_Houses2_ISSR = 0;
    this.ISSR_1617_1 = 0;
    this.ISSR_1617_2 = 0;
    this.Houses_Grounded2_ISSR = 0;
    this.Houses_Completed2_ISSR = 0;
    this.HousesOccupied2_ISSR = 0;


    this.HouseInvolved3_ISSR = 0;
    this.FundsDisbursed_in_Houses3_ISSR = 0;
    this.ISSR_1718_1 = 0;
    this.ISSR_1718_2 = 0;
    this.Houses_Grounded3_ISSR = 0;
    this.Houses_Completed3_ISSR = 0;
    this.HousesOccupied3_ISSR = 0;


    this.HouseInvolved4_ISSR = 0;
    this.FundsDisbursed_in_Houses4_ISSR = 0;
    this.ISSR_1718_1 = 0;
    this.ISSR_1718_2 = 0;
    this.Houses_Grounded4_ISSR = 0;
    this.Houses_Completed4_ISSR = 0;
    this.HousesOccupied4_ISSR = 0;

    this.Bene2014_15_CLSS = 0;
    this.Bene2015_16_CLSS = 0;
    this.Bene2016_17_CLSS = 0;
    this.Bene2017_18_CLSS = 0;
    this.Bene2018_19_CLSS = 0;
    this.Bene2019_20_CLSS = 0;

    //---------------------------------------------------------------
    this.HouseInvolved0_AHP = 0;
    this.FundsDisbursed_in_Houses0_AHP = 0;
    this.AHP_1415_1 = 0;
    this.AHP_1415_2 = 0;
    this.Houses_Grounded0_AHP = 0;
    this.Houses_Completed0_AHP = 0;
    this.HousesOccupied0_AHP = 0;

    this.HouseInvolved1_AHP = 0;
    this.FundsDisbursed_in_Houses1_AHP = 0;
    this.AHP_1516_1 = 0;
    this.AHP_1516_2 = 0;
    this.Houses_Grounded1_AHP = 0;
    this.Houses_Completed1_AHP = 0;
    this.HousesOccupied1_AHP = 0;

    this.HouseInvolved2_AHP = 0;
    this.FundsDisbursed_in_Houses2_AHP = 0;
    this.AHP_1617_1 = 0;
    this.AHP_1617_2 = 0;
    this.Houses_Grounded2_AHP = 0;
    this.Houses_Completed2_AHP = 0;
    this.HousesOccupied2_AHP = 0;

    this.HouseInvolved3_AHP = 0;
    this.FundsDisbursed_in_Houses3_AHP = 0;
    this.AHP_1718_1 = 0;
    this.AHP_1718_2 = 0;
    this.Houses_Grounded3_AHP = 0;
    this.Houses_Completed3_AHP = 0;
    this.HousesOccupied3_AHP = 0;

    this.HouseInvolved4_AHP = 0;
    this.FundsDisbursed_in_Houses4_AHP = 0;
    this.AHP_1819_1 = 0;
    this.AHP_1819_2 = 0;
    this.Houses_Grounded4_AHP = 0;
    this.Houses_Completed4_AHP = 0;
    this.HousesOccupied4_AHP = 0;

    this.HouseInvolved5_AHP = 0;
    this.FundsDisbursed_in_Houses5_AHP = 0;
    this.AHP_1920_1 = 0;
    this.AHP_1920_2 = 0;
    this.Houses_Grounded5_AHP = 0;
    this.Houses_Completed5_AHP = 0;
    this.HousesOccupied5_AHP = 0;
    //---------------------------------------------------------------


    this.HouseInvolved5_ISSR = 0;
    this.FundsDisbursed_in_Houses5_ISSR = 0;
    this.ISSR_1819_1 = 0;
    this.ISSR_1819_2 = 0;
    this.Houses_Grounded5_ISSR = 0;
    this.Houses_Completed5_ISSR = 0;
    this.HousesOccupied5_ISSR = 0;

    this.THouseInvolved1_ISSR = 0;
    this.TFundsDisbursed_in_Houses1_ISSR = 0;
    this.ISSR_1_TOT = 0;
    this.ISSR_2_TOT = 0;
    this.THouses_Grounded1_ISSR = 0;
    this.THouses_Completed1_ISSR = 0;
    this.THousesOccupied1_ISSR = 0;


    this.ISSR_1920_1 = 0;
    this.ISSR_1920_2 = 0;

    // 15- 16  col2
    this.FundsDisbursed_in_HousesT1 = 0;
    this.FundsDisbursed_in_Houses01 = 0;
    this.HouseInvolved0_AHP = 0;
    this.HouseInvolved0_ISSR = 0;
    this.Bene2014_15_CLSS = 0;
    this.FundsDisbursed_in_HousesT2 = 0;
    this.FundsDisbursed_in_Houses1 = 0;
    this.FundsDisbursed_in_Houses1_AHP = 0;
    this.FundsDisbursed_in_Houses1_ISSR = 0;
    this.Bene2015_16_CLSS = 0;
    this.FundsDisbursed_in_HousesT3 = 0;
    this.FundsDisbursed_in_Houses2 = 0;
    this.FundsDisbursed_in_Houses2_AHP = 0;
    this.FundsDisbursed_in_Houses2_ISSR = 0;
    this.Bene2016_17_CLSS = 0;
    this.FundsDisbursed_in_HousesT4 = 0;
    this.FundsDisbursed_in_Houses3 = 0;
    this.FundsDisbursed_in_Houses3_AHP = 0;
    this.FundsDisbursed_in_Houses3_ISSR = 0;
    this.Bene2017_18_CLSS = 0;
    this.FundsDisbursed_in_HousesT5 = 0;
    this.FundsDisbursed_in_Houses4 = 0;
    this.FundsDisbursed_in_Houses4_AHP = 0;
    this.FundsDisbursed_in_Houses4_ISSR = 0;
    this.Bene2018_19_CLSS = 0;
    this.FundsDisbursed_in_HousesT6 = 0;
    this.FundsDisbursed_in_Houses5 = 0;
    this.FundsDisbursed_in_Houses5_AHP = 0;
    this.FundsDisbursed_in_Houses5_ISSR = 0;
    this.Bene2019_20_CLSS = 0;
    this.TFundsDisbursed_in_HousesGT = 0;
    this.FundsDisbursed_in_HousesT1 = 0;
    this.FundsDisbursed_in_HousesT2 = 0;
    this.FundsDisbursed_in_HousesT3 = 0;
    this.FundsDisbursed_in_HousesT4 = 0;
    this.FundsDisbursed_in_HousesT5 = 0;
    this.FundsDisbursed_in_HousesT6 = 0;

    this.Houses_GroundedT1 = 0;
    this.Houses_Grounded0 = 0;
    this.Houses_Grounded0_AHP = 0;
    this.Houses_Grounded0_ISSR = 0;
    this.Bene2014_15_CLSS = 0;
    this.Houses_GroundedJN_T = 0;
    this.Houses_GroundedT2 = 0;
    this.Houses_Grounded1 = 0;
    this.Houses_Grounded1_AHP = 0;
    this.Houses_Grounded1_ISSR = 0;
    this.Bene2015_16_CLSS = 0;
    this.Houses_GroundedT3 = 0;
    this.Houses_Grounded2 = 0;
    this.Houses_Grounded2_AHP = 0;
    this.Houses_Grounded2_ISSR = 0;
    this.Bene2016_17_CLSS = 0;
    this.Houses_GroundedT4 = 0;
    this.Houses_Grounded3 = 0;
    this.Houses_Grounded3_AHP = 0;
    this.Houses_Grounded3_ISSR = 0;
    this.Bene2017_18_CLSS = 0;
    this.Houses_GroundedT5 = 0;
    this.Houses_Grounded4 = 0;
    this.Houses_Grounded4_AHP = 0;
    this.Houses_Grounded4_ISSR = 0;
    this.Bene2018_19_CLSS = 0;
    this.Houses_GroundedT6 = 0;
    this.Houses_Grounded5 = 0;
    this.Houses_Grounded5_AHP = 0;
    this.Houses_Grounded5_ISSR = 0;
    this.Bene2019_20_CLSS = 0;
    this.THouses_GroundedGT = 0;
    this.Houses_GroundedT1 = 0;
    this.Houses_GroundedT2 = 0;
    this.Houses_GroundedT3 = 0;
    this.Houses_GroundedT4 = 0;
    this.Houses_GroundedT5 = 0;
    this.Houses_GroundedT6 = 0;

    this.Houses_CompletedT1 = 0;
    this.Houses_Completed01 = 0;
    this.Houses_Completed0_AHP = 0;
    this.Houses_Completed0_ISSR = 0;
    this.Bene2014_15_CLSS = 0;
    this.THouses_CompletedJN = 0;
    this.Houses_CompletedT2 = 0;
    this.Houses_Completed1 = 0;
    this.Houses_Completed1_AHP = 0;
    this.Houses_Completed1_ISSR = 0;
    this.Bene2015_16_CLSS = 0;
    this.Houses_CompletedT3 = 0;
    this.Houses_Completed2 = 0;
    this.Houses_Completed2_AHP = 0;
    this.Houses_Completed2_ISSR = 0;
    this.Bene2016_17_CLSS = 0;
    this.Houses_CompletedT4 = 0;
    this.Houses_Completed3 = 0;
    this.Houses_Completed3_AHP = 0;
    this.Houses_Completed3_ISSR = 0;
    this.Bene2017_18_CLSS = 0;
    this.Houses_CompletedT5 = 0;
    this.Houses_Completed4 = 0;
    this.Houses_Completed4_AHP = 0;
    this.Houses_Completed4_ISSR = 0;
    this.Bene2018_19_CLSS = 0;
    this.Houses_CompletedT6 = 0;
    this.Houses_Completed5 = 0;
    this.Houses_Completed5_AHP = 0;
    this.Houses_Completed5_ISSR = 0;
    this.Bene2019_20_CLSS = 0;
    this.THouses_CompletedGT = 0;
    this.Houses_CompletedT1 = 0;
    this.Houses_CompletedT2 = 0;
    this.Houses_CompletedT3 = 0;
    this.Houses_CompletedT4 = 0;
    this.Houses_CompletedT5 = 0;
    this.Houses_CompletedT6 = 0;

    this.HousesOccupiedT1 = 0;
    this.HousesOccupied01 = 0;
    this.HousesOccupied0_AHP = 0;
    this.HousesOccupied0_ISSR = 0;
    this.Bene2014_15_CLSS = 0;
    this.HousesOccupiedJNT = 0;
    this.HousesOccupiedT2 = 0;
    this.HousesOccupied1 = 0;
    this.HousesOccupied1_AHP = 0;
    this.HousesOccupied1_ISSR = 0;
    this.Bene2015_16_CLSS = 0;
    this.HousesOccupiedT3 = 0;
    this.HousesOccupied2 = 0;
    this.HousesOccupied2_AHP = 0;
    this.HousesOccupied2_ISSR = 0;
    this.Bene2016_17_CLSS = 0;
    this.HousesOccupiedT4 = 0;
    this.HousesOccupied3 = 0;
    this.HousesOccupied3_AHP = 0;
    this.HousesOccupied3_ISSR = 0;
    this.Bene2017_18_CLSS = 0;
    this.HousesOccupiedT5 = 0;
    this.HousesOccupied4 = 0;
    this.HousesOccupied4_AHP = 0;
    this.HousesOccupied4_ISSR = 0;
    this.Bene2018_19_CLSS = 0;
    this.HousesOccupiedT6 = 0;
    this.HousesOccupied5 = 0;
    this.HousesOccupied5_AHP = 0;
    this.HousesOccupied5_ISSR = 0;
    this.Bene2019_20_CLSS = 0;
    this.THousesOccupiedGT = 0;
    this.HousesOccupiedT1 = 0;
    this.HousesOccupiedT2 = 0;
    this.HousesOccupiedT3 = 0;
    this.HousesOccupiedT4 = 0;
    this.HousesOccupiedT5 = 0;
    this.HousesOccupiedT6 = 0;
    this.HouseInvolved01 = 0;
    this.HouseInvolved1 = 0;
    this.HouseInvolved2 = 0;
    this.HouseInvolved3 = 0;
    this.HouseInvolved4 = 0;
    this.HouseInvolved5 = 0;
    this.HouseInvolved6 = 0;
    this.THouseInvolved = 0;

    this.TFundsDisbursed_in_Houses = 0;
    this.FundsDisbursed_in_Houses01 = 0;
    this.FundsDisbursed_in_Houses2_ISSR = 0;
    this.FundsDisbursed_in_Houses1 = 0;
    this.FundsDisbursed_in_Houses2 = 0;
    this.FundsDisbursed_in_Houses3 = 0;
    this.FundsDisbursed_in_Houses4 = 0;
    this.FundsDisbursed_in_Houses5 = 0;
    this.Houses_Grounded1 = 0;
    this.Houses_Grounded2 = 0;
    this.Houses_Grounded3 = 0;
    this.Houses_Grounded4 = 0;
    this.Houses_Grounded5 = 0;

    this.THouses_Grounded = 0;
    this.Houses_Completed1 = 0;
    this.Houses_Completed2 = 0;
    this.Houses_Completed3 = 0;
    this.Houses_Completed4 = 0;
    this.Houses_Completed5 = 0;
    this.THouses_Completed = 0;
    this.HousesOccupied1 = 0;
    this.HousesOccupied2 = 0;
    this.HousesOccupied3 = 0;
    this.HousesOccupied4 = 0;
    this.HousesOccupied5 = 0;
    this.FundsDisbursed_in_Houses1_AHP = 0;
    this.FundsDisbursed_in_Houses2_AHP = 0;
    this.FundsDisbursed_in_Houses3_AHP = 0;
    this.FundsDisbursed_in_Houses4_AHP = 0;
    this.FundsDisbursed_in_Houses5_AHP = 0;
    this.TotalFundsDisbursedAHP = 0;

    this.FundsDisbursed_in_Houses01 = 0;
    this.Houses_Grounded01 = 0;
    this.Houses_Completed01 = 0;
    this.HousesOccupied01 = 0;
    this.HouseInvolvedT1 = 0;

    this.THouseInvolved1_ISSR = 0;
    this.TFundsDisbursed_in_Houses1_ISSR = 0;
    this.THouses_Grounded1_ISSR = 0;
    this.THouses_Completed1_ISSR = 0;
    this.THousesOccupied1_ISSR = 0;



    this.ISSR_1516_1 = 0;

    this.ISSR_1516_2 = 0;
    this.ISSR_1_TOT = 0;
    this.ISSR_2_TOT = 0;

    this.ISSR_1617_1 = 0;

    this.ISSR_1617_2 = 0;

    this.HouseInvolvedT1 = 0;
    this.FundsDisbursed_in_HousesT1 = 0;
    this.PMAY1415_1 = 0;
    this.PMAY1415_2 = 0;
    this.Houses_GroundedT1 = 0;
    this.Houses_CompletedT1 = 0;
    this.HousesOccupiedT1 = 0;




    this.ISSR_1718_1 = 0;


    this.ISSR_1718_2 = 0;



    this.ISSR_1819_1 = 0;

    this.ISSR_1819_2 = 0;

    this.ISSR_1920_1 = 0;

    this.ISSR_1920_2 = 0;


    this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "BLCS", "2014-15").subscribe(result_BLCS => {
      try {
        this.HouseInvolved01 = result_BLCS[0].Housesinvolved;
        // alert(0);
        this.FundsDisbursed_in_Houses01 = result_BLCS[0].FundsDisbursed_in_Houses;
        this.Houses_Grounded01 = result_BLCS[0].Houses_Grounded;
        this.Houses_Completed01 = result_BLCS[0].Houses_Completed;
        this.HousesOccupied01 = result_BLCS[0].HousesOccupied;
        this.HousesOccupied01 = result_BLCS[0].First_Houses;
        this.blc_1415_1 = result_BLCS[0].Second_Houses;
        this.blc_1415_2 = result_BLCS[0].Third_Houses;
      }
      catch{ }
      finally { }

      // this.service.GetFinancialPMAY_Data(stateCode,districtCodes ,cityCodes,"BLCS","2014-15").subscribe(result_Fin14=>{
      //   try { 
      //       this.First_BLC14 = result_Fin14[0].FirstInstallmentReleased;
      //       this.Second_BLC14 = result_Fin14[0].SecondInstallmentReleased;
      //       this.Third_BLC14 = result_Fin14[0].ThirdInstallmentReleased;

      //   }
      //   catch{}
      //   finally{}
      //alert();
      this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "BLCS", "2015-16").subscribe(result_BLCS15 => {
        try {
          this.HouseInvolved1 = result_BLCS15[0].Housesinvolved;
          this.fistNumber = this.HouseInvolved1;
          this.FundsDisbursed_in_Houses1 = result_BLCS15[0].FundsDisbursed_in_Houses;
          this.Houses_Grounded1 = result_BLCS15[0].Houses_Grounded;
          this.Houses_Completed1 = result_BLCS15[0].Houses_Completed;
          this.HousesOccupied1 = result_BLCS15[0].HousesOccupied;
          this.blc_1516_1 = result_BLCS15[0].Second_Houses;
          this.blc_1516_2 = result_BLCS15[0].Third_Houses;

        }
        catch{ }
        finally { }

        this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "BLCS", "2016-17").subscribe(result_BLCS16 => {
          try {
            this.HouseInvolved2 = result_BLCS16[0].Housesinvolved;
            this.secondNumber = this.HouseInvolved2;
            this.FundsDisbursed_in_Houses2 = result_BLCS16[0].FundsDisbursed_in_Houses;
            this.Houses_Grounded2 = result_BLCS16[0].Houses_Grounded;
            this.Houses_Completed2 = result_BLCS16[0].Houses_Completed;
            this.HousesOccupied2 = result_BLCS16[0].HousesOccupied;
            this.blc_1617_1 = result_BLCS16[0].Second_Houses;
            this.blc_1617_2 = result_BLCS16[0].Third_Houses;

          }
          catch{ }
          finally { }

          this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "BLCS", "2017-18").subscribe(result_BLCS17 => {
            try {
              this.HouseInvolved3 = result_BLCS17[0].Housesinvolved;
              this.FundsDisbursed_in_Houses3 = result_BLCS17[0].FundsDisbursed_in_Houses;
              this.Houses_Grounded3 = result_BLCS17[0].Houses_Grounded;
              this.Houses_Completed3 = result_BLCS17[0].Houses_Completed;
              this.HousesOccupied3 = result_BLCS17[0].HousesOccupied;
              this.blc_1718_1 = result_BLCS17[0].Second_Houses;
              this.blc_1718_2 = result_BLCS17[0].Third_Houses;
            }
            catch{ }
            finally { }

            //     })
            // alert();
            this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "BLCS", "2018-19").subscribe(result_BLCS18 => {
              try {
                this.HouseInvolved4 = result_BLCS18[0].Housesinvolved;
                this.FundsDisbursed_in_Houses4 = result_BLCS18[0].FundsDisbursed_in_Houses;
                this.Houses_Grounded4 = result_BLCS18[0].Houses_Grounded;
                this.Houses_Completed4 = result_BLCS18[0].Houses_Completed;
                this.HousesOccupied4 = result_BLCS18[0].HousesOccupied;

                this.blc_1819_1 = result_BLCS18[0].Second_Houses;
                this.blc_1819_2 = result_BLCS18[0].Third_Houses;

              }
              catch{ }
              finally { }

              this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "BLCS", "2019-20").subscribe(result_BLCS19 => {
                try {
                  this.HouseInvolved5 = result_BLCS19[0].Housesinvolved;
                  this.FundsDisbursed_in_Houses5 = result_BLCS19[0].FundsDisbursed_in_Houses;
                  this.Houses_Grounded5 = result_BLCS19[0].Houses_Grounded;
                  this.Houses_Completed5 = result_BLCS19[0].Houses_Completed;
                  this.HousesOccupied5 = result_BLCS19[0].HousesOccupied;

                  this.blc_1920_1 = result_BLCS19[0].Second_Houses;
                  this.blc_1920_2 = result_BLCS19[0].Third_Houses;
                }
                catch{ }
                finally { }

                // THouseInvolved HouseInvolved01  HouseInvolved1 HouseInvolved2 HouseInvolved3 HouseInvolved4 HouseInvolved5
                //Block 1 total
                this.blc_1_TOT = this.blc_1415_1 + this.blc_1516_1 + this.blc_1617_1 + this.blc_1718_1 + this.blc_1819_1 + this.blc_1920_1;
                this.blc_2_TOT = this.blc_1415_2 + this.blc_1516_2 + this.blc_1617_2 + this.blc_1718_2 + this.blc_1819_2 + this.blc_1920_2;



                this.THouseInvolved = this.HouseInvolved01 + this.HouseInvolved1 + this.HouseInvolved2 + this.HouseInvolved3 + this.HouseInvolved4 + this.HouseInvolved5;
                this.TFundsDisbursed_in_Houses = this.FundsDisbursed_in_Houses01 + this.FundsDisbursed_in_Houses1 + this.FundsDisbursed_in_Houses2 + this.FundsDisbursed_in_Houses3 + this.FundsDisbursed_in_Houses4 + this.FundsDisbursed_in_Houses5;
                this.THouses_Grounded = this.Houses_Grounded01 + this.Houses_Grounded1 + this.Houses_Grounded2 + this.Houses_Grounded3 + this.Houses_Grounded4 + this.Houses_Grounded5;
                this.THouses_Completed = this.Houses_Completed01 + this.Houses_Completed1 + this.Houses_Completed2 + this.Houses_Completed3 + this.Houses_Completed4 + this.Houses_Completed5;
                this.THousesOccupied = this.HousesOccupied01 + this.HousesOccupied1 + this.HousesOccupied2 + this.HousesOccupied3 + this.HousesOccupied4 + this.HousesOccupied5;

                //----------------------------------------Block 1 End

                this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "AHP", "2014-15").subscribe(result_AHP => {
                  try {
                    this.HouseInvolved0_AHP = result_AHP[0].Housesinvolved;
                    this.FundsDisbursed_in_Houses0_AHP = result_AHP[0].FundsDisbursed_in_Houses;
                    this.Houses_Grounded0_AHP = result_AHP[0].Houses_Grounded;
                    this.Houses_Completed0_AHP = result_AHP[0].Houses_Completed;
                    this.HousesOccupied0_AHP = result_AHP[0].HousesOccupied;
                    this.AHP_1415_1 = result_AHP[0].Second_Houses;
                    this.AHP_1415_2 = result_AHP[0].Third_Houses;

                  }
                  catch{ }
                  finally { }
                  // })
                  //           alert(6);
                  this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "AHP", "2015-16").subscribe(result_AHP15 => {
                    try {
                      this.HouseInvolved1_AHP = result_AHP15[0].Housesinvolved;
                      this.FundsDisbursed_in_Houses1_AHP = result_AHP15[0].FundsDisbursed_in_Houses;
                      this.Houses_Grounded1_AHP = result_AHP15[0].Houses_Grounded;
                      this.Houses_Completed1_AHP = result_AHP15[0].Houses_Completed;
                      this.HousesOccupied1_AHP = result_AHP15[0].HousesOccupied;
                      this.AHP_1516_1 = result_AHP15[0].Second_Houses;
                      this.AHP_1516_2 = result_AHP15[0].Third_Houses;
                    }
                    catch{ }
                    finally { }
                    // })         

                    //           alert(7);
                    this.HouseInvolved2_AHP = 0;
                    this.FundsDisbursed_in_Houses2_AHP = 0;
                    this.Houses_Grounded2_AHP = 0;
                    this.Houses_Completed2_AHP = 0;
                    this.HousesOccupied2_AHP = 0;
                    this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "AHP", "2016-17").subscribe(result_AHP16 => {
                      try {
                        this.HouseInvolved2_AHP = result_AHP16[0].Housesinvolved;
                        this.FundsDisbursed_in_Houses2_AHP = result_AHP16[0].FundsDisbursed_in_Houses;
                        this.Houses_Grounded2_AHP = result_AHP16[0].Houses_Grounded;
                        this.Houses_Completed2_AHP = result_AHP16[0].Houses_Completed;
                        this.HousesOccupied2_AHP = result_AHP16[0].HousesOccupied;

                        this.AHP_1617_1 = result_AHP16[0].Second_Houses;
                        this.AHP_1617_2 = result_AHP16[0].Third_Houses;

                      }
                      catch{ }
                      finally { }
                      // })         
                      //             alert(8);
                      this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "AHP", "2017-18").subscribe(result_AHP17 => {
                        try {
                          this.HouseInvolved3_AHP = result_AHP17[0].Housesinvolved;
                          this.FundsDisbursed_in_Houses3_AHP = result_AHP17[0].FundsDisbursed_in_Houses;
                          this.Houses_Grounded3_AHP = result_AHP17[0].Houses_Grounded;
                          this.Houses_Completed3_AHP = result_AHP17[0].Houses_Completed;
                          this.HousesOccupied3_AHP = result_AHP17[0].HousesOccupied;

                          this.AHP_1718_1 = result_AHP17[0].Second_Houses;
                          this.AHP_1718_2 = result_AHP17[0].Third_Houses;
                        }
                        catch{ }
                        finally { }
                        //})      
                        //                  alert(9);
                        this.HouseInvolved4_AHP = 0;
                        this.FundsDisbursed_in_Houses4_AHP = 0;
                        this.Houses_Grounded4_AHP = 0;
                        this.Houses_Completed4_AHP = 0;
                        this.HousesOccupied4_AHP = 0;
                        this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "AHP", "2018-19").subscribe(result_AHP18 => {
                          try {
                            this.HouseInvolved4_AHP = result_AHP18[0].Housesinvolved;
                            this.FundsDisbursed_in_Houses4_AHP = result_AHP18[0].FundsDisbursed_in_Houses;
                            this.Houses_Grounded4_AHP = result_AHP18[0].Houses_Grounded;
                            this.Houses_Completed4_AHP = result_AHP18[0].Houses_Completed;
                            this.HousesOccupied4_AHP = result_AHP18[0].HousesOccupied;

                            this.AHP_1819_1 = result_AHP18[0].Second_Houses;
                            this.AHP_1819_2 = result_AHP18[0].Third_Houses;
                          }
                          catch{ }
                          finally { }
                          //})           
                          //                 alert(10);
                          this.HouseInvolved5_AHP = 0;
                          this.FundsDisbursed_in_Houses5_AHP = 0;
                          this.Houses_Grounded5_AHP = 0;
                          this.Houses_Completed5_AHP = 0;
                          this.HousesOccupied5_AHP = 0;

                          this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "AHP", "2019-20").subscribe(result_AHP19 => {
                            try {
                              this.HouseInvolved5_AHP = result_AHP19[0].Housesinvolved;
                              this.FundsDisbursed_in_Houses5_AHP = result_AHP19[0].FundsDisbursed_in_Houses;
                              this.Houses_Grounded5_AHP = result_AHP19[0].Houses_Grounded;
                              this.Houses_Completed5_AHP = result_AHP19[0].Houses_Completed;
                              this.HousesOccupied5_AHP = result_AHP19[0].HousesOccupied;

                              this.AHP_1920_1 = result_AHP19[0].Second_Houses;
                              this.AHP_1920_2 = result_AHP19[0].Third_Houses;

                            }
                            catch{ }
                            finally { }

                            this.AHP_1_TOT = this.AHP_1415_1 + this.AHP_1516_1 + this.AHP_1617_1 + this.AHP_1718_1 + this.AHP_1819_1 + this.AHP_1920_1;
                            this.AHP_2_TOT = this.AHP_1415_2 + this.AHP_1516_2 + this.AHP_1617_2 + this.AHP_1718_2 + this.AHP_1819_2 + this.AHP_1920_2;

                            this.THouseInvolved_AHP = this.HouseInvolved0_AHP + this.HouseInvolved1_AHP + this.HouseInvolved2_AHP + this.HouseInvolved3_AHP + this.HouseInvolved4_AHP + this.HouseInvolved5_AHP;
                            this.TotalFundsDisbursedAHP = this.FundsDisbursed_in_Houses0_AHP + this.FundsDisbursed_in_Houses1_AHP + this.FundsDisbursed_in_Houses2_AHP + this.FundsDisbursed_in_Houses3_AHP + this.FundsDisbursed_in_Houses4_AHP + this.FundsDisbursed_in_Houses5_AHP;
                            this.THouses_Grounded_AHP = this.Houses_Grounded0_AHP + this.Houses_Grounded1_AHP + this.Houses_Grounded2_AHP + this.Houses_Grounded3_AHP + this.Houses_Grounded4_AHP + this.Houses_Grounded5_AHP;
                            this.THouses_Completed_AHP = this.Houses_Completed0_AHP + this.Houses_Completed1_AHP + this.Houses_Completed2_AHP + this.Houses_Completed3_AHP + this.Houses_Completed4_AHP + this.Houses_Completed5_AHP;
                            this.THousesOccupied_AHP = this.HousesOccupied0_AHP + this.HousesOccupied1_AHP + this.HousesOccupied2_AHP + this.HousesOccupied3_AHP + this.HousesOccupied4_AHP + this.HousesOccupied5_AHP;

                            //-------------------------------ISSR        
                            this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode, districtCodes, cityCodes, "ISSR", "2014-15").subscribe(result_ISSR0 => {
                              this.HouseInvolved0_ISSR = result_ISSR0[0].Housesinvolved;
                              this.FundsDisbursed_in_Houses0_ISSR = result_ISSR0[0].FundsDisbursed_in_Houses;
                              this.Houses_Grounded0_ISSR = result_ISSR0[0].Houses_Grounded;
                              this.Houses_Completed0_ISSR = result_ISSR0[0].Houses_Completed;
                              this.HousesOccupied0_ISSR = result_ISSR0[0].HousesOccupied;

                              this.ISSR_1415_1 = result_ISSR0[0].Second_Houses;
                              this.ISSR_1415_2 = result_ISSR0[0].Third_Houses;
                              // alert(this.ISSR_1415_2 ); 
                              this.service.sp_GetRayHouses(stateCode, districtCodes, cityCodes, "2014-15").subscribe(result_ISSR_14New => {
                                if (this.ISSR_1415_2 > 0)
                                  this.ISSR_1415_2 = result_ISSR_14New[0].Housesinvolved;
                                // alert(this.ISSR_1415_2 );

                                this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode, districtCodes, cityCodes, "ISSR", "2015-16").subscribe(result_ISSR15 => {
                                  this.HouseInvolved1_ISSR = result_ISSR15[0].Housesinvolved;
                                  this.FundsDisbursed_in_Houses1_ISSR = result_ISSR15[0].FundsDisbursed_in_Houses;
                                  this.Houses_Grounded1_ISSR = result_ISSR15[0].Houses_Grounded;
                                  this.Houses_Completed1_ISSR = result_ISSR15[0].Houses_Completed;
                                  this.HousesOccupied1_ISSR = result_ISSR15[0].HousesOccupied;
                                  this.ISSR_1516_1 = result_ISSR15[0].Second_Houses;
                                  this.ISSR_1516_2 = result_ISSR15[0].Third_Houses;

                                  this.service.sp_GetRayHouses(stateCode, districtCodes, cityCodes, "2015-16").subscribe(result_ISSR_15 => {
                                    if (this.ISSR_1516_2 > 0)
                                      this.ISSR_1516_2 = result_ISSR_15[0].Housesinvolved;


                                    this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode, districtCodes, cityCodes, "ISSR", "2016-17").subscribe(result_ISSR2 => {
                                      try {
                                        this.HouseInvolved2_ISSR = result_ISSR2[0].Housesinvolved;
                                        this.Houses_Grounded2_ISSR = result_ISSR2[0].Houses_Grounded;
                                        this.Houses_Completed2_ISSR = result_ISSR2[0].Houses_Completed;
                                        this.HousesOccupied2_ISSR = result_ISSR2[0].HousesOccupied;

                                        this.ISSR_1617_1 = result_ISSR2[0].Second_Houses;
                                        this.ISSR_1617_2 = result_ISSR2[0].Third_Houses;

                                      }
                                      catch{ }
                                      finally { }
                                      this.service.sp_GetRayHouses(stateCode, districtCodes, cityCodes, "2016-17").subscribe(result_ISSR_16 => {
                                        if (this.ISSR_1617_2 > 0)
                                          this.ISSR_1617_2 = result_ISSR_16[0].Housesinvolved;



                                        this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode, districtCodes, cityCodes, "ISSR", "2017-18").subscribe(result_ISSR3 => {
                                          try {
                                            this.HouseInvolved3_ISSR = result_ISSR3[0].Housesinvolved;
                                            this.FundsDisbursed_in_Houses3_ISSR = result_ISSR3[0].FundsDisbursed_in_Houses;
                                            this.Houses_Grounded3_ISSR = result_ISSR3[0].Houses_Grounded;
                                            this.Houses_Completed3_ISSR = result_ISSR3[0].Houses_Completed;
                                            this.HousesOccupied3_ISSR = result_ISSR3[0].HousesOccupied;

                                            this.ISSR_1718_1 = result_ISSR3[0].Second_Houses;
                                            this.ISSR_1718_2 = result_ISSR3[0].Third_Houses;

                                          }
                                          catch{ }
                                          finally { }

                                          this.service.sp_GetRayHouses(stateCode, districtCodes, cityCodes, "2017-18").subscribe(result_ISSR_17 => {
                                            if (this.ISSR_1718_2 > 0)
                                              this.ISSR_1718_2 = result_ISSR_17[0].Housesinvolved;


                                            this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode, districtCodes, cityCodes, "ISSR", "2018-19").subscribe(result_ISSR4 => {
                                              try {
                                                this.HouseInvolved4_ISSR = result_ISSR4[0].Housesinvolved;
                                                this.FundsDisbursed_in_Houses4_ISSR = result_ISSR4[0].FundsDisbursed_in_Houses;
                                                this.Houses_Grounded4_ISSR = result_ISSR4[0].Houses_Grounded;
                                                this.Houses_Completed4_ISSR = result_ISSR4[0].Houses_Completed;
                                                this.HousesOccupied4_ISSR = result_ISSR4[0].HousesOccupied;
                                                this.ISSR_1819_1 = result_ISSR4[0].Second_Houses;
                                                this.ISSR_1819_2 = result_ISSR4[0].Third_Houses;

                                              }
                                              catch{ }
                                              finally { }

                                              this.service.sp_GetRayHouses(stateCode, districtCodes, cityCodes, "2018-19").subscribe(result_ISSR_18 => {
                                                if (this.ISSR_1819_2 > 0)
                                                  this.ISSR_1819_2 = result_ISSR_18[0].Housesinvolved;

                                                this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode, districtCodes, cityCodes, "ISSR", "2019-20").subscribe(result_ISSR5 => {
                                                  try {
                                                    this.HouseInvolved5_ISSR = result_ISSR5[0].Housesinvolved;
                                                    this.FundsDisbursed_in_Houses5_ISSR = result_ISSR5[0].FundsDisbursed_in_Houses;
                                                    this.Houses_Grounded5_ISSR = result_ISSR5[0].Houses_Grounded;
                                                    this.Houses_Completed5_ISSR = result_ISSR5[0].Houses_Completed;
                                                    this.HousesOccupied5_ISSR = result_ISSR5[0].HousesOccupied;

                                                    this.ISSR_1920_1 = result_ISSR5[0].Second_Houses;
                                                    this.ISSR_1920_2 = result_ISSR5[0].Third_Houses;

                                                  }
                                                  catch{ }
                                                  finally { }

                                                  this.service.sp_GetRayHouses(stateCode, districtCodes, cityCodes, "2019-20").subscribe(result_ISSR_19 => {
                                                    if (this.ISSR_1920_2 > 0)
                                                      this.ISSR_1920_2 = result_ISSR_19[0].Housesinvolved;


                                                    this.ISSR_1_TOT = this.ISSR_1415_1 + this.ISSR_1516_1 + this.ISSR_1617_1 + this.ISSR_1718_1 + this.ISSR_1819_1 + this.ISSR_1920_1;
                                                    this.ISSR_2_TOT = this.ISSR_1415_2 + this.ISSR_1516_2 + this.ISSR_1617_2 + this.ISSR_1718_2 + this.ISSR_1819_2 + this.ISSR_1920_2;

                                                    this.THouseInvolved1_ISSR = this.HouseInvolved0_ISSR + this.HouseInvolved1_ISSR + this.HouseInvolved2_ISSR + this.HouseInvolved3_ISSR + this.HouseInvolved4_ISSR + this.HouseInvolved5_ISSR;
                                                    this.TFundsDisbursed_in_Houses1_ISSR = this.FundsDisbursed_in_Houses0_ISSR + this.FundsDisbursed_in_Houses1_ISSR + this.FundsDisbursed_in_Houses2_ISSR + this.FundsDisbursed_in_Houses3_ISSR + this.FundsDisbursed_in_Houses4_ISSR + this.FundsDisbursed_in_Houses5_ISSR;
                                                    this.THouses_Grounded1_ISSR = this.Houses_Grounded0_ISSR + this.Houses_Grounded1_ISSR + this.Houses_Grounded2_ISSR + this.Houses_Grounded3_ISSR + this.Houses_Grounded4_ISSR + this.Houses_Grounded5_ISSR;
                                                    this.THouses_Completed1_ISSR = this.Houses_Completed0_ISSR + this.Houses_Completed1_ISSR + this.Houses_Completed2_ISSR + this.Houses_Completed3_ISSR + this.Houses_Completed4_ISSR + this.Houses_Completed5_ISSR;
                                                    this.THousesOccupied1_ISSR = this.HousesOccupied0_ISSR + this.HousesOccupied1_ISSR + this.HousesOccupied2_ISSR + this.HousesOccupied3_ISSR + this.HousesOccupied4_ISSR + this.HousesOccupied5_ISSR;


                                                    //-----------------------------------------JNNURM-------------------------------------------------   
                                                    this.service.sp_GetHousesStatusForVerticalJN(stateCode, districtCodes, cityCodes).subscribe(resultJN => {
                                                      try {
                                                        this.Houses_GroundedJN_T = resultJN[0].Houses_Grounded;
                                                        this.THouses_CompletedJN = resultJN[0].Houses_Completed;
                                                        this.HousesOccupiedJNT = resultJN[0].HousesOccupied;
                                                        this.Houses_GroundedJN_T = this.Houses_GroundedJN_T;
                                                        this.THouses_CompletedJN = this.THouses_CompletedJN;
                                                        this.HousesOccupiedJNT = this.HousesOccupiedJNT;
                                                      }
                                                      catch{ }
                                                      finally { }
                                                      //--------------------------- clss
                                                      this.service.GetCLSS_Houses_VerticalWise(stateCode).subscribe(result_CLSS => {
                                                        try {
                                                          this.Bene2014_15_CLSS = result_CLSS[0].Bene2014_15;
                                                          this.Bene2015_16_CLSS = result_CLSS[0].Bene2015_16;
                                                          this.Bene2016_17_CLSS = result_CLSS[0].Bene2016_17;
                                                          this.Bene2017_18_CLSS = result_CLSS[0].Bene2017_18;
                                                          this.Bene2018_19_CLSS = result_CLSS[0].Bene2018_19;
                                                          this.Bene2019_20_CLSS = result_CLSS[0].Bene2019_20;
                                                        }
                                                        catch{ }
                                                        finally { }

                                                        this.BeneCLSS_Total = parseFloat(this.Bene2014_15_CLSS) + parseFloat(this.Bene2015_16_CLSS) + parseFloat(this.Bene2016_17_CLSS) +
                                                          parseFloat(this.Bene2017_18_CLSS) + parseFloat(this.Bene2018_19_CLSS) + parseFloat(this.Bene2019_20_CLSS);// +parseFloat(this.Bene2019_20_CLSS); 

                                                        //  this.Bene2020_21_CLSS=result_CLSS[0].Bene2020_21;
                                                        //  this.Bene2021_22_CLSS=result_CLSS[0].Bene2021_22;



                                                        this.FundsDisbursed_in_HousesT1 = this.Bene2014_15_CLSS;

                                                        //--------------------------------------------
                                                        // this.HouseInvolvedT1=   this.HouseInvolved01 +this.HouseInvolved0_AHP + this.HouseInvolved0_ISSR +this.Bene2014_15_CLSS ;
                                                        // this.FundsDisbursed_in_HousesT1 = parseFloat(this.Bene2014_15_CLSS) + parseFloat(this.FundsDisbursed_in_Houses0_ISSR) + 
                                                        // parseFloat(this.FundsDisbursed_in_Houses0_AHP) +parseFloat(this.FundsDisbursed_in_Houses01);
                                                        // this.Houses_GroundedT1 = this.Houses_GroundedJN_T +this.Bene2014_15_CLSS + this.Houses_Grounded0_ISSR +  this.Houses_Grounded0_AHP + this.Houses_Grounded0;
                                                        // this.Houses_CompletedT1 = this.THouses_CompletedJN +this.Bene2014_15_CLSS + this.Houses_Completed0_ISSR +  this.Houses_Completed0_AHP + this.Houses_Completed01;
                                                        // this.HousesOccupiedT1 = this.HousesOccupiedJNT +this.Bene2014_15_CLSS + this.HousesOccupied0_ISSR +  this.HousesOccupied0_AHP + this.HousesOccupied01;


                                                        //  THouseInvolved = HouseInvolved01  HouseInvolved1 HouseInvolved2 HouseInvolved3 HouseInvolved4 HouseInvolved5


                                                        // this.HouseInvolvedT2 = this.HouseInvolved2 +  this.HouseInvolved2_AHP +this.HouseInvolved2_ISSR +this.Bene2015_16_CLSS;
                                                        this.HouseInvolvedT2 = this.HouseInvolved1 + this.HouseInvolved1_AHP + this.HouseInvolved1_ISSR + this.Bene2015_16_CLSS;

                                                        // this.FundsDisbursed_in_HousesT2 =      this.TFundsDisbursed_in_Houses +   
                                                        // this.TotalFundsDisbursedAHP + this.TFundsDisbursed_in_Houses1_ISSR +this.BeneCLSS_Total;

                                                        this.FundsDisbursed_in_HousesT2 = this.Bene2015_16_CLSS + this.FundsDisbursed_in_Houses1_ISSR +
                                                          this.FundsDisbursed_in_Houses1_AHP + this.FundsDisbursed_in_Houses1;
                                                        //this.FundsDisbursed_in_HousesT3 = this.FundsDisbursed_in_Houses2 + this.FundsDisbursed_in_Houses2_AHP + this.Bene2016_17_CLSS;

                                                        this.HouseInvolvedT3 = this.HouseInvolved2 + this.HouseInvolved2_AHP + this.Bene2016_17_CLSS;
                                                        //    this.HouseInvolvedT4 = this.HouseInvolved3 + this.HouseInvolved3_AHP + this.Bene2017_18_CLSS ;
                                                        this.HouseInvolvedT3 = this.Bene2016_17_CLSS + this.HouseInvolved2_ISSR +
                                                          this.HouseInvolved2_AHP + this.HouseInvolved2;


                                                        this.Houses_GroundedT4 = this.Bene2017_18_CLSS + this.Houses_Grounded3_ISSR + this.Houses_Grounded3_AHP
                                                          + this.Houses_Grounded3;
                                                        this.Houses_GroundedT5 = this.Houses_Grounded4 + this.Houses_Grounded4_AHP + this.Bene2018_19_CLSS + this.Houses_Grounded4_ISSR;




                                                        // this.Houses_GroundedT4 = this.Houses_Grounded3 + this.Houses_Grounded3_AHP +this.Bene2017_18_CLSS;
                                                        // this.Houses_CompletedT4 =this.Houses_Completed3 + this.Houses_Completed3_AHP +this.Bene2017_18_CLSS;
                                                        // this.HousesOccupiedT4 =this.HousesOccupied3  + this.HousesOccupied3_AHP +this.Bene2017_18_CLSS;

                                                        this.HouseInvolvedT5 = this.HouseInvolved4_ISSR + this.HouseInvolved4 + this.HouseInvolved4_AHP
                                                          + this.Bene2018_19_CLSS;


                                                        this.Houses_GroundedT2 = this.Houses_Grounded1 + this.Houses_Grounded1_AHP + this.Houses_Grounded1_ISSR + this.Bene2015_16_CLSS;
                                                        this.Houses_CompletedT2 = this.Houses_Completed1 + this.Houses_Completed1_AHP + this.Houses_Completed1_ISSR + this.Bene2015_16_CLSS;
                                                        this.HousesOccupiedT2 = this.HousesOccupied1 + this.HousesOccupied1_AHP + this.HousesOccupied1_ISSR + this.Bene2015_16_CLSS;


                                                        this.Houses_CompletedT3 = this.Houses_Completed2 + this.Houses_Completed2_AHP + this.Houses_Completed2_ISSR
                                                          + this.Bene2016_17_CLSS;

                                                        this.HouseInvolvedT4 = this.HouseInvolved3 + this.HouseInvolved3_AHP + this.HouseInvolved3_ISSR
                                                          + this.Bene2017_18_CLSS;
                                                        this.HouseInvolvedT5 = this.HouseInvolved4 + this.HouseInvolved4_AHP + this.HouseInvolved4_ISSR
                                                          + this.Bene2018_19_CLSS;


                                                        this.HouseInvolvedT6 = this.HouseInvolved5 + this.HouseInvolved5_AHP + this.HouseInvolved5_ISSR + this.Bene2019_20_CLSS;


                                                        // this.THouseInvolvedGT = this.HouseInvolvedT1 +this.HouseInvolvedT2 + this.HouseInvolvedT3  
                                                        // +this.HouseInvolvedT4 +this.HouseInvolvedT5 +this.HouseInvolvedT6;
                                                        // this.TFundsDisbursed_in_HousesGT =this.FundsDisbursed_in_HousesT1 +this.FundsDisbursed_in_HousesT2 +this.FundsDisbursed_in_HousesT3 +this.FundsDisbursed_in_HousesT4 +this.FundsDisbursed_in_HousesT5 +this.FundsDisbursed_in_HousesT6;
                                                        // this.THouses_GroundedGT =this.Houses_GroundedT1 +this.Houses_GroundedT2 +this.Houses_GroundedT3 +this.Houses_GroundedT4 +this.Houses_GroundedT5 +this.Houses_GroundedT6;
                                                        // this.THouses_CompletedGT =this.Houses_CompletedT1 +this.Houses_CompletedT2 +this.Houses_CompletedT3 +this.Houses_CompletedT4 +this.Houses_CompletedT5 +this.Houses_CompletedT6;
                                                        // this.THousesOccupiedGT =this.HousesOccupiedT1 +this.HousesOccupiedT2 +this.HousesOccupiedT3 +this.HousesOccupiedT4 +this.HousesOccupiedT5 +this.HousesOccupiedT6;

                                                        // Block 14-15 Col 1
                                                        this.HouseInvolvedT1 = this.HouseInvolved01 + this.HouseInvolved0_AHP + this.HouseInvolved0_ISSR + this.Bene2014_15_CLSS
                                                        this.HouseInvolvedT2 = this.HouseInvolved1 + this.HouseInvolved1_AHP + this.HouseInvolved1_ISSR + this.Bene2015_16_CLSS;
                                                        this.HouseInvolvedT3 = this.HouseInvolved2 + this.HouseInvolved2_AHP + this.HouseInvolved2_ISSR + this.Bene2016_17_CLSS;
                                                        this.HouseInvolvedT4 = this.HouseInvolved3 + this.HouseInvolved3_AHP + this.HouseInvolved3_ISSR + this.Bene2017_18_CLSS
                                                        this.HouseInvolvedT5 = this.HouseInvolved4 + this.HouseInvolved4_AHP + this.HouseInvolved4_ISSR + this.Bene2018_19_CLSS;
                                                        this.HouseInvolvedT6 = this.HouseInvolved5 + this.HouseInvolved5_AHP + this.HouseInvolved5_ISSR + this.Bene2019_20_CLSS;
                                                        this.THouseInvolvedGT = this.HouseInvolvedT1 + this.HouseInvolvedT2 + this.HouseInvolvedT3 + this.HouseInvolvedT4 + this.HouseInvolvedT5 + this.HouseInvolvedT6;

                                                        // 15- 16  col2
                                                        this.FundsDisbursed_in_HousesT1 = this.FundsDisbursed_in_Houses01 + this.HouseInvolved0_AHP + this.HouseInvolved0_ISSR + this.Bene2014_15_CLSS;
                                                        this.FundsDisbursed_in_HousesT2 = this.FundsDisbursed_in_Houses1 + this.FundsDisbursed_in_Houses1_AHP + this.FundsDisbursed_in_Houses1_ISSR + this.Bene2015_16_CLSS;
                                                        this.FundsDisbursed_in_HousesT3 = this.FundsDisbursed_in_Houses2 + this.FundsDisbursed_in_Houses2_AHP + this.FundsDisbursed_in_Houses2_ISSR + this.Bene2016_17_CLSS;
                                                        this.FundsDisbursed_in_HousesT4 = this.FundsDisbursed_in_Houses3 + this.FundsDisbursed_in_Houses3_AHP + this.FundsDisbursed_in_Houses3_ISSR + this.Bene2017_18_CLSS;
                                                        this.FundsDisbursed_in_HousesT5 = this.FundsDisbursed_in_Houses4 + this.FundsDisbursed_in_Houses4_AHP + this.FundsDisbursed_in_Houses4_ISSR + this.Bene2018_19_CLSS;
                                                        this.FundsDisbursed_in_HousesT6 = this.FundsDisbursed_in_Houses5 + this.FundsDisbursed_in_Houses5_AHP + this.FundsDisbursed_in_Houses5_ISSR + this.Bene2019_20_CLSS;
                                                        this.TFundsDisbursed_in_HousesGT = this.FundsDisbursed_in_HousesT1 + this.FundsDisbursed_in_HousesT2 + this.FundsDisbursed_in_HousesT3 + this.FundsDisbursed_in_HousesT4 + this.FundsDisbursed_in_HousesT5 + this.FundsDisbursed_in_HousesT6;

                                                        this.Houses_GroundedT1 = this.Houses_Grounded0 + this.Houses_Grounded0_AHP + this.Houses_Grounded0_ISSR + this.Bene2014_15_CLSS + this.Houses_GroundedJN_T;
                                                        this.Houses_GroundedT2 = this.Houses_Grounded1 + this.Houses_Grounded1_AHP + this.Houses_Grounded1_ISSR + this.Bene2015_16_CLSS;
                                                        this.Houses_GroundedT3 = this.Houses_Grounded2 + this.Houses_Grounded2_AHP + this.Houses_Grounded2_ISSR + this.Bene2016_17_CLSS;
                                                        this.Houses_GroundedT4 = this.Houses_Grounded3 + this.Houses_Grounded3_AHP + this.Houses_Grounded3_ISSR + this.Bene2017_18_CLSS;
                                                        this.Houses_GroundedT5 = this.Houses_Grounded4 + this.Houses_Grounded4_AHP + this.Houses_Grounded4_ISSR + this.Bene2018_19_CLSS;
                                                        this.Houses_GroundedT6 = this.Houses_Grounded5 + this.Houses_Grounded5_AHP + this.Houses_Grounded5_ISSR + this.Bene2019_20_CLSS;
                                                        this.THouses_GroundedGT = this.Houses_GroundedT1 + this.Houses_GroundedT2 + this.Houses_GroundedT3 + this.Houses_GroundedT4 + this.Houses_GroundedT5 + this.Houses_GroundedT6;

                                                        this.Houses_CompletedT1 = this.Houses_Completed01 + this.Houses_Completed0_AHP + this.Houses_Completed0_ISSR + this.Bene2014_15_CLSS + this.THouses_CompletedJN;
                                                        this.Houses_CompletedT2 = this.Houses_Completed1 + this.Houses_Completed1_AHP + this.Houses_Completed1_ISSR + this.Bene2015_16_CLSS;
                                                        this.Houses_CompletedT3 = this.Houses_Completed2 + this.Houses_Completed2_AHP + this.Houses_Completed2_ISSR + this.Bene2016_17_CLSS;
                                                        this.Houses_CompletedT4 = this.Houses_Completed3 + this.Houses_Completed3_AHP + this.Houses_Completed3_ISSR + this.Bene2017_18_CLSS;
                                                        this.Houses_CompletedT5 = this.Houses_Completed4 + this.Houses_Completed4_AHP + this.Houses_Completed4_ISSR + this.Bene2018_19_CLSS;
                                                        this.Houses_CompletedT6 = this.Houses_Completed5 + this.Houses_Completed5_AHP + this.Houses_Completed5_ISSR + this.Bene2019_20_CLSS;
                                                        this.THouses_CompletedGT = this.Houses_CompletedT1 + this.Houses_CompletedT2 + this.Houses_CompletedT3 + this.Houses_CompletedT4 + this.Houses_CompletedT5 + this.Houses_CompletedT6;

                                                        this.HousesOccupiedT1 = this.HousesOccupied01 + this.HousesOccupied0_AHP + this.HousesOccupied0_ISSR + this.Bene2014_15_CLSS + this.HousesOccupiedJNT;
                                                        this.HousesOccupiedT2 = this.HousesOccupied1 + this.HousesOccupied1_AHP + this.HousesOccupied1_ISSR + this.Bene2015_16_CLSS;
                                                        this.HousesOccupiedT3 = this.HousesOccupied2 + this.HousesOccupied2_AHP + this.HousesOccupied2_ISSR + this.Bene2016_17_CLSS;
                                                        this.HousesOccupiedT4 = this.HousesOccupied3 + this.HousesOccupied3_AHP + this.HousesOccupied3_ISSR + this.Bene2017_18_CLSS;
                                                        this.HousesOccupiedT5 = this.HousesOccupied4 + this.HousesOccupied4_AHP + this.HousesOccupied4_ISSR + this.Bene2018_19_CLSS;
                                                        this.HousesOccupiedT6 = this.HousesOccupied5 + this.HousesOccupied5_AHP + this.HousesOccupied5_ISSR + this.Bene2019_20_CLSS;
                                                        this.THousesOccupiedGT = this.HousesOccupiedT1 + this.HousesOccupiedT2 + this.HousesOccupiedT3 + this.HousesOccupiedT4 + this.HousesOccupiedT5 + this.HousesOccupiedT6;

                                                        this.PMAY1415_1 = this.blc_1415_1 + this.AHP_1415_1 + this.ISSR_1415_1;
                                                        this.PMAY1415_2 = this.blc_1415_2 + this.AHP_1415_2 + this.ISSR_1415_2;

                                                        this.PMAY1516_1 = this.blc_1516_1 + this.AHP_1516_1 + this.ISSR_1516_1;
                                                        this.PMAY1516_2 = this.blc_1516_2 + this.AHP_1516_2 + this.ISSR_1516_2;

                                                        this.PMAY1617_1 = this.blc_1617_1 + this.AHP_1617_1 + this.ISSR_1617_1;
                                                        this.PMAY1617_2 = this.blc_1617_2 + this.AHP_1617_2 + this.ISSR_1617_2;

                                                        this.PMAY1718_1 = this.blc_1718_1 + this.AHP_1718_1 + this.ISSR_1718_1;
                                                        this.PMAY1718_2 = this.blc_1718_2 + this.AHP_1718_2 + this.ISSR_1718_2;


                                                        this.PMAY1819_1 = this.blc_1819_1 + this.AHP_1819_1 + this.ISSR_1819_1;
                                                        this.PMAY1819_2 = this.blc_1819_2 + this.AHP_1819_2 + this.ISSR_1819_2;


                                                        this.PMAY1920_1 = this.blc_1920_1 + this.AHP_1920_1 + this.ISSR_1920_1;
                                                        this.PMAY1920_2 = this.blc_1920_2 + this.AHP_1920_2 + this.ISSR_1920_2;

                                                        this.PMAYT_1 = this.PMAY1415_1 + this.PMAY1516_1 + this.PMAY1617_1 + this.PMAY1718_1 + this.PMAY1819_1 + this.PMAY1920_1;
                                                        this.PMAYT_2 = this.PMAY1415_2 + this.PMAY1516_2 + this.PMAY1617_2 + this.PMAY1718_2 + this.PMAY1819_2 + this.PMAY1920_2;

                                                        //this.PMAYT_1 =this.PMAY1415_1 +this.PMAY115_1 +this.PMAY1415_1 +this.PMAY1415_1 +this.PMAY1415_1 +this.PMAY1415_1;


                                                        if (this.FundsDisbursed_in_Houses0_AHP == "-")
                                                          this.FundsDisbursed_in_Houses0_AHP = 0;

                                                        if (this.FundsDisbursed_in_Houses1_AHP == "-")
                                                          this.FundsDisbursed_in_Houses1_AHP = 0;

                                                        if (this.FundsDisbursed_in_Houses2_AHP == "-")
                                                          this.FundsDisbursed_in_Houses2_AHP = 0;

                                                        if (this.FundsDisbursed_in_Houses3_AHP == "-")
                                                          this.FundsDisbursed_in_Houses3_AHP = 0;

                                                        if (this.FundsDisbursed_in_Houses4_AHP == "-")
                                                          this.FundsDisbursed_in_Houses4_AHP = 0;


                                                        if (this.FundsDisbursed_in_Houses5_AHP == "-")
                                                          this.FundsDisbursed_in_Houses5_AHP = 0;

                                                        this.TotalFundsDisbursedAHP = this.FundsDisbursed_in_Houses0_AHP + this.FundsDisbursed_in_Houses1_AHP + this.FundsDisbursed_in_Houses2_AHP + this.FundsDisbursed_in_Houses3_AHP + this.FundsDisbursed_in_Houses4_AHP + this.FundsDisbursed_in_Houses5_AHP;
                                                        // alert(this.TotalFundsDisbursedAHP);

                                                        //14-15 bLCSthis,ouseInvolved01 =0;        
                                                        if (this.HouseInvolved01 == "0") {
                                                          this.HouseInvolved01 = "-";
                                                        }

                                                        if (this.FundsDisbursed_in_Houses01 == "0") {
                                                          this.FundsDisbursed_in_Houses01 = "-";
                                                        }

                                                        if (this.Houses_Grounded01 == "0") {
                                                          this.Houses_Grounded01 = "-";
                                                        }
                                                        if (this.Houses_Completed01 == "0") {
                                                          this.Houses_Completed01 = "-";
                                                        }
                                                        if (this.HousesOccupied01 == "0") {
                                                          this.HousesOccupied01 = "-";
                                                        }
                                                        //15-16 bLCSthis,ouseInvolved01 =0;
                                                        if (this.HouseInvolved1 == "0") {
                                                          this.HouseInvolved1 = "-";
                                                        }
                                                        if (this.FundsDisbursed_in_Houses1 == "0") {
                                                          this.FundsDisbursed_in_Houses1 = "-";
                                                        }
                                                        if (this.Houses_Grounded1 == "0") {
                                                          this.Houses_Grounded1 = "-";
                                                        }
                                                        if (this.Houses_Completed1 == "0") {
                                                          this.Houses_Completed1 = "-";
                                                        }
                                                        if (this.HousesOccupied1 == "0") {
                                                          this.HousesOccupied1 = "-";
                                                        }
                                                        //16-17 bLCSthis,ouseInvolved01 =0;
                                                        if (this.HouseInvolved2 == "0") {
                                                          this.HouseInvolved2 = "-";
                                                        }

                                                        if (this.FundsDisbursed_in_Houses2 == "0") {
                                                          this.FundsDisbursed_in_Houses2 = "-";
                                                        }

                                                        if (this.Houses_Grounded2 == "0") {
                                                          this.Houses_Grounded2 = "-";
                                                        }
                                                        if (this.Houses_Completed2 == "0") {
                                                          this.Houses_Completed2 = "-";
                                                        }
                                                        if (this.HousesOccupied2 == "0") {
                                                          this.HousesOccupied2 = "-";
                                                        }
                                                        // 17-18

                                                        if (this.HouseInvolved3 == "0") {
                                                          this.HouseInvolved3 = "-";
                                                        }
                                                        if (this.FundsDisbursed_in_Houses3 == "0") {
                                                          this.FundsDisbursed_in_Houses3 = "-";
                                                        }
                                                        if (this.Houses_Grounded3 == "0") {
                                                          this.Houses_Grounded3 = "-";
                                                        }
                                                        if (this.Houses_Completed3 == "0") {
                                                          this.Houses_Completed3 = "-";
                                                        }
                                                        if (this.HousesOccupied3 == "0") {
                                                          this.HousesOccupied3 = "-";
                                                        }
                                                        // 18-19
                                                        if (this.HouseInvolved4 == "0") {
                                                          this.HouseInvolved4 = "-";
                                                        }

                                                        if (this.ISSR_1415_1 == "0") {
                                                          this.ISSR_1415_1 = "-";
                                                        }
                                                        if (this.ISSR_1415_2 == "0") {
                                                          this.ISSR_1415_2 = "-";
                                                        }


                                                        if (this.ISSR_1516_1 == "0") {
                                                          this.ISSR_1516_1 = "-";
                                                        }
                                                        if (this.ISSR_1516_2 == "0") {
                                                          this.ISSR_1516_2 = "-";
                                                        }

                                                        if (this.ISSR_1617_1 == "0") {
                                                          this.ISSR_1617_1 = "-";
                                                        }
                                                        if (this.ISSR_1617_2 == "0") {
                                                          this.ISSR_1617_2 = "-";
                                                        }

                                                        if (this.ISSR_1718_1 == "0") {
                                                          this.ISSR_1718_1 = "-";
                                                        }
                                                        if (this.ISSR_1718_2 == "0") {
                                                          this.ISSR_1718_2 = "-";
                                                        }

                                                        if (this.ISSR_1819_1 == "0") {
                                                          this.ISSR_1819_1 = "-";
                                                        }
                                                        if (this.ISSR_1819_2 == "0") {
                                                          this.ISSR_1819_2 = "-";
                                                        }

                                                        if (this.ISSR_1920_1 == "0") {
                                                          this.ISSR_1920_1 = "-";
                                                        }
                                                        if (this.ISSR_1920_2 == "0") {
                                                          this.ISSR_1920_2 = "-";
                                                        }


                                                        if (this.FundsDisbursed_in_Houses4 == "0") {
                                                          this.FundsDisbursed_in_Houses4 = "-";
                                                        }
                                                        if (this.Houses_Grounded4 == "0") {
                                                          this.Houses_Grounded4 = "-";
                                                        }
                                                        if (this.Houses_Completed4 == "0") {
                                                          this.Houses_Completed4 = "-";
                                                        }
                                                        if (this.HousesOccupied4 == "0") {
                                                          this.HousesOccupied4 = "-";
                                                        }

                                                        // 19-20

                                                        if (this.HouseInvolved5 == "0") {
                                                          this.HouseInvolved5 = "-";
                                                        }
                                                        if (this.FundsDisbursed_in_Houses5 == "0") {
                                                          this.FundsDisbursed_in_Houses5 = "-";
                                                        }
                                                        if (this.Houses_Grounded5 == "0") {
                                                          this.Houses_Grounded5 = "-";
                                                        }
                                                        if (this.Houses_Completed5 == "0") {
                                                          this.Houses_Completed5 = "-";
                                                        }
                                                        if (this.HousesOccupied5 == "0") {
                                                          this.HousesOccupied5 = "-";
                                                        }

                                                        // Total
                                                        if (this.THouseInvolved == "0") {
                                                          this.THouseInvolved = "-";
                                                        }
                                                        if (this.TFundsDisbursed_in_Houses == "0") {
                                                          this.TFundsDisbursed_in_Houses = "-";
                                                        }
                                                        if (this.THouses_Grounded == "0") {
                                                          this.THouses_Grounded = "-";
                                                        }
                                                        if (this.THouses_Completed == "0") {
                                                          this.THouses_Completed = "-";
                                                        }
                                                        if (this.THousesOccupied == "0") {
                                                          this.THousesOccupied = "-";
                                                        }
                                                        //--------------------------------------------------------------------          
                                                        //        AHP 14-15
                                                        if (this.HouseInvolved0_AHP == "0") {
                                                          this.HouseInvolved0_AHP = "-";
                                                        }
                                                        if (this.FundsDisbursed_in_Houses0_AHP == "0") {
                                                          this.FundsDisbursed_in_Houses0_AHP = "-";
                                                        }
                                                        if (this.Houses_Grounded0_AHP == "0") {
                                                          this.Houses_Grounded0_AHP = "-";
                                                        }
                                                        if (this.Houses_Completed0_AHP == "0") {
                                                          this.Houses_Completed0_AHP = "-";
                                                        }
                                                        if (this.HousesOccupied0_AHP == "0") {
                                                          this.HousesOccupied0_AHP = "-";
                                                        }
                                                        // 15-16
                                                        if (this.HouseInvolved1_AHP == "0") {
                                                          this.HouseInvolved1_AHP = "-";
                                                        }
                                                        if (this.FundsDisbursed_in_Houses1_AHP == "0") {
                                                          this.FundsDisbursed_in_Houses1_AHP = "-";
                                                        }
                                                        if (this.Houses_Grounded1_AHP == "0") {
                                                          this.Houses_Grounded1_AHP = "-";
                                                        }
                                                        if (this.Houses_Completed1_AHP == "0") {
                                                          this.Houses_Completed1_AHP = "-";
                                                        }
                                                        if (this.HousesOccupied1_AHP == "0") {
                                                          this.HousesOccupied1_AHP = "-";
                                                        }
                                                        // 16-17
                                                        if (this.HouseInvolved2_AHP == "0") {
                                                          this.HouseInvolved2_AHP = "-";
                                                        }
                                                        if (this.FundsDisbursed_in_Houses2_AHP == "0") {
                                                          this.FundsDisbursed_in_Houses2_AHP = "-";
                                                        }
                                                        if (this.Houses_Grounded2_AHP == "0") {
                                                          this.Houses_Grounded2_AHP = "-";
                                                        }
                                                        if (this.Houses_Completed2_AHP == "0") {
                                                          this.Houses_Completed2_AHP = "-";
                                                        }
                                                        if (this.HousesOccupied2_AHP == "0") {
                                                          this.HousesOccupied2_AHP = "-";
                                                        }
                                                        // 17-18          
                                                        if (this.HouseInvolved3_AHP == "0") {
                                                          this.HouseInvolved3_AHP = "-";
                                                        }
                                                        if (this.FundsDisbursed_in_Houses3_AHP == "0") {
                                                          this.FundsDisbursed_in_Houses3_AHP = "-";
                                                        }
                                                        if (this.Houses_Grounded3_AHP == "0") {
                                                          this.Houses_Grounded3_AHP = "-";
                                                        }
                                                        if (this.Houses_Completed3_AHP == "0") {
                                                          this.Houses_Completed3_AHP = "-";
                                                        }
                                                        if (this.HousesOccupied3_AHP == "0") {
                                                          this.HousesOccupied3_AHP = "-";
                                                        }
                                                        // 18-19
                                                        if (this.HouseInvolved4_AHP == "0") {
                                                          this.HouseInvolved4_AHP = "-";
                                                        }
                                                        if (this.FundsDisbursed_in_Houses4_AHP == "0") {
                                                          this.FundsDisbursed_in_Houses4_AHP = "-";
                                                        }
                                                        if (this.Houses_Grounded4_AHP == "0") {
                                                          this.Houses_Grounded4_AHP = "-";
                                                        }
                                                        if (this.Houses_Completed4_AHP == "0") {
                                                          this.Houses_Completed4_AHP = "-";
                                                        }
                                                        if (this.HousesOccupied4_AHP == "0") {
                                                          this.HousesOccupied4_AHP = "-";
                                                        }
                                                        // 19-20
                                                        if (this.HouseInvolved5_AHP == "0") {
                                                          this.HouseInvolved5_AHP = "-";
                                                        }
                                                        if (this.FundsDisbursed_in_Houses5_AHP == "0") {
                                                          this.FundsDisbursed_in_Houses5_AHP = "-";
                                                        }
                                                        if (this.Houses_Grounded5_AHP == "0") {
                                                          this.Houses_Grounded5_AHP = "-";
                                                        }
                                                        if (this.Houses_Completed5_AHP == "0") {
                                                          this.Houses_Completed5_AHP = "-";
                                                        }
                                                        if (this.HousesOccupied5_AHP == "0") {
                                                          this.HousesOccupied5_AHP = "-";
                                                        }
                                                        // total
                                                        if (this.THouseInvolved_AHP == "0") {
                                                          this.THouseInvolved_AHP = "-";
                                                        }
                                                        if (this.TotalFundsDisbursedAHP == "0") {
                                                          this.TotalFundsDisbursedAHP = "-";
                                                        }
                                                        if (this.THouses_Grounded_AHP == "0") {
                                                          this.THouses_Grounded_AHP = "-";
                                                        }
                                                        if (this.THouses_Completed_AHP == "0") {
                                                          this.THouses_Completed_AHP = "-";
                                                        }
                                                        if (this.THousesOccupied_AHP == "0") {
                                                          this.THousesOccupied_AHP = "-";
                                                        }
                                                        //--------------------     
                                                        //ISSR 14-15
                                                        if (this.HouseInvolved0_ISSR == "0") {
                                                          this.HouseInvolved0_ISSR = "-";
                                                        }
                                                        if (this.FundsDisbursed_in_Houses0_ISSR == "0") {
                                                          this.FundsDisbursed_in_Houses0_ISSR = "-";
                                                        }
                                                        if (this.Houses_Grounded0_ISSR == "0") {
                                                          this.Houses_Grounded0_ISSR = "-";
                                                        }
                                                        if (this.Houses_Completed0_ISSR == "0") {
                                                          this.Houses_Completed0_ISSR = "-";
                                                        }
                                                        if (this.HousesOccupied0_ISSR == "0") {
                                                          this.HousesOccupied0_ISSR = "-";
                                                        }

                                                        // 15-16
                                                        if (this.HouseInvolved1_ISSR == "0") {
                                                          this.HouseInvolved1_ISSR = "-";
                                                        }
                                                        if (this.FundsDisbursed_in_Houses1_ISSR == "0") {
                                                          this.FundsDisbursed_in_Houses1_ISSR = "-";
                                                        }
                                                        if (this.Houses_Grounded1_ISSR == "0") {
                                                          this.Houses_Grounded1_ISSR = "-";
                                                        }
                                                        if (this.Houses_Completed1_ISSR == "0") {
                                                          this.Houses_Completed1_ISSR = "-";
                                                        }
                                                        if (this.HousesOccupied1_ISSR == "0") {
                                                          this.HousesOccupied1_ISSR = "-";
                                                        }

                                                        //16-17
                                                        if (this.HouseInvolved2_ISSR == "0") {
                                                          this.HouseInvolved2_ISSR = "-";
                                                        }
                                                        if (this.FundsDisbursed_in_Houses2_ISSR == "0") {
                                                          this.FundsDisbursed_in_Houses2_ISSR = "-";
                                                        }
                                                        if (this.Houses_Grounded2_ISSR == "0") {
                                                          this.Houses_Grounded2_ISSR = "-";
                                                        }
                                                        if (this.Houses_Completed2_ISSR == "0") {
                                                          this.Houses_Completed2_ISSR = "-";
                                                        }
                                                        if (this.HousesOccupied2_ISSR == "0") {
                                                          this.HousesOccupied2_ISSR = "-";
                                                        }
                                                        //17-18
                                                        if (this.HouseInvolved3_ISSR == "0") {
                                                          this.HouseInvolved3_ISSR = "-";
                                                        }
                                                        if (this.FundsDisbursed_in_Houses3_ISSR == "0") {
                                                          this.FundsDisbursed_in_Houses3_ISSR = "-";
                                                        }
                                                        if (this.Houses_Grounded3_ISSR == "0") {
                                                          this.Houses_Grounded3_ISSR = "-";
                                                        }
                                                        if (this.Houses_Completed3_ISSR == "0") {
                                                          this.Houses_Completed3_ISSR = "-";
                                                        }
                                                        if (this.HousesOccupied3_ISSR == "0") {
                                                          this.HousesOccupied3_ISSR = "-";
                                                        }
                                                        //18-19
                                                        if (this.HouseInvolved4_ISSR == "0") {
                                                          this.HouseInvolved4_ISSR = "-";
                                                        }
                                                        if (this.FundsDisbursed_in_Houses4_ISSR == "0") {
                                                          this.FundsDisbursed_in_Houses4_ISSR = "-";
                                                        }
                                                        if (this.Houses_Grounded4_ISSR == "0") {
                                                          this.Houses_Grounded4_ISSR = "-";
                                                        }
                                                        if (this.Houses_Completed4_ISSR == "0") {
                                                          this.Houses_Completed4_ISSR = "-";
                                                        }
                                                        if (this.HousesOccupied4_ISSR == "0") {
                                                          this.HousesOccupied4_ISSR = "-";
                                                        }
                                                        //19-20
                                                        if (this.HouseInvolved5_ISSR == "0") {
                                                          this.HouseInvolved5_ISSR = "-";
                                                        }
                                                        if (this.FundsDisbursed_in_Houses5_ISSR == "0") {
                                                          this.FundsDisbursed_in_Houses5_ISSR = "-";
                                                        }
                                                        if (this.Houses_Grounded5_ISSR == "0") {
                                                          this.Houses_Grounded5_ISSR = "-";
                                                        }
                                                        if (this.Houses_Completed5_ISSR == "0") {
                                                          this.Houses_Completed5_ISSR = "-";
                                                        }
                                                        if (this.HousesOccupied5_ISSR == "0") {
                                                          this.HousesOccupied5_ISSR = "-";
                                                        }
                                                        // TOTAL
                                                        if (this.THouseInvolved1_ISSR == "0") {
                                                          this.THouseInvolved1_ISSR = "-";
                                                        }
                                                        if (this.TFundsDisbursed_in_Houses1_ISSR == "0") {
                                                          this.TFundsDisbursed_in_Houses1_ISSR = "-";
                                                        }
                                                        if (this.THouses_Grounded1_ISSR == "0") {
                                                          this.THouses_Grounded1_ISSR = "-";
                                                        }
                                                        if (this.THouses_Completed1_ISSR == "0") {
                                                          this.THouses_Completed1_ISSR = "-";
                                                        }
                                                        if (this.THousesOccupied1_ISSR == "0") {
                                                          this.THousesOccupied1_ISSR = "-";
                                                        }

                                                        // clss
                                                        if (this.Bene2014_15_CLSS == "0") {
                                                          this.Bene2014_15_CLSS = "-";
                                                        }

                                                        if (this.Bene2015_16_CLSS == "0") {
                                                          this.Bene2015_16_CLSS = "-";
                                                        }

                                                        if (this.Bene2016_17_CLSS == "0") {
                                                          this.Bene2016_17_CLSS = "-";
                                                        }

                                                        if (this.Bene2017_18_CLSS == "0") {
                                                          this.Bene2017_18_CLSS = "-";
                                                        }

                                                        if (this.Bene2018_19_CLSS == "0") {
                                                          this.Bene2018_19_CLSS = "-";
                                                        }



                                                        if (this.Bene2019_20_CLSS == "0") {
                                                          this.Bene2019_20_CLSS = "-";
                                                        }


                                                        if (this.BeneCLSS_Total == "0") {
                                                          this.BeneCLSS_Total = "-";
                                                        }


                                                        if (this.Houses_GroundedJN_T == "0") {
                                                          this.Houses_GroundedJN_T = "-";
                                                        }

                                                        if (this.THouses_CompletedJN == "0") {
                                                          this.THouses_CompletedJN = "-";
                                                        }

                                                        if (this.HousesOccupiedJNT == "0") {
                                                          this.HousesOccupiedJNT = "-";
                                                        }

                                                        if (this.Houses_GroundedJN_T == "0") {
                                                          this.Houses_GroundedJN_T = "-";
                                                        }

                                                        if (this.THouses_CompletedJN == "0") {
                                                          this.THouses_CompletedJN = "-";
                                                        }

                                                        if (this.HousesOccupiedJNT == "0") {
                                                          this.HousesOccupiedJNT = "-";
                                                        }

                                                        if (this.HouseInvolvedT1 == "0") {
                                                          this.HouseInvolvedT1 = "-";
                                                        }

                                                        if (this.FundsDisbursed_in_HousesT1 == "0") {
                                                          this.FundsDisbursed_in_HousesT1 = "-";
                                                        }

                                                        if (this.Houses_GroundedT1 == "0") {
                                                          this.Houses_GroundedT1 = "-";
                                                        }

                                                        if (this.Houses_CompletedT1 == "0") {
                                                          this.Houses_CompletedT1 = "-";
                                                        }

                                                        if (this.HousesOccupiedT1 == "0") {
                                                          this.HousesOccupiedT1 = "-";
                                                        }

                                                        if (this.HouseInvolvedT2 == "0") {
                                                          this.HouseInvolvedT2 = "-";
                                                        }

                                                        if (this.FundsDisbursed_in_HousesT2 == "0") {
                                                          this.FundsDisbursed_in_HousesT2 = "-";
                                                        }

                                                        if (this.Houses_GroundedT2 == "0") {
                                                          this.Houses_GroundedT2 = "-";
                                                        }

                                                        if (this.Houses_CompletedT2 == "0") {
                                                          this.Houses_CompletedT2 = "-";
                                                        }

                                                        if (this.HousesOccupiedT2 == "0") {
                                                          this.HousesOccupiedT2 = "-";
                                                        }

                                                        if (this.HouseInvolvedT3 == "0") {
                                                          this.HouseInvolvedT3 = "-";
                                                        }

                                                        if (this.FundsDisbursed_in_HousesT3 == "0") {
                                                          this.FundsDisbursed_in_HousesT3 = "-";
                                                        }

                                                        if (this.Houses_GroundedT3 == "0") {
                                                          this.Houses_GroundedT3 = "-";
                                                        }

                                                        if (this.Houses_CompletedT3 == "0") {
                                                          this.Houses_CompletedT3 = "-";
                                                        }

                                                        if (this.HousesOccupiedT3 == "0") {
                                                          this.HousesOccupiedT3 = "-";
                                                        }

                                                        if (this.HouseInvolvedT4 == "0") {
                                                          this.HouseInvolvedT4 = "-";
                                                        }

                                                        if (this.FundsDisbursed_in_HousesT4 == "0") {
                                                          this.FundsDisbursed_in_HousesT4 = "-";
                                                        }

                                                        if (this.Houses_GroundedT4 == "0") {
                                                          this.Houses_GroundedT4 = "-";
                                                        }

                                                        if (this.Houses_CompletedT4 == "0") {
                                                          this.Houses_CompletedT4 = "-";
                                                        }

                                                        if (this.HousesOccupiedT4 == "0") {
                                                          this.HousesOccupiedT4 = "-";
                                                        }

                                                        if (this.HouseInvolvedT5 == "0") {
                                                          this.HouseInvolvedT5 = "-";
                                                        }

                                                        if (this.FundsDisbursed_in_HousesT5 == "0") {
                                                          this.FundsDisbursed_in_HousesT5 = "-";
                                                        }

                                                        if (this.Houses_GroundedT5 == "0") {
                                                          this.Houses_GroundedT5 = "-";
                                                        }

                                                        if (this.Houses_CompletedT5 == "0") {
                                                          this.Houses_CompletedT5 = "-";
                                                        }

                                                        if (this.HousesOccupiedT5 == "0") {
                                                          this.HousesOccupiedT5 = "-";
                                                        }


                                                        if (this.HouseInvolvedT6 == "0") {
                                                          this.HouseInvolvedT6 = "-";
                                                        }

                                                        if (this.FundsDisbursed_in_HousesT6 == "0") {
                                                          this.FundsDisbursed_in_HousesT6 = "-";
                                                        }

                                                        if (this.Houses_GroundedT6 == "0") {
                                                          this.Houses_GroundedT6 = "-";
                                                        }

                                                        if (this.Houses_CompletedT6 == "0") {
                                                          this.Houses_CompletedT6 = "-";
                                                        }

                                                        if (this.HousesOccupiedT6 == "0") {
                                                          this.HousesOccupiedT6 = "-";
                                                        }

                                                        if (this.THouseInvolvedGT == "0") {
                                                          this.THouseInvolvedGT = "-";
                                                        }

                                                        if (this.TFundsDisbursed_in_HousesGT == "0") {
                                                          this.TFundsDisbursed_in_HousesGT = "-";
                                                        }

                                                        if (this.THouses_GroundedGT == "0") {
                                                          this.THouses_GroundedGT = "-";
                                                        }

                                                        if (this.THouses_CompletedGT == "0") {
                                                          this.THouses_CompletedGT = "-";
                                                        }

                                                        if (this.THousesOccupiedGT == "0") {
                                                          this.THousesOccupiedGT = "-";
                                                        }

                                                        if (this.blc_1415_1 == "0") {
                                                          this.blc_1415_1 = "-";
                                                        }
                                                        if (this.blc_1415_2 == "0") {
                                                          this.blc_1415_2 = "-";
                                                        }

                                                        if (this.blc_1516_1 == "0") {
                                                          this.blc_1516_1 = "-";
                                                        }
                                                        if (this.blc_1516_2 == "0") {
                                                          this.blc_1516_2 = "-";
                                                        }

                                                        if (this.blc_1617_1 == "0") {
                                                          this.blc_1617_1 = "-";
                                                        }
                                                        if (this.blc_1617_2 == "0") {
                                                          this.blc_1617_2 = "-";
                                                        }

                                                        if (this.blc_1718_1 == "0") {
                                                          this.blc_1718_1 = "-";
                                                        }
                                                        if (this.blc_1718_2 == "0") {
                                                          this.blc_1718_2 = "-";
                                                        }

                                                        if (this.blc_1819_1 == "0") {
                                                          this.blc_1819_1 = "-";
                                                        }
                                                        if (this.blc_1819_2 == "0") {
                                                          this.blc_1819_2 = "-";
                                                        }

                                                        if (this.blc_1920_1 == "0") {
                                                          this.blc_1920_1 = "-";
                                                        }
                                                        if (this.blc_1920_2 == "0") {
                                                          this.blc_1920_2 = "-";
                                                        }

                                                        if (this.blc_1_TOT == "0") {
                                                          this.blc_1_TOT = "-";
                                                        }
                                                        if (this.blc_2_TOT == "0") {
                                                          this.blc_2_TOT = "-";
                                                        }

                                                        if (this.AHP_1415_1 == "0") {
                                                          this.AHP_1415_1 = "-";
                                                        }
                                                        if (this.AHP_1415_2 == "0") {
                                                          this.AHP_1415_2 = "-";
                                                        }

                                                        if (this.AHP_1516_1 == "0") {
                                                          this.AHP_1516_1 = "-";
                                                        }
                                                        if (this.AHP_1516_2 == "0") {
                                                          this.AHP_1516_2 = "-";
                                                        }

                                                        if (this.AHP_1617_1 == "0") {
                                                          this.AHP_1617_1 = "-";
                                                        }
                                                        if (this.AHP_1617_2 == "0") {
                                                          this.AHP_1617_2 = "-";
                                                        }

                                                        if (this.AHP_1718_1 == "0") {
                                                          this.AHP_1718_1 = "-";
                                                        }
                                                        if (this.AHP_1718_2 == "0") {
                                                          this.AHP_1718_2 = "-";
                                                        }


                                                        if (this.AHP_1819_1 == "0") {
                                                          this.AHP_1819_1 = "-";
                                                        }
                                                        if (this.AHP_1819_2 == "0") {
                                                          this.AHP_1819_2 = "-";
                                                        }

                                                        if (this.AHP_1920_1 == "0") {
                                                          this.AHP_1920_1 = "-";
                                                        }
                                                        if (this.AHP_1920_2 == "0") {
                                                          this.AHP_1920_2 = "-";
                                                        }
                                                        if (this.TotalFundsDisbursedAHP == "0" || this.TotalFundsDisbursedAHP == "0-") {
                                                          this.TotalFundsDisbursedAHP = "-";
                                                        }
                                                        if (this.AHP_1_TOT == "0" || this.AHP_1_TOT == "0-") {
                                                          this.AHP_1_TOT = "-";
                                                        }
                                                        if (this.AHP_2_TOT == "0" || this.AHP_2_TOT == "0-----") {
                                                          this.AHP_2_TOT = "-";
                                                        }
                                                        if (this.ISSR_1_TOT == "0") {
                                                          this.ISSR_1_TOT = "-";
                                                        }
                                                        if (this.ISSR_2_TOT == "0") {
                                                          this.ISSR_2_TOT = "-";
                                                        }




                                                        if (this.THouseInvolved == "0") {
                                                          this.THouseInvolved = "-";
                                                        }
                                                        if (this.TFundsDisbursed_in_Houses == "0") {
                                                          this.TFundsDisbursed_in_Houses = "-";
                                                        }
                                                        if (this.THouses_Grounded == "0") {
                                                          this.THouses_Grounded = "-";
                                                        }
                                                        if (this.THouses_Completed == "0") {
                                                          this.THouses_Completed = "-";
                                                        }
                                                        if (this.THousesOccupied == "0") {
                                                          this.THousesOccupied = "-";
                                                        }


                                                        if (this.PMAY1415_1 == "0") {
                                                          this.PMAY1415_1 = "-";
                                                        }
                                                        if (this.PMAY1415_2 == "0") {
                                                          this.PMAY1415_2 = "-";
                                                        }

                                                        if (this.PMAY1516_1 == "0" || this.PMAY1516_1 == "0-null") {
                                                          this.PMAY1516_1 = "-";
                                                        }
                                                        if (this.PMAY1516_2 == "0" || this.PMAY1516_2 == "0-null") {
                                                          this.PMAY1516_2 = "-";
                                                        }


                                                        if (this.PMAY1617_1 == "0" || this.PMAY1617_1 == "0-null") {
                                                          this.PMAY1617_1 = "-";
                                                        }
                                                        if (this.PMAY1617_2 == "0" || this.PMAY1617_2 == "0-null") {
                                                          this.PMAY1617_2 = "-";
                                                        }



                                                        if (this.PMAY1718_1 == "0" || this.PMAY1718_1 == "0-null") {
                                                          this.PMAY1718_1 = "-";
                                                        }
                                                        if (this.PMAY1718_2 == "0" || this.PMAY1718_2 == "0-null") {
                                                          this.PMAY1718_2 = "-";
                                                        }

                                                        if (this.PMAY1819_1 == "0" || this.PMAY1819_1 == "0-null") {
                                                          this.PMAY1819_1 = "-";
                                                        }
                                                        if (this.PMAY1819_2 == "0" || this.PMAY1819_2 == "0-null") {
                                                          this.PMAY1819_2 = "-";
                                                        }


                                                        if (this.PMAY1920_1 == "0" || this.PMAY1920_1 == "0-null") {
                                                          this.PMAY1920_1 = "-";
                                                        }
                                                        if (this.PMAY1920_2 == "0" || this.PMAY1920_2 == "0-null") {
                                                          this.PMAY1920_2 = "-";
                                                        }

                                                        if (this.PMAYT_1 == "0" || this.PMAYT_1 == "0-null") {
                                                          this.PMAYT_1 = "-";
                                                        }
                                                        if (this.PMAYT_2 == "0" || this.PMAYT_2 == "00-null0-null0-null0-null0-null	") {
                                                          this.PMAYT_2 = "-";
                                                        }












                                                      })
                                                    })
                                                  })
                                                })
                                              })
                                            })
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


  GetFilterData(stateCode, districtCodes, cityCodes, Compid) {
    //alert(stateCode);
    this.HouseInvolved01 = 0;

    this.HouseInvolved1 = 0;
    this.HouseInvolved2 = 0;
    this.HouseInvolved3 = 0;
    this.HouseInvolved4 = 0;
    this.HouseInvolved5 = 0;
    this.HouseInvolved6 = 0;
    this.THouseInvolved = 0;
    this.FundsDisbursed_in_Houses1 = 0;
    this.FundsDisbursed_in_Houses2 = 0;
    this.FundsDisbursed_in_Houses3 = 0;
    this.FundsDisbursed_in_Houses4 = 0;
    this.FundsDisbursed_in_Houses5 = 0;
    this.Houses_Grounded1 = 0;
    this.Houses_Grounded2 = 0;
    this.Houses_Grounded3 = 0;
    this.Houses_Grounded4 = 0;
    this.Houses_Grounded5 = 0;

    this.THouses_Grounded = 0;
    this.Houses_Completed1 = 0;
    this.Houses_Completed2 = 0;
    this.Houses_Completed3 = 0;
    this.Houses_Completed4 = 0;
    this.Houses_Completed5 = 0;
    this.THouses_Completed = 0;
    this.HousesOccupied1 = 0;
    this.HousesOccupied2 = 0;
    this.HousesOccupied3 = 0;
    this.HousesOccupied4 = 0;
    this.HousesOccupied5 = 0;
    this.FundsDisbursed_in_Houses1_AHP = 0;
    this.FundsDisbursed_in_Houses2_AHP = 0;
    this.FundsDisbursed_in_Houses3_AHP = 0;
    this.FundsDisbursed_in_Houses4_AHP = 0;
    this.FundsDisbursed_in_Houses5_AHP = 0;
    this.TotalFundsDisbursedAHP = 0;

    this.FundsDisbursed_in_Houses01 = 0;
    this.Houses_Grounded01 = 0;
    this.Houses_Completed01 = 0;
    this.HousesOccupied01 = 0;
    this.HouseInvolvedT1 = 0;

    this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "BLCS", "2014-15").subscribe(result_BLCS => {
      try {
        this.HouseInvolved01 = result_BLCS[0].Housesinvolved;
        // alert(0);
        this.FundsDisbursed_in_Houses01 = result_BLCS[0].FundsDisbursed_in_Houses;
        this.Houses_Grounded01 = result_BLCS[0].Houses_Grounded;
        this.Houses_Completed01 = result_BLCS[0].Houses_Completed;
        this.HousesOccupied01 = result_BLCS[0].HousesOccupied;
      }
      catch{ }
      finally { }
    })
    this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "BLCS", "2015-16").subscribe(result_BLCS15 => {
      this.HouseInvolved1 = result_BLCS15[0].Housesinvolved;
      this.fistNumber = this.HouseInvolved1;
      this.FundsDisbursed_in_Houses1 = result_BLCS15[0].FundsDisbursed_in_Houses;
      this.Houses_Grounded1 = result_BLCS15[0].Houses_Grounded;
      this.Houses_Completed1 = result_BLCS15[0].Houses_Completed;
      this.HousesOccupied1 = result_BLCS15[0].HousesOccupied;
      // })

      this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "BLCS", "2016-17").subscribe(result_BLCS16 => {
        try {
          this.HouseInvolved2 = result_BLCS16[0].Housesinvolved;
          this.secondNumber = this.HouseInvolved2;
          this.FundsDisbursed_in_Houses2 = result_BLCS16[0].FundsDisbursed_in_Houses;
          this.Houses_Grounded2 = result_BLCS16[0].Houses_Grounded;
          this.Houses_Completed2 = result_BLCS16[0].Houses_Completed;
          this.HousesOccupied2 = result_BLCS16[0].HousesOccupied;
        }
        catch{ }
        finally { }
        //  })
        // this.totalNumber=this.fistNumber + this.secondNumber;
        //alert(this.totalNumber);

        this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "BLCS", "2017-18").subscribe(result_BLCS17 => {
          this.HouseInvolved3 = result_BLCS17[0].Housesinvolved;
          this.FundsDisbursed_in_Houses3 = result_BLCS17[0].FundsDisbursed_in_Houses;
          this.Houses_Grounded3 = result_BLCS17[0].Houses_Grounded;
          this.Houses_Completed3 = result_BLCS17[0].Houses_Completed;
          this.HousesOccupied3 = result_BLCS17[0].HousesOccupied;
          //     })
          // alert();
          this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "BLCS", "2018-19").subscribe(result_BLCS18 => {
            this.HouseInvolved4 = result_BLCS18[0].Housesinvolved;
            this.FundsDisbursed_in_Houses4 = result_BLCS18[0].FundsDisbursed_in_Houses;
            this.Houses_Grounded4 = result_BLCS18[0].Houses_Grounded;
            this.Houses_Completed4 = result_BLCS18[0].Houses_Completed;
            this.HousesOccupied4 = result_BLCS18[0].HousesOccupied;


            this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "BLCS", "2019-20").subscribe(result_BLCS19 => {
              try {
                this.HouseInvolved5 = result_BLCS19[0].Housesinvolved;
                this.FundsDisbursed_in_Houses5 = result_BLCS19[0].FundsDisbursed_in_Houses;
                this.Houses_Grounded5 = result_BLCS19[0].Houses_Grounded;
                this.Houses_Completed5 = result_BLCS19[0].Houses_Completed;
                this.HousesOccupied5 = result_BLCS19[0].HousesOccupied;
              }
              catch{ }
              finally { }
              //\       }) 

              this.THouseInvolved = this.HouseInvolved01 + this.HouseInvolved1 + this.HouseInvolved2 + this.HouseInvolved3 + this.HouseInvolved4 + this.HouseInvolved5;

              //             alert(5);
              this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "AHP", "2014-15").subscribe(result_AHP => {
                this.HouseInvolved0_AHP = result_AHP[0].Housesinvolved;
                this.FundsDisbursed_in_Houses0_AHP = result_AHP[0].FundsDisbursed_in_Houses;
                this.Houses_Grounded0_AHP = result_AHP[0].Houses_Grounded;
                this.Houses_Completed0_AHP = result_AHP[0].Houses_Completed;
                this.HousesOccupied0_AHP = result_AHP[0].HousesOccupied;
              })
              //           alert(6);
              this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "AHP", "2015-16").subscribe(result_AHP => {
                this.HouseInvolved1_AHP = result_AHP[0].Housesinvolved;
                this.FundsDisbursed_in_Houses1_AHP = result_AHP[0].FundsDisbursed_in_Houses;
                this.Houses_Grounded1_AHP = result_AHP[0].Houses_Grounded;
                this.Houses_Completed1_AHP = result_AHP[0].Houses_Completed;
                this.HousesOccupied1_AHP = result_AHP[0].HousesOccupied;
              })
              //           alert(7);
              this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "AHP", "2016-17").subscribe(result_AHP => {
                this.HouseInvolved2_AHP = result_AHP[0].Housesinvolved;
                this.FundsDisbursed_in_Houses2_AHP = result_AHP[0].FundsDisbursed_in_Houses;
                this.Houses_Grounded2_AHP = result_AHP[0].Houses_Grounded;
                this.Houses_Completed2_AHP = result_AHP[0].Houses_Completed;
                this.HousesOccupied2_AHP = result_AHP[0].HousesOccupied;
              })
              //             alert(8);
              this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "AHP", "2017-18").subscribe(result_AHP => {
                this.HouseInvolved3_AHP = result_AHP[0].Housesinvolved;
                this.FundsDisbursed_in_Houses3_AHP = result_AHP[0].FundsDisbursed_in_Houses;
                this.Houses_Grounded3_AHP = result_AHP[0].Houses_Grounded;
                this.Houses_Completed3_AHP = result_AHP[0].Houses_Completed;
                this.HousesOccupied3_AHP = result_AHP[0].HousesOccupied;
              })
              //               alert(9);
              this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "AHP", "2018-19").subscribe(result_AHP => {
                this.HouseInvolved4_AHP = result_AHP[0].Housesinvolved;
                this.FundsDisbursed_in_Houses4_AHP = result_AHP[0].FundsDisbursed_in_Houses;
                this.Houses_Grounded4_AHP = result_AHP[0].Houses_Grounded;
                this.Houses_Completed4_AHP = result_AHP[0].Houses_Completed;
                this.HousesOccupied4_AHP = result_AHP[0].HousesOccupied;
              })
              //                 alert(10);
              this.service.GetStatusofHouses_CompWiseNew(stateCode, districtCodes, cityCodes, "AHP", "2019-20").subscribe(result_AHP => {
                this.HouseInvolved5_AHP = result_AHP[0].Housesinvolved;
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

              this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode, districtCodes, cityCodes, "ISSR", "2014-15").subscribe(result_ISSR0 => {
                this.HouseInvolved0_ISSR = result_ISSR0[0].Housesinvolved;
                this.FundsDisbursed_in_Houses0_ISSR = result_ISSR0[0].FundsDisbursed_in_Houses;
                this.Houses_Grounded0_ISSR = result_ISSR0[0].Houses_Grounded;
                this.Houses_Completed0_ISSR = result_ISSR0[0].Houses_Completed;
                this.HousesOccupied0_ISSR = result_ISSR0[0].HousesOccupied;
              })
              this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode, districtCodes, cityCodes, "ISSR", "2015-16").subscribe(result_ISSR => {
                this.HouseInvolved1_ISSR = result_ISSR[0].Housesinvolved;
                this.FundsDisbursed_in_Houses1_ISSR = result_ISSR[0].FundsDisbursed_in_Houses;
                this.Houses_Grounded1_ISSR = result_ISSR[0].Houses_Grounded;
                this.Houses_Completed1_ISSR = result_ISSR[0].Houses_Completed;
                this.HousesOccupied1_ISSR = result_ISSR[0].HousesOccupied;
              })
              this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode, districtCodes, cityCodes, "ISSR", "2016-17").subscribe(result_ISSR2 => {
                try {
                  this.HouseInvolved2_ISSR = result_ISSR2[0].Housesinvolved;
                  this.Houses_Grounded2_ISSR = result_ISSR2[0].Houses_Grounded;
                  this.Houses_Completed2_ISSR = result_ISSR2[0].Houses_Completed;
                  this.HousesOccupied2_ISSR = result_ISSR2[0].HousesOccupied;
                }
                catch{ }
                finally { }
              })
              this.service.sp_GetHousesStatus_ISSR_FinYearWise(stateCode, districtCodes, cityCodes, "ISSR", "2017-18").subscribe(result_ISSR3 => {
                this.HouseInvolved3_ISSR = result_ISSR3[0].Housesinvolved;
                this.FundsDisbursed_in_Houses3_ISSR = result_ISSR3[0].FundsDisbursed_in_Houses;
                this.Houses_Grounded3_ISSR = result_ISSR3[0].Houses_Grounded;
                this.Houses_Completed3_ISSR = result_ISSR3[0].Houses_Completed;
                this.HousesOccupied3_ISSR = result_ISSR3[0].HousesOccupied;
              })
              //-----------------------------------------JNNURM-------------------------------------------------   
              this.service.sp_GetHousesStatusForVerticalJN(stateCode, districtCodes, cityCodes).subscribe(resultJN => {
                this.Houses_GroundedJN_T = resultJN[0].Houses_Grounded;
                this.THouses_CompletedJN = resultJN[0].Houses_Completed;
                this.HousesOccupiedJNT = resultJN[0].HousesOccupied;
              })

              //-----------------------------
              this.service.GetCLSS_Houses_VerticalWise(this.stateCode).subscribe(result_CLSS => {
                this.Bene2014_15_CLSS = result_CLSS[0].Bene2014_15;
                this.Bene2015_16_CLSS = result_CLSS[0].Bene2015_16;
                this.Bene2016_17_CLSS = result_CLSS[0].Bene2016_17;
                this.Bene2017_18_CLSS = result_CLSS[0].Bene2017_18;
                this.Bene2018_19_CLSS = result_CLSS[0].Bene2018_19;
                this.Bene2019_20_CLSS = result_CLSS[0].Bene2019_20;
              })
              this.BeneCLSS_Total = parseFloat(this.Bene2014_15_CLSS) + parseFloat(this.Bene2015_16_CLSS) + parseFloat(this.Bene2016_17_CLSS) +
                parseFloat(this.Bene2017_18_CLSS) + parseFloat(this.Bene2018_19_CLSS) + parseFloat(this.Bene2019_20_CLSS);// +parseFloat(this.Bene2019_20_CLSS); 

              //  this.Bene2020_21_CLSS=result_CLSS[0].Bene2020_21;
              //  this.Bene2021_22_CLSS=result_CLSS[0].Bene2021_22;



              this.FundsDisbursed_in_HousesT1 = this.Bene2014_15_CLSS;





              //-----------------------------
              //this.THouseInvolved =this.HouseInvolved01  +this.HouseInvolved1 + this.HouseInvolved2 +this.HouseInvolved3 +
              //this.HouseInvolved4 +this.HouseInvolved5;


              this.TFundsDisbursed_in_Houses = parseFloat(this.FundsDisbursed_in_Houses01) + parseFloat(this.FundsDisbursed_in_Houses1) + parseFloat(this.FundsDisbursed_in_Houses2)
                + parseFloat(this.FundsDisbursed_in_Houses3) + parseFloat(this.FundsDisbursed_in_Houses4) + parseFloat(this.FundsDisbursed_in_Houses5);


              this.THouses_Grounded = this.Houses_Grounded01 + this.Houses_Grounded1 + this.Houses_Grounded2 + this.Houses_Grounded3 + this.Houses_Grounded4 + this.Houses_Grounded5;
              this.THouses_Completed = this.Houses_Completed01 + this.Houses_Completed1 + this.Houses_Completed2 + this.Houses_Completed3 + this.Houses_Completed4 + this.Houses_Completed5;
              this.THousesOccupied = this.HousesOccupied01 + this.HousesOccupied1 + this.HousesOccupied2 + this.HousesOccupied3 + this.HousesOccupied4 + this.HousesOccupied5;


              this.THouseInvolved_AHP = this.HouseInvolved0_AHP + this.HouseInvolved1_AHP + this.HouseInvolved2_AHP + this.HouseInvolved3_AHP + this.HouseInvolved4_AHP + this.HouseInvolved5_AHP;
              this.TotalFundsDisbursedAHP = this.FundsDisbursed_in_Houses0_AHP + this.FundsDisbursed_in_Houses1_AHP + this.FundsDisbursed_in_Houses2_AHP + this.FundsDisbursed_in_Houses3_AHP + this.FundsDisbursed_in_Houses4_AHP + this.FundsDisbursed_in_Houses5_AHP;
              this.THouses_Grounded_AHP = this.Houses_Grounded0_AHP + this.Houses_Grounded1_AHP + this.Houses_Grounded2_AHP + this.Houses_Grounded3_AHP + this.Houses_Grounded4_AHP + this.Houses_Grounded5_AHP;
              this.THouses_Completed_AHP = this.Houses_Completed0_AHP + this.Houses_Completed1_AHP + this.Houses_Completed2_AHP + this.Houses_Completed3_AHP + this.Houses_Completed4_AHP + this.Houses_Completed5_AHP;
              this.THousesOccupied_AHP = this.HousesOccupied0_AHP + this.HousesOccupied1_AHP + this.HousesOccupied2_AHP + this.HousesOccupied3_AHP + this.HousesOccupied4_AHP + this.HousesOccupied5_AHP;

              this.HouseInvolvedT2 = this.HouseInvolved1 + this.HouseInvolved1_AHP + this.HouseInvolved1_ISSR + this.Bene2015_16_CLSS;
              this.FundsDisbursed_in_HousesT3 = this.FundsDisbursed_in_Houses2 + this.FundsDisbursed_in_Houses2_AHP + this.Bene2016_17_CLSS;

              this.HouseInvolvedT3 = this.HouseInvolved2 + this.HouseInvolved2_AHP + this.Bene2016_17_CLSS;

              this.Houses_GroundedT3 = this.Houses_Grounded2 + this.Houses_Grounded2_AHP + this.Bene2016_17_CLSS;

              this.HouseInvolvedT4 = this.HouseInvolved3 + this.HouseInvolved3_AHP + this.Bene2017_18_CLSS;

              this.FundsDisbursed_in_HousesT4 = this.FundsDisbursed_in_Houses3 + this.FundsDisbursed_in_Houses3_AHP + this.Bene2017_18_CLSS;
              this.Houses_GroundedT4 = this.Houses_Grounded3 + this.Houses_Grounded3_AHP + this.Bene2017_18_CLSS;
              this.Houses_CompletedT4 = this.Houses_Completed3 + this.Houses_Completed3_AHP + this.Bene2017_18_CLSS;
              this.HousesOccupiedT4 = this.HousesOccupied3 + this.HousesOccupied3_AHP + this.Bene2017_18_CLSS;

              this.HouseInvolvedT5 = this.HouseInvolved4 + this.HouseInvolved4_AHP + this.Bene2018_19_CLSS;
              this.FundsDisbursed_in_HousesT5 = this.FundsDisbursed_in_Houses4 + this.FundsDisbursed_in_Houses4_AHP + this.Bene2018_19_CLSS;
              this.Houses_GroundedT5 = this.Houses_Grounded4 + this.Houses_Grounded4_AHP + this.Bene2018_19_CLSS;
              this.Houses_CompletedT5 = this.Houses_Completed4 + this.Houses_Completed4_AHP + this.Bene2018_19_CLSS;
              this.HousesOccupiedT5 = this.HousesOccupied4 + this.HousesOccupied4_AHP + this.Bene2018_19_CLSS;

              this.HouseInvolvedT1 = this.Bene2014_15_CLSS + this.HouseInvolved0_ISSR + this.HouseInvolved0_AHP + this.HouseInvolved01;
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
    //alert(stateCodes);
    // stateCodes="28";
    this.stateCode = stateCodes.value;
    this.StateName = stateCodes[stateCodes.selectedIndex].text;

    if (this.stateCode == "0") {
      this.lblStateDisttCity = "All India";
      this.districtCodes = "0";
      this.cityCodes = "0";
      this.stateCodes = "0";
      this.districtCodes = "0";
      this.cityCodes = "0";
      this.service.StateList();
      this.service.DisttList(this.stateCode);
      this.service.CityList(this.districtCodes);
      // this.ngOnInit();
      //    this.LoadData(this.stateCodes,this.districtCodes,this.cityCodes);
      this.GetFilterDatanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Compid);

      //--------------------------------- Graph Form
      this.BindPMayData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");
      this.BindBLC_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");
      this.BindAHP_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");
      this.BindISSRData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");
      this.BindISSRDatanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G);
      this.BindPMayDatanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G);
      this.BindAHP_Datanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G);
      this.BindBLC_DataNew(this.stateCodes, this.districtCodes, this.cityCodes, "0", this.Fin_Year_G);


    }
    else {
      this.service.GetStateNameByCode(this.stateCode).subscribe(resultName => {
        this.lblStateDisttCity = resultName.States_UT;
      });
      this.districtCodes = "0";
      this.cityCodes = "0";
      //this.stateCodes = "0";
      this.districtCodes = "0";
      this.cityCodes = "0";

      this.service.DisttList(this.stateCode);
      this.service.CityList(this.districtCodes);//
      this.GetFilterDatanew(this.stateCode, this.districtCodes, this.cityCodes, this.Compid);

      // Graph Form
      this.BindAHP_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");

      this.BindPMayData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");
      this.BindBLC_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");
      this.BindISSRData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");

      this.BindISSRDatanew(this.stateCodes, this.districtCodes, this.cityCodes, this.selectedYear_G);

      this.BindPMayDatanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G);
      this.BindAHP_Datanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G);
      this.BindBLC_DataNew(this.stateCodes, this.districtCodes, this.cityCodes, "0", this.Fin_Year_G);

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
      // this.LoadData(this.stateCodes,this.districtCodes,this.cityCodes);
      this.GetFilterDatanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Compid);
    }
    else {
      this.districtCodes = DisttCode;
      this.service.CityList(DisttCode);
      //this.GetFilterData();
      this.GetFilterDatanew(this.stateCode, this.districtCodes, this.cityCodes, this.Compid);
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
      //  this.LoadData(this.stateCodes,this.districtCodes,this.cityCodes);
      this.GetFilterDatanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Compid);
    }
    else {
      // alert(cityCode);
      this.cityCodes = cityCode;
      //this.GetFilterData();
      this.GetFilterDatanew(this.stateCode, this.districtCodes, this.cityCodes, this.Compid);
    }
  }

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<, below is graph code >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  getFinDetails(Fin_Year) {
    // alert(Fin_Year);
    this.BindPMayData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, Fin_Year);
    this.BindBLC_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, Fin_Year);
    this.BindAHP_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, Fin_Year);
    this.BindISSRData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, Fin_Year);
    this.BindISSRDatanew(this.stateCodes, this.districtCodes, this.cityCodes, Fin_Year);
    this.BindPMayDatanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G);
    this.BindBLC_DataNew(this.stateCodes, this.districtCodes, this.cityCodes, "0", this.Fin_Year_G);
    this.BindAHP_Datanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G);

  }
  getStateDetails_G(stateCodes) {
    // debugger;

    //alert(stateCodes);
    // alert(this.districtCodes);
    if (stateCodes == "0") {
      //  alert(stateCodes);
      this.distValue = "0";
      this.cityValue = "0";
      this.service.StateList();
      this.DistrictMessage_G = "Select District";
      this.service.DisttDetails = [];
      this.CityMessage_G = "Select City";
      this.service.CityDetails = [];

      this.DisabledCheckBox_G = false;
      //---------------------------- nEW cODE -------------------------
      this.stateCodes = stateCodes;
      this.service.DisttList(stateCodes);

      if (stateCodes == 0) {
        this.districtCodes = "0";
        this.cityCodes = "0";
        this.stateCodes = "0";
        this.districtCodes = "0";
        this.cityCodes = "0";
        this.service.StateList();
        this.service.DisttList(this.stateCodes);
        this.service.CityList(this.districtCodes);
        //  this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);

        this.BindPMayData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");
        this.BindBLC_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");
        this.BindAHP_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");
        this.BindISSRData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");
        this.BindISSRDatanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G);
        this.BindPMayDatanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G);
        this.BindAHP_Datanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G);
        this.BindBLC_DataNew(this.stateCodes, this.districtCodes, this.cityCodes, "0", this.Fin_Year_G);
      }
    }
    else {
      this.stateCodes = stateCodes;
      this.service.DisttList(stateCodes);

      this.service.CityList(this.districtCodes);//
      this.DisabledCheckBox_G = true;
      // this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);

      this.BindAHP_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");

      this.BindPMayData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");
      this.BindBLC_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");
      this.BindISSRData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "");

      this.BindISSRDatanew(this.stateCodes, this.districtCodes, this.cityCodes, this.selectedYear_G);

      this.BindPMayDatanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G);
      this.BindAHP_Datanew(this.stateCodes, this.districtCodes, this.cityCodes, this.Fin_Year_G);
      this.BindBLC_DataNew(this.stateCodes, this.districtCodes, this.cityCodes, "0", this.Fin_Year_G);

      //  this.BindBLC_DataNew(this.stateCodes, this.districtCodes, this.cityCodes,"0" ,this.Fin_Year);
    }
  }
  // Fin_Year(stateCodes: string, districtCodes: string, cityCodes: string, Fin_Year: any) {
  //   throw new Error("Method not implemented.");
  // }

  ProjectCost(event) {
    const checked = event.target.checked;
    const yearValue = event.target.value;
    if (checked) {
      this.lstYear_G.push(yearValue);
      this.selectedYear_G = this.lstYear_G.toString();
    }
    else {
      let index = this.lstYear_G.findIndex(a => a == yearValue);
      if (index !== -1) {
        this.lstYear_G.splice(index, 1);
      }
      this.selectedYear_G = this.lstYear_G.toString();
    }
    //alert(this.selectedYears );
    if (this.selectedYear_G.length > 0) {
      this.BindPMayDatanew(this.stateCodes, this.districtCodes, this.cityCodes, this.selectedYear_G);
      this.BindAHP_Datanew(this.stateCodes, this.districtCodes, this.cityCodes, this.selectedYear_G);
      this.BindBLC_DataNew(this.stateCodes, this.districtCodes, this.cityCodes, "0", this.selectedYear_G);
      this.BindISSRDatanew(this.stateCodes, this.districtCodes, this.cityCodes, this.selectedYear_G);
    }
    else {
      this.BindPMayData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp_G, "0");
      this.BindAHP_Data(this.stateCodes, this.districtCodes, this.cityCodes, "0", this.selectedYear_G);
      this.BindBLC_Data(this.stateCodes, this.districtCodes, this.cityCodes, "0", this.selectedYear_G);
      this.BindISSRData(this.stateCodes, this.districtCodes, this.cityCodes, "0", this.selectedYear_G);

    }
  }

  ShowPage() {
    this.router.navigate(['/Admin/VerticalHousesDetails']);
  }
  BindPMayDatanew(stateCode, DisttCode, cityCode, Fin_Year) {
    var str = Fin_Year;//'SUM(BENE2014_15),SUM(BENE2015_16)';
    //   alert(str.length);
    if (str.length == 101) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      var z2 = splitted[3].substring(8, str.length - 3);
      var z3 = splitted[4].substring(8, str.length - 3);
      var z4 = splitted[5].substring(8, str.length - 3);
    }
    if (str.length == 84) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      var z2 = splitted[3].substring(8, str.length - 3);
      var z3 = splitted[4].substring(8, str.length - 3);
    }
    if (str.length == 67) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      var z2 = splitted[3].substring(8, str.length - 3);
      // alert(x1);
      //  alert(Y1); 
    }
    if (str.length == 50) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      // alert(x1);
      //  alert(Y1); 
    }
    if (str.length == 33) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      // alert(x1);
      //  alert(Y1); 
    }
    if (str.length == 16) {
      var splitted = str.split(",", str.length);
      //          alert(splitted[0]);
      var x2 = splitted[0].substring(8, str.length - 1);
      //          alert(splitted.length);

    }
    //  let x = stringToSplit.split(" ");

    if (splitted.length == 1) {
      if (x2 == "2014_15")
        x2 = "2014-15";
      if (x2 == "2015_16")
        x2 = "2015-16";
      if (x2 == "2016_17")
        x2 = "2017-18";
      if (x2 == "2018_19")
        x2 = "2018-19";
      if (x2 == "2019_20")
        x2 = "2019-20";

      this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code
        if (result[0].FinYear != "0") {
          this.Fin_Year14_15_G = result[0].FinYear;
          this.Housesinvolved14_15_G = result[0].Housesinvolved;
          this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
          this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
          this.Houses_Complete14_15_G = result[0].Houses_Completed;
          this.HousesOccupied14_15_G = result[0].HousesOccupied;
          this.First_Houses14_15_G = result[0].First_Houses;
          this.Second_Houses14_15_G = result[0].Second_Houses;
          this.Third_Houses14_15_G = result[0].Third_Houses;
        }

        let chart = new CanvasJS.Chart("chartPMAYU", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress(No of Houses) Consolidated (PMAY(U))",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [

              { label: x2, y: this.Housesinvolved14_15_G },

            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.FundsDisbursed_in_Houses14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Houses_Grounde14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Houses_Complete14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.HousesOccupied14_15_G },
            ]
          },


          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Second_Houses14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Third_Houses14_15_G },
            ]
          },

          ],
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
      });



    }
    if (splitted.length == 2) {
      if (x1 == "2014_15)")
        x1 = "2014-15";
      if (x1 == "2015_16)")
        x1 = "2015-16";
      if (x1 == "2016_17")
        x1 = "2017-18";
      if (x1 == "2018_19")
        x1 = "2018-19";
      if (x1 == "2019_20")
        x1 = "2019-20";


      if (Y1 == "2014_15)")
        Y1 = "2014-15";
      if (Y1 == "2015_16)")
        Y1 = "2015-16";
      if (Y1 == "2016_17")
        Y1 = "2017-18";
      if (Y1 == "2018_19")
        Y1 = "2018-19";
      if (Y1 == "2019_20")
        Y1 = "2019-20";

      this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code
        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartPMAYU", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress(No of Houses) Consolidated (PMAY(U))",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G }

            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: x1, y: this.First_Houses14_15 },
          //     { label: Y1, y: this.First_Houses15_16 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G }
            ]
          },

          ],
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
      });

    }
    if (splitted.length == 3) {

      if (x1 == "2014_15)")
        x1 = "2014-15";
      if (x1 == "2015_16)")
        x1 = "2015-16";
      if (x1 == "2016_17)")
        x1 = "2017-18";
      if (x1 == "2018_19)")
        x1 = "2018-19";
      if (x1 == "2019_20)" || x1 == "2019_20")
        x1 = "2019-20";


      if (Y1 == "2014_15)")
        Y1 = "2014-15";
      if (Y1 == "2015_16)")
        Y1 = "2015-16";
      if (Y1 == "2016_17)")
        Y1 = "2017-18";
      if (Y1 == "2018_19)")
        Y1 = "2018-19";
      if (Y1 == "2019_20)" || Y1 == "2019_20")
        Y1 = "2019-20";

      if (z1 == "2014_15)")
        z1 = "2014-15";
      if (z1 == "2015_16)")
        z1 = "2015-16";
      if (z1 == "2016_17)")
        z1 = "2017-18";
      if (z1 == "2018_19)")
        z1 = "2018-19";
      if (z1 == "2019_20)" || z1 == "2019_20")
        z1 = "2019-20";

      this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code

        //   this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartPMAYU", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress(No of Houses) Consolidated (PMAY(U))",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G }

            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: x1, y: this.First_Houses14_15 },
          //     { label: Y1, y: this.First_Houses15_16 },
          //     { label: z1, y: this.First_Houses16_17 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G }
            ]
          },

          ],
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
      });

    }

    if (splitted.length == 4) {
      if (x1 == "2014_15)") x1 = "2014-15";
      if (x1 == "2015_16)") x1 = "2015-16";
      if (x1 == "2016_17)") x1 = "2016-17";
      if (x1 == "2017_18)") x1 = "2017-18";

      if (x1 == "2018_19)") x1 = "2018-19";
      if (x1 == "2019_20)") x1 = "2019-20";


      if (Y1 == "2014_15)") Y1 = "2014-15";
      if (Y1 == "2015_16") Y1 = "2015-16";
      if (Y1 == "2016_17)") Y1 = "2016-17";
      if (Y1 == "2017_18)") Y1 = "2017-18";
      if (Y1 == "2018_19)") Y1 = "2018-19";
      if (Y1 == "2019_20)") Y1 = "2019-20";

      if (z1 == "2014_15)") z1 = "2014-15";
      if (z1 == "2015_16)") z1 = "2015-16";
      if (z1 == "2016_17)") z1 = "2016-17";
      if (z1 == "2017_18)") z1 = "2017-18";
      if (z1 == "2018_19)") z1 = "2018-19";
      if (z1 == "2019_20)") z1 = "2019-20";

      if (z2 == "2014_15)") z2 = "2014-15";
      if (z2 == "2015_16)") z2 = "2015-16";
      if (z2 == "2016_17)") z2 = "2016-17";
      if (z2 == "2017_18)") z2 = "2017-18";
      if (z2 == "2018_19)") z2 = "2018-19";
      if (z2 == "2019_20)") z2 = "2019-20";

      this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code

        //  this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year17_18_G = result[3].FinYear;
          this.Housesinvolved17_18_G = result[3].Housesinvolved;
          this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
          this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
          this.Houses_Complete17_18_G = result[3].Houses_Completed;
          this.HousesOccupied17_18_G = result[3].HousesOccupied;
          this.First_Houses17_18_G = result[3].First_Houses;
          this.Second_Houses17_18_G = result[3].Second_Houses;
          this.Third_Houses17_18_G = result[3].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartPMAYU", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress(No of Houses) Consolidated (PMAY(U))",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G },
              { label: z2, y: this.Housesinvolved17_18_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G },
              { label: z2, y: this.Houses_Grounde17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G },
              { label: z2, y: this.Houses_Complete17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G },
              { label: z2, y: this.HousesOccupied17_18_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: x1, y: this.First_Houses14_15 },
          //     { label: Y1, y: this.First_Houses15_16 },
          //     { label: z1, y: this.First_Houses16_17 },
          //     { label: z2, y: this.First_Houses17_18 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G },
              { label: z2, y: this.Second_Houses17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G },
              { label: z2, y: this.Third_Houses17_18_G }
            ]
          },

          ],
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
      });

    }
    if (splitted.length == 5) {
      if (x1 == "2014_15)") x1 = "2014-15";
      if (x1 == "2015_16)") x1 = "2015-16";
      if (x1 == "2016_17)") x1 = "2016-17";
      if (x1 == "2017_18)") x1 = "2017-18";

      if (x1 == "2018_19)") x1 = "2018-19";
      if (x1 == "2019_20)") x1 = "2019-20";


      if (Y1 == "2014_15)") Y1 = "2014-15";
      if (Y1 == "2015_16") Y1 = "2015-16";
      if (Y1 == "2016_17)") Y1 = "2016-17";
      if (Y1 == "2017_18)") Y1 = "2017-18";
      if (Y1 == "2018_19)") Y1 = "2018-19";
      if (Y1 == "2019_20)") Y1 = "2019-20";

      if (z1 == "2014_15)") z1 = "2014-15";
      if (z1 == "2015_16)") z1 = "2015-16";
      if (z1 == "2016_17)") z1 = "2016-17";
      if (z1 == "2017_18)") z1 = "2017-18";
      if (z1 == "2018_19)") z1 = "2018-19";
      if (z1 == "2019_20)") z1 = "2019-20";

      if (z2 == "2014_15)") z2 = "2014-15";
      if (z2 == "2015_16)") z2 = "2015-16";
      if (z2 == "2016_17)") z2 = "2016-17";
      if (z2 == "2017_18)") z2 = "2017-18";
      if (z2 == "2018_19)") z2 = "2018-19";
      if (z2 == "2019_20)") z2 = "2019-20";

      if (z3 == "2014_15)") z3 = "2014-15";
      if (z3 == "2015_16)") z3 = "2015-16";
      if (z3 == "2016_17)") z3 = "2016-17";
      if (z3 == "2017_18)") z3 = "2017-18";
      if (z3 == "2018_19)") z3 = "2018-19";
      if (z3 == "2019_20)") z3 = "2019-20";

      this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code

        // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year17_18_G = result[3].FinYear;
          this.Housesinvolved17_18_G = result[3].Housesinvolved;
          this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
          this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
          this.Houses_Complete17_18_G = result[3].Houses_Completed;
          this.HousesOccupied17_18_G = result[3].HousesOccupied;
          this.First_Houses17_18_G = result[3].First_Houses;
          this.Second_Houses17_18_G = result[3].Second_Houses;
          this.Third_Houses17_18_G = result[3].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year18_19_G = result[4].FinYear;
          this.Housesinvolved18_19_G = result[4].Housesinvolved;
          this.FundsDisbursed_in_Houses18_19_G = result[4].FundsDisbursed_in_Houses;
          this.Houses_Grounde18_19_G = result[4].Houses_Grounded;
          this.Houses_Complete18_19_G = result[4].Houses_Completed;
          this.HousesOccupied18_19_G = result[4].HousesOccupied;
          this.First_Houses18_19_G = result[4].First_Houses;
          this.Second_Houses18_19_G = result[4].Second_Houses;
          this.Third_Houses18_19_G = result[4].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartPMAYU", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress(No of Houses) Consolidated (PMAY(U))",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G },
              { label: z2, y: this.Housesinvolved17_18_G },
              { label: z3, y: this.Housesinvolved18_19_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18_G },
              { label: z3, y: this.FundsDisbursed_in_Houses18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G },
              { label: z2, y: this.Houses_Grounde17_18_G },
              { label: z3, y: this.Houses_Grounde18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G },
              { label: z2, y: this.Houses_Complete17_18_G },
              { label: z3, y: this.Houses_Complete18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G },
              { label: z2, y: this.HousesOccupied17_18_G },
              { label: z3, y: this.HousesOccupied18_19_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: x1, y: this.First_Houses14_15 },
          //     { label: Y1, y: this.First_Houses15_16 },
          //     { label: z1, y: this.First_Houses16_17 },
          //     { label: z2, y: this.First_Houses17_18 },
          //     { label: z3, y: this.First_Houses18_19 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G },
              { label: z2, y: this.Second_Houses17_18_G },
              { label: z3, y: this.Second_Houses18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G },
              { label: z2, y: this.Third_Houses17_18_G },
              { label: z3, y: this.Third_Houses18_19_G }
            ]
          },

          ],
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
      });

    }
    if (splitted.length == 6) {
      if (x1 == "2014_15)") x1 = "2014-15";
      if (x1 == "2015_16)") x1 = "2015-16";
      if (x1 == "2016_17)") x1 = "2016-17";
      if (x1 == "2017_18)") x1 = "2017-18";

      if (x1 == "2018_19)") x1 = "2018-19";
      if (x1 == "2019_20)") x1 = "2019-20";


      if (Y1 == "2014_15)") Y1 = "2014-15";
      if (Y1 == "2015_16") Y1 = "2015-16";
      if (Y1 == "2016_17)") Y1 = "2016-17";
      if (Y1 == "2017_18)") Y1 = "2017-18";
      if (Y1 == "2018_19)") Y1 = "2018-19";
      if (Y1 == "2019_20)") Y1 = "2019-20";

      if (z1 == "2014_15)") z1 = "2014-15";
      if (z1 == "2015_16)") z1 = "2015-16";
      if (z1 == "2016_17)") z1 = "2016-17";
      if (z1 == "2017_18)") z1 = "2017-18";
      if (z1 == "2018_19)") z1 = "2018-19";
      if (z1 == "2019_20)") z1 = "2019-20";

      if (z2 == "2014_15)") z2 = "2014-15";
      if (z2 == "2015_16)") z2 = "2015-16";
      if (z2 == "2016_17)") z2 = "2016-17";
      if (z2 == "2017_18)") z2 = "2017-18";
      if (z2 == "2018_19)") z2 = "2018-19";
      if (z2 == "2019_20)") z2 = "2019-20";

      if (z3 == "2014_15)") z3 = "2014-15";
      if (z3 == "2015_16)") z3 = "2015-16";
      if (z3 == "2016_17)") z3 = "2016-17";
      if (z3 == "2017_18)") z3 = "2017-18";
      if (z3 == "2018_19)") z3 = "2018-19";
      if (z3 == "2019_20)") z3 = "2019-20";

      if (z4 == "2014_15)") z4 = "2014-15";
      if (z4 == "2015_16)") z4 = "2015-16";

      if (z4 == "2016_17)") z4 = "2016-17";
      if (z4 == "2017_18)") z4 = "2017-18";
      if (z4 == "2018_19)") z4 = "2018-19";
      if (z4 == "2019_20)") z4 = "2019-20";


      this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code

        // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year17_18_G = result[3].FinYear;
          this.Housesinvolved17_18_G = result[3].Housesinvolved;
          this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
          this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
          this.Houses_Complete17_18_G = result[3].Houses_Completed;
          this.HousesOccupied17_18_G = result[3].HousesOccupied;
          this.First_Houses17_18_G = result[3].First_Houses;
          this.Second_Houses17_18_G = result[3].Second_Houses;
          this.Third_Houses17_18_G = result[3].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year18_19_G = result[4].FinYear;
          this.Housesinvolved18_19_G = result[4].Housesinvolved;
          this.FundsDisbursed_in_Houses18_19_G = result[4].FundsDisbursed_in_Houses;
          this.Houses_Grounde18_19_G = result[4].Houses_Grounded;
          this.Houses_Complete18_19_G = result[4].Houses_Completed;
          this.HousesOccupied18_19_G = result[4].HousesOccupied;
          this.First_Houses18_19_G = result[4].First_Houses;
          this.Second_Houses18_19_G = result[4].Second_Houses;
          this.Third_Houses18_19_G = result[4].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year19_20_G = result[5].FinYear;
          this.Housesinvolved19_20_G = result[5].Housesinvolved;
          this.FundsDisbursed_in_Houses19_20_G = result[5].FundsDisbursed_in_Houses;
          this.Houses_Grounde19_20_G = result[5].Houses_Grounded;
          this.Houses_Complete19_20_G = result[5].Houses_Completed;
          this.HousesOccupied19_20_G = result[5].HousesOccupied;
          this.First_Houses19_20_G = result[5].First_Houses;
          this.Second_Houses19_20_G = result[5].Second_Houses;
          this.Third_Houses19_20_G = result[5].Third_Houses;
        }
        catch{ }
        finally { }

        let chart = new CanvasJS.Chart("chartPMAYU", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress(No of Houses) Consolidated (PMAY(U))",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G },
              { label: z2, y: this.Housesinvolved17_18_G },
              { label: z3, y: this.Housesinvolved18_19_G },
              { label: z4, y: this.Housesinvolved19_20_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18_G },
              { label: z3, y: this.FundsDisbursed_in_Houses18_19_G },
              { label: z4, y: this.FundsDisbursed_in_Houses19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G },
              { label: z2, y: this.Houses_Grounde17_18_G },
              { label: z3, y: this.Houses_Grounde18_19_G },
              { label: z4, y: this.Houses_Grounde19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G },
              { label: z2, y: this.Houses_Complete17_18_G },
              { label: z3, y: this.Houses_Complete18_19_G },
              { label: z4, y: this.Houses_Complete19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G },
              { label: z2, y: this.HousesOccupied17_18_G },
              { label: z3, y: this.HousesOccupied18_19_G },
              { label: z4, y: this.HousesOccupied19_20_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: x1, y: this.First_Houses14_15 },
          //     { label: Y1, y: this.First_Houses15_16 },
          //     { label: z1, y: this.First_Houses16_17 },
          //     { label: z2, y: this.First_Houses17_18 },
          //     { label: z3, y: this.First_Houses18_19 },
          //     { label: z4, y: this.First_Houses19_20 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G },
              { label: z2, y: this.Second_Houses17_18_G },
              { label: z3, y: this.Second_Houses18_19_G },
              { label: z4, y: this.Second_Houses19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G },
              { label: z2, y: this.Third_Houses17_18_G },
              { label: z3, y: this.Third_Houses18_19_G },
              { label: z4, y: this.Third_Houses19_20_G }
            ]
          },

          ],
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
      });

    }
  }

  BindISSRDatanew(stateCode, DisttCode, cityCode, Fin_Year) {

    var str = new String(Fin_Year);
    var len = str.length


    //  var str = Fin_Year ; 
    if (len == 101) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      var z2 = splitted[3].substring(8, str.length - 3);
      var z3 = splitted[4].substring(8, str.length - 3);
      var z4 = splitted[5].substring(8, str.length - 3);
    }
    if (len == 84) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      var z2 = splitted[3].substring(8, str.length - 3);
      var z3 = splitted[4].substring(8, str.length - 3);
    }
    if (len == 67) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      var z2 = splitted[3].substring(8, str.length - 3);
      // alert(x1);
      //  alert(Y1); 
    }
    if (len == 50) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      // alert(x1);
      //  alert(Y1); 
    }
    if (len == 33) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      // alert(x1);
      //  alert(Y1); 
    }
    if (len == 16) {
      var splitted = str.split(",", str.length);
      //          alert(splitted[0]);
      var x2 = splitted[0].substring(8, str.length - 1);
      //          alert(splitted.length);

    }
    //  let x = stringToSplit.split(" ");
    debugger;
    if (splitted.length == 1) {
      if (x2 == "2014_15)" || x2 == "2014_15")
        x2 = "2014-15";
      if (x2 == "2015_16)" || x2 == "2015_16")
        x2 = "2015-16";
      if (x2 == "2016_17)" || x2 == "2016_17")
        x2 = "2016-17";

      if (x2 == "2017_18)" || x2 == "2017_18")
        x2 = "2017-18";

      if (x2 == "2018_19)" || x2 == "2018_19")
        x2 = "2018-19";
      if (x2 == "2019_20)" || x2 == "2019_20")
        x2 = "2019-20";

      this.service.sp_create_ISSR_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code
        if (result[0].FinYear != "0") {
          this.Fin_Year14_15_G = result[0].FinYear;
          this.Housesinvolved14_15_G = result[0].Housesinvolved;
          this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
          this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
          this.Houses_Complete14_15_G = result[0].Houses_Completed;
          this.HousesOccupied14_15_G = result[0].HousesOccupied;
          this.First_Houses14_15_G = result[0].First_Houses;
          this.Second_Houses14_15_G = result[0].Second_Houses;
          this.Third_Houses14_15_G = result[0].Third_Houses;
        }

        let chart = new CanvasJS.Chart("chartISSR", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress (Nos) for ISSR under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x2, y: this.Housesinvolved14_15_G },

            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.FundsDisbursed_in_Houses14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Houses_Grounde14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Houses_Complete14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.HousesOccupied14_15_G },
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: "2014-15", y: this.First_Houses14_15 },
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Second_Houses14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Third_Houses14_15_G },
            ]
          },

          ],
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
      });



    }
    if (splitted.length == 2) {

      if (x1 == "2014_15)") x1 = "2014-15";
      if (x1 == "2015_16)") x1 = "2015-16";
      if (x1 == "2016_17)") x1 = "2017-18";
      if (x1 == "2018_19)") x1 = "2018-19";
      if (x1 == "2019_20)") x1 = "2019-20";


      if (Y1 == "2014_15)") Y1 = "2014-15";
      if (Y1 == "2015_16)") Y1 = "2015-16";
      if (Y1 == "2016_17)") Y1 = "2017-18";
      if (Y1 == "2018_19)") Y1 = "2018-19";
      if (Y1 == "2019_20)") Y1 = "2019-20";


      this.service.sp_create_ISSR_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code

        //this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartISSR", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress (Nos) for ISSR under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G }

            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: "2014-15", y: this.First_Houses14_15 },
          //     { label: "2015-16", y: this.First_Houses15_16 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G }
            ]
          },

          ],
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
      });

    }
    if (splitted.length == 3) {
      if (x1 == "2014_15)") x1 = "2014-15";
      if (x1 == "2015_16)") x1 = "2015-16";
      if (x1 == "2016_17)") x1 = "2016-17";
      if (x1 == "2017_18)") x1 = "2017-18";
      if (x1 == "2018_19)") x1 = "2018-19";
      if (x1 == "2019_20)") x1 = "2019-20";


      if (Y1 == "2014_15)") Y1 = "2014-15";
      if (Y1 == "2015_16)") Y1 = "2015-16";
      if (Y1 == "2016_17)") Y1 = "2016-17";
      if (Y1 == "2017_18)") Y1 = "2017-18";
      if (Y1 == "2018_19)") Y1 = "2018-19";
      if (Y1 == "2019_20)") Y1 = "2019-20";

      if (z1 == "2014_15)") z1 = "2014-15";
      if (z1 == "2015_16)") z1 = "2015-16";

      if (z1 == "2016_17)") z1 = "2016-17";
      if (z1 == "2017_18)") z1 = "2017-18";

      if (z1 == "2018_19)") z1 = "2018-19";
      if (z1 == "2019_20)") z1 = "2019-20";



      this.service.sp_create_ISSR_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code

        //   this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartISSR", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress (Nos) for ISSR under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G }

            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: "2014-15", y: this.First_Houses14_15 },
          //     { label: "2015-16", y: this.First_Houses15_16 },
          //     { label: z1, y: this.First_Houses16_17 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G }
            ]
          },

          ],
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
      });

    }

    if (splitted.length == 4) {
      if (x1 == "2014_15)") x1 = "2014-15";
      if (x1 == "2015_16)") x1 = "2015-16";
      if (x1 == "2016_17)") x1 = "2017-18";

      if (x1 == "2017_18)") x1 = "2017-18";

      if (x1 == "2018_19)") x1 = "2018-19";
      if (x1 == "2019_20)") x1 = "2019-20";


      if (Y1 == "2014_15)") Y1 = "2014-15";
      if (Y1 == "2015_16)") Y1 = "2015-16";
      if (Y1 == "2016_17)") Y1 = "2016-17";
      if (Y1 == "2017_18)") Y1 = "2017-18";
      if (Y1 == "2018_19)") Y1 = "2018-19";
      if (Y1 == "2019_20)") Y1 = "2019-20";

      if (z1 == "2014_15)") z1 = "2014-15";
      if (z1 == "2015_16)") z1 = "2015-16";
      if (z1 == "2016_17)") z1 = "2016-17";
      if (z1 == "2017_18)") z1 = "2017-18";
      if (z1 == "2018_19)") z1 = "2018-19";
      if (z1 == "2019_20)") z1 = "2019-20";

      if (z2 == "2014_15)") z2 = "2014-15";
      if (z2 == "2015_16)") z2 = "2015-16";
      if (z2 == "2016_17)") z2 = "2016-17";
      if (z2 == "2017_18)") z2 = "2017-18";

      if (z2 == "2018_19)") z2 = "2018-19";
      if (z2 == "2019_20)") z2 = "2019-20";


      this.service.sp_create_ISSR_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code

        //  this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year17_18_G = result[3].FinYear;
          this.Housesinvolved17_18_G = result[3].Housesinvolved;
          this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
          this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
          this.Houses_Complete17_18_G = result[3].Houses_Completed;
          this.HousesOccupied17_18_G = result[3].HousesOccupied;
          this.First_Houses17_18_G = result[3].First_Houses;
          this.Second_Houses17_18_G = result[3].Second_Houses;
          this.Third_Houses17_18_G = result[3].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartISSR", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress (Nos) for ISSR under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G },
              { label: z2, y: this.Housesinvolved17_18_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G },
              { label: z2, y: this.Houses_Grounde17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G },
              { label: z2, y: this.Houses_Complete17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G },
              { label: z2, y: this.HousesOccupied17_18_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: "2014-15", y: this.First_Houses14_15 },
          //     { label: Y1, y: this.First_Houses15_16 },
          //     { label: "2016-17", y: this.First_Houses16_17 },
          //     { label: z2, y: this.First_Houses17_18 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G },
              { label: z2, y: this.Second_Houses17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G },
              { label: z2, y: this.Third_Houses17_18_G }
            ]
          },

          ],
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
      });

    }
    if (splitted.length == 5) {

      if (x1 == "2014_15)") x1 = "2014-15";
      if (x1 == "2015_16)") x1 = "2015-16";
      if (x1 == "2016_17)") x1 = "2016-17";
      if (x1 == "2017_18)") x1 = "2017-18";

      if (x1 == "2018_19)") x1 = "2018-19";
      if (x1 == "2019_20)") x1 = "2019-20";


      if (Y1 == "2014_15)") Y1 = "2014-15";
      if (Y1 == "2015_16)") Y1 = "2015-16";
      if (Y1 == "2016_17)") Y1 = "2016-17";
      if (Y1 == "2017_18)") Y1 = "2017-18";

      if (Y1 == "2018_19)") Y1 = "2018-19";
      if (Y1 == "2019_20)") Y1 = "2019-20";

      if (z1 == "2014_15)") z1 = "2014-15";
      if (z1 == "2015_16)") z1 = "2015-16";
      if (z1 == "2016_17)") z1 = "2016-17";
      if (z1 == "2017_18)") z1 = "2017-18";
      if (z1 == "2018_19)") z1 = "2018-19";
      if (z1 == "2019_20)") z1 = "2019-20";

      if (z2 == "2014_15)") z2 = "2014-15";
      if (z2 == "2015_16)") z2 = "2015-16";
      if (z2 == "2016_17)") z2 = "2016-17";
      if (z2 == "2017_18)") z2 = "2017-18";
      if (z2 == "2018_19)") z2 = "2018-19";
      if (z2 == "2019_20)") z2 = "2019-20";

      if (z3 == "2014_15)") z3 = "2014-15";
      if (z3 == "2015_16)") z3 = "2015-16";
      if (z3 == "2016_17)") z3 = "2016-17";
      if (z3 == "2017_18)") z3 = "2017-18";

      if (z3 == "2018_19)") z3 = "2018-19";
      if (z3 == "2019_20)") z3 = "2019-20";


      this.service.sp_create_ISSR_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code

        // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year17_18_G = result[3].FinYear;
          this.Housesinvolved17_18_G = result[3].Housesinvolved;
          this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
          this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
          this.Houses_Complete17_18_G = result[3].Houses_Completed;
          this.HousesOccupied17_18_G = result[3].HousesOccupied;
          this.First_Houses17_18_G = result[3].First_Houses;
          this.Second_Houses17_18_G = result[3].Second_Houses;
          this.Third_Houses17_18_G = result[3].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year18_19_G = result[4].FinYear;
          this.Housesinvolved18_19_G = result[4].Housesinvolved;
          this.FundsDisbursed_in_Houses18_19_G = result[4].FundsDisbursed_in_Houses;
          this.Houses_Grounde18_19_G = result[4].Houses_Grounded;
          this.Houses_Complete18_19_G = result[4].Houses_Completed;
          this.HousesOccupied18_19_G = result[4].HousesOccupied;
          this.First_Houses18_19_G = result[4].First_Houses;
          this.Second_Houses18_19_G = result[4].Second_Houses;
          this.Third_Houses18_19_G = result[4].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartISSR", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress (Nos) for ISSR under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G },
              { label: z2, y: this.Housesinvolved17_18_G },
              { label: z3, y: this.Housesinvolved18_19_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18_G },
              { label: z3, y: this.FundsDisbursed_in_Houses18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G },
              { label: z2, y: this.Houses_Grounde17_18_G },
              { label: z3, y: this.Houses_Grounde18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G },
              { label: z2, y: this.Houses_Complete17_18_G },
              { label: z3, y: this.Houses_Complete18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G },
              { label: z2, y: this.HousesOccupied17_18_G },
              { label: z3, y: this.HousesOccupied18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "1st Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.First_Houses14_15_G },
              { label: Y1, y: this.First_Houses15_16_G },
              { label: z1, y: this.First_Houses16_17_G },
              { label: z2, y: this.First_Houses17_18_G },
              { label: z3, y: this.First_Houses18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G },
              { label: z2, y: this.Second_Houses17_18_G },
              { label: z3, y: this.Second_Houses18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G },
              { label: z2, y: this.Third_Houses17_18_G },
              { label: z3, y: this.Third_Houses18_19_G }
            ]
          },

          ],
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
      });

    }
    if (splitted.length == 6) {

      if (x1 == "2014_15)") x1 = "2014-15";
      if (x1 == "2015_16)") x1 = "2015-16";
      if (x1 == "2016_17)") x1 = "2017-18";
      if (x1 == "2018_19)") x1 = "2018-19";
      if (x1 == "2019_20)") x1 = "2019-20";


      if (Y1 == "2014_15)") Y1 = "2014-15";
      if (Y1 == "2015_16)") Y1 = "2015-16";
      if (Y1 == "2016_17)") Y1 = "2017-18";
      if (Y1 == "2018_19)") Y1 = "2018-19";
      if (Y1 == "2019_20)") Y1 = "2019-20";

      if (z1 == "2014_15)") z1 = "2014-15";
      if (z1 == "2015_16)") z1 = "2015-16";
      if (z1 == "2016_17)") z1 = "2017-18";
      if (z1 == "2018_19)") z1 = "2018-19";
      if (z1 == "2019_20)") z1 = "2019-20";

      if (z2 == "2014_15)") z2 = "2014-15";
      if (z2 == "2015_16)") z2 = "2015-16";
      if (z2 == "2016_17)") z2 = "2017-18";
      if (z2 == "2018_19)") z2 = "2018-19";
      if (z2 == "2019_20)") z2 = "2019-20";

      if (z3 == "2014_15)") z3 = "2014-15";
      if (z3 == "2015_16)") z3 = "2015-16";
      if (z3 == "2016_17)") z3 = "2017-18";
      if (z3 == "2018_19)") z3 = "2018-19";
      if (z3 == "2019_20)") z3 = "2019-20";

      if (z4 == "2014_15)") z4 = "2014-15";
      if (z4 == "2015_16)") z4 = "2015-16";
      if (z4 == "2016_17)") z4 = "2017-18";
      if (z4 == "2018_19)") z4 = "2018-19";
      if (z4 == "2019_20)") z4 = "2019-20";
      this.service.sp_create_ISSR_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code

        // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year17_18_G = result[3].FinYear;
          this.Housesinvolved17_18_G = result[3].Housesinvolved;
          this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
          this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
          this.Houses_Complete17_18_G = result[3].Houses_Completed;
          this.HousesOccupied17_18_G = result[3].HousesOccupied;
          this.First_Houses17_18_G = result[3].First_Houses;
          this.Second_Houses17_18_G = result[3].Second_Houses;
          this.Third_Houses17_18_G = result[3].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year18_19_G = result[4].FinYear;
          this.Housesinvolved18_19_G = result[4].Housesinvolved;
          this.FundsDisbursed_in_Houses18_19_G = result[4].FundsDisbursed_in_Houses;
          this.Houses_Grounde18_19_G = result[4].Houses_Grounded;
          this.Houses_Complete18_19_G = result[4].Houses_Completed;
          this.HousesOccupied18_19_G = result[4].HousesOccupied;
          this.First_Houses18_19_G = result[4].First_Houses;
          this.Second_Houses18_19_G = result[4].Second_Houses;
          this.Third_Houses18_19_G = result[4].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year19_20_G = result[5].FinYear;
          this.Housesinvolved19_20_G = result[5].Housesinvolved;
          this.FundsDisbursed_in_Houses19_20_G = result[5].FundsDisbursed_in_Houses;
          this.Houses_Grounde19_20_G = result[5].Houses_Grounded;
          this.Houses_Complete19_20_G = result[5].Houses_Completed;
          this.HousesOccupied19_20_G = result[5].HousesOccupied;
          this.First_Houses19_20_G = result[5].First_Houses;
          this.Second_Houses19_20_G = result[5].Second_Houses;
          this.Third_Houses19_20_G = result[5].Third_Houses;
        }
        catch{ }
        finally { }

        let chart = new CanvasJS.Chart("chartISSR", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress (Nos) for ISSR under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G },
              { label: z2, y: this.Housesinvolved17_18_G },
              { label: z3, y: this.Housesinvolved18_19_G },
              { label: z4, y: this.Housesinvolved19_20_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18_G },
              { label: z3, y: this.FundsDisbursed_in_Houses18_19_G },
              { label: z4, y: this.FundsDisbursed_in_Houses19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G },
              { label: z2, y: this.Houses_Grounde17_18_G },
              { label: z3, y: this.Houses_Grounde18_19_G },
              { label: z4, y: this.Houses_Grounde19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G },
              { label: z2, y: this.Houses_Complete17_18_G },
              { label: z3, y: this.Houses_Complete18_19_G },
              { label: z4, y: this.Houses_Complete19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G },
              { label: z2, y: this.HousesOccupied17_18_G },
              { label: z3, y: this.HousesOccupied18_19_G },
              { label: z4, y: this.HousesOccupied19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "1st Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.First_Houses14_15_G },
              { label: Y1, y: this.First_Houses15_16_G },
              { label: z1, y: this.First_Houses16_17_G },
              { label: z2, y: this.First_Houses17_18_G },
              { label: z3, y: this.First_Houses18_19_G },
              { label: z4, y: this.First_Houses19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G },
              { label: z2, y: this.Second_Houses17_18_G },
              { label: z3, y: this.Second_Houses18_19_G },
              { label: z4, y: this.Second_Houses19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G },
              { label: z2, y: this.Third_Houses17_18_G },
              { label: z3, y: this.Third_Houses18_19_G },
              { label: z4, y: this.Third_Houses19_20_G }
            ]
          },

          ],
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
      });

    }
  }


  BindAHP_Datanew(stateCode, DisttCode, cityCode, Fin_Year) {
    //debugger ;
    //debugger ;
    // alert('Prabodh');
    var str = Fin_Year;//'SUM(BENE2014_15),SUM(BENE2015_16)';
    //  alert(str.length);
    if (str.length == 101) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      var z2 = splitted[3].substring(8, str.length - 3);
      var z3 = splitted[4].substring(8, str.length - 3);
      var z4 = splitted[5].substring(8, str.length - 3);
    }
    if (str.length == 84) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      var z2 = splitted[3].substring(8, str.length - 3);
      var z3 = splitted[4].substring(8, str.length - 3);
    }
    if (str.length == 67) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      var z2 = splitted[3].substring(8, str.length - 3);
      // alert(x1);
      //  alert(Y1); 
    }
    if (str.length == 50) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      // alert(x1);
      //  alert(Y1); 
    }
    if (str.length == 33) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      // alert(x1);
      //  alert(Y1); 
    }
    if (str.length == 16) {
      var splitted = str.split(",", str.length);
      //          alert(splitted[0]);
      var x2 = splitted[0].substring(8, str.length - 1);
      //          alert(splitted.length);

    }
    //  let x = stringToSplit.split(" ");
    debugger;
    if (splitted.length == 1) {
      if (x2 == "2014_15)")
        x2 = "2014-15";
      if (x2 == "2015_16)")
        x2 = "2015-16";
      if (x2 == "2016_17)")
        x2 = "2017-18";
      if (x2 == "2018_19)")
        x2 = "2018-19";
      if (x2 == "2019_20)")
        x2 = "2019-20";
      this.service.sp_create_AHP_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code
        if (result[0].FinYear != "0") {
          //try{
          this.Fin_Year14_15_G = result[0].FinYear;
          this.Housesinvolved14_15_G = result[0].Housesinvolved;
          this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
          this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
          this.Houses_Complete14_15_G = result[0].Houses_Completed;
          this.HousesOccupied14_15_G = result[0].HousesOccupied;
          this.First_Houses14_15_G = result[0].First_Houses;
          this.Second_Houses14_15_G = result[0].Second_Houses;
          this.Third_Houses14_15_G = result[0].Third_Houses;
        }
        //   catch{}
        //   finally{}
        // }
        // else 
        // {
        //   this.Fin_Year14_15 =0;
        //   this.Housesinvolved14_15 = 0;
        //   this.FundsDisbursed_in_Houses14_15 = 0;
        //   this\.Houses_Grounde14_15_G = 0;
        //   this.Houses_Complete14_15 = 0;
        //   this.HousesOccupied14_15 = 0;
        //   this.First_Houses14_15 = 0;
        //   this.Second_Houses14_15 = 0;
        //   this.Third_Houses14_15 = 0;
        // }

        let chart = new CanvasJS.Chart("chartAHP", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress Nos) for AHP under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x2, y: this.Housesinvolved14_15_G },

            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.FundsDisbursed_in_Houses14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Houses_Grounde14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Houses_Complete14_15_G },
              { label: x2, y: this.Houses_Complete14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.HousesOccupied14_15_G },
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: x2, y: this.First_Houses14_15 },
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Second_Houses14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Third_Houses14_15_G },
            ]
          },

          ],
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
      });
      //     let chart = new CanvasJS.Chart("chartPMAYU", {
      //       theme: "light2",
      //       animationEnabled: true,
      //       exportEnabled: false,
      //       title: {
      //         text: "Physical Data Consolidated (PMAYU)",
      //         fontSize: "25",
      //       },
      //       backgroundColor: this.backgroundColor, 
      //       colorSet: "greenShades",

      //       data: [{

      //         options: {
      //           scales: {
      //               xAxes: [{
      //                   stacked: true
      //               }],
      //               yAxes: [{
      //                   stacked: true
      //               }]
      //           }
      //       },

      //        type: "column",
      //         dockInsidePlotArea: true,
      //          indexLabel: "{y}", 
      //         bevelEnabled: true,
      //         showInLegend: true,
      //         legendText: "Housesinvolved",
      //          stValue: "Q",
      //         indexLabelFontSize: 12,
      //         indexLabelOrientation: "vertical",
      //         dataPoints: [
      //            { label: x2, y: this.Housesinvolved14_15 },
      //           { label: x2, y: this.FundsDisbursed_in_Houses14_15 },
      //           { label: x2, y: this\.Houses_Grounde14_15_G },
      //           { label: x2, y: this.Houses_Complete14_15 },
      //           { label: x2, y: this.HousesOccupied14_15 },
      //           { label: x2, y: this.First_Houses14_15 },
      //           { label: x2, y: this.Second_Houses14_15 },
      //           { label: x2, y: this.Third_Houses14_15 }
      //         ]
      //       }  ,

      //     ],
      //       options: {
      //         legend: {
      //           display: true,
      //           labels: {
      //             fontColor: 'rgb(255, 99, 132)'
      //           }
      //         }
      //       }
      //     });
      //     chart.render();
      // });


    }
    if (splitted.length == 2) {

      if (x1 == "2014_15") x1 = "2014-15";
      if (x1 == "2015_16") x1 = "2015-16";
      if (x1 == "2016_17") x1 = "2017-18";
      if (x1 == "2018_19)") x1 = "2018-19";
      if (x1 == "2019_20)") x1 = "2019-20";


      if (Y1 == "2014_15") Y1 = "2014-15";
      if (Y1 == "2015_16") Y1 = "2015-16";
      if (Y1 == "2016_17") Y1 = "2017-18";
      if (Y1 == "2018_19)") Y1 = "2018-19";
      if (Y1 == "2019_20)") Y1 = "2019-20";


      this.service.sp_create_AHP_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code

        //this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartAHP", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress Nos) for AHP under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G }

            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: "2014-15", y: this.First_Houses14_15 },
          //     { label: "2015-16", y: this.First_Houses15_16 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G }
            ]
          },

          ],
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
      });

    }
    if (splitted.length == 3) {

      if (x1 == "2014_15") x1 = "2014-15";
      if (x1 == "2015_16") x1 = "2015-16";
      if (x1 == "2016_17") x1 = "2017-18";
      if (x1 == "2018_19") x1 = "2018-19";
      if (x1 == "2019_20") x1 = "2019-20";


      if (Y1 == "2014_15") Y1 = "2014-15";
      if (Y1 == "2015_16") Y1 = "2015-16";
      if (Y1 == "2016_17") Y1 = "2017-18";
      if (Y1 == "2018_19") Y1 = "2018-19";
      if (Y1 == "2019_20") Y1 = "2019-20";

      if (z1 == "2014_15") z1 = "2014-15";
      if (z1 == "2015_16") z1 = "2015-16";
      if (z1 == "2016_17") z1 = "2017-18";
      if (z1 == "2018_19") z1 = "2018-19";
      if (z1 == "2019_20") z1 = "2019-20";
      this.service.sp_create_AHP_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code

        //   this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartAHP", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress Nos) for AHP under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G }

            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: "2014-15", y: this.First_Houses14_15 },
          //     { label: Y1, y: this.First_Houses15_16 },
          //     { label: z1, y: this.First_Houses16_17 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G }
            ]
          },

          ],
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
      });

    }

    if (splitted.length == 4) {
      if (x1 == "2014_15") x1 = "2014-15";
      if (x1 == "2015_16") x1 = "2015-16";
      if (x1 == "2016_17") x1 = "2017-18";
      if (x1 == "2018_19") x1 = "2018-19";
      if (x1 == "2019_20") x1 = "2019-20";


      if (Y1 == "2014_15") Y1 = "2014-15";
      if (Y1 == "2015_16") Y1 = "2015-16";
      if (Y1 == "2016_17") Y1 = "2017-18";
      if (Y1 == "2018_19") Y1 = "2018-19";
      if (Y1 == "2019_20") Y1 = "2019-20";

      if (z1 == "2014_15") z1 = "2014-15";
      if (z1 == "2015_16") z1 = "2015-16";
      if (z1 == "2016_17") z1 = "2017-18";
      if (z1 == "2018_19") z1 = "2018-19";
      if (z1 == "2019_20") z1 = "2019-20";

      if (z2 == "2014_15") z2 = "2014-15";
      if (z2 == "2015_16") z2 = "2015-16";
      if (z2 == "2016_17") z2 = "2017-18";
      if (z2 == "2018_19") z2 = "2018-19";
      if (z2 == "2019_20") z2 = "2019-20";
      this.service.sp_create_AHP_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code

        //  this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year17_18_G = result[3].FinYear;
          this.Housesinvolved17_18_G = result[3].Housesinvolved;
          this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
          this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
          this.Houses_Complete17_18_G = result[3].Houses_Completed;
          this.HousesOccupied17_18_G = result[3].HousesOccupied;
          this.First_Houses17_18_G = result[3].First_Houses;
          this.Second_Houses17_18_G = result[3].Second_Houses;
          this.Third_Houses17_18_G = result[3].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartAHP", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress Nos) for AHP under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G },
              { label: z2, y: this.Housesinvolved17_18_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G },
              { label: z2, y: this.Houses_Grounde17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G },
              { label: z2, y: this.Houses_Complete17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G },
              { label: z2, y: this.HousesOccupied17_18_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: "2014-15", y: this.First_Houses14_15 },
          //     { label: "2015-16", y: this.First_Houses15_16 },
          //     { label: "2016-17", y: this.First_Houses16_17 },
          //     { label: "2017-18", y: this.First_Houses17_18 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G },
              { label: z2, y: this.Second_Houses17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G },
              { label: z2, y: this.Third_Houses17_18_G }
            ]
          },

          ],
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
      });

    }
    if (splitted.length == 5) {
      if (x1 == "2014_15") x1 = "2014-15";
      if (x1 == "2015_16") x1 = "2015-16";
      if (x1 == "2016_17") x1 = "2017-18";
      if (x1 == "2018_19") x1 = "2018-19";
      if (x1 == "2019_20") x1 = "2019-20";


      if (Y1 == "2014_15") Y1 = "2014-15";
      if (Y1 == "2015_16") Y1 = "2015-16";
      if (Y1 == "2016_17") Y1 = "2017-18";
      if (Y1 == "2018_19") Y1 = "2018-19";
      if (Y1 == "2019_20") Y1 = "2019-20";

      if (z1 == "2014_15") z1 = "2014-15";
      if (z1 == "2015_16") z1 = "2015-16";
      if (z1 == "2016_17") z1 = "2017-18";
      if (z1 == "2018_19") z1 = "2018-19";
      if (z1 == "2019_20") z1 = "2019-20";

      if (z2 == "2014_15") z2 = "2014-15";
      if (z2 == "2015_16") z2 = "2015-16";
      if (z2 == "2016_17") z2 = "2017-18";
      if (z2 == "2018_19") z2 = "2018-19";
      if (z2 == "2019_20") z2 = "2019-20";

      if (z3 == "2014_15") z3 = "2014-15";
      if (z3 == "2015_16") z3 = "2015-16";
      if (z3 == "2016_17") z3 = "2017-18";
      if (z3 == "2018_19") z3 = "2018-19";
      if (z3 == "2019_20") z3 = "2019-20";
      this.service.sp_create_AHP_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code

        // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year17_18_G = result[3].FinYear;
          this.Housesinvolved17_18_G = result[3].Housesinvolved;
          this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
          this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
          this.Houses_Complete17_18_G = result[3].Houses_Completed;
          this.HousesOccupied17_18_G = result[3].HousesOccupied;
          this.First_Houses17_18_G = result[3].First_Houses;
          this.Second_Houses17_18_G = result[3].Second_Houses;
          this.Third_Houses17_18_G = result[3].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year18_19_G = result[4].FinYear;
          this.Housesinvolved18_19_G = result[4].Housesinvolved;
          this.FundsDisbursed_in_Houses18_19_G = result[4].FundsDisbursed_in_Houses;
          this.Houses_Grounde18_19_G = result[4].Houses_Grounded;
          this.Houses_Complete18_19_G = result[4].Houses_Completed;
          this.HousesOccupied18_19_G = result[4].HousesOccupied;
          this.First_Houses18_19_G = result[4].First_Houses;
          this.Second_Houses18_19_G = result[4].Second_Houses;
          this.Third_Houses18_19_G = result[4].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartAHP", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress Nos) for AHP under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G },
              { label: z2, y: this.Housesinvolved17_18_G },
              { label: z3, y: this.Housesinvolved18_19_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18_G },
              { label: z3, y: this.FundsDisbursed_in_Houses18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G },
              { label: z2, y: this.Houses_Grounde17_18_G },
              { label: z3, y: this.Houses_Grounde18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G },
              { label: z2, y: this.Houses_Complete17_18_G },
              { label: z3, y: this.Houses_Complete18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G },
              { label: z2, y: this.HousesOccupied17_18_G },
              { label: z3, y: this.HousesOccupied18_19_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: "2014-15", y: this.First_Houses14_15 },
          //     { label: "2015-16", y: this.First_Houses15_16 },
          //     { label: "2016-17", y: this.First_Houses16_17 },
          //     { label: "2017-18", y: this.First_Houses17_18 },
          //     { label: "2018-19", y: this.First_Houses18_19 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G },
              { label: z2, y: this.Second_Houses17_18_G },
              { label: z3, y: this.Second_Houses18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G },
              { label: z2, y: this.Third_Houses17_18_G },
              { label: z3, y: this.Third_Houses18_19_G }
            ]
          },

          ],
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
      });

    }
    if (splitted.length == 6) {
      if (x1 == "2014_15") x1 = "2014-15";
      if (x1 == "2015_16") x1 = "2015-16";
      if (x1 == "2016_17") x1 = "2017-18";
      if (x1 == "2018_19") x1 = "2018-19";
      if (x1 == "2019_20") x1 = "2019-20";


      if (Y1 == "2014_15") Y1 = "2014-15";
      if (Y1 == "2015_16") Y1 = "2015-16";
      if (Y1 == "2016_17") Y1 = "2017-18";
      if (Y1 == "2018_19") Y1 = "2018-19";
      if (Y1 == "2019_20") Y1 = "2019-20";

      if (z1 == "2014_15") z1 = "2014-15";
      if (z1 == "2015_16") z1 = "2015-16";
      if (z1 == "2016_17") z1 = "2017-18";
      if (z1 == "2018_19") z1 = "2018-19";
      if (z1 == "2019_20") z1 = "2019-20";

      if (z2 == "2014_15") z2 = "2014-15";
      if (z2 == "2015_16") z2 = "2015-16";
      if (z2 == "2016_17") z2 = "2017-18";
      if (z2 == "2018_19") z2 = "2018-19";
      if (z2 == "2019_20") z2 = "2019-20";

      if (z3 == "2014_15") z3 = "2014-15";
      if (z3 == "2015_16") z3 = "2015-16";
      if (z3 == "2016_17") z3 = "2017-18";
      if (z3 == "2018_19") z3 = "2018-19";
      if (z3 == "2019_20") z3 = "2019-20";

      if (z4 == "2014_15") z4 = "2014-15";
      if (z4 == "2015_16") z4 = "2015-16";
      if (z4 == "2016_17") z4 = "2017-18";
      if (z4 == "2018_19") z4 = "2018-19";
      this.service.sp_create_AHP_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code

        // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year17_18_G = result[3].FinYear;
          this.Housesinvolved17_18_G = result[3].Housesinvolved;
          this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
          this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
          this.Houses_Complete17_18_G = result[3].Houses_Completed;
          this.HousesOccupied17_18_G = result[3].HousesOccupied;
          this.First_Houses17_18_G = result[3].First_Houses;
          this.Second_Houses17_18_G = result[3].Second_Houses;
          this.Third_Houses17_18_G = result[3].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year18_19_G = result[4].FinYear;
          this.Housesinvolved18_19_G = result[4].Housesinvolved;
          this.FundsDisbursed_in_Houses18_19_G = result[4].FundsDisbursed_in_Houses;
          this.Houses_Grounde18_19_G = result[4].Houses_Grounded;
          this.Houses_Complete18_19_G = result[4].Houses_Completed;
          this.HousesOccupied18_19_G = result[4].HousesOccupied;
          this.First_Houses18_19_G = result[4].First_Houses;
          this.Second_Houses18_19_G = result[4].Second_Houses;
          this.Third_Houses18_19_G = result[4].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year19_20_G = result[5].FinYear;
          this.Housesinvolved19_20_G = result[5].Housesinvolved;
          this.FundsDisbursed_in_Houses19_20_G = result[5].FundsDisbursed_in_Houses;
          this.Houses_Grounde19_20_G = result[5].Houses_Grounded;
          this.Houses_Complete19_20_G = result[5].Houses_Completed;
          this.HousesOccupied19_20_G = result[5].HousesOccupied;
          this.First_Houses19_20_G = result[5].First_Houses;
          this.Second_Houses19_20_G = result[5].Second_Houses;
          this.Third_Houses19_20_G = result[5].Third_Houses;
        }
        catch{ }
        finally { }

        let chart = new CanvasJS.Chart("chartAHP", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress Nos) for AHP under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G },
              { label: z2, y: this.Housesinvolved17_18_G },
              { label: z3, y: this.Housesinvolved18_19_G },
              { label: z4, y: this.Housesinvolved19_20_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18_G },
              { label: z3, y: this.FundsDisbursed_in_Houses18_19_G },
              { label: z4, y: this.FundsDisbursed_in_Houses19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G },
              { label: z2, y: this.Houses_Grounde17_18_G },
              { label: z3, y: this.Houses_Grounde18_19_G },
              { label: z4, y: this.Houses_Grounde19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G },
              { label: z2, y: this.Houses_Complete17_18_G },
              { label: z3, y: this.Houses_Complete18_19_G },
              { label: z4, y: this.Houses_Complete19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G },
              { label: z2, y: this.HousesOccupied17_18_G },
              { label: z3, y: this.HousesOccupied18_19_G },
              { label: z4, y: this.HousesOccupied19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "1st Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.First_Houses14_15_G },
              { label: Y1, y: this.First_Houses15_16_G },
              { label: z1, y: this.First_Houses16_17_G },
              { label: z2, y: this.First_Houses17_18_G },
              { label: z3, y: this.First_Houses18_19_G },
              { label: z4, y: this.First_Houses19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G },
              { label: z2, y: this.Second_Houses17_18_G },
              { label: z3, y: this.Second_Houses18_19_G },
              { label: z4, y: this.Second_Houses19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G },
              { label: z2, y: this.Third_Houses17_18_G },
              { label: z3, y: this.Third_Houses18_19_G },
              { label: z4, y: this.Third_Houses19_20_G }
            ]
          },

          ],
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
      });

    }
  }
  //3rd row
  BindColumnGraphHouses1(stateCode, DisttCode, cityCode, Comp, DivisionCodes) {
    this.service.GetStateWiseFinYrData_Div(stateCode, DivisionCodes).subscribe(resultS => { // new code
      this.HS_15_16S_G = resultS.HS15_16;
      this.HS_16_17S_G = resultS.HS_16_17;
      this.HS_17_18S_G = resultS.HS17_18;
      this.HS_18_19S_G = resultS.HS18_19;
      this.HS_19_20S_G = resultS.HS19_20; //



      this.HC_15_16S_G = resultS.HC_15_16;
      this.HC_16_17S_G = resultS.HC_16_17;
      this.HC_17_18S_G = resultS.HC_17_18;
      this.HC_18_19S_G = resultS.HC_18_19;
      this.HC_19_20S_G = resultS.HC_19_20; //


      this.HO_14_15S_G = resultS.HO_14_15;

      this.HO_15_16S_G = resultS.HO_15_16;
      this.HO_16_17S_G = resultS.HO_16_17;
      this.HO_17_18S_G = resultS.HO_17_18;
      this.HO_18_19S_G = resultS.HO_18_19;
      this.HO_19_20S_G = resultS.HO_19_20; //


      // this.service.HFACompWiseReportPMayList_Div(stateCode,DisttCode,cityCode,Comp,DivisionCodes).subscribe(result => {
      this.service.FIN_Data1415(stateCode, DisttCode, cityCode, Comp).subscribe(result => {
        //  this.service.FIN_PHY_Houses1415(stateCode,DisttCode,cityCode).subscribe(result => {
        this.HS_14_15_G = result.HS_14_15;
        this.HC_14_15_G = result.HC_14_15;
        this.HO_14_15_G = result.HO_14_15;
        this.HG_14_15_G = result.HG_14_15;

        // alert(result.HS_14_15);

        this.service.FIN_Data1516(stateCode, DisttCode, cityCode, Comp).subscribe(result1 => {
          //  this.service.FIN_PHY_Houses1516(stateCode,DisttCode,cityCode).subscribe(result1 => {
          this.HS_15_16_G = result1.HS_15_16;
          this.HC_15_16_G = result1.HC_15_16;
          this.HO_15_16_G = result1.HO_15_16;
          this.HG_15_16_G = result.HG_15_16;
          //alert(result1.HS_15_16);

          this.service.FIN_Data1617(stateCode, DisttCode, cityCode, Comp).subscribe(result2 => {
            // this.service.FIN_PHY_Houses1617(stateCode,DisttCode,cityCode).subscribe(result2 => {
            this.HS_16_17_G = result2.HS_16_17;
            this.HC_16_17_G = result2.HC_16_17;
            this.HO_16_17_G = result2.HO_16_17;
            this.HG_16_17_G = result.HG_16_17;

            this.service.FIN_Data1718(stateCode, DisttCode, cityCode, Comp).subscribe(result3 => {
              //this.service.FIN_PHY_Houses1718(stateCode,DisttCode,cityCode).subscribe(result3 => {
              this.HS_17_18_G = result3.HS_17_18;
              this.HC_17_18_G = result3.HC_17_18;
              this.HO_17_18_G = result3.HO_17_18;
              this.HG_17_18_G = result3.HG_17_18;

              this.service.FIN_Data1819(stateCode, DisttCode, cityCode, Comp).subscribe(result4 => {
                //this.service.FIN_PHY_Houses1819(stateCode,DisttCode,cityCode).subscribe(result4 => {
                this.HS_18_19_G = result4.HS_18_19;
                this.HC_18_19_G = result4.HC_18_19;
                this.HO_18_19_G = result4.HO_18_19;
                this.HG_18_19_G = result4.HG_18_19;


                this.service.FIN_Data1920(stateCode, DisttCode, cityCode, Comp).subscribe(result5 => {
                  //this.service.FIN_PHY_Houses1819(stateCode,DisttCode,cityCode).subscribe(result4 => {
                  this.HS_19_20_G = <number><any>result5.HS_19_20;
                  this.HC_19_20_G = <number><any>result5.HC_19_20;
                  this.HO_19_20_G = <number><any>result5.HO_19_20;
                  this.HG_19_20_G = <number><any>result5.HG_19_20;


                  this.compArray_G = Comp.split(",");
                  const value = this.compArray_G.indexOf("5");

                  if ((Comp == 0 && value == -1 && DivisionCodes == 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0 && value == -1) || (Comp == 0 && value == -1 && DivisionCodes == 0 && stateCode != 0 && DisttCode == 0 && cityCode == 0 && value == -1) || (Comp == 0 && value == -1 && DivisionCodes != 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0 && value == -1) || (Comp == 0 && value == -1 && DivisionCodes != 0 && stateCode != 0 && DisttCode == 0 && cityCode == 0 && value == -1)) {
                    //alert('Page load');
                    this.HG_14_15_G = "0";
                    this.HS_14_15_G = "0";
                    if (resultS.HC_14_15 == null || resultS.HC_14_15 == 0) {
                      this.HC_14_15_G = 0;
                    }
                    else {
                      this.HC_14_15_G = resultS.HC_14_15;
                    }

                    if (resultS.HC_14_15 == null || resultS.HC_14_15 == 0) {
                      this.HO_14_15_G = 0;
                    }
                    else {
                      this.HO_14_15_G = <number><any>resultS.HO_14_15;
                    }
                    this.HS_15_16_G = this.HS_15_16S_G;
                    this.HS_16_17_G = resultS.HS_16_17;
                    this.HS_17_18_G = resultS.HS17_18;
                    this.HS_18_19_G = resultS.HS18_19;
                    this.HS_19_20_G = resultS.HS19_20;

                    this.HC_15_16_G = resultS.HC_15_16;
                    this.HC_16_17_G = resultS.HC_16_17;
                    this.HC_17_18_G = resultS.HC_17_18;
                    this.HC_18_19_G = resultS.HC_18_19;
                    this.HC_19_20_G = resultS.HC_19_20;


                    this.HO_15_16_G = resultS.HO_15_16;
                    this.HO_16_17_G = resultS.HO_16_17;
                    this.HO_17_18_G = resultS.HO_17_18;
                    this.HO_18_19_G = resultS.HO_18_19;
                    this.HO_19_20_G = resultS.HO_19_20;
                  }
                  else if ((DivisionCodes != 0 && Comp == 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0) || (DivisionCodes != 0 && Comp == 0 && stateCode != 0 && DisttCode == 0 && cityCode == 0))
                  // if (((Comp==0 && value ==-1)  && (stateCode ==0 && DisttCode ==0 && cityCode ==0 && value ==-1))   )
                  {
                    //  alert('Div New');

                    this.HG_14_15_G = "0";
                    this.HS_14_15_G = "0";
                    if (resultS.HC_14_15 == null || resultS.HC_14_15 == 0) {
                      this.HC_14_15_G = 0;
                    }
                    else {
                      this.HC_14_15_G = resultS.HC_14_15;
                    }

                    if (resultS.HO_14_15 == null || resultS.HO_14_15 == 0) {
                      this.HO_14_15_G = 0;
                    }
                    else {
                      this.HO_14_15_G = <number><any>resultS.HO_14_15;
                    }
                    // this.HG_14_15 =  "0";
                    // this.HS_14_15 ="0" ;
                    // this.HC_14_15 = resultS.HC_14_15;
                    // this.HO_14_15 = <number><any>resultS.HO_14_15;

                    // alert(this.HS_15_16S);
                    if (this.HS_15_16S_G == null || this.HS_15_16S_G == 0) {
                      this.HS_15_16_G = 0;
                    }
                    else {
                      this.HS_15_16_G = this.HS_15_16S_G;//.toString();
                    }

                    if (this.HC_15_16S_G == null || this.HC_15_16S_G == 0) {
                      this.HC_15_16_G = 0;
                    }
                    else {
                      this.HC_15_16_G = this.HC_15_16S_G;//.toString();
                    }

                    if (this.HO_15_16S_G == null || this.HO_15_16S_G == 0) {
                      this.HO_15_16_G = 0;
                    }
                    else {
                      this.HO_15_16_G = this.HO_15_16S_G;//.toString();
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

                    this.HS_16_17_G = this.HS_16_17S_G;//.toString();
                    this.HC_16_17_G = this.HC_16_17S_G;//.toString();
                    this.HO_16_17_G = this.HO_16_17S_G;//.toString();
                    this.HO_18_19_G = this.HO_18_19S_G;//.toString();

                    //this.HG_16_17 = "0";

                    this.HS_17_18_G = this.HS_17_18S_G;//.toString();
                    this.HC_17_18_G = this.HC_17_18S_G;//.toString();
                    this.HO_17_18_G = this.HO_17_18S_G;//.toString();
                    this.HO_18_19_G = this.HO_18_19S_G;//.toString();

                    //this.HG_17_18 = "0";

                    //alert(this.HS_15_16);

                  }
                  else if (Comp != 5 && Comp != 6 && DivisionCodes == 0 && Comp >= 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0)
                  // if (((Comp==0 && value ==-1)  && (stateCode ==0 && DisttCode ==0 && cityCode ==0 && value ==-1))   )
                  {
                    //  alert('Comp');
                    this.HS_14_15_G = result.HS_14_15;
                    this.HC_14_15_G = result.HC_14_15;
                    this.HO_14_15_G = result.HO_14_15;
                    this.HG_14_15_G = result.HG_14_15;

                    this.HS_15_16_G = result1.HS_15_16;
                    this.HC_15_16_G = result1.HC_15_16;
                    this.HO_15_16_G = result1.HO_15_16;
                    this.HG_15_16_G = result.HG_15_16;

                    this.HS_16_17_G = result2.HS_16_17;
                    this.HC_16_17_G = result2.HC_16_17;
                    this.HO_16_17_G = result2.HO_16_17;
                    this.HG_16_17_G = result.HG_16_17;

                    //this.service.FIN_PHY_Houses1718(stateCode,DisttCode,cityCode).subscribe(result3 => {
                    this.HS_17_18_G = result3.HS_17_18;
                    this.HC_17_18_G = result3.HC_17_18;
                    this.HO_17_18_G = result3.HO_17_18;
                    this.HG_17_18_G = result3.HG_17_18;

                    //this.service.FIN_PHY_Houses1819(stateCode,DisttCode,cityCode).subscribe(result4 => {
                    this.HS_18_19_G = result4.HS_18_19;
                    this.HC_18_19_G = result4.HC_18_19;
                    this.HO_18_19_G = result4.HO_18_19;
                    this.HG_18_19_G = result4.HG_18_19;

                    this.HS_19_20_G = <number><any>result5.HS_19_20;
                    this.HC_19_20_G = <number><any>result5.HC_19_20;
                    this.HO_19_20_G = <number><any>result5.HO_19_20;
                    this.HG_19_20_G = <number><any>result5.HG_19_20;
                  }
                  else if ((Comp == 5 || Comp == 6) && DivisionCodes == 0 && stateCode == 0 && DisttCode == 0 && cityCode == 0) {
                    this.HS_14_15_G = "0";
                    this.HC_14_15_G = "0";
                    this.HO_14_15_G = "0";
                    this.HG_14_15_G = "0";

                    this.HS_15_16_G = "0";
                    this.HC_15_16_G = "0";
                    this.HO_15_16_G = "0";
                    this.HG_15_16_G = "0";

                    this.HS_16_17_G = "0";
                    this.HC_16_17_G = "0";
                    this.HO_16_17_G = "0";
                    this.HG_16_17_G = "0";

                    this.HS_17_18_G = "0";
                    this.HC_17_18_G = "0";
                    this.HO_17_18_G = "0";
                    this.HG_17_18_G = "0";

                    this.HS_18_19_G = "0";
                    this.HC_18_19_G = "0";
                    this.HO_18_19_G = "0";
                    this.HG_18_19_G = "0";

                    this.HS_19_20_G = 0;
                    this.HC_19_20_G = 0;
                    this.HO_19_20_G = 0;
                    this.HG_19_20_G = 0;
                  }

                  //this.HO_18_19 =indianFormat(this.HO_18_19);

                  let chart = new CanvasJS.Chart("YtWiseHouses", {
                    theme: "light2",

                    animationEnabled: true,
                    exportEnabled: false,
                    title: {
                      text: "(Physical Progress(Lakhs) "
                    },
                    backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
                    colorSet: "greenShades",

                    data: [{
                      backgroundColor: this.backgroundColor_G,//"#B3E5FC",
                      bevelEnabled: true,
                      //     indexLabelPlacement:"auto",
                      //this.backgroundColor: this.backgroundColor,
                      indexLabelOrientation: "vertical",
                      type: "column",
                      showInLegend: true,
                      legendText: "Sanctioned",
                      indexLabel: "{y}", // HS
                      stValue: "HS",
                      indexLabelFontSize: 14,
                      fontSize: "35",
                      dataPoints: [
                        { label: "14-15", y: this.HS_14_15_G },
                        { label: "15-16", y: this.HS_15_16_G },
                        { label: "16-17", y: this.HS_16_17_G },
                        { label: "17-18", y: this.HS_17_18_G },
                        { label: "18-19", y: this.HS_18_19_G },
                        { label: "19-20", y: this.HS_19_20_G }
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
                        { label: "14-15", y: this.HG_14_15_G },
                        { label: "15-16", y: this.HG_15_16_G },
                        { label: "16-17", y: this.HG_16_17_G },
                        { label: "17-18", y: this.HG_17_18_G },
                        { label: "18-19", y: this.HG_18_19_G },
                        { label: "19-20", y: this.HG_19_20_G }
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
                        { label: "14-15", y: (this.HC_14_15_G) },
                        { label: "15-16", y: this.HC_15_16_G },
                        { label: "16-17", y: this.HC_16_17_G },
                        { label: "17-18", y: this.HC_17_18_G },
                        { label: "18-19", y: this.HC_18_19_G },
                        { label: "19-20", y: this.HC_19_20_G }
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
                        { label: "14-15", y: this.HO_14_15_G },
                        { label: "15-16", y: this.HO_15_16_G },
                        { label: "16-17", y: this.HO_16_17_G },
                        { label: "17-18", y: this.HO_17_18_G },
                        { label: "18-19", y: this.HO_18_19_G },
                        { label: "19-20", y: this.HO_19_20_G }
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


  BindBLC_Data(stateCode, DisttCode, cityCode, Comp, Fin_Year) {

    Comp = "BLCS";
    this.service.sp_create_BLC_AHP_DATA(stateCode, DisttCode, cityCode, Comp).subscribe(result => { // new code
      ///first row data
      this.Fin_Year14_15_G = result[0].FinYear;
      this.Housesinvolved14_15_G = result[0].Housesinvolved;
      this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
      this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
      this.Houses_Complete14_15_G = result[0].Houses_Completed;
      this.HousesOccupied14_15_G = result[0].HousesOccupied;

      this.First_Houses14_15_G = result[0].First_Houses;
      this.Second_Houses14_15_G = result[0].Second_Houses;
      this.Third_Houses14_15_G = result[0].Third_Houses;

      //second row data
      this.Fin_Year15_16_G = result[1].FinYear;
      this.Housesinvolved15_16_G = result[1].Housesinvolved;
      this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
      this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
      this.Houses_Complete15_16_G = result[1].Houses_Completed;
      this.HousesOccupied15_16_G = result[1].HousesOccupied;
      this.First_Houses15_16_G = result[1].First_Houses;
      this.Second_Houses15_16_G = result[1].Second_Houses;
      this.Third_Houses15_16_G = result[1].Third_Houses;

      //Third row data
      this.Fin_Year16_17_G = result[2].FinYear;
      this.Housesinvolved16_17_G = result[2].Housesinvolved;
      this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
      this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
      this.Houses_Complete16_17_G = result[2].Houses_Completed;
      this.HousesOccupied16_17_G = result[2].HousesOccupied;
      this.First_Houses16_17_G = result[2].First_Houses;
      this.Second_Houses16_17_G = result[2].Second_Houses;
      this.Third_Houses16_17_G = result[2].Third_Houses;

      //Fourth row data
      this.Fin_Year17_18_G = result[3].FinYear;
      this.Housesinvolved17_18_G = result[3].Housesinvolved;
      this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
      this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
      this.Houses_Complete17_18_G = result[3].Houses_Completed;
      this.HousesOccupied17_18_G = result[3].HousesOccupied;
      this.First_Houses17_18_G = result[3].First_Houses;
      this.Second_Houses17_18_G = result[3].Second_Houses;
      this.Third_Houses17_18_G = result[3].Third_Houses;

      //Fifth row data
      this.Fin_Year18_19_G = result[4].FinYear;
      this.Housesinvolved18_19_G = result[4].Housesinvolved;
      this.FundsDisbursed_in_Houses18_19_G = result[4].FundsDisbursed_in_Houses;
      this.Houses_Grounde18_19_G = result[4].Houses_Grounded;
      this.Houses_Complete18_19_G = result[4].Houses_Completed;
      this.HousesOccupied18_19_G = result[4].HousesOccupied;
      this.First_Houses18_19_G = result[4].First_Houses;
      this.Second_Houses18_19_G = result[4].Second_Houses;
      this.Third_Houses18_19_G = result[4].Third_Houses;

      //          debugger;
      //Sixth row data
      this.Fin_Year19_20_G = result[5].FinYear;
      this.Housesinvolved19_20_G = result[5].Housesinvolved;
      this.FundsDisbursed_in_Houses19_20_G = result[5].FundsDisbursed_in_Houses;
      this.Houses_Grounde19_20_G = result[5].Houses_Grounded;
      this.Houses_Complete19_20_G = result[5].Houses_Completed;
      this.HousesOccupied19_20_G = result[5].HousesOccupied;
      this.First_Houses19_20_G = result[5].First_Houses;
      this.Second_Houses19_20_G = result[5].Second_Houses;
      this.Third_Houses19_20_G = result[5].Third_Houses;

      this.Test(Fin_Year);

      let chartBLCS = new CanvasJS.Chart("chartBLCS", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: false,
        // title: {
        //   text: "Physical Progress(Nos) for  BLC under PMAY(U)",
        //   fontSize: "25",
        // },
        axisY: {
          labelFontSize: 12,
          labelFontColor: "#000",
        },
        axisX: {
          labelFontSize: 12,
          labelFontColor: "#000",
        },
        legend: {
          fontSize: 14,
        },
        backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
        colorSet: "greenShades",

        data: [{

          options: {
            scales: {
              xAxes: [{
                stacked: true
              }],
              yAxes: [{
                stacked: true
              }]
            }
          },

          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "Sanctioned",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            // { x: "14-15", y: this.Fin_Year15_16 },
            { label: "2014-15", y: this.Housesinvolved14_15_G },
            { label: "2015-16", y: this.Housesinvolved15_16_G },
            { label: "2016-17", y: this.Housesinvolved16_17_G },
            { label: "2017-18", y: this.Housesinvolved17_18_G },
            { label: "2018-19", y: this.Housesinvolved18_19_G },
            { label: "2019-20", y: this.Housesinvolved19_20_G }
            // ,
            // { label: "20_21", y: this.Housesinvolved20_21 }
          ]
        },
        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{100}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "Funded",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.FundsDisbursed_in_Houses14_15_G },
            { label: "2015-16", y: this.FundsDisbursed_in_Houses15_16_G },
            { label: "2016-17", y: this.FundsDisbursed_in_Houses16_17_G },
            { label: "2017-18", y: this.FundsDisbursed_in_Houses17_18_G },
            { label: "2018-19", y: this.FundsDisbursed_in_Houses18_19_G },
            { label: "2019-20", y: this.FundsDisbursed_in_Houses19_20_G }
            // ,
            // { label: "20_21", y: this.FundsDisbursed_in_Houses20_21 }
          ]
        },

        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{100}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "Grounded",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.Houses_Grounde14_15_G },
            { label: "2015-16", y: this.Houses_Grounde15_16_G },
            { label: "2016-17", y: this.Houses_Grounde16_17_G },
            { label: "2017-18", y: this.Houses_Grounde17_18_G },
            { label: "2018-19", y: this.Houses_Grounde18_19_G },
            { label: "2019-20", y: this.Houses_Grounde19_20_G }
            // ,
            // { label: "20_21", y: this.Houses_Grounde20_21 }
          ]
        },

        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "Completed",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.Houses_Complete14_15_G },
            { label: "2015-16", y: this.Houses_Complete15_16_G },
            { label: "2016-17", y: this.Houses_Complete16_17_G },
            { label: "2017-18", y: this.Houses_Complete17_18_G },
            { label: "2018-19", y: this.Houses_Complete18_19_G },
            { label: "2019-20", y: this.Houses_Complete19_20_G }
            // ,
            // { label: "20_21", y: this.Houses_Complete20_21 }
          ]
        },

        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "Occupied",
          stValue: "Q1",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.HousesOccupied14_15_G },
            { label: "2015-16", y: this.HousesOccupied15_16_G },
            { label: "2016-17", y: this.HousesOccupied16_17_G },
            { label: "2017-18", y: this.HousesOccupied17_18_G },
            { label: "2018-19", y: this.HousesOccupied18_19_G },
            { label: "2019-20", y: this.HousesOccupied19_20_G }
            // ,
            // { label: "20_21", y: this.HousesOccupied20_21 }
          ]
        },

        // {
        //   type: "column",
        //   dockInsidePlotArea: true,
        //    indexLabel: "{y}", //HG
        //   bevelEnabled: true,
        //   showInLegend: true,
        //   legendText: "First Inst",
        //    stValue: "Q",
        //   indexLabelFontSize: 12,
        //   indexLabelOrientation: "vertical",
        //   dataPoints: [
        //     { label: "2014-15", y: this.First_Houses14_15 },
        //     { label: "2015-16", y: this.First_Houses15_16 },
        //     { label: "2016-17", y: this.First_Houses16_17 },
        //     { label: "2017-18", y: this.First_Houses17_18 },
        //     { label: "2018-19"", y: this.First_Houses18_19 },
        //     { label: "(2019-20)", y: this.First_Houses19_20 }
        //     // ,
        //     // { label: "20_21", y: this.First_Houses20_21 }
        //   ]
        // },

        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "2nd Inst",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.Second_Houses14_15_G },
            { label: "2015-16", y: this.Second_Houses15_16_G },
            { label: "2016-17", y: this.Second_Houses16_17_G },
            { label: "2017-18", y: this.Second_Houses17_18_G },
            { label: "2018-19", y: this.Second_Houses18_19_G },
            { label: "2019-20", y: this.Second_Houses19_20_G }
            // ,
            // { label: "20_21", y: this.Second_Houses20_21 }
          ]
        },

        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "3rd Inst",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.Third_Houses14_15_G },
            { label: "2015-16", y: this.Third_Houses15_16_G },
            { label: "2016-17", y: this.Third_Houses16_17_G },
            { label: "2017-18", y: this.Third_Houses17_18_G },
            { label: "2018-19", y: this.Third_Houses18_19_G },
            { label: "2019-20", y: this.Third_Houses19_20_G }
            // ,
            // { label: "20_21", y: this.Third_Houses20_21 }
          ]
        },
        ],
        options: {
          legend: {
            display: true,
            labels: {
              fontColor: 'rgb(255, 99, 132)'
            }
          }
        }
      });
      chartBLCS.render();
    });
  }


  BindBLC_DataNew(stateCode, DisttCode, cityCode, Comp, Fin_Year) {
    // alert('pm');
    // Comp ="BLCS";
    var str = Fin_Year;//'SUM(BENE2014_15),SUM(BENE2015_16)';
    // alert(str.length);

    if (str.length == 101) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      var z2 = splitted[3].substring(8, str.length - 3);
      var z3 = splitted[4].substring(8, str.length - 3);
      var z4 = splitted[5].substring(8, str.length - 3);
    }
    if (str.length == 84) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      var z2 = splitted[3].substring(8, str.length - 3);
      var z3 = splitted[4].substring(8, str.length - 3);
    }
    if (str.length == 67) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      var z2 = splitted[3].substring(8, str.length - 3);
      // alert(x1);
      //  alert(Y1); 
    }
    if (str.length == 50) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      var z1 = splitted[2].substring(8, str.length - 3);
      // alert(x1);
      //  alert(Y1); 
    }
    if (str.length == 33) {
      var splitted = str.split(",", str.length);
      //alert(splitted[0]);
      var x1 = splitted[0].substring(8, str.length - 3);
      var Y1 = splitted[1].substring(8, str.length - 3);
      // alert(x1);
      //  alert(Y1); 
    }
    if (str.length == 16) {
      var splitted = str.split(",", str.length);
      //          alert(splitted[0]);
      var x2 = splitted[0].substring(8, str.length - 1);
      //          alert(splitted.length);

    }
    //  let x = stringToSplit.split(" ");

    if (splitted.length == 1) {

      if (x2 == "2014_15")
        x2 = "2014-15";
      if (x2 == "2015_16")
        x2 = "2015-16";
      if (x2 == "2016_17")
        x2 = "2017-18";
      if (x2 == "2018_19)")
        x2 = "2018-19";
      if (x2 == "2019_20)")
        x2 = "2019-20";
      this.service.sp_create_BLC_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => {
        // this.service.sp_create_BLC_AHP_DATA(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        if (result[0].FinYear != "0") {

          this.Fin_Year14_15_G = result[0].FinYear;
          this.Housesinvolved14_15_G = result[0].Housesinvolved;
          this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
          this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
          this.Houses_Complete14_15_G = result[0].Houses_Completed;
          this.HousesOccupied14_15_G = result[0].HousesOccupied;
          this.First_Houses14_15_G = result[0].First_Houses;
          this.Second_Houses14_15_G = result[0].Second_Houses;
          this.Third_Houses14_15_G = result[0].Third_Houses;
        }

        let chart = new CanvasJS.Chart("chartBLCS", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress(Nos) for BLC under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x2, y: this.Housesinvolved14_15_G },

            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.FundsDisbursed_in_Houses14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Houses_Grounde14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Houses_Complete14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.HousesOccupied14_15_G },
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: x2, y: this.First_Houses14_15 },
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Second_Houses14_15_G },
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x2, y: this.Third_Houses14_15_G },
            ]
          },

          ],
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
      });
      //     let chart = new CanvasJS.Chart("chartPMAYU", {
      //       theme: "light2",
      //       animationEnabled: true,
      //       exportEnabled: false,
      //       title: {
      //         text: "Physical Data Consolidated (PMAYU)",
      //         fontSize: "25",
      //       },
      //       backgroundColor: this.backgroundColor, 
      //       colorSet: "greenShades",

      //       data: [{

      //         options: {
      //           scales: {
      //               xAxes: [{
      //                   stacked: true
      //               }],
      //               yAxes: [{
      //                   stacked: true
      //               }]
      //           }
      //       },

      //        type: "column",
      //         dockInsidePlotArea: true,
      //          indexLabel: "{y}", 
      //         bevelEnabled: true,
      //         showInLegend: true,
      //         legendText: "Housesinvolved",
      //          stValue: "Q",
      //         indexLabelFontSize: 12,
      //         indexLabelOrientation: "vertical",
      //         dataPoints: [
      //            { label: x2, y: this.Housesinvolved14_15 },
      //           { label: x2, y: this.FundsDisbursed_in_Houses14_15 },
      //           { label: x2, y: this\.Houses_Grounde14_15_G },
      //           { label: x2, y: this.Houses_Complete14_15 },
      //           { label: x2, y: this.HousesOccupied14_15 },
      //           { label: x2, y: this.First_Houses14_15 },
      //           { label: x2, y: this.Second_Houses14_15 },
      //           { label: x2, y: this.Third_Houses14_15 }
      //         ]
      //       }  ,

      //     ],
      //       options: {
      //         legend: {
      //           display: true,
      //           labels: {
      //             fontColor: 'rgb(255, 99, 132)'
      //           }
      //         }
      //       }
      //     });
      //     chart.render();
      // });


    }
    if (splitted.length == 2) {

      if (x1 == "2014_15)" || x1 == "2014_15")
        x1 = "2014-15";
      if (x1 == "2015_16)" || x1 == "2015_16")
        x1 = "2015-16";
      if (x1 == "2016_17" || x1 == "2016_17)")
        x1 = "2017-18";
      if (x1 == "2018_19" || x1 == "2018_19)")
        x1 = "2018-19";
      if (x1 == "2019_20" || x1 == "2019_20)")
        x1 = "2019-20";


      if (Y1 == "2014_15)" || Y1 == "2014_15")
        Y1 = "2014-15";
      if (Y1 == "2015_16)" || Y1 == "2015_16")
        Y1 = "2015-16";
      if (Y1 == "2016_17" || Y1 == "2016_17)")
        Y1 = "2017-18";
      if (Y1 == "2018_19" || Y1 == "2018_19)")
        Y1 = "2018-19";
      if (Y1 == "2019_20" || Y1 == "2019_20)")
        Y1 = "2019-20";
      this.service.sp_create_BLC_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartBLCS", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress(Nos) for BLC under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G }

            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: x1, y: this.First_Houses14_15 },
          //     { label: Y1, y: this.First_Houses15_16 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G }
            ]
          },

          ],
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
      });

    }
    if (splitted.length == 3) {

      if (x1 == "2014_15)" || x1 == "2014_15")
        x1 = "2014-15";
      if (x1 == "2015_16)" || x1 == "2015_16")
        x1 = "2015-16";
      if (x1 == "2016_17" || x1 == "2016_17)")
        x1 = "2017-18";
      if (x1 == "2018_19" || x1 == "2018_19)")
        x1 = "2018-19";
      if (x1 == "2019_20" || x1 == "2019_20)")
        x1 = "2019-20";


      if (Y1 == "2014_15)" || Y1 == "2014_15")
        Y1 = "2014-15";
      if (Y1 == "2015_16)" || Y1 == "2015_16")
        Y1 = "2015-16";
      if (Y1 == "2016_17" || Y1 == "2016_17)")
        Y1 = "2017-18";
      if (Y1 == "2018_19" || Y1 == "2018_19)")
        Y1 = "2018-19";
      if (Y1 == "2019_20" || Y1 == "2019_20)")
        Y1 = "2019-20";

      if (z1 == "2014_15)")
        z1 = "2014-15";
      if (z1 == "2015_16)")
        z1 = "2015-16";
      if (z1 == "2016_17")
        z1 = "2017-18";
      if (z1 == "2018_19")
        z1 = "2018-19";
      if (z1 == "2019_20")
        z1 = "2019-20";

      this.service.sp_create_BLC_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartBLCS", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress(Nos) for BLC under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G }

            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: "2014-15", y: this.First_Houses14_15 },
          //     { label: "2015-16", y: this.First_Houses15_16 },
          //     { label: "2016-17", y: this.First_Houses16_17 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G }
            ]
          },

          ],
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
      });

    }

    if (splitted.length == 4) {
      if (x1 == "2014_15)" || x1 == "2014_15")
        x1 = "2014-15";
      if (x1 == "2015_16)" || x1 == "2015_16")
        x1 = "2015-16";
      if (x1 == "2016_17" || x1 == "2016_17)")
        x1 = "2017-18";
      if (x1 == "2018_19" || x1 == "2018_19)")
        x1 = "2018-19";
      if (x1 == "2019_20" || x1 == "2019_20)")
        x1 = "2019-20";


      if (Y1 == "2014_15)" || Y1 == "2014_15")
        Y1 = "2014-15";
      if (Y1 == "2015_16)" || Y1 == "2015_16")
        Y1 = "2015-16";
      if (Y1 == "2016_17" || Y1 == "2016_17)")
        Y1 = "2017-18";
      if (Y1 == "2018_19" || Y1 == "2018_19)")
        Y1 = "2018-19";
      if (Y1 == "2019_20" || Y1 == "2019_20)")
        Y1 = "2019-20";

      if (z1 == "2014_15)")
        z1 = "2014-15";
      if (z1 == "2015_16)")
        z1 = "2015-16";
      if (z1 == "2016_17")
        z1 = "2017-18";
      if (z1 == "2018_19")
        z1 = "2018-19";
      if (z1 == "2019_20")
        z1 = "2019-20";


      if (z2 == "2014_15)")
        z2 = "2014-15";
      if (z2 == "2015_16)")
        z2 = "2015-16";
      if (z2 == "2016_17")
        z2 = "2017-18";
      if (z2 == "2018_19")
        z2 = "2018-19";
      if (z2 == "2019_20")
        z2 = "2019-20";

      this.service.sp_create_BLC_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year17_18_G = result[3].FinYear;
          this.Housesinvolved17_18_G = result[3].Housesinvolved;
          this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
          this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
          this.Houses_Complete17_18_G = result[3].Houses_Completed;
          this.HousesOccupied17_18_G = result[3].HousesOccupied;
          this.First_Houses17_18_G = result[3].First_Houses;
          this.Second_Houses17_18_G = result[3].Second_Houses;
          this.Third_Houses17_18_G = result[3].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartBLCS", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress(Nos) for BLC under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G },
              { label: z2, y: this.Housesinvolved17_18_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G },
              { label: z2, y: this.Houses_Grounde17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G },
              { label: z2, y: this.Houses_Complete17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G },
              { label: z2, y: this.HousesOccupied17_18_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: "2014-15", y: this.First_Houses14_15 },
          //     { label: "2015-16", y: this.First_Houses15_16 },
          //     { label: "2016-17", y: this.First_Houses16_17 },
          //     { label: "2017-18", y: this.First_Houses17_18 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G },
              { label: z2, y: this.Second_Houses17_18_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G },
              { label: z2, y: this.Third_Houses17_18_G }
            ]
          },

          ],
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
      });

    }
    if (splitted.length == 5) {

      if (x1 == "2014_15)" || x1 == "2014_15")
        x1 = "2014-15";
      if (x1 == "2015_16)" || x1 == "2015_16")
        x1 = "2015-16";
      if (x1 == "2016_17" || x1 == "2016_17)")
        x1 = "2017-18";
      if (x1 == "2018_19" || x1 == "2018_19)")
        x1 = "2018-19";
      if (x1 == "2019_20" || x1 == "2019_20)")
        x1 = "2019-20";


      if (Y1 == "2014_15)" || Y1 == "2014_15")
        Y1 = "2014-15";
      if (Y1 == "2015_16)" || Y1 == "2015_16")
        Y1 = "2015-16";
      if (Y1 == "2016_17" || Y1 == "2016_17)")
        Y1 = "2017-18";
      if (Y1 == "2018_19" || Y1 == "2018_19)")
        Y1 = "2018-19";
      if (Y1 == "2019_20" || Y1 == "2019_20)")
        Y1 = "2019-20";

      if (z1 == "2014_15)")
        z1 = "2014-15";
      if (z1 == "2015_16)")
        z1 = "2015-16";
      if (z1 == "2016_17")
        z1 = "2017-18";
      if (z1 == "2018_19")
        z1 = "2018-19";
      if (z1 == "2019_20")
        z1 = "2019-20";


      if (z2 == "2014_15)")
        z2 = "2014-15";
      if (z2 == "2015_16)")
        z2 = "2015-16";
      if (z2 == "2016_17")
        z2 = "2017-18";
      if (z2 == "2018_19")
        z2 = "2018-19";
      if (z2 == "2019_20")
        z2 = "2019-20";

      if (z3 == "2014_15)")
        z3 = "2014-15";
      if (z3 == "2015_16)")
        z3 = "2015-16";
      if (z3 == "2016_17")
        z3 = "2017-18";
      if (z3 == "2018_19")
        z3 = "2018-19";
      if (z3 == "2019_20")
        z3 = "2019-20";
      this.service.sp_create_BLC_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year17_18_G = result[3].FinYear;
          this.Housesinvolved17_18_G = result[3].Housesinvolved;
          this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
          this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
          this.Houses_Complete17_18_G = result[3].Houses_Completed;
          this.HousesOccupied17_18_G = result[3].HousesOccupied;
          this.First_Houses17_18_G = result[3].First_Houses;
          this.Second_Houses17_18_G = result[3].Second_Houses;
          this.Third_Houses17_18_G = result[3].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year18_19_G = result[4].FinYear;
          this.Housesinvolved18_19_G = result[4].Housesinvolved;
          this.FundsDisbursed_in_Houses18_19_G = result[4].FundsDisbursed_in_Houses;
          this.Houses_Grounde18_19_G = result[4].Houses_Grounded;
          this.Houses_Complete18_19_G = result[4].Houses_Completed;
          this.HousesOccupied18_19_G = result[4].HousesOccupied;
          this.First_Houses18_19_G = result[4].First_Houses;
          this.Second_Houses18_19_G = result[4].Second_Houses;
          this.Third_Houses18_19_G = result[4].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartBLCS", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress(Nos) for BLC under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G },
              { label: z2, y: this.Housesinvolved17_18_G },
              { label: z3, y: this.Housesinvolved18_19_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18_G },
              { label: z3, y: this.FundsDisbursed_in_Houses18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G },
              { label: z2, y: this.Houses_Grounde17_18_G },
              { label: z3, y: this.Houses_Grounde18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G },
              { label: z2, y: this.Houses_Complete17_18_G },
              { label: z3, y: this.Houses_Complete18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G },
              { label: z2, y: this.HousesOccupied17_18_G },
              { label: z3, y: this.HousesOccupied18_19_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: "2014-15", y: this.First_Houses14_15 },
          //     { label: "2015-16", y: this.First_Houses15_16 },
          //     { label: "2016-17", y: this.First_Houses16_17 },
          //     { label: "2017-18", y: this.First_Houses17_18 },
          //     { label: "2018-19", y: this.First_Houses18_19 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G },
              { label: z2, y: this.Second_Houses17_18_G },
              { label: z3, y: this.Second_Houses18_19_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G },
              { label: z2, y: this.Third_Houses17_18_G },
              { label: z3, y: this.Third_Houses18_19_G }
            ]
          },

          ],
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
      });

    }
    if (splitted.length == 6) {

      if (x1 == "2014_15)" || x1 == "2014_15")
        x1 = "2014-15";
      if (x1 == "2015_16)" || x1 == "2015_16")
        x1 = "2015-16";
      if (x1 == "2016_17" || x1 == "2016_17)")
        x1 = "2017-18";
      if (x1 == "2018_19" || x1 == "2018_19)")
        x1 = "2018-19";
      if (x1 == "2019_20" || x1 == "2019_20)")
        x1 = "2019-20";


      if (Y1 == "2014_15)" || Y1 == "2014_15")
        Y1 = "2014-15";
      if (Y1 == "2015_16)" || Y1 == "2015_16")
        Y1 = "2015-16";
      if (Y1 == "2016_17" || Y1 == "2016_17)")
        Y1 = "2017-18";
      if (Y1 == "2018_19" || Y1 == "2018_19)")
        Y1 = "2018-19";
      if (Y1 == "2019_20" || Y1 == "2019_20)")
        Y1 = "2019-20";

      if (z1 == "2014_15)")
        z1 = "2014-15";
      if (z1 == "2015_16)")
        z1 = "2015-16";
      if (z1 == "2016_17")
        z1 = "2017-18";
      if (z1 == "2018_19")
        z1 = "2018-19";
      if (z1 == "2019_20")
        z1 = "2019-20";


      if (z2 == "2014_15)")
        z2 = "2014-15";
      if (z2 == "2015_16)")
        z2 = "2015-16";
      if (z2 == "2016_17")
        z2 = "2017-18";
      if (z2 == "2018_19")
        z2 = "2018-19";
      if (z2 == "2019_20")
        z2 = "2019-20";

      if (z3 == "2014_15)")
        z3 = "2014-15";
      if (z3 == "2015_16)")
        z3 = "2015-16";
      if (z3 == "2016_17")
        z3 = "2017-18";
      if (z3 == "2018_19")
        z3 = "2018-19";
      if (z3 == "2019_20")
        z3 = "2019-20";

      if (z4 == "2014_15)")
        z4 = "2014-15";
      if (z4 == "2015_16)")
        z4 = "2015-16";
      if (z4 == "2016_17")
        z4 = "2017-18";
      if (z4 == "2018_19")
        z4 = "2018-19";
      if (z4 == "2019_20")
        z4 = "2019-20";

      this.service.sp_create_BLC_DATANew(stateCode, DisttCode, cityCode, Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;
        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

        // 
        try {
          this.Fin_Year15_16_G = result[1].FinYear;
          this.Housesinvolved15_16_G = result[1].Housesinvolved;
          this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
          this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
          this.Houses_Complete15_16_G = result[1].Houses_Completed;
          this.HousesOccupied15_16_G = result[1].HousesOccupied;
          this.First_Houses15_16_G = result[1].First_Houses;
          this.Second_Houses15_16_G = result[1].Second_Houses;
          this.Third_Houses15_16_G = result[1].Third_Houses;
        }
        catch{ }
        finally { }


        try {
          this.Fin_Year16_17_G = result[2].FinYear;
          this.Housesinvolved16_17_G = result[2].Housesinvolved;
          this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
          this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
          this.Houses_Complete16_17_G = result[2].Houses_Completed;
          this.HousesOccupied16_17_G = result[2].HousesOccupied;
          this.First_Houses16_17_G = result[2].First_Houses;
          this.Second_Houses16_17_G = result[2].Second_Houses;
          this.Third_Houses16_17_G = result[2].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year17_18_G = result[3].FinYear;
          this.Housesinvolved17_18_G = result[3].Housesinvolved;
          this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
          this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
          this.Houses_Complete17_18_G = result[3].Houses_Completed;
          this.HousesOccupied17_18_G = result[3].HousesOccupied;
          this.First_Houses17_18_G = result[3].First_Houses;
          this.Second_Houses17_18_G = result[3].Second_Houses;
          this.Third_Houses17_18_G = result[3].Third_Houses;
        }
        catch{ }
        finally { }

        try {
          this.Fin_Year18_19_G = result[4].FinYear;
          this.Housesinvolved18_19_G = result[4].Housesinvolved;
          this.FundsDisbursed_in_Houses18_19_G = result[4].FundsDisbursed_in_Houses;
          this.Houses_Grounde18_19_G = result[4].Houses_Grounded;
          this.Houses_Complete18_19_G = result[4].Houses_Completed;
          this.HousesOccupied18_19_G = result[4].HousesOccupied;
          this.First_Houses18_19_G = result[4].First_Houses;
          this.Second_Houses18_19_G = result[4].Second_Houses;
          this.Third_Houses18_19_G = result[4].Third_Houses;
        }
        catch{ }
        finally { }


        let chart = new CanvasJS.Chart("chartBLCS", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress(Nos) for BLC under PMAY(U)",
          //   fontSize: "25",
          // },
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",

          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },





            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_G },
              { label: Y1, y: this.Housesinvolved15_16_G },
              { label: z1, y: this.Housesinvolved16_17_G },
              { label: z2, y: this.Housesinvolved17_18_G },
              { label: z3, y: this.Housesinvolved18_19_G },
              { label: z4, y: this.Housesinvolved19_20_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_G },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_G },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_G },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18_G },
              { label: z3, y: this.FundsDisbursed_in_Houses18_19_G },
              { label: z4, y: this.FundsDisbursed_in_Houses19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_G },
              { label: Y1, y: this.Houses_Grounde15_16_G },
              { label: z1, y: this.Houses_Grounde16_17_G },
              { label: z2, y: this.Houses_Grounde17_18_G },
              { label: z3, y: this.Houses_Grounde18_19_G },
              { label: z4, y: this.Houses_Grounde19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_G },
              { label: Y1, y: this.Houses_Complete15_16_G },
              { label: z1, y: this.Houses_Complete16_17_G },
              { label: z2, y: this.Houses_Complete17_18_G },
              { label: z3, y: this.Houses_Complete18_19_G },
              { label: z4, y: this.Houses_Complete19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.HousesOccupied14_15_G },
              { label: Y1, y: this.HousesOccupied15_16_G },
              { label: z1, y: this.HousesOccupied16_17_G },
              { label: z2, y: this.HousesOccupied17_18_G },
              { label: z3, y: this.HousesOccupied18_19_G },
              { label: z4, y: this.HousesOccupied19_20_G }
            ]
          },

          // {
          //   type: "column",
          //   dockInsidePlotArea: true,
          //    indexLabel: "{y}", //HG
          //   bevelEnabled: true,
          //   showInLegend: true,
          //   legendText: "First Inst",
          //    stValue: "Q",
          //   indexLabelFontSize: 12,
          //   indexLabelOrientation: "vertical",
          //   dataPoints: [
          //     { label: "2014-15", y: this.First_Houses14_15 },
          //     { label: "2015-16", y: this.First_Houses15_16 },
          //     { label: "2016-17", y: this.First_Houses16_17 },
          //     { label: "2017-18", y: this.First_Houses17_18 },
          //     { label: "2018-19", y: this.First_Houses18_19 },
          //     { label: "2019-20", y: this.First_Houses19_20 }
          //   ]
          // },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Second_Houses14_15_G },
              { label: Y1, y: this.Second_Houses15_16_G },
              { label: z1, y: this.Second_Houses16_17_G },
              { label: z2, y: this.Second_Houses17_18_G },
              { label: z3, y: this.Second_Houses18_19_G },
              { label: z4, y: this.Second_Houses19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Third_Houses14_15_G },
              { label: Y1, y: this.Third_Houses15_16_G },
              { label: z1, y: this.Third_Houses16_17_G },
              { label: z2, y: this.Third_Houses17_18_G },
              { label: z3, y: this.Third_Houses18_19_G },
              { label: z4, y: this.Third_Houses19_20_G }
            ]
          },

          ],
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
      });

    }
  }
  BindAHP_Data(stateCode, DisttCode, cityCode, Comp, Fin_Year) {
    // debugger;
    //  alert(stateCode);
    Comp = "AHP";
    this.service.sp_create_BLC_AHP_DATA(stateCode, DisttCode, cityCode, Comp).subscribe(result => { // new code
      ///first row data

      this.Fin_Year14_15_G = result[0].FinYear;
      this.Housesinvolved14_15_G = result[0].Housesinvolved;
      this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
      this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
      this.Houses_Complete14_15_G = result[0].Houses_Completed;
      this.HousesOccupied14_15_G = result[0].HousesOccupied;

      this.First_Houses14_15_G = result[0].First_Houses;
      this.Second_Houses14_15_G = result[0].Second_Houses;
      this.Third_Houses14_15_G = result[0].Third_Houses;

      //second row data
      this.Fin_Year15_16_G = result[1].FinYear;
      this.Housesinvolved15_16_G = result[1].Housesinvolved;
      this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
      this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
      this.Houses_Complete15_16_G = result[1].Houses_Completed;
      this.HousesOccupied15_16_G = result[1].HousesOccupied;
      this.First_Houses15_16_G = result[1].First_Houses;
      this.Second_Houses15_16_G = result[1].Second_Houses;
      this.Third_Houses15_16_G = result[1].Third_Houses;

      //Third row data
      try {
        this.Fin_Year16_17_G = result[2].FinYear;
        this.Housesinvolved16_17_G = result[2].Housesinvolved;
        this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
        this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
        this.Houses_Complete16_17_G = result[2].Houses_Completed;
        this.HousesOccupied16_17_G = result[2].HousesOccupied;

        this.First_Houses16_17_G = result[2].First_Houses;
        this.Second_Houses16_17_G = result[2].Second_Houses;
        this.Third_Houses16_17_G = result[2].Third_Houses;
      }
      catch{ }
      finally { }

      //Fourth row data
      this.Fin_Year17_18_G = result[3].FinYear;
      this.Housesinvolved17_18_G = result[3].Housesinvolved;
      this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
      this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
      this.Houses_Complete17_18_G = result[3].Houses_Completed;
      this.HousesOccupied17_18_G = result[3].HousesOccupied;

      this.First_Houses17_18_G = result[3].First_Houses;
      this.Second_Houses17_18_G = result[3].Second_Houses;
      this.Third_Houses17_18_G = result[3].Third_Houses;

      //Fifth row data
      this.Fin_Year18_19_G = result[4].FinYear;
      this.Housesinvolved18_19_G = result[4].Housesinvolved;
      this.FundsDisbursed_in_Houses18_19_G = result[4].FundsDisbursed_in_Houses;
      this.Houses_Grounde18_19_G = result[4].Houses_Grounded;
      this.Houses_Complete18_19_G = result[4].Houses_Completed;
      this.HousesOccupied18_19_G = result[4].HousesOccupied;

      this.First_Houses18_19_G = result[4].First_Houses;
      this.Second_Houses18_19_G = result[4].Second_Houses;
      this.Third_Houses18_19_G = result[4].Third_Houses;


      //Sixth row data
      this.Fin_Year19_20_G = result[5].FinYear;
      this.Housesinvolved19_20_G = result[5].Housesinvolved;
      this.FundsDisbursed_in_Houses19_20_G = result[5].FundsDisbursed_in_Houses;
      this.Houses_Grounde19_20_G = result[5].Houses_Grounded;
      this.Houses_Complete19_20_G = result[5].Houses_Completed;
      this.HousesOccupied19_20_G = result[5].HousesOccupied;


      this.First_Houses19_20_G = result[5].First_Houses;
      this.Second_Houses19_20_G = result[5].Second_Houses;
      this.Third_Houses19_20_G = result[5].Third_Houses;

      this.Test(Fin_Year);


      let chart = new CanvasJS.Chart("chartAHP", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: false,
        // title: {
        //   text: "Physical Progress Nos) for AHP under PMAY(U)",
        //   fontSize: "25",
        // },
        axisY: {
          labelFontSize: 12,
          labelFontColor: "#000",
        },
        axisX: {
          labelFontSize: 12,
          labelFontColor: "#000",
        },
        legend: {
          fontSize: 14,
        },
        backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
        colorSet: "greenShades",

        data: [{

          options: {
            scales: {
              xAxes: [{
                stacked: true
              }],
              yAxes: [{
                stacked: true
              }]
            }
          },
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "Sanctioned",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            // { x: "14-15", y: this.Fin_Year15_16 },
            { label: "2014-15", y: this.Housesinvolved14_15_G },
            { label: "2015-16", y: this.Housesinvolved15_16_G },
            { label: "2016-17", y: this.Housesinvolved16_17_G },
            { label: "2017-18", y: this.Housesinvolved17_18_G },
            { label: "2018-19", y: this.Housesinvolved18_19_G },
            { label: "2019-20", y: this.Housesinvolved19_20_G }
          ]
        },
        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "Funded",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.FundsDisbursed_in_Houses14_15_G },
            { label: "2015-16", y: this.FundsDisbursed_in_Houses15_16_G },
            { label: "2016-17", y: this.FundsDisbursed_in_Houses16_17_G },
            { label: "2017-18", y: this.FundsDisbursed_in_Houses17_18_G },
            { label: "2018-19", y: this.FundsDisbursed_in_Houses18_19_G },
            { label: "2019-20", y: this.FundsDisbursed_in_Houses19_20_G }
          ]
        },

        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "Grounded",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.Houses_Grounde14_15_G },
            { label: "2015-16", y: this.Houses_Grounde15_16_G },
            { label: "2016-17", y: this.Houses_Grounde16_17_G },
            { label: "2017-18", y: this.Houses_Grounde17_18_G },
            { label: "2018-19", y: this.Houses_Grounde18_19_G },
            { label: "2019-20", y: this.Houses_Grounde19_20_G }
          ]
        },

        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "Completed",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.Houses_Complete14_15_G },
            { label: "2015-16", y: this.Houses_Complete15_16_G },
            { label: "2016-17", y: this.Houses_Complete16_17_G },
            { label: "2017-18", y: this.Houses_Complete17_18_G },
            { label: "2018-19", y: this.Houses_Complete18_19_G },
            { label: "2019-20", y: this.Houses_Complete19_20_G }
          ]
        },

        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "Occupied",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.HousesOccupied14_15_G },
            { label: "2015-16", y: this.HousesOccupied15_16_G },
            { label: "2016-17", y: this.HousesOccupied16_17_G },
            { label: "2017-18", y: this.HousesOccupied17_18_G },
            { label: "2018-19", y: this.HousesOccupied18_19_G },
            { label: "2019-20", y: this.HousesOccupied19_20_G }
          ]
        },

        // {
        //   type: "column",
        //   dockInsidePlotArea: true,
        //    indexLabel: "{y}", //HG
        //   bevelEnabled: true,
        //   showInLegend: true,
        //   legendText: "First Inst",
        //    stValue: "Q",
        //   indexLabelFontSize: 12,
        //   indexLabelOrientation: "vertical",
        //   dataPoints: [
        //     { label: "14_15", y: this.First_Houses14_15 },
        //     { label: "15_16", y: this.First_Houses15_16 },
        //     { label: "16_17", y: this.First_Houses16_17 },
        //     { label: "17_18", y: this.First_Houses17_18 },
        //     { label: "18_19", y: this.First_Houses18_19 },
        //     { label: "19_20", y: this.First_Houses19_20 }
        //   ]
        // },

        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "2nd Inst",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.Second_Houses14_15_G },
            { label: "2015-16", y: this.Second_Houses15_16_G },
            { label: "2016-17", y: this.Second_Houses16_17_G },
            { label: "2017-18", y: this.Second_Houses17_18_G },
            { label: "2018-19", y: this.Second_Houses18_19_G },
            { label: "2019-20", y: this.Second_Houses19_20_G }
          ]
        },

        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "3rd Inst",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.Third_Houses14_15_G },
            { label: "2015-16", y: this.Third_Houses15_16_G },
            { label: "2016-17", y: this.Third_Houses16_17_G },
            { label: "2017-18", y: this.Third_Houses17_18_G },
            { label: "2018-19", y: this.Third_Houses18_19_G },
            { label: "2019-20", y: this.Third_Houses19_20_G }
          ]
        },

        ],
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
    });
  }

  public Test(Fin_Year) {
    if (Fin_Year == "2014-15") {
      //this.Housesinvolved14_15 =0;
      this.Housesinvolved15_16_G = 0;
      this.Housesinvolved16_17_G = 0;
      this.Housesinvolved17_18_G = 0;
      this.Housesinvolved18_19_G = 0;
      this.Housesinvolved19_20_G = 0;

      //this.FundsDisbursed_in_Houses14_15 },
      this.FundsDisbursed_in_Houses15_16_G = 0;
      this.FundsDisbursed_in_Houses16_17_G = 0;
      this.FundsDisbursed_in_Houses17_18_G = 0;
      this.FundsDisbursed_in_Houses18_19_G = 0;
      this.FundsDisbursed_in_Houses19_20_G = 0;

      //this\.Houses_Grounde14_15_G  =0;
      this.Houses_Grounde15_16_G = 0;
      this.Houses_Grounde16_17_G = 0;
      this.Houses_Grounde17_18_G = 0;
      this.Houses_Grounde18_19_G = 0;
      this.Houses_Grounde19_20_G = 0;


      //this.Houses_Complete14_15 =0;

      this.Houses_Complete15_16_G = 0;
      this.Houses_Complete16_17_G = 0;
      this.Houses_Complete17_18_G = 0;
      this.Houses_Complete18_19_G = 0;
      this.Houses_Complete19_20_G = 0;

      //               this.HousesOccupied14_15 =0;
      this.HousesOccupied15_16_G = 0;
      this.HousesOccupied16_17_G = 0;
      this.HousesOccupied17_18_G = 0;
      this.HousesOccupied18_19_G = 0;
      this.HousesOccupied19_20_G = 0;

      //            this.HousesOccupied14_15 =0;
      this.HousesOccupied15_16_G = 0;
      this.HousesOccupied16_17_G = 0;
      this.HousesOccupied17_18_G = 0;
      this.HousesOccupied18_19_G = 0;
      this.HousesOccupied19_20_G = 0;
      this.HousesOccupied20_21_G = 0;

      //          this.First_Houses14_15 =0;
      this.First_Houses15_16_G = 0;
      this.First_Houses16_17_G = 0;
      this.First_Houses17_18_G = 0;
      this.First_Houses18_19_G = 0;
      this.First_Houses19_20_G = 0;

      //         this.Second_Houses14_15 =0;
      this.Second_Houses15_16_G = 0;
      this.Second_Houses16_17_G = 0;
      this.Second_Houses17_18_G = 0;
      this.Second_Houses18_19_G = 0;
      this.Second_Houses19_20_G = 0;

      //      this.Third_Houses14_15 =0;
      this.Third_Houses15_16_G = 0;
      this.Third_Houses16_17_G = 0;
      this.Third_Houses17_18_G = 0;
      this.Third_Houses18_19_G = 0;
      this.Third_Houses19_20_G = 0;
      this.Third_Houses20_21_G = 0;
    }
    if (Fin_Year == "2015-16") {
      this.Housesinvolved14_15_G = 0;
      //this.Housesinvolved15_16 =0;
      this.Housesinvolved16_17_G = 0;
      this.Housesinvolved17_18_G = 0;
      this.Housesinvolved18_19_G = 0;
      this.Housesinvolved19_20_G = 0;

      this.FundsDisbursed_in_Houses14_15_G = 0;
      //this.FundsDisbursed_in_Houses15_16 =0;
      this.FundsDisbursed_in_Houses16_17_G = 0;
      this.FundsDisbursed_in_Houses17_18_G = 0;
      this.FundsDisbursed_in_Houses18_19_G = 0;
      this.FundsDisbursed_in_Houses19_20_G = 0;

      this.Houses_Grounde14_15_G = 0;
      //                this.Houses_Grounde15_16 =0;
      this.Houses_Grounde16_17_G = 0;
      this.Houses_Grounde17_18_G = 0;
      this.Houses_Grounde18_19_G = 0;
      this.Houses_Grounde19_20_G = 0;


      this.Houses_Complete14_15_G = 0;

      // this.Houses_Complete15_16 =0;
      this.Houses_Complete16_17_G = 0;
      this.Houses_Complete17_18_G = 0;
      this.Houses_Complete18_19_G = 0;
      this.Houses_Complete19_20_G = 0;

      this.HousesOccupied14_15_G = 0;
      //              this.HousesOccupied15_16 =0;
      this.HousesOccupied16_17_G = 0;
      this.HousesOccupied17_18_G = 0;
      this.HousesOccupied18_19_G = 0;
      this.HousesOccupied19_20_G = 0;

      this.HousesOccupied14_15_G = 0;
      //            this.HousesOccupied15_16 =0;
      this.HousesOccupied16_17_G = 0;
      this.HousesOccupied17_18_G = 0;
      this.HousesOccupied18_19_G = 0;
      this.HousesOccupied19_20_G = 0;
      this.HousesOccupied20_21_G = 0;

      this.First_Houses14_15_G = 0;
      //          this.First_Houses15_16 =0;
      this.First_Houses16_17_G = 0;
      this.First_Houses17_18_G = 0;
      this.First_Houses18_19_G = 0;
      this.First_Houses19_20_G = 0;

      this.Second_Houses14_15_G = 0;
      //        this.Second_Houses15_16 =0;
      this.Second_Houses16_17_G = 0;
      this.Second_Houses17_18_G = 0;
      this.Second_Houses18_19_G = 0;
      this.Second_Houses19_20_G = 0;

      this.Third_Houses14_15_G = 0;
      //      this.Third_Houses15_16 =0;
      this.Third_Houses16_17_G = 0;
      this.Third_Houses17_18_G = 0;
      this.Third_Houses18_19_G = 0;
      this.Third_Houses19_20_G = 0;
      this.Third_Houses20_21_G = 0;
    }
    if (Fin_Year == "2016-17") {
      this.Housesinvolved14_15_G = 0;
      this.Housesinvolved15_16_G = 0;
      //this.Housesinvolved16_17  =0;
      this.Housesinvolved17_18_G = 0;
      this.Housesinvolved18_19_G = 0;
      this.Housesinvolved19_20_G = 0;

      this.FundsDisbursed_in_Houses14_15_G = 0;
      this.FundsDisbursed_in_Houses15_16_G = 0;
      //this.FundsDisbursed_in_Houses16_17 =0;
      this.FundsDisbursed_in_Houses17_18_G = 0;
      this.FundsDisbursed_in_Houses18_19_G = 0;
      this.FundsDisbursed_in_Houses19_20_G = 0;

      this.Houses_Grounde14_15_G = 0;
      this.Houses_Grounde15_16_G = 0;
      //                 this.Houses_Grounde16_17 =0;
      this.Houses_Grounde17_18_G = 0;
      this.Houses_Grounde18_19_G = 0;
      this.Houses_Grounde19_20_G = 0;


      this.Houses_Complete14_15_G = 0;

      this.Houses_Complete15_16_G = 0;
      //  this.Houses_Complete16_17 =0;
      this.Houses_Complete17_18_G = 0;
      this.Houses_Complete18_19_G = 0;
      this.Houses_Complete19_20_G = 0;

      this.HousesOccupied14_15_G = 0;
      this.HousesOccupied15_16_G = 0;
      //              this.HousesOccupied16_17 =0;
      this.HousesOccupied17_18_G = 0;
      this.HousesOccupied18_19_G = 0;
      this.HousesOccupied19_20_G = 0;

      this.HousesOccupied14_15_G = 0;
      this.HousesOccupied15_16_G = 0;
      //            this.HousesOccupied16_17 =0;
      this.HousesOccupied17_18_G = 0;
      this.HousesOccupied18_19_G = 0;
      this.HousesOccupied19_20_G = 0;
      this.HousesOccupied20_21_G = 0;

      this.First_Houses14_15_G = 0;
      this.First_Houses15_16_G = 0;
      //          this.First_Houses16_17 =0;
      this.First_Houses17_18_G = 0;
      this.First_Houses18_19_G = 0;
      this.First_Houses19_20_G = 0;

      this.Second_Houses14_15_G = 0;
      this.Second_Houses15_16_G = 0;
      //        this.Second_Houses16_17 =0;
      this.Second_Houses17_18_G = 0;
      this.Second_Houses18_19_G = 0;
      this.Second_Houses19_20_G = 0;

      this.Third_Houses14_15_G = 0;
      this.Third_Houses15_16_G = 0;
      //      this.Third_Houses16_17 =0;
      this.Third_Houses17_18_G = 0;
      this.Third_Houses18_19_G = 0;
      this.Third_Houses19_20_G = 0;
      this.Third_Houses20_21_G = 0;
    }

    if (Fin_Year == "2017-18") {
      this.Housesinvolved14_15_G = 0;
      this.Housesinvolved15_16_G = 0;
      this.Housesinvolved16_17_G = 0;
      //this.Housesinvolved17_18   =0;
      this.Housesinvolved18_19_G = 0;
      this.Housesinvolved19_20_G = 0;

      this.FundsDisbursed_in_Houses14_15_G = 0;
      this.FundsDisbursed_in_Houses15_16_G = 0;
      this.FundsDisbursed_in_Houses16_17_G = 0;
      //this.FundsDisbursed_in_Houses17_18 =0;
      this.FundsDisbursed_in_Houses18_19_G = 0;
      this.FundsDisbursed_in_Houses19_20_G = 0;

      this.Houses_Grounde14_15_G = 0;
      this.Houses_Grounde15_16_G = 0;
      this.Houses_Grounde16_17_G = 0;
      //                 this.Houses_Grounde17_18 =0;
      this.Houses_Grounde18_19_G = 0;
      this.Houses_Grounde19_20_G = 0;


      this.Houses_Complete14_15_G = 0;

      this.Houses_Complete15_16_G = 0;
      this.Houses_Complete16_17_G = 0;
      //   this.Houses_Complete17_18 =0;
      this.Houses_Complete18_19_G = 0;
      this.Houses_Complete19_20_G = 0;

      this.HousesOccupied14_15_G = 0;
      this.HousesOccupied15_16_G = 0;
      this.HousesOccupied16_17_G = 0;
      //              this.HousesOccupied17_18 =0;
      this.HousesOccupied18_19_G = 0;
      this.HousesOccupied19_20_G = 0;

      this.HousesOccupied14_15_G = 0;
      this.HousesOccupied15_16_G = 0;
      this.HousesOccupied16_17_G = 0;
      //            this.HousesOccupied17_18 =0;
      this.HousesOccupied18_19_G = 0;
      this.HousesOccupied19_20_G = 0;
      this.HousesOccupied20_21_G = 0;

      this.First_Houses14_15_G = 0;
      this.First_Houses15_16_G = 0;
      this.First_Houses16_17_G = 0;
      //          this.First_Houses17_18 =0;
      this.First_Houses18_19_G = 0;
      this.First_Houses19_20_G = 0;

      this.Second_Houses14_15_G = 0;
      this.Second_Houses15_16_G = 0;
      this.Second_Houses16_17_G = 0;
      //        this.Second_Houses17_18 =0;
      this.Second_Houses18_19_G = 0;
      this.Second_Houses19_20_G = 0;

      this.Third_Houses14_15_G = 0;
      this.Third_Houses15_16_G = 0;
      this.Third_Houses16_17_G = 0;
      //       this.Third_Houses17_18 =0;
      this.Third_Houses18_19_G = 0;
      this.Third_Houses19_20_G = 0;
      this.Third_Houses20_21_G = 0;
    }

    if (Fin_Year == "2018-19") {
      this.Housesinvolved14_15_G = 0;
      this.Housesinvolved15_16_G = 0;
      this.Housesinvolved16_17_G = 0;
      this.Housesinvolved17_18_G = 0;
      //this.Housesinvolved18_19 =0;
      this.Housesinvolved19_20_G = 0;

      this.FundsDisbursed_in_Houses14_15_G = 0;
      this.FundsDisbursed_in_Houses15_16_G = 0;
      this.FundsDisbursed_in_Houses16_17_G = 0;
      this.FundsDisbursed_in_Houses17_18_G = 0;
      //this.FundsDisbursed_in_Houses18_19 =0;
      this.FundsDisbursed_in_Houses19_20_G = 0;

      this.Houses_Grounde14_15_G = 0;
      this.Houses_Grounde15_16_G = 0;
      this.Houses_Grounde16_17_G = 0;
      this.Houses_Grounde17_18_G = 0;
      //                 this.Houses_Grounde18_19 =0;
      this.Houses_Grounde19_20_G = 0;


      this.Houses_Complete14_15_G = 0;

      this.Houses_Complete15_16_G = 0;
      this.Houses_Complete16_17_G = 0;
      this.Houses_Complete17_18_G = 0;
      //    this.Houses_Complete18_19 =0;
      this.Houses_Complete19_20_G = 0;

      this.HousesOccupied14_15_G = 0;
      this.HousesOccupied15_16_G = 0;
      this.HousesOccupied16_17_G = 0;
      this.HousesOccupied17_18_G = 0;
      //              this.HousesOccupied18_19 =0;
      this.HousesOccupied19_20_G = 0;

      this.HousesOccupied14_15_G = 0;
      this.HousesOccupied15_16_G = 0;
      this.HousesOccupied16_17_G = 0;
      this.HousesOccupied17_18_G = 0;
      //            this.HousesOccupied18_19 =0;
      this.HousesOccupied19_20_G = 0;
      this.HousesOccupied20_21_G = 0;

      this.First_Houses14_15_G = 0;
      this.First_Houses15_16_G = 0;
      this.First_Houses16_17_G = 0;
      this.First_Houses17_18_G = 0;
      //          this.First_Houses18_19 =0;
      this.First_Houses19_20_G = 0;

      this.Second_Houses14_15_G = 0;
      this.Second_Houses15_16_G = 0;
      this.Second_Houses16_17_G = 0;
      this.Second_Houses17_18_G = 0;
      //        this.Second_Houses18_19 =0;
      this.Second_Houses19_20_G = 0;

      this.Third_Houses14_15_G = 0;
      this.Third_Houses15_16_G = 0;
      this.Third_Houses16_17_G = 0;
      this.Third_Houses17_18_G = 0;
      //      this.Third_Houses18_19 =0;
      this.Third_Houses19_20_G = 0;
      this.Third_Houses20_21_G = 0;
    }
    if (Fin_Year == "2019-20") {
      this.Housesinvolved14_15_G = 0;
      this.Housesinvolved15_16_G = 0;
      this.Housesinvolved16_17_G = 0;
      this.Housesinvolved17_18_G = 0;
      this.Housesinvolved18_19_G = 0;
      //this.Housesinvolved19_20=0;

      this.FundsDisbursed_in_Houses14_15_G = 0;
      this.FundsDisbursed_in_Houses15_16_G = 0;
      this.FundsDisbursed_in_Houses16_17_G = 0;
      this.FundsDisbursed_in_Houses17_18_G = 0;
      this.FundsDisbursed_in_Houses18_19_G = 0;
      //this.FundsDisbursed_in_Houses19_20 =0;

      this.Houses_Grounde14_15_G = 0;
      this.Houses_Grounde15_16_G = 0;
      this.Houses_Grounde16_17_G = 0;
      this.Houses_Grounde17_18_G = 0;
      this.Houses_Grounde18_19_G = 0;
      //                 this.Houses_Grounde19_20 =0;


      this.Houses_Complete14_15_G = 0;

      this.Houses_Complete15_16_G = 0;
      this.Houses_Complete16_17_G = 0;
      this.Houses_Complete17_18_G = 0;
      this.Houses_Complete18_19_G = 0;
      //   this.Houses_Complete19_20 =0;

      this.HousesOccupied14_15_G = 0;
      this.HousesOccupied15_16_G = 0;
      this.HousesOccupied16_17_G = 0;
      this.HousesOccupied17_18_G = 0;
      this.HousesOccupied18_19_G = 0;
      //              this.HousesOccupied19_20 =0;

      this.HousesOccupied14_15_G = 0;
      this.HousesOccupied15_16_G = 0;
      this.HousesOccupied16_17_G = 0;
      this.HousesOccupied17_18_G = 0;
      this.HousesOccupied18_19_G = 0;
      //            this.HousesOccupied19_20 =0;
      this.HousesOccupied20_21_G = 0;

      this.First_Houses14_15_G = 0;
      this.First_Houses15_16_G = 0;
      this.First_Houses16_17_G = 0;
      this.First_Houses17_18_G = 0;
      this.First_Houses18_19_G = 0;
      //          this.First_Houses19_20 =0;

      this.Second_Houses14_15_G = 0;
      this.Second_Houses15_16_G = 0;
      this.Second_Houses16_17_G = 0;
      this.Second_Houses17_18_G = 0;
      this.Second_Houses18_19_G = 0;
      //        this.Second_Houses19_20 =0;

      this.Third_Houses14_15_G = 0;
      this.Third_Houses15_16_G = 0;
      this.Third_Houses16_17_G = 0;
      this.Third_Houses17_18_G = 0;
      this.Third_Houses18_19_G = 0;
      //      this.Third_Houses19_20 =0;
      this.Third_Houses20_21_G = 0;
    }
  }
  BindPMayData(stateCode, DisttCode, cityCode, Comp, Fin_Year) {
    if (Fin_Year == 0) {
      this.service.sp_create_PMAY_DATACons(stateCode, DisttCode, cityCode, Comp).subscribe(result => { // new code
        ///first row data
        this.Fin_Year14_15_G = result[0].FinYear;
        this.Housesinvolved14_15_G = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
        this.Houses_Complete14_15_G = result[0].Houses_Completed;

        this.HousesOccupied14_15_G = result[0].HousesOccupied;
        this.First_Houses14_15_G = result[0].First_Houses;
        this.Second_Houses14_15_G = result[0].Second_Houses;
        this.Third_Houses14_15_G = result[0].Third_Houses;


        //second row data
        this.Fin_Year15_16_G = result[1].FinYear;
        this.Housesinvolved15_16_G = result[1].Housesinvolved;
        this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
        this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
        this.Houses_Complete15_16_G = result[1].Houses_Completed;
        this.HousesOccupied15_16_G = result[1].HousesOccupied;
        this.First_Houses15_16_G = result[1].First_Houses;
        this.Second_Houses15_16_G = result[1].Second_Houses;
        this.Third_Houses15_16_G = result[1].Third_Houses;

        //Third row data
        this.Fin_Year16_17_G = result[2].FinYear;
        this.Housesinvolved16_17_G = result[2].Housesinvolved;
        this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
        this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
        this.Houses_Complete16_17_G = result[2].Houses_Completed;
        this.HousesOccupied16_17_G = result[2].HousesOccupied;

        this.First_Houses16_17_G = result[2].First_Houses;
        this.Second_Houses16_17_G = result[2].Second_Houses;
        this.Third_Houses16_17_G = result[2].Third_Houses;

        //Fourth row data
        this.Fin_Year17_18_G = result[3].FinYear;
        this.Housesinvolved17_18_G = result[3].Housesinvolved;
        this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
        this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
        this.Houses_Complete17_18_G = result[3].Houses_Completed;
        this.HousesOccupied17_18_G = result[3].HousesOccupied;

        this.First_Houses17_18_G = result[3].First_Houses;
        this.Second_Houses17_18_G = result[3].Second_Houses;
        this.Third_Houses17_18_G = result[3].Third_Houses;

        //Fifth row data
        this.Fin_Year18_19_G = result[4].FinYear;
        this.Housesinvolved18_19_G = result[4].Housesinvolved;
        this.FundsDisbursed_in_Houses18_19_G = result[4].FundsDisbursed_in_Houses;
        this.Houses_Grounde18_19_G = result[4].Houses_Grounded;
        this.Houses_Complete18_19_G = result[4].Houses_Completed;
        this.HousesOccupied18_19_G = result[4].HousesOccupied;
        this.First_Houses18_19_G = result[4].First_Houses;
        this.Second_Houses18_19_G = result[4].Second_Houses;
        this.Third_Houses18_19_G = result[4].Third_Houses;

        //Fifth row data
        this.Fin_Year19_20_G = result[5].FinYear;
        this.Housesinvolved19_20_G = result[5].Housesinvolved;
        this.FundsDisbursed_in_Houses19_20_G = result[5].FundsDisbursed_in_Houses;
        this.Houses_Grounde19_20_G = result[5].Houses_Grounded;
        this.Houses_Complete19_20_G = result[5].Houses_Completed;
        this.HousesOccupied19_20_G = result[5].HousesOccupied;
        this.First_Houses19_20_G = result[5].First_Houses;
        this.Second_Houses19_20_G = result[5].Second_Houses;
        this.Third_Houses19_20_G = result[5].Third_Houses;

        this.Test(Fin_Year);


        let chart = new CanvasJS.Chart("chartPMAYU", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          // title: {
          //   text: "Physical Progress(No of Houses) Consolidated (PMAY(U))",
          //   fontSize: "25",
          // },
          backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
          colorSet: "greenShades",
          axisY: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          axisX: {
            labelFontSize: 12,
            labelFontColor: "#000",
          },
          legend: {
            fontSize: 14,
          },
          data: [{

            options: {
              scales: {
                xAxes: [{
                  stacked: true
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            },
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Sanctioned",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: "2014-15", y: this.Housesinvolved14_15_G },
              { label: "2015-16", y: this.Housesinvolved15_16_G },
              { label: "2016-17", y: this.Housesinvolved16_17_G },
              { label: "2017-18", y: this.Housesinvolved17_18_G },
              { label: "2018-19", y: this.Housesinvolved18_19_G },
              { label: "2019-20", y: this.Housesinvolved19_20_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Funded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: "2014-15", y: this.FundsDisbursed_in_Houses14_15_G },
              { label: "2015-16", y: this.FundsDisbursed_in_Houses15_16_G },
              { label: "2016-17", y: this.FundsDisbursed_in_Houses16_17_G },
              { label: "2017-18", y: this.FundsDisbursed_in_Houses17_18_G },
              { label: "2018-19", y: this.FundsDisbursed_in_Houses18_19_G },
              { label: "2019-20", y: this.FundsDisbursed_in_Houses19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Grounded",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: "2014-15", y: this.Houses_Grounde14_15_G },
              { label: "2015-16", y: this.Houses_Grounde15_16_G },
              { label: "2016-17", y: this.Houses_Grounde16_17_G },
              { label: "2017-18", y: this.Houses_Grounde17_18_G },
              { label: "2018-19", y: this.Houses_Grounde18_19_G },
              { label: "2019-20", y: this.Houses_Grounde19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Completed",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: "2014-15", y: this.HousesOccupied14_15_G },
              { label: "2015-16", y: this.HousesOccupied15_16_G },
              { label: "2016-17", y: this.HousesOccupied16_17_G },
              { label: "2017-18", y: this.HousesOccupied17_18_G },
              { label: "2018-19", y: this.HousesOccupied18_19_G },
              { label: "2019-20", y: this.HousesOccupied19_20_G }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Occupied",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: "2014-15", y: this.Houses_Complete14_15_G },
              { label: "2015-16", y: this.Houses_Complete15_16_G },
              { label: "2016-17", y: this.Houses_Complete16_17_G },
              { label: "2017-18", y: this.Houses_Complete17_18_G },
              { label: "2018-19", y: this.Houses_Complete18_19_G },
              { label: "2019-20", y: this.Houses_Complete19_20_G }
            ]
          },


          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "2nd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: "2014-15", y: this.Second_Houses14_15_G },
              { label: "2015-16", y: this.Second_Houses15_16_G },
              { label: "2016-17", y: this.Second_Houses16_17_G },
              { label: "2017-18", y: this.Second_Houses17_18_G },
              { label: "2018-19", y: this.Second_Houses18_19_G },
              { label: "2019-20", y: this.Second_Houses19_20_G }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
            indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "3rd Inst",
            stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: "2014-15", y: this.Third_Houses14_15_G },
              { label: "2015-16", y: this.Third_Houses15_16_G },
              { label: "2016-17", y: this.Third_Houses16_17_G },
              { label: "2017-18", y: this.Third_Houses17_18_G },
              { label: "2018-19", y: this.Third_Houses18_19_G },
              { label: "2019-20", y: this.Third_Houses19_20_G }
            ]
          },
          ],
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
      });
    }
    else
      if (Fin_Year !== 0) {
        alert(Fin_Year);
        this.service.sp_create_PMAY_DATACons(stateCode, DisttCode, cityCode, Comp).subscribe(result => { // new code
          this.Fin_Year14_15_G = result[0].FinYear;
          this.Housesinvolved14_15_G = result[0].Housesinvolved;
          this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
          this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
          this.Houses_Complete14_15_G = result[0].Houses_Completed;
          this.HousesOccupied14_15_G = result[0].HousesOccupied;
          this.First_Houses14_15_G = result[0].First_Houses;
          this.Second_Houses14_15_G = result[0].Second_Houses;
          this.Third_Houses14_15_G = result[0].Third_Houses;

          if (Fin_Year = "2014-15") {
            this.a_G = this.Fin_Year14_15_G;
            this.b_G = this.Housesinvolved14_15_G;
            this.c_G = this.FundsDisbursed_in_Houses14_15_G;
            this.d_G = this.Houses_Grounde14_15_G;
            this.e_G = this.Houses_Complete14_15_G;
            this.f_G = this.HousesOccupied14_15_G;
            this.g_G = this.First_Houses14_15_G;
            this.h_G = this.Second_Houses14_15_G;

            this.i_G = this.Third_Houses14_15_G;
          }

          let chart = new CanvasJS.Chart("chartPMAYU", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Data Consolidated (PMAYU)",
              fontSize: "25",
            },
            backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
            colorSet: "greenShades",

            data: [{

              options: {
                scales: {
                  xAxes: [{
                    stacked: true
                  }],
                  yAxes: [{
                    stacked: true
                  }]
                }
              },
              type: "column",
              dockInsidePlotArea: true,
              indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Housesinvolved Financial Year 20" + "14-15",
              stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                // { x: "14-15", y: this.Fin_Year15_16 },
                { label: "Housesinvolved14_15", y: this.b_G },
                { label: "FundsDisbursed_in_Houses14_15", y: this.c_G },
                { label: "Houses_Grounde14_15", y: this.d_G },
                { label: "Houses_Complete14_15", y: this.e_G },
                { label: "HousesOccupied14_15", y: this.f_G },
                { label: "First_Houses14_15", y: this.g_G },
                { label: "Third_Houses14_15", y: this.h_G },
                { label: "Third_Houses15_16", y: this.i_G }
              ]
            }
            ],
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

        });
      }
  }



  BindISSRData(stateCode, DisttCode, cityCode, Comp, Fin_Year) {
    // alert();
    this.service.sp_create_ISSR_DATA(stateCode, DisttCode, cityCode, Comp).subscribe(result => { // new code
      ///first row data
      this.Fin_Year14_15_G = result[0].FinYear;
      this.Housesinvolved14_15_G = result[0].Housesinvolved;
      this.FundsDisbursed_in_Houses14_15_G = result[0].FundsDisbursed_in_Houses;
      this.Houses_Grounde14_15_G = result[0].Houses_Grounded;
      this.Houses_Complete14_15_G = result[0].Houses_Completed;

      this.HousesOccupied14_15_G = result[0].HousesOccupied;
      this.First_Houses14_15_G = result[0].First_Houses;
      this.Second_Houses14_15_G = result[0].Second_Houses;
      this.Third_Houses14_15_G = result[0].Third_Houses;

      //second row data
      this.Fin_Year15_16_G = result[1].FinYear;
      this.Housesinvolved15_16_G = result[1].Housesinvolved;
      this.FundsDisbursed_in_Houses15_16_G = result[1].FundsDisbursed_in_Houses;
      this.Houses_Grounde15_16_G = result[1].Houses_Grounded;
      this.Houses_Complete15_16_G = result[1].Houses_Completed;
      this.HousesOccupied15_16_G = result[1].HousesOccupied;
      this.First_Houses15_16_G = result[1].First_Houses;
      this.Second_Houses15_16_G = result[1].Second_Houses;
      this.Third_Houses15_16_G = result[1].Third_Houses;

      //Third row data
      this.Fin_Year16_17_G = result[2].FinYear;
      this.Housesinvolved16_17_G = result[2].Housesinvolved;
      this.FundsDisbursed_in_Houses16_17_G = result[2].FundsDisbursed_in_Houses;
      this.Houses_Grounde16_17_G = result[2].Houses_Grounded;
      this.Houses_Complete16_17_G = result[2].Houses_Completed;
      this.HousesOccupied16_17_G = result[2].HousesOccupied;

      this.First_Houses16_17_G = result[2].First_Houses;
      this.Second_Houses16_17_G = result[2].Second_Houses;
      this.Third_Houses16_17_G = result[2].Third_Houses;

      //Fourth row data
      this.Fin_Year17_18_G = result[3].FinYear;
      this.Housesinvolved17_18_G = result[3].Housesinvolved;
      this.FundsDisbursed_in_Houses17_18_G = result[3].FundsDisbursed_in_Houses;
      this.Houses_Grounde17_18_G = result[3].Houses_Grounded;
      this.Houses_Complete17_18_G = result[3].Houses_Completed;
      this.HousesOccupied17_18_G = result[3].HousesOccupied;

      this.First_Houses17_18_G = result[3].First_Houses;
      this.Second_Houses17_18_G = result[3].Second_Houses;
      this.Third_Houses17_18_G = result[3].Third_Houses;

      //Fifth row data
      this.Fin_Year18_19_G = result[4].FinYear;
      this.Housesinvolved18_19_G = result[4].Housesinvolved;
      this.FundsDisbursed_in_Houses18_19_G = result[4].FundsDisbursed_in_Houses;
      this.Houses_Grounde18_19_G = result[4].Houses_Grounded;
      this.Houses_Complete18_19_G = result[4].Houses_Completed;
      this.HousesOccupied18_19_G = result[4].HousesOccupied;
      this.First_Houses18_19_G = result[4].First_Houses;
      this.Second_Houses18_19_G = result[4].Second_Houses;
      this.Third_Houses18_19_G = result[4].Third_Houses;

      //Fifth row data
      this.Fin_Year19_20_G = result[5].FinYear;
      this.Housesinvolved19_20_G = result[5].Housesinvolved;
      this.FundsDisbursed_in_Houses19_20_G = result[5].FundsDisbursed_in_Houses;
      this.Houses_Grounde19_20_G = result[5].Houses_Grounded;
      this.Houses_Complete19_20_G = result[5].Houses_Completed;
      this.HousesOccupied19_20_G = result[5].HousesOccupied;
      this.First_Houses19_20_G = result[5].First_Houses;
      this.Second_Houses19_20_G = result[5].Second_Houses;
      this.Third_Houses19_20_G = result[5].Third_Houses;

      this.Test(Fin_Year);


      let chart = new CanvasJS.Chart("chartISSR", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: false,
        // title: {
        //   text: "Physical Progress (Nos) for  ISSR under PMAY(U)",
        //   fontSize: "25",
        // },
        axisY: {
          labelFontSize: 12,
          labelFontColor: "#000",
        },
        axisX: {
          labelFontSize: 12,
          labelFontColor: "#000",
        },
        legend: {
          fontSize: 14,
        },
        backgroundColor: this.backgroundColor_G,//"#B3E5FC",  commented
        colorSet: "greenShades",

        data: [{

          options: {
            scales: {
              xAxes: [{
                stacked: true
              }],
              yAxes: [{
                stacked: true
              }]
            }
          },


          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "Sanctioned",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            // { x: "14-15", y: this.Fin_Year15_16 },
            { label: "2014-15", y: this.Housesinvolved14_15_G },
            { label: "2015-16", y: this.Housesinvolved15_16_G },
            { label: "2016-17", y: this.Housesinvolved16_17_G },
            { label: "2017-18", y: this.Housesinvolved17_18_G },
            { label: "2018-19", y: this.Housesinvolved18_19_G },
            { label: "2019-20", y: this.Housesinvolved19_20_G }
          ]
        },
        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "Funded",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.FundsDisbursed_in_Houses14_15_G },
            { label: "2015-16", y: this.FundsDisbursed_in_Houses15_16_G },
            { label: "2016-17", y: this.FundsDisbursed_in_Houses16_17_G },
            { label: "2017-18", y: this.FundsDisbursed_in_Houses17_18_G },
            { label: "2018-19", y: this.FundsDisbursed_in_Houses18_19_G },
            { label: "2019-20", y: this.FundsDisbursed_in_Houses19_20_G }
          ]
        },

        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "Grounded",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.Houses_Grounde14_15_G },
            { label: "2015-16", y: this.Houses_Grounde15_16_G },
            { label: "2016-17", y: this.Houses_Grounde16_17_G },
            { label: "2017-18", y: this.Houses_Grounde17_18_G },
            { label: "2018-19", y: this.Houses_Grounde18_19_G },
            { label: "2019-20", y: this.Houses_Grounde19_20_G }
          ]
        },

        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "Completed",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.HousesOccupied14_15_G },
            { label: "2015-16", y: this.HousesOccupied15_16_G },
            { label: "2016-17", y: this.HousesOccupied16_17_G },
            { label: "2017-18", y: this.HousesOccupied17_18_G },
            { label: "2018-19", y: this.HousesOccupied18_19_G },
            { label: "2019-20", y: this.HousesOccupied19_20_G }
          ]
        },
        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "Occupied",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.Houses_Complete14_15_G },
            { label: "2015-16", y: this.Houses_Complete15_16_G },
            { label: "2016-17", y: this.Houses_Complete16_17_G },
            { label: "2017-18", y: this.Houses_Complete17_18_G },
            { label: "2018-19", y: this.Houses_Complete18_19_G },
            { label: "2019-20", y: this.Houses_Complete19_20_G }
          ]
        },

        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "1st Inst",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.First_Houses14_15_G },
            { label: "2015-16", y: this.First_Houses15_16_G },
            { label: "2016-17", y: this.First_Houses16_17_G },
            { label: "2017-18", y: this.First_Houses17_18_G },
            { label: "2018-19", y: this.First_Houses18_19_G },
            { label: "2019-20", y: this.First_Houses19_20_G }
          ]
        },

        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "2nd Inst",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.Second_Houses14_15_G },
            { label: "2015-16", y: this.Second_Houses15_16_G },
            { label: "2016-17", y: this.Second_Houses16_17_G },
            { label: "2017-18", y: this.Second_Houses17_18_G },
            { label: "2018-19", y: this.Second_Houses18_19_G },
            { label: "2019-20", y: this.Second_Houses19_20_G }
          ]
        },

        {
          type: "column",
          dockInsidePlotArea: true,
          indexLabel: "{y}", //HG
          bevelEnabled: true,
          showInLegend: true,
          legendText: "3rd Inst",
          stValue: "Q",
          indexLabelFontSize: 12,
          indexLabelOrientation: "vertical",
          dataPoints: [
            { label: "2014-15", y: this.Third_Houses14_15_G },
            { label: "2015-16", y: this.Third_Houses15_16_G },
            { label: "2016-17", y: this.Third_Houses16_17_G },
            { label: "2017-18", y: this.Third_Houses17_18_G },
            { label: "2018-19", y: this.Third_Houses18_19_G },
            { label: "2019-20", y: this.Third_Houses19_20_G }
          ]
        },


        ],
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
    });
  }


}