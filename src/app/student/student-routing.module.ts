import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BachelorThaiComponent } from './bachelor-thai/bachelor-thai.component';
import { BachelorEngComponent } from './bachelor-eng/bachelor-eng.component';
import { routes } from './student-routes';



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
