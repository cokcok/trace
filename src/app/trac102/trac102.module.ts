import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Trac102PageRoutingModule } from './trac102-routing.module';

import { Trac102Page } from './trac102.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Trac102PageRoutingModule
  ],
  declarations: [Trac102Page]
})
export class Trac102PageModule {}
