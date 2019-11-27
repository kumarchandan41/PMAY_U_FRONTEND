import { Component, OnInit, ViewChild } from '@angular/core';
import { BuildingServiceService } from '../../login/Services/building-service.service';
// import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile, Excel_DemandCityWise, Excel_CLSSCityMain } from '../model/excelfile';
import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile, Excel_PMAY_Data, Excel_JNNURN_Data,ExcelfilePhyDash } from '../excelfile';

import { Router } from '@angular/router';
 
//import { StateScore } from '../model/chart.model';
import { StateScore } from '../../financeReport/model/chart.model';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { HttpClientModule } from '@angular/common/http';
import { Excel_CLSSCityMain } from 'src/app/financeReport/model/excelfile';



@Component({
  selector: 'app-excel-clsscity-main',
  templateUrl: './excel-clsscity-main.component.html',
  styleUrls: ['./excel-clsscity-main.component.css']
})
export class ExcelCLSSCityMainComponent implements OnInit {

  //  @ViewChild('fileInput') fileInput;
  @ViewChild('fileInput',{static:false}) fileInput;


  lstExcel:Excel_CLSSCityMain[];
  lstExcelSheet:ExcelSheet[];
constructor(private service:BuildingServiceService,private router:Router) { }
p: number = 1;
 
ngOnInit() {
    this.GetExcel();
    this.getSheetDetails();
  }
  Update(data)
  {
    // this.router.navigate(["/updatePage"],{queryParams:{Id:data.id}});
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
  this.service.GetExcelClssCityMain().subscribe(result=>{
  this.lstExcel=result;
});
}

Delete(data){
    this.service.DeleteDemandCity_ExcelDataById(data.id).subscribe(result=>{
      alert(result);
      this.GetExcel();
    })
  }
}