import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialsModule } from '../materials/materials.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
