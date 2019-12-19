import { Component, OnInit } from '@angular/core';
import { AdminSandbox } from '../admin.sandbox';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, TabHeadingDirective } from 'ngx-bootstrap';
@Component({
  selector: 'app-project-release-order',
  templateUrl: './project-release-order.component.html',
  styleUrls: ['./project-release-order.component.css']
})
export class ProjectReleaseOrderComponent implements OnInit {
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  scheduleStartDate: string = undefined;
  scheduleEndDate: string = undefined;
  maxStartDate: any;
  public submitted: boolean = false;
  public releaseOrder: FormGroup;
  public ddlStateCode: AbstractControl;
  public txtSanctionNumber: AbstractControl;
  public txtDate: AbstractControl;
  public ddlScheme: AbstractControl;
  public txtAmountReleased: AbstractControl;
  public txtSelectFile: AbstractControl;
  public ddlComponent: AbstractControl;
  selectedFiles = null;
  currentFileUpload: File;
  State: string;
  Scheme: string;
  Components: string;
  Sanction: boolean = false;
  utilization: boolean = false
  constructor(private fb: FormBuilder, public adminSandbox: AdminSandbox) { }

  ngOnInit() {
    //this.adminSandbox.getReleaseOrder();
    this.onreleaseOrder();
    this.adminSandbox.ucOrderValue=[];
    this.adminSandbox.releaseOrderValue=[];
    this.State = '';
    this.Scheme = '';
    this.Components = '';
    this.adminSandbox.getSchemeData();
    this.adminSandbox.getStateData();
    const date = new Date();
    //   this.maxStartDate = date;
    this.dpConfig = Object.assign({},
      {
        containerClass: 'theme-blue',
        dateInputFormat: 'YYYY-MM-DD'
      });
  }
  public onreleaseOrder(): void {
    this.releaseOrder = this.fb.group({

      ddlStateCode: ['', [Validators.required]],
      txtSanctionNumber: ['', [Validators.required]],
      txtDate: ['', [Validators.required]],
      ddlScheme: ['', [Validators.required]],
      txtAmountReleased: ['', [Validators.required]],
      txtSelectFile: ['', [Validators.required]],
      ddlComponent: ['', [Validators.required]],

    });

    this.ddlStateCode = this.releaseOrder.controls['ddlStateCode'];
    this.txtSanctionNumber = this.releaseOrder.controls['txtSanctionNumber'];
    this.txtDate = this.releaseOrder.controls['txtDate'];
    this.ddlScheme = this.releaseOrder.controls['ddlScheme'];
    this.txtAmountReleased = this.releaseOrder.controls['txtAmountReleased'];
    this.txtSelectFile = this.releaseOrder.controls['txtSelectFile'];
    this.ddlComponent = this.releaseOrder.controls['ddlComponent'];


  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  onClickReleaseOrder(event: Event, form: any): void {
    this.submitted = true;
    event.stopPropagation();
    if (this.releaseOrder.valid) {
      this.currentFileUpload = this.selectedFiles.item(0);
      this.adminSandbox.postReleaseOrder(this.currentFileUpload, form);
      this.selectedFiles = undefined;
      this.submitted = false;
      this.releaseOrder.reset();
      this.State = '';
      this.Scheme = '';
      this.Components = '';

    }
  }
  getAmountSum(index: number): number {
    let sum = 0;
    for (let i = 0; i < this.adminSandbox.releaseOrderValue.length; i++) {
      sum += this.adminSandbox.releaseOrderValue[i].AmountReleased;
    }
    return sum;
  }
  radioSanction() {
    this.Sanction = true;
    this.utilization = false;
    this.adminSandbox.ucOrderValue=[];
    this.State = '';
    this.Scheme = '';
    this.Components = '';
  }
  radioUtilization() {
    this.utilization = true;
    this.Sanction = false;
    this.adminSandbox.releaseOrderValue=[];
    this.State = '';
    this.Scheme = '';
    this.Components = '';
  }
  onSubmitReleaseFundFlow(UCValue: any, i: any) {
  
    this.currentFileUpload = this.selectedFiles.item(0);
    this.adminSandbox.postUCOrder(this.currentFileUpload, UCValue[i]);

  }
}




