import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Trac102Page } from './trac102.page';

const routes: Routes = [
  {
    path: '',
    component: Trac102Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Trac102PageRoutingModule {}
