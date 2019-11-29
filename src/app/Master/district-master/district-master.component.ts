import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { AdminSandbox } from 'src/app/DRMC/admin.sandbox';


@Component({
  selector: 'app-district-master',
  templateUrl: './district-master.component.html',
  styleUrls: ['./district-master.component.css']
})
export class DistrictMasterComponent implements OnInit {
  public submitted: boolean = false;
  public ddlStateCode: AbstractControl;
  public txtDistrictName: AbstractControl;
  public txtDistrictCode: AbstractControl;
  public radioBackwardDistrict: AbstractControl;
  public radioMinority: AbstractControl;
  public districtMaster: FormGroup;
  StateCode: string;
  constructor(private fb: FormBuilder, public adminSandbox: AdminSandbox) { }

  ngOnInit() {
    this.onDistrictMaster();
    this.adminSandbox.getStateData();
    this.adminSandbox.districtMaster=[];
    this.StateCode = '';
  }
  public onDistrictMaster(): void {
    this.districtMaster = this.fb.group({
      ddlStateCode: ['', [Validators.required]],
      txtDistrictName: ['', [Validators.required]],
      txtDistrictCode: ['', [Validators.required]],
      radioBackwardDistrict: [''],
      radioMinority: [''],
    });
    this.ddlStateCode = this.districtMaster.controls['ddlStateCode'];
    this.txtDistrictName = this.districtMaster.controls['txtDistrictName'];
    this.txtDistrictCode = this.districtMaster.controls['txtDistrictCode'];
    this.radioBackwardDistrict = this.districtMaster.controls['radioBackwardDistrict'];
    this.radioMinority = this.districtMaster.controls['radioMinority'];
  }
  onClickDistrictMaster(event: Event, formGroup: any) {
    this.submitted = true;
    event.stopPropagation();
    if (this.districtMaster.valid) {
      this.adminSandbox.postDistrictData(formGroup)

      this.submitted = false;

      this.districtMaster.reset();
      this.StateCode = '';
    }
  }
}
