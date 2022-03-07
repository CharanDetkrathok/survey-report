import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignInService } from 'src/app/services/sign-in.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private router: Router, private signInServices: SignInService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.isCheckedSignin();

  }

  isCheckedSignin(): boolean {

    let isAuthen: boolean = this.signInServices.getIsAuthen();

    if ( isAuthen === true) {
      return true;
    } else {
      this.signInServices.signOut()     
      this.router.navigate(['/home-page']); 
      return false;
    }
    

  }


}
