import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

declare var WifiWizard2: any;

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.page.html',
  styleUrls: ['./wifi.page.scss'],
})
export class WifiPage implements OnInit {

  public wifi = [];

  constructor(
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async scanNetworks(){
    let loading = await this.loadingController.create({
      message: "scanning..."
    });
    loading.present();
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
      });

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
