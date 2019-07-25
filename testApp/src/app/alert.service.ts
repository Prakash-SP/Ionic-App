import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from './api.service'
import { from } from 'rxjs';
import { element } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  currentDate = new Date();
  
  toSync=["Customers","Items"]
  isItemSycn = false
  isCustomerSync = false

  salesManName = localStorage.getItem('SalesManName')
  suppID = localStorage.getItem('lSupp')
  date = "01-Jan-2000"

  itemObj : any = {}
  customerObj : any = {}
  
  constructor(
    private _alertController: AlertController,
    private _apiService:ApiService
    ) { }

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
      header: 'Checkbox',
      inputs: [
        {
          name: 'Items',
          type: 'checkbox',
          label: 'Items',
          value: 'Items',
        },

        {
          name: 'Customers',
          type: 'checkbox',
          label: 'Customers',
          value: 'Customers',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ok',
        }
      ]
    });
    await alert.present();
    let result =await alert.onDidDismiss();
    console.log(result)

    let a=result.data.values
    this.startSync(a)
  }

  startSync(data){
    let selectedOption : any = {}
    
    if(data.length){
      for(let i=0; i<data.length;i++){
        if(data[i] == 'Items'){
          this.getItems()
        } else if(data[i] == 'Customers'){
          this.getCustomers()
        }
      }
    }
  }

  items : any = []
  getItems(){
    this._apiService.getItems(this.suppID,this.date)
      .subscribe(
        res=>{
          this.itemObj = res;
          this.items = this.itemObj.getitemsResult
          this.items.forEach(item => {
            console.log(item.Name)
          })
          this.setSupplierSuccessMsg("Items sync successfully.")
                    
        },
        err=>{
          this.setSupplierErrorMsg(err.message)
        }
      )
  }

  customers : any = []
  getCustomers(){
    this._apiService.getCustomerInfo(this.suppID,this.date)
      .subscribe(
        res=>{
          this.customerObj = res;
          this.customers = this.customerObj.getcustomersResult
          this.customers.forEach(customer => {
            console.log(customer.Name)
          })
          this.setSupplierSuccessMsg("Customers sync successfully.")
          
        },
        err=>{
          this.setSupplierErrorMsg(err.message)
        }
      )
  }
}
