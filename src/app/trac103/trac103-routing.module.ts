import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Trac103Page } from './trac103.page';

const routes: Routes = [
  {
    path: '',
    component: Trac103Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Trac103PageRoutingModule {}
