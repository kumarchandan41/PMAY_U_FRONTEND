import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AdminSandbox } from '../admin.sandbox';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-state-wise',
  templateUrl: './report-state-wise.component.html',
  styleUrls: ['./report-state-wise.component.css']
})
export class ReportStateWiseComponent implements OnInit {
  state: string;
 
  @ViewChild('table', {static: false}) table: ElementRef;
  @ViewChild('content', {static: false}) content: ElementRef;
  constructor(private fb: FormBuilder,public adminSandbox: AdminSandbox) { }

  ngOnInit() {
    this.state = '';
    this.adminSandbox.getStateData();
    this.adminSandbox.getReportStateWise();
    this.adminSandbox.reportState=[];
    this.adminSandbox.reportDistrict=[];
    this.adminSandbox.reportCity=[];
    this.adminSandbox.reportStateDistrictCityWise=[];
    this.adminSandbox.reportStateDistrictWise=[];
    this.adminSandbox.reportProjectCodeWise=[];
  }
 
  pdf() {
  
    var pdfsize = 'a0';
    var doc = new jsPDF('l','pt','A2',pdfsize);
    doc.autoTable({
      html: '#content', 
      columnStyles: {
       /*  0: {columnWidth: 40},
        1: {columnWidth: 50},
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
    
      didDrawCell: function (reportStateWise) {
        if (reportStateWise.column.index === 12 && reportStateWise.cell.section === 'body') {
         
        }
      }
    });
    doc.save("StateWiseReport.pdf");
  }
  ExportToExcel()
    {
      const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, 'StateWiseReport.xlsx');

    }
 
  getNumberOfProjectTotal(index: number) : number {

    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateWise.length; i++) {
      sum += this.adminSandbox.reportStateWise[i].NumberofProject;
    }
    return sum;
  }
  getProjectCostTotal(index: number) : number {
  
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateWise.length; i++) {
      sum += this.adminSandbox.reportStateWise[i].ProjectCost;
    }
    return sum;
  }
  getCentralAssistanceTotal(index: number) : number {
   
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateWise.length; i++) {
      sum += this.adminSandbox.reportStateWise[i].CentralAssistance;
    }
    return sum;
  }
  getTotalHouseSanction(index: number) : number {
  
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateWise.length; i++) {
      sum += this.adminSandbox.reportStateWise[i].TotalSanction;
    }
    return sum;
  }
  getTotalGrounding(index: number) : number {
  
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateWise.length; i++) {
      sum += this.adminSandbox.reportStateWise[i].Grounding;
    }
    return sum;
  }
  getTotalProgressHouse(index: number) : number {
  
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateWise.length; i++) {
      sum += this.adminSandbox.reportStateWise[i].TotalProgressHouse;
    }
    return sum;
  }
  getTotalConstructionCompleted(index: number) : number {
   
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateWise.length; i++) {
      sum += this.adminSandbox.reportStateWise[i].ConstructionCompleted;
    }
    return sum;
  }
  getTotalTotalHouseOccupiedBeneficiary(index: number) : number {
  
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateWise.length; i++) {
      sum += this.adminSandbox.reportStateWise[i].TotalHouseOccupiedBeneficiary;
    }
    return sum;
  }
  getCentralAssistanceReleaseTotal(index: number) : number {
   
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportStateWise.length; i++) {
      sum += this.adminSandbox.reportStateWise[i].Release;
    }
    return sum;
  }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
}
