import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sm-login',
  templateUrl: './sm-login.page.html',
  styleUrls: ['./sm-login.page.scss'],
})
export class SmLoginPage implements OnInit {

  supplierName = ""
  supID = ""
  salesMan = {
    lSuppName : "",
    UserId : "",
    Password : ""
  }

  salesManLoginResponse : any = []

  constructor(
    public menuCtrl: MenuController,
    private _router : Router,
    private _alertService : AlertService,
    private _apiSer: ApiService
  ) { }

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
    this.supplierName = localStorage.getItem("SuppName")
    this.supID = localStorage.getItem("lSupp")
  }

  salesManLogin(){
    this.salesMan.lSuppName = this.supID
    if(this.salesMan.UserId == null  || this.salesMan.Password == ""){
      this._alertService.emptyTextFieldMsg("Sales man id and passord is empty");
    } 
    else {
      this._apiSer.loginSalesMan(this.salesMan.lSuppName, this.salesMan.UserId, this.salesMan.Password)
      .subscribe(
        res => {
          this.salesManLoginResponse = res;
          if(this.salesManLoginResponse.SuppLoginResult != ""){
            localStorage.setItem('SalesManName',this.salesManLoginResponse.SuppLoginResult)
            this.reset()
            //console.log("SalesmanLogin Successful");
            this._router.navigate(['/home'])
          } else {
            this._alertService.setSupplierErrorMsg("Sales ID and Password is incorrect")
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
    this.salesMan = {
      lSuppName : this.supplierName,
      UserId : "",
      Password : ""
    }
  }

  resetSupplier(){
    localStorage.clear();
    this._router.navigate(['/set-supplier'])
  }

}
