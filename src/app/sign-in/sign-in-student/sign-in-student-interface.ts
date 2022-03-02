
export interface studentResponseInfo {
  StudentInfo: StudentInfo;
  StudentToken: StudentToken;
  status_code: string;
  message: string;
  role: string;
  role_detail: string;
}

export interface refreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_access_token: number;
  expires_refresh_token: number;
  access_token_id: string;
  refresh_token_id: string;
  authorized: string;
}

interface StudentToken {
  access_token: string;
  refresh_token: string;
  expires_access_token: number;
  expires_refresh_token: number;
  access_token_id: string;
  refresh_token_id: string;
  authorized: string;
}

interface StudentInfo {
  Std_code: string;
  Prename_no: string;
  Prename_thai: string;
  Prename_eng: string;
  First_name_thai: string;
  First_name_eng: string;
  Last_name_thai: string;
  Last_name_eng: string;
  Birth_date: string;
  Faculty_no: string;
  Faculty_name_thai: string;
  Faculty_name_eng: string;
  Curr_no: string;
  Major_no: string;
  Major_flag: string;
  Major_name_thai: string;
  Major_name_eng: string;
  Lev_id: string;
}

export interface ActiveLinkObject {
  isHomePage: boolean,
  isBechelorThPage: boolean,
  isBechelorEngPage: boolean,
  isReportPage: boolean,
}