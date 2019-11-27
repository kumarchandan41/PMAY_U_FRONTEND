import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-comp',
  templateUrl: './dynamic-comp.component.html',
  styleUrls: ['./dynamic-comp.component.css']
})
export class DynamicCompComponent implements OnInit {

  data:any[]=[{
    Id:1,
    Name:"Record 1",
    Amount:10
  },
  {
    Id:2,
    Name:"Record 2",
    Amount:20
  }]
  constructor() { }

  ngOnInit() {
  }
  AddNewRow(){
    this.data.push({});
  }

}
