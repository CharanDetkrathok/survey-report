import { Component, OnInit } from '@angular/core';
import { SignInService } from 'src/app/services/sign-in.service';
import { BechelorThaiService } from '../../services/bechelor-thai.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { messagesDialog } from 'src/app/disclosure-dialog/disclosure-dialog-interface';
import { DisclosureDialogComponent, DisclosureDialogModel } from '../../disclosure-dialog/disclosure-dialog.component';


@Component({
  selector: 'app-bachelor-thai',
  templateUrl: './bachelor-thai.component.html',
  styleUrls: ['./bachelor-thai.component.css']
})
export class BachelorThaiComponent implements OnInit {

  constructor(
    private http: BechelorThaiService,
    public dialog: MatDialog,
    private signInServices: SignInService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (localStorage.getItem('isDisclosure') != 'true') {
      this.getDisclosure();
    }

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

}
