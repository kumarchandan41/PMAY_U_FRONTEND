 import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile, Excel_PMAY_Data, Excel_JNNURN_Data,ExcelfilePhyDash } from '../excelfile';

 import { Router } from '@angular/router';
 

import { Component, OnInit, ViewChild } from '@angular/core';
//import { BuildingServiceService } from '../service/building-service.service';
import { BuildingServiceService } from '../../login/Services/building-service.service';
//import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile, ExcelfilePhyDash } from '../model/excelfile';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { HttpClientModule } from '@angular/common/http';
import { Excel_CLSSCityMain } from 'src/app/financeReport/model/excelfile';




@Component({
  selector: 'app-excel-clssmainmaster',
  templateUrl: './excel-clssmainmaster.component.html',
  styleUrls: ['./excel-clssmainmaster.component.css']
})
export class ExcelClssmainmasterComponent implements OnInit {
  //@ViewChild('fileInput') fileInput;
  @ViewChild('fileInput',{static:false}) fileInput;


  lstExcel:Excel_CLSSCityMain[];
  lstExcelSheet:ExcelSheet[];
 
  //Excel_DemandCityWise: import("f:/AngularAll/nbo/15_new1Hfa/hfaapp/src/app/model/excelfile").Excel_DemandCityWise[];


constructor(private service:BuildingServiceService,private router:Router) { }
p: number = 1;

ngOnInit() {
  this.GetExcel();
  this.getSheetDetails();
}
 
UpdateQ(data)
  {
    // this.router.navigate(["/updatePage"],{queryParams:{Id:data.id}});
  }
 Update(data)
 {

   // alert(data.SrNo);
   // this.router.navigate(["/updatePMayData"],{queryParams:{ID:data.id}});
    this.router.navigate(["/updatePMayData",{ID:data.SrNo}]);
 }
 public UploadFile(event:any) {
    // for Bulk Insert 
    let formData = new FormData();
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {      
      formData.append('file', fileBrowser.files[0]); 
    this.service.BulkImportClssCityMainExcel(formData).subscribe(result=>{
     this.GetExcel();
    });
    }
 }

  
getSheetDetails() {
 this.service.ReadExcelSheet().subscribe(result=>{
   this.lstExcelSheet=result;
 })
}

GetExcel(){
  this.service.GetExcelClssMainCity_Data().subscribe(result=>{
  this.lstExcel=result;
 });
}

Delete(data){
      this.service.DeleteClssMainCity_ExcelDataById(data.id).subscribe(result=>{
      alert(result);
      this.GetExcel();
    })
  }
}



// SET ANSI_NULLS ON
// GO

// SET QUOTED_IDENTIFIER ON
// GO

// CREATE TABLE [dbo].[CLSS_MAster](
// 	[SrNo] [bigint] IDENTITY(1,1) NOT NULL,
// 	[State] [nvarchar](255) NULL,
// 	[StateCode] [nvarchar](255) NULL,
// 	[Loan_EWS_LIG] [float] NULL,
// 	[Subsidy_EWS_LIG] [float] NULL,
// 	[No_Beneficiary_EWS_LIG] [float] NULL,
// 	[Loan_MIG] [float] NULL,
// 	[Subsidy_MIG] [float] NULL,
// 	[No_Beneficiary_MIG] [float] NULL,
// 	[Loan_TOTAL] [float] NULL,
// 	[Subsidy_Total] [float] NULL,
// 	[NoBeneficiary_Total] [float] NULL,
// 	[Division] [nvarchar](255) NULL,
//  CONSTRAINT [PK_CLSS_MASTER_1] PRIMARY KEY CLUSTERED 
// (
// 	[SrNo] ASC
// )WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
// ) ON [PRIMARY]

// GO