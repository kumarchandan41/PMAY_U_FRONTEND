import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { RegistrationDATA } from 'src/app/financeReport/model/chart';

@Component({
  selector: 'app-users-master',
  templateUrl: './users-master.component.html',
  styleUrls: ['./users-master.component.css']
})
export class UsersMasterComponent implements OnInit {
  p: any=0;
  lstUserDetails:RegistrationDATA[];
  constructor(private service:GraphService) { }
 // GetAllRegistration_Data
  ngOnInit() {
this.service.GetAllRegistration_Data().subscribe(resut=>{
  this.lstUserDetails=resut;
})


  }
  Delete(data)
 {
    alert(data.UserId);
    
 }
}
