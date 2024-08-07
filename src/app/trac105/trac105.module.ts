import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Trac105PageRoutingModule } from './trac105-routing.module';

import { Trac105Page } from './trac105.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Trac105PageRoutingModule
  ],
  declarations: [Trac105Page]
})
export class Trac105PageModule {}
