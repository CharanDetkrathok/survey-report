import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment.prod';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { disclosureResponse } from '../student/bachelor-thai/bachelor-interface';

@Injectable({
  providedIn: 'root'
})
export class BechelorThaiService {

  constructor(private http: HttpClient) { }

  fetchDisclosure(): any {
    return this.http.get<disclosureResponse>(`${environment.BASE_URL}${environment.DISCLOSURE}`);
  }

}
