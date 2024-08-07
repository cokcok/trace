import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Trac101PageRoutingModule } from './trac101-routing.module';
import { Trac101Page } from './trac101.page';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Trac101PageRoutingModule,ReactiveFormsModule, TabsModule.forRoot(),AutoCompleteModule,
    IonicSelectableModule
  ],
  declarations: [Trac101Page]
})
export class Trac101PageModule {}
