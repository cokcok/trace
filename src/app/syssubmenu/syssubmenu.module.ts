import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SyssubmenuPageRoutingModule } from './syssubmenu-routing.module';
import { SyssubmenuPage } from './syssubmenu.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SyssubmenuPageRoutingModule,ReactiveFormsModule,
    Ng2SearchPipeModule,IonicSelectableModule
  ],
  declarations: [SyssubmenuPage]
})
export class SyssubmenuPageModule {}
