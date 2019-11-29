import { Injectable } from '@angular/core';
import{tap} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginModel } from '../Models/LoginModel';
import { Alert } from 'selenium-webdriver';
import { ConstantUrlService } from 'src/app/Shared/constant-url.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public token:string;
  apiUrl:string;
apiUrlReg:string;

  constructor(private _http:HttpClient,private _route:Router,private constantUrlService: ConstantUrlService) { 

    this.apiUrl=this.constantUrlService.apiUrl;
    this.apiUrlReg=this.constantUrlService.apiUrlReg;

  }
//  apiUrl ="http://localhost:58396/hfa_api/API/Authenticate/";
//  apiUrlReg ="http://localhost:58396/API/RegistrationApi/";



  // apiUrl ="http://10.196.69.102/hfa_api/API/Authenticate/";
  // apiUrlReg ="http://10.196.69.102/hfa_api/API/RegistrationApi/";



  // baseUrl = "http://localhost:58396/Api";

  //  apiUrl ="http://10.196.69.102/hfa_api/API/Authenticate/";
  //  apiUrlReg ="http://10.196.69.102/hfa_api/API/RegistrationApi/";

  public validateLoginUser(loginModel:LoginModel)
  {
    let headers=new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post<any>(this.apiUrl,loginModel,{headers:headers})
    .pipe(tap(data=>{
      if(data.token !=null)
      {
        if(data.UserType == "1")
        {
          localStorage.setItem('AdminUser',JSON.stringify({username:loginModel.userName,token:data.token}));
        }
        else if(data.UserType == "2")
        {
          localStorage.setItem('CurrentUser',JSON.stringify({username:loginModel.userName,token:data.token}));
        }
        else{
          return null;
        }
      }
    }))
  }
  onLogin1(UserName, Password)
  {    
      return this._http.get<string>(this.apiUrl + "LoginMaster?Username=" + UserName+ "&password=" + Password);
  }
  onLogin(UserName, Password)
  {    
     // alert(this.apiUrlReg);
      return this._http.get<string>(this.apiUrlReg + "Login_Master?Username=" + UserName+ "&password=" + Password);
  }
  CheckCrendential(UserName, Password)
  {    
      return this._http.get<boolean>(this.apiUrlReg + "CheckIdPass?Username=" + UserName+ "&password=" + Password);
  }
  UpdateCrendential(UserName, OldPassword,NewPassword)
  {    
      return this._http.get<string>(this.apiUrlReg + "UpdatePassword?Username=" + UserName+ "&oldPassword=" + OldPassword + "&newPassword=" + NewPassword);
  }

  //---------------------------------------------------


  
}
