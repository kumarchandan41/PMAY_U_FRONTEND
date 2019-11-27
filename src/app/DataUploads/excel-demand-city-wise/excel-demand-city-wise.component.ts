import { Component, OnInit, ViewChild } from '@angular/core';
//import { BuildingServiceService } from '../service/building-service.service';
//import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile, Excel_DemandCityWise } from '../model/excelfile';

import { Router } from '@angular/router';
//import { StateScore } from '../model/chart.model';

import { StateScore } from '../../financeReport/model/chart.model';

 //import { BuildingServiceService } from '../service/building-service.service';
import { BuildingServiceService } from '../../login/Services/building-service.service';
//import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile, ExcelfilePhyDash } from '../model/excelfile';
import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile, Excel_PMAY_Data, Excel_JNNURN_Data,ExcelfilePhyDash } from '../excelfile';
//import { Router } from '@angular/router';
//import { StateScore } from '../model/chart.model';

import { GraphService } from 'src/app/financeReport/service/graph.service';
import { HttpClientModule } from '@angular/common/http';
import { Excel_DemandCityWise } from 'src/app/financeReport/model/excelfile';



@Component({
  selector: 'app-excel-demand-city-wise',
  templateUrl: './excel-demand-city-wise.component.html',
  styleUrls: ['./excel-demand-city-wise.component.css']
})
export class ExcelDemandCityWiseComponent implements OnInit {
//  @ViewChild('fileInput') fileInput;
@ViewChild('fileInput',{static:false}) fileInput;
lstExcel:Excel_DemandCityWise[];
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
   
  DeleteTableDCU(){
    this.service.DeleteTableDCU().subscribe(result=>{
      alert(result);
      this.GetExcel();
    })
  }
 

  public UploadFile(event:any) {
    // for Bulk Insert 
    alert();
    let formData = new FormData();
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {      
      formData.append('file', fileBrowser.files[0]); 
     this.service.BulkImportDemandCityExcel(formData).subscribe(result=>{
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
  this.service.GetExcelDemandCity_Data().subscribe(result=>{
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

