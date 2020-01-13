import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { formatDate, LocationStrategy } from '@angular/common';
import { EventEmitter, Input, Output } from '@angular/core';
import { UrlService } from '../Shared/url.service';
import { States } from '../Shared/CommonModel';
import { GlobalEvent } from '../Shared/global-event';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from "@angular/common";
// const accountSid = 'AC7e30d1fcd5f1e5fd6ae9e0d831e3d594';
// const authToken = '4a3561fd6e52d36e2ba12178246e34ef';
// const client = require('twilio')(accountSid, authToken);

@Component({
  selector: 'app-app-admin-layout',
  templateUrl: './app-admin-layout.component.html',
  styleUrls: ['./app-admin-layout.component.css']
})
export class AppAdminLayoutComponent implements OnInit {
  today = new Date();
  jstoday = '';
  selectedColor = '';
  State: string;
  menuActive: boolean;
  activeMenuId: string;
  CASanct_forRelease_NChange: any;
  GTCompleted_: string;
  public backgroundColor: string;
  public show = false;
  display: string = 'none';

  StateDetails: States[];
  reportpaths = ["/Admin/AtaGlance", "/Admin/AtaGlance1", "/Admin/AtaGlance3", "/Admin/AtaGlance4", "/Admin/AtaGlance5", "/Admin/phyfinChart", "/Admin/ConsphyfinChart", "/Admin/Statescore", "/Admin/VerticalHousesDetails", "/Admin/IndiaMap", "/Admin/statemaster", "/Admin/Exceljnnurm",
    "/Admin/UsersMaster", "/Admin/ConsphyfinChart1", "/Admin/VerticalFinancialDetails"];

  Codes: string;
  showcolourpicker = true;
  LoginTypeId: string;
  AdminDisplay: string = 'none';
  DivDisplay: string = 'none';
  DMRCDisplay: string = 'none';
  RoutLink: string;
  RoutRptLink: string;
  DivText: string;
  constructor(private service: UrlService, private location: LocationStrategy, private gevent: GlobalEvent, private router: Router, private activatedRoute: ActivatedRoute) {

    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });

    this.router.events.subscribe(x => {
      if (x instanceof NavigationEnd) {
        this.showcolourpicker = !this.reportpaths.includes(x.url);

        console.log(x.url);
      }
    });
    setInterval(() => {
      //  console.log(formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530'));
      this.jstoday = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    }, 1000);
  }
  ngOnInit() {

    //---------------------------------------------------

    //-------------------------------------------------------

    this.LoginTypeId = sessionStorage.getItem("AdminUser");
    // alert(this.LoginTypeId.toString());
    if (this.LoginTypeId === "ADMIN") {
      this.AdminDisplay = 'block';
      this.DMRCDisplay = 'block';
      this.DivDisplay = 'none';
    }
    else if (this.LoginTypeId === "DIV1") {
      this.AdminDisplay = 'none';
      this.DivDisplay = 'block';
      this.RoutLink = "/Admin/DashboardHFA1";
      this.RoutRptLink = "/Admin/AtaGlance1";
      this.DivText = "HFA-1";
    }
    else if (this.LoginTypeId === "DIV3") {
      this.AdminDisplay = 'none';
      this.DivDisplay = 'block';
      this.RoutLink = "/Admin/DashboardHFA3";
      this.RoutRptLink = "/Admin/AtaGlance3";
      this.DivText = "HFA-3";
    }
    else if (this.LoginTypeId === "DIV4") {
      this.AdminDisplay = 'none';
      this.DivDisplay = 'block';
      this.RoutLink = "/Admin/DashboardHFA4";
      this.RoutRptLink = "/Admin/AtaGlance4";
      this.DivText = "HFA-4";
    }
    else if (this.LoginTypeId === "DIV5") {
      this.AdminDisplay = 'none';
      this.DivDisplay = 'block';
      this.RoutLink = "/Admin/DashboardHFA5";
      this.RoutRptLink = "/Admin/AtaGlance5";
      this.DivText = "HFA-5";
    }
    else if (this.LoginTypeId === "DRMC") {
      //  this.AdminDisplay = 'none';
      this.DivDisplay = 'none';
      this.DMRCDisplay = 'block';
      this.RoutLink = "/Admin/statemaster";
      this.RoutRptLink = "/Admin/AtaGlance5";
      this.DivText = "DRMC";
      this.AdminDisplay = 'block';
    }
    this.State = "--Select-";
    if (this.reportpaths.indexOf(this.router.url) > -1)
      this.showcolourpicker = false;
  }
  OpenModalDialog() {
    this.display = 'block';
  }
  closeModalDialog() {
    this.display = 'none';
  }

  onChangeColor(x: any) {
    this.gevent.changeColor(x);
  }
  /**
     * Set color from color picker
     * @param {string} type
     * @param {string} color
     */
  public setColor(type: string, color: string) {
    switch (type) {
      case 'background':
        this.backgroundColor = color;
        break;
      case 'font':
        //this.fontColor = color;
        break;
      default:
        break;
    }
  }
  toggle(id: string) {
    this.activeMenuId = (this.activeMenuId === id ? null : id);
  }

  // Handle WhatsApp Form

  handleWhatsAppForm(event: Event, form: any) {
    const whatsappNumber = (<HTMLInputElement>document.getElementById("whatsappNumber")).value
    const whatsappMessage = (<HTMLInputElement>document.getElementById("whatsappMessage")).value
    const reportType = (<HTMLInputElement>document.getElementById("reportType")).value

    const data = {
      To: 'whatsapp:+91' + whatsappNumber,
      From: 'whatsapp:+14155238886',
      Body: whatsappMessage,
      MediaUrl: 'https://bit.ly/whatsapp-image-example',
    }

    this.service.waMsg(data).subscribe(result => {
      console.log('result------->>', result)
    })
    console.log('event---->', event, {
      whatsappNumber,
      whatsappMessage,
      reportType,
    })
  }
}
