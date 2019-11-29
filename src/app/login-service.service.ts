import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User_registration } from './Shared/CommonModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
//url = "http://localhost:58396/API/RegistrationApi";
url = "http://10.196.69.102/hfa_api/API/RegistrationApi";



  constructor(private http:HttpClient) { }

CreateUser(user:User_registration):Observable<string>{
  debugger;
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<string>(this.url + '/UserRegister/',user,httpOptions);  
}

}
