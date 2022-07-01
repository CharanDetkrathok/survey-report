import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'survey-report/src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HomeContentService {

  constructor(private http: HttpClient) { }

 	/* 
	- router.GET("/home-page", middlewares.Authorization)
	- ทุกครั้งที่เข้าเว็บ และกลับมาหน้า Home page 
	- เพื่อทำการ clear localStorage และ State managements
	- จะทำการ set navigation bar ใหม่ จะทำให้ได้ navigation bar ที่ถูกต้องเสมอ 
	*/
  checkAuthentication() {
    return this.http.get(`${environment.BASE_URL}${environment.CHECK_AUTH_WHEN_GO_HOME_PAGE}`)
  }

  fetchHomeContent() {
    return this.http.get(`${environment.BASE_URL}${environment.HOME_CONTENT}`)
  }

}
