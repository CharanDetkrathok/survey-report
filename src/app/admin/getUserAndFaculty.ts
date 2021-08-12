export interface getUserAndFaculty {
  error_message: string;
  error_message_status: number;
  USERS: {
    USER_ID: string;
    USER_USERNAME: string;
    USER_FACULTY_NO: string;
    USER_ROLE_TYPE: string;
  }
  FACULTYS: {
    FACULTY_FACULTY_NO: string;
    FACULTY_FACULTY_NAME_THAI: string;
  }
}

export interface setUserData {
  USER_ID: string;
  USER_USERNAME: string;
  USER_FACULTY_NO: string;
  USER_ROLE_TYPE: string;
}

export interface setFacultyData {
  FACULTY_FACULTY_NO: string;
  FACULTY_FACULTY_NAME_THAI: string;
}


export interface responeAfterInsert {
  error_message_status: number;
  check_duplicate: number;
  error_message_from_user: string;
  error_message_duplicate_from_system: string;
  error_message_insert_from_system: string;
}

export interface responeAfterDelete {
  error_message_status: number;
  error_message_from_user: string;
  error_message_delete_from_system: string;
}


export interface responeAfterUpdate {
  error_message_status: number;
  error_message_for_user: string;
  error_message_check_user_id_for_user: string;
  error_message_check_user_id_from_system: string;
  error_message_update_from_system: string;
}

export interface responeDayOpenAndClose {
  error_message: string;
  error_message_status: number;
  DAY_OPEN_AND_CLOSE: {
    END_DATE: string;
    USERNAME: string;
    START_DATE: string;
  };
}

export interface setDayOpenAndClose {
  END_DATE: string;
  USERNAME: string;
  START_DATE: string;
}

export interface resPoneUpdateDayOpenAndClose {
	error_message_status: number;
	error_message_for_user: string;
	error_message_update_from_system: string;
}
