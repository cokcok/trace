import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChpassPage } from './chpass.page';

const routes: Routes = [
  {
    path: '',
    component: ChpassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChpassPageRoutingModule {}
