import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Trac105Page } from './trac105.page';

const routes: Routes = [
  {
    path: '',
    component: Trac105Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Trac105PageRoutingModule {}
