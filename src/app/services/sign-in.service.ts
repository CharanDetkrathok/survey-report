import { switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { studentResponseInfo, refreshTokenResponse } from '../sign-in/sign-in-student/sign-in-student-interface';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface StudentStateInterface {
  isAuthentication: boolean;
  isLanguageTH: boolean;
  isLanguageENG: boolean;
  isBechelor: boolean;
  studentName: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  private studentStateInfo: StudentStateInterface = {
    isAuthentication: false,
    isLanguageTH: false,
    isLanguageENG: false,
    isBechelor: false,
    studentName: "",
    role: "",
  }

  private studentState = new BehaviorSubject<StudentStateInterface>(this.studentStateInfo);

  public get getStudentStateInformation() {
    return this.studentState.asObservable();
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.setIsAuthen(localStorage.getItem('isAuthen'));
  }

  public authentication(PLAY_LOAD: any): Observable<any> {

    return this.http.post<studentResponseInfo>(`${environment.BASE_URL}${environment.AUTHENTICATION}`, PLAY_LOAD);

  }

  public authorization(): Observable<any> {

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAccessToken()}`,
      'Content-Type': 'application/json'
    })

    return this.http.post<studentResponseInfo>(`${environment.BASE_URL}${environment.AUTHORIZATION}`, { headers });

  }

  public async signOut() {

    await this.revokeStudentStateAll();

    if ((this.getAccessToken() === null || this.getAccessToken() !== null) && this.getRefreshToken() !== null) {

      await this.Unauthorized().subscribe();
      
    }

    await this.revokeLocalstorages();

  }

  public Unauthorized() {
    const PLAY_LOAD = {
      refresh_token: this.getRefreshToken()
    };
    return this.http.post<any>(`${environment.BASE_URL}${environment.UN_AUTHORIZATION}`, PLAY_LOAD);
  }

  public refresh_authentication() {

    const PLAY_LOAD = {
      std_code: this.getStdCode(),
      first_name_thai: this.getFirstNameTH(),
      first_name_eng: this.getFirstNameENG(),
      fev_id: this.getLev_id(),
      refresh_token: this.getRefreshToken()
    };

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

    if (auth != null) {
      localStorage.setItem('isAuthen', auth);
      if (auth == 'true') {
        this.setStudentStateAll();
      } else {
        this.revokeStudentStateAll()
      }
    }

  }

  public setStudentStateAll(): void {
    let s: StudentStateInterface = {
      isAuthentication: true,
      isLanguageTH: this.getLanguageTHboolean(),
      isLanguageENG: this.getLanguageENGboolean(),
      isBechelor: this.getBechelorBoolean(),
      studentName: this.getFirstNameENG(),
      role: this.getRole(),
    }
    this.studentState.next(s);
  }

  public revokeStudentStateAll(): void {
    let s: StudentStateInterface = {
      isAuthentication: false,
      isLanguageTH: false,
      isLanguageENG: false,
      isBechelor: false,
      studentName: "",
      role: "",
    }
    this.studentState.next(s);
  }

  public getIsAuthen(): boolean {

    if (localStorage.getItem('isAuthen') == 'true') {
      return true;
    } else {
      return false;
    }

  }

  public getBechelorBoolean(): boolean {
    const s: studentResponseInfo = JSON.parse(localStorage.getItem('student'))
    if (s != null && s.role == '1') {
      return true;
    } else {
      return false;
    }
  }

  public getRole(): string {
    const s: studentResponseInfo = JSON.parse(localStorage.getItem('student'))
    if (s != null) {
      return s.role;
    } else {
      return "";
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

  public setAge(birthday: string) {
    const YEAR = (new Date()).getFullYear();
    let birth_year: string = (parseInt(birthday.slice(6)) - 543).toString();
    const AGE = (YEAR - Number(birth_year)).toString();
    localStorage.setItem('Age', AGE);
  }

  public getAge(): string {
    return localStorage.getItem('Age');
  }

  public revokeAge() {
    localStorage.removeItem('Age');
  }
  public getLanguageTHboolean(): boolean {

    if (localStorage.getItem('LANGUAGE') == 'TH') {
      return true;
    } else {
      return false;
    }

  }

  public getLanguageENGboolean(): boolean {

    if (localStorage.getItem('LANGUAGE') == 'ENG') {
      return true;
    } else {
      return false;
    }

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

  public async revokeLocalstorages() {
    await this.revokeStudentStateAll();
    await this.revokeIsAuthen();
    await this.revokeLanguage();
    await this.revokeStudent();
    await this.revokeAge();
    await this.revokeIsDisclosure();
  }

}
