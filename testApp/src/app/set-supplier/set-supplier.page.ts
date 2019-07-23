import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-set-supplier',
  templateUrl: './set-supplier.page.html',
  styleUrls: ['./set-supplier.page.scss'],
})
export class SetSupplierPage implements OnInit {

  supplier :any = {
    userId : "",
    password : ""
  }
  supplierResponse : any = []

  constructor(
    public menuCtrl: MenuController,
    private _apiSer : ApiService,
    private _router : Router,
    private _alertService: AlertService
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    if(localStorage.getItem('lSupp') && localStorage.getItem('SuppName') && localStorage.getItem('SalesManName'))
    {
      this._router.navigate(['/home']);
    }
    else if(localStorage.getItem('lSupp') && localStorage.getItem('SuppName'))
    {
      this._router.navigate(['/sm-login']);
    }
    else
    {
      this._router.navigate(['/set-supplier']);
    }
  }

  setSupplier(){
    this.supplier.password = parseInt(this.supplier.password)

    if(this.supplier.userId == ""  || this.supplier.password == ""){
      this._alertService.emptyTextFieldMsg("Supplier ID and Password is blank.");
      this.reset();
    } else if(isNaN(this.supplier.password)) {
      this._alertService.emptyTextFieldMsg("Incorrect Password");
      this.supplier.password="";
    } 
    else {
      this._apiSer.setSupplier(this.supplier.userId, this.supplier.password)
      .subscribe(
        res => {
          this.supplierResponse = res;
          if(this.supplierResponse.LoginResult.SuppName != ""){
            localStorage.setItem('lSupp',this.supplier.userId);
            localStorage.setItem('SuppName',this.supplierResponse.LoginResult.SuppName)
            //console.log("Login Successful")
            this._router.navigate(['/sm-login'])
            this.reset()
          } else {
            this._alertService.setSupplierErrorMsg(this.supplierResponse.LoginResult.Status)
            this.reset();
          }
        },
        err => {
          this._alertService.setSupplierErrorMsg(err.message)
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
