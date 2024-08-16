import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MtduserPageRoutingModule } from './mtduser-routing.module';
import { MtduserPage } from './mtduser.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MtduserPageRoutingModule,ReactiveFormsModule,Ng2SearchPipeModule,IonicSelectableModule
  ],
  declarations: [MtduserPage]
})
export class MtduserPageModule {}
