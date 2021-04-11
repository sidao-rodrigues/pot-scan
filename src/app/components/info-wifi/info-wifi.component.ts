import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';

import * as moment from "moment"
import { WifiService } from 'src/app/services/wifi.service';

@Component({
  selector: 'app-info-wifi',
  templateUrl: './info-wifi.component.html',
  styleUrls: ['./info-wifi.component.scss'],
})
export class InfoWifiComponent implements OnInit, OnDestroy {

  @Input() rede: any;
  @Input() service: WifiService;

  public beta: any = 5;
  public distancy: any = 0;
  private continueScan: boolean = false;
  private intervalId: any;

  constructor(
    private modalCtrl: ModalController
  ) {
    //this.distancy = this.service.calculatorDistancyDefaultValues(this.rede);
  }

  ngOnInit(){
    this.distancy = this.service.calculatorDistancyDefaultValues(this.rede, this.beta);
  }

  ngOnDestroy(){
    //clearInterval(this.intervalId);
  }

  dismissModal(){
    if(this.continueScan){
      clearInterval(this.intervalId);
    }
    this.modalCtrl.dismiss();
  }

  convertDate(value){
    return moment.unix(value).format('YYYY-MM-DD HH:mm:ss');
  }

  realTimeScan(event){
    this.continueScan = event.detail.checked;
    console.log('chamou: ', this.continueScan);

    if(this.continueScan){
      this.intervalId = setInterval(() => {
      this.callFunction()
        .then(() => {
          console.log('terminado');
          if(this.rede.level != '?') {
            this.distancy = this.service.calculatorDistancyDefaultValues(this.rede, this.beta);
          }
        });
      }, 6500);

    } else {
      clearInterval(this.intervalId);
    }
  }

  async callFunction(){
    let exists = false;
    await this.service.scanWifi()
      .then(() => {
        this.service.wifis
          .forEach(element => {
            if(this.rede.BSSID == element.BSSID){
              this.rede = element;
              exists = true;
            }
          });
          if(!exists){
            this.rede.level = '?';
            this.distancy = undefined;
          }
      })
      .catch((e)=> console.log('erro: ', e));
  }
}
