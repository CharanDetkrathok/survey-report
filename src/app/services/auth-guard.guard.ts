import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.isCheckedSignin();

  }

  isCheckedSignin(): boolean {

    let isAuthen: boolean = false;

    if (localStorage.getItem('isAuthen') === 'true' || localStorage.getItem('isAuthen') != null || localStorage.getItem('isAuthen') != undefined) {

      isAuthen = true;

    } else {

      isAuthen = false;

      if(localStorage.getItem('student') != null || localStorage.getItem('student') != undefined) {
        localStorage.removeItem('isAuthen');
        localStorage.removeItem('student');
        localStorage.removeItem('LANGUAGE');
      }

      this.router.navigate(['/home-page']);
    }
    return isAuthen;

  }


}
