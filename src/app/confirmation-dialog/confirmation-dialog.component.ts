import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  title: string;
  message: string;
  description: string;
  descriptionDetail: string;
  btnLeftDisable: boolean;
  btnRightDisable: boolean;
  txtBtnLeft: string;
  txtBtnRight: string;
  btnLeftThaiDisable: boolean;
  btnRightEngDisable: boolean;
  messageThaiLanguage: string;
  messageEngLanguage: string;
  isSelectLanguageDisable:boolean;
  imgPath: string;

  isImgPath: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {

    this.title = data.title;
    this.imgPath = data.imgPath;
    this.message = data.message;
    this.description = data.description;
    this.descriptionDetail = data.descriptionDetail;
    this.btnLeftDisable = data.btnLeftDisable;
    this.btnRightDisable = data.btnRightDisable;
    this.txtBtnLeft = data.txtBtnLeft;
    this.txtBtnRight = data.txtBtnRight;
    this.messageThaiLanguage = data.messageThaiLanguage;
    this.messageEngLanguage = data.messageEngLanguage;
    this.isSelectLanguageDisable = data.isSelectLanguageDisable;

    this.isImgPath = this.imgPath.length === 0 ? false : true;

  }

  ngOnInit(): void { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  onSelectLanguage(language: string) {

    if (language === 'TH') {
      document.querySelector<HTMLButtonElement>('#languageEng').classList.remove('select-this');
      document.querySelector<HTMLButtonElement>('#languageTh').classList.add('select-this');
    } else {
      document.querySelector<HTMLButtonElement>('#languageTh').classList.remove('select-this');
      document.querySelector<HTMLButtonElement>('#languageEng').classList.add('select-this');
    }

    localStorage.setItem('LANGUAGE', language);
    
  }

}

export class ConfirmDialogModel {

  constructor(
    public title: string,
    public imgPath: string,
    public message: string,
    public description: string,
    public descriptionDetail: string,
    public btnLeftDisable: boolean,
    public btnRightDisable: boolean,
    public txtBtnLeft: string,
    public txtBtnRight: string,
    public messageThaiLanguage: string,
    public messageEngLanguage: string,
    public isSelectLanguageDisable: boolean
  ) { }
}
