import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Trac104Page } from './trac104.page';

const routes: Routes = [
  {
    path: '',
    component: Trac104Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Trac104PageRoutingModule {}
