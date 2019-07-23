import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private _alertController: AlertController) { }

  async emptyTextFieldMsg(_msg) {
    const alert = await this._alertController.create({
      header: 'Error',
      // subHeader: 'Subtitle',
      message: _msg,
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
}
