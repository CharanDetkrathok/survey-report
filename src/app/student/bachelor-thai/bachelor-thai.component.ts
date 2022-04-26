import { Component, OnInit } from '@angular/core';
import { SignInService } from 'src/app/services/sign-in.service';
import { BechelorThaiService } from '../../services/bechelor-thai.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { messagesDialog } from 'src/app/disclosure-dialog/disclosure-dialog-interface';
import { DisclosureDialogComponent, DisclosureDialogModel } from '../../disclosure-dialog/disclosure-dialog.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NEVER, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { RegionalCenterResponse } from '../bachelor-interface';



@Component({
  selector: 'app-bachelor-thai',
  templateUrl: './bachelor-thai.component.html',
  styleUrls: ['./bachelor-thai.component.css']
})
export class BachelorThaiComponent implements OnInit {

  header = {};
  part = [];
  article = [];
  articleNoDistinct = [];

  semesters = ['ภาค - 1','ภาคซ่อม - 1','ภาค - 2','ภาคซ่อม - 2 หรือ ภาคซ่อม - ฤดูร้อน','ภาค - ฤดูร้อน']
  isSemesterSelected: boolean = false;

  regionalCenter: RegionalCenterResponse[] = [];
  onSearchRegionalCenter = new Subject<string>();
  isRegionalCenter: boolean = false;
  campusSelectedText: number = 0;
  isCampusSelected: boolean = false;

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

    // -------- ตอนที่ 1 ข้อ 2 ย่อย --------

    Prename_no: [this.signInServices.getStudent().StudentInfo.Prename_no],
    Prename_thai: [this.signInServices.getStudent().StudentInfo.Prename_thai],
    Prename_eng: [this.signInServices.getStudent().StudentInfo.Prename_eng],
    First_name_thai: [this.signInServices.getStudent().StudentInfo.First_name_thai],
    First_name_eng: [this.signInServices.getStudent().StudentInfo.First_name_eng],

    Last_name_thai: [this.signInServices.getStudent().StudentInfo.Last_name_thai],
    Last_name_eng: [this.signInServices.getStudent().StudentInfo.Last_name_eng],
    Birth_date: [this.signInServices.getStudent().StudentInfo.Birth_date],
    Age: [this.signInServices.getAge()],

  });

  get validating() { return this.answerSurvey.controls; }

  get validatingFormGroup() { return this.answerSurvey; }

  constructor(
    private http: BechelorThaiService,
    public dialog: MatDialog,
    private signInServices: SignInService,
    private router: Router,
    private formGroup: FormBuilder
  ) {

    this.onSearchRegionalCenter
      .pipe(
        debounceTime(300),
        switchMap(searchRegionalCenter => {
          return this.http.fetchRegionalCenter(searchRegionalCenter);
        })
      )
      .subscribe(regionalCenter => {
        this.regionalCenter = regionalCenter;
        if (this.regionalCenter.length > 0) {
          this.isRegionalCenter = true;
        } else {
          this.isRegionalCenter = false;
        }
      });

  }

  ngOnInit(): void {

    if (localStorage.getItem('isDisclosure') != 'true') {
      this.getDisclosure();
    }
    this.getHeaders();
    this.getPartsOfArticles();
    this.getArticlesNoDistinct();
    this.getArticlesAndChoices();
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
    });
  }

  private async getPartsOfArticles() {
    await this.http.fetchPartsOfArticles().subscribe(response => {

      this.part = response;

    });
  }

  private async getArticlesNoDistinct() {
    await this.http.fetchArticlesNoDistinct().subscribe(response => {

      this.articleNoDistinct = response

    });
  }

  private async getArticlesAndChoices() {
    await this.http.fetchArticlesAndChoices().subscribe(response => {

      this.article = response;
      console.log(this.article);
      this.article.forEach(article => {

        switch (article.ANSWER) {
          case "FACULTY":
            this.answerSurvey.addControl(article.ANSWER, new FormControl(this.answerSurvey.controls['Faculty_name_thai'].value, article.ANSWER_REQUIRED === "1" ? [Validators.required] : []));
            break;
          case "FIELD_OF_STUDY":
            this.answerSurvey.addControl(article.ANSWER, new FormControl(this.answerSurvey.controls['Major_name_thai'].value, article.ANSWER_REQUIRED === "1" ? [Validators.required] : []));
            break;
          default:
            this.answerSurvey.addControl(article.ANSWER, new FormControl('', article.ANSWER_REQUIRED === "1" ? [Validators.required] : []));
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

  keyInputGPA() {
    const gpa = document.querySelector<HTMLInputElement>('#GPA').value;

    if (gpa.charAt(0) >= '1' && gpa.charAt(0) <= '4') {

      if (gpa.charAt(0) == '4') {

        if (gpa.charAt(1) == '.') {
          if (gpa.charAt(2) == '0' && gpa.charAt(3) == '0') {

            this.answerSurvey.controls['GPA'].patchValue(gpa);

          }
        } else {

          this.answerSurvey.controls['GPA'].patchValue(gpa.substring(0, 1));

        }

      } else {
        if (gpa.charAt(1) == '.') {
          if (gpa.charAt(2) != '' && gpa.charAt(3) != '') {

            this.answerSurvey.controls['GPA'].patchValue(gpa);

          }
        } else {

          this.answerSurvey.controls['GPA'].patchValue(gpa.substring(0, 1));

        }
      }

    } else {
      this.answerSurvey.controls['GPA'].patchValue(null);
    }

    this.answerSurvey.controls['GPA'].updateValueAndValidity()
  }

  keyInputCAMPUS(searchRegionalCenter: string) {

    if (this.isCampusSelected) {

      if (this.campusSelectedText != searchRegionalCenter.length) {
        this.isCampusSelected = false;
        this.answerSurvey.controls['CAMPUS'].patchValue(null);
        this.answerSurvey.controls['CAMPUS'].updateValueAndValidity();

        document.querySelector<HTMLInputElement>('#search-regional-center').classList.add('search-regional-center-style');
      }

    } else {

      searchRegionalCenter = searchRegionalCenter.replace(/\s/g, "");
      if (searchRegionalCenter != "" && searchRegionalCenter.length > 3) {

        this.onSearchRegionalCenter.next(searchRegionalCenter);

      }
    }

  }

  onClickCampus(campus: string) {

    this.campusSelectedText = campus.length;
    this.isCampusSelected = true;
    this.onSearchRegionalCenter.next();
    this.answerSurvey.controls['CAMPUS'].patchValue(campus);
    this.answerSurvey.controls['CAMPUS'].updateValueAndValidity();

    document.querySelector<HTMLInputElement>('#search-regional-center').classList.remove('search-regional-center-style');

  }

  onSelectedSEMESTER(semester: string) {
    this.isSemesterSelected = true;
  }

  
  onClickSemester(semester: string) {
    this.isSemesterSelected = false;
    this.answerSurvey.controls['SEMESTER_OF_COMPLETION'].patchValue(semester);
    this.answerSurvey.controls['SEMESTER_OF_COMPLETION'].updateValueAndValidity();

  }

  onSave() {

    console.log("submit", this.answerSurvey.controls);

  }

} // จบ class
