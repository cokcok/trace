import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckquotaPageRoutingModule } from './checkquota-routing.module';
import { CheckquotaPage } from './checkquota.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckquotaPageRoutingModule,ReactiveFormsModule,IonicSelectableModule,Ng2SearchPipeModule
  ],
  declarations: [CheckquotaPage]
})
export class CheckquotaPageModule {}
