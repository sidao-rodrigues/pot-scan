import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { InfoWifiComponent } from 'src/app/components/info-wifi/info-wifi.component';
import { WifiService } from 'src/app/services/wifi.service';

declare var WifiWizard2: any;

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.page.html',
  styleUrls: ['./wifi.page.scss'],
})
export class WifiPage implements OnInit {

  //public wifi = [];

  constructor(
    private loadingController: LoadingController,
    public wifiService: WifiService,
    private toastController: ToastController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async scanNetworks(){
    if(this.wifiService.wifiIsEnabled){
      let loading = await this.loadingController.create({
        message: "scanning..."
      });
      loading.present();
      /*
      WifiWizard2.scan()
        .then(() =>{
          loading.dismiss();
          WifiWizard2.getScanResults()
            .then((res) => {
              console.log(res);
              this.wifi = res;
            })
            .catch((e) => {
              console.log(e);
            })
        })
        .catch((e) => {
          loading.dismiss();
          console.log(e);
        });*/
        this.wifiService.scanWifi()
          .then(() => loading.dismiss())
          .catch(()=> loading.dismiss());
    } else {
      console.log('desabilitado');
      this.presentToast();
    }
  }

  async openInfo(wifi){
    const modal = await this.modalCtrl.create({
      component: InfoWifiComponent,
      componentProps: {rede: wifi, service: this.wifiService}
    });

    await modal.present();
  }

  calculator(){
    console.log('teste');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'WiFi is Disabled',
      duration: 2000
    });
    toast.present();
  }


  /*
  DATA SCAN WIFI
    BSSID: "90:f6:52:ce:de:0c"
    SSID: "f'(x) = 9x^3+5x^2+96 = ?"
    capabilities: "[WPA2-PSK-CCMP][RSN-PSK-CCMP][WPA-PSK-CCMP][ESS][WPS][WFA-HT]"
    centerFreq0: 2422
    centerFreq1: 0
    channelWidth: 1
    frequency: 2412
    level: -36
    timestamp: 168237457334
  */

}
