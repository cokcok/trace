import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SysgroupPage } from './sysgroup.page';

const routes: Routes = [
  {
    path: '',
    component: SysgroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysgroupPageRoutingModule {}
