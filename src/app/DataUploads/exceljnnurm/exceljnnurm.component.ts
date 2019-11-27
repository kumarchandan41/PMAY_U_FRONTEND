import { Component, OnInit, ViewChild } from '@angular/core';
import { BuildingServiceService } from '../../login/Services/building-service.service';
import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile, Excel_PMAY_Data, Excel_JNNURN_Data } from '../excelfile';
 
import { Router } from '@angular/router';
//import { StateScore } from '../model/chart.model';


import { StateScore } from '../../financeReport/model/chart.model';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-exceljnnurm',
  templateUrl: './exceljnnurm.component.html',
  styleUrls: ['./exceljnnurm.component.css']
})
export class ExceljnnurmComponent implements OnInit {
@ViewChild('fileInput',{static:false}) fileInput;

 // fileInput: any;
  lstExcel:Excel_JNNURN_Data[];
  lstExcelSheet:ExcelSheet[];
  
     
constructor(private service:BuildingServiceService,private router:Router) { }
p: number = 1;

ngOnInit() {
    this.GetExcel();
    this.getSheetDetails();
  }
  // Update(data)
  // {
  //   this.router.navigate(["/updateJNNURMPage"],{queryParams:{Id:data.id}});
  // }  

  Update(data)
  {
   // alert(data.SrNo);
   // this.router.navigate(["/updatePMayData"],{queryParams:{ID:data.id}});
    this.router.navigate(["/updateJNNURMPage",{ID:data.SrNo}]);
  }

    
  public UploadFile(event:any) {
    // for Bulk Insert 
    let formData = new FormData();
    let fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {      
      formData.append('file', fileBrowser.files[0]); 
    this.service.BulkImport_JNNURMExcel(formData).subscribe(result=>{
     this.GetExcel();
    });
    }
  }

  DeleteTableJNNURM(){
    this.service.DeleteTableJNNURM().subscribe(result=>{
      alert(result);
      this.GetExcel();
    })
  }
  
  //  getSheetDetails() {
  //   this.service.GetExcelSheet_JNNURM().subscribe(result=>{
  //     this.lstExcelSheet=result;
  //   })
  //  }

   getSheetDetails() {
    this.service.ReadExcelSheet().subscribe(result=>{
      this.lstExcelSheet=result;
    })
   }

GetExcel(){
      
  this.service.GetExcelSheet_JNNURM().subscribe(result=>{
  this.lstExcel=result;
 });
}

Delete(data){
    this.service.DeleteScore_ExcelDataById(data.id).subscribe(result=>{
      alert(result);
      this.GetExcel();
    })
  }
}

