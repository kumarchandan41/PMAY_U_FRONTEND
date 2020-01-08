import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { DatePipe } from '@angular/common';

//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, ActivatedRoute } from '@angular/router';
// import { content } from 'html2canvas/dist/types/css/property-descriptors/content';
// import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { ExportAsConfig, SupportedExtensions, ExportAsService } from 'ngx-export-as';
import { ProjectDetail } from 'src/app/financeReport/model/chart';


const localString = (number, format = 'en-IN') => {
  return (
    Number(number).toLocaleString(format, {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    })
  )
}

const indianFormat = (number, currency = 'INR') => {
  const currencyList = [{ 'INR': 'en-IN' }, { 'USD': 'en-US' }, { 'EGP': 'en-EG' }, { 'RMB': 'en-CN' }, { 'HKD': 'en-HK' }]
  const code = currencyList.find(o => {
    return o[currency]
  })
  if (currency !== '0') {
    return number > 0 ? localString(number, code[currency]) : number < 0 ? `(${localString(Math.abs(number), code[currency])})` : `--`
  } else {
    return '0'
  }
}



@Component({
  selector: 'app-project-details-report',
  templateUrl: './project-details-report.component.html',
  styleUrls: ['./project-details-report.component.css'],
  providers: [DatePipe]
})



// this is final programme for state score .
export class ProjectDetailsReportComponent implements OnInit {
  stateCodes: string = "0";
  projectDetail: ProjectDetail[];
  projectBriefDetail: any;
  projectFundRelease: any;
  projectUCSubmission: any;

  constructor(private exportAsService: ExportAsService, private router: Router, private route: ActivatedRoute, config: NgbModalConfig,
    public activeModal: NgbActiveModal, public service: GraphService,
    private modalService: NgbModal) {

    config.keyboard = false;

    this.service.GetProjetDetailsReportByProjectId(this.route.snapshot.paramMap.get('id')).subscribe(result => {
      this.projectDetail = {
        ...result.Project_DetailVM[0],
        BeneficiaryShare: Number(result.Project_DetailVM[0].BeneficiaryShare),
        NewSanction: Number(result.Project_DetailVM[0].NewSanction),
        UpgradeSanction: Number(result.Project_DetailVM[0].UpgradeSanction),
        TotalSanction: Number(result.Project_DetailVM[0].TotalSanction),
      }
      this.projectBriefDetail = result.Project_Brief_DetailVM[0]
      this.projectFundRelease = result.Project_Fund_ReleaseVM
      this.projectUCSubmission = result.Project_UC_SubmissionVM
      console.log('GetProjetDetailsReportByProjectId------------>>', result, this.route.snapshot.paramMap.get('id'))
      // this.StateId=result.st.StateId;
    });

  }


  ngOnInit() {
    this.stateCodes = "0";
    const projectDetail = this.projectDetail
    const projectBriefDetail = this.projectBriefDetail
    const projectFundRelease = this.projectFundRelease
    const projectUCSubmission = this.projectUCSubmission
    console.log({ projectDetail, projectBriefDetail, projectFundRelease, projectUCSubmission })
  }







}
