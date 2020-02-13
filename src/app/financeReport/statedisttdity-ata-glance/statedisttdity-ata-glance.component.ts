import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, TemplateRef, Renderer2, ElementRef } from '@angular/core';
import * as CanvasJS from 'src/assets/canvasjs.min.js';
import { States, District, City, Charts, CompMaster, PMAY_DATA_New, StateDisttCityAtaGlance } from 'src/app/financeReport/model/chart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { lstatSync } from 'fs';
import { Alert } from 'selenium-webdriver';
import { stringify } from 'querystring';
import { formatDate } from '@angular/common';
import { EventEmitter, Input, Output } from '@angular/core';
import { GlobalEvent } from 'src/app/Shared/global-event';
import { PMAY_DATA } from 'src/app/financeReport/model/chart.model';
import { find } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { Ellipse } from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-statedisttdity-ata-glance',
  templateUrl: './statedisttdity-ata-glance.component.html',
  styleUrls: ['./statedisttdity-ata-glance.component.css']
})
export class StatedisttdityAtaGlanceComponent implements OnInit {
  modalRef;
  display = 'none';
  display1 = 'none';
  Codes: string;
  StateDetails: States[];
  State: string;

  DisttDetails: Observable<District[]>;
  CityDetails: City[];
  stateCodes: string = "0";
  districtCodes: string = "0";
  cityCodes: string = "0";
  DivisionCodes = "0";
  chkValue = "";
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
  DisabledCheckBox: boolean;
  StateShareS: number;
  BeneficiaryShareS: number;
  CentralShareS: number;
  Division: string;
  lstYear: string[] = [];
  selectedYears: any;
  lstDivision: string[] = [];
  lstChkValues: string[] = [];
  lstCmp: string[] = [];
  selectedComp: any;
  jstoday = '';
  selectedColor = '';
  lstCriticalData: StateDisttCityAtaGlance[];
  lstCritical: StateDisttCityAtaGlance[];
  isLoading:boolean=true;
  GroupedData: any;
  finyear: string[];
  public blnShowTable_C: boolean;
  public ReleasedFundsCol: number;
  //  GroupedData:any;
  IstInst: string;
  isDisplayHouse: boolean = true;
  isFirst: boolean = true;
  isSecond: boolean = true;
  isThird: boolean = true;
  isGrounded: boolean = true;
  isCompleted: boolean = true;
  DisplayHouse: string = 'block';
  isDist: boolean = true;
  isCity: boolean = true;
  isCOmponent: boolean = true;
  valueComp: string;
  //lstCriticalData:PMAY_DATA_New[];
  grnd: string;
  Compl: string;
  IIInst: string;
  IInd: string;
  AllStatus:boolean=false;


  public backgroundColor: string;
  LstPayData_C: PMAY_DATA[];
  LstPayData1_C: PMAY_DATA_New[];
  LstPayDataISSR_C: PMAY_DATA_New[];
  LstPayDataAHP_C: PMAY_DATA_New[];
  LstPayDataBLC_C: PMAY_DATA_New[];
  DisplayTable_C: string;
  DisplyaGraph_C: string;
  // public static valueDemo;
  // public blnShowTable_C :boolean;
  // public ReleasedFundsCol: number;
  distStatus: string = "none";
  cityStaus: string = "none";
  componentStaus: string = "none";
  msg: string;
  islabel: string = "none";

  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  title = 'Excel';
  IsLoading: string;
  lblStateDisttCity: string;
  chk_Value:boolean =false;

  constructor(private router: Router, private gevent: GlobalEvent, public service: GraphService, private modalService: NgbModal) {
    this.StateMessage = "Select State";
    this.DistrictMessage = "Select District";
    this.CityMessage = "Select City";
    this.stValue = "0";
    this.distValue = "0";
    this.cityValue = "0";

    setInterval(() => {
      this.jstoday = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    }, 1000);


    this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
      //  this.Houses_Grounded_C = result.Houses_Grounded;
    });
    this.service.CLSSCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
      // this.SubsidyAmountCredited_C = result.SubsidyAmountCredited;
    });
    this.service.JNNURMCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
      // this.SubsidyAmountCredited = result.SubsidyAmountCredited;
    });
    this.service.DemandCityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes).subscribe(result => {
      // this.SubsidyAmountCredited = result.SubsidyAmountCredited;
    });

    this.service.GetStateWiseFinYrData(this.stateCodes).subscribe(result_State => {
    });

    this.service.sp_create_PMAY_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes, "0", "0").subscribe(resultCritical => {
      //this.Fin_Year14_15_C = resultCritical[0].FinYear;
    });

    this.service.sp_create_PMAY_Critical_FinYearWiseDATA(this.stateCodes, this.districtCodes, this.cityCodes, "0").subscribe(result_PMU => {
    });

    this.service.sp_create_ISSR_Graph_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes, "ISSR", "0").subscribe(result_ISSR => { // new code
      //  =result_ISSR[0].FinYear;
    });

    this.service.sp_create_AHP_Graph_Critical_DATA(this.stateCodes, this.districtCodes, this.cityCodes, "AHP", "0").subscribe(result_ISSR => { // new code
      //  =result_ISSR[0].FinYear;
    });


    this.service.sp_create_PMAY_Critical_BLC_DATA(this.stateCodes, this.districtCodes, this.cityCodes, 'BLCS', "0").subscribe(result => { // new cod
    });

    this.stateCodes = "28";
    this.districtCodes = "ALL";
    this.cityCodes = "ALL";
    this.Division = "0";
    this.Comp = "ALL";
  }

  pdfReport() {
    window.print();
  }

  ngOnInit() {
    this.gevent.ColorObservable.subscribe(x => {
      console.log('color:' + x);
    });

    this.backgroundColor = "#ffffff";
    this.stateCodes = "0";
    this.districtCodes = "0";
    this.cityCodes = "0";
    this.cid = 0;
    this.Comp = "0";
    this.Division = "0";
    this.DivisionCodes = "0";
    this.State = "--Select--";
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
    this.DisplayTable_C = "block";
    // Grid  data  below
    this.stateCodes = "0";
    this.districtCodes = "ALL";
    this.cityCodes = "ALL";
    this.Division = "0";
    this.Comp = "ALL";
    this.islabel = "block";
    //  this.service.GetFinancialYear().subscribe(result=>{
    //   this.finyear= result;
    //  }   )
  }

  handleBLCtable(event) {

    const valueComp = event.target.value;
    if (valueComp == "BLC" && this.valueComp === "state") {
      this.msg = "Working";
      this.distStatus = "none";
      this.cityStaus = "none";
      this.componentStaus = "none";
      this.stateCodes = "0";
      this.districtCodes = "0";
      this.cityCodes = "0";
      this.Division = "0";
      this.Comp = "1";//1
      this.isCOmponent = true;
      this.isCity = false;
      this.isDist = false;
      this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
        this.lstCriticalData = result_Fin14;
      })
      this.msg = "";
    }
  }



  handleALLtable(event) {
   // debugger;
//  if (his.chk_Value == true)
//  {   
//    this.handleALLtable_All(event);
//  }
   //--------------------------------------------------
   const HFAName=event.target.value;
    const checked=event.target.checked;
    this.AllStatus=false;
    let textValue='';

    if (checked) {
      //this.StateDetails=[];
      this.lstChkValues.push(HFAName);
      this.chkValue = this.lstChkValues.toString();
    }
    else {
      let index = this.lstChkValues.findIndex(a => a == HFAName);
      this.lstChkValues.splice(index, 1);
      this.chkValue = this.lstChkValues.toString();
    }   
   // alert(this.chkValue);  
   
    this.lstCriticalData=[];
    let v=null;
   
    this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
        this.lstChkValues.forEach(b=>{
          v = result_Fin14.filter(a=>a.Component==b);
          Array.prototype.push.apply(this.lstCriticalData,  v);
          this.lstCriticalData.sort(function(a, b) {
            var nameA = a.State.toUpperCase(); // ignore upper and lowercase
            var nameB = b.State.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });
      });
     
    });  
   return;
    //----------------------------------------------

    if (HFAName == 'BLCS') {
      this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
       const value = result_Fin14.filter(a=>a.Component=='BLCS');
       if(value.length > 0)
       {
            this.lstCriticalData=value;
            this.isLoading=false;
       }
       else{
         this.IsLoading="waiting";
         this.isLoading=true;
       }
      });
    }
    else if(HFAName == 'RAY') {
      this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
        this.lstCriticalData = result_Fin14.filter(a=>a.Component=='BLCS' || a.Component=='RAY');
      });
    }

    else if(HFAName == 'ISSR') {
      this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
        this.lstCriticalData = result_Fin14.filter(a=>a.Component=='BLCS' || a.Component=='RAY' || a.Component=='ISSR');
      });
    }
    else if(HFAName == 'CLSS') {
      this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
        this.lstCriticalData = result_Fin14.filter(a=>a.Component=='BLCS' || a.Component=='RAY' || a.Component=='ISSR' || a.Component=='CLSS');
      });
    }
    else if(HFAName == 'JNN') {
      this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
        this.lstCriticalData = result_Fin14.filter(a=>a.Component=='BLCS' || a.Component=='RAY' || a.Component=='ISSR' || a.Component=='CLSS' || a.Component=='JNN');
      });
    }
    

    this.service.GetStateByDIvision(this.lstDivision.toString());
    this.service.ChartDivByDiv(this.lstDivision.toString()).subscribe(result => {
    });


    


  }


  handleALLtable_All(event) {  // ALL Component CheckBox with state - distt - city 
    this.islabel = "none";
    const valueComp = event.target.value;
    this.chk_Value = true; 
    if ( this.valueComp === "state") {
     // alert(22);
      this.distStatus = "none";
      this.cityStaus = "none";
      this.componentStaus = "none";
      this.stateCodes = "0";
      this.districtCodes = "0";
      this.cityCodes = "0";
      this.Division = "0";
      this.Comp = "1";//1
      this.isCOmponent = true;

      this.isCity = false;
      this.isDist = false;
      this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
        this.lstCriticalData = result_Fin14;
      })
      this.islabel = "block";
    }
    else {
      if ( this.valueComp === "distt") {
        this.distStatus = "none";
        this.cityStaus = "block";
        this.componentStaus = "none";//
        this.stateCodes = this.stateCodes;
        this.districtCodes = "0";
        this.cityCodes = "0";
        this.Division = "0";
        this.Comp = "4";
        this.isCity = false;
        this.isDist = true;
        this.isCOmponent = true;


        this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
          this.lstCriticalData = result_Fin14;
        })
        return;
      }
      else ( this.valueComp === "city")
      {
        //alert("all");
        this.lblStateDisttCity = "All India";
        this.distStatus = "none";
        this.cityStaus = "none";
        this.componentStaus = "none";
        this.stateCodes = "ALL";
        this.districtCodes = "ALL";
        this.cityCodes = "ALL";
        this.Division = "0";
        this.Comp = "3";
        this.isCity = true;
        this.isDist = true;
        this.isCOmponent = true;


        this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
          this.lstCriticalData = result_Fin14;
        })
        return;
      }
    }
  }
    
    handleALLtableAll(event) {  // ALL Component CheckBox with state - distt - city 
    this.islabel = "none";
    const valueComp = event.target.value;

    if (valueComp == "ALL" && this.valueComp === "state") {
     // alert(22);
      this.distStatus = "none";
      this.cityStaus = "none";
      this.componentStaus = "none";
      this.stateCodes = "0";
      this.districtCodes = "0";
      this.cityCodes = "0";
      this.Division = "0";
      this.Comp = "1";//1
      this.isCOmponent = true;

      this.isCity = false;
      this.isDist = false;
      this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
        this.lstCriticalData = result_Fin14;
      })
      this.islabel = "block";
    }
    else {
      if (valueComp == "ALL" && this.valueComp === "distt") {
        this.distStatus = "none";
        this.cityStaus = "block";
        this.componentStaus = "none";//
        this.stateCodes = this.stateCodes;
        this.districtCodes = "0";
        this.cityCodes = "0";
        this.Division = "0";
        this.Comp = "4";
        this.isCity = false;
        this.isDist = true;
        this.isCOmponent = true;


        this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
          this.lstCriticalData = result_Fin14;
        })
        return;
      }
      else (valueComp == "ALL" && this.valueComp === "city")
      {
        //alert("all");
        this.lblStateDisttCity = "All India";
        this.distStatus = "none";
        this.cityStaus = "none";
        this.componentStaus = "none";
        this.stateCodes = "ALL";
        this.districtCodes = "ALL";
        this.cityCodes = "ALL";
        this.Division = "0";
        this.Comp = "3";
        this.isCity = true;
        this.isDist = true;
        this.isCOmponent = true;


        this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
          this.lstCriticalData = result_Fin14;
        })
        return;
      }
    }
  }

  // this works with state dropdown and Check box state-distt-city - no comp
  disttwise(event) {
   // alert('test');
    const valueDemo = event.target.value;
    this.valueComp = valueDemo;
    if (this.stateCodes != "ALL") {
     // alert('test1');
      if (this.stateCodes != "0" && valueDemo == "state") {
       // alert('test2');
        this.distStatus = "none";
        this.cityStaus = "none";
        this.componentStaus = "none";
        this.stateCodes = this.stateCodes;
        this.districtCodes = "0";
        this.cityCodes = "0";
        this.Division = "0";
        this.Comp = "5";//1
        this.isCOmponent = false;
        this.isCity = false;
        this.isDist = false;
        this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
          this.lstCriticalData = result_Fin14;
        })
        return;
      }
      else if ((this.stateCodes != "0" && this.stateCodes != "ALL") && valueDemo == "distt") {
       // alert(11);
        this.stateCodes = this.stateCodes;
        this.districtCodes = "0";
        this.cityCodes = "0";
        this.Division = "0";
        this.Comp = "0";
        this.distStatus = "block";
        this.cityStaus = "none";
        this.componentStaus = "none";
        this.isCity = false;
        this.isDist = true;
        this.isCOmponent = false;
        this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
          this.lstCriticalData = result_Fin14;
        })
        return;
      }
      else if (this.stateCodes != "0" && valueDemo == "city") {
       // alert(12);
        this.stateCodes = this.stateCodes;
        this.districtCodes = "ALL";
        this.cityCodes = "ALL";
        this.Division = "ALL";
        this.Comp = "6";
        this.distStatus = "block";
        this.cityStaus = "block";
        this.componentStaus = "none";
        this.isCity = true;
        this.isDist = true;
        this.isCOmponent = false;
        this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
          this.lstCriticalData = result_Fin14;
        })
        return;
      }
    }

    if (valueDemo == "state") {
      //alert('state');
      this.distStatus = "none";
      this.cityStaus = "none";
      this.componentStaus = "none";
      this.stateCodes = "ALL";
      this.districtCodes = "0";
      this.cityCodes = "0";
      this.Division = "0";
      this.Comp = "0";//1
      this.isCity = false;
      this.isDist = false;
      this.isCOmponent = false;

      this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
        this.lstCriticalData = result_Fin14;
      })
      return;
    }
    else if (valueDemo == "distt") {
      //alert('distt');
      this.stateCodes = "ALL";
      this.districtCodes = "ALL";
      this.cityCodes = "0";
      this.Division = "0";
      this.Comp = "0";
      this.distStatus = "block";
      this.cityStaus = "none";
      this.isCity = false;
      this.isDist = true;
      this.isCOmponent = false;
    }
    else { //<<<<<<<<<<<<<<< City>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
      //alert('citywise');
      this.stateCodes = "ALL";
      this.districtCodes = "ALL";
      this.cityCodes = "ALL";
      this.Division = "0";
      this.Comp = "2";
      this.distStatus = "block";
      this.cityStaus = "block";
      this.isCity = true;
      this.isDist = true;
      this.isCOmponent = false;
    }
    this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
      this.lstCriticalData = result_Fin14;
    })
    return;
  }

  getStateDetails(stateCodes) {
    // Only State selection 
    //StatedisttdityAtaGlanceComponent.name['selectType'].reset();
   // alert('Only State ');
    if (this.stateCodes != "0") {
      this.distStatus = "none";
      this.cityStaus = "none";
      this.componentStaus = "none";
      this.stateCodes = this.stateCodes;
      this.districtCodes = "0";
      this.cityCodes = "0";
      this.Division = "0";
      this.Comp = "5";//1
      this.isCOmponent = false;
      this.isCity = false;
      this.isDist = false;

      this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
        this.lstCriticalData = result_Fin14;
      })
    }
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // wb.Props.Title="Hello";
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'AtaGlance.xlsx');
  }
}
