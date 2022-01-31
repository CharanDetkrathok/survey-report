import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationDialogRoutingModule } from './disclosure-dialog-routing.module';
import { ConfirmationDialogComponent } from './disclosure-dialog.component';


@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    ConfirmationDialogRoutingModule
  ]
})
export class ConfirmationDialogModule { }
