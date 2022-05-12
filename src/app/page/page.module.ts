import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';

import { UtilModule } from '../page/util/util.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InitiateComponent } from './initiate/initiate.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    InitiateComponent
  ],
  imports: [
    CommonModule,
    UtilModule,
    ReactiveFormsModule,
    FormsModule,
    ExcelExportModule
  ]
})
export class PageModule { }
