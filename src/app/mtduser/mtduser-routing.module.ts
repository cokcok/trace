import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MtduserPage } from './mtduser.page';

const routes: Routes = [
  {
    path: '',
    component: MtduserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MtduserPageRoutingModule {}
