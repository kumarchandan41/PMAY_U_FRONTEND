import { Component, OnInit, ViewChild, ElementRef, Renderer, AfterViewInit } from '@angular/core';
import { GlobalEvent } from '../Shared/global-event';
import { ActivatedRoute } from '@angular/router';
import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';
import { interval } from 'rxjs';






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
  counter: number = 96.58;
  counter1: number = 56.91;
  counter2: number = 29.53;
  counter3: number = 27.04;
  counter4: number = 82982;
  counter5: number = 151026;
  counter6: number = 57915;
  counter7: number = 49717;
  counter8: number = 5.70;
  counter9: number = 2.93;
  counter10: number = 2.77;
  counter11: number = 106;
  counter12: number = 233;
  counter14: number = 339;
  counter15: number = 38;
  counter16: number = 83;
  counter17: number = 121;

  constructor(private gevent: GlobalEvent, private router: ActivatedRoute, private renderer: Renderer) {
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
  }


}
