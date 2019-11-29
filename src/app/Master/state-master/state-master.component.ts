import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { AdminSandbox } from 'src/app/DRMC/admin.sandbox';

@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.css']
})
export class StateMasterComponent implements OnInit {
  public submitted: boolean = false;
  public txtStateName: AbstractControl;
  public txtStateCode: AbstractControl;
  public txtGovernment: AbstractControl;
  public stateMaster: FormGroup;
  constructor(private fb: FormBuilder, public adminSandbox: AdminSandbox) { }

  ngOnInit() {
    this.onStateMaster();
    this.adminSandbox.getStateData();
  }
  public onStateMaster(): void {
  
    this.stateMaster = this.fb.group({
      txtStateName: ['', [Validators.required]],
      txtStateCode: ['', [Validators.required]],
      txtGovernment: ['', [Validators.required]],
    });
    this.txtStateName = this.stateMaster.controls['txtStateName'];
    this.txtStateCode = this.stateMaster.controls['txtStateCode'];
    this.txtGovernment = this.stateMaster.controls['txtGovernment'];
  }
  onClickStateMaster(event: Event, formGroup: any) {
    debugger
    this.submitted = true;
    event.stopPropagation();
    if (this.stateMaster.valid) {
      this.adminSandbox.postStateData(formGroup)
      this.submitted = false;
      this.stateMaster.reset();
    }
  }
}