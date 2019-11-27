import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { States, District, City, DistrictMaster } from './CommonModel';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
 url="http://localhost:58396/Api/RegistrationApi/";
 urlHFA="http://localhost:58396/API/HFAMaster/";
 urlHFA1="http://localhost:58396/Api/Buldings/";

 

  
  constructor(private http:HttpClient) { }

  StateDetails : States[];

  DisttDetails : District[];
  CityDetails  : City[];
  StateListDetails():Observable<States[]>{
    //debugger;
    let result=this.http.get<States[]>(this.url + 'Get_StateDetails');
    return result;
   }
   
   DisttList(stateName)
  {   
    return this.http.get<District[]>(this.url + "HFA_DisttDetails?stateCode="+ stateName);
  }
  CityList(DistCode)
  { 
    //alert(DistCode)
    return this.http.get<City[]>(this.url + "HFA_CityDetails?dCode="+ DistCode);
  }

  SaveStateData(StateName:string,StateCode:string,Division:string): Observable<string>
  {
    var data={
      StateName:StateName,
      StateCode:StateCode,
      Division:Division
    }
   
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
      return this.http.post<string>(this.urlHFA + 'InsertMasterData/',  
      data, httpOptions);  
  }  

    // objMaster.StateCode = data.StateCode;
    //             objMaster.District = data.District;
    //             objMaster.DisttId = data.DisttId;
    //             objMaster.Distt = data.Distt;
    //             objMaster.BackwardDistrict = data.BackwardDistrict;
    //             objMaster.Minority = data.Minority;
    //             objMaster.ActiveFlag = data.ActiveFlag;
    //             objMaster.Status = data.Status;
                
    //this.StateCode,this.DistrictName,this.Codes,this.Status,this.Minority,this.BackwardDistrict
  
  SaveDisttData(StateCode:string,Distt:string,DistrictName:string,Dcode:string,Status:string,Minority:string,BackwardDistrict:string,ActiveFlag:string): Observable<string>
  {
    var data={
       StateCode:StateCode,
       District:DistrictName,
       Dcode:Dcode,
       Distt:Distt,
       ActiveFlag :ActiveFlag,
       Status:Status,
       Minority:Minority,
       BackwardDistrict:BackwardDistrict
     }
      const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };  
      return this.http.post<string>(this.urlHFA1 + 'InsertDistt_MasterData/',  
      data, httpOptions);  
  }  

  UpdateDistrict(DisttId:string ,StateCode:string,Distt:string,DistrictName:string,Dcode:string,Status:string,Minority:string,BackwardDistrict:string): Observable<string>
  {
    var data={
      DisttId:DisttId,
       StateCode:StateCode,
       District:DistrictName,
       Dcode:Dcode,
       Distt:Distt,
       Status:Status,
       Minority:Minority,
       BackwardDistrict:BackwardDistrict
     }
      const httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };  
      return this.http.put<string>(this.urlHFA1 + 'UpdateDistt_MasterData/',  
      data, httpOptions);  
  } 
  
  UpdateStateData(StateName:string,StateCode:string,Division:string): Observable<string>
  {
      var data={
        StateName:StateName,
        StateCode:StateCode,
        Division:Division
      }
     
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
        return this.http.post<string>(this.urlHFA + 'UpdateStateData/',  
        data, httpOptions);  
  }   
    GetStateMasterList():Observable<States[]>
    {   //GetMasterData
      return this.http.get<States[]>(this.urlHFA + "GetMasterData");
    }
    GetDisttMasterList():Observable<States[]>
    {   //GetMasterData
      return this.http.get<States[]>(this.urlHFA + "GetDisttData");
    }
    GetAllDistrictList():Observable<DistrictMaster[]>
    {   //GetMasterData
      return this.http.get<DistrictMaster[]>(this.urlHFA + "GetAllDisttData");
    }

    GetAllCityList():Observable<City[]>
    {   //GetMasterData
      return this.http.get<City[]>(this.urlHFA + "GetAllCityData");
    }
        
  
}
