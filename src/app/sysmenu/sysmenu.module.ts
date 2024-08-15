import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SysmenuPageRoutingModule } from './sysmenu-routing.module';
import { SysmenuPage } from './sysmenu.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SysmenuPageRoutingModule,ReactiveFormsModule,Ng2SearchPipeModule
  ],
  declarations: [SysmenuPage]
})
export class SysmenuPageModule {}
