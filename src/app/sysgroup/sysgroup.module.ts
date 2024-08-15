import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SysgroupPageRoutingModule } from './sysgroup-routing.module';
import { SysgroupPage } from './sysgroup.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SysgroupPageRoutingModule,ReactiveFormsModule,Ng2SearchPipeModule
  ],
  declarations: [SysgroupPage]
})
export class SysgroupPageModule {}
