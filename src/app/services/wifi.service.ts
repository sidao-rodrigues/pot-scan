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
              //this.wifis = res.sort((a,b) => { return -a.level+b.level });
              this.wifis = res.sort((a, b) => (a.level > b.level) ? -1 : 1);
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

  calculatorDistancyDefaultValues(rede){
    let d0 = 1, gr = 0, gt = 0, beta = 5, pt = 20, pr = rede.level;

    let pl = 32.44 + (20 * Math.log10(d0/1000)) + (20 * Math.log10(rede.frequency));
    let pr0 = pt + gt + gr - pl;
    let logD = ((pr0 - pr)/(10 * beta)) + Math.log10(d0);
    let distancy = Math.pow(10, logD);
    return distancy;
  }
}
