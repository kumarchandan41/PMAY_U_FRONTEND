 
import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/Shared/url.service';
import { States, District, DistrictMaster, City } from 'src/app/Shared/CommonModel';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { string } from '@amcharts/amcharts4/core';


@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.css']
})
export class CityMasterComponent implements OnInit {
  searchText;
  StateName:string;
  Codes:string;
  Division:string;
  stateMaster:States[];

  DisttName:string;
  DisttMaster:DistrictMaster[];

  CityMaster:City[];

  //-----------------------------------
  DistrictName:string;
  Status:string;
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

  stValue: string;
  distvalue: string;
  cityvalue: string;
  distValue: string;
  cityValue: string;
  DistrictMessage: string;
  CityMessage: string;
  Ground_TotalNew: any;


  constructor(private urlService:UrlService,public service: GraphService) {
    this.StateMessage = "Select State";
  }  
  ngOnInit() {
    this.Division="--Select--";
    this.action="Save";
    this.LoadStateDetails();
   // this.LoadDisttDetails();  
    this.LoadCityDetails();
    this.service.StateList();
  }
  LoadStateDetails()
  {
    this.urlService.GetStateMasterList().subscribe(result=>{
      this.stateMaster=result;
          })
  }
  LoadCityDetails()
  {
      this.urlService.GetAllCityList().subscribe(result=>{
      this.CityMaster=result;
          })
  }
  // LoadDisttDetails()
  // {
  //     this.urlService.GetAllDistrictList().subscribe(result=>{
  //     this.DisttMaster=result;
  //         })
  // }
  SaveData()
  { 
   // alert(1);
    if(this.StateName !="" && this.Codes !="" && this.Division !="")
    {
      debugger;
      let tempA=this.action;
      if(tempA=="Save")
      {
        this.urlService.SaveStateData(this.StateName,this.Codes,this.Division).subscribe(result =>{
        this.LoadStateDetails();
        //alert(result);
        });
      }
      else{
         this.urlService.UpdateStateData(this.StateName,this.Codes,this.Division).subscribe(result =>{
          this.LoadStateDetails();
          this.action="Save";
          //alert(result);
        });
      }
      this.ResetState();
    }
  }
  getStateDetails1(strateCode)
  {
    this.StateCode = strateCode;
  }

  getStateDetails(strateCode) {
    //alert(strateCode);
    this.StateCode = strateCode;
    if (strateCode == "0") {
      //  alert(stateCodes);
      this.distValue = "0";
      this.cityValue = "0";

      this.DistrictMessage = "Select District";
      this.service.DisttDetails = [];
      this.CityMessage = "Select City";
      this.service.CityDetails = [];

    //  this.DisabledCheckBox=false;
     // this.DivisionCodes ="HFA-1";

    }
    else {
      this.StateCode = strateCode;
      this.service.DisttList(strateCode);
    }
      //this.service.CityList(this.districtCodes);//
  }

  getDistrictDetails(DisttCode) {
    // alert(DisttCode);
  if (DisttCode == "0") {
      this.distValue = "0";
      this.cityValue = "0";
      this.DistrictMessage = "Select District"; // ?????????????????????
      //this.service.DisttDetails=[];
      this.CityMessage = "Select City";
      this.service.CityDetails = [];
  }
  else {
    //  this.districtCodes = DisttCode;
      this.service.CityList(DisttCode);
    //  this.service.HFACityWiseReportPMayList(this.stateCodes, this.districtCodes, this.cityCodes);
  }
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
        this.urlService.SaveDisttData(this.StateCode, this.Distt,this.DistrictName,this.Dcode,this.Status,this.Minority,this.BackwardDistrict,this.ActiveFlag).subscribe(result =>{
  //      this.LoadDisttDetails();
        alert(result);
        });
      }
      else{
        this.urlService.UpdateStateData(this.StateName,this.Codes,this.Division).subscribe(result =>{
    //      this.LoadDisttDetails();
          this.action="Save";
          alert(result);
        });
      }
      this.ResetState();
    }
  }
  EditState(state)
  {
    this.Codes=state.Codes;
    this.StateName=state.States_UT;
    this.Division=state.Division;
    this.action="Update";
  }
  ResetState()
  {
    alert(2);
    this.Codes="";
    this.StateName="";
    this.Division="--Select--";
    this.action="Save";
  }
  openModalDialog(){
    this.display='block';
  }
  closeModalDialog(){
    this.display='none';
  }
}
