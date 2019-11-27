import { Component, OnInit, ViewChild } from '@angular/core';
//import { BuildingServiceService } from '../service/building-service.service';
import { BuildingServiceService } from '../../login/Services/building-service.service';

//import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile, Excel_PMAY_Data } from '../model/excelfile';
import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile, Excel_PMAY_Data, Excel_JNNURN_Data, Excel_clssMasterNew } from '../excelfile';
import { Router } from '@angular/router';
//import { StateScore } from '../model/chart.model';
import { StateScore } from '../../financeReport/model/chart.model';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-clss-master-upload',
  templateUrl: './clss-master-upload.component.html',
  styleUrls: ['./clss-master-upload.component.css']
})
export class ClssMasterUploadComponent implements OnInit {
    //@ViewChild('fileInput') fileInput;
    @ViewChild('fileInput',{static:false}) fileInput;
    lstExcel:Excel_clssMasterNew[];
    lstExcelSheet:Excel_clssMasterNew[];
    
  constructor(private service:BuildingServiceService,private router:Router) { }
    p: number = 1;
    
    ngOnInit() {
     // this.GetExcel();
      this.getSheetDetails();
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
      this.service.BulkImport_ClssMainNewExcel(formData).subscribe(result=>{
       this.GetExcel();
      });
      }
    }
  
    getSheetDetails() {
      this.service.GetExcelClssMaster_Details().subscribe(result=>{
        this.lstExcelSheet=result;
      })
     }
     
     DeleteTablePMAY(){
      this.service.DeleteTablePMAY().subscribe(result=>{
        alert(result);
        this.GetExcel();
      })
    }
  
     
  GetExcel(){
    this.service.GetExcel_ClssMainData().subscribe(result=>{
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
  