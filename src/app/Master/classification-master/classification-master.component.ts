import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { AdminSandbox } from 'src/app/DRMC/admin.sandbox';


@Component({
  selector: 'app-classification-master',
  templateUrl: './classification-master.component.html',
  styleUrls: ['./classification-master.component.css']
})
export class ClassificationMasterComponent implements OnInit {
  public submitted: boolean = false;
  public txtDescription: AbstractControl;
  public txtDCode: AbstractControl;
  public radioApplicable:AbstractControl;
  public classificationMaster: FormGroup;
  constructor(private fb: FormBuilder, public adminSandbox: AdminSandbox) { }

  ngOnInit() {
    this.onClassificationMaster();
    this.adminSandbox.getClassificationMaster();
  }
  public onClassificationMaster(): void {
    this.classificationMaster = this.fb.group({
      txtDescription: ['', [Validators.required]],
      txtDCode: ['', [Validators.required]],
      radioApplicable:['',[Validators.required]]
   
    });
    this.txtDescription = this.classificationMaster.controls['txtDescription'];
    this.txtDCode = this.classificationMaster.controls['txtDCode'];
    this.radioApplicable = this.classificationMaster.controls['radioApplicable'];
  }
  onClickClassificationMaster(event: Event, formGroup: any) {
    this.submitted = true;
    event.stopPropagation();
    if (this.classificationMaster.valid) {
     this.adminSandbox.postClassificationMaster(formGroup)
      this.submitted = false;
      this.classificationMaster.reset();
    }
  }
}
