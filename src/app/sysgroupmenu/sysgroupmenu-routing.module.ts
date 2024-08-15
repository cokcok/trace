import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SysgroupmenuPage } from './sysgroupmenu.page';

const routes: Routes = [
  {
    path: '',
    component: SysgroupmenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysgroupmenuPageRoutingModule {}
