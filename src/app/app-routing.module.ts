import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'rwa01',
    loadChildren: () => import('./rwa01/rwa01.module').then( m => m.Rwa01PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'trac101',
    loadChildren: () => import('./trac101/trac101.module').then( m => m.Trac101PageModule)
  },
  {
    path: 'trac102', //:trace1_data
    loadChildren: () => import('./trac102/trac102.module').then( m => m.Trac102PageModule)
  },  {
    path: 'trac103',
    loadChildren: () => import('./trac103/trac103.module').then( m => m.Trac103PageModule)
  },
  {
    path: 'trac104',
    loadChildren: () => import('./trac104/trac104.module').then( m => m.Trac104PageModule)
  },
  {
    path: 'trac105',
    loadChildren: () => import('./trac105/trac105.module').then( m => m.Trac105PageModule)
  },
  {
    path: 'sysmenu',
    loadChildren: () => import('./sysmenu/sysmenu.module').then( m => m.SysmenuPageModule)
  },
  {
    path: 'syssubmenu',
    loadChildren: () => import('./syssubmenu/syssubmenu.module').then( m => m.SyssubmenuPageModule)
  },
  {
    path: 'sysgroup',
    loadChildren: () => import('./sysgroup/sysgroup.module').then( m => m.SysgroupPageModule)
  },
  {
    path: 'sysgroupmenu',
    loadChildren: () => import('./sysgroupmenu/sysgroupmenu.module').then( m => m.SysgroupmenuPageModule)
  },
  {
    path: 'mtduser',
    loadChildren: () => import('./mtduser/mtduser.module').then( m => m.MtduserPageModule)
  },
  {
    path: 'sysgroupmenu01',
    loadChildren: () => import('./sysgroupmenu01/sysgroupmenu01.module').then( m => m.Sysgroupmenu01PageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
