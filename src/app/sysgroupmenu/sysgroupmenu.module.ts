import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SysgroupmenuPageRoutingModule } from './sysgroupmenu-routing.module';
import { SysgroupmenuPage } from './sysgroupmenu.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SysgroupmenuPageRoutingModule,Ng2SearchPipeModule
  ],
  declarations: [SysgroupmenuPage]
})
export class SysgroupmenuPageModule {}
