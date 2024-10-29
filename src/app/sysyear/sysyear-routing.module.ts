import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SysyearPage } from './sysyear.page';

const routes: Routes = [
  {
    path: '',
    component: SysyearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysyearPageRoutingModule {}
