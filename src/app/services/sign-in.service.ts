import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from 'src/environments/environment.prod';
import { environment } from 'src/environments/environment';
import { studentResponseInfo, refreshTokenResponse } from '../sign-in/sign-in-student/sign-in-student-interface';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  private signingIn = new BehaviorSubject<boolean>(false);

  get isSigningIn() {
    return this.signingIn.asObservable();
  }

  constructor(private http: HttpClient) { }

  public authentication(PLAY_LOAD: any): any {

    return this.http.post<studentResponseInfo>(`${environment.BASE_URL}${environment.AUTHENTICATION}`, PLAY_LOAD);

  }

  public signOut() {

    this.signingIn.next(false);

    if ((this.getAccessToken() === null || this.getAccessToken() !== null) && this.getRefreshToken() !== null) {
      this.Unauthorized().subscribe();      
    }

    this.revokeLocalstorages();    

  }

  public Unauthorized() {
    const PLAY_LOAD = {
      refresh_token: this.getRefreshToken()
    }
    return this.http.post<any>(`${environment.BASE_URL}${environment.UN_AUTHORIZATION}`, PLAY_LOAD);
  }

  public refresh_authentication() {

    const PLAY_LOAD = {
      std_code: this.getStdCode(),
      first_name_thai: this.getFirstNameTH(),
      first_name_eng: this.getFirstNameENG(),
      fev_id: this.getLev_id(),
      refresh_token: this.getRefreshToken()
    }

    return this.http.post<refreshTokenResponse>(`${environment.BASE_URL}${environment.REFRESH_AUTHENTICATION}`, PLAY_LOAD).pipe(tap(response => {
      let ACCESS_TOKEN: string = response.access_token;
      let REFRESH_TOKEN: string = response.refresh_token;
      let AUTHORIZATION_TOKEN: string = response.authorized;
      this.setAccessToken(ACCESS_TOKEN);
      this.setRefreshToken(REFRESH_TOKEN);
      this.setIsAuthen(AUTHORIZATION_TOKEN);
    }));

  }

  public setIsAuthen(auth: string) {

    localStorage.setItem('isAuthen', auth)
    if (auth == 'true') {
      this.signingIn.next(true);
    } else {
      this.signingIn.next(false);
    }

  }

  public getIsAuthen(): boolean {

    if (localStorage.getItem('isAuthen') == 'true') {
      this.signingIn.next(true);
      return true;
    } else {
      this.signingIn.next(false);
      return false;
    }

  }

  public revokeIsAuthen() {
    localStorage.removeItem('isAuthen');
  }

  public setStudent(student: studentResponseInfo) {
    localStorage.setItem('student', JSON.stringify(student));
  }

  public getStudent(): studentResponseInfo {
    return JSON.parse(localStorage.getItem('student'));
  }

  public revokeStudent() {
    localStorage.removeItem('student');
  }

  public setLanguage(language: string) {
    localStorage.setItem('LANGUAGE', language);
  }

  public getLanguage(): string {
    return localStorage.getItem('LANGUAGE');
  }

  public revokeLanguage() {
    localStorage.removeItem('LANGUAGE');
  }
  public revokeIsDisclosure() {
    localStorage.removeItem('isDisclosure');
  }

  public setAccessToken(new_access_token: string) {
    let student: studentResponseInfo = this.getStudent();
    if (student != null || student != undefined) {
      student.StudentToken.access_token = new_access_token;
      this.setStudent(student);
    }
  }

  public getAccessToken(): string {
    const student = this.getStudent();
    if (student != null || student != undefined) {
      const access_token: string = student.StudentToken.access_token;
      return access_token;
    } else {
      return null;
    }
  }

  public setRefreshToken(new_refresh_token: string) {
    let student: studentResponseInfo = this.getStudent();
    if (student != null || student != undefined) {
      student.StudentToken.refresh_token = new_refresh_token;
      this.setStudent(student);
    } else {
      return null;
    }
  }

  public getRefreshToken(): string {
    const student = this.getStudent();
    if (student != null || student != undefined) {
      const refresh_token: string = student.StudentToken.refresh_token;
      return refresh_token;
    } else {
      return null;
    }
  }

  public getStdCode(): string {
    const student = this.getStudent();
    if (student != null || student != undefined) {
      const Std_code: string = student.StudentInfo.Std_code;
      return Std_code;
    } else {
      return null;
    }
  }

  public getFirstNameTH(): string {
    const student = this.getStudent();
    if (student != null || student != undefined) {
      const First_name_thai: string = student.StudentInfo.First_name_thai;
      return First_name_thai;
    } else {
      return null;
    }
  }

  public getFirstNameENG(): string {
    const student = this.getStudent();
    if (student != null || student != undefined) {
      const First_name_eng: string = student.StudentInfo.First_name_eng;
      return First_name_eng;
    } else {
      return null;
    }
  }

  public getLev_id(): string {
    const student = this.getStudent();
    if (student != null || student != undefined) {
      const Lev_id: string = student.StudentInfo.Lev_id;
      return Lev_id;
    } else {
      return null;
    }
  }

  public getAuthorized(): string {
    const student = this.getStudent();
    if (student != null || student != undefined) {
      const authorized: string = student.StudentToken.authorized;
      return authorized;
    } else {
      return null;
    }
  }

  public revokeLocalstorages() {
    this.signingIn.next(false);
    // this.revokeIsAuthen();
    // this.revokeLanguage();
    // this.revokeStudent();
    // this.revokeIsDisclosure();
    localStorage.clear();
  }

}
