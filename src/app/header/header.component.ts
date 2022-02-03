import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInService } from 'src/app/services/sign-in.service';
import { Router } from '@angular/router';
import { messagesDialog } from '../confirmation-dialog/confirmation-dialog-interface';
import { ConfirmDialogModel, ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isSigningIn$: Observable<boolean>;

  isHomePageActiveLink$: Observable<boolean>;
  isSurveyPageActiveLink$: Observable<boolean>;
  isReportPageActiveLink$: Observable<boolean>;

  username$: Observable<string>;
  usernameText: string = "";

  constructor(
    private signInService: SignInService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isHomePageActiveLink$ = this.signInService.isHomePageActiveLink;
    this.isSurveyPageActiveLink$ = this.signInService.isSurveyPageActiveLink;
    this.isReportPageActiveLink$ = this.signInService.isReportPageActiveLink;
    if (this.isHomePageActiveLink$["source"]["_value"] == true) {
      console.log("isHomePageActive")
      // console.log(window.document.querySelector<HTMLElement>('#home-page').className); 
    } else if (this.isSurveyPageActiveLink$["source"]["_value"] == true) {
      console.log("isSurveyPageActive")
      // document.querySelector<HTMLElement>('#home-page').classList.remove('active-link');
      // document.querySelector<HTMLElement>('#survey-page').classList.add('active-link');
      // document.querySelector<HTMLElement>('#report-page').classList.remove('active-link');
    } else if (this.isReportPageActiveLink$["source"]["_value"] == true) {
      console.log("isReportPageActive")
      // document.querySelector<HTMLElement>('#home-page').classList.remove('active-link');
      // document.querySelector<HTMLElement>('#survey-page').classList.remove('active-link');
      // document.querySelector<HTMLElement>('#report-page').classList.add('active-link');
    }

    this.isSigningIn$ = this.signInService.isSigningIn;
    this.signInService.studentUser.subscribe(username => {
      this.usernameText = username;
    });

  }

  public goHomePage() {
    localStorage.setItem('isHomePageActive', 'true');
    localStorage.setItem('isSurveyPageActive', 'false');
    localStorage.setItem('isReportPageActive', 'false');
    document.querySelector<HTMLElement>('#home-page').classList.add('active-link');
    document.querySelector<HTMLElement>('#survey-page').classList.remove('active-link');
    document.querySelector<HTMLElement>('#report-page').classList.remove('active-link');
    this.ngOnInit();
    this.router.navigate(['/home-page']);
  }

  public goSurveyPage() {
    localStorage.setItem('isHomePageActive', 'false');
    localStorage.setItem('isSurveyPageActive', 'true');
    localStorage.setItem('isReportPageActive', 'false');
    document.querySelector<HTMLElement>('#home-page').classList.remove('active-link');
    document.querySelector<HTMLElement>('#survey-page').classList.add('active-link');
    document.querySelector<HTMLElement>('#report-page').classList.remove('active-link');
    this.ngOnInit();
    this.router.navigate(['student/bachelor-thai']);
  }

  public goReportPage() {
    localStorage.setItem('isHomePageActive', 'false');
    localStorage.setItem('isSurveyPageActive', 'false');
    localStorage.setItem('isReportPageActive', 'true');
    document.querySelector<HTMLElement>('#home-page').classList.remove('active-link');
    document.querySelector<HTMLElement>('#survey-page').classList.remove('active-link');
    document.querySelector<HTMLElement>('#report-page').classList.add('active-link');
    this.ngOnInit();
    this.router.navigate(['/home-page']);
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
        this.router.navigate(['/home-page']);
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
