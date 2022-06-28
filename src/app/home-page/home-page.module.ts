import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignInStaffComponent } from '../sign-in/sign-in-staff/sign-in-staff.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInStudentComponent } from '../sign-in/sign-in-student/sign-in-student.component';
import { MaterialsModule } from '../materials/materials.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { OAuthModule } from 'angular-oauth2-oidc'



@NgModule({
  declarations: [
    HomePageComponent,
    SignInComponent, 
    SignInStaffComponent, 
    SignInStudentComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    MaterialsModule,
    MatDatepickerModule
  ]
})
export class HomePageModule { }
