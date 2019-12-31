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
import { States, District, City, CompMaster, PMAY_DATA_ShortFall } from 'src/app/financeReport/model/chart';
//import {  District, States, City } from 'src/app/model/charts.model';
//import { Observable } from 'rxjs'

//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Houses_Status, Charts } from '../model/chart';
import { float } from 'html2canvas/dist/types/css/property-descriptors/float';
import * as $ from 'jquery';

@Component({
    selector: 'app-shortfall-detail',
    templateUrl: './shortfall-detail.component.html',
    styleUrls: ['./shortfall-detail.component.css']
})
export class ShortfallDetailComponent implements OnInit {
  stateCode: string = "0";
  districtCode: string = "0";
  cityCode: string = "0";
  HousesOccupied6: any = "0";
  stateCodes: string = "0";
  districtCodes: string = "0";
  cityCodes: string = "0";
  State: string;
  StateMessage: string;
  DistrictMessage: string;
  CityMessage: string;
  distValue: string;
  cityValue: string;
  stValue: string;
  lblStateDisttCity: string; 
  Compid:any;
  lstCriticalData:PMAY_DATA_ShortFall[];
  GroupedData:any;
  finyear:string[];
  DisplayTable: string;
  DisplyaGraph: string;
  public blnShowTable: boolean;
  Component14_15_C: string;

  Component14_15_G: string;
  Completed14_15_G: string;
  Actual_Completed14_15_G: string;
  Shortfall_Completed14_15_G: string;
  Shortfall_Completed15_16_G: string;
  Actual_Completed15_16_G: string;
  Completed15_16_G: string;
  Component15_16_G: string;
  Component16_17_G: string;
  Completed16_17_G: string;
  Actual_Completed16_17_G: string;
  Shortfall_Completed16_17_G: string;
  Component17_18_G: string;
  Completed17_18_G: string;
  Actual_Completed17_18_G: string;
  Shortfall_Completed17_18_G: string;
  Component18_19_G: string;
  Completed18_19_G: string;
  Actual_Completed18_19_G: string;
  Shortfall_Completed18_19_G: string;
  Component19_20_G: string;
  Completed19_20_G: string;
  Actual_Completed19_20_G: string;
  Shortfall_Completed19_20_G: string;
//----------------

Component14_15_G1: string;
  Completed14_15_G1: string;
  Actual_Completed14_15_G1: string;
  Shortfall_Completed14_15_G1: string;
  Shortfall_Completed15_16_G1: string;
  Actual_Completed15_16_G1: string;
  Completed15_16_G1: string;
  Component15_16_G1: string;
  //Component16_17_G: string;
  Component16_17_G1: string;

  Completed16_17_G1: string;
  Actual_Completed16_17_G1: string;
  Shortfall_Completed16_17_G1: string;
  Component17_18_G1: string;
  Completed17_18_G1: string;
  Actual_Completed17_18_G1: string;
  Shortfall_Completed17_18_G1: string;
  Component18_19_G1: string;
  Completed18_19_G1: string;
  Actual_Completed18_19_G1: string;
  Shortfall_Completed18_19_G1: string;
  Component19_20_G1: string;
  Completed19_20_G1: string;
  Actual_Completed19_20_G1: string;
  Shortfall_Completed19_20_G1: string;
  
  selectedColor_G = '';
  public backgroundColor_G: string;
  DisplayTable_C: string;
  DisplyaGraph_C: string;
  public blnShowTable_C :boolean;
  

  constructor(private router: Router, private routers: ActivatedRoute, public service: GraphService) {
    this.stValue = "0";
    this.distValue = "0";
    this.cityValue = "0";
    this.StateMessage = "All India";
    this.DistrictMessage = "Select District";
    this.CityMessage = "Select City";
    this.service.GetStatusofHouses_CompWise(this.Compid).subscribe(result => {
    });

    this.service.Shortfall_PMAY_Graph_DATA(this.stateCodes, this.districtCode, this.cityCode,"0","0").subscribe(result => { // new code
    });

    //this.service.sp_create_Fin_ConsPMAYDATA(this.stateCodes, this.districtCode, this.cityCode, "BLCS", "0").subscribe(result => {
    //});
  }

  ngOnInit() {
   this.districtCodes = "0";
    this.cityCodes = "0";
    this.Compid = "0";
    this.stateCode = "0";
    this.service.StateList();
    this.service.DisttList(this.stateCodes);
    this.service.CityList(this.districtCodes);
    // this.States_UT ="Delhi";
    this.lblStateDisttCity = "All India";
 
      // Grid  data  below
      this.service.Get_ShortFallView(this.stateCodes, this.districtCodes, this.cityCodes,"0", "").subscribe(result_Fin14 => {
        this.lstCriticalData=result_Fin14;
        debugger;
        let result=result_Fin14.reduce(function(groups, item) {
          const val = item['Component'];
          groups[val] = groups[val] || [];
          groups[val].push(item);
          return groups;
      }, {});
      this.GroupedData=result;
      })
  
    //  <<<<<<<<<<<<<<<<<<<<<<<Graph >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    this.BindPMAY_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes,"0", "0");
    this.BindBLC_Critical_Data(this.stateCodes, this.districtCodes, this.cityCodes,"BLCS", "0");
    


    this.districtCodes = "0";
    this.cityCodes = "0";
    this.Compid = "0";
    this.stateCode = "0";
    this.lblStateDisttCity = "All India";
    this.stateCodes = "0";
    this.districtCodes = "0";
    this.cityCodes = "0";
    this.State = "--Select--";
    this.service.StateList();
    this.service.DisttList(this.stateCodes);
    this.service.CityList(this.districtCodes);

    // this.DisplyaGraph_C = "none";
    // this.DisplayTable_C= "block";
    this.DisplyaGraph = "none";
    this.DisplayTable = "block";

  }
  GetFinancialData(stateCodes, districtCodes, cityCodes, Compid) {

  }

  ShowPageM(status: string) {
    if (status === "graph") {
      this.DisplyaGraph = "block";
      this.DisplayTable = "none";
      this.blnShowTable = true;
    }
    else {
      this.DisplyaGraph = "none";
      this.DisplayTable = "block";
      this.blnShowTable = false;
    }
  }
  
  BindPMAY_Critical_Data(stateCode, DisttCode, cityCode,Comp,Fin_Year)
  {
      Comp ="0";
      this.service.Shortfall_PMAY_Graph_DATA(stateCode, DisttCode, cityCode,Comp,"0").subscribe(result => { // new code
      ///first row data
    try {
      this.Component14_15_G = result[0].Component;
      this.Completed14_15_G = result[0].Completed;
      this.Actual_Completed14_15_G = result[0].Actual_Completed;
      this.Shortfall_Completed14_15_G = result[0].Shortfall_Completed; 
    }
    catch{}
    finally{}
   
      ///Second row data
    try {
      this.Component15_16_G = result[1].Component;
      this.Completed15_16_G = result[1].Completed;
      this.Actual_Completed15_16_G = result[1].Actual_Completed;
      this.Shortfall_Completed15_16_G = result[1].Shortfall_Completed; 
    }
    catch{}
    finally{}
 
          ///Third row data
          try {
            this.Component16_17_G = result[2].Component;
            this.Completed16_17_G = result[2].Completed;
            this.Actual_Completed16_17_G = result[2].Actual_Completed;
            this.Shortfall_Completed16_17_G = result[2].Shortfall_Completed; 
          }
          catch{}
          finally{}

          ///Fourth row data
          try {
            this.Component17_18_G = result[3].Component;
            this.Completed17_18_G = result[3].Completed;
            this.Actual_Completed17_18_G = result[3].Actual_Completed;
            this.Shortfall_Completed17_18_G = result[3].Shortfall_Completed; 
          }
          catch{}
          finally{}

                    ///Fifth row data
                    try {
                      this.Component18_19_G = result[4].Component;
                      this.Completed18_19_G = result[4].Completed;
                      this.Actual_Completed18_19_G = result[4].Actual_Completed;
                      this.Shortfall_Completed18_19_G = result[4].Shortfall_Completed; 
                    }
                    catch{}
                    finally{}

                    ///Fifth row data
                    try {
                      this.Component19_20_G = result[5].Component;
                      this.Completed19_20_G = result[5].Completed;
                      this.Actual_Completed19_20_G = result[5].Actual_Completed;
                      this.Shortfall_Completed19_20_G = result[5].Shortfall_Completed; 
                    }
                    catch{}
                    finally{}
                    
                    
          let chart = new CanvasJS.Chart("chartPMAYU", {
                    theme: "light2",
                    animationEnabled: true,
                    exportEnabled: false,
                    title: {
                      text: " Shortfall PMAY(U) Data Consolidated",
                      fontSize: "25",
                    },
                    backgroundColor: this.backgroundColor_G,
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
                      legendText: "Completed",
                       stValue: "Q",
                      indexLabelFontSize: 12,
                      indexLabelOrientation: "vertical",
                      dataPoints: [
                        { label: "2014-15", y: this.Completed14_15_G },
                        { label: "2015-16", y: this.Completed15_16_G},
                        { label: "2016-17", y: this.Completed16_17_G },
                        { label: "2017-18", y: this.Completed17_18_G },  
                        { label: "2018-19", y: this.Completed18_19_G },
                        { label: "2019-20", y: this.Completed19_20_G } 
                      ]
                    },
                    {
                      type: "column",
                      dockInsidePlotArea: true,
                       indexLabel: "{y}", //HG
                      bevelEnabled: true,
                      showInLegend: true,
                      legendText: "Actual_Completed",
                       stValue: "Q",
                      indexLabelFontSize: 12,
                      indexLabelOrientation: "vertical",
                      dataPoints: [
                        { label: "2014-15", y: this.Actual_Completed14_15_G },
                        { label: "2015-16", y: this.Actual_Completed15_16_G },
                        { label: "2016-17", y: this.Actual_Completed16_17_G },
                        { label: "2017-18", y: this.Actual_Completed17_18_G},  
                        { label: "2018-19", y: this.Actual_Completed18_19_G },
                        { label: "2019-20", y: this.Actual_Completed19_20_G } 
                      ]
                    },

                    {
                      type: "column",
                      dockInsidePlotArea: true,
                       indexLabel: "{y}", //HG
                      bevelEnabled: true,
                      showInLegend: true,
                      legendText: "Shortfall_Completed",
                       stValue: "Q",
                      indexLabelFontSize: 12,
                      indexLabelOrientation: "vertical",
                      dataPoints: [
                        { label: "2014-15", y: this.Shortfall_Completed14_15_G },
                        { label: "2015-16", y: this.Shortfall_Completed15_16_G },
                        { label: "2016-17", y: this.Shortfall_Completed16_17_G },
                        { label: "2017-18", y: this.Shortfall_Completed17_18_G },  
                        { label: "2018-19", y: this.Shortfall_Completed18_19_G },
                        { label: "2019-20", y: this.Shortfall_Completed19_20_G } 
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


  BindBLC_Critical_Data(stateCode, DisttCode, cityCode,Comp,Fin_Year)
  {
      Comp ="0";
      this.Component14_15_G1 = "0";
      this.Completed14_15_G1 = "0";
      this.Actual_Completed14_15_G1 = "0";
      this.Shortfall_Completed14_15_G1 = "0";
      this.service.Shortfall_PMAY_Graph_DATA(stateCode, DisttCode, cityCode,'BLCS',"2014-15").subscribe(result => { // new code
      ///first row data
    if (result.length==0)
    {
      this.Completed14_15_G1 = "0";
      this.Actual_Completed14_15_G1 = "0";
      this.Shortfall_Completed14_15_G1 = "0";
    }
    else 
    {
    try {
      this.Completed14_15_G1 = result[0].Completed;
      this.Actual_Completed14_15_G1 = result[0].Actual_Completed;
      this.Shortfall_Completed14_15_G1 = result[0].Shortfall_Completed; 
    }
    catch{
      this.Completed14_15_G1 = "0";
      this.Actual_Completed14_15_G1 = "0";
      this.Shortfall_Completed14_15_G1 = "0";
    }
    finally{}
  }

    this.service.Shortfall_PMAY_Graph_DATA(stateCode, DisttCode, cityCode,'BLCS',"2015-16").subscribe(result => { // new code
    ///Second row data
    try {
      this.Component15_16_G1 = result[0].Component;
      this.Completed15_16_G1 = result[0].Completed;
      this.Actual_Completed15_16_G1 = result[1].Actual_Completed;
      this.Shortfall_Completed15_16_G1 = result[1].Shortfall_Completed; 
    }
    catch{}
    finally{}
 
    this.service.Shortfall_PMAY_Graph_DATA(stateCode, DisttCode, cityCode,'BLCS',"2016-17").subscribe(result => { // new code
      ///Second row data
          ///Third row data
          try {
            this.Component16_17_G1 = result[2].Component;
            this.Completed16_17_G1 = result[2].Completed;
            this.Actual_Completed16_17_G1 = result[2].Actual_Completed;
            this.Shortfall_Completed16_17_G1 = result[2].Shortfall_Completed; 
          }
          catch{}
          finally{}

          this.service.Shortfall_PMAY_Graph_DATA(stateCode, DisttCode, cityCode,'BLCS',"2017-18").subscribe(result => { // new code

          ///Fourth row data
          try {
            this.Component17_18_G1 = result[3].Component;
            this.Completed17_18_G1 = result[3].Completed;
            this.Actual_Completed17_18_G1 = result[3].Actual_Completed;
            this.Shortfall_Completed17_18_G1 = result[3].Shortfall_Completed; 
          }
          catch{}
          finally{}

          this.service.Shortfall_PMAY_Graph_DATA(stateCode, DisttCode, cityCode,'BLCS',"2018-19").subscribe(result => { // new code
          ///Fifth row data
                    try {
                      this.Component18_19_G1 = result[4].Component;
                      this.Completed18_19_G1 = result[4].Completed;
                      this.Actual_Completed18_19_G1 = result[4].Actual_Completed;
                      this.Shortfall_Completed18_19_G1 = result[4].Shortfall_Completed; 
                    }
                    catch{}
                    finally{}

                    this.service.Shortfall_PMAY_Graph_DATA(stateCode, DisttCode, cityCode,'BLCS',"2019-20").subscribe(result => { // new code
                    ///Fifth row data
                    try {
                      this.Component19_20_G1 = result[5].Component;
                      this.Completed19_20_G1 = result[5].Completed;
                      this.Actual_Completed19_20_G1 = result[5].Actual_Completed;
                      this.Shortfall_Completed19_20_G1 = result[5].Shortfall_Completed; 
                    }
                    catch{}
                    finally{}
                    
                    
          let chart = new CanvasJS.Chart("chart_BLCS", {
                    theme: "light2",
                    animationEnabled: true,
                    exportEnabled: false,
                    title: {
                      text: " Shortfall PMAY(U) Data Consolidated",
                      fontSize: "25",
                    },
                    backgroundColor: this.backgroundColor_G,
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
                      legendText: "Completed",
                       stValue: "Q",
                      indexLabelFontSize: 12,
                      indexLabelOrientation: "vertical",
                      dataPoints: [
                        { label: "2014-15", y: this.Completed14_15_G1 },
                        { label: "2015-16", y: this.Completed15_16_G1},
                        { label: "2016-17", y: this.Completed16_17_G1 },
                        { label: "2017-18", y: this.Completed17_18_G1 },  
                        { label: "2018-19", y: this.Completed18_19_G1 },
                        { label: "2019-20", y: this.Completed19_20_G1 } 
                      ]
                    },
                    {
                      type: "column",
                      dockInsidePlotArea: true,
                       indexLabel: "{y}", //HG
                      bevelEnabled: true,
                      showInLegend: true,
                      legendText: "Actual_Completed",
                       stValue: "Q",
                      indexLabelFontSize: 12,
                      indexLabelOrientation: "vertical",
                      dataPoints: [
                        { label: "2014-15", y: this.Actual_Completed14_15_G1 },
                        { label: "2015-16", y: this.Actual_Completed15_16_G1 },
                        { label: "2016-17", y: this.Actual_Completed16_17_G1 },
                        { label: "2017-18", y: this.Actual_Completed17_18_G1},  
                        { label: "2018-19", y: this.Actual_Completed18_19_G1 },
                        { label: "2019-20", y: this.Actual_Completed19_20_G1 } 
                      ]
                    },

                    {
                      type: "column",
                      dockInsidePlotArea: true,
                       indexLabel: "{y}", //HG
                      bevelEnabled: true,
                      showInLegend: true,
                      legendText: "Shortfall_Completed",
                       stValue: "Q",
                      indexLabelFontSize: 12,
                      indexLabelOrientation: "vertical",
                      dataPoints: [
                        { label: "2014-15", y: this.Shortfall_Completed14_15_G1 },
                        { label: "2015-16", y: this.Shortfall_Completed15_16_G1 },
                        { label: "2016-17", y: this.Shortfall_Completed16_17_G1 },
                        { label: "2017-18", y: this.Shortfall_Completed17_18_G1 },  
                        { label: "2018-19", y: this.Shortfall_Completed18_19_G1 },
                        { label: "2019-20", y: this.Shortfall_Completed19_20_G1 } 
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
            });
          });
        });
      });
    });
  }
}
