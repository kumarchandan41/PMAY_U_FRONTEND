
//import { NumberValueAccessor } from '@angular/forms/src/directives';

export class Login{
    UserName : string;
    Password:string;
    RoleId:string;
}


export class States{
    States_UT  : string;
    Codes      : string; 
    Division   : string;
    
}
export class Designation{
    DesigId  : number;
    Designation  : string; 
}

export class UserMaster {
	UserName        : string; 
	Password        : string; 
	DesigId   : string; 
	StateId         : string; 
	CityId          : string; 
	LastLoginDate   : string; 
	PasswordChangeDate : string; 

	EmailId         : string; 
	PhoneNo        : string; 
    TaskId          : string; 
}

export class District{
    District  :     string;
    Dcode      :    string;
    
}
export class City{
    City  :     string;
    CityCode:    string;

}

export class Comp_Values{
    ISSR:    number;
    BLCS:    number;
    RAY:     number;
    RAY_AHP: number;
    AHP:     number;
}
export class CLSS_Values{
    No_Bene_EWS_LIG:    number;
    No_Beneficiary_MIG: number;
    NoBeneficiary_Total:number;
    Subsidy_EWS_LIG:    number;
    Subsidy_MIG:        number;
    Subsidy_Total :     number;
    
 
}

		
 
export class Investment_Details{
    Cost:           number;
    FinancialYear:  number;
    CentralShare:   number;
    StateShare:     number;
    ULBShare:       number;
    Beneficiary :   number; 
}
export class Investment_CONS{
    Demand:           number;
    HousesSanctioned:  number;
    CentralShare    :   number;
    StateShare	:number;
    ULBShare :number;
    BeneficiaryShare :number;
    TotalCost :number;
    	
}
export class Demand_SanctionStateWise{
    Demand:           number;
    HousesSanctioned:  number;
    CentralShare    :   number;
    StateShare	:number;
    ULBShare :number;
    BeneficiaryShare :number;
    TotalCost :number;
    Grounded :number;
    Completed :number;
    Occupied :number;
    CAApproved:number;
    CASanctforRelease:number;	
    CAssitReleased:number;
    PendingforRelease:number;
}
//------------------------------------------------------
export class Charts {
    Sanctioned:                            number;
    Houses_Grounded:                       number;
    Houses_Completed:                      number;
    Houses_Occupied:                       number;
    Investment_in_Project:                 number;
    Central_Assistance_Committed:          string;
    Central_Assistance_Sanctioned:         string;
    Central_Assistance_Released:           number;
    Central_Assistance_Liable_for_Release: string;
    BLC_Count                              :string;
    AHP_Count                              :string;
    issr_slum                              :string;
    CLSS_Count                             :string;   
    CASanctforRelease                      :number; 
    CA_Approved                           :number;  
    CentralShare    :   number;
    StateShare	:number;
    ULBShare :number;
    BeneficiaryShare :number;
    TotalCost :number;
    UC_Recd :number;
}
export class CLSS_Citywise_Values{
    Loan_Amount:    number;
    SubsidyAmountCredited: number;
    NoofBeneficiaries:number;
}
export class JNReport {
    Grounded:   number;
    Completed1: number;
    Occupied1:  number;
    No_Of_Projects: number;
}
export class Demand {
    ISSR:   number;
    AHP: number;
    BLC:  number;
    CLSS :number;
    demand:number;
    RAY:number;
    
}
export class JNAtAGlance { 
    NoOfprojApproved:number;	
    ProjCostApproved:number;	
    Grounded:number;	
    Completed:number;	
    Occupied:number;	
    HousesSanctioned:number;	
    CentralAssisRel:number;	
    CentralShare:number;
}

export class CompAtAGlance { 
    NoOfprojApproved:number;
    Project_Cost:number;	
    ProjCostApproved:number;
    CentralShare:number;  		
    CentralAssisRel:number;
    Grounded:number;	
    Completed:number;	
    Occupied:number;	
    HousesSanctioned:number;	
}
export class FinYrWise_FinDataHouses {
    CASanctioned:number;
    CAReleased:number;
    QM_FIN_YEAR:number;
}
export class FinanceYrWiseHouses
{
   // HS15_16	HS_16_17	HS17_18	HS18_19
   // HC_14_15	HC_15_16	HC_16_17	HC_17_18	HC_18_19
   // HO_15_16	HO_16_17	HO_17_18	HO_18_19	 
    
    HS15_16:number;
    HS16_17:number;
    HS17_18:number;
    HS18_19:number;
 
    HC14_15:number;
    HC15_16:number;
    HC16_17:number;
    HC17_18:number;
    HC18_19:number;
 
    HO15_16:number;
    HO16_17:number;
    HO17_18:number;
    HO18_19:number;
 

    HS_15_16:number;
     
    HS_16_17:number;

   // HS17_18:number;
   // HS18_19:number;

    HC_14_15:number;
    HC_15_16:number;
    HC_16_17:number;  
    HC_17_18:number;
    HC_18_19:number;
    HC_20_08_18:number;
     
    HO_15_16:number;
    HO_16_17:number;
    HO_17_18:number;
    HO_18_19:number;
    			

    CumSanctioned:number;
    CASanctioned_15_16:number;
    CASanctioned_16_17:number;
    CASanctioned_17_18:number;
    CASanctioned_18_19:number;
    CumuCAReleased:number;
    CumuCA_Released_15_16:number;
    CumuCA_Released_16_17:number;
    CumuCA_Released_17_18:number;
    CumuCA_Released_18_19:number;
    IIIQ_15_16:number;
    IV_Q_15_16:number;
    IQ_16_17:number;
    IIQ_16_17:number;
    IIIQ_16_17:number;
    IV_Q_16_17:number;
    I_Q_17_18:number;
    II_Q_17_18:number;
    III_Q_17_18:number;
    IV_Q_17_18:number;
    I_Q_18_19:number;
    II_Q_18_19:number;
    III_Q_18_19:number;
    IV_Q_18_19:number;
    Grounded:number;
    Completed:number;
    Occupied:number;
    CAApproved:number;
    HousesSanctioned:number;
    Demand:number;
    CASanctionedforRelease :number;
    CAReleased :number;
    Expenditure:number;
    ULBShare:number;
    CentralShare:number;
    StateShare:number;
    BeneficiaryShare  :number;
    Division :number;
    totalCost :number;
}
export class FinDetails
{
    CASanctioned:string;
        CAReleased:string;
            QM_FIN_YEAR:string;
            CAI:string;
            CAR:string;
            FINYEAR:string;
}
export class phy_Fin_Graph
{
    //Physical 
    HS_14_15: string;
    HS_15_16: string;
    HS_16_17: string;
    HS_17_18: string;
    HS_18_19: string;
    HG_14_15: string;
    HG_15_16: string;
    HG_16_17: string;
    HG_17_18: string;
    HG_18_19: string;
    HC_14_15: string;
    HC_15_16: string;
    HC_16_17: string;
    HC_17_18: string;
    HC_18_19: string;

    HO_14_15:String;
    HO_15_16: string;
    HO_16_17: string;
    HO_17_18: string;
    HO_18_19: string;

    FINYEAR_14_15:string;
    FINYEAR_15_16:string;
    FINYEAR_16_17:string;
    FINYEAR_17_18:string;
    FINYEAR_18_19:string;
}
export class FinValue_Wise_Graph
{   //Financial
    CAR :number;
    CAI :number;    
}
export class CompMaster
{  
    Cid :number;
    Cname :number;    
} 
//--------------
// New Table 
export class CLSS_CityValues{
    EWS_LIG_Bene :number; 
    EWS_LIG_Loan_Amt :number;
    EWS_LIG_Subsidy:number;
    MIG_BeneTotal:number;
    MIG_Loan_AmtTotal:number;
    MIG_SubsidyAmtTotal:number;
}
export class PMAY_DATA{
    SrNo  :number;
    Sanctioned:number;   
	ProjectCode :number;
	Component :string;
	State :string;
	District: string;
	City :string;
	StateCode: string;
	Dcode :string;
	sunDisttCode :string;
	CityCode :string;
//	[Project Name] :string;
	CSMCDate :string;
	CSMCNo :number;
//	[F# Year] :string;
	NoofProjects :number;
	Project_Cost :number;
    Central_Assistance_involved :number;
    CentralAssistanceCommitted:number;
    CentralAssistanceSanctioned:number;
    Second_Installment_Released:number;
	StateGrant :number;
	ULBShare :number;
	BeneficiaryShare :number;
	ReleasedthroughEBR :number;
    CASanctionedForRel :number;
    CASanctforRelease :number;
	FirstInstallmentReleased :number;
	SecondInstallmentReleased :number;
	ThirdInstallmentReleased :number;
	CentralAssistanceReleased :number;
    UC_Received :number;
  //  UC_Recd:number;
	UC_Pending :number;
	Housesinvolved :number;
	FundsDisbursedinHouses :number;
	Houses_Grounded :number;
	HousesUnderProgress :number;
    Houses_Completed :number;
    Houses_Occupied:number;
	HousesAllotted :number;
	HousesOccupied :number;
	Houses_yet_to_Grounded :number;
    Cid :string; 
    StateShare:number;
    CentralShare:number;
    Investment_in_Project:number;
    CA_Approved:number;
    Central_Assistance_Liable_for_Release: string;
    State_Code :string;
    CumSanctioned:number;
    CASanctioned_15_16:number;
    CASanctioned_16_17	:number;
    CASanctioned_17_18:number;
    CASanctioned_18_19	:number;
    CASanctioned_19_20:number;
    CumuCAReleased:number;
    CumuCA_Released_15_16:number;
    CumuCA_Released_16_17	:number;
    CumuCA_Released_17_18:number;
    CumuCA_Released_18_19:number;
    CumuCA_Released_19_20:number;
    Current_Financial_Year: string;
    Houses_Sanctioned:number;
    Grounded:number;
    Completed:number;
    Occupied:number;
}
export class ComponentWiseDATA{
    Component  :number;
    Sanctioned:number;
}

export class  PMAY_FinancialData
{
    HS_14_15: string;
    HS_15_16: string;
    HS_16_17: string;
    HS_17_18: string;
    HS_18_19: string;
    HG_14_15: string;
    HG_15_16: string;
    HG_16_17: string;
    HG_17_18: string;
    HG_18_19: string;
    HC_14_15: string;
    HC_15_16: string;
    HC_16_17: string;
    HC_17_18: string;
    HC_18_19: string;

    HO_14_15:String;
    HO_15_16: string;
    HO_16_17: string;
    HO_17_18: string;
    HO_18_19: string;

    FINYEAR_14_15:string;
    FINYEAR_15_16:string;
    FINYEAR_16_17:string;
    FINYEAR_17_18:string;
    FINYEAR_18_19:string;    
        FinYear  :string;
        StateCode  :string;
        dcode  :string;
        cityCode  :string;
        cid  :string;
}

export class StateScore{
    CASanctionedRel :number;
    Housesinvolved:number;
    
    StateId  :number;
    Codes    :string;
    StateName :number;
    Sanction_vs_Demand :number;
    Grounding_Sanction:number;
    Completion_vs_Sanction:number;
    BLC_Houses_Geotagged:number;
    Relelase_vs_Sanction:number;
    MIS_Annexure_uploading:number;
    Beneficiary_Attachment:number;
    Reforms_Achievement:number;
    JN_Houses_vacant:number;
    Population_Census_2011 :number;
	TG_12_Housing_Shortage :number;
	Aadhar_Coverage :number;
	Cities_included_in_Mission:number; 
	Total_Demand_as_per_Road_map :number;
	Demand_met :number;
    Per_Demand_met :number;

    Total_PMAY_U_Houses_ISSR_AHP_BLC_CLSS :number; 
	Valid_Aadhar_Beneficiaries :string;
	Bene_Percentage :number;
	HFAPoA_funds_Released :number;
	HFAPoA_Received :number;
	HFAPoA_Status : string;
    ISSR_NOP :number; 
    AHP_NOP :number;
    BLC_NOP :number;
    ISSR_Sanct_for_Release :number;
    AHP_Sanct_for_Release :number;
    BLC_Sanct_for_Release:number; 
    
    
    ISSR_CA_Released :number;
    AHP_CA_Released :number;
    BLC_CA_Released :number;
    
    ISSR_Balance_for_Release:number; 
    AHP_Balance_for_Release:number;
    BLC_Balance_for_Release:number; 
    Balance  :Number;
    ISSR_Houses_Sanctioned:number;
    AHP_Houses_Sanctioned:number;
    BLC_Houses_Sanctioned:number;
    ISSR_Grounded:number;
    AHP_Grounded:number;
    BLC_Grounded:number;
    ISSR_Completed:number;
    AHP_Completed:number;
    BLC_Completed:number;
    PMAY_Funds_Released:number;
    PMAY_Ucs_Received:number;
    PMAY_UC_Pending:number; 
  //  alert( this.PMAY_UC_Pending);

    PMAY_Houses_Occupied:number;
    Reforms_Achieved:number;
    CLSS_MIS_Survey:number;
    SLTC_Funds_Released_RsinnCr:string;
     
    SLTC_Specialists_Approved :number;
    SLTC_Specialists_in_Place:number;
    
    CLTC_Funds_Released_RsinCr:number;
    CLTC_Specialists_Approved:number;
    CLTC_Specialists_in_Place:number;
    
    Projects_Approved :number;
    Projects_uploaded:number;
    Percent_Projects_uploaded:number;

    BLC_Houses_Approved:number;	
    BLC_Houses_Grounded:number;
    BLC_Houses_Geo_Tagged:number;
    CLSS_Subsidy_EWS_LIG_MIG:number;
    
    JN_Houses_Sanctioned:number; 
    JN_Houses_Completed :number;
    JN_Houses_Occupied :number;	
    JN_Houses_In_Progress:number; 
    JN_Houses_Unoccupied:number;	
    JN_Houses_Non_Starter :number;
    JN_UC_Pending :number;	
    RAY_Houses_Sanctioned :number;
    RAY_Houses_Completed:number;	
    RAY_Houses_Occupied:number; 
    RAY_Houses_In_Progress:number;	
    RAY_Houses_Unoccupied:number; 
    RAY_Houses_Non_Starter :number;	
    RAY_UC_Pending:number; 
    CLSS_Beneficiaries_EWS_LIG_MIG:number;
    
 
    Houses_Grounded :number;
    Houses_Completed:number;
    HousesOccupied:number;

    RowNum:number;
    CSMCDate :string;
    CSMCNo :number;
    Component:string;
    CASanctionedForRel:number;
    CentralAssistanceReleased:number;
    recordBased_dtC:number;
    recordBasedComp:number;
    projects:number;

    City  :string;
    ProjectTitle :string;
    SanctionedDate :string;
    CASanctioned:number;
    CAReleased:number;
    HousesSanctioned :number;
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
export class getHFACodes {
    HFAid:number;
    Name:string;
}