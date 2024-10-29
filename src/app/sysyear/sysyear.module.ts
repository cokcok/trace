import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SysyearPageRoutingModule } from './sysyear-routing.module';

import { SysyearPage } from './sysyear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SysyearPageRoutingModule
  ],
  declarations: [SysyearPage]
})
export class SysyearPageModule {}
