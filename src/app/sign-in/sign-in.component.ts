import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



  // ? slide มาที่ Jumbotron การเข้าสู่ระบบ บุคลากร
  onClickStaffButton() {

    document.querySelector<HTMLElement>('div.staff').style.marginLeft = "0";
    document.querySelector<HTMLElement>('div.welcom').style.marginLeft = "100vw";

  }

  // ? slide มาที่ Jumbotron ยินดีต้อนรับ
  onClickWelcomButton() {

    document.querySelector<HTMLElement>('div.staff').style.marginLeft = "-100vw";
    document.querySelector<HTMLElement>('div.welcom').style.marginLeft = "0";
    document.querySelector<HTMLElement>('div.student').style.marginLeft = "100vw";

  }

  // ? slide มาที่ Jumbotron การเข้าสู่ระบบ สำหรับนักศึกษา
  onClickStudentButton() {

    document.querySelector<HTMLElement>('div.welcom').style.marginLeft = "-100vw";
    document.querySelector<HTMLElement>('div.student').style.marginLeft = "0";

  }



}
