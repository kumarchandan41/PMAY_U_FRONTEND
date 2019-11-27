import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { AdminSandbox } from '../admin.sandbox';


@Component({
  selector: 'app-scheme-master',
  templateUrl: './scheme-master.component.html',
  styleUrls: ['./scheme-master.component.css']
})

export class SchemeMasterComponent implements OnInit {
  public submitted: boolean = false;
  public txtSchemeShortName: AbstractControl;
  public txtSchemeName: AbstractControl;
  public txtPeriodScheme: AbstractControl;
  public schemeMaster: FormGroup;
  constructor(private fb: FormBuilder, public adminSandbox: AdminSandbox) { }

  ngOnInit() {
   // alert(1);
    this.onSchemeMaster();
    this.adminSandbox.getSchemeData();
  }
  public onSchemeMaster(): void {
    this.schemeMaster = this.fb.group({
      txtSchemeShortName: ['', [Validators.required]],
      txtSchemeName: ['', [Validators.required]],
      txtPeriodScheme: ['', [Validators.required]],
    });
    this.txtSchemeShortName = this.schemeMaster.controls['txtSchemeShortName'];
    this.txtSchemeName = this.schemeMaster.controls['txtSchemeName'];
    this.txtPeriodScheme = this.schemeMaster.controls['txtPeriodScheme'];
  }
  onClickSchemeMaster(event: Event, formGroup: any) {

    this.submitted = true;
    event.stopPropagation();
    if (this.schemeMaster.valid) {
      this.adminSandbox.postScheme(formGroup)
      this.submitted = false;
      this.schemeMaster.reset();
    }
  }
}
