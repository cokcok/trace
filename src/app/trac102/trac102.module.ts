import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Trac102PageRoutingModule } from './trac102-routing.module';
import { Trac102Page } from './trac102.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    Trac102PageRoutingModule,Ng2SearchPipeModule
  ],
  declarations: [Trac102Page]
})
export class Trac102PageModule {}
