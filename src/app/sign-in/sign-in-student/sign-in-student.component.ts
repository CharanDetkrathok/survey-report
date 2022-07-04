
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { SignInService } from '../../services/sign-in.service';

import { MatDialog } from '@angular/material/dialog';
import { studentResponseInfo } from './sign-in-student-interface';


import { SocialAuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

import { messagesDialog } from '../../confirmation-dialog/confirmation-dialog-interface';
import { ConfirmationDialogComponent, ConfirmDialogModel } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-sign-in-student',
  templateUrl: './sign-in-student.component.html',
  styleUrls: ['./sign-in-student.component.css']
})
export class SignInStudentComponent implements OnInit {

  googleUserinfo: SocialUser;

  pipe = new DatePipe('en-EN');

  signInStudentFormGroup = this.formBuilder.group({
    inputStdCode: [''],
    inputBirthday: [''],
    inputDegree: [''],
    checkRememberMe: ['']
  });

  tempInputBirthday: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public translate: TranslateService,
    private signInServices: SignInService,
    public dialog: MatDialog,
    private authSignInGoogleService: SocialAuthService
  ) { }

  ngOnInit(): void { }

  signInWithGoogle(): void {
    this.authSignInGoogleService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(userData => {
        this.googleUserinfo = userData;
        this.fetchAuthentication();
      })
      .catch( () => { });
  }

  fetchAuthentication() {

    const PLAY_LOAD = { id_token: this.googleUserinfo.idToken };
    this.signInServices.googleAuthentication(PLAY_LOAD).subscribe(response => {

      console.log(response)
      let studentResponse: studentResponseInfo = response;
      this.signInServices.setStudent(studentResponse);
      this.signInServices.setLanguage('TH');
      this.signInServices.setAge(response.StudentInfo.Birth_date)
      let makeMessage: messagesDialog = {
        title: `Sign in`,
        imgPath: "",
        message: "",
        description: "",
        descriptionDetail: "",
        btnLeftDisable: false,
        btnRightDisable: false,
        txtBtnLeft: "CLOSE",
        txtBtnRight: "OK",
        messageThaiLanguage: `กรุณาเลือกภาษาสำหรับตอบแบบสำรวจ`,
        messageEngLanguage: `Please select a language for the survey.`,
        isSelectLanguageDisable: true
      };

      let dialogData = this.newMessageDialog(makeMessage);
      let dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: dialogData });
      dialogRef.afterClosed().subscribe(dialogResult => {

        let dialog_confirm_result = dialogResult;
        if (dialog_confirm_result) {

          this.signInServices.setIsAuthen(this.signInServices.getAuthorized());

          if (this.signInServices.getLanguage() === 'TH') {
            switch (this.signInServices.getLev_id()) {
              case "1":
                // console.log("ป.ตรี ไทย");        
                this.router.navigate(['student/bachelor-thai']);
                break;
              case "2": case "3":
                // console.log("ป.โท-ป.เอก ไทย");
                // this.router.navigate(['student/master-phd-thai']);
                break;
            }

          } else {

            switch (this.signInServices.getLev_id()) {
              case "1":
                // console.log("ป.ตรี อังกฤษ");
                // this.router.navigate(['student/bachelor-eng']);
                break;
              case "2": case "3":
                // console.log("ป.โท-ป.เอก อังกฤษ");
                // this.router.navigate(['student/master-phd-thai']);
                break;
            }

          }
        } else {
          this.authSignInGoogleService.signOut(true);
          this.signInServices.signOut();
        }
      });

    }, error => {

      console.log("google api err ==> ", error);

      this.authSignInGoogleService.signOut(true);
      let makeMessage: messagesDialog = {
        title: "Sign in Fail",
        imgPath: "warning.png",
        message: error.error.message,
        description: error.error.role,
        descriptionDetail: "",
        btnLeftDisable: false,
        btnRightDisable: true,
        txtBtnLeft: "CLOSE",
        txtBtnRight: "",
        messageThaiLanguage: "",
        messageEngLanguage: "",
        isSelectLanguageDisable: false
      };
      let dialogData = this.newMessageDialog(makeMessage);
      let dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: dialogData });
      dialogRef.afterClosed().subscribe(dialogResult => {
        let dialog_confirm_result = dialogResult;
        if (dialog_confirm_result) {
          // ok true           
        } else {
          // cancel false 
        }
      });
    });

  }

  newMessageDialog(makeMessage: messagesDialog): any {
    return new ConfirmDialogModel(makeMessage.title, makeMessage.imgPath, makeMessage.message, makeMessage.description, makeMessage.descriptionDetail, makeMessage.btnLeftDisable, makeMessage.btnRightDisable, makeMessage.txtBtnLeft, makeMessage.txtBtnRight, makeMessage.messageThaiLanguage, makeMessage.messageEngLanguage, makeMessage.isSelectLanguageDisable);
  }

} // end component...