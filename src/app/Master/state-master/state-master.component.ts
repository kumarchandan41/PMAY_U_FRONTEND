import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/Shared/url.service';
import { States } from 'src/app/Shared/CommonModel';

@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.css']
})
export class StateMasterComponent implements OnInit {
  searchText;
  StateName:string;
  Codes:string;
  Division:string;
  stateMaster:States[];
  action:string;
  display='none';
  headerTitle:string;
  p:number;
  States_UT:any;
  
  
  constructor(private urlService:UrlService) {
   }
  ngOnInit() {
   this.Division="--Select--";
   this.action="Save";
    this.LoadStateDetails();
  }
  LoadStateDetails()
  {
    this.urlService.GetStateMasterList().subscribe(result=>{
      this.stateMaster=result;
          })
  }
  SaveData()
  { 
 
    if(this.StateName !="" && this.Codes !="" && this.Division !="")
    {
      debugger;
      let tempA=this.action;
      if(tempA=="Save")
      {
       this.urlService.SaveStateData(this.StateName,this.Codes,this.Division).subscribe(result =>{
        this.LoadStateDetails();
        alert(result);
        });
      }
      else{
        this.urlService.UpdateStateData(this.StateName,this.Codes,this.Division).subscribe(result =>{
          this.LoadStateDetails();
          this.action="Save";
          alert(result);
        });
      }
      this.ResetState();
    }
  }
  openModalDialog(state:any)
  {
    this.display='block';
    if(state =='save')
    {
        this.action="Save";
        this.headerTitle="Save State";
    }
    else{
      this.headerTitle="Update State";
      this.Codes=state.Codes;
      this.StateName=state.States_UT;
      this.Division=state.Division;
      this.action="Update";
    }  
  }
  ResetState()
  {
    alert(2);
    this.Codes="";
    this.StateName="";
    this.Division="--Select--";
    this.action="Save";
  }
 

 closeModalDialog(){
  this.display='none';
 }
}
