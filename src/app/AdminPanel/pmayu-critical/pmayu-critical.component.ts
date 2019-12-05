import {NgbModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit, ViewChild, TemplateRef, Renderer2, ElementRef } from '@angular/core';
//import * as CanvasJS from 'F:/AngularAll/HFACharts/NBOCharts/src/canvasjs.min.js';
//import * as CanvasJS from '../..//canvasjs.min.js';
import * as CanvasJS from 'src/assets/canvasjs.min.js';
import { States, District, City, Charts, CompMaster, PMAY_DATA_New } from 'src/app/financeReport/model/chart';
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
import { PMAY_DATA } from 'src/app/financeReport/model/chart.model';


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

// @Component({
//   selector: 'app-pmayu-comp-wise',
//   templateUrl: './pmayu-comp-wise.component.html',
//   styleUrls: ['./pmayu-comp-wise.component.css']
// })

@Component({
  selector: 'app-pmayu-critical',
  templateUrl: './pmayu-critical.component.html',
  styleUrls: ['./pmayu-critical.component.css']
})

export class PMAYuCriticalComponent implements OnInit {
  //modalRef;
  display='none';
  display1='none';
  Codes:string;
  StateDetails: States[];
  // Demand: number;
  //today= new Date();
  //jstoday = '';

 // selectedColor = '';
  State:string;

  //modalRef;
  //StateDetails: States[];
  DisttDetails: Observable<District[]>;
  CityDetails: City[];
  stateCodes: string = "0";
  districtCodes: string = "0";
  cityCodes: string = "0";
//  DivisionCodes = "0";
  chart: Charts;
  
  compArray: string[];
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
   y: string;

  lstComp: CompMaster[];
  cidCount: string = '';
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
  StateShareNew: any;
   cid: number;
   Comp: string;
 
 // lstHFACodes: import("src/app/model/charts.model").getHFACodes[];
  lstHFACodes: import("src/app/financeReport/model/chart.model").getHFACodes[];
  DisabledCheckBox:boolean;
 
 
 // lstCid: number[] = [];
 lstYear: string[] = [];
 lstYearBene: string[] = [];

  selectedYears:any;
  //lstDivision: string[] = [];

     selectedColor = '';

  public backgroundColor: string;
   //---------------------------------
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
  IstInst14_15: string;
  IInd14_15: string;
  Third14_15: string;
  Grounded14_15: string;
  Completed14_15: string;
  IstInst15_16: string;
  IInd15_16: string;
  Third15_16: string;
  Grounded15_16: string;
  Completed15_16: string;
  IstInst16_17: string;
  IInd16_17: string;
  Third16_17: string;
  Grounded16_17: string;
  Completed16_17: string;
  IstInst17_18: string;
  IInd17_18: string;
  Third17_18: string;
  Grounded17_18: string;
  Completed17_18: string;
  IstInst18_19: string;
  IInd18_19: string;
  Third18_19: string;
  Grounded18_19: string;
  Completed18_19: string;
  IstInst19_20: string;
  IInd19_20: string;
  Third19_20: string;
  Grounded19_20: string;
  Completed19_20: string;
  MyChoice:any;
  tableDisplay:string="block";
  graphDisplay:string="none";

 // LstPayData1: import("f:/AngularAll/nbo/hfawebsite/Pmayu/src/app/financeReport/model/chart").PMAY_DATA_New[];
//--------------------------------------------
//constructor(private router: Router,private gevent:GlobalEvent, public service: GraphService, private modalService: NgbModal) {
  LstPayData:PMAY_DATA[];
  LstPayData1:PMAY_DATA_New[];

   constructor(private router: Router,private gevent:GlobalEvent, public service: GraphService, private modalService: NgbModal) {
    this.StateMessage = "Select State";
    this.DistrictMessage = "Select District";
    this.CityMessage = "Select City";
    this.stValue = "0";
    this.distValue = "0";
    this.cityValue = "0";

    // setInterval(()=>{
    //   this.jstoday = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    // },1000);

  
    // this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
    //   this.Houses_Grounded = result.Houses_Grounded;
    // });
    // this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
    //   this.SubsidyAmountCredited = result.SubsidyAmountCredited;
    // });
    // this.service.JNNURMCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
    //   // this.SubsidyAmountCredited = result.SubsidyAmountCredited;
    // });
    // this.service.DemandCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
    //   // this.SubsidyAmountCredited = result.SubsidyAmountCredited;
    // });

    this.service.GetStateWiseFinYrData(this.stateCodes).subscribe(result_State => {
    });

 this.service.sp_create_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(resultCritical => {
     this.Fin_Year14_15 = resultCritical[0].FinYear;
   });


   this.service.sp_create_PMAY_Critical_FinYearWiseDATA(this.stateCodes, this.districtCodes, this.cityCodes,"0").subscribe(result_PMU => {
  });
  }


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
   
 if (this.selectedYears.length >  0 )
 {
     this.sp_create_PMAY_Critical_DATANew(this.stateCodes, this.districtCodes, this.cityCodes,this.selectedYears);

      // this.service.sp_create_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_Status => { // new code
      //   this.LstPayData1 = result_Houses_Status;  
      // });
      this.service.sp_create__Grid_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0",this.selectedYears).subscribe(result_Houses_Status => { // new code
        this.LstPayData1 = result_Houses_Status;  
      });
      
  }
  else
  {
    this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes,"0","0");
  }
}
getMySelection(choice)
{
   // alert(choice);
    this.MyChoice =choice;
    if(choice === "Table")
    {
      this.tableDisplay="block";
      this.graphDisplay="none";
    }
    else{
      this.tableDisplay="none";
      this.graphDisplay="block";
    }
}


  ngOnInit() {
  
    // this.gevent.ColorObservable.subscribe(x=>{
    //   console.log('color:'+x);
    //   debugger;
    // });
   
  // this.backgroundColor = "#ffffff";// "#B3E5FC"// '#FFDD00';
   this.stateCodes = "0";
   this.districtCodes = "0";
   this.cityCodes = "0";
   this.cid = 0;
   this.Comp = "0";
   //this.Division = "0";
   //this.DivisionCodes = "0";
   this.State="--Select--";
    
   //LstPayData:PMAY_DATA[];
  //LstPayData1:PMAY_DATA[];
  

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
    
    //this.DivisionCodes ='HFA-1';
    this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes,"0", "0");

    this.service.sp_create_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_Status => { // new code
      this.LstPayData1 = result_Houses_Status;  
    });
  }

  getFinDetails (Fin_Year)
{
 // alert(Fin_Year);
  this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,Fin_Year) ;
  
}

  getStateDetails(stateCodes) {
   // debugger;
    //alert(stateCodes);
    
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
         
         this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"0")
            }
   
            this.service.sp_create_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_Status => { // new code
              this.LstPayData1 = result_Houses_Status;  
            });
     }
    else {
      this.stateCodes = stateCodes;
      this.service.DisttList(stateCodes);

      this.service.CityList(this.districtCodes);//
      this.DisabledCheckBox=true;
       this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"0")
    
       this.service.sp_create_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_Status => { // new code
        this.LstPayData1 = result_Houses_Status;  
      });
      }

  }
  
  getDistrictDetails(districtCodes) {

      if (districtCodes == "0") {
      this.cityValue = "0";
      this.CityMessage = "Select City";
      this.service.CityDetails = [];
      this.cityCodes = "0";

      this.distValue = "0";
      this.cityValue = "0";
      if (districtCodes == "0") {
        this.districtCodes = "0";
        this.cityCodes = "0";
      }
               
      this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"0")

    }
    else {
      this.districtCodes = districtCodes;
      this.service.CityList(districtCodes);
               
      this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"0")

      this.service.sp_create_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_Status => { // new code
        this.LstPayData1 = result_Houses_Status;  
      });
    }
  }
  getCityDetails(cityCodes) {
      if (cityCodes == "0") {
      this.cityValue = "0";
      this.CityMessage = "Select City";
      this.service.CityDetails = [];
      this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"0")

    }
    else  
      this.cityCodes = cityCodes;
      this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"0")
      this.service.sp_create_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_Status => { // new code
        this.LstPayData1 = result_Houses_Status;  
      });
  }
  BindPMAY_Critical_Data(stateCode, DisttCode, cityCode,Comp,Fin_Year)
{
  //alert(DisttCode);
    // this.Fin_Year =Fin_Year;
    // alert(Fin_Year);
      Comp ="0";
      this.service.sp_create_PMAY_Critical_DATA(stateCode, DisttCode, cityCode,Comp,"0").subscribe(result => { // new code
      ///first row data

    //  this.Fin_Year14_15 = result[0].FinYear;
    try {

    this.Housesinvolved14_15 = result[0].Housesinvolved;
      this.IstInst14_15 = result[0].Istinstyettobereleased;
      this.IInd14_15 = result[0].IIndinstyettobereleased;
      this.Third14_15 = result[0].ThirdInstyettobereleased;
      this.Grounded14_15 = result[0].GroundedbutyettobeCompleted;
      this.Completed14_15 = result[0].CompletedbutyettobeOccupied ;
    }
    catch{}
    finally{}
    
 
      //second row data
      //this.Fin_Year15_16 = result[1].FinYear;
      try {

      this.Housesinvolved15_16 = result[1].Housesinvolved;
      this.IstInst15_16 = result[1].Istinstyettobereleased;
      this.IInd15_16 = result[1].IIndinstyettobereleased;
      this.Third15_16 = result[1].ThirdInstyettobereleased;
      this.Grounded15_16 = result[1].GroundedbutyettobeCompleted;
      this.Completed15_16 = result[1].CompletedbutyettobeOccupied ;
    }
    catch{}
    finally{}
     //Third row data
      try {
        //this.Fin_Year16_17 = result[2].FinYear;
        this.Housesinvolved16_17 = result[2].Housesinvolved;
      
        this.IstInst16_17 = result[2].Istinstyettobereleased;
        this.IInd16_17 = result[2].IIndinstyettobereleased;
        this.Third16_17 = result[2].ThirdInstyettobereleased;
        this.Grounded16_17 = result[2].GroundedbutyettobeCompleted;
        this.Completed16_17 = result[2].CompletedbutyettobeOccupied ;
      }
      catch{}
      finally{}
      //Fourth row data
      //this.Fin_Year17_18 = result[3].FinYear;
      try {

      this.Housesinvolved17_18 = result[3].Housesinvolved;

        this.IstInst17_18 = result[3].Istinstyettobereleased;
        this.IInd17_18 = result[3].IIndinstyettobereleased;
        this.Third17_18 = result[3].ThirdInstyettobereleased;
        this.Grounded17_18 = result[3].GroundedbutyettobeCompleted;
        this.Completed17_18 = result[3].CompletedbutyettobeOccupied ;
      }
      catch{}
      finally{}

      //Fifth row data
      //this.Fin_Year18_19 = result[4].FinYear;
      try {
      this.Housesinvolved18_19 = result[4].Housesinvolved;
        this.IstInst18_19 = result[4].Istinstyettobereleased;
        this.IInd18_19 = result[4].IIndinstyettobereleased;
        this.Third18_19 = result[4].ThirdInstyettobereleased;
        this.Grounded18_19 = result[4].GroundedbutyettobeCompleted;
        this.Completed18_19 = result[4].CompletedbutyettobeOccupied ;
      }
      catch{}
      finally{}


            //Sixth row data
          //  this.Fin_Year19_20 = result[5].FinYear;
          try {      
          
            this.Housesinvolved19_20 = result[5].Housesinvolved;
            this.IstInst19_20 = result[5].Istinstyettobereleased;
            this.IInd19_20 = result[5].IIndinstyettobereleased;
            this.Third19_20 = result[5].ThirdInstyettobereleased;
            this.Grounded19_20 = result[5].GroundedbutyettobeCompleted;
            this.Completed19_20 = result[5].CompletedbutyettobeOccupied ;
          }
          catch{}
          finally{}

                  let chart = new CanvasJS.Chart("chartPMAY_Critical", {
                    theme: "light2",
                    animationEnabled: true,
                    exportEnabled: false,
                    title: {
                      text: " Critical PMAYu Data Consolidated",
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
                        { label: "14_15", y: this.Housesinvolved14_15 },
                        { label: "15_16", y: this.Housesinvolved15_16 },
                        { label: "16_17", y: this.Housesinvolved16_17 },
                        { label: "17_18", y: this.Housesinvolved17_18 },  
                        { label: "18_19", y: this.Housesinvolved18_19 },
                        { label: "19_20", y: this.Housesinvolved19_20 } 
                      ]
                    },
                    {
                      type: "column",
                      dockInsidePlotArea: true,
                       indexLabel: "{y}", //HG
                      bevelEnabled: true,
                      showInLegend: true,
                      legendText: "Ist inst yet to be released",
                       stValue: "Q",
                      indexLabelFontSize: 12,
                      indexLabelOrientation: "vertical",
                      dataPoints: [
                        { label: "14_15", y: this.IstInst14_15 },
                        { label: "15_16", y: this.IstInst15_16 },
                        { label: "16_17", y: this.IstInst16_17 },
                        { label: "17_18", y: this.IstInst17_18 },  
                        { label: "18_19", y: this.IstInst18_19 },
                        { label: "19_20", y: this.IstInst19_20 } 
                      ]
                    },

                    {
                      type: "column",
                      dockInsidePlotArea: true,
                       indexLabel: "{y}", //HG
                      bevelEnabled: true,
                      showInLegend: true,
                      legendText: "IInd inst yet to be released",
                       stValue: "Q",
                      indexLabelFontSize: 12,
                      indexLabelOrientation: "vertical",
                      dataPoints: [
                        { label: "14_15", y: this.IInd14_15 },
                        { label: "15_16", y: this.IInd15_16 },
                        { label: "16_17", y: this.IInd16_17 },
                        { label: "17_18", y: this.IInd17_18 },  
                        { label: "18_19", y: this.IInd18_19 },
                        { label: "19_20", y: this.IInd19_20 } 
                      ]
                    },

                    {
                      type: "column",
                      dockInsidePlotArea: true,
                       indexLabel: "{y}", //HG
                      bevelEnabled: true,
                      showInLegend: true,
                      legendText: "Third Inst yet to be released",
                       stValue: "Q",
                      indexLabelFontSize: 12,
                      indexLabelOrientation: "vertical",
                      dataPoints: [
                        { label: "14_15", y: this.Third14_15 },
                        { label: "15_16", y: this.Third15_16 },
                        { label: "16_17", y: this.Third16_17 },
                        { label: "17_18", y: this.Third17_18 },  
                        { label: "18_19", y: this.Third18_19 },
                        { label: "19_20", y: this.Third19_20 } 
                      ]
                    },

                    {
                      type: "column",
                      dockInsidePlotArea: true,
                       indexLabel: "{y}", //HG
                      bevelEnabled: true,
                      showInLegend: true,
                      legendText: "Grounded but yet to be Completed",
                       stValue: "Q",
                      indexLabelFontSize: 12,
                      indexLabelOrientation: "vertical",
                      dataPoints: [
                        { label: "14_15", y: this.Grounded14_15 },
                        { label: "15_16", y: this.Grounded15_16 },
                        { label: "16_17", y: this.Grounded16_17 },
                        { label: "17_18", y: this.Grounded17_18 },  
                        { label: "18_19", y: this.Grounded18_19 },
                        { label: "19_20", y: this.Grounded19_20 } 
                      ]
                    },

                    {
                      type: "column",
                      dockInsidePlotArea: true,
                       indexLabel: "{y}", //HG
                      bevelEnabled: true,
                      showInLegend: true,
                      legendText: "Completed but yet to be Occupied",
                       stValue: "Q",
                      indexLabelFontSize: 12,
                      indexLabelOrientation: "vertical",
                      dataPoints: [
                        { label: "14_15", y: this.Completed14_15 },
                        { label: "15_16", y: this.Completed15_16 },
                        { label: "16_17", y: this.Completed16_17 },
                        { label: "17_18", y: this.Completed17_18 },  
                        { label: "18_19", y: this.Completed18_19 },
                        { label: "19_20", y: this.Completed19_20 } 
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


  sp_create_PMAY_Critical_DATANew(stateCode, DisttCode, cityCode, Fin_Year )
  {
    var x3;
    var x4;
    var x5;
    var x6;
    var x7;
    var x8;
    
         var str = Fin_Year ;//'SUM(BENE2014_15),SUM(BENE2015_16)';
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
            var x2 =  splitted[0].substring(8,str.length-1);
  
        }
       if (splitted.length ==1)
       {
        // alert(1);
            this.service.sp_create_PMAY_Critical_FinYearWiseDATA(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
            if (result[0].FinYear !="0" )
            {
              //try{
                this.Fin_Year14_15 = result[0].FinYear;
                this.Housesinvolved14_15 = result[0].Housesinvolved;
                this.FundsDisbursed_in_Houses14_15 = result[0].Istinstyettobereleased;
                this.Houses_Grounde14_15 = result[0].IIndinstyettobereleased;
                this.Houses_Complete14_15 = result[0].ThirdInstyettobereleased;
                this.HousesOccupied14_15 = result[0].GroundedbutyettobeCompleted;
                this.First_Houses14_15 = result[0].CompletedbutyettobeOccupied; 
               }
 
   
            let chart = new CanvasJS.Chart("chartPMAY_Critical", {
              theme: "light2",
              animationEnabled: true,
              exportEnabled: false,
              title: {
                text: " Physical Data Consolidated (PMAY_Critical)",
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
                  { label: x2, y: this.Housesinvolved14_15 },
                  { label: x3, y: this.FundsDisbursed_in_Houses14_15 },
                  { label: x4, y: this.Houses_Grounde14_15 },
                  { label: x5, y: this.Houses_Complete14_15 },
                  { label: x6, y: this.HousesOccupied14_15 },
                  { label: x7, y: this.First_Houses14_15 },
           
                ]
              },
              // {
              //   type: "column",
              //   dockInsidePlotArea: true,
              //    indexLabel: "{y}", //HG
              //   bevelEnabled: true,
              //   showInLegend: true,
              //   legendText: "FundsDisbursed_in_Houses",
              //    stValue: "Q",
              //   indexLabelFontSize: 12,
              //   indexLabelOrientation: "vertical",
              //   dataPoints: [
              //     { label: x2, y: this.FundsDisbursed_in_Houses14_15 },
              //   ]
              // },
    
              // {
              //   type: "column",
              //   dockInsidePlotArea: true,
              //    indexLabel: "{y}", //HG
              //   bevelEnabled: true,
              //   showInLegend: true,
              //   legendText: "Houses_Grounded",
              //    stValue: "Q",
              //   indexLabelFontSize: 12,
              //   indexLabelOrientation: "vertical",
              //   dataPoints: [
              //     { label: x2, y: this.Houses_Grounde14_15 },
              //   ]
              // },
    
              // {
              //   type: "column",
              //   dockInsidePlotArea: true,
              //    indexLabel: "{y}", //HG
              //   bevelEnabled: true,
              //   showInLegend: true,
              //   legendText: "Houses_Completed",
              //    stValue: "Q",
              //   indexLabelFontSize: 12,
              //   indexLabelOrientation: "vertical",
              //   dataPoints: [
              //     { label: x2, y: this.Houses_Complete14_15 },
              //   ]
              // },
    
              // {
              //   type: "column",
              //   dockInsidePlotArea: true,
              //    indexLabel: "{y}", //HG
              //   bevelEnabled: true,
              //   showInLegend: true,
              //   legendText: "Houses_Occupied",
              //    stValue: "Q",
              //   indexLabelFontSize: 12,
              //   indexLabelOrientation: "vertical",
              //   dataPoints: [
              //     { label: x2, y: this.HousesOccupied14_15 },
              //   ]
              // },
    
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
        this.service.sp_create_PMAY_Critical_FinYearWiseDATA(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
              
   
          if (result[0].FinYear !="0" )
          {
            //try{
              this.Fin_Year14_15 = result[0].FinYear;
              this.Housesinvolved14_15 = result[0].Housesinvolved;
              this.FundsDisbursed_in_Houses14_15 = result[0].Istinstyettobereleased;
              this.Houses_Grounde14_15 = result[0].IIndinstyettobereleased;
              this.Houses_Complete14_15 = result[0].ThirdInstyettobereleased;
              this.HousesOccupied14_15 = result[0].GroundedbutyettobeCompleted;
              this.First_Houses14_15 = result[0].CompletedbutyettobeOccupied; 
             }
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                if (result[1].FinYear !="0" )
                {
                  //try{
                    this.Fin_Year15_16 = result[1].FinYear;
                    this.Housesinvolved15_16 = result[1].Housesinvolved;
                    this.FundsDisbursed_in_Houses15_16 = result[1].Istinstyettobereleased;
                    this.Houses_Grounde15_16 = result[1].IIndinstyettobereleased;
                    this.Houses_Complete15_16 = result[1].ThirdInstyettobereleased;
                    this.HousesOccupied15_16 = result[1].GroundedbutyettobeCompleted;
                    this.First_Houses15_16 = result[1].CompletedbutyettobeOccupied; 
                   }
            }
            catch{}
            finally{}
  
  
           let chart = new CanvasJS.Chart("chartPMAY_Critical", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: " Physical Data Consolidated (PMAY_Critical)",
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
                { label: Y1, y: this.Housesinvolved15_16 }
  
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
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16 }
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
                { label: Y1, y: this.Houses_Grounde15_16 }
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
                { label: Y1, y: this.Houses_Complete15_16 }
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
                { label: Y1, y: this.HousesOccupied15_16 }
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
                { label: Y1, y: this.First_Houses15_16 }
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
        this.service.sp_create_PMAY_Critical_FinYearWiseDATA(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        
        //   this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
            this.Fin_Year14_15 = result[0].FinYear;
            this.Housesinvolved14_15 = result[0].Housesinvolved;
            this.FundsDisbursed_in_Houses14_15 = result[0].Istinstyettobereleased;
            this.Houses_Grounde14_15 = result[0].IIndinstyettobereleased;
            this.Houses_Complete14_15 = result[0].ThirdInstyettobereleased;
            this.HousesOccupied14_15 = result[0].GroundedbutyettobeCompleted;
            this.First_Houses14_15 = result[0].CompletedbutyettobeOccupied; 
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16 = result[1].FinYear;
                this.Housesinvolved15_16 = result[1].Housesinvolved;
                this.FundsDisbursed_in_Houses15_16 = result[1].Istinstyettobereleased;
                this.Houses_Grounde15_16 = result[1].IIndinstyettobereleased;
                this.Houses_Complete15_16 = result[1].ThirdInstyettobereleased;
                this.HousesOccupied15_16 = result[1].GroundedbutyettobeCompleted;
                this.First_Houses15_16 = result[1].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17 = result[2].FinYear;
                    this.Housesinvolved16_17 = result[2].Housesinvolved;
                    this.FundsDisbursed_in_Houses16_17 = result[2].Istinstyettobereleased;
                    this.Houses_Grounde16_17= result[2].IIndinstyettobereleased;
                    this.Houses_Complete16_17 = result[2].ThirdInstyettobereleased;
                    this.HousesOccupied16_17 = result[2].GroundedbutyettobeCompleted;
                    this.First_Houses16_17 = result[2].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}
  
  
           let chart = new CanvasJS.Chart("chartPMAY_Critical", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: " Physical Data Consolidated (AHP)",
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
                { label: z1, y: this.Housesinvolved16_17 }
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
                { label: z1, y: this.FundsDisbursed_in_Houses16_17 }
  
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
                { label: z1, y: this.Houses_Grounde16_17 }
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
                { label: z1, y: this.Houses_Complete16_17 }
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
                { label: z1, y: this.HousesOccupied16_17} 
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
                { label: z1, y: this.First_Houses16_17 }
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
  
        this.service.sp_create_PMAY_Critical_FinYearWiseDATA(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        
         //  this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
               this.Fin_Year14_15 = result[0].FinYear;
            this.Housesinvolved14_15 = result[0].Housesinvolved;
            this.FundsDisbursed_in_Houses14_15 = result[0].Istinstyettobereleased;
            this.Houses_Grounde14_15 = result[0].IIndinstyettobereleased;
            this.Houses_Complete14_15 = result[0].ThirdInstyettobereleased;
            this.HousesOccupied14_15 = result[0].GroundedbutyettobeCompleted;
            this.First_Houses14_15 = result[0].CompletedbutyettobeOccupied; 
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16 = result[1].FinYear;
                this.Housesinvolved15_16 = result[1].Housesinvolved;
                this.FundsDisbursed_in_Houses15_16 = result[1].Istinstyettobereleased;
                this.Houses_Grounde15_16 = result[1].IIndinstyettobereleased;
                this.Houses_Complete15_16 = result[1].ThirdInstyettobereleased;
                this.HousesOccupied15_16 = result[1].GroundedbutyettobeCompleted;
                this.First_Houses15_16 = result[1].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17 = result[2].FinYear;
                    this.Housesinvolved16_17 = result[2].Housesinvolved;
                    this.FundsDisbursed_in_Houses16_17 = result[2].Istinstyettobereleased;
                    this.Houses_Grounde16_17= result[2].IIndinstyettobereleased;
                    this.Houses_Complete16_17 = result[2].ThirdInstyettobereleased;
                    this.HousesOccupied16_17 = result[2].GroundedbutyettobeCompleted;
                    this.First_Houses16_17 = result[2].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}
  
          try {
            this.Fin_Year17_18 = result[3].FinYear;
            this.Housesinvolved17_18 = result[3].Housesinvolved;
            this.FundsDisbursed_in_Houses17_18 = result[3].Istinstyettobereleased;
            this.Houses_Grounde17_18= result[3].IIndinstyettobereleased;
            this.Houses_Complete17_18 = result[3].ThirdInstyettobereleased;
            this.HousesOccupied17_18 = result[3].GroundedbutyettobeCompleted;
            this.First_Houses17_18 = result[3].CompletedbutyettobeOccupied; 
        }
        catch{}
        finally{}
  
  
           let chart = new CanvasJS.Chart("chartPMAY_Critical", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: " Physical Data Consolidated (PMAY_Critical)",
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
                { label: z2, y: this.Housesinvolved17_18 }
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
                { label: z2, y: this.FundsDisbursed_in_Houses17_18 }
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
                { label: z2, y: this.Houses_Grounde17_18 }
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
                { label: z2, y: this.Houses_Complete17_18 }
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
                { label: z2, y: this.HousesOccupied17_18} 
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
                { label: z2, y: this.First_Houses17_18 }
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
        this.service.sp_create_PMAY_Critical_FinYearWiseDATA(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
           
       // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
            this.Fin_Year14_15 = result[0].FinYear;
            this.Housesinvolved14_15 = result[0].Housesinvolved;
            this.FundsDisbursed_in_Houses14_15 = result[0].Istinstyettobereleased;
            this.Houses_Grounde14_15 = result[0].IIndinstyettobereleased;
            this.Houses_Complete14_15 = result[0].ThirdInstyettobereleased;
            this.HousesOccupied14_15 = result[0].GroundedbutyettobeCompleted;
            this.First_Houses14_15 = result[0].CompletedbutyettobeOccupied; 
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16 = result[1].FinYear;
                this.Housesinvolved15_16 = result[1].Housesinvolved;
                this.FundsDisbursed_in_Houses15_16 = result[1].Istinstyettobereleased;
                this.Houses_Grounde15_16 = result[1].IIndinstyettobereleased;
                this.Houses_Complete15_16 = result[1].ThirdInstyettobereleased;
                this.HousesOccupied15_16 = result[1].GroundedbutyettobeCompleted;
                this.First_Houses15_16 = result[1].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17 = result[2].FinYear;
                    this.Housesinvolved16_17 = result[2].Housesinvolved;
                    this.FundsDisbursed_in_Houses16_17 = result[2].Istinstyettobereleased;
                    this.Houses_Grounde16_17= result[2].IIndinstyettobereleased;
                    this.Houses_Complete16_17 = result[2].ThirdInstyettobereleased;
                    this.HousesOccupied16_17 = result[2].GroundedbutyettobeCompleted;
                    this.First_Houses16_17 = result[2].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}
  
          try {
            this.Fin_Year17_18 = result[3].FinYear;
            this.Housesinvolved17_18 = result[3].Housesinvolved;
            this.FundsDisbursed_in_Houses17_18 = result[3].Istinstyettobereleased;
            this.Houses_Grounde17_18= result[3].IIndinstyettobereleased;
            this.Houses_Complete17_18 = result[3].ThirdInstyettobereleased;
            this.HousesOccupied17_18 = result[3].GroundedbutyettobeCompleted;
            this.First_Houses17_18 = result[3].CompletedbutyettobeOccupied; 
        }
        catch{}
        finally{}
  
        try {
          this.Fin_Year18_19 = result[4].FinYear;
          this.Housesinvolved18_19 = result[4].Housesinvolved;
          this.FundsDisbursed_in_Houses18_19 = result[4].Istinstyettobereleased;
          this.Houses_Grounde18_19= result[4].IIndinstyettobereleased;
          this.Houses_Complete18_19 = result[4].ThirdInstyettobereleased;
          this.HousesOccupied18_19 = result[4].GroundedbutyettobeCompleted;
          this.First_Houses18_19 = result[4].CompletedbutyettobeOccupied; 
    }
      catch{}
      finally{}
  
  
           let chart = new CanvasJS.Chart("chartPMAY_Critical", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: " Physical Data Consolidated (PMAY_Critical)",
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
                { label: z3, y: this.Housesinvolved18_19 }
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
        this.service.sp_create_PMAY_Critical_FinYearWiseDATA(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
           
       // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
 
            this.Fin_Year14_15 = result[0].FinYear;
            this.Housesinvolved14_15 = result[0].Housesinvolved;
            this.FundsDisbursed_in_Houses14_15 = result[0].Istinstyettobereleased;
            this.Houses_Grounde14_15 = result[0].IIndinstyettobereleased;
            this.Houses_Complete14_15 = result[0].ThirdInstyettobereleased;
            this.HousesOccupied14_15 = result[0].GroundedbutyettobeCompleted;
            this.First_Houses14_15 = result[0].CompletedbutyettobeOccupied; 
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16 = result[1].FinYear;
                this.Housesinvolved15_16 = result[1].Housesinvolved;
                this.FundsDisbursed_in_Houses15_16 = result[1].Istinstyettobereleased;
                this.Houses_Grounde15_16 = result[1].IIndinstyettobereleased;
                this.Houses_Complete15_16 = result[1].ThirdInstyettobereleased;
                this.HousesOccupied15_16 = result[1].GroundedbutyettobeCompleted;
                this.First_Houses15_16 = result[1].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17 = result[2].FinYear;
                    this.Housesinvolved16_17 = result[2].Housesinvolved;
                    this.FundsDisbursed_in_Houses16_17 = result[2].Istinstyettobereleased;
                    this.Houses_Grounde16_17= result[2].IIndinstyettobereleased;
                    this.Houses_Complete16_17 = result[2].ThirdInstyettobereleased;
                    this.HousesOccupied16_17 = result[2].GroundedbutyettobeCompleted;
                    this.First_Houses16_17 = result[2].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}
  
          try {
            this.Fin_Year17_18 = result[3].FinYear;
            this.Housesinvolved17_18 = result[3].Housesinvolved;
            this.FundsDisbursed_in_Houses17_18 = result[3].Istinstyettobereleased;
            this.Houses_Grounde17_18= result[3].IIndinstyettobereleased;
            this.Houses_Complete17_18 = result[3].ThirdInstyettobereleased;
            this.HousesOccupied17_18 = result[3].GroundedbutyettobeCompleted;
            this.First_Houses17_18 = result[3].CompletedbutyettobeOccupied; 
        }
        catch{}
        finally{}
  
        try {
          this.Fin_Year18_19 = result[4].FinYear;
          this.Housesinvolved18_19 = result[4].Housesinvolved;
          this.FundsDisbursed_in_Houses18_19 = result[4].Istinstyettobereleased;
          this.Houses_Grounde18_19= result[4].IIndinstyettobereleased;
          this.Houses_Complete18_19 = result[4].ThirdInstyettobereleased;
          this.HousesOccupied18_19 = result[4].GroundedbutyettobeCompleted;
          this.First_Houses18_19 = result[4].CompletedbutyettobeOccupied; 
    }
      catch{}
      finally{}

      try {
        this.Fin_Year19_20 = result[5].FinYear;
        this.Housesinvolved19_20 = result[5].Housesinvolved;
        this.FundsDisbursed_in_Houses19_20 = result[5].Istinstyettobereleased;
        this.Houses_Grounde19_20= result[5].IIndinstyettobereleased;
        this.Houses_Complete19_20 = result[5].ThirdInstyettobereleased;
        this.HousesOccupied19_20 = result[5].GroundedbutyettobeCompleted;
        this.First_Houses19_20 = result[5].CompletedbutyettobeOccupied; 
    }
    catch{}
    finally{}

           let chart = new CanvasJS.Chart("chartPMAY_Critical", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: " Physical Data Consolidated (PMAY_Critical)",
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
                { label: z2, y: this.First_Houses17_18 },
                { label: z3, y: this.First_Houses18_19 },
                { label: z4, y: this.First_Houses19_20 }
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
  
}
