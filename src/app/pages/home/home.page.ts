import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, LoadingController, Platform, ToastController } from '@ionic/angular';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { WifiService } from '../../services/wifi.service';


@Component({
  selector: 'app-folder',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class FolderPage implements OnInit {

  @ViewChild('tabs', {static: false}) tabs: IonTabs;
  public currentTab: string = 'WiFi';
  public wifi = [];

  constructor(
    private loadingController: LoadingController,
    private androidPermissions: AndroidPermissions,
    public wifiService: WifiService,
    private toastController: ToastController,
    private platform: Platform
    ) {
      console.log('entrou');

      let PERMISSIONS = [
        this.androidPermissions.PERMISSION.CHANGE_WIFI_STATE,
        this.androidPermissions.PERMISSION.CHANGE_WIFI_MULTICAST_STATE,
        this.androidPermissions.PERMISSION.BLUETOOTH,
        this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
        this.androidPermissions.PERMISSION.ACCESS_MEDIA_LOCATION,
        this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      ];
      this.platform.ready()
        .then(() => {
          PERMISSIONS.forEach(element => {
            this.androidPermissions
              .checkPermission(element).then(
                result => {
                  console.log('Has permission?',result.hasPermission)
                  if(!result.hasPermission){
                    this.androidPermissions.requestPermission(element)
                      .then((ok) => {
                        console.log('foi: ', ok);
                      })
                      .catch((e) => console.log('error: ', e));
                  }
                },
                err => this.androidPermissions.requestPermission(element)
            );
          });
        })

     }

  ngOnInit() {
    //this.wifiIsEnabled();
  }

  /*wifiIsEnabled(){
    this.platform.ready()
      .then(() => {

      })
      .catch((e) => console.log(e));
  }*/

  setCurrentTab() {
    this.currentTab = this.tabs.getSelected() == 'wifi' ? 'WiFi' : 'Bluetooth';
  }

  async changeEnabledWifiOptionsYN(isEnabled: boolean) {
    const toast = await this.toastController.create({
      message: `Deseja realmente ${isEnabled ? 'ativar' : 'desativar'} WiFi?`,
      position: 'middle',
      buttons: [
        {
          side: 'start',
          text: 'Sim',
          handler: () => {
            //this.wifiService.wifiVerifyIsEnabled();
            this.wifiService.setEnabledWifi(isEnabled);
          }
        }, {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async scan(){
    if(this.currentTab === 'WiFi'){
      if(this.wifiService.wifiIsEnabled){
        let loading = await this.loadingController.create({
          message: "scanning..."
        });
        loading.present();
        this.wifiService.scanWifi()
          .then(() => loading.dismiss())
          .catch(()=> loading.dismiss());
      } else {
        this.presentToast();
      }
    } else {
      //fazer para o bluetooth
      console.log('blue: ', this.currentTab);

    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'WiFi is Disabled',
      duration: 2000
    });
    toast.present();
  }

  /*
  DATA SCAN BLUETOOTH

  */
 /* let PERMISSIONS = [
        this.androidPermissions.PERMISSION.BLUETOOTH,
        this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
      ];
      this.androidPermissions
        .checkPermission(PERMISSIONS[1]).then(
          result => {
            console.log('Has permission?',result.hasPermission)
            if(!result.hasPermission){
              this.androidPermissions.requestPermission(PERMISSIONS[1])
                .then((ok) => {
                  console.log('foi: ', ok);
                })
                .catch((e) => console.log('error'));
            }
          }
          //err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.BLUETOOTH)
      );

      this.androidPermissions
      .requestPermissions([this.androidPermissions.PERMISSION.Location, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
          */

}
