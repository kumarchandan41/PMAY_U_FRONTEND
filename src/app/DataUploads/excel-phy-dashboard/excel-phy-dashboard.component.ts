import { Component, OnInit, ViewChild } from '@angular/core';
//import { BuildingServiceService } from '../service/building-service.service';
import { BuildingServiceService } from '../../login/Services/building-service.service';
//import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile, ExcelfilePhyDash } from '../model/excelfile';
import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile, Excel_PMAY_Data, Excel_JNNURN_Data,ExcelfilePhyDash } from '../excelfile';
import { Router } from '@angular/router';
//import { StateScore } from '../model/chart.model';
import { StateScore } from '../../financeReport/model/chart.model';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-excel-phy-dashboard',
  templateUrl: './excel-phy-dashboard.component.html',
  styleUrls: ['./excel-phy-dashboard.component.css']
})

export class ExcelPhyDashboardComponent implements OnInit {
  //@ViewChild('fileInput') fileInput;
  @ViewChild('fileInput',{static:false}) fileInput;

  lstExcel:ExcelfilePhyDash[];
  lstExcelSheet:ExcelSheet[];
constructor(private service:BuildingServiceService,private router:Router) { }
p: number = 1;
  
ngOnInit() {
    this.GetExcel();
    this.getSheetDetails();
  }
  Update(data)
  {
    this.router.navigate(["/updatePage"],{queryParams:{Id:data.id}});
  }
   
  public UploadFile(event:any) {
    // for Bulk Insert 
    let formData = new FormData();
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {      
      formData.append('file', fileBrowser.files[0]); 
    this.service.BulkImportPDExcel(formData).subscribe(result=>{
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
  this.service.GetExcel_PHYDashData().subscribe(result=>{
  this.lstExcel=result;
});
}

Delete(data){
    this.service.DeletePD_ExcelDataById(data.id).subscribe(result=>{
     // alert(result);
      this.GetExcel();
    })
  }
}
