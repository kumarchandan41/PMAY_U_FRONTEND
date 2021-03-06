export class Excelfile {
    id :string;
    A  :string;
    B  :string;
    C  :string;
    D  :string;
    E  :string;
   
}

export class ExcelSheet {
    SheetName :string;
   
}

export class Excel_CLSSCityWisefile {
    sid         :string;
    State_Code  :string;
    state_Name  :string;
    District_Code  :string;
    District_Name  :string;
    City_Code  :string;
    City_Name  :string;
    Loan_Amount  :string;
    SubsidyAmountCredited  :string;
    NoofBeneficiaries  :string; 
}

export class Excel_CLSSStateWisefile {
    sid         :string;
    State_Code  :string;
    state_Name  :string;
    District_Code  :string;
    District_Name  :string;
    City_Code  :string;
    City_Name  :string;
    Loan_Amount  :string;
    SubsidyAmountCredited  :string;
    NoofBeneficiaries  :string; 
}
export class ExcelfilePhyDash {
 	sId  :string;
     SrNo    :string;
     State1  :string;
     StateCode  :string;
     Demand  :string;
     Houses_Sanctioned:string;  
     CentralShare  :string;
     StateShare  :string;
     ULBShare  :string;
     BeneficiaryShare  :string;
     TotalCost  :string;
     Grounded  :string;
     Completed  :string;
     Occupied  :string;
     CAApproved  :string;
     CASanctionedforRelease :string; 
     CAReleased  :string;
     PendingforRelease  :string;
     IIIQ_15_16  :string;
     IV_Q_15_16  :string;
     IQ_16_17  :string;
     IIQ_16_17  :string;
     IIIQ_16_17  :string;
     IV_Q_16_17  :string;
     I_Q_17_18  :string;
     II_Q_17_18  :string;
     III_Q_17_18  :string;
     IV_Q_17_18  :string;
     I_Q_18_19  :string;
     II_Q_18_19  :string;
     III_Q_18_19  :string;
     IV_Q_18_19  :string;
     I_Q_19_20  :string;
     SRNo1  :string;
     State2  :string;
     CumSanctioned  :string;
     CASanctioned_15_16  :string;
     CASanctioned_16_17  :string;
     CASanctioned_17_18  :string;
     CASanctioned_18_19  :string;
     CASanctioned_19_20  :string;
     CumuCAReleased  :string;
     CumuCA_Released_15_16  :string;
     CumuCA_Released_16_17  :string;
     CumuCA_Released_17_18  :string;
     CumuCA_Released_18_19  :string;
     CumuCA_Released_19_20  :string;
     k   :string;
     ll   :string;
     HS_Cum_20_8_18:string;  
     HS_15_16  :string;
     HS_16_17  :string;
     HS_17_18  :string;
     HS_18_19  :string;
     HS_19_20  :string;
     HC_20_08_18  :string;
     HC_14_15  :string;
     HC_15_16  :string;
     HC_16_17  :string;
     HC_17_18  :string;
     HC_18_19  :string;
     HC_19_20  :string;
     HO_Cum  :string;
     HO_14_15  :string;
     HO_15_16  :string;
     HO_16_17  :string;
     HO_17_18  :string;
     HO_18_19  :string;
     HO_19_20  :string;
     F63  :string;
     Expenditure  :string;
     Division:string;
}


export class Excel_DemandCityWise {
    SrNo         :string;
    State_Name   :string;
	State_Code   :string; 
	District_Name  :string;
	District_Code :string;
	CITY_Name  :string;
	City_Code :string;
	ISSR :string;
	AHP :string;
	BLC :string;
	CLSS :string;
	demand :string;
	Cid :string;
	Division:string;
}
 
export class Excel_CLSSCityMain {
    Id         :string;
    SrNo       :string;
	state_Name :string; 
	StateCode  :string; 
	District_Name  :string;
	Dcode          :string; 
	City_Name      :string;
	CityCode       :string;
	EWS_Bene       :string;
	EWS_Loan_Amt   :string; 
	EWS_Subsidy    :string; 
	LIG_Bene       :string;
	LIG_Loan_Amt   :string; 
	LIG_Subsidy    :string;
	MIG1_Bene      :string;
	MIG1_Loan_Amt  :string;
	MIG1_SubsidyAmt :string; 
	MIG2_Bene       :string;
	MIG2_Loan_Am    :string; 
	MIG2_SubsidyAmt :string; 
	Total_LoanAmt   :string; 
	Total_SubsidyAmt :string; 
	Total_Beneficiaries :string; 
	Cid   :string;
 
	EWS_LIG_Bene :string;
	MIG_SubsidyAmtTotal:string;

 
}


export class Excel_PMAY_Data {

	 
	SrNo     :string;
	Project_Code    :string;
	Annexure_ID   :string;
	Component   :string;
	State   :string;
	District   :string;
	City   :string;
	StateCode   :string;
	Dcode   :string;
	sunDisttCode   :string;
	CityCode   :string;
	
	
	 
	Project_Name   :string;
	CSMCDate    :string;
	CSMCNo   :string;
	FinYear   :string;
	NoofProjects   :string; 
	Project_Cost     :string;
	Central_Assistance_involved    :string;
	

	
	State_Grant    :string;
	ULBShare    :string;
	BeneficiaryShare    :string;
	Released_throug_EBR    :string;
	CASanctionedForRel    :string;
	FirstInstallmentReleased    :string;
	SecondInstallmentReleased    :string;
	ThirdInstallmentReleased    :string;
	CentralAssistanceReleased    :string;

  

	UC_Received    :string;
	UC_Pending    :string;
	Housesinvolved    :string;
	FundsDisbursed_in_Houses   :string;
	Houses_Grounded   :string;
	HousesUnderProgress   :string;
	Houses_Completed   :string;
	HousesAllotted   :string;
	HousesOccupied   :string;
	Houses_yetto_Grounded   :string;
	Cid  :string;
	Division  :string;
 
}

export class Excel_JNNURN_Data {
 //	id   :string;
	SrNo     :string;  
	Project_Code :string;
	State :string;
	Scheme :string;
	Distt :string;
	CityTown :string;
	State_Code :string;
	DisttCode :string;
	SubDisttCode :string;
	TownCode :string;
	Project_Title :string;
	App_Date  :string;
	Cancelled_Date :string;
	O_ProjectCost :string;
	O_CentrallShare :string;
	O_DwellingUnit :string;
	ProjCost :string;
	Central_Share :string;
	DwellingUnit :string;
	Central_Share_Released_Projects :string; 
	Central_Share_Adjusted  :string;
	Excess_ACA_Released  :string;
	CentralShareRefundedbyStateGovt :string; 
	UC_Received  :string;
	Pending_UC  :string;
	Under_Progress  :string;
	Completed  :string;
	Allotted  :string;
	Occupied :string;
	UnOccupied :string;
	NonStarter :string;
	Grounded :string;
	Completed1 :string;
	Occupied1 :string;
 }	