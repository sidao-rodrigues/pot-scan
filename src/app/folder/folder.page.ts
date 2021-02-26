import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
//import { WifiWizard2} from '@ionic-native/wifi-wizard-2/ngx';
declare var WifiWizard2: any;

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public wifi = [];

  constructor(private activatedRoute: ActivatedRoute, private loadingController: LoadingController) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async scanNetworks(event){
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
  DATA SCAN
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
