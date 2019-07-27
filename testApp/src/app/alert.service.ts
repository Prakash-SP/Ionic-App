import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from './api.service'
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  currentDate = new Date();
  
  toSync=["Customers","Items"]

  forMessage=['']
  option=""
  chk = -1
  spinnerFlag=0
  resultValues:any=""

  salesManName = localStorage.getItem('SalesManName')
  suppID = localStorage.getItem('lSupp')
  date = "01-Jan-2000"

  items : any = []
  itemObj : any = {}
  customers : any = []
  customerObj : any = {}
  
  constructor(
    private _alertController: AlertController,
    private _apiService:ApiService,
    private loadingController : LoadingController
  ) { }


    async syncInProgress() {
      this.spinnerFlag=this.spinnerFlag+1
      if(this.resultValues.length==this.spinnerFlag){
        this.spinnerFlag=0
        const loading = await this.loadingController.create({
        spinner: "circles",
        message: 'Sync In Progress...',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
      return await loading.present();
      }
    }

    hideLoader() {
      this.chk=this.chk+1
      if(this.forMessage.length==this.chk+1)
      {
        this.option=""
        for(let i=0;i<this.forMessage.length;i++)
        {
          this.option=this.option+this.forMessage[i];
          this.option=this.option+" "
        }
        this.loadingController.dismiss();
        this.setSupplierSuccessMsg(this.option+"synced successfully.")
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
      message: status,
      buttons: ['OK']
    });
    await alert.present();
  }

  async setSupplierErrorMsg(status) {
    const alert = await this._alertController.create({
      header: 'Error',
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
          role: 'ok'
        }
      ]
    });
    await alert.present();
    let result =await alert.onDidDismiss();
    this.resultValues=result.data.values
    if(result.role=="ok" && this.resultValues.length){
      this.chk=-1
      this.startSync(this.resultValues)
    }
    else if(result.role=="cancel")
    {

    }
    else
    {
    this.emptyTextFieldMsg("Select Atleast One Option to Sync")
    }
  }

  startSync(data){
    this.forMessage=[""]
    for(let i=0;i<data.length;i++)
    {
      if(data[i]=="Items")
      {
        this.forMessage[i]="Items"
        this.getItems()
      }
      else if(data[i]=="Customers")
      {
        this.forMessage[i]="Customers"
        this.getCustomers()
      }
    }
  }
              
  getItems(){
    this.syncInProgress()
    this._apiService.getItems(this.suppID,this.date)
    .subscribe(
      res=>{
        this.itemObj = res;
        this.items = this.itemObj.getitemsResult
        // this.items.forEach(item => {
        //   console.log(item.Name)
        // })
        this.hideLoader()
      },
      err=>{
        this.setSupplierErrorMsg(err.message)
      }
    )
  }

  getCustomers(){
    this.syncInProgress()
    this._apiService.getCustomerInfo(this.suppID,this.date)
    .subscribe(
      res=>{
        this.customerObj = res;
        this.customers = this.customerObj.getcustomersResult
        // this.customers.forEach(customer => {
        //   console.log(customer.Name)
        // })
        this.hideLoader()
      },
      err=>{
        this.setSupplierErrorMsg(err.message)
      }
    )
  }
}
