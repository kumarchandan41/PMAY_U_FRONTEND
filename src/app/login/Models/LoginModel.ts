export class LoginModel
{
    public userName:string="";
    public password:string="";
}

export class FinancialProgress {
    CAI :number;
    CAR: number;
    FINYEAR :string;
    StateCode :string;
    dcode :string;
    cityCode :string;
    cid :string;
    
}
export class User {

    UserName :string;
    Password :string;
    // LastLoginDate: Date;
    // PasswordChangeDate: Date;
    // RoleId :string;
    // EmailId:string; 
    // PhoneNo:string;
}

export class RegistrationModel
{
     userName:string;
     password:string;
     UserId:string;
     UserName:string;
     LastName:string;
     Address:string;
     Password:string;
     DesignationId:string;
     StateId:string;
     DisttId:string;
     CityId:string;
     ZipCode:string;
     LastLoginDate:string;
     PasswordChangeDate:string;
     RoleId:string;
     EmailId:string;
     MobileNo:string;
     PhoneNo:string;
     TaskName:string;
}
export class CitiesBasedOnstate
{
      City:string;
      citycode:string;
}

export class getConstutiencyData
{
    ConstituencyId	:string;
    StateCode	:string;
    CityCode	:string;
    ConstituencyName	:string;
    ConstituencyNumber	:string;
    NameShittingMp	:string;
    ActiveFlag	 :string;
 
}
export class getProjRelOrder
{
     ReleaseOrderID 	:string;
	 State 	:string;
	 SanctionNo 	:string;
	 Scheme 	:string;
	 Component 	:string;
	 Date 	:string;
	 AmountReleased 	:string;
	 ReleasePDF 	:string;
}
