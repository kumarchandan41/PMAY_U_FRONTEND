import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { RegistrationDATA } from 'src/app/financeReport/model/chart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-master',
  templateUrl: './users-master.component.html',
  styleUrls: ['./users-master.component.css']
})
export class UsersMasterComponent implements OnInit {
  p: any=0;
  lstUserDetails:RegistrationDATA[];
  constructor(private service:GraphService,private router:Router) { }
 // GetAllRegistration_Data
  ngOnInit() {
      this.service.GetAllRegistration_Data().subscribe(resut=>{
        this.lstUserDetails=resut;
      })
 }
  Update(data)
  {

   // alert(data.SrNo);
   // this.router.navigate(["/updatePMayData"],{queryParams:{ID:data.id}});
    this.router.navigate(["/Admin/EditUsers",{UserId:data.UserId}]);
  }
  Delete(data)
 {
    alert(data.UserId);
    
 }
}
