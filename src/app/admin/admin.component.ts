import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { setDayOpenAndClose, setFacultyData, setUserData } from './getUserAndFaculty';
import { AdminService } from '../services/admin.service';
import { ConfirmationDialogComponent, ConfirmDialogModel } from '../confirmation-dialog/confirmation-dialog.component';

// ? สร้าง object static constant พื้นฐานสำหรับการ select language
// * เป็นข้อมูลที่ไม่มีการเปลี่ยนแปลงค่าใดๆ
export enum Languages {
  EN = 'en',
  TH = 'th'
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // ? -- เอาไว้เปลี่ยน format ของ วัน/เดือน/ปี ให้อยู่ในรูปแบบ 'MM/dd/yyyy' --
  // * -- โดยการกำหนด format เป็นภาษาที่ต้องการ ในกรณีนี้คือตั้งค่าให้เป็น แบบอเมริกัน en-US 
  pipe = new DatePipe('en-US');

  // สำหรับเปลี่ยงเเปลง css class name เพื่อเปิด-ปิด ตัวเลือกคณะ
  facultyCodeOpenUp: boolean = false;

  __setUserData: setUserData;

  // จัดเก็บ
  __setUserDataForDisplayTable = [];
  __setFacultyData: setFacultyData;
  __setDayOpenAndClose: setDayOpenAndClose;

  dialog_confirm_result: string;

  // เพิ่มผู้ใช้งาน
  addUserFormGroup = this.formBuilder.group({
    __addUserRuMail: ['', [Validators.required, Validators.email]],
    __addUserDepartment: [{ value: '', disabled: true }, [Validators.required]],
    __addUserFaculty_no: ['']
  });

  // แก้ไขผู้ใช้งาน
  editUserFormGroup = this.formBuilder.group({
    __editUserRuMail: [''],
    __editUserDepartment: [''],
    __editUserFaculty_no: ['']
  });

  // แก้ไขวันเปิด-ปิด ระบบ
  dayOpenAndClose = this.formBuilder.group({
    __day_open: [''],
    __day_close: ['']
  });

  // function แก้ไขข้อกำหนดพื้นฐาน วัน/เดือน/ปี จาก EN เป็น TH โดยการรับ Parameter เป็นภาษาที่ต้องการ
  useLanguage(language: Languages): void {
    this.translate.use(language);
    this.dateAdapter.setLocale(language);
  }

  constructor(
    private userAndFaculty: AdminService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    public translate: TranslateService,
    private dateAdapter: DateAdapter<Date>
  ) { }

  ngOnInit(): void {

    // เปลี่ยนภาษาปฏิทิน หน้าเว็บไซต์
    this.useLanguage(Languages.TH);

    this.callApiUserAndFaculty();
    this.callApiDayOpenAndClose();

  }

  // เรียกข้อมูลรายชื่อผู้ใช้ทั้งหมดจาก API สำหรับแสดงผล
  async callApiUserAndFaculty() {

    // ------ เหลือทำ error handling ----------- 
    await this.userAndFaculty.getHttpUserAndFaculty().subscribe(res => {

      // Object จัดเก็บข้อมูล ผู้ใช้
      this.__setUserData = res.USERS;

      // Object จัดเก็บข้อมูล สาขาวิชา
      this.__setFacultyData = res.FACULTYS;

      // START --- ค้นหาชื่อ คณะ และสร้าง Object ใหม่เพื่อเก็บมัน เพื่อแสดงใน Lists ---
      let USER_ID = '';
      let USER_USERNAME = '';
      let USER_FACULTY_NO = '';
      let USER_ROLE_TYPE = '';
      let USER_FACULTY_NAME = '';

      // Loop เพื่อ push data ที่ได้จาก RESPONSE DATA จาก API 
      for (const [key1, value1] of Object.entries(this.__setUserData)) {

        USER_ID = value1.USER_ID;
        USER_USERNAME = value1.USER_USERNAME;
        USER_FACULTY_NO = value1.USER_FACULTY_NO;
        USER_ROLE_TYPE = value1.USER_ROLE_TYPE;
        USER_FACULTY_NAME = '';

        this.__setUserDataForDisplayTable.push({ USER_ID, USER_USERNAME, USER_FACULTY_NO, USER_ROLE_TYPE, USER_FACULTY_NAME });

      }

      // * Loop เพื่อ push data และค้นหาชื่อ คณะของผู้ใช้งาน ที่เป็นเจ้าหน้าที่สาขาวิชาต่างๆ สร้าง Object ใหม่เพื่อเก็บมัน เพื่อแสดงใน Table Lists หน้าเว็บไซต์
      // for แรก ทำการ Loop ข้อมูลของผู้ใช้งานทั้งหมดที่ได้จากการร้องขอผ่าน API
      for (const [key1, value1] of Object.entries(this.__setUserDataForDisplayTable)) {

        // for ที่สอง ทำการ Loop ข้อมูลของชื่อสาขาวิชา
        for (const [key2, value2] of Object.entries(this.__setFacultyData)) {

          // ตรวจสอบว่าผู้ใช้งานท่านใดบ้างที่มี USER_FACULTY_NO != '' ค่าว่าง 
          // และทำการตรวจสอบค่าของ สาขาวิชาที่ตรงกัน เพื่อนำชื่อของสาขาวิชานั้นๆมา assignment
          if (value1.USER_FACULTY_NO == value2.FACULTY_FACULTY_NO && value1.USER_FACULTY_NO != '') {

            USER_ID = value1.USER_ID;
            USER_USERNAME = value1.USER_USERNAME;
            USER_FACULTY_NO = value1.USER_FACULTY_NO;
            USER_ROLE_TYPE = value1.USER_ROLE_TYPE;
            USER_FACULTY_NAME = value2.FACULTY_FACULTY_NAME_THAI;

            // ในกรณีที่เราทำการ Loop เพื่อ push data ลงไปใน Array object ก็จะเกิดการ push ข้อมูลที่ซ้ำซ้อน หรือการ push ข้อมูลเดินเข้าไปใน array object
            // จะต้องทำการค้นหาข้อมูลที่ซ้ำกัน และทำการนำข้อมูลนั้นออกจาก Array object
            //  ในกรณีนี้ ข้อมูลของผู้ใช้งานมี Unique key (key เฉพาะที่ value ไม่ซ้ำกัน) คือ USER_ID เราจึงนำค่าของมันมาทำการ compare เพื่อตรวจสอบความตรงกัน
            // * ในกรณีนี้ คือ ทำการค้นหา USER_ID ของตัวมันเองเพื่อลบออกจาก Array object และทำการ push ข้อมูลที่ [เพิ่มชื่อ สาขาวิชา แล้ว] เข้าไปใหม่ใน Array object
            const objIndex = this.__setUserDataForDisplayTable.findIndex(obj => obj.USER_ID === USER_ID);

            // * เมื่อได้ USER_ID ที่ตรงกันมาแล้ว ก็ทำการตรวจสอบ ค่าต้องไม่เท่ากับ -1 [กรณีที่ไม่พบ USER_ID ที่ตรงกัน Function findIndex() จะ return -1]
            if (objIndex > -1) {

              // TODO : ใช้คำสั้งในการนำข้อมูลออกจาก Array object 
              this.__setUserDataForDisplayTable.splice(objIndex, 1);

            }

            // * push ข้อมูลที่ทำการเพิ่มชื่อ สาขาวิชา เข้าไปเเล้ว ลงไปใน Array object 
            this.__setUserDataForDisplayTable.push({ USER_ID, USER_USERNAME, USER_FACULTY_NO, USER_ROLE_TYPE, USER_FACULTY_NAME });

            // * จากนั้นทำการจัดเรียงข้อมูลให้ให้สวยงาม เพราะตอนนี้มีการ นำข้อมูล [เข้าและออก] ทำให้ข้อมูลไม่เรียงลำดับตาม USER_ID 
            this.__setUserDataForDisplayTable.sort((a, b) => { return a.USER_ID - b.USER_ID; });

          }

        }

      }
      // END --- ค้นหาชื่อ คณะ และสร้าง Object ใหม่เพื่อเก็บมัน ---

    });


  }

  // เรียกใช้งานการร้องขอข้อมูลจาก API วันเปิด-ปิด ระบบสำหรับนักศึกษา
  async callApiDayOpenAndClose() {

    await this.userAndFaculty.getHttpDayOpenAndClose().subscribe(res => {

      // เอาไว้แสดงบนหน้าเว็บไซต์
      // ตั้งค่าเริ่มต้น วันเปิด-ปิดระบบ
      // ทำการสร้างรูปแบบของ วันที่ให้เป็นสากลเพื่อนำไปแสดงใน datePicker [จำเป็นต้องอยู่ในค่าที่เป็น Date เท่านั้น ไม่งั้น วันที่จะไม่แสดงใน Datepicker]
      this.dayOpenAndClose.patchValue({
        __day_open: new Date(res.DAY_OPEN_AND_CLOSE[0].START_DATE),
        __day_close: new Date(res.DAY_OPEN_AND_CLOSE[0].END_DATE)
      });

      this.dayOpenAndClose.updateValueAndValidity();

      // เอาไว้เทียบกันตอนบันทึกวันเปิด-ปิด ว่ามีการเปลี่ยนวันที่แล้วหรือไม่ ถ้ามันตรงกับอันนี้ก็ให้ปุ่ม บันทึก Disabled ถ้าไม่ตรงกันก็บันทึกได้
      // ตั้งค่าเริ่มต้น วันเปิด-ปิดระบบ
      this.__setDayOpenAndClose = res.DAY_OPEN_AND_CLOSE[0];

      // ทำการใช้ pipe transform เพื่อเปลี่ยน รูปแบบของวันที่ให้เป็น MM/dd/yyyy เพื่อให้ง่ายต่อการ compare
      this.__setDayOpenAndClose.START_DATE = this.pipe.transform(this.__setDayOpenAndClose.START_DATE.toString(), 'MM/dd/yyyy').toString();
      this.__setDayOpenAndClose.END_DATE = this.pipe.transform(this.__setDayOpenAndClose.END_DATE.toString(), 'MM/dd/yyyy').toString();

      // ตรวจสอบการ disable ปุ่มบันทึก
      let tempDayOpenValueSetToFrontPage = this.pipe.transform(this.dayOpenAndClose.controls['__day_open'].value.toString(), 'MM/dd/yyyy').toString();
      let tempDayCloseValueSetToFrontPage = this.pipe.transform(this.dayOpenAndClose.controls['__day_close'].value.toString(), 'MM/dd/yyyy').toString();

      let tempDayOpenValueSetFromComponent = this.__setDayOpenAndClose.START_DATE;
      let tempDayCloseValueSetFromComponent = this.__setDayOpenAndClose.END_DATE;

      // * ทำการตรวจสอบ วันเปิด-ปิด ระบบ ว่าวัน/เดือน/ปี ตรงกันหรือไม่กับค่าที่ทำการ Binding data แบบ two way ไปยังหน้าเว็บไซต์
      // * ในกรณีนี้ยังไงก็ตรงกันเพราะพึ่งจะร้องขอข้อมูลจาก API และทำการตั้งค่า วัน/เดือน/ปี เริ่มต้นตรงกัน
      let isCheckDayOpenAndClose = tempDayOpenValueSetToFrontPage === tempDayOpenValueSetFromComponent ? tempDayCloseValueSetToFrontPage === tempDayCloseValueSetFromComponent ? true : false : false;

      //ตรวจสอบการ disabled save button
      if (isCheckDayOpenAndClose) {
        (document.querySelector('button.open-close-btn-submit-save') as HTMLButtonElement).disabled = true;
      } else {
        (document.querySelector('button.open-close-btn-submit-save') as any).disabled = false;
      }


    });

  }

  // เปิดปิดปุ่ม save ของการเปิกปิด-ระบบ
  onChangeDayOpenAndClose() {

    // วันปิดระบบ ใน database
    let old_day_open = this.pipe.transform(this.__setDayOpenAndClose.START_DATE.toString(), 'MM/dd/yyyy').toString();
    // วันปิดระบบ ที่ได้จากการเลือกผ่านหน้าเว็บไซต์ [ได้จากการ Blinding Data ผ่าน formControlName="__day_open"]
    let new_day_open = this.pipe.transform(this.dayOpenAndClose.controls['__day_open'].value.toString(), 'MM/dd/yyyy').toString()

    // shorthand if statement
    let compare_checking_day_open_between_old_with_new_day = old_day_open === new_day_open ? true : false;

    // วันปิดระบบ ใน database
    let old_day_close = this.pipe.transform(this.__setDayOpenAndClose.END_DATE.toString(), 'MM/dd/yyyy').toString();
    // วันปิดระบบ ที่ได้จากการเลือกผ่านหน้าเว็บไซต์ [ได้จากการ Blinding Data ผ่าน formControlName="__day_close"]
    let new_day_close = this.pipe.transform(this.dayOpenAndClose.controls['__day_close'].value.toString(), 'MM/dd/yyyy').toString();

    // shorthand if statement
    let compare_checking_day_close_between_old_with_new_day = old_day_close === new_day_close ? true : false;

    //ตรวจสอบการ disabled save button 
    if (!compare_checking_day_open_between_old_with_new_day || !compare_checking_day_close_between_old_with_new_day) {

      (document.querySelector('button.open-close-btn-submit-save') as any).disabled = false;

    } else {

      (document.querySelector('button.open-close-btn-submit-save') as any).disabled = true;

    }

  }

  // ทำการบันทึก วันเปิด-ปิดระบบ สำหรับนักศึษา
  onDayOpenAndCloseSubmit() {

    let dayOpen = this.pipe.transform(this.dayOpenAndClose.controls['__day_open'].value.toString(), 'MM/dd/yyyy').toString();
    let dayClose = this.pipe.transform(this.dayOpenAndClose.controls['__day_close'].value, 'MM/dd/yyyy').toString();

    // ! ถ้ามีการ login เสร็จแล้ว ให้ใส่ session username ด้วย
    let username = "Admin"; 



    const title = 'ยืนยันการแก้ไข วันเปิด-ปิดระบบ';
    const message = 'ท่านต้องการ บันทึกวันเปิด-ปิดระบบ สำหรับนักศึกษา ใช่หรือไม่!';
    const description = '';
    const descriptionDetail = '';
    const btnLeftDisable = false;
    const btnRightDisable = false;
    const txtBtnLeft = 'CANCEL';
    const txtBtnRight = 'OK';

    const dialogData = new ConfirmDialogModel(title, message, description, descriptionDetail, btnLeftDisable, btnRightDisable, txtBtnLeft, txtBtnRight);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {


      this.dialog_confirm_result = dialogResult;

      // กดปุ่ม OK ทำการบันทึก
      if (this.dialog_confirm_result) {

        this.userAndFaculty.postHttpUpdateDayOpenAndClose(dayOpen, dayClose, username).subscribe(res => {


          if (res.error_message_status == 1) {


            const title = 'ยืนยันการแก้ไข วันเปิด-ปิดระบบ';
            const message = 'ทำการบันทึก วันเปิด-ปิดระบบ สำหรับนักศึกษา เรียบร้อย';
            const description = '';
            const descriptionDetail = '';
            const btnLeftDisable = true;
            const btnRightDisable = false;
            const txtBtnLeft = '';
            const txtBtnRight = 'OK';

            const dialogData = new ConfirmDialogModel(title, message, description, descriptionDetail, btnLeftDisable, btnRightDisable, txtBtnLeft, txtBtnRight);
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
              data: dialogData
            });

            dialogRef.afterClosed().subscribe(dialogResult => {


              this.dialog_confirm_result = dialogResult;

              if (this.dialog_confirm_result) {
                // จบการแก้ไข กด OK ไม่ทำอะไรต่อ ปิดหน้าต่างไป
              }

            });

            // แก้ไขสำเร็จ จัดเรียงข้อมูลที่จะแสดงใหม่
            this.callApiDayOpenAndClose();

          } else {

            // !!!! เอาไว้ทำ error handler

          }


        });

      } else { // กดปุ่ม CANCEL ยกเลิกการบันทีก


        this.dayOpenAndClose.controls['__day_open'].setValue(new Date(this.__setDayOpenAndClose.START_DATE));
        this.dayOpenAndClose.controls['__day_close'].setValue(new Date(this.__setDayOpenAndClose.END_DATE));

        this.dayOpenAndClose.updateValueAndValidity();

      }

    });


  }

  // เมื่อมีการพิมพ์ ru-mail ที่ช่อง input สำหรับเพิ่มผู้ใช้งาน จะทำการแก้ไข css class [ remove,add css class]
  // เเละมีการตรวจสอบการใส่ @ru.ac.th 
  onKeyUpInputTagAddRuMail(event) {

    let tempRuMailAutocomplete = event.target.value;

    if (tempRuMailAutocomplete.substr(-1) == '@') {

      event.target.value += `ru.ac.th`;

    }

    if (event.target.value.substr(-8) == `@ru.ac.t`) {

      let tempAllTextLenght = event.target.value.length;
      let tempLenght = event.target.value.substr(-8);

      event.target.value = event.target.value.substring(0, (tempAllTextLenght - tempLenght.length));

    }

    let inputTagRUmail = event.target;

    if (tempRuMailAutocomplete == '' || !event.target.value.includes(`@ru.ac.th`) || event.target.value.substr(-9) != `@ru.ac.th` || event.target.value == `@ru.ac.th`) {


      inputTagRUmail.classList.remove('input-ru-email-correct');
      inputTagRUmail.classList.add('input-ru-email-wrong');

      event.target.closest('form').querySelector('#selectDepartmentCode').disabled = true;
      event.target.closest('form').querySelector('#selectDepartmentCode').value = '';

      event.target.closest('form').querySelector('#addFacultyCode').value = '';

      event.target.closest('form').querySelector('#selectDepartmentCode').classList.remove('input-ru-email-correct');
      event.target.closest('form').querySelector('#selectDepartmentCode').classList.remove('input-ru-email-wrong');

      document.querySelector('select#addFacultyCode').classList.remove('input-ru-email-wrong');

      document.querySelector('select#addFacultyCode').classList.remove('faculty-code');
      document.querySelector('select#addFacultyCode').classList.add('faculty-code-close');

      document.querySelector('label#labelFaculty').classList.remove('label-faculty');
      document.querySelector('label#labelFaculty').classList.add('label-faculty-close');


    } else {


      inputTagRUmail.classList.add('input-ru-email-correct');
      inputTagRUmail.classList.remove('input-ru-email-wrong');

      event.target.closest('form').querySelector('select.select-department-code').classList.add('input-ru-email-wrong');

      event.target.closest('form').querySelector('#selectDepartmentCode').disabled = false;

      event.target.closest('form').querySelector('button.btn-submit-save').disabled = true;
    }

    if (event.target.value.includes(`@ru.ac.th`) && event.target.closest('form').querySelector('#selectDepartmentCode').value != '') {

      event.target.closest('form').querySelector('#selectDepartmentCode').classList.remove('input-ru-email-wrong');
      event.target.closest('form').querySelector('#selectDepartmentCode').classList.add('input-ru-email-correct');

      event.target.closest('form').querySelector('button.btn-submit-save').disabled = false;

    }

    this.addUserFormGroup.controls['__addUserRuMail'].setValue(event.target.value);

  }

  // เมื่อมีการพิมพ์ [แก้ไข] ru-mail ที่ช่อง input สำหรับแก้ไขผู้ใช้งาน จะทำการแก้ไข css class [ remove,add css class]
  // เเละมีการตรวจสอบการใส่ @ru.ac.th 
  onKeyUpInputTagEditRuMail(event, USER_USERNAME) {

    let tempRuMailAutocomplete = event.target.value;

    if (tempRuMailAutocomplete.substr(-1) == '@') {

      event.target.value += `ru.ac.th`;

    }

    if (event.target.value.substr(-8) == `@ru.ac.t`) {

      let tempAllTextLenght = event.target.value.length;
      let tempLenght = event.target.value.substr(-8);

      event.target.value = event.target.value.substring(0, (tempAllTextLenght - tempLenght.length));

    }

    let inputTagRUmail = event.target;

    let editSaveBtn = event.target.closest('tr').querySelector('button.edit-save');
    let editRefreshBtn = event.target.closest('tr').querySelector('button.edit-refresh');

    if (tempRuMailAutocomplete == '' || !event.target.value.includes(`@ru.ac.th`) || event.target.value.substr(-9) != `@ru.ac.th` || event.target.value == `@ru.ac.th`) {

      inputTagRUmail.classList.add('input-ru-email-wrong');

      editSaveBtn.disabled = true;


    } else {


      inputTagRUmail.classList.remove('input-ru-email-wrong');

      editSaveBtn.disabled = false;

    }

  }

  // เมื่อมีการ click ที่ปุ่มแก้ไขข้อมูลผู้ใช้งาน  [ remove,add css class]
  onEditUserItem(event, userId, userUsername, userFacultyNo, userRoleType) {

    if (userRoleType == 1) {

      let editUserItem = event.target.closest('tr');

      let inputTagRUmail = editUserItem.querySelector('input.input-user-name');
      let inputTagKongPan = editUserItem.querySelector('input.input-kong-pan-display');
      let selectTagDepartments = editUserItem.querySelector('select.department-edit');

      let editBtn = editUserItem.querySelector('button.edit');
      let editSaveBtn = editUserItem.querySelector('button.edit-save');
      let editRefreshBtn = editUserItem.querySelector('button.edit-refresh');

      inputTagRUmail.classList.add('editUserOpen');
      inputTagRUmail.readOnly = false;
      inputTagKongPan.hidden = true;

      selectTagDepartments.classList.add('editUserOpen');
      selectTagDepartments.hidden = false;

      editBtn.hidden = true;
      editSaveBtn.hidden = false;
      editRefreshBtn.hidden = false;

      inputTagRUmail.value = userUsername;
      inputTagKongPan.value = `กองแผน`;
      selectTagDepartments.value = userRoleType;

    } else {

      let editUserItem = event.target.closest('tr');

      let inputTagRUmail = editUserItem.querySelector('input.input-user-name');
      let inputTagFaculty = editUserItem.querySelector('input.input-faculty-display');

      let selectTagFaculty = editUserItem.querySelector('select.faculty-code-edit');
      let selectTagDepartments = editUserItem.querySelector('select.department-edit');

      let editBtn = editUserItem.querySelector('button.edit');
      let editSaveBtn = editUserItem.querySelector('button.edit-save');
      let editRefreshBtn = editUserItem.querySelector('button.edit-refresh');

      selectTagDepartments.classList.add('editUserOpen');
      selectTagDepartments.value = 2;
      selectTagDepartments.hidden = false;

      inputTagRUmail.classList.add('editUserOpen');
      inputTagRUmail.readOnly = false;
      inputTagFaculty.hidden = true;
      selectTagFaculty.hidden = false;
      editBtn.hidden = true;
      editSaveBtn.hidden = false;
      editRefreshBtn.hidden = false;

      inputTagRUmail.value = userUsername;
      selectTagFaculty.value = userFacultyNo;
      selectTagDepartments.value = userRoleType;

    }


  }


  // ยกเลิกการแก้ไข้ข้อมูลผู้ใช้งาน
  onEditUserItemRefresh(event, userId, userUsername, userFacultyNo, userRoleType) {

    if (userRoleType == 1) {

      let editUserItem = event.target.closest('tr');

      let inputTagRUmail = editUserItem.querySelector('input.input-user-name');
      let inputTagKongPan = editUserItem.querySelector('input.input-kong-pan-display');
      let selectTagDepartments = editUserItem.querySelector('select.department-edit');

      let editBtn = editUserItem.querySelector('button.edit');
      let editSaveBtn = editUserItem.querySelector('button.edit-save');
      let editRefreshBtn = editUserItem.querySelector('button.edit-refresh');


      inputTagRUmail.classList.remove('input-ru-email-wrong');
      inputTagRUmail.classList.remove('input-ru-email-correct');
      inputTagRUmail.classList.remove('editUserOpen');
      selectTagDepartments.classList.remove('editUserOpen');

      inputTagRUmail.readOnly = true;
      inputTagKongPan.hidden = false;
      selectTagDepartments.hidden = true;
      editBtn.hidden = false;
      editSaveBtn.hidden = true;
      editSaveBtn.disabled = false;
      editRefreshBtn.hidden = true;
      editRefreshBtn.disabled = false;

      if (editUserItem.querySelector('select.faculty-code-edit').hidden === false) {

        editUserItem.querySelector('select.faculty-code-edit').hidden = true;
        editUserItem.querySelector('select.faculty-code-edit').remove('editUserOpen');

      }

      inputTagRUmail.value = userUsername;
      inputTagKongPan.value = `กองแผน`;
      selectTagDepartments.value = userRoleType;



    } else {


      let editUserItem = event.target.closest('tr');

      let inputTagRUmail = editUserItem.querySelector('input.input-user-name');
      let inputTagFaculty = editUserItem.querySelector('input.input-faculty-display');
      let selectTagFaculty = editUserItem.querySelector('select.faculty-code-edit');
      let selectTagDepartments = editUserItem.querySelector('select.department-edit');

      let editBtn = editUserItem.querySelector('button.edit');
      let editSaveBtn = editUserItem.querySelector('button.edit-save');
      let editRefreshBtn = editUserItem.querySelector('button.edit-refresh');

      inputTagRUmail.classList.remove('input-ru-email-wrong');
      inputTagRUmail.classList.remove('editUserOpen');
      selectTagDepartments.classList.remove('editUserOpen');

      selectTagDepartments.value = '';
      selectTagDepartments.hidden = true;

      inputTagRUmail.readOnly = true;
      inputTagFaculty.hidden = false;
      selectTagFaculty.hidden = true;
      editBtn.hidden = false;
      editSaveBtn.hidden = true;
      editSaveBtn.disabled = false;
      editRefreshBtn.hidden = true;
      editRefreshBtn.disabled = false;

      inputTagRUmail.placeholder = 'กรอก ru-mail@ru.ac.th';

      inputTagRUmail.value = userUsername;
      selectTagFaculty.value = userFacultyNo;
      selectTagDepartments.value = userRoleType;

    }


  }


  // แก้ไข้ข้อมูลผู้ใช้งาน เลือก กองแผน หรือ คณะ [ remove,add css class]
  onChangedDepartment(event, userFacultyNo) {

    let selectTagDepartments = event.target;
    let selectTagFaculty = event.target.closest('tr').querySelector('select#department-edit-faculty');

    let editSaveBtn = event.target.closest('tr').querySelector('button.edit-save');

    if (event.target.value == 2) {

      selectTagFaculty.hidden = false;

      if (userFacultyNo.toString() == '') {

        selectTagFaculty.classList.add('editUserOpen-when-without-faculty-no');
        selectTagFaculty.classList.remove('editUserOpen');

        editSaveBtn.disabled = true;

      } else {

        selectTagFaculty.classList.remove('editUserOpen-when-without-faculty-no');
        selectTagFaculty.classList.add('editUserOpen');

        editSaveBtn.disabled = false;

      }

    } else {

      selectTagFaculty.classList.remove('editUserOpen-when-without-faculty-no');
      selectTagFaculty.classList.remove('editUserOpen');

      selectTagFaculty.hidden = true;
      editSaveBtn.disabled = false;

    }

  }


  // แก้ไข้ข้อมูลผู้ใช้งาน เมื่อเลือก คณะ แล้วต้อง ทำการเลือก สาขาวิชาต่อ [ remove,add css class]
  onChangedDepartmentSelectedFaculty(event) {

    let editSaveBtn = event.target.closest('tr').querySelector('button.edit-save');;
    let selectTagFaculty = event.target;

    if (event.target.value == '' || event.target.value == null) {

      editSaveBtn.disabled = true;

      selectTagFaculty.classList.add('editUserOpen-when-without-faculty-no');
      selectTagFaculty.classList.remove('editUserOpen');

    } else {

      editSaveBtn.disabled = false;

      selectTagFaculty.classList.remove('editUserOpen-when-without-faculty-no');
      selectTagFaculty.classList.add('editUserOpen');

    }

  }


  // เพิ่มผู้ใช้งาน เลือก กองแผน หรือ คณะ [ remove,add css class]
  onChangedAddDepartment(event) {

    let selectTagDepartmentsOfFaculty = document.querySelector('select#addFacultyCode');
    let labelTagDepartmentsOfFaculty = document.querySelector('label#labelFaculty');

    // คณะ
    if (event.target.value == 2) {

      event.target.closest('form').querySelector('select.select-department-code').classList.remove('input-ru-email-wrong');
      event.target.closest('form').querySelector('select.select-department-code').classList.add('input-ru-email-correct');

      document.querySelector('select#addFacultyCode').classList.add('input-ru-email-wrong');

      selectTagDepartmentsOfFaculty.classList.remove('faculty-code-close');
      selectTagDepartmentsOfFaculty.classList.add('faculty-code');

      labelTagDepartmentsOfFaculty.classList.remove('label-faculty-close');
      labelTagDepartmentsOfFaculty.classList.add('label-faculty');

      this.addUserFormGroup.controls['__addUserFaculty_no'].setValidators([Validators.required]);
      this.addUserFormGroup.controls['__addUserFaculty_no'].updateValueAndValidity();

    } else if (event.target.value == 1) { // กองแผน

      event.target.closest('form').querySelector('select.select-department-code').classList.remove('input-ru-email-wrong');
      event.target.closest('form').querySelector('select.select-department-code').classList.add('input-ru-email-correct');

      document.querySelector('select#addFacultyCode').classList.remove('input-ru-email-wrong');

      selectTagDepartmentsOfFaculty.classList.remove('faculty-code');
      selectTagDepartmentsOfFaculty.classList.add('faculty-code-close');

      labelTagDepartmentsOfFaculty.classList.remove('label-faculty');
      labelTagDepartmentsOfFaculty.classList.add('label-faculty-close');

      this.addUserFormGroup.controls['__addUserFaculty_no'].setValue('');
      this.addUserFormGroup.controls['__addUserFaculty_no'].setValidators([]);
      this.addUserFormGroup.controls['__addUserFaculty_no'].updateValueAndValidity();

      event.target.closest('form').querySelector('button.btn-submit-save').disabled = false;

    } else {  

      event.target.closest('form').querySelector('select.select-department-code').classList.add('input-ru-email-wrong');
      event.target.closest('form').querySelector('select.select-department-code').classList.remove('input-ru-email-correct');

      document.querySelector('select#addFacultyCode').classList.remove('input-ru-email-wrong');

      selectTagDepartmentsOfFaculty.classList.remove('faculty-code');
      selectTagDepartmentsOfFaculty.classList.add('faculty-code-close');

      labelTagDepartmentsOfFaculty.classList.remove('label-faculty');
      labelTagDepartmentsOfFaculty.classList.add('label-faculty-close');

      this.addUserFormGroup.controls['__addUserFaculty_no'].setValue('');
      this.addUserFormGroup.controls['__addUserFaculty_no'].setValidators([]);
      this.addUserFormGroup.controls['__addUserFaculty_no'].updateValueAndValidity();

      event.target.closest('form').querySelector('button.btn-submit-save').disabled = true;

    }

  }


  // เพิ่มผู้ใช้งาน เมื่อเลือก คณะ แล้วต้อง ทำการเลือก สาขาวิชาต่อ [ remove,add css class]
  onChangedAddFaculty(event) {


    let selectTagDepartmentsOfFaculty = document.querySelector('select#addFacultyCode');

    if (event.target.value == '' || event.target.value == null) {

      selectTagDepartmentsOfFaculty.classList.add('input-ru-email-wrong');
      selectTagDepartmentsOfFaculty.classList.remove('input-ru-email-correct');

    } else {

      selectTagDepartmentsOfFaculty.classList.remove('input-ru-email-wrong');
      selectTagDepartmentsOfFaculty.classList.add('input-ru-email-correct');


    }


  }


  /// ----- Save data editing --- ///
  onSaveEditUser(event, userId) {

    let userName = '';
    let userFacultyNo = '';
    let userRoleType = '';

    if (event.target.closest('tr').querySelector('#selectDepartment').value == '1') {

      userName = event.target.closest('tr').querySelector('.input-user-name').value;
      userFacultyNo = '';
      userRoleType = event.target.closest('tr').querySelector('#selectDepartment').value;

    } else {

      userName = event.target.closest('tr').querySelector('.input-user-name').value;
      userFacultyNo = event.target.closest('tr').querySelector('#department-edit-faculty').value;
      userRoleType = event.target.closest('tr').querySelector('#selectDepartment').value;

    }

    const title = 'ยืนยันการแก้ไขผู้ใช้งาน';
    const message = 'ท่านต้องการ บันทึกการแก้ไขผู้ใช้งาน ใช่หรือไม่!';
    const description = '';
    const descriptionDetail = '';
    const btnLeftDisable = false;
    const btnRightDisable = false;
    const txtBtnLeft = 'CANCEL';
    const txtBtnRight = 'OK';

    const dialogData = new ConfirmDialogModel(title, message, description, descriptionDetail, btnLeftDisable, btnRightDisable, txtBtnLeft, txtBtnRight);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {


      this.dialog_confirm_result = dialogResult;

      if (this.dialog_confirm_result) {

        this.userAndFaculty.postHttpUpdateUser(userId, userName, userFacultyNo, userRoleType).subscribe(res => {

          if (res.error_message_status == 1) {


            const title = 'ยืนยันการแก้ไขผู้ใช้งาน';
            const message = 'ทำการบันทึก การแก้ไขผู้ใช้งานเรียบร้อย';
            const description = '';
            const descriptionDetail = '';
            const btnLeftDisable = true;
            const btnRightDisable = false;
            const txtBtnLeft = '';
            const txtBtnRight = 'OK';

            const dialogData = new ConfirmDialogModel(title, message, description, descriptionDetail, btnLeftDisable, btnRightDisable, txtBtnLeft, txtBtnRight);
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
              data: dialogData
            });

            dialogRef.afterClosed().subscribe(dialogResult => {


              this.dialog_confirm_result = dialogResult;

              if (this.dialog_confirm_result) {
                // จบการแก้ไข กด OK ไม่ทำอะไรต่อ ปิดหน้าต่างไป
              }

            });

            // แก้ไขสำเร็จ จัดเรียงข้อมูลที่จะแสดงใหม่
            this.__setUserDataForDisplayTable = [];
            this.callApiUserAndFaculty();

          } else {
            // ไม่พบ id ที่ต้องการ
          }


        });

      }

    });

  }/// ----- Save data editing --- ///


  /// ------ Delete user -------- ///
  onDeleteUserItem(event, userId, username) {

    const title = 'ลบผู้ใช้งาน';
    const message = `ท่านต้องการ ลบผู้ใช้งาน ${username} ใช่หรือไม่!`;
    const description = ``;
    const descriptionDetail = '';
    const btnLeftDisable = false;
    const btnRightDisable = false;
    const txtBtnLeft = 'CANCEL';
    const txtBtnRight = 'OK';

    const dialogData = new ConfirmDialogModel(title, message, description, descriptionDetail, btnLeftDisable, btnRightDisable, txtBtnLeft, txtBtnRight);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      this.dialog_confirm_result = dialogResult;

      if (this.dialog_confirm_result) {

        this.userAndFaculty.postHttpDeleteUser(userId).subscribe(res => {

          if (res.error_message_status == 1) {

            const title = 'ลบผู้ใช้งาน';
            const message = `ทำการลบผู้ใช้งาน ${username} เรียบร้อย`;
            const description = ``;
            const descriptionDetail = '';
            const btnLeftDisable = true;
            const btnRightDisable = false;
            const txtBtnLeft = '';
            const txtBtnRight = 'OK';

            const dialogData = new ConfirmDialogModel(title, message, description, descriptionDetail, btnLeftDisable, btnRightDisable, txtBtnLeft, txtBtnRight);
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
              data: dialogData
            });

            dialogRef.afterClosed().subscribe(dialogResult => {

              this.dialog_confirm_result = dialogResult;
              if (this.dialog_confirm_result) {


                // ลบสำเร็จ จัดเรียงข้อมูลที่จะแสดงใหม่
                this.__setUserDataForDisplayTable = [];
                this.callApiUserAndFaculty();


              }

            });


          } else {

            const title = 'ลบผู้ใช้งาน';
            const message = `ไม่สามารถทำการลบผู้ใช้งาน ${username} ได้`;
            const description = ``;
            const descriptionDetail = '';
            const btnLeftDisable = true;
            const btnRightDisable = false;
            const txtBtnLeft = '';
            const txtBtnRight = 'OK';

            const dialogData = new ConfirmDialogModel(title, message, description, descriptionDetail, btnLeftDisable, btnRightDisable, txtBtnLeft, txtBtnRight);
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
              data: dialogData
            });

            dialogRef.afterClosed().subscribe(dialogResult => {

              this.dialog_confirm_result = dialogResult;
              if (this.dialog_confirm_result) {
                //// ลบไม่ได้ ก็ไม่ทำไรต่อ จบ
              }

            });

          }


        });

      }

    });


  }/// ------ Delete user -------- ///


  /// ----- insert user ------ ///
  onAddUserSubmit() {

    //-- ********** สำเร็จ แจ้งด้วย Dialog ******** --//
    const title = 'ยืนยันบันทึกผู้ใช้งาน';
    const message = 'ท่านต้องการ บันทึกผู้ใช้งาน ใช่หรือไม่!';
    const description = '';
    const descriptionDetail = '';
    const btnLeftDisable = false;
    const btnRightDisable = false;
    const txtBtnLeft = 'CANCEL';
    const txtBtnRight = 'OK';

    const dialogData = new ConfirmDialogModel(title, message, description, descriptionDetail, btnLeftDisable, btnRightDisable, txtBtnLeft, txtBtnRight);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      this.dialog_confirm_result = dialogResult;
      if (this.dialog_confirm_result) {

        let username = this.addUserFormGroup.controls['__addUserRuMail'].value;
        let role_type = this.addUserFormGroup.controls['__addUserDepartment'].value;
        let faculty_no = this.addUserFormGroup.controls['__addUserFaculty_no'].value;

        this.userAndFaculty.postHttpAddUser(username, role_type, faculty_no).subscribe(res => {

          if (res.error_message_status == 1) {

            const title = 'เพิ่มผู้ใช้งาน';
            const message = 'ไม่สามารถเพิ่มผู้ใช้งานนี้ได้';
            const description = `เนื่องจาก ${username} นี้มีอยู่ในระบบแล้ว`;
            const descriptionDetail = '';
            const btnLeftDisable = true;
            const btnRightDisable = false;
            const txtBtnLeft = '';
            const txtBtnRight = 'OK';

            const dialogData = new ConfirmDialogModel(title, message, description, descriptionDetail, btnLeftDisable, btnRightDisable, txtBtnLeft, txtBtnRight);
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
              data: dialogData
            });

            dialogRef.afterClosed().subscribe(dialogResult => {

              this.dialog_confirm_result = dialogResult;
              if (this.dialog_confirm_result) {

              }

            });

          } else if (res.error_message_status == 2) {

            const title = 'เพิ่มผู้ใช้งาน';
            const message = `เพิ่มผู้ใช้งานเรียบร้อย ${username}`;
            const description = ``;
            const descriptionDetail = '';
            const btnLeftDisable = true;
            const btnRightDisable = false;
            const txtBtnLeft = '';
            const txtBtnRight = 'OK';

            const dialogData = new ConfirmDialogModel(title, message, description, descriptionDetail, btnLeftDisable, btnRightDisable, txtBtnLeft, txtBtnRight);
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
              data: dialogData
            });

            dialogRef.afterClosed().subscribe(dialogResult => {

              this.dialog_confirm_result = dialogResult;
              if (this.dialog_confirm_result) {

              }

            });

            this.__setUserDataForDisplayTable = [];
            this.callApiUserAndFaculty();

          }


        });

      }

      this.addUserFormGroup.controls['__addUserRuMail'].setValue('');
      this.addUserFormGroup.controls['__addUserRuMail'].setValidators([Validators.required, Validators.email]);
      this.addUserFormGroup.controls['__addUserRuMail'].updateValueAndValidity();

      let selectTagDepartmentsOfFaculty = document.querySelector('select#addFacultyCode');
      let labelTagDepartmentsOfFaculty = document.querySelector('label#labelFaculty');

      if (this.addUserFormGroup.controls['__addUserDepartment'].value == 2) {

        selectTagDepartmentsOfFaculty.classList.remove('faculty-code');
        selectTagDepartmentsOfFaculty.classList.add('faculty-code-close');

        labelTagDepartmentsOfFaculty.classList.remove('label-faculty');
        labelTagDepartmentsOfFaculty.classList.add('label-faculty-close');

        this.addUserFormGroup.controls['__addUserFaculty_no'].setValue('');
        this.addUserFormGroup.controls['__addUserFaculty_no'].setValidators([]);
        this.addUserFormGroup.controls['__addUserFaculty_no'].updateValueAndValidity();

      }

      this.addUserFormGroup.controls['__addUserDepartment'].setValue('');
      this.addUserFormGroup.controls['__addUserDepartment'].setValidators([Validators.required]);
      this.addUserFormGroup.controls['__addUserDepartment'].updateValueAndValidity();

    });

    document.querySelector('select.select-department-code').classList.remove('input-ru-email-wrong');
    document.querySelector('select.select-department-code').classList.remove('input-ru-email-correct');
    let t = (document.querySelector('select#selectDepartmentCode') as any).disabled = true;

    document.querySelector('.input-ru-email').classList.remove('input-ru-email-wrong');
    document.querySelector('.input-ru-email').classList.remove('input-ru-email-correct');

  }/// ----- insert user ------ ///

}
