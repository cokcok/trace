import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Trac101Page } from './trac101.page';

const routes: Routes = [
  {
    path: '',
    component: Trac101Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Trac101PageRoutingModule {}
