import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInService } from 'src/app/services/sign-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthen: boolean = false;
  isSigningIn$: Observable<boolean>;

  constructor(
    private signInService: SignInService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.isSigningIn$ = this.signInService.isSigningIn

  }

  public signOut() {
    this.signInService.signOut();
    this.router.navigate(['/home-page']);
  }

}
