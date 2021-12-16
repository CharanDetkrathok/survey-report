import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export enum Languages {
  en = 'en',
  th = 'th'
}

@Component({
  selector: 'app-sign-in-student',
  templateUrl: './sign-in-student.component.html',
  styleUrls: ['./sign-in-student.component.css']
})
export class SignInStudentComponent implements OnInit {

  pipe = new DatePipe('en-US');

  signInStudentFormGroup = this.formBuilder.group({
    inputStdCode: [''],
    inputBirthday: [''],
    checkRememberMe: ['']
  });

  tempInputBirthday: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private dateAdapter: DateAdapter<Date>,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {

    // เรียกใช้ function จำ email และ password ไว้ในระบบ
    this.pathValueSignInStudentFormGroup_by_CookieRememberUser();
    this.useLanguage(Languages.th);

  }

  useLanguage(language: Languages): void {
    this.translate.use(language);
    this.dateAdapter.setLocale(language);
  }

  pathValueSignInStudentFormGroup_by_CookieRememberUser() {

    if (this.cookieService.get('__remember_student_check_remember_me')) {

      this.signInStudentFormGroup.setValue({
        inputStdCode: this.cookieService.get('__remember_student_code'),
        inputBirthday: this.cookieService.get('__remember_student_birthday'),
        checkRememberMe: this.cookieService.get('__remember_student_check_remember_me')
      });

      this.tempInputBirthday = this.cookieService.get('__remember_student_birthday');

      this.signInStudentFormGroup.updateValueAndValidity();

      // ตรวจสอบการยกเลิก Button disabled
      this.checkDisabledButtonSubmit();

      // * เปลี่ยน border stdCode เป็นสีเขียว
      document.querySelector('#stdCode').classList.value === 'input-std-code' ? document.querySelector('#stdCode').classList.replace('input-std-code', 'input-correct') : document.querySelector('#stdCode').classList.replace('input-error', 'input-correct');

      // * เปลี่ยน border password เป็นสีเขียว
      document.querySelector('#birthday').classList.value === 'input-birthday' ? document.querySelector('#birthday').classList.replace('input-birthday', 'input-correct') : document.querySelector('#birthday').classList.replace('input-error', 'input-correct');

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

    this.tempInputBirthday = this.pipe.transform(this.signInStudentFormGroup.controls['inputBirthday'].value.toString(), 'MM/dd/yyyy').toString();
    
    
    this.signInStudentFormGroup.controls['inputBirthday'].patchValue(this.tempInputBirthday);
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

  onCheckRememberMe(e) {

    this.signInStudentFormGroup.controls['checkRememberMe'].patchValue(e.target.checked);
    this.signInStudentFormGroup.controls['checkRememberMe'].updateValueAndValidity();

  }

  checkDisabledButtonSubmit() {
    let checkInputNotEmpty = this.signInStudentFormGroup.controls['inputStdCode'].value !== '' ? this.signInStudentFormGroup.controls['inputBirthday'].value !== '' ? true : false : false;

    let checkinputStdCode = this.signInStudentFormGroup.controls['inputStdCode'].value.length === 10 ? true : false;

    if (checkInputNotEmpty && checkinputStdCode) {

      document.querySelector<HTMLInputElement>('button.btn-sign-in-student').disabled = false;

    } else {

      document.querySelector<HTMLInputElement>('button.btn-sign-in-student').disabled = true;

    }

  }

  // จำ email และ password ไว้ในระบบ
  setCookieRememberUser() {

    if (this.signInStudentFormGroup.controls['checkRememberMe'].value) {

      this.cookieService.set('__remember_student_code', this.signInStudentFormGroup.controls['inputStdCode'].value);
      this.cookieService.set('__remember_student_birthday', this.signInStudentFormGroup.controls['inputBirthday'].value);
      this.cookieService.set('__remember_student_check_remember_me', this.signInStudentFormGroup.controls['checkRememberMe'].value);

    } else {

      this.cookieService.delete('__remember_student_code', this.signInStudentFormGroup.controls['inputStdCode'].value);
      this.cookieService.delete('__remember_student_birthday', this.signInStudentFormGroup.controls['inputBirthday'].value);
      this.cookieService.delete('__remember_student_check_remember_me', this.signInStudentFormGroup.controls['checkRememberMe'].value);

    }

  }

  onStudentSingInSubmit() {

    // เรียกใช้ function จำ email และ password ไว้ในระบบ
    this.setCookieRememberUser();

  }


}
