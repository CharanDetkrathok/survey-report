
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isAuthen: boolean = false;

  constructor() {}

  ngOnInit(): void {

    if (localStorage.getItem('isAuthen') != null || localStorage.getItem('isAuthen') != undefined) {
      this.isAuthen = true;
    }

  }

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
