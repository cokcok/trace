import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Trac301PageRoutingModule } from './trac301-routing.module';
import { Trac301Page } from './trac301.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Trac301PageRoutingModule,ReactiveFormsModule,Ng2SearchPipeModule,Ionic4DatepickerModule
  ],
  declarations: [Trac301Page]
})
export class Trac301PageModule {}
