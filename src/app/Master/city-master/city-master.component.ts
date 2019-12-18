import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminSandbox } from 'src/app/DRMC/admin.sandbox';

@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.css']
})
export class CityMasterComponent implements OnInit {
  public submitted: boolean = false;
  public txtCityName: AbstractControl;
  public txtCityCode: AbstractControl;
  public ddlStateCode: AbstractControl;
  public ddlDistrictCode: AbstractControl;
  public cityMaster: FormGroup;
  DistrictCode: string;
  State: string;
  District: string;
  constructor(private fb: FormBuilder, public adminSandbox: AdminSandbox) { }

  ngOnInit() {
    this.onCityMaster();
    this.DistrictCode = '';

    this.adminSandbox.getStateData();
    this.State = '';
    this.District = '';
    this.adminSandbox.cityMaster = [];

  }
  public onCityMaster(): void {
    this.cityMaster = this.fb.group({
      txtCityName: ['', [Validators.required]],
      txtCityCode: ['', [Validators.required]],
      ddlStateCode: ['', [Validators.required]],
      ddlDistrictCode: ['', [Validators.required]],

    });
    this.txtCityName = this.cityMaster.controls['txtCityName'];
    this.txtCityCode = this.cityMaster.controls['txtCityCode'];
    this.ddlDistrictCode = this.cityMaster.controls['ddlDistrictCode'];
    this.ddlStateCode = this.cityMaster.controls['ddlStateCode'];
  }
  onClickCityMaster(event: Event, formGroup: any) {
    this.submitted = true;
    event.stopPropagation();
    if (this.cityMaster.valid) {
      this.adminSandbox.postCityData(formGroup)
      this.submitted = false;
      this.cityMaster.reset();
      this.State = '';
      this.District = '';

    }
  }
}
