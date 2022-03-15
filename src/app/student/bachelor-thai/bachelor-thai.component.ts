import { bechelorArticlesAndChoicesResponse } from './../bachelor-interface';
import { Component, OnInit } from '@angular/core';
import { SignInService } from 'src/app/services/sign-in.service';
import { BechelorThaiService } from '../../services/bechelor-thai.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { messagesDialog } from 'src/app/disclosure-dialog/disclosure-dialog-interface';
import { DisclosureDialogComponent, DisclosureDialogModel } from '../../disclosure-dialog/disclosure-dialog.component';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-bachelor-thai',
  templateUrl: './bachelor-thai.component.html',
  styleUrls: ['./bachelor-thai.component.css']
})
export class BachelorThaiComponent implements OnInit {

  // answerSurvey = this.formGroup.group({
  //   Std_code: [this.signInServices.getStdCode()],
  //   Prename_no: [this.signInServices.getStudent().StudentInfo.Prename_no],
  //   Prename_thai: [this.signInServices.getStudent().StudentInfo.Prename_thai],
  //   Prename_eng: [this.signInServices.getStudent().StudentInfo.Prename_eng],
  //   First_name_thai: [this.signInServices.getStudent().StudentInfo.First_name_thai],
  //   First_name_eng: [this.signInServices.getStudent().StudentInfo.Faculty_name_eng],
  //   Last_name_thai: [this.signInServices.getStudent().StudentInfo.Last_name_thai],
  //   Last_name_eng: [this.signInServices.getStudent().StudentInfo.Last_name_eng],
  //   Birth_date: [this.signInServices.getStudent().StudentInfo.Birth_date],
  //   Faculty_no: [this.signInServices.getStudent().StudentInfo.Faculty_no],
  //   Faculty_name_thai: [this.signInServices.getStudent().StudentInfo.Faculty_name_thai],
  //   Faculty_name_eng: [this.signInServices.getStudent().StudentInfo.Faculty_name_eng],
  //   Curr_no: [this.signInServices.getStudent().StudentInfo.Curr_no],
  //   Major_no: [this.signInServices.getStudent().StudentInfo.Major_no],
  //   Major_flag: [this.signInServices.getStudent().StudentInfo.Major_flag],
  //   Major_name_thai: [this.signInServices.getStudent().StudentInfo.Major_name_thai],
  //   Major_name_eng: [this.signInServices.getStudent().StudentInfo.Major_name_eng],
  //   Lev_id: [this.signInServices.getStudent().StudentInfo.Lev_id],
  // });

  header = {};

  part1 = {};
  part2 = {};
  part3 = {};
  part4 = {};
  part5 = {};
  part6 = {};
  part7 = {};

  article1_1 = [];
  article1_2 = [];
  article1_3 = [];
  article1_4 = [];
  article1_5 = [];
  article1_6 = [];
  article1_7 = [];
  article1_8 = [];
  article1_9 = [];
  article1_10 = [];
  article1_11 = [];

  article2_1 = [];
  article2_2 = [];
  article2_3 = [];
  article2_4 = [];
  article2_5 = [];
  article2_6 = [];
  article2_7 = [];
  article2_8 = [];

  article3_1 = [];
  article3_2 = [];
  article3_3 = [];
  article3_4 = [];
  article3_5 = [];

  article4_1 = [];
  article4_2 = [];

  article5_1 = [];
  article5_2 = [];
  article5_3 = [];
  article5_4 = [];
  article5_5 = [];

  article6_1 = [];
  article6_2 = [];
  article6_3 = [];

  article7 = [];
  article8 = [];

  answerSurvey = this.formGroup.group({

    Lev_id: [this.signInServices.getStudent().StudentInfo.Lev_id],
    Language: [this.signInServices.getLanguage()],

    // -------- ตอนที่ 1 ข้อ 1 ย่อย --------
    Faculty_no: [this.signInServices.getStudent().StudentInfo.Faculty_no],
    Faculty_name_thai: [this.signInServices.getStudent().StudentInfo.Faculty_name_thai],
    Faculty_name_eng: [this.signInServices.getStudent().StudentInfo.Faculty_name_eng],

    Curr_no: [this.signInServices.getStudent().StudentInfo.Curr_no],
    Major_no: [this.signInServices.getStudent().StudentInfo.Major_no],
    Major_flag: [this.signInServices.getStudent().StudentInfo.Major_flag],
    Major_name_thai: [this.signInServices.getStudent().StudentInfo.Major_name_thai],
    Major_name_eng: [this.signInServices.getStudent().StudentInfo.Major_name_eng],

    Year_end: ['', Validators.required],
    Semester_end: ['', Validators.required],
    GPA: ['', Validators.required],
    Campus: ['', Validators.required],

    // -------- ตอนที่ 1 ข้อ 2 ย่อย --------

    Prename_no: [this.signInServices.getStudent().StudentInfo.Prename_no],
    Prename_thai: [this.signInServices.getStudent().StudentInfo.Prename_thai],
    Prename_eng: [this.signInServices.getStudent().StudentInfo.Prename_eng],
    First_name_thai: [this.signInServices.getStudent().StudentInfo.First_name_thai],
    First_name_eng: [this.signInServices.getStudent().StudentInfo.Faculty_name_eng],

    Last_name_thai: [this.signInServices.getStudent().StudentInfo.Last_name_thai],
    Last_name_eng: [this.signInServices.getStudent().StudentInfo.Last_name_eng],
    Birth_date: [this.signInServices.getStudent().StudentInfo.Birth_date],

    Std_code: [this.signInServices.getStdCode()],
    Personal_id: ['', Validators.required],
    Age: [this.signInServices.getAge(), Validators.required], // 5   
    Sex: ['', Validators.required],

    // -------- ตอนที่ 1 ข้อ 3 ย่อย -------

    House_domicile: ['', Validators.required],
    House_address_no: ['', Validators.required],
    House_address_village_no: [''],
    House_address_village: ['', Validators.required],
    House_address_building: ['', Validators.required],
    House_address_floor: [''],
    House_address_alley: [''],
    House_address_road: [''],
    House_address_sub_district: ['', Validators.required],
    House_address_district: ['', Validators.required],
    House_address_province: ['', Validators.required],
    House_address_country: ['', Validators.required],
    House_address_zip_code: ['', Validators.required],
    // House_address_phone_number: ['' , Validators.required],
    // House_address_tel: ['' , Validators.required],
    // House_address_fax: ['' , Validators.required],
    // House_address_e_mail: ['' , Validators.required],
    // House_address_website: ['' , Validators.required],

    // -------- ตอนที่ 1 ข้อ 4 ย่อย -------

    current_address: ['', Validators.required],
    current_address_no: [{value:'', disabled: true}],
    current_address_village_no: [{value:'', disabled: true}],
    current_address_village: [{value:'', disabled: true}],
    current_address_building: [{value:'', disabled: true}],
    current_address_floor: [{value:'', disabled: true}],
    current_address_alley: [{value:'', disabled: true}],
    current_address_road: [{value:'', disabled: true}],
    current_address_sub_district: [{value:'', disabled: true}],
    current_address_district: [{value:'', disabled: true}],
    current_address_province: [{value:'', disabled: true}],
    current_address_country: [{value:'', disabled: true}],
    current_address_zip_code: [{value:'', disabled: true}],
    current_address_phone_number: [{value:'', disabled: true}],
    current_address_e_mail: [{value:'', disabled: true}],

    // -------- ตอนที่ 1 ข้อ 5 ย่อย -------

    you_applied_to_study_by: ['', Validators.required],

    // -------- ตอนที่ 1 ข้อ 6 ย่อย -------
    program_attended: ['', Validators.required],

    // -------- ตอนที่ 1 ข้อ 7 ย่อย -------
    disability: ['', Validators.required],

    // -------- ตอนที่ 1 ข้อ 8 ย่อย -------
    offered_funds_to_study: ['', Validators.required],

    // -------- ตอนที่ 1 ข้อ 9 ย่อย -------
    could_you_graduate_in_the_set_period_of_time_in_the_program: ['', Validators.required],

    // -------- ตอนที่ 1 ข้อ 10 ย่อย -------
    before_enrolling_at_ramkhamhaeng_university_had_you_worked_somewhere: ['', Validators.required],
    before_enrolling_at_ramkhamhaeng_university_had_you_worked_somewhere_text: ['', Validators.required],

    // -------- ตอนที่ 1 ข้อ 11 ย่อย -------
    current_working_status: ['', Validators.required],
    current_working_status_text: [''],

  });

  get validating() { return this.answerSurvey.controls; }

  get validatingFormGroup() { return this.answerSurvey; }

  constructor(
    private http: BechelorThaiService,
    public dialog: MatDialog,
    private signInServices: SignInService,
    private router: Router,
    private formGroup: FormBuilder
  ) { }

  ngOnInit(): void {

    console.log(this.answerSurvey)

    if (localStorage.getItem('isDisclosure') != 'true') {
      this.getDisclosure();
    }
    this.getHeaders();
    this.getPartsOfArticles();
    this.getArticlesAndChoices();
    // console.log(this.signInServices.getAge())
  }

  private getDisclosure() {
    this.http.fetchDisclosure().subscribe(response => {
      let makeMessage: messagesDialog = {
        title: 'คำชี้แจง',
        btnLeftDisable: false,
        btnRightDisable: false,
        txtBtnLeft: "CLOSE",
        txtBtnRight: "OK",
        HEADER_1_TH: response.HEADER_1_TH,
        HEADER_2_TH: response.HEADER_2_TH,
        DETAIL_1_OF_HEADER_1_TH: response.DETAIL_1_OF_HEADER_1_TH,
        DETAIL_2_OF_HEADER_1_TH: response.DETAIL_2_OF_HEADER_1_TH,
        DETAIL_3_OF_HEADER_1_TH: response.DETAIL_3_OF_HEADER_1_TH,
        DETAIL_1_OF_HEADER_2_TH: response.DETAIL_1_OF_HEADER_2_TH,
        DETAIL_2_OF_HEADER_2_TH: response.DETAIL_2_OF_HEADER_2_TH,
        DETAIL_3_OF_HEADER_2_TH: response.DETAIL_3_OF_HEADER_2_TH,
        DETAIL_4_OF_HEADER_2_TH: response.DETAIL_4_OF_HEADER_2_TH,
        DETAIL_5_OF_HEADER_2_TH: response.DETAIL_5_OF_HEADER_2_TH,
        DETAIL_6_OF_HEADER_2_TH: response.DETAIL_6_OF_HEADER_2_TH,
        DETAIL_7_OF_HEADER_2_TH: response.DETAIL_7_OF_HEADER_2_TH,
        CONSENT_TO_DISCLOSURE_TH: response.CONSENT_TO_DISCLOSURE_TH,
        HEADER_1_EN: response.HEADER_1_EN,
        HEADER_2_EN: response.HEADER_2_EN,
        DETAIL_1_OF_HEADER_1_EN: response.DETAIL_1_OF_HEADER_1_EN,
        DETAIL_2_OF_HEADER_1_EN: response.DETAIL_2_OF_HEADER_1_EN,
        DETAIL_3_OF_HEADER_1_EN: response.DETAIL_3_OF_HEADER_1_EN,
        DETAIL_1_OF_HEADER_2_EN: response.DETAIL_1_OF_HEADER_2_EN,
        DETAIL_2_OF_HEADER_2_EN: response.DETAIL_2_OF_HEADER_2_EN,
        DETAIL_3_OF_HEADER_2_EN: response.DETAIL_3_OF_HEADER_2_EN,
        DETAIL_4_OF_HEADER_2_EN: response.DETAIL_4_OF_HEADER_2_EN,
        DETAIL_5_OF_HEADER_2_EN: response.DETAIL_5_OF_HEADER_2_EN,
        DETAIL_6_OF_HEADER_2_EN: response.DETAIL_6_OF_HEADER_2_EN,
        DETAIL_7_OF_HEADER_2_EN: response.DETAIL_7_OF_HEADER_2_EN,
        CONSENT_TO_DISCLOSURE_EN: response.CONSENT_TO_DISCLOSURE_EN,
        CONFIRM_TH: response.CONFIRM_TH,
        CONFIRM_EN: response.CONFIRM_EN,
      };

      let dialogData = this.newMessageDialog(makeMessage);
      let dialogRef = this.dialog.open(DisclosureDialogComponent, { data: dialogData });
      dialogRef.afterClosed().subscribe(dialogResult => {

        let dialog_confirm_result = dialogResult;
        if (dialog_confirm_result) {
          // ok call api for get choice
          localStorage.setItem('isDisclosure', 'true')
        } else {
          this.signInServices.signOut();
          this.router.navigate(['/home-page']);
        }

      });

    }, error => {

      let status_message: string[] = this.checkStatusCode(error.status);
      let makeMessage: messagesDialog = {
        title: "ขออภัยมีเหตุขัดข้อง",
        btnLeftDisable: false,
        btnRightDisable: true,
        txtBtnLeft: "CLOSE",
        txtBtnRight: "",
        HEADER_1_TH: "",
        HEADER_2_TH: "",
        DETAIL_1_OF_HEADER_1_TH: "ขออภัยในความไม่สะดวก",
        DETAIL_2_OF_HEADER_1_TH: status_message[1],
        DETAIL_3_OF_HEADER_1_TH: "",
        DETAIL_1_OF_HEADER_2_TH: "",
        DETAIL_2_OF_HEADER_2_TH: "",
        DETAIL_3_OF_HEADER_2_TH: "",
        DETAIL_4_OF_HEADER_2_TH: "",
        DETAIL_5_OF_HEADER_2_TH: "",
        DETAIL_6_OF_HEADER_2_TH: "",
        DETAIL_7_OF_HEADER_2_TH: "",
        CONSENT_TO_DISCLOSURE_TH: "",
        HEADER_1_EN: "",
        HEADER_2_EN: "",
        DETAIL_1_OF_HEADER_1_EN: "",
        DETAIL_2_OF_HEADER_1_EN: "",
        DETAIL_3_OF_HEADER_1_EN: "",
        DETAIL_1_OF_HEADER_2_EN: "",
        DETAIL_2_OF_HEADER_2_EN: "",
        DETAIL_3_OF_HEADER_2_EN: "",
        DETAIL_4_OF_HEADER_2_EN: "",
        DETAIL_5_OF_HEADER_2_EN: "",
        DETAIL_6_OF_HEADER_2_EN: "",
        DETAIL_7_OF_HEADER_2_EN: "",
        CONSENT_TO_DISCLOSURE_EN: "",
        CONFIRM_TH: "",
        CONFIRM_EN: "",
      };
      let dialogData = this.newMessageDialog(makeMessage);
      let dialogRef = this.dialog.open(DisclosureDialogComponent, { data: dialogData });
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

  private async getHeaders() {
    await this.http.fetchHeaders().subscribe(response => {
      this.header = response[0];
      // console.log(this.header);
    });
  }

  private async getPartsOfArticles() {
    await this.http.fetchPartsOfArticles().subscribe(response => {
      this.part1 = response[0];
      this.part2 = response[1];
      this.part3 = response[2];
      this.part4 = response[3];
      this.part5 = response[4];
      this.part6 = response[5];
      this.part7 = response[6];

      // console.log("this.part7 => ", this.part7)
    });
  }

  private async getArticlesAndChoices() {
    await this.http.fetchArticlesAndChoices().subscribe(response => {

      console.log(response)

      response.forEach(partInArticle => {
        switch (partInArticle.PART_ID) {
          case '1':
            switch (partInArticle.ARTICLE_NO) {
              case '1':
                this.article1_1.push(partInArticle);
                break;
              case '2':
                this.article1_2.push(partInArticle);
                break;
              case '3':
                this.article1_3.push(partInArticle);
                break;
              case '4':
                this.article1_4.push(partInArticle);
                break;
              case '5':
                this.article1_5.push(partInArticle);
                break;
              case '6':
                this.article1_6.push(partInArticle);
                break;
              case '7':
                this.article1_7.push(partInArticle);
                break;
              case '8':
                this.article1_8.push(partInArticle);
                break;
              case '9':
                this.article1_9.push(partInArticle);
                break;
              case '10':
                this.article1_10.push(partInArticle);
                break;
              case '11':
                this.article1_11.push(partInArticle);
                break;
              default:
                break;
            }
            break;
          case '2':
            switch (partInArticle.ARTICLE_NO) {
              case '1':
                this.article2_1.push(partInArticle);
                break;
              case '2':
                this.article2_2.push(partInArticle);
                break;
              case '3':
                this.article2_3.push(partInArticle);
                break;
              case '4':
                this.article2_4.push(partInArticle);
                break;
              case '5':
                this.article2_5.push(partInArticle);
                break;
              case '6':
                this.article2_6.push(partInArticle);
                break;
              case '7':
                this.article2_7.push(partInArticle);
                break;
              case '8':
                this.article2_8.push(partInArticle);
                break;
              default:
                break;
            }
            break;
          case '3':
            switch (partInArticle.ARTICLE_NO) {
              case '1':
                this.article3_1.push(partInArticle);
                break;
              case '2':
                this.article3_2.push(partInArticle);
                break;
              case '3':
                this.article3_3.push(partInArticle);
                break;
              case '4':
                this.article3_4.push(partInArticle);
                break;
              case '5':
                this.article3_5.push(partInArticle);
                break;
              default:
                break;
            }
            break;
          case '4':
            switch (partInArticle.ARTICLE_NO) {
              case '1':
                this.article4_1.push(partInArticle);
                break;
              case '2':
                this.article4_2.push(partInArticle);
                break;
              default:
                break;
            }
            break;
          case '5':
            switch (partInArticle.ARTICLE_NO) {
              case '1':
                this.article5_1.push(partInArticle);
                break;
              case '2':
                this.article5_2.push(partInArticle);
                break;
              case '3':
                this.article5_3.push(partInArticle);
                break;
              case '4':
                this.article5_4.push(partInArticle);
                break;
              case '5':
                this.article5_5.push(partInArticle);
                break;
              default:
                break;
            }
            break;
          case '6':
            switch (partInArticle.ARTICLE_NO) {
              case '1':
                this.article6_1.push(partInArticle);
                break;
              case '2':
                this.article6_2.push(partInArticle);
                break;
              case '3':
                this.article6_3.push(partInArticle);
                break;
              default:
                break;
            }
            break;
          case '7':
            this.article7.push(partInArticle);
            break;
          case '8':
            this.article8.push(partInArticle);
            break;
          default:
            break;
        }
      });
    });
  }

  private newMessageDialog(makeMessage: messagesDialog): any {
    return new DisclosureDialogModel(
      makeMessage.title,
      makeMessage.btnLeftDisable,
      makeMessage.btnRightDisable,
      makeMessage.txtBtnLeft,
      makeMessage.txtBtnRight,
      makeMessage.HEADER_1_TH,
      makeMessage.HEADER_2_TH,
      makeMessage.DETAIL_1_OF_HEADER_1_TH,
      makeMessage.DETAIL_2_OF_HEADER_1_TH,
      makeMessage.DETAIL_3_OF_HEADER_1_TH,
      makeMessage.DETAIL_1_OF_HEADER_2_TH,
      makeMessage.DETAIL_2_OF_HEADER_2_TH,
      makeMessage.DETAIL_3_OF_HEADER_2_TH,
      makeMessage.DETAIL_4_OF_HEADER_2_TH,
      makeMessage.DETAIL_5_OF_HEADER_2_TH,
      makeMessage.DETAIL_6_OF_HEADER_2_TH,
      makeMessage.DETAIL_7_OF_HEADER_2_TH,
      makeMessage.CONSENT_TO_DISCLOSURE_TH,
      makeMessage.HEADER_1_EN,
      makeMessage.HEADER_2_EN,
      makeMessage.DETAIL_1_OF_HEADER_1_EN,
      makeMessage.DETAIL_2_OF_HEADER_1_EN,
      makeMessage.DETAIL_3_OF_HEADER_1_EN,
      makeMessage.DETAIL_1_OF_HEADER_2_EN,
      makeMessage.DETAIL_2_OF_HEADER_2_EN,
      makeMessage.DETAIL_3_OF_HEADER_2_EN,
      makeMessage.DETAIL_4_OF_HEADER_2_EN,
      makeMessage.DETAIL_5_OF_HEADER_2_EN,
      makeMessage.DETAIL_6_OF_HEADER_2_EN,
      makeMessage.DETAIL_7_OF_HEADER_2_EN,
      makeMessage.CONSENT_TO_DISCLOSURE_EN,
      makeMessage.CONFIRM_TH,
      makeMessage.CONFIRM_EN,
    );
  }

  private checkStatusCode(status_code: number): string[] {

    let STATUS_MESSAGE: string[] = [];

    switch (status_code) {

      case 401:
        STATUS_MESSAGE[0] = `ไม่สามารถเข้าสู่ระบบได้ เนื่องจากไม่พบข้อมูล กรุณากรอกข้อมูลใหม่อีกครั้ง และทำการตรวจสอบความถูกต้องของข้อมูล  ก่อนเข้าสู่ระบบ❗`;
        STATUS_MESSAGE[1] = `Cannot Sign in!
        Because information was not found Please enter the information again.
        And check the correctness of the information Before Sign in.❗`;
        break;

      default:
        STATUS_MESSAGE[0] = "ขออภัยในความไม่สะดวก";
        STATUS_MESSAGE[1] = "ขณะนี้มีผู้เข้าใช้งานเป็นจำนวนมาก กรุณากลับมาเข้าใช้งานใหม่ในภายหลัง❗";
        STATUS_MESSAGE[2] = "Sorry for the inconvenience We have a large number of users. Please come back later.❗";
        break;

    }

    return STATUS_MESSAGE;
  }

  keyPress(e: KeyboardEvent) {
    return /[0-9a-zA-Z]/i.test(e.key);
  }

  keyPressText(e: KeyboardEvent) {
    return /[a-zA-Z]/i.test(e.key);
  }

  keyPressSlash(e: KeyboardEvent) {
    return /[0-9/]/i.test(e.key);
  }

  keyPressNumber(e: KeyboardEvent) {
    return /[0-9]/i.test(e.key);
  }

  keyPressSemester(e: KeyboardEvent) {
    return /[1-3]/i.test(e.key);
  }

  keyPressGPA(e: KeyboardEvent) {
    return /[0-9a-zA-Z\.]/i.test(e.key);
  }

  // ตอนที่ 1 ข้อย่อยที่ 3 และ ข้อย่อยที่ 4
  // กรณีเลือกกรอกข้อมูล หมู่บ้าน หรือกรอก อาคาร/ตึก
  // ทำการยกเลือก Validators.required
  // state == 1 คือ "หมู่บ้าน" 
  // state == 2 คือ "อาคาร/ตึก" 
  // async setRequireHouseAddressVillageAndBuilding(event, state) {
  async setRequireAddressVillageAndBuilding(event, state: number, FormControlName: string) {
    const VILLAGE = FormControlName + "village";
    const BUILDING = FormControlName + "building";
    const FLOOR = FormControlName + "floor";
    const ALLEY = FormControlName + "alley";
    const ROAD = FormControlName + "road"

    const TEXT_VALUE = await event.target.value != '' ? true : false;

    if (TEXT_VALUE) {

      if (state == 1) {
        await this.answerSurvey.controls[BUILDING].setValidators([]);
      } else {
        await this.answerSurvey.controls[VILLAGE].setValidators([]);
        await this.answerSurvey.controls[FLOOR].setValidators([Validators.required]);
        await this.answerSurvey.controls[ALLEY].setValidators([Validators.required]);
        await this.answerSurvey.controls[ROAD].setValidators([Validators.required]);
      }

    } else {
      if (state == 1) {
        await this.answerSurvey.controls[BUILDING].setValidators([Validators.required]);
      } else {
        await this.answerSurvey.controls[VILLAGE].setValidators([Validators.required]);
        await this.answerSurvey.controls[FLOOR].setValidators([]);
        await this.answerSurvey.controls[ALLEY].setValidators([]);
        await this.answerSurvey.controls[ROAD].setValidators([]);
      }
    }

    await this.answerSurvey.controls[VILLAGE].updateValueAndValidity();

    await this.answerSurvey.controls[BUILDING].updateValueAndValidity();
    await this.answerSurvey.controls[FLOOR].updateValueAndValidity();
    await this.answerSurvey.controls[ALLEY].updateValueAndValidity();
    await this.answerSurvey.controls[ROAD].updateValueAndValidity();

  }

  // ตอนที่ 1 ข้อย่อยที่ 4
  // ถ้าเลือกข้อ radio ข้อ 1 ที่อยู่ตามทะเบียนบ้าน ให้ disable ข้อ 2 ที่อยู่ปัจจุบัน
  currentAddressRadioChoices(event) {
    console.log(this.answerSurvey.controls['current_address'].value)

    if (this.answerSurvey.controls['current_address'].value == 2) {

      this.answerSurvey.controls['current_address_no'].setValidators([Validators.required]);
      this.answerSurvey.controls['current_address_village'].setValidators([Validators.required]);
      this.answerSurvey.controls['current_address_building'].setValidators([Validators.required]);
      this.answerSurvey.controls['current_address_sub_district'].setValidators([Validators.required]);
      this.answerSurvey.controls['current_address_district'].setValidators([Validators.required]);
      this.answerSurvey.controls['current_address_province'].setValidators([Validators.required]);
      this.answerSurvey.controls['current_address_country'].setValidators([Validators.required]);
      this.answerSurvey.controls['current_address_zip_code'].setValidators([Validators.required]);
      this.answerSurvey.controls['current_address_phone_number'].setValidators([Validators.required]);

      this.answerSurvey.controls['current_address_no'].enable();
      this.answerSurvey.controls['current_address_village'].enable();
      this.answerSurvey.controls['current_address_building'].enable();
      this.answerSurvey.controls['current_address_sub_district'].enable();
      this.answerSurvey.controls['current_address_district'].enable();
      this.answerSurvey.controls['current_address_province'].enable();
      this.answerSurvey.controls['current_address_country'].enable();
      this.answerSurvey.controls['current_address_zip_code'].enable();
      this.answerSurvey.controls['current_address_phone_number'].enable();


    } else {

      this.answerSurvey.controls['current_address_no'].clearValidators();
      this.answerSurvey.controls['current_address_village'].clearValidators()
      this.answerSurvey.controls['current_address_building'].clearValidators()
      this.answerSurvey.controls['current_address_sub_district'].clearValidators()
      this.answerSurvey.controls['current_address_district'].clearValidators()
      this.answerSurvey.controls['current_address_province'].clearValidators()
      this.answerSurvey.controls['current_address_country'].clearValidators()
      this.answerSurvey.controls['current_address_zip_code'].clearValidators()
      this.answerSurvey.controls['current_address_phone_number'].clearValidators()

      this.answerSurvey.controls['current_address_no'].disable();
      this.answerSurvey.controls['current_address_village'].disable();
      this.answerSurvey.controls['current_address_building'].disable();
      this.answerSurvey.controls['current_address_sub_district'].disable();
      this.answerSurvey.controls['current_address_district'].disable();
      this.answerSurvey.controls['current_address_province'].disable();
      this.answerSurvey.controls['current_address_country'].disable();
      this.answerSurvey.controls['current_address_zip_code'].disable();
      this.answerSurvey.controls['current_address_phone_number'].disable();

    }

    this.answerSurvey.controls['current_address_no'].updateValueAndValidity();
    this.answerSurvey.controls['current_address_village'].updateValueAndValidity();
    this.answerSurvey.controls['current_address_building'].updateValueAndValidity();
    this.answerSurvey.controls['current_address_sub_district'].updateValueAndValidity();
    this.answerSurvey.controls['current_address_district'].updateValueAndValidity();
    this.answerSurvey.controls['current_address_province'].updateValueAndValidity();
    this.answerSurvey.controls['current_address_country'].updateValueAndValidity();
    this.answerSurvey.controls['current_address_zip_code'].updateValueAndValidity();
    this.answerSurvey.controls['current_address_phone_number'].updateValueAndValidity();

    // current_address: ['', Validators.required],
    // current_address_no: ['', Validators.required],
    // current_address_village_no: [''],
    // current_address_village: ['', Validators.required],
    // current_address_building: ['', Validators.required],
    // current_address_floor: [''],
    // current_address_alley: [''],
    // current_address_road: [''],
    // current_address_sub_district: ['', Validators.required],
    // current_address_district: ['', Validators.required],
    // current_address_province: ['', Validators.required],
    // current_address_country: ['', Validators.required],
    // current_address_zip_code: ['', Validators.required],
    // current_address_phone_number: ['', Validators.required],
    // current_address_e_mail: ['', Validators.required],
  }

  onSave() {
    console.log("submit", this.answerSurvey)
  }

} // จบ class
