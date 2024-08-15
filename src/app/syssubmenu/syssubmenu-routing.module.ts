import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SyssubmenuPage } from './syssubmenu.page';

const routes: Routes = [
  {
    path: '',
    component: SyssubmenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyssubmenuPageRoutingModule {}
