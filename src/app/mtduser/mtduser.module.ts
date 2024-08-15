import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MtduserPageRoutingModule } from './mtduser-routing.module';

import { MtduserPage } from './mtduser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MtduserPageRoutingModule
  ],
  declarations: [MtduserPage]
})
export class MtduserPageModule {}
