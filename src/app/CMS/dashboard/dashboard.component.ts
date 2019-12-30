import { Component, OnInit } from '@angular/core';
import { PdashBoard } from 'src/app/financeReport/model/chart';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/financeReport/service/graph.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  Sanctioned: string;
  Grounded: string;
  Completed: string;
  Occupied: string;
  sCommitted: string;
  Approved: string;
  Released: string;
  Utilized: string;
  Overall: string;
  sPublic: string;
  Private: string;
  PDaysDirect: string;
  PDaysIndirect: string;
  PDaysTotal: string;
  JobsDirect: string;
  JobsIndirect: string;
  JobsTotal: string;
  Tdashboard : PdashBoard ;

  constructor(private router: Router, public service: GraphService) { 

  }

  ngOnInit() {
  }
  Save()
  {
    if(this.Sanctioned =="" || this.Grounded =="" || this.Completed=="" || this.Occupied ==""  || this.sCommitted ==""){
      return;
    }

     this.Tdashboard =new PdashBoard();
     this.Tdashboard.Sanctioned = this.Sanctioned;
     this.Tdashboard.Grounded = this.Grounded;
     this.Tdashboard.Completed = this.Completed;
     this.Tdashboard.Occupied = this.Occupied;
     this.Tdashboard.sCommitted = this.sCommitted;
     this.Tdashboard.Approved = this.Approved;
     this.Tdashboard.Released = this.Released;
     this.Tdashboard.Utilized = this.Utilized;
     this.Tdashboard.Overall = this.Overall;
     this.Tdashboard.sPublic = this.sPublic;
     this.Tdashboard.Private = this.Private;
     this.Tdashboard.PDaysDirect = this.PDaysDirect;
     this.Tdashboard.PDaysIndirect = this.PDaysIndirect;
     this.Tdashboard.PDaysTotal = this.PDaysTotal;
     this.Tdashboard.JobsDirect = this.JobsDirect;
     this.Tdashboard.JobsIndirect = this.JobsIndirect;
     this.Tdashboard.JobsTotal = this.JobsTotal;     
   
    
     this.service.SaveDashboard(this.Tdashboard).subscribe(result => {
       alert(result);
     });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
       if (!pattern.test(inputChar)) {
       // invalid character, prevent input
           event.preventDefault();
      }
 }
}
