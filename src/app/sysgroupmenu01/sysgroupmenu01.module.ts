import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Sysgroupmenu01PageRoutingModule } from './sysgroupmenu01-routing.module';
import { Sysgroupmenu01Page } from './sysgroupmenu01.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Sysgroupmenu01PageRoutingModule,ReactiveFormsModule,Ng2SearchPipeModule,IonicSelectableModule
  ],
  declarations: [Sysgroupmenu01Page]
})
export class Sysgroupmenu01PageModule {}
