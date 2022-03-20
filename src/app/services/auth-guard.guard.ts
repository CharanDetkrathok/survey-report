import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignInService } from 'src/app/services/sign-in.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  isAuthentication: boolean;

  constructor(private router: Router, private signInServices: SignInService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.isCheckedSignin();

  }

  isCheckedSignin(): boolean {

    this.signInServices.getStudentStateInformation.subscribe(obs => {
      this.isAuthentication = obs.isAuthentication; 
    }); 

    if ( this.isAuthentication === true) {
      return true;
    } else {
      this.signInServices.signOut()     
      this.router.navigate(['/home-page']); 
      return false;
    }
    

  }


}
