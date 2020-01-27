import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppAdminLayoutComponent } from './layout/app-admin-layout.component';
import { AppUserLayoutComponent } from './layout/app-user-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AllAssignedRoleComponent } from './AssignRole/all-assigned-role.component';
import { LoginComponent } from './login/login.component';
import { AllRoleComponent } from './RoleMaster/all-role.component';
import { EditRoleComponent } from './RoleMaster/edit-role.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './home-page/home-page.component';
import { StateMasterComponent } from './Master/state-master/state-master.component';
import { GraphsComponent } from './financeReport/graphs/graphs.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MasterComponent } from './AdminPanel/master/master.component';
import { LandingPageComponent } from './UserForms/landing-page/landing-page.component';
import { DashboardMainComponent } from './AdminPanel/dashboard-main/dashboard-main.component';
import { ColorPickerComponent } from './AdminPanel/color-picker/color-picker.component';
import { DashboardHFA1Component } from './AdminPanel/dashboard-hfa1/dashboard-hfa1.component';
import { DashboardHFA3Component } from './AdminPanel/dashboard-hfa3/dashboard-hfa3.component';
import { DashboardHFA4Component } from './AdminPanel/dashboard-hfa4/dashboard-hfa4.component';
import { DashboardHFA5Component } from './AdminPanel/dashboard-hfa5/dashboard-hfa5.component';


import { StatescoreComponent } from './financeReport/statescore/statescore.component';
import { AtaGlanceComponent } from './financeReport/ata-glance/ata-glance.component';
import { DynamicCompComponent } from './dynamic-comp/dynamic-comp.component';
import { AtaGlance1Component } from './financeReport/ata-glance1/ata-glance1.component';
import { AtaGlance3Component } from './financeReport/ata-glance3/ata-glance3.component';
import { AtaGlance4Component } from './financeReport/ata-glance4/ata-glance4.component';
import { AtaGlance5Component } from './financeReport/ata-glance5/ata-glance5.component';
import { PhyfinChartComponent } from './AdminPanel/phyfin-chart/phyfin-chart.component';
import { GlobalEvent } from './Shared/global-event';
import { ConsPhyFinReportComponent } from './financeReport/cons-phy-fin-report/cons-phy-fin-report.component';
//import { AdminLoginPanelComponent } from './Master/admin-login-panel/admin-login-panel.component';
import { VerticalHousesStatusComponent } from './financeReport/vertical-houses-status/vertical-houses-status.component';
import { IndiaMapComponent } from './financeReport/india-map/india-map.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
//import { DisttMasterComponent } from './Master/distt-master/distt-master.component';
import { AlphaCharacterDirective } from './register/alphaChracter.directive';
import { ExceljnnurmComponent } from './DataUploads/exceljnnurm/exceljnnurm.component';
import { NumberDirective } from './register/number.directive';
import { ExcelPMAYComponent } from './DataUploads/excel-pmay/excel-pmay.component';
import { ExcelStatescoreComponent } from './DataUploads/excel-statescore/excel-statescore.component';
import { UsersMasterComponent } from './register/users-master/users-master.component';
import { ExcelPhyDashboardComponent } from './DataUploads/excel-phy-dashboard/excel-phy-dashboard.component';
import { ConsPhyFinReportNewComponent } from './financeReport/cons-phy-fin-report-new/cons-phy-fin-report-new.component';
import { VerticalFinancialStatusComponent } from './financeReport/vertical-financial-status/vertical-financial-status.component';
import { IndianmapComponent } from './financeReport/indianmap/indianmap.component';
import { Statescore1Component } from './financeReport/statescore1/statescore1.component';
import { ProjectDetailsReportComponent } from './financeReport/project-details-report/project-details-report.component';
import { ExcelDemandCityWiseComponent } from './DataUploads/excel-demand-city-wise/excel-demand-city-wise.component';
import { ExcelClssmainmasterComponent } from './DataUploads/excel-clssmainmaster/excel-clssmainmaster.component';
import { ExcelCLSSCityMainComponent } from './DataUploads/excel-clsscity-main/excel-clsscity-main.component';
import { CountoModule } from 'angular2-counto';

import { ExportAsModule } from 'ngx-export-as';
import { NgxPrintModule } from 'ngx-print';
import { ClssMasterUploadComponent } from './DataUploads/clss-master-upload/clss-master-upload.component';
import { StateScoreUpdationFormComponent } from './DataUploads/state-score-updation-form/state-score-updation-form.component';
import { CityMasterComponent } from './Master/city-master/city-master.component';
//import { ConstutiencyComponent } from './Master/constutiency/constutiency.component';
import { PMAYuCompWiseComponent } from './AdminPanel/pmayu-comp-wise/pmayu-comp-wise.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap';
//import { SchemeMasterComponent } from './DRMC/scheme-master/scheme-master.component';

//import { CityMasterComponent } from './Master/city-master/city-master.component';
// import { ClassificationMasterComponent } from './Master/classification-master/classification-master.component';
// import { ComponentMasterComponent } from './Master/component-master/component-master.component';
// import { ConstituencyMasterComponent } from './Master/constituency-master/constituency-master.component';
//import { ProjectBriefDetailComponent } from './DRMC/project-brief-detail/project-brief-detail.component';
//import { DistrictMasterComponent } from './Master/district-master/district-master.component';
//import { MappingClassificationMasterComponent } from './Master/mapping-classification-master/mapping-classification-master.component';
import { AdminSandbox } from './DRMC/admin.sandbox';
import { DatePipe } from '@angular/common';
//import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';


//import { DatePipe } from '@angular/common';
import { ToastDefaults, SnotifyService, SnotifyModule } from 'ng-snotify';
import { PhysicalProgressComponent } from './DRMC/physical-progress/physical-progress.component';
import { ProjectDetailsComponent } from './DRMC/project-details/project-details.component';
import { ProjectReleaseFundFlowComponent } from './DRMC/project-release-fund-flow/project-release-fund-flow.component';
import { ProjectReleaseOrderComponent } from './DRMC/project-release-order/project-release-order.component';
import { ProjectUcSubmissionComponent } from './DRMC/project-uc-submission/project-uc-submission.component';
import { ReportDistrictWiseComponent } from './DRMC/report-district-wise/report-district-wise.component';
import { ReportStateDistrictCityWiseComponent } from './DRMC/report-state-district-city-wise/report-state-district-city-wise.component';
import { ReportStateWiseComponent } from './DRMC/report-state-wise/report-state-wise.component';
import { ProjectBriefDetailComponent } from './DRMC/project-brief-detail/project-brief-detail.component';
import { ProjectCodeWiseReportComponent } from './DRMC/project-code-wise-report/project-code-wise-report.component';
import { DistrictMasterComponent } from './Master/district-master/district-master.component';
import { ConstituencyMasterComponent } from './Master/constituency-master/constituency-master.component';
import { ClassificationMasterComponent } from './Master/classification-master/classification-master.component';
import { ComponentMasterComponent } from './Master/component-master/component-master.component';
import { MappingClassificationMasterComponent } from './Master/mapping-classification-master/mapping-classification-master.component';
import { SchemeMasterComponent } from './Master/scheme-master/scheme-master.component';
import { PMAYuCriticalComponent } from './AdminPanel/pmayu-critical/pmayu-critical.component';
import { DashboardComponent } from './CMS/dashboard/dashboard.component';
import { CriticalMonitoringComponent } from './financeReport/critical-monitoring/critical-monitoring.component';
import { PhysicalMonitoringComponent } from './financeReport/physical-monitoring/physical-monitoring.component';
import { ShortfallDetailComponent } from './financeReport/shortfall-detail/shortfall-detail.component';
import { GlobalUrl } from './Shared/GlobalUrl';
import { AdminAuthGuardService } from './AuthGuard/AdminAuthGuardService';
import { UploadProjectDetailComponent } from './DataUploads/upload-project-detail/upload-project-detail.component';
import { UploadPhyProgReportComponent } from './DataUploads/upload-phy-prog-report/upload-phy-prog-report.component';
import { TwoDigitDecimaNumberDirective } from './Shared/OneDecimalAllow';
import { ProjRelFundFlowComponent } from './financeReport/proj-rel-fund-flow/proj-rel-fund-flow.component';
import { ProjectRelFundFlowComponent } from './DataUploads/project-rel-fund-flow/project-rel-fund-flow.component';
import { AtaGlanceReportComponent } from './financeReport/ata-glance-report/ata-glance-report.component';
import { EditUsersComponent } from './register/edit-users/edit-users.component';
import { DashboardMainFormComponent } from './AdminPanel/dashboard-main-form/dashboard-main-form.component';
// import { DasHComponent } from './CMS/das-h/das-h.component';
// import { ProjectCodeWiseReportComponent } from './DRMC/project-code-wise-report/project-code-wise-report.component';
// import { ProjectDetailsComponent } from './DRMC/project-details/project-details.component';
// import { ProjectReleaseFundFlowComponent } from './DRMC/project-release-fund-flow/project-release-fund-flow.component';
// import { ProjectReleaseOrderComponent } from './DRMC/project-release-order/project-release-order.component';
// import { ProjectUcSubmissionComponent } from './DRMC/project-uc-submission/project-uc-submission.component';
// import { ReportDistrictWiseComponent } from './DRMC/report-district-wise/report-district-wise.component';
// import { ReportStateDistrictCityWiseComponent } from './DRMC/report-state-district-city-wise/report-state-district-city-wise.component';
//import { ReportStateWiseComponent } from './DRMC/report-state-wise/report-state-wise.component';
// import { SchemeMasterComponent } from './DRMC/scheme-master/scheme-master.component';


const routes: Routes = [

  //  {path:'Home',component:HomePageComponent},
  //  {path:'',redirectTo:'Home',pathMatch:'full'},

  { path: 'Login', component: LoginComponent },
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  //  {path:'Login',component:LoginComponent},

  { path: 'Register', component: RegisterComponent },
  { path: 'ChangePassword', component: ChangePasswordComponent },

  // {
  //   path: 'Admin', component:MasterComponent,
  //    children: [
  //      {path: 'Dashboard', component: DashboardMainComponent}

  //   ]
  // },

  {
    path: 'Admin', component: AppAdminLayoutComponent,
    children: [
      { path: 'Dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuardService] },
      { path: 'statemaster', component: StateMasterComponent },
      { path: 'MainGraph', component: DashboardMainComponent },
      { path: 'DashboardHFA1', component: DashboardHFA1Component },
      { path: 'DashboardHFA3', component: DashboardHFA3Component },
      { path: 'DashboardHFA4', component: DashboardHFA4Component },
      { path: 'DashboardHFA5', component: DashboardHFA5Component },
      // {path: 'Statescore1', component: StatescoreComponent},
      { path: 'Statescore1', component: Statescore1Component },
      { path: 'project-details-report/:id', component: ProjectDetailsReportComponent },

      { path: 'AtaGlance', component: AtaGlanceComponent },
      { path: 'AtaGlance1', component: AtaGlance1Component },
      { path: 'AtaGlance3', component: AtaGlance3Component },
      { path: 'AtaGlance3', component: AtaGlance3Component },
      { path: 'AtaGlance4', component: AtaGlance4Component },
      { path: 'AtaGlance5', component: AtaGlance5Component },
      { path: 'phyfinChart', component: PhyfinChartComponent },
      { path: 'ConsphyfinChart', component: ConsPhyFinReportComponent },
      // {path: 'AdminLoginDetails', component: AdminLoginPanelComponent} ,
      { path: 'VerticalHousesDetails', component: VerticalHousesStatusComponent },
      { path: 'IndiaMap', component: IndianmapComponent },
      { path: 'ConstituencyMaster', component: ConstituencyMasterComponent },
      { path: 'Exceljnnurm', component: ExceljnnurmComponent },
      { path: 'ExcelPMAY', component: ExcelPMAYComponent },
      { path: 'ExcelStatescore', component: ExcelStatescoreComponent },
      { path: 'ExcelPhyDashboard', component: ExcelPhyDashboardComponent },
      { path: 'ExcelDemandCityWise', component: ExcelDemandCityWiseComponent },
      
      { path: 'ExcelClssmainmaster', component: ExcelClssmainmasterComponent },

      { path: 'ExcelCLSSCityMain', component: ExcelCLSSCityMainComponent },

      { path: 'UsersMaster', component: UsersMasterComponent },
      { path: 'ConsphyfinChart1', component: ConsPhyFinReportNewComponent },
      { path: 'VerticalFinancialDetails', component: VerticalFinancialStatusComponent },
      { path: 'ClssMasterUpload', component: ClssMasterUploadComponent },
      { path: 'StateScoreUpdationForm', component: StateScoreUpdationFormComponent },
      { path: 'CityMaster', component: CityMasterComponent },

      { path: 'PMAYuCompWise', component: PMAYuCompWiseComponent },
      { path: 'DistrictMaster', component: DistrictMasterComponent },
      { path: 'ComponentMaster', component: ComponentMasterComponent },
      { path: 'SchemeMaster', component: SchemeMasterComponent },
      { path: 'ClassificationMaster', component: ClassificationMasterComponent },
      { path: 'MappingClassificationMaster', component: MappingClassificationMasterComponent },
      { path: 'PMAYuCritical', component: PMAYuCriticalComponent },

      { path: 'DashCMSForm', component: DashboardComponent },
      { path: 'CriticalMonitoring', component: CriticalMonitoringComponent },

      { path: 'PhysicalMonitoring', component: PhysicalMonitoringComponent },
      { path: 'ShortfallDetail', component: ShortfallDetailComponent },

      { path: 'UploadProjectDetail', component: UploadProjectDetailComponent },

      { path: 'UploadPhyProgReport', component: UploadPhyProgReportComponent },

      { path: 'ProjectRelFundFlow', component: ProjectRelFundFlowComponent },
      { path: 'AtaGlanceReport', component: AtaGlanceReportComponent },
      
      { path: 'EditUsers', component: EditUsersComponent },
      { path: 'DashboardMainForm', component: DashboardMainFormComponent },
      
      
    ]
  },
  {
    path: 'DRMC', component: AppAdminLayoutComponent,
    children: [
      { path: 'ClassificationMaster', component: ClassificationMasterComponent },
      { path: 'ReportStateWise', component: ReportStateWiseComponent },
      { path: 'ReportStateDistrictCityWise', component: ReportStateDistrictCityWiseComponent },
      // {path: 'ReportDistrictWise/:statecode', component: ReportDistrictWiseComponent},
      { path: 'ReportDistrictWise', component: ReportDistrictWiseComponent },
      { path: 'project-uc-submission', component: ProjectUcSubmissionComponent },
      { path: 'ProjectReleaseOrder', component: ProjectReleaseOrderComponent },
      { path: 'project-release-fund-flow', component: ProjectReleaseFundFlowComponent },
      { path: 'project-detail', component: ProjectDetailsComponent },
      { path: 'ProjectCodeWiseReport', component: ProjectCodeWiseReportComponent },
      { path: 'physical-progress', component: PhysicalProgressComponent },
      { path: 'ProjectBriefDetail', component: ProjectBriefDetailComponent },


    ]
  },
]


@NgModule({
  declarations: [
    AppComponent,
    AppAdminLayoutComponent,
    AppUserLayoutComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    AllAssignedRoleComponent,
    LoginComponent,
    AllRoleComponent,
    EditRoleComponent,
    RegisterComponent,
    HomePageComponent,
    StateMasterComponent,
    GraphsComponent,
    MasterComponent,
    LandingPageComponent,
    DashboardMainComponent,
    ColorPickerComponent,
    DashboardHFA1Component,
    DashboardHFA3Component,
    DashboardHFA4Component,
    DashboardHFA5Component,
    StatescoreComponent,
    AtaGlanceComponent,
    DynamicCompComponent,
    AtaGlance1Component,
    AtaGlance3Component,
    AtaGlance4Component,
    AtaGlance5Component,
    PhyfinChartComponent,
    TwoDigitDecimaNumberDirective,
    ConsPhyFinReportComponent,
    // AdminLoginPanelComponent,
    VerticalHousesStatusComponent,
    IndiaMapComponent,
    ChangePasswordComponent,
    //DisttMasterComponent,
    AlphaCharacterDirective,
    ExceljnnurmComponent,
    NumberDirective,
    ExcelPMAYComponent,
    ExcelStatescoreComponent,
    UsersMasterComponent,
    ExcelPhyDashboardComponent,
    ConsPhyFinReportNewComponent,
    VerticalFinancialStatusComponent,
    IndianmapComponent,
    Statescore1Component,
    ProjectDetailsReportComponent,
    ExcelDemandCityWiseComponent,
    ExcelClssmainmasterComponent,
    ExcelCLSSCityMainComponent,
    ClssMasterUploadComponent,
    StateScoreUpdationFormComponent,
    CityMasterComponent,
    // ConstutiencyComponent,
    PMAYuCompWiseComponent,
    PhysicalProgressComponent,
    ProjectDetailsComponent,
    ProjectReleaseFundFlowComponent,
    ProjectReleaseOrderComponent,
    ProjectUcSubmissionComponent,
    ReportDistrictWiseComponent,
    ReportStateDistrictCityWiseComponent,
    ReportStateWiseComponent,
    ProjectBriefDetailComponent,
    ProjectCodeWiseReportComponent,
    DistrictMasterComponent,
    ConstituencyMasterComponent,
    ClassificationMasterComponent,
    ComponentMasterComponent,
    MappingClassificationMasterComponent,
    SchemeMasterComponent,
    PMAYuCriticalComponent,
    DashboardComponent,
    CriticalMonitoringComponent,
    PhysicalMonitoringComponent,
    ShortfallDetailComponent,
    UploadProjectDetailComponent,
    UploadPhyProgReportComponent,
    ProjRelFundFlowComponent,
    ProjectRelFundFlowComponent,
    AtaGlanceReportComponent,
    EditUsersComponent,
    DashboardMainFormComponent,
    // DasHComponent 
  ],
  imports: [
    CountoModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    NgxPaginationModule,
    NgbModule,
    Ng2SearchPipeModule,
    ExportAsModule,
    NgxPrintModule,
    RouterModule.forRoot(routes),
    RouterModule.forRoot(routes),
    SnotifyModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),

  ],

  //   providers: [HttpClientModule,
  //     NgbActiveModal,
  //   GlobalEvent],
  //   bootstrap: [AppComponent],
  //   entryComponents:[StatescoreComponent]
  // })


  providers: [DatePipe,HttpClientModule, AdminAuthGuardService,
    NgbActiveModal,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService, AdminSandbox, DatePipe,
    GlobalEvent, GlobalUrl],
  bootstrap: [AppComponent],
  entryComponents: [StatescoreComponent]
})

export class AppModule { }
