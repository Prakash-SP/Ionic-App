import { Component } from '@angular/core';
import { MenuController,ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalPage } from '../modal/modal.page';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  smName = "";
  suppID = "";
  date = "01-Jan-2000";

  items : any = []
  customers : any = []
  itemObj : any = {}
  customerObj : any = {}
  constructor(
    public modalController: ModalController,
    public menuCtrl: MenuController,
    private _router : Router,
    private _alertSer : AlertService
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
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
    setTimeout(()=>{
    this.smName=localStorage.getItem('SalesManName')
    this.suppID = localStorage.getItem('lSupp')
    },3000)

    // this.getItems()
    // this.getCustomers()
  }

  syncData(){
    alert("Sync Start")

  }
  logout(){
    localStorage.removeItem('SalesManName');
    this._router.navigate(['/sm-login']);
  }

  presentModal() {
    this._alertSer.popUp()
  }
}
