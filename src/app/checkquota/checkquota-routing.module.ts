import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckquotaPage } from './checkquota.page';

const routes: Routes = [
  {
    path: '',
    component: CheckquotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckquotaPageRoutingModule {}
