import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { BachelorThaiComponent } from './bachelor-thai/bachelor-thai.component';
import { BachelorEngComponent } from './bachelor-eng/bachelor-eng.component';


@NgModule({
  declarations: [BachelorThaiComponent, BachelorEngComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
  
})
export class StudentModule { }
