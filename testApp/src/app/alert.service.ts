import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from './api.service'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  currentDate = new Date();
  Items:any=false
  Customers:any=false
  isItemSycn = false
  isCustomerSync = false

  salesManName = ""
  suppID = ""
  date = "01-Jan-2000"

  items : any = []
  customers : any = []
  itemObj : any = {}
  customerObj : any = {}
  
  constructor(
    private _alertController: AlertController,
    private _apiService:ApiService
    ) { }

    cust(event) {
      if ( event.target.checked ) {
          this.Customers = true;
          console.log(this.Customers)
     }
    }

    item(event) {
      if ( event.target.checked ) {
          this.Items = true;
          console.log(this.Items)
     }
    }

  async emptyTextFieldMsg(_msg) {
    const alert = await this._alertController.create({
      header: 'Error',
      // subHeader: 'Subtitle',
      message: _msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async setSupplierSuccessMsg(status) {
    const alert = await this._alertController.create({
      header: 'Success',
      // subHeader: 'Subtitle',
      message: status,
      buttons: ['OK']
    });

    await alert.present();
  }

  async setSupplierErrorMsg(status) {
    const alert = await this._alertController.create({
      header: 'Error',
      // subHeader: 'Subtitle',
      message: status,
      buttons: ['OK']
    });
    await alert.present();
  }

  async popUp() {
    const alert = await this._alertController.create({
      header: 'Sync Data Now',
      message: `<ion-list>
                  <ion-item>
                    <ion-label>Item</ion-label>
                    <ion-checkbox (change)="cust($event)"></ion-checkbox>
                  </ion-item>
                  <ion-item>
                    <ion-label>Customer</ion-label>
                    <ion-checkbox [{}]></ion-checkbox>
                  </ion-item>
                </ion-list>
      `,
      buttons: [
        {
          text: 'Sync Data',
          cssClass: 'secondary',
          handler: () => {
            this.startSync()
            // var a = 10
            // console.log('Confirm Ok',a);
          }
        }
      ]
    });
    await alert.present();
  }
  startSync(){
    // let selectedOption : any = {}
    // this.checkBoxVal.filter(ele=>{
    //   if(ele.isChecked == true){
    //     selectedOption = ele
    //     if(selectedOption.val == "Items"){
    //       this.getItems()
    //       console.log("getItems")
          
    //       ele.isChecked = false
    //     } else if(selectedOption.val == "Customers"){
    //       this.getCustomers()
    //       console.log("getCusomters")
          
    //       ele.isChecked = false
    //     }
    //   } else {
    //     this.emptyTextFieldMsg("Please select atleast one option to start sync process");
    //   } 
    // })
  }

  getItems(){
    // this._apiService.getItems(this.suppID,this.date)
    //   .subscribe(
    //     res=>{
    //       this.itemObj = res;
    //       this.items = this.itemObj.getitemsResult
    //       // this.items.forEach(item => {
    //       //   console.log(item.Name)
    //       // })
    //       this.setSupplierSuccessMsg("Items sync successfully.")
                    
    //     },
    //     err=>{
    //       this.setSupplierErrorMsg(err.message)
    //     }
    //   )
  }

  getCustomers(){
    // this._apiService.getCustomerInfo(this.suppID,this.date)
    //   .subscribe(
    //     res=>{
    //       this.customerObj = res;
    //       this.customers = this.customerObj.getcustomersResult
    //       // this.customers.forEach(customer => {
    //       //   console.log(customer.Name)
    //       // })
    //       this.setSupplierSuccessMsg("Customers sync successfully.")
          
    //     },
    //     err=>{
    //       this.setSupplierErrorMsg(err.message)
    //     }
    //   )
  }
}
