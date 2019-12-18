import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { AdminSandbox } from 'src/app/DRMC/admin.sandbox';

@Component({
  selector: 'app-constituency-master',
  templateUrl: './constituency-master.component.html',
  styleUrls: ['./constituency-master.component.css']
})
export class ConstituencyMasterComponent implements OnInit {
  public submitted: boolean = false;
  public txtConstituencyName: AbstractControl;
  public txtConstituencyNumber: AbstractControl;
  public txtShittingMP: AbstractControl;
  public ddlCity: AbstractControl;
  public constituencyMaster: FormGroup;
  CityCode: string;
  constructor(private fb: FormBuilder, public adminSandbox: AdminSandbox) { }

  ngOnInit() {
    this.onConstituencyMaster();
    this.adminSandbox.getConsistuencyData();
    this.adminSandbox.getCityConsistuencyData();
    this.CityCode = '';
  }
  public onConstituencyMaster(): void {

    this.constituencyMaster = this.fb.group({
      txtConstituencyName: ['', [Validators.required]],
      txtConstituencyNumber: ['', [Validators.required]],
      txtShittingMP: ['', [Validators.required]],
      ddlCity: ['', [Validators.required]],
    });
    this.txtConstituencyName = this.constituencyMaster.controls['txtConstituencyName'];
    this.txtConstituencyNumber = this.constituencyMaster.controls['txtConstituencyNumber'];
    this.txtShittingMP = this.constituencyMaster.controls['txtShittingMP'];
    this.txtShittingMP = this.constituencyMaster.controls['txtShittingMP'];
    this.ddlCity = this.constituencyMaster.controls['ddlCity'];
  }
  onClickConstituencyMaster(event: Event, formGroup: any) {
    this.submitted = true;
    event.stopPropagation();
    if (this.constituencyMaster.valid) {
      this.adminSandbox.postConstituency(formGroup)
      this.constituencyMaster.reset();
      this.CityCode = '';
      this.submitted = false;
    }
  }
}
