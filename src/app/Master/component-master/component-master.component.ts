import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { AdminSandbox } from 'src/app/DRMC/admin.sandbox';


@Component({
  selector: 'app-component-master',
  templateUrl: './component-master.component.html',
  styleUrls: ['./component-master.component.css']
})
export class ComponentMasterComponent implements OnInit {
  public submitted: boolean = false;
  public txtSchemeComponentShortName: AbstractControl;
  public txtSchemeComponentName: AbstractControl;
  public ddlMajorScheme: AbstractControl;
  public componentMaster: FormGroup;
  Scheme: string;


  constructor(private fb: FormBuilder, public adminSandbox: AdminSandbox) { }

  ngOnInit() {
    this.onComponentMaster();
    this.adminSandbox.schemeComponentMaster=[];
    this.adminSandbox.getSchemeData();
    this.Scheme = '';

  }
  public onComponentMaster(): void {
  
    this.componentMaster = this.fb.group({
      txtSchemeComponentShortName: ['', [Validators.required]],
      txtSchemeComponentName: ['', [Validators.required]],
      ddlMajorScheme: ['', [Validators.required]],
    });
    this.txtSchemeComponentShortName = this.componentMaster.controls['txtSchemeComponentShortName'];
    this.txtSchemeComponentName = this.componentMaster.controls['txtSchemeComponentName'];
    this.ddlMajorScheme = this.componentMaster.controls['ddlMajorScheme'];
  }
  onClickComponentMaster(event: Event, formGroup: any) {
  
    this.submitted = true;
    event.stopPropagation();
    if (this.componentMaster.valid) {
      this.adminSandbox.postSchemeComponent(formGroup)
      this.submitted = false;
      this.componentMaster.reset();
      this.Scheme = '';
    }
  }
 }
