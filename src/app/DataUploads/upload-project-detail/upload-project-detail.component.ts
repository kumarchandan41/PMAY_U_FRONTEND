import { Component, OnInit, ViewChild } from '@angular/core';
//import { BuildingServiceService } from '../service/building-service.service';
import { BuildingServiceService } from '../../login/Services/building-service.service';

//import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile, Excel_PMAY_Data } from '../model/excelfile';
import { Excelfile, ExcelSheet,Excel_CLSSCityWisefile, Excel_PMAY_Data, Excel_JNNURN_Data, Excel_PROJECTCost, Excel_ProjectDetail_Report_Data } from '../excelfile';
import { Router } from '@angular/router';
//import { StateScore } from '../model/chart.model';
import { StateScore } from '../../financeReport/model/chart.model';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { HttpClientModule } from '@angular/common/http';

 

@Component({
  selector: 'app-upload-project-detail',
  templateUrl: './upload-project-detail.component.html',
  styleUrls: ['./upload-project-detail.component.css']
})

export class UploadProjectDetailComponent implements OnInit {
  //@ViewChild('fileInput') fileInput;
  @ViewChild('fileInput',{static:false}) fileInput;
  lstExcel:Excel_ProjectDetail_Report_Data[];
  lstExcelSheet:ExcelSheet[];
 
  stateCodes: string = "0";
  districtCodes: string = "0";
  cityCodes: string = "0";
  StateMessage: string;
  DistrictMessage: string;
  CityMessage: string;
  stValue: string;


constructor(private service:BuildingServiceService,private router:Router) {
  this.stValue = "0";
  this.StateMessage = "Select State";
 }
  p: number = 1;
 

  ngOnInit() {
     this.GetExcel();
 //   this.getSheetDetails();
 this.stateCodes = "0";
 this.districtCodes = "0";
 this.cityCodes = "0";
 this.service.StateList();
// this.service.StateList();
  }
  Update(data)
  {

    // this.router.navigate(["/updatePMayData",{ID:data.SrNo}]);
  }
  
  public UploadFile(event:any) {
    // for Bulk Insert 
        let formData = new FormData();
        let fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {      
          formData.append('file', fileBrowser.files[0]); 
        this.service.BulkImport_PROJECT_DetailExcel(formData).subscribe(result=>{
        this.GetExcel();
        });
        }
  }

  getSheetDetails() {
    this.service.ReadExcelSheet().subscribe(result=>{
      this.lstExcelSheet=result;
    })
   }
   
   DeleteTablePMAY(){
    this.service.DeleteTableProjDetail().subscribe(result=>{
      alert(result);
      this.GetExcel();
    })
  }
  
   
  GetExcel(){
    this.service.GetExcel_Projct_Details_Report().subscribe(result=>{
    this.lstExcel=result;
    });
   }

// GetExcel(){
//    this.service.GetExcel_PMayData().subscribe(result=>{
//    this.lstExcel=result;
//   });
// }

//Delete(data){
    // this.service.DeleteScore_ExcelDataById(data.id).subscribe(result=>{
    //   alert(result);
    //   this.GetExcel();
    // })
  //}
}
