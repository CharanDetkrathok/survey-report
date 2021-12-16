import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in-staff',
  templateUrl: './sign-in-staff.component.html',
  styleUrls: ['./sign-in-staff.component.css']
})
export class SignInStaffComponent implements OnInit {

  signInStaffFormGroup = this.formBuilder.group({
    inputRUmail: [''],
    inputPassword: [''],
    checkRememberMe: ['']
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {

    // เรียกใช้ function จำ email และ password ไว้ในระบบ
    this.pathValueSignInStaffFormGroup_by_CookieRememberUser();

  }

  pathValueSignInStaffFormGroup_by_CookieRememberUser() {

    if (this.cookieService.get('__remember_staff_check_remember_me')) {

      this.signInStaffFormGroup.setValue({
        inputRUmail: this.cookieService.get('__remember_staff_ru_mail'),
        inputPassword: this.cookieService.get('__remember_staff_password'),
        checkRememberMe: this.cookieService.get('__remember_staff_check_remember_me')
      });

      this.signInStaffFormGroup.updateValueAndValidity();

      // ตรวจสอบการยกเลิก Button disabled
      this.checkDisabledButtonSubmit();

      // * เปลี่ยน border ruMail เป็นสีเขียว
      document.querySelector('#ruMail').classList.value === 'input-ru-email' ? document.querySelector('#ruMail').classList.replace('input-ru-email', 'input-correct') : document.querySelector('#ruMail').classList.replace('input-error', 'input-correct');

      // * เปลี่ยน border password เป็นสีเขียว
      document.querySelector('#password').classList.value === 'input-password' ? document.querySelector('#password').classList.replace('input-password', 'input-correct') : document.querySelector('#password').classList.replace('input-error', 'input-correct');

    }

  }

  onKeyUpRuMail(e) {

    const emailValue = e.target.value;

    // span tag สำหรับแสดงข้อความ error
    const sectionTagEmail = e.target.parentElement;
    const spanErrorMessage = sectionTagEmail.querySelector('span');

    if (e.target.value.substr(-1) === '@') {

      e.target.value += 'ru.ac.th';

      this.signInStaffFormGroup.controls['inputRUmail'].patchValue(e.target.value);
      this.signInStaffFormGroup.controls['inputRUmail'].updateValueAndValidity();

    }

    if (e.target.value.substr(-8) == `@ru.ac.t`) {

      let tempAllTextLenght = e.target.value.length;
      let tempLenght = e.target.value.substr(-8);

      e.target.value = e.target.value.substring(0, (tempAllTextLenght - tempLenght.length));

      this.signInStaffFormGroup.controls['inputRUmail'].patchValue(e.target.value);

    }

    if (emailValue === '') {

      // TODO : แสดง border error สีแดง 
      e.target.classList.value.substr(0, e.target.classList.value.indexOf(' ')) === 'input-ru-email' ? e.target.classList.replace('input-ru-email', 'input-error') : e.target.classList.add('input-error');


      // TODO : แสดงข้อความ error 
      spanErrorMessage.classList.value === 'error-message-ru-mail-hidden' ? spanErrorMessage.classList.replace('error-message-ru-mail-hidden', 'error-message-ru-mail') : spanErrorMessage.classList.add('error-message-ru-mail');

    } else if (e.target.value.substr(-9) === '@ru.ac.th') {

      // TODO : ยกเลิก แสดง border error สีแดง หรือสีเทา
      // * เปลี่ยน border เป็นสีเขียว
      e.target.classList.value.substr(0, e.target.classList.value.indexOf(' ')) === 'input-ru-email' ? e.target.classList.replace('input-ru-email', 'input-correct') : e.target.classList.replace('input-error', 'input-correct');

      // TODO : ยกเลิก แสดง span error  สีแดง
      spanErrorMessage.classList.value === 'error-message-ru-mail' ? spanErrorMessage.classList.replace('error-message-ru-mail', 'error-message-ru-mail-hidden') : spanErrorMessage.classList.add('error-message-ru-mail-hidden');

    } else {

      // TODO : ยกเลิก แสดง border error สีแดง
      e.target.classList.value.substr(0, e.target.classList.value.indexOf(' ')) === 'input-error' ? e.target.classList.replace('input-error', 'input-ru-email') : e.target.classList.replace('input-correct', 'input-ru-email');

      // TODO : ยกเลิก แสดงข้อความ error 
      spanErrorMessage.classList.value === 'error-message-ru-mail' ? spanErrorMessage.classList.replace('error-message-ru-mail', 'error-message-ru-mail-hidden') : spanErrorMessage.classList.add('error-message-ru-mail-hidden');


    }

    // ตรวจสอบค่าของ email และ password ต้องไม่มีช่องใดว่าง
    this.checkDisabledButtonSubmit();


  }

  onKeyUpPassword(e) {

    const passwordValue = e.target.value;

    // span tag สำหรับแสดงข้อความ error
    const sectionTagPassword = e.target.parentElement;
    const spanErrorMessage = sectionTagPassword.querySelector('span');

    if (passwordValue === '') {

      // TODO : แสดง border error สีแดง 
      e.target.classList.value.substr(0, e.target.classList.value.indexOf(' ')) === 'input-password' ? e.target.classList.replace('input-password', 'input-error') : e.target.classList.replace('input-correct', 'input-error');

      // TODO : แสดงข้อความ error input RU-Mail tag
      spanErrorMessage.classList.value === 'error-message-password-hidden' ? spanErrorMessage.classList.replace('error-message-password-hidden', 'error-message-password') : spanErrorMessage.classList.add('error-message-password');

    } else if (passwordValue.length > 0) {

      // TODO : ยกเลิก แสดง border error สีแดง หรือสีเทา
      // * เปลี่ยน border เป็นสีเขียว
      e.target.classList.value.substr(0, e.target.classList.value.indexOf(' ')) === 'input-password' ? e.target.classList.replace('input-password', 'input-correct') : e.target.classList.replace('input-error', 'input-correct');

      // TODO : ยกเลิก แสดง span error  สีแดง
      spanErrorMessage.classList.value === 'error-message-password' ? spanErrorMessage.classList.replace('error-message-password', 'error-message-password-hidden') : spanErrorMessage.classList.add('error-message-password-hidden');

    } else {

      // TODO : ยกเลิก แสดง span error  สีแดง
      spanErrorMessage.classList.value === 'error-message-password' ? spanErrorMessage.classList.replace('error-message-password', 'error-message-password-hidden') : spanErrorMessage.classList.add('error-message-password-hidden');

      // TODO : ยกเลิก แสดง border error สีแดง
      // เปลี่ยน border เป็น สีเทา
      e.target.classList.value.substr(0, e.target.classList.value.indexOf(' ')) === 'input-error' ? e.target.classList.replace('input-error', 'input-password') : e.target.classList.replace('input-correct', 'input-password');


    }

    // ตรวจสอบค่าของ email และ password ต้องไม่มีช่องใดว่าง
    this.checkDisabledButtonSubmit();

  }

  onOpenEye(e) {

    e.target.parentElement.querySelector('input').type = 'text';
    e.target.classList.value === 'img-password-eye-false' ? e.target.classList.replace('img-password-eye-false', 'img-password-eye-true') : false;

    e.target.parentElement.querySelector('.img-password-eye-hide-true') !== null ? e.target.parentElement.querySelector('.img-password-eye-hide-true').classList.replace('img-password-eye-hide-true', 'img-password-eye-hide-false') : false;

  }

  onHiddenEye(e) {

    e.target.parentElement.querySelector('input').type = 'password';
    e.target.classList.value === 'img-password-eye-hide-false' ? e.target.classList.replace('img-password-eye-hide-false', 'img-password-eye-hide-true') : false;

    e.target.parentElement.querySelector('.img-password-eye-true') !== null ? e.target.parentElement.querySelector('.img-password-eye-true').classList.replace('img-password-eye-true', 'img-password-eye-false') : false;

  }

  onCheckRememberMe(e) {

    this.signInStaffFormGroup.controls['checkRememberMe'].patchValue(e.target.checked);
    this.signInStaffFormGroup.controls['checkRememberMe'].updateValueAndValidity();

  }

  checkDisabledButtonSubmit() {

    let checkInputNotEmpty = this.signInStaffFormGroup.controls['inputRUmail'].value !== '' ? this.signInStaffFormGroup.controls['inputPassword'].value !== '' ? true : false : false;

    let checkInputRuMail = this.signInStaffFormGroup.controls['inputRUmail'].value.substr(-9) === '@ru.ac.th' ? true : false;

    if (checkInputNotEmpty && checkInputRuMail) {

      document.querySelector<HTMLInputElement>('button.btn-sign-in').disabled = false;

    } else {

      document.querySelector<HTMLInputElement>('button.btn-sign-in').disabled = true;

    }

  }

  // จำ email และ password ไว้ในระบบ
  setCookieRememberUser() {

    if (this.signInStaffFormGroup.controls['checkRememberMe'].value) {

      this.cookieService.set('__remember_staff_ru_mail', this.signInStaffFormGroup.controls['inputRUmail'].value);
      this.cookieService.set('__remember_staff_password', this.signInStaffFormGroup.controls['inputPassword'].value);
      this.cookieService.set('__remember_staff_check_remember_me', this.signInStaffFormGroup.controls['checkRememberMe'].value);

    } else {

      this.cookieService.delete('__remember_staff_ru_mail', this.signInStaffFormGroup.controls['inputRUmail'].value);
      this.cookieService.delete('__remember_staff_password', this.signInStaffFormGroup.controls['inputPassword'].value);
      this.cookieService.delete('__remember_staff_check_remember_me', this.signInStaffFormGroup.controls['checkRememberMe'].value);

    }

  }

  onStaffSingInSubmit() {
    console.log(this.signInStaffFormGroup.controls['inputRUmail'].value, this.signInStaffFormGroup.controls['inputPassword'].value)

    // เรียกใช้ function จำ email และ password ไว้ในระบบ
    this.setCookieRememberUser();

  }

}
