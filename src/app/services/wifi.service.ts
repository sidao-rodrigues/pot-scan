import { Injectable } from '@angular/core';

declare var WifiWizard2: any;

@Injectable({
  providedIn: 'root'
})
export class WifiService {

  public wifis: any = [];
  public wifiIsEnabled: boolean = false;

  constructor() { }

  async scanWifi(){
    await WifiWizard2.scan()
      .then(() =>{
        WifiWizard2.getScanResults()
          .then((res) => {
              console.log(res);
              this.wifis = res;
            })
            .catch((e) => {
              console.log(e);
            })
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async wifiVerifyIsEnabled(){
    await WifiWizard2.isWifiEnabled()
      .then((isEnable) => {
        this.wifiIsEnabled = isEnable;
      })
      .catch((e) => console.log(e));
  }

  setEnabledWifi(enabled: boolean){
    WifiWizard2.setWifiEnabled(enabled)
      .then(() => {
        this.wifiIsEnabled = enabled;
      })
      .catch((e) => console.log(e));
  }
}
