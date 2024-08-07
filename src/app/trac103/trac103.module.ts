import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Trac103PageRoutingModule } from './trac103-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Trac103Page } from './trac103.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Trac103PageRoutingModule,ReactiveFormsModule,TabsModule.forRoot(),
  ],
  declarations: [Trac103Page]
})
export class Trac103PageModule {}
