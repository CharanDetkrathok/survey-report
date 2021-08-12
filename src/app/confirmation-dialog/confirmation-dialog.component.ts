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


  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {

    this.title = data.title;
    this.message = data.message;
    this.description = data.description;
    this.descriptionDetail = data.descriptionDetail;
    this.btnLeftDisable = data.btnLeftDisable;
    this.btnRightDisable = data.btnRightDisable;
    this.txtBtnLeft = data.txtBtnLeft;
    this.txtBtnRight = data.txtBtnRight;

  }

  ngOnInit(): void { }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 **/
export class ConfirmDialogModel {

  constructor(
    public title: string,
    public message: string,
    public description: string,
    public descriptionDetail: string,
    public btnLeftDisable: boolean,
    public btnRightDisable: boolean,
    public txtBtnLeft: string,
    public txtBtnRight: string,
  ) { }
}
