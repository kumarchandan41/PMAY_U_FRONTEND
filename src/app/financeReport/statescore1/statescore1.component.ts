import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
//import { BuildingServiceService } from 'src/app/service/building-service.service';
import { GraphService } from 'src/app/financeReport/service/graph.service';

import { States, District, City, Charts, CompMaster, StateScore } from 'src/app/financeReport/model/chart';
//import { Observable } from 'rxjs';
//import { States, StateScore } from '../model/charts.model';


//import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';
import { Observable, never } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { lstatSync } from 'fs';
import { Alert } from 'selenium-webdriver';
import { DatePipe } from '@angular/common';
import * as jspdf from 'jspdf';

import * as $ from 'jspdf';
import html2canvas from 'html2canvas';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { content } from 'html2canvas/dist/types/css/property-descriptors/content';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { ExportAsConfig, SupportedExtensions, ExportAsService } from 'ngx-export-as';


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
    return number > 0 ? localString1(number, code[currency]) : number < 0 ? `(${localString1(Math.abs(number), code[currency])})` : `--`
  } else {
    return '0'
  }
}



@Component({
  selector: 'app-statescore1',
  templateUrl: './statescore1.component.html',
  styleUrls: ['./statescore1.component.css'],
  providers: [DatePipe]
})



// this is final programme for state score .
export class Statescore1Component implements OnInit {
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

  //Display
  NoPApprovedJN: number;
  NoPApprovedRAY: number;
  NoPApprovedCLSS: number;
  HOcc_JN: number;
  HOcc_RAY: number;
  HOcc_CLSS: number;
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
  ProjCostRay: number;
  CentralShareRay: number;
  CARay: number;
  CSRay: number;
  HSRay: number;
  HGRay: number;
  HCRay: number;
  HORay: number;
  NoOfprojISSR: number;
  ProjCostISSR: number;
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
  ProjCostBLCS: number;
  CSBLCS: number;
  CABLCS: number;
  HSBLCS: number;
  HGBLCS: number;
  HCBLCS: number;
  HOBLCS: number;
  proj_Total: number;
  HSCLSS: number;
  HS_Total: number;
  HG_Total: number;
  HC_Total: number;
  HO_Total: number;
  CLSSLoanAmt: number;
  SubsidyAmtCr: number;
  NoofBene: number;
  NoOfprojRay1: string;
  States_UT: string;
  JN_Houses_vacant: number;
  Reforms_Achievement: number;
  Beneficiary_Attachment: number;
  MIS_Annexure_uploading: number;
  Relelase_vs_Sanction: number;
  BLC_Houses_Geotagged: number;
  Completion_vs_Sanction: number;
  Grounding_Sanction: number;
  Sanction_vs_Demand: number;
  Codes: string;
  StateId?: number = 0;
  Population_Census_2011: number;
  TG_12_Housing_Shortage: number;
  Aadhar_Coverage: number;
  Cities_included_in_Mission: number;
  Total_Demand_as_per_Road_map: number;
  Demand_met: number;
  Demand_met1: any;

  Per_Demand_met: number = 0;
  Total_PMAY_U_Houses_ISSR_AHP_BLC_CLSS: number;
  Total_PMAY_U_Houses_ISSR_AHP_BLC_CLSS1: any;

  Valid_Aadhar_Beneficiaries: string;
  Valid_Aadhar_Beneficiaries1: string;

  Bene_Percentage: number;
  HFAPoA_funds_Released: any;
  HFAPoA_Received: any;
  HFAPoA_Status: string;
  Valid_Aadhar_Bene: number;
  Bene_Percent: number;
  ISSR_NOP: number;
  AHP_NOP: number;
  BLC_NOP: number;
  ISSR_Sanct_for_Release: any;
  //AHP_Sanct_for_Release: number;
  AHP_Sanct_for_Release1: any;
  AHP_Sanct_for_Release: any;

  BLC_Sanct_for_Release: number;
  BLC_Sanct_for_Release1: any;

  ISSR_Balance_for_Release: any;
  AHP_Balance_for_Release: any;
  AHP_Balance_for_Release1: any;
  BLC_Balance_for_Release: any;
  BLC_Balance_for_Release1: any;

  ISSR_Houses_Sanctioned: any;
  AHP_Houses_Sanctioned: any;
  AHP_Houses_Sanctioned1: any;

  BLC_Houses_Sanctioned: number;
  BLC_Houses_Sanctioned1: any;

  ISSR_Grounded: any;
  AHP_Grounded: any;
  AHP_Grounded1: any;

  BLC_Grounded: number;
  BLC_Grounded1: any;
  ISSR_Completed: any;
  AHP_Completed: any;
  AHP_Completed1: any;

  BLC_Completed: number;
  BLC_Completed1: any;
  PMAY_Funds_Released: number;
  PMAY_Funds_Released1: any;

  PMAY_Ucs_Received: any;
  PMAY_Ucs_Received1: any;
  PMAY_UC_Pending: any;
  PMAY_Houses_Occupied: number;
  PMAY_Houses_Occupied1: any;

  Reforms_Achieved: number;
  CLSS_MIS_Survey: number;
  CLSS_MIS_Survey1: any;

  SLTC_Funds_Released_RsinnCr: number;
  SLTC_Specialists_Approved: number;
  SLTC_Specialists_in_Place: number;
  CLTC_Funds_Released_RsinCr: number;
  CLTC_Funds_Released_RsinCr1: any;

  CLTC_Specialists_Approved: number;
  CLTC_Specialists_in_Place: number;
  Projects_Approved: number;
  Projects_uploaded: number;
  Percent_Projects_uploaded: number;
  BLC_Houses_Approved: number;
  BLC_Houses_Approved1: any;

  BLC_Houses_Grounded: number;
  BLC_Houses_Geo_Tagged: number;

  BLC_Houses_Grounded1: any;
  BLC_Houses_Geo_Tagged1: any;



  CLSS_Subsidy_EWS_LIG_MIG: number;
  CLSS_Subsidy_EWS_LIG_MIG1: any;

  RAY_Houses_Completed: number;
  RAY_Houses_Occupied: any;
  RAY_Houses_In_Progress: any;
  RAY_Houses_In_Progress1: any;

  RAY_Houses_Unoccupied: number;
  RAY_Houses_Non_Starter: any;
  RAY_UC_Pending: any;
  RAY_UC_Pending_2: any;

  RAY_Houses_Sanctioned: any;
  RAY_Houses_Sanctioned1: any;
  JN_UC_Pending: number;
  JN_Houses_Non_Starter: number;
  JN_Houses_Non_Starter1: any;

  JN_Houses_Unoccupied: number;
  JN_Houses_Unoccupied1: any;

  JN_Houses_In_Progress: number;
  JN_Houses_In_Progress1: any;

  JN_Houses_Occupied: number;
  JN_Houses_Occupied1: any;

  JN_Houses_Completed: number;
  JN_Houses_Completed1: any;

  JN_Houses_Sanctioned: number;
  JN_Houses_Sanctioned1: any;

  ISSR_CA_Released: any;
  AHP_CA_Released1: any;
  AHP_CA_Released: any;

  BLC_CA_Released: number;
  BLC_CA_Released1: any;

  proj: number;
  Sanct_Release: number;
  TOTAL_Release: number;
  Balance: number;
  Sanct: number;
  Sanct1: any;

  Ground: number;
  Ground1: any;

  complted: number;
  complted1: any;

  CLSS_Beneficiaries_EWS_LIG_MIG: number;
  CLSS_Beneficiaries_EWS_LIG_MIG1: any;

  RowNum: number;
  CSMCDate: string;
  CSMCNo: number;
  Component: string;
  CASanctionedForRel: number;
  CentralAssistanceReleased: number;
  Houses_Completed: number;
  HousesOccupied: number;
  Balance1: Number;
  stateScore: StateScore[];
  Balance2: any;
  Balance3: any;

  Sanction_vs_Demand1: any;
  StateText: string;
  PMAY_UC_Pending1: any;
  TG_12_Housing_Shortage1: any;
  Reforms_Achieved1: any;
  JN_Houses_vacant1: any;
  SLTC_Funds_Released_RsinnCr1: any;
  RAY_Houses_Unoccupied1: any;
  RAY_Houses_Completed1: any;
  RAY_Houses_Occupied1: any;
  LastStateCore: StateScore[];
  CASanctionedForRel2: any;
  CentralAssistanceReleased2: any;
  Houses_Completed2: any;
  HousesOccupied2: any;
  Houses_Grounded2: number;
  projects: number = 0;
  CASanctionedForRel_2: number;
  lastPopResult: StateScore[];
  CASanctioned2: number;
  CASanctionedRel: number;
  CASanctionedRe2: number;
  Housesinvolved2: number;
  CmsNo: string;
  Total_Demand_as_per_Road_map1: string;
  stateDetails: States[];
  nytotal: any;
  CASanctionedForRel_21: string;
  HousesOccupied21: string;
  Houses_Completed21: string;
  Houses_Grounded21: string;
  Housesinvolved21: string;
  Housesinvolved24: string;
  Total_CA_Committed: number;
  Total_CA_Committed1: any;
  ISSR_CA_Committed: any;
  AHP_CA_Committed: any;
  BLC_CA_Committed: any;
  CASanctioned_ForRel: any;
  DisplayDate: string;
  displayPop = "none";
  filteredDataAfterDate: any[];


  config: ExportAsConfig = {
    type: 'pdf',
    elementId: 'mytable',
    options: {
      jsPDF: {
        orientation: 'landscape',
        format: 'letter',
        top: '-200'

      }


    }
  };


  constructor(private exportAsService: ExportAsService, private router: Router, private route: ActivatedRoute, config: NgbModalConfig, private datePipe: DatePipe,
    public activeModal: NgbActiveModal, public service: GraphService,
    private modalService: NgbModal) {
    this.stValue = "0";
    this.distValue = "0";
    this.cityValue = "0";
    this.StateMessage = "Select State";
    this.DistrictMessage = "Select District";
    this.CityMessage = "Select City";
    config.backdrop = 'static';
    config.keyboard = false;




    this.service.ServiceStateScore(this.stateCodes).subscribe(result => {
      // this.StateId=result.st.StateId;

    });

    this.service.GetCSMCStateWiseReport(this.stateCodes).subscribe(result1 => {
      // this.StateId=result.st.StateId;

    });


  }

  pdfCallbackFn(pdf: any) {
    // example to add page number as footer to every page of pdf
    const noOfPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= noOfPages; i++) {
      pdf.setPage(i);
      pdf.text('Page ' + i + ' of ' + noOfPages, pdf.internal.pageSize.getWidth() - 100, pdf.internal.pageSize.getHeight() - 30);
    }
  }

  exportAs(type: SupportedExtensions, opt?: string) {
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;
    }
    this.exportAsService.save(this.config, 'myFile').subscribe(() => {
      // save started
    });
  }

  AdminPage() {
    // this.router.navigate(['localhost/hfaappl/menupage']);
    this.router.navigate(['/dashboard']);
  }


  ngOnInit() {
    this.stateCodes = "0";
    this.districtCodes = "0";
    this.cityCodes = "0";
    this.service.StateListDetails().subscribe(result => {
      this.stateDetails = result;

      this.route.params.subscribe(params => {
        const id = params['ID'];
        var v = this.stateDetails.find(a => a.Codes == id).States_UT;
        this.StateText = v;
        this.StateMessage = v;
        this.getStateData(id);

      });
    });

    return;

    // this.service.DisttList(this.stateCodes);
    // this.service.CityList(this.districtCodes);
    // this.States_UT = "Delhi";
    this.StateText = "Select State";

    this.service.ServiceStateScore(this.stateCodes).subscribe(result => {
      //  alert(result.StateId);
      //  alert(result.StateId);

      if (result == null) {
        this.StateId = 0;
      }
      else {
        this.StateId = result.StateId;
      }

      this.Codes = result.Codes;
      // this.Sanction_vs_Demand1 = result.Sanction_vs_Demand.toFixed(2);
      this.Sanction_vs_Demand1 = (result.Sanction_vs_Demand) ? result.Sanction_vs_Demand.toFixed(2) : result.Sanction_vs_Demand;


      this.Grounding_Sanction = result.Grounding_Sanction;
      this.Completion_vs_Sanction = result.Completion_vs_Sanction;
      this.BLC_Houses_Geotagged = result.BLC_Houses_Geotagged;
      this.Relelase_vs_Sanction = result.Relelase_vs_Sanction;
      this.MIS_Annexure_uploading = result.MIS_Annexure_uploading;
      this.Beneficiary_Attachment = result.Beneficiary_Attachment;
      this.Reforms_Achievement = result.Reforms_Achievement;

      if (result.JN_Houses_vacant == 0)
        this.JN_Houses_vacant1 = "Nil";
      if (result.JN_Houses_vacant != 0)
        this.JN_Houses_vacant1 = result.JN_Houses_vacant;


      this.Population_Census_2011 = result.Population_Census_2011;
      this.TG_12_Housing_Shortage = result.TG_12_Housing_Shortage;
      this.Aadhar_Coverage = result.Aadhar_Coverage;
      this.Cities_included_in_Mission = result.Cities_included_in_Mission;
      this.Total_Demand_as_per_Road_map = result.Total_Demand_as_per_Road_map;
      this.Demand_met = result.Demand_met;
      this.Per_Demand_met = result.Per_Demand_met;
      this.Total_PMAY_U_Houses_ISSR_AHP_BLC_CLSS = result.Total_PMAY_U_Houses_ISSR_AHP_BLC_CLSS
      this.Valid_Aadhar_Beneficiaries = result.Valid_Aadhar_Beneficiaries
      this.Bene_Percent = result.Bene_Percentage * 100;
      //      this.HFAPoA_funds_Released = result.HFAPoA_funds_Released.toFixed(2)

      this.HFAPoA_funds_Released = (result.HFAPoA_funds_Released) ? result.HFAPoA_funds_Released.toFixed(2) : result.HFAPoA_funds_Released;

      this.HFAPoA_Received = result.HFAPoA_Received
      if (this.HFAPoA_Received == 0)
        this.HFAPoA_Received = "Nil";

      this.HFAPoA_Status = result.HFAPoA_Status
      //  alert(this.HFAPoA_Status);

      if (this.HFAPoA_Status == "" || this.HFAPoA_Status == null)
        this.HFAPoA_Status = "-";

      this.ISSR_NOP = result.ISSR_NOP;
      this.AHP_NOP = result.AHP_NOP;
      this.BLC_NOP = result.BLC_NOP;
      this.ISSR_Sanct_for_Release = result.ISSR_Sanct_for_Release;
      this.AHP_Sanct_for_Release = result.AHP_Sanct_for_Release;
      this.BLC_Sanct_for_Release = result.BLC_Sanct_for_Release;

      this.ISSR_Balance_for_Release = result.ISSR_Balance_for_Release;

      this.AHP_Balance_for_Release = result.AHP_Balance_for_Release;
      this.BLC_Balance_for_Release = result.BLC_Balance_for_Release;



      this.ISSR_Houses_Sanctioned = result.ISSR_Houses_Sanctioned;
      this.AHP_Houses_Sanctioned = result.AHP_Houses_Sanctioned;

      this.BLC_Houses_Sanctioned = result.BLC_Houses_Sanctioned;
      this.ISSR_Grounded = result.ISSR_Grounded;
      this.AHP_Grounded = result.AHP_Grounded;
      this.BLC_Grounded = result.BLC_Grounded;
      this.ISSR_Completed = result.ISSR_Completed;

      this.AHP_Completed = result.AHP_Completed;
      this.BLC_Completed = result.BLC_Completed;
      this.PMAY_Funds_Released = result.PMAY_Funds_Released;
      this.PMAY_Ucs_Received = result.PMAY_Ucs_Received;
      this.PMAY_UC_Pending = result.PMAY_UC_Pending;
      if (this.PMAY_UC_Pending == 0)
        this.PMAY_UC_Pending1 = "Nil";
      else if (this.PMAY_UC_Pending != 0)
        this.PMAY_UC_Pending1 = this.PMAY_UC_Pending;
      // alert(this.PMAY_UC_Pending);

      this.PMAY_Houses_Occupied = result.PMAY_Houses_Occupied;
      // this.Reforms_Achieved = result.Reforms_Achieved;
      if (this.Reforms_Achieved == 0)
        this.Reforms_Achieved1 = "Nil";
      else if (this.PMAY_UC_Pending != 0)
        this.Reforms_Achieved1 = this.Reforms_Achieved;


      this.CLSS_MIS_Survey = result.CLSS_MIS_Survey;

      this.SLTC_Funds_Released_RsinnCr = result.SLTC_Funds_Released_RsinnCr;
      this.SLTC_Specialists_Approved = result.SLTC_Specialists_Approved;
      this.SLTC_Specialists_in_Place = result.SLTC_Specialists_in_Place;

      this.CLTC_Funds_Released_RsinCr = result.CLTC_Funds_Released_RsinCr;
      this.CLTC_Specialists_Approved = result.CLTC_Specialists_Approved;
      this.CLTC_Specialists_in_Place = result.CLTC_Specialists_in_Place;

      this.Projects_Approved = result.Projects_Approved;
      this.Projects_uploaded = result.Projects_uploaded;
      this.Percent_Projects_uploaded = result.Percent_Projects_uploaded;

      this.BLC_Houses_Approved = result.BLC_Houses_Approved;
      this.BLC_Houses_Grounded = result.BLC_Houses_Grounded;
      this.BLC_Houses_Geo_Tagged = result.BLC_Houses_Geo_Tagged;
      this.CLSS_Subsidy_EWS_LIG_MIG = result.CLSS_Subsidy_EWS_LIG_MIG;

      this.JN_Houses_Sanctioned = result.JN_Houses_Sanctioned;
      this.JN_Houses_Completed = result.JN_Houses_Completed;
      this.Houses_Grounded = result.Houses_Grounded;



      this.JN_Houses_Occupied = result.JN_Houses_Occupied;
      this.JN_Houses_In_Progress = result.JN_Houses_In_Progress;

      this.JN_Houses_Unoccupied = result.JN_Houses_Unoccupied;
      this.JN_Houses_Non_Starter = result.JN_Houses_Non_Starter;
      this.JN_UC_Pending = result.JN_UC_Pending;
      this.RAY_Houses_Sanctioned = result.RAY_Houses_Sanctioned;



      // this.RAY_Houses_Completed = result.RAY_Houses_Completed;
      if (result.RAY_Houses_Completed == 0)
        this.RAY_Houses_Completed1 = "Nil";
      if (result.RAY_Houses_Completed != 0)
        this.RAY_Houses_Completed1 = result.RAY_Houses_Completed;

      // alert(result.RAY_Houses_Occupied);
      //  if (result.RAY_Houses_Occupied == 0 || result.RAY_Houses_Occupied.toString() == "" || result.RAY_Houses_Occupied.toString() == null)
      //    this.RAY_Houses_Occupied1 = "Nil";
      //  else if (result.RAY_Houses_Occupied != 0)
      //    this.RAY_Houses_Occupied1 = result.RAY_Houses_Occupied;
      this.RAY_Houses_Occupied = (result.RAY_Houses_Occupied) ? result.RAY_Houses_Occupied.toFixed(2) : result.RAY_Houses_Occupied;

      this.RAY_Houses_In_Progress = result.RAY_Houses_In_Progress;

      if (result.RAY_Houses_Unoccupied == 0)
        this.RAY_Houses_Unoccupied1 = "Nil";
      if (result.RAY_Houses_Unoccupied != 0)
        this.RAY_Houses_Unoccupied1 = result.RAY_Houses_Unoccupied;


      // this.RAY_Houses_Unoccupied = result.RAY_Houses_Unoccupied;

      this.RAY_Houses_Non_Starter = result.RAY_Houses_Non_Starter;
      this.RAY_UC_Pending = result.RAY_UC_Pending;

      this.CLSS_Beneficiaries_EWS_LIG_MIG = result.CLSS_Beneficiaries_EWS_LIG_MIG;

      // alert( this.PMAY_UC_Pending);
      // alert(result.Valid_Aadhar_Beneficiaries );
    });

    this.service.GetCSMCStateWiseReport(this.stateCodes).subscribe(result1 => {
      this.stateScore = result1;
      //  this.RowNum = result1.RowNum;
      //    this.CSMCDate = result1.CSMCDate;
      //    this.CSMCNo = result1.CSMCNo;
      //    this.Component = result1.Component;
      //    this.CASanctionedForRel = result1.CASanctionedForRel;
      //   this.CentralAssistanceReleased = result1.CentralAssistanceReleased;
      //    this.Balance1 = result1.Balance;
      //    this.Houses_Grounded = result1.Houses_Grounded;
      //    this.Houses_Completed = result1.Houses_Completed;
      //    this.HousesOccupied = result1.HousesOccupied;

    });
  }

  getStateDetails(event) {
    const stateCodes = event.target.value;
    this.StateText = event.target.options[event.target.selectedIndex].text;
    //ServiceStateScore
    if (stateCodes == "0") {
      this.distValue = "0";
      this.DistrictMessage = "Select District";
      // this.service.DisttDetails=[]; 
      this.cityValue = "0";
      this.CityMessage = "Select City";
      //   this.service.CityDetails=[]; 
    }
    else {

      this.getStateData(stateCodes);

    }
  }

  getStateData(stateCodes) {

    //ServiceStateScore
    if (stateCodes == "0") {
      this.distValue = "0";
      this.DistrictMessage = "Select District";
      // this.service.DisttDetails=[]; 
      this.cityValue = "0";
      this.CityMessage = "Select City";
      //   this.service.CityDetails=[]; 
    }
    else {

      this.stateCodes = stateCodes;
      this.service.ServiceStateScore(stateCodes).subscribe(result => {


        this.Codes = result.Codes;
        this.Sanction_vs_Demand1 = indianFormat1(result.Sanction_vs_Demand);//.toFixed(2);
        this.Grounding_Sanction = result.Grounding_Sanction;
        this.Completion_vs_Sanction = result.Completion_vs_Sanction;
        this.BLC_Houses_Geotagged = result.BLC_Houses_Geotagged;
        this.Relelase_vs_Sanction = result.Relelase_vs_Sanction;
        this.MIS_Annexure_uploading = result.MIS_Annexure_uploading;
        this.Beneficiary_Attachment = result.Beneficiary_Attachment;
        this.Reforms_Achievement = result.Reforms_Achievement;


        if (result.JN_Houses_vacant == 0)
          this.JN_Houses_vacant1 = "Nil";
        if (result.JN_Houses_vacant != 0)
          this.JN_Houses_vacant1 = result.JN_Houses_vacant;

        // this.JN_Houses_vacant=result.JN_Houses_vacant;

        this.Population_Census_2011 = result.Population_Census_2011;
        this.TG_12_Housing_Shortage = result.TG_12_Housing_Shortage;
        this.TG_12_Housing_Shortage1 = (this.TG_12_Housing_Shortage / 100000).toFixed(2);
        //       CASanctionedForRel	CentralAssistanceReleased

        this.Aadhar_Coverage = result.Aadhar_Coverage;
        this.Cities_included_in_Mission = result.Cities_included_in_Mission;


        this.Total_Demand_as_per_Road_map = result.Total_Demand_as_per_Road_map;
        //this.Total_Demand_as_per_Road_map1 = (result.Total_Demand_as_per_Road_map);


        this.Demand_met = result.Demand_met;
        //  this.Demand_met1 = indianFormat(result.Demand_met);


        this.Per_Demand_met = result.Per_Demand_met;
        this.Total_PMAY_U_Houses_ISSR_AHP_BLC_CLSS = (result.Total_PMAY_U_Houses_ISSR_AHP_BLC_CLSS);
        this.Total_PMAY_U_Houses_ISSR_AHP_BLC_CLSS1 = indianFormat(result.Total_PMAY_U_Houses_ISSR_AHP_BLC_CLSS);


        this.Valid_Aadhar_Beneficiaries = result.Valid_Aadhar_Beneficiaries;
        this.Valid_Aadhar_Beneficiaries1 = indianFormat(result.Valid_Aadhar_Beneficiaries);
        this.Valid_Aadhar_Beneficiaries1 = indianFormat(result.Valid_Aadhar_Beneficiaries) ? result.Valid_Aadhar_Beneficiaries : result.Valid_Aadhar_Beneficiaries;


        this.Bene_Percent = result.Bene_Percentage * 100;
        this.HFAPoA_funds_Released = result.HFAPoA_funds_Released.toFixed(2);

        this.HFAPoA_Received = result.HFAPoA_Received;
        if (this.HFAPoA_Received == 0)
          this.HFAPoA_Received = "Nil";

        this.HFAPoA_Status = result.HFAPoA_Status;
        // alert(this.HFAPoA_Status);
        if (this.HFAPoA_Status == "" || this.HFAPoA_Status == null)
          this.HFAPoA_Status = "Nil";


        if (result.ISSR_Balance_for_Release == 0) {
          this.ISSR_Balance_for_Release = "--";
        }
        else {
          this.ISSR_Balance_for_Release = result.ISSR_Balance_for_Release;
        }

        if (result.AHP_Balance_for_Release == 0) {
          this.AHP_Balance_for_Release = "--";
          this.AHP_Balance_for_Release1 = "--";
        }
        else {
          this.AHP_Balance_for_Release = result.AHP_Balance_for_Release;
          this.AHP_Balance_for_Release1 = indianFormat1(result.AHP_Balance_for_Release);
        }

        if (result.BLC_Balance_for_Release == 0) {
          this.BLC_Balance_for_Release = "--";
          this.BLC_Balance_for_Release1 = "--";
        }
        else {
          this.BLC_Balance_for_Release = (result.BLC_Balance_for_Release);
          this.BLC_Balance_for_Release1 = indianFormat1(result.BLC_Balance_for_Release);
        }



        if (result.ISSR_CA_Released == 0) {
          this.ISSR_CA_Released = "--";
        }
        else {
          this.ISSR_CA_Released = result.ISSR_CA_Released;
        }
        if (result.AHP_CA_Released == 0) {
          this.AHP_CA_Released = "--";
          this.AHP_CA_Released1 = "--";
        }
        else {
          this.AHP_CA_Released = result.AHP_CA_Released;
          this.AHP_CA_Released1 = indianFormat1(result.AHP_CA_Released);

        }

        this.BLC_CA_Released1 = indianFormat1(result.BLC_CA_Released);
        this.BLC_CA_Released = result.BLC_CA_Released;


        if (result.ISSR_Houses_Sanctioned == 0) {
          this.ISSR_Houses_Sanctioned = "--";
        }
        else {
          this.ISSR_Houses_Sanctioned = result.ISSR_Houses_Sanctioned;
        }

        this.AHP_Houses_Sanctioned = result.AHP_Houses_Sanctioned;

        this.AHP_Houses_Sanctioned1 = indianFormat(result.AHP_Houses_Sanctioned);


        this.Reforms_Achieved = result.Reforms_Achieved;
        this.CLSS_MIS_Survey = result.CLSS_MIS_Survey;
        this.CLSS_MIS_Survey1 = indianFormat(result.CLSS_MIS_Survey);

        this.BLC_Houses_Sanctioned = result.BLC_Houses_Sanctioned;
        this.BLC_Houses_Sanctioned1 = indianFormat(result.BLC_Houses_Sanctioned);

        if (result.ISSR_Grounded == 0) {
          this.ISSR_Grounded = "--";
        }
        else {
          this.ISSR_Grounded = result.ISSR_Grounded;
        }
        this.AHP_Grounded = result.AHP_Grounded;
        this.AHP_Grounded1 = indianFormat(result.AHP_Grounded);

        this.BLC_Grounded = result.BLC_Grounded;
        this.BLC_Grounded1 = indianFormat(result.BLC_Grounded);

        if (result.ISSR_Completed == 0) {
          this.ISSR_Completed = "--";

        }
        else {
          this.ISSR_Completed = result.ISSR_Completed;
        }

        this.AHP_Completed = result.AHP_Completed;
        this.AHP_Completed1 = indianFormat(result.AHP_Completed);

        this.BLC_Completed = result.BLC_Completed;
        this.BLC_Completed1 = indianFormat(result.BLC_Completed);

        this.ISSR_NOP = result.ISSR_NOP;
        this.AHP_NOP = result.AHP_NOP;
        this.BLC_NOP = result.BLC_NOP;

        if (result.ISSR_Sanct_for_Release == 0) {
          this.ISSR_Sanct_for_Release = "--";
        }
        else {
          this.ISSR_Sanct_for_Release = result.ISSR_Sanct_for_Release;
        }
        if (result.AHP_Sanct_for_Release == 0) {
          this.AHP_Sanct_for_Release1 = "--";
          this.AHP_Sanct_for_Release = "--";
        }
        else {
          this.AHP_Sanct_for_Release = result.AHP_Sanct_for_Release;
          this.AHP_Sanct_for_Release1 = indianFormat1(result.AHP_Sanct_for_Release);
        }

        if (result.BLC_Sanct_for_Release == 0) {
          this.BLC_Sanct_for_Release = 0;
        }
        else {
          this.BLC_Sanct_for_Release1 = indianFormat1(result.BLC_Sanct_for_Release);
          this.BLC_Sanct_for_Release = (result.BLC_Sanct_for_Release);

        }
        if (result.PMAY_Funds_Released == 0) {
          this.PMAY_Funds_Released = 0;
        }
        else {
          this.PMAY_Funds_Released = result.PMAY_Funds_Released;
          this.PMAY_Funds_Released1 = indianFormat1(result.PMAY_Funds_Released);
        }

        if (result.PMAY_Ucs_Received == 0) {
          this.PMAY_Ucs_Received = "--";
          this.PMAY_Ucs_Received1 = "--";
        }
        else {
          this.PMAY_Ucs_Received = result.PMAY_Ucs_Received;
          this.PMAY_Ucs_Received1 = indianFormat1(result.PMAY_Ucs_Received);
        }


        this.PMAY_UC_Pending = result.PMAY_UC_Pending;

        if (this.PMAY_UC_Pending == 0)
          this.PMAY_UC_Pending1 = "Nil";
        else if (this.PMAY_UC_Pending != 0) {
          this.PMAY_UC_Pending = this.PMAY_UC_Pending;
          this.PMAY_UC_Pending1 = indianFormat1(this.PMAY_UC_Pending);
        }

        // alert( this.PMAY_UC_Pending);
        this.PMAY_Houses_Occupied = result.PMAY_Houses_Occupied;
        this.PMAY_Houses_Occupied1 = indianFormat(result.PMAY_Houses_Occupied);

        if (this.Reforms_Achieved == 0)
          this.Reforms_Achieved1 = "Nil";
        else if (this.PMAY_UC_Pending != 0)
          this.Reforms_Achieved1 = this.Reforms_Achieved;


        this.CLSS_MIS_Survey = result.CLSS_MIS_Survey;

        if (result.SLTC_Funds_Released_RsinnCr == 0)
          this.SLTC_Funds_Released_RsinnCr1 = "Nil";
        if (result.SLTC_Funds_Released_RsinnCr != 0)
          this.SLTC_Funds_Released_RsinnCr1 = result.SLTC_Funds_Released_RsinnCr;


        this.SLTC_Specialists_Approved = result.SLTC_Specialists_Approved;
        this.SLTC_Specialists_in_Place = result.SLTC_Specialists_in_Place;

        this.CLTC_Funds_Released_RsinCr = result.CLTC_Funds_Released_RsinCr;
        this.CLTC_Funds_Released_RsinCr1 = indianFormat1(result.CLTC_Funds_Released_RsinCr);


        this.CLTC_Specialists_Approved = result.CLTC_Specialists_Approved;
        this.CLTC_Specialists_in_Place = result.CLTC_Specialists_in_Place;

        this.Projects_Approved = result.Projects_Approved;
        this.Projects_uploaded = result.Projects_uploaded;
        this.Percent_Projects_uploaded = result.Percent_Projects_uploaded;

        this.BLC_Houses_Approved = result.BLC_Houses_Approved;
        this.BLC_Houses_Approved1 = indianFormat(result.BLC_Houses_Approved);

        this.BLC_Houses_Grounded = result.BLC_Houses_Grounded;
        this.BLC_Houses_Grounded1 = indianFormat(result.BLC_Houses_Grounded);


        this.BLC_Houses_Geo_Tagged = result.BLC_Houses_Geo_Tagged;
        this.BLC_Houses_Geo_Tagged1 = indianFormat(result.BLC_Houses_Geo_Tagged);


        this.CLSS_Subsidy_EWS_LIG_MIG = result.CLSS_Subsidy_EWS_LIG_MIG;
        this.CLSS_Subsidy_EWS_LIG_MIG1 = indianFormat1(result.CLSS_Subsidy_EWS_LIG_MIG);


        this.JN_Houses_Sanctioned = result.JN_Houses_Sanctioned;
        this.JN_Houses_Sanctioned1 = indianFormat(result.JN_Houses_Sanctioned);

        this.JN_Houses_Completed = result.JN_Houses_Completed;
        this.JN_Houses_Completed1 = indianFormat(result.JN_Houses_Completed);

        this.JN_Houses_Occupied = result.JN_Houses_Occupied;
        this.JN_Houses_Occupied1 = indianFormat(result.JN_Houses_Occupied);

        this.JN_Houses_In_Progress = result.JN_Houses_In_Progress;
        this.JN_Houses_In_Progress1 = indianFormat(result.JN_Houses_In_Progress);

        this.JN_Houses_Unoccupied = result.JN_Houses_Unoccupied;
        this.JN_Houses_Unoccupied1 = indianFormat(result.JN_Houses_Unoccupied);

        this.JN_Houses_Non_Starter = result.JN_Houses_Non_Starter;
        this.JN_Houses_Non_Starter1 = indianFormat(result.JN_Houses_Non_Starter);


        this.JN_UC_Pending = result.JN_UC_Pending;

        if (result.RAY_Houses_Sanctioned == 0) {
          this.RAY_Houses_Sanctioned = "--";
          this.RAY_Houses_Sanctioned1 = "--";
        }
        else {
          this.RAY_Houses_Sanctioned = result.RAY_Houses_Sanctioned;
          this.RAY_Houses_Sanctioned1 = indianFormat(result.RAY_Houses_Sanctioned);
        }

        if (result.RAY_Houses_Completed == 0)
          this.RAY_Houses_Completed1 = "--";

        if (result.RAY_Houses_Completed != 0)
          this.RAY_Houses_Completed1 = result.RAY_Houses_Completed;


        //this.RAY_Houses_Occupied = result.RAY_Houses_Occupied;
        // alert(result.RAY_Houses_Occupied);
        if (result.RAY_Houses_Occupied == 0 || result.RAY_Houses_Occupied.toString() == "")
          this.RAY_Houses_Occupied1 = "--";
        if (result.RAY_Houses_Occupied != 0)
          this.RAY_Houses_Occupied1 = result.RAY_Houses_Occupied;

        if (result.RAY_Houses_In_Progress == 0) {
          this.RAY_Houses_In_Progress = "--";
        }
        else {
          this.RAY_Houses_In_Progress = result.RAY_Houses_In_Progress;
          this.RAY_Houses_In_Progress1 = indianFormat(result.RAY_Houses_In_Progress);
        }

        if (result.RAY_Houses_Unoccupied == 0)
          this.RAY_Houses_Unoccupied1 = "--";
        if (result.RAY_Houses_Unoccupied != 0)
          this.RAY_Houses_Unoccupied1 = result.RAY_Houses_Unoccupied;


        if (result.RAY_Houses_Non_Starter == 0) {
          this.RAY_Houses_Non_Starter = "--"

        }
        else {
          this.RAY_Houses_Non_Starter = result.RAY_Houses_Non_Starter;
        }
        if (result.RAY_UC_Pending == 0) {
          this.RAY_UC_Pending = "--"
          this.RAY_UC_Pending_2 = 0;
        }
        else {
          this.RAY_UC_Pending = result.RAY_UC_Pending;
        }

        this.proj = this.AHP_NOP + this.ISSR_NOP + this.BLC_NOP;

        this.BLC_CA_Committed = result.BLC_CA_Committed;
        this.AHP_CA_Committed = result.AHP_CA_Committed;
        this.ISSR_CA_Committed = result.ISSR_CA_Committed;

        if (result.ISSR_CA_Committed.toString() != "" && result.AHP_CA_Committed.toString() != "" && result.BLC_CA_Committed.toString() != "") {
          this.Total_CA_Committed = result.ISSR_CA_Committed + result.AHP_CA_Committed + result.BLC_CA_Committed;
        }
        else if (result.ISSR_CA_Committed.toString() != "" && result.AHP_CA_Committed.toString() != "" && result.BLC_CA_Committed.toString() == "") {
          this.Total_CA_Committed = result.ISSR_CA_Committed + result.AHP_CA_Committed;
        }
        else if (result.ISSR_CA_Committed.toString() != "" && result.AHP_CA_Committed.toString() == "" && result.BLC_CA_Committed.toString() != "") {
          this.Total_CA_Committed = result.ISSR_CA_Committed + result.BLC_CA_Committed;
        }
        else if (result.ISSR_CA_Committed.toString() == "" && result.AHP_CA_Committed.toString() != "" && result.BLC_CA_Committed.toString() != "") {
          this.Total_CA_Committed = result.AHP_CA_Committed + result.BLC_CA_Committed;
        }
        else if (result.ISSR_CA_Committed.toString() == "" && result.AHP_CA_Committed.toString() == "" && result.BLC_CA_Committed.toString() != "") {
          this.Total_CA_Committed = result.BLC_CA_Committed;
        }
        else if (result.ISSR_CA_Committed.toString() == "" && result.AHP_CA_Committed.toString() != "" && result.BLC_CA_Committed.toString() == "") {
          this.Total_CA_Committed = result.AHP_CA_Committed;
        }
        this.Total_CA_Committed1 = indianFormat1(this.Total_CA_Committed);
        //this.Total_CA_Committed =result.ISSR_CA_Committed + result.AHP_CA_Committed + result.BLC_CA_Committed;


        if ((this.ISSR_Sanct_for_Release == "--" && this.AHP_Sanct_for_Release != "--")) {
          this.Sanct_Release = this.AHP_Sanct_for_Release + this.BLC_Sanct_for_Release
        }
        else if ((this.ISSR_Sanct_for_Release == "--" && this.AHP_Sanct_for_Release == "--")) {
          this.Sanct_Release = this.BLC_Sanct_for_Release
        }
        else {
          this.Sanct_Release = this.ISSR_Sanct_for_Release + this.AHP_Sanct_for_Release + this.BLC_Sanct_for_Release
        }

        if (this.ISSR_CA_Released == "--" && this.AHP_CA_Released != "--") {
          this.TOTAL_Release = this.AHP_CA_Released + this.BLC_CA_Released;
        }
        else if (this.ISSR_CA_Released == "--" && this.AHP_CA_Released == "--") {
          this.TOTAL_Release = this.BLC_CA_Released;
        }
        else {
          this.TOTAL_Release = this.ISSR_CA_Released + this.AHP_CA_Released + this.BLC_CA_Released;
        }

        if (this.ISSR_Balance_for_Release == "--" && this.AHP_Balance_for_Release != "--") {
          this.Balance3 = indianFormat1(this.AHP_Balance_for_Release + this.BLC_Balance_for_Release);//.toFixed(2);
        }
        else if (this.ISSR_Balance_for_Release == "--" && this.AHP_Balance_for_Release == "--") {
          this.Balance3 = indianFormat1(result.BLC_Balance_for_Release);//.toFixed(2);
        }
        else if (this.ISSR_Balance_for_Release != "--" && this.AHP_Balance_for_Release != "--") {
          this.Balance3 = indianFormat1(this.ISSR_Balance_for_Release + this.AHP_Balance_for_Release + this.BLC_Balance_for_Release);//.toFixed(2);
        }

        if (this.ISSR_Houses_Sanctioned == "--" && this.AHP_Houses_Sanctioned != "--") {
          this.Sanct = this.AHP_Houses_Sanctioned + this.BLC_Houses_Sanctioned;
          this.Sanct1 = indianFormat(this.AHP_Houses_Sanctioned + this.BLC_Houses_Sanctioned);
        }
        else if (this.ISSR_Houses_Sanctioned == "--" && this.AHP_Houses_Sanctioned == "--") {
          this.Sanct = this.BLC_Houses_Sanctioned;
          this.Sanct1 = indianFormat(this.BLC_Houses_Sanctioned);
        }
        else {
          this.Sanct = this.ISSR_Houses_Sanctioned + this.AHP_Houses_Sanctioned + this.BLC_Houses_Sanctioned;
          this.Sanct1 = indianFormat(this.ISSR_Houses_Sanctioned + this.AHP_Houses_Sanctioned + this.BLC_Houses_Sanctioned);
        }


        if (this.ISSR_Grounded == "--" && this.AHP_Grounded != "--") {
          this.Ground = this.AHP_Grounded + this.BLC_Grounded;
          this.Ground1 = indianFormat(this.AHP_Grounded + this.BLC_Grounded);
        }
        else if (this.ISSR_Grounded == "--" && this.AHP_Grounded == "--") {
          this.Ground = this.BLC_Grounded;
          this.Ground1 = indianFormat(this.BLC_Grounded);
        }
        else {
          this.Ground = this.ISSR_Grounded + this.AHP_Grounded + this.BLC_Grounded;
          this.Ground1 = indianFormat(this.ISSR_Grounded + this.AHP_Grounded + this.BLC_Grounded);
        }


        if (this.ISSR_Completed == "--" && this.AHP_Completed != "0") {
          this.complted = this.AHP_Completed + this.BLC_Completed;
          this.complted1 = indianFormat(this.AHP_Completed + this.BLC_Completed);
        }
        else if (this.ISSR_Completed == "--" && this.AHP_Completed == "0") {
          this.complted = this.BLC_Completed;
          this.complted1 = indianFormat(this.BLC_Completed);
        }
        else {
          this.complted = this.ISSR_Completed + this.AHP_Completed + this.BLC_Completed;
          this.complted1 = indianFormat(this.ISSR_Completed + this.AHP_Completed + this.BLC_Completed);
        }

        this.CLSS_Beneficiaries_EWS_LIG_MIG = result.CLSS_Beneficiaries_EWS_LIG_MIG;

        // alert(result.CLSS_Beneficiaries_EWS_LIG_MIG);
        this.CLSS_Beneficiaries_EWS_LIG_MIG1 = indianFormat(result.CLSS_Beneficiaries_EWS_LIG_MIG);


        //   alert(result.BLC_CA_Committed);


      });

      this.service.GetCSMCStateWiseReport(this.stateCodes).subscribe(result1 => {
        this.stateScore = result1;

      });
      this.service.GetCSMCState1Report(this.stateCodes).subscribe(result1 => {
        this.LastStateCore = result1;

      });

      // this.service.GetCSMCState2Report(this.stateCodes).subscribe(result2=>{
      //   //this.LastStateCore=result2;
      //   this.CASanctionedForRel2 =result2.CASanctionedForRel;
      //   this.CentralAssistanceReleased2 =result2.CentralAssistanceReleased;
      //   this.Balance2 =result2.Balance.toString();
      //   this.Houses_Grounded2 =result2.Houses_Grounded;
      //   this.Houses_Completed2 =result2.Houses_Completed;
      //   this.HousesOccupied2 =result2.HousesOccupied;
      //  });

      this.service.GetCSMCState2Report(this.stateCodes).subscribe(result2 => {
        //this.LastStateCore=result2;
        this.CASanctionedForRel_2 = result2.CASanctionedForRel;
        this.CentralAssistanceReleased2 = result2.CentralAssistanceReleased;
        // this.CASanctionedForRel_21 =indianFormat(this.CASanctionedForRel_2);

        this.CentralAssistanceReleased2 = result2.CentralAssistanceReleased;
        this.CASanctionedRe2 = result2.CASanctionedRel;
        this.CASanctioned2 = result2.CASanctionedRel;
        this.Housesinvolved2 = result2.Housesinvolved;

        this.Housesinvolved24 = indianFormat(this.Housesinvolved2);

        this.Housesinvolved21 = indianFormat(this.Housesinvolved2);
        this.Housesinvolved2 = indianFormat(result2.Housesinvolved) ? result2.Housesinvolved : result2.Housesinvolved;


        this.CentralAssistanceReleased2 = result2.CentralAssistanceReleased;
        this.Balance2 = result2.Balance.toString();
        this.nytotal = result2.CentralAssistanceReleased + result2.Balance;
        this.CASanctioned_ForRel = result2.CASanctioned_ForRel;


        //alert(this.nytotal);


        // this.CentralAssistanceReleased2 =Number.parseFloat(this.CentralAssistanceReleased2).toFixed(2);

        //alert(this.CentralAssistanceReleased2);



        this.Balance2 = result2.Balance.toString();

        this.Houses_Grounded2 = result2.Houses_Grounded;
        this.Houses_Grounded21 = indianFormat(this.Houses_Grounded2);
        this.Houses_Grounded2 = indianFormat(result2.Houses_Grounded) ? result2.Houses_Grounded : result2.Houses_Grounded;


        this.Houses_Completed2 = result2.Houses_Completed;
        this.Houses_Completed21 = indianFormat(this.Houses_Completed2);
        this.Houses_Completed2 = indianFormat(result2.Houses_Completed) ? result2.Houses_Completed : result2.Houses_Completed;

        this.HousesOccupied2 = result2.HousesOccupied;
        this.HousesOccupied21 = indianFormat(this.HousesOccupied2);
        this.HousesOccupied2 = indianFormat(result2.HousesOccupied) ? result2.HousesOccupied : result2.HousesOccupied;

        this.projects = result2.projects;
      });
    }
  }

  //PDFHelper
  private addText(pdf: any, text: string, x: number, y: number, alignment?: string, _fontSize?: number) {
    debugger;
    let originalFontSize = pdf.internal.getFontSize();
    if (_fontSize) {
      pdf.setFontSize(_fontSize);
    }
    if (alignment == 'center') {

      // Get current font size
      var fontSize = pdf.internal.getFontSize();

      // Get page width
      var pageWidth = pdf.internal.pageSize.width;

      // Get the actual text's width
      /* You multiply the unit width of your string by your font size and divide
       * by the internal scale factor. The division is necessary
       * for the case where you use units other than 'pt' in the constructor
       * of jsPDF.
      */
      let txtWidth = pdf.getStringUnitWidth(text) * fontSize / pdf.internal.scaleFactor;

      // Calculate text's x coordinate
      let xOffset = (pageWidth - txtWidth) / 2;

      pdf.text(text, xOffset, y);
    }
    else {
      pdf.text(text, x, y);
    }
    pdf.setFontSize(originalFontSize);
    return y + 5;
  }

  private addLine(pdf: any, lineWidth: number, x: number, y: number) {
    pdf.setLineWidth(lineWidth);
    pdf.line(x, y, 200, y);
    return y + 5 + lineWidth;
  }

  private addAutoTable(pdf: any, htmlId: string, y: number, tableWidth: number, headerStyle: any, margin?: any, border?: boolean) {
    let _lineWidth = border != true ? 0.2 : 0;
    debugger;
    let autoTableOut = pdf.autoTable({
      html: htmlId,
      theme: 'plain',
      tableWidth: tableWidth > 0 ? tableWidth : 'auto',
      margin: margin ? margin : { right: 5, left: 5 },
      startY: y,
      headStyles: headerStyle,//{halign: 'center',textColor :'blue'},
      styles: {
        lineWidth: _lineWidth,
        lineColor: _lineWidth > 0 ? 'black' : '',
        minCellHeight: 10,
      }
    });
    return autoTableOut.previousAutoTable.finalY + 2; //5
  }
  public initfooter(doc: any) {
    var pageCount = doc.internal.getNumberOfPages();

    for (let i = 0; i < pageCount; i++) {

      doc.setPage(i);
      doc.setFontSize(7);
      doc.setFontStyle('italic');
      this.addText(doc, 'Page ' + doc.internal.getCurrentPageInfo().pageNumber + " of " + pageCount, 5, (doc.internal.pageSize.height - 2), 'center');

      var ddMMyyyy = this.datePipe.transform(new Date(), "dd-MM-yyyy");
      console.log(ddMMyyyy);
      this.addText(doc, 'Created Date: ' + ddMMyyyy, doc.internal.pageSize.width - 50, 5);
      doc.setFontSize(6);
      //this.addText(doc,'Report Name',10,5,'center');
    }
  }
  public pdfReport(divName?: string) {
    debugger;
    if (divName) {
      var divToPrint = document.getElementById(divName);
      var newWin = window.open('', 'Print-Window');
      newWin.document.open();
      newWin.document.write(`<!DOCTYPE html>
    <html><style> @media print {
      #drpdown{display : none};
      /* body *{display : none}; 
      body #statescore * {display:none} */
       table {border-collapse: collapse;} 
      
      table, td, th {border: 1px solid black;}
      #statescore { padding-left :20px; padding-top :25px}
  
      .noprint { display: none; }
        /* .page-break { display: block; page-break-before: '#fifteen'; } */
     }
     .modal-body{ overflow-y: hidden !important;}
     table.table.table-bordered.table-custom1111{
      border-collapse:collapse;

     }
     body{text-align:center;
    font-size:18px;
    }
</style><body onload="window.print()">`+ divToPrint.innerHTML + '</body></html>');
      newWin.document.close();
      setTimeout(function () { newWin.close(); }, 10);

    }
    else {
      window.print();
    }


  }



  openPopup(content, state) {
    console.log('--------->>>>>', { content, state })
    this.displayPop = "block";
    this.DisplayDate = state.CSMCDate;
    const csmcno = state.CSMCNo;
    const cmsDate = state.CSMCDate;
    const component = state.Component;
    this.CmsNo = csmcno;
    console.log(this.stateCodes, { component, cmsDate, csmcno })
    this.service.GetCSMCStateCompDtWise(this.stateCodes, component, cmsDate, csmcno).subscribe(result => {
      console.log(result)
      this.lastPopResult = result;
    });

  }
  closeModalDialog() {
    this.displayPop = 'none';
  }
  public pdfReport4() {
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF 
    // var pdf = new jspdf('p', 'pt', 'letter'); 
    // pdf.addFont('ArialMS', 'Arial', 'normal');
    pdf.setFont('Arial');
    var position = 0;
    let x: number = 5;
    let y: number = 6;
    //console.log(y);
    y = this.addText(pdf, '(' + this.StateText.trimRight() + ')', x, y, 'right');
    //console.log('Check ReferenceType' + y);
    //doc.line(x1, y1,x2,y2);

    //y = this.addLine(pdf, 1, x, y);

    y = this.addText(pdf, 'Pradhan Mantri Awas Yojana (U)-- SCORE CARD', 10, y, 'right');

    //y = this.addLine(pdf, 0.5, x, y);
    y = this.addAutoTable(pdf, '#one', y, 0, { halign: 'right', textColor: 'blue' }, null, false);
    // y = this.addLine(pdf, 0.5, x, y);

    //split table
    let tableWidth = Math.floor(pdf.internal.pageSize.width / 2) - 10;


    this.addText(pdf, 'General', 40, y, undefined, 10);
    y = this.addText(pdf, 'Demand Survey', 150, y, undefined, 10);
    this.addAutoTable(pdf, '#two', y, tableWidth, { halign: 'right', fillColor: '#A7E074' });




    y = this.addAutoTable(pdf, '#three', y, tableWidth, { halign: 'right', fillColor: 'rgb(217, 202, 248)' }, { left: tableWidth + 10 });
    //    y=y+1;

    y = y + 2;

    this.addText(pdf, 'Beneficiaries with Aadhaar', 40, y, undefined, 10);
    y = this.addText(pdf, 'HFAPoA', 150, y, undefined, 10);

    this.addAutoTable(pdf, '#four', y, tableWidth, { halign: 'right', fillColor: 'rgb(173, 211, 211)' });
    y = this.addAutoTable(pdf, '#five', y, tableWidth, { halign: 'right', fillColor: 'rgb(240, 232, 190)' }, { left: tableWidth + 10 });

    //  y=y+1;

    y = this.addText(pdf, 'PMAY (U) - Progress*', 90, y, undefined, 10);

    y = this.addAutoTable(pdf, '#six', y, 0, { halign: 'right', fillColor: 'rgb(240, 178, 137)' });


    //  y=y+1;
    this.addText(pdf, 'PMAY - UCs (Rs in Cr)', 30, y, undefined, 10);
    this.addText(pdf, 'Occupancy', 110, y, undefined, 10);
    this.addText(pdf, 'Reforms', 150, y, undefined, 10);
    y = this.addText(pdf, 'CLSS', 180, y, undefined, 10);


    this.addAutoTable(pdf, '#seven', y, tableWidth, { halign: 'right', fillColor: '#A7E074' });
    //70
    this.addAutoTable(pdf, '#eight', y, tableWidth - 65, { halign: 'right', fillColor: 'rgb(217, 202, 248)' }, { left: tableWidth + 10 });

    this.addAutoTable(pdf, '#nine', y, tableWidth - 70, { halign: 'right', fillColor: 'rgb(217, 202, 248)' }, { left: tableWidth + (tableWidth - 70) + 20 });
    y = this.addAutoTable(pdf, '#ten', y, tableWidth - 70, { halign: 'right', fillColor: 'rgb(217, 202, 248)' }, { left: tableWidth + (tableWidth - 70) + (tableWidth - 70) + 30 });


    this.addText(pdf, 'SLTC', 40, y, undefined, 10);
    this.addText(pdf, 'CLTC', 130, y, undefined, 10);
    y = this.addText(pdf, 'Beneficiaries', 180, y, undefined, 10);

    this.addAutoTable(pdf, '#eleven', y, tableWidth - 10, { halign: 'right', fillColor: 'rgb(217, 202, 248)' });
    this.addAutoTable(pdf, '#twelve', y, tableWidth - 32, { halign: 'right', fillColor: 'rgb(217, 202, 248)' }, { left: tableWidth + 10 });
    y = this.addAutoTable(pdf, '#thirteen', y, tableWidth - 60, { halign: 'right', fillColor: 'rgb(217, 202, 248)' }, { left: (tableWidth - 30) + (tableWidth - 30) + 40 });

    y = y + 1;
    this.addText(pdf, 'MIS', 40, y, undefined, 10);
    this.addText(pdf, 'Geo-Tagging', 130, y, undefined, 10);
    y = this.addText(pdf, 'Subsidy', 180, y, undefined, 10);

    this.addAutoTable(pdf, '#mis', y, tableWidth - 10, { halign: 'right', fillColor: 'rgb(217, 202, 248)' });
    this.addAutoTable(pdf, '#geo', y, tableWidth - 32, { halign: 'right', fillColor: 'rgb(217, 202, 248)' }, { left: tableWidth + 10 });
    y = this.addAutoTable(pdf, '#subsidy', y, tableWidth - 60, { halign: 'right', fillColor: 'rgb(217, 202, 248)' }, { left: (tableWidth - 30) + (tableWidth - 30) + 40 });


    y = this.addAutoTable(pdf, '#fourteen', y, 0, { halign: 'right', fillColor: 'rgb(217, 202, 248)' });


    pdf.addPage();
    y = 15;


    y = this.addText(pdf, 'State Wise - CSMC Wise Sanctions', 80, y, undefined, 10);

    y = this.addAutoTable(pdf, '#fifteen', y, 0, { halign: 'right', fillColor: 'rgb(217, 202, 248)' });

    this.initfooter(pdf);
    pdf.save('MYPDF.pdf');


  }




  public pdfReport2() {
    var data = document.getElementById('tblPdf');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 218;
      // var pageHeight = 350;    
      if (this.stateCodes == "28") {
        var pageHeight = 900;
        //var pageHeight = 1000; 
      }
      if (this.stateCodes == "18") {
        var pageHeight = 960;
      }
      if (this.stateCodes == "10") {
        var pageHeight = 980;
      }
      if (this.stateCodes == "22") {
        var pageHeight = 900;
      }
      if (this.stateCodes == "35" || this.stateCodes == "12" || this.stateCodes == "07" || this.stateCodes == "30" || this.stateCodes == "24" || this.stateCodes == "06") {
        var pageHeight = 660;
      }
      else {
        var pageHeight = 660;
      }

      var imgHeight = (canvas.height * imgWidth / canvas.width);
      var heightLeft = imgHeight;




      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF 
      // var pdf = new jspdf('p', 'pt', 'letter'); 
      var position = 0;


      if (this.stateCodes == "28") {
        //  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight +117);
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight + 98);
      }
      else if (this.stateCodes == "18") {
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight + 75);
      }
      else if (this.stateCodes == "10") {
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight + 97);
      }
      else if (this.stateCodes == "22") {
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight + 75);
      }
      else if (this.stateCodes == "26" || this.stateCodes == "25" || this.stateCodes == "07" || this.stateCodes == "30" || this.stateCodes == "24" || this.stateCodes == "06") {
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight + 70);
      }
      else {
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight + 70);
      }




      // pdf.setFontSize(60);  
      //  pdf.addImage(contentDataURL, "PNG", 1, (-22+1)*10,  imgWidth, 390);
      //  pdf.addImage(contentDataURL, "PNG", 1, (-25+1)*10,  240,460);imgHeight360
      if (this.stateCodes == "28") {
        pdf.addPage();
        pdf.addImage(contentDataURL, "PNG", 1, (-22 + 1) * 10, 200, imgHeight - 100);
        //pdf.addImage(contentDataURL, "PNG", 1, (-22+1)*10,  200, imgHeight -70);
      }
      else if (this.stateCodes == "18") {
        pdf.addPage();
        pdf.addImage(contentDataURL, "PNG", 1, (-22 + 1) * 10, 240, imgHeight - 60);
      }
      else if (this.stateCodes == "10") {
        pdf.addPage();
        pdf.addImage(contentDataURL, "PNG", 1, (-22 + 1) * 10, 240, imgHeight - 60);
      }
      else if (this.stateCodes == "22") {
        pdf.addPage();
        pdf.addImage(contentDataURL, "PNG", 1, (-22 + 1) * 10, 240, imgHeight - 55);
      }
      else if (this.stateCodes == "35" || this.stateCodes == "12") {
        pdf.addPage();
        pdf.addImage(contentDataURL, "PNG", 1, (-22 + 1) * 10, 240, imgHeight - 60);
      }
      else if (this.stateCodes == "04") {
        //pdf.addImage(contentDataURL, "PNG", 1, (-22+1)*10,  240, imgHeight -30);
      }
      else if (this.stateCodes == "26" || this.stateCodes == "25") {
        pdf.addPage();
        pdf.addImage(contentDataURL, "PNG", 1, (-22 + 1) * 10, 240, imgHeight - 60);
      }
      else if (this.stateCodes == "07" || this.stateCodes == "31") {
        //  pdf.addPage();
        // pdf.addImage(contentDataURL, "PNG", 1, (-22+1)*10,  240, imgHeight -60);    
      }
      else if (this.stateCodes == "30" || this.stateCodes == "24" || this.stateCodes == "06") {
        pdf.addPage();
        pdf.addImage(contentDataURL, "PNG", 1, (-22 + 1) * 10, 240, imgHeight - 60);
      }
      else if (this.stateCodes == "27") {
        pdf.addPage();
        pdf.addImage(contentDataURL, "PNG", 1, (-22 + 1) * 10, 240, imgHeight - 95);
      }
      else {
        pdf.addPage();
        pdf.addImage(contentDataURL, "PNG", 1, (-22 + 1) * 10, 240, imgHeight - 65);
      }
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }

  public pdfReport1() {
    var data = document.getElementById('tblPdf');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 218;
      // var pageHeight = 350;    
      if (this.stateCodes == "28") {
        var pageHeight = 1290;
      }

      var imgHeight = (canvas.height * imgWidth / canvas.width) + 140;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.setFontSize(30);


      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.addPage();
      //  pdf.rect(10, 30, 24, 8);
      pdf.setFontSize(22);

      //  pdf.addImage(contentDataURL, "PNG", 1, (-22+1)*10,  imgWidth, 390);

      pdf.addImage(contentDataURL, "PNG", 1, (-18 + 1) * 10, imgWidth, 350);


      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }



  public printData(abc: any[]) {
    let printContents = '';
    const WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes');
    printContents += `<table>
                    
                      <tr style="background-color: gray;">
                      <td><b><font color="black" size="2">Sr No</font></b></td>
                      <td><b><font color="black" size="2">City</font></b></td>
                      <td style="width: 200px"><b><font color="black" size="2">Project Title</font></b></td>
                       <td align="center"><b><font color="black"  size="2">Central <br/>Assistance <br/>Committed</font></b></td>
                      <td align="center"><b><font color="black"  size="2">Central <br/>Assistance <br/>Sanctioned</font></b></td>
                      <td align="center"><b><font color="black"  size="2">Houses<br/> Sanctioned</font></b></td>
                      <td align="center"><b><font color="black"  size="2">Houses<br/>Grounded</font></b></td>
                      <td align="center"><b><font color="black"  size="2">Houses<br/>Completed</font></b></td>
                      <td align="center"><b><font color="black"  size="2">Houses<br/>Occupied</font></b></td>
                    </tr>`;
    abc.map((data, ind) => {
      printContents += `<tr>
                        <td>${ind + 1}</td>

                        <td>${data.City}</td>
                       <td>${data.ProjectTitle}</td> 
                       <td>${data.CASanctioned}</td>
                       <td>${data.CentralAssistanceReleased}</td>
                       <td>${data.HousesSanctioned}</td> 
                       <td>${data.Houses_Grounded}</td>
                       <td>${data.Houses_Completed}</td>
                       <td>${data.HousesOccupied}</td> 
                       
                     </tr>`;

      // printContents += `<tr *ngFor='let state of lastPopResult; let i=index'>
      //                   <td ><font  size='3' >${i+1}  </font></td>
      //                   <td > <font  size='3' >{{state.City}}</font></td>
      //                    <td > <font  size='2'>{{state.ProjectTitle}}</font></td>
      //                   <td align="right"><font  size='3' > {{state.CASanctioned}}</font></td>
      //                   <td align="right"><font  size='3' >{{state.CentralAssistanceReleased}}</font></td>
      //                   <td align="right"><font  size='3' >{{state.HousesSanctioned}}</font></td>
      //                   <td align="right"><font  size='3' >{{state.Houses_Grounded}}</font></td>
      //                   <td align="right"><font  size='3' >{{state.Houses_Completed}}</font></td>
      //                   <td align="right"><font  size='3' >{{state.HousesOccupied}}</font></td> 
      //                 </tr>`;   

      const htmlData = `<html><body>${printContents}</body></html>`;

      WindowObject.document.writeln(htmlData);
      WindowObject.document.close();
      WindowObject.focus();


      // setTimeout(() => {
      //  WindowObject.close();

      // }, 2);
    });
    //window.print();  
    WindowObject.print();

  };


  public printData4(e) {
    const printContents = document.getElementById(e).innerHTML
    const WindowObject = window.open('', 'PrintWindow', 'width=750,height=650,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes'
    );
    const htmlData = `<html><body>${printContents}</body></html>`;

    WindowObject.document.writeln(htmlData);
    WindowObject.document.close();
    WindowObject.focus();
    setTimeout(() => {
      WindowObject.close();
    }, 0.5);
  };



  public printData2(divID) {
    //Get the HTML of div
    var divElements = document.getElementById(divID).innerHTML;
    //Get the HTML of whole page
    var oldPage = document.body.innerHTML;
    //Reset the page's HTML with div's HTML only
    document.body.innerHTML =
      "<html><head><title></title></head><body>" +
      divElements + "</body>";
    //Print Page
    window.print();
    //Restore orignal HTML
    document.body.innerHTML = oldPage;

  };

  public printData1(divID) {
    var divToPrint = document.getElementById(divID);
    var newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  }


  public pdfReport_2final() {
    alert("print suru");
    var data = document.getElementById('nypopup');
    html2canvas(data).then(canvas => {
      var imgWidth = 200;
      // if (this.stateCodes == "28") {
      var pageHeight = 790;
      //}
      var imgHeight = (canvas.height * imgWidth / canvas.width);
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.setFontSize(30);
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.addPage();
      pdf.setFontSize(22);
      pdf.addImage(contentDataURL, "PNG", 1, 10 * 10, imgWidth, 350);
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }


}
