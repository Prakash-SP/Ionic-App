import { Component } from '@angular/core';
import { NavController, ToastController, ToastOptions } from 'ionic-angular';
import { salesSerservice } from '../../app/easySolServices/salesSer.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  supplier = {
    userId : "",
    password : ""
  }
  toastOptions: ToastOptions

  constructor(
    public navCtrl: NavController,
    public _toast: ToastController,
    private _saleSer : salesSerservice
    ) {}

  setSupplier(){
    if(this.supplier.userId == ""  && this.supplier.password == ""){
      this.toastOptions = {
        message : "User Id and Password cannot be left empty",
        duration: 3000,
        showCloseButton: true,
        position: "bottom"
      }
      this._toast.create(this.toastOptions).present()
    } else {
      this._saleSer.setSupplier(this.supplier.userId, this.supplier.password)
        .subscribe(
          res => {
            console.log("Response", res)
            this.toastOptions = {
              message : "Supplier ID set successfully.",
              duration: 3000,
              showCloseButton: true,
              position: "bottom"
            }
            this._toast.create(this.toastOptions).present()
            this.navCtrl.push('SalesManLoginPage')
            this.reset()
          },
          err => {
            this.toastOptions = {
              message :err.message,
              duration: 3000,
              showCloseButton: true,
              position: "bottom"
            }
            this._toast.create(this.toastOptions).present()
            console.log("Error",err)
          }
        )
      
    }
    
  }

  reset(){
    this.supplier = {
      userId : "",
      password : ""
    }
  }
}
