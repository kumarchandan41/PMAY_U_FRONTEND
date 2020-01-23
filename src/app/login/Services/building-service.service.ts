import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
//import { States, Comp_Values, City, District, Charts, CLSS_Citywise_Values, JNReport, Demand, JNAtAGlance, CompAtAGlance, Login, FinYrWise_FinDataHouses, FinanceYrWiseHouses, FinDetails, phy_Fin_Graph, FinValue_Wise_Graph, CompMaster, CLSS_CityValues, PMAY_DATA, ComponentWiseDATA, PMAY_FinancialData, StateScore, FinancialProgress, getHFACodes, CLSS_Values, Designation, UserMaster, Demand_SanctionStateWise } from '../model/charts.model';
import { Alert } from 'selenium-webdriver';
//import { User } from '..Models/LoginModels.ts';
import { States, Designation, District, City, Charts, Comp_Values, CLSS_Citywise_Values, JNReport, CLSS_CityValues, PMAY_DATA, CompAtAGlance, FinYrWise_FinDataHouses, FinDetails, FinanceYrWiseHouses, phy_Fin_Graph, FinValue_Wise_Graph, PMAY_FinancialData, FinancialProgress, StateScore, UserMaster, Demand_SanctionStateWise, Demand, CompMaster, getHFACodes, ComponentWiseDATA, JNAtAGlance, CLSS_Values } from '../ModelS/chart.model';
import { Excelfile, ExcelSheet, Excel_CLSSCityWisefile, ExcelfilePhyDash, Excel_DemandCityWise, Excel_CLSSCityMain, Excel_PMAY_Data, Excel_JNNURN_Data, Excel_CLSSStateWisefile, Excel_clssMasterNew, Excel_Physical_Progress_Report_Data, Excel_ProjectDetail_Report_Data } from '../../DataUploads/excelfile';
import { LocationStrategy } from '@angular/common';
import { ConstantUrlService } from 'src/app/Shared/constant-url.service';
import { GlobalUrl } from 'src/app/Shared/GlobalUrl';
//
//type NewType = Excelfile;

@Injectable({
  providedIn: 'root'
})


export class BuildingServiceService {
  [x: string]: any;
    url_Upload:string;
    url1_Upload:string;
 //  url:string;
 //  url1:string;

  GetStateWiseFinYrDataNew(stateCode: any, DivisionCodes: any) {
    throw new Error("Method not implemented.");
  }
  CLSS_ValuesList(stateCode: any) {
    throw new Error("Method not implemented.");
  }

  

//url_Upload="http://10.196.69.102/hfa_api/api/Buldings/";
//url1_Upload ="http://10.196.69.102/hfa_api/API/RegistrationApi/";
//url_Upload="http://localhost:58396/api/Buldings/";
//url1_Upload ="http://localhost:58396/Employee_API/API/RegistrationApi/";



//      url="http://10.196.69.102/Employee_API/api/Buldings/";
//      url1 ="http://10.196.69.102/Employee_API/API/RegistrationApi/";


// url="http://localhost/hfa_api/api/Buldings/";
// url1 ="http://localhost/hfa_api/API/RegistrationApi/";
  
//   url="http://localhost:58396/api/Buldings/";
//   url1 ="http://localhost:58396/API/RegistrationApi/";
 

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
     constructor(private http:HttpClient, private locationStrategy: LocationStrategy,private constantUrlService: ConstantUrlService,private globalUrl:GlobalUrl) {
          this.url_Upload = this.globalUrl.urlIPAddess +"/api/Buldings/";
          this.url1_Upload= this.globalUrl.urlIPAddess + "/Employee_API/API/RegistrationApi/";

 
      }

     PriventBackButton()
     {
          history.pushState(null, null, location.href);
          this.locationStrategy.onPopState(() => {
          history.pushState(null, null, location.href);
          })
     }

     StateList(){
      //   alert( this.url_Upload);
         
     this.http.get(this.url_Upload + 'HFA_StateDetails').toPromise().then(result=>this.StateDetails= result as States[])
     }  
     
     StateListbyHFA_1(){
     return this.http.get(this.url_Upload + 'HFA_State_Details').toPromise().then(result=>this.StateDetails1= result as States[])
     } 

     StateListbyHFA_11():Observable<States[]>{
          return this.http.get<States[]>(this.url_Upload + 'HFA_State_Details');
     } 
     StateListbyHFA_12():Observable<States[]>{
          return this.http.get<States[]>(this.url_Upload + 'HFA_State_Details3');
     } 
     StateListbyHFA_13():Observable<States[]>{
          return this.http.get<States[]>(this.url_Upload + 'HFA_State_Details4');
     }
     StateListbyHFA_14():Observable<States[]>{
          return this.http.get<States[]>(this.url_Upload + 'HFA_State_Details5');
     }     

     StateListbyHFA_3(){
          this.http.get(this.url_Upload + 'HFA_State_Details3').toPromise().then(result=>this.StateDetails3= result as States[])
     }
     StateListbyHFA_4(){
          this.http.get(this.url_Upload + 'HFA_State_Details4').toPromise().then(result=>this.StateDetails4= result as States[])
     }
     
     StateListbyHFA_5(hfa:string){
          this.http.get(this.url_Upload + 'HFA_State_Details5/' + hfa).toPromise().then(result=>this.StateDetails5= result as States[])
     }  
     StateListbyHFA_51(){
          this.http.get(this.url_Upload + 'HFA_State_Details51').toPromise().then(result=>this.StateDetails51= result as States[])
     }  
     StateListDetails():Observable<States[]>{
          
     return this.http.get<States[]>(this.url_Upload + 'HFA_StateDetails');
     } 
     DesignationList(){
          this.http.get(this.url_Upload + 'HFA_DesignationDetails').toPromise().then(result=>this.DesignationDetails= result as Designation[])
     }  

     GetStateNameByCode(stateCodes:string)
     {
          //  alert(stateCodes);
          return this.http.get<States>(this.url_Upload + "GetStateNameById?stateCodes="+ stateCodes );
     }
     GetDisttNameByCode(stateCodes:string)
     {
          //  alert(stateCodes);
          return this.http.get<District>(this.url_Upload + "GetDisttNameById?disttCode="+ stateCodes );
     }
     GetCityNameByCode(CityCode:string)
     {
          //  alert(stateCodes);
          return this.http.get<City>(this.url_Upload + "GetCityNameById?cityCode="+ CityCode );
     }
     

     GetStateByDIvision(division:string)
     {
          return this.http.get<States[]>(this.url_Upload + "HFA_StateDetailsNew?division="+ division).toPromise().then(result=>this.StateDetails= result as States[]);
     }

     ChartDivByDiv(division:string)
     {
          // alert(division);
          return this.http.get<Charts>(this.url_Upload + "getChartByDivision?division="+ division );
     }

     AllCitiesList(){
          this.http.get(this.url_Upload + 'HFA_City_Details').toPromise().then(result=>this.CityDetails= result as City[])
     } 

     DisttList(stateName)
     {   
     return this.http.get<District[]>(this.url_Upload + "HFA_DisttDetails?stateCode="+ stateName).toPromise().then(result=>this.DisttDetails= result as District[]);
     }
     CityList(DisttName)
     {
     return this.http.get<City[]>(this.url_Upload + "HFA_CityDetails?dCode="+ DisttName).toPromise().then(result=>this.CityDetails= result as City[]);
     }

     CLSS_Values_List(stateName)  //CLSS_DetailsParam  
     {  
     // alert(stateName);   /////// 
     return this.http.get<CLSS_Values>(this.url_Upload + "CLSS_DetailsParam?stateCode="+ stateName);
     }
     CLSS_Values_ListNew(stateName,DivisionCodes:string)  //CLSS_DetailsParam  
     {  
     // alert(stateName);   /////// 
          return this.http.get<CLSS_Values>(this.url_Upload + "CLSS_DetailsParamNew?stateCode="+ stateName + "&Division=" + DivisionCodes);
     }
     // HFA_WeekRptSDCList(stateName,DisttName,CityName)   
     // {  
     //   return this.http.get<Charts>(this.url + "HFA_WeeklyReportsSDC?stateCode="+ stateName ?DisttName="+ DisttName?CityCode="+ CityName);
     // } //[sp_Cons_Values_SDC]   [PMAY_PROJECTS Copy$]
     
     HFACityWiseReportPMayList(stateCode,districtCode,CityCode):Observable<Charts>
     {
          return this.http.get<Charts>(this.url_Upload + "HFACityWiseReportPMay?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);
     }

     CLSSCityWiseReportPMayList(stateCode,districtCode,CityCode):Observable<CLSS_Citywise_Values>
     {
          return this.http.get<CLSS_Citywise_Values>(this.url_Upload + "HFA_Proc_CLSS_CityWise?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     } 
     
     CLSS_StateWiseReportPMayList(stateCode,division):Observable<CLSS_Values>
     {
          return this.http.get<CLSS_Values>(this.url_Upload + "HFA_Proc_CLSS_StateWise_New?stateCode="+ stateCode + "&division=" +division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }



     CLSSCityWiseReportPMayListNew(stateCode,districtCode,CityCode,division):Observable<CLSS_Citywise_Values>
     {
          return this.http.get<CLSS_Citywise_Values>(this.url_Upload + "HFA_Proc_CLSS_CityWise_New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&Division=" + division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }

     JNNURMCityWiseReportPMayList(stateCode,districtCode,CityCode):Observable<JNReport>
     {
          return this.http.get<JNReport>(this.url_Upload + "HFA_JNNURMCityWise?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     DemandCityWiseReportPMayList(stateCode,districtCode,CityCode):Observable<Demand>
     {
          return this.http.get<Demand>(this.url_Upload + "HFA_DemandCityWise?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     JNNURMCityWiseAtAGlance(stateCode,districtCode,CityCode):Observable<JNAtAGlance>
     {
          return this.http.get<JNAtAGlance>(this.url_Upload + "HFA_JNNURM_AtaGlance?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     HFA_JNNURN_AtAGlanceNew(stateCode,districtCode,CityCode,division):Observable<JNAtAGlance>
     {
          return this.http.get<JNAtAGlance>(this.url_Upload + "HFA_JNNURN_AtAGlanceNew?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&division=" + division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     
     CompAtAGlance(stateCode,districtCode,CityCode):Observable<CompAtAGlance>
     {
     //alert(stateCode);
          return this.http.get<CompAtAGlance>(this.url_Upload + "HFA_Component_AtaGlance?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     CompRAYAtAGlance(stateCode,districtCode,CityCode):Observable<CompAtAGlance>
     {
     //alert(stateCode);
          return this.http.get<CompAtAGlance>(this.url_Upload + "HFA_RAY_AtaGlance?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }

     CompRAYAtAGlanceNew(stateCode,districtCode,CityCode,division):Observable<CompAtAGlance>
     {
     //alert(stateCode);
          return this.http.get<CompAtAGlance>(this.url_Upload + "HFA_RAY_AtAGlance_New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&division=" + division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     CompISSRAtAGlance(stateCode,districtCode,CityCode):Observable<CompAtAGlance>
     {
     //alert(stateCode);
          return this.http.get<CompAtAGlance>(this.url_Upload + "HFA_ISSR_AtAGlance?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     CompISSRAtAGlanceNew(stateCode,districtCode,CityCode,division):Observable<CompAtAGlance>
     {
     //alert(stateCode);
          return this.http.get<CompAtAGlance>(this.url_Upload + "HFA_ISSR_AtAGlance_New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode+ "&division=" + division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     CompAHPAtAGlance(stateCode,districtCode,CityCode):Observable<CompAtAGlance>
     {
     //alert(stateCode);
          return this.http.get<CompAtAGlance>(this.url_Upload + "HFA_AHP_AtAGlance?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     CompAHPAtAGlanceNew(stateCode,districtCode,CityCode,division):Observable<CompAtAGlance>
     {
     //alert(stateCode);
          return this.http.get<CompAtAGlance>(this.url_Upload + "HFA_AHP_AtAGlance_New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode+ "&division=" + division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     CompBLCSAtAGlanceNew(stateCode,districtCode,CityCode,division):Observable<CompAtAGlance>
     {
     //alert(stateCode);
          return this.http.get<CompAtAGlance>(this.url_Upload + "HFA_BLCS_AtAGlance_New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode+ "&division=" + division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     CompBLCSAtAGlance(stateCode,districtCode,CityCode):Observable<CompAtAGlance>
     {
     //alert(stateCode);
          return this.http.get<CompAtAGlance>(this.url_Upload + "HFA_BLCS_AtAGlance?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FinYrWiseFinDataHouse(stateCode,districtCode,CityCode):Observable<FinYrWise_FinDataHouses>
     {// 3 a
          return this.http.get<FinYrWise_FinDataHouses>(this.url_Upload + "HFA_sp_PMayFinYrData?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     
     
     CompBar(stateCode,districtCode,CityCode):Observable<FinDetails[]>
     {
     //alert(stateCode);
          return this.http.get<FinDetails[]>(this.url_Upload + "Test?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     //  Login(login: Login):Observable<any>{
     //   const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'}) };
     //   return this.http.post<Login>(this.url + 'API/Register/Login' ,login,httpOptions)
     // }

     FinanceYr_HousesList(stateName)   
     {  
          return this.http.get<FinanceYrWiseHouses>(this.url_Upload + "HFA_HousingDetails?stateCode="+ stateName);
     }
     
     
     FIN_PHY_Houses1415(stateCode,districtCode,CityCode):Observable<phy_Fin_Graph>
     {
          return this.http.get<phy_Fin_Graph>(this.url_Upload + "HFA_sp_PhyFin14_15Data?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }

     FIN_PHY_Houses1516(stateCode,districtCode,CityCode):Observable<phy_Fin_Graph>
     {
          return this.http.get<phy_Fin_Graph>(this.url_Upload + "HFA_sp_PhyFin15_16Data?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_PHY_Houses1617(stateCode,districtCode,CityCode):Observable<phy_Fin_Graph>
     {
          return this.http.get<phy_Fin_Graph>(this.url_Upload + "HFA_sp_PhyFin16_17Data?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_PHY_Houses1718(stateCode,districtCode,CityCode):Observable<phy_Fin_Graph>
     {
          return this.http.get<phy_Fin_Graph>(this.url_Upload + "HFA_sp_PhyFin17_18Data?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }

     FIN_PHY_Houses1819(stateCode,districtCode,CityCode):Observable<phy_Fin_Graph>
     {
          return this.http.get<phy_Fin_Graph>(this.url_Upload + "HFA_sp_PhyFin18_19Data?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }

     FIN_Houses1415(stateCode,districtCode,CityCode):Observable<FinValue_Wise_Graph>
     {
          return this.http.get<FinValue_Wise_Graph>(this.url_Upload + "HFA_sp_FinYr_1415?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Houses1516(stateCode,districtCode,CityCode):Observable<FinValue_Wise_Graph>
     {
          return this.http.get<FinValue_Wise_Graph>(this.url_Upload + "HFA_sp_FinYr_1516?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Houses1617(stateCode,districtCode,CityCode):Observable<FinValue_Wise_Graph>
     {
          return this.http.get<FinValue_Wise_Graph>(this.url_Upload + "HFA_sp_FinYr_1617?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Houses1718(stateCode,districtCode,CityCode):Observable<FinValue_Wise_Graph>
     {
          return this.http.get<FinValue_Wise_Graph>(this.url_Upload + "HFA_sp_FinYr_1718?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Houses1819(stateCode,districtCode,CityCode):Observable<FinValue_Wise_Graph>
     {
          return this.http.get<FinValue_Wise_Graph>(this.url_Upload + "HFA_sp_FinYr_1819?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     getComponent():Observable<CompMaster[]>
     {
     return this.http.get<CompMaster[]>(this.url_Upload + "GETComponent");
     }
     getHFA_Details():Observable<getHFACodes[]>
     {
     return this.http.get<getHFACodes[]>(this.url_Upload + "GET_HFACodes");
     }
     //HFA_sp_PMay_CompWise **********
     HFACityComp_WiseReportPMayList(stateCode,districtCode,CityCode,cid):Observable<Charts>
     {
          return this.http.get<Charts>(this.url_Upload + "HFA_sp_PMay_CompWise?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode+ "&cid=" + cid);
     }
     HFA_sp_CLSS_CompWise(stateCode,districtCode,CityCode):Observable<CLSS_CityValues>
     {
     //stateCode="0";
     //districtCode="0";
     //CityCode="0";
          return this.http.get<CLSS_CityValues>(this.url_Upload + "HFA_sp_CLSS_CompWise?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode);
     }
     // New Comp Wise service
     HFACompWiseReportPMayList(stateCode:string,dcode:string,CityCode:string,Comp:string):Observable<PMAY_DATA>
     {
          return this.http.get<PMAY_DATA>(this.url_Upload + "SendCompPMAY?stateCode="+ stateCode + "&distrcitCode=" +dcode + "&cityCode=" + CityCode + "&cid=" + Comp);
     }
     HFACompWiseReportPMayList_Div(StateCode:string,dcode:string,CityCode:string,Comp:string,DivisionCodes:string ):Observable<PMAY_DATA>
     {
          // alert(Comp);
          return this.http.get<PMAY_DATA>(this.url_Upload + "SendCompPMAY_new?StateCode="+ StateCode + "&dcode=" +dcode + "&cityCode=" + CityCode + "&Cid=" + Comp + "&Division=" + DivisionCodes);
     }

     //2
     DemandCompWiseReportPMayList(stateCode,districtCode,CityCode,Comp:string):Observable<Demand>
     {
          return this.http.get<Demand>(this.url + "HFA_DemandCityWise?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     DemandDynamicReport(stateCode,districtCode,CityCode,Comp:string):Observable<Demand>
     {
          //alert(Comp);
          return this.http.get<Demand>(this.url_Upload + "DemandDynamic?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
 
     ComponentWiseSanction(stateCode,districtCode,CityCode,Comp:string):Observable<ComponentWiseDATA>
     {
          //alert(Comp);  ComponentWise_Sanct
          return this.http.get<ComponentWiseDATA>(this.url_Upload + "Sanctioned_Dynamic?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Data1415(stateCode,districtCode,CityCode,Comp:string):Observable<PMAY_FinancialData>
     {
          return this.http.get<PMAY_FinancialData>(this.url_Upload + "SendFinance_Data14_15?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Data1516(stateCode,districtCode,CityCode,Comp:string):Observable<PMAY_FinancialData>
     {
          return this.http.get<PMAY_FinancialData>(this.url_Upload + "SendFinance_Data15_16?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Data1617(stateCode,districtCode,CityCode,Comp:string):Observable<PMAY_FinancialData>
     {
          return this.http.get<PMAY_FinancialData>(this.url_Upload + "SendFinance_Data16_17?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Data1718(stateCode,districtCode,CityCode,Comp:string):Observable<PMAY_FinancialData>
     {
          return this.http.get<PMAY_FinancialData>(this.url_Upload + "SendFinance_Data17_18?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Data1819(stateCode,districtCode,CityCode,Comp:string):Observable<PMAY_FinancialData>
     {
          return this.http.get<PMAY_FinancialData>(this.url_Upload + "SendFinance_Data18_19?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Data1920(stateCode,districtCode,CityCode,Comp:string):Observable<PMAY_FinancialData>
     {
          return this.http.get<PMAY_FinancialData>(this.url_Upload + "SendFinance_Data19_20?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     ServiceStateScore(stateCode):Observable<StateScore>
     {
          debugger;
     //  alert(stateCode);
          return this.http.get<StateScore>(this.url_Upload + "HFA_StateWiseScore?stateCode="+ stateCode ); 
     }
     ServiceStateScoreNew(stateCode ,Division):Observable<StateScore>
     {
          // debugger;
       //   alert(stateCode);
          return this.http.get<StateScore>(this.url_Upload + "HFA_StateWiseScoreNew?stateCode="+ stateCode + "&Division=" +Division); 
     }

     FIN_Prog1415(stateCode,districtCode,CityCode,Comp:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url_Upload + "HFA_Finance_Progress14_15?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Prog1516(stateCode,districtCode,CityCode,Comp:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url_Upload + "HFA_Finance_Progress15_16?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }

     FIN_Prog1617(stateCode,districtCode,CityCode,Comp:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url_Upload + "HFA_Finance_Progress16_17?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }

     FIN_Prog1718(stateCode,districtCode,CityCode,Comp:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url_Upload + "HFA_Finance_Progress17_18?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }

     FIN_Prog1819(stateCode,districtCode,CityCode,Comp:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url_Upload + "HFA_Finance_Progress18_19?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Prog1920(stateCode,districtCode,CityCode,Comp:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url_Upload + "HFA_Finance_Progress19_20?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     // sector wise Report
     ComponentWisePopUp(stateCode:string,dcode:string,CityCode:string,Comp:string):Observable<PMAY_DATA>
     {
          return this.http.get<PMAY_DATA>(this.url_Upload + "SectorWiseReport?stateCode="+ stateCode + "&distrcitCode=" +dcode + "&cityCode=" + CityCode + "&cid=" + Comp);
     }

     Investment_StateWiseList(stateName)   
     {  
     return this.http.get<Demand_SanctionStateWise>(this.url_Upload + "Inv_Det_BasedOnState?stateCode="+ stateName);
     } 
     // for State Wise Demand
     GetStateWiseFinYrData(stateName)
     {
     return this.http.get<FinanceYrWiseHouses>(this.url_Upload + "GetStateWiseFinYrData?stateCode="+ stateName);
     }
     // for State Wise Demand
     GetStateWiseFinYrData_Div(stateName,Division)
     {
     return this.http.get<FinanceYrWiseHouses>(this.url_Upload + "GetStateWiseFinYrDataNew?stateCode="+ stateName + "&Division=" +Division);
     }
     GetStateWiseFinYrData_Div1(stateName,Division)
     {
     return this.http.get<FinanceYrWiseHouses>(this.url_Upload + "GetStateWiseFinYrDataNew1?stateCode="+ stateName + "&Division=" +Division);
     }
     GetCSMCStateWiseReport(stateName)
     {
     return this.http.get<StateScore[]>(this.url_Upload + "CSMC_StateWiseReport?stateCode="+ stateName);
     }
     GetCSMCStateWiseReportNew(stateName,Division)
     {
     return this.http.get<StateScore[]>(this.url_Upload + "CSMC_StateWiseReportNew?stateCode="+ stateName + "&Division=" +Division);
     }
     onLogin(UserName, Password)
     {    
          return this.http.get<Boolean>(this.url1_Upload + "LoginMaster?Username=" + UserName+ "&password=" + Password);
     }
     UserRegister(data:UserMaster)
     {
          const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
          return  this.http.post<string>(this.url_Upload + "UserRegister/", data,httpOptions);
     }
     ServiceUserAdminDetails():Observable<UserMaster[]>
     {
          return this.http.get<UserMaster[]>(this.url_Upload + "GetAllUsers"); 
     }
     GetCSMCState1Report(stateName)
     {
        return this.http.get<StateScore[]>(this.url_Upload + "GetScore1Details?stateCode="+ stateName);
     }
     GetCSMCState2Report(stateName)
     {
        return this.http.get<StateScore>(this.url_Upload + "GetScore2Details?stateCode="+ stateName);
     }
     FIN_Prog1415New(stateCode,districtCode,CityCode,Comp,Division:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url_Upload + "HFA_Finance_Progress14_15New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp + "&Division=" + Division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Prog1516New(stateCode,districtCode,CityCode,Comp,Division:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url_Upload + "HFA_Finance_Progress15_16New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp+ "&Division=" + Division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Prog1617New(stateCode,districtCode,CityCode,Comp,Division:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url_Upload + "HFA_Finance_Progress16_17New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp + "&Division=" + Division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Prog1718New(stateCode,districtCode,CityCode,Comp,Division:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url_Upload + "HFA_Finance_Progress17_18New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp + "&Division=" + Division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     FIN_Prog1819New(stateCode,districtCode,CityCode,Comp,Division:string):Observable<FinancialProgress>
     {
          return this.http.get<FinancialProgress>(this.url_Upload + "HFA_Finance_Progress18_19New?stateCode="+ stateCode + "&distrcitCode=" +districtCode + "&cityCode=" + CityCode + "&cid=" + Comp + "&Division=" + Division);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     GetCSMCStateCompDtWise(stateCode,component,cmsDate,csmcno):Observable<StateScore[]>
     {
          return this.http.get<StateScore[]>(this.url_Upload + "sp_CSMC_State_Comp_DtWise11?stateCode="+ stateCode + "&csmcno=" +csmcno + "&cSMCDate=" + cmsDate + "&Component=" + component );
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
          return  this.http.post<string>(this.url_Upload + "UploadExcel", formData,httpOptions);
     }
     GetExcelData():Observable<Excelfile[]>
     {
          return this.http.get<Excelfile[]>(this.url_Upload + "GetExcelDetails");//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     DeleteExcelDataById(id:string):Observable<string>
     {
          return this.http.get<string>(this.url_Upload + "DeleteExcelDetails?excelId="+ id );
     }
     
     GetExcelClssMaster_Details():Observable<Excel_clssMasterNew[]>
     {
          // new
          return this.http.get<Excel_clssMasterNew[]>(this.url_Upload + "GetExcelClssMaster_Details");
     }


     ReadExcelSheet():Observable<ExcelSheet[]>
     {
          return this.http.get<ExcelSheet[]>(this.url_Upload + "ReadExcelSheet");
     }
     
     ReadPhyProgressSheet():Observable<ExcelSheet[]>
     {
          return this.http.get<ExcelSheet[]>(this.url_Upload + "GetExcel_Physical_Progress_Report");
     }

     ReadJNNURM_ExcelSheet():Observable<ExcelSheet[]>
     {
          return this.http.get<ExcelSheet[]>(this.url_Upload + "GetExcelJNNURM_Details");
     }
     //--------------------------------------- CLSS
     DeleteClssStateWise_ExcelDataById(id:string):Observable<string>
     {
          return this.http.get<string>(this.url_Upload + "DeleteExcelCLSSMaster?excelId="+ id );
     }
     DeleteClssCityWise_ExcelDataById(id:string):Observable<string>
     {
          return this.http.get<string>(this.url_Upload + "DeleteCLSS_ExcelDetails?excelId="+ id );
     }
     
     ReadClssCityWise_ExcelSheet():Observable<Excel_CLSSCityWisefile[]>
     {
          return this.http.get<Excel_CLSSCityWisefile[]>(this.url_Upload + "ReadExcelSheet");
     }
     GetClssCityWise_ExcelData():Observable<Excel_CLSSCityWisefile[]>
     {
          return this.http.get<Excel_CLSSCityWisefile[]>(this.url_Upload + "GetExcelCLSSDetails");//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     UploadClssCityWise_Excel(formData:FormData):Observable<string>
     {  
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
     //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url_Upload + "UploadExcel_CLSS", formData,httpOptions);
     }
    // DeleteSCore_ExcelDetails
    //--------------------------------------
    UploadScore_Excel(formData:FormData):Observable<string>
    {  // testTable bulk insert
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
     //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url_Upload + "UploadExcel", formData,httpOptions);
    }
    GetExcelScore_Data():Observable<StateScore[]>
    {
         return this.http.get<StateScore[]>(this.url_Upload + "GetExcelScoreDetails");
    }
    ExcelDataById(id:string):Observable<Excelfile>
    {
          return this.http.get<Excelfile>(this.url_Upload + "GetDetailsById?Id="+ id );
    }
    ExcelPMAY_DataById(SrNo:string):Observable<Excel_PMAY_Data>
    {
          return this.http.get<Excel_PMAY_Data>(this.url_Upload + "GetExcelPMAY_ById?SrNo="+ SrNo );
    }    
    UpdateExcel(excelfile:any):Observable<boolean>
    {
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
     return this.http.put<boolean>(this.url_Upload + '/UpdateExcelDetails/',  
     excelfile, httpOptions);  
    }
     //--------------------------------------
    BulkImportExcelScore():Observable<ExcelSheet[]>
    {  // ?
          return this.http.get<ExcelSheet[]>(this.url_Upload + "ReadExcelCLSSSheet");
    }
    BulkImportSScoreUploadExcel(formData:FormData):Observable<string>
    {  
           // Bulk insert to table statescore tblStateWiseScoreExcel
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url_Upload + "UploadExcel_StateWiseScore", formData,httpOptions);
    }
    BulkImportPDExcel(formData:FormData):Observable<string>
    {  
           // Bulk insert to table statescore tblStateWiseScoreExcel
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url_Upload + "UploadPDashboard_Excel", formData,httpOptions);
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
          return  this.http.post<string>(this.url_Upload + "UploadPDashboard_Excel", formData,httpOptions);
    }
    GetExcel_PHYDashData():Observable<ExcelfilePhyDash[]>
    {
          return this.http.get<ExcelfilePhyDash[]>(this.url_Upload + "GetPDashboard_ExcelDetails");//.toPromise().then(result=>this.ChartDetail= result as Charts);
    }
    DeletePD_ExcelDataById(id:string):Observable<string>
    {
           return this.http.get<string>(this.url_Upload + "DeleteExcelPD_Details?excelId="+ id );
    }
    

    DeletePhyProg_ExcelDataById(id:string):Observable<string>
    {
          return this.http.get<string>(this.url_Upload + "DeletePhysicalProgressReport_Details?excelId="+ id );
    }
    BulkImportClssCityMainExcel1(formData:FormData):Observable<string>
    {  
           // Bulk insert to table statescore tblStateWiseScoreExcel
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url_Upload + "UploadExcelDemandCityWise", formData,httpOptions);
    }
    GetExcelClssCityMain():Observable<Excel_CLSSCityMain[]>
    {
         return this.http.get<Excel_CLSSCityMain[]>(this.url_Upload + "GetCLSS_MainMaster_ExcelVM");
    }
    BulkImport_PMayExcel(formData:FormData):Observable<string>
    {  
        //  alert(this.url_Upload);
           // Bulk insert to table statescore tblStateWiseScoreExcel
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url_Upload + "UploadPMay_Excel", formData,httpOptions);
     }

    BulkImport_PROJECT_DetailExcel(formData:FormData):Observable<string>
    {  
        //  alert(this.url_Upload);
           // Bulk insert to table statescore tblStateWiseScoreExcel
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url_Upload + "UploadProjectDetail_Excel", formData,httpOptions);
     }

    BulkImport_PhyProg_Excel(formData:FormData):Observable<string>
    {  
       //   alert(this.url_Upload);
           // Bulk insert 
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url_Upload + "UploadPhyProgressReport_Excel", formData,httpOptions);
    }


     GetExcel_PMayData():Observable<Excel_PMAY_Data[]>
     {
          return this.http.get<Excel_PMAY_Data[]>(this.url_Upload + "GetExcelPMAYDetails");//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     
     GetExcel_Physical_Progress_Report_Data():Observable<Excel_Physical_Progress_Report_Data[]>
     {
          return this.http.get<Excel_Physical_Progress_Report_Data[]>(this.url_Upload + "GetExcel_Physical_Progress_Report");//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }

     GetExcel_Projct_Details_Report():Observable<Excel_ProjectDetail_Report_Data[]>
     {
          return this.http.get<Excel_ProjectDetail_Report_Data[]>(this.url_Upload + "GetExcel_Projct_Details_Report");//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     

//--------------------------- new Data Start
     BulkImport_ClssMainNewExcel(formData:FormData):Observable<string>
    {  
        //  alert('AA');
           // Bulk insert to table statescore tblStateWiseScoreExcel
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url_Upload + "UploadPMay_Excel", formData,httpOptions);
     }
     GetExcel_ClssMainData():Observable<Excel_clssMasterNew[]>
     {
          return this.http.get<Excel_clssMasterNew[]>(this.url_Upload + "GetExcelPMAYDetails");//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
//--------------------------- new Data End

     BulkImportDemandCityExcel(formData:FormData):Observable<string>
     {  
            // Bulk insert to table statescore tblStateWiseScoreExcel
           let headers = new  HttpHeaders();
           headers.append('Content-Type','multipart/form-data');
           headers.append('Accept','application/json');
           //new HttpHeaders({ 'Content-Type': 'application/json'}) 
           const httpOptions = { headers: headers};  
           return  this.http.post<string>(this.url_Upload + "UploadExcelDemandCityWise", formData,httpOptions);
     }
     GetExcelDemandCity_Data():Observable<Excel_DemandCityWise[]>
     {
          return this.http.get<Excel_DemandCityWise[]>(this.url_Upload + "GetDemandCityDetails");
     }
     DeleteDemandCity_ExcelDataById(id:string):Observable<string>
     {
           return this.http.get<string>(this.url_Upload + "DeleteExcelDemandCity_Details?excelId="+ id );
     }
     BulkImportClssCityMainExcel(formData:FormData):Observable<string>
     {  
            // Bulk insert to table statescore tblStateWiseScoreExcel
           let headers = new  HttpHeaders();
           headers.append('Content-Type','multipart/form-data');
           headers.append('Accept','application/json');
           //new HttpHeaders({ 'Content-Type': 'application/json'}) 
           const httpOptions = { headers: headers};  
           return  this.http.post<string>(this.url_Upload + "UploadCLSS_MainMaster_Excel", formData,httpOptions);
     }
     GetExcelClssMainCity_Data():Observable<Excel_CLSSCityMain[]>
     {
          return this.http.get<Excel_CLSSCityMain[]>(this.url_Upload + "GetCLSS_MainMaster_ExcelVM");
     }
     DeleteClssMainCity_ExcelDataById(id:string):Observable<string>
     {
           return this.http.get<string>(this.url_Upload + "DeleteExcelCLSSMainCity_Details?excelId="+ id );
     }

     DeleteExcelClssMainCityById(id:string):Observable<string>
     {
           return this.http.get<string>(this.url_Upload + "DeleteExcelScore_Details?excelId="+ id );
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
          return  this.http.post<string>(this.url_Upload + "UploadJNNURM_Excel", formData,httpOptions);
     }
     GetExcelSheet_JNNURM():Observable<Excel_JNNURN_Data[]>
     {
         // alert('aa');
          return this.http.get<Excel_JNNURN_Data[]>(this.url_Upload + "GetExcelJNNURM_Details");
     }
     
     DeleteTableDCU():Observable<string>
     {
          return this.http.get<string>(this.url_Upload + "DeleteTableDCU");
     }
     DeleteTableJNNURM():Observable<string>
     {
          return this.http.get<string>(this.url_Upload + "DeleteTableJNNURM");
     }
     DeleteTablePMAY():Observable<string>
     {
          return this.http.get<string>(this.url_Upload + "DeleteTablePMAY");
     }

     DeleteTableProjDetail():Observable<string>
     {
          return this.http.get<string>(this.url_Upload + "Del_ProjectDetail");
     }

     

      // ok
     DeleteTable_PhyProgressReport():Observable<string>
     {
          return this.http.get<string>(this.url_Upload + "DeleteTable_PhyProgressReport");
     }
     DeleteScore_ExcelDataById(id:string):Observable<string>
     {
          return this.http.get<string>(this.url_Upload + "DeleteExcelScore_Details?excelId="+ id );
     }

     Del_ProjectProgress():Observable<string>
     {
          return this.http.get<string>(this.url_Upload + "Del_ProjectProgress");
     }


     

     DeleteTableStateScore():Observable<string>
     {
          return this.http.get<string>(this.url_Upload + "DeleteTableStateScore");
     }
     DeleteTablePD():Observable<string>
     {
          return this.http.get<string>(this.url_Upload + "DeleteTablePD");
     }
     DeleteTableCLSS_CityWise():Observable<string>
     {
          return this.http.get<string>(this.url_Upload + "DeleteTableCLSS_CityWise");
     }
     // clss_master
     UploadClssStateWise_Excel(formData:FormData):Observable<string>
     {  
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
     //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url_Upload + "UploadExcelCLSSMaster", formData,httpOptions);
     }
     GetClssStateWise_ExcelData():Observable<Excel_CLSSStateWisefile[]>
     {
          return this.http.get<Excel_CLSSStateWisefile[]>(this.url_Upload + "GetExcelCLSSStateMaster");//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     DeleteTableCLSS_StateWise():Observable<string>
     {
          return this.http.get<string>(this.url_Upload + "DeleteTableCLSS_StateWise");
     }
    // string stateCode, string , string  , string Cid ,string Div
     
     GetCLSS_Detail(stateCode,DisttCode ,cityCode ,Cid, division)
     {
         // alert(1);
           return this.http.get<Excel_CLSSCityMain>(this.url_Upload + "GetSDC_CDCLSS?stateCode="+ stateCode + "&dcode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid + "&Div=" +division);
     }
     GetJNNURM_Detail(stateCode,DisttCode ,cityCode ,Cid, Div)
     {
          //alert(1);
           return this.http.get<JNReport>(this.url_Upload + "HFA_JNNURMCity_Wise?stateCode="+ stateCode + "&dcode=" + DisttCode + "&cityCode=" + cityCode + "&Cid=" + Cid + "&Div=" +Div);
     }
     DemandDynamic_Report(stateCode,DisttCode,cityCode,DivisionCodes:string):Observable<Demand>
     {
      //alert(Comp);
           return this.http.get<Demand>(this.url_Upload + "Demand_CITY_DIVDynamic?stateCode="+ stateCode + "&distrcitCode=" +DisttCode + "&cityCode=" + cityCode + "&Div="  +DivisionCodes);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     DemandDynamic_Rept(stateCode,DisttCode,cityCode,DivisionCodes,Comp:string):Observable<Demand>
     {
      // alert('Comp');
           return this.http.get<Demand>(this.url_Upload + "Demand_Dynamic?stateCode="+ stateCode + "&distrcitCode=" +DisttCode + "&cityCode=" + cityCode + "&Div="  +DivisionCodes + "&DemandT="  +Comp);//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }
     PMayDataYearWise():Observable<PMAY_DATA>
     {
          return this.http.get<PMAY_DATA>(this.url_Upload + "sp_GetPmayFinYearData");
     }
     GetFinYearWiseCSMCReport()
     {
        return this.http.get<PMAY_DATA[]>(this.url_Upload + "sp_CSMC_AllIndiaWise_Result");
     }
     GetFinYearWise_Houses_StatusReport()
     {
        return this.http.get<PMAY_DATA[]>(this.url_Upload + "sp_Houses_Status");
     }   
     UpdateUserDetails(data:Excel_PMAY_Data):Observable<boolean>
     {
          const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
          return this.http.put<boolean>(this.url_Upload + '/UpdateUserDetails/',  
          data, httpOptions);  
     }
  // 11 Jan 2019
  BulkImport_ReleaseFundFlowExcel(formData:FormData):Observable<string>
  {  
     let headers = new HttpHeaders(); 
  
     headers.append('Content-Type', 'application/json');   
     const httpOptions = { headers: headers };  
   
        return  this.http.post<string>(this.url_Upload + "UploadPrjRelFunfFlow_Excel/", formData,httpOptions);
   }     


   BulkImport_ClssMain_StateWiseExcel(formData:FormData):Observable<string>
   {  
       //  alert('AA');
          // Bulk insert to table statescore tblStateWiseScoreExcel
         let headers = new  HttpHeaders();
         headers.append('Content-Type','multipart/form-data');
         headers.append('Accept','application/json');
         //new HttpHeaders({ 'Content-Type': 'application/json'}) 
         const httpOptions = { headers: headers};  
         return  this.http.post<string>(this.url_Upload + "UploadCLSS_Masternew_Excel", formData,httpOptions);
    }
    //

    GetExcel_ClssMainStateWise():Observable<Excel_clssMasterNew[]>
     {
          return this.http.get<Excel_clssMasterNew[]>(this.url_Upload + "GetExcel_CLSSMasterStateWiseDetails");//.toPromise().then(result=>this.ChartDetail= result as Charts);
     }

     // DeleteClssStateWise_ExcelDataById(id:string):Observable<string>
     // {
     //      return this.http.get<string>(this.url_Upload + "DeleteExcelCLSSMaster?excelId="+ id );
     // }

     // Project_fund_Release
     BulkImport_Project_fund_Rel(formData:FormData):Observable<string>
    {  
        //  alert(this.url_Upload);
           // Bulk insert to table statescore tblStateWiseScoreExcel
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          //new HttpHeaders({ 'Content-Type': 'application/json'}) 
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url_Upload + "UploadProject_FundRel_Excel", formData,httpOptions);
     }

     // Project_fund_Release HFA
    BulkImport_Project_HFAfund_Rel(formData:FormData):Observable<string>
    {  
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url_Upload + "UploadHFA_FundRel_Excel", formData,httpOptions);
     }

    BulkImport_Project_SCSPfund_Rel(formData:FormData):Observable<string>
    {  
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url_Upload + "UploadSCSP_FundRel_Excel", formData,httpOptions);
    }
     
    UploadTSP_FundRel_Excel(formData:FormData):Observable<string>
    {  
          let headers = new  HttpHeaders();
          headers.append('Content-Type','multipart/form-data');
          headers.append('Accept','application/json');
          const httpOptions = { headers: headers};  
          return  this.http.post<string>(this.url_Upload + "UploadTSP_FundRel_Excel", formData,httpOptions);
    }

    DeleteTableFundRel():Observable<string>
     {
        
          return this.http.get<string>(this.url_Upload + "DeleteTableFundRelease");
     }
    
}