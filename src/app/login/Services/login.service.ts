import { Injectable } from '@angular/core';
import{tap} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginModel } from '../Models/LoginModel';
import { Alert } from 'selenium-webdriver';
import { ConstantUrlService } from 'src/app/Shared/constant-url.service';
import { GlobalUrl } from 'src/app/Shared/GlobalUrl';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public token:string;
apiUrl:string;
apiUrlReg:string;
rootUrl:string;

  constructor(private _http:HttpClient,private _route:Router,private constantUrlService: ConstantUrlService,private globalUrl:GlobalUrl ) { 
   //,private globalUrl:GlobalUrl
    //this.apiUrl=this.constantUrlService.apiUrl;
    //this.apiUrlReg=this.constantUrlService.apiUrlReg;
    this.apiUrl = this.globalUrl.urlIPAddess +"/API/Authenticate/";
    this.apiUrlReg= this.globalUrl.urlIPAddess + "/API/RegistrationApi/";
    this.rootUrl = 'http://localhost:58396';
  }  
//  apiUrl ="http://localhost:58396/hfa_api/API/Authenticate/";
//  apiUrlReg ="http://localhost:58396/API/RegistrationApi/";


 
  // apiUrl ="http://10.196.69.102/hfa_api/API/Authenticate/";
  // apiUrlReg ="http://10.196.69.102/hfa_api/API/RegistrationApi/";



  // baseUrl = "http://localhost:58396/Api";

//     apiUrl ="http://10.196.69.102/hfa_api/API/Authenticate/";
//     apiUrlReg ="http://10.196.69.102/hfa_api/API/RegistrationApi/";

  public validateLoginUser(loginModel:LoginModel)
  {
    let headers=new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post<any>(this.apiUrl,loginModel,{headers:headers})
    .pipe(tap(data=>{
      if(data.token !=null)
      {
        if(data.UserType == "1")
        {
          sessionStorage.setItem('AdminUser',JSON.stringify({username:loginModel.userName,token:data.token}));
        }
        else if(data.UserType == "2")
        {
          sessionStorage.setItem('CurrentUser',JSON.stringify({username:loginModel.userName,token:data.token}));
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
      return this._http.get<string>(this.apiUrlReg + "Login_Master?Username=" + UserName+ "&password=" + Password);
  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this._http.post(this.rootUrl + '/token', data, { headers: reqHeader });
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
