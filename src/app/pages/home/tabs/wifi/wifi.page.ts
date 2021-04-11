import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { InfoWifiComponent } from 'src/app/components/info-wifi/info-wifi.component';
import { WifiService } from 'src/app/services/wifi.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { File } from '@ionic-native/file/ngx';
import * as moment from "moment";

declare var WifiWizard2: any;

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.page.html',
  styleUrls: ['./wifi.page.scss'],
})
export class WifiPage implements OnInit {

  //public wifi = [];

  private potencies: any = {p1: "", p2: "", p3: ""};
  public beta: any = {b1: 5, b2: 5, b3: 5};
  public mac: any = {m1:"", m2:"", m3:""};
  public distancies: any = {d1: 0, d2: 0, d3: 0};
  public coordenadas: any = {pxb: 0, qxc: 0, ryc: 0};
  public posicao: any = 1;
  public toggle = true;
  public buttons = false;
  public count = 1;
  private intervalId: any;
  private nameFile: any = "";
  private allData = "";
  public repeticoes: any = 10;
  public timeTest: any = 10;

  constructor(
    private loadingController: LoadingController,
    public wifiService: WifiService,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private plf: Platform,
    private nativeAudio: NativeAudio,
    private file: File
  ) { }

  ngOnInit() {
    this.initBeep();
  }

  async scanNetworks(){
    if(this.wifiService.wifiIsEnabled){
      let loading = await this.loadingController.create({
        message: `scanning ${this.count}º Test...`
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
          .then(() => {
            loading.dismiss();
            if(this.count == this.repeticoes){
              clearInterval(this.intervalId);
              this.playBeep('uniqueId1');
              this.buttons = false;
              this.wifiService.buttons = false;
              this.toggle = true;
              this.setData();
              this.writeData(this.allData);
            }
            this.setData();
            this.count++;
          })
          .catch(()=> loading.dismiss());
    } else {
      console.log('desabilitado');
      this.presentToast();
    }
  }

  setData(){
    this.allData += `${this.posicao}, ${this.count}, ${this.potencies.p1 == "" ? "undefined" : this.potencies.p1}, ${this.potencies.p2 == "" ? "undefined" : this.potencies.p2}, ${this.potencies.p3 == "" ? "undefined" : this.potencies.p3}, ${this.distancies.d1 == "" ? "undefined" : this.distancies.d1}, ${this.distancies.d2 == "" ? "undefined" : this.distancies.d2}, ${this.distancies.d3 == "" ? "undefined" : this.distancies.d3}, ${this.calculatorX()}, ${this.calculatorY()}\n`;
  }

  async openInfo(wifi){
    const modal = await this.modalCtrl.create({
      component: InfoWifiComponent,
      componentProps: {rede: wifi, service: this.wifiService}
    });

    await modal.present();
  }

  calculator(rede, beta){
    return this.wifiService.calculatorDistancyDefaultValues(rede, beta);
  }

  convertUpMac(value){
    return value.toUpperCase();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'WiFi is Disabled',
      duration: 2000
    });
    toast.present();
  }

  compareWith(o1: any, o2: any | []) {
    if (!o1 || !o2) {
      return o1 === o2;
    }
    if (Array.isArray(o2)) {
      return o2.some(u => u.BSSID === o1.BSSID);
    }
    return o1.BSSID === o2.BSSID;
  }

  verifyByMac(wifi){
    let retorno = {pass: false, slot: undefined};
    if(this.toggle){
      retorno.pass = true;
    } else {
      switch(this.convertUpMac(wifi.BSSID)){
        case this.convertUpMac(this.mac.m1):
          retorno.pass = true;
          retorno.slot = 1;
          this.distancies.d1 = this.calculator(wifi, this.beta.b1);
          this.potencies.p1 = wifi.level;
          break;
        case this.convertUpMac(this.mac.m2):
          retorno.pass = true;
          retorno.slot = 2;
          this.distancies.d2 = this.calculator(wifi, this.beta.b2);
          this.potencies.p2 = wifi.level;
          break;
        case this.convertUpMac(this.mac.m3):
          retorno.pass = true;
          retorno.slot = 3;
          this.distancies.d3 = this.calculator(wifi, this.beta.b3);
          this.potencies.p3 = wifi.level;
          break;
        default:
          retorno.pass = false;
          break;
      }
    }
    return retorno;
  }

  verifiBySlot(wifi){
    let values = this.verifyByMac(wifi);
    let retorno;
    switch(values.slot){
      case 1:
        retorno = this.distancies.d1;
        break;
      case 2:
        retorno = this.distancies.d2;
        break;
      case 3:
        retorno = this.distancies.d3;
        break;
      default:
        retorno = undefined;
        break;
    }
    return retorno;
  }

  async initTest(){
    this.toggle = false;
    this.buttons = true;
    this.wifiService.buttons = true;
    this.nameFile = "";
    this.count = 1;
    this.allData = "posicao, medicao, p_a, p_b, p_c, d_a, d_b, d_c, x, y\n";
    await this.playBeep('uniqueId2');

    this.nameFile = `${moment(new Date()).format('YYYY-MM-DD_HH-mm-ss')}_position_${this.posicao}.csv`;
    //await this.writeData("");
    this.intervalId = setInterval(() => {
      this.scanNetworks();
    }, this.timeTest * 1000);
  }

  initBeep(){
    /*this.plf.ready().then((readySource) => {
      this.nativeAudio.preloadSimple('uniqueId1','assets/audio/beep1.mp3')
        .then((success) => {
          console.log('foi beep 1');
        }).catch((error) => console.log('error', error));
      this.nativeAudio.preloadSimple('uniqueId2','assets/audio/beep.mp3')
        .then((success) => {
          console.log('foi beep 2');
        }).catch((error) => console.log('error', error));
    });*/
  }

  async playBeep(unique){
    await this.nativeAudio.play(unique).then((success) => {
      console.log('executou audio 1');
    }).catch((error) => console.log('error'));
  }

  async createAccessLogFileAndWrite(text: string) {
    console.log('file: ',this.nameFile);

    //this.plf.ready().then((read) =>{
      await this.file.checkFile(this.file.externalCacheDirectory, this.nameFile)
        .then(doesExist => {
          console.log("doesExist : " + doesExist);
          if(doesExist){
           console.log('tem');

          } else {
            console.log('n tem');
          }
          return this.writeToAccessLogFile(text);
        }).catch(err => {
          console.log('erro no cat:', err);

          return this.file.createFile(this.file.externalCacheDirectory, this.nameFile, true)
            .then(FileEntry => this.writeToAccessLogFile(text))
            .catch(err => console.log('Coul dont create file', err));
      });
    //});
  }

  writeToAccessLogFile(text: string) {
    console.log('texto: ', text);

    this.file.writeExistingFile(this.file.externalCacheDirectory, this.nameFile, text)
    .then((data) => {
      console.log('escreveu');
    }).catch((error) => {
      console.log('deu erro: ',error);
    });
  }

  async writeData(text) {
    // This is an example usage of the above functions
    // This function is your code where you want to write to access.log file
    await this.createAccessLogFileAndWrite(text);
  }

  calculatorX(){
    let value;
  //    public raios: any = {ea: 0, fb: 0, gc: 0};
  // public coordenadas: any = {pxb: 0, qxc: 0, ryc: 0};
    if(this.distancies.d1 == "" || this.distancies.d2 == ""){
      value = "undefined";
    } else {
      value = (Math.pow(this.distancies.d1, 2) - Math.pow(this.distancies.d2, 2) + Math.pow(this.coordenadas.pxb, 2))/(2 * this.coordenadas.pxb);
    }
    return value;
  }

  calculatorY(){
    let value;
  //    public raios: any = {ea: 0, fb: 0, gc: 0};
  // public coordenadas: any = {pxb: 0, qxc: 0, ryc: 0};
    if(this.distancies.d1 == "" || this.distancies.d3 == ""){
      value = "undefined";
    } else {
      value = (Math.pow(this.distancies.d1, 2) - Math.pow(this.distancies.d3, 2) + Math.pow(this.coordenadas.qxc, 2) + Math.pow(this.coordenadas.ryc, 2))/(2 * this.coordenadas.ryc) - (this.calculatorX() * (this.coordenadas.qxc/this.coordenadas.ryc));
    }
    return value;
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
