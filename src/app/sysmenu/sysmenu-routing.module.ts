import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SysmenuPage } from './sysmenu.page';

const routes: Routes = [
  {
    path: '',
    component: SysmenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysmenuPageRoutingModule {}
