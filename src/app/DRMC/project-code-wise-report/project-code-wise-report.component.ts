import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminSandbox } from '../admin.sandbox';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-project-code-wise-report',
  templateUrl: './project-code-wise-report.component.html',
  styleUrls: ['./project-code-wise-report.component.css']
})
export class ProjectCodeWiseReportComponent implements OnInit {
  _CityCode = 0;
  @ViewChild('table', {static: false}) table: ElementRef;
  @ViewChild('content', {static: false}) content: ElementRef;
  constructor(private route: ActivatedRoute,public adminSandbox: AdminSandbox) { }


  ngOnInit() {

    this.route.params.subscribe(params => {
      this._CityCode = params['cityCode'];
     this.adminSandbox.getReportProjectCodeWise(this._CityCode);
    });
  }
  ExportToExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'ProjectWiseReport.xlsx');

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
  pdf() {
    var pdfsize = 'a0';
    var doc = new jsPDF('l','pt','A2',pdfsize);
    doc.autoTable({
      html: '#content',
      columnStyles: {
        0: {columnWidth: 40},
       /*  1: {columnWidth: 50},
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
      didDrawCell: function (reportProjectCodeWise) {
        if (reportProjectCodeWise.column.index === 5 && reportProjectCodeWise.cell.section === 'body') {
          
        }
      }
    });
    doc.save("ProjectWiseReport.pdf");
  }

 
  getProjectCostTotal(index: number) : number {

    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportProjectCodeWise.length; i++) {
      sum += this.adminSandbox.reportProjectCodeWise[i].ProjectCost;
    }
    return sum;
  }
  getCentralAssistanceTotal(index: number) : number {
   
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportProjectCodeWise.length; i++) {
      sum += this.adminSandbox.reportProjectCodeWise[i].CentralAssistance;
    }
    return sum;
  }
  getTotalHouseSanction(index: number) : number {
  
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportProjectCodeWise.length; i++) {
      sum += this.adminSandbox.reportProjectCodeWise[i].TotalSanction;
    }
    return sum;
  }
  getTotalGrounding(index: number) : number {
    
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportProjectCodeWise.length; i++) {
      sum += this.adminSandbox.reportProjectCodeWise[i].Grounding;
    }
    return sum;
  }
  getTotalProgressHouse(index: number) : number {
   
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportProjectCodeWise.length; i++) {
      sum += this.adminSandbox.reportProjectCodeWise[i].TotalProgressHouse;
    }
    return sum;
  }
  getTotalConstructionCompleted(index: number) : number {
  
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportProjectCodeWise.length; i++) {
      sum += this.adminSandbox.reportProjectCodeWise[i].ConstructionCompleted;
    }
    return sum;
  }
  getTotalTotalHouseOccupiedBeneficiary(index: number) : number {
 
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportProjectCodeWise.length; i++) {
      sum += this.adminSandbox.reportProjectCodeWise[i].TotalHouseOccupiedBeneficiary;
    }
    return sum;
  }
  getCentralAssistanceReleaseTotal(index: number) : number {
    
    let sum = 0;
    for(let i = 0; i < this.adminSandbox.reportProjectCodeWise.length; i++) {
      sum += this.adminSandbox.reportProjectCodeWise[i].Release;
    }
    return sum;
  }
}
