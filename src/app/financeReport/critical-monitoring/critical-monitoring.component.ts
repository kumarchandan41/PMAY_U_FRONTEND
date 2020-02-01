  
import {NgbModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, TemplateRef, Renderer2, ElementRef } from '@angular/core';
import * as CanvasJS from 'src/assets/canvasjs.min.js';
import { States, District, City, Charts, CompMaster, PMAY_DATA_New, PMAY_DATA_Financial } from 'src/app/financeReport/model/chart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/financeReport/service/graph.service';
 import { HttpClient } from '@angular/common/http';
 import { promise } from 'protractor';
 import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
 import { lstatSync } from 'fs';
 import { Alert } from 'selenium-webdriver';
 import { stringify } from 'querystring';
 import {formatDate } from '@angular/common';
 import { EventEmitter, Input, Output } from '@angular/core';
import { GlobalEvent } from 'src/app/Shared/global-event';
import { PMAY_DATA } from 'src/app/financeReport/model/chart.model';
import { find } from 'rxjs/operators';


@Component({
  selector: 'app-critical-monitoring',
  templateUrl: './critical-monitoring.component.html',
  styleUrls: ['./critical-monitoring.component.css']
})
export class CriticalMonitoringComponent implements OnInit {
  modalRef;
  display='none';
  display1='none';
  Codes:string;
  StateDetails: States[];
  State:string;

  DisttDetails: Observable<District[]>;
  CityDetails: City[];
  stateCodes: string = "0";
  districtCodes: string = "0";
  cityCodes: string = "0";
  DivisionCodes = "0";
  
  chart: Charts;
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
  
  label: string;
  y: string;


   lstComp: CompMaster[];

  
   cid: number;
   Comp: string;
 
   lstHFACodes: import("src/app/financeReport/model/chart.model").getHFACodes[];
   DisabledCheckBox:boolean;

   
  
  StateShareS: number;
  BeneficiaryShareS: number;
  CentralShareS: number;


   Division: string;
   lstYear: string[] = [];
   selectedYears:any;

  lstDivision: string[] = [];


  lstCmp: string[] = [];
   selectedComp:any;
   

   jstoday = '';

  selectedColor = '';
 public backgroundColor: string;
 
        Fin_Year14_15_C : any;
  
  Housesinvolved14_15_C : any;
  Houses_Grounded_C: number;
  SubsidyAmountCredited_C: number;

       FundsDisbursed_in_Houses14_15_C : any =0;
       Houses_Grounde14_15_C  : any =0; 
       Houses_Complete14_15_C  : any =0;
       First_Houses14_15_C : any =0;
       Second_Houses14_15_C  : any =0;
       Third_Houses14_15_C : any =0;

       Fin_Year15_16_C : any =0;
       Housesinvolved15_16_C : any =0;
       FundsDisbursed_in_Houses15_16_C : any =0;
       Houses_Grounde15_16_C  : any =0; 
       Houses_Complete15_16_C  : any =0;
       First_Houses15_16_C : any =0;
       Second_Houses15_16_C  : any =0;
       Third_Houses15_16_C : any =0;
  Fin_Year16_17_C: any =0;
  Housesinvolved16_17_C: any =0;
  FundsDisbursed_in_Houses16_17_C: any =0;
  Houses_Grounde16_17_C: any =0;
  Houses_Complete16_17_C: any =0;
  First_Houses16_17_C: any =0;
  Second_Houses16_17_C: any =0;
  Third_Houses16_17_C: any =0;
  Fin_Year17_18_C: any =0;
  Housesinvolved17_18_C: any =0;
  FundsDisbursed_in_Houses17_18_C: any =0;
  Houses_Grounde17_18_C: any =0;
  Houses_Complete17_18_C: any =0;
  First_Houses17_18_C: any =0;
  Third_Houses17_18_C: any =0;
  Second_Houses17_18_C: any =0;

  Fin_Year18_19_C: any =0;
  Housesinvolved18_19_C: any =0;
  FundsDisbursed_in_Houses18_19_C: any =0;
  Houses_Grounde18_19_C: any =0;
  Houses_Complete18_19_C: any =0;
  First_Houses18_19_C: any =0;
  Third_Houses18_19_C: any =0;
  Second_Houses18_19_C: any =0;

  Fin_Year19_20_C: any;
  Housesinvolved19_20_C: any =0;
  FundsDisbursed_in_Houses19_20_C: any =0;
  Houses_Grounde19_20_C: any =0;
  Houses_Complete19_20_C: any =0;
  First_Houses19_20_C: any =0;
  Third_Houses19_20_C: any =0;
  Second_Houses19_20_C: any =0;
  HousesOccupied18_19_C: any =0;
  HousesOccupied17_18_C: any =0;
  HousesOccupied16_17_C: any =0;
  HousesOccupied15_16_C: any =0;
  HousesOccupied14_15_C: any =0;
  HousesOccupied19_20_C: any =0;
  First_Houses20_21_C: any =0;
  HousesOccupied20_21_C: any =0;
  Second_Houses20_21_C: any =0;
  Third_Houses20_21_C: any =0;
  FundsDisbursed_in_Houses20_21_C: any =0;
  Housesinvolved20_21_C: any =0;
  Houses_Grounde20_21_C: any =0;
  Houses_Complete20_21_C: any =0;
  IstInst14_15_C: string;
  IInd14_15_C: string;
  Third14_15_C: string;
  
   Grounded14_15_C: string;
   Completed14_15_C: string;
   IstInst15_16_C: string;
   IInd15_16_C: string;
    Third15_16_C: string;
   Grounded15_16_C: string;
   Completed15_16_C: string;
   IstInst16_17_C: string;
   IInd16_17_C: string;
   Third16_17_C: string;
   Grounded16_17_C: string;
   Completed16_17_C: string;
   IstInst17_18_C: string;
   IInd17_18_C: string;
    Third17_18_C: string;
   Grounded17_18_C: string;
   Completed17_18_C: string;

   IstInst18_19_C: string;
   IInd18_19_C: string;
   Third18_19_C: string;
    Grounded18_19_C: string;
    Completed18_19_C: string;
   IstInst19_20_C: string;
   IInd19_20_C: string;
    Grounded19_20_C: string;
   Completed19_20_C: string;
   MyChoice_C:any;

LstPayData_C:PMAY_DATA[];
  LstPayData1_C:PMAY_DATA_New[];
  LstPayDataISSR_C:PMAY_DATA_New[];
  LstPayDataAHP_C:PMAY_DATA_New[];
  LstPayDataBLC_C:PMAY_DATA_New[];
  DisplayTable_C: string;
  DisplyaGraph_C: string;
  public blnShowTable_C :boolean;
  public ReleasedFundsCol: number;

  Third19_20_C: any=0;
  RdStatus: any;
  lstCriticalData:PMAY_DATA_New[];
  lstCritical:PMAY_DATA_New[];

  finyear:string[];

  GroupedData:any;
  IstInst: string;
 isDisplayHouse:boolean=true;
 isFirst:boolean=true;
 isSecond:boolean=true;
 isThird:boolean=true;
 isGrounded:boolean=true;
 isCompleted:boolean=true;
 DisplayHouse:string='block'
  //lstCriticalData:PMAY_DATA_New[];
  grnd: string;
  Compl: string;
  IIInst: string;
  IInd: string;


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
      this.Houses_Grounded_C = result.Houses_Grounded;
    });
    this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
      this.SubsidyAmountCredited_C = result.SubsidyAmountCredited;
    });
    this.service.JNNURMCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
      // this.SubsidyAmountCredited = result.SubsidyAmountCredited;
    });
    this.service.DemandCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
      // this.SubsidyAmountCredited = result.SubsidyAmountCredited;
    });

    this.service.GetStateWiseFinYrData(this.stateCodes).subscribe(result_State => {
    });

 this.service.sp_create_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(resultCritical => {
     this.Fin_Year14_15_C = resultCritical[0].FinYear;
   });


   this.service.sp_create_PMAY_Critical_FinYearWiseDATA(this.stateCodes, this.districtCodes, this.cityCodes,"0").subscribe(result_PMU => {
  });
 
 
  this.service.sp_create_ISSR_Graph_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"ISSR","0").subscribe(result_ISSR => { // new code
    //  =result_ISSR[0].FinYear;
  });

  this.service.sp_create_AHP_Graph_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"AHP","0").subscribe(result_ISSR => { // new code
    //  =result_ISSR[0].FinYear;
  });


  this.service.sp_create_PMAY_Critical_BLC_DATA(this.stateCodes, this.districtCodes, this.cityCodes,'BLCS',"0").subscribe(result => { // new cod
  });
 
  
  // this.service.Get_Critical_MonitoringView(this.stateCodes, this.districtCodes, this.cityCodes,"0", "0").subscribe(result_Fin14 => {
  // })
          //--------------------------------------
        this.service.Get_Critical_MonitoringView(this.stateCodes, this.districtCodes, this.cityCodes,"0", "0").subscribe(result_Fin14 => {
          this.lstCriticalData=result_Fin14;
          console.log(result_Fin14);
          let result=result_Fin14.reduce(function(groups, item) {
            const val = item['Component'];
            groups[val] = groups[val] || [];
            groups[val].push(item);
            console.log(groups);
            return groups;
        }, {});
      //  console.log(result);
        this.GroupedData=result;
        })
        //--------------------------------------   
}

   checkForm($event) {
    this.RdStatus =$event.target.value;
    if (this.RdStatus ==='Phy1') {
      this.router.navigate(['/Admin/CriticalMonitoring'])
    }
    else 
    {
      this.router.navigate(['/Admin/PhysicalMonitoring'])
    }
   
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
     this.sp_create_ISSR_Critical_DATANew(this.stateCodes, this.districtCodes, this.cityCodes,this.selectedYears);
     this.sp_create_AHP_Critical_DATANew(this.stateCodes, this.districtCodes, this.cityCodes,this.selectedYears);
     this.sp_create_BLC_Critical_DATANew(this.stateCodes, this.districtCodes, this.cityCodes,this.selectedYears);

        

      this.service.sp_create__Grid_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0",this.selectedYears).subscribe(result_Houses_Status => { // new code
        this.LstPayData1_C = result_Houses_Status;  
      });
  }
  else
  {
    this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes,"0","0");
  }
}

getMySelection(choice)
{
    this.MyChoice_C =choice;
}

ngOnInit() {
      this.gevent.ColorObservable.subscribe(x=>{
      console.log('color:'+x);
    });
   
   this.backgroundColor = "#ffffff"; 
   this.stateCodes = "0";
   this.districtCodes = "0";
   this.cityCodes = "0";
   this.cid = 0;
   this.Comp = "0";
   this.Division = "0";
   this.DivisionCodes = "0";
   this.State="--Select--";
   this.ReleasedFundsCol = 3;
  
   
  this.service.StateList();
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
  
  this.DisplyaGraph_C = "none";
  this.DisplayTable_C= "block";

    // Grid  data  below
    // this.service.sp_create_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_Status => { // new code
    //   this.LstPayData1_C = result_Houses_Status;  
    // });
     
    // this.service.sp_create_PMAY_Critical_ISST_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_ISSR => { // new code
    //   this.LstPayDataISSR_C = result_Houses_ISSR;  
    // });
    
    // this.service.sp_create_PMAY_Critical_GRIDAHP_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_AHP => { // new code
    //   this.LstPayDataAHP_C = result_Houses_AHP;  
    // });

    // this.service.sp_create_PMAY_Critical_GRIDBLCS_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"BLCS","0").subscribe(result_Houses_BLC => { // new code
    //   this.LstPayDataBLC_C = result_Houses_BLC;  
    // });

    // Grid  data  below
    this.service.Get_Critical_MonitoringView(this.stateCodes, this.districtCodes, this.cityCodes,"0", "").subscribe(result_Fin14 => {
      this.lstCriticalData=result_Fin14;
      let result=result_Fin14.reduce(function(groups, item) {
        const val = item['Component'];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});


  //this.lstCritical=this.lstCriticalData.filter(a=>a.Component==='Critical');

  this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes,"0", "0");
  this.BindPMAY_Critical_ISSR_Data(this.stateCodes, this.districtCodes, this.cityCodes,"ISSR", "0");
  this.BindPMAY_Critical_AHP_Data(this.stateCodes, this.districtCodes, this.cityCodes,"AHP", "0");
  this.BindBLCS_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes,"BLCS", "0");
    


    console.log('result---->', result)
    this.GroupedData=result;
    })

   this.service.GetFinancialYear().subscribe(result=>{
    this.finyear= result;
   }   )


  }

  pdfReport()
  {
    window.print();
  }
  
  ShowPageM(status: string) {
    if (status === "graph") {
      this.DisplyaGraph_C = "block";
      this.DisplayTable_C = "none";
      this.blnShowTable_C =true;
    }
    else {
      this.DisplyaGraph_C = "none";
      this.DisplayTable_C = "block";
      this.blnShowTable_C =false;
    }
  }

  getFinDetails (Fin_Year)
{
  this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,Fin_Year) ;
  
}

  getStateDetails(stateCodes) {

   //alert(stateCodes);
    if (stateCodes == "0") {
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
              this.LstPayData1_C = result_Houses_Status;  
            });
            this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes,"0", "0");
            this.BindPMAY_Critical_ISSR_Data(this.stateCodes, this.districtCodes, this.cityCodes,"ISSR", "0");
            this.BindPMAY_Critical_AHP_Data(this.stateCodes, this.districtCodes, this.cityCodes,"AHP", "0");
            this.BindBLCS_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes,"BLCS", "0");
          
     }
    else {
      this.stateCodes = stateCodes.value;
      this.service.DisttList(stateCodes.value);
      
     // alert(this.stateCodes);

      this.service.CityList(this.districtCodes);//
      this.DisabledCheckBox=true;
       this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes, this.Comp,"0")
    

// Grid Data
// this.service.sp_create_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_Status => { // new code
//   this.LstPayData1_C = result_Houses_Status;  
// });

// this.service.sp_create_PMAY_Critical_ISST_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_ISSR => { // new code
//   this.LstPayDataISSR_C = result_Houses_ISSR;  
// });

// this.service.sp_create_PMAY_Critical_GRIDAHP_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_AHP => { // new code
//   this.LstPayDataAHP_C = result_Houses_AHP;  
// });

// this.service.sp_create_PMAY_Critical_GRIDBLCS_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"BLCS","0").subscribe(result_Houses_BLC => { // new code
//   this.LstPayDataBLC_C = result_Houses_BLC;  
// });

 //--------------------------------------
 this.service.Get_Critical_MonitoringView(this.stateCodes, this.districtCodes, this.cityCodes,"0", "0").subscribe(result_Fin14 => {
  this.lstCriticalData=result_Fin14;
  let result=result_Fin14.reduce(function(groups, item) {
    const val = item['Component'];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
}, {});
this.GroupedData=result;
})
//--------------------------------------   
this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes,"0", "0");
this.BindPMAY_Critical_ISSR_Data(this.stateCodes, this.districtCodes, this.cityCodes,"ISSR", "0");
this.BindPMAY_Critical_AHP_Data(this.stateCodes, this.districtCodes, this.cityCodes,"AHP", "0");
this.BindBLCS_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes,"BLCS", "0");


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


      // Grid Data
//       this.service.sp_create_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_Status => { // new code
//         this.LstPayData1_C = result_Houses_Status;  
//       });

// this.service.sp_create_PMAY_Critical_ISST_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_ISSR => { // new code
//   this.LstPayDataISSR_C = result_Houses_ISSR;  
// });

// this.service.sp_create_PMAY_Critical_GRIDAHP_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_AHP => { // new code
//   this.LstPayDataAHP_C = result_Houses_AHP;  
// });

// this.service.sp_create_PMAY_Critical_GRIDBLCS_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"BLCS","0").subscribe(result_Houses_BLC => { // new code
//   this.LstPayDataBLC_C = result_Houses_BLC;  
// });
 //--------------------------------------
 this.service.Get_Critical_MonitoringView(this.stateCodes, this.districtCodes, this.cityCodes,"0", "0").subscribe(result_Fin14 => {
  this.lstCriticalData=result_Fin14;
  let result=result_Fin14.reduce(function(groups, item) {
    const val = item['Component'];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
}, {});
this.GroupedData=result;
})
//--------------------------------------   

this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes,"0", "0");
this.BindPMAY_Critical_ISSR_Data(this.stateCodes, this.districtCodes, this.cityCodes,"ISSR", "0");
this.BindPMAY_Critical_AHP_Data(this.stateCodes, this.districtCodes, this.cityCodes,"AHP", "0");
this.BindBLCS_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes,"BLCS", "0");

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
      

            // Grid Data
      // this.service.sp_create_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_Status => { // new code
      //     this.LstPayData1_C = result_Houses_Status;  
      // });
      
      // this.service.sp_create_PMAY_Critical_ISST_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_ISSR => { // new code
      //   this.LstPayDataISSR_C = result_Houses_ISSR;  
      // });
      
      // this.service.sp_create_PMAY_Critical_GRIDAHP_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0","0").subscribe(result_Houses_AHP => { // new code
      //   this.LstPayDataAHP_C = result_Houses_AHP;  
      // });
      
      // this.service.sp_create_PMAY_Critical_GRIDBLCS_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"BLCS","0").subscribe(result_Houses_BLC => { // new code
      //   this.LstPayDataBLC_C = result_Houses_BLC;  
      // });
 //--------------------------------------
 this.service.Get_Critical_MonitoringView(this.stateCodes, this.districtCodes, this.cityCodes,"0", "0").subscribe(result_Fin14 => {
  this.lstCriticalData=result_Fin14;
  let result=result_Fin14.reduce(function(groups, item) {
    const val = item['Component'];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
}, {});
this.GroupedData=result;
})
//--------------------------------------   

      this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes,"0", "0");
      this.BindPMAY_Critical_ISSR_Data(this.stateCodes, this.districtCodes, this.cityCodes,"ISSR", "0");
      this.BindPMAY_Critical_AHP_Data(this.stateCodes, this.districtCodes, this.cityCodes,"AHP", "0");
      this.BindBLCS_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes,"BLCS", "0");
    
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
                this.Fin_Year14_15_C = result[0].FinYear;
                this.Housesinvolved14_15_C = result[0].Housesinvolved;
                this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
                this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
                this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
                this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
                this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
               }
 
   
            let chart = new CanvasJS.Chart("chartPMAY_Critical", {
              theme: "light2",
              animationEnabled: true,
              exportEnabled: false,
              title: {
                text: "Physical Data Consolidated (PMAY(U) Critical)",
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
                legendText: "Houses Involved",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x2, y: this.Housesinvolved14_15_C },
                  { label: x3, y: this.FundsDisbursed_in_Houses14_15_C },
                  { label: x4, y: this.Houses_Grounde14_15_C },
                  { label: x5, y: this.Houses_Complete14_15_C },
                  { label: x6, y: this.HousesOccupied14_15_C },
                  { label: x7, y: this.First_Houses14_15_C },
           
                ]
              },
              // {
              //   type: "column",
              //   dockInsidePlotArea: true,
              //    indexLabel: "{y}", //HG
              //   bevelEnabled: true,
              //   showInLegend: true,
              //   legendText: "FundsDisbursed in Houses",
              //    stValue: "Q",
              //   indexLabelFontSize: 12,
              //   indexLabelOrientation: "vertical",
              //   dataPoints: [
              //     { label: x2, y: this.FundsDisbursed_in_Houses14_15_C },
              //   ]
              // },
    
              // {
              //   type: "column",
              //   dockInsidePlotArea: true,
              //    indexLabel: "{y}", //HG
              //   bevelEnabled: true,
              //   showInLegend: true,
              //   legendText: "Houses Grounded",
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
              //   legendText: "Houses Completed",
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
              //   legendText: "Houses Occupied",
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
              this.Fin_Year14_15_C = result[0].FinYear;
              this.Housesinvolved14_15_C = result[0].Housesinvolved;
              this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
              this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
              this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
              this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
              this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
             }
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                if (result[1].FinYear !="0" )
                {
                  //try{
                    this.Fin_Year15_16_C = result[1].FinYear;
                    this.Housesinvolved15_16_C = result[1].Housesinvolved;
                    this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                    this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                    this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                    this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                    this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
                   }
            }
            catch{}
            finally{}
  
  
           let chart = new CanvasJS.Chart("chartPMAY_Critical", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Data Consolidated (PMAY(U) Critical)",
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
              legendText: "Houses Involved",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                // { x: "14-15", y: this.Fin_Year15_16 },
                { label: x1, y: this.Housesinvolved14_15_C },
                { label: Y1, y: this.Housesinvolved15_16_C }
  
              ]
            },
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "FundsDisbursed in Houses",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Grounded",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Grounde14_15_C },
                { label: Y1, y: this.Houses_Grounde15_16_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Completed",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Complete14_15_C },
                { label: Y1, y: this.Houses_Complete15_16_C }
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
                { label: x1, y: this.HousesOccupied14_15_C },
                { label: Y1, y: this.HousesOccupied15_16_C }
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
                { label: x1, y: this.First_Houses14_15_C },
                { label: Y1, y: this.First_Houses15_16_C }
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
  
            this.Fin_Year14_15_C = result[0].FinYear;
            this.Housesinvolved14_15_C = result[0].Housesinvolved;
            this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
            this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
            this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
            this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
            this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16_C = result[1].FinYear;
                this.Housesinvolved15_16_C = result[1].Housesinvolved;
                this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17_C = result[2].FinYear;
                    this.Housesinvolved16_17_C = result[2].Housesinvolved;
                    this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                    this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                    this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                    this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                    this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}
  
  
           let chart = new CanvasJS.Chart("chartPMAY_Critical", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: " Physical Data Consolidated ",
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
              legendText: "Houses Involved",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                // { x: "14-15", y: this.Fin_Year15_16 },
                { label: x1, y: this.Housesinvolved14_15_C },
                { label: Y1, y: this.Housesinvolved15_16_C },
                { label: z1, y: this.Housesinvolved16_17_C }
              ]
            },
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "FundsDisbursed in Houses",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17_C }
  
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Grounded",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Grounde14_15_C },
                { label: Y1, y: this.Houses_Grounde15_16_C },
                { label: z1, y: this.Houses_Grounde16_17_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Completed",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Complete14_15_C },
                { label: Y1, y: this.Houses_Complete15_16_C },
                { label: z1, y: this.Houses_Complete16_17_C }
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
                { label: x1, y: this.HousesOccupied14_15_C },
                { label: Y1, y: this.HousesOccupied15_16_C },
                { label: z1, y: this.HousesOccupied16_17_C} 
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
                { label: x1, y: this.First_Houses14_15_C },
                { label: Y1, y: this.First_Houses15_16_C },
                { label: z1, y: this.First_Houses16_17_C }
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
  
               this.Fin_Year14_15_C = result[0].FinYear;
            this.Housesinvolved14_15_C = result[0].Housesinvolved;
            this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
            this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
            this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
            this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
            this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16_C = result[1].FinYear;
                this.Housesinvolved15_16_C = result[1].Housesinvolved;
                this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17_C = result[2].FinYear;
                    this.Housesinvolved16_17_C = result[2].Housesinvolved;
                    this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                    this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                    this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                    this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                    this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}
  
          try {
            this.Fin_Year17_18_C = result[3].FinYear;
            this.Housesinvolved17_18_C = result[3].Housesinvolved;
            this.FundsDisbursed_in_Houses17_18_C = result[3].Istinstyettobereleased;
            this.Houses_Grounde17_18_C= result[3].IIndinstyettobereleased;
            this.Houses_Complete17_18_C = result[3].ThirdInstyettobereleased;
            this.HousesOccupied17_18_C = result[3].GroundedbutyettobeCompleted;
            this.First_Houses17_18_C = result[3].CompletedbutyettobeOccupied; 
        }
        catch{}
        finally{}
  
  
           let chart = new CanvasJS.Chart("chartPMAY_Critical", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: " Physical Data Consolidated (PMAY Critical)",
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
              legendText: "Houses Involved",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                // { x: "14-15", y: this.Fin_Year15_16 },
                { label: x1, y: this.Housesinvolved14_15_C },
                { label: Y1, y: this.Housesinvolved15_16_C },
                { label: z1, y: this.Housesinvolved16_17_C },
                { label: z2, y: this.Housesinvolved17_18_C }
              ]
            },
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "FundsDisbursed in Houses",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17_C },
                { label: z2, y: this.FundsDisbursed_in_Houses17_18_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Grounded",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Grounde14_15_C },
                { label: Y1, y: this.Houses_Grounde15_16_C },
                { label: z1, y: this.Houses_Grounde16_17_C },
                { label: z2, y: this.Houses_Grounde17_18_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Completed",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Complete14_15_C },
                { label: Y1, y: this.Houses_Complete15_16_C },
                { label: z1, y: this.Houses_Complete16_17_C },
                { label: z2, y: this.Houses_Complete17_18_C }
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
                { label: x1, y: this.HousesOccupied14_15_C },
                { label: Y1, y: this.HousesOccupied15_16_C },
                { label: z1, y: this.HousesOccupied16_17_C},
                { label: z2, y: this.HousesOccupied17_18_C} 
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "First Inst ",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.First_Houses14_15_C },
                { label: Y1, y: this.First_Houses15_16_C },
                { label: z1, y: this.First_Houses16_17_C },
                { label: z2, y: this.First_Houses17_18_C }
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
  
            this.Fin_Year14_15_C = result[0].FinYear;
            this.Housesinvolved14_15_C = result[0].Housesinvolved;
            this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
            this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
            this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
            this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
            this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16_C = result[1].FinYear;
                this.Housesinvolved15_16_C = result[1].Housesinvolved;
                this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17_C = result[2].FinYear;
                    this.Housesinvolved16_17_C = result[2].Housesinvolved;
                    this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                    this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                    this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                    this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                    this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}
  
          try {
            this.Fin_Year17_18_C = result[3].FinYear;
            this.Housesinvolved17_18_C = result[3].Housesinvolved;
            this.FundsDisbursed_in_Houses17_18_C = result[3].Istinstyettobereleased;
            this.Houses_Grounde17_18_C= result[3].IIndinstyettobereleased;
            this.Houses_Complete17_18_C = result[3].ThirdInstyettobereleased;
            this.HousesOccupied17_18_C = result[3].GroundedbutyettobeCompleted;
            this.First_Houses17_18_C = result[3].CompletedbutyettobeOccupied; 
        }
        catch{}
        finally{}
  
        try {
          this.Fin_Year18_19_C = result[4].FinYear;
          this.Housesinvolved18_19_C = result[4].Housesinvolved;
          this.FundsDisbursed_in_Houses18_19_C = result[4].Istinstyettobereleased;
          this.Houses_Grounde18_19_C= result[4].IIndinstyettobereleased;
          this.Houses_Complete18_19_C = result[4].ThirdInstyettobereleased;
          this.HousesOccupied18_19_C = result[4].GroundedbutyettobeCompleted;
          this.First_Houses18_19_C = result[4].CompletedbutyettobeOccupied; 
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
              legendText: "Houses Involved",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                // { x: "14-15", y: this.Fin_Year15_16 },
                { label: x1, y: this.Housesinvolved14_15_C },
                { label: Y1, y: this.Housesinvolved15_16_C },
                { label: z1, y: this.Housesinvolved16_17_C },
                { label: z2, y: this.Housesinvolved17_18_C },
                { label: z3, y: this.Housesinvolved18_19_C }
              ]
            },
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "FundsDisbursed in Houses",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17_C },
                { label: z2, y: this.FundsDisbursed_in_Houses17_18_C },
                { label: z3, y: this.FundsDisbursed_in_Houses18_19_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Grounded",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Grounde14_15_C },
                { label: Y1, y: this.Houses_Grounde15_16_C },
                { label: z1, y: this.Houses_Grounde16_17_C },
                { label: z2, y: this.Houses_Grounde17_18_C },
                { label: z3, y: this.Houses_Grounde18_19_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Completed",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Complete14_15_C },
                { label: Y1, y: this.Houses_Complete15_16_C },
                { label: z1, y: this.Houses_Complete16_17_C },
                { label: z2, y: this.Houses_Complete17_18_C },
                { label: z3, y: this.Houses_Complete18_19_C }
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
                { label: x1, y: this.HousesOccupied14_15_C },
                { label: Y1, y: this.HousesOccupied15_16_C },
                { label: z1, y: this.HousesOccupied16_17_C},
                { label: z2, y: this.HousesOccupied17_18_C},
                { label: z3, y: this.HousesOccupied18_19_C} 
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
                { label: x1, y: this.First_Houses14_15_C },
                { label: Y1, y: this.First_Houses15_16_C },
                { label: z1, y: this.First_Houses16_17_C },
                { label: z2, y: this.First_Houses17_18_C },
                { label: z3, y: this.First_Houses18_19_C }
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
  
 
            this.Fin_Year14_15_C = result[0].FinYear;
            this.Housesinvolved14_15_C = result[0].Housesinvolved;
            this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
            this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
            this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
            this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
            this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16_C = result[1].FinYear;
                this.Housesinvolved15_16_C = result[1].Housesinvolved;
                this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17_C = result[2].FinYear;
                    this.Housesinvolved16_17_C = result[2].Housesinvolved;
                    this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                    this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                    this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                    this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                    this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}
  
          try {
            this.Fin_Year17_18_C = result[3].FinYear;
            this.Housesinvolved17_18_C = result[3].Housesinvolved;
            this.FundsDisbursed_in_Houses17_18_C = result[3].Istinstyettobereleased;
            this.Houses_Grounde17_18_C= result[3].IIndinstyettobereleased;
            this.Houses_Complete17_18_C = result[3].ThirdInstyettobereleased;
            this.HousesOccupied17_18_C = result[3].GroundedbutyettobeCompleted;
            this.First_Houses17_18_C = result[3].CompletedbutyettobeOccupied; 
        }
        catch{}
        finally{}
  
        try {
          this.Fin_Year18_19_C = result[4].FinYear;
          this.Housesinvolved18_19_C = result[4].Housesinvolved;
          this.FundsDisbursed_in_Houses18_19_C = result[4].Istinstyettobereleased;
          this.Houses_Grounde18_19_C= result[4].IIndinstyettobereleased;
          this.Houses_Complete18_19_C = result[4].ThirdInstyettobereleased;
          this.HousesOccupied18_19_C = result[4].GroundedbutyettobeCompleted;
          this.First_Houses18_19_C = result[4].CompletedbutyettobeOccupied; 
    }
      catch{}
      finally{}

      try {
        this.Fin_Year19_20_C = result[5].FinYear;
        this.Housesinvolved19_20_C = result[5].Housesinvolved;
        this.FundsDisbursed_in_Houses19_20_C = result[5].Istinstyettobereleased;
        this.Houses_Grounde19_20_C= result[5].IIndinstyettobereleased;
        this.Houses_Complete19_20_C = result[5].ThirdInstyettobereleased;
        this.HousesOccupied19_20_C = result[5].GroundedbutyettobeCompleted;
        this.First_Houses19_20_C = result[5].CompletedbutyettobeOccupied; 
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
              legendText: "Houses Involved",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                // { x: "14-15", y: this.Fin_Year15_16 },
                { label: x1, y: this.Housesinvolved14_15_C },
                { label: Y1, y: this.Housesinvolved15_16_C },
                { label: z1, y: this.Housesinvolved16_17_C },
                { label: z2, y: this.Housesinvolved17_18_C },
                { label: z3, y: this.Housesinvolved18_19_C },
                { label: z4, y: this.Housesinvolved19_20_C } 
              ]
            },
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "FundsDisbursed in Houses",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17_C },
                { label: z2, y: this.FundsDisbursed_in_Houses17_18_C },
                { label: z3, y: this.FundsDisbursed_in_Houses18_19_C },
                { label: z4, y: this.FundsDisbursed_in_Houses19_20_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Grounded",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Grounde14_15_C },
                { label: Y1, y: this.Houses_Grounde15_16_C },
                { label: z1, y: this.Houses_Grounde16_17_C },
                { label: z2, y: this.Houses_Grounde17_18_C },
                { label: z3, y: this.Houses_Grounde18_19_C },
                { label: z4, y: this.Houses_Grounde19_20_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Completed",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Complete14_15_C },
                { label: Y1, y: this.Houses_Complete15_16_C },
                { label: z1, y: this.Houses_Complete16_17_C },
                { label: z2, y: this.Houses_Complete17_18_C },
                { label: z3, y: this.Houses_Complete18_19_C },
                { label: z4, y: this.Houses_Complete19_20_C }
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
                { label: x1, y: this.HousesOccupied14_15_C },
                { label: Y1, y: this.HousesOccupied15_16_C },
                { label: z1, y: this.HousesOccupied16_17_C},
                { label: z2, y: this.HousesOccupied17_18_C},
                { label: z3, y: this.HousesOccupied18_19_C},
                { label: z4, y: this.HousesOccupied19_20_C} 
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
                { label: x1, y: this.First_Houses14_15_C },
                { label: Y1, y: this.First_Houses15_16_C },
                { label: z1, y: this.First_Houses16_17_C },
                { label: z2, y: this.First_Houses17_18_C },
                { label: z3, y: this.First_Houses18_19_C },
                { label: z4, y: this.First_Houses19_20_C }
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
  

    

    sp_create_ISSR_Critical_DATANew(stateCode, DisttCode, cityCode, Fin_Year )
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
              this.service.sp_create_ISSR_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
              if (result[0].FinYear !="0" )
              {
                //try{
                  this.Fin_Year14_15_C = result[0].FinYear;
                  this.Housesinvolved14_15_C = result[0].Housesinvolved;
                  this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
                  this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
                  this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
                  this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
                  this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
                 }
   
     
              let chart = new CanvasJS.Chart("chartISSR_Critical", {
                theme: "light2",
                animationEnabled: true,
                exportEnabled: false,
                title: {
                  text: "Physical Data Consolidated (ISSR)",
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
                  legendText: "Houses Involved",
                   stValue: "Q",
                  indexLabelFontSize: 12,
                  indexLabelOrientation: "vertical",
                  dataPoints: [
                    { label: x2, y: this.Housesinvolved14_15_C },
                    { label: x3, y: this.FundsDisbursed_in_Houses14_15_C },
                    { label: x4, y: this.Houses_Grounde14_15_C },
                    { label: x5, y: this.Houses_Complete14_15_C },
                    { label: x6, y: this.HousesOccupied14_15_C },
                    { label: x7, y: this.First_Houses14_15_C },
             
                  ]
                },
                // {
                //   type: "column",
                //   dockInsidePlotArea: true,
                //    indexLabel: "{y}", //HG
                //   bevelEnabled: true,
                //   showInLegend: true,
                //   legendText: "FundsDisbursed in Houses",
                //    stValue: "Q",
                //   indexLabelFontSize: 12,
                //   indexLabelOrientation: "vertical",
                //   dataPoints: [
                //     { label: x2, y: this.FundsDisbursed_in_Houses14_15_C },
                //   ]
                // },
      
                // {
                //   type: "column",
                //   dockInsidePlotArea: true,
                //    indexLabel: "{y}", //HG
                //   bevelEnabled: true,
                //   showInLegend: true,
                //   legendText: "Houses Grounded",
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
                //   legendText: "Houses Completed",
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
                //   legendText: "Houses Occupied",
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
          this.service.sp_create_ISSR_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
                
     
            if (result[0].FinYear !="0" )
            {
              //try{
                this.Fin_Year14_15_C = result[0].FinYear;
                this.Housesinvolved14_15_C = result[0].Housesinvolved;
                this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
                this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
                this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
                this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
                this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
               }
            //  }
            //  if (result[1].FinYear !="0" )
            //  {
    
                // 
                try {
                  if (result[1].FinYear !="0" )
                  {
                    //try{
                      this.Fin_Year15_16_C = result[1].FinYear;
                      this.Housesinvolved15_16_C = result[1].Housesinvolved;
                      this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                      this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                      this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                      this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                      this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
                     }
              }
              catch{}
              finally{}
    
    
             let chart = new CanvasJS.Chart("chartPMAY_Critical", {
              theme: "light2",
              animationEnabled: true,
              exportEnabled: false,
              title: {
                text: "Physical Data Consolidated (PMAY(U) Critical)",
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
                legendText: "Houses Involved",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  // { x: "14-15", y: this.Fin_Year15_16 },
                  { label: x1, y: this.Housesinvolved14_15_C },
                  { label: Y1, y: this.Housesinvolved15_16_C}
    
                ]
              },
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "FundsDisbursed in Houses",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
                  { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C }
                ]
              },
    
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "Houses Grounded",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.Houses_Grounde14_15_C },
                  { label: Y1, y: this.Houses_Grounde15_16_C }
                ]
              },
    
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "Houses Completed",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.Houses_Complete14_15_C },
                  { label: Y1, y: this.Houses_Complete15_16_C }
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
                  { label: x1, y: this.HousesOccupied14_15_C },
                  { label: Y1, y: this.HousesOccupied15_16_C }
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
                  { label: x1, y: this.First_Houses14_15_C },
                  { label: Y1, y: this.First_Houses15_16_C }
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
          this.service.sp_create_ISSR_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          
          //   this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
            //    if (result[0].FinYear !="0" )
            //  {
    
              this.Fin_Year14_15_C = result[0].FinYear;
              this.Housesinvolved14_15_C = result[0].Housesinvolved;
              this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
              this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
              this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
              this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
              this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
            //  }
            //  if (result[1].FinYear !="0" )
            //  {
    
                // 
                try {
                  this.Fin_Year15_16_C = result[1].FinYear;
                  this.Housesinvolved15_16_C= result[1].Housesinvolved;
                  this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                  this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                  this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                  this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                  this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
              }
              catch{}
              finally{}
    
    
              try {
                this.Fin_Year16_17_C = result[2].FinYear;
                      this.Housesinvolved16_17_C = result[2].Housesinvolved;
                      this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                      this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                      this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                      this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                      this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
    
    
             let chart = new CanvasJS.Chart("chartPMAY_Critical", {
              theme: "light2",
              animationEnabled: true,
              exportEnabled: false,
              title: {
                text: " Physical Data Consolidated ",
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
                legendText: "Houses Involved",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  // { x: "14-15", y: this.Fin_Year15_16 },
                  { label: x1, y: this.Housesinvolved14_15_C },
                  { label: Y1, y: this.Housesinvolved15_16_C},
                  { label: z1, y: this.Housesinvolved16_17_C }
                ]
              },
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "FundsDisbursed in Houses",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
                  { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
                  { label: z1, y: this.FundsDisbursed_in_Houses16_17_C }
    
                ]
              },
    
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "Houses Grounded",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.Houses_Grounde14_15_C },
                  { label: Y1, y: this.Houses_Grounde15_16_C },
                  { label: z1, y: this.Houses_Grounde16_17_C }
                ]
              },
    
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "Houses Completed",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.Houses_Complete14_15_C },
                  { label: Y1, y: this.Houses_Complete15_16_C },
                  { label: z1, y: this.Houses_Complete16_17_C }
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
                  { label: x1, y: this.HousesOccupied14_15_C },
                  { label: Y1, y: this.HousesOccupied15_16_C },
                  { label: z1, y: this.HousesOccupied16_17_C} 
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
                  { label: x1, y: this.First_Houses14_15_C },
                  { label: Y1, y: this.First_Houses15_16_C },
                  { label: z1, y: this.First_Houses16_17_C }
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
    
          this.service.sp_create_ISSR_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          
           //  this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
            //    if (result[0].FinYear !="0" )
            //  {
    
                 this.Fin_Year14_15_C = result[0].FinYear;
              this.Housesinvolved14_15_C = result[0].Housesinvolved;
              this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
              this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
              this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
              this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
              this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
            //  }
            //  if (result[1].FinYear !="0" )
            //  {
    
                // 
                try {
                  this.Fin_Year15_16_C = result[1].FinYear;
                  this.Housesinvolved15_16_C= result[1].Housesinvolved;
                  this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                  this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                  this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                  this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                  this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
              }
              catch{}
              finally{}
    
    
              try {
                this.Fin_Year16_17_C = result[2].FinYear;
                      this.Housesinvolved16_17_C = result[2].Housesinvolved;
                      this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                      this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                      this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                      this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                      this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
    
            try {
              this.Fin_Year17_18_C = result[3].FinYear;
              this.Housesinvolved17_18_C = result[3].Housesinvolved;
              this.FundsDisbursed_in_Houses17_18_C = result[3].Istinstyettobereleased;
              this.Houses_Grounde17_18_C= result[3].IIndinstyettobereleased;
              this.Houses_Complete17_18_C = result[3].ThirdInstyettobereleased;
              this.HousesOccupied17_18_C = result[3].GroundedbutyettobeCompleted;
              this.First_Houses17_18_C = result[3].CompletedbutyettobeOccupied; 
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
                legendText: "Houses Involved",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  // { x: "14-15", y: this.Fin_Year15_16 },
                  { label: x1, y: this.Housesinvolved14_15_C },
                  { label: Y1, y: this.Housesinvolved15_16_C},
                  { label: z1, y: this.Housesinvolved16_17_C },
                  { label: z2, y: this.Housesinvolved17_18_C }
                ]
              },
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "FundsDisbursed in Houses",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
                  { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
                  { label: z1, y: this.FundsDisbursed_in_Houses16_17_C },
                  { label: z2, y: this.FundsDisbursed_in_Houses17_18_C }
                ]
              },
    
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "Houses Grounded",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.Houses_Grounde14_15_C },
                  { label: Y1, y: this.Houses_Grounde15_16_C },
                  { label: z1, y: this.Houses_Grounde16_17_C },
                  { label: z2, y: this.Houses_Grounde17_18_C }
                ]
              },
    
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "Houses Completed",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.Houses_Complete14_15_C },
                  { label: Y1, y: this.Houses_Complete15_16_C },
                  { label: z1, y: this.Houses_Complete16_17_C },
                  { label: z2, y: this.Houses_Complete17_18_C }
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
                  { label: x1, y: this.HousesOccupied14_15_C },
                  { label: Y1, y: this.HousesOccupied15_16_C },
                  { label: z1, y: this.HousesOccupied16_17_C},
                  { label: z2, y: this.HousesOccupied17_18_C} 
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
                  { label: x1, y: this.First_Houses14_15_C },
                  { label: Y1, y: this.First_Houses15_16_C },
                  { label: z1, y: this.First_Houses16_17_C },
                  { label: z2, y: this.First_Houses17_18_C }
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
          this.service.sp_create_ISSR_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
             
         // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
            //    if (result[0].FinYear !="0" )
            //  {
    
              this.Fin_Year14_15_C = result[0].FinYear;
              this.Housesinvolved14_15_C = result[0].Housesinvolved;
              this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
              this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
              this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
              this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
              this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
            //  }
            //  if (result[1].FinYear !="0" )
            //  {
    
                // 
                try {
                  this.Fin_Year15_16_C = result[1].FinYear;
                  this.Housesinvolved15_16_C= result[1].Housesinvolved;
                  this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                  this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                  this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                  this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                  this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
              }
              catch{}
              finally{}
    
    
              try {
                this.Fin_Year16_17_C = result[2].FinYear;
                      this.Housesinvolved16_17_C = result[2].Housesinvolved;
                      this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                      this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                      this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                      this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                      this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
    
            try {
              this.Fin_Year17_18_C = result[3].FinYear;
              this.Housesinvolved17_18_C = result[3].Housesinvolved;
              this.FundsDisbursed_in_Houses17_18_C = result[3].Istinstyettobereleased;
              this.Houses_Grounde17_18_C= result[3].IIndinstyettobereleased;
              this.Houses_Complete17_18_C = result[3].ThirdInstyettobereleased;
              this.HousesOccupied17_18_C = result[3].GroundedbutyettobeCompleted;
              this.First_Houses17_18_C = result[3].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}
    
          try {
            this.Fin_Year18_19_C = result[4].FinYear;
            this.Housesinvolved18_19_C = result[4].Housesinvolved;
            this.FundsDisbursed_in_Houses18_19_C = result[4].Istinstyettobereleased;
            this.Houses_Grounde18_19_C= result[4].IIndinstyettobereleased;
            this.Houses_Complete18_19_C = result[4].ThirdInstyettobereleased;
            this.HousesOccupied18_19_C = result[4].GroundedbutyettobeCompleted;
            this.First_Houses18_19_C = result[4].CompletedbutyettobeOccupied; 
      }
        catch{}
        finally{}
    
    
             let chart = new CanvasJS.Chart("chartPMAY_Critical", {
              theme: "light2",
              animationEnabled: true,
              exportEnabled: false,
              title: {
                text: "Physical Data Consolidated (PMAY(U) Critical)",
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
                legendText: "Houses Involved",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  // { x: "14-15", y: this.Fin_Year15_16 },
                  { label: x1, y: this.Housesinvolved14_15_C },
                  { label: Y1, y: this.Housesinvolved15_16_C},
                  { label: z1, y: this.Housesinvolved16_17_C },
                  { label: z2, y: this.Housesinvolved17_18_C },
                  { label: z3, y: this.Housesinvolved18_19_C }
                ]
              },
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "FundsDisbursed in Houses",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
                  { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
                  { label: z1, y: this.FundsDisbursed_in_Houses16_17_C },
                  { label: z2, y: this.FundsDisbursed_in_Houses17_18_C },
                  { label: z3, y: this.FundsDisbursed_in_Houses18_19_C }
                ]
              },
    
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "Houses Grounded",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.Houses_Grounde14_15_C },
                  { label: Y1, y: this.Houses_Grounde15_16_C },
                  { label: z1, y: this.Houses_Grounde16_17_C },
                  { label: z2, y: this.Houses_Grounde17_18_C },
                  { label: z3, y: this.Houses_Grounde18_19_C }
                ]
              },
    
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "Houses Completed",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.Houses_Complete14_15_C },
                  { label: Y1, y: this.Houses_Complete15_16_C },
                  { label: z1, y: this.Houses_Complete16_17_C },
                  { label: z2, y: this.Houses_Complete17_18_C },
                  { label: z3, y: this.Houses_Complete18_19_C }
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
                  { label: x1, y: this.HousesOccupied14_15_C },
                  { label: Y1, y: this.HousesOccupied15_16_C },
                  { label: z1, y: this.HousesOccupied16_17_C},
                  { label: z2, y: this.HousesOccupied17_18_C},
                  { label: z3, y: this.HousesOccupied18_19_C} 
                ]
              },
    
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "First Installment",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.First_Houses14_15_C },
                  { label: Y1, y: this.First_Houses15_16_C },
                  { label: z1, y: this.First_Houses16_17_C },
                  { label: z2, y: this.First_Houses17_18_C },
                  { label: z3, y: this.First_Houses18_19_C }
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
          this.service.sp_create_ISSR_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
             
         // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
            //    if (result[0].FinYear !="0" )
            //  {
    
   
              this.Fin_Year14_15_C = result[0].FinYear;
              this.Housesinvolved14_15_C = result[0].Housesinvolved;
              this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
              this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
              this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
              this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
              this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
            //  }
            //  if (result[1].FinYear !="0" )
            //  {
    
                // 
                try {
                  this.Fin_Year15_16_C = result[1].FinYear;
                  this.Housesinvolved15_16_C= result[1].Housesinvolved;
                  this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                  this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                  this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                  this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                  this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
              }
              catch{}
              finally{}
    
    
              try {
                this.Fin_Year16_17_C = result[2].FinYear;
                      this.Housesinvolved16_17_C = result[2].Housesinvolved;
                      this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                      this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                      this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                      this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                      this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
    
            try {
              this.Fin_Year17_18_C = result[3].FinYear;
              this.Housesinvolved17_18_C = result[3].Housesinvolved;
              this.FundsDisbursed_in_Houses17_18_C = result[3].Istinstyettobereleased;
              this.Houses_Grounde17_18_C= result[3].IIndinstyettobereleased;
              this.Houses_Complete17_18_C = result[3].ThirdInstyettobereleased;
              this.HousesOccupied17_18_C = result[3].GroundedbutyettobeCompleted;
              this.First_Houses17_18_C = result[3].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}
    
          try {
            this.Fin_Year18_19_C = result[4].FinYear;
            this.Housesinvolved18_19_C = result[4].Housesinvolved;
            this.FundsDisbursed_in_Houses18_19_C = result[4].Istinstyettobereleased;
            this.Houses_Grounde18_19_C= result[4].IIndinstyettobereleased;
            this.Houses_Complete18_19_C = result[4].ThirdInstyettobereleased;
            this.HousesOccupied18_19_C = result[4].GroundedbutyettobeCompleted;
            this.First_Houses18_19_C = result[4].CompletedbutyettobeOccupied; 
      }
        catch{}
        finally{}
  
        try {
          this.Fin_Year19_20_C = result[5].FinYear;
          this.Housesinvolved19_20_C = result[5].Housesinvolved;
          this.FundsDisbursed_in_Houses19_20_C = result[5].Istinstyettobereleased;
          this.Houses_Grounde19_20_C= result[5].IIndinstyettobereleased;
          this.Houses_Complete19_20_C = result[5].ThirdInstyettobereleased;
          this.HousesOccupied19_20_C = result[5].GroundedbutyettobeCompleted;
          this.First_Houses19_20_C = result[5].CompletedbutyettobeOccupied; 
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
                legendText: "Houses Involved",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  // { x: "14-15", y: this.Fin_Year15_16 },
                  { label: x1, y: this.Housesinvolved14_15_C },
                  { label: Y1, y: this.Housesinvolved15_16_C},
                  { label: z1, y: this.Housesinvolved16_17_C },
                  { label: z2, y: this.Housesinvolved17_18_C },
                  { label: z3, y: this.Housesinvolved18_19_C },
                  { label: z4, y: this.Housesinvolved19_20_C } 
                ]
              },
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "FundsDisbursed in Houses",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
                  { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
                  { label: z1, y: this.FundsDisbursed_in_Houses16_17_C },
                  { label: z2, y: this.FundsDisbursed_in_Houses17_18_C },
                  { label: z3, y: this.FundsDisbursed_in_Houses18_19_C },
                  { label: z4, y: this.FundsDisbursed_in_Houses19_20_C }
                ]
              },
    
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "Houses Grounded",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.Houses_Grounde14_15_C },
                  { label: Y1, y: this.Houses_Grounde15_16_C },
                  { label: z1, y: this.Houses_Grounde16_17_C },
                  { label: z2, y: this.Houses_Grounde17_18_C },
                  { label: z3, y: this.Houses_Grounde18_19_C },
                  { label: z4, y: this.Houses_Grounde19_20_C }
                ]
              },
    
              {
                type: "column",
                dockInsidePlotArea: true,
                 indexLabel: "{y}", //HG
                bevelEnabled: true,
                showInLegend: true,
                legendText: "Houses Completed",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x1, y: this.Houses_Complete14_15_C },
                  { label: Y1, y: this.Houses_Complete15_16_C },
                  { label: z1, y: this.Houses_Complete16_17_C },
                  { label: z2, y: this.Houses_Complete17_18_C },
                  { label: z3, y: this.Houses_Complete18_19_C },
                  { label: z4, y: this.Houses_Complete19_20_C }
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
                  { label: x1, y: this.HousesOccupied14_15_C },
                  { label: Y1, y: this.HousesOccupied15_16_C },
                  { label: z1, y: this.HousesOccupied16_17_C},
                  { label: z2, y: this.HousesOccupied17_18_C},
                  { label: z3, y: this.HousesOccupied18_19_C},
                  { label: z4, y: this.HousesOccupied19_20_C} 
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
                  { label: x1, y: this.First_Houses14_15_C },
                  { label: Y1, y: this.First_Houses15_16_C },
                  { label: z1, y: this.First_Houses16_17_C },
                  { label: z2, y: this.First_Houses17_18_C },
                  { label: z3, y: this.First_Houses18_19_C },
                  { label: z4, y: this.First_Houses19_20_C }
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
    

     //
     
     
     
 FirstInst(event)
  {
    let value=event.target.checked;
    this.isFirst=value;
    if(value ==false)
    {
      this.IstInst='none';
      this.ReleasedFundsCol = this.ReleasedFundsCol - 1

    }
    else{
      this.IstInst='block';
      this.ReleasedFundsCol = this.ReleasedFundsCol + 1
    }
  }

  HInvolved(event)
  {
    let value=event.target.checked;
    this.isDisplayHouse=value;
    if(value ==false)
    {
      this.DisplayHouse='none';
    }
    else{
      this.DisplayHouse='block';
    }
  }

  SecondInst(event)
  {
    let value=event.target.checked;
    this.isSecond=value;
    if(value ==false)
    {
      this.IInd='none';
      this.ReleasedFundsCol = this.ReleasedFundsCol - 1

    }
    else{
      this.IInd='block';
      this.ReleasedFundsCol = this.ReleasedFundsCol + 1
    }
  }
  ThirdInst(event)
  {
    let value=event.target.checked;
    this.isThird=value;
    if(value ==false)
    {
      this.IIInst='none';
      this.ReleasedFundsCol = this.ReleasedFundsCol - 1
    }
    else{
      this.IIInst='block';
      this.ReleasedFundsCol = this.ReleasedFundsCol + 1
    }
  }
  Grounded(event)
  {
    let value=event.target.checked;
    this.isGrounded=value;
    if(value ==false)
    {
      this.grnd='none';
    }
    else{
      this.grnd='block';
    }
  }

  // Completed(event)
  // {
  //   let value=event.target.checked;
  //   if(value ==false)
  //   {
  //     this.Compl='none';
  //   }
  //   else{
  //     this.Compl='block';
  //   }
  // }
  Completed(event)
  {
    let value=event.target.checked;
    this.isCompleted =value
    if(value ==false)
    {
      this.Compl='none';
    }
    else{
      this.Compl='block';
    }
  }
  Compnt(event)
  {
        const checked= event.target.checked;
        const CompValue=event.target.value;
        if (checked) {
          this.lstCmp.push(CompValue);
          this.selectedComp = this.lstCmp.toString();
        }
        else {
          let index = this.lstCmp.findIndex(a => a == CompValue);
          if (index !== -1) {
            this.lstCmp.splice(index, 1);
          }
          this.selectedComp = this.lstComp.toString();
        }
        // if (this.selectedComp.length >  0 )
        // {
               // Grid  data  below
              this.service.Get_Critical_MonitoringView(this.stateCodes, this.districtCodes, this.cityCodes,this.selectedComp, this.selectedYears).subscribe(result_Fin14 => {
                this.lstCriticalData=result_Fin14;
                let result=result_Fin14.reduce(function(groups, item) {
                  const val = item['Component'];
                  groups[val] = groups[val] || [];
                  groups[val].push(item);
                  return groups;
              }, {});
              this.GroupedData=result;
              })
        //}      
}
Fin_Yr(event)
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
    // alert(this.selectedYears);

   if (this.selectedYears.length >  0 )
   {

     // Grid  data  below
    this.service.Get_Critical_MonitoringView(this.stateCodes, this.districtCodes, this.cityCodes,"0", this.selectedYears).subscribe(result_Fin14 => {
      this.lstCriticalData=result_Fin14;
      let result=result_Fin14.reduce(function(groups, item) {
        const val = item['Component'];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});
    this.GroupedData=result;
    })

        // this.sp_create_PMAY_Critical_DATANew(this.stateCodes, this.districtCodes, this.cityCodes,this.selectedYears);
        // this.sp_create_ISSR_Critical_DATANew(this.stateCodes, this.districtCodes, this.cityCodes,this.selectedYears);
        // this.service.sp_create__Grid_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes,"0",this.selectedYears).subscribe(result_Houses_Status => { // new code
        // this.LstPayData1_C = result_Houses_Status;  
     // });
    }
   else
   {
    //this.service.Get_Critical_MonitoringView(this.stateCodes, this.districtCodes, this.cityCodes,"0", this.selectedYears).subscribe(result_Fin14 => {
    //  this.lstCriticalData=result_Fin14;
    //});

    this.service.Get_Critical_MonitoringView(this.stateCodes, this.districtCodes, this.cityCodes,"0", this.selectedYears).subscribe(result_Fin14 => {
      this.lstCriticalData=result_Fin14;
      let result=result_Fin14.reduce(function(groups, item) {
        const val = item['Component'];
        groups[val] = groups[val] || [];
        groups[val].push(item);
        return groups;
    }, {});
    this.GroupedData=result;
    })

   }
}


//this.sp_create_AHP_Critical_DATANew(this.stateCodes, this.districtCodes, this.cityCodes,this.selectedYears);
//this.sp_create_BLC_Critical_DATANew(this.stateCodes, this.districtCodes, this.cityCodes,this.selectedYears);
sp_create_AHP_Critical_DATANew(stateCode, DisttCode, cityCode, Fin_Year )
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
     // alert(str.length);
      if (str.length==16)
      {
          var splitted = str.split(",", str.length);
          var x2 =  splitted[0].substring(8,str.length-1);

      }
   //   alert(splitted.length);
     if (splitted.length ==1)
     {
      
      this.service.sp_create_AHP_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          if (result[0].FinYear !="0" )
          {
            //try{
              this.Fin_Year14_15_C = result[0].FinYear;
              this.Housesinvolved14_15_C = result[0].Housesinvolved;
              this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
              this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
              this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
              this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
              this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
             }

        
          let chart = new CanvasJS.Chart("chartAHP_Critical", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Data Consolidated (AHP)",
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
              legendText: "Houses Involved",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x2, y: this.Housesinvolved14_15_C },
                { label: x3, y: this.FundsDisbursed_in_Houses14_15_C },
                { label: x4, y: this.Houses_Grounde14_15_C },
                { label: x5, y: this.Houses_Complete14_15_C },
                { label: x6, y: this.HousesOccupied14_15_C },
                { label: x7, y: this.First_Houses14_15_C },
         
              ]
            },
            // {
            //   type: "column",
            //   dockInsidePlotArea: true,
            //    indexLabel: "{y}", //HG
            //   bevelEnabled: true,
            //   showInLegend: true,
            //   legendText: "FundsDisbursed in Houses",
            //    stValue: "Q",
            //   indexLabelFontSize: 12,
            //   indexLabelOrientation: "vertical",
            //   dataPoints: [
            //     { label: x2, y: this.FundsDisbursed_in_Houses14_15_C },
            //   ]
            // },
  
            // {
            //   type: "column",
            //   dockInsidePlotArea: true,
            //    indexLabel: "{y}", //HG
            //   bevelEnabled: true,
            //   showInLegend: true,
            //   legendText: "Houses Grounded",
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
            //   legendText: "Houses Completed",
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
            //   legendText: "Houses Occupied",
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
      this.service.sp_create_AHP_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
                     
 
        if (result[0].FinYear !="0" )
        {
          //try{
            this.Fin_Year14_15_C = result[0].FinYear;
            this.Housesinvolved14_15_C = result[0].Housesinvolved;
            this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
            this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
            this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
            this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
            this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
           }
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

            // 
            try {
              if (result[1].FinYear !="0" )
              {
                //try{
                  this.Fin_Year15_16_C = result[1].FinYear;
                  this.Housesinvolved15_16_C = result[1].Housesinvolved;
                  this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                  this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                  this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                  this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                  this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
                 }
          }
          catch{}
          finally{}


         let chart = new CanvasJS.Chart("chartAHP_Critical", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          title: {
            text: "Physical Data Consolidated (AHP)",
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
            legendText: "Houses Involved",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_C },
              { label: Y1, y: this.Housesinvolved15_16_C}

            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "FundsDisbursed in Houses",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Houses Grounded",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_C },
              { label: Y1, y: this.Houses_Grounde15_16_C }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Houses Completed",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_C },
              { label: Y1, y: this.Houses_Complete15_16_C }
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
              { label: x1, y: this.HousesOccupied14_15_C },
              { label: Y1, y: this.HousesOccupied15_16_C }
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
              { label: x1, y: this.First_Houses14_15_C },
              { label: Y1, y: this.First_Houses15_16_C }
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
      this.service.sp_create_AHP_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
      
      //   this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

          this.Fin_Year14_15_C = result[0].FinYear;
          this.Housesinvolved14_15_C = result[0].Housesinvolved;
          this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
          this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
          this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
          this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
          this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

            // 
            try {
              this.Fin_Year15_16_C = result[1].FinYear;
              this.Housesinvolved15_16_C= result[1].Housesinvolved;
              this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
              this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
              this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
              this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
              this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}


          try {
            this.Fin_Year16_17_C = result[2].FinYear;
                  this.Housesinvolved16_17_C = result[2].Housesinvolved;
                  this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                  this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                  this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                  this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                  this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
        }
        catch{}
        finally{}


         let chart = new CanvasJS.Chart("chartAHP_Critical", {
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
            legendText: "Houses Involved",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_C },
              { label: Y1, y: this.Housesinvolved15_16_C},
              { label: z1, y: this.Housesinvolved16_17_C }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "FundsDisbursed in Houses",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_C }

            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Houses Grounded",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_C },
              { label: Y1, y: this.Houses_Grounde15_16_C },
              { label: z1, y: this.Houses_Grounde16_17_C }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Houses Completed",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_C },
              { label: Y1, y: this.Houses_Complete15_16_C },
              { label: z1, y: this.Houses_Complete16_17_C }
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
              { label: x1, y: this.HousesOccupied14_15_C },
              { label: Y1, y: this.HousesOccupied15_16_C },
              { label: z1, y: this.HousesOccupied16_17_C} 
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
              { label: x1, y: this.First_Houses14_15_C },
              { label: Y1, y: this.First_Houses15_16_C },
              { label: z1, y: this.First_Houses16_17_C }
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

      this.service.sp_create_AHP_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
      
       //  this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

             this.Fin_Year14_15_C = result[0].FinYear;
          this.Housesinvolved14_15_C = result[0].Housesinvolved;
          this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
          this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
          this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
          this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
          this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

            // 
            try {
              this.Fin_Year15_16_C = result[1].FinYear;
              this.Housesinvolved15_16_C= result[1].Housesinvolved;
              this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
              this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
              this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
              this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
              this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}


          try {
            this.Fin_Year16_17_C = result[2].FinYear;
                  this.Housesinvolved16_17_C = result[2].Housesinvolved;
                  this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                  this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                  this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                  this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                  this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
        }
        catch{}
        finally{}

        try {
          this.Fin_Year17_18_C = result[3].FinYear;
          this.Housesinvolved17_18_C = result[3].Housesinvolved;
          this.FundsDisbursed_in_Houses17_18_C = result[3].Istinstyettobereleased;
          this.Houses_Grounde17_18_C= result[3].IIndinstyettobereleased;
          this.Houses_Complete17_18_C = result[3].ThirdInstyettobereleased;
          this.HousesOccupied17_18_C = result[3].GroundedbutyettobeCompleted;
          this.First_Houses17_18_C = result[3].CompletedbutyettobeOccupied; 
      }
      catch{}
      finally{}


         let chart = new CanvasJS.Chart("chartAHP_Critical", {
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
            legendText: "Houses Involved",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_C },
              { label: Y1, y: this.Housesinvolved15_16_C},
              { label: z1, y: this.Housesinvolved16_17_C },
              { label: z2, y: this.Housesinvolved17_18_C }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "FundsDisbursed in Houses",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_C },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18_C }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Houses Grounded",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_C },
              { label: Y1, y: this.Houses_Grounde15_16_C },
              { label: z1, y: this.Houses_Grounde16_17_C },
              { label: z2, y: this.Houses_Grounde17_18_C }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Houses Completed",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_C },
              { label: Y1, y: this.Houses_Complete15_16_C },
              { label: z1, y: this.Houses_Complete16_17_C },
              { label: z2, y: this.Houses_Complete17_18_C }
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
              { label: x1, y: this.HousesOccupied14_15_C },
              { label: Y1, y: this.HousesOccupied15_16_C },
              { label: z1, y: this.HousesOccupied16_17_C},
              { label: z2, y: this.HousesOccupied17_18_C} 
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
              { label: x1, y: this.First_Houses14_15_C },
              { label: Y1, y: this.First_Houses15_16_C },
              { label: z1, y: this.First_Houses16_17_C },
              { label: z2, y: this.First_Houses17_18_C }
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
      this.service.sp_create_AHP_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
         
     // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {

          this.Fin_Year14_15_C = result[0].FinYear;
          this.Housesinvolved14_15_C = result[0].Housesinvolved;
          this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
          this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
          this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
          this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
          this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

            // 
            try {
              this.Fin_Year15_16_C = result[1].FinYear;
              this.Housesinvolved15_16_C= result[1].Housesinvolved;
              this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
              this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
              this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
              this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
              this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}


          try {
            this.Fin_Year16_17_C = result[2].FinYear;
                  this.Housesinvolved16_17_C = result[2].Housesinvolved;
                  this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                  this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                  this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                  this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                  this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
        }
        catch{}
        finally{}

        try {
          this.Fin_Year17_18_C = result[3].FinYear;
          this.Housesinvolved17_18_C = result[3].Housesinvolved;
          this.FundsDisbursed_in_Houses17_18_C = result[3].Istinstyettobereleased;
          this.Houses_Grounde17_18_C= result[3].IIndinstyettobereleased;
          this.Houses_Complete17_18_C = result[3].ThirdInstyettobereleased;
          this.HousesOccupied17_18_C = result[3].GroundedbutyettobeCompleted;
          this.First_Houses17_18_C = result[3].CompletedbutyettobeOccupied; 
      }
      catch{}
      finally{}

      try {
        this.Fin_Year18_19_C = result[4].FinYear;
        this.Housesinvolved18_19_C = result[4].Housesinvolved;
        this.FundsDisbursed_in_Houses18_19_C = result[4].Istinstyettobereleased;
        this.Houses_Grounde18_19_C= result[4].IIndinstyettobereleased;
        this.Houses_Complete18_19_C = result[4].ThirdInstyettobereleased;
        this.HousesOccupied18_19_C = result[4].GroundedbutyettobeCompleted;
        this.First_Houses18_19_C = result[4].CompletedbutyettobeOccupied; 
  }
    catch{}
    finally{}


         let chart = new CanvasJS.Chart("chartAHP_Critical", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: false,
          title: {
            text: "Physical Data Consolidated (AHP)",
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
            legendText: "Houses Involved",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_C },
              { label: Y1, y: this.Housesinvolved15_16_C},
              { label: z1, y: this.Housesinvolved16_17_C },
              { label: z2, y: this.Housesinvolved17_18_C },
              { label: z3, y: this.Housesinvolved18_19_C }
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "FundsDisbursed in Houses",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_C },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18_C },
              { label: z3, y: this.FundsDisbursed_in_Houses18_19_C }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Houses Grounded",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_C },
              { label: Y1, y: this.Houses_Grounde15_16_C },
              { label: z1, y: this.Houses_Grounde16_17_C },
              { label: z2, y: this.Houses_Grounde17_18_C },
              { label: z3, y: this.Houses_Grounde18_19_C }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Houses Completed",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_C },
              { label: Y1, y: this.Houses_Complete15_16_C },
              { label: z1, y: this.Houses_Complete16_17_C },
              { label: z2, y: this.Houses_Complete17_18_C },
              { label: z3, y: this.Houses_Complete18_19_C }
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
              { label: x1, y: this.HousesOccupied14_15_C },
              { label: Y1, y: this.HousesOccupied15_16_C },
              { label: z1, y: this.HousesOccupied16_17_C},
              { label: z2, y: this.HousesOccupied17_18_C},
              { label: z3, y: this.HousesOccupied18_19_C} 
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "First Installment",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.First_Houses14_15_C },
              { label: Y1, y: this.First_Houses15_16_C },
              { label: z1, y: this.First_Houses16_17_C },
              { label: z2, y: this.First_Houses17_18_C },
              { label: z3, y: this.First_Houses18_19_C }
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
      this.service.sp_create_AHP_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
         
     // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        //    if (result[0].FinYear !="0" )
        //  {


          this.Fin_Year14_15_C = result[0].FinYear;
          this.Housesinvolved14_15_C = result[0].Housesinvolved;
          this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
          this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
          this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
          this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
          this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
        //  }
        //  if (result[1].FinYear !="0" )
        //  {

            // 
            try {
              this.Fin_Year15_16_C = result[1].FinYear;
              this.Housesinvolved15_16_C= result[1].Housesinvolved;
              this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
              this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
              this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
              this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
              this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}


          try {
            this.Fin_Year16_17_C = result[2].FinYear;
                  this.Housesinvolved16_17_C = result[2].Housesinvolved;
                  this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                  this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                  this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                  this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                  this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
        }
        catch{}
        finally{}

        try {
          this.Fin_Year17_18_C = result[3].FinYear;
          this.Housesinvolved17_18_C = result[3].Housesinvolved;
          this.FundsDisbursed_in_Houses17_18_C = result[3].Istinstyettobereleased;
          this.Houses_Grounde17_18_C= result[3].IIndinstyettobereleased;
          this.Houses_Complete17_18_C = result[3].ThirdInstyettobereleased;
          this.HousesOccupied17_18_C = result[3].GroundedbutyettobeCompleted;
          this.First_Houses17_18_C = result[3].CompletedbutyettobeOccupied; 
      }
      catch{}
      finally{}

      try {
        this.Fin_Year18_19_C = result[4].FinYear;
        this.Housesinvolved18_19_C = result[4].Housesinvolved;
        this.FundsDisbursed_in_Houses18_19_C = result[4].Istinstyettobereleased;
        this.Houses_Grounde18_19_C= result[4].IIndinstyettobereleased;
        this.Houses_Complete18_19_C = result[4].ThirdInstyettobereleased;
        this.HousesOccupied18_19_C = result[4].GroundedbutyettobeCompleted;
        this.First_Houses18_19_C = result[4].CompletedbutyettobeOccupied; 
  }
    catch{}
    finally{}

    try {
      this.Fin_Year19_20_C = result[5].FinYear;
      this.Housesinvolved19_20_C = result[5].Housesinvolved;
      this.FundsDisbursed_in_Houses19_20_C = result[5].Istinstyettobereleased;
      this.Houses_Grounde19_20_C= result[5].IIndinstyettobereleased;
      this.Houses_Complete19_20_C = result[5].ThirdInstyettobereleased;
      this.HousesOccupied19_20_C = result[5].GroundedbutyettobeCompleted;
      this.First_Houses19_20_C = result[5].CompletedbutyettobeOccupied; 
  }
  catch{}
  finally{}

         let chart = new CanvasJS.Chart("chartAHP_Critical", {
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
            legendText: "Houses Involved",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              // { x: "14-15", y: this.Fin_Year15_16 },
              { label: x1, y: this.Housesinvolved14_15_C },
              { label: Y1, y: this.Housesinvolved15_16_C},
              { label: z1, y: this.Housesinvolved16_17_C },
              { label: z2, y: this.Housesinvolved17_18_C },
              { label: z3, y: this.Housesinvolved18_19_C },
              { label: z4, y: this.Housesinvolved19_20_C } 
            ]
          },
          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "FundsDisbursed in Houses",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
              { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
              { label: z1, y: this.FundsDisbursed_in_Houses16_17_C },
              { label: z2, y: this.FundsDisbursed_in_Houses17_18_C },
              { label: z3, y: this.FundsDisbursed_in_Houses18_19_C },
              { label: z4, y: this.FundsDisbursed_in_Houses19_20_C }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Houses Grounded",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Grounde14_15_C },
              { label: Y1, y: this.Houses_Grounde15_16_C },
              { label: z1, y: this.Houses_Grounde16_17_C },
              { label: z2, y: this.Houses_Grounde17_18_C },
              { label: z3, y: this.Houses_Grounde18_19_C },
              { label: z4, y: this.Houses_Grounde19_20_C }
            ]
          },

          {
            type: "column",
            dockInsidePlotArea: true,
             indexLabel: "{y}", //HG
            bevelEnabled: true,
            showInLegend: true,
            legendText: "Houses Completed",
             stValue: "Q",
            indexLabelFontSize: 12,
            indexLabelOrientation: "vertical",
            dataPoints: [
              { label: x1, y: this.Houses_Complete14_15_C },
              { label: Y1, y: this.Houses_Complete15_16_C },
              { label: z1, y: this.Houses_Complete16_17_C },
              { label: z2, y: this.Houses_Complete17_18_C },
              { label: z3, y: this.Houses_Complete18_19_C },
              { label: z4, y: this.Houses_Complete19_20_C }
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
              { label: x1, y: this.HousesOccupied14_15_C },
              { label: Y1, y: this.HousesOccupied15_16_C },
              { label: z1, y: this.HousesOccupied16_17_C},
              { label: z2, y: this.HousesOccupied17_18_C},
              { label: z3, y: this.HousesOccupied18_19_C},
              { label: z4, y: this.HousesOccupied19_20_C} 
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
              { label: x1, y: this.First_Houses14_15_C },
              { label: Y1, y: this.First_Houses15_16_C },
              { label: z1, y: this.First_Houses16_17_C },
              { label: z2, y: this.First_Houses17_18_C },
              { label: z3, y: this.First_Houses18_19_C },
              { label: z4, y: this.First_Houses19_20_C }
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
  sp_create_BLC_Critical_DATANew(stateCode, DisttCode, cityCode, Fin_Year )
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
        
        this.service.sp_create_BLC_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
            if (result[0].FinYear !="0" )
            {
              //try{
                this.Fin_Year14_15_C = result[0].FinYear;
                this.Housesinvolved14_15_C = result[0].Housesinvolved;
                this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
                this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
                this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
                this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
                this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
               }
 
          
            let chart = new CanvasJS.Chart("chartBLCS_Critical", {
              theme: "light2",
              animationEnabled: true,
              exportEnabled: false,
              title: {
                text: "Physical Data Consolidated (BLCS)",
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
                legendText: "Houses Involved",
                 stValue: "Q",
                indexLabelFontSize: 12,
                indexLabelOrientation: "vertical",
                dataPoints: [
                  { label: x2, y: this.Housesinvolved14_15_C },
                  { label: x3, y: this.FundsDisbursed_in_Houses14_15_C },
                  { label: x4, y: this.Houses_Grounde14_15_C },
                  { label: x5, y: this.Houses_Complete14_15_C },
                  { label: x6, y: this.HousesOccupied14_15_C },
                  { label: x7, y: this.First_Houses14_15_C },
           
                ]
              },
              // {
              //   type: "column",
              //   dockInsidePlotArea: true,
              //    indexLabel: "{y}", //HG
              //   bevelEnabled: true,
              //   showInLegend: true,
              //   legendText: "FundsDisbursed in Houses",
              //    stValue: "Q",
              //   indexLabelFontSize: 12,
              //   indexLabelOrientation: "vertical",
              //   dataPoints: [
              //     { label: x2, y: this.FundsDisbursed_in_Houses14_15_C },
              //   ]
              // },
    
              // {
              //   type: "column",
              //   dockInsidePlotArea: true,
              //    indexLabel: "{y}", //HG
              //   bevelEnabled: true,
              //   showInLegend: true,
              //   legendText: "Houses Grounded",
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
              //   legendText: "Houses Completed",
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
              //   legendText: "Houses Occupied",
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
        this.service.sp_create_BLC_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
                       
   
          if (result[0].FinYear !="0" )
          {
            //try{
              this.Fin_Year14_15_C = result[0].FinYear;
              this.Housesinvolved14_15_C = result[0].Housesinvolved;
              this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
              this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
              this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
              this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
              this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
             }
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                if (result[1].FinYear !="0" )
                {
                  //try{
                    this.Fin_Year15_16_C = result[1].FinYear;
                    this.Housesinvolved15_16_C = result[1].Housesinvolved;
                    this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                    this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                    this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                    this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                    this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
                   }
            }
            catch{}
            finally{}
  
  
           let chart = new CanvasJS.Chart("chartBLCS_Critical", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Data Consolidated (BLCS)",
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
              legendText: "Houses Involved",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                // { x: "14-15", y: this.Fin_Year15_16 },
                { label: x1, y: this.Housesinvolved14_15_C },
                { label: Y1, y: this.Housesinvolved15_16_C}
  
              ]
            },
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "FundsDisbursed in Houses",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Grounded",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Grounde14_15_C },
                { label: Y1, y: this.Houses_Grounde15_16_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Completed",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Complete14_15_C },
                { label: Y1, y: this.Houses_Complete15_16_C }
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
                { label: x1, y: this.HousesOccupied14_15_C },
                { label: Y1, y: this.HousesOccupied15_16_C }
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
                { label: x1, y: this.First_Houses14_15_C },
                { label: Y1, y: this.First_Houses15_16_C }
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
        this.service.sp_create_BLC_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        
        //   this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
            this.Fin_Year14_15_C = result[0].FinYear;
            this.Housesinvolved14_15_C = result[0].Housesinvolved;
            this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
            this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
            this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
            this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
            this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16_C = result[1].FinYear;
                this.Housesinvolved15_16_C= result[1].Housesinvolved;
                this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17_C = result[2].FinYear;
                    this.Housesinvolved16_17_C = result[2].Housesinvolved;
                    this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                    this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                    this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                    this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                    this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}
  
  
           let chart = new CanvasJS.Chart("chartBLCS_Critical", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: " Physical Data Consolidated (BLCS)",
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
              legendText: "Houses Involved",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                // { x: "14-15", y: this.Fin_Year15_16 },
                { label: x1, y: this.Housesinvolved14_15_C },
                { label: Y1, y: this.Housesinvolved15_16_C},
                { label: z1, y: this.Housesinvolved16_17_C }
              ]
            },
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "FundsDisbursed in Houses",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17_C }
  
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Grounded",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Grounde14_15_C },
                { label: Y1, y: this.Houses_Grounde15_16_C },
                { label: z1, y: this.Houses_Grounde16_17_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Completed",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Complete14_15_C },
                { label: Y1, y: this.Houses_Complete15_16_C },
                { label: z1, y: this.Houses_Complete16_17_C }
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
                { label: x1, y: this.HousesOccupied14_15_C },
                { label: Y1, y: this.HousesOccupied15_16_C },
                { label: z1, y: this.HousesOccupied16_17_C} 
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
                { label: x1, y: this.First_Houses14_15_C },
                { label: Y1, y: this.First_Houses15_16_C },
                { label: z1, y: this.First_Houses16_17_C }
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
  
        this.service.sp_create_BLC_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
        
         //  this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
               this.Fin_Year14_15_C = result[0].FinYear;
            this.Housesinvolved14_15_C = result[0].Housesinvolved;
            this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
            this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
            this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
            this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
            this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16_C = result[1].FinYear;
                this.Housesinvolved15_16_C= result[1].Housesinvolved;
                this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17_C = result[2].FinYear;
                    this.Housesinvolved16_17_C = result[2].Housesinvolved;
                    this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                    this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                    this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                    this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                    this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}
  
          try {
            this.Fin_Year17_18_C = result[3].FinYear;
            this.Housesinvolved17_18_C = result[3].Housesinvolved;
            this.FundsDisbursed_in_Houses17_18_C = result[3].Istinstyettobereleased;
            this.Houses_Grounde17_18_C= result[3].IIndinstyettobereleased;
            this.Houses_Complete17_18_C = result[3].ThirdInstyettobereleased;
            this.HousesOccupied17_18_C = result[3].GroundedbutyettobeCompleted;
            this.First_Houses17_18_C = result[3].CompletedbutyettobeOccupied; 
        }
        catch{}
        finally{}
  
  
           let chart = new CanvasJS.Chart("chartBLCS_Critical", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: " Physical Data Consolidated (BLCS)",
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
              legendText: "Houses Involved",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                // { x: "14-15", y: this.Fin_Year15_16 },
                { label: x1, y: this.Housesinvolved14_15_C },
                { label: Y1, y: this.Housesinvolved15_16_C},
                { label: z1, y: this.Housesinvolved16_17_C },
                { label: z2, y: this.Housesinvolved17_18_C }
              ]
            },
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "FundsDisbursed in Houses",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17_C },
                { label: z2, y: this.FundsDisbursed_in_Houses17_18_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Grounded",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Grounde14_15_C },
                { label: Y1, y: this.Houses_Grounde15_16_C },
                { label: z1, y: this.Houses_Grounde16_17_C },
                { label: z2, y: this.Houses_Grounde17_18_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Completed",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Complete14_15_C },
                { label: Y1, y: this.Houses_Complete15_16_C },
                { label: z1, y: this.Houses_Complete16_17_C },
                { label: z2, y: this.Houses_Complete17_18_C }
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
                { label: x1, y: this.HousesOccupied14_15_C },
                { label: Y1, y: this.HousesOccupied15_16_C },
                { label: z1, y: this.HousesOccupied16_17_C},
                { label: z2, y: this.HousesOccupied17_18_C} 
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
                { label: x1, y: this.First_Houses14_15_C },
                { label: Y1, y: this.First_Houses15_16_C },
                { label: z1, y: this.First_Houses16_17_C },
                { label: z2, y: this.First_Houses17_18_C }
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
        this.service.sp_create_BLC_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
           
       // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
            this.Fin_Year14_15_C = result[0].FinYear;
            this.Housesinvolved14_15_C = result[0].Housesinvolved;
            this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
            this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
            this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
            this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
            this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16_C = result[1].FinYear;
                this.Housesinvolved15_16_C= result[1].Housesinvolved;
                this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17_C = result[2].FinYear;
                    this.Housesinvolved16_17_C = result[2].Housesinvolved;
                    this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                    this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                    this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                    this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                    this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}
  
          try {
            this.Fin_Year17_18_C = result[3].FinYear;
            this.Housesinvolved17_18_C = result[3].Housesinvolved;
            this.FundsDisbursed_in_Houses17_18_C = result[3].Istinstyettobereleased;
            this.Houses_Grounde17_18_C= result[3].IIndinstyettobereleased;
            this.Houses_Complete17_18_C = result[3].ThirdInstyettobereleased;
            this.HousesOccupied17_18_C = result[3].GroundedbutyettobeCompleted;
            this.First_Houses17_18_C = result[3].CompletedbutyettobeOccupied; 
        }
        catch{}
        finally{}
  
        try {
          this.Fin_Year18_19_C = result[4].FinYear;
          this.Housesinvolved18_19_C = result[4].Housesinvolved;
          this.FundsDisbursed_in_Houses18_19_C = result[4].Istinstyettobereleased;
          this.Houses_Grounde18_19_C= result[4].IIndinstyettobereleased;
          this.Houses_Complete18_19_C = result[4].ThirdInstyettobereleased;
          this.HousesOccupied18_19_C = result[4].GroundedbutyettobeCompleted;
          this.First_Houses18_19_C = result[4].CompletedbutyettobeOccupied; 
    }
      catch{}
      finally{}
  
  
           let chart = new CanvasJS.Chart("chartBLCS_Critical", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: "Physical Data Consolidated (BLCS)",
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
              legendText: "Houses Involved",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                // { x: "14-15", y: this.Fin_Year15_16 },
                { label: x1, y: this.Housesinvolved14_15_C },
                { label: Y1, y: this.Housesinvolved15_16_C},
                { label: z1, y: this.Housesinvolved16_17_C },
                { label: z2, y: this.Housesinvolved17_18_C },
                { label: z3, y: this.Housesinvolved18_19_C }
              ]
            },
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "FundsDisbursed in Houses",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17_C },
                { label: z2, y: this.FundsDisbursed_in_Houses17_18_C },
                { label: z3, y: this.FundsDisbursed_in_Houses18_19_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Grounded",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Grounde14_15_C },
                { label: Y1, y: this.Houses_Grounde15_16_C },
                { label: z1, y: this.Houses_Grounde16_17_C },
                { label: z2, y: this.Houses_Grounde17_18_C },
                { label: z3, y: this.Houses_Grounde18_19_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Completed",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Complete14_15_C },
                { label: Y1, y: this.Houses_Complete15_16_C },
                { label: z1, y: this.Houses_Complete16_17_C },
                { label: z2, y: this.Houses_Complete17_18_C },
                { label: z3, y: this.Houses_Complete18_19_C }
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
                { label: x1, y: this.HousesOccupied14_15_C },
                { label: Y1, y: this.HousesOccupied15_16_C },
                { label: z1, y: this.HousesOccupied16_17_C},
                { label: z2, y: this.HousesOccupied17_18_C},
                { label: z3, y: this.HousesOccupied18_19_C} 
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "First Installment",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.First_Houses14_15_C },
                { label: Y1, y: this.First_Houses15_16_C },
                { label: z1, y: this.First_Houses16_17_C },
                { label: z2, y: this.First_Houses17_18_C },
                { label: z3, y: this.First_Houses18_19_C }
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
        this.service.sp_create_BLC_GraphCritical_DATAFinYeraWise(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
           
       // this.service.sp_create_PMAY_DATAConsNew(stateCode, DisttCode, cityCode,Fin_Year).subscribe(result => { // new code
          //    if (result[0].FinYear !="0" )
          //  {
  
 
            this.Fin_Year14_15_C = result[0].FinYear;
            this.Housesinvolved14_15_C = result[0].Housesinvolved;
            this.FundsDisbursed_in_Houses14_15_C = result[0].Istinstyettobereleased;
            this.Houses_Grounde14_15_C = result[0].IIndinstyettobereleased;
            this.Houses_Complete14_15_C = result[0].ThirdInstyettobereleased;
            this.HousesOccupied14_15_C = result[0].GroundedbutyettobeCompleted;
            this.First_Houses14_15_C = result[0].CompletedbutyettobeOccupied; 
          //  }
          //  if (result[1].FinYear !="0" )
          //  {
  
              // 
              try {
                this.Fin_Year15_16_C = result[1].FinYear;
                this.Housesinvolved15_16_C= result[1].Housesinvolved;
                this.FundsDisbursed_in_Houses15_16_C = result[1].Istinstyettobereleased;
                this.Houses_Grounde15_16_C = result[1].IIndinstyettobereleased;
                this.Houses_Complete15_16_C = result[1].ThirdInstyettobereleased;
                this.HousesOccupied15_16_C = result[1].GroundedbutyettobeCompleted;
                this.First_Houses15_16_C = result[1].CompletedbutyettobeOccupied; 
            }
            catch{}
            finally{}
  
  
            try {
              this.Fin_Year16_17_C = result[2].FinYear;
                    this.Housesinvolved16_17_C = result[2].Housesinvolved;
                    this.FundsDisbursed_in_Houses16_17_C = result[2].Istinstyettobereleased;
                    this.Houses_Grounde16_17_C= result[2].IIndinstyettobereleased;
                    this.Houses_Complete16_17_C = result[2].ThirdInstyettobereleased;
                    this.HousesOccupied16_17_C = result[2].GroundedbutyettobeCompleted;
                    this.First_Houses16_17_C = result[2].CompletedbutyettobeOccupied; 
          }
          catch{}
          finally{}
  
          try {
            this.Fin_Year17_18_C = result[3].FinYear;
            this.Housesinvolved17_18_C = result[3].Housesinvolved;
            this.FundsDisbursed_in_Houses17_18_C = result[3].Istinstyettobereleased;
            this.Houses_Grounde17_18_C= result[3].IIndinstyettobereleased;
            this.Houses_Complete17_18_C = result[3].ThirdInstyettobereleased;
            this.HousesOccupied17_18_C = result[3].GroundedbutyettobeCompleted;
            this.First_Houses17_18_C = result[3].CompletedbutyettobeOccupied; 
        }
        catch{}
        finally{}
  
        try {
          this.Fin_Year18_19_C = result[4].FinYear;
          this.Housesinvolved18_19_C = result[4].Housesinvolved;
          this.FundsDisbursed_in_Houses18_19_C = result[4].Istinstyettobereleased;
          this.Houses_Grounde18_19_C= result[4].IIndinstyettobereleased;
          this.Houses_Complete18_19_C = result[4].ThirdInstyettobereleased;
          this.HousesOccupied18_19_C = result[4].GroundedbutyettobeCompleted;
          this.First_Houses18_19_C = result[4].CompletedbutyettobeOccupied; 
    }
      catch{}
      finally{}

      try {
        this.Fin_Year19_20_C = result[5].FinYear;
        this.Housesinvolved19_20_C = result[5].Housesinvolved;
        this.FundsDisbursed_in_Houses19_20_C = result[5].Istinstyettobereleased;
        this.Houses_Grounde19_20_C= result[5].IIndinstyettobereleased;
        this.Houses_Complete19_20_C = result[5].ThirdInstyettobereleased;
        this.HousesOccupied19_20_C = result[5].GroundedbutyettobeCompleted;
        this.First_Houses19_20_C = result[5].CompletedbutyettobeOccupied; 
    }
    catch{}
    finally{}

           let chart = new CanvasJS.Chart("chartBLCS_Critical", {
            theme: "light2",
            animationEnabled: true,
            exportEnabled: false,
            title: {
              text: " Physical Data Consolidated (BLCS)",
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
              legendText: "Houses Involved",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                // { x: "14-15", y: this.Fin_Year15_16 },
                { label: x1, y: this.Housesinvolved14_15_C },
                { label: Y1, y: this.Housesinvolved15_16_C},
                { label: z1, y: this.Housesinvolved16_17_C },
                { label: z2, y: this.Housesinvolved17_18_C },
                { label: z3, y: this.Housesinvolved18_19_C },
                { label: z4, y: this.Housesinvolved19_20_C } 
              ]
            },
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "FundsDisbursed in Houses",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.FundsDisbursed_in_Houses14_15_C },
                { label: Y1, y: this.FundsDisbursed_in_Houses15_16_C },
                { label: z1, y: this.FundsDisbursed_in_Houses16_17_C },
                { label: z2, y: this.FundsDisbursed_in_Houses17_18_C },
                { label: z3, y: this.FundsDisbursed_in_Houses18_19_C },
                { label: z4, y: this.FundsDisbursed_in_Houses19_20_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Grounded",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Grounde14_15_C },
                { label: Y1, y: this.Houses_Grounde15_16_C },
                { label: z1, y: this.Houses_Grounde16_17_C },
                { label: z2, y: this.Houses_Grounde17_18_C },
                { label: z3, y: this.Houses_Grounde18_19_C },
                { label: z4, y: this.Houses_Grounde19_20_C }
              ]
            },
  
            {
              type: "column",
              dockInsidePlotArea: true,
               indexLabel: "{y}", //HG
              bevelEnabled: true,
              showInLegend: true,
              legendText: "Houses Completed",
               stValue: "Q",
              indexLabelFontSize: 12,
              indexLabelOrientation: "vertical",
              dataPoints: [
                { label: x1, y: this.Houses_Complete14_15_C },
                { label: Y1, y: this.Houses_Complete15_16_C },
                { label: z1, y: this.Houses_Complete16_17_C },
                { label: z2, y: this.Houses_Complete17_18_C },
                { label: z3, y: this.Houses_Complete18_19_C },
                { label: z4, y: this.Houses_Complete19_20_C }
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
                { label: x1, y: this.HousesOccupied14_15_C },
                { label: Y1, y: this.HousesOccupied15_16_C },
                { label: z1, y: this.HousesOccupied16_17_C},
                { label: z2, y: this.HousesOccupied17_18_C},
                { label: z3, y: this.HousesOccupied18_19_C},
                { label: z4, y: this.HousesOccupied19_20_C} 
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
                { label: x1, y: this.First_Houses14_15_C },
                { label: Y1, y: this.First_Houses15_16_C },
                { label: z1, y: this.First_Houses16_17_C },
                { label: z2, y: this.First_Houses17_18_C },
                { label: z3, y: this.First_Houses18_19_C },
                { label: z4, y: this.First_Houses19_20_C }
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

    BindPMAY_Critical_Data(stateCode, DisttCode, cityCode,Comp,Fin_Year)
     {



 // this.Housesinvolved14_15_C = this.lstCritical[0].Housesinvolved;
 // alert(this.Housesinvolved14_15_C);

         Comp ="0";
         this.service.sp_create_PMAY_Critical_DATA(stateCode, DisttCode, cityCode,Comp,"0").subscribe(result => { // new code
         ///first row data
       try {
   
       this.Housesinvolved14_15_C = result[0].Housesinvolved;
         this.IstInst14_15_C = result[0].Istinstyettobereleased;
         this.IInd14_15_C = result[0].IIndinstyettobereleased;
         this.Third14_15_C = result[0].ThirdInstyettobereleased;
         this.Grounded14_15_C = result[0].GroundedbutyettobeCompleted;
         this.Completed14_15_C = result[0].CompletedbutyettobeOccupied ;
       }
       catch{}
       finally{}
       
    
         //second row data
         try {
   
         this.Housesinvolved15_16_C= result[1].Housesinvolved;
         this.IstInst15_16_C = result[1].Istinstyettobereleased;
         this.IInd15_16_C = result[1].IIndinstyettobereleased;
         this.Third15_16_C = result[1].ThirdInstyettobereleased;
         this.Grounded15_16_C = result[1].GroundedbutyettobeCompleted;
         this.Completed15_16_C = result[1].CompletedbutyettobeOccupied ;
       }
       catch{}
       finally{}
        //Third row data
         try {
           //this.Fin_Year16_17 = result[2].FinYear;
           this.Housesinvolved16_17_C = result[2].Housesinvolved;
         
           this.IstInst16_17_C = result[2].Istinstyettobereleased;
           this.IInd16_17_C = result[2].IIndinstyettobereleased;
           this.Third16_17_C = result[2].ThirdInstyettobereleased;
           this.Grounded16_17_C = result[2].GroundedbutyettobeCompleted;
           this.Completed16_17_C = result[2].CompletedbutyettobeOccupied ;
         }
         catch{}
         finally{}
         //Fourth row data
         try {
   
         this.Housesinvolved17_18_C = result[3].Housesinvolved;
   
           this.IstInst17_18_C = result[3].Istinstyettobereleased;
           this.IInd17_18_C = result[3].IIndinstyettobereleased;
           this.Third17_18_C = result[3].ThirdInstyettobereleased;
           this.Grounded17_18_C = result[3].GroundedbutyettobeCompleted;
           this.Completed17_18_C = result[3].CompletedbutyettobeOccupied ;
         }
         catch{}
         finally{}
   
         //Fifth row data
         //this.Fin_Year18_19 = result[4].FinYear;
         try {
         this.Housesinvolved18_19_C = result[4].Housesinvolved;
           this.IstInst18_19_C = result[4].Istinstyettobereleased;
           this.IInd18_19_C = result[4].IIndinstyettobereleased;
           this.Third18_19_C = result[4].ThirdInstyettobereleased;
           this.Grounded18_19_C = result[4].GroundedbutyettobeCompleted;
           this.Completed18_19_C = result[4].CompletedbutyettobeOccupied ;
         }
         catch{}
         finally{}
   
   
               //Sixth row data
             //  this.Fin_Year19_20 = result[5].FinYear;
             try {      
             
               this.Housesinvolved19_20_C = result[5].Housesinvolved;
               this.IstInst19_20_C = result[5].Istinstyettobereleased;
               this.IInd19_20_C = result[5].IIndinstyettobereleased;
               this.Third19_20_C = result[5].ThirdInstyettobereleased;
               this.Grounded19_20_C = result[5].GroundedbutyettobeCompleted;
               this.Completed19_20_C = result[5].CompletedbutyettobeOccupied ;
             }
             catch{}
             finally{}
   
                     let chart = new CanvasJS.Chart("chartPMAY_Critical", {
                       theme: "light2",
                       animationEnabled: true,
                       exportEnabled: false,
                       title: {
                         text: " Critical PMAY(U) Data Consolidated",
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
                           { label: "2014-15", y: this.Housesinvolved14_15_C },
                           { label: "2015-16", y: this.Housesinvolved15_16_C},
                           { label: "2016-17", y: this.Housesinvolved16_17_C },
                           { label: "2017-18", y: this.Housesinvolved17_18_C },  
                           { label: "2018-19", y: this.Housesinvolved18_19_C },
                           { label: "2019-20", y: this.Housesinvolved19_20_C } 
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
                           { label: "2014-15", y: this.IstInst14_15_C },
                           { label: "2015-16", y: this.IstInst15_16_C },
                           { label: "2016-17", y: this.IstInst16_17_C },
                           { label: "2017-18", y: this.IstInst17_18_C},  
                           { label: "2018-19", y: this.IstInst18_19_C },
                           { label: "2019-20", y: this.IstInst19_20_C } 
                         ]
                       },
   
                       {
                         type: "column",
                         dockInsidePlotArea: true,
                          indexLabel: "{y}", //HG
                         bevelEnabled: true,
                         showInLegend: true,
                         legendText: "2nd inst yet to be released",
                          stValue: "Q",
                         indexLabelFontSize: 12,
                         indexLabelOrientation: "vertical",
                         dataPoints: [
                           { label: "2014-15", y: this.IInd14_15_C },
                           { label: "2015-16", y: this.IInd15_16_C },
                           { label: "2016-17", y: this.IInd16_17_C },
                           { label: "2017-18", y: this.IInd17_18_C },  
                           { label: "2018-19", y: this.IInd18_19_C },
                           { label: "2019-20", y: this.IInd19_20_C } 
                         ]
                       },
   
                       {
                         type: "column",
                         dockInsidePlotArea: true,
                          indexLabel: "{y}", //HG
                         bevelEnabled: true,
                         showInLegend: true,
                         legendText: "3rd Inst yet to be released",
                          stValue: "Q",
                         indexLabelFontSize: 12,
                         indexLabelOrientation: "vertical",
                         dataPoints: [
                           { label: "2014-15", y: this.Third14_15_C },
                           { label: "2015-16", y: this.Third15_16_C },
                           { label: "2016-17", y: this.Third16_17_C },
                           { label: "2017-18", y: this.Third17_18_C },  
                           { label: "2018-19", y: this.Third18_19_C },
                           { label: "2019-20", y: this.Third19_20_C } 
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
                           { label: "2014-15", y: this.Grounded14_15_C },
                           { label: "2015-16", y: this.Grounded15_16_C },
                           { label: "2016-17", y: this.Grounded16_17_C },
                           { label: "2017-18", y: this.Grounded17_18_C },  
                           { label: "2018-19", y: this.Grounded18_19_C },
                           { label: "2019-20", y: this.Grounded19_20_C } 
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
                           { label: "2014-15", y: this.Completed14_15_C },
                           { label: "2015-16", y: this.Completed15_16_C },
                           { label: "2016-17", y: this.Completed16_17_C },
                           { label: "2017-18", y: this.Completed17_18_C },  
                           { label: "2018-19", y: this.Completed18_19_C },
                           { label: "2019-20", y: this.Completed19_20_C } 
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
    
    BindPMAY_Critical_ISSR_Data1(stateCode, DisttCode, cityCode,Comp,Fin_Year)
    {
        Comp ="0";
        this.service.sp_create_ISSR_Graph_Critical_DATA(stateCode, DisttCode, cityCode,Comp,"0").subscribe(result => { // new code
        ///first row data
      try {
  
      this.Housesinvolved14_15_C = result[0].Housesinvolved;
        this.IstInst14_15_C = result[0].Istinstyettobereleased;
        this.IInd14_15_C = result[0].IIndinstyettobereleased;
        this.Third14_15_C = result[0].ThirdInstyettobereleased;
        this.Grounded14_15_C = result[0].GroundedbutyettobeCompleted;
        this.Completed14_15_C = result[0].CompletedbutyettobeOccupied ;
      }
      catch{}
      finally{}
      
   
        //second row data
        try {
  
        this.Housesinvolved15_16_C= result[1].Housesinvolved;
        this.IstInst15_16_C = result[1].Istinstyettobereleased;
        this.IInd15_16_C = result[1].IIndinstyettobereleased;
        this.Third15_16_C = result[1].ThirdInstyettobereleased;
        this.Grounded15_16_C = result[1].GroundedbutyettobeCompleted;
        this.Completed15_16_C = result[1].CompletedbutyettobeOccupied ;
      }
      catch{}
      finally{}
       //Third row data
        try {
          //this.Fin_Year16_17 = result[2].FinYear;
          this.Housesinvolved16_17_C = result[2].Housesinvolved;
        
          this.IstInst16_17_C = result[2].Istinstyettobereleased;
          this.IInd16_17_C = result[2].IIndinstyettobereleased;
          this.Third16_17_C = result[2].ThirdInstyettobereleased;
          this.Grounded16_17_C = result[2].GroundedbutyettobeCompleted;
          this.Completed16_17_C = result[2].CompletedbutyettobeOccupied ;
        }
        catch{}
        finally{}
        //Fourth row data
        try {
  
        this.Housesinvolved17_18_C = result[3].Housesinvolved;
  
          this.IstInst17_18_C = result[3].Istinstyettobereleased;
          this.IInd17_18_C = result[3].IIndinstyettobereleased;
          this.Third17_18_C = result[3].ThirdInstyettobereleased;
          this.Grounded17_18_C = result[3].GroundedbutyettobeCompleted;
          this.Completed17_18_C = result[3].CompletedbutyettobeOccupied ;
        }
        catch{}
        finally{}
  
        //Fifth row data
        //this.Fin_Year18_19 = result[4].FinYear;
        try {
        this.Housesinvolved18_19_C = result[4].Housesinvolved;
          this.IstInst18_19_C = result[4].Istinstyettobereleased;
          this.IInd18_19_C = result[4].IIndinstyettobereleased;
          this.Third18_19_C = result[4].ThirdInstyettobereleased;
          this.Grounded18_19_C = result[4].GroundedbutyettobeCompleted;
          this.Completed18_19_C = result[4].CompletedbutyettobeOccupied ;
        }
        catch{}
        finally{}
  
  
              //Sixth row data
            //  this.Fin_Year19_20 = result[5].FinYear;
            try {      
            
              this.Housesinvolved19_20_C = result[5].Housesinvolved;
              this.IstInst19_20_C = result[5].Istinstyettobereleased;
              this.IInd19_20_C = result[5].IIndinstyettobereleased;
              this.Third19_20_C = result[5].ThirdInstyettobereleased;
              this.Grounded19_20_C = result[5].GroundedbutyettobeCompleted;
              this.Completed19_20_C = result[5].CompletedbutyettobeOccupied ;
            }
            catch{}
            finally{}
  
                    let chart = new CanvasJS.Chart("chartISSR_Critical", {
                      theme: "light2",
                      animationEnabled: true,
                      exportEnabled: false,
                      title: {
                        text: " ISSR Data Consolidated",
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
                          { label: "2014-15", y: this.Housesinvolved14_15_C },
                          { label: "2015-16", y: this.Housesinvolved15_16_C},
                          { label: "2016-17", y: this.Housesinvolved16_17_C },
                          { label: "2017-18", y: this.Housesinvolved17_18_C },  
                          { label: "2018-19", y: this.Housesinvolved18_19_C },
                          { label: "2019-20", y: this.Housesinvolved19_20_C } 
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
                          { label: "2014-15", y: this.IstInst14_15_C },
                          { label: "2015-16", y: this.IstInst15_16_C },
                          { label: "2016-17", y: this.IstInst16_17_C },
                          { label: "2017-18", y: this.IstInst17_18_C},  
                          { label: "2018-19", y: this.IstInst18_19_C },
                          { label: "2019-20", y: this.IstInst19_20_C } 
                        ]
                      },
  
                      {
                        type: "column",
                        dockInsidePlotArea: true,
                         indexLabel: "{y}", //HG
                        bevelEnabled: true,
                        showInLegend: true,
                        legendText: "2nd inst yet to be released",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          { label: "2014-15", y: this.IInd14_15_C },
                          { label: "2015-16", y: this.IInd15_16_C },
                          { label: "2016-17", y: this.IInd16_17_C },
                          { label: "2017-18", y: this.IInd17_18_C },  
                          { label: "2018-19", y: this.IInd18_19_C },
                          { label: "2019-20", y: this.IInd19_20_C } 
                        ]
                      },
  
                      {
                        type: "column",
                        dockInsidePlotArea: true,
                         indexLabel: "{y}", //HG
                        bevelEnabled: true,
                        showInLegend: true,
                        legendText: "3rd Inst yet to be released",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          { label: "2014-15", y: this.Third14_15_C },
                          { label: "2015-16", y: this.Third15_16_C },
                          { label: "2016-17", y: this.Third16_17_C },
                          { label: "2017-18", y: this.Third17_18_C },  
                          { label: "2018-19", y: this.Third18_19_C },
                          { label: "2019-20", y: this.Third19_20_C } 
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
                          { label: "2014-15", y: this.Grounded14_15_C },
                          { label: "2015-16", y: this.Grounded15_16_C },
                          { label: "2016-17", y: this.Grounded16_17_C },
                          { label: "2017-18", y: this.Grounded17_18_C },  
                          { label: "2018-19", y: this.Grounded18_19_C },
                          { label: "2019-20", y: this.Grounded19_20_C } 
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
                          { label: "2014-15", y: this.Completed14_15_C },
                          { label: "2015-16", y: this.Completed15_16_C },
                          { label: "2016-17", y: this.Completed16_17_C },
                          { label: "2017-18", y: this.Completed17_18_C },  
                          { label: "2018-19", y: this.Completed18_19_C },
                          { label: "2019-20", y: this.Completed19_20_C } 
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

    
    BindPMAY_Critical_ISSR_Data(stateCode, DisttCode, cityCode,Comp,Fin_Year)
    {
    //  FinYear	Housesinvolved	Istinstyettobereleased	IIndinstyettobereleased	ThirdInstyettobereleased	GroundedbutyettobeCompleted	CompletedbutyettobeOccupied

      // this.Fin_Year =Fin_Year;
      // alert(Fin_Year);
      Comp ="ISSR";
        this.service.sp_create_ISSR_Graph_Critical_DATA(stateCode, DisttCode, cityCode,Comp,"0").subscribe(result => { // new code
          // if (result.length >0)
          // {
          //   alert('PM');
          // }
        ///first row data
      //  this.Fin_Year14_15 = result[0].FinYear;
      try {
        this.Housesinvolved14_15_C = result[0].Housesinvolved;
        this.IstInst14_15_C = result[0].Istinstyettobereleased;
        this.IInd14_15_C = result[0].IIndinstyettobereleased;
        this.Third14_15_C = result[0].ThirdInstyettobereleased;
        this.Grounded14_15_C = result[0].GroundedbutyettobeCompleted;
        this.Completed14_15_C = result[0].CompletedbutyettobeOccupied ;
      }
      catch{}
      finally{}
      
  // alert(this\.Housesinvolved14_15_C);
        //second row data
        //this.Fin_Year15_16 = result[1].FinYear;
        try {
  
        this.Housesinvolved15_16_C= result[1].Housesinvolved;
        this.IstInst15_16_C = result[1].Istinstyettobereleased;
        this.IInd15_16_C = result[1].IIndinstyettobereleased;
        this.Third15_16_C = result[1].ThirdInstyettobereleased;
        this.Grounded15_16_C = result[1].GroundedbutyettobeCompleted;
        this.Completed15_16_C = result[1].CompletedbutyettobeOccupied ;
      }
      catch{}
      finally{}
       //Third row data
        try {
          //this.Fin_Year16_17 = result[2].FinYear;
          this.Housesinvolved16_17_C = result[2].Housesinvolved;
        
          this.IstInst16_17_C = result[2].Istinstyettobereleased;
          this.IInd16_17_C = result[2].IIndinstyettobereleased;
          this.Third16_17_C = result[2].ThirdInstyettobereleased;
          this.Grounded16_17_C = result[2].GroundedbutyettobeCompleted;
          this.Completed16_17_C = result[2].CompletedbutyettobeOccupied ;
        }
        catch{}
        finally{}
        //Fourth row data
        //this.Fin_Year17_18 = result[3].FinYear;
        try {
  
        this.Housesinvolved17_18_C = result[3].Housesinvolved;
  
          this.IstInst17_18_C = result[3].Istinstyettobereleased;
          this.IInd17_18_C = result[3].IIndinstyettobereleased;
          this.Third17_18_C = result[3].ThirdInstyettobereleased;
          this.Grounded17_18_C = result[3].GroundedbutyettobeCompleted;
          this.Completed17_18_C = result[3].CompletedbutyettobeOccupied ;
        }
        catch{}
        finally{}
  
        //Fifth row data
        //this.Fin_Year18_19 = result[4].FinYear;
        try {
        this.Housesinvolved18_19_C = result[4].Housesinvolved;
          this.IstInst18_19_C = result[4].Istinstyettobereleased;
          this.IInd18_19_C = result[4].IIndinstyettobereleased;
          this.Third18_19_C = result[4].ThirdInstyettobereleased;
          this.Grounded18_19_C = result[4].GroundedbutyettobeCompleted;
          this.Completed18_19_C = result[4].CompletedbutyettobeOccupied ;
        }
        catch{}
        finally{}
  
  
              //Sixth row data
            //  this.Fin_Year19_20 = result[5].FinYear;
            try {      
            
              this.Housesinvolved19_20_C = result[5].Housesinvolved;
              this.IstInst19_20_C = result[5].Istinstyettobereleased;
              this.IInd19_20_C = result[5].IIndinstyettobereleased;
              this.Third19_20_C = result[5].ThirdInstyettobereleased;
              this.Grounded19_20_C = result[5].GroundedbutyettobeCompleted;
              this.Completed19_20_C = result[5].CompletedbutyettobeOccupied ;
            }
            catch{}
            finally{}
  
                    let chart = new CanvasJS.Chart("chartISSR_Critical", {
                      theme: "light2",
                      animationEnabled: true,
                      exportEnabled: false,
                      title: {
                        text: " Critical ISSR Data Consolidated",
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
                          { label: "2014-15", y: this.Housesinvolved14_15_C },
                          { label: "2015-16", y: this.Housesinvolved15_16_C},
                          { label: "2016-17", y: this.Housesinvolved16_17_C },
                          { label: "2017-18", y: this.Housesinvolved17_18_C },  
                          { label: "2018-19", y: this.Housesinvolved18_19_C },
                          { label: "2019-20", y: this.Housesinvolved19_20_C } 
                        ]
                      },
                      {
                        type: "column",
                        dockInsidePlotArea: true,
                         indexLabel: "{y}", //HG
                        bevelEnabled: true,
                        showInLegend: true,
                        legendText: "Ist Inst yet to be released",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          { label: "2014-15", y: this.IstInst14_15_C },
                          { label: "2015-16", y: this.IstInst15_16_C },
                          { label: "2016-17", y: this.IstInst16_17_C },
                          { label: "2017-18", y: this.IstInst17_18_C },  
                          { label: "2018-19", y: this.IstInst18_19_C },
                          { label: "2019-20", y: this.IstInst19_20_C } 
                        ]
                      },
  
                      {
                        type: "column",
                        dockInsidePlotArea: true,
                         indexLabel: "{y}", //HG
                        bevelEnabled: true,
                        showInLegend: true,
                        legendText: "2nd Inst yet to be released",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          { label: "2014-15", y: this.IInd14_15_C },
                          { label: "2015-16", y: this.IInd15_16_C },
                          { label: "2016-17", y: this.IInd16_17_C },
                          { label: "2017-18", y: this.IInd17_18_C },  
                          { label: "2018-19", y: this.IInd18_19_C },
                          { label: "2019-20", y: this.IInd19_20_C } 
                        ]
                      },
  
                      {
                        type: "column",
                        dockInsidePlotArea: true,
                         indexLabel: "{y}", //HG
                        bevelEnabled: true,
                        showInLegend: true,
                        legendText: "3rd Inst yet to be released",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          { label: "2014-15", y: this.Third14_15_C },
                          { label: "2015-16", y: this.Third15_16_C },
                          { label: "2016-17", y: this.Third16_17_C },
                          { label: "2017-18", y: this.Third17_18_C },  
                          { label: "2018-19", y: this.Third18_19_C },
                          { label: "2019-20", y: this.Third19_20_C } 
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
                          { label: "2014-15", y: this.Grounded14_15_C },
                          { label: "2015-16", y: this.Grounded15_16_C },
                          { label: "2016-17", y: this.Grounded16_17_C},
                          { label: "2017-18", y: this.Grounded17_18_C },  
                          { label: "2018-19", y: this.Grounded18_19_C },
                          { label: "2019-20", y: this.Grounded19_20_C } 
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
                          { label: "2014-15", y: this.Completed14_15_C },
                          { label: "2015-16", y: this.Completed15_16_C },
                          { label: "2016-17", y: this.Completed16_17_C },
                          { label: "2017-18", y: this.Completed17_18_C },  
                          { label: "2018-19", y: this.Completed18_19_C },
                          { label: "2019-20", y: this.Completed19_20_C } 
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

    BindPMAY_Critical_AHP_Data(stateCode, DisttCode, cityCode,Comp,Fin_Year)
    {
      Comp ="AHP";
        this.service.sp_create_AHP_Graph_Critical_DATA(stateCode, DisttCode, cityCode,Comp,"0").subscribe(result => { // new code
          // if (result.length >0)
          // {
          //   alert('PM');
          // }
        ///first row data
      //  this.Fin_Year14_15 = result[0].FinYear;
      try {
        this.Housesinvolved14_15_C = result[0].Housesinvolved;
        this.IstInst14_15_C = result[0].Istinstyettobereleased;
        this.IInd14_15_C = result[0].IIndinstyettobereleased;
        this.Third14_15_C = result[0].ThirdInstyettobereleased;
        this.Grounded14_15_C = result[0].GroundedbutyettobeCompleted;
        this.Completed14_15_C = result[0].CompletedbutyettobeOccupied ;
      }
      catch{}
      finally{}
      
  // alert(this\.Housesinvolved14_15_C);
        //second row data
        //this.Fin_Year15_16 = result[1].FinYear;
        try {
  
        this.Housesinvolved15_16_C= result[1].Housesinvolved;
        this.IstInst15_16_C = result[1].Istinstyettobereleased;
        this.IInd15_16_C = result[1].IIndinstyettobereleased;
        this.Third15_16_C = result[1].ThirdInstyettobereleased;
        this.Grounded15_16_C = result[1].GroundedbutyettobeCompleted;
        this.Completed15_16_C = result[1].CompletedbutyettobeOccupied ;
      }
      catch{}
      finally{}
       //Third row data
        try {
          //this.Fin_Year16_17 = result[2].FinYear;
          this.Housesinvolved16_17_C = result[2].Housesinvolved;
        
          this.IstInst16_17_C = result[2].Istinstyettobereleased;
          this.IInd16_17_C = result[2].IIndinstyettobereleased;
          this.Third16_17_C = result[2].ThirdInstyettobereleased;
          this.Grounded16_17_C = result[2].GroundedbutyettobeCompleted;
          this.Completed16_17_C = result[2].CompletedbutyettobeOccupied ;
        }
        catch{}
        finally{}
        //Fourth row data
        //this.Fin_Year17_18 = result[3].FinYear;
        try {
  
        this.Housesinvolved17_18_C = result[3].Housesinvolved;
  
          this.IstInst17_18_C = result[3].Istinstyettobereleased;
          this.IInd17_18_C = result[3].IIndinstyettobereleased;
          this.Third17_18_C = result[3].ThirdInstyettobereleased;
          this.Grounded17_18_C = result[3].GroundedbutyettobeCompleted;
          this.Completed17_18_C = result[3].CompletedbutyettobeOccupied ;
        }
        catch{}
        finally{}
  
        //Fifth row data
        //this.Fin_Year18_19 = result[4].FinYear;
        try {
        this.Housesinvolved18_19_C = result[4].Housesinvolved;
          this.IstInst18_19_C = result[4].Istinstyettobereleased;
          this.IInd18_19_C = result[4].IIndinstyettobereleased;
          this.Third18_19_C = result[4].ThirdInstyettobereleased;
          this.Grounded18_19_C = result[4].GroundedbutyettobeCompleted;
          this.Completed18_19_C = result[4].CompletedbutyettobeOccupied ;
        }
        catch{}
        finally{}
            try {      
            
              this.Housesinvolved19_20_C = result[5].Housesinvolved;
              this.IstInst19_20_C = result[5].Istinstyettobereleased;
              this.IInd19_20_C = result[5].IIndinstyettobereleased;
              this.Third19_20_C = result[5].ThirdInstyettobereleased;
              this.Grounded19_20_C = result[5].GroundedbutyettobeCompleted;
              this.Completed19_20_C = result[5].CompletedbutyettobeOccupied ;
            }
            catch{}
            finally{}
  
                    let chart = new CanvasJS.Chart("chartAHP_Critical", {
                      theme: "light2",
                      animationEnabled: true,
                      exportEnabled: false,
                      title: {
                        text: "Critical AHP Data Consolidated",
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
                          { label: "2014-15", y: this.Housesinvolved14_15_C },
                          { label: "2015-16", y: this.Housesinvolved15_16_C},
                          { label: "2016-17", y: this.Housesinvolved16_17_C },
                          { label: "2017-18", y: this.Housesinvolved17_18_C },  
                          { label: "2018-19", y: this.Housesinvolved18_19_C },
                          { label: "2019-20", y: this.Housesinvolved19_20_C } 
                        ]
                      },
                      {
                        type: "column",
                        dockInsidePlotArea: true,
                         indexLabel: "{y}", //HG
                        bevelEnabled: true,
                        showInLegend: true,
                        legendText: "1st Inst yet to be released",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          { label: "2014-15", y: this.IstInst14_15_C },
                          { label: "2015-16", y: this.IstInst15_16_C },
                          { label: "2016-17", y: this.IstInst16_17_C },
                          { label: "2017-18", y: this.IstInst17_18_C },  
                          { label: "2018-19", y: this.IstInst18_19_C },
                          { label: "2019-20", y: this.IstInst19_20_C } 
                        ]
                      },
  
                      {
                        type: "column",
                        dockInsidePlotArea: true,
                         indexLabel: "{y}", //HG
                        bevelEnabled: true,
                        showInLegend: true,
                        legendText: "2nd Inst yet to be released",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          { label: "2014-15", y: this.IInd14_15_C },
                          { label: "2015-16", y: this.IInd15_16_C },
                          { label: "2016-17", y: this.IInd16_17_C },
                          { label: "2017-18", y: this.IInd17_18_C },  
                          { label: "2018-19", y: this.IInd18_19_C },
                          { label: "2019-20", y: this.IInd19_20_C } 
                        ]
                      },
  
                      {
                        type: "column",
                        dockInsidePlotArea: true,
                         indexLabel: "{y}", //HG
                        bevelEnabled: true,
                        showInLegend: true,
                        legendText: "3rd Inst yet to be released",
                         stValue: "Q",
                        indexLabelFontSize: 12,
                        indexLabelOrientation: "vertical",
                        dataPoints: [
                          { label: "2014-15", y: this.Third14_15_C },
                          { label: "2015-16", y: this.Third15_16_C },
                          { label: "2016-17", y: this.Third16_17_C },
                          { label: "2017-18", y: this.Third17_18_C },  
                          { label: "2018-19", y: this.Third18_19_C },
                          { label: "2019-20", y: this.Third19_20_C } 
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
                          { label: "2014-15", y: this.Grounded14_15_C },
                          { label: "2015-16", y: this.Grounded15_16_C },
                          { label: "2016-17", y: this.Grounded16_17_C },
                          { label: "2017-18", y: this.Grounded17_18_C },  
                          { label: "2018-19", y: this.Grounded18_19_C },
                          { label: "2019-20", y: this.Grounded19_20_C } 
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
                          { label: "2014-15", y: this.Completed14_15_C },
                          { label: "2015-16", y: this.Completed15_16_C },
                          { label: "2016-17", y: this.Completed16_17_C },
                          { label: "2017-18", y: this.Completed17_18_C },  
                          { label: "2018-19", y: this.Completed18_19_C },
                          { label: "2019-20", y: this.Completed19_20_C } 
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

     

    BindBLCS_Critical_Data(stateCode, DisttCode, cityCode,Comp,Fin_Year)
     {
     //  FinYear	Housesinvolved	Istinstyettobereleased	IIndinstyettobereleased	ThirdInstyettobereleased	GroundedbutyettobeCompleted	CompletedbutyettobeOccupied
 
       // this.Fin_Year =Fin_Year;
       // alert(Fin_Year);
       Comp ="BLCS";
         this.service.sp_create_PMAY_Critical_BLC_DATA(stateCode, DisttCode, cityCode,Comp,"0").subscribe(result => { // new code
           // if (result.length >0)
           // {
           //   alert('PM');
           // }
         ///first row data
       //  this.Fin_Year14_15 = result[0].FinYear;
       try {
         this.Housesinvolved14_15_C = result[0].Housesinvolved;
         this.IstInst14_15_C = result[0].Istinstyettobereleased;
         this.IInd14_15_C = result[0].IIndinstyettobereleased;
         this.Third14_15_C = result[0].ThirdInstyettobereleased;
         this.Grounded14_15_C = result[0].GroundedbutyettobeCompleted;
         this.Completed14_15_C = result[0].CompletedbutyettobeOccupied ;
       }
       catch{}
       finally{}
       
   // alert(this\.Housesinvolved14_15_C);
         //second row data
         //this.Fin_Year15_16 = result[1].FinYear;
         try {
   
         this.Housesinvolved15_16_C= result[1].Housesinvolved;
         this.IstInst15_16_C = result[1].Istinstyettobereleased;
         this.IInd15_16_C = result[1].IIndinstyettobereleased;
         this.Third15_16_C = result[1].ThirdInstyettobereleased;
         this.Grounded15_16_C = result[1].GroundedbutyettobeCompleted;
         this.Completed15_16_C = result[1].CompletedbutyettobeOccupied ;
       }
       catch{}
       finally{}
        //Third row data
         try {
           //this.Fin_Year16_17 = result[2].FinYear;
           this.Housesinvolved16_17_C = result[2].Housesinvolved;
         
           this.IstInst16_17_C = result[2].Istinstyettobereleased;
           this.IInd16_17_C = result[2].IIndinstyettobereleased;
           this.Third16_17_C = result[2].ThirdInstyettobereleased;
           this.Grounded16_17_C = result[2].GroundedbutyettobeCompleted;
           this.Completed16_17_C = result[2].CompletedbutyettobeOccupied ;
         }
         catch{}
         finally{}
         //Fourth row data
         //this.Fin_Year17_18 = result[3].FinYear;
         try {
   
         this.Housesinvolved17_18_C = result[3].Housesinvolved;
   
           this.IstInst17_18_C = result[3].Istinstyettobereleased;
           this.IInd17_18_C = result[3].IIndinstyettobereleased;
           this.Third17_18_C = result[3].ThirdInstyettobereleased;
           this.Grounded17_18_C= result[3].GroundedbutyettobeCompleted;
           this.Completed17_18_C = result[3].CompletedbutyettobeOccupied ;
         }
         catch{}
         finally{}
   
         //Fifth row data
         //this.Fin_Year18_19 = result[4].FinYear;
         try {
         this.Housesinvolved18_19_C = result[4].Housesinvolved;
           this.IstInst18_19_C = result[4].Istinstyettobereleased;
           this.IInd18_19_C = result[4].IIndinstyettobereleased;
           this.Third18_19_C = result[4].ThirdInstyettobereleased;
           this.Grounded18_19_C = result[4].GroundedbutyettobeCompleted;
           this.Completed18_19_C = result[4].CompletedbutyettobeOccupied ;
         }
         catch{}
         finally{}
   
   
               //Sixth row data
             //  this.Fin_Year19_20 = result[5].FinYear;
             try {      
             
               this.Housesinvolved19_20_C = result[5].Housesinvolved;
               this.IstInst19_20_C = result[5].Istinstyettobereleased;
               this.IInd19_20_C = result[5].IIndinstyettobereleased;
               this.Third19_20_C = result[5].ThirdInstyettobereleased;
               this.Grounded19_20_C = result[5].GroundedbutyettobeCompleted;
               this.Completed19_20_C = result[5].CompletedbutyettobeOccupied ;
             }
             catch{}
             finally{}
   
                     let chart = new CanvasJS.Chart("chartBLCS_Critical", {
                       theme: "light2",
                       animationEnabled: true,
                       exportEnabled: false,
                       title: {
                         text: "Critical BLC Data Consolidated",
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
                           { label: "2014-15", y: this.Housesinvolved14_15_C },
                           { label: "2015-16", y: this.Housesinvolved15_16_C},
                           { label: "2016-17", y: this.Housesinvolved16_17_C },
                           { label: "2017-18", y: this.Housesinvolved17_18_C },  
                           { label: "2018-19", y: this.Housesinvolved18_19_C },
                           { label: "2019-20", y: this.Housesinvolved19_20_C } 
                         ]
                       },
                       {
                         type: "column",
                         dockInsidePlotArea: true,
                          indexLabel: "{y}", //HG
                         bevelEnabled: true,
                         showInLegend: true,
                         legendText: "1st Inst yet to be released",
                          stValue: "Q",
                         indexLabelFontSize: 12,
                         indexLabelOrientation: "vertical",
                         dataPoints: [
                           { label: "2014-15", y: this.IstInst14_15_C },
                           { label: "2015-16", y: this.IstInst15_16_C },
                           { label: "2016-17", y: this.IstInst16_17_C },
                           { label: "2017-18", y: this.IstInst17_18_C },  
                           { label: "2018-19", y: this.IstInst18_19_C },
                           { label: "2019-20", y: this.IstInst19_20_C } 
                         ]
                       },
   
                       {
                         type: "column",
                         dockInsidePlotArea: true,
                          indexLabel: "{y}", //HG
                         bevelEnabled: true,
                         showInLegend: true,
                         legendText: "2nd Inst yet to be released",
                          stValue: "Q",
                         indexLabelFontSize: 12,
                         indexLabelOrientation: "vertical",
                         dataPoints: [
                           { label: "2014-15", y: this.IInd14_15_C },
                           { label: "2015-16", y: this.IInd15_16_C },
                           { label: "2016-17", y: this.IInd16_17_C },
                           { label: "2017-18", y: this.IInd17_18_C },  
                           { label: "2018-19", y: this.IInd18_19_C },
                           { label: "2019-20", y: this.IInd19_20_C } 
                         ]
                       },
   
                       {
                         type: "column",
                         dockInsidePlotArea: true,
                          indexLabel: "{y}", //HG
                         bevelEnabled: true,
                         showInLegend: true,
                         legendText: "3rd Inst yet to be released",
                          stValue: "Q",
                         indexLabelFontSize: 12,
                         indexLabelOrientation: "vertical",
                         dataPoints: [
                           { label: "2014-15", y: this.Third14_15_C },
                           { label: "2015-16", y: this.Third15_16_C },
                           { label: "2016-17", y: this.Third16_17_C },
                           { label: "2017-18", y: this.Third17_18_C },  
                           { label: "2018-19", y: this.Third18_19_C },
                           { label: "2019-20", y: this.Third19_20_C } 
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
                           { label: "2014-15", y: this.Grounded14_15_C },
                           { label: "2015-16", y: this.Grounded15_16_C },
                           { label: "2016-17", y: this.Grounded16_17_C },
                           { label: "2017-18", y: this.Grounded17_18_C },  
                           { label: "2018-19", y: this.Grounded18_19_C },
                           { label: "2019-20", y: this.Grounded19_20_C } 
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
                           { label: "2014-15", y: this.Completed14_15_C },
                           { label: "2015-16", y: this.Completed15_16_C },
                           { label: "2016-17", y: this.Completed16_17_C },
                           { label: "2017-18", y: this.Completed17_18_C },  
                           { label: "2018-19", y: this.Completed18_19_C },
                           { label: "2019-20", y: this.Completed19_20_C } 
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
