import { Injectable } from '@angular/core';
import { States, Designation, District, City, Charts, Comp_Values, CLSS_Values, CLSS_Citywise_Values, JNReport, Demand, JNAtAGlance, CompAtAGlance, FinYrWise_FinDataHouses, FinDetails, FinanceYrWiseHouses, phy_Fin_Graph, FinValue_Wise_Graph, CompMaster, getHFACodes, ComponentWiseDATA, PMAY_FinancialData, FinancialProgress, StateScore, PMAY_DATA, Demand_SanctionStateWise, UserMaster, CLSS_CityValues, Houses_Status, StateWise_NewCLSS, RegistrationDATA, MapDATA, PMAY_DATA_New } from '../model/chart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocationStrategy } from '@angular/common';
import { Observable } from 'rxjs';
import { Excel_CLSSCityWisefile, Excelfile, Excel_PMAY_Data, ExcelSheet, Excel_CLSSCityMain, ExcelfilePhyDash, Excel_JNNURN_Data, Excel_CLSSStateWisefile, Excel_DemandCityWise } from '../model/excelfile';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  [x: string]: any;
  GetStateWiseFinYrDataNew(stateCode: any, DivisionCodes: any) {
    throw new Error("Method not implemented.");
  }
  CLSS_ValuesList(stateCode: any) {
    throw new Error("Method not implemented.");
  }
   //url="http://localhost:58396/api/Buldings/";
   //url1 ="http://localhost:58396/API/RegistrationApi/";

   url="http://10.196.69.102/hfa_api/api/Buldings/";
   url1 ="http://10.196.69.102/hfa_api/API/RegistrationApi/";
   


  StateDetails : States[];
  StateDetails1: States[];
  StateDetails3: States[];
  
  StateDetails4 : States[];
  StateDetails5 : States[];
  StateDetails51 : States[];

  DesignationDetails : Designation[];

  DisttDetails : District[];
  CityDetails  : City[];
  ChartDetail:Charts;
  ComponentData : Comp_Values[];

  constructor(private http:HttpClient, private locationStrategy: LocationStrategy) { }

PriventBackButton()
{
     history.pushState(null, null, location.href);
     this.locationStrategy.onPopState(() => {
       history.pushState(null, null, location.href);
     })
}

  StateList(){
    this.http.get(this.url + 'HFA_StateDetails').toPromise().then(result=>this.StateDetails= result as States[])
  }  
  
  StateListbyHFA_1(){
    return this.http.get(this.url + 'HFA_State_Details').toPromise().then(result=>this.StateDetails1= result as States[])
   } 

StateListbyHFA_11():Observable<States[]>{
     return this.http.get<States[]>(this.url + 'HFA_State_Details');
    } 
StateListbyHFA_12():Observable<States[]>{
   //  alert();
     return this.http.get<States[]>(this.url + 'HFA_State_Details3');
} 
StateListbyHFA_13():Observable<States[]>{
     return this.http.get<States[]>(this.url + 'HFA_State_Details4');
}
StateListbyHFA_14():Observable<States[]>{
     return this.http.get<States[]>(this.url + 'HFA_State_Details5');
    }     

   StateListbyHFA_3(){
     this.http.get(this.url + 'HFA_State_Details3').toPromise().then(result=>this.StateDetails3= result as States[])
   }
   StateListbyHFA_4(){
     this.http.get(this.url + 'HFA_State_Details4').toPromise().then(result=>this.StateDetails4= result as States[])
   }
   
   StateListbyHFA_5(hfa:string){
     this.http.get(this.url + 'HFA_State_Details5/' + hfa).toPromise().then(result=>this.StateDetails5= result as States[])
   }  
   StateListbyHFA_51(){
     this.http.get(this.url + 'HFA_State_Details51').toPromise().then(result=>this.StateDetails51= result as States[])
   }  
  StateListDetails():Observable<States[]>{
    return this.http.get<States[]>(this.url + 'HFA_StateDetails');
   } 
  DesignationList(){
     this.http.get(this.url + 'HFA_DesignationDetails').toPromise().then(result=>this.DesignationDetails= result as Designation[])
   }  

   GetStateNameByCode(stateCodes:string)
   {
      //  alert(stateCodes);
      return this.http.get<States>(this.url + "GetStateNameById?stateCodes="+ stateCodes );
   }
   GetDisttNameByCode(stateCodes:string)
   {
      //  alert(stateCodes);
      return this.http.get<District>(this.url + "GetDisttNameById?disttCode="+ stateCodes );
   }
   GetCityNameByCode(CityCode:string)
   {
      //  alert(stateCodes);
      return this.http.get<City>(this.url + "GetCityNameById?cityCode="+ CityCode );
   }
   

  GetStateByDIvision(division:string)
  {
     return this.http.get<States[]>(this.url + "HFA_StateDetailsNew?division="+ division).toPromise().then(result=>this.StateDetails= result as States[]);
  }

  ChartDivByDiv(division:string)
  {
      // alert(division);
     return this.http.get<Charts>(this.url + "getChartByDivision?division="+ division );
  }

  AllCitiesList(){
     this.http.get(this.url + 'HFA_City_Details').toPromise().then(result=>this.CityDetails= result as City[])
  } 

 
  AllCitiesListFor_Constutiency(DisttName)
  {
    return this.http.get<City[]>(this.url + "HFA_AllCityDetails?dCode="+ DisttName).toPromise().then(result=>this.CityDetails= result as City[]);
  }
  

  DisttList(stateName)
  {   
    return this.http.get<District[]>(this.url + "HFA_DisttDetails?stateCode="+ stateName).toPromise().then(result=>this.DisttDetails= result as District[]);
  }
  CityList(DisttName)
  {
    return this.http.get<City[]>(this.url + "HFA_CityDetails?dCode="+ DisttName).toPromise().then(result=>this.CityDetails= result as City[]);
  }

  CLSS_Values_List(stateName)
  {  
 
   return this.http.get<CLSS_Values>(this.url + "CLSS_DetailsParam?stateCode="+ stateName);
  }
  CLSS_Values_ListNew(stateName,DivisionCodes:string)  //CLSS_DetailsParam  
  {  

     return this.http.get<CLSS_Values>(this.url + "CLSS_DetailsParamNew?stateCode="+ stateName + "&Division=" + DivisionCodes);
  }

 HFACityWiseReportPMayList(stateCode,districtCode,CityCode):Observable<Charts>
 {
      return this.http.get<Charts>(this.url + "HFACityWiseReportPMay?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);
 }

 CLSSCityWiseReportPMayList(stateCode,districtCode,CityCode):Observable<CLSS_Citywise_Values>
 {
      return this.http.get<CLSS_Citywise_Values>(this.url + "HFA_Proc_CLSS_CityWise?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 } 
 
 CLSS_StateWiseReportPMayList(stateCode,division):Observable<CLSS_Values>
 {
      return this.http.get<CLSS_Values>(this.url + "HFA_Proc_CLSS_StateWise_New?stateCode="+ stateCode + "&division=" +division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }



 CLSSCityWiseReportPMayListNew(stateCode,districtCode,CityCode,division):Observable<CLSS_Citywise_Values>
 {
      return this.http.get<CLSS_Citywise_Values>(this.url + "HFA_Proc_CLSS_CityWise_New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&Division=" + division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }

 JNNURMCityWiseReportPMayList(stateCode,districtCode,CityCode):Observable<JNReport>
 {
      return this.http.get<JNReport>(this.url + "HFA_JNNURMCityWise?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 DemandCityWiseReportPMayList(stateCode,districtCode,CityCode):Observable<Demand>
 {
      return this.http.get<Demand>(this.url + "HFA_DemandCityWise?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 JNNURMCityWiseAtAGlance(stateCode,districtCode,CityCode):Observable<JNAtAGlance>
 {
      return this.http.get<JNAtAGlance>(this.url + "HFA_JNNURM_AtaGlance?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 HFA_JNNURN_AtAGlanceNew(stateCode,districtCode,CityCode,division):Observable<JNAtAGlance>
 {
      return this.http.get<JNAtAGlance>(this.url + "HFA_JNNURN_AtAGlanceNew?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&division=" + division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 
 CompAtAGlance(stateCode,districtCode,CityCode):Observable<CompAtAGlance>
 {
   //alert(stateCode);
      return this.http.get<CompAtAGlance>(this.url + "HFA_Component_AtaGlance?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 CompRAYAtAGlance(stateCode,districtCode,CityCode):Observable<CompAtAGlance>
 {
   //alert(stateCode);
      return this.http.get<CompAtAGlance>(this.url + "HFA_RAY_AtaGlance?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }

 CompRAYAtAGlanceNew(stateCode,districtCode,CityCode,division):Observable<CompAtAGlance>
 {
   //alert(stateCode);
      return this.http.get<CompAtAGlance>(this.url + "HFA_RAY_AtAGlance_New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&division=" + division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 CompISSRAtAGlance(stateCode,districtCode,CityCode):Observable<CompAtAGlance>
 {
   //alert(stateCode);
      return this.http.get<CompAtAGlance>(this.url + "HFA_ISSR_AtAGlance?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 CompISSRAtAGlanceNew(stateCode,districtCode,CityCode,division):Observable<CompAtAGlance>
 {
   //alert(stateCode);
      return this.http.get<CompAtAGlance>(this.url + "HFA_ISSR_AtAGlance_New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode+ "&division=" + division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 CompAHPAtAGlance(stateCode,districtCode,CityCode):Observable<CompAtAGlance>
 {
   //alert(stateCode);
      return this.http.get<CompAtAGlance>(this.url + "HFA_AHP_AtAGlance?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 CompAHPAtAGlanceNew(stateCode,districtCode,CityCode,division):Observable<CompAtAGlance>
 {
   //alert(stateCode);
      return this.http.get<CompAtAGlance>(this.url + "HFA_AHP_AtAGlance_New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode+ "&division=" + division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 CompBLCSAtAGlanceNew(stateCode,districtCode,CityCode,division):Observable<CompAtAGlance>
 {
   //alert(stateCode);
      return this.http.get<CompAtAGlance>(this.url + "HFA_BLCS_AtAGlance_New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode+ "&division=" + division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 CompBLCSAtAGlance(stateCode,districtCode,CityCode):Observable<CompAtAGlance>
 {
   //alert(stateCode);
      return this.http.get<CompAtAGlance>(this.url + "HFA_BLCS_AtAGlance?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 FinYrWiseFinDataHouse(stateCode,districtCode,CityCode):Observable<FinYrWise_FinDataHouses>
 {// 3 a
      return this.http.get<FinYrWise_FinDataHouses>(this.url + "HFA_sp_PMayFinYrData?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 
 
 CompBar(stateCode,districtCode,CityCode):Observable<FinDetails[]>
 {
      return this.http.get<FinDetails[]>(this.url + "Test?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }

FinanceYr_HousesList(stateName)   
  {  
     return this.http.get<FinanceYrWiseHouses>(this.url + "HFA_HousingDetails?stateCode="+ stateName);
  }
  
   
  FIN_PHY_Houses1415(stateCode,districtCode,CityCode):Observable<phy_Fin_Graph>
 {
      return this.http.get<phy_Fin_Graph>(this.url + "HFA_sp_PhyFin14_15Data?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }

 FIN_PHY_Houses1516(stateCode,districtCode,CityCode):Observable<phy_Fin_Graph>
 {
      return this.http.get<phy_Fin_Graph>(this.url + "HFA_sp_PhyFin15_16Data?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 FIN_PHY_Houses1617(stateCode,districtCode,CityCode):Observable<phy_Fin_Graph>
 {
      return this.http.get<phy_Fin_Graph>(this.url + "HFA_sp_PhyFin16_17Data?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 FIN_PHY_Houses1718(stateCode,districtCode,CityCode):Observable<phy_Fin_Graph>
 {
      return this.http.get<phy_Fin_Graph>(this.url + "HFA_sp_PhyFin17_18Data?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }

 FIN_PHY_Houses1819(stateCode,districtCode,CityCode):Observable<phy_Fin_Graph>
 {
      return this.http.get<phy_Fin_Graph>(this.url + "HFA_sp_PhyFin18_19Data?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }

 FIN_Houses1415(stateCode,districtCode,CityCode):Observable<FinValue_Wise_Graph>
 {
      return this.http.get<FinValue_Wise_Graph>(this.url + "HFA_sp_FinYr_1415?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 FIN_Houses1516(stateCode,districtCode,CityCode):Observable<FinValue_Wise_Graph>
 {
      return this.http.get<FinValue_Wise_Graph>(this.url + "HFA_sp_FinYr_1516?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 FIN_Houses1617(stateCode,districtCode,CityCode):Observable<FinValue_Wise_Graph>
 {
      return this.http.get<FinValue_Wise_Graph>(this.url + "HFA_sp_FinYr_1617?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 FIN_Houses1718(stateCode,districtCode,CityCode):Observable<FinValue_Wise_Graph>
 {
      return this.http.get<FinValue_Wise_Graph>(this.url + "HFA_sp_FinYr_1718?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 FIN_Houses1819(stateCode,districtCode,CityCode):Observable<FinValue_Wise_Graph>
 {
      return this.http.get<FinValue_Wise_Graph>(this.url + "HFA_sp_FinYr_1819?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
getComponent():Observable<CompMaster[]>
{
  return this.http.get<CompMaster[]>(this.url + "GETComponent");
}
getHFA_Details():Observable<getHFACodes[]>
{
  return this.http.get<getHFACodes[]>(this.url + "GET_HFACodes");
}
//HFA_sp_PMay_CompWise **********
HFACityComp_WiseReportPMayList(stateCode,districtCode,CityCode,cid):Observable<Charts>
 {
      return this.http.get<Charts>(this.url + "HFA_sp_PMay_CompWise?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode+ "&cid=" + cid);
 }
 HFA_sp_CLSS_CompWise(stateCode,districtCode,CityCode):Observable<CLSS_CityValues>
 {
   //stateCode="0";
   //districtCode="0";
   //CityCode="0";
      return this.http.get<CLSS_CityValues>(this.url + "HFA_sp_CLSS_CompWise?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);
 }
 // New Comp Wise service
 HFACompWiseReportPMayList(stateCode:string,dcode:string,CityCode:string,Comp:string):Observable<PMAY_DATA>
 {
      return this.http.get<PMAY_DATA>(this.url + "SendCompPMAY?stateCode="+ stateCode + "&distrcitCode=" +dcode + "&cityCode=" + CityCode + "&cid=" + Comp);
 }
 HFACompWiseReportPMayList_Div(StateCode:string,dcode:string,CityCode:string,Comp:string,DivisionCodes:string ):Observable<PMAY_DATA>
 {
     // alert(Comp);
      return this.http.get<PMAY_DATA>(this.url + "SendCompPMAY_new?StateCode="+ StateCode + "&dcode=" +dcode + "&cityCode=" + CityCode + "&Cid=" + Comp + "&Division=" + DivisionCodes);
 }

 //2
 DemandCompWiseReportPMayList(stateCode,districtCode,CityCode,Comp:string):Observable<Demand>
 {
      return this.http.get<Demand>(this.url + "HFA_DemandCityWise?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 DemandDynamicReport(stateCode,districtCode,CityCode,Comp:string):Observable<Demand>
 {
      //alert(Comp);
      return this.http.get<Demand>(this.url + "DemandDynamic?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 
 ComponentWiseSanction(stateCode,districtCode,CityCode,Comp:string):Observable<ComponentWiseDATA>
 {
      //alert(Comp);  ComponentWise_Sanct
      return this.http.get<ComponentWiseDATA>(this.url + "Sanctioned_Dynamic?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 FIN_Data1415(stateCode,districtCode,CityCode,Comp:string):Observable<PMAY_FinancialData>
 {
      return this.http.get<PMAY_FinancialData>(this.url + "SendFinance_Data14_15?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 FIN_Data1516(stateCode,districtCode,CityCode,Comp:string):Observable<PMAY_FinancialData>
 {
      return this.http.get<PMAY_FinancialData>(this.url + "SendFinance_Data15_16?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 FIN_Data1617(stateCode,districtCode,CityCode,Comp:string):Observable<PMAY_FinancialData>
 {
      return this.http.get<PMAY_FinancialData>(this.url + "SendFinance_Data16_17?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 FIN_Data1718(stateCode,districtCode,CityCode,Comp:string):Observable<PMAY_FinancialData>
 {
      return this.http.get<PMAY_FinancialData>(this.url + "SendFinance_Data17_18?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 FIN_Data1819(stateCode,districtCode,CityCode,Comp:string):Observable<PMAY_FinancialData>
 {
      return this.http.get<PMAY_FinancialData>(this.url + "SendFinance_Data18_19?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 FIN_Data1920(stateCode,districtCode,CityCode,Comp:string):Observable<PMAY_FinancialData>
 {
      return this.http.get<PMAY_FinancialData>(this.url + "SendFinance_Data19_20?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
 ServiceStateScore(stateCode):Observable<StateScore>
 {
     // debugger;
    //  alert(stateCode);
      return this.http.get<StateScore>(this.url + "HFA_StateWiseScore?stateCode="+ stateCode ); 
 }
ServiceStateScoreNew(stateCode ,Division):Observable<StateScore>
{
      //debugger;
    //  alert(stateCode);
      return this.http.get<StateScore>(this.url + "HFA_StateWiseScoreNew?stateCode="+ stateCode + "&Division=" +Division); 
}

 FIN_Prog1415(stateCode,districtCode,CityCode,Comp:string):Observable<FinancialProgress>
 {
      return this.http.get<FinancialProgress>(this.url + "HFA_Finance_Progress14_15?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
 }
FIN_Prog1516(stateCode,districtCode,CityCode,Comp:string):Observable<FinancialProgress>
{
      return this.http.get<FinancialProgress>(this.url + "HFA_Finance_Progress15_16?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
}

FIN_Prog1617(stateCode,districtCode,CityCode,Comp:string):Observable<FinancialProgress>
{
      return this.http.get<FinancialProgress>(this.url + "HFA_Finance_Progress16_17?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
}

FIN_Prog1718(stateCode,districtCode,CityCode,Comp:string):Observable<FinancialProgress>
{
      return this.http.get<FinancialProgress>(this.url + "HFA_Finance_Progress17_18?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
}

FIN_Prog1819(stateCode,districtCode,CityCode,Comp:string):Observable<FinancialProgress>
{
      return this.http.get<FinancialProgress>(this.url + "HFA_Finance_Progress18_19?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
}
FIN_Prog1920(stateCode,districtCode,CityCode,Comp:string):Observable<FinancialProgress>
{
      return this.http.get<FinancialProgress>(this.url + "HFA_Finance_Progress19_20?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
}
 // sector wise Report
ComponentWisePopUp(stateCode:string,dcode:string,CityCode:string,Comp:string):Observable<PMAY_DATA>
{
      return this.http.get<PMAY_DATA>(this.url + "SectorWiseReport?stateCode="+ stateCode + "&distrcitCode=" +dcode + "&cityCode=" + CityCode + "&cid=" + Comp);
}

Investment_StateWiseList(stateName)   
{  
    return this.http.get<Demand_SanctionStateWise>(this.url + "Inv_Det_BasedOnState?stateCode="+ stateName);
} 
// for State Wise Demand
GetStateWiseFinYrData(stateName)
{
    return this.http.get<FinanceYrWiseHouses>(this.url + "GetStateWiseFinYrData?stateCode="+ stateName);
}
// for State Wise Demand
GetStateWiseFinYrData_Div(stateName,Division)
{
   return this.http.get<FinanceYrWiseHouses>(this.url + "GetStateWiseFinYrDataNew?stateCode="+ stateName + "&Division=" +Division);
}
GetStateWiseFinYrData_Div1(stateName,Division)
{
   return this.http.get<FinanceYrWiseHouses>(this.url + "GetStateWiseFinYrDataNew1?stateCode="+ stateName + "&Division=" +Division);
}
 GetCSMCStateWiseReport(stateName)
 {
    return this.http.get<StateScore[]>(this.url + "CSMC_StateWiseReport?stateCode="+ stateName);
 }
 GetCSMCStateWiseReportNew(stateName,Division)
 {
    return this.http.get<StateScore[]>(this.url + "CSMC_StateWiseReportNew?stateCode="+ stateName + "&Division=" +Division);
 }
 onLogin(UserName, Password)
 {    
     return this.http.get<Boolean>(this.url1 + "LoginMaster?Username=" + UserName+ "&password=" + Password);
 }
UserRegister(data:UserMaster)
{
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
     return  this.http.post<string>(this.url + "UserRegister/", data,httpOptions);
}
ServiceUserAdminDetails():Observable<UserMaster[]>
{
      return this.http.get<UserMaster[]>(this.url + "GetAllUsers"); 
}
     GetCSMCState1Report(stateName)
     {
        return this.http.get<StateScore[]>(this.url + "GetScore1Details?stateCode="+ stateName);
     }
     GetCSMCState2Report(stateName)
     {
        return this.http.get<StateScore>(this.url + "GetScore2Details?stateCode="+ stateName);
     }


     FIN_Prog1415New(stateCode,districtCode,CityCode,Comp,Division:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url + "HFA_Finance_Progress14_15New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp + "&Division=" + Division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Prog1516New(stateCode,districtCode,CityCode,Comp,Division:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url + "HFA_Finance_Progress15_16New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp+ "&Division=" + Division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Prog1617New(stateCode,districtCode,CityCode,Comp,Division:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url + "HFA_Finance_Progress16_17New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp + "&Division=" + Division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Prog1718New(stateCode,districtCode,CityCode,Comp,Division:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url + "HFA_Finance_Progress17_18New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp + "&Division=" + Division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Prog1819New(stateCode,districtCode,CityCode,Comp,Division:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url + "HFA_Finance_Progress18_19New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp + "&Division=" + Division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     GetCSMCStateCompDtWise(stateCode,component,cmsDate,csmcno):Observable<StateScore[]>
     {
          return this.http.get<StateScore[]>(this.url + "sp_CSMC_State_Comp_DtWise11?stateCode="+ stateCode + "&csmcno=" +csmcno + "&cSMCDate=" + cmsDate + "&Component=" + component );
     }
//----------------Test Table---------------------------------------------------
     UploadExcel(formData:FormData):Observable<string>
     {  
        //  alert('test');
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
     //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url + "UploadExcel", formData,httpOptions);
     }
     GetExcelData():Observable<Excelfile[]>
     {
          return this.http.get<Excelfile[]>(this.url + "GetExcelDetails");//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     DeleteExcelDataById(id:string):Observable<string>
     {
          return this.http.get<string>(this.url + "DeleteExcelDetails?excelId="+ id );
     }
     ReadExcelSheet():Observable<ExcelSheet[]>
     {
          return this.http.get<ExcelSheet[]>(this.url + "ReadExcelSheet");
     }
     //--------------------------------------- CLSS
     DeleteClssStateWise_ExcelDataById(id:string):Observable<string>
     {
          return this.http.get<string>(this.url + "DeleteExcelCLSSMaster?excelId="+ id );
     }
     DeleteClssCityWise_ExcelDataById(id:string):Observable<string>
     {
          return this.http.get<string>(this.url + "DeleteCLSS_ExcelDetails?excelId="+ id );
     }
     
     ReadClssCityWise_ExcelSheet():Observable<Excel_CLSSCityWisefile[]>
     {
          return this.http.get<Excel_CLSSCityWisefile[]>(this.url + "ReadExcelSheet");
     }
     GetClssCityWise_ExcelData():Observable<Excel_CLSSCityWisefile[]>
     {
          return this.http.get<Excel_CLSSCityWisefile[]>(this.url + "GetExcelCLSSDetails");//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     UploadClssCityWise_Excel(formData:FormData):Observable<string>
     {  
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url + "UploadExcel_CLSS", formData,httpOptions);
     }
    

//--------------------------------------
    UploadScore_Excel(formData:FormData):Observable<string>
    { 
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url + "UploadExcel", formData,httpOptions);
    }
    GetExcelScore_Data():Observable<StateScore[]>
    {
         return this.http.get<StateScore[]>(this.url + "GetExcelScoreDetails");
    }
    
    ExcelDataById(id:string):Observable<Excelfile>
    {
          return this.http.get<Excelfile>(this.url + "GetDetailsById?Id="+ id );
    }
    ExcelPMAY_DataById(SrNo:string):Observable<Excel_PMAY_Data>
    {
          return this.http.get<Excel_PMAY_Data>(this.url + "GetExcelPMAY_ById?SrNo="+ SrNo );
    }    
    UpdateExcel(excelfile:any):Observable<boolean>
    {
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
     return this.http.put<boolean>(this.url + '/UpdateExcelDetails/',  
     excelfile, httpOptions);  
    }
     //--------------------------------------
    BulkImportExcelScore():Observable<ExcelSheet[]>
    {  // ?
          return this.http.get<ExcelSheet[]>(this.url + "ReadExcelCLSSSheet");
    }
     BulkImportSScoreUploadExcel(formData:FormData):Observable<string>
     {  
           // Bulk insert to table statescore tblStateWiseScoreExcel
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url + "UploadExcel_StateWiseScore", formData,httpOptions);
     }

     BulkImportPDExcel(formData:FormData):Observable<string>
     {  
           // Bulk insert to table statescore tblStateWiseScoreExcel
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url + "UploadPDashboard_Excel", formData,httpOptions);
     }
 
     
     BulkImport_PhyDashExcel(formData:FormData):Observable<string>
     {  
         // alert('AA');
           // Bulk insert to table statescore tblStateWiseScoreExcel
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url + "UploadPDashboard_Excel", formData,httpOptions);
     }
     GetExcel_PHYDashData():Observable<ExcelfilePhyDash[]>
     {
          return this.http.get<ExcelfilePhyDash[]>(this.url + "GetPDashboard_ExcelDetails");//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     DeletePD_ExcelDataById(id:string):Observable<string>
     {
           return this.http.get<string>(this.url + "DeleteExcelPD_Details?excelId="+ id );
     }
     

    DeleteScore_ExcelDataById(id:string):Observable<string>
    {
          return this.http.get<string>(this.url + "DeleteExcelScore_Details?excelId="+ id );
    }
    
    BulkImportClssCityMainExcel1(formData:FormData):Observable<string>
    {  
           // Bulk insert to table statescore tblStateWiseScoreExcel
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url + "UploadExcelDemandCityWise", formData,httpOptions);
    }
    GetExcelClssCityMain():Observable<Excel_CLSSCityMain[]>
    {
         return this.http.get<Excel_CLSSCityMain[]>(this.url + "GetCLSS_MainMaster_ExcelVM");
    }
    BulkImport_PMayExcel(formData:FormData):Observable<string>
    {  
        //  alert('AA');
           // Bulk insert to table statescore tblStateWiseScoreExcel
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url + "UploadPMay_Excel", formData,httpOptions);
     }
     GetExcel_PMayData():Observable<Excel_PMAY_Data[]>
     {
          return this.http.get<Excel_PMAY_Data[]>(this.url + "GetExcelPMAYDetails");//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     BulkImportDemandCityExcel(formData:FormData):Observable<string>
     {  
            // Bulk insert to table statescore tblStateWiseScoreExcel
           let headers = new  HttpHeaders();
           headers.append('Content-Type','multipart/form-data');
           headers.append('Accept','application/json');
           //new HttpHeaders({ 'Content-Type': 'application/json'}) 
           const httpOptions = { headers: headers};  
           return  this.http.post<string>(this.url + "UploadExcelDemandCityWise", formData,httpOptions);
     }
     GetExcelDemandCity_Data():Observable<Excel_DemandCityWise[]>
     {
          return this.http.get<Excel_DemandCityWise[]>(this.url + "GetDemandCityDetails");
     }
     DeleteDemandCity_ExcelDataById(id:string):Observable<string>
     {
           return this.http.get<string>(this.url + "DeleteExcelDemandCity_Details?excelId="+ id );
     }
     BulkImportClssCityMainExcel(formData:FormData):Observable<string>
     {  
            // Bulk insert to table statescore tblStateWiseScoreExcel
           let headers = new  HttpHeaders();
           headers.append('Content-Type','multipart/form-data');
           headers.append('Accept','application/json');
           //new HttpHeaders({ 'Content-Type': 'application/json'}) 
           const httpOptions = { headers: headers};  
           return  this.http.post<string>(this.url + "UploadCLSS_MainMaster_Excel", formData,httpOptions);
     }
     GetExcelClssMainCity_Data():Observable<Excel_CLSSCityMain[]>
     {
          return this.http.get<Excel_CLSSCityMain[]>(this.url + "GetCLSS_MainMaster_ExcelVM");
     }
     DeleteClssMainCity_ExcelDataById(id:string):Observable<string>
     {
           return this.http.get<string>(this.url + "DeleteExcelCLSSMainCity_Details?excelId="+ id );
     }

     DeleteExcelClssMainCityById(id:string):Observable<string>
     {
           return this.http.get<string>(this.url + "DeleteExcelScore_Details?excelId="+ id );
     }
     BulkImport_JNNURMExcel(formData:FormData):Observable<string>
     {  
         // alert('AA');
           // Bulk insert to table statescore tblStateWiseScoreExcel
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url + "UploadJNNURM_Excel", formData,httpOptions);
     }
     GetExcelSheet_JNNURM():Observable<Excel_JNNURN_Data[]>
     {
         // alert('aa');
          return this.http.get<Excel_JNNURN_Data[]>(this.url + "GetExcelJNNURM_Details");
     }
     DeleteTableDCU():Observable<string>
     {
          return this.http.get<string>(this.url + "DeleteTableDCU");
     }
     DeleteTableJNNURM():Observable<string>
     {
          return this.http.get<string>(this.url + "DeleteTableJNNURM");
     }
     DeleteTablePMAY():Observable<string>
     {
          return this.http.get<string>(this.url + "DeleteTablePMAY");
     }
     DeleteTableStateScore():Observable<string>
     {
          return this.http.get<string>(this.url + "DeleteTableStateScore");
     }
     DeleteTablePD():Observable<string>
     {
          return this.http.get<string>(this.url + "DeleteTablePD");
     }
     DeleteTableCLSS_CityWise():Observable<string>
     {
          return this.http.get<string>(this.url + "DeleteTableCLSS_CityWise");
     }
     // clss_master
     UploadClssStateWise_Excel(formData:FormData):Observable<string>
     {  
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
     //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url + "UploadExcelCLSSMaster", formData,httpOptions);
     }
     GetClssStateWise_ExcelData():Observable<Excel_CLSSStateWisefile[]>
     {
          return this.http.get<Excel_CLSSStateWisefile[]>(this.url + "GetExcelCLSSStateMaster");//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     DeleteTableCLSS_StateWise():Observable<string>
     {
          return this.http.get<string>(this.url + "DeleteTableCLSS_StateWise");
     }
    // string stateCode, string , string  , string Cid ,string Div
     
     GetCLSS_Detail(stateCode,DisttCode ,cityCode ,Cid, division)
     {
         // alert(1);
           return this.http.get<Excel_CLSSCityMain>(this.url + "GetSDC_CDCLSS?stateCode="+ stateCode + "&dcode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid + "&Div=" +division);
     }
     GetJNNURM_Detail(stateCode,DisttCode ,cityCode ,Cid, Div)
     {
          //alert(1);
           return this.http.get<JNReport>(this.url + "HFA_JNNURMCity_Wise?stateCode="+ stateCode + "&dcode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid + "&Div=" +Div);
     }
     DemandDynamic_Report(stateCode,DisttCode,cityCode,DivisionCodes:string):Observable<Demand>
     {
      //alert(Comp);
           return this.http.get<Demand>(this.url + "Demand_CITY_DIVDynamic?stateCode="+ stateCode + "&distrcitCode=" +DisttCode + "&cityCode=" + cityCode + "&Div="  +DivisionCodes);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     DemandDynamic_Rept(stateCode,DisttCode,cityCode,DivisionCodes,Comp:string):Observable<Demand>
     {
      // alert('Comp');
           return this.http.get<Demand>(this.url + "Demand_Dynamic?stateCode="+ stateCode + "&distrcitCode=" +DisttCode + "&cityCode=" + cityCode + "&Div="  +DivisionCodes + "&DemandT="  +Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     PMayDataYearWise():Observable<PMAY_DATA>
     {
          return this.http.get<PMAY_DATA>(this.url + "sp_GetPmayFinYearData");
     }
     GetFinYearWiseCSMCReport()
     {
        return this.http.get<PMAY_DATA[]>(this.url + "sp_CSMC_AllIndiaWise_Result");
     }
     GetFinYearWise_Houses_StatusReport()
     {
        return this.http.get<PMAY_DATA[]>(this.url + "sp_Houses_Status");
     }
     FinYearHouses_Report(stateCode,DisttCode,cityCode) //:Observable<PMAY_DATA>
     {
           return this.http.get<PMAY_DATA[]>(this.url + "sp_Houses_StatusNew?stateCode="+ stateCode + "&DisttCode=" +DisttCode + "&cityCode=" + cityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     PMay_FinYearWiseReport()
     {
          return this.http.get<PMAY_DATA[]>(this.url + "PMay_FinYearWiseReport");
     }
     PMAY_FinYearHouses_Report(stateCode,DisttCode,cityCode) //:Observable<PMAY_DATA>
     {
           return this.http.get<PMAY_DATA[]>(this.url + "PMay_FinYearWiseReportNew?stateCode="+ stateCode + "&DisttCode=" +DisttCode + "&cityCode=" + cityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     GetStatusofHouses_Sanctioned(stateCode,DisttCode ,cityCode ,Cid):Observable<Houses_Status[]>
     {
         // alert(2);
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatusForComp?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid);
     }
     GetStatusofHouses_CompWise(Cid):Observable<Houses_Status[]>
     {
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatus_CompWise?Cid=" + Cid);
     }
     
     GetStatusofHouses_CompWiseNew(stateCode,DisttCode ,cityCode,Cid,FinYear):Observable<Houses_Status[]>
     {
          // Changes Made 
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatus_CompWiseNew?state_Code=" + stateCode  + "&dcode=" + DisttCode + "&cityCode=" + cityCode+ "&Cid=" + Cid + "&FinYear=" + FinYear);
     }


     sp_GetHousesStatus_ISSR_FinYearWise(stateCode,DisttCode ,cityCode,Cid,FinYear):Observable<Houses_Status[]>
     {
           // Changes Made 
           
            return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatus_ISSR_FinYearWise?stateCode=" + stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode+ "&Cid=" + Cid + "&FinYear=" + FinYear);
     }
     
     sp_GetHousesStatus_ISSR_2014_15(stateCode,DisttCode ,cityCode ,Cid):Observable<Houses_Status[]>
     {
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatus_ISSR_2014_15?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid);
     }
     sp_GetHousesStatus_ISSR_Wise(Cid):Observable<Houses_Status[]>
     {
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatus_ISSR_Wise?Cid=" + Cid);
     }
     sp_GetHousesStatus_ISSR_FinYear(stateCode,DisttCode ,cityCode ,Cid,finYear):Observable<Houses_Status[]>
     {
         // alert();
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatus_ISSR_FinYear?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid + "&finYear=" + finYear);
     }
     sp_GetHousesStatusForVertical(stateCode):Observable<Houses_Status[]>
     {
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatusForVertical?stateCode=" + stateCode);
     }     
     sp_GetHousesStatusForVerticalJN(stateCode,DisttCode ,cityCode):Observable<Houses_Status[]>
     {
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatusForVerticalJN?stateCode=" + stateCode+ "&DisttCode=" + DisttCode + "&cityCode=" + cityCode);
     }     
     GetCLSS_Houses_VerticalWise(stateCode):Observable<StateWise_NewCLSS[]>
     {
           return this.http.get<StateWise_NewCLSS[]>(this.url + "sp_CLSS_HousesStatusForVertical?stateCode=" + stateCode);
     }
     
     sp_GetHousesStatusFor2014_15(stateCode,DisttCode ,cityCode ,Cid):Observable<Houses_Status[]>
     {
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatusFor2014_15?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid);
     }
     sp_GetHousesStatusFor2015_16(stateCode,DisttCode ,cityCode ,Cid):Observable<Houses_Status[]>
     {
          // alert(Cid);
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatusFor2015_16?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid);
     }
     sp_GetHousesStatusFor2016_17(stateCode,DisttCode ,cityCode ,Cid):Observable<Houses_Status[]>
     {
         // alert(2);
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatusFor2016_17?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid);
     }
     sp_GetHousesStatusFor2017_18(stateCode,DisttCode ,cityCode ,Cid):Observable<Houses_Status[]>
     {
         // alert(2);
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatusFor2017_18?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid);
     }
     sp_GetHousesStatusFor2018_19(stateCode,DisttCode ,cityCode ,Cid):Observable<Houses_Status[]>
     {
         // alert(2);
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatusFor2018_19?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid);
     }
     sp_GetHousesStatusFor2019_20(stateCode,DisttCode ,cityCode ,Cid):Observable<Houses_Status[]>
     {
         // alert(2);
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatusFor2019_20?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid);
     }
     sp_GetHousesStatus_ISSR_2015_16(stateCode,DisttCode ,cityCode ,Cid):Observable<Houses_Status[]>
     {
         // alert(2);
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatus_ISSR_2015_16?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid);
     } 
     sp_GetHousesStatus_ISSR_2016_17(stateCode,DisttCode ,cityCode ,Cid):Observable<Houses_Status[]>
     {
         // alert(2);
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatus_ISSR_2016_17?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid);
     }
     sp_GetHousesStatus_ISSR_2017_18(stateCode,DisttCode ,cityCode ,Cid):Observable<Houses_Status[]>
     {
         // alert(2);
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatus_ISSR_2017_18?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid);
     }
     sp_GetHousesStatus_ISSR_2018_19(stateCode,DisttCode ,cityCode ,Cid):Observable<Houses_Status[]>
     {
         // alert(2);
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatus_ISSR_2018_19?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid);
     }
     sp_GetHousesStatus_ISSR_2019_20(stateCode,DisttCode ,cityCode ,Cid):Observable<Houses_Status[]>
     {
         // alert(2);
           return this.http.get<Houses_Status[]>(this.url + "sp_GetHousesStatus_ISSR_2019_20?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid);
     }
     sp_GetDetailsDataPopUp(stateCode,Cid ,finYear ,type):Observable<Houses_Status[]>
     {

           return this.http.get<Houses_Status[]>(this.url + "sp_GetDetailsDataPopUp?stateCode="+ stateCode + "&Cid=" + Cid + "&finYear=" + finYear + "&type=" + type);
     }
     GetFinancialPMAY_Data(stateCode,DisttCode ,cityCode ,Cid,finYear):Observable<Houses_Status[]>
     {
              return this.http.get<Houses_Status[]>(this.url + "GetFinancialPMAY_Data?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid + "&finYear=" + finYear);
     }
     GetFinancialISSR_Data(stateCode,DisttCode ,cityCode ,Cid,finYear):Observable<Houses_Status[]>
     {
              return this.http.get<Houses_Status[]>(this.url + "GetFinancialISSR_Data?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid + "&finYear=" + finYear);
     }    
     GetFinancialCLSS_Data(stateCode):Observable<Houses_Status[]>
     {
         // alert(stateCode);
              return this.http.get<Houses_Status[]>(this.url + "GetFinance_StatusForCLSS?stateCode="+ stateCode);
     }
     GetAllRegistration_Data():Observable<RegistrationDATA[]>
     {
         // alert(stateCode);
              return this.http.get<RegistrationDATA[]>(this.url + "GetAll_RegisterDetails");
     }
     GetStateMapData():Observable<MapDATA[]>
     {
         // alert(stateCode);
              return this.http.get<MapDATA[]>(this.url + "GetStateMapData");
     }
     sp_GetRayHouses(stateCode,DisttCode ,cityCode ,finYear):Observable<Houses_Status[]>
     {
         // alert(2);
           return this.http.get<Houses_Status[]>(this.url + "GetRayHouses?stateCode="+ stateCode + "&DisttCode=" + DisttCode + "&cityCode=" + cityCode + "&finYear=" + finYear);
     }
     //--------------- PMAY Start-----------------------
     sp_create_PMAY_DATACons(stateCode:string,DisttCode:string,cityCode:string,Comp:string):Observable<PMAY_DATA_New[]>
     {
          //alert(); 
            return this.http.get<PMAY_DATA_New[]>(this.url + "sp_create_PMAYDATA?stateCode="+ stateCode + "&dcode=" +DisttCode + "&CityCode=" + cityCode   + "&cid=" + Comp);
     }
     sp_create_PMAY_DATAConsNew(stateCode:string,DisttCode:string,cityCode:string,Fin_Year:string):Observable<PMAY_DATA_New[]>
     {
          //alert(); 
          debugger;
            return this.http.get<PMAY_DATA_New[]>(this.url + "sp_create_PMAYDATAFinYeraWise?stateCode="+ stateCode + "&dcode=" +DisttCode + "&CityCode=" + cityCode   + "&finYear=" + Fin_Year);
     }
     //--------------- PMAY end-----------------------`
    
     //---------------BLCS START------------------
     sp_create_BLC_AHP_DATA(stateCode:string,DisttCode:string,cityCode:string,Comp:string):Observable<PMAY_DATA_New[]>
     {
        //  alert(); 
          debugger;
            return this.http.get<PMAY_DATA_New[]>(this.url + "sp_create_BLC_AHP_DATA?stateCode="+ stateCode + "&dcode=" +DisttCode + "&CityCode=" + cityCode   + "&cid=" + Comp);
     }
     sp_create_BLC_DATANew(stateCode:string,DisttCode:string,cityCode:string,Fin_Year:string):Observable<PMAY_DATA_New[]>
     {
          debugger;
            return this.http.get<PMAY_DATA_New[]>(this.url + "sp_create_BLCS_DATAFinYeraWise?stateCode="+ stateCode + "&dcode=" +DisttCode + "&CityCode=" + cityCode   + "&finYear=" + Fin_Year);
     }
      //---------------BLCS END-------------------
      sp_create_ISSR_DATANew(stateCode:string,DisttCode:string,cityCode:string,Fin_Year:string):Observable<PMAY_DATA_New[]>
      {
           debugger;
             return this.http.get<PMAY_DATA_New[]>(this.url + "sp_create_ISSR_DATAFinYeraWise?stateCode="+ stateCode + "&dcode=" +DisttCode + "&CityCode=" + cityCode   + "&finYear=" + Fin_Year);
      }

     sp_create_AHP_DATANew(stateCode:string,DisttCode:string,cityCode:string,Fin_Year:string):Observable<PMAY_DATA_New[]>
     {
          debugger;
            return this.http.get<PMAY_DATA_New[]>(this.url + "sp_create_AHP_DATAFinYeraWise?stateCode="+ stateCode + "&dcode=" +DisttCode + "&CityCode=" + cityCode   + "&finYear=" + Fin_Year);
     }
     sp_create_ISSR_DATAFinYeraWise(stateCode:string,DisttCode:string,cityCode:string,Fin_Year:string):Observable<PMAY_DATA_New[]>
     {
          debugger;
            return this.http.get<PMAY_DATA_New[]>(this.url + "sp_create_ISSR_DATAFinYeraWise?stateCode="+ stateCode + "&dcode=" +DisttCode + "&CityCode=" + cityCode   + "&finYear=" + Fin_Year);
     }
     //------------------------------------------

     sp_create_ISSR_DATA(stateCode:string,DisttCode:string,cityCode:string,Comp:string):Observable<PMAY_DATA_New[]>
     {
          //alert(); 
            return this.http.get<PMAY_DATA_New[]>(this.url + "sp_create_ISSR_DATA?stateCode="+ stateCode + "&dcode=" +DisttCode + "&CityCode=" + cityCode   + "&cid=" + Comp);
     }

     sp_create_PMAY_Critical_DATA(stateCode:string,DisttCode:string,cityCode:string,Comp:string,FinYear:string):Observable<PMAY_DATA_New[]>
     {
        //  alert();   1
          debugger;
            return this.http.get<PMAY_DATA_New[]>(this.url + "sp_create_PMAYCriticalDATA?stateCode="+ stateCode + "&dcode=" +DisttCode + "&CityCode=" + cityCode   + "&cid=" + Comp + "&finYear=" + FinYear); 
     }

     sp_create_PMAY_Critical_FinYearWiseDATA(stateCode:string,DisttCode:string,cityCode:string,Fin_Year:string):Observable<PMAY_DATA_New[]>
     {
        // alert();  2 
          debugger;
            return this.http.get<PMAY_DATA_New[]>(this.url + "sp_create_CRITICAL_DATAFinYeraWise?stateCode="+ stateCode + "&dcode=" +DisttCode + "&CityCode=" + cityCode   + "&finYear=" + Fin_Year); 
     }
     

     sp_create__Grid_PMAY_Critical_DATA(stateCode:string,DisttCode:string,cityCode:string,Comp:string,FinYear:string):Observable<PMAY_DATA_New[]>
     {
        //  alert();   gRID dATA 
          debugger;
            return this.http.get<PMAY_DATA_New[]>(this.url + "sp_create_Grid_Critical_DATAFinYeraWise?stateCode="+ stateCode + "&dcode=" +DisttCode + "&CityCode=" + cityCode   + "&cid=" + Comp + "&finYear=" + FinYear); 
     }

}