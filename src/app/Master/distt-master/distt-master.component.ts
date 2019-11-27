import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/Shared/url.service';
import { States, District, DistrictMaster } from 'src/app/Shared/CommonModel';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { string } from '@amcharts/amcharts4/core';


@Component({
  selector: 'app-distt-master',
  templateUrl: './distt-master.component.html',
  styleUrls: ['./distt-master.component.css']
})
export class DisttMasterComponent implements OnInit {
  searchText;
  StateName:string;
  Codes:string;
  Division:string;
  stateMaster:States[];

  DisttName:string;
  DisttMaster:DistrictMaster[];
  //-----------------------------------
  DistrictName:string;
  Active:string;
  StateCode:string;
  Dcode:string;
  BackwardDistrict: string;
  Minority: string;
  Distt:string;
  ActiveFlag:string;
  //-----------------------------------
  action:string ;
  display='none';
  StateMessage: string;
  SaveUpdate:string;
  DisttId:string;

  constructor(private urlService:UrlService,public service: GraphService) {
    this.StateMessage = "Select State";
  }
  ngOnInit() {
    this.Division="--Select--";
    this.action="Save";
    this.Active="Active";
    this.SaveUpdate="Save District";
    this.LoadStateDetails();
    this.LoadDisttDetails();
    this.service.StateList();
  }
  LoadStateDetails()
  {
    this.urlService.GetStateMasterList().subscribe(result=>{
      this.stateMaster=result;
          })
  }
  LoadDisttDetails()
  {
      this.urlService.GetAllDistrictList().subscribe(result=>{
      this.DisttMaster=result;
          })
  }

  getStateDetails(strateCode)
  {
    debugger;
if(strateCode != "")
{



    this.StateCode = strateCode;   
    this.urlService.GetAllDistrictList().subscribe(result=>{
      this.DisttMaster=result.filter(a=>a.StateCode===strateCode);
          })
        }
  }
  getDistDetails(textValue)
  {
   
   
    this.urlService.GetAllDistrictList().subscribe(result=>{
      this.DisttMaster=result.filter(a=>a.District===textValue);
          })
  }


  RistrictQuot()
  {
    this.Distt=this.Distt.replace(/['"]/g, '');
  }
  SaveDataDistt()
  { 
    //alert(10);
    if(this.StateCode !="" && this.DistrictName !="")
    {
      debugger;
      let tempA=this.action;
      if(tempA=="Save")
      {
      //  this.Dcode ="100";
        this.ActiveFlag ="1";
        this.urlService.SaveDisttData(this.StateCode, this.Distt,this.DistrictName,this.Dcode,this.Active,this.Minority,this.BackwardDistrict,this.ActiveFlag).subscribe(result =>{
        this.LoadDisttDetails();
      //  alert(result);
        });
      }
      else{
        this.urlService.UpdateDistrict(this.DisttId ,this.StateCode, this.Distt,this.DistrictName,this.Dcode,this.Active,this.Minority,this.BackwardDistrict).subscribe(result =>{
          this.LoadDisttDetails();
          this.action="Save";
        //  alert(result);
        });
      }
      this.display='none';
      this.ResetState();
    }
  }

  ResetState()
  {
    this.Codes="";
    this.StateName="";
    this.Division="--Select--";
    this.action="Save";
  }
  openModalDialog(dist,saveUpdate){
    this.Active="Active";
    this.display='block';
    if(saveUpdate==="Save")
    {
this.SaveUpdate="Save District";
this.action="Save";
    }
    else
    {
      this.SaveUpdate="Update District";
      this.action="Update";
      this.DisttId = dist.DisttId;
     this.StateCode = dist.StateCode;
    // alert(this.StateCode);
     this.Distt = dist.Distt;
     this.DistrictName = dist.District;
     this.Dcode = dist.Dcode;
     this.Minority = dist.Minority; 
      this.BackwardDistrict = dist.BackwardDistrict;
       this.ActiveFlag = dist.ActiveFlag;
       this.Active=dist.Status;
  
     
    }
  }
  closeModalDialog(){
    this.display='none';
  }
}
