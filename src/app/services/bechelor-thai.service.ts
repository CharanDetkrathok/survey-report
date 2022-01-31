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

  //   {
  //     "Std_code":"5912700019",
  //     "Birth_date":"2/7/2539",
  //     "Lev_id":"1"
  // }

  // {
  //     "Std_code":"5814130063",
  //     "Birth_date":"5/2/2535",
  //     "Lev_id":"2"
  // }

  // {
  //     "Std_code":"5719480005",
  //     "Birth_date":"18/6/2529",
  //     "Lev_id":"3"
  // }

  fetchDisclosure(): any {
    return this.http.get<disclosureResponse>(`${environment.BASE_URL}${environment.DISCLOSURE}`);
  }

}
