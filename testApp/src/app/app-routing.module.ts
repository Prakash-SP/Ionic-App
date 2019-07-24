import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',redirectTo: 'set-supplier',pathMatch: 'full'},
  {path: 'home',loadChildren: './home/home.module#HomePageModule'},
  {path: 'list',loadChildren: './list/list.module#ListPageModule'},
  {path: 'set-supplier', loadChildren: './set-supplier/set-supplier.module#SetSupplierPageModule'},
  { path: 'sm-login', loadChildren: './sm-login/sm-login.module#SmLoginPageModule' },
  { path: 'modal', loadChildren: './modal/modal.module#ModalPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
