
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { SignInService } from '../../services/sign-in.service';
import { ConfirmationDialogComponent, ConfirmDialogModel } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { studentResponseInfo } from './sign-in-student-interface';
import { messagesDialog } from 'src/app/confirmation-dialog/confirmation-dialog-interface';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-sign-in-student',
  templateUrl: './sign-in-student.component.html',
  styleUrls: ['./sign-in-student.component.css']
})
export class SignInStudentComponent implements OnInit {

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
    private cookieService: CookieService,
    private dateAdapter: DateAdapter<Date>,
    public translate: TranslateService,
    private signInServices: SignInService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.pathValueSignInStudentFormGroup_by_CookieRememberUser();
  }

  pathValueSignInStudentFormGroup_by_CookieRememberUser() {

    if (this.cookieService.get('__remember_student_check_remember_me')) {

      let tempBirthday: string = this.pipe.transform(this.cookieService.get('__remember_student_birthday').toString(), "dd/MM/yyyy").toString();
      let engBirthday: string = (parseInt(tempBirthday.slice(6)) - 543).toString();
      let birthday: string = tempBirthday.substring(0, 6) + engBirthday

      this.signInStudentFormGroup.setValue({
        inputStdCode: this.cookieService.get('__remember_student_code'),
        inputBirthday: this.cookieService.get('__remember_student_birthday'),
        inputDegree: this.cookieService.get('__remember_student_degree'),
        checkRememberMe: this.cookieService.get('__remember_student_check_remember_me')
      });

      this.tempInputBirthday = birthday;

      this.signInStudentFormGroup.updateValueAndValidity();

      // ตรวจสอบการยกเลิก Button disabled
      this.checkDisabledButtonSubmit();

      // * เปลี่ยน border stdCode เป็นสีเขียว
      document.querySelector('#stdCode').classList.value === 'input-std-code' ? document.querySelector('#stdCode').classList.replace('input-std-code', 'input-correct') : document.querySelector('#stdCode').classList.replace('input-error', 'input-correct');

      // * เปลี่ยน border password เป็นสีเขียว
      document.querySelector('#birthday').classList.value === 'input-birthday' ? document.querySelector('#birthday').classList.replace('input-birthday', 'input-correct') : document.querySelector('#birthday').classList.replace('input-error', 'input-correct');

      // * เปลี่ยน border degree เป็นสีเขียว
      document.querySelector('#degree').classList.value === 'input-degree' ? document.querySelector('#degree').classList.replace('input-degree', 'input-correct') : document.querySelector('#degree').classList.replace('input-error', 'input-correct');

      document.querySelector<HTMLLabelElement>('#degree-label').classList.replace('label-input-degree', 'label-input-degree-focus');

    }

  }

  onKeyUpStdCode(e) {

    const stdCodeValue = this.signInStudentFormGroup.controls['inputStdCode'].value;

    // span tag สำหรับแสดงข้อความ error
    const sectionTagStdCode = e.target.parentElement;
    const spanErrorMessage = sectionTagStdCode.querySelector('span');

    if (e.target.value.length === 10) {

      // ยกเลิก แสดง border error สีแดง หรือสีเทา
      // * เปลี่ยน border เป็นสีเขียว
      e.target.classList.value.substr(0, e.target.classList.value.indexOf(' ')) === 'input-std-code' ? e.target.classList.replace('input-std-code', 'input-correct') : e.target.classList.replace('input-error', 'input-correct');

      // ยกเลิก แสดง span error  สีแดง
      spanErrorMessage.classList.value === 'error-message-std-code' ? spanErrorMessage.classList.replace('error-message-std-code', 'error-message-std-code-hidden') : spanErrorMessage.classList.add('error-message-std-code-hidden');

    } else if (stdCodeValue === '') {

      //  แสดง border error สีแดง 
      e.target.classList.value.substr(0, e.target.classList.value.indexOf(' ')) === 'input-std-code' ? e.target.classList.replace('input-std-code', 'input-error') : e.target.classList.add('input-error');

      //  แสดงข้อความ error 
      spanErrorMessage.classList.value === 'error-message-std-code-hidden' ? spanErrorMessage.classList.replace('error-message-std-code-hidden', 'error-message-std-code') : spanErrorMessage.classList.add('error-message-std-code');

    } else if (stdCodeValue !== '' && stdCodeValue.length < 10 && e.target.classList.value.substr(0, e.target.classList.value.indexOf(' ')) === 'input-correct') {

      //  แสดง border error สีแดง 
      e.target.classList.value.substr(0, e.target.classList.value.indexOf(' ')) === 'input-correct' ? e.target.classList.replace('input-correct', 'input-error') : e.target.classList.add('input-error');

      //  แสดงข้อความ error 
      spanErrorMessage.classList.value === 'error-message-std-code-hidden' ? spanErrorMessage.classList.replace('error-message-std-code-hidden', 'error-message-std-code') : spanErrorMessage.classList.add('error-message-std-code');

    }

    // ตรวจสอบค่าของ email และ password ต้องไม่มีช่องใดว่าง
    this.checkDisabledButtonSubmit();

  }

  onChangeBirthday(type: string, e: MatDatepickerInputEvent<Date>) {

    this.tempInputBirthday = this.pipe.transform(this.signInStudentFormGroup.controls['inputBirthday'].value.toString(), "MM/dd/yyyy").toString();

    const TEMP_BIRTHDAY: string = this.pipe.transform(this.signInStudentFormGroup.controls['inputBirthday'].value.toString(), "dd/MM/yyyy").toString();
    const THAI_YEAR: string = (parseInt(TEMP_BIRTHDAY.slice(6)) + 543).toString();
    const BIRTHDAY: string = TEMP_BIRTHDAY.substring(0, 6) + THAI_YEAR

    this.signInStudentFormGroup.controls['inputBirthday'].patchValue(BIRTHDAY);
    this.signInStudentFormGroup.controls['inputBirthday'].updateValueAndValidity();

    if (this.tempInputBirthday === '') {

      // แสดง border error สีแดง 
      document.querySelector<HTMLInputElement>('#birthday').className === 'input-birthday' ? document.querySelector<HTMLInputElement>('#birthday').classList.replace('input-birthday', 'input-error') : document.querySelector<HTMLInputElement>('#birthday').classList.replace('input-correct', 'input-error');

      // แสดงข้อความ error input-birthday tag
      document.querySelector<HTMLSpanElement>('#birthday-span-error-message').classList.value === 'error-message-birthday-hidden' ? document.querySelector<HTMLSpanElement>('#birthday-span-error-message').classList.replace('error-message-birthday-hidden', 'error-message-birthday') : document.querySelector<HTMLSpanElement>('#birthday-span-error-message').classList.add('error-message-birthday');

    } else {

      // ยกเลิก แสดง span error  สีแดง
      document.querySelector<HTMLSpanElement>('#birthday-span-error-message').classList.value === 'error-message-birthday' ? document.querySelector<HTMLSpanElement>('#birthday-span-error-message').classList.replace('error-message-birthday', 'error-message-birthday-hidden') : document.querySelector<HTMLSpanElement>('#birthday-span-error-message').classList.add('error-message-birthday-hidden');


      //  ยกเลิก แสดง border error สีแดง
      // เปลี่ยน border เป็น สีเขียว
      document.querySelector<HTMLInputElement>('#birthday').className === 'input-birthday' ? document.querySelector<HTMLInputElement>('#birthday').classList.replace('input-birthday', 'input-correct') : document.querySelector<HTMLInputElement>('#birthday').classList.replace('input-error', 'input-correct');

    }

    // ตรวจสอบค่าของ email และ password ต้องไม่มีช่องใดว่าง
    this.checkDisabledButtonSubmit();

  }

  onChangeDegree(e: any) {

    if (this.signInStudentFormGroup.controls['inputDegree'].value != '') {

      this.signInStudentFormGroup.controls['inputDegree'].updateValueAndValidity();

      e.target.classList.value.substr(0, e.target.classList.value.indexOf(' ')) === 'input-degree' ? e.target.classList.replace('input-degree', 'input-correct') : e.target.classList.replace('input-error', 'input-correct');

      document.querySelector<HTMLLabelElement>('#degree-label').classList.replace('label-input-degree', 'label-input-degree-focus');

    }

    // ตรวจสอบค่าของ email และ password ต้องไม่มีช่องใดว่าง
    this.checkDisabledButtonSubmit();

  }

  onCheckRememberMe(e) {

    this.signInStudentFormGroup.controls['checkRememberMe'].patchValue(e.target.checked);
    this.signInStudentFormGroup.controls['checkRememberMe'].updateValueAndValidity();

  }

  checkDisabledButtonSubmit() {
    let checkinputStdCode = this.signInStudentFormGroup.controls['inputStdCode'].value !== '' ? this.signInStudentFormGroup.controls['inputStdCode'].value.length === 10 ? true : false : false;

    let checkInputBirthday = this.signInStudentFormGroup.controls['inputBirthday'].value !== '' ? true : false;

    let checkInputDegree = this.signInStudentFormGroup.controls['inputDegree'].value !== '' ? true : false;

    if (checkinputStdCode && checkInputBirthday && checkInputDegree) {

      document.querySelector<HTMLInputElement>('button.btn-sign-in-student').disabled = false;

    } else {

      document.querySelector<HTMLInputElement>('button.btn-sign-in-student').disabled = true;

    }

  }

  setCookieRememberUser() {

    if (this.signInStudentFormGroup.controls['checkRememberMe'].value) {

      this.cookieService.set('__remember_student_code', this.signInStudentFormGroup.controls['inputStdCode'].value);
      this.cookieService.set('__remember_student_birthday', this.signInStudentFormGroup.controls['inputBirthday'].value);
      this.cookieService.set('__remember_student_degree', this.signInStudentFormGroup.controls['inputDegree'].value);
      this.cookieService.set('__remember_student_check_remember_me', this.signInStudentFormGroup.controls['checkRememberMe'].value);

    } else {

      this.cookieService.delete('__remember_student_code', this.signInStudentFormGroup.controls['inputStdCode'].value);
      this.cookieService.delete('__remember_student_birthday', this.signInStudentFormGroup.controls['inputBirthday'].value);
      this.cookieService.delete('__remember_student_degree', this.signInStudentFormGroup.controls['inputDegree'].value);
      this.cookieService.delete('__remember_student_check_remember_me', this.signInStudentFormGroup.controls['checkRememberMe'].value);

    }

  }

  onStudentSingInSubmit() {

    this.setCookieRememberUser();

    const PLAY_LOAD = { Std_code: this.signInStudentFormGroup.controls['inputStdCode'].value, Birth_date: this.signInStudentFormGroup.controls['inputBirthday'].value, Lev_id: this.signInStudentFormGroup.controls['inputDegree'].value };

    this.signInServices.authentication(PLAY_LOAD).subscribe(response => {

      let studentResponse: studentResponseInfo = response;
      this.signInServices.setStudent(studentResponse);
      this.signInServices.setLanguage('TH');
      let makeMessage: messagesDialog = {
        title: `Sign in`,
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
          this.signInServices.signOut();
        }
      });

    }, error => {

      let status_message: string[] = this.checkStatusCode(error.status);
      let makeMessage: messagesDialog = {
        title: "Sign in Fail",
        message: status_message[0],
        description: status_message[1],
        descriptionDetail: status_message[2],
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