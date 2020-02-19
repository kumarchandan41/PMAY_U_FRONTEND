 
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
  selector: 'app-statedisttcity-report',
  templateUrl: './statedisttcity-report.component.html',
  styleUrls: ['./statedisttcity-report.component.css']
})

export class StatedisttcityReportComponent implements OnInit {
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
  lstCriticalData1: StateDisttCityAtaGlance[];
  
  lstCritical: StateDisttCityAtaGlance[];
  isLoading:boolean=true;
  loader:string="";
  GroupedData: any;
  finyear: string[];

  showhide:boolean=true;
  public blnShowTable_C: boolean;
  public ReleasedFundsCol: number;
  IstInst: string;
  isDisplayHouse: boolean = true;
  isFirst: boolean = true;
  isSecond: boolean = true;
  isThird: boolean = true;
  isGrounded: boolean = true;
  isCompleted: boolean = true;
  DisplayHouse: string = 'block';

  AllState: boolean = true;
  isDist: boolean = true;
  isCity: boolean = true;
  isCOmponent: boolean = true;
  valueComp: string;
  grnd: string;
  pageNumber:number =1;
  skip:number=0;
  Compl: string;
  IIInst: string;
  IInd: string;
  allstatus:boolean=false;
  AllDistt:boolean=false;
  AllCity:boolean=false;
  SingleStatus2:boolean=false;
  SingleStatus3:boolean=false;
  SingleStatus4:boolean=false;
  SingleStatus5:boolean=false;
  SingleStatus6:boolean=false;
  loading: boolean = false;
  

  public backgroundColor: string;
  LstPayData_C: PMAY_DATA[];
  LstPayData1_C: PMAY_DATA_New[];
  LstPayDataISSR_C: PMAY_DATA_New[];
  LstPayDataAHP_C: PMAY_DATA_New[];
  LstPayDataBLC_C: PMAY_DATA_New[];
  DisplayTable_C: string;
  DisplyaGraph_C: string;
  distStatus: string = "none";
  cityStaus: string = "none";
  componentStaus: string = "none";
  msg: string;
  islabel: string = "none";
  rdStatus:boolean=true;

  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  @ViewChild('tblExcel', { static: false }) TblExcel: ElementRef;
  
  title = 'Excel';
  lblStateDisttCity: string;
  chk_Value:boolean =false;
  CompMultiple: string;
  SingleStatus1:boolean=false;
  blnChkStateSelection : boolean =false;
   selected1: boolean =false;
  selected2: boolean  =false; 
  selected3: boolean   =false; 
  selected4: boolean  =false; 
  selected6: boolean  =false; 
  selected5: boolean  =false; 
  rowLenth:number=0;
  chkEnebled:boolean=true;
  valueDemoStateDistt: string;
  displaytable: string;

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

  }
  pdfReport() {
    window.print();
  }

  ngOnInit() {
   // alert();

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
    this.displaytable = 'none';

    this.selected1 =false;
    this.selected2 =false;
    this.selected3 =false;
    this.selected4 =false;
    this.selected5 =false;
    this.selected6 =false;


    this.allstatus =false;
  }

  handleBLCtable(event) {
    const valueComp = event.target.value;
    if (valueComp == "BLC" && this.valueComp === "state") {
     // this.msg = "Working";
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
      this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp,this.pageNumber,this.skip).subscribe(result_Fin14 => {
        this.loading=true;
        this.lstCriticalData = result_Fin14;
        this.rowLenth=result_Fin14.length;
      })
      this.islabel = "block";
      this.msg = "";
      this.service.Get_StateDisttCityAtaGlance_(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin14 => {
        this.lstCriticalData1 = result_Fin14;
      })     
    }
  }
  
  handleALLtable(event) {
    // debugger;
    this.loader = "";
    this.displaytable = 'block';
    this.lstCriticalData = [];
    
 
    //----------------------------------------
    //this.allstatus = false;
    // this.SingleStatus1 = false;
    // this.SingleStatus2 = false;
    // this.SingleStatus3 = false;
    // this.SingleStatus4 = false;
    // this.SingleStatus5 = false;
    // this.SingleStatus6 = false;


    const HFAName = event.target.value;
    const checked = event.target.checked;
    let textValue = '';

    if (checked) {
      this.lstChkValues.push(HFAName);
      this.chkValue = this.lstChkValues.toString();
    }
    else {
      let index = this.lstChkValues.findIndex(a => a == HFAName);
      this.lstChkValues.splice(index, 1);
      this.chkValue = this.lstChkValues.toString();
    }
    // alert(this.chkValue);  

    this.lstCriticalData = [];
    let v = null;

    const valueComp = event.target.value;
    if (this.valueComp === "state") //this.stateCodes !="0"
    {
      this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp, this.pageNumber, this.skip).subscribe(result_Fin14 => {
        this.lstChkValues.forEach(b => {
          v = result_Fin14.filter(a => a.Component == b);
          Array.prototype.push.apply(this.lstCriticalData, v);
        });
      });
      this.lstCriticalData.sort(function (a, b) {
        var nameA = a.Distt.toUpperCase(); // ignore upper and lowercase
        var nameB = b.Distt.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;

      });
    }
    else {
      this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp, this.pageNumber, this.skip).subscribe(result_Fin14 => {
        this.lstChkValues.forEach(b => {
          v = result_Fin14.filter(a => a.Component == b);
          Array.prototype.push.apply(this.lstCriticalData, v);

          this.lstCriticalData.sort(function (a, b) {
            var nameA = a.Distt.toUpperCase(); // ignore upper and lowercase
            var nameB = b.Distt.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          });
        });
        // names must be equal
        return 0;
      });
    }
    this.islabel = "block";
    return;
  }


    handleALLtableAll(event) {  // ALL Component CheckBox with state - distt - city
      this.lstChkValues=[];
      this.chkEnebled=false;

      if (this.allstatus ==false )
      {
          this.chkEnebled =true;
      }
       
        this.islabel = "none";
        const valueComp = event.target.value;
        if (this.blnChkStateSelection == true )
        {
          if (valueComp == "ALL" && this.valueComp === "state") {

            debugger;
              this.distStatus = "none";
              this.cityStaus = "none";
              this.componentStaus = "none";
              this.stateCodes = this.stateCodes;
              this.districtCodes = "ALL";
              this.cityCodes = "ALL";
              this.Division = "0";
              this.Comp = "7"; 
              this.isCOmponent = true;

              this.isCity = false;
              this.isDist = false;
              this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp,this.pageNumber,this.skip).subscribe(result_Fin14 => {
                this.lstCriticalData = result_Fin14;
                this.rowLenth=result_Fin14.length;

                this.lstCriticalData.sort(function(a, b) {
                  var nameA = a.Dcode.toUpperCase(); 
                  var nameB = b.Dcode.toUpperCase();
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
               });

               
               this.islabel = "block";
              })
  
              
          
              return; 
          }
          else  if (valueComp == "ALL" && this.valueComp === "distt") {
            this.distStatus = "none";
            this.cityStaus = "block";
            this.componentStaus = "none";//
            this.stateCodes =  this.stateCodes;
            this.districtCodes = "ALL";
            this.cityCodes = "ALL";
            this.Division = "0";
            this.Comp = "8"; //4
            this.isCity = false;
            this.isDist = true;
            this.isCOmponent = true;
            this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, "8",this.pageNumber,this.skip).subscribe(result_Fin14 => {
                 this.lstCriticalData = result_Fin14;
                 this.rowLenth=result_Fin14.length;
                 
              this.lstCriticalData.sort(function(a, b) {
                var nameA = a.Dcode.toUpperCase(); 
                var nameB = b.Dcode.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
             });
             this.islabel = "block";
            })


            this.islabel = "block"; 
            
             
        
            return;
        }
        else (valueComp == "ALL" && this.valueComp === "city")
          {
           // alert("all CITY1");
            this.lblStateDisttCity = "All India";
            this.distStatus = "none";
            this.cityStaus = "none";
            this.componentStaus = "none";
            this.stateCodes = this.stateCodes; 
            this.districtCodes = "ALL";
            this.cityCodes = "ALL";
            this.Division = "0";
            this.Comp = "9";
            this.isCity = true;
            this.isDist = true;
            this.isCOmponent = true;
            this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp,this.pageNumber,this.skip).subscribe(result_Fin14 => {
              this.lstCriticalData = result_Fin14;
              this.rowLenth=result_Fin14.length;
            
              this.lstCriticalData.sort(function(a, b) {
                var nameA = a.Dcode.toUpperCase(); 
                var nameB = b.Dcode.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
             });
             this.islabel = "block";
            })

          
            this.islabel = "block";
          }
          return;
        }
        else 
        {
        if (valueComp == "ALL" && this.valueComp === "state") {
           //  alert("all_state");
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
              this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp,this.pageNumber,this.skip).subscribe(result_Fin14 => {
                this.lstCriticalData = result_Fin14;
                this.rowLenth=result_Fin14.length;

                this.lstCriticalData.sort(function(a, b) {
                  var nameA = a.Dcode.toUpperCase(); 
                  var nameB = b.Dcode.toUpperCase();
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
               });
               
              })


              this.service.Get_StateDisttCityAtaGlance_(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin141 => {
                this.lstCriticalData1 = result_Fin141;
              })
              this.islabel = "block";
        }
        else  if (valueComp == "ALL" && this.valueComp === "distt") {
            this.distStatus = "none";
            this.cityStaus = "block";
            this.componentStaus = "none";//
            this.stateCodes = "ALL";//this.stateCodes;
            this.districtCodes = "ALL";
            this.cityCodes = "0";
            this.Division = "0";
            this.Comp = "1"; //4
            this.isCity = false;
            this.isDist = true;
            this.isCOmponent = true;

            this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp,this.pageNumber,this.skip).subscribe(result_Fin14 => {
              this.lstCriticalData = result_Fin14;
              this.rowLenth=result_Fin14.length;

              this.lstCriticalData.sort(function(a, b) {
                var nameA = a.Dcode.toUpperCase(); 
                var nameB = b.Dcode.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
             });
             
            })
            this.service.Get_StateDisttCityAtaGlance_(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin141 => {
              this.lstCriticalData1 = result_Fin141;
            })
            this.islabel = "block";
            return;
          }
          else if (valueComp == "ALL" && this.valueComp === "city")
          {
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


            this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp,this.pageNumber,this.skip).subscribe(result_Fin14 => {
              this.lstCriticalData = result_Fin14;
              this.rowLenth=result_Fin14.length;
            })
            this.islabel = "block";
            return;
          }


        }
   }

   disttwise(event) {
    this.displaytable = 'none';
   this.allstatus= false;
      this.chkEnebled=true;
      this.SingleStatus1 =false;
      this.SingleStatus2 =false;
      this.SingleStatus3 =false;
      this.SingleStatus4 =false;
      this.SingleStatus5 =false;
      this.SingleStatus6 =false;


      // this.selected1 =false;
      // this.selected2 =false;
      // this.selected3 =false;
      // this.selected4 =false;
      // this.selected5 =false;
      // this.selected6 =false;

      this.pageNumber =1;
      this.rowLenth =0;
      this.chkEnebled=true;
   this.valueDemoStateDistt =event.target.value;
   const valueDemo = event.target.value;
    this.valueComp = valueDemo;
//--------------------------------------------------
this.loader=" Working...";
if (this.stateCodes != "0" && this.valueDemoStateDistt== "distt")  
 {
   this.distStatus = "none";
   this.cityStaus = "block";
   this.componentStaus = "none";//
   this.stateCodes =  this.stateCodes;
   this.districtCodes = "ALL";
   this.cityCodes = "ALL";
   this.Division = "0";
   this.Comp = "8";  
   this.isCity = false;
   this.isDist = true;
   this.isCOmponent = true;
   this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, "8",this.pageNumber,this.skip).subscribe(result_Fin14 => {
        this.lstCriticalData = result_Fin14;
        this.rowLenth=result_Fin14.length;
       // this.loader="Proceed";
        this.selected1 = false;
        this.selected2 = false;
        this.selected3 = false;
        this.selected4 = false;
        this.selected5 = false;
        this.selected6 = false;
        this.allstatus = false;

     this.lstCriticalData.sort(function(a, b) {
       var nameA = a.Distt.toUpperCase(); 
       var nameB = b.Distt.toUpperCase();
       if (nameA < nameB) {
         return -1;
       }
       if (nameA > nameB) {
         return 1;
       }
    });
    this.islabel = "block";
   })

  //  this.service.Get_StateDisttCityAtaGlance_(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin141 => {
  //   this.lstCriticalData1 = result_Fin141;
  //  })
//  [class.bodyataglance]={display:none};

   return;

   this.islabel = "block"; 
   return;
  }
else  if (this.stateCodes != "0" && this.valueDemoStateDistt== "city")  
 {
 // alert('city');
          this.lblStateDisttCity = "All India";
          this.distStatus = "none";
          this.cityStaus = "none";
          this.componentStaus = "none";
          this.stateCodes = this.stateCodes; 
          this.districtCodes = "ALL";
          this.cityCodes = "ALL";
          this.Division = "0";
          this.Comp = "9";
          this.isCity = true;
          this.isDist = true;
          this.isCOmponent = true;
          this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, "9",this.pageNumber,this.skip).subscribe(result_Fin14 => {
               this.lstCriticalData = result_Fin14;
               this.rowLenth=result_Fin14.length;
               //this.loader="Proceed";

               this.selected1 = false;
               this.selected2 = false;
               this.selected3 = false;
               this.selected4 = false;
               this.selected5 = false;
               this.selected6 = false;
               this.allstatus = false;

            this.lstCriticalData.sort(function(a, b) {
              var nameA = a.Distt.toUpperCase(); 
              var nameB = b.Distt.toUpperCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
           });
           this.islabel = "block";
          })
          // this.service.Get_StateDisttCityAtaGlance_(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, this.Comp).subscribe(result_Fin141 => {
          //   this.lstCriticalData1 = result_Fin141;
          // })
           this.showhide = true ;
          return;
  
          this.islabel = "block"; 
 } 


    
  }

  handleALLtableAllNew(event){
    this.loader="";
   this.displaytable = 'block';
  // alert(this.valueDemoStateDistt);
     if (this.stateCodes != "0" && this.valueDemoStateDistt== "distt")  
      {
      //  alert(1);
        this.distStatus = "none";
        this.cityStaus = "block";
        this.componentStaus = "none";//
        this.stateCodes =  this.stateCodes;
        this.districtCodes = "ALL";
        this.cityCodes = "ALL";
        this.Division = "0";
        this.Comp = "8";  
        this.isCity = false;
        this.isDist = true;
        this.isCOmponent = true;
        this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, "8",this.pageNumber,this.skip).subscribe(result_Fin14 => {
             this.lstCriticalData = result_Fin14;
             this.rowLenth=result_Fin14.length;
         //    this.loader="Proceed";
        //   this.lstCriticalData.sort(function(a, b) {
        //     var nameA = a.Distt.toUpperCase(); 
        //     var nameB = b.Distt.toUpperCase();
        //     if (nameA < nameB) {
        //       return -1;
        //     }
        //     if (nameA > nameB) {
        //       return 1;
        //     }
        //  });
        //  this.islabel = "block";
          })

       // this.showhide =true ;
        this.islabel = "block"; 
        return;
       }
    else  if (this.stateCodes != "0" && this.valueDemoStateDistt== "city")  
      {
   //     alert(2);
               this.lblStateDisttCity = "All India";
               this.distStatus = "none";
               this.cityStaus = "none";
               this.componentStaus = "none";
               this.stateCodes = this.stateCodes; 
               this.districtCodes = "ALL";
               this.cityCodes = "ALL";
               this.Division = "0";
               this.Comp = "9";
               this.isCity = true;
               this.isDist = true;
               this.isCOmponent = true;
               this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, "9",this.pageNumber,this.skip).subscribe(result_Fin14 => {
                    this.lstCriticalData = result_Fin14;
                    this.rowLenth=result_Fin14.length;
                  //  this.loader="Proceed";
                //  this.lstCriticalData.sort(function(a, b) {
                //    var nameA = a.Distt.toUpperCase(); 
                //    var nameB = b.Distt.toUpperCase();
                //    if (nameA < nameB) {
                //      return -1;
                //    }
                //    if (nameA > nameB) {
                //      return 1;
                //    }
                // });
                // this.islabel = "block";
               })
       
              // this.showhide =false ;
               this.islabel = "block"; 
      }
}

  getStateDetails(stateCodes) {
    this.lstChkValues=[];
    this.lstCriticalData=[];
    this.rdStatus =false;
    //this.selected1
    this.selected1 =true;
    this.selected2 =true;
    this.selected3 =true;
    this.selected4 =true;
    this.selected5 =true;
    this.selected6 =true;
    this.allstatus = true;
   
    return;
  }
  
  Show($event)
  {
   // alert(1);
   // this.loader=" Working...";
    if (this.stateCodes != "0" && this.valueDemoStateDistt== "distt")  
     {
     // alert(2);
       this.distStatus = "none";
       this.cityStaus = "block";
       this.componentStaus = "none";//
       this.stateCodes =  this.stateCodes;
       this.districtCodes = "ALL";
       this.cityCodes = "ALL";
       this.Division = "0";
       this.Comp = "8";  
       this.isCity = false;
       this.isDist = true;
       this.isCOmponent = true;
       this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, "8",this.pageNumber,this.skip).subscribe(result_Fin14 => {
            this.lstCriticalData = result_Fin14;
            this.rowLenth=result_Fin14.length;
           // this.loader="Done";
         this.lstCriticalData.sort(function(a, b) {
           var nameA = a.Distt.toUpperCase(); 
           var nameB = b.Distt.toUpperCase();
           if (nameA < nameB) {
             return -1;
           }
           if (nameA > nameB) {
             return 1;
           }
        });
        this.islabel = "block";
       })


       this.islabel = "block"; 
       return;
      }
   else  if (this.stateCodes != "0" && this.valueDemoStateDistt== "city")  
     {
              this.lblStateDisttCity = "All India";
              this.distStatus = "none";
              this.cityStaus = "none";
              this.componentStaus = "none";
              this.stateCodes = this.stateCodes; 
              this.districtCodes = "ALL";
              this.cityCodes = "ALL";
              this.Division = "0";
              this.Comp = "9";
              this.isCity = true;
              this.isDist = true;
              this.isCOmponent = true;
              this.service.Get_StateDisttCityAtaGlance(this.stateCodes, this.districtCodes, this.cityCodes, this.Division, "9",this.pageNumber,this.skip).subscribe(result_Fin14 => {
                   this.lstCriticalData = result_Fin14;
                   this.rowLenth=result_Fin14.length;
                 //  this.loader="Done";
                this.lstCriticalData.sort(function(a, b) {
                  var nameA = a.Distt.toUpperCase(); 
                  var nameB = b.Distt.toUpperCase();
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
               });
               this.islabel = "block";
              })
      
      
              this.islabel = "block"; 
     }
  }
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TblExcel.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // wb.Props.Title="Hello";
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'AtaGlance.xlsx');
  }
  Reset()
  {
    this.ngOnInit();
    this.allstatus =false;
    this.allstatus= false;
    this.chkEnebled=true;
    this.selected1 = false;
    this.selected2 = false;
    this.selected3 = false;
    this.selected4 = false;
    this.selected5 = false;
    this.selected6 = false;
    this.AllDistt  =false;
   }
}


