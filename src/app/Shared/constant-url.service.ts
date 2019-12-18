import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantUrlService {
  url: string;
  url1: string;
  apiUrl: string;
  apiUrlReg: string;
  baseUrl: string;
  url_Upload: any;
  url1_Upload: any;

  constructor() {

    // Graph
    this.url = "http://10.196.69.102/hfa_api/api/Buldings/";
    this.url1 = "http://10.196.69.102/hfa_api/API/RegistrationApi/";

    // this.url="http://localhost:58396/hfa_api/api/Buldings/";
    //this.url1 ="http://localhost:58396/hfa_api/API/RegistrationApi/";


    // Login
    this.apiUrl = "http://10.196.69.102/hfa_api/API/Authenticate/";
    this.apiUrlReg = "http://10.196.69.102/hfa_api/API/RegistrationApi/";
    //this.apiUrl ="http://localhost:58396/hfa_api/API/Authenticate/";
    //this.apiUrlReg ="http://localhost:58396/hfa_api/API/RegistrationApi/";



    // user service
    this.baseUrl = "http://10.196.69.102/hfa_api/API";
    // this.baseUrl = "http://localhost:58396/Api";

    // Upload
    this.url_Upload = "http://10.196.69.102/hfa_api/api/Buldings/";
    this.url1_Upload = "http://10.196.69.102/hfa_api/API/RegistrationApi/";

  }
}
