import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Trac105PageRoutingModule } from './trac105-routing.module';
import { Trac105Page } from './trac105.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Trac105PageRoutingModule,Ng2SearchPipeModule,ReactiveFormsModule,IonicSelectableModule
  ],
  declarations: [Trac105Page]
})
export class Trac105PageModule {}
