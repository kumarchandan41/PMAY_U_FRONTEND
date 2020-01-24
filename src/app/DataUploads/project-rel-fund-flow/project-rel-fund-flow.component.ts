import { Component, OnInit, ViewChild } from '@angular/core';
 
import { Router } from '@angular/router';
import { GlobalEvent } from 'src/app/Shared/global-event';
 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { States } from 'src/app/Shared/CommonModel';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { ExcelSheet } from 'src/app/financeReport/model/excelfile';
import { Excel_ProjectRelFundFlow_Data, Excel_Project_RelFundFlow_Data } from '../excelfile';
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
  lstExcel:Excel_Project_RelFundFlow_Data[];
  lstExcelSheet:ExcelSheet[];
  InstallmentNo:string;
  chkValues :string="";

  cid: number;
  Comp: string;
  EVR:string;
  rEL: any;
  Inst: any;
  ChkBoxArray: string[] = [];
  

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
  radioButtonInst=['I1','I2','I3'];

  getStateDetails(event)
  {
    this.stateCodes=event;
  }
  getInst_Details(event)
  {
    this.InstallmentNo=event;
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

  get_InstDetails(event)
  {
    alert(event);
    this.Inst=event;
  }

  
  sendSanctCodes(event) {
    debugger;
   let ChkName = event.target.value;
   let Checked = event.target.checked;

     if (Checked) {
       this.ChkBoxArray.push(ChkName);
      this.chkValues= this.ChkBoxArray.toString();
     }
     else {
       let index = this.ChkBoxArray.findIndex(a => a == ChkName);
       if (index !== -1) {
         this.ChkBoxArray.splice(index, 1);
         this.chkValues= this.ChkBoxArray.toString();
       } 
      }

 }

  public UploadFile() {
  debugger;
    // for Bulk Insert 
    const formData: FormData = new FormData();   
    formData.append('fileExcel',  this.fileInput.nativeElement.files[0]); 
    formData.append('StateCode',this.stateCodes);
    formData.append('Comp',this.Comp);
    formData.append('EBR',this.EVR);
    formData.append('Rel',this.rEL);    
    formData.append('Inst',this.Inst);
    formData.append('CheckValuse',this.chkValues);


   // formData.append('InstNo',this.InstallmentNo);
    this.service.BulkImport_ReleaseFundFlowExcel(formData).subscribe(result=>{
          alert(result);
    });
  }

// Step 1 
  public UploadAllData(event:any) {
    // for Bulk Insert 
    let formData = new FormData();
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {      
      formData.append('file', fileBrowser.files[0]); 
    this.service.BulkImport_Project_fund_Rel(formData).subscribe(result=>{
    // this.GetExcel();
    });
    }
  }
 
  

// Step 2
public UploadAll_HFAData(event:any) {
  // for Bulk Insert 
  let formData = new FormData();
  let fileBrowser = this.fileInput.nativeElement;
  if (fileBrowser.files && fileBrowser.files[0]) {      
    formData.append('file', fileBrowser.files[0]); 
  this.service.BulkImport_Project_HFAfund_Rel(formData).subscribe(result=>{
  // this.GetExcel();
  });
  }
}

// Step 3
public UploadAll_SCSPData(event:any) {
  // for Bulk Insert 
  let formData = new FormData();
  let fileBrowser = this.fileInput.nativeElement;
  if (fileBrowser.files && fileBrowser.files[0]) {      
    formData.append('file', fileBrowser.files[0]); 
  this.service.BulkImport_Project_SCSPfund_Rel(formData).subscribe(result=>{
  // this.GetExcel();
  });
  }
}


// Step 3
public UploadTSP_FundRel_Excel(event:any) {
  // for Bulk Insert 
  let formData = new FormData();
  let fileBrowser = this.fileInput.nativeElement;
  if (fileBrowser.files && fileBrowser.files[0]) {      
    formData.append('file', fileBrowser.files[0]); 
  this.service.UploadTSP_FundRel_Excel(formData).subscribe(result=>{
  // this.GetExcel();
  });
  }
}  
  
  //GetExcel(){
  //  this.service.GetExcel_PMayData().subscribe(result=>{
  //  this.lstExcel=result;
  // });
  //}

  DeleteTablePHY()
  {
    this.service.DeleteTableFundRel().subscribe(result=>{
     // this.GetExcel();
    })
  }
}
