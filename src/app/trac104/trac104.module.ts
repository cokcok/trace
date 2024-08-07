import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Trac104PageRoutingModule } from './trac104-routing.module';

import { Trac104Page } from './trac104.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Trac104PageRoutingModule
  ],
  declarations: [Trac104Page]
})
export class Trac104PageModule {}
