import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesManLoginPage } from './sales-man-login';

@NgModule({
  declarations: [
    SalesManLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesManLoginPage),
  ],
})
export class SalesManLoginPageModule {}
