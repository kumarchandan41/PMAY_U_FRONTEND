import { Component, OnInit, ViewChild } from '@angular/core';
 
import { Router } from '@angular/router';
import { GlobalEvent } from 'src/app/Shared/global-event';
 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { States } from 'src/app/Shared/CommonModel';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { ExcelSheet } from 'src/app/financeReport/model/excelfile';
import { Excel_ProjectRelFundFlow_Data } from '../excelfile';
import { BuildingServiceService } from '../../login/Services/building-service.service';


@Component({
  selector: 'app-project-rel-fund-flow',
  templateUrl: './project-rel-fund-flow.component.html',
  styleUrls: ['./project-rel-fund-flow.component.css']
})
export class ProjectRelFundFlowComponent implements OnInit {
  stateCodes: string = "0";
  StateDetails: States[];
  State:string;
  saveDetailsForm:any;
  StateMessage:string;
  @ViewChild('fileInput',{static:false}) fileInput;
  lstExcel:Excel_ProjectRelFundFlow_Data[];
  lstExcelSheet:ExcelSheet[];
  

  cid: number;
  Comp: string;
  EVR:string;
  rEL: any;
  constructor(private router: Router,private gevent:GlobalEvent, public service: BuildingServiceService, private modalService: NgbModal)
   { }

  ngOnInit() {
    this.stateCodes = "0";
    this.StateMessage="Select State";
    this.cid = 0;
    this.Comp = "0";
    this.State="--Select--";
    this.service.StateList();
  }

  radioButtonSet=['R1','R2','R3','R4','R5','R6','R7','R8','R9','R10' ];

  getStateDetails(event)
  {
    this.stateCodes=event;

  }
  getCompDetails(event)
  {
    this.Comp=event;
  }
  getEVRDetails(event)
  {
    alert(event);
    this.EVR=event;
  }

  getRELDetails(event)
  {
    alert(event);
    this.rEL=event;
  }

  public UploadFile() {
  debugger;
    // for Bulk Insert 
    const formData: FormData = new FormData(); 
  
     formData.append('fileExcel',  this.fileInput.nativeElement.files[0]); 
    formData.append('SateCode',this.stateCodes);
    formData.append('Comp',this.Comp);
    formData.append('EVR',this.EVR);
    formData.append('Rel',this.rEL);
    



    this.service.BulkImport_ReleaseFundFlowExcel(formData).subscribe(result=>{
alert(result);
    });
  }


  
  
  //GetExcel(){
  //  this.service.GetExcel_PMayData().subscribe(result=>{
  //  this.lstExcel=result;
  // });
  //}

}
