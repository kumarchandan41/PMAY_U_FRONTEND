import { Injectable, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { saveAs as importedSaveAs } from "file-saver";
import { DatePipe } from '@angular/common';
import { UserService } from '../admin-service/user.service';

@Injectable()
export class AdminSandbox {
  public submitted: boolean = false;
  showProperty = "none";
  schemeMaster: any[] = [];
  EditScheme: any[] = [];
  schemeComponentMaster: any[] = [];
  stateMaster: any[] = [];
  districtMaster: any[] = [];
  EditDistrict: any[] = [];
  EditConstituency: any[] = [];
  EditSchemeMaster = {
    "txtSchemeShortName": "",
    "txtSchemeName": "",
    "hiddendTxtSchemeID": "",
    "txtPeriodScheme": ""
  }
  EditSchemeComponentMaster = {
    "ddlMajorScheme": "",
    "txtSchemeComponentShortName": "",
    "hiddendTxtSchemeComponentID": "",
    "txtSchemeComponentName": ""
  }
  EditStateMaster = {
    "txtStateName": "",
    "txtStateCode": "",
    "hiddendTxtStateID": "",
    "txtGovernment": ""
  }
  EditDistrictMaster = {
    "ddlStateCode": "",
    "txtDistrictName": "",
    "hiddendTxtDistrictID": "",
    "txtDistrictCode": "",
    "radioBackwardDistrict": "",
    "radioMinority": ""
  }
  EditConstituencyMaster = {
    "ddlCity": "",
    "txtConstituencyNumber": "",
    "hiddendTxtConstituencyID": "",
    "txtConstituencyName": "",
    "txtShittingMP": ""
  }
  EditCityMaster = {
    "ddlDistrictCode": "",
    "txtCityName": "",
    "hiddendTxtCityID": "",
    "txtCityCode": "",
    "ddlStateCode": ""
  }
  EditProjectDetailMaster = {
    "ddlStateCode": "",
    "ddlDistrictCode": "",
    "ddlCity": "",
    "txtCMCDate": "",
    "txtCSMCNumber": "",
    "ddlScheme": "",
    "ddlStatus": "",
    "txtProjectTitle": "",
    "txtProjectCost": "",
    "txtCentralAssist": "",
    "txtStateGrant": "",
    "txtULB": "",
    "txtBeneficiaryShare": "",
    "txtNewSanction": "",
    "txtUpgrade": "",
    "txtTotalSanction": "",
    "txtAmountInstallment": "",
    "hiddendTxtProjectID": "",
    "txtOther": "",
    "ddlDuration": "",
    "ddlComponent": "",
    "ddlAgency": ""
  }

  EditSchemeComponent: any[] = [];
  EditState: any[] = [];
  constituencyMaster: any[] = [];
  SelectedConstituencyID: any[] = [];
  cityMaster: any[] = [];
  EditCity: any[] = [];
  stateDistrictMaster: any[] = [];
  districtCityMaster: any[] = [];
  totalSanction: any;
  installment: any;
  projectCode: any;
  projectId: any;
  projectDetailMaster: any[] = [];
  EditProjectDetail: any[] = [];
  schComponentMaster: any[] = [];
  ProjectOtherCost: any;
  agencyMaster: any[] = [];
  showAgency: "none";
  AgencyState: any[] = [];
  AgencyDistrict: any[] = [];
  AgencyCity: any[] = [];
  ProjectAgency: any[] = [];
  showEditAgency: "none";
  EditProjectCityCode: any[] = [];
  EditProjectAgency: any[] = [];
  constituencyCityMaster: any[] = [];
  physicalProgressMaster: any[] = [];
  totalHouse: number;
  PhysicalProgress: any[] = [];
  totalCompleletedHouse: any[] = [];
  nonStarter: any;
  releaseFundFlow: any[] = [];
  csmcNumberMaster: any[] = [];
  projectNameMaster: any[] = [];
  projectTitle: any[] = [];
  projectCodeMaster: any[] = [];
  ReleaseProjectCode: any[] = [];
  reportStateWise: any[] = [];
  reportStateDistrictWise: any[] = [];
  reportStateDistrictCityWise: any[] = [];
  reportProjectCodeWise: any[] = [];
  reportState: any[] = [];
  reportDistrict: any[] = [];
  reportCity: any[] = [];
  releaseUC: any[] = [];
  totalReleaseInstallment1: any[] = [];
  totalUCInstallment1: any[] = [];
  totalReleaseInstallment2: any[] = [];
  totalUCInstallment2: any[] = [];
  totalReleaseInstallment3: any[] = [];
  totalUCInstallment3: any[] = [];
  releaseOrderValue: any[] = [];
  pdf: any[] = [];
  ucOrderValue: any[] = [];
  projectBriefName: any[] = [];
  Slum: any;
  projectBriefDetail: any[] = [];
  ProjectBriefDetailCost: any;
  classificationMaster: any[] = [];
  EditClassificationComponent: any[]=[];
  EditClassificationComponentMaster = {
    "hiddendTxtDescriptionID": "",
    "txtDescription": "",
    "txtDCode": "",
    "radioApplicable": ""
  }
  projectClassificationName: any[]=[];
  stateClassificationMapping: any[]=[];
  stateMapingResult: any[]=[];
  districtMapingResult: any[]=[];
  cityMapingResult: any[]=[];
  projectMapingResult: any[]=[];


  constructor(private datePipe: DatePipe, private router: Router, protected userMasterService: UserService, private snotifyService: SnotifyService) { }

  //----for scheme add,edit and delete------////
  getSchemeData() {
    this.userMasterService.getSchemeData().subscribe(data => {
      this.schemeMaster = data;
    });
  }
  postScheme(formGroup: any) {
    var objPost =
    {
      "SchemeShortName": formGroup.get('txtSchemeShortName').value,
      "SchemeName": formGroup.get('txtSchemeName').value,
      "SchemePeriod": formGroup.get('txtPeriodScheme').value,
      "ActiveFlag": "",
      "CreatedOn": "",
      "CreatedBy": "",
      "UpdatedOn": "",
      "UpdatedBy": ""
    }
    this.userMasterService.postSchemeData(objPost).subscribe((data: any) => {
      if (data.status == "200") {
        this.snotifyService.success("Scheme Save Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else if (data.status != "200") {
        this.snotifyService.error("Scheme  Already Exist...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else {
        this.snotifyService.error("Error...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      this.getSchemeData();

    });

  }
  deleteSchemeData(SchemeId: any) {
    this.userMasterService.deleteSchemeData(SchemeId).subscribe(data => {
      if (data.status == "200") {
        this.snotifyService.success("Scheme Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else {
        this.snotifyService.error("Scheme Not Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      this.getSchemeData();

    });
  }
  editSchemeMaster(value: any, row: any) {
    this.EditScheme = row
    this.showProperty = value;
    this.EditSchemeMaster.txtSchemeShortName = row.SchemeShortName;
    this.EditSchemeMaster.txtSchemeName = row.SchemeName;
    this.EditSchemeMaster.hiddendTxtSchemeID = row.SchemeId;
    this.EditSchemeMaster.txtPeriodScheme = row.SchemePeriod;
  }
  updateSchemeMaster() {

    if (this.EditSchemeMaster.txtSchemeShortName != null && this.EditSchemeMaster.txtSchemeShortName != "" && this.EditSchemeMaster.txtSchemeShortName != undefined) {
      if (this.EditSchemeMaster.txtSchemeName != null && this.EditSchemeMaster.txtSchemeName != "" && this.EditSchemeMaster.txtSchemeName != undefined) {
        if (this.EditSchemeMaster.txtPeriodScheme != null && this.EditSchemeMaster.txtPeriodScheme != "" && this.EditSchemeMaster.txtPeriodScheme != undefined) {
          var objPost =
          {
            "SchemeShortName": this.EditSchemeMaster.txtSchemeShortName,
            "SchemeName": this.EditSchemeMaster.txtSchemeName,
            "SchemePeriod": this.EditSchemeMaster.txtPeriodScheme,
            "SchemeId": this.EditSchemeMaster.hiddendTxtSchemeID,
            "ActiveFlag": "",
            "CreatedOn": "",
            "CreatedBy": "",
            "UpdatedOn": "",
            "UpdatedBy": ""

          }
          this.userMasterService.updateSchemeData(JSON.stringify(objPost)).subscribe((data: any) => {
            this.showProperty = 'none';
            this.EditSchemeMaster = {
              "txtSchemeShortName": "",
              "txtSchemeName": "",
              "hiddendTxtSchemeID": "",
              "txtPeriodScheme": ""

            }
            if (data.status == "200") {
              this.snotifyService.success("Scheme Updated Successfully...", "", {
                position: SnotifyPosition.rightTop,
                timeout: 2500
              });
            }
            else {
              this.snotifyService.error("Scheme Not Updated Successfully...", "", {
                position: SnotifyPosition.rightTop,
                timeout: 2500
              });
            }
            this.getSchemeData();
          });
        }
        else {
          this.snotifyService.error("Please Enter Period of Scheme...", "", {
            position: SnotifyPosition.rightTop,
            timeout: 2500
          });
        }
      }
      else {
        this.snotifyService.error("Please Enter Name Of Scheme...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
    }
    else {
      this.snotifyService.error("Please Enter Major Scheme Short Name...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 2500
      });
    }
  }

  //----for components add,edit and delete------////
  getSchemeComponentData(SchemeName: any) {
    this.userMasterService.getSchemeComponentData(SchemeName).subscribe(data => {
      this.schemeComponentMaster = data;

    });
  }
  postSchemeComponent(formGroup: any) {
    var objPost =
    {
      "SchemeShortName": formGroup.get('ddlMajorScheme').value,
      "Cname": formGroup.get('txtSchemeComponentShortName').value,
      "SchemeComponentName": formGroup.get('txtSchemeComponentName').value,
      "ActiveFlag": "",
      "CreatedOn": "",
      "CreatedBy": "",
      "UpdatedOn": "",
      "UpdatedBy": ""
    }
    var componentScheme = formGroup.get('ddlMajorScheme').value;
    this.userMasterService.postSchemeComponentData(objPost).subscribe((data: any) => {
      if (data.status == "200") {
        this.snotifyService.success("Scheme Components Save Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      else if (data.status != "200") {
        this.snotifyService.error("Scheme Components Already Exist...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      else {
        this.snotifyService.error("Error...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      this.getSchemeComponentData(componentScheme);

    });

  }
  deleteSchemeComponentData(SchemeComponentId: any) {
    this.userMasterService.deleteSchemeComponentData(SchemeComponentId).subscribe(data => {
      if (data.status == "200") {
        this.snotifyService.success("Scheme Components Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      else {
        this.snotifyService.error("Scheme Components Not Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      this.schemeComponentMaster = [];


    });
  }
  editSchemeComponentMaster(value: any, row: any) {
    this.EditSchemeComponent = row
    this.showProperty = value;
    this.EditSchemeComponentMaster.ddlMajorScheme = row.SchemeShortName;
    this.EditSchemeComponentMaster.txtSchemeComponentShortName = row.Cname;
    this.EditSchemeComponentMaster.hiddendTxtSchemeComponentID = row.Cid;
    this.EditSchemeComponentMaster.txtSchemeComponentName = row.SchemeComponentName;
  }
  updateSchemeComponentMaster() {
    if (this.EditSchemeComponentMaster.ddlMajorScheme != null && this.EditSchemeComponentMaster.ddlMajorScheme != "" && this.EditSchemeComponentMaster.ddlMajorScheme != undefined) {
      if (this.EditSchemeComponentMaster.txtSchemeComponentShortName != null && this.EditSchemeComponentMaster.txtSchemeComponentShortName != "" && this.EditSchemeComponentMaster.txtSchemeComponentShortName != undefined) {
        if (this.EditSchemeComponentMaster.txtSchemeComponentName != null && this.EditSchemeComponentMaster.txtSchemeComponentName != "" && this.EditSchemeComponentMaster.txtSchemeComponentName != undefined) {
          var objPost =
          {
            "Cname": this.EditSchemeComponentMaster.txtSchemeComponentShortName,
            "SchemeComponentName": this.EditSchemeComponentMaster.txtSchemeComponentName,
            "SchemeShortName": this.EditSchemeComponentMaster.ddlMajorScheme,
            "Cid": this.EditSchemeComponentMaster.hiddendTxtSchemeComponentID,
            "ActiveFlag": "",
            "CreatedOn": "",
            "CreatedBy": "",
            "UpdatedOn": "",
            "UpdatedBy": ""

          }
          var editScheme = this.EditSchemeComponentMaster.ddlMajorScheme;
          this.userMasterService.updateSchemeComponentData(JSON.stringify(objPost)).subscribe((data: any) => {
            this.showProperty = 'none';
            this.EditSchemeComponentMaster = {
              "ddlMajorScheme": "",
              "txtSchemeComponentShortName": "",
              "hiddendTxtSchemeComponentID": "",
              "txtSchemeComponentName": ""
            }
            if (data.status == "200") {
              this.snotifyService.success("Scheme Components Updated Successfully...", "", {
                position: SnotifyPosition.rightTop,
                timeout: 2500
              });
            }
            else {
              this.snotifyService.error("Scheme Components Not Updated Successfully...", "", {
                position: SnotifyPosition.rightTop,
                timeout: 2500
              });
            }
            this.getSchemeComponentData(editScheme);

          });
        }
        else {
          this.snotifyService.error("Please Enter Name Of Scheme Components....", "", {
            position: SnotifyPosition.rightTop,
            timeout: 2500
          });
        }
      }
      else {
        this.snotifyService.error("Please Enter Major Scheme Components Short Name....", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
    }
    else {
      this.snotifyService.error("Please Enter Short Name Of Major Scheme ....", "", {
        position: SnotifyPosition.rightTop,
        timeout: 2500
      });
    }
  }

  //----for state add,edit and delete------////
  getStateData() {
     
      this.userMasterService.getStateData().subscribe(data => {
        // console.log(data);
      this.stateMaster = data;
    });
  }
  postStateData(formGroup: any) {
    var objPost =
    {
      "States_UT": formGroup.get('txtStateName').value,
      "Codes": formGroup.get('txtStateCode').value,
      "Division": formGroup.get('txtGovernment').value,
      "Status": "Active",
      "CreatedOn": new Date().toISOString(),
      "CreatedBy": "",
      "UpdatedOn": "",
      "UpdatedBy": ""
    }
    this.userMasterService.postStateData(objPost).subscribe((data: any) => {
      if (data.status == "200") {
        this.snotifyService.success("State Save Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else if (data.status != "200") {
        this.snotifyService.error("State  Already Exist...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else {
        this.snotifyService.success("Error...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      this.getStateData();

    });

  }
  deleteStateData(SchemeComponentId: any) {
    
    this.userMasterService.deleteStateData(SchemeComponentId).subscribe(data => {
      // console.log(data);
      if (data.status == "200") {
        this.snotifyService.success("State Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      else {
        this.snotifyService.error("State Not Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      this.getStateData();

    });
  }
  editStateMaster(value: any, row: any) {
    this.EditState = row
    this.showProperty = value;
    this.EditStateMaster.txtStateName = row.States_UT;
    this.EditStateMaster.txtStateCode = row.Codes;
    this.EditStateMaster.hiddendTxtStateID = row.StateId;
    this.EditStateMaster.txtGovernment = row.Division;
  }
  updateStateMaster() {
    if (this.EditStateMaster.txtStateName != null && this.EditStateMaster.txtStateName != "" && this.EditStateMaster.txtStateName != undefined) {
      if (this.EditStateMaster.txtStateCode != null && this.EditStateMaster.txtStateCode != "" && this.EditStateMaster.txtStateCode != undefined) {
        if (this.EditStateMaster.txtGovernment != null && this.EditStateMaster.txtGovernment != "" && this.EditStateMaster.txtGovernment != undefined) {
          var objPost =
          {
            "States_UT": this.EditStateMaster.txtStateName,
            "Codes": this.EditStateMaster.txtStateCode,
            "Division": this.EditStateMaster.txtGovernment,
            "StateId": this.EditStateMaster.hiddendTxtStateID,
            "ActiveFlag": "Active",
            "CreatedOn": "",
            "CreatedBy": "",
            "UpdatedOn": new Date().toISOString(), 
            "UpdatedBy": ""

          }
          this.userMasterService.updateStateData(JSON.stringify(objPost)).subscribe((data: any) => {
            this.showProperty = 'none';
            this.EditStateMaster = {
              "txtStateName": "",
              "txtStateCode": "",
              "hiddendTxtStateID": "",
              "txtGovernment": ""
            }
            if (data.status == "200") {
              this.snotifyService.success("State Updated Successfully...", "", {
                position: SnotifyPosition.rightTop,
                timeout: 2500
              });
              setTimeout(function(){ this.getStateData(); }, 3000);
              
            }
            else {
              this.snotifyService.error("State Not Updated Successfully...", "", {
                position: SnotifyPosition.rightTop,
                timeout: 2500
              });
            }
          });
        }
        else {
          this.snotifyService.error("Please Enter Government....", "", {
            position: SnotifyPosition.rightTop,
            timeout: 2500
          });
        }
        this.getStateData();
      }
      else {
        this.snotifyService.error("Please Enter State Code....", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
    }
    else {
      this.snotifyService.error("Please Enter State Name....", "", {
        position: SnotifyPosition.rightTop,
        timeout: 2500
      });
    }
  }

  //----for district add,edit and delete------////
  getDistrictData(statecode: any) {

    this.userMasterService.getDistrictData(statecode).subscribe(data => {
      this.districtMaster = data;
    });
  }
  postDistrictData(formGroup: any) {
    var objPost =
    {
      "District": formGroup.get('txtDistrictName').value,
      "StateCode": formGroup.get('ddlStateCode').value,
      "Dcode": formGroup.get('txtDistrictCode').value,
      "BackwardDistrict": formGroup.get('radioBackwardDistrict').value,
      "Minority": formGroup.get('radioMinority').value,
      "ActiveFlag": "",
      "CreatedOn": "",
      "CreatedBy": "",
      "UpdatedOn": "",
      "UpdatedBy": ""
    }
    var StateCode = formGroup.get('ddlStateCode').value;
    this.userMasterService.postDistrictData(objPost).subscribe((data: any) => {
      if (data.status == "200") {
        this.snotifyService.success("District Save Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else if (data.status != "200") {
        this.snotifyService.error("District  Already Exist...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else {
        this.snotifyService.error("Error...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      this.getDistrictData(StateCode);
      // this.districtMaster=[];
    });

  }
  deleteDistrictData(DistrictId: any) {

    this.userMasterService.deleteDistrictData(DistrictId).subscribe(data => {
      if (data.status == "200") {
        this.snotifyService.success("District Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      else {
        this.snotifyService.error("District Not Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      this.districtMaster = [];
    });
  }
  editDistrictMaster(value: any, row: any) {
    this.EditDistrict = row
    this.showProperty = value;
    this.EditDistrictMaster.ddlStateCode = row.StateCode;
    this.EditDistrictMaster.hiddendTxtDistrictID = row.DisttId;
    this.EditDistrictMaster.txtDistrictCode = row.Dcode;
    this.EditDistrictMaster.txtDistrictName = row.District;
    this.EditDistrictMaster.radioBackwardDistrict = row.BackwardDistrict;
    this.EditDistrictMaster.radioMinority = row.Minority;
  }
  updateDistrictMaster() {

    if (this.EditDistrictMaster.ddlStateCode != null && this.EditDistrictMaster.ddlStateCode != "" && this.EditDistrictMaster.ddlStateCode != undefined) {
      if (this.EditDistrictMaster.txtDistrictName != null && this.EditDistrictMaster.txtDistrictName != "" && this.EditDistrictMaster.txtDistrictName != undefined) {
        if (this.EditDistrictMaster.txtDistrictCode != null && this.EditDistrictMaster.txtDistrictCode != "" && this.EditDistrictMaster.txtDistrictCode != undefined) {
          var objPost =
          {
            "DisttId": this.EditDistrictMaster.hiddendTxtDistrictID,
            "StateCode": this.EditDistrictMaster.ddlStateCode,
            "District": this.EditDistrictMaster.txtDistrictName,
            "Dcode": this.EditDistrictMaster.txtDistrictCode,
            "BackwardDistrict": this.EditDistrictMaster.radioBackwardDistrict,
            "Minority": this.EditDistrictMaster.radioMinority,
            "ActiveFlag": "",
            "CreatedOn": "",
            "CreatedBy": "",
            "UpdatedOn": "",
            "UpdatedBy": ""

          }
          var editStateCode = this.EditDistrictMaster.ddlStateCode;
          this.userMasterService.updateDistrictData(JSON.stringify(objPost)).subscribe((data: any) => {
            this.showProperty = 'none';
            this.EditDistrictMaster = {
              "ddlStateCode": "",
              "txtDistrictName": "",
              "hiddendTxtDistrictID": "",
              "txtDistrictCode": "",
              "radioBackwardDistrict": "",
              "radioMinority": ""
            }
            if (data.status == "200") {
              this.snotifyService.success("District Updated Successfully...", "", {
                position: SnotifyPosition.rightTop,
                timeout: 2500
              });
            }
            else {
              this.snotifyService.error("District Not Updated Successfully...", "", {
                position: SnotifyPosition.rightTop,
                timeout: 2500
              });
            }
            this.getDistrictData(editStateCode);

          });
        }
        else {
          this.snotifyService.error("Please Enter District Code...", "", {
            position: SnotifyPosition.rightTop,
            timeout: 2500
          });
        }
      }
      else {
        this.snotifyService.error("Please Enter District Name...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
    }
    else {
      this.snotifyService.error("Please Select State Name...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 2500
      });
    }
  }

  //----for constituency add,edit and delete------////
  getCityConsistuencyData() {
    this.userMasterService.getCityConstituencyData().subscribe(data => {
      this.constituencyCityMaster = data;
    });
  }
  getConsistuencyData() {
    this.userMasterService.getConsistuencyData().subscribe(data => {
      this.constituencyMaster = data;
    });
  }
  postConstituency(formGroup: any) {
    var objPost =
    {
      "ConstituencyName": formGroup.get('txtConstituencyName').value,
      "CityCode": formGroup.get('ddlCity').value,
      "ConstituencyNumber": formGroup.get('txtConstituencyNumber').value,
      "NameShittingMp": formGroup.get('txtShittingMP').value,
      "ActiveFlag": "",
      "CreatedOn": "",
      "CreatedBy": "",
      "UpdatedOn": "",
      "UpdatedBy": ""
    }
    this.userMasterService.postConstituencyData(objPost).subscribe((data: any) => {
      if (data.StatusCode == "OK") {
        this.snotifyService.success("Constituency Save Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else if (data.StatusCode == "BadRequest") {
        this.snotifyService.error("Constituency  Already Exist...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else {
        this.snotifyService.error("Error...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      this.getConsistuencyData();

    });

  }
  deleteConstituencyData(ConstituencyId: any) {
    this.userMasterService.deleteConstituencyData(ConstituencyId).subscribe(data => {
      if (data.StatusCode == "OK") {
        this.snotifyService.success("Constituency Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      else {
        this.snotifyService.error("Constituency Not Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      this.getConsistuencyData();

    });
  }
  editConstituencyMaster(value: any, row: any) {
    this.EditConstituency = row
    this.showProperty = value;
    this.EditConstituencyMaster.ddlCity = row.CityCode;
    this.EditConstituencyMaster.hiddendTxtConstituencyID = row.ConstituencyId;
    this.EditConstituencyMaster.txtConstituencyName = row.ConstituencyName;
    this.EditConstituencyMaster.txtConstituencyNumber = row.ConstituencyNumber;
    this.EditConstituencyMaster.txtShittingMP = row.NameShittingMp;


  }
  updateConstituencyMaster() {
    if (this.EditConstituencyMaster.ddlCity != null && this.EditConstituencyMaster.ddlCity != "" && this.EditConstituencyMaster.ddlCity != undefined) {
      if (this.EditConstituencyMaster.txtConstituencyName != null && this.EditConstituencyMaster.txtConstituencyName != "" && this.EditConstituencyMaster.txtConstituencyName != undefined) {
        if (this.EditConstituencyMaster.txtConstituencyNumber != null && this.EditConstituencyMaster.txtConstituencyNumber != "" && this.EditConstituencyMaster.txtConstituencyNumber != undefined) {
          if (this.EditConstituencyMaster.txtShittingMP != null && this.EditConstituencyMaster.txtShittingMP != "" && this.EditConstituencyMaster.txtShittingMP != undefined) {
            var objPost =
            {
              "ConstituencyId": this.EditConstituencyMaster.hiddendTxtConstituencyID,
              "ConstituencyName": this.EditConstituencyMaster.txtConstituencyName,
              "ConstituencyNumber": this.EditConstituencyMaster.txtConstituencyNumber,
              "NameShittingMp": this.EditConstituencyMaster.txtShittingMP,
              "CityCode": this.EditConstituencyMaster.ddlCity,
              "ActiveFlag": "",
              "CreatedOn": "",
              "CreatedBy": "",
              "UpdatedOn": "",
              "UpdatedBy": ""

            }
            this.userMasterService.updateConstituencyData(JSON.stringify(objPost)).subscribe((data: any) => {
              this.showProperty = 'none';
              this.EditConstituencyMaster = {
                "ddlCity": "",
                "txtConstituencyNumber": "",
                "hiddendTxtConstituencyID": "",
                "txtConstituencyName": "",
                "txtShittingMP": "",


              }
              if (data.StatusCode == "OK") {
                this.snotifyService.success("Constituency Updated Successfully...", "", {
                  position: SnotifyPosition.rightTop,
                  timeout: 2500
                });
              }
              else {
                this.snotifyService.error("Constituency Not Updated Successfully...", "", {
                  position: SnotifyPosition.rightTop,
                  timeout: 2500
                });
              }
              this.getConsistuencyData();
            });
          }
          else {
            this.snotifyService.error("Please Enter Name Of Shitting MP...", "", {
              position: SnotifyPosition.rightTop,
              timeout: 2500
            });
          }
        }
        else {
          this.snotifyService.error("Please Enter Constituency Number...", "", {
            position: SnotifyPosition.rightTop,
            timeout: 2500
          });
        }
      }
      else {
        this.snotifyService.error("Please Enter Constituency Name...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
    }
    else {
      this.snotifyService.error("Please Select City Number...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 2500
      });
    }


  }

  //----for city add,edit and delete------////
  postCityData(formGroup: any) {

    var objPost =
    {
      "Dcode": formGroup.get('ddlDistrictCode').value,
      "City": formGroup.get('txtCityName').value,
      "CityCode": formGroup.get('txtCityCode').value,
      "StateCode": formGroup.get('ddlStateCode').value,
      "ActiveFlag": "",
      "CreatedOn": "",
      "CreatedBy": "",
      "UpdatedOn": "",
      "UpdatedBy": ""
    }
    var cityStateCode = formGroup.get('ddlStateCode').value;
    var cityDistrictCode = formGroup.get('ddlDistrictCode').value
    this.userMasterService.postCityData(objPost).subscribe((data: any) => {
      if (data.status == "200") {
        this.snotifyService.success("City Save Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else if (data.status != "200") {
        this.snotifyService.error("City  Already Exist...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else {
        this.snotifyService.error("Error...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      this.getCityData(cityStateCode, cityDistrictCode);

    });

  }
  getCityData(statecode: any, districtcode: any) {
    this.userMasterService.getCityData(statecode, districtcode).subscribe(data => {
      this.cityMaster = data;
    });
  }
  deleteCityData(CityId: any) {
    this.userMasterService.deleteCityData(CityId).subscribe(data => {
      if (data.status == "200") {
        this.snotifyService.success("City Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      else {
        this.snotifyService.error("City Not Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      // this.getCityData();
      this.cityMaster = [];
    });
  }
  editCityMaster(value: any, row: any) {

    this.getStateDistrictData(row.StateCode);
    this.EditCity = row
    this.showProperty = value;
    this.EditCityMaster.ddlDistrictCode = row.Dcode;
    this.EditCityMaster.hiddendTxtCityID = row.CityId;
    this.EditCityMaster.txtCityCode = row.CityCode;
    this.EditCityMaster.txtCityName = row.City;
    this.EditCityMaster.ddlStateCode = row.StateCode;
  }
  updateCityMaster() {
    if (this.EditCityMaster.ddlDistrictCode != null && this.EditCityMaster.ddlDistrictCode != "" && this.EditCityMaster.ddlDistrictCode != undefined) {
      if (this.EditCityMaster.txtCityName != null && this.EditCityMaster.txtCityName != "" && this.EditCityMaster.txtCityName != undefined) {
        if (this.EditCityMaster.txtCityCode != null && this.EditCityMaster.txtCityCode != "" && this.EditCityMaster.txtCityCode != undefined) {
          var objPost =
          {
            "CityId": this.EditCityMaster.hiddendTxtCityID,
            "Dcode": this.EditCityMaster.ddlDistrictCode,
            "City": this.EditCityMaster.txtCityName,
            "StateCode": this.EditCityMaster.ddlStateCode,
            "CityCode": this.EditCityMaster.txtCityCode,
            "ActiveFlag": "",
            "CreatedOn": "",
            "CreatedBy": "",
            "UpdatedOn": "",
            "UpdatedBy": ""

          }
          var editCityStateCode = this.EditCityMaster.ddlStateCode;
          var editDistrictCode = this.EditCityMaster.ddlDistrictCode;
          this.userMasterService.updateCityData(JSON.stringify(objPost)).subscribe((data: any) => {
            this.showProperty = 'none';
            this.EditCityMaster = {
              "ddlDistrictCode": "",
              "txtCityName": "",
              "hiddendTxtCityID": "",
              "txtCityCode": "",
              "ddlStateCode": ""

            }
            if (data.status == "200") {
              this.snotifyService.success("City Updated Successfully...", "", {
                position: SnotifyPosition.rightTop,
                timeout: 2500
              });
            }
            else {
              this.snotifyService.error("City Not Updated Successfully...", "", {
                position: SnotifyPosition.rightTop,
                timeout: 2500
              });
            }
            this.getCityData(editCityStateCode, editDistrictCode);

          });
        }
        else {
          this.snotifyService.error("Please Enter City Code...", "", {
            position: SnotifyPosition.rightTop,
            timeout: 2500
          });
        }
      }
      else {
        this.snotifyService.error("Please Enter City Name...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
    }
    else {
      this.snotifyService.error("Please Select District Name...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 2500
      });
    }
  }
  //-----get district on behalf of state----//
  getStateDistrictData(StateCode: any) {
    this.userMasterService.getStateDistrictData(StateCode).subscribe(data => {
      this.stateDistrictMaster = data;
    });
  }
  //-----get city on behalf of district----//
  getDistrictCityData(DistrictCode: any) {
    this.userMasterService.getDistrictCityData(DistrictCode).subscribe(data => {
      this.districtCityMaster = data;


    });
  }
  //-----get csmcnumber on behalf of city----//
  getCSMCNumber(CityCode: any) {
    this.userMasterService.getCSMCNumber(CityCode).subscribe(data => {
      this.csmcNumberMaster = data;
    });
  }
  //-----get projectName on behalf of csmcnumber----//
  getProjectName(statecode: any, districtcode: any, citycode: any, csmcnumber: any) {
    this.userMasterService.getProjectName(statecode, districtcode, citycode, csmcnumber).subscribe(data => {
      this.projectTitle = data;
    });
  }
  //-----get projectCode on behalf of projectName----//
  getProjectCode(statecode: any, districtcode: any, citycode: any, csmcnumber: any, projectName: any) {
    this.userMasterService.getProjectCode(statecode, districtcode, citycode, csmcnumber, projectName).subscribe(data => {
      this.projectCodeMaster = data;
      this.ReleaseProjectCode = this.projectCodeMaster[0].ProjectCode

    });
  }

  //----for project details add,edit and delete------////
  AddSanction(txtNewSanction: any, txtUpgradeSanction: any) {
    let newSanction = txtNewSanction;
    let newUpgarde = txtUpgradeSanction;
    this.totalSanction = (+newSanction + +newUpgarde);
  }
  AddFirstInstallment(txtCentralAssist: any) {
    let CentralAssist = txtCentralAssist;
    this.installment = CentralAssist / 100 * 40;
  }

  OtherCost(txtProjectCost: any, txtCentralAssist: any, txtStateGrant: any, txtULB: any, txtBeneficiaryShare: any) {
    let ProjectCost = txtProjectCost;
    let CentralAssistance = txtCentralAssist;
    let StateGrant = txtStateGrant;
    let ULB = txtULB;
    let BeneficiaryShare = txtBeneficiaryShare;
    this.ProjectOtherCost = -(-ProjectCost - -CentralAssistance + +StateGrant + +ULB + +BeneficiaryShare);
  }
  postProjectDetailsData(formGroup: any) {
    let c = new Date(formGroup.get('txtCMCDate').value);
    var postdate1 = ("0" + (c.getMonth() + 1)).slice(-2) + "-" + c.getDate() + "-" + c.getFullYear();
    var objPost =
    {
      "StateCode": formGroup.get('ddlStateCode').value,
      "DistrictCode": formGroup.get('ddlDistrictCode').value,
      "CityCode": formGroup.get('ddlCity').value,
      "CSMCDate": postdate1,
      "CSMCNumber": formGroup.get('txtCSMCNumber').value,
      "Scheme": formGroup.get('ddlScheme').value,
      "ProjectStatus": formGroup.get('ddlStatus').value,
      "ProjectTitle": formGroup.get('txtProjectTitle').value,
      "ProjectCost": formGroup.get('txtProjectCost').value,
      "CentralAssistance": formGroup.get('txtCentralAssist').value,
      "StateGrant": formGroup.get('txtStateGrant').value,
      "ULB": formGroup.get('txtULB').value,
      "BeneficiaryShare": formGroup.get('txtBeneficiaryShare').value,
      "NewSanction": formGroup.get('txtNewSanction').value,
      "UpgradeSanction": formGroup.get('txtUpgrade').value,
      "TotalSanction": this.totalSanction,
      "FirstInstallment": this.installment,
      "SchemeComponent": formGroup.get('ddlComponent').value,
      "ProjectDuration": formGroup.get('ddlDuration').value,
      "OtherCost": this.ProjectOtherCost,
      "ProjectAgencies": formGroup.get('ddlAgency').value,
      "ActiveFlag": "",
      "CreatedOn": "",
      "CreatedBy": ""

    }
    var projectStateCode = formGroup.get('ddlStateCode').value;
    var projectDistrictCode = formGroup.get('ddlDistrictCode').value;
    var projectCityCode = formGroup.get('ddlCity').value;
    this.userMasterService.postProjectDetailsData(objPost).subscribe((data: any) => {
      this.projectCode = data.StatusCode;
      this.projectId = data.Message;

      var objPost =
      {
        "ProjectId": this.projectId,
        "ProjectCode": this.projectCode,

      }
      this.userMasterService.postProjectCodeData(objPost).subscribe((data: any) => {
        if (data.StatusCode != "") {
          this.snotifyService.success("Project Save Successfully...", "", {
            position: SnotifyPosition.rightTop,
            timeout: 3000
          });
        }
        else {
          this.snotifyService.error("Error...", "", {
            position: SnotifyPosition.rightTop,
            timeout: 3000
          });
        }
        this.getProjectDetailData(projectStateCode, projectDistrictCode, projectCityCode, null, null);
        //this.ProjectAgency = [];
      });
    });

  }
  getProjectDetailData(statecode: any, districtcode: any, citycode: any, scheme: any, component: any) {

    if (districtcode == "" || citycode == "") {
      districtcode = null;
      citycode = null;
    }

    this.userMasterService.getProjectDetailsData(statecode, districtcode, citycode, scheme, component).subscribe(data => {
      this.projectDetailMaster = data;
    });
  }
  deleteProjectDetailData(ProjectId: any) {

    this.userMasterService.deleteProjectDetailData(ProjectId).subscribe(data => {
      if (data.StatusCode == "OK") {
        this.snotifyService.success("Project Details Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      else {
        this.snotifyService.error("Project Details Not Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      //  this.getProjectDetailData();
      this.projectDetailMaster = [];

    });
  }
  editProjectDetailMaster(value: any, row: any) {
    let d = new Date(row.CSMCDate);
    var getdate = d.getDate() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
    this.installment = row.FirstInstallment;
    this.totalSanction = row.TotalSanction;
    this.ProjectOtherCost = row.OtherCost;
    this.getProjectSchemeComponentData(row.Scheme);
    this.getAgencyData(row.CityCode);
    this.getStateDistrictData(row.Codes);
    this.getDistrictCityData(row.Dcode);

    this.EditProjectDetail = row
    this.showProperty = value;
    this.EditProjectDetailMaster.ddlCity = row.CityCode;
    this.EditProjectDetailMaster.ddlDistrictCode = row.Dcode;
    this.EditProjectDetailMaster.ddlScheme = row.Scheme;
    this.EditProjectDetailMaster.ddlStateCode = row.Codes;
    this.EditProjectDetailMaster.ddlStatus = row.ProjectStatus;
    this.EditProjectDetailMaster.txtAmountInstallment = row.FirstInstallment;
    this.EditProjectDetailMaster.txtBeneficiaryShare = row.BeneficiaryShare;
    this.EditProjectDetailMaster.txtCMCDate = getdate;
    this.EditProjectDetailMaster.txtCSMCNumber = row.CSMCNumber;
    this.EditProjectDetailMaster.txtCentralAssist = row.CentralAssistance;
    this.EditProjectDetailMaster.txtNewSanction = row.NewSanction;
    this.EditProjectDetailMaster.txtProjectCost = row.ProjectCost;
    this.EditProjectDetailMaster.txtProjectTitle = row.ProjectTitle;
    this.EditProjectDetailMaster.txtStateGrant = row.StateGrant;
    this.EditProjectDetailMaster.txtTotalSanction = row.TotalSanction;
    this.EditProjectDetailMaster.txtULB = row.ULB;
    this.EditProjectDetailMaster.txtUpgrade = row.UpgradeSanction;
    this.EditProjectDetailMaster.hiddendTxtProjectID = row.ProjectId;
    this.EditProjectDetailMaster.txtOther = row.OtherCost;
    this.EditProjectDetailMaster.ddlDuration = row.ProjectDuration;
    this.EditProjectDetailMaster.ddlComponent = row.SchemeComponent;
    this.EditProjectDetailMaster.ddlAgency = row.ProjectAgencies;
  }

  updateProjectDetail() {

    var d = new Date(this.EditProjectDetailMaster.txtCMCDate);
    var postdate = ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getDate() + "-" + d.getFullYear();
    var objPost =
    {
      "ProjectId": this.EditProjectDetailMaster.hiddendTxtProjectID,
      "StateCode": this.EditProjectDetailMaster.ddlStateCode,
      "DistrictCode": this.EditProjectDetailMaster.ddlDistrictCode,
      "CityCode": this.EditProjectDetailMaster.ddlCity,
      "CSMCDate": postdate,
      "CSMCNumber": this.EditProjectDetailMaster.txtCSMCNumber,
      "Scheme": this.EditProjectDetailMaster.ddlScheme,
      "ProjectStatus": this.EditProjectDetailMaster.ddlStatus,
      "ProjectTitle": this.EditProjectDetailMaster.txtProjectTitle,
      "ProjectCost": this.EditProjectDetailMaster.txtProjectCost,
      "CentralAssistance": this.EditProjectDetailMaster.txtCentralAssist,
      "StateGrant": this.EditProjectDetailMaster.txtStateGrant,
      "ULB": this.EditProjectDetailMaster.txtULB,
      "BeneficiaryShare": this.EditProjectDetailMaster.txtBeneficiaryShare,
      "NewSanction": this.EditProjectDetailMaster.txtNewSanction,
      "UpgradeSanction": this.EditProjectDetailMaster.txtUpgrade,
      "TotalSanction": this.totalSanction,
      "FirstInstallment": this.installment,
      "OtherCost": this.ProjectOtherCost,
      "ProjectDuration": this.EditProjectDetailMaster.ddlDuration,
      "SchemeComponent": this.EditProjectDetailMaster.ddlComponent,
      "ProjectAgencies": this.EditProjectDetailMaster.ddlAgency,
      "ActiveFlag": "",
      "CreatedOn": "",
      "CreatedBy": ""
    }
    var editProjectStateCode = this.EditProjectDetailMaster.ddlStateCode;
    var editProjectDistrictCode = this.EditProjectDetailMaster.ddlDistrictCode;
    var editProjectCityCode = this.EditProjectDetailMaster.ddlCity;
    this.userMasterService.updateProjectDetailData(JSON.stringify(objPost)).subscribe((data: any) => {
      this.showProperty = 'none';
      this.EditProjectDetailMaster = {
        "ddlStateCode": "",
        "ddlDistrictCode": "",
        "ddlCity": "",
        "txtCMCDate": "",
        "txtCSMCNumber": "",
        "ddlScheme": "",
        "ddlStatus": "",
        "txtProjectTitle": "",
        "txtProjectCost": "",
        "txtCentralAssist": "",
        "txtStateGrant": "",
        "txtULB": "",
        "txtBeneficiaryShare": "",
        "txtNewSanction": "",
        "txtUpgrade": "",
        "txtTotalSanction": "",
        "txtAmountInstallment": "",
        "hiddendTxtProjectID": "",
        "txtOther": "",
        "ddlDuration": "",
        "ddlComponent": "",
        "ddlAgency": ""
      }

      if (data.StatusCode == "OK") {
        this.snotifyService.success("Project Details Updated Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      else {
        this.snotifyService.error("Project Details Not Updated Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
      this.getProjectDetailData(editProjectStateCode, editProjectDistrictCode, editProjectCityCode, null, null);
      this.installment = [];
      this.totalSanction = [];
      this.ProjectOtherCost = [];
      this.projectDetailMaster = [];

    });
  }

  getProjectSchemeComponentData(SchemeId: any) {
    this.userMasterService.getProjectSchemeComponent(SchemeId).subscribe(data => {
      this.schComponentMaster = data;
    });
  }

  //---------Add Agency------//
  getAgencyData(CityCode: any) {
    this.userMasterService.getAgencyData(CityCode).subscribe(data => {
      this.agencyMaster = data;
    });
  }

  addAgency(value: any, state: any, distict: any, city: any) {

    this.showAgency = value;
    this.AgencyState = state;
    this.AgencyDistrict = distict;
    this.AgencyCity = city;


  }
  postAgencyMaster(formGroup: any) {

    var objPost =
    {
      "StateCode": this.AgencyState,
      "DistrictCode": this.AgencyDistrict,
      "CityCode": this.AgencyCity,
      "ULBAgencyShare": formGroup.get('txtAgency').value,
      "ActiveFlag": "",
      "CreatedOn": "",
      "CreatedBy": ""

    }
    this.ProjectAgency = formGroup.get('txtAgency').value;
    this.userMasterService.postAgencyDataData(objPost).subscribe((data: any) => {
      this.showAgency = 'none';
      this.getAgencyData(this.AgencyCity);


      if (data.StatusCode != "") {
        this.snotifyService.success("Agency Save Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else {
        this.snotifyService.error("Error...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      this.AgencyState = [];
      this.AgencyDistrict = [];
      this.AgencyCity = [];
      // this.getProjectDetailData();
    });
  }
  AddProjectAgency(Agency: any) {
    this.ProjectAgency = Agency;
  }
 
  //------Physical Progress-------//
  postPhysicalProgress() {
    this.userMasterService.postPysicalProgressReport(this.projectDetailMaster).subscribe((data: any) => {
      if (data.StatusCode != "") {
        this.snotifyService.success("Physical Progress Save Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else {
        this.snotifyService.error("Error...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      this.getProjectDetailData('', '', '', '', '');
    });
  }

  TotalHouseProgress(rowIndex: number, txtGroundLevel: any, txtPinth: any, txtLinterLevel: any, txtRoofLevel: any, txtSuperStructure: any, txtFinishingStage: any) {
    let GroundLevel: number = txtGroundLevel;
    let Pinth: number = txtPinth;
    let Linter: number = txtLinterLevel;
    let Roof: number = txtRoofLevel;
    let Super: number = txtSuperStructure;
    let FinishStage: number = txtFinishingStage;
    this.totalHouse = (+GroundLevel + +Pinth + +Linter + +Roof + +Super + +FinishStage);
    this.projectDetailMaster[rowIndex].TotalProgressHouse = this.totalHouse;
  }

  NonStarter(rowIndex: number, totalSanction: any, totalProgressHouse: any, completedConstruction: any) {
    let TotalSanction = totalSanction;
    let ProgessHouse = totalProgressHouse;
    let constructionCompleted = completedConstruction;
    let houses = ProgessHouse + +constructionCompleted
    if (totalSanction >= houses) {
      this.nonStarter = -(-TotalSanction - -ProgessHouse + +constructionCompleted);
      this.projectDetailMaster[rowIndex].NonStarterHouse = this.nonStarter
    }
    else {
      this.snotifyService.error("Total houses should not be greater than houses ...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
  }

  getPhysicalProgress() {
    this.userMasterService.getPhysicalProgressReport().subscribe(data => {
      this.physicalProgressMaster = data;

    });
  }

  ///--------report wise-----------//
  getReportStateWise() {
    this.userMasterService.getReportStateWise().subscribe(data => {
      this.reportStateWise = data;
    });
  }

  DistrictReportWise(StateCode: any) {
    this.router.navigate(['/DRMC/report-district-wise', StateCode]);

  }
  getReportDistrictStateWise(StateCode: any) {
    this.userMasterService.getReportDistrictStateWise(StateCode).subscribe(data => {
      this.reportStateDistrictWise = data;

      this.reportState = data[0].States_UT;

    });
  }
  CityReportWise(DistrictCode: any) {
    this.router.navigate(['/DRMC/report-state-district-city-wise', DistrictCode]);
  }
  getReportCityDistrictStateWise(DistrictCode: any) {
    this.userMasterService.getReportCityDistrictStateWise(DistrictCode).subscribe(data => {
      this.reportStateDistrictCityWise = data;
      this.reportDistrict = data[0].District;
    });
  }
  ProjectReportWise(CityCode: any) {
    this.router.navigate(['/DRMC/project-code-wise-report', CityCode]);
  }
  getReportProjectCodeWise(CityCode: any) {
    this.userMasterService.getReportProjectCodeWise(CityCode).subscribe(data => {
      this.reportProjectCodeWise = data;
      this.reportCity = data[0].City;

    });
  }


  //------get post api for release fund flow---------//
  postReleaseFundFlowInstallment(value1: any) {
    this.userMasterService.postReleaseFundFlowInstallment(value1).subscribe((data: any) => {
      if (data.StatusCode == "OK") {
        this.snotifyService.success("Release Fund Flow Installment Save Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
    });
  }

  postUCSubmission(UCValue: any) {
    this.userMasterService.postUCSubmission(UCValue).subscribe((data: any) => {
      if (data.StatusCode == "OK") {
        this.snotifyService.success("UC Save Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
    });
  }
  getReleaseTotalInsat1(ProjectCode: any, Installment: any) {
    this.userMasterService.getReleaseTotalIns1(ProjectCode, Installment).subscribe(data => {
      if (data != 0) {
        this.totalReleaseInstallment1 = data;
      }

    });
  }
  //-------------total of release and uc--------------//
  getUCTotalInsat1(ProjectCode: any, Installment: any) {
    this.userMasterService.getUCTotalIns1(ProjectCode, Installment).subscribe(data => {
      if (data != 0) {
        this.totalUCInstallment1 = data[0].UCAmount;
      }
    });
  }
  getReleaseTotalInsat2(ProjectCode: any, Installment: any) {
    this.userMasterService.getReleaseTotalIns2(ProjectCode, Installment).subscribe(data => {
      if (data != 0) {
        this.totalReleaseInstallment2 = data;
      }
    });
  }
  getUCTotalInsat2(ProjectCode: any, Installment: any) {
    this.userMasterService.getUCTotalIns2(ProjectCode, Installment).subscribe(data => {
      if (data != 0) {
        this.totalUCInstallment2 = data[0].UCAmount;
      }
    });
  }
  getReleaseTotalInsat3(ProjectCode: any, Installment: any) {
    this.userMasterService.getReleaseTotalIns3(ProjectCode, Installment).subscribe(data => {
      if (data != 0) {
        this.totalReleaseInstallment3 = data;
      }
    });
  }
  getUCTotalInsat3(ProjectCode: any, Installment: any) {
    this.userMasterService.getUCTotalIns3(ProjectCode, Installment).subscribe(data => {
      if (data != 0) {
        this.totalUCInstallment3 = data[0].UCAmount;
      }
    });
  }
  //-------------post,get,download release order--------------//
  postReleaseOrder(file: File, formGroup: any): any {
    let c = new Date(formGroup.get('txtDate').value);
    var currentDate = this.datePipe.transform(c, 'dd-MM-yyyy');
    const objPost = {
      'State': formGroup.get('ddlStateCode').value,
      'SanctionNo': formGroup.get('txtSanctionNumber').value,
      'Date': currentDate,
      'Scheme': formGroup.get('ddlScheme').value,
      'Component': formGroup.get('ddlComponent').value,
      'AmountReleased': formGroup.get('txtAmountReleased').value,
    };
    this.userMasterService.postReleasedOrder(file, objPost.Scheme, objPost.SanctionNo, objPost.State, objPost.AmountReleased, objPost.Date, objPost.Component).subscribe(data => {
      if (data.status == "200") {
        this.snotifyService.success("Release Order Save Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
    }
    );
  }
  getReleaseOrder(stateCode: any) {
    this.userMasterService.getReleaseOrder(stateCode).subscribe(data => {
      this.releaseOrderValue = data;
    });
  }

  downloadRelease(pdf: any) {
    var str = pdf;
    var newStr = str.slice(0, -4);
    this.userMasterService.getFileDownnload(newStr).subscribe((
      data) => {
      importedSaveAs(data, str)
    });
  }
  //-------------post,get,download uc order--------------//
  downloadUCOrder(pdf: any) {
    var str = pdf;
    var newStr = str.slice(0, -4);
    this.userMasterService.getFileDownnload(newStr).subscribe((
      data) => {
      importedSaveAs(data, str)
    });
  }
  getUCOrder(stateCode: any) {
    this.userMasterService.getUCOrder(stateCode).subscribe(data => {
      this.ucOrderValue = data;
    });
  }
  postUCOrder(file: File, data: any): any {

    let c = new Date(data.UCDate);
    var currentDate = this.datePipe.transform(c, 'dd-MM-yyyy');
    const objPost = {
      'State': data.States,
      'SanctionNo': data.SanctionNo,
      'UCAmount': data.UCAmount,
      'UtilizationNo': data.UtilizationNo,
      'UCDate': currentDate,

    };
    this.userMasterService.postUCOrder(file, objPost.State, objPost.SanctionNo, objPost.UCAmount, objPost.UCDate, objPost.UtilizationNo).subscribe(data => {
      if (data.status == "200") {
        this.snotifyService.success("Release Order Save Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
    }
    );
  }
  //-----get projectbriefname of project name----//
  getProjectBriefName(statecode: any, districtcode: any, citycode: any, scheme: any, component: any) {
    this.userMasterService.getProjectBriefName(statecode, districtcode, citycode, scheme, component).subscribe(data => {
      this.projectBriefName = data;
    });
  }
   //------post get api for project brief detail------//
   projectBriefDeatil(file: File, formGroup: any): any {
    var filename = file.name
    var g = new Date(formGroup.get('txtSLSMC').value);
    var currentBriefDate = this.datePipe.transform(g, 'dd-MM-yyyy');
    const objPost = {
      'Codes': formGroup.get('ddlStateCode').value,
      'Dcode': formGroup.get('ddlDistrictCode').value,
      'CityCode': formGroup.get('ddlCity').value,
      'Scheme': formGroup.get('ddlScheme').value,
      'Component': formGroup.get('ddlComponent').value,
      'ProjectCode': formGroup.get('ddlProjectName').value,
      'NodalAgency': formGroup.get('txtNodalAgency').value,
      'ImplementingAgency': formGroup.get('txtImplementingAgency').value,
      'SLSMCDate': currentBriefDate,
      'WhetherSlum': formGroup.get('radioSlum').value,
     // 'Slum': this.Slum,
      'HousingCost': formGroup.get('txtHousingCost').value,
      'InfaCost': formGroup.get('txtInfrastructure').value,
      'OtherCost': formGroup.get('txtOther').value,
      'General': formGroup.get('txtGeneral').value,
      'SC': formGroup.get('txtSC').value,
      'ST': formGroup.get('txtST').value,
      'OBC': formGroup.get('txtOBC').value,
      'OtherEWS': formGroup.get('txtOthersEWS').value,
      'Minority': formGroup.get('txtMinority').value,
      'Joint': formGroup.get('txtJoint').value,
      'Female': formGroup.get('txtFemale').value,
      'Male': formGroup.get('txtMale').value,
      'Transgender': formGroup.get('txtTransgender').value,
      'PDF': filename,
      'TotalHouses': formGroup.get('txtTotalHouses').value

    };
    this.userMasterService.postProjectBriefDeatil(file, objPost).subscribe(data => {
      var objPost =
      {
        "Slum":this.Slum   
      }
      this.userMasterService.postSlum(objPost.Slum).subscribe((data: any) => {
        if (data.status == "200") {
       
        this.getProjectBriefDetail();
        this.Slum=[];
        this.snotifyService.success("Project Brief Details Save Successfully...", "", {
          position: SnotifyPosition.rightTop, 
          timeout: 3000
        });
      }
    }
    );
  })}

  SlumArray(value: any) {
    this.Slum = value;
     console.log(this.Slum);
  }

  getProjectBriefDetail() {
    this.userMasterService.geProjectBriefDetail().subscribe(data => {
      this.projectBriefDetail = data;
    });
  }
  ProjectBriefDetailHousesTotal(txtJoint: any, txtFemale: any, txtMale: any, txtTransgender: any) {
    var Joint = txtJoint;
    var Female = txtFemale;
    var Male = txtMale;
    var Transgender = txtTransgender;

    this.ProjectBriefDetailCost = +(+Joint + +Female + +Male + +Transgender);
  }
  postProjectDetailsBulkData(file: File): any {

    this.userMasterService.postProjectDetailsBulkData(file).subscribe(data => {

      if (data.statusText == "OK") {
        this.snotifyService.success("Project Brief Details Save Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
    }
    );
  }
  //----for classification master add,edit and delete------////
  getClassificationMaster() {
    this.userMasterService.getClassificationMaster().subscribe(data => {
      this.classificationMaster = data;
    });
  }
  postClassificationMaster(formGroup: any) {
    var objPost =
    {
      "Description": formGroup.get('txtDescription').value,
      "DescriptionCode": formGroup.get('txtDCode').value,
      "Applicable": formGroup.get('radioApplicable').value,

    }
    this.userMasterService.postClassificationMaster(objPost).subscribe((data: any) => {
      if (data.StatusCode == "OK") {
        this.getClassificationMaster();
        this.snotifyService.success("Classification Save Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else if (data.StatusCode == "BadRequest") {
        this.snotifyService.error("Classification  Already Exist...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else {
        this.snotifyService.error("Error...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
    });
  }
  deleteClassificationData(ClassificationId: any) {
    this.userMasterService.deleteClassificationData(ClassificationId).subscribe(data => {
      if (data.StatusCode == "OK") {
        this.getClassificationMaster();
        this.snotifyService.success("Classification Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
      else {
        this.snotifyService.error("Classification Not Delete Successfully...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 3000
        });
      }
    });
  }

  editClassificationMaster(value: any, row: any) {
    
    this.EditClassificationComponent = row
    this.showProperty = value;
    this.EditClassificationComponentMaster.hiddendTxtDescriptionID = row.ClassificationId;
    this.EditClassificationComponentMaster.txtDescription = row.Description;
    this.EditClassificationComponentMaster.txtDCode = row.DescriptionCode;
    this.EditClassificationComponentMaster.radioApplicable = row.Applicable;
  }
  updateClassificationMaster() {
    

    if ( this.EditClassificationComponentMaster.txtDescription != null &&  this.EditClassificationComponentMaster.txtDescription != "" &&  this.EditClassificationComponentMaster.txtDescription != undefined) {
      if (this.EditClassificationComponentMaster.txtDCode!= null && this.EditClassificationComponentMaster.txtDCode != "" && this.EditClassificationComponentMaster.txtDCode != undefined) {
        if ( this.EditClassificationComponentMaster.radioApplicable!= null &&  this.EditClassificationComponentMaster.radioApplicable != "" &&  this.EditClassificationComponentMaster.radioApplicable != undefined) {
          var objPost =
          {
            "ClassificationId":this.EditClassificationComponentMaster.hiddendTxtDescriptionID,
              "Description":this.EditClassificationComponentMaster.txtDescription,
              "DescriptionCode":this.EditClassificationComponentMaster.txtDCode,
              "Applicable":this.EditClassificationComponentMaster.radioApplicable

          }
          this.userMasterService.updateClassificationMaster(JSON.stringify(objPost)).subscribe((data: any) => {
            this.showProperty = 'none';
           
           this.EditClassificationComponentMaster = {
              "hiddendTxtDescriptionID": "",
              "txtDescription": "",
              "txtDCode": "",
              "radioApplicable": ""
            }
            if (data.StatusCode == "OK") {
              this.getClassificationMaster();
              this.snotifyService.success("Classsification Updated Successfully...", "", {
                position: SnotifyPosition.rightTop,
                timeout: 2500
              });
            }
            else {
              this.snotifyService.error("Classsification Not Updated Successfully...", "", {
                position: SnotifyPosition.rightTop,
                timeout: 2500
              });
            }
            this.getSchemeData();
          });
        }
        else {
          this.snotifyService.error("Please Select Radio Applicable...", "", {
            position: SnotifyPosition.rightTop,
            timeout: 2500
          });
        }
      }
      else {
        this.snotifyService.error("Please Enter Description Code...", "", {
          position: SnotifyPosition.rightTop,
          timeout: 2500
        });
      }
    }
    else {
      this.snotifyService.error("Please Enter Description...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 2500
      });
    }
  }
 //-----get projectbriefname of project name----//
 getProjectClassificationName(statecode: any, districtcode: any, citycode: any) {
  this.userMasterService.getProjectClassificationName(statecode, districtcode, citycode).subscribe(data => {
    this.projectClassificationName = data;
  });
}
 //-----get classfication on behalf of state----//
 getStateClassification(statecode: any) {
  this.userMasterService.getStateClassification(statecode).subscribe(data => {
    this.stateClassificationMapping = data;
  });
}

//---post state classification mapping---///
postStateClassificationMapping(formGroup: any) {
 
  var objPost =
  {
    "StateCode": formGroup.get('ddlState').value,
    "DescriptionCode": formGroup.get('ddlMap').value,
    "selected":true
   

  }
  this.userMasterService.postStateClassificationMapping(objPost).subscribe((data: any) => {
    if (data.StatusCode == "OK") {
      this.getStateClassificationMapping();
      this.snotifyService.success("State Classification Mapping Save Successfully...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
  
    else {
      this.snotifyService.error("Error...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
  });
}
 //-----get state classification mapping----//
 getStateClassificationMapping() {
  this.userMasterService.getStateClassificationMapping().subscribe(data => {
    this.stateMapingResult = data;
  });
}
//---post district classification mapping---///
postDistrictClassificationMapping(formGroup: any) {
 
  var objPost =
  {
    "StateCode": formGroup.get('ddlStateCode').value,
    "DistrictCode":formGroup.get('ddlDistrictCode').value,
    "DescriptionCode": formGroup.get('ddlMapping').value,
    "selected":true
   

  }
  this.userMasterService.postDistrictClassificationMapping(objPost).subscribe((data: any) => {
    if (data.StatusCode == "OK") {
     
      this.snotifyService.success("District Classification Mapping Save Successfully...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
  
    else {
      this.snotifyService.error("Error...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
  });
}
 //-----get district classification mapping----//
 getDistrictClassificationMapping(statecode:any) {
  this.userMasterService.getDistrictClassificationMapping(statecode).subscribe(data => {
    this.districtMapingResult = data;
  
  });
}
//---post City classification mapping---///
postCityClassificationMapping(formGroup: any) {
  
  var objPost =
  {
    "StateCode": formGroup.get('ddlStateCode1').value,
    "DistrictCode":formGroup.get('ddlDistrictCode1').value,
    "CityCode":formGroup.get('ddlCity').value,
    "DescriptionCode": formGroup.get('ddlMapping1').value,
    "selected":true
   

  }
  this.userMasterService.postCityClassificationMapping(objPost).subscribe((data: any) => {
    if (data.StatusCode == "OK") {
     
      this.snotifyService.success("City Classification Mapping Save Successfully...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
  
    else {
      this.snotifyService.error("Error...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
  });
}
 //-----get City classification mapping----//
 getCityClassificationMapping(statecode:any,districtcode:any) {
  this.userMasterService.getCityClassificationMapping(statecode,districtcode).subscribe(data => {
    this.cityMapingResult = data;
  
  });
}
//---post Project classification mapping---///
postProjectClassificationMapping(formGroup: any) {
  var objPost =
  {
    "StateCode": formGroup.get('ddlStateCodeP').value,
    "DistrictCode":formGroup.get('ddlDistrictCodeP').value,
    "CityCode":formGroup.get('ddlCityP').value,
    "ProjectCode":formGroup.get('ddlProjectName').value,
    "DescriptionCode": formGroup.get('ddlMappingP').value,
    "selected":true
   

  }
  this.userMasterService.postProjectClassificationMapping(objPost).subscribe((data: any) => {
    if (data.StatusCode == "OK") {
     
      this.snotifyService.success("Project Classification Mapping Save Successfully...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      }); 
    }
  
    else {
      this.snotifyService.error("Error...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
  });
}
//-----get project classification mapping----//
getProjectClassificationMapping(statecode:any,districtcode:any,citycode:any) {
  this.userMasterService.getProjectClassificationMapping(statecode,districtcode,citycode).subscribe(data => {
    this.projectMapingResult = data;
  
  });
}
//-----delete mapping for state,district,project and city-----//
DeleteStateMapping(StateMappingId: any) {
  this.userMasterService.deleteStateClassificationMapping(StateMappingId).subscribe(data => {
    if (data.StatusCode == "OK") {
      this.snotifyService.success("State Classification Delete Successfully...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
    else {
      this.snotifyService.error("State Classification Not Delete Successfully...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
    this.getStateClassificationMapping();

  });
}
DeleteDistrictMapping(DistMappingId: any) {
  this.userMasterService.deleteDistrictClassificationMapping(DistMappingId).subscribe(data => {
    if (data.StatusCode == "OK") {
      this.snotifyService.success("District Classification Delete Successfully...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
    else {
      this.snotifyService.error("District Classification Not Delete Successfully...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
    this.districtMapingResult=[]
   // this.getStateClassificationMapping();

  });
}
DeleteCityMapping(CityMappingId: any) {
  this.userMasterService.deleteCityClassificationMapping(CityMappingId).subscribe(data => {
    if (data.StatusCode == "OK") {
      this.snotifyService.success("City Classification Delete Successfully...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
    else {
      this.snotifyService.error("City Classification Not Delete Successfully...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
    this.cityMapingResult=[]
  

  });
}
DeleteProjectMapping(ProjectMappingId: any) {
  this.userMasterService.deleteProjectClassificationMapping(ProjectMappingId).subscribe(data => {
    if (data.StatusCode == "OK") {
      this.snotifyService.success("Project Classification Delete Successfully...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
    else {
      this.snotifyService.error("Project Classification Not Delete Successfully...", "", {
        position: SnotifyPosition.rightTop,
        timeout: 3000
      });
    }
    this.projectMapingResult=[]
  

  });
}


}

