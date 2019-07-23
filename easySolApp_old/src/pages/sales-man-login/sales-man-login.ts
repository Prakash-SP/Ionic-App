import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the SalesManLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-man-login',
  templateUrl: 'sales-man-login.html',
})
export class SalesManLoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesManLoginPage');
  }
  salesManLogin(){
    alert("SalesMan Login")
  }
  // resetSupplier(){
  //   alert("Reset")
  // }
  

}
