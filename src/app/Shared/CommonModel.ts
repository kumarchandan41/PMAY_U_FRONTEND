
export class States{
    States_UT  : string;
    Codes      : string; 
	Division   : string;
	Status     : string;
}
export class District{
    District  : string;
	Dcode     : string;
	Distt     : string;
	StateCode : string;
	BackwardDistrict: string;
	Minority: string;
}
export class City{
    City  :     string;
	CityCode:    string;
	Codes:    string;
	cityid :number;
	Dcode :    string;
    District :    string;
    StatesName :    string;
	StateCode :    string;
	//Codes:string;
    ActiveFlag :    string;
	Status :    string;		
}

export class User_registration{
    UserId  :     string;
	FirstName  :     string;
	LastName  :     string;
	Address  :     string;
	Password  :     string;
	DesignationId :  string;
	StateId  :     string;
	DisttId  :     string;
	CityId  :     string;
	ZipCode :     string;
	LastLoginDate  :     string;
	PasswordChangeDate  :     string;
	RoleId :     string;
	EmailId :     string;
	MobileNo :     string;
	PhoneNo :     string;
	TaskName :     string;
}

export class DistrictMaster
    {
        DisttId :     string;
          District :     string;
        Distt :     string;
		 StateCode :     string;
		 
         Dcode  :     string;
         sunDisttCode:     string;  
         BackwardDistrict  :     string;
         Minority :     string;
         ActiveFlag :     string;
         Status :     string;
         StatesName  :     string;
		  
    }
