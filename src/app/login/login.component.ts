import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './Services/login.service';
import { LoginModel } from './Models/LoginModel';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

//import { BuildingServiceService } from '../service/building-service.service';
//import { routerNgProbeToken } from '@angular/router/src/router_module';
//import { CaptchaComponent } from 'angular-captcha'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  Select: string;
  //@ViewChild(CaptchaComponent) captchaComponent: CaptchaComponent;
  private _loginService;
  message: string;
  code: any;
  constructor(private _Route: Router, private formBuilder: FormBuilder, private loginService: LoginService) {
    this._loginService = loginService;
  }

  LoginModel: LoginModel = new LoginModel();
  ngOnInit() {
    this.createCaptcha();
    this.loginForm = this.formBuilder.group({
      UserName: [''],
      Password: [''],
      UserCaptacha: ['']
    })
  }
  validate(value, valid): void {

    // get the user-entered captcha code value to be validated at the backend side         
    // let userEnteredCaptchaCode = this.captchaComponent.userEnteredCaptchaCode; 

    // // get the id of a captcha instance that the user tried to solve 
    // let captchaId = this.captchaComponent.captchaId; 

    // const postData = { 
    //   // add the user-entered captcha code value to the post data     
    //   userEnteredCaptchaCode: userEnteredCaptchaCode, 
    //   // add the id of a captcha instance to the post data       
    //   captchaId: captchaId 
    // }; 

    // post the captcha data to the backend 

  }
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  onLoginSubmit2(loginForm: any) {
    if (this.loginForm.value.UserName != "" && this.loginForm.value.Password != "") {
      this._loginService.onLogin(this.loginForm.value.UserName, this.loginForm.value.Password).subscribe(result => {
        if (result == "1") {
          this._Route.navigate(['/Admin/Dashboard']);
        }
        else if (result = "2") {
          this._Route.navigate(['/UserDashboard']);
        }
        else {
          alert('result');
        }
      });
    }
    else {
      alert('User name and passwored are required');
    }
  }
  onLoginSubmit(loginForm: any) {
//debugger;
    if (this.code == this.loginForm.value.UserCaptacha) {
      if (this.loginForm.value.UserName != "" && this.loginForm.value.Password != "") {
        this._loginService.onLogin(this.loginForm.value.UserName, this.loginForm.value.Password).subscribe(result => {
          if (result == "Error") {
            alert("Incorect user name or password");
          }
          else {
            localStorage.setItem('userToken',result.access_token);
            if (result == "USER") {
              sessionStorage.setItem('UserLogin', result);
              this._Route.navigate(['/UserDashboard']);
            }
            else {
              sessionStorage.setItem('AdminUser', result);
              this._Route.navigate(['/Admin/Dashboard']);
            }
          }
        });
      }
      else {
        alert('Check captcha Code Again');
      }
    }
  }
  createCaptcha() {
    //clear the contents of captcha div first 
    document.getElementById('captcha').innerHTML = "";
    var charsArray =
      "123456789abcdefghjklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 200;
    canv.height = 50;
    var ctx = canv.getContext("2d");
    ctx.font = "normal 20px Lucida Grande";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canv.width, canv.height);
    ctx.strokeText(captcha.join(" "), 0, 20);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    this.code = captcha.join("");
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
  }
  onSubmit() {
    this._loginService.validateLoginUser(this.LoginModel).subscribe(
      Response => {
        if (Response.Token == null && Response.Usertype == "0") {
          this.message = "Invalid user name or password";
          this._Route.navigate(['Login']);
        }
        if (Response.Usertype == "1") {
          this.message = "Invalid user name or password";
          this._Route.navigate(['/Admin/User']);
        }
        if (Response.Token == null && Response.Usertype == "0") {
          this.message = "Invalid user name or password";
          this._Route.navigate(['/Admin/Dashboard']);
        }
      }
    )
  }
  onRegister() {
    //		<!-- Admin/Register -->
  }
}


