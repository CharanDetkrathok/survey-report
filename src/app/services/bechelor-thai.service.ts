import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { disclosureResponse, bechelorArticlesAndChoicesResponse, bechelorPartsOfArticlesRepose, headersRepose, bechelorArticlesNoDistinctResponse, RegionalCenterResponse } from '../student/bachelor-interface';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'survey-report/src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BechelorThaiService {

  constructor(private http: HttpClient) { }

  fetchDisclosure(): Observable<disclosureResponse> {
    return this.http.get<disclosureResponse>(`${environment.BASE_URL}${environment.DISCLOSURE}`);
  }

  fetchHeaders(): Observable<headersRepose[]> {
    return this.http.get<headersRepose[]>(`${environment.BASE_URL}${environment.HEADER}`);
  }

  fetchPartsOfArticles(): Observable<bechelorPartsOfArticlesRepose[]> {
    return this.http.get<bechelorPartsOfArticlesRepose[]>(`${environment.BASE_URL}${environment.BECHELOR_PART_OF_ARTICLE}`);
  }

  fetchArticlesNoDistinct(): Observable<bechelorArticlesNoDistinctResponse[]> {
    return this.http.get<bechelorArticlesNoDistinctResponse[]>(`${environment.BASE_URL}${environment.BECHELOR_ARTICLE_NO_DISTINCT}`);
  }

  fetchArticlesAndChoices(): Observable<bechelorArticlesAndChoicesResponse[]> {
    return this.http.get<bechelorArticlesAndChoicesResponse[]>(`${environment.BASE_URL}${environment.BECHELOR_ARTICLE_AND_CHOICE}`);
  }

  fetchRegionalCenter(findRegionalCenter: string): Observable<RegionalCenterResponse[]> {
    return this.http.get<RegionalCenterResponse[]>(`${environment.BASE_URL}${environment.REGIONAL_CENTER}/${findRegionalCenter}`);
  }



}
