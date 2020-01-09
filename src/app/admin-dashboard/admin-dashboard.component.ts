import { Component, OnInit, ViewChild, ElementRef, Renderer, AfterViewInit } from '@angular/core';
import { GlobalEvent } from '../Shared/global-event';
import { ActivatedRoute } from '@angular/router';
import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';
import { interval } from 'rxjs';
import { GraphService } from '../financeReport/service/graph.service';






@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  // backgroundColor: string;
  template: string;
  abc: string = "XYZ";
  //  public backgroundColor: string;
  public show = false;
  //display: string = 'none';
  selectedColor = '';
  public backgroundColor: string;
  public getPercent: any;
  LoginTypeId: string;
  data: any;
  counter: any ;//= 96.58;
  counter1: any;// = 56.91;
  counter2: any  = 29.53; //Completed
  counter3: any = 27.04; //Occ;upied

  counter4: any = 82982; //Approved
  counter5: any = 151026; //Committed
  counter6: any = 57915; //Released
  counter7: any = 49717; //Utilized
  
  counter8: any = 5.70; //Overall
  counter9: any = 2.93; //Public
  counter10: any = 2.77; //Private

  counter11: any = 106; //Direct
  counter12: any = 233; //Indirect
  counter14: any = 339; //Total

  counter15: any = 38;//Direct
  counter16: any = 83;//Indirect
  counter17: any = 121;//Total

  constructor(private gevent: GlobalEvent, private router: ActivatedRoute, private renderer: Renderer, public service: GraphService) {
    //https://www.npmjs.com/package/angular2-counto
  }




  ngAfterViewInit() {
    //this.d1.nativeElement.innerHTML ='<span class="num_tiles">'+10+'</span>';

  }


  /**
     * Set color from color picker
     * @param {string} type
     * @param {string} color
     */
  public setColor(color: string) {

    // switch (type) {
    // case 'background':

    this.backgroundColor = color;



    let eleList = document.getElementsByClassName("dynamicColor");
    for (let i = 0; i < eleList.length; i++) {
      //  debugger;
      eleList[i]["style"] = "background-color:" + color;
    }

    this.backgroundColor = color;
  }


  // decorateValue(value,divId){
  //   let ln=value.length;
  //   for(var i=0;i<ln;i++){
  //     let elem=document.createElement('span');
  //     elem.setAttribute("style","font-size:22px;background-color: #888888;color: #ffffff;");
  //     elem.innerHTML=i.toString();
  //     var x=document.getElementById(divId).insertAdjacentElement('beforeend',elem); 
  //   }
  // }
  getListValue(num: number): any[] {
    const numValue = num.toString();
    let numList = [];
    for (var i = 0; i < numValue.length; i++) {
      numList = [...numList, numValue[i]];
    }
    return numList;
  }

  ngOnInit() {


    this.gevent.ColorObservable.subscribe(x => {
      console.log('color:' + x);
      debugger;
      this.setColor(x);
    });
    // this.State="-Select--";

    this.backgroundColor = this.backgroundColor;// 
    this.getPercent = function (firstValue, secondValue) {
      // (counter / 112.24)*100
      return Math.round((secondValue / firstValue) * 100) + "%";
    }

     

    this.service.GetDasboardDataList().subscribe(result=>{
      this.counter=  result.Sanctioned;
      this.counter1 = result.Grounded;
      this.counter2 == result.Completed;
      this.counter3 == result.Occupied;

      this.counter4 == result.Approved;      

this.counter5 == result.sCommitted;
this.counter6 == result.Released;
this.counter7 == result.Utilized;

this.counter8 == result.Overall;
this.counter9 == result.sPublic;
this.counter10 == result.Private;


this.counter11 == result.PDaysDirect;
this.counter12 == result.PDaysIndirect;
this.counter14 == result.PDaysTotal; // Total

this.counter15 == result.JobsDirect;
this.counter16 == result.JobsIndirect;
this.counter17 == result.JobsTotal; 
    })

    
  }
}
