import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import * as moment from "moment"

@Component({
  selector: 'app-info-wifi',
  templateUrl: './info-wifi.component.html',
  styleUrls: ['./info-wifi.component.scss'],
})
export class InfoWifiComponent{

  @Input() rede: any;

  constructor(
    private modalCtrl: ModalController
  ) { }

  dismissModal(){
    this.modalCtrl.dismiss();
  }

  convertDate(value){
    return moment.unix(value).format('YYYY-MM-DD HH:mm:ss');
  }
}
