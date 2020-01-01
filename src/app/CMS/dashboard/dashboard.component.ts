import { Component, OnInit } from '@angular/core';
import { PdashBoard } from 'src/app/financeReport/model/chart';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { FormBuilder,Validators } from '@angular/forms';

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
  dashboardForm:any;
  constructor(private router: Router,private builderForm:FormBuilder, public service: GraphService) { 

  }
  ngOnInit() {
    this.dashboardForm=this.builderForm.group({
      Sanctioned: ['',[Validators.required]],
      Grounded: ['',[Validators.required]],
      Completed: ['',[Validators.required]],
      Occupied: ['',[Validators.required]],

      sCommitted: ['',[Validators.required]],
      Approved: ['',[Validators.required]],
      Released: ['',[Validators.required]],
      Utilized: ['',[Validators.required]],
      Overall: ['',[Validators.required]],
      sPublic: ['',[Validators.required]],

      Private: ['',[Validators.required]],
      PDaysDirect:['',[Validators.required]],
      PDaysIndirect: ['',[Validators.required]],
      PDaysTotal: ['',[Validators.required]],
      
      JobsDirect: ['',[Validators.required]],
      JobsIndirect: ['',[Validators.required]],
      JobsTotal: ['',[Validators.required]],
      Tdashboard : [''],

    })
      this.service.GetDasboardDataList().subscribe(result=>{
      this.dashboardForm.controls['Sanctioned'].setValue(result.Sanctioned);
      this.dashboardForm.controls['Grounded'].setValue(result.Grounded);
      this.dashboardForm.controls['Completed'].setValue(result.Completed);
      this.dashboardForm.controls['Occupied'].setValue(result.Occupied);
      this.dashboardForm.controls['sCommitted'].setValue(result.sCommitted);
      this.dashboardForm.controls['Approved'].setValue(result.Approved);
      this.dashboardForm.controls['Released'].setValue(result.Released);
      this.dashboardForm.controls['Utilized'].setValue(result.Utilized);
      this.dashboardForm.controls['Overall'].setValue(result.Overall);
      this.dashboardForm.controls['sPublic'].setValue(result.sPublic);
      this.dashboardForm.controls['Private'].setValue(result.Private);
      this.dashboardForm.controls['PDaysDirect'].setValue(result.PDaysDirect);
      this.dashboardForm.controls['PDaysIndirect'].setValue(result.PDaysIndirect);
      this.dashboardForm.controls['PDaysTotal'].setValue(result.PDaysTotal);
      this.dashboardForm.controls['JobsDirect'].setValue(result.JobsDirect);
      this.dashboardForm.controls['JobsIndirect'].setValue(result.JobsIndirect);
      this.dashboardForm.controls['JobsTotal'].setValue(result.JobsTotal);
    })
  }
  onFormSubmit(){
debugger;
    if(this.dashboardForm.invalid)
    {
      alert(2);
      return;
    }
    this.service.SaveDashboard(this.dashboardForm.value).subscribe(result => {
      alert(result);
    });
  }
  // Save()
  // {
  //   if(this.Sanctioned =="" || this.Grounded =="" || this.Completed=="" || this.Occupied ==""  || this.sCommitted ==""){
  //     return;
  //   }

  //    this.Tdashboard =new PdashBoard();
  //    this.Tdashboard.Sanctioned = this.Sanctioned;
  //    this.Tdashboard.Grounded = this.Grounded;
  //    this.Tdashboard.Completed = this.Completed;
  //    this.Tdashboard.Occupied = this.Occupied;
  //    this.Tdashboard.sCommitted = this.sCommitted;
  //    this.Tdashboard.Approved = this.Approved;
  //    this.Tdashboard.Released = this.Released;
  //    this.Tdashboard.Utilized = this.Utilized;
  //    this.Tdashboard.Overall = this.Overall;
  //    this.Tdashboard.sPublic = this.sPublic;
  //    this.Tdashboard.Private = this.Private;
  //    this.Tdashboard.PDaysDirect = this.PDaysDirect;
  //    this.Tdashboard.PDaysIndirect = this.PDaysIndirect;
  //    this.Tdashboard.PDaysTotal = this.PDaysTotal;
  //    this.Tdashboard.JobsDirect = this.JobsDirect;
  //    this.Tdashboard.JobsIndirect = this.JobsIndirect;
  //    this.Tdashboard.JobsTotal = this.JobsTotal;     
   
    
  //    this.service.SaveDashboard(this.Tdashboard).subscribe(result => {
  //      alert(result);
  //    });
  // }

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
