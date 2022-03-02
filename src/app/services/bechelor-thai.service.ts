import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { disclosureResponse, bechelorArticlesAndChoicesResponse, bechelorPartsOfArticlesRepose, headersRepose } from '../student/bachelor-interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BechelorThaiService {

  constructor(private http: HttpClient) { }

  fetchDisclosure(): any {
    return this.http.get<disclosureResponse>(`${environment.BASE_URL}${environment.DISCLOSURE}`);
  }

  fetchHeaders(): any {
    return this.http.get<headersRepose>(`${environment.BASE_URL}${environment.HEADER}`).pipe(tap(res => {
      // do something
    }))
  }

  fetchPartsOfArticles(): any {
    return this.http.get<bechelorPartsOfArticlesRepose>(`${environment.BASE_URL}${environment.BECHELOR_PART_OF_ARTICLE}`).pipe(tap(res => {
      // do something
    }))
  }

  fetchArticlesAndChoices(): any {
    return this.http.get<bechelorArticlesAndChoicesResponse>(`${environment.BASE_URL}${environment.BECHELOR_ARTICLE_AND_CHOICE}`).pipe(tap(res => {
      // to do something
    }));
  }



}
