import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-disclosure-dialog',
  templateUrl: './disclosure-dialog.component.html',
  styleUrls: ['./disclosure-dialog.component.css']
})
export class DisclosureDialogComponent implements OnInit {

  title: string;
  btnLeftDisable: boolean;
  btnRightDisable: boolean;
  txtBtnLeft: string;
  txtBtnRight: string;
  HEADER_1_TH: string;
  HEADER_2_TH: string;
  DETAIL_1_OF_HEADER_1_TH: string;
  DETAIL_2_OF_HEADER_1_TH: string;
  DETAIL_3_OF_HEADER_1_TH: string;
  DETAIL_1_OF_HEADER_2_TH: string;
  DETAIL_2_OF_HEADER_2_TH: string;
  DETAIL_3_OF_HEADER_2_TH: string;
  DETAIL_4_OF_HEADER_2_TH: string;
  DETAIL_5_OF_HEADER_2_TH: string;
  DETAIL_6_OF_HEADER_2_TH: string;
  DETAIL_7_OF_HEADER_2_TH: string;
  CONSENT_TO_DISCLOSURE_TH: string;
  HEADER_1_EN: string;
  HEADER_2_EN: string;
  DETAIL_1_OF_HEADER_1_EN: string;
  DETAIL_2_OF_HEADER_1_EN: string;
  DETAIL_3_OF_HEADER_1_EN: string;
  DETAIL_1_OF_HEADER_2_EN: string;
  DETAIL_2_OF_HEADER_2_EN: string;
  DETAIL_3_OF_HEADER_2_EN: string;
  DETAIL_4_OF_HEADER_2_EN: string;
  DETAIL_5_OF_HEADER_2_EN: string;
  DETAIL_6_OF_HEADER_2_EN: string;
  DETAIL_7_OF_HEADER_2_EN: string;
  CONSENT_TO_DISCLOSURE_EN: string;
  CONFIRM_TH: string;
  CONFIRM_EN: string;

  isConfirm: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DisclosureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DisclosureDialogModel) {

    this.title = data.title;
    this.btnLeftDisable = data.btnLeftDisable;
    this.btnRightDisable = data.btnRightDisable;
    this.txtBtnLeft = data.txtBtnLeft;
    this.txtBtnRight = data.txtBtnRight;
    this.HEADER_1_TH = data.HEADER_1_TH;
    this.HEADER_2_TH = data.HEADER_2_TH;
    this.DETAIL_1_OF_HEADER_1_TH = data.DETAIL_1_OF_HEADER_1_TH;
    this.DETAIL_2_OF_HEADER_1_TH = data.DETAIL_2_OF_HEADER_1_TH;
    this.DETAIL_3_OF_HEADER_1_TH = data.DETAIL_3_OF_HEADER_1_TH;
    this.DETAIL_1_OF_HEADER_2_TH = data.DETAIL_1_OF_HEADER_2_TH;
    this.DETAIL_2_OF_HEADER_2_TH = data.DETAIL_2_OF_HEADER_2_TH;
    this.DETAIL_3_OF_HEADER_2_TH = data.DETAIL_3_OF_HEADER_2_TH;
    this.DETAIL_4_OF_HEADER_2_TH = data.DETAIL_4_OF_HEADER_2_TH;
    this.DETAIL_5_OF_HEADER_2_TH = data.DETAIL_5_OF_HEADER_2_TH;
    this.DETAIL_6_OF_HEADER_2_TH = data.DETAIL_6_OF_HEADER_2_TH;
    this.DETAIL_7_OF_HEADER_2_TH = data.DETAIL_7_OF_HEADER_2_TH;
    this.CONSENT_TO_DISCLOSURE_TH = data.CONSENT_TO_DISCLOSURE_TH;
    this.HEADER_1_EN = data.HEADER_1_EN;
    this.HEADER_2_EN = data.HEADER_2_EN;
    this.DETAIL_1_OF_HEADER_1_EN = data.DETAIL_1_OF_HEADER_1_EN;
    this.DETAIL_2_OF_HEADER_1_EN = data.DETAIL_2_OF_HEADER_1_EN;
    this.DETAIL_3_OF_HEADER_1_EN = data.DETAIL_3_OF_HEADER_1_EN;
    this.DETAIL_1_OF_HEADER_2_EN = data.DETAIL_1_OF_HEADER_2_EN;
    this.DETAIL_2_OF_HEADER_2_EN = data.DETAIL_2_OF_HEADER_2_EN;
    this.DETAIL_3_OF_HEADER_2_EN = data.DETAIL_3_OF_HEADER_2_EN;
    this.DETAIL_4_OF_HEADER_2_EN = data.DETAIL_4_OF_HEADER_2_EN;
    this.DETAIL_5_OF_HEADER_2_EN = data.DETAIL_5_OF_HEADER_2_EN;
    this.DETAIL_6_OF_HEADER_2_EN = data.DETAIL_6_OF_HEADER_2_EN;
    this.DETAIL_7_OF_HEADER_2_EN = data.DETAIL_7_OF_HEADER_2_EN;
    this.CONSENT_TO_DISCLOSURE_EN = data.CONSENT_TO_DISCLOSURE_EN;
    this.CONFIRM_TH = data.CONFIRM_TH;
    this.CONFIRM_EN = data.CONFIRM_EN;
  }

  ngOnInit(): void {

    if (this.isConfirm === false) {
      document.querySelector<HTMLButtonElement>('#btn_ok').classList.add("disclosure-btn-ok-is-Confirm");
      document.querySelector<HTMLButtonElement>('#btn_ok').classList.remove("disclosure-btn-ok");
    }

    document.querySelector('#title').innerHTML = `${this.title}`;

    if (localStorage.getItem('LANGUAGE') === "TH") {
      document.querySelector('#HEADER_1').innerHTML = `${this.HEADER_1_TH}`;
      document.querySelector('#HEADER_2').innerHTML = `${this.HEADER_2_TH}`;
      document.querySelector('#DETAIL_1_OF_HEADER_1').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_1_OF_HEADER_1_TH}`;
      document.querySelector('#DETAIL_2_OF_HEADER_1').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_2_OF_HEADER_1_TH}`;
      document.querySelector('#DETAIL_3_OF_HEADER_1').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_3_OF_HEADER_1_TH}`;
      document.querySelector('#DETAIL_1_OF_HEADER_2').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_1_OF_HEADER_2_TH}`;
      document.querySelector('#DETAIL_2_OF_HEADER_2').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_2_OF_HEADER_2_TH}`;
      document.querySelector('#DETAIL_3_OF_HEADER_2').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_3_OF_HEADER_2_TH}`;
      document.querySelector('#DETAIL_4_OF_HEADER_2').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_4_OF_HEADER_2_TH}`;
      document.querySelector('#DETAIL_5_OF_HEADER_2').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_5_OF_HEADER_2_TH}`;
      document.querySelector('#DETAIL_6_OF_HEADER_2').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_6_OF_HEADER_2_TH}`;
      document.querySelector('#DETAIL_7_OF_HEADER_2').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_7_OF_HEADER_2_TH}`;
      document.querySelector('#CONSENT_TO_DISCLOSURE').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.CONSENT_TO_DISCLOSURE_TH}`;
      document.querySelector('#CONFIRM').innerHTML = `&nbsp;&nbsp;${this.CONFIRM_TH}`;
    } else {

      document.querySelector('#HEADER_1').innerHTML = `${this.HEADER_1_EN}`;
      document.querySelector('#HEADER_2').innerHTML = `${this.HEADER_2_EN}`;
      document.querySelector('#DETAIL_1_OF_HEADER_1').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_1_OF_HEADER_1_EN}`;
      document.querySelector('#DETAIL_2_OF_HEADER_1').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_2_OF_HEADER_1_EN}`;
      document.querySelector('#DETAIL_3_OF_HEADER_1').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_3_OF_HEADER_1_EN}`;
      document.querySelector('#DETAIL_1_OF_HEADER_2').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_1_OF_HEADER_2_EN}`;
      document.querySelector('#DETAIL_2_OF_HEADER_2').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_2_OF_HEADER_2_EN}`;
      document.querySelector('#DETAIL_3_OF_HEADER_2').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_3_OF_HEADER_2_EN}`;
      document.querySelector('#DETAIL_4_OF_HEADER_2').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_4_OF_HEADER_2_EN}`;
      document.querySelector('#DETAIL_5_OF_HEADER_2').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_5_OF_HEADER_2_EN}`;
      document.querySelector('#DETAIL_6_OF_HEADER_2').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_6_OF_HEADER_2_EN}`;
      document.querySelector('#DETAIL_7_OF_HEADER_2').innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; ${this.DETAIL_7_OF_HEADER_2_EN}`;
      document.querySelector('#CONSENT_TO_DISCLOSURE').innerHTML = `${this.CONSENT_TO_DISCLOSURE_EN}`;
      document.querySelector('#CONFIRM').innerHTML = `&nbsp;&nbsp;${this.CONFIRM_EN}`;

    }

  }

  checkConfirm() {
    if (this.isConfirm === true) {
      this.isConfirm = false;
      document.querySelector<HTMLInputElement>('#check_confirm').checked = false;
      document.querySelector<HTMLButtonElement>('#btn_ok').classList.add("disclosure-btn-ok-is-Confirm");
      document.querySelector<HTMLButtonElement>('#btn_ok').classList.remove("disclosure-btn-ok");
    } else {
      this.isConfirm = true;
      document.querySelector<HTMLInputElement>('#check_confirm').checked = true;
      document.querySelector<HTMLButtonElement>('#btn_ok').classList.remove("disclosure-btn-ok-is-Confirm");
      document.querySelector<HTMLButtonElement>('#btn_ok').classList.add("disclosure-btn-ok");      
    }

  }

  onConfirm(): void {
    if(this.isConfirm) {
      this.dialogRef.close(true);
    }    
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

}

export class DisclosureDialogModel {

  constructor(
    public title: string,
    public btnLeftDisable: boolean,
    public btnRightDisable: boolean,
    public txtBtnLeft: string,
    public txtBtnRight: string,
    public HEADER_1_TH: string,
    public HEADER_2_TH: string,
    public DETAIL_1_OF_HEADER_1_TH: string,
    public DETAIL_2_OF_HEADER_1_TH: string,
    public DETAIL_3_OF_HEADER_1_TH: string,
    public DETAIL_1_OF_HEADER_2_TH: string,
    public DETAIL_2_OF_HEADER_2_TH: string,
    public DETAIL_3_OF_HEADER_2_TH: string,
    public DETAIL_4_OF_HEADER_2_TH: string,
    public DETAIL_5_OF_HEADER_2_TH: string,
    public DETAIL_6_OF_HEADER_2_TH: string,
    public DETAIL_7_OF_HEADER_2_TH: string,
    public CONSENT_TO_DISCLOSURE_TH: string,
    public HEADER_1_EN: string,
    public HEADER_2_EN: string,
    public DETAIL_1_OF_HEADER_1_EN: string,
    public DETAIL_2_OF_HEADER_1_EN: string,
    public DETAIL_3_OF_HEADER_1_EN: string,
    public DETAIL_1_OF_HEADER_2_EN: string,
    public DETAIL_2_OF_HEADER_2_EN: string,
    public DETAIL_3_OF_HEADER_2_EN: string,
    public DETAIL_4_OF_HEADER_2_EN: string,
    public DETAIL_5_OF_HEADER_2_EN: string,
    public DETAIL_6_OF_HEADER_2_EN: string,
    public DETAIL_7_OF_HEADER_2_EN: string,
    public CONSENT_TO_DISCLOSURE_EN: string,
    public CONFIRM_TH: string,
    public CONFIRM_EN: string,
  ) { }
}
