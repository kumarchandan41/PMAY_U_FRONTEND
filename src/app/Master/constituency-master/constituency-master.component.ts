import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { AdminSandbox } from 'src/app/DRMC/admin.sandbox';
import { UserService } from 'src/app/admin-service/user.service';
import { CitiesBasedOnstate, getConstutiencyData } from 'src/app/login/Models/LoginModel';

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
 // public ddlCity: AbstractControl;
 // public ddlState: AbstractControl;
  
  public constituencyMaster: FormGroup;
 // CityCode: string;
  public ddlStateCode: AbstractControl;
  StateCode: string;
  //lstCity:CitiesBasedOnstate[];
  lstConstutiency:getConstutiencyData[];
  
  

  constructor(private fb: FormBuilder,private service:UserService, public adminSandbox: AdminSandbox) { }

  ngOnInit() {
    this.StateCode='0';
    this.adminSandbox.getStateData();      
    this.onConstituencyMaster();
    this.adminSandbox.getConsistuencyData(this.StateCode);
  //  this.adminSandbox.getCityConsistuencyData();
    this.StateCode = '';
   // this.CityCode = '';

   // this.Codes= '';
  }

  getCityData(event)
  {
    this.txtConstituencyName = null;
    this.txtConstituencyNumber= null;
    this.txtShittingMP= null;

    let stateCode=event.target.value;

      // this.service.GetAllCitiesBasedOnsyay(stateCode).subscribe(result=>{
      // this.lstCity=result;
      // })
  }
  public onConstituencyMaster(): void {
      this.constituencyMaster = this.fb.group({
      txtConstituencyName: ['', [Validators.required]],
      txtConstituencyNumber: ['', [Validators.required]],
      txtShittingMP: ['', [Validators.required]],
    //  ddlCity: ['', [Validators.required]],
      // ddlState: ['', [Validators.required]],
    });
    this.txtConstituencyName = this.constituencyMaster.controls['txtConstituencyName'];
    this.txtConstituencyNumber = this.constituencyMaster.controls['txtConstituencyNumber'];
    this.txtShittingMP = this.constituencyMaster.controls['txtShittingMP'];
    this.txtShittingMP = this.constituencyMaster.controls['txtShittingMP'];
   // this.ddlCity = this.constituencyMaster.controls['ddlCity'];
   this.ddlStateCode = this.constituencyMaster.controls['ddlState'];

  }
  onClickConstituencyMaster(event: Event, formGroup: any) {
   // debugger;
    this.submitted = true;
    event.stopPropagation();
    this.constituencyMaster.value.stateCode=this.StateCode;
    if (this.constituencyMaster.valid) {
      this.adminSandbox.postConstituency(formGroup)
      this.constituencyMaster.reset();
    //  this.CityCode = '';
      this.submitted = false;
    }
  }
  getConstutiencyData(event)
  {
   // debugger;
   this.txtConstituencyName   =null;
   this.txtConstituencyNumber =null;
   this.txtShittingMP =null;

      let StateCode=event.target.value;
      this.StateCode=StateCode;
      // this.service.GetAllConstutiency(StateCode).subscribe(result=>{
      // this.lstConstutiency=result[0];
      // this.constituencyMaster.controls['txtConstituencyName'].setValue(result.ConstituencyName);
      // this.constituencyMaster.controls['txtConstituencyNumber'].setValue(result.ConstituencyNumber);;
      // this.constituencyMaster.controls['txtShittingMP'].setValue(result.NameShittingMp);;   
      // })
      this.adminSandbox.getConsistuencyData(this.StateCode);
  }
  getConstutiency_Data(event)
  {
    //debugger;
    let Constutiency_Code=event.target.value;
    this.service.getConsistuency_Data(Constutiency_Code).subscribe(result => {
    //  alert(data.ConstituencyNumber);
    //  alert(data.NameShittingMp);
   // debugger;
     this.lstConstutiency=result[0];
      this.constituencyMaster.controls['txtConstituencyNumber'].setValue(result[0].ConstituencyNumber);;
      this.constituencyMaster.controls['txtShittingMP'].setValue(result[0].NameShittingMp);;   
    });
  }
}
