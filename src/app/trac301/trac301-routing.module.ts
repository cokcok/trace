import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Trac301Page } from './trac301.page';

const routes: Routes = [
  {
    path: '',
    component: Trac301Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Trac301PageRoutingModule {}
