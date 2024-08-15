import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Sysgroupmenu01Page } from './sysgroupmenu01.page';

const routes: Routes = [
  {
    path: '',
    component: Sysgroupmenu01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Sysgroupmenu01PageRoutingModule {}
