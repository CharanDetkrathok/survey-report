import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { BachelorThaiComponent } from './bachelor-thai/bachelor-thai.component';
import { BachelorEngComponent } from './bachelor-eng/bachelor-eng.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BachelorThaiComponent, BachelorEngComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ]
  
})
export class StudentModule { }
