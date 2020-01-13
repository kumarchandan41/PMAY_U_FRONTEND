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
  selector: 'app-ata-glance-report',
  templateUrl: './ata-glance-report.component.html',
  styleUrls: ['./ata-glance-report.component.css']
})

export class AtaGlanceReportComponent implements OnInit {
  stateCodes: string = "0";
  districtCodes: string = "0";
  cityCodes: string = "0";
  StateMessage: string;
  DistrictMessage: string;
  CityMessage: string;
  NoPApprovedJN :any; 
  NoOfprojRay :any;
  NoPApprovedCLSS:any;
  NoOfprojISSR:any;
  NoOfprojAHP:any;
  NoOfprojBLCS:any;
  proj_Total :any;
  ProjCostApp_JN  :any;
  ProjCostRay:any;
  CLSSLoanAmt:any;
  ProjCostISSR:any;
  ProjCostAHP :any;
  ProjCostBLCS:any;
  ProjApp_Total :any;
  CShare_JN:any;
  CSRay:any;
  SubsidyAmtCr:any;
  CSISSR:any;
  CSAHP:any;
  CSBLCS:any;
  CAS_Total :any;
  CARel_JN:any;
  CARay:any;
  CAISSR:any;
  CAAHP:any;
  CABLCS:any;
  CAR_Total :any;
  HS_JN:any;
  HSRay:any;
  NoofBene :any;
  HSISSR:any;
  HSAHP:any;
  HSBLCS:any;
  HS_Total :any;
  Grounded_JN:any;
  HGrnd_JN:any;
  HGRay:any;
  HGISSR:any;
  HGAHP:any;
  HGBLCS:any;
  HG_Total :any;
  Completed_JN:any;
  HComp_JN:any;
  HCRay:any;
  HCISSR:any;
  HCAHP:any;
  HCBLCS:any;
  HC_Total :any;
  OccupiedJN:any;
  HOcc_JN:any;
  HORay:any;
  HOISSR:any;
  HOAHP:any;
  HOBLCS:any;
  HO_Total :any;
  comp: string;
 distValue: string;
 cityValue: string;
stValue: string;
division: any;
lblStateDisttCity: any;
    lblStateHeader: any;
    lblDistHeader: any;
  lblCityHeader: any;  
 Houses_Grounded: number;
 SubsidyAmountCredited: number;
    
  constructor(private router: Router, public service: GraphService) {
    this.stValue = "0";
    this.distValue = "0";
    this.cityValue = "0";
    this.StateMessage = "Select State";
    this.DistrictMessage = "Select District";
    this.CityMessage = "Select City";
   }

  ngOnInit() {
    this.stateCodes = "0";
    this.districtCodes = "0";
    this.cityCodes = "0";
    this.service.StateList();
    this.service.DisttList(this.stateCodes);
    this.service.CityList(this.districtCodes);
    this.lblStateDisttCity = "All India";

    this.division = "0";
    this.HGrnd_JN =0;
    this.HComp_JN =0;
    this.HOcc_JN =0;
    this.GetAtAGlanceDat(this.stateCodes, this.districtCodes, this.cityCodes, this.division);
   }

  GetAtAGlanceDat(stateCodes, districtCodes, cityCodes, division)
  {
    this.HGrnd_JN =0;
    this.HComp_JN =0;
    this.HOcc_JN =0;
    this.service.HFA_AtAGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(resultAtaGlance => {
      this.NoOfprojAHP = resultAtaGlance[0].NoOfprojApproved;
      this.ProjCostAHP= resultAtaGlance[0].Project_Cost;
      this.CSAHP= resultAtaGlance[0].CentralShare;

      this.CAAHP= resultAtaGlance[0].CentralAssisRel;
      this.HSAHP= resultAtaGlance[0].HousesSanctioned;
      this.HGAHP= resultAtaGlance[0].Grounded;
      this.HCAHP= resultAtaGlance[0].Completed;
      this.HOAHP= resultAtaGlance[0].Occupied;      
    })
    this.service.HFA_AtAGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(resultAtaGlance => {
      this.NoOfprojBLCS = resultAtaGlance[1].NoOfprojApproved;
      this.ProjCostBLCS= resultAtaGlance[1].Project_Cost;
      this.CSBLCS= resultAtaGlance[1].CentralShare;

      this.CABLCS= resultAtaGlance[1].CentralAssisRel;
      this.HSBLCS= resultAtaGlance[1].HousesSanctioned;
      this.HGBLCS= resultAtaGlance[1].Grounded;
      this.HCBLCS= resultAtaGlance[1].Completed;
      this.HOBLCS= resultAtaGlance[1].Occupied;      
    })
    this.service.HFA_AtAGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(resultAtaGlance => {
      this.CLSSLoanAmt= resultAtaGlance[2].Project_Cost;
      this.SubsidyAmtCr= resultAtaGlance[2].CentralShare;

      this.SubsidyAmtCr= resultAtaGlance[2].CentralAssisRel;

      this.NoofBene= resultAtaGlance[2].HousesSanctioned;
      this.NoofBene= resultAtaGlance[2].Grounded;
      this.NoofBene= resultAtaGlance[2].Completed;
      this.NoofBene= resultAtaGlance[2].Occupied;      
    })

    this.service.HFA_AtAGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(resultAtaGlance => {
      this.NoOfprojISSR = resultAtaGlance[3].NoOfprojApproved;
      this.ProjCostISSR= resultAtaGlance[3].Project_Cost;
      this.CSISSR= resultAtaGlance[3].CentralShare;

      this.CAISSR= resultAtaGlance[3].CentralAssisRel;

      this.HSISSR= resultAtaGlance[3].HousesSanctioned;
      this.HGISSR= resultAtaGlance[3].Grounded;
      this.HCISSR= resultAtaGlance[3].Completed;
      this.HOISSR= resultAtaGlance[3].Occupied;      
    })

    this.service.HFA_AtAGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(resultAtaGlance => {
    //  this.compJN = resultAtaGlance[4].Component;
      this.NoPApprovedJN = resultAtaGlance[4].NoOfprojApproved;
      this.ProjCostApp_JN= resultAtaGlance[4].Project_Cost;
      this.CShare_JN= resultAtaGlance[4].CentralShare;

      this.CARel_JN= resultAtaGlance[4].CentralAssisRel;

      this.HS_JN= resultAtaGlance[4].HousesSanctioned;
      this.Grounded_JN= resultAtaGlance[4].Grounded;
      this.Completed_JN= resultAtaGlance[4].Completed;
      this.OccupiedJN= resultAtaGlance[4].Occupied;      
    })
    this.service.HFA_AtAGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(resultAtaGlance => {
    //  this.compJN1 = resultAtaGlance[5].Component;
      this.HGrnd_JN= resultAtaGlance[5].Grounded;
      this.HComp_JN= resultAtaGlance[5].Completed;
      this.HOcc_JN= resultAtaGlance[5].Occupied;      
    })

    this.service.HFA_AtAGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(resultAtaGlance => {
    //  this.compRay = resultAtaGlance[6].Component;
      this.NoOfprojRay = resultAtaGlance[6].NoOfprojApproved;
      this.ProjCostRay= resultAtaGlance[6].Project_Cost;
      this.CSRay= resultAtaGlance[6].CentralShare;

      this.CARay= resultAtaGlance[6].CentralAssisRel;

      this.HSRay= resultAtaGlance[6].HousesSanctioned;
      this.HGRay= resultAtaGlance[6].Grounded;
      this.HCRay= resultAtaGlance[6].Completed;
      this.HORay= resultAtaGlance[6].Occupied;      
    })
    this.service.HFA_AtAGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.division).subscribe(resultAtaGlance => {
     // this.compRay = resultAtaGlance[7].Component;
      this.proj_Total = resultAtaGlance[7].NoOfprojApproved;
      this.ProjApp_Total= resultAtaGlance[7].Project_Cost;
      this.CAS_Total= resultAtaGlance[7].CentralShare;

      this.CAR_Total= resultAtaGlance[7].CentralAssisRel;

      this.HS_Total= resultAtaGlance[7].HousesSanctioned;
      this.HG_Total= resultAtaGlance[7].Grounded;
      this.HC_Total= resultAtaGlance[7].Completed;
      this.HO_Total= resultAtaGlance[7].Occupied;      
    })

    this.NoPApprovedCLSS = 0; //?
    this.NoPApprovedCLSS ="-";


  }
  getStateDetails(stateCodes) {    
    if (stateCodes == 0) {
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
      this.HGrnd_JN =0;
    this.HComp_JN =0;
    this.HOcc_JN =0;

    this.stateCodes="0"; 
    this.districtCodes ="0"; 
    this.cityCodes="0"; 
    this.division=0; 

      this.GetAtAGlanceDat(this.stateCodes, this.districtCodes, this.cityCodes, this.division);
      
    }
    else {
      this.stateCodes = stateCodes;
      this.service.DisttList(stateCodes);
      this.service.CityList(this.districtCodes);//
      this.service.HFACityWiseReportPMayList(stateCodes, this.districtCodes, this.cityCodes);
      this.service.CLSSCityWiseReportPMayList(stateCodes, this.districtCodes, this.cityCodes);
      // this.service.JNNURMCityWiseAtAGlance(stateCodes,this.districtCodes,this.cityCodes);

      this.HGrnd_JN =0;
    this.HComp_JN =0;
    this.HOcc_JN =0;
   
     this.districtCodes ="0"; 
     this.cityCodes="0"; 
     this.division=0; 
     this.GetAtAGlanceDat(this.stateCodes, this.districtCodes, this.cityCodes, this.division);
     }
  }
  getDistrictDetails(DisttCode) {
    
    this.HG_Total =0; 
    this.HGRay =0;
     this.NoofBene=0; 
      this.HGISSR =0;
       this.HGAHP =0;
        this.HGBLCS =0;
         this.HGrnd_JN=0;
                   
    this.HC_Total =0;
     this.HCRay =0;
      this.NoofBene=0; 
       this.HCISSR =0;
        this.HCAHP =0;
         this.HCBLCS =0;
          this.HComp_JN=0;
    this.HO_Total =0;
    this.HORay =0;
     this.NoofBene=0; 
      this.HOISSR =0;
       this.HOAHP =0;
        this.HOBLCS =0;
         this.HOcc_JN=0;


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
      this.HGrnd_JN =0;
      this.HComp_JN =0;
      this.HOcc_JN =0;
      this.cityCodes="0"; 
      this.division=0; 
      this.GetAtAGlanceDat(this.stateCodes, this.districtCodes, this.cityCodes, this.division);
    }
    else {
      this.districtCodes = DisttCode;
      this.service.CityList(DisttCode);
      this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
      this.service.JNNURMCityWiseAtAGlance(this.stateCodes, this.districtCodes, this.cityCodes);
      this.HGrnd_JN =0;
    this.HComp_JN =0;
    this.HOcc_JN =0;
     this.cityCodes="0"; 
    this.division=0; 
      this.GetAtAGlanceDat(this.stateCodes, this.districtCodes, this.cityCodes, this.division);
    }
  }
  getCityDetails(cityCode) {

    this.NoPApprovedJN =0;
    this.NoOfprojRay =0;
    this.NoPApprovedCLSS =0;
    this.NoOfprojISSR =0;
    this.NoOfprojAHP =0;
    this.NoOfprojBLCS =0;
    this.proj_Total =0;
    if (this.stateCodes == "0") {
      this.lblStateDisttCity = "All India";
    }
    else if (this.stateCodes != "0" && this.districtCodes == "0" && cityCode == "0") {
      this.service.GetStateNameByCode(this.stateCodes).subscribe(resultName => {
        this.lblStateHeader = resultName.States_UT;
      });
    }
    else if (this.stateCodes != "0" && this.districtCodes != "0" && cityCode == "0") {
      this.service.GetDisttNameByCode(this.districtCodes).subscribe(resultDisttName => {
        this.lblDistHeader = resultDisttName.District;
        this.lblStateDisttCity = this.lblDistHeader + " district of " + this.lblStateHeader;
      });
    }
    else if (this.stateCodes != "0" && this.districtCodes != "0" && cityCode != "0") {
      this.service.GetCityNameByCode(cityCode).subscribe(resultCityName => {
        this.lblCityHeader = resultCityName.City;
        this.lblStateDisttCity = this.lblCityHeader + " City of " + this.lblStateHeader;
      });
    }
     if (cityCode == "0") {
      this.cityValue = "0";
      this.CityMessage = "Select City";
      this.service.CityDetails = [];

      this.HGrnd_JN =0;
    this.HComp_JN =0;
    this.HOcc_JN =0;
      this.GetAtAGlanceDat(this.stateCodes, this.districtCodes, this.cityCodes, this.division);
    }
    else {
      this.cityCodes = cityCode;

      this.HGrnd_JN =0;
    this.HComp_JN =0;
    this.HOcc_JN =0;
      this.GetAtAGlanceDat(this.stateCodes, this.districtCodes, this.cityCodes, this.division);
    }
  }
  AdminPage() {
    this.router.navigate(['/dashboard']);
  }
  public pdfReport() {
    window.print();
  }
}
