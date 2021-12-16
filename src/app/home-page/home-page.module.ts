import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignInStaffComponent } from '../sign-in/sign-in-staff/sign-in-staff.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInStudentComponent } from '../sign-in/sign-in-student/sign-in-student.component';
import { StackedBarNDataComponent } from '../stacked-bar-n-data/stacked-bar-n-data.component';
import { MaterialsModule } from '../materials/materials.module';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [
    HomePageComponent,
    SignInComponent, 
    SignInStaffComponent, 
    SignInStudentComponent, 
    StackedBarNDataComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    MaterialsModule,
    MatDatepickerModule
  ]
})
export class HomePageModule { }
