import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators, Form } from '@angular/forms';
import { AdminSandbox } from 'src/app/DRMC/admin.sandbox';


@Component({
  selector: 'app-mapping-classification-master',
  templateUrl: './mapping-classification-master.component.html',
  styleUrls: ['./mapping-classification-master.component.css']
})
export class MappingClassificationMasterComponent implements OnInit {
  public classificationMappingMaster: FormGroup;
  public classificationProjectMappingMaster:FormGroup;
  public classificationCityMappingMaster: FormGroup;
  public classificationDistrictMappingMaster: FormGroup;
  public ddlStateCode: AbstractControl;
  CityClassification: boolean = false;
  public ddlMapping: AbstractControl;
  StateClassification: boolean = false;
  ProjectClassification:boolean=false;
  public ddlDistrictCode: AbstractControl;
  DistrictClassification: boolean = false;
  public submitted: boolean = false;
  public ddlState: AbstractControl;
  public ddlMap: AbstractControl;
  public ddlStateCode1: AbstractControl;
  public ddlDistrictCode1: AbstractControl;
  public ddlCity: AbstractControl;
  public ddlMapping1: AbstractControl;
  public ddlStateCodeP: AbstractControl;
  public ddlDistrictCodeP: AbstractControl;
  public ddlCityP: AbstractControl;
  public ddlMappingP: AbstractControl;
  public ddlProjectName:AbstractControl;

  State: string;
  Mapping: string;
  District: string;
  City: string;
  ProjectName:string;
  constructor(private fb: FormBuilder, public adminSandbox: AdminSandbox) { }

  ngOnInit() {
    this.adminSandbox.getStateData();
    this.onClassificationMappingMaster();
    this.onClassificationDistrictMappingMaster();
    this.onClassificationCityMappingMaster();
    this.onClassificationProjectMappingMaster();
    this.State = '';
    this.Mapping = '';
    this.District = '';
    this.City = '';
  }
  public onClassificationMappingMaster(): void {
    this.classificationMappingMaster = this.fb.group({
      ddlState: ['', [Validators.required]],
      ddlMap: ['', [Validators.required]],
    
    });

    this.ddlMap = this.classificationMappingMaster.controls['ddlMap'];
    this.ddlState = this.classificationMappingMaster.controls['ddlState'];
    
  }
  public onClassificationDistrictMappingMaster(): void {
    this.classificationDistrictMappingMaster = this.fb.group({
      ddlStateCode: ['', [Validators.required]],
      ddlMapping: ['', [Validators.required]],
      ddlDistrictCode: ['', [Validators.required]],
    });
    this.ddlMapping = this.classificationDistrictMappingMaster.controls['ddlMapping'];
    this.ddlStateCode = this.classificationDistrictMappingMaster.controls['ddlStateCode'];
    this.ddlDistrictCode = this.classificationDistrictMappingMaster.controls['ddlDistrictCode'];
  }

  public onClassificationCityMappingMaster(): void {
    this.classificationCityMappingMaster = this.fb.group({
      ddlStateCode1: ['', [Validators.required]],
      ddlMapping1: ['', [Validators.required]],
      ddlDistrictCode1: ['', [Validators.required]],
      ddlCity: ['', [Validators.required]],
    });
    this.ddlMapping1 = this.classificationCityMappingMaster.controls['ddlMapping1'];
    this.ddlStateCode1 = this.classificationCityMappingMaster.controls['ddlStateCode1'];
    this.ddlDistrictCode1 = this.classificationCityMappingMaster.controls['ddlDistrictCode1'];
    this.ddlCity = this.classificationCityMappingMaster.controls['ddlCity'];
  }
  public onClassificationProjectMappingMaster(): void {
    this.classificationProjectMappingMaster = this.fb.group({
      ddlMappingP: ['', [Validators.required]],
      ddlStateCodeP: ['', [Validators.required]],
      ddlDistrictCodeP: ['', [Validators.required]],
      ddlCityP: ['', [Validators.required]],
      ddlProjectName: ['', [Validators.required]],
    });
    this.ddlMappingP = this.classificationProjectMappingMaster.controls['ddlMappingP'];
    this.ddlStateCodeP = this.classificationProjectMappingMaster.controls['ddlStateCodeP'];
    this.ddlDistrictCodeP = this.classificationProjectMappingMaster.controls['ddlDistrictCodeP'];
    this.ddlCityP = this.classificationProjectMappingMaster.controls['ddlCityP'];
    this.ddlProjectName = this.classificationProjectMappingMaster.controls['ddlProjectName'];
  }
  radioState() {
    this.StateClassification = true;
    this.DistrictClassification = false;
    this.CityClassification = false;
    this.ProjectClassification=false;
    this.adminSandbox.getStateClassificationMapping();
  }
  radioDistrict() {
    
    this.StateClassification = false;
    this.DistrictClassification = true;
    this.CityClassification = false;
    this.ProjectClassification=false;
    this.adminSandbox.districtMapingResult=[];
    this.State = '';
    this.Mapping = '';
    this.District = '';
    this.City = '';

  }
  radioCity() {
    this.StateClassification = false;
    this.DistrictClassification = false;
    this.CityClassification = true;
    this.ProjectClassification=false;
    this.adminSandbox.cityMapingResult=[];
    this.State = '';
    this.Mapping = '';
    this.District = '';
    this.City = '';
  }
  radioProject(){
    this.ProjectClassification=true;
    this.StateClassification = false;
    this.DistrictClassification = false;
    this.CityClassification = false;
    this.adminSandbox.projectMapingResult=[];
    this.State = '';
    this.Mapping = '';
    this.District = '';
    this.City = '';
    this.ProjectName='';
  }
  onClickClassificationMappingMaster(event: Event, formGroup: any) {
    debugger
    this.submitted = true;
    event.stopPropagation();
    if (this.classificationMappingMaster.valid) {
      this.adminSandbox.postStateClassificationMapping(formGroup);
      this.submitted = false;
      this.classificationMappingMaster.reset();
      this.State = '';
      this.Mapping = '';
    }
  }
  onClickDistrictClassificationMappingMaster(event: Event, formGroup: any) {
    this.submitted = true;
    event.stopPropagation();
    if (this.classificationDistrictMappingMaster.valid) {
      this.adminSandbox.postDistrictClassificationMapping(formGroup);
      this.adminSandbox.getDistrictClassificationMapping(formGroup.get('ddlStateCode').value);
      this.submitted = false;
      this.classificationDistrictMappingMaster.reset();
      this.State = '';
      this.Mapping = '';
      this.District = '';
    }
  }
  onClickCityClassificationMappingMaster(event: Event, formGroup: any) {
    this.submitted = true;
    event.stopPropagation();
    if (this.classificationCityMappingMaster.valid) {
      this.adminSandbox.postCityClassificationMapping(formGroup);
      this.adminSandbox.getCityClassificationMapping(formGroup.get('ddlStateCode1').value, formGroup.get('ddlDistrictCode1').value);
      this.submitted = false;
      this.classificationCityMappingMaster.reset();
      this.State = '';
      this.Mapping = '';
      this.District = '';
      this.City = '';
    }
  }
  onClickProjectClassificationMappingMaster(event: Event, formGroup: any) {
    debugger
    this.submitted = true;
    event.stopPropagation();
    if (this.classificationProjectMappingMaster.valid) {
      this.adminSandbox.postProjectClassificationMapping(formGroup);
      this.adminSandbox.getProjectClassificationMapping(formGroup.get('ddlStateCodeP').value, formGroup.get('ddlDistrictCodeP').value,formGroup.get('ddlCityP').value);
      this.submitted = false;
      this.classificationProjectMappingMaster.reset();
      this.State = '';
      this.Mapping = '';
      this.District = '';
      this.City = '';
      this.ProjectName='';
    }
  }
 
 
}
