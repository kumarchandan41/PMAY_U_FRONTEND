import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstantUrlService } from '../Shared/constant-url.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;
//   baseUrl = "http://localhost:58396/Api";
//baseUrl:string;
  baseUrl = "http://10.196.69.102/hfa_api/Api";


   apiUrl ="http://10.196.69.102/hfa_api/API/Authenticate/";
   apiUrlReg ="http://10.196.69.102/hfa_api/API/RegistrationApi/";
 
  constructor(
    private http: HttpClient,private constantUrlService: ConstantUrlService

  ) {

    this.baseUrl=this.constantUrlService.baseUrl;
   }

  //get api for scheme master
  getSchemeData(): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetSchemeData", { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }

  //post api for scheme master
  postSchemeData(postData: any): Observable<any> {
    return this.http.post(this.baseUrl + "/Admin_Value/SubmitSchemeData", postData, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response;
      })
      );
  }

  //delete api for scheme master
  deleteSchemeData(SchemeId: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/DeleteSchemeData/" + SchemeId, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response;
      })
      );
  }

  //update api for scheme master
  updateSchemeData(postData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseUrl + "/Admin_Value/UpdateSchemeData/", postData, httpOptions
    );
  }
  //get api for component master
  getSchemeComponentData(SchemeName: any): Observable<any> {
    
    return this.http.get(this.baseUrl + "/Admin_Value/GetComponentData/" + SchemeName, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //post api for component master
  postSchemeComponentData(postData: any): Observable<any> {
    return this.http.post(this.baseUrl + "/Admin_Value/SubmitSchemeComponentData", postData, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response;
      })
      );
  }
  //delete api for component master
  deleteSchemeComponentData(SchemeComponentId: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/DeleteSchemeComponentData/" + SchemeComponentId, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response;
      })
      );
  }
  //update api for component master
  updateSchemeComponentData(postData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseUrl + "/Admin_Value/UpdateSchemeComponentData/", postData, httpOptions
    );
  }
  //get api for state master
  getStateData(): Observable<any> {
    console.log(this.baseUrl + "/Admin_Value/GetStateData");
    return this.http.get(this.baseUrl + "/Admin_Value/GetStateData", { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //post api for state master
  postStateData(postData: any): Observable<any> {
    return this.http.post(this.baseUrl + "/Admin_Value/SubmitStateData", postData, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response;
      })
      );
  }
  //delete api for state master
  deleteStateData(StateId: any): Observable<any> {
   
    return this.http.get(this.baseUrl + "/Admin_Value/DeleteStateData/" + StateId, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response;
      })
      );
  }
  //update api for state master
  updateStateData(postData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseUrl + "/Admin_Value/UpdateStateData/", postData, httpOptions

    );
  }
  //get api for district master
  getDistrictData(StateCode: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetDistrictData/" + StateCode, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //post api for state master
  postDistrictData(postData: any): Observable<any> {
    return this.http.post(this.baseUrl + "/Admin_Value/SubmitDistrictData", postData, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response;
      })
      );
  }
  //delete api for state master
  deleteDistrictData(DistrictId: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/DeleteDistrictData/" + DistrictId, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response;
      })
      );
  }
  //update for district data
  updateDistrictData(postData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseUrl + "/Admin_Value/UpdateDistrictData/", postData, httpOptions

    );
  }
  //get api for constituency master
  getConsistuencyData(): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetConsistuencyData", { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //get api for constituency city master
  getCityConstituencyData(): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetCityConstituency", { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //post api for constituency master
  postConstituencyData(postData: any): Observable<any> {
    return this.http.post(this.baseUrl + "/Admin_Value/SubmitConstituencyData", postData, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //delete api for constituency master
  deleteConstituencyData(ConstituencyId: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/DeleteConstituencyData/" + ConstituencyId, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //update for constituency data
  updateConstituencyData(postData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseUrl + "/Admin_Value/UpdateConstituencyData/", postData, httpOptions
    );
  }
  //post api for city master
  postCityData(postData: any): Observable<any> {
    return this.http.post(this.baseUrl + "/Admin_Value/SubmitCityData", postData, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response;
      })
      );
  }
  //get api for city master
  getCityData(statecode: any, districtcode: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetCityData/" + statecode + '/' + districtcode, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }

  //delete api for city master
  deleteCityData(CityId: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/DeleteCityData/" + CityId, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response;
      })
      );
  }
  //update for city data
  updateCityData(postData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseUrl + "/Admin_Value/UpdateCityData/", postData, httpOptions

    );
  }
  //get district on behalf of state
  getStateDistrictData(StateCode: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetStateDistrictId/" + StateCode, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }

  //get district on behalf of state
  getDistrictCityData(DistrictCode: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetDistrictCityId/" + DistrictCode, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //get csmc number on behalf of city 
  getCSMCNumber(CityCode: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetCSMCNumber/" + CityCode, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //get projectname on behalf of csmcnumber 
  getProjectName(statecode: any, districtcode: any, citycode: any, csmcnumber: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetProjectHouses/" + statecode + '/' + districtcode + '/' + citycode + '/' + csmcnumber, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //get projectcode on behalf of projectname 
  getProjectCode(statecode: any, districtcode: any, citycode: any, csmcnumber: any, projectName: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetProjectCode/" + statecode + '/' + districtcode + '/' + citycode + '/' + csmcnumber + '/' + projectName, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //submit project details
  postProjectDetailsData(postData: any): Observable<any> {
    return this.http.post(this.baseUrl + "/Admin_Value/SubmitProjectDetails/", postData, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }

  //get api for project details
  getProjectDetailsData(statecode: any, districtcode: any, citycode: any, scheme: any, component: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetProjectDetailData/" + statecode + '/' + districtcode + '/' + citycode + '/' + scheme + '/' + component, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }

  //delete api for project details
  deleteProjectDetailData(ProjectId: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/DeleteProjectDetailData/" + ProjectId, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }

  //update for project details
  updateProjectDetailData(postData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseUrl + "/Admin_Value/UpdateProjectDetailData/", postData, httpOptions

    );
  }
  //update project code
  postProjectCodeData(postData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseUrl + "/Admin_Value/UpdateProjectCodeData/", postData, httpOptions);
  }

  //get api for scheme on behlf of component
  getProjectSchemeComponent(SchemeId: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetSchemeComponentId/" + SchemeId, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //get api for agency on behlf of city
  getAgencyData(CityCode: any): Observable<any> {
    console.log('CityCode---------->>>', CityCode)
    return this.http.get(this.baseUrl + "/Admin_Value/GetAgencyId/" + CityCode, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //post for agency master
  postAgencyDataData(postData: any): Observable<any> {
    return this.http.post(this.baseUrl + "/Admin_Value/SubmitAgencyData/", postData, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //update for agency master
  updateAgencyData(postData: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseUrl + "/Admin_Value/UpdateAgencyMasterData/", postData, httpOptions
    );
  }
  //post api physical progress data
  postPysicalProgressReport(postData: any): Observable<any> {

    return this.http.post(this.baseUrl + "/Admin_Value/SubmitPysicalProgressReport", postData, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }

  //get api for physical progress data
  getPhysicalProgressReport(): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetPysicalProgress", { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //update for project details
  updatePhysicalProgressReport(postData: any): Observable<any> {
    return this.http.post(this.baseUrl + "/Admin_Value/UpdatePysicalProgressReport/", postData, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }


  //---get total installment result of release fund flow----//
  getTotalReleaseFundFlow(projectCode: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetReleaseTotalInstallment/" + projectCode, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //---get report state wise----//
  getReportStateWise(): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetStateWiseReport", { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //----get report district wise----//
  getReportDistrictStateWise(StateCode: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetStateDistrictWiseReport/" + StateCode, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //----get report city wise----//
  getReportCityDistrictStateWise(DistrictCode: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetStateDistrictCityWiseReport/" + DistrictCode, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //----get report project Code wise----//
  getReportProjectCodeWise(CityCode: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetStateDistrictCityProjectWiseReport/" + CityCode, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }


  //post api for release fund Flow
  postReleaseFundFlowInstallment(postData: any): Observable<any> {

    return this.http.post(this.baseUrl + "/Admin_Value/SubmitReleaseFundFlowInstallmentWise", postData, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //get api for release fund Flow
  getReleaseFundFlow(statecode: any, districtcode: any, citycode: any, projectCode: any, radio: any): Observable<any> {

    return this.http.get(this.baseUrl + "/Admin_Value/GetReleaseFundFlow/" + statecode + '/' + districtcode + '/' + citycode + '/' + projectCode + '/' + radio, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //post api for uc submission
  postUCSubmission(postData: any): Observable<any> {

    return this.http.post(this.baseUrl + "/Admin_Value/SubmitUCSubmission", postData, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //get api for uc fund Flow
  getUCSubmission(statecode: any, districtcode: any, citycode: any, projectCode: any): Observable<any> {

    return this.http.get(this.baseUrl + "/Admin_Value/GetUCSubmission/" + statecode + '/' + districtcode + '/' + citycode + '/' + projectCode, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //---------------sum of release and uc-----------------///
  //get api for total release installment1
  getReleaseTotalIns1(projectCode: any, radio: any): Observable<any> {

    return this.http.get(this.baseUrl + "/Admin_Value/TotalReleaseInstallment1/" + projectCode + '/' + radio, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  getUCTotalIns1(projectCode: any, radio: any): Observable<any> {

    return this.http.get(this.baseUrl + "/Admin_Value/TotalUCInstallment1/" + projectCode + '/' + radio, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  getReleaseTotalIns2(projectCode: any, radio: any): Observable<any> {

    return this.http.get(this.baseUrl + "/Admin_Value/TotalReleaseInstallment2/" + projectCode + '/' + radio, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  getUCTotalIns2(projectCode: any, radio: any): Observable<any> {

    return this.http.get(this.baseUrl + "/Admin_Value/TotalUCInstallment2/" + projectCode + '/' + radio, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  getReleaseTotalIns3(projectCode: any, radio: any): Observable<any> {

    return this.http.get(this.baseUrl + "/Admin_Value/TotalReleaseInstallment3/" + projectCode + '/' + radio, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  getUCTotalIns3(projectCode: any, radio: any): Observable<any> {

    return this.http.get(this.baseUrl + "/Admin_Value/TotalUCInstallment3/" + projectCode + '/' + radio, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //----post api for release order-----//
  postReleasedOrder(file: File, data: string, sanction: any, state: any, amount: any, date: any, component: any): any {

    const formdata: FormData = new FormData();
    formdata.append('Image', file, file.name);
    formdata.append('Scheme', data);
    formdata.append('Sanction', sanction);
    formdata.append('State', state);
    formdata.append('Amount', amount);
    formdata.append('Date', date);
    formdata.append('Component', component)

    return this.http.post(this.baseUrl + "/Admin_Value/postReleasedOrder", formdata, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response;
      })
      );
  }


  //get api for project release order
  getReleaseOrder(stateCode: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetReleasedOrder/" + stateCode, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
  //download file 
  getFileDownnload(pdf: any): Observable<Blob> {

    return this.http.get(this.baseUrl + "/Admin_Value/GetFile/" + pdf, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      }), responseType: 'blob'
    }).pipe(
    );
  }



  //get api for project release order
  getUCOrder(stateCode: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetUCOrder/" + stateCode, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }


  //----post api for release order-----//
  postUCOrder(file: File, state: string, sanction: any, ucamount: any, ucdate: any, utilizationno: any): any {
    const formdata: FormData = new FormData();
    formdata.append('Image', file, file.name);
    formdata.append('State', state);
    formdata.append('Sanction', sanction);
    formdata.append('UCAmount', ucamount);
    formdata.append('UCDate', ucdate);
    formdata.append('UtilizationNo', utilizationno);

    return this.http.post(this.baseUrl + "/Admin_Value/postUCOrder", formdata, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response;
      })
      );
  }

  //get project name
  getProjectBriefName(statecode: any, districtcode: any, citycode: any, scheme: any, component: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetProjectName/" + statecode + '/' + districtcode + '/' + citycode + '/' + scheme + '/' + component, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }

  //----post api for project brief detail order-----//
  postProjectBriefDeatil(file: File, objPost: any): any {
    const formdata: FormData = new FormData();
    formdata.append('Image', file, file.name);
    formdata.append('Data', JSON.stringify(objPost));


    return this.http.post(this.baseUrl + "/Admin_Value/postProjectBriefDetail", formdata, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response;
      })
      );
  }

  //get api for project brief detail
  geProjectBriefDetail(): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/GetProjectBriefDetail", { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
//post project detail bulk data
  postProjectDetailsBulkData(file) {
   
    const formdata: FormData = new FormData();
    formdata.append('Image', file, file.name);
    return this.http.post(this.baseUrl + "/Admin_Value/ExcelUploadProjectDetailData", formdata, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response;
      })
      );
  }


//---------post,get,delete,update api for clssification master----------------//
  //post api for classification master
  postClassificationMaster(postData: any): Observable<any> {
    return this.http.post(this.baseUrl + "/Admin_Value/SubmitClassificationMaster", postData, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
//get api for classification master
getClassificationMaster(): Observable<any> {
  return this.http.get(this.baseUrl + "/Admin_Value/GetClassificationMaster", { "observe": "response" })
    .pipe(map((response: HttpResponse<any>) => {
      return response.body;
    })
    );
}

 //delete api for classification master
 deleteClassificationData(ClassificationId: any): Observable<any> {
  return this.http.get(this.baseUrl + "/Admin_Value/DeleteClassificationMaster/" + ClassificationId, { "observe": "response" })
    .pipe(map((response: HttpResponse<any>) => {
      return response.body;
    })
    );
}

 //update api for classification master
 updateClassificationMaster(postData: any): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post(this.baseUrl + "/Admin_Value/UpdateClassificationMaster/", postData, httpOptions
  );
}
  //get project name
  getProjectClassificationName(statecode: any, districtcode: any, citycode: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/getProject/" + statecode + '/' + districtcode + '/' + citycode, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }

 //get classification on behalf of state
 getStateClassification(statecode: any): Observable<any> {
  return this.http.get(this.baseUrl + "/Admin_Value/getStateClassification/" + statecode , { "observe": "response" })
    .pipe(map((response: HttpResponse<any>) => {
      return response.body;
    })
    );
}


//--------------------------api for mapping of classification master with state,district,city and project------------------------------//
//post api for state classification mapping
postStateClassificationMapping(postData: any): Observable<any> {
  return this.http.post(this.baseUrl + "/Admin_Value/SubmitStateClassificationMapping", postData, { "observe": "response" })
    .pipe(map((response: HttpResponse<any>) => {
      return response.body;
    })
    );
}
 //get api for state classification mapping
 getStateClassificationMapping(): Observable<any> {
  return this.http.get(this.baseUrl + "/Admin_Value/GetStateClassificationMapping"  , { "observe": "response" })
    .pipe(map((response: HttpResponse<any>) => {
      return response.body;
    })
    );
}

  //delete api for state classification mapping
  deleteStateClassificationMapping(StateMappingId: any): Observable<any> {
    return this.http.get(this.baseUrl + "/Admin_Value/DeleteStateClassificationMapping/" + StateMappingId, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }

//post api for district classification mapping
postDistrictClassificationMapping(postData: any): Observable<any> {
  return this.http.post(this.baseUrl + "/Admin_Value/SubmitDistrictClassificationMapping", postData, { "observe": "response" })
    .pipe(map((response: HttpResponse<any>) => {
      return response.body;
    })
    );
}
 //get api for district classification mapping
 getDistrictClassificationMapping(statecode:any): Observable<any> {
  return this.http.get(this.baseUrl + "/Admin_Value/GetDistrictClassificationMapping/"+statecode  , { "observe": "response" })
    .pipe(map((response: HttpResponse<any>) => {
      return response.body;
    })
    );
}
  //delete api for district classification mapping
  deleteDistrictClassificationMapping(DistMappingId: any): Observable<any> {
  
    return this.http.get(this.baseUrl + "/Admin_Value/DeleteDistrictClassificationMapping/" + DistMappingId, { "observe": "response" })
      .pipe(map((response: HttpResponse<any>) => {
        return response.body;
      })
      );
  }
//post api for city classification mapping
postCityClassificationMapping(postData: any): Observable<any> {
  return this.http.post(this.baseUrl + "/Admin_Value/SubmitCityClassificationMapping", postData, { "observe": "response" })
    .pipe(map((response: HttpResponse<any>) => {
      return response.body;
    })
    );
}
 //get api for city classification mapping
 getCityClassificationMapping(statecode:any,districtcode:any): Observable<any> {
  return this.http.get(this.baseUrl + "/Admin_Value/GetCityClassificationMapping/"+statecode +'/'+districtcode , { "observe": "response" })
    .pipe(map((response: HttpResponse<any>) => {
      return response.body;
    })
    );
}
//delete api for city classification mapping
deleteCityClassificationMapping(CityMapId: any): Observable<any> {
 
  return this.http.get(this.baseUrl + "/Admin_Value/DeleteCityClassificationMapping/" + CityMapId, { "observe": "response" })
    .pipe(map((response: HttpResponse<any>) => {
      return response.body;
    })
    );
}
//post api for project classification mapping
postProjectClassificationMapping(postData: any): Observable<any> {
  return this.http.post(this.baseUrl + "/Admin_Value/SubmitProjectClassificationMapping", postData, { "observe": "response" })
    .pipe(map((response: HttpResponse<any>) => {
      return response.body;
    })
    );
}
 //get api for project classification mapping
 getProjectClassificationMapping(statecode:any,districtcode:any,citycode:any): Observable<any> {
  return this.http.get(this.baseUrl + "/Admin_Value/GetProjectClassificationMapping/"+statecode +'/'+districtcode +'/'+citycode, { "observe": "response" })
    .pipe(map((response: HttpResponse<any>) => {
      return response.body;
    })
    );
}
//delete api for city classification mapping
deleteProjectClassificationMapping(ProjectId: any): Observable<any> {
 
  return this.http.get(this.baseUrl + "/Admin_Value/DeleteProjectClassificationMapping/" + ProjectId, { "observe": "response" })
    .pipe(map((response: HttpResponse<any>) => {
      return response.body;
    })
    );
}


  //----get pagination service----//
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
