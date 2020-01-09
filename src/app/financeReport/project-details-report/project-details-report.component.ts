import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { GraphService } from 'src/app/financeReport/service/graph.service';
import { DatePipe } from '@angular/common';

//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Route, Router, ActivatedRoute } from '@angular/router';
// import { content } from 'html2canvas/dist/types/css/property-descriptors/content';
// import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { ExportAsConfig, SupportedExtensions, ExportAsService } from 'ngx-export-as';
import { ProjectDetail, BriefDetail } from 'src/app/financeReport/model/chart';
import * as _ from 'lodash';
import * as moment from 'moment';

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
  stateName: string;
  distName: string;
  cityName: string;
  projectDetail: ProjectDetail[];
  briefDetail: BriefDetail[];
  fundRelease: any;
  UCSubmission: any;
  projectTimeline: any;
  physicalStatus: any;

  constructor(private exportAsService: ExportAsService, private router: Router, private route: ActivatedRoute, config: NgbModalConfig,
    public activeModal: NgbActiveModal, public service: GraphService,
    private modalService: NgbModal) {

    config.keyboard = false;



    this.service.GetProjetDetailsReportByProjectId(this.route.snapshot.paramMap.get('id')).subscribe(result => {

      this.service.GetStateNameByCode(result.Project_DetailVM[0].StateCode).subscribe(st => {
        this.stateName = st.States_UT
      })

      this.service.GetDisttNameByCode(result.Project_DetailVM[0].DistrictCode).subscribe(st => {
        this.distName = st.District
      })
      this.service.GetCityNameByCode(result.Project_DetailVM[0].CityCode).subscribe(st => {
        this.cityName = st.City
      })

      this.projectDetail = {
        ...result.Project_DetailVM[0],
        CSMCDate: moment(_.get(result.Project_DetailVM, '0.CSMCDate')).format('DD-MMM-YYYY'),
        StateGrant: Number(_.get(result.Project_DetailVM, '0.StateGrant')),
        ULB: Number(_.get(result.Project_DetailVM, '0.ULB')),
        BeneficiaryShare: Number(_.get(result.Project_DetailVM, '0.BeneficiaryShare')),
        NewSanction: Number(_.get(result.Project_DetailVM, '0.NewSanction')),
        UpgradeSanction: Number(_.get(result.Project_DetailVM, '0.UpgradeSanction')),
        TotalSanction: Number(_.get(result.Project_DetailVM, '0.TotalSanction')),
      }

      this.briefDetail = {
        ...result.Project_Brief_DetailVM[0],
        ImplementingAgency: _.get(result.Project_Brief_DetailVM, '0.ImplementingAgency')
      }

      const fundRelease = _.map(_.groupBy(result.Project_Fund_ReleaseVM, "Installment"), obj => {
        return ({
          Installment: _.get(obj, `0.Installment`),
          SC: _.sumBy(obj, o => Number(o.SCSPAmount)),
          ST: _.sumBy(obj, o => Number(o.TSPAmount)),
          otherScSt: _.sumBy(obj, o => Number(o.HFAAmount)),
          minDate: moment.min(_.map(_.filter(obj, dtf => dtf.TxtSCSPDate), dt => moment(dt.TxtSCSPDate))),
        })
      })


      const first = _.find(fundRelease, obj => obj.Installment == 1);
      const second = _.find(fundRelease, obj => obj.Installment == 2);
      const third = _.find(fundRelease, obj => obj.Installment == 3);


      this.fundRelease = {
        first,
        second,
        third,
        totalSC: _.sumBy(fundRelease, o => Number(o.SC)),
        totalST: _.sumBy(fundRelease, o => Number(o.ST)),
        totalOtherScSt: _.sumBy(fundRelease, o => Number(o.otherScSt)),
        totalFirst: _.get(first, 'SC') + _.get(first, 'ST') + _.get(first, 'otherScSt'),
        totalSecond: _.get(second, 'SC') + _.get(second, 'ST') + _.get(second, 'otherScSt'),
        totalThird: _.get(third, 'SC') + _.get(third, 'ST') + _.get(third, 'otherScSt'),
      }
      const UCSubmission = _.map(_.groupBy(result.Project_UC_SubmissionVM, "Installment"), obj => ({
        Installment: _.get(obj, `0.Installment`),
        UCAmount: _.sumBy(obj, o => Number(o.UCAmount)),
        minDate: moment.min(_.map(_.filter(obj, dtf => dtf.UCDate), dt => moment(dt.UCDate))),
      }))

      const UCfirst = _.find(UCSubmission, obj => obj.Installment == 1);
      const UCsecond = _.find(UCSubmission, obj => obj.Installment == 2);
      const UCthird = _.find(UCSubmission, obj => obj.Installment == 3);

      this.UCSubmission = {
        UCfirst,
        UCsecond,
        UCthird,
      }

      // this.StateId=result.st.StateId;

      this.projectTimeline = {
        firstReleased: moment(_.get(first, 'minDate')).diff(moment(result.Project_DetailVM[0].CSMCDate), 'months'),
        secondReleased: moment(_.get(second, 'minDate')).diff(moment(result.Project_DetailVM[0].CSMCDate), 'months'),
        thirdReleased: moment(_.get(third, 'minDate')).diff(moment(result.Project_DetailVM[0].CSMCDate), 'months'),
        firstUtilised: moment(_.get(UCfirst, 'minDate')).diff(moment(_.get(first, 'minDate')), 'months'),
        secondUtilised: moment(_.get(UCsecond, 'minDate')).diff(moment(_.get(second, 'minDate')), 'months'),
        thirdUtilised: moment(_.get(UCthird, 'minDate')).diff(moment(_.get(first, 'minDate')), 'months'),
        totalMonths: moment().diff(moment(result.Project_DetailVM[0].CSMCDate), 'months'),
      }


      this.physicalStatus = {
        ...result.Physical_Progress_ReportVM[0],
        workOrder: Number(_.get(result, 'Physical_Progress_ReportVM.0.TotalProgressHouse')) + Number(_.get(result, 'Physical_Progress_ReportVM.0.ConstructionCompleted')),
        geoTag: '-',
        Pinth: Number(_.get(result, 'Physical_Progress_ReportVM.0.Pinth')),
        LinterLevel: Number(_.get(result, 'Physical_Progress_ReportVM.0.LinterLevel')),
        RoofLevel: Number(_.get(result, 'Physical_Progress_ReportVM.0.RoofLevel')),
        ConstructionCompleted: Number(_.get(result, 'Physical_Progress_ReportVM.0.ConstructionCompleted')),
        TotalHouseOccupiedBeneficiary: Number(_.get(result, 'Physical_Progress_ReportVM.0.TotalHouseOccupiedBeneficiary')),
      }
    });

  }


  ngOnInit() { }







}
