
import { Component, OnInit } from '@angular/core';
import { SignInService } from '../services/sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isAuthentication: boolean;

  constructor(
    private signInService: SignInService
    ) {
    this.signInService.getStudentStateInformation.subscribe(obs => {
      this.isAuthentication = obs.isAuthentication; 
    });    
  }

  ngOnInit(): void { }

  onClickStaffButton() {

    document.querySelector<HTMLElement>('div.staff').style.marginLeft = "0";
    document.querySelector<HTMLElement>('div.welcom').style.marginLeft = "100vw";

  }

  onClickWelcomButton() {

    document.querySelector<HTMLElement>('div.staff').style.marginLeft = "-100vw";
    document.querySelector<HTMLElement>('div.welcom').style.marginLeft = "0";
    document.querySelector<HTMLElement>('div.student').style.marginLeft = "100vw";

  }

  onClickStudentButton() {

    document.querySelector<HTMLElement>('div.welcom').style.marginLeft = "-100vw";
    document.querySelector<HTMLElement>('div.student').style.marginLeft = "0";

  }



}
