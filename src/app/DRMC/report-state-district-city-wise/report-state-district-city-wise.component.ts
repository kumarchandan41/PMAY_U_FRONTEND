import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminSandbox } from '../admin.sandbox';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-state-district-city-wise',
  templateUrl: './report-state-district-city-wise.component.html',
  styleUrls: ['./report-state-district-city-wise.component.css']
})
export class ReportStateDistrictCityWiseComponent implements OnInit {
  _districtCode = 0;
  @ViewChild('table', {static: false}) table: ElementRef;
  @ViewChild('content', {static: false}) content: ElementRef;
  constructor(private route: ActivatedRoute,public adminSandbox: AdminSandbox) { }

  ngOnInit() {
   
    this.route.params.subscribe(params => {
      this._districtCode = params['districtCode'];
     this.adminSandbox.getReportCityDistrictStateWise(this._districtCode);
    });
  }
  pdf() {
    var pdfsize = 'a0';   
    var doc = new jsPDF('l','pt','A2',pdfsize);
    doc.autoTable({
      html: '#content',
      columnStyles: {
        0: {columnWidth: 40},
      /*   1: {columnWidth: 50},
        2: {columnWidth: 70},
        3: {columnWidth: 50},
        4: {columnWidth: 45},
        5: {columnWidth: 45},
        6: {columnWidth: 50},
        7: {columnWidth: 45},
        8: {columnWidth: 50},
        9: {columnWidth: 45},
        10: {columnWidth: 45},
        11: {columnWidth: 45},
        12: {columnWidth: 45}, */
        // etc
      },
      bodyStyles: {minCellHeight: 30 },
      didDrawCell: function (reportStateDistrictCityWise) {
        if (reportStateDistrictCityWise.column.index === 5 && reportStateDistrictCityWise.cell.section === 'body') {
          
        }
      }
    });
    doc.save("CityWiseReport.pdf");
  }
  ExportToExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'CityWiseReport.xlsx');

  }

  getNumberOfProjectTotal(index: number) : number {
   
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateDistrictCityWise.length; i++) {
      sum += this.adminSandbox.reportStateDistrictCityWise[i].NumberofProject;
    }
    return sum;
  }
  getProjectCostTotal(index: number) : number {
   
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateDistrictCityWise.length; i++) {
      sum += this.adminSandbox.reportStateDistrictCityWise[i].ProjectCost;
    }
    return sum;
  }
  getCentralAssistanceTotal(index: number) : number {
   
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateDistrictCityWise.length; i++) {
      sum += this.adminSandbox.reportStateDistrictCityWise[i].CentralAssistance;
    }
    return sum;
  }
  getTotalHouseSanction(index: number) : number {
   
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateDistrictCityWise.length; i++) {
      sum += this.adminSandbox.reportStateDistrictCityWise[i].TotalSanction;
    }
    return sum;
  }
  getTotalGrounding(index: number) : number {
   
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateDistrictCityWise.length; i++) {
      sum += this.adminSandbox.reportStateDistrictCityWise[i].Grounding;
    }
    return sum;
  }
  getTotalProgressHouse(index: number) : number {
   
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateDistrictCityWise.length; i++) {
      sum += this.adminSandbox.reportStateDistrictCityWise[i].TotalProgressHouse;
    }
    return sum;
  }
  getTotalConstructionCompleted(index: number) : number {
   
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateDistrictCityWise.length; i++) {
      sum += this.adminSandbox.reportStateDistrictCityWise[i].ConstructionCompleted;
    }
    return sum;
  }
  getTotalTotalHouseOccupiedBeneficiary(index: number) : number {
  
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateDistrictCityWise.length; i++) {
      sum += this.adminSandbox.reportStateDistrictCityWise[i].TotalHouseOccupiedBeneficiary;
    }
    return sum;
  }
  getCentralAssistanceReleaseTotal(index: number) : number {
   
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateDistrictCityWise.length; i++) {
      sum += this.adminSandbox.reportStateDistrictCityWise[i].Release;
    }
    return sum;
  }
}
