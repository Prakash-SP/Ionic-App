import { Component, OnInit, Input } from '@angular/core';
import { MenuController,NavController,NavParams,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  constructor(
    private nav:NavController,
    private navParams: NavParams,
    public modalController: ModalController,
    public menuCtrl: MenuController
    ) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get('firstName'));
  }
  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  ngOnInit() {
  }
}
