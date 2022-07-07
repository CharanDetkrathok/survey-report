
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

  ngOnInit(): void {
    // document.querySelector<HTMLElement>('div.student').style.display = "none";
    // document.querySelector<HTMLElement>('div.staff').style.display = "none";
   }

  onClickStaffButton() {

    // document.querySelector<HTMLElement>('div.staff').style.display = "block";

    if (window.matchMedia("only screen and (max-height: 398px) and (orientation: landscape)").matches) {
      document.querySelector<HTMLElement>('div.staff').style.marginLeft = "0";
      document.querySelector<HTMLElement>('div.welcom').style.marginLeft = "100vh";
       // console.log("landscape min-height : 398")
    } else {
      document.querySelector<HTMLElement>('div.staff').style.marginLeft = "0";
      document.querySelector<HTMLElement>('div.welcom').style.marginLeft = "100vw";
    }
  

  }

  onClickWelcomButton() {

    // document.querySelector<HTMLElement>('div.student').style.display = "block" ? document.querySelector<HTMLElement>('div.student').style.display = "none": document.querySelector<HTMLElement>('div.student').style.display = "block";
    // document.querySelector<HTMLElement>('div.student').style.display = "none";
    // document.querySelector<HTMLElement>('div.staff').style.display = "block"? document.querySelector<HTMLElement>('div.staff').style.display = "none" : document.querySelector<HTMLElement>('div.staff').style.display = "block";

    if (window.matchMedia("only screen and (max-height: 398px) and (orientation: landscape)").matches) {
      document.querySelector<HTMLElement>('div.staff').style.marginLeft = "-100vh";
      document.querySelector<HTMLElement>('div.welcom').style.marginLeft = "0";
      document.querySelector<HTMLElement>('div.student').style.marginLeft = "100vh";
       // console.log("landscape min-height : 398")
    } else {
      document.querySelector<HTMLElement>('div.staff').style.marginLeft = "-100vw";
      document.querySelector<HTMLElement>('div.welcom').style.marginLeft = "0";
      document.querySelector<HTMLElement>('div.student').style.marginLeft = "100vw";
    }

  }

  onClickStudentButton() {
   
   if (window.matchMedia("only screen and (max-height: 398px) and (orientation: landscape)").matches) {
    document.querySelector<HTMLElement>('div.welcom').style.marginLeft = "-100vh";
    document.querySelector<HTMLElement>('div.student').style.marginLeft = "0";
    // console.log("landscape min-height : 398")
   } else {
    document.querySelector<HTMLElement>('div.welcom').style.marginLeft = "-100vw";
    document.querySelector<HTMLElement>('div.student').style.marginLeft = "0";
   }

    // document.querySelector<HTMLElement>('div.student').style.display = "block";
   

  }



}
