import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SyspulicizePageRoutingModule } from './syspulicize-routing.module';
import { SyspulicizePage } from './syspulicize.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SyspulicizePageRoutingModule
  ],
  declarations: [SyspulicizePage]
})
export class SyspulicizePageModule {}
