import { Component, OnInit, ViewChild } from '@angular/core';
//import { BuildingServiceService } from '../service/building-service.service';
//import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile } from '../model/excelfile';

import { BuildingServiceService } from '../../login/Services/building-service.service';
import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile, Excel_PMAY_Data, Excel_JNNURN_Data } from '../excelfile';

import { Router } from '@angular/router';
//import { StateScore } from '../model/chart.model';
import { StateScore } from '../../financeReport/model/chart.model';

@Component({
  selector: 'app-excel-statescore',
  templateUrl: './excel-statescore.component.html',
  styleUrls: ['./excel-statescore.component.css']
})
export class ExcelStatescoreComponent implements OnInit {
   //@ViewChild('fileInput') fileInput;
   @ViewChild('fileInput',{static:false}) fileInput;

   lstExcel:StateScore[];
   lstExcelSheet:ExcelSheet[];
   message:string;
 constructor(private service:BuildingServiceService,private router:Router) { }
 p: number = 1;
   
 ngOnInit() {
     this.GetExcel();
     this.getSheetDetails();
   }
 
   DeleteTableStateScore(){
     this.service.DeleteTableStateScore().subscribe(result=>{
       alert(result);
       this.GetExcel();
     })
   }
 
   Update(data)
   {
     //updateStateScore
     this.router.navigate(["/updateStateScore",{ID:data.SrNo}]);
     // this.router.navigate(["/updatePage"],{queryParams:{Id:data.id}});
   }
    
 public UploadFile(event:any) {
     // for Bulk Insert 
     this.message="Please wait";
     let formData = new FormData();
     let fileBrowser = this.fileInput.nativeElement;
     if (fileBrowser.files && fileBrowser.files[0]) {      
       formData.append('file', fileBrowser.files[0]); 
     this.service.BulkImportSScoreUploadExcel(formData).subscribe(result=>{
       this.message=result;
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
   this.service.GetExcelScore_Data().subscribe(result=>{
   this.lstExcel=result;
 });
 }
 
 Delete(data){
     this.service.DeleteScore_ExcelDataById(data.id).subscribe(result=>{
     //  alert(result);
       this.GetExcel();
     })
   }
 }
 
 