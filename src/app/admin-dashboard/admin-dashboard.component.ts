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
export class AdminDashboardComponent implements OnInit,AfterViewInit {
 // backgroundColor: string;
  template:string;
  abc:string="XYZ";
//  public backgroundColor: string;
  public show = false;
  //display: string = 'none';
  selectedColor = '';
  public backgroundColor: string;
  LoginTypeId:string;
  data:any;
  counter:number=83.69;
  counter1:number=49.54;
  counter5:number=130293;
  counter2:number=26.14;
  counter3:number=23.97;
  counter4:number=72121;
  counter6:number=51550;	
  counter7:number=41291;
  counter8:number=4.97;	
  counter9:number=2.69;
  counter10:number=  2.37;
  counter11:number=  96.97;
  counter12:number= 215.48; 
  counter14:number= 312.45;
  counter15:number= 34.63 ;
  counter16:number=  76.96;
  counter17:number=   111.59;

  constructor(private gevent:GlobalEvent,  private router: ActivatedRoute,private renderer:Renderer) { 
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
      


      let eleList=document.getElementsByClassName("dynamicColor");
      for(let i=0;i< eleList.length;i++){
        //  debugger;
          eleList[i]["style"]="background-color:"+color;
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
getListValue(num:number):any[]{
  const numValue=num.toString();
  let numList=[];
  for(var i=0;i<numValue.length;i++){
    numList=[...numList,numValue[i]];
  }
  return numList;
}

  ngOnInit() {
   
    this.gevent.ColorObservable.subscribe(x=>{
      console.log('color:'+x);
      debugger;
       this.setColor(x);
     });  
  // this.State="-Select--";

    this.backgroundColor =this.backgroundColor;// 
  }

  
}