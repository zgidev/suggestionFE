import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NavHeaderComponent } from './nav-header/nav-header.component';
import { MaterialModule } from './material/material.module';
import { ViewModalComponent } from './view-modal/view-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    NavHeaderComponent,
    ViewModalComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NavHeaderComponent,
    ViewModalComponent,
    SidebarComponent
  ]
})
export class UtilModule { }
