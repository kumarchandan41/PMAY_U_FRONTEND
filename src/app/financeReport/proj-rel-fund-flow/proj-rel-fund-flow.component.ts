import { Component, OnInit } from '@angular/core';
import { States } from '../model/chart';
import { Router } from '@angular/router';
import { GlobalEvent } from 'src/app/Shared/global-event';
import { GraphService } from '../service/graph.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-proj-rel-fund-flow',
  templateUrl: './proj-rel-fund-flow.component.html',
  styleUrls: ['./proj-rel-fund-flow.component.css']
})
export class ProjRelFundFlowComponent implements OnInit {
  stateCodes: string = "0";
  StateDetails: States[];
  State:string;

  cid: number;
  Comp: string;


  constructor(private router: Router,private gevent:GlobalEvent, public service: GraphService, private modalService: NgbModal) { 

    
  }

  ngOnInit() {
    this.stateCodes = "0";
    this.cid = 0;
    this.Comp = "0";
    this.State="--Select--";
    this.service.StateList();
  }

}
