import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SyspulicizePage } from './syspulicize.page';

const routes: Routes = [
  {
    path: '',
    component: SyspulicizePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyspulicizePageRoutingModule {}
