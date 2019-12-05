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
  selector: 'app-pmayu-comp-wise',
  templateUrl: './pmayu-comp-wise.component.html',
  styleUrls: ['./pmayu-comp-wise.component.css']
})

export class PMAYuCompWiseComponent implements OnInit {  
  modalRef;
  display='none';
  display1='none';
  Codes:string;
  StateDetails: States[];
 
  State:string;

  //modalRef;
  //StateDetails: States[];
  DisttDetails: Observable<District[]>;
  CityDetails: City[];
  stateCodes: string = "0";
  districtCodes: string = "0";
  cityCodes: string = "0";
  
 
  chart: Charts;
  compArray: string[];
  Houses_Grounded: any;
  SubsidyAmountCredited: any;
 
  StateMessage: string;
  DistrictMessage: string;
  CityMessage: string;
 
  stValue: string;
  distvalue: string;
  cityvalue: string;
  distValue: string;
  cityValue: string;

  
  firstGraph: string[] = [];
  secondGraph: string[] = [];
  leble: string;
  Y: string;
 
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
  lstYear: string[] = [];
  lstYearBene: string[] = [];

  selectedYears:any;
  lstDivision: string[] = [];
 
  StateShareNew: any;

 
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


  //@ViewChild('editModal') editModal: TemplateRef<any>;
   


 // lstHFACodes: import("src/app/model/charts.model").getHFACodes[];

// lstHFACodes: import("src/app/financeReport/model/chart.model").getHFACodes[];
  DisabledCheckBox:boolean;
 
 
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
  // strcsv:any;
  // boolCheck: boolean;
  // boolCheckJn: boolean;

  Sanction_Total_New: number;
  HS_19_20S: number;
  HC_19_20S: number;
  HO_19_20S: number;
  HC_19_20: number;
  HO_19_20: number;
  HS_19_20: number;
  HG_19_20: number;
  CASanctioned_19_20: number;
  CumuCA_Released_19_20: number;
  
  
  
  Fin_Year: any;
  page:string;
  isDone = true;
  Sanction_Total_New4: any;
  today= new Date();
  jstoday = '';
  selectedColor = '';
  public backgroundColor: string;
  public show = false;
  GTCompleted__New: any;
  Ground_Total__New: any;
  GTCompletedNew_: any;
  CASanct_forReleaseN_Change: any;
  Housesinvolved: any;
  FundsDisbursed_in_Houses: any;
  Houses_Grounde  : any;
  Houses_Complete  : any;
  First_Houses : any;
       Second_Houses : any;
       Third_Houses: any;
       Fin_Year14_15 : any;
       Housesinvolved14_15 : any;
       FundsDisbursed_in_Houses14_15 : any =0;
       Houses_Grounde14_15  : any =0;
       Houses_Complete14_15  : any =0;
       First_Houses14_15 : any =0;
       Second_Houses14_15  : any =0;
       Third_Houses14_15 : any =0;

         Fin_Year15_16 : any =0;
         Housesinvolved15_16 : any =0;
         FundsDisbursed_in_Houses15_16 : any =0;
        Houses_Grounde15_16  : any =0;
        Houses_Complete15_16  : any =0;
        First_Houses15_16 : any =0;
        Second_Houses15_16  : any =0;
        Third_Houses15_16 : any =0;

  Fin_Year16_17: any =0;
  Housesinvolved16_17: any =0;
  FundsDisbursed_in_Houses16_17: any =0;
  Houses_Grounde16_17: any =0;
  Houses_Complete16_17: any =0;
  First_Houses16_17: any =0;
  Second_Houses16_17: any =0;
  Third_Houses16_17: any =0;
  Fin_Year17_18: any =0;
  Housesinvolved17_18: any =0;
  FundsDisbursed_in_Houses17_18: any =0;
  Houses_Grounde17_18: any =0;
  Houses_Complete17_18: any =0;
  First_Houses17_18: any =0;
  Third_Houses17_18: any =0;
  Second_Houses17_18: any =0;

  Fin_Year18_19: any =0;
  Housesinvolved18_19: any =0;
  FundsDisbursed_in_Houses18_19: any =0;
  Houses_Grounde18_19: any =0;
  Houses_Complete18_19: any =0;
  First_Houses18_19: any =0;
  Third_Houses18_19: any =0;
  Second_Houses18_19: any =0;

  Fin_Year19_20: any;
  Housesinvolved19_20: any =0;
  FundsDisbursed_in_Houses19_20: any =0;
  Houses_Grounde19_20: any =0;
  Houses_Complete19_20: any =0;
  First_Houses19_20: any =0;
  Third_Houses19_20: any =0;
  Second_Houses19_20: any =0;
  HousesOccupied18_19: any =0;
  HousesOccupied17_18: any =0;
  HousesOccupied16_17: any =0;
  HousesOccupied15_16: any =0;
  HousesOccupied14_15: any =0;
  HousesOccupied19_20: any =0;
  First_Houses20_21: any =0;
  HousesOccupied20_21: any =0;
  Second_Houses20_21: any =0;
  Third_Houses20_21: any =0;
  FundsDisbursed_in_Houses20_21: any =0;
  Housesinvolved20_21: any =0;
  Houses_Grounde20_21: any =0;
  Houses_Complete20_21: any =0;
  a: any;
  b: any;
  c: any;
  d: any;
  e: any;
  f: any;
  g: any;
  h: any;
  i: any;
  selectedYearsBene: string;

  constructor(private router: Router,private gevent:GlobalEvent, public service: GraphService, private modalService: NgbModal) {
    this.StateMessage = "Select State";
    this.DistrictMessage = "Select District";
    this.CityMessage = "Select City";
    this.stValue = "0";
    this.distValue = "0";
    this.cityValue = "0";
    setInterval(()=>{
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

    this.service.sp_create_PMAY_DATAConsNew(this.stateCodes, this.districtCodes, this.cityCodes,this.Fin_Year).subscribe(result_PMU => {
    });
    
    this.service.sp_create_BLC_DATANew(this.stateCodes, this.districtCodes, this.cityCodes,this.Fin_Year).subscribe(result_PMU => {
    });

    // this.BindAHP_Datanew(this.stateCodes, this.districtCodes, this.cityCodes,this.Fin_Year).subscribe(result_PMU => {
    // });
    this.service.sp_create_AHP_DATANew(this.stateCodes, this.districtCodes, this.cityCodes,this.Fin_Year).subscribe(result_PMU => {
    });

    this.service.sp_create_ISSR_DATANew(this.stateCodes, this.districtCodes, this.cityCodes,this.Fin_Year).subscribe(result_PMU => {
    });
     // this.service.BindBLC_DataNew(this.stateCodes, this.districtCodes, this.cityCodes,"0" ,this.Fin_Year).subscribe(result_PMU => {
     // });
  }

  ngOnInit() {
    // this.gevent.ColorObservable.subscribe(x=>{
    //   console.log('color:'+x);
    // //  debugger;
    // });

  //  this.backgroundColor = "#ffffff";// "#B3E5FC"// '#FFDD00';
   this.stateCodes = "0";
   this.districtCodes = "0";
   this.cityCodes = "0";
  //  this.cid = 0;
  //  this.Comp = "0";
  //  this.Division = "0";
  //  this.DivisionCodes = "0";
   this.State="--Select--";

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
    this.BindPMayData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"0");
    this.BindBLC_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"0");
    this.BindAHP_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"0");
    this.BindISSRData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"0");
    
    // this.BindISSRDatanew(this.stateCodes, this.districtCodes, this.cityCodes,this.Fin_Year);
    // this.BindPMayDatanew(this.stateCodes, this.districtCodes, this.cityCodes,this.Fin_Year);
    // this.BindAHP_Datanew(this.stateCodes, this.districtCodes, this.cityCodes,this.Fin_Year);
    // this.BindBLC_DataNew(this.stateCodes, this.districtCodes, this.cityCodes,"0" ,this.Fin_Year);

     

  }

getFinDetails (Fin_Year)
{
 // alert(Fin_Year);
  this.BindPMayData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,Fin_Year) ;
  this.BindBLC_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,Fin_Year);
  this.BindAHP_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,Fin_Year);
  this.BindISSRData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,Fin_Year);
  this.BindISSRDatanew(this.stateCodes, this.districtCodes, this.cityCodes,Fin_Year);
  this.BindPMayDatanew(this.stateCodes, this.districtCodes, this.cityCodes,this.Fin_Year);
  this.BindBLC_DataNew(this.stateCodes, this.districtCodes, this.cityCodes,"0" ,this.Fin_Year);
  this.BindAHP_Datanew(this.stateCodes, this.districtCodes, this.cityCodes,this.Fin_Year);

}
  getStateDetails(stateCodes) {
   // debugger;

    //alert(stateCodes);
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
           //  this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);

             this.BindPMayData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"") ;
             this.BindBLC_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"");
             this.BindAHP_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"");
             this.BindISSRData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"");
             this.BindISSRDatanew(this.stateCodes, this.districtCodes, this.cityCodes,this.Fin_Year);
             this.BindPMayDatanew(this.stateCodes, this.districtCodes, this.cityCodes,this.Fin_Year);
             this.BindAHP_Datanew(this.stateCodes, this.districtCodes, this.cityCodes,this.Fin_Year);
             this.BindBLC_DataNew(this.stateCodes, this.districtCodes, this.cityCodes,"0" ,this.Fin_Year);
            }
     }
    else {
      this.stateCodes = stateCodes;
      this.service.DisttList(stateCodes);

      this.service.CityList(this.districtCodes);//
      this.DisabledCheckBox=true;
     // this.GetPsyChart(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp, this.DivisionCodes);

      this.BindAHP_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"");

      this.BindPMayData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"") ;
       this.BindBLC_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"");
       this.BindISSRData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"");

       this.BindISSRDatanew(this.stateCodes, this.districtCodes, this.cityCodes,this.selectedYears);

       this.BindPMayDatanew(this.stateCodes, this.districtCodes, this.cityCodes,this.Fin_Year);
       this.BindAHP_Datanew(this.stateCodes, this.districtCodes, this.cityCodes,this.Fin_Year);
       this.BindBLC_DataNew(this.stateCodes, this.districtCodes, this.cityCodes,"0" ,this.Fin_Year);
       
     //  this.BindBLC_DataNew(this.stateCodes, this.districtCodes, this.cityCodes,"0" ,this.Fin_Year);
    }
  }
  // Fin_Year(stateCodes: string, districtCodes: string, cityCodes: string, Fin_Year: any) {
  //   throw new Error("Method not implemented.");
  // }

  ProjectCost(event)
  {
  const checked= event.target.checked;
  const yearValue=event.target.value;
    if (checked) {
      this.lstYear.push(yearValue);
      this.selectedYears = this.lstYear.toString();
  }
    else {
      let index = this.lstYear.findIndex(a => a == yearValue);
      if (index !== -1) {
        this.lstYear.splice(index, 1);
      }
      this.selectedYears = this.lstYear.toString();
  }
  //alert(this.selectedYears );
 if (this.selectedYears.length >  0 )
 {
  this.BindPMayDatanew(this.stateCodes, this.districtCodes, this.cityCodes,this.selectedYears);
     this.BindAHP_Datanew(this.stateCodes, this.districtCodes, this.cityCodes,this.selectedYears);
   this.BindBLC_DataNew(this.stateCodes, this.districtCodes, this.cityCodes,"0" ,this.selectedYears);
   this.BindISSRDatanew(this.stateCodes, this.districtCodes, this.cityCodes,this.selectedYears);
 }
  else
  {
  this.BindPMayData(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"0") ;
  this.BindAHP_Data(this.stateCodes, this.districtCodes, this.cityCodes,"0",this.selectedYears);
  this.BindBLC_Data(this.stateCodes, this.districtCodes, this.cityCodes,"0" ,this.selectedYears);
  this.BindISSRData(this.stateCodes, this.districtCodes, this.cityCodes,"0" ,this.selectedYears);

  }
}
 
ShowPage()
{
  this.router.navigate(['/Admin/VerticalHousesDetails']);
}
BindPMayDatanew(stateCode, DisttCode, cityCode, Fin_Year )
{
       var str = Fin_Year ;//'SUM(BENE2014_15),SUM(BENE2015_16)';
     //   alert(str.length);
      if (str.length==101)
      {
          var splitted = str.split(",", str.length);
          //alert(splitted[0]);
          var x1 =  splitted[0].substring(8,str.length-3);
          var Y1 =  splitted[1].substring(8,str.length-3);
          var z1 =  splitted[2].substring(8,str.length-3);
          var z2 =  splitted[3].substring(8,str.length-3);
          var z3 =  splitted[4].substring(8,str.length-3);
          var z4 =  splitted[5].substring(8,str.length-3);
      }
      if (str.length==84)
      {
          var splitted = str.split(",", str.length);
          //alert(splitted[0]);
          var x1 =  splitted[0].substring(8,str.length-3);
          var Y1 =  splitted[1].substring(8,str.length-3);
          var z1 =  splitted[2].substring(8,str.length-3);
          var z2 =  splitted[3].substring(8,str.length-3);
          var z3 =  splitted[4].substring(8,str.length-3);
      }
      if (str.length==67)
      {
          var splitted = str.split(",", str.length);
          //alert(splitted[0]);
          var x1 =  splitted[0].substring(8,str.length-3);
          var Y1 =  splitted[1].substring(8,str.length-3);
          var z1 =  splitted[2].substring(8,str.length-3);
          var z2 =  splitted[3].substring(8,str.length-3);
         // alert(x1);
        //  alert(Y1); 
      }
      if (str.length==50)
      {
          var splitted = str.split(",", str.length);
          //alert(splitted[0]);
          var x1 =  splitted[0].substring(8,str.length-3);
          var Y1 =  splitted[1].substring(8,str.length-3);
          var z1 =  splitted[2].substring(8,str.length-3);
         // alert(x1);
        //  alert(Y1); 
      }
      if (str.length==33)
      {
          var splitted = str.split(",", str.length);
          //alert(splitted[0]);
          var x1 =  splitted[0].substring(8,str.length-3);
          var Y1 =  splitted[1].substring(8,str.length-3);
         // alert(x1);
        //  alert(Y1); 
      }
      if (str.length==16)
      {
          var splitted = str.split(",", str.length);
//          alert(splitted[0]);
          var x2 =  splitted[0].substring(8,str.length-1);
//          alert(splitted.length);

      }
    //  let x = stringToSplit.split(" ");

     if (splitted.length ==1)
     {
       if (x2=="2014_15")
           x2 ="2014-15";
           if (x2=="2015_16")
           x2 ="2015-16";
           if (x2=="2016_17")
           x2 ="2017-18";
           if (x2=="2018_19")
           x2 ="2018-19";
           if (x2=="2019_20")
           x2 ="2019-20";
            
          this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
            if (result[0].FinYear !="0" )
          {
              this.Fin_Year14_15 = result[0].FinYear;
              this.Housesinvolved14_15 = result[0].Housesinvolved;
              this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
              this.Houses_Grounde14_15 = result[0].Houses_Grounded;
              this.Houses_Complete14_15 = result[0].Houses_Completed;
              this.HousesOccupied14_15 = result[0].HousesOccupied;
              this.First_Houses14_15 = result[0].First_Houses;
              this.Second_Houses14_15 = result[0].Second_Houses;
              this.Third_Houses14_15 = result[0].Third_Houses;
          }

          let chart = new CanvasJS.Chart("chartPMAYU", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Progress(No of Houses) Consolidated (PMAY(U))",
              fontSize: "25",
            },
            backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
               
                { label: x2, y: this.Housesinvolved14_15 },
         
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
                { label: x2, y: this.FundsDisbursed_in_Houses14_15 },
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
                { label: x2, y: this.Houses_Grounde14_15 },
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
                { label: x2, y: this.Houses_Complete14_15 },
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
                { label: x2, y: this.HousesOccupied14_15 },
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
                { label: x2, y: this.Second_Houses14_15 },
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
                { label: x2, y: this.Third_Houses14_15 },
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
    if (splitted.length ==2)
    {
      if (x1=="2014_15)")
      x1 ="2014-15";
      if (x1=="2015_16)")
      x1 ="2015-16";
      if (x1=="2016_17")
      x1 ="2017-18";
      if (x1=="2018_19")
      x1 ="2018-19";
      if (x1=="2019_20")
      x1 ="2019-20";


      if (Y1=="2014_15)")
      Y1 ="2014-15";
      if (Y1=="2015_16)")
      Y1 ="2015-16";
      if (Y1=="2016_17")
      Y1 ="2017-18";
      if (Y1=="2018_19")
      Y1 ="2018-19";
      if (Y1=="2019_20")
      Y1 ="2019-20";

      this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
             this.Fin_Year14_15 = result[0].FinYear;
             this.Housesinvolved14_15 = result[0].Housesinvolved;
             this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
             this.Houses_Grounde14_15 = result[0].Houses_Grounded;
             this.Houses_Complete14_15 = result[0].Houses_Completed;
             this.HousesOccupied14_15 = result[0].HousesOccupied;
             this.First_Houses14_15 = result[0].First_Houses;
             this.Second_Houses14_15 = result[0].Second_Houses;
             this.Third_Houses14_15 = result[0].Third_Houses;
             // 
            try {
              this.Fin_Year15_16 = result[1].FinYear; 
            this.Housesinvolved15_16 = result[1].Housesinvolved;
             this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
             this.Houses_Grounde15_16 = result[1].Houses_Grounded;
             this.Houses_Complete15_16 = result[1].Houses_Completed;
             this.HousesOccupied15_16 = result[1].HousesOccupied;
             this.First_Houses15_16 = result[1].First_Houses;
             this.Second_Houses15_16 = result[1].Second_Houses;
             this.Third_Houses15_16 = result[1].Third_Houses;
          }
          catch{}
          finally{}


         let chart = new CanvasJS.Chart("chartPMAYU", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          title: {
            text: "Physical Progress(No of Houses) Consolidated (PMAY(U))",
            fontSize: "25",
          },
          backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
              { label: x1, y: this.Housesinvolved14_15 },
              { label:  Y1, y: this.Housesinvolved15_16 }

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
              { label:  x1, y: this.FundsDisbursed_in_Houses14_15 },
              { label:  Y1, y: this.FundsDisbursed_in_Houses15_16 }
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
              { label: x1, y: this.Houses_Grounde14_15 },
              { label: Y1, y: this.Houses_Grounde15_16 }
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
              { label: x1, y: this.Houses_Complete14_15 },
              { label:  Y1, y: this.Houses_Complete15_16 }
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
              { label:  x1, y: this.HousesOccupied14_15 },
              { label:  Y1, y: this.HousesOccupied15_16 }
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
              { label:  x1, y: this.Second_Houses14_15 },
              { label:  Y1, y: this.Second_Houses15_16 }
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
              { label:x1, y: this.Third_Houses14_15 },
              { label: Y1, y: this.Third_Houses15_16 }
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
    if (splitted.length ==3)
    {

      if (x1=="2014_15)")
      x1 ="2014-15";
      if (x1=="2015_16)")
      x1 ="2015-16";
      if (x1=="2016_17)")
      x1 ="2017-18";
      if (x1=="2018_19)")
      x1 ="2018-19";
      if (x1=="2019_20)" || x1=="2019_20")
      x1 ="2019-20";


      if (Y1=="2014_15)")
      Y1 ="2014-15";
      if (Y1=="2015_16)")
      Y1 ="2015-16";
      if (Y1=="2016_17)")
      Y1 ="2017-18";
      if (Y1=="2018_19)")
      Y1 ="2018-19";
      if (Y1=="2019_20)" || Y1=="2019_20")
      Y1 ="2019-20";

      if (z1=="2014_15)")
      z1 ="2014-15";
      if (z1=="2015_16)")
      z1 ="2015-16";
      if (z1=="2016_17)")
      z1 ="2017-18";
      if (z1=="2018_19)")
      z1 ="2018-19";
      if (z1=="2019_20)" || z1=="2019_20")
      z1 ="2019-20";
      
      this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
      
      //   this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

             this.Fin_Year14_15 = result[0].FinYear;
             this.Housesinvolved14_15 = result[0].Housesinvolved;
             this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
             this.Houses_Grounde14_15 = result[0].Houses_Grounded;
             this.Houses_Complete14_15 = result[0].Houses_Completed;
             this.HousesOccupied14_15 = result[0].HousesOccupied;
             this.First_Houses14_15 = result[0].First_Houses;
             this.Second_Houses14_15 = result[0].Second_Houses;
             this.Third_Houses14_15 = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

            // 
            try {
              this.Fin_Year15_16 = result[1].FinYear; 
            this.Housesinvolved15_16 = result[1].Housesinvolved;
             this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
             this.Houses_Grounde15_16 = result[1].Houses_Grounded;
             this.Houses_Complete15_16 = result[1].Houses_Completed;
             this.HousesOccupied15_16 = result[1].HousesOccupied;
             this.First_Houses15_16 = result[1].First_Houses;
             this.Second_Houses15_16 = result[1].Second_Houses;
             this.Third_Houses15_16 = result[1].Third_Houses;
          }
          catch{}
          finally{}


          try {
            this.Fin_Year16_17 = result[2].FinYear; 
          this.Housesinvolved16_17 = result[2].Housesinvolved;
           this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
           this.Houses_Grounde16_17 = result[2].Houses_Grounded;
           this.Houses_Complete16_17 = result[2].Houses_Completed;
           this.HousesOccupied16_17 = result[2].HousesOccupied;
           this.First_Houses16_17 = result[2].First_Houses;
           this.Second_Houses16_17 = result[2].Second_Houses;
           this.Third_Houses16_17 = result[2].Third_Houses;
        }
        catch{}
        finally{}


         let chart = new CanvasJS.Chart("chartPMAYU", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          title: {
            text: "Physical Progress(No of Houses) Consolidated (PMAY(U))",
            fontSize: "25",
          },
          backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
              { label: x1, y: this.Housesinvolved14_15 },
              { label: Y1, y: this.Housesinvolved15_16 },
              { label: z1, y: this.Housesinvolved16_17 }
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
              { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17 }

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
              { label: x1, y: this.Houses_Grounde14_15 },
              { label: Y1, y: this.Houses_Grounde15_16 },
              { label: z1, y: this.Houses_Grounde16_17 }
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
              { label: x1, y: this.Houses_Complete14_15 },
              { label: Y1, y: this.Houses_Complete15_16 },
              { label: z1, y: this.Houses_Complete16_17 }
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
              { label:x1, y: this.HousesOccupied14_15 },
              { label: Y1, y: this.HousesOccupied15_16 },
              { label: z1, y: this.HousesOccupied16_17} 
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
              { label: x1, y: this.Second_Houses14_15 },
              { label: Y1, y: this.Second_Houses15_16 },
              { label: z1, y: this.Second_Houses16_17 }
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
              { label: x1, y: this.Third_Houses14_15 },
              { label: Y1, y: this.Third_Houses15_16 },
              { label:z1, y: this.Third_Houses16_17 }
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

    if (splitted.length ==4)
    {
      if (x1=="2014_15)") x1 ="2014-15";
      if (x1=="2015_16)") x1 ="2015-16";
      if (x1=="2016_17)") x1 ="2016-17";
      if (x1=="2017_18)") x1 ="2017-18";
      
      if (x1=="2018_19)") x1 ="2018-19";
      if (x1=="2019_20)") x1 ="2019-20";


      if (Y1=="2014_15)") Y1 ="2014-15";
      if (Y1=="2015_16") Y1 ="2015-16";
      if (Y1=="2016_17)") Y1 ="2016-17";
      if (Y1=="2017_18)") Y1 ="2017-18";
      if (Y1=="2018_19)") Y1 ="2018-19";
      if (Y1=="2019_20)") Y1 ="2019-20";

      if (z1=="2014_15)") z1 ="2014-15";
      if (z1=="2015_16)") z1 ="2015-16";
      if (z1=="2016_17)")  z1 ="2016-17";
      if (z1=="2017_18)")  z1 ="2017-18";
      if (z1=="2018_19)")  z1 ="2018-19"; 
      if (z1=="2019_20)")  z1 ="2019-20";

      if (z2=="2014_15)")   z2 ="2014-15";
      if (z2=="2015_16)")  z2 ="2015-16";
      if (z2=="2016_17)")  z2 ="2016-17";
      if (z2=="2017_18)")  z2 ="2017-18";
      if (z2=="2018_19)")  z2 ="2018-19";
      if (z2=="2019_20)") z2 ="2019-20";

      this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
      
       //  this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

             this.Fin_Year14_15 = result[0].FinYear;
             this.Housesinvolved14_15 = result[0].Housesinvolved;
             this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
             this.Houses_Grounde14_15 = result[0].Houses_Grounded;
             this.Houses_Complete14_15 = result[0].Houses_Completed;
             this.HousesOccupied14_15 = result[0].HousesOccupied;
             this.First_Houses14_15 = result[0].First_Houses;
             this.Second_Houses14_15 = result[0].Second_Houses;
             this.Third_Houses14_15 = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

            // 
            try {
              this.Fin_Year15_16 = result[1].FinYear; 
            this.Housesinvolved15_16 = result[1].Housesinvolved;
             this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
             this.Houses_Grounde15_16 = result[1].Houses_Grounded;
             this.Houses_Complete15_16 = result[1].Houses_Completed;
             this.HousesOccupied15_16 = result[1].HousesOccupied;
             this.First_Houses15_16 = result[1].First_Houses;
             this.Second_Houses15_16 = result[1].Second_Houses;
             this.Third_Houses15_16 = result[1].Third_Houses;
          }
          catch{}
          finally{}


          try {
            this.Fin_Year16_17 = result[2].FinYear; 
          this.Housesinvolved16_17 = result[2].Housesinvolved;
           this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
           this.Houses_Grounde16_17 = result[2].Houses_Grounded;
           this.Houses_Complete16_17 = result[2].Houses_Completed;
           this.HousesOccupied16_17 = result[2].HousesOccupied;
           this.First_Houses16_17 = result[2].First_Houses;
           this.Second_Houses16_17 = result[2].Second_Houses;
           this.Third_Houses16_17 = result[2].Third_Houses;
        }
        catch{}
        finally{}

        try {
          this.Fin_Year17_18 = result[3].FinYear; 
        this.Housesinvolved17_18 = result[3].Housesinvolved;
         this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
         this.Houses_Grounde17_18 = result[3].Houses_Grounded;
         this.Houses_Complete17_18 = result[3].Houses_Completed;
         this.HousesOccupied17_18 = result[3].HousesOccupied;
         this.First_Houses17_18 = result[3].First_Houses;
         this.Second_Houses17_18 = result[3].Second_Houses;
         this.Third_Houses17_18 = result[3].Third_Houses;
      }
      catch{}
      finally{}


         let chart = new CanvasJS.Chart("chartPMAYU", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          title: {
            text: "Physical Progress(No of Houses) Consolidated (PMAY(U))",
            fontSize: "25",
          },
          backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
              { label: x1, y: this.Housesinvolved14_15 },
              { label: Y1, y: this.Housesinvolved15_16 },
              { label: z1, y: this.Housesinvolved16_17 },
              { label: z2, y: this.Housesinvolved17_18 }
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
              { label:x1, y: this.FundsDisbursed_in_Houses14_15 },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17 },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18 }
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
              { label: x1, y: this.Houses_Grounde14_15 },
              { label: Y1, y: this.Houses_Grounde15_16 },
              { label: z1, y: this.Houses_Grounde16_17 },
              { label: z2, y: this.Houses_Grounde17_18 }
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
              { label: x1, y: this.Houses_Complete14_15 },
              { label: Y1, y: this.Houses_Complete15_16 },
              { label: z1, y: this.Houses_Complete16_17 },
              { label: z2, y: this.Houses_Complete17_18 }
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
              { label: x1, y: this.HousesOccupied14_15 },
              { label: Y1, y: this.HousesOccupied15_16 },
              { label: z1, y: this.HousesOccupied16_17},
              { label: z2, y: this.HousesOccupied17_18} 
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
              { label: x1, y: this.Second_Houses14_15 },
              { label: Y1, y: this.Second_Houses15_16 },
              { label: z1, y: this.Second_Houses16_17 },
              { label: z2, y: this.Second_Houses17_18 }
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
              { label: x1, y: this.Third_Houses14_15 },
              { label: Y1, y: this.Third_Houses15_16 },
              { label: z1, y: this.Third_Houses16_17 },
              { label: z2, y: this.Third_Houses17_18 }
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
    if (splitted.length ==5)
    {
      if (x1=="2014_15)") x1 ="2014-15";
      if (x1=="2015_16)") x1 ="2015-16";
      if (x1=="2016_17)") x1 ="2016-17";
      if (x1=="2017_18)") x1 ="2017-18";
      
      if (x1=="2018_19)") x1 ="2018-19";
      if (x1=="2019_20)") x1 ="2019-20";


      if (Y1=="2014_15)") Y1 ="2014-15";
      if (Y1=="2015_16") Y1 ="2015-16";
      if (Y1=="2016_17)") Y1 ="2016-17";
      if (Y1=="2017_18)") Y1 ="2017-18";
      if (Y1=="2018_19)") Y1 ="2018-19";
      if (Y1=="2019_20)") Y1 ="2019-20";

      if (z1=="2014_15)") z1 ="2014-15";
      if (z1=="2015_16)") z1 ="2015-16";
      if (z1=="2016_17)")  z1 ="2016-17";
      if (z1=="2017_18)")  z1 ="2017-18";
      if (z1=="2018_19)")  z1 ="2018-19"; 
      if (z1=="2019_20)")  z1 ="2019-20";

      if (z2=="2014_15)")   z2 ="2014-15";
      if (z2=="2015_16)")  z2 ="2015-16";
      if (z2=="2016_17)")  z2 ="2016-17";
      if (z2=="2017_18)")  z2 ="2017-18";
      if (z2=="2018_19)")  z2 ="2018-19";
      if (z2=="2019_20)") z2 ="2019-20";

      if (z3=="2014_15)")   z3 ="2014-15";
      if (z3=="2015_16)")  z3 ="2015-16";
      if (z3=="2016_17)")  z3 ="2016-17";
      if (z3=="2017_18)")  z3 ="2017-18";
      if (z3=="2018_19)")  z3 ="2018-19";
      if (z3=="2019_20)") z3 ="2019-20";
      
      this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
         
     // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

             this.Fin_Year14_15 = result[0].FinYear;
             this.Housesinvolved14_15 = result[0].Housesinvolved;
             this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
             this.Houses_Grounde14_15 = result[0].Houses_Grounded;
             this.Houses_Complete14_15 = result[0].Houses_Completed;
             this.HousesOccupied14_15 = result[0].HousesOccupied;
             this.First_Houses14_15 = result[0].First_Houses;
             this.Second_Houses14_15 = result[0].Second_Houses;
             this.Third_Houses14_15 = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

            // 
            try {
              this.Fin_Year15_16 = result[1].FinYear; 
            this.Housesinvolved15_16 = result[1].Housesinvolved;
             this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
             this.Houses_Grounde15_16 = result[1].Houses_Grounded;
             this.Houses_Complete15_16 = result[1].Houses_Completed;
             this.HousesOccupied15_16 = result[1].HousesOccupied;
             this.First_Houses15_16 = result[1].First_Houses;
             this.Second_Houses15_16 = result[1].Second_Houses;
             this.Third_Houses15_16 = result[1].Third_Houses;
          }
          catch{}
          finally{}


          try {
            this.Fin_Year16_17 = result[2].FinYear; 
          this.Housesinvolved16_17 = result[2].Housesinvolved;
           this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
           this.Houses_Grounde16_17 = result[2].Houses_Grounded;
           this.Houses_Complete16_17 = result[2].Houses_Completed;
           this.HousesOccupied16_17 = result[2].HousesOccupied;
           this.First_Houses16_17 = result[2].First_Houses;
           this.Second_Houses16_17 = result[2].Second_Houses;
           this.Third_Houses16_17 = result[2].Third_Houses;
        }
        catch{}
        finally{}

        try {
          this.Fin_Year17_18 = result[3].FinYear; 
        this.Housesinvolved17_18 = result[3].Housesinvolved;
         this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
         this.Houses_Grounde17_18 = result[3].Houses_Grounded;
         this.Houses_Complete17_18 = result[3].Houses_Completed;
         this.HousesOccupied17_18 = result[3].HousesOccupied;
         this.First_Houses17_18 = result[3].First_Houses;
         this.Second_Houses17_18 = result[3].Second_Houses;
         this.Third_Houses17_18 = result[3].Third_Houses;
      }
      catch{}
      finally{}

      try {
        this.Fin_Year18_19 = result[4].FinYear; 
      this.Housesinvolved18_19 = result[4].Housesinvolved;
       this.FundsDisbursed_in_Houses18_19 = result[4].FundsDisbursed_in_Houses;
       this.Houses_Grounde18_19 = result[4].Houses_Grounded;
       this.Houses_Complete18_19 = result[4].Houses_Completed;
       this.HousesOccupied18_19 = result[4].HousesOccupied;
       this.First_Houses18_19 = result[4].First_Houses;
       this.Second_Houses18_19 = result[4].Second_Houses;
       this.Third_Houses18_19 = result[4].Third_Houses;
    }
    catch{}
    finally{}


         let chart = new CanvasJS.Chart("chartPMAYU", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          title: {
            text: "Physical Progress(No of Houses) Consolidated (PMAY(U))",
            fontSize: "25",
          },
          backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
              { label: x1, y: this.Housesinvolved14_15 },
              { label: Y1, y: this.Housesinvolved15_16 },
              { label: z1, y: this.Housesinvolved16_17 },
              { label: z2, y: this.Housesinvolved17_18 },
              { label: z3, y: this.Housesinvolved18_19 }
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
              { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17 },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18 },
              { label: z3, y: this.FundsDisbursed_in_Houses18_19 }
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
              { label: x1, y: this.Houses_Grounde14_15 },
              { label: Y1, y: this.Houses_Grounde15_16 },
              { label: z1, y: this.Houses_Grounde16_17 },
              { label: z2, y: this.Houses_Grounde17_18 },
              { label: z3, y: this.Houses_Grounde18_19 }
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
              { label: x1, y: this.Houses_Complete14_15 },
              { label: Y1, y: this.Houses_Complete15_16 },
              { label: z1, y: this.Houses_Complete16_17 },
              { label: z2, y: this.Houses_Complete17_18 },
              { label: z3, y: this.Houses_Complete18_19 }
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
              { label: x1, y: this.HousesOccupied14_15 },
              { label: Y1, y: this.HousesOccupied15_16 },
              { label: z1, y: this.HousesOccupied16_17},
              { label:z2, y: this.HousesOccupied17_18},
              { label: z3, y: this.HousesOccupied18_19} 
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
              { label: x1, y: this.Second_Houses14_15 },
              { label: Y1, y: this.Second_Houses15_16 },
              { label: z1, y: this.Second_Houses16_17 },
              { label: z2, y: this.Second_Houses17_18 },
              { label: z3, y: this.Second_Houses18_19 }
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
              { label: x1, y: this.Third_Houses14_15 },
              { label: Y1, y: this.Third_Houses15_16 },
              { label: z1, y: this.Third_Houses16_17 },
              { label: z2, y: this.Third_Houses17_18 },
              { label: z3, y: this.Third_Houses18_19 }
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
    if (splitted.length ==6)
    {
      if (x1=="2014_15)") x1 ="2014-15";
      if (x1=="2015_16)") x1 ="2015-16";
      if (x1=="2016_17)") x1 ="2016-17";
      if (x1=="2017_18)") x1 ="2017-18";
      
      if (x1=="2018_19)") x1 ="2018-19";
      if (x1=="2019_20)") x1 ="2019-20";


      if (Y1=="2014_15)") Y1 ="2014-15";
      if (Y1=="2015_16") Y1 ="2015-16";
      if (Y1=="2016_17)") Y1 ="2016-17";
      if (Y1=="2017_18)") Y1 ="2017-18";
      if (Y1=="2018_19)") Y1 ="2018-19";
      if (Y1=="2019_20)") Y1 ="2019-20";

      if (z1=="2014_15)") z1 ="2014-15";
      if (z1=="2015_16)") z1 ="2015-16";
      if (z1=="2016_17)")  z1 ="2016-17";
      if (z1=="2017_18)")  z1 ="2017-18";
      if (z1=="2018_19)")  z1 ="2018-19"; 
      if (z1=="2019_20)")  z1 ="2019-20";

      if (z2=="2014_15)")   z2 ="2014-15";
      if (z2=="2015_16)")  z2 ="2015-16";
      if (z2=="2016_17)")  z2 ="2016-17";
      if (z2=="2017_18)")  z2 ="2017-18";
      if (z2=="2018_19)")  z2 ="2018-19";
      if (z2=="2019_20)") z2 ="2019-20";

      if (z3=="2014_15)")   z3 ="2014-15";
      if (z3=="2015_16)")  z3 ="2015-16";
      if (z3=="2016_17)")  z3 ="2016-17";
      if (z3=="2017_18)")  z3 ="2017-18";
      if (z3=="2018_19)")  z3 ="2018-19";
      if (z3=="2019_20)") z3 ="2019-20";

      if (z4=="2014_15)")   z4 ="2014-15";
      if (z4=="2015_16)")  z4 ="2015-16";

      if (z4=="2016_17)")  z4 ="2016-17";
      if (z4=="2017_18)")  z4 ="2017-18";
      if (z4=="2018_19)")  z4 ="2018-19";
      if (z4=="2019_20)") z4 ="2019-20";
      

      this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
         
     // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

             this.Fin_Year14_15 = result[0].FinYear;
             this.Housesinvolved14_15 = result[0].Housesinvolved;
             this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
             this.Houses_Grounde14_15 = result[0].Houses_Grounded;
             this.Houses_Complete14_15 = result[0].Houses_Completed;
             this.HousesOccupied14_15 = result[0].HousesOccupied;
             this.First_Houses14_15 = result[0].First_Houses;
             this.Second_Houses14_15 = result[0].Second_Houses;
             this.Third_Houses14_15 = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

            // 
            try {
              this.Fin_Year15_16 = result[1].FinYear; 
            this.Housesinvolved15_16 = result[1].Housesinvolved;
             this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
             this.Houses_Grounde15_16 = result[1].Houses_Grounded;
             this.Houses_Complete15_16 = result[1].Houses_Completed;
             this.HousesOccupied15_16 = result[1].HousesOccupied;
             this.First_Houses15_16 = result[1].First_Houses;
             this.Second_Houses15_16 = result[1].Second_Houses;
             this.Third_Houses15_16 = result[1].Third_Houses;
          }
          catch{}
          finally{}


          try {
            this.Fin_Year16_17 = result[2].FinYear; 
          this.Housesinvolved16_17 = result[2].Housesinvolved;
           this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
           this.Houses_Grounde16_17 = result[2].Houses_Grounded;
           this.Houses_Complete16_17 = result[2].Houses_Completed;
           this.HousesOccupied16_17 = result[2].HousesOccupied;
           this.First_Houses16_17 = result[2].First_Houses;
           this.Second_Houses16_17 = result[2].Second_Houses;
           this.Third_Houses16_17 = result[2].Third_Houses;
        }
        catch{}
        finally{}

        try {
          this.Fin_Year17_18 = result[3].FinYear; 
        this.Housesinvolved17_18 = result[3].Housesinvolved;
         this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
         this.Houses_Grounde17_18 = result[3].Houses_Grounded;
         this.Houses_Complete17_18 = result[3].Houses_Completed;
         this.HousesOccupied17_18 = result[3].HousesOccupied;
         this.First_Houses17_18 = result[3].First_Houses;
         this.Second_Houses17_18 = result[3].Second_Houses;
         this.Third_Houses17_18 = result[3].Third_Houses;
      }
      catch{}
      finally{}

      try {
        this.Fin_Year18_19 = result[4].FinYear; 
      this.Housesinvolved18_19 = result[4].Housesinvolved;
       this.FundsDisbursed_in_Houses18_19 = result[4].FundsDisbursed_in_Houses;
       this.Houses_Grounde18_19 = result[4].Houses_Grounded;
       this.Houses_Complete18_19 = result[4].Houses_Completed;
       this.HousesOccupied18_19 = result[4].HousesOccupied;
       this.First_Houses18_19 = result[4].First_Houses;
       this.Second_Houses18_19 = result[4].Second_Houses;
       this.Third_Houses18_19 = result[4].Third_Houses;
    }
    catch{}
    finally{}

    try {
      this.Fin_Year19_20 = result[5].FinYear; 
    this.Housesinvolved19_20 = result[5].Housesinvolved;
     this.FundsDisbursed_in_Houses19_20 = result[5].FundsDisbursed_in_Houses;
     this.Houses_Grounde19_20 = result[5].Houses_Grounded;
     this.Houses_Complete19_20 = result[5].Houses_Completed;
     this.HousesOccupied19_20 = result[5].HousesOccupied;
     this.First_Houses19_20 = result[5].First_Houses;
     this.Second_Houses19_20 = result[5].Second_Houses;
     this.Third_Houses19_20 = result[5].Third_Houses;
  }
  catch{}
  finally{}

         let chart = new CanvasJS.Chart("chartPMAYU", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          title: {
            text: "Physical Progress(No of Houses) Consolidated (PMAY(U))",
            fontSize: "25",
          },
          backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
              { label: x1, y: this.Housesinvolved14_15 },
              { label: Y1, y: this.Housesinvolved15_16 },
              { label: z1, y: this.Housesinvolved16_17 },
              { label: z2, y: this.Housesinvolved17_18 },
              { label: z3, y: this.Housesinvolved18_19 },
              { label: z4, y: this.Housesinvolved19_20 }
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
              { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17 },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18 },
              { label: z3, y: this.FundsDisbursed_in_Houses18_19 },
              { label: z4, y: this.FundsDisbursed_in_Houses19_20 }
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
              { label:x1, y: this.Houses_Grounde14_15 },
              { label: Y1, y: this.Houses_Grounde15_16 },
              { label: z1, y: this.Houses_Grounde16_17 },
              { label: z2, y: this.Houses_Grounde17_18 },
              { label: z3, y: this.Houses_Grounde18_19 },
              { label: z4, y: this.Houses_Grounde19_20 }
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
              { label: x1, y: this.Houses_Complete14_15 },
              { label: Y1, y: this.Houses_Complete15_16 },
              { label: z1, y: this.Houses_Complete16_17 },
              { label: z2, y: this.Houses_Complete17_18 },
              { label: z3, y: this.Houses_Complete18_19 },
              { label: z4, y: this.Houses_Complete19_20 }
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
              { label: x1, y: this.HousesOccupied14_15 },
              { label: Y1, y: this.HousesOccupied15_16 },
              { label: z1, y: this.HousesOccupied16_17},
              { label: z2, y: this.HousesOccupied17_18},
              { label: z3, y: this.HousesOccupied18_19} ,
              { label: z4, y: this.HousesOccupied19_20} 
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
              { label: x1, y: this.Second_Houses14_15 },
              { label: Y1, y: this.Second_Houses15_16 },
              { label: z1, y: this.Second_Houses16_17 },
              { label: z2, y: this.Second_Houses17_18 },
              { label: z3, y: this.Second_Houses18_19 },
              { label: z4, y: this.Second_Houses19_20 }
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
              { label: x1, y: this.Third_Houses14_15 },
              { label: Y1, y: this.Third_Houses15_16 },
              { label: z1, y: this.Third_Houses16_17 },
              { label: z2, y: this.Third_Houses17_18 },
              { label: z3, y: this.Third_Houses18_19 },
              { label: z4, y: this.Third_Houses19_20 }
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

  BindISSRDatanew(stateCode, DisttCode, cityCode, Fin_Year )
  {

    var str = new String(Fin_Year) ;
    var len = str.length


       //  var str = Fin_Year ; 
        if (len==101)
        {
            var splitted = str.split(",", str.length);
            //alert(splitted[0]);
            var x1 =  splitted[0].substring(8,str.length-3);
            var Y1 =  splitted[1].substring(8,str.length-3);
            var z1 =  splitted[2].substring(8,str.length-3);
            var z2 =  splitted[3].substring(8,str.length-3);
            var z3 =  splitted[4].substring(8,str.length-3);
            var z4 =  splitted[5].substring(8,str.length-3);
        }
        if (len==84)
        {
            var splitted = str.split(",", str.length);
            //alert(splitted[0]);
            var x1 =  splitted[0].substring(8,str.length-3);
            var Y1 =  splitted[1].substring(8,str.length-3);
            var z1 =  splitted[2].substring(8,str.length-3);
            var z2 =  splitted[3].substring(8,str.length-3);
            var z3 =  splitted[4].substring(8,str.length-3);
        }
        if (len==67)
        {
            var splitted = str.split(",", str.length);
            //alert(splitted[0]);
            var x1 =  splitted[0].substring(8,str.length-3);
            var Y1 =  splitted[1].substring(8,str.length-3);
            var z1 =  splitted[2].substring(8,str.length-3);
            var z2 =  splitted[3].substring(8,str.length-3);
           // alert(x1);
          //  alert(Y1); 
        }
        if (len==50)
        {
            var splitted = str.split(",", str.length);
            //alert(splitted[0]);
            var x1 =  splitted[0].substring(8,str.length-3);
            var Y1 =  splitted[1].substring(8,str.length-3);
            var z1 =  splitted[2].substring(8,str.length-3);
           // alert(x1);
          //  alert(Y1); 
        }
        if (len==33)
        {
            var splitted = str.split(",", str.length);
            //alert(splitted[0]);
            var x1 =  splitted[0].substring(8,str.length-3);
            var Y1 =  splitted[1].substring(8,str.length-3);
           // alert(x1);
          //  alert(Y1); 
        }
        if (len==16)
        {
            var splitted = str.split(",", str.length);
  //          alert(splitted[0]);
            var x2 =  splitted[0].substring(8,str.length-1);
  //          alert(splitted.length);
  
        }
      //  let x = stringToSplit.split(" ");
  debugger;
       if (splitted.length ==1)
       {
        if (x2=="2014_15)" || x2=="2014_15")
        x2 ="2014-15";
        if (x2=="2015_16)"  || x2=="2015_16")
        x2 ="2015-16";
        if (x2=="2016_17)" || x2=="2016_17")
        x2 ="2016-17";
        
        if (x2=="2017_18)" || x2=="2017_18")
        x2 ="2017-18";

        if (x2=="2018_19)" || x2=="2018_19")
        x2 ="2018-19";
        if (x2=="2019_20)" || x2=="2019_20")
        x2 ="2019-20";
        
            this.service.sp_create_ISSR_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
              if (result[0].FinYear !="0" )
            {
                this.Fin_Year14_15 = result[0].FinYear;
                this.Housesinvolved14_15 = result[0].Housesinvolved;
                this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
                this.Houses_Grounde14_15 = result[0].Houses_Grounded;
                this.Houses_Complete14_15 = result[0].Houses_Completed;
                this.HousesOccupied14_15 = result[0].HousesOccupied;
                this.First_Houses14_15 = result[0].First_Houses;
                this.Second_Houses14_15 = result[0].Second_Houses;
                this.Third_Houses14_15 = result[0].Third_Houses;
            }
  
            let chart = new CanvasJS.Chart("chartISSR", {
              theme: "light2",
              animationEnabled: true,
              exportEnabled: false,
              title: {
                text: "Physical Progress (Nos) for ISSR under PMAY(U)",
                fontSize: "25",
              },
              backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
                  { label: x2, y: this.Housesinvolved14_15 },
           
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
                  { label:x2, y: this.FundsDisbursed_in_Houses14_15 },
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
                  { label: x2, y: this.Houses_Grounde14_15 },
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
                  { label: x2, y: this.Houses_Complete14_15 },
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
                  { label: x2, y: this.HousesOccupied14_15 },
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
                  { label: x2, y: this.Second_Houses14_15 },
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
                  { label: x2, y: this.Third_Houses14_15 },
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
      if (splitted.length ==2)
      {

        if (x1=="2014_15)") x1 ="2014-15";
        if (x1=="2015_16)") x1 ="2015-16";
        if (x1=="2016_17)") x1 ="2017-18";
        if (x1=="2018_19)") x1 ="2018-19";
        if (x1=="2019_20)") x1 ="2019-20";
  
  
        if (Y1=="2014_15)") Y1 ="2014-15";
        if (Y1=="2015_16)") Y1 ="2015-16";
        if (Y1=="2016_17)") Y1 ="2017-18";
        if (Y1=="2018_19)") Y1 ="2018-19";
        if (Y1=="2019_20)") Y1 ="2019-20";
  
         
        this.service.sp_create_ISSR_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
              
        //this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
               this.Fin_Year14_15 = result[0].FinYear;
               this.Housesinvolved14_15 = result[0].Housesinvolved;
               this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
               this.Houses_Grounde14_15 = result[0].Houses_Grounded;
               this.Houses_Complete14_15 = result[0].Houses_Completed;
               this.HousesOccupied14_15 = result[0].HousesOccupied;
               this.First_Houses14_15 = result[0].First_Houses;
               this.Second_Houses14_15 = result[0].Second_Houses;
               this.Third_Houses14_15 = result[0].Third_Houses;
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16 = result[1].FinYear; 
              this.Housesinvolved15_16 = result[1].Housesinvolved;
               this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
               this.Houses_Grounde15_16 = result[1].Houses_Grounded;
               this.Houses_Complete15_16 = result[1].Houses_Completed;
               this.HousesOccupied15_16 = result[1].HousesOccupied;
               this.First_Houses15_16 = result[1].First_Houses;
               this.Second_Houses15_16 = result[1].Second_Houses;
               this.Third_Houses15_16 = result[1].Third_Houses;
            }
            catch{}
            finally{}
  
  
           let chart = new CanvasJS.Chart("chartISSR", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Progress (Nos) for ISSR under PMAY(U)",
              fontSize: "25",
            },
            backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
                { label: x1, y: this.Housesinvolved14_15 },
                { label: Y1, y: this.Housesinvolved15_16 }
  
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
                { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16 }
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
                { label: x1, y: this.Houses_Grounde14_15 },
                { label: Y1, y: this.Houses_Grounde15_16 }
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
                { label: x1, y: this.Houses_Complete14_15 },
                { label: Y1, y: this.Houses_Complete15_16 }
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
                { label: x1, y: this.HousesOccupied14_15 },
                { label: Y1, y: this.HousesOccupied15_16 }
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
                { label: x1, y: this.Second_Houses14_15 },
                { label: Y1, y: this.Second_Houses15_16 }
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
                { label: x1, y: this.Third_Houses14_15 },
                { label: Y1, y: this.Third_Houses15_16 }
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
      if (splitted.length ==3)
      {
        if (x1=="2014_15)") x1 ="2014-15";
        if (x1=="2015_16)") x1 ="2015-16";
        if (x1=="2016_17)") x1 ="2016-17";
        if (x1=="2017_18)") x1 ="2017-18";
        if (x1=="2018_19)") x1 ="2018-19";
        if (x1=="2019_20)") x1 ="2019-20";
  
  
        if (Y1=="2014_15)") Y1 ="2014-15";
        if (Y1=="2015_16)") Y1 ="2015-16";
        if (Y1=="2016_17)") Y1 ="2016-17";
        if (Y1=="2017_18)") Y1 ="2017-18";
        if (Y1=="2018_19)") Y1 ="2018-19";
        if (Y1=="2019_20)") Y1 ="2019-20";
  
        if (z1=="2014_15)") z1 ="2014-15";
        if (z1=="2015_16)") z1 ="2015-16";

        if (z1=="2016_17)")  z1 ="2016-17";
        if (z1=="2017_18)")  z1 ="2017-18";
        
        if (z1=="2018_19)")  z1 ="2018-19"; 
        if (z1=="2019_20)")  z1 ="2019-20";
  
 
  
        this.service.sp_create_ISSR_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        
        //   this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
               this.Fin_Year14_15 = result[0].FinYear;
               this.Housesinvolved14_15 = result[0].Housesinvolved;
               this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
               this.Houses_Grounde14_15 = result[0].Houses_Grounded;
               this.Houses_Complete14_15 = result[0].Houses_Completed;
               this.HousesOccupied14_15 = result[0].HousesOccupied;
               this.First_Houses14_15 = result[0].First_Houses;
               this.Second_Houses14_15 = result[0].Second_Houses;
               this.Third_Houses14_15 = result[0].Third_Houses;
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16 = result[1].FinYear; 
              this.Housesinvolved15_16 = result[1].Housesinvolved;
               this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
               this.Houses_Grounde15_16 = result[1].Houses_Grounded;
               this.Houses_Complete15_16 = result[1].Houses_Completed;
               this.HousesOccupied15_16 = result[1].HousesOccupied;
               this.First_Houses15_16 = result[1].First_Houses;
               this.Second_Houses15_16 = result[1].Second_Houses;
               this.Third_Houses15_16 = result[1].Third_Houses;
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17 = result[2].FinYear; 
            this.Housesinvolved16_17 = result[2].Housesinvolved;
             this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
             this.Houses_Grounde16_17 = result[2].Houses_Grounded;
             this.Houses_Complete16_17 = result[2].Houses_Completed;
             this.HousesOccupied16_17 = result[2].HousesOccupied;
             this.First_Houses16_17 = result[2].First_Houses;
             this.Second_Houses16_17 = result[2].Second_Houses;
             this.Third_Houses16_17 = result[2].Third_Houses;
          }
          catch{}
          finally{}
  
  
           let chart = new CanvasJS.Chart("chartISSR", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Progress (Nos) for ISSR under PMAY(U)",
              fontSize: "25",
            },
            backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
                { label: x1, y: this.Housesinvolved14_15 },
                { label: Y1, y: this.Housesinvolved15_16 },
                { label:z1, y: this.Housesinvolved16_17 }
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
                { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17 }
  
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
                { label: x1, y: this.Houses_Grounde14_15 },
                { label: Y1, y: this.Houses_Grounde15_16 },
                { label: z1, y: this.Houses_Grounde16_17 }
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
                { label: x1, y: this.Houses_Complete14_15 },
                { label: Y1, y: this.Houses_Complete15_16 },
                { label: z1, y: this.Houses_Complete16_17 }
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
                { label: x1, y: this.HousesOccupied14_15 },
                { label: Y1, y: this.HousesOccupied15_16 },
                { label: z1, y: this.HousesOccupied16_17} 
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
                { label: x1, y: this.Second_Houses14_15 },
                { label: Y1, y: this.Second_Houses15_16 },
                { label: z1, y: this.Second_Houses16_17 }
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
                { label: x1, y: this.Third_Houses14_15 },
                { label: Y1, y: this.Third_Houses15_16 },
                { label: z1, y: this.Third_Houses16_17 }
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
  
      if (splitted.length ==4)
      {
        if (x1=="2014_15)") x1 ="2014-15";
        if (x1=="2015_16)") x1 ="2015-16";
        if (x1=="2016_17)") x1 ="2017-18";
      
        if (x1=="2017_18)")  x1 ="2017-18";

        if (x1=="2018_19)") x1 ="2018-19";
        if (x1=="2019_20)") x1 ="2019-20";
  
  
        if (Y1=="2014_15)") Y1 ="2014-15";
        if (Y1=="2015_16)") Y1 ="2015-16";
        if (Y1=="2016_17)") Y1 ="2016-17";
        if (Y1=="2017_18)")  Y1 ="2017-18";
        if (Y1=="2018_19)") Y1 ="2018-19";
        if (Y1=="2019_20)") Y1 ="2019-20";
  
        if (z1=="2014_15)") z1 ="2014-15";
        if (z1=="2015_16)") z1 ="2015-16";
        if (z1=="2016_17)")  z1 ="2016-17";
        if (z1=="2017_18)")  z1 ="2017-18";
        if (z1=="2018_19)")  z1 ="2018-19"; 
        if (z1=="2019_20)")  z1 ="2019-20";
  
        if (z2=="2014_15)")   z2 ="2014-15";
        if (z2=="2015_16)")  z2 ="2015-16";
        if (z2=="2016_17)")  z2 ="2016-17";
        if (z2=="2017_18)")  z2 ="2017-18";
        
        if (z2=="2018_19)")  z2 ="2018-19";
        if (z2=="2019_20)") z2 ="2019-20";
  
 
        this.service.sp_create_ISSR_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        
         //  this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
               this.Fin_Year14_15 = result[0].FinYear;
               this.Housesinvolved14_15 = result[0].Housesinvolved;
               this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
               this.Houses_Grounde14_15 = result[0].Houses_Grounded;
               this.Houses_Complete14_15 = result[0].Houses_Completed;
               this.HousesOccupied14_15 = result[0].HousesOccupied;
               this.First_Houses14_15 = result[0].First_Houses;
               this.Second_Houses14_15 = result[0].Second_Houses;
               this.Third_Houses14_15 = result[0].Third_Houses;
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16 = result[1].FinYear; 
              this.Housesinvolved15_16 = result[1].Housesinvolved;
               this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
               this.Houses_Grounde15_16 = result[1].Houses_Grounded;
               this.Houses_Complete15_16 = result[1].Houses_Completed;
               this.HousesOccupied15_16 = result[1].HousesOccupied;
               this.First_Houses15_16 = result[1].First_Houses;
               this.Second_Houses15_16 = result[1].Second_Houses;
               this.Third_Houses15_16 = result[1].Third_Houses;
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17 = result[2].FinYear; 
            this.Housesinvolved16_17 = result[2].Housesinvolved;
             this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
             this.Houses_Grounde16_17 = result[2].Houses_Grounded;
             this.Houses_Complete16_17 = result[2].Houses_Completed;
             this.HousesOccupied16_17 = result[2].HousesOccupied;
             this.First_Houses16_17 = result[2].First_Houses;
             this.Second_Houses16_17 = result[2].Second_Houses;
             this.Third_Houses16_17 = result[2].Third_Houses;
          }
          catch{}
          finally{}
  
          try {
            this.Fin_Year17_18 = result[3].FinYear; 
          this.Housesinvolved17_18 = result[3].Housesinvolved;
           this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
           this.Houses_Grounde17_18 = result[3].Houses_Grounded;
           this.Houses_Complete17_18 = result[3].Houses_Completed;
           this.HousesOccupied17_18 = result[3].HousesOccupied;
           this.First_Houses17_18 = result[3].First_Houses;
           this.Second_Houses17_18 = result[3].Second_Houses;
           this.Third_Houses17_18 = result[3].Third_Houses;
        }
        catch{}
        finally{}
  
  
           let chart = new CanvasJS.Chart("chartISSR", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Progress (Nos) for ISSR under PMAY(U)",
              fontSize: "25",
            },
            backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
                { label: x1, y: this.Housesinvolved14_15 },
                { label: Y1, y: this.Housesinvolved15_16 },
                { label: z1, y: this.Housesinvolved16_17 },
                { label: z2, y: this.Housesinvolved17_18 }
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
                { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17 },
                { label: z2, y: this.FundsDisbursed_in_Houses17_18 }
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
                { label: x1, y: this.Houses_Grounde14_15 },
                { label: Y1, y: this.Houses_Grounde15_16 },
                { label: z1, y: this.Houses_Grounde16_17 },
                { label: z2, y: this.Houses_Grounde17_18 }
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
                { label: x1 ,y: this.Houses_Complete14_15 },
                { label: Y1, y: this.Houses_Complete15_16 },
                { label: z1, y: this.Houses_Complete16_17 },
                { label: z2, y: this.Houses_Complete17_18 }
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
                { label: x1, y: this.HousesOccupied14_15 },
                { label: Y1, y: this.HousesOccupied15_16 },
                { label: z1, y: this.HousesOccupied16_17},
                { label: z2, y: this.HousesOccupied17_18} 
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
                { label: x1, y: this.Second_Houses14_15 },
                { label: Y1, y: this.Second_Houses15_16 },
                { label: z1, y: this.Second_Houses16_17 },
                { label: z2, y: this.Second_Houses17_18 }
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
                { label: x1, y: this.Third_Houses14_15 },
                { label: Y1, y: this.Third_Houses15_16 },
                { label: z1, y: this.Third_Houses16_17 },
                { label: z2, y: this.Third_Houses17_18 }
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
      if (splitted.length ==5)
      {

        if (x1=="2014_15)") x1 ="2014-15";
        if (x1=="2015_16)") x1 ="2015-16";
        if (x1=="2016_17)") x1 ="2016-17";
        if (x1=="2017_18)") x1 ="2017-18";
        
        if (x1=="2018_19)") x1 ="2018-19";
        if (x1=="2019_20)") x1 ="2019-20";
  
  
        if (Y1=="2014_15)") Y1 ="2014-15";
        if (Y1=="2015_16)") Y1 ="2015-16";
        if (Y1=="2016_17)") Y1 ="2016-17";
        if (Y1=="2017_18)") Y1 ="2017-18";
        
        if (Y1=="2018_19)") Y1 ="2018-19";
        if (Y1=="2019_20)") Y1 ="2019-20";
  
        if (z1=="2014_15)") z1 ="2014-15";
        if (z1=="2015_16)") z1 ="2015-16";
        if (z1=="2016_17)")  z1 ="2016-17";
        if (z1=="2017_18)")  z1 ="2017-18";
        if (z1=="2018_19)")  z1 ="2018-19"; 
        if (z1=="2019_20)")  z1 ="2019-20";
  
        if (z2=="2014_15)")   z2 ="2014-15";
        if (z2=="2015_16)")  z2 ="2015-16";
        if (z2=="2016_17)")  z2 ="2016-17";
        if (z2=="2017_18)")  z2 ="2017-18";
        if (z2=="2018_19)")  z2 ="2018-19";
        if (z2=="2019_20)") z2 ="2019-20";
  
        if (z3=="2014_15)")   z3 ="2014-15";
        if (z3=="2015_16)")  z3 ="2015-16";
        if (z3=="2016_17)")  z3 ="2016-17";
        if (z3=="2017_18)")  z3 ="2017-18";
        
        if (z3=="2018_19)")  z3 ="2018-19";
        if (z3=="2019_20)") z3 ="2019-20";
  
         
        this.service.sp_create_ISSR_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
           
       // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
               this.Fin_Year14_15 = result[0].FinYear;
               this.Housesinvolved14_15 = result[0].Housesinvolved;
               this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
               this.Houses_Grounde14_15 = result[0].Houses_Grounded;
               this.Houses_Complete14_15 = result[0].Houses_Completed;
               this.HousesOccupied14_15 = result[0].HousesOccupied;
               this.First_Houses14_15 = result[0].First_Houses;
               this.Second_Houses14_15 = result[0].Second_Houses;
               this.Third_Houses14_15 = result[0].Third_Houses;
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16 = result[1].FinYear; 
              this.Housesinvolved15_16 = result[1].Housesinvolved;
               this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
               this.Houses_Grounde15_16 = result[1].Houses_Grounded;
               this.Houses_Complete15_16 = result[1].Houses_Completed;
               this.HousesOccupied15_16 = result[1].HousesOccupied;
               this.First_Houses15_16 = result[1].First_Houses;
               this.Second_Houses15_16 = result[1].Second_Houses;
               this.Third_Houses15_16 = result[1].Third_Houses;
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17 = result[2].FinYear; 
            this.Housesinvolved16_17 = result[2].Housesinvolved;
             this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
             this.Houses_Grounde16_17 = result[2].Houses_Grounded;
             this.Houses_Complete16_17 = result[2].Houses_Completed;
             this.HousesOccupied16_17 = result[2].HousesOccupied;
             this.First_Houses16_17 = result[2].First_Houses;
             this.Second_Houses16_17 = result[2].Second_Houses;
             this.Third_Houses16_17 = result[2].Third_Houses;
          }
          catch{}
          finally{}
  
          try {
            this.Fin_Year17_18 = result[3].FinYear; 
          this.Housesinvolved17_18 = result[3].Housesinvolved;
           this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
           this.Houses_Grounde17_18 = result[3].Houses_Grounded;
           this.Houses_Complete17_18 = result[3].Houses_Completed;
           this.HousesOccupied17_18 = result[3].HousesOccupied;
           this.First_Houses17_18 = result[3].First_Houses;
           this.Second_Houses17_18 = result[3].Second_Houses;
           this.Third_Houses17_18 = result[3].Third_Houses;
        }
        catch{}
        finally{}
  
        try {
          this.Fin_Year18_19 = result[4].FinYear; 
        this.Housesinvolved18_19 = result[4].Housesinvolved;
         this.FundsDisbursed_in_Houses18_19 = result[4].FundsDisbursed_in_Houses;
         this.Houses_Grounde18_19 = result[4].Houses_Grounded;
         this.Houses_Complete18_19 = result[4].Houses_Completed;
         this.HousesOccupied18_19 = result[4].HousesOccupied;
         this.First_Houses18_19 = result[4].First_Houses;
         this.Second_Houses18_19 = result[4].Second_Houses;
         this.Third_Houses18_19 = result[4].Third_Houses;
      }
      catch{}
      finally{}
  
  
           let chart = new CanvasJS.Chart("chartISSR", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Progress (Nos) for ISSR under PMAY(U)",
              fontSize: "25",
            },
            backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
              legendText: "Housesinvolved",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                // { x: "14-15", y: this.Fin_Year15_16 },
                { label: x1, y: this.Housesinvolved14_15 },
                { label: Y1, y: this.Housesinvolved15_16 },
                { label: z1, y: this.Housesinvolved16_17 },
                { label: z2, y: this.Housesinvolved17_18 },
                { label:  z3, y: this.Housesinvolved18_19 }
              ]
            },
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "FundsDisbursed_in_Houses",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17 },
                { label: z2, y: this.FundsDisbursed_in_Houses17_18 },
                { label: z3, y: this.FundsDisbursed_in_Houses18_19 }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses_Grounded",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Grounde14_15 },
                { label: Y1, y: this.Houses_Grounde15_16 },
                { label: z1, y: this.Houses_Grounde16_17 },
                { label: z2, y: this.Houses_Grounde17_18 },
                { label: z3, y: this.Houses_Grounde18_19 }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses_Completed",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Complete14_15 },
                { label: Y1, y: this.Houses_Complete15_16 },
                { label: z1, y: this.Houses_Complete16_17 },
                { label:  z2, y: this.Houses_Complete17_18 },
                { label: z3, y: this.Houses_Complete18_19 }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses_Occupied",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.HousesOccupied14_15 },
                { label: Y1, y: this.HousesOccupied15_16 },
                { label: z1, y: this.HousesOccupied16_17},
                { label: z2, y: this.HousesOccupied17_18},
                { label: z3, y: this.HousesOccupied18_19} 
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "First Inst",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.First_Houses14_15 },
                { label: Y1, y: this.First_Houses15_16 },
                { label: z1, y: this.First_Houses16_17 },
                { label: z2, y: this.First_Houses17_18 },
                { label: z3, y: this.First_Houses18_19 }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Second Inst",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label:x1, y: this.Second_Houses14_15 },
                { label: Y1, y: this.Second_Houses15_16 },
                { label: z1, y: this.Second_Houses16_17 },
                { label:  z2, y: this.Second_Houses17_18 },
                { label: z3, y: this.Second_Houses18_19 }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Third Inst",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Third_Houses14_15 },
                { label:Y1, y: this.Third_Houses15_16 },
                { label: z1, y: this.Third_Houses16_17 },
                { label:  z2, y: this.Third_Houses17_18 },
                { label: z3, y: this.Third_Houses18_19 }
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
      if (splitted.length ==6)
      {

        if (x1=="2014_15)") x1 ="2014-15";
      if (x1=="2015_16)") x1 ="2015-16";
      if (x1=="2016_17)") x1 ="2017-18";
      if (x1=="2018_19)") x1 ="2018-19";
      if (x1=="2019_20)") x1 ="2019-20";


      if (Y1=="2014_15)") Y1 ="2014-15";
      if (Y1=="2015_16)") Y1 ="2015-16";
      if (Y1=="2016_17)") Y1 ="2017-18";
      if (Y1=="2018_19)") Y1 ="2018-19";
      if (Y1=="2019_20)") Y1 ="2019-20";

      if (z1=="2014_15)") z1 ="2014-15";
      if (z1=="2015_16)") z1 ="2015-16";
      if (z1=="2016_17)")  z1 ="2017-18";
      if (z1=="2018_19)")  z1 ="2018-19"; 
      if (z1=="2019_20)")  z1 ="2019-20";

      if (z2=="2014_15)")   z2 ="2014-15";
      if (z2=="2015_16)")  z2 ="2015-16";
      if (z2=="2016_17)")  z2 ="2017-18";
      if (z2=="2018_19)")  z2 ="2018-19";
      if (z2=="2019_20)") z2 ="2019-20";

      if (z3=="2014_15)")   z3 ="2014-15";
      if (z3=="2015_16)")  z3 ="2015-16";
      if (z3=="2016_17)")  z3 ="2017-18";
      if (z3=="2018_19)")  z3 ="2018-19";
      if (z3=="2019_20)") z3 ="2019-20";

      if (z4=="2014_15)")   z4 ="2014-15";
      if (z4=="2015_16)")  z4 ="2015-16";
      if (z4=="2016_17)")  z4 ="2017-18";
      if (z4=="2018_19)")  z4 ="2018-19";
      if (z4=="2019_20)") z4 ="2019-20";
        this.service.sp_create_ISSR_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
           
       // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
               this.Fin_Year14_15 = result[0].FinYear;
               this.Housesinvolved14_15 = result[0].Housesinvolved;
               this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
               this.Houses_Grounde14_15 = result[0].Houses_Grounded;
               this.Houses_Complete14_15 = result[0].Houses_Completed;
               this.HousesOccupied14_15 = result[0].HousesOccupied;
               this.First_Houses14_15 = result[0].First_Houses;
               this.Second_Houses14_15 = result[0].Second_Houses;
               this.Third_Houses14_15 = result[0].Third_Houses;
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16 = result[1].FinYear; 
              this.Housesinvolved15_16 = result[1].Housesinvolved;
               this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
               this.Houses_Grounde15_16 = result[1].Houses_Grounded;
               this.Houses_Complete15_16 = result[1].Houses_Completed;
               this.HousesOccupied15_16 = result[1].HousesOccupied;
               this.First_Houses15_16 = result[1].First_Houses;
               this.Second_Houses15_16 = result[1].Second_Houses;
               this.Third_Houses15_16 = result[1].Third_Houses;
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17 = result[2].FinYear; 
            this.Housesinvolved16_17 = result[2].Housesinvolved;
             this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
             this.Houses_Grounde16_17 = result[2].Houses_Grounded;
             this.Houses_Complete16_17 = result[2].Houses_Completed;
             this.HousesOccupied16_17 = result[2].HousesOccupied;
             this.First_Houses16_17 = result[2].First_Houses;
             this.Second_Houses16_17 = result[2].Second_Houses;
             this.Third_Houses16_17 = result[2].Third_Houses;
          }
          catch{}
          finally{}
  
          try {
            this.Fin_Year17_18 = result[3].FinYear; 
          this.Housesinvolved17_18 = result[3].Housesinvolved;
           this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
           this.Houses_Grounde17_18 = result[3].Houses_Grounded;
           this.Houses_Complete17_18 = result[3].Houses_Completed;
           this.HousesOccupied17_18 = result[3].HousesOccupied;
           this.First_Houses17_18 = result[3].First_Houses;
           this.Second_Houses17_18 = result[3].Second_Houses;
           this.Third_Houses17_18 = result[3].Third_Houses;
        }
        catch{}
        finally{}
  
        try {
          this.Fin_Year18_19 = result[4].FinYear; 
        this.Housesinvolved18_19 = result[4].Housesinvolved;
         this.FundsDisbursed_in_Houses18_19 = result[4].FundsDisbursed_in_Houses;
         this.Houses_Grounde18_19 = result[4].Houses_Grounded;
         this.Houses_Complete18_19 = result[4].Houses_Completed;
         this.HousesOccupied18_19 = result[4].HousesOccupied;
         this.First_Houses18_19 = result[4].First_Houses;
         this.Second_Houses18_19 = result[4].Second_Houses;
         this.Third_Houses18_19 = result[4].Third_Houses;
      }
      catch{}
      finally{}
  
      try {
        this.Fin_Year19_20 = result[5].FinYear; 
      this.Housesinvolved19_20 = result[5].Housesinvolved;
       this.FundsDisbursed_in_Houses19_20 = result[5].FundsDisbursed_in_Houses;
       this.Houses_Grounde19_20 = result[5].Houses_Grounded;
       this.Houses_Complete19_20 = result[5].Houses_Completed;
       this.HousesOccupied19_20 = result[5].HousesOccupied;
       this.First_Houses19_20 = result[5].First_Houses;
       this.Second_Houses19_20 = result[5].Second_Houses;
       this.Third_Houses19_20 = result[5].Third_Houses;
    }
    catch{}
    finally{}
  
           let chart = new CanvasJS.Chart("chartISSR", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Progress (Nos) for ISSR under PMAY(U)",
              fontSize: "25",
            },
            backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
              legendText: "Housesinvolved",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                // { x: "14-15", y: this.Fin_Year15_16 },
                { label: x1, y: this.Housesinvolved14_15 },
                { label: Y1, y: this.Housesinvolved15_16 },
                { label: z1, y: this.Housesinvolved16_17 },
                { label: z2, y: this.Housesinvolved17_18 },
                { label: z3, y: this.Housesinvolved18_19 },
                { label: z4, y: this.Housesinvolved19_20 }
              ]
            },
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "FundsDisbursed_in_Houses",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17 },
                { label: z2, y: this.FundsDisbursed_in_Houses17_18 },
                { label: z3, y: this.FundsDisbursed_in_Houses18_19 },
                { label: z4, y: this.FundsDisbursed_in_Houses19_20 }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses_Grounded",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Grounde14_15 },
                { label: Y1, y: this.Houses_Grounde15_16 },
                { label: z1, y: this.Houses_Grounde16_17 },
                { label:z2, y: this.Houses_Grounde17_18 },
                { label: z3, y: this.Houses_Grounde18_19 },
                { label: z4, y: this.Houses_Grounde19_20 }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses_Completed",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Complete14_15 },
                { label: Y1, y: this.Houses_Complete15_16 },
                { label: z1, y: this.Houses_Complete16_17 },
                { label: z2, y: this.Houses_Complete17_18 },
                { label: z3, y: this.Houses_Complete18_19 },
                { label: z4, y: this.Houses_Complete19_20 }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses_Occupied",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.HousesOccupied14_15 },
                { label: Y1, y: this.HousesOccupied15_16 },
                { label: z1, y: this.HousesOccupied16_17},
                { label: z2, y: this.HousesOccupied17_18},
                { label: z3, y: this.HousesOccupied18_19} ,
                { label: z4, y: this.HousesOccupied19_20} 
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "First Inst",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.First_Houses14_15 },
                { label: Y1, y: this.First_Houses15_16 },
                { label: z1, y: this.First_Houses16_17 },
                { label: z2, y: this.First_Houses17_18 },
                { label: z3, y: this.First_Houses18_19 },
                { label: z4, y: this.First_Houses19_20 }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Second Inst",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Second_Houses14_15 },
                { label: Y1, y: this.Second_Houses15_16 },
                { label:z1, y: this.Second_Houses16_17 },
                { label: z2, y: this.Second_Houses17_18 },
                { label: z3, y: this.Second_Houses18_19 },
                { label: z4, y: this.Second_Houses19_20 }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Third Inst",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Third_Houses14_15 },
                { label: Y1, y: this.Third_Houses15_16 },
                { label: z1, y: this.Third_Houses16_17 },
                { label: z2, y: this.Third_Houses17_18 },
                { label: z3, y: this.Third_Houses18_19 },
                { label: z4, y: this.Third_Houses19_20 }
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
  
  
  BindAHP_Datanew(stateCode, DisttCode, cityCode, Fin_Year )
  {
    //debugger ;
    //debugger ;
   // alert('Prabodh');
         var str = Fin_Year ;//'SUM(BENE2014_15),SUM(BENE2015_16)';
        //  alert(str.length);
        if (str.length==101)
        {
            var splitted = str.split(",", str.length);
            //alert(splitted[0]);
            var x1 =  splitted[0].substring(8,str.length-3);
            var Y1 =  splitted[1].substring(8,str.length-3);
            var z1 =  splitted[2].substring(8,str.length-3);
            var z2 =  splitted[3].substring(8,str.length-3);
            var z3 =  splitted[4].substring(8,str.length-3);
            var z4 =  splitted[5].substring(8,str.length-3);
        }
        if (str.length==84)
        {
            var splitted = str.split(",", str.length);
            //alert(splitted[0]);
            var x1 =  splitted[0].substring(8,str.length-3);
            var Y1 =  splitted[1].substring(8,str.length-3);
            var z1 =  splitted[2].substring(8,str.length-3);
            var z2 =  splitted[3].substring(8,str.length-3);
            var z3 =  splitted[4].substring(8,str.length-3);
        }
        if (str.length==67)
        {
            var splitted = str.split(",", str.length);
            //alert(splitted[0]);
            var x1 =  splitted[0].substring(8,str.length-3);
            var Y1 =  splitted[1].substring(8,str.length-3);
            var z1 =  splitted[2].substring(8,str.length-3);
            var z2 =  splitted[3].substring(8,str.length-3);
           // alert(x1);
          //  alert(Y1); 
        }
        if (str.length==50)
        {
            var splitted = str.split(",", str.length);
            //alert(splitted[0]);
            var x1 =  splitted[0].substring(8,str.length-3);
            var Y1 =  splitted[1].substring(8,str.length-3);
            var z1 =  splitted[2].substring(8,str.length-3);
           // alert(x1);
          //  alert(Y1); 
        }
        if (str.length==33)
        {
            var splitted = str.split(",", str.length);
            //alert(splitted[0]);
            var x1 =  splitted[0].substring(8,str.length-3);
            var Y1 =  splitted[1].substring(8,str.length-3);
           // alert(x1);
          //  alert(Y1); 
        }
        if (str.length==16)
        {
            var splitted = str.split(",", str.length);
  //          alert(splitted[0]);
            var x2 =  splitted[0].substring(8,str.length-1);
  //          alert(splitted.length);
  
        }
      //  let x = stringToSplit.split(" ");
      debugger ;
       if (splitted.length ==1)
       {
        if (x2=="2014_15)")
        x2 ="2014-15";
        if (x2=="2015_16)")
        x2 ="2015-16";
        if (x2=="2016_17)")
        x2 ="2017-18";
        if (x2=="2018_19)")
        x2 ="2018-19";
        if (x2=="2019_20)")
        x2 ="2019-20";
            this.service.sp_create_AHP_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
            if (result[0].FinYear !="0" )
            {
              //try{
                this.Fin_Year14_15 = result[0].FinYear;
                this.Housesinvolved14_15 = result[0].Housesinvolved;
                this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
                this.Houses_Grounde14_15 = result[0].Houses_Grounded;
                this.Houses_Complete14_15 = result[0].Houses_Completed;
                this.HousesOccupied14_15 = result[0].HousesOccupied;
                this.First_Houses14_15 = result[0].First_Houses;
                this.Second_Houses14_15 = result[0].Second_Houses;
                this.Third_Houses14_15 = result[0].Third_Houses;
               }
            //   catch{}
            //   finally{}
            // }
            // else 
            // {
            //   this.Fin_Year14_15 =0;
            //   this.Housesinvolved14_15 = 0;
            //   this.FundsDisbursed_in_Houses14_15 = 0;
            //   this.Houses_Grounde14_15 = 0;
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
              title: {
                text: "Physical Progress Nos) for AHP under PMAY(U)",
                fontSize: "25",
              },
              backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
                  { label: x2, y: this.Housesinvolved14_15 },
           
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
                  { label: x2, y: this.FundsDisbursed_in_Houses14_15 },
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
                  { label: x2, y: this.Houses_Grounde14_15 },
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
                  { label: x2, y: this.Houses_Complete14_15 },
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
                  { label: x2, y: this.HousesOccupied14_15 },
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
                  { label: x2, y: this.Second_Houses14_15 },
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
                  { label: x2, y: this.Third_Houses14_15 },
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
        //           { label: x2, y: this.Houses_Grounde14_15 },
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
      if (splitted.length ==2)
      {

        if (x1=="2014_15") x1 ="2014-15";
        if (x1=="2015_16") x1 ="2015-16";
        if (x1=="2016_17") x1 ="2017-18";
        if (x1=="2018_19)") x1 ="2018-19";
        if (x1=="2019_20)") x1 ="2019-20";
  
  
        if (Y1=="2014_15") Y1 ="2014-15";
        if (Y1=="2015_16") Y1 ="2015-16";
        if (Y1=="2016_17") Y1 ="2017-18";
        if (Y1=="2018_19)") Y1 ="2018-19";
        if (Y1=="2019_20)") Y1 ="2019-20";
  
         
        this.service.sp_create_AHP_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
              
        //this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
               this.Fin_Year14_15 = result[0].FinYear;
               this.Housesinvolved14_15 = result[0].Housesinvolved;
               this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
               this.Houses_Grounde14_15 = result[0].Houses_Grounded;
               this.Houses_Complete14_15 = result[0].Houses_Completed;
               this.HousesOccupied14_15 = result[0].HousesOccupied;
               this.First_Houses14_15 = result[0].First_Houses;
               this.Second_Houses14_15 = result[0].Second_Houses;
               this.Third_Houses14_15 = result[0].Third_Houses;
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16 = result[1].FinYear; 
              this.Housesinvolved15_16 = result[1].Housesinvolved;
               this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
               this.Houses_Grounde15_16 = result[1].Houses_Grounded;
               this.Houses_Complete15_16 = result[1].Houses_Completed;
               this.HousesOccupied15_16 = result[1].HousesOccupied;
               this.First_Houses15_16 = result[1].First_Houses;
               this.Second_Houses15_16 = result[1].Second_Houses;
               this.Third_Houses15_16 = result[1].Third_Houses;
            }
            catch{}
            finally{}
  
  
           let chart = new CanvasJS.Chart("chartAHP", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Progress Nos) for AHP under PMAY(U)",
              fontSize: "25",
            },
            backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
                { label: x1, y: this.Housesinvolved14_15 },
                { label: Y1, y: this.Housesinvolved15_16 }
  
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
                { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16 }
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
                { label: x1, y: this.Houses_Grounde14_15 },
                { label: Y1, y: this.Houses_Grounde15_16 }
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
                { label: x1, y: this.Houses_Complete14_15 },
                { label: Y1, y: this.Houses_Complete15_16 }
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
                { label: x1, y: this.HousesOccupied14_15 },
                { label: Y1, y: this.HousesOccupied15_16 }
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
                { label: x1, y: this.Second_Houses14_15 },
                { label: Y1, y: this.Second_Houses15_16 }
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
                { label: x1, y: this.Third_Houses14_15 },
                { label: Y1, y: this.Third_Houses15_16 }
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
      if (splitted.length ==3)
      {

        if (x1=="2014_15") x1 ="2014-15";
        if (x1=="2015_16") x1 ="2015-16";
        if (x1=="2016_17") x1 ="2017-18";
        if (x1=="2018_19") x1 ="2018-19";
        if (x1=="2019_20") x1 ="2019-20";
  
  
        if (Y1=="2014_15") Y1 ="2014-15";
        if (Y1=="2015_16") Y1 ="2015-16";
        if (Y1=="2016_17") Y1 ="2017-18";
        if (Y1=="2018_19") Y1 ="2018-19";
        if (Y1=="2019_20") Y1 ="2019-20";
  
        if (z1=="2014_15") z1 ="2014-15";
        if (z1=="2015_16") z1 ="2015-16";
        if (z1=="2016_17")  z1 ="2017-18";
        if (z1=="2018_19")  z1 ="2018-19"; 
        if (z1=="2019_20")  z1 ="2019-20";
        this.service.sp_create_AHP_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        
        //   this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
               this.Fin_Year14_15 = result[0].FinYear;
               this.Housesinvolved14_15 = result[0].Housesinvolved;
               this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
               this.Houses_Grounde14_15 = result[0].Houses_Grounded;
               this.Houses_Complete14_15 = result[0].Houses_Completed;
               this.HousesOccupied14_15 = result[0].HousesOccupied;
               this.First_Houses14_15 = result[0].First_Houses;
               this.Second_Houses14_15 = result[0].Second_Houses;
               this.Third_Houses14_15 = result[0].Third_Houses;
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16 = result[1].FinYear; 
              this.Housesinvolved15_16 = result[1].Housesinvolved;
               this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
               this.Houses_Grounde15_16 = result[1].Houses_Grounded;
               this.Houses_Complete15_16 = result[1].Houses_Completed;
               this.HousesOccupied15_16 = result[1].HousesOccupied;
               this.First_Houses15_16 = result[1].First_Houses;
               this.Second_Houses15_16 = result[1].Second_Houses;
               this.Third_Houses15_16 = result[1].Third_Houses;
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17 = result[2].FinYear; 
            this.Housesinvolved16_17 = result[2].Housesinvolved;
             this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
             this.Houses_Grounde16_17 = result[2].Houses_Grounded;
             this.Houses_Complete16_17 = result[2].Houses_Completed;
             this.HousesOccupied16_17 = result[2].HousesOccupied;
             this.First_Houses16_17 = result[2].First_Houses;
             this.Second_Houses16_17 = result[2].Second_Houses;
             this.Third_Houses16_17 = result[2].Third_Houses;
          }
          catch{}
          finally{}
  
  
           let chart = new CanvasJS.Chart("chartAHP", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Progress Nos) for AHP under PMAY(U)",
              fontSize: "25",
            },
            backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
                { label: x1, y: this.Housesinvolved14_15 },
                { label:  Y1, y: this.Housesinvolved15_16 },
                { label: z1, y: this.Housesinvolved16_17 }
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
                { label:x1, y: this.FundsDisbursed_in_Houses14_15 },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17 }
  
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
                { label: x1, y: this.Houses_Grounde14_15 },
                { label: Y1, y: this.Houses_Grounde15_16 },
                { label: z1, y: this.Houses_Grounde16_17 }
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
                { label: x1, y: this.Houses_Complete14_15 },
                { label:Y1, y: this.Houses_Complete15_16 },
                { label: z1, y: this.Houses_Complete16_17 }
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
                { label: x1, y: this.HousesOccupied14_15 },
                { label: Y1, y: this.HousesOccupied15_16 },
                { label: z1, y: this.HousesOccupied16_17} 
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
                { label: x1, y: this.Second_Houses14_15 },
                { label: Y1, y: this.Second_Houses15_16 },
                { label: z1, y: this.Second_Houses16_17 }
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
                { label: x1, y: this.Third_Houses14_15 },
                { label: Y1, y: this.Third_Houses15_16 },
                { label: z1, y: this.Third_Houses16_17 }
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
  
      if (splitted.length ==4)
      {
        if (x1=="2014_15") x1 ="2014-15";
        if (x1=="2015_16") x1 ="2015-16";
        if (x1=="2016_17") x1 ="2017-18";
        if (x1=="2018_19") x1 ="2018-19";
        if (x1=="2019_20") x1 ="2019-20";
  
  
        if (Y1=="2014_15") Y1 ="2014-15";
        if (Y1=="2015_16") Y1 ="2015-16";
        if (Y1=="2016_17") Y1 ="2017-18";
        if (Y1=="2018_19") Y1 ="2018-19";
        if (Y1=="2019_20") Y1 ="2019-20";
  
        if (z1=="2014_15") z1 ="2014-15";
        if (z1=="2015_16") z1 ="2015-16";
        if (z1=="2016_17")  z1 ="2017-18";
        if (z1=="2018_19")  z1 ="2018-19"; 
        if (z1=="2019_20")  z1 ="2019-20";
  
        if (z2=="2014_15")   z2 ="2014-15";
        if (z2=="2015_16")  z2 ="2015-16";
        if (z2=="2016_17")  z2 ="2017-18";
        if (z2=="2018_19")  z2 ="2018-19";
        if (z2=="2019_20") z2 ="2019-20";
        this.service.sp_create_AHP_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        
         //  this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
               this.Fin_Year14_15 = result[0].FinYear;
               this.Housesinvolved14_15 = result[0].Housesinvolved;
               this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
               this.Houses_Grounde14_15 = result[0].Houses_Grounded;
               this.Houses_Complete14_15 = result[0].Houses_Completed;
               this.HousesOccupied14_15 = result[0].HousesOccupied;
               this.First_Houses14_15 = result[0].First_Houses;
               this.Second_Houses14_15 = result[0].Second_Houses;
               this.Third_Houses14_15 = result[0].Third_Houses;
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16 = result[1].FinYear; 
              this.Housesinvolved15_16 = result[1].Housesinvolved;
               this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
               this.Houses_Grounde15_16 = result[1].Houses_Grounded;
               this.Houses_Complete15_16 = result[1].Houses_Completed;
               this.HousesOccupied15_16 = result[1].HousesOccupied;
               this.First_Houses15_16 = result[1].First_Houses;
               this.Second_Houses15_16 = result[1].Second_Houses;
               this.Third_Houses15_16 = result[1].Third_Houses;
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17 = result[2].FinYear; 
            this.Housesinvolved16_17 = result[2].Housesinvolved;
             this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
             this.Houses_Grounde16_17 = result[2].Houses_Grounded;
             this.Houses_Complete16_17 = result[2].Houses_Completed;
             this.HousesOccupied16_17 = result[2].HousesOccupied;
             this.First_Houses16_17 = result[2].First_Houses;
             this.Second_Houses16_17 = result[2].Second_Houses;
             this.Third_Houses16_17 = result[2].Third_Houses;
          }
          catch{}
          finally{}
  
          try {
            this.Fin_Year17_18 = result[3].FinYear; 
          this.Housesinvolved17_18 = result[3].Housesinvolved;
           this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
           this.Houses_Grounde17_18 = result[3].Houses_Grounded;
           this.Houses_Complete17_18 = result[3].Houses_Completed;
           this.HousesOccupied17_18 = result[3].HousesOccupied;
           this.First_Houses17_18 = result[3].First_Houses;
           this.Second_Houses17_18 = result[3].Second_Houses;
           this.Third_Houses17_18 = result[3].Third_Houses;
        }
        catch{}
        finally{}
  
  
           let chart = new CanvasJS.Chart("chartAHP", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Progress Nos) for AHP under PMAY(U)",
              fontSize: "25",
            },
            backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
                { label: x1, y: this.Housesinvolved14_15 },
                { label: Y1, y: this.Housesinvolved15_16 },
                { label: z1, y: this.Housesinvolved16_17 },
                { label: z2, y: this.Housesinvolved17_18 }
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
                { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17 },
                { label: z2, y: this.FundsDisbursed_in_Houses17_18 }
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
                { label: x1, y: this.Houses_Grounde14_15 },
                { label: Y1, y: this.Houses_Grounde15_16 },
                { label: z1, y: this.Houses_Grounde16_17 },
                { label: z2, y: this.Houses_Grounde17_18 }
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
                { label: x1, y: this.Houses_Complete14_15 },
                { label: Y1 , y: this.Houses_Complete15_16 },
                { label:z1, y: this.Houses_Complete16_17 },
                { label: z2, y: this.Houses_Complete17_18 }
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
                { label: x1, y: this.HousesOccupied14_15 },
                { label: Y1, y: this.HousesOccupied15_16 },
                { label: z1, y: this.HousesOccupied16_17},
                { label: z2, y: this.HousesOccupied17_18} 
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
                { label: x1, y: this.Second_Houses14_15 },
                { label: Y1, y: this.Second_Houses15_16 },
                { label: z1, y: this.Second_Houses16_17 },
                { label: z2, y: this.Second_Houses17_18 }
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
                { label: x1, y: this.Third_Houses14_15 },
                { label: Y1, y: this.Third_Houses15_16 },
                { label: z1, y: this.Third_Houses16_17 },
                { label: z2, y: this.Third_Houses17_18 }
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
      if (splitted.length ==5)
      {
        if (x1=="2014_15") x1 ="2014-15";
      if (x1=="2015_16") x1 ="2015-16";
      if (x1=="2016_17") x1 ="2017-18";
      if (x1=="2018_19") x1 ="2018-19";
      if (x1=="2019_20") x1 ="2019-20";


      if (Y1=="2014_15") Y1 ="2014-15";
      if (Y1=="2015_16") Y1 ="2015-16";
      if (Y1=="2016_17") Y1 ="2017-18";
      if (Y1=="2018_19") Y1 ="2018-19";
      if (Y1=="2019_20") Y1 ="2019-20";

      if (z1=="2014_15") z1 ="2014-15";
      if (z1=="2015_16") z1 ="2015-16";
      if (z1=="2016_17")  z1 ="2017-18";
      if (z1=="2018_19")  z1 ="2018-19"; 
      if (z1=="2019_20")  z1 ="2019-20";

      if (z2=="2014_15")   z2 ="2014-15";
      if (z2=="2015_16")  z2 ="2015-16";
      if (z2=="2016_17")  z2 ="2017-18";
      if (z2=="2018_19")  z2 ="2018-19";
      if (z2=="2019_20") z2 ="2019-20";

      if (z3=="2014_15")   z3 ="2014-15";
      if (z3=="2015_16")  z3 ="2015-16";
      if (z3=="2016_17")  z3 ="2017-18";
      if (z3=="2018_19")  z3 ="2018-19";
      if (z3=="2019_20") z3 ="2019-20";
        this.service.sp_create_AHP_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
           
       // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
               this.Fin_Year14_15 = result[0].FinYear;
               this.Housesinvolved14_15 = result[0].Housesinvolved;
               this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
               this.Houses_Grounde14_15 = result[0].Houses_Grounded;
               this.Houses_Complete14_15 = result[0].Houses_Completed;
               this.HousesOccupied14_15 = result[0].HousesOccupied;
               this.First_Houses14_15 = result[0].First_Houses;
               this.Second_Houses14_15 = result[0].Second_Houses;
               this.Third_Houses14_15 = result[0].Third_Houses;
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16 = result[1].FinYear; 
              this.Housesinvolved15_16 = result[1].Housesinvolved;
               this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
               this.Houses_Grounde15_16 = result[1].Houses_Grounded;
               this.Houses_Complete15_16 = result[1].Houses_Completed;
               this.HousesOccupied15_16 = result[1].HousesOccupied;
               this.First_Houses15_16 = result[1].First_Houses;
               this.Second_Houses15_16 = result[1].Second_Houses;
               this.Third_Houses15_16 = result[1].Third_Houses;
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17 = result[2].FinYear; 
            this.Housesinvolved16_17 = result[2].Housesinvolved;
             this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
             this.Houses_Grounde16_17 = result[2].Houses_Grounded;
             this.Houses_Complete16_17 = result[2].Houses_Completed;
             this.HousesOccupied16_17 = result[2].HousesOccupied;
             this.First_Houses16_17 = result[2].First_Houses;
             this.Second_Houses16_17 = result[2].Second_Houses;
             this.Third_Houses16_17 = result[2].Third_Houses;
          }
          catch{}
          finally{}
  
          try {
            this.Fin_Year17_18 = result[3].FinYear; 
          this.Housesinvolved17_18 = result[3].Housesinvolved;
           this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
           this.Houses_Grounde17_18 = result[3].Houses_Grounded;
           this.Houses_Complete17_18 = result[3].Houses_Completed;
           this.HousesOccupied17_18 = result[3].HousesOccupied;
           this.First_Houses17_18 = result[3].First_Houses;
           this.Second_Houses17_18 = result[3].Second_Houses;
           this.Third_Houses17_18 = result[3].Third_Houses;
        }
        catch{}
        finally{}
  
        try {
          this.Fin_Year18_19 = result[4].FinYear; 
        this.Housesinvolved18_19 = result[4].Housesinvolved;
         this.FundsDisbursed_in_Houses18_19 = result[4].FundsDisbursed_in_Houses;
         this.Houses_Grounde18_19 = result[4].Houses_Grounded;
         this.Houses_Complete18_19 = result[4].Houses_Completed;
         this.HousesOccupied18_19 = result[4].HousesOccupied;
         this.First_Houses18_19 = result[4].First_Houses;
         this.Second_Houses18_19 = result[4].Second_Houses;
         this.Third_Houses18_19 = result[4].Third_Houses;
      }
      catch{}
      finally{}
  
  
           let chart = new CanvasJS.Chart("chartAHP", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Progress Nos) for AHP under PMAY(U)",
              fontSize: "25",
            },
            backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
                { label: x1, y: this.Housesinvolved14_15 },
                { label: Y1, y: this.Housesinvolved15_16 },
                { label: z1, y: this.Housesinvolved16_17 },
                { label: z2, y: this.Housesinvolved17_18 },
                { label: z3, y: this.Housesinvolved18_19 }
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
                { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17 },
                { label: z2, y: this.FundsDisbursed_in_Houses17_18 },
                { label: z3, y: this.FundsDisbursed_in_Houses18_19 }
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
                { label: x1, y: this.Houses_Grounde14_15 },
                { label: Y1, y: this.Houses_Grounde15_16 },
                { label: z1, y: this.Houses_Grounde16_17 },
                { label: z2, y: this.Houses_Grounde17_18 },
                { label: z3, y: this.Houses_Grounde18_19 }
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
                { label: x1, y: this.Houses_Complete14_15 },
                { label: Y1, y: this.Houses_Complete15_16 },
                { label: z1, y: this.Houses_Complete16_17 },
                { label: z2, y: this.Houses_Complete17_18 },
                { label: z3, y: this.Houses_Complete18_19 }
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
                { label: x1, y: this.HousesOccupied14_15 },
                { label: Y1, y: this.HousesOccupied15_16 },
                { label: z1, y: this.HousesOccupied16_17},
                { label: z2, y: this.HousesOccupied17_18},
                { label: z3, y: this.HousesOccupied18_19} 
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
                { label: x1, y: this.Second_Houses14_15 },
                { label:Y1, y: this.Second_Houses15_16 },
                { label: z1, y: this.Second_Houses16_17 },
                { label: z2, y: this.Second_Houses17_18 },
                { label: z3, y: this.Second_Houses18_19 }
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
                { label: x1, y: this.Third_Houses14_15 },
                { label: Y1, y: this.Third_Houses15_16 },
                { label: z1, y: this.Third_Houses16_17 },
                { label: z2, y: this.Third_Houses17_18 },
                { label: z3, y: this.Third_Houses18_19 }
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
      if (splitted.length ==6)
      {
        if (x1=="2014_15") x1 ="2014-15";
      if (x1=="2015_16") x1 ="2015-16";
      if (x1=="2016_17") x1 ="2017-18";
      if (x1=="2018_19") x1 ="2018-19";
      if (x1=="2019_20") x1 ="2019-20";


      if (Y1=="2014_15") Y1 ="2014-15";
      if (Y1=="2015_16") Y1 ="2015-16";
      if (Y1=="2016_17") Y1 ="2017-18";
      if (Y1=="2018_19") Y1 ="2018-19";
      if (Y1=="2019_20") Y1 ="2019-20";

      if (z1=="2014_15") z1 ="2014-15";
      if (z1=="2015_16") z1 ="2015-16";
      if (z1=="2016_17")  z1 ="2017-18";
      if (z1=="2018_19")  z1 ="2018-19"; 
      if (z1=="2019_20")  z1 ="2019-20";

      if (z2=="2014_15")   z2 ="2014-15";
      if (z2=="2015_16")  z2 ="2015-16";
      if (z2=="2016_17")  z2 ="2017-18";
      if (z2=="2018_19")  z2 ="2018-19";
      if (z2=="2019_20") z2 ="2019-20";

      if (z3=="2014_15")   z3 ="2014-15";
      if (z3=="2015_16")  z3 ="2015-16";
      if (z3=="2016_17")  z3 ="2017-18";
      if (z3=="2018_19")  z3 ="2018-19";
      if (z3=="2019_20") z3 ="2019-20";

      if (z4=="2014_15")   z4 ="2014-15";
      if (z4=="2015_16")  z4 ="2015-16";
      if (z4=="2016_17")  z4 ="2017-18";
      if (z4=="2018_19")  z4 ="2018-19";
        this.service.sp_create_AHP_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
           
       // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
               this.Fin_Year14_15 = result[0].FinYear;
               this.Housesinvolved14_15 = result[0].Housesinvolved;
               this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
               this.Houses_Grounde14_15 = result[0].Houses_Grounded;
               this.Houses_Complete14_15 = result[0].Houses_Completed;
               this.HousesOccupied14_15 = result[0].HousesOccupied;
               this.First_Houses14_15 = result[0].First_Houses;
               this.Second_Houses14_15 = result[0].Second_Houses;
               this.Third_Houses14_15 = result[0].Third_Houses;
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16 = result[1].FinYear; 
              this.Housesinvolved15_16 = result[1].Housesinvolved;
               this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
               this.Houses_Grounde15_16 = result[1].Houses_Grounded;
               this.Houses_Complete15_16 = result[1].Houses_Completed;
               this.HousesOccupied15_16 = result[1].HousesOccupied;
               this.First_Houses15_16 = result[1].First_Houses;
               this.Second_Houses15_16 = result[1].Second_Houses;
               this.Third_Houses15_16 = result[1].Third_Houses;
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17 = result[2].FinYear; 
            this.Housesinvolved16_17 = result[2].Housesinvolved;
             this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
             this.Houses_Grounde16_17 = result[2].Houses_Grounded;
             this.Houses_Complete16_17 = result[2].Houses_Completed;
             this.HousesOccupied16_17 = result[2].HousesOccupied;
             this.First_Houses16_17 = result[2].First_Houses;
             this.Second_Houses16_17 = result[2].Second_Houses;
             this.Third_Houses16_17 = result[2].Third_Houses;
          }
          catch{}
          finally{}
  
          try {
            this.Fin_Year17_18 = result[3].FinYear; 
          this.Housesinvolved17_18 = result[3].Housesinvolved;
           this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
           this.Houses_Grounde17_18 = result[3].Houses_Grounded;
           this.Houses_Complete17_18 = result[3].Houses_Completed;
           this.HousesOccupied17_18 = result[3].HousesOccupied;
           this.First_Houses17_18 = result[3].First_Houses;
           this.Second_Houses17_18 = result[3].Second_Houses;
           this.Third_Houses17_18 = result[3].Third_Houses;
        }
        catch{}
        finally{}
  
        try {
          this.Fin_Year18_19 = result[4].FinYear; 
        this.Housesinvolved18_19 = result[4].Housesinvolved;
         this.FundsDisbursed_in_Houses18_19 = result[4].FundsDisbursed_in_Houses;
         this.Houses_Grounde18_19 = result[4].Houses_Grounded;
         this.Houses_Complete18_19 = result[4].Houses_Completed;
         this.HousesOccupied18_19 = result[4].HousesOccupied;
         this.First_Houses18_19 = result[4].First_Houses;
         this.Second_Houses18_19 = result[4].Second_Houses;
         this.Third_Houses18_19 = result[4].Third_Houses;
      }
      catch{}
      finally{}
  
      try {
        this.Fin_Year19_20 = result[5].FinYear; 
      this.Housesinvolved19_20 = result[5].Housesinvolved;
       this.FundsDisbursed_in_Houses19_20 = result[5].FundsDisbursed_in_Houses;
       this.Houses_Grounde19_20 = result[5].Houses_Grounded;
       this.Houses_Complete19_20 = result[5].Houses_Completed;
       this.HousesOccupied19_20 = result[5].HousesOccupied;
       this.First_Houses19_20 = result[5].First_Houses;
       this.Second_Houses19_20 = result[5].Second_Houses;
       this.Third_Houses19_20 = result[5].Third_Houses;
    }
    catch{}
    finally{}

           let chart = new CanvasJS.Chart("chartAHP", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Progress Nos) for AHP under PMAY(U)",
              fontSize: "25",
            },
            backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
              legendText: "Housesinvolved",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                // { x: "14-15", y: this.Fin_Year15_16 },
                { label: x1, y: this.Housesinvolved14_15 },
                { label: Y1, y: this.Housesinvolved15_16 },
                { label: z1, y: this.Housesinvolved16_17 },
                { label: z2, y: this.Housesinvolved17_18 },
                { label: z3, y: this.Housesinvolved18_19 },
                { label: z4, y: this.Housesinvolved19_20 } 
              ]
            },
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "FundsDisbursed_in_Houses",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17 },
                { label: z2, y: this.FundsDisbursed_in_Houses17_18 },
                { label: z3, y: this.FundsDisbursed_in_Houses18_19 },
                { label: z4, y: this.FundsDisbursed_in_Houses19_20 }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses_Grounded",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Grounde14_15 },
                { label: Y1, y: this.Houses_Grounde15_16 },
                { label:z1, y: this.Houses_Grounde16_17 },
                { label: z2, y: this.Houses_Grounde17_18 },
                { label: z3, y: this.Houses_Grounde18_19 },
                { label: z4, y: this.Houses_Grounde19_20 }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses_Completed",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Complete14_15 },
                { label: Y1, y: this.Houses_Complete15_16 },
                { label:z1, y: this.Houses_Complete16_17 },
                { label: z2, y: this.Houses_Complete17_18 },
                { label: z3, y: this.Houses_Complete18_19 },
                { label: z4, y: this.Houses_Complete19_20 }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses_Occupied",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.HousesOccupied14_15 },
                { label: Y1, y: this.HousesOccupied15_16 },
                { label: z1, y: this.HousesOccupied16_17},
                { label: z2, y: this.HousesOccupied17_18},
                { label: z3, y: this.HousesOccupied18_19},
                { label: z4, y: this.HousesOccupied19_20} 
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "First Inst",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.First_Houses14_15 },
                { label: Y1, y: this.First_Houses15_16 },
                { label: z1, y: this.First_Houses16_17 },
                { label:z2, y: this.First_Houses17_18 },
                { label: z3, y: this.First_Houses18_19 },
                { label: z4, y: this.First_Houses19_20 }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Second Inst",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Second_Houses14_15 },
                { label: Y1, y: this.Second_Houses15_16 },
                { label: z1, y: this.Second_Houses16_17 },
                { label: z2, y: this.Second_Houses17_18 },
                { label: z3, y: this.Second_Houses18_19 },
                { label:z4, y: this.Second_Houses19_20 }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Third Inst",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Third_Houses14_15 },
                { label: Y1, y: this.Third_Houses15_16 },
                { label: z1, y: this.Third_Houses16_17 },
                { label: z2, y: this.Third_Houses17_18 },
                { label: z3, y: this.Third_Houses18_19 },
                { label: z4, y: this.Third_Houses19_20 }
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
                  backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
                  colorSet: "greenShades",

                  data: [{
                    backgroundColor: this.backgroundColor,//"#B3E5FC",
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

 
BindBLC_Data(stateCode, DisttCode, cityCode,Comp ,Fin_Year)
{

      Comp ="BLCS";
      this.service.sp_create_BLC_AHP_DATA(stateCode, DisttCode, cityCode,Comp).subscribe(result => { // new code
      ///first row data
      this.Fin_Year14_15 = result[0].FinYear;
      this.Housesinvolved14_15 = result[0].Housesinvolved;
      this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
      this.Houses_Grounde14_15 = result[0].Houses_Grounded;
      this.Houses_Complete14_15 = result[0].Houses_Completed;
      this.HousesOccupied14_15= result[0].HousesOccupied;

      this.First_Houses14_15 = result[0].First_Houses;
      this.Second_Houses14_15 = result[0].Second_Houses;
      this.Third_Houses14_15 = result[0].Third_Houses;

      //second row data
      this.Fin_Year15_16 = result[1].FinYear;
      this.Housesinvolved15_16 = result[1].Housesinvolved;
      this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
      this.Houses_Grounde15_16 = result[1].Houses_Grounded;
      this.Houses_Complete15_16 = result[1].Houses_Completed;
      this.HousesOccupied15_16= result[1].HousesOccupied;
      this.First_Houses15_16 = result[1].First_Houses;
      this.Second_Houses15_16 = result[1].Second_Houses;
      this.Third_Houses15_16 = result[1].Third_Houses;

      //Third row data
      this.Fin_Year16_17 = result[2].FinYear;
      this.Housesinvolved16_17 = result[2].Housesinvolved;
      this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
      this.Houses_Grounde16_17 = result[2].Houses_Grounded;
      this.Houses_Complete16_17 = result[2].Houses_Completed;
      this.HousesOccupied16_17= result[2].HousesOccupied;
      this.First_Houses16_17 = result[2].First_Houses;
      this.Second_Houses16_17 = result[2].Second_Houses;
      this.Third_Houses16_17 = result[2].Third_Houses;

      //Fourth row data
      this.Fin_Year17_18 = result[3].FinYear;
      this.Housesinvolved17_18 = result[3].Housesinvolved;
      this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
      this.Houses_Grounde17_18 = result[3].Houses_Grounded;
      this.Houses_Complete17_18 = result[3].Houses_Completed;
      this.HousesOccupied17_18= result[3].HousesOccupied;
      this.First_Houses17_18 = result[3].First_Houses;
      this.Second_Houses17_18 = result[3].Second_Houses;
      this.Third_Houses17_18 = result[3].Third_Houses;

      //Fifth row data
      this.Fin_Year18_19 = result[4].FinYear;
      this.Housesinvolved18_19 = result[4].Housesinvolved;
      this.FundsDisbursed_in_Houses18_19 = result[4].FundsDisbursed_in_Houses;
      this.Houses_Grounde18_19 = result[4].Houses_Grounded;
      this.Houses_Complete18_19 = result[4].Houses_Completed;
      this.HousesOccupied18_19= result[4].HousesOccupied;
      this.First_Houses18_19 = result[4].First_Houses;
      this.Second_Houses18_19 = result[4].Second_Houses;
      this.Third_Houses18_19 = result[4].Third_Houses;

 //          debugger;
            //Sixth row data
            this.Fin_Year19_20 = result[5].FinYear;
            this.Housesinvolved19_20 = result[5].Housesinvolved;
            this.FundsDisbursed_in_Houses19_20 = result[5].FundsDisbursed_in_Houses;
            this.Houses_Grounde19_20 = result[5].Houses_Grounded;
            this.Houses_Complete19_20 = result[5].Houses_Completed;
            this.HousesOccupied19_20= result[5].HousesOccupied;
            this.First_Houses19_20 = result[5].First_Houses;
            this.Second_Houses19_20 = result[5].Second_Houses;
            this.Third_Houses19_20 = result[5].Third_Houses;

            this.Test(Fin_Year);

                  let chartBLCS = new CanvasJS.Chart("chartBLCS", {
                    theme: "light2",
                    animationEnabled: true,
                    exportEnabled: false,
                    title: {
                      text: "Physical Progress(Nos) for  BLC under PMAY(U)",
                      fontSize: "25",
                    },
                    backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
                        { label: "2014-15", y: this.Housesinvolved14_15 },
                        { label: "2015-16", y: this.Housesinvolved15_16 },
                        { label: "2016-17", y: this.Housesinvolved16_17 },
                        { label: "2017-18", y: this.Housesinvolved17_18 },
                        { label: "2018-19", y: this.Housesinvolved18_19 },
                        { label: "2019-20", y: this.Housesinvolved19_20 }
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
                        { label: "2014-15", y: this.FundsDisbursed_in_Houses14_15 },
                        { label: "2015-16", y: this.FundsDisbursed_in_Houses15_16 },
                        { label: "2016-17", y: this.FundsDisbursed_in_Houses16_17 },
                        { label: "2017-18", y: this.FundsDisbursed_in_Houses17_18 },
                        { label: "2018-19", y: this.FundsDisbursed_in_Houses18_19 },
                        { label: "2019-20", y: this.FundsDisbursed_in_Houses19_20 }
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
                        { label: "2014-15", y: this.Houses_Grounde14_15 },
                        { label: "2015-16", y: this.Houses_Grounde15_16 },
                        { label: "2016-17", y: this.Houses_Grounde16_17 },
                        { label: "2017-18", y: this.Houses_Grounde17_18 },
                        { label: "2018-19", y: this.Houses_Grounde18_19 },
                        { label: "2019-20", y: this.Houses_Grounde19_20 }
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
                        { label: "2014-15", y: this.Houses_Complete14_15 },
                        { label: "2015-16", y: this.Houses_Complete15_16 },
                        { label: "2016-17", y: this.Houses_Complete16_17 },
                        { label: "2017-18", y: this.Houses_Complete17_18 },
                        { label: "2018-19", y: this.Houses_Complete18_19 },
                        { label: "2019-20", y: this.Houses_Complete19_20 }
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
                        { label: "2014-15", y: this.HousesOccupied14_15 },
                        { label: "2015-16", y: this.HousesOccupied15_16 },
                        { label: "2016-17", y: this.HousesOccupied16_17 },
                        { label: "2017-18", y: this.HousesOccupied17_18 },
                        { label: "2018-19", y: this.HousesOccupied18_19 },
                        { label: "2019-20", y: this.HousesOccupied19_20 }
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
                        { label: "2014-15", y: this.Second_Houses14_15 },
                        { label: "2015-16", y: this.Second_Houses15_16 },
                        { label: "2016-17", y: this.Second_Houses16_17 },
                        { label: "2017-18", y: this.Second_Houses17_18 },
                        { label: "2018-19", y: this.Second_Houses18_19 },
                        { label: "2019-20", y: this.Second_Houses19_20 }
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
                        { label: "2014-15", y: this.Third_Houses14_15 },
                        { label: "2015-16", y: this.Third_Houses15_16 },
                        { label: "2016-17", y: this.Third_Houses16_17 },
                        { label: "2017-18", y: this.Third_Houses17_18 },
                        { label: "2018-19", y: this.Third_Houses18_19 },
                        { label: "2019-20", y: this.Third_Houses19_20 }
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


BindBLC_DataNew(stateCode, DisttCode, cityCode,Comp ,Fin_Year)
{
 // alert('pm');
 // Comp ="BLCS";
  var str = Fin_Year ;//'SUM(BENE2014_15),SUM(BENE2015_16)';
       // alert(str.length);
      
      if (str.length==101)
      {
          var splitted = str.split(",", str.length);
          //alert(splitted[0]);
          var x1 =  splitted[0].substring(8,str.length-3);
          var Y1 =  splitted[1].substring(8,str.length-3);
          var z1 =  splitted[2].substring(8,str.length-3);
          var z2 =  splitted[3].substring(8,str.length-3);
          var z3 =  splitted[4].substring(8,str.length-3);
          var z4 =  splitted[5].substring(8,str.length-3);
      }
      if (str.length==84)
      {
          var splitted = str.split(",", str.length);
          //alert(splitted[0]);
          var x1 =  splitted[0].substring(8,str.length-3);
          var Y1 =  splitted[1].substring(8,str.length-3);
          var z1 =  splitted[2].substring(8,str.length-3);
          var z2 =  splitted[3].substring(8,str.length-3);
          var z3 =  splitted[4].substring(8,str.length-3);
      }
      if (str.length==67)
      {
          var splitted = str.split(",", str.length);
          //alert(splitted[0]);
          var x1 =  splitted[0].substring(8,str.length-3);
          var Y1 =  splitted[1].substring(8,str.length-3);
          var z1 =  splitted[2].substring(8,str.length-3);
          var z2 =  splitted[3].substring(8,str.length-3);
         // alert(x1);
        //  alert(Y1); 
      }
      if (str.length==50)
      {
          var splitted = str.split(",", str.length);
          //alert(splitted[0]);
          var x1 =  splitted[0].substring(8,str.length-3);
          var Y1 =  splitted[1].substring(8,str.length-3);
          var z1 =  splitted[2].substring(8,str.length-3);
         // alert(x1);
        //  alert(Y1); 
      }
      if (str.length==33)
      {
          var splitted = str.split(",", str.length);
          //alert(splitted[0]);
          var x1 =  splitted[0].substring(8,str.length-3);
          var Y1 =  splitted[1].substring(8,str.length-3);
         // alert(x1);
        //  alert(Y1); 
      }
      if (str.length==16)
      {
          var splitted = str.split(",", str.length);
//          alert(splitted[0]);
          var x2 =  splitted[0].substring(8,str.length-1);
//          alert(splitted.length);

      }
    //  let x = stringToSplit.split(" ");

     if (splitted.length ==1)
     {

      if (x2=="2014_15")
        x2 ="2014-15";
        if (x2=="2015_16")
        x2 ="2015-16";
        if (x2=="2016_17")
        x2 ="2017-18";
        if (x2=="2018_19)")
        x2 ="2018-19";
        if (x2=="2019_20)")
        x2 ="2019-20";
          this.service.sp_create_BLC_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { 
         // this.service.sp_create_BLC_AHP_DATA(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
            if (result[0].FinYear !="0" )
          {

              this.Fin_Year14_15 = result[0].FinYear;
              this.Housesinvolved14_15 = result[0].Housesinvolved;
              this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
              this.Houses_Grounde14_15 = result[0].Houses_Grounded;
              this.Houses_Complete14_15 = result[0].Houses_Completed;
              this.HousesOccupied14_15 = result[0].HousesOccupied;
              this.First_Houses14_15 = result[0].First_Houses;
              this.Second_Houses14_15 = result[0].Second_Houses;
              this.Third_Houses14_15 = result[0].Third_Houses;
          }

          let chart = new CanvasJS.Chart("chartBLCS", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Progress(Nos) for BLC under PMAY(U)",
              fontSize: "25",
            },
            backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
                { label: x2, y: this.Housesinvolved14_15 },
         
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
                { label: x2, y: this.FundsDisbursed_in_Houses14_15 },
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
                { label: x2, y: this.Houses_Grounde14_15 },
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
                { label: x2, y: this.Houses_Complete14_15 },
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
                { label: x2, y: this.HousesOccupied14_15 },
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
                { label: x2, y: this.Second_Houses14_15 },
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
                { label: x2, y: this.Third_Houses14_15 },
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
      //           { label: x2, y: this.Houses_Grounde14_15 },
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
    if (splitted.length ==2)
    {

      if (x1=="2014_15)" ||x1=="2014_15")
      x1 ="2014-15";
      if (x1=="2015_16)" ||x1=="2015_16")
      x1 ="2015-16";
      if (x1=="2016_17" ||x1=="2016_17)")
      x1 ="2017-18";
      if (x1=="2018_19" ||x1=="2018_19)")
      x1 ="2018-19";
      if (x1=="2019_20" ||x1=="2019_20)")
      x1 ="2019-20";


      if (Y1=="2014_15)" || Y1=="2014_15")
      Y1 ="2014-15";
      if (Y1=="2015_16)" ||Y1=="2015_16")
      Y1 ="2015-16";
      if (Y1=="2016_17" || Y1=="2016_17)")
      Y1 ="2017-18";
      if (Y1=="2018_19" ||Y1=="2018_19)")
      Y1 ="2018-19";
      if (Y1=="2019_20" || Y1=="2019_20)")
      Y1 ="2019-20";
         this.service.sp_create_BLC_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

             this.Fin_Year14_15 = result[0].FinYear;
             this.Housesinvolved14_15 = result[0].Housesinvolved;
             this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
             this.Houses_Grounde14_15 = result[0].Houses_Grounded;
             this.Houses_Complete14_15 = result[0].Houses_Completed;
             this.HousesOccupied14_15 = result[0].HousesOccupied;
             this.First_Houses14_15 = result[0].First_Houses;
             this.Second_Houses14_15 = result[0].Second_Houses;
             this.Third_Houses14_15 = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

            // 
            try {
              this.Fin_Year15_16 = result[1].FinYear; 
            this.Housesinvolved15_16 = result[1].Housesinvolved;
             this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
             this.Houses_Grounde15_16 = result[1].Houses_Grounded;
             this.Houses_Complete15_16 = result[1].Houses_Completed;
             this.HousesOccupied15_16 = result[1].HousesOccupied;
             this.First_Houses15_16 = result[1].First_Houses;
             this.Second_Houses15_16 = result[1].Second_Houses;
             this.Third_Houses15_16 = result[1].Third_Houses;
          }
          catch{}
          finally{}


         let chart = new CanvasJS.Chart("chartBLCS", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          title: {
            text: "Physical Progress(Nos) for BLC under PMAY(U)",
            fontSize: "25",
          },
          backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
              { label:x1, y: this.Housesinvolved14_15 },
              { label: Y1, y: this.Housesinvolved15_16 }

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
              { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16 }
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
              { label: x1, y: this.Houses_Grounde14_15 },
              { label:Y1, y: this.Houses_Grounde15_16 }
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
              { label: x1, y: this.Houses_Complete14_15 },
              { label: Y1, y: this.Houses_Complete15_16 }
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
              { label: x1, y: this.HousesOccupied14_15 },
              { label: Y1, y: this.HousesOccupied15_16 }
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
              { label: x1, y: this.Second_Houses14_15 },
              { label: Y1, y: this.Second_Houses15_16 }
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
              { label: x1, y: this.Third_Houses14_15 },
              { label: Y1, y: this.Third_Houses15_16 }
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
    if (splitted.length ==3)
    {

      if (x1=="2014_15)" ||x1=="2014_15")
      x1 ="2014-15";
      if (x1=="2015_16)" ||x1=="2015_16")
      x1 ="2015-16";
      if (x1=="2016_17" || x1=="2016_17)")
      x1 ="2017-18";
      if (x1=="2018_19" ||x1=="2018_19)")
      x1 ="2018-19";
      if (x1=="2019_20" || x1=="2019_20)")
      x1 ="2019-20";


      if (Y1=="2014_15)" || Y1=="2014_15")
      Y1 ="2014-15";
      if (Y1=="2015_16)" || Y1=="2015_16")
      Y1 ="2015-16";
      if (Y1=="2016_17" || Y1=="2016_17)")
      Y1 ="2017-18";
      if (Y1=="2018_19" ||Y1=="2018_19)")
      Y1 ="2018-19";
      if (Y1=="2019_20" ||Y1=="2019_20)")
      Y1 ="2019-20";

      if (z1=="2014_15)")
      z1 ="2014-15";
      if (z1=="2015_16)")
      z1 ="2015-16";
      if (z1=="2016_17")
      z1 ="2017-18";
      if (z1=="2018_19")
      z1 ="2018-19";
      if (z1=="2019_20")
      z1 ="2019-20";

         this.service.sp_create_BLC_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

             this.Fin_Year14_15 = result[0].FinYear;
             this.Housesinvolved14_15 = result[0].Housesinvolved;
             this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
             this.Houses_Grounde14_15 = result[0].Houses_Grounded;
             this.Houses_Complete14_15 = result[0].Houses_Completed;
             this.HousesOccupied14_15 = result[0].HousesOccupied;
             this.First_Houses14_15 = result[0].First_Houses;
             this.Second_Houses14_15 = result[0].Second_Houses;
             this.Third_Houses14_15 = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

            // 
            try {
              this.Fin_Year15_16 = result[1].FinYear; 
            this.Housesinvolved15_16 = result[1].Housesinvolved;
             this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
             this.Houses_Grounde15_16 = result[1].Houses_Grounded;
             this.Houses_Complete15_16 = result[1].Houses_Completed;
             this.HousesOccupied15_16 = result[1].HousesOccupied;
             this.First_Houses15_16 = result[1].First_Houses;
             this.Second_Houses15_16 = result[1].Second_Houses;
             this.Third_Houses15_16 = result[1].Third_Houses;
          }
          catch{}
          finally{}


          try {
            this.Fin_Year16_17 = result[2].FinYear; 
          this.Housesinvolved16_17 = result[2].Housesinvolved;
           this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
           this.Houses_Grounde16_17 = result[2].Houses_Grounded;
           this.Houses_Complete16_17 = result[2].Houses_Completed;
           this.HousesOccupied16_17 = result[2].HousesOccupied;
           this.First_Houses16_17 = result[2].First_Houses;
           this.Second_Houses16_17 = result[2].Second_Houses;
           this.Third_Houses16_17 = result[2].Third_Houses;
        }
        catch{}
        finally{}


         let chart = new CanvasJS.Chart("chartBLCS", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          title: {
            text: "Physical Progress(Nos) for BLC under PMAY(U)",
            fontSize: "25",
          },
          backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
              { label: x1, y: this.Housesinvolved14_15 },
              { label: Y1, y: this.Housesinvolved15_16 },
              { label: z1, y: this.Housesinvolved16_17 }
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
              { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17 }

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
              { label: x1, y: this.Houses_Grounde14_15 },
              { label: Y1, y: this.Houses_Grounde15_16 },
              { label: z1, y: this.Houses_Grounde16_17 }
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
              { label: x1, y: this.Houses_Complete14_15 },
              { label: Y1, y: this.Houses_Complete15_16 },
              { label: z1, y: this.Houses_Complete16_17 }
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
              { label: x1, y: this.HousesOccupied14_15 },
              { label: Y1, y: this.HousesOccupied15_16 },
              { label: z1, y: this.HousesOccupied16_17} 
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
              { label: x1, y: this.Second_Houses14_15 },
              { label: Y1, y: this.Second_Houses15_16 },
              { label: z1, y: this.Second_Houses16_17 }
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
              { label: x1, y: this.Third_Houses14_15 },
              { label: Y1, y: this.Third_Houses15_16 },
              { label: z1, y: this.Third_Houses16_17 }
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

    if (splitted.length ==4)
    {
      if (x1=="2014_15)" ||x1=="2014_15")
      x1 ="2014-15";
      if (x1=="2015_16)" ||x1=="2015_16")
      x1 ="2015-16";
      if (x1=="2016_17" || x1=="2016_17)")
      x1 ="2017-18";
      if (x1=="2018_19" ||x1=="2018_19)")
      x1 ="2018-19";
      if (x1=="2019_20" || x1=="2019_20)")
      x1 ="2019-20";


      if (Y1=="2014_15)" || Y1=="2014_15")
      Y1 ="2014-15";
      if (Y1=="2015_16)" || Y1=="2015_16")
      Y1 ="2015-16";
      if (Y1=="2016_17" || Y1=="2016_17)")
      Y1 ="2017-18";
      if (Y1=="2018_19" ||Y1=="2018_19)")
      Y1 ="2018-19";
      if (Y1=="2019_20" ||Y1=="2019_20)")
      Y1 ="2019-20";

      if (z1=="2014_15)")
      z1 ="2014-15";
      if (z1=="2015_16)")
      z1 ="2015-16";
      if (z1=="2016_17")
      z1 ="2017-18";
      if (z1=="2018_19")
      z1 ="2018-19";
      if (z1=="2019_20")
      z1 ="2019-20";


      if (z2=="2014_15)")
      z2 ="2014-15";
      if (z2=="2015_16)")
      z2="2015-16";
      if (z2=="2016_17")
      z2 ="2017-18";
      if (z2=="2018_19")
      z2 ="2018-19";
      if (z2=="2019_20")
      z2 ="2019-20";

         this.service.sp_create_BLC_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

             this.Fin_Year14_15 = result[0].FinYear;
             this.Housesinvolved14_15 = result[0].Housesinvolved;
             this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
             this.Houses_Grounde14_15 = result[0].Houses_Grounded;
             this.Houses_Complete14_15 = result[0].Houses_Completed;
             this.HousesOccupied14_15 = result[0].HousesOccupied;
             this.First_Houses14_15 = result[0].First_Houses;
             this.Second_Houses14_15 = result[0].Second_Houses;
             this.Third_Houses14_15 = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

            // 
            try {
              this.Fin_Year15_16 = result[1].FinYear; 
            this.Housesinvolved15_16 = result[1].Housesinvolved;
             this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
             this.Houses_Grounde15_16 = result[1].Houses_Grounded;
             this.Houses_Complete15_16 = result[1].Houses_Completed;
             this.HousesOccupied15_16 = result[1].HousesOccupied;
             this.First_Houses15_16 = result[1].First_Houses;
             this.Second_Houses15_16 = result[1].Second_Houses;
             this.Third_Houses15_16 = result[1].Third_Houses;
          }
          catch{}
          finally{}


          try {
            this.Fin_Year16_17 = result[2].FinYear; 
          this.Housesinvolved16_17 = result[2].Housesinvolved;
           this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
           this.Houses_Grounde16_17 = result[2].Houses_Grounded;
           this.Houses_Complete16_17 = result[2].Houses_Completed;
           this.HousesOccupied16_17 = result[2].HousesOccupied;
           this.First_Houses16_17 = result[2].First_Houses;
           this.Second_Houses16_17 = result[2].Second_Houses;
           this.Third_Houses16_17 = result[2].Third_Houses;
        }
        catch{}
        finally{}

        try {
          this.Fin_Year17_18 = result[3].FinYear; 
        this.Housesinvolved17_18 = result[3].Housesinvolved;
         this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
         this.Houses_Grounde17_18 = result[3].Houses_Grounded;
         this.Houses_Complete17_18 = result[3].Houses_Completed;
         this.HousesOccupied17_18 = result[3].HousesOccupied;
         this.First_Houses17_18 = result[3].First_Houses;
         this.Second_Houses17_18 = result[3].Second_Houses;
         this.Third_Houses17_18 = result[3].Third_Houses;
      }
      catch{}
      finally{}


         let chart = new CanvasJS.Chart("chartBLCS", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          title: {
            text: "Physical Progress(Nos) for BLC under PMAY(U)",
            fontSize: "25",
          },
          backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
              { label: x1, y: this.Housesinvolved14_15 },
              { label: Y1, y: this.Housesinvolved15_16 },
              { label: z1, y: this.Housesinvolved16_17 },
              { label: z2, y: this.Housesinvolved17_18 }
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
              { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17 },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18 }
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
              { label: x1, y: this.Houses_Grounde14_15 },
              { label: Y1, y: this.Houses_Grounde15_16 },
              { label: z1, y: this.Houses_Grounde16_17 },
              { label: z2, y: this.Houses_Grounde17_18 }
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
              { label: x1, y: this.Houses_Complete14_15 },
              { label: Y1, y: this.Houses_Complete15_16 },
              { label: z1, y: this.Houses_Complete16_17 },
              { label: z2, y: this.Houses_Complete17_18 }
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
              { label: x1, y: this.HousesOccupied14_15 },
              { label: Y1, y: this.HousesOccupied15_16 },
              { label: z1, y: this.HousesOccupied16_17},
              { label: z2, y: this.HousesOccupied17_18} 
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
              { label: x1, y: this.Second_Houses14_15 },
              { label:Y1, y: this.Second_Houses15_16 },
              { label: z1, y: this.Second_Houses16_17 },
              { label:z2, y: this.Second_Houses17_18 }
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
              { label: x1, y: this.Third_Houses14_15 },
              { label: Y1, y: this.Third_Houses15_16 },
              { label: z1, y: this.Third_Houses16_17 },
              { label:z2, y: this.Third_Houses17_18 }
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
    if (splitted.length ==5)
    {

      if (x1=="2014_15)" ||x1=="2014_15")
      x1 ="2014-15";
      if (x1=="2015_16)" ||x1=="2015_16")
      x1 ="2015-16";
      if (x1=="2016_17" || x1=="2016_17)")
      x1 ="2017-18";
      if (x1=="2018_19" ||x1=="2018_19)")
      x1 ="2018-19";
      if (x1=="2019_20" || x1=="2019_20)")
      x1 ="2019-20";


      if (Y1=="2014_15)" || Y1=="2014_15")
      Y1 ="2014-15";
      if (Y1=="2015_16)" || Y1=="2015_16")
      Y1 ="2015-16";
      if (Y1=="2016_17" || Y1=="2016_17)")
      Y1 ="2017-18";
      if (Y1=="2018_19" ||Y1=="2018_19)")
      Y1 ="2018-19";
      if (Y1=="2019_20" ||Y1=="2019_20)")
      Y1 ="2019-20";

      if (z1=="2014_15)")
      z1 ="2014-15";
      if (z1=="2015_16)")
      z1 ="2015-16";
      if (z1=="2016_17")
      z1 ="2017-18";
      if (z1=="2018_19")
      z1 ="2018-19";
      if (z1=="2019_20")
      z1 ="2019-20";


      if (z2=="2014_15)")
      z2 ="2014-15";
      if (z2=="2015_16)")
      z2="2015-16";
      if (z2=="2016_17")
      z2 ="2017-18";
      if (z2=="2018_19")
      z2 ="2018-19";
      if (z2=="2019_20")
      z2 ="2019-20";

      if (z3=="2014_15)")
      z3 ="2014-15";
      if (z3=="2015_16)")
      z3="2015-16";
      if (z3=="2016_17")
      z3 ="2017-18";
      if (z3=="2018_19")
      z3 ="2018-19";
      if (z3=="2019_20")
      z3 ="2019-20";
         this.service.sp_create_BLC_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

             this.Fin_Year14_15 = result[0].FinYear;
             this.Housesinvolved14_15 = result[0].Housesinvolved;
             this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
             this.Houses_Grounde14_15 = result[0].Houses_Grounded;
             this.Houses_Complete14_15 = result[0].Houses_Completed;
             this.HousesOccupied14_15 = result[0].HousesOccupied;
             this.First_Houses14_15 = result[0].First_Houses;
             this.Second_Houses14_15 = result[0].Second_Houses;
             this.Third_Houses14_15 = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

            // 
            try {
              this.Fin_Year15_16 = result[1].FinYear; 
            this.Housesinvolved15_16 = result[1].Housesinvolved;
             this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
             this.Houses_Grounde15_16 = result[1].Houses_Grounded;
             this.Houses_Complete15_16 = result[1].Houses_Completed;
             this.HousesOccupied15_16 = result[1].HousesOccupied;
             this.First_Houses15_16 = result[1].First_Houses;
             this.Second_Houses15_16 = result[1].Second_Houses;
             this.Third_Houses15_16 = result[1].Third_Houses;
          }
          catch{}
          finally{}


          try {
            this.Fin_Year16_17 = result[2].FinYear; 
          this.Housesinvolved16_17 = result[2].Housesinvolved;
           this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
           this.Houses_Grounde16_17 = result[2].Houses_Grounded;
           this.Houses_Complete16_17 = result[2].Houses_Completed;
           this.HousesOccupied16_17 = result[2].HousesOccupied;
           this.First_Houses16_17 = result[2].First_Houses;
           this.Second_Houses16_17 = result[2].Second_Houses;
           this.Third_Houses16_17 = result[2].Third_Houses;
        }
        catch{}
        finally{}

        try {
          this.Fin_Year17_18 = result[3].FinYear; 
        this.Housesinvolved17_18 = result[3].Housesinvolved;
         this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
         this.Houses_Grounde17_18 = result[3].Houses_Grounded;
         this.Houses_Complete17_18 = result[3].Houses_Completed;
         this.HousesOccupied17_18 = result[3].HousesOccupied;
         this.First_Houses17_18 = result[3].First_Houses;
         this.Second_Houses17_18 = result[3].Second_Houses;
         this.Third_Houses17_18 = result[3].Third_Houses;
      }
      catch{}
      finally{}

      try {
        this.Fin_Year18_19 = result[4].FinYear; 
      this.Housesinvolved18_19 = result[4].Housesinvolved;
       this.FundsDisbursed_in_Houses18_19 = result[4].FundsDisbursed_in_Houses;
       this.Houses_Grounde18_19 = result[4].Houses_Grounded;
       this.Houses_Complete18_19 = result[4].Houses_Completed;
       this.HousesOccupied18_19 = result[4].HousesOccupied;
       this.First_Houses18_19 = result[4].First_Houses;
       this.Second_Houses18_19 = result[4].Second_Houses;
       this.Third_Houses18_19 = result[4].Third_Houses;
    }
    catch{}
    finally{}


         let chart = new CanvasJS.Chart("chartBLCS", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          title: {
            text: "Physical Progress(Nos) for BLC under PMAY(U)",
            fontSize: "25",
          },
          backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
              { label: x1, y: this.Housesinvolved14_15 },
              { label: Y1, y: this.Housesinvolved15_16 },
              { label: z1, y: this.Housesinvolved16_17 },
              { label: z2, y: this.Housesinvolved17_18 },
              { label: z3, y: this.Housesinvolved18_19 }
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
              { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17 },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18 },
              { label: z3, y: this.FundsDisbursed_in_Houses18_19 }
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
              { label: x1, y: this.Houses_Grounde14_15 },
              { label: Y1, y: this.Houses_Grounde15_16 },
              { label: z1, y: this.Houses_Grounde16_17 },
              { label: z2, y: this.Houses_Grounde17_18 },
              { label: z3, y: this.Houses_Grounde18_19 }
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
              { label: x1, y: this.Houses_Complete14_15 },
              { label: Y1, y: this.Houses_Complete15_16 },
              { label: z1, y: this.Houses_Complete16_17 },
              { label: z2, y: this.Houses_Complete17_18 },
              { label: z3, y: this.Houses_Complete18_19 }
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
              { label: x1, y: this.HousesOccupied14_15 },
              { label: Y1, y: this.HousesOccupied15_16 },
              { label: z1, y: this.HousesOccupied16_17},
              { label: z2, y: this.HousesOccupied17_18},
              { label: z3, y: this.HousesOccupied18_19} 
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
              { label: x1, y: this.Second_Houses14_15 },
              { label: Y1, y: this.Second_Houses15_16 },
              { label: z1, y: this.Second_Houses16_17 },
              { label: z2, y: this.Second_Houses17_18 },
              { label: z3, y: this.Second_Houses18_19 }
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
              { label: x1, y: this.Third_Houses14_15 },
              { label: Y1, y: this.Third_Houses15_16 },
              { label: z1, y: this.Third_Houses16_17 },
              { label: z2, y: this.Third_Houses17_18 },
              { label: z3, y: this.Third_Houses18_19 }
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
    if (splitted.length ==6)
    {

      if (x1=="2014_15)" ||x1=="2014_15")
      x1 ="2014-15";
      if (x1=="2015_16)" ||x1=="2015_16")
      x1 ="2015-16";
      if (x1=="2016_17" || x1=="2016_17)")
      x1 ="2017-18";
      if (x1=="2018_19" ||x1=="2018_19)")
      x1 ="2018-19";
      if (x1=="2019_20" || x1=="2019_20)")
      x1 ="2019-20";


      if (Y1=="2014_15)" || Y1=="2014_15")
      Y1 ="2014-15";
      if (Y1=="2015_16)" || Y1=="2015_16")
      Y1 ="2015-16";
      if (Y1=="2016_17" || Y1=="2016_17)")
      Y1 ="2017-18";
      if (Y1=="2018_19" ||Y1=="2018_19)")
      Y1 ="2018-19";
      if (Y1=="2019_20" ||Y1=="2019_20)")
      Y1 ="2019-20";

      if (z1=="2014_15)")
      z1 ="2014-15";
      if (z1=="2015_16)")
      z1 ="2015-16";
      if (z1=="2016_17")
      z1 ="2017-18";
      if (z1=="2018_19")
      z1 ="2018-19";
      if (z1=="2019_20")
      z1 ="2019-20";


      if (z2=="2014_15)")
      z2 ="2014-15";
      if (z2=="2015_16)")
      z2="2015-16";
      if (z2=="2016_17")
      z2 ="2017-18";
      if (z2=="2018_19")
      z2 ="2018-19";
      if (z2=="2019_20")
      z2 ="2019-20";

      if (z3=="2014_15)")
      z3 ="2014-15";
      if (z3=="2015_16)")
      z3="2015-16";
      if (z3=="2016_17")
      z3 ="2017-18";
      if (z3=="2018_19")
      z3 ="2018-19";
      if (z3=="2019_20")
      z3 ="2019-20";

      if (z4=="2014_15)")
      z4 ="2014-15";
      if (z4=="2015_16)")
      z4="2015-16";
      if (z4=="2016_17")
      z4 ="2017-18";
      if (z4=="2018_19")
      z4 ="2018-19";
      if (z4=="2019_20")
      z4 ="2019-20";
      
         this.service.sp_create_BLC_DATANew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

             this.Fin_Year14_15 = result[0].FinYear;
             this.Housesinvolved14_15 = result[0].Housesinvolved;
             this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
             this.Houses_Grounde14_15 = result[0].Houses_Grounded;
             this.Houses_Complete14_15 = result[0].Houses_Completed;
             this.HousesOccupied14_15 = result[0].HousesOccupied;
             this.First_Houses14_15 = result[0].First_Houses;
             this.Second_Houses14_15 = result[0].Second_Houses;
             this.Third_Houses14_15 = result[0].Third_Houses;
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

            // 
            try {
              this.Fin_Year15_16 = result[1].FinYear; 
            this.Housesinvolved15_16 = result[1].Housesinvolved;
             this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
             this.Houses_Grounde15_16 = result[1].Houses_Grounded;
             this.Houses_Complete15_16 = result[1].Houses_Completed;
             this.HousesOccupied15_16 = result[1].HousesOccupied;
             this.First_Houses15_16 = result[1].First_Houses;
             this.Second_Houses15_16 = result[1].Second_Houses;
             this.Third_Houses15_16 = result[1].Third_Houses;
          }
          catch{}
          finally{}


          try {
            this.Fin_Year16_17 = result[2].FinYear; 
          this.Housesinvolved16_17 = result[2].Housesinvolved;
           this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
           this.Houses_Grounde16_17 = result[2].Houses_Grounded;
           this.Houses_Complete16_17 = result[2].Houses_Completed;
           this.HousesOccupied16_17 = result[2].HousesOccupied;
           this.First_Houses16_17 = result[2].First_Houses;
           this.Second_Houses16_17 = result[2].Second_Houses;
           this.Third_Houses16_17 = result[2].Third_Houses;
        }
        catch{}
        finally{}

        try {
          this.Fin_Year17_18 = result[3].FinYear; 
        this.Housesinvolved17_18 = result[3].Housesinvolved;
         this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
         this.Houses_Grounde17_18 = result[3].Houses_Grounded;
         this.Houses_Complete17_18 = result[3].Houses_Completed;
         this.HousesOccupied17_18 = result[3].HousesOccupied;
         this.First_Houses17_18 = result[3].First_Houses;
         this.Second_Houses17_18 = result[3].Second_Houses;
         this.Third_Houses17_18 = result[3].Third_Houses;
      }
      catch{}
      finally{}

      try {
        this.Fin_Year18_19 = result[4].FinYear; 
      this.Housesinvolved18_19 = result[4].Housesinvolved;
       this.FundsDisbursed_in_Houses18_19 = result[4].FundsDisbursed_in_Houses;
       this.Houses_Grounde18_19 = result[4].Houses_Grounded;
       this.Houses_Complete18_19 = result[4].Houses_Completed;
       this.HousesOccupied18_19 = result[4].HousesOccupied;
       this.First_Houses18_19 = result[4].First_Houses;
       this.Second_Houses18_19 = result[4].Second_Houses;
       this.Third_Houses18_19 = result[4].Third_Houses;
    }
    catch{}
    finally{}


         let chart = new CanvasJS.Chart("chartBLCS", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          title: {
            text: "Physical Progress(Nos) for BLC under PMAY(U)",
            fontSize: "25",
          },
          backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
              { label: x1, y: this.Housesinvolved14_15 },
              { label: Y1, y: this.Housesinvolved15_16 },
              { label:z1, y: this.Housesinvolved16_17 },
              { label:z2, y: this.Housesinvolved17_18 },
              { label: z3, y: this.Housesinvolved18_19 },
              { label: z4, y: this.Housesinvolved19_20 }
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
              { label: x1, y: this.FundsDisbursed_in_Houses14_15 },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16 },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17 },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18 },
              { label: z3, y: this.FundsDisbursed_in_Houses18_19 },
              { label: z4, y: this.FundsDisbursed_in_Houses19_20 }
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
              { label: x1, y: this.Houses_Grounde14_15 },
              { label: Y1, y: this.Houses_Grounde15_16 },
              { label: z1, y: this.Houses_Grounde16_17 },
              { label: z2, y: this.Houses_Grounde17_18 },
              { label:z3, y: this.Houses_Grounde18_19 },
              { label:z4, y: this.Houses_Grounde19_20 }
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
              { label: x1, y: this.Houses_Complete14_15 },
              { label: Y1, y: this.Houses_Complete15_16 },
              { label: z1, y: this.Houses_Complete16_17 },
              { label: z2, y: this.Houses_Complete17_18 },
              { label: z3, y: this.Houses_Complete18_19 },
              { label: z4, y: this.Houses_Complete19_20 }
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
              { label: x1, y: this.HousesOccupied14_15 },
              { label: Y1, y: this.HousesOccupied15_16 },
              { label: z1, y: this.HousesOccupied16_17},
              { label: z2, y: this.HousesOccupied17_18},
              { label: z3, y: this.HousesOccupied18_19} ,
              { label:z4, y: this.HousesOccupied19_20} 
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
              { label:x1, y: this.Second_Houses14_15 },
              { label: Y1, y: this.Second_Houses15_16 },
              { label: z1, y: this.Second_Houses16_17 },
              { label:z2, y: this.Second_Houses17_18 },
              { label: z3, y: this.Second_Houses18_19 },
              { label:z4, y: this.Second_Houses19_20 }
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
              { label: x1, y: this.Third_Houses14_15 },
              { label: Y1, y: this.Third_Houses15_16 },
              { label: z1, y: this.Third_Houses16_17 },
              { label: z2, y: this.Third_Houses17_18 },
              { label: z3, y: this.Third_Houses18_19 },
              { label: z4, y: this.Third_Houses19_20 }
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
BindAHP_Data(stateCode, DisttCode, cityCode,Comp ,Fin_Year)
{
 // debugger;
    //  alert(stateCode);
      Comp ="AHP";
      this.service.sp_create_BLC_AHP_DATA(stateCode, DisttCode, cityCode,Comp).subscribe(result => { // new code
      ///first row data

      this.Fin_Year14_15 = result[0].FinYear;
      this.Housesinvolved14_15 = result[0].Housesinvolved;
      this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
      this.Houses_Grounde14_15 = result[0].Houses_Grounded;
      this.Houses_Complete14_15 = result[0].Houses_Completed;
      this.HousesOccupied14_15 = result[0].HousesOccupied ;

      this.First_Houses14_15 = result[0].First_Houses;
      this.Second_Houses14_15 = result[0].Second_Houses;
      this.Third_Houses14_15 = result[0].Third_Houses;

      //second row data
      this.Fin_Year15_16 = result[1].FinYear;
      this.Housesinvolved15_16 = result[1].Housesinvolved;
      this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
      this.Houses_Grounde15_16 = result[1].Houses_Grounded;
      this.Houses_Complete15_16 = result[1].Houses_Completed;
      this.HousesOccupied15_16 = result[1].HousesOccupied ;
      this.First_Houses15_16 = result[1].First_Houses;
      this.Second_Houses15_16 = result[1].Second_Houses;
      this.Third_Houses15_16 = result[1].Third_Houses;

      //Third row data
      try {
      this.Fin_Year16_17 = result[2].FinYear;
      this.Housesinvolved16_17 = result[2].Housesinvolved;
      this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
      this.Houses_Grounde16_17 = result[2].Houses_Grounded;
      this.Houses_Complete16_17 = result[2].Houses_Completed;
      this.HousesOccupied16_17 = result[2].HousesOccupied ;

      this.First_Houses16_17 = result[2].First_Houses;
      this.Second_Houses16_17 = result[2].Second_Houses;
      this.Third_Houses16_17 = result[2].Third_Houses;
      }
      catch{}
      finally{}

      //Fourth row data
      this.Fin_Year17_18 = result[3].FinYear;
      this.Housesinvolved17_18 = result[3].Housesinvolved;
      this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
      this.Houses_Grounde17_18 = result[3].Houses_Grounded;
      this.Houses_Complete17_18 = result[3].Houses_Completed;
      this.HousesOccupied17_18 = result[3].HousesOccupied ;

      this.First_Houses17_18 = result[3].First_Houses;
      this.Second_Houses17_18 = result[3].Second_Houses;
      this.Third_Houses17_18 = result[3].Third_Houses;

      //Fifth row data
      this.Fin_Year18_19 = result[4].FinYear;
      this.Housesinvolved18_19 = result[4].Housesinvolved;
      this.FundsDisbursed_in_Houses18_19 = result[4].FundsDisbursed_in_Houses;
      this.Houses_Grounde18_19 = result[4].Houses_Grounded;
      this.Houses_Complete18_19 = result[4].Houses_Completed;
      this.HousesOccupied18_19 = result[4].HousesOccupied ;

      this.First_Houses18_19 = result[4].First_Houses;
      this.Second_Houses18_19 = result[4].Second_Houses;
      this.Third_Houses18_19 = result[4].Third_Houses;


            //Sixth row data
            this.Fin_Year19_20 = result[5].FinYear;
            this.Housesinvolved19_20 = result[5].Housesinvolved;
            this.FundsDisbursed_in_Houses19_20 = result[5].FundsDisbursed_in_Houses;
            this.Houses_Grounde19_20 = result[5].Houses_Grounded;
            this.Houses_Complete19_20 = result[5].Houses_Completed;
            this.HousesOccupied19_20 = result[5].HousesOccupied ;


            this.First_Houses19_20 = result[5].First_Houses;
            this.Second_Houses19_20 = result[5].Second_Houses;
            this.Third_Houses19_20 = result[5].Third_Houses;

            this.Test(Fin_Year);


                  let chart = new CanvasJS.Chart("chartAHP", {
                    theme: "light2",
                    animationEnabled: true,
                    exportEnabled: false,
                    title: {
                      text: "Physical Progress Nos) for AHP under PMAY(U)",
                      fontSize: "25",
                    },
                    backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
                        { label: "2014-15", y: this.Housesinvolved14_15 },
                        { label: "2015-16", y: this.Housesinvolved15_16 },
                        { label: "2016-17", y: this.Housesinvolved16_17 },
                        { label: "2017-18", y: this.Housesinvolved17_18 },
                        { label: "2018-19", y: this.Housesinvolved18_19 },
                        { label: "2019-20", y: this.Housesinvolved19_20 }
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
                        { label: "2014-15", y: this.FundsDisbursed_in_Houses14_15 },
                        { label: "2015-16", y: this.FundsDisbursed_in_Houses15_16 },
                        { label: "2016-17", y: this.FundsDisbursed_in_Houses16_17 },
                        { label:  "2017-18", y: this.FundsDisbursed_in_Houses17_18 },
                        { label: "2018-19", y: this.FundsDisbursed_in_Houses18_19 },
                        { label: "2019-20", y: this.FundsDisbursed_in_Houses19_20 }
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
                        { label: "2014-15", y: this.Houses_Grounde14_15 },
                        { label: "2015-16", y: this.Houses_Grounde15_16 },
                        { label: "2016-17", y: this.Houses_Grounde16_17 },
                        { label:  "2017-18", y: this.Houses_Grounde17_18 },
                        { label: "2018-19", y: this.Houses_Grounde18_19 },
                        { label: "2019-20", y: this.Houses_Grounde19_20 }
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
                        { label: "2014-15", y: this.Houses_Complete14_15 },
                        { label: "2015-16", y: this.Houses_Complete15_16 },
                        { label: "2016-17", y: this.Houses_Complete16_17 },
                        { label:  "2017-18", y: this.Houses_Complete17_18 },
                        { label: "2018-19", y: this.Houses_Complete18_19 },
                        { label: "2019-20", y: this.Houses_Complete19_20 }
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
                        { label: "2014-15", y: this.HousesOccupied14_15 },
                        { label: "2015-16", y: this.HousesOccupied15_16 },
                        { label: "2016-17", y: this.HousesOccupied16_17 },
                        { label:  "2017-18", y: this.HousesOccupied17_18 },
                        { label: "2018-19", y: this.HousesOccupied18_19 },
                        { label: "2019-20", y: this.HousesOccupied19_20 }
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
                        { label: "2014-15", y: this.Second_Houses14_15 },
                        { label: "2015-16", y: this.Second_Houses15_16 },
                        { label: "2016-17", y: this.Second_Houses16_17 },
                        { label:  "2017-18", y: this.Second_Houses17_18 },
                        { label: "2018-19", y: this.Second_Houses18_19 },
                        { label: "2019-20", y: this.Second_Houses19_20 }
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
                        { label: "2014-15", y: this.Third_Houses14_15 },
                        { label: "2015-16", y: this.Third_Houses15_16 },
                        { label: "2016-17", y: this.Third_Houses16_17 },
                        { label:  "2017-18", y: this.Third_Houses17_18 },
                        { label:"2018-19", y: this.Third_Houses18_19 },
                        { label: "2019-20", y: this.Third_Houses19_20 }
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

  public Test(Fin_Year)
  {
    if (Fin_Year =="2014-15")
    {
       //this.Housesinvolved14_15 =0;
      this.Housesinvolved15_16 =0;
      this.Housesinvolved16_17  =0;
      this.Housesinvolved17_18   =0;
      this.Housesinvolved18_19 =0;
      this.Housesinvolved19_20=0;

       //this.FundsDisbursed_in_Houses14_15 },
       this.FundsDisbursed_in_Houses15_16 =0;
       this.FundsDisbursed_in_Houses16_17 =0;
       this.FundsDisbursed_in_Houses17_18 =0;
       this.FundsDisbursed_in_Houses18_19 =0;
       this.FundsDisbursed_in_Houses19_20 =0;

       //this.Houses_Grounde14_15  =0;
                       this.Houses_Grounde15_16 =0;
                       this.Houses_Grounde16_17 =0;
                       this.Houses_Grounde17_18 =0;
                       this.Houses_Grounde18_19 =0;
                       this.Houses_Grounde19_20 =0;


//this.Houses_Complete14_15 =0;

this.Houses_Complete15_16 =0;
 this.Houses_Complete16_17 =0;
  this.Houses_Complete17_18 =0;
   this.Houses_Complete18_19 =0;
  this.Houses_Complete19_20 =0;

         //               this.HousesOccupied14_15 =0;
                       this.HousesOccupied15_16 =0;
                       this.HousesOccupied16_17 =0;
                       this.HousesOccupied17_18 =0;
                       this.HousesOccupied18_19 =0;
                       this.HousesOccupied19_20 =0;

           //            this.HousesOccupied14_15 =0;
                       this.HousesOccupied15_16 =0;
                       this.HousesOccupied16_17 =0;
                       this.HousesOccupied17_18 =0;
                       this.HousesOccupied18_19 =0;
                       this.HousesOccupied19_20 =0;
                       this.HousesOccupied20_21 =0;

             //          this.First_Houses14_15 =0;
                       this.First_Houses15_16 =0;
                       this.First_Houses16_17 =0;
                       this.First_Houses17_18 =0;
                       this.First_Houses18_19 =0;
                       this.First_Houses19_20 =0;

               //         this.Second_Houses14_15 =0;
                       this.Second_Houses15_16 =0;
                       this.Second_Houses16_17 =0;
                       this.Second_Houses17_18 =0;
                       this.Second_Houses18_19 =0;
                       this.Second_Houses19_20 =0;

                 //      this.Third_Houses14_15 =0;
                       this.Third_Houses15_16 =0;
                       this.Third_Houses16_17 =0;
                        this.Third_Houses17_18 =0;
                       this.Third_Houses18_19 =0;
                       this.Third_Houses19_20 =0;
                       this.Third_Houses20_21 =0;
                    }
                    if (Fin_Year =="2015-16")
                    {
                      this.Housesinvolved14_15 =0;
                      //this.Housesinvolved15_16 =0;
                      this.Housesinvolved16_17  =0;
                      this.Housesinvolved17_18   =0;
                      this.Housesinvolved18_19 =0;
                      this.Housesinvolved19_20=0;

                       this.FundsDisbursed_in_Houses14_15=0;
                       //this.FundsDisbursed_in_Houses15_16 =0;
                       this.FundsDisbursed_in_Houses16_17 =0;
                       this.FundsDisbursed_in_Houses17_18 =0;
                       this.FundsDisbursed_in_Houses18_19 =0;
                       this.FundsDisbursed_in_Houses19_20 =0;

                       this.Houses_Grounde14_15  =0;
                       //                this.Houses_Grounde15_16 =0;
                                       this.Houses_Grounde16_17 =0;
                                       this.Houses_Grounde17_18 =0;
                                       this.Houses_Grounde18_19 =0;
                                       this.Houses_Grounde19_20 =0;


               this.Houses_Complete14_15 =0;

               // this.Houses_Complete15_16 =0;
                 this.Houses_Complete16_17 =0;
                  this.Houses_Complete17_18 =0;
                   this.Houses_Complete18_19 =0;
                  this.Houses_Complete19_20 =0;

                                        this.HousesOccupied14_15 =0;
                         //              this.HousesOccupied15_16 =0;
                                       this.HousesOccupied16_17 =0;
                                       this.HousesOccupied17_18 =0;
                                       this.HousesOccupied18_19 =0;
                                       this.HousesOccupied19_20 =0;

                                       this.HousesOccupied14_15 =0;
                           //            this.HousesOccupied15_16 =0;
                                       this.HousesOccupied16_17 =0;
                                       this.HousesOccupied17_18 =0;
                                       this.HousesOccupied18_19 =0;
                                       this.HousesOccupied19_20 =0;
                                       this.HousesOccupied20_21 =0;

                                       this.First_Houses14_15 =0;
                             //          this.First_Houses15_16 =0;
                                       this.First_Houses16_17 =0;
                                       this.First_Houses17_18 =0;
                                       this.First_Houses18_19 =0;
                                       this.First_Houses19_20 =0;

                                        this.Second_Houses14_15 =0;
                               //        this.Second_Houses15_16 =0;
                                       this.Second_Houses16_17 =0;
                                       this.Second_Houses17_18 =0;
                                       this.Second_Houses18_19 =0;
                                       this.Second_Houses19_20 =0;

                                       this.Third_Houses14_15 =0;
                                 //      this.Third_Houses15_16 =0;
                                       this.Third_Houses16_17 =0;
                                        this.Third_Houses17_18 =0;
                                       this.Third_Houses18_19 =0;
                                       this.Third_Houses19_20 =0;
                                       this.Third_Houses20_21 =0;
                                    }
                                    if (Fin_Year =="2016-17")
                                    {
                                      this.Housesinvolved14_15 =0;
                                      this.Housesinvolved15_16 =0;
                                      //this.Housesinvolved16_17  =0;
                                      this.Housesinvolved17_18   =0;
                                      this.Housesinvolved18_19 =0;
                                      this.Housesinvolved19_20=0;

                                       this.FundsDisbursed_in_Houses14_15=0;
                                       this.FundsDisbursed_in_Houses15_16 =0;
                                       //this.FundsDisbursed_in_Houses16_17 =0;
                                       this.FundsDisbursed_in_Houses17_18 =0;
                                       this.FundsDisbursed_in_Houses18_19 =0;
                                       this.FundsDisbursed_in_Houses19_20 =0;

                                       this.Houses_Grounde14_15  =0;
                                                      this.Houses_Grounde15_16 =0;
                                      //                 this.Houses_Grounde16_17 =0;
                                                       this.Houses_Grounde17_18 =0;
                                                       this.Houses_Grounde18_19 =0;
                                                       this.Houses_Grounde19_20 =0;


                               this.Houses_Complete14_15 =0;

                               this.Houses_Complete15_16 =0;
                               //  this.Houses_Complete16_17 =0;
                                  this.Houses_Complete17_18 =0;
                                   this.Houses_Complete18_19 =0;
                                  this.Houses_Complete19_20 =0;

                                                        this.HousesOccupied14_15 =0;
                                                       this.HousesOccupied15_16 =0;
                                         //              this.HousesOccupied16_17 =0;
                                                       this.HousesOccupied17_18 =0;
                                                       this.HousesOccupied18_19 =0;
                                                       this.HousesOccupied19_20 =0;

                                                       this.HousesOccupied14_15 =0;
                                                       this.HousesOccupied15_16 =0;
                                           //            this.HousesOccupied16_17 =0;
                                                       this.HousesOccupied17_18 =0;
                                                       this.HousesOccupied18_19 =0;
                                                       this.HousesOccupied19_20 =0;
                                                       this.HousesOccupied20_21 =0;

                                                       this.First_Houses14_15 =0;
                                                       this.First_Houses15_16 =0;
                                             //          this.First_Houses16_17 =0;
                                                       this.First_Houses17_18 =0;
                                                       this.First_Houses18_19 =0;
                                                       this.First_Houses19_20 =0;

                                                        this.Second_Houses14_15 =0;
                                                       this.Second_Houses15_16 =0;
                                               //        this.Second_Houses16_17 =0;
                                                       this.Second_Houses17_18 =0;
                                                       this.Second_Houses18_19 =0;
                                                       this.Second_Houses19_20 =0;

                                                       this.Third_Houses14_15 =0;
                                                       this.Third_Houses15_16 =0;
                                                 //      this.Third_Houses16_17 =0;
                                                        this.Third_Houses17_18 =0;
                                                       this.Third_Houses18_19 =0;
                                                       this.Third_Houses19_20 =0;
                                                       this.Third_Houses20_21 =0;
                                                    }

                                                    if (Fin_Year =="2017-18")
                                    {
                                      this.Housesinvolved14_15 =0;
                                      this.Housesinvolved15_16 =0;
                                      this.Housesinvolved16_17  =0;
                                      //this.Housesinvolved17_18   =0;
                                      this.Housesinvolved18_19 =0;
                                      this.Housesinvolved19_20=0;

                                       this.FundsDisbursed_in_Houses14_15=0;
                                       this.FundsDisbursed_in_Houses15_16 =0;
                                       this.FundsDisbursed_in_Houses16_17 =0;
                                       //this.FundsDisbursed_in_Houses17_18 =0;
                                       this.FundsDisbursed_in_Houses18_19 =0;
                                       this.FundsDisbursed_in_Houses19_20 =0;

                                       this.Houses_Grounde14_15  =0;
                                                      this.Houses_Grounde15_16 =0;
                                                      this.Houses_Grounde16_17 =0;
                                      //                 this.Houses_Grounde17_18 =0;
                                                       this.Houses_Grounde18_19 =0;
                                                       this.Houses_Grounde19_20 =0;


                               this.Houses_Complete14_15 =0;

                               this.Houses_Complete15_16 =0;
                                 this.Houses_Complete16_17 =0;
                               //   this.Houses_Complete17_18 =0;
                                   this.Houses_Complete18_19 =0;
                                  this.Houses_Complete19_20 =0;

                                                        this.HousesOccupied14_15 =0;
                                                       this.HousesOccupied15_16 =0;
                                                       this.HousesOccupied16_17 =0;
                                         //              this.HousesOccupied17_18 =0;
                                                       this.HousesOccupied18_19 =0;
                                                       this.HousesOccupied19_20 =0;

                                                       this.HousesOccupied14_15 =0;
                                                       this.HousesOccupied15_16 =0;
                                                       this.HousesOccupied16_17 =0;
                                           //            this.HousesOccupied17_18 =0;
                                                       this.HousesOccupied18_19 =0;
                                                       this.HousesOccupied19_20 =0;
                                                       this.HousesOccupied20_21 =0;

                                                       this.First_Houses14_15 =0;
                                                       this.First_Houses15_16 =0;
                                                       this.First_Houses16_17 =0;
                                             //          this.First_Houses17_18 =0;
                                                       this.First_Houses18_19 =0;
                                                       this.First_Houses19_20 =0;

                                                        this.Second_Houses14_15 =0;
                                                       this.Second_Houses15_16 =0;
                                                       this.Second_Houses16_17 =0;
                                               //        this.Second_Houses17_18 =0;
                                                       this.Second_Houses18_19 =0;
                                                       this.Second_Houses19_20 =0;

                                                       this.Third_Houses14_15 =0;
                                                       this.Third_Houses15_16 =0;
                                                       this.Third_Houses16_17 =0;
                                                 //       this.Third_Houses17_18 =0;
                                                       this.Third_Houses18_19 =0;
                                                       this.Third_Houses19_20 =0;
                                                       this.Third_Houses20_21 =0;
                                                    }

                                                    if (Fin_Year =="2018-19")
                                                    {
                                                      this.Housesinvolved14_15 =0;
                                                      this.Housesinvolved15_16 =0;
                                                      this.Housesinvolved16_17  =0;
                                                      this.Housesinvolved17_18   =0;
                                                      //this.Housesinvolved18_19 =0;
                                                      this.Housesinvolved19_20=0;

                                                       this.FundsDisbursed_in_Houses14_15=0;
                                                       this.FundsDisbursed_in_Houses15_16 =0;
                                                       this.FundsDisbursed_in_Houses16_17 =0;
                                                       this.FundsDisbursed_in_Houses17_18 =0;
                                                       //this.FundsDisbursed_in_Houses18_19 =0;
                                                       this.FundsDisbursed_in_Houses19_20 =0;

                                                       this.Houses_Grounde14_15  =0;
                                                                      this.Houses_Grounde15_16 =0;
                                                                      this.Houses_Grounde16_17 =0;
                                                                      this.Houses_Grounde17_18 =0;
                                                      //                 this.Houses_Grounde18_19 =0;
                                                                       this.Houses_Grounde19_20 =0;


                                               this.Houses_Complete14_15 =0;

                                               this.Houses_Complete15_16 =0;
                                                 this.Houses_Complete16_17 =0;
                                                  this.Houses_Complete17_18 =0;
                                               //    this.Houses_Complete18_19 =0;
                                                  this.Houses_Complete19_20 =0;

                                                                        this.HousesOccupied14_15 =0;
                                                                       this.HousesOccupied15_16 =0;
                                                                       this.HousesOccupied16_17 =0;
                                                                       this.HousesOccupied17_18 =0;
                                                         //              this.HousesOccupied18_19 =0;
                                                                       this.HousesOccupied19_20 =0;

                                                                       this.HousesOccupied14_15 =0;
                                                                       this.HousesOccupied15_16 =0;
                                                                       this.HousesOccupied16_17 =0;
                                                                       this.HousesOccupied17_18 =0;
                                                           //            this.HousesOccupied18_19 =0;
                                                                       this.HousesOccupied19_20 =0;
                                                                       this.HousesOccupied20_21 =0;

                                                                       this.First_Houses14_15 =0;
                                                                       this.First_Houses15_16 =0;
                                                                       this.First_Houses16_17 =0;
                                                                       this.First_Houses17_18 =0;
                                                             //          this.First_Houses18_19 =0;
                                                                       this.First_Houses19_20 =0;

                                                                        this.Second_Houses14_15 =0;
                                                                       this.Second_Houses15_16 =0;
                                                                       this.Second_Houses16_17 =0;
                                                                       this.Second_Houses17_18 =0;
                                                               //        this.Second_Houses18_19 =0;
                                                                       this.Second_Houses19_20 =0;

                                                                       this.Third_Houses14_15 =0;
                                                                       this.Third_Houses15_16 =0;
                                                                       this.Third_Houses16_17 =0;
                                                                        this.Third_Houses17_18 =0;
                                                                 //      this.Third_Houses18_19 =0;
                                                                       this.Third_Houses19_20 =0;
                                                                       this.Third_Houses20_21 =0;
                                                                    }
                                                                    if (Fin_Year =="2019-20")
                                                                    {
                                                                      this.Housesinvolved14_15 =0;
                                                                      this.Housesinvolved15_16 =0;
                                                                      this.Housesinvolved16_17  =0;
                                                                      this.Housesinvolved17_18   =0;
                                                                      this.Housesinvolved18_19 =0;
                                                                      //this.Housesinvolved19_20=0;

                                                                       this.FundsDisbursed_in_Houses14_15=0;
                                                                       this.FundsDisbursed_in_Houses15_16 =0;
                                                                       this.FundsDisbursed_in_Houses16_17 =0;
                                                                       this.FundsDisbursed_in_Houses17_18 =0;
                                                                       this.FundsDisbursed_in_Houses18_19 =0;
                                                                       //this.FundsDisbursed_in_Houses19_20 =0;

                                                                       this.Houses_Grounde14_15  =0;
                                                                                      this.Houses_Grounde15_16 =0;
                                                                                      this.Houses_Grounde16_17 =0;
                                                                                      this.Houses_Grounde17_18 =0;
                                                                                       this.Houses_Grounde18_19 =0;
                                                                      //                 this.Houses_Grounde19_20 =0;


                                                               this.Houses_Complete14_15 =0;

                                                               this.Houses_Complete15_16 =0;
                                                                 this.Houses_Complete16_17 =0;
                                                                  this.Houses_Complete17_18 =0;
                                                                   this.Houses_Complete18_19 =0;
                                                               //   this.Houses_Complete19_20 =0;

                                                                                        this.HousesOccupied14_15 =0;
                                                                                       this.HousesOccupied15_16 =0;
                                                                                       this.HousesOccupied16_17 =0;
                                                                                       this.HousesOccupied17_18 =0;
                                                                                       this.HousesOccupied18_19 =0;
                                                                         //              this.HousesOccupied19_20 =0;

                                                                                       this.HousesOccupied14_15 =0;
                                                                                       this.HousesOccupied15_16 =0;
                                                                                       this.HousesOccupied16_17 =0;
                                                                                       this.HousesOccupied17_18 =0;
                                                                                       this.HousesOccupied18_19 =0;
                                                                           //            this.HousesOccupied19_20 =0;
                                                                                       this.HousesOccupied20_21 =0;

                                                                                       this.First_Houses14_15 =0;
                                                                                       this.First_Houses15_16 =0;
                                                                                       this.First_Houses16_17 =0;
                                                                                       this.First_Houses17_18 =0;
                                                                                       this.First_Houses18_19 =0;
                                                                             //          this.First_Houses19_20 =0;

                                                                                        this.Second_Houses14_15 =0;
                                                                                       this.Second_Houses15_16 =0;
                                                                                       this.Second_Houses16_17 =0;
                                                                                       this.Second_Houses17_18 =0;
                                                                                       this.Second_Houses18_19 =0;
                                                                               //        this.Second_Houses19_20 =0;

                                                                                       this.Third_Houses14_15 =0;
                                                                                       this.Third_Houses15_16 =0;
                                                                                       this.Third_Houses16_17 =0;
                                                                                        this.Third_Houses17_18 =0;
                                                                                       this.Third_Houses18_19 =0;
                                                                                 //      this.Third_Houses19_20 =0;
                                                                                       this.Third_Houses20_21 =0;
                                                                                    }
  }
BindPMayData(stateCode, DisttCode, cityCode,Comp, Fin_Year)
{
    if (Fin_Year ==0)
    {
      this.service.sp_create_PMAY_DATACons(stateCode, DisttCode, cityCode,Comp).subscribe(result => { // new code
      ///first row data
      this.Fin_Year14_15 = result[0].FinYear;
      this.Housesinvolved14_15 = result[0].Housesinvolved;
      this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
      this.Houses_Grounde14_15 = result[0].Houses_Grounded;
      this.Houses_Complete14_15 = result[0].Houses_Completed;

      this.HousesOccupied14_15= result[0].HousesOccupied;
      this.First_Houses14_15 = result[0].First_Houses;
      this.Second_Houses14_15 = result[0].Second_Houses;
      this.Third_Houses14_15 = result[0].Third_Houses;


      //second row data
      this.Fin_Year15_16 = result[1].FinYear;
      this.Housesinvolved15_16 = result[1].Housesinvolved;
      this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
      this.Houses_Grounde15_16 = result[1].Houses_Grounded;
      this.Houses_Complete15_16 = result[1].Houses_Completed;
      this.HousesOccupied15_16= result[1].HousesOccupied;
      this.First_Houses15_16 = result[1].First_Houses;
      this.Second_Houses15_16 = result[1].Second_Houses;
      this.Third_Houses15_16 = result[1].Third_Houses;

      //Third row data
      this.Fin_Year16_17 = result[2].FinYear;
      this.Housesinvolved16_17 = result[2].Housesinvolved;
      this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
      this.Houses_Grounde16_17 = result[2].Houses_Grounded;
      this.Houses_Complete16_17 = result[2].Houses_Completed;
      this.HousesOccupied16_17= result[2].HousesOccupied;

      this.First_Houses16_17 = result[2].First_Houses;
      this.Second_Houses16_17 = result[2].Second_Houses;
      this.Third_Houses16_17 = result[2].Third_Houses;

      //Fourth row data
      this.Fin_Year17_18 = result[3].FinYear;
      this.Housesinvolved17_18 = result[3].Housesinvolved;
      this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
      this.Houses_Grounde17_18 = result[3].Houses_Grounded;
      this.Houses_Complete17_18 = result[3].Houses_Completed;
      this.HousesOccupied17_18= result[3].HousesOccupied;

      this.First_Houses17_18 = result[3].First_Houses;
      this.Second_Houses17_18 = result[3].Second_Houses;
      this.Third_Houses17_18 = result[3].Third_Houses;

      //Fifth row data
      this.Fin_Year18_19 = result[4].FinYear;
      this.Housesinvolved18_19 = result[4].Housesinvolved;
      this.FundsDisbursed_in_Houses18_19 = result[4].FundsDisbursed_in_Houses;
      this.Houses_Grounde18_19 = result[4].Houses_Grounded;
      this.Houses_Complete18_19 = result[4].Houses_Completed;
      this.HousesOccupied18_19= result[4].HousesOccupied;
      this.First_Houses18_19 = result[4].First_Houses;
      this.Second_Houses18_19 = result[4].Second_Houses;
      this.Third_Houses18_19 = result[4].Third_Houses;

            //Fifth row data
            this.Fin_Year19_20 = result[5].FinYear;
            this.Housesinvolved19_20 = result[5].Housesinvolved;
            this.FundsDisbursed_in_Houses19_20 = result[5].FundsDisbursed_in_Houses;
            this.Houses_Grounde19_20 = result[5].Houses_Grounded;
            this.Houses_Complete19_20 = result[5].Houses_Completed;
            this.HousesOccupied19_20= result[5].HousesOccupied;
            this.First_Houses19_20 = result[5].First_Houses;
            this.Second_Houses19_20 = result[5].Second_Houses;
            this.Third_Houses19_20 = result[5].Third_Houses;

            this.Test(Fin_Year);


                  let chart = new CanvasJS.Chart("chartPMAYU", {
                    theme: "light2",
                    animationEnabled: true,
                    exportEnabled: false,
                    title: {
                      text: "Physical Progress(No of Houses) Consolidated (PMAY(U))",
                      fontSize: "25",
                    },
                    backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
                        { label: "2014-15", y: this.Housesinvolved14_15 },
                        { label: "2015-16", y: this.Housesinvolved15_16 },
                        { label: "2016-17", y: this.Housesinvolved16_17 },
                        { label: "2017-18", y: this.Housesinvolved17_18 },
                        { label: "2018-19", y: this.Housesinvolved18_19 },
                        { label: "2019-20", y: this.Housesinvolved19_20 }
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
                        { label: "2014-15", y: this.FundsDisbursed_in_Houses14_15 },
                        { label: "2015-16", y: this.FundsDisbursed_in_Houses15_16 },
                        { label: "2016-17", y: this.FundsDisbursed_in_Houses16_17 },
                        { label: "2017-18", y: this.FundsDisbursed_in_Houses17_18 },
                        { label: "2018-19", y: this.FundsDisbursed_in_Houses18_19 },
                        { label: "2019-20", y: this.FundsDisbursed_in_Houses19_20 }
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
                        { label: "2014-15", y: this.Houses_Grounde14_15 },
                        { label: "2015-16", y: this.Houses_Grounde15_16 },
                        { label: "2016-17", y: this.Houses_Grounde16_17 },
                        { label: "2017-18", y: this.Houses_Grounde17_18 },
                        { label: "2018-19", y: this.Houses_Grounde18_19 },
                        { label: "2019-20", y: this.Houses_Grounde19_20 }
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
                        { label: "2014-15", y: this.HousesOccupied14_15 },
                        { label: "2015-16", y: this.HousesOccupied15_16 },
                        { label: "2016-17", y: this.HousesOccupied16_17 },
                        { label: "2017-18", y: this.HousesOccupied17_18 },
                        { label: "2018-19", y: this.HousesOccupied18_19 },
                        { label: "2019-20", y: this.HousesOccupied19_20 }
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
                        { label: "2014-15", y: this.Houses_Complete14_15 },
                        { label: "2015-16", y: this.Houses_Complete15_16 },
                        { label: "2016-17", y: this.Houses_Complete16_17 },
                        { label: "2017-18", y: this.Houses_Complete17_18 },
                        { label: "2018-19", y: this.Houses_Complete18_19 },
                        { label: "2019-20", y: this.Houses_Complete19_20 }
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
                        { label: "2014-15", y: this.Second_Houses14_15 },
                        { label: "2015-16", y: this.Second_Houses15_16 },
                        { label: "2016-17", y: this.Second_Houses16_17 },
                        { label: "2017-18", y: this.Second_Houses17_18 },
                        { label: "2018-19", y: this.Second_Houses18_19 },
                        { label: "2019-20", y: this.Second_Houses19_20 }
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
                        { label: "2014-15", y: this.Third_Houses14_15 },
                        { label: "2015-16", y: this.Third_Houses15_16 },
                        { label: "2016-17", y: this.Third_Houses16_17 },
                        { label: "2017-18", y: this.Third_Houses17_18 },
                        { label: "2018-19", y: this.Third_Houses18_19 },
                        { label: "2019-20", y: this.Third_Houses19_20 }
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
  if (Fin_Year !==0)
  {
    alert(Fin_Year);
        this.service.sp_create_PMAY_DATACons(stateCode, DisttCode, cityCode,Comp).subscribe(result => { // new code
        this.Fin_Year14_15 = result[0].FinYear;
        this.Housesinvolved14_15 = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15 = result[0].Houses_Grounded;
        this.Houses_Complete14_15 = result[0].Houses_Completed;
        this.HousesOccupied14_15= result[0].HousesOccupied;
        this.First_Houses14_15 = result[0].First_Houses;
        this.Second_Houses14_15 = result[0].Second_Houses;
        this.Third_Houses14_15 = result[0].Third_Houses;

        if (Fin_Year ="2014-15")
        {
          this.a =this.Fin_Year14_15 ;
          this.b = this.Housesinvolved14_15;
          this.c =this.FundsDisbursed_in_Houses14_15;
          this.d = this.Houses_Grounde14_15;
          this.e =this.Houses_Complete14_15 ;
          this.f =this.HousesOccupied14_15;
          this.g =this.First_Houses14_15;
          this.h =this.Second_Houses14_15;

          this.i = this.Third_Houses14_15;
        }
         

                    let chart = new CanvasJS.Chart("chartPMAYU", {
                      theme: "light2",
                      animationEnabled: true,
                      exportEnabled: false,
                      title: {
                        text: "Physical Data Consolidated (PMAYU)",
                        fontSize: "25",
                      },
                      backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
                          { label: "Housesinvolved14_15", y: this.b },
                          { label: "FundsDisbursed_in_Houses14_15", y: this.c },
                          { label: "Houses_Grounde14_15", y: this.d },
                          { label: "Houses_Complete14_15", y: this.e },
                          { label: "HousesOccupied14_15", y: this.f },
                          { label: "First_Houses14_15", y: this.g },
                          { label: "Third_Houses14_15", y: this.h } ,
                          { label: "Third_Houses15_16", y: this.i }
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



  BindISSRData(stateCode, DisttCode, cityCode,Comp, Fin_Year)
  {
       // alert();
        this.service.sp_create_ISSR_DATA(stateCode, DisttCode, cityCode,Comp).subscribe(result => { // new code
        ///first row data
        this.Fin_Year14_15 = result[0].FinYear;
        this.Housesinvolved14_15 = result[0].Housesinvolved;
        this.FundsDisbursed_in_Houses14_15 = result[0].FundsDisbursed_in_Houses;
        this.Houses_Grounde14_15 = result[0].Houses_Grounded;
        this.Houses_Complete14_15 = result[0].Houses_Completed;

        this.HousesOccupied14_15= result[0].HousesOccupied;
        this.First_Houses14_15 = result[0].First_Houses;
        this.Second_Houses14_15 = result[0].Second_Houses;
        this.Third_Houses14_15 = result[0].Third_Houses;

        //second row data
        this.Fin_Year15_16 = result[1].FinYear;
        this.Housesinvolved15_16 = result[1].Housesinvolved;
        this.FundsDisbursed_in_Houses15_16 = result[1].FundsDisbursed_in_Houses;
        this.Houses_Grounde15_16 = result[1].Houses_Grounded;
        this.Houses_Complete15_16 = result[1].Houses_Completed;
        this.HousesOccupied15_16= result[1].HousesOccupied;
        this.First_Houses15_16 = result[1].First_Houses;
        this.Second_Houses15_16 = result[1].Second_Houses;
        this.Third_Houses15_16 = result[1].Third_Houses;

        //Third row data
        this.Fin_Year16_17 = result[2].FinYear;
        this.Housesinvolved16_17 = result[2].Housesinvolved;
        this.FundsDisbursed_in_Houses16_17 = result[2].FundsDisbursed_in_Houses;
        this.Houses_Grounde16_17 = result[2].Houses_Grounded;
        this.Houses_Complete16_17 = result[2].Houses_Completed;
        this.HousesOccupied16_17= result[2].HousesOccupied;

        this.First_Houses16_17 = result[2].First_Houses;
        this.Second_Houses16_17 = result[2].Second_Houses;
        this.Third_Houses16_17 = result[2].Third_Houses;

        //Fourth row data
        this.Fin_Year17_18 = result[3].FinYear;
        this.Housesinvolved17_18 = result[3].Housesinvolved;
        this.FundsDisbursed_in_Houses17_18 = result[3].FundsDisbursed_in_Houses;
        this.Houses_Grounde17_18 = result[3].Houses_Grounded;
        this.Houses_Complete17_18 = result[3].Houses_Completed;
        this.HousesOccupied17_18= result[3].HousesOccupied;

        this.First_Houses17_18 = result[3].First_Houses;
        this.Second_Houses17_18 = result[3].Second_Houses;
        this.Third_Houses17_18 = result[3].Third_Houses;

        //Fifth row data
        this.Fin_Year18_19 = result[4].FinYear;
        this.Housesinvolved18_19 = result[4].Housesinvolved;
        this.FundsDisbursed_in_Houses18_19 = result[4].FundsDisbursed_in_Houses;
        this.Houses_Grounde18_19 = result[4].Houses_Grounded;
        this.Houses_Complete18_19 = result[4].Houses_Completed;
        this.HousesOccupied18_19= result[4].HousesOccupied;
        this.First_Houses18_19 = result[4].First_Houses;
        this.Second_Houses18_19 = result[4].Second_Houses;
        this.Third_Houses18_19 = result[4].Third_Houses;

              //Fifth row data
              this.Fin_Year19_20 = result[5].FinYear;
              this.Housesinvolved19_20 = result[5].Housesinvolved;
              this.FundsDisbursed_in_Houses19_20 = result[5].FundsDisbursed_in_Houses;
              this.Houses_Grounde19_20 = result[5].Houses_Grounded;
              this.Houses_Complete19_20 = result[5].Houses_Completed;
              this.HousesOccupied19_20= result[5].HousesOccupied;
              this.First_Houses19_20 = result[5].First_Houses;
              this.Second_Houses19_20 = result[5].Second_Houses;
              this.Third_Houses19_20 = result[5].Third_Houses;

              this.Test(Fin_Year);


                    let chart = new CanvasJS.Chart("chartISSR", {
                      theme: "light2",
                      animationEnabled: true,
                      exportEnabled: false,
                      title: {
                        text: "Physical Progress (Nos) for  ISSR under PMAY(U)",
                        fontSize: "25",
                      },
                      backgroundColor: this.backgroundColor,//"#B3E5FC",  commented
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
                        legendText: "Housesinvolved",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          // { x: "14-15", y: this.Fin_Year15_16 },
                          { label: "2014-15", y: this.Housesinvolved14_15 },
                          { label: "2015-16", y: this.Housesinvolved15_16 },
                          { label: "2016-17", y: this.Housesinvolved16_17 },
                          { label: "2017-18", y: this.Housesinvolved17_18 },
                          { label: "2018-19", y: this.Housesinvolved18_19 },
                          { label: "2019-20", y: this.Housesinvolved19_20 }
                        ]
                      },
                      {
                        type: "column",
                        dockInsidePlotArea: true,
                         indexLabel: "{y}", //HG
                        bevelEnabled: true,
                        showInLegend: true,
                        legendText: "FundsDisbursed_in_Houses",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          { label: "2014-15", y: this.FundsDisbursed_in_Houses14_15 },
                          { label: "2015-16", y: this.FundsDisbursed_in_Houses15_16 },
                          { label: "2016-17", y: this.FundsDisbursed_in_Houses16_17 },
                          { label: "2017-18", y: this.FundsDisbursed_in_Houses17_18 },
                          { label: "2018-19", y: this.FundsDisbursed_in_Houses18_19 },
                          { label: "2019-20", y: this.FundsDisbursed_in_Houses19_20 }
                        ]
                      },

                      {
                        type: "column",
                        dockInsidePlotArea: true,
                         indexLabel: "{y}", //HG
                        bevelEnabled: true,
                        showInLegend: true,
                        legendText: "Houses_Grounded",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          { label: "2014-15", y: this.Houses_Grounde14_15 },
                          { label: "2015-16", y: this.Houses_Grounde15_16 },
                          { label: "2016-17", y: this.Houses_Grounde16_17 },
                          { label: "2017-18", y: this.Houses_Grounde17_18 },
                          { label: "2018-19", y: this.Houses_Grounde18_19 },
                          { label: "2019-20", y: this.Houses_Grounde19_20 }
                        ]
                      },

                      {
                        type: "column",
                        dockInsidePlotArea: true,
                         indexLabel: "{y}", //HG
                        bevelEnabled: true,
                        showInLegend: true,
                        legendText: "Houses_Completed",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          { label: "2014-15", y: this.HousesOccupied14_15 },
                          { label: "2015-16", y: this.HousesOccupied15_16 },
                          { label: "2016-17", y: this.HousesOccupied16_17 },
                          { label: "2017-18", y: this.HousesOccupied17_18 },
                          { label: "2018-19", y: this.HousesOccupied18_19 },
                          { label: "2019-20", y: this.HousesOccupied19_20 }
                        ]
                      },
                      {
                        type: "column",
                        dockInsidePlotArea: true,
                         indexLabel: "{y}", //HG
                        bevelEnabled: true,
                        showInLegend: true,
                        legendText: "Houses Occupied",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          { label: "2014-15", y: this.Houses_Complete14_15 },
                          { label: "2015-16", y: this.Houses_Complete15_16 },
                          { label: "2016-17", y: this.Houses_Complete16_17 },
                          { label: "2017-18", y: this.Houses_Complete17_18 },
                          { label: "2018-19", y: this.Houses_Complete18_19 },
                          { label: "2019-20", y: this.Houses_Complete19_20 }
                        ]
                      },

                      {
                        type: "column",
                        dockInsidePlotArea: true,
                         indexLabel: "{y}", //HG
                        bevelEnabled: true,
                        showInLegend: true,
                        legendText: "First Inst",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          { label: "2014-15", y: this.First_Houses14_15 },
                          { label: "2015-16", y: this.First_Houses15_16 },
                          { label: "2016-17", y: this.First_Houses16_17 },
                          { label: "2017-18", y: this.First_Houses17_18 },
                          { label: "2018-19", y: this.First_Houses18_19 },
                          { label: "2019-20", y: this.First_Houses19_20 }
                        ]
                      },

                      {
                        type: "column",
                        dockInsidePlotArea: true,
                         indexLabel: "{y}", //HG
                        bevelEnabled: true,
                        showInLegend: true,
                        legendText: "Second Inst",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          { label: "2014-15", y: this.Second_Houses14_15 },
                          { label: "2015-16", y: this.Second_Houses15_16 },
                          { label: "2016-17", y: this.Second_Houses16_17 },
                          { label: "2017-18", y: this.Second_Houses17_18 },
                          { label: "2018-19", y: this.Second_Houses18_19 },
                          { label: "2019-20", y: this.Second_Houses19_20 }
                        ]
                      },

                      {
                        type: "column",
                        dockInsidePlotArea: true,
                         indexLabel: "{y}", //HG
                        bevelEnabled: true,
                        showInLegend: true,
                        legendText: "Third Inst",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          { label: "2014-15", y: this.Third_Houses14_15 },
                          { label: "2015-16", y: this.Third_Houses15_16 },
                          { label: "2016-17", y: this.Third_Houses16_17 },
                          { label: "2017-18", y: this.Third_Houses17_18 },
                          { label: "2018-19", y: this.Third_Houses18_19 },
                          { label: "2019-20", y: this.Third_Houses19_20 }
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
