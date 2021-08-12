import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { getUserAndFaculty, responeAfterDelete, responeAfterInsert, responeAfterUpdate, responeDayOpenAndClose, resPoneUpdateDayOpenAndClose } from '../admin/getUserAndFaculty';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpUrl: HttpClient) { }

  getHttpUserAndFaculty() {

    return this.httpUrl.get<getUserAndFaculty>(`${environment._base_url}admin-get-user-faculty.jsp`);

  }

  getHttpDayOpenAndClose() {

    return this.httpUrl.get<responeDayOpenAndClose>(`${environment._base_url}admin-get-day-open-close.jsp`);

  }

  postHttpAddUser(USERNAME, ROLE_TYPE, FACULTY_NO) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' });

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('USERNAME', USERNAME);
    urlSearchParams.append('ROLE_TYPE', ROLE_TYPE);
    urlSearchParams.append('FACULTY_NO', FACULTY_NO);

    const body = urlSearchParams.toString();

    return this.httpUrl.post<responeAfterInsert>(`${environment._base_url}admin-add-user.jsp`, body, { headers: headers });

  }

  postHttpUpdateUser(USER_ID, USER_USERNAME, USER_FACULTY_NO, USER_ROLE_TYPE) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' });

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('USER_ID', USER_ID);
    urlSearchParams.append('USER_USERNAME', USER_USERNAME);
    urlSearchParams.append('USER_FACULTY_NO', USER_FACULTY_NO);
    urlSearchParams.append('USER_ROLE_TYPE', USER_ROLE_TYPE);

    const body = urlSearchParams.toString();

    return this.httpUrl.post<responeAfterUpdate>(`${environment._base_url}admin-update-user.jsp`, body, { headers: headers });

  }


  postHttpDeleteUser(USER_ID) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' });

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('USER_ID', USER_ID);

    const body = urlSearchParams.toString();

    return this.httpUrl.post<responeAfterDelete>(`${environment._base_url}admin-delete-user.jsp`, body, { headers: headers });

  }

  postHttpUpdateDayOpenAndClose(START_DATE, END_DATE, USERNAME) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' });

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('START_DATE', START_DATE);
    urlSearchParams.append('END_DATE', END_DATE);
    urlSearchParams.append('USERNAME', USERNAME);

    const body = urlSearchParams.toString();

    return this.httpUrl.post<resPoneUpdateDayOpenAndClose>(`${environment._base_url}admin-update-day-open-and-close.jsp`, body, { headers: headers });

  }
}
