import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInService } from 'src/app/services/sign-in.service';
import { Router } from '@angular/router';
import { messagesDialog } from '../confirmation-dialog/confirmation-dialog-interface';
import { ConfirmDialogModel, ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentStateInterface } from '../services/sign-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthentication: boolean;
  isLanguageTH: boolean;
  isLanguageENG: boolean;
  isBechelor: boolean;
  studentName: string;
  role: string;

  constructor(
    private signInService: SignInService,
    private router: Router,
    private dialog: MatDialog
  ) {

    this.signInService.getStudentStateInformation.subscribe(obs => {
      this.isAuthentication = obs.isAuthentication;
      this.isLanguageTH = obs.isLanguageTH;
      this.isLanguageENG = obs.isLanguageENG;
      this.isBechelor = obs.isBechelor;
      this.studentName = obs.studentName;
      this.role = obs.role;      
    });    

  }

  ngOnInit(): void { }

  public openMenu() {
    document.querySelector<HTMLElement>('ul').classList.value == 'active-menu' ? document.querySelector<HTMLElement>('ul').classList.remove('active-menu') : document.querySelector<HTMLElement>('ul').classList.add('active-menu');
  }

  public closeMenu() {
    document.querySelector<HTMLInputElement>('#open-menu').checked === true ? document.querySelector<HTMLInputElement>('#open-menu').checked = false : null;
    document.querySelector<HTMLElement>('ul').classList.value == 'active-menu' ? document.querySelector<HTMLElement>('ul').classList.remove('active-menu') : document.querySelector<HTMLElement>('ul').classList.add('active-menu');
  }

  public signOut() {

    let makeMessage: messagesDialog = {
      title: `Sign Out`,
      message: "คุณต้องการที่จะออกจากระบบใช่หรือไม่?",
      description: "Do you want to Sign out?",
      descriptionDetail: "",
      btnLeftDisable: false,
      btnRightDisable: false,
      txtBtnLeft: "CLOSE",
      txtBtnRight: "OK",
      messageThaiLanguage: "",
      messageEngLanguage: "",
      isSelectLanguageDisable: false
    };

    let dialogData = this.newMessageDialog(makeMessage);
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: dialogData });
    dialogRef.afterClosed().subscribe(dialogResult => {

      let dialog_confirm_result = dialogResult;
      if (dialog_confirm_result) {
        this.signInService.signOut();
        // this.router.navigate(['/home-page']);  
        this.router.navigate(['/home-page']).then(() => {
          window.location.replace('/');
        });
      }
    });


  }

  newMessageDialog(makeMessage: messagesDialog): any {
    return new ConfirmDialogModel(makeMessage.title, makeMessage.message, makeMessage.description, makeMessage.descriptionDetail, makeMessage.btnLeftDisable, makeMessage.btnRightDisable, makeMessage.txtBtnLeft, makeMessage.txtBtnRight, makeMessage.messageThaiLanguage, makeMessage.messageEngLanguage, makeMessage.isSelectLanguageDisable);
  }

  checkStatusCode(status_code: number): string[] {

    let STATUS_MESSAGE: string[] = [];

    switch (status_code) {

      case 401: case 422:
        STATUS_MESSAGE[0] = `ไม่พบข้อมูลของท่าน กรุณากรอกข้อมูลใหม่อีกครั้ง❗`;
        STATUS_MESSAGE[1] = `
        Can't find your information Please enter your information again.❗`;
        break;

      default:
        STATUS_MESSAGE[0] = "ขออภัยในความไม่สะดวก";
        STATUS_MESSAGE[1] = "ขณะนี้มีผู้เข้าใช้งานเป็นจำนวนมาก กรุณากลับมาเข้าใช้งานใหม่ในภายหลัง❗";
        STATUS_MESSAGE[2] = "Sorry for the inconvenience We have a large number of users. Please come back later.❗";
        break;

    }

    return STATUS_MESSAGE;
  }

}
