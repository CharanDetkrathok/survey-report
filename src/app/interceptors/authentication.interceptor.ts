import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { SignInService } from '../services/sign-in.service';
import { studentResponseInfo } from '../sign-in/sign-in-student/sign-in-student-interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  isAuthentication : boolean;
  
  constructor(
    private signInServices: SignInService,
    private router: Router
  ) { 
    this.signInServices.getStudentStateInformation.subscribe(obs => {
      this.isAuthentication = obs.isAuthentication;  
    });    
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.isAuthentication) {

      const access_token: string = this.signInServices.getAccessToken();

      if (access_token != null) {
        request = this.addTokenHeader(request, access_token);
      }

    }

    return next.handle(request).pipe(catchError(error_access_token => {

      if (error_access_token instanceof HttpErrorResponse && error_access_token.status === 401) {

        this.signInServices.setIsAuthen("false");
        return this.handle401Unauthorized(request, next);

      } else {
         
        this.signOut();
        return throwError(error_access_token);

      }

    }));

  }

  private handle401Unauthorized(request: HttpRequest<any>, next: HttpHandler) {

    if (!this.isAuthentication) {

      return this.signInServices.refresh_authentication().pipe(switchMap(() => {

        let ACCESS_TOKEN: string = this.signInServices.getAccessToken();

        return next.handle(this.addTokenHeader(request, ACCESS_TOKEN)).pipe(catchError(err => {

          this.signOut();
          return throwError(err);

        }));

      }));

    } else {
      this.signOut();
    }

  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {

    return request = request.clone({
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    });

  }

  private signOut() {
    this.signInServices.signOut();
    this.router.navigate(['/home-page'])
  }

}
