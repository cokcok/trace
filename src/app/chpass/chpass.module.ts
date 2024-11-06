import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChpassPageRoutingModule } from './chpass-routing.module';
import { ChpassPage } from './chpass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChpassPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [ChpassPage]
})
export class ChpassPageModule {}
