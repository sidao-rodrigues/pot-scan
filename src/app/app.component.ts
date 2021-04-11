import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SqliteService } from './services/sqlite.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { WifiService } from './services/wifi.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Home Scan', url: '/home', icon: 'radio' },
    //{ title: 'Bluetooth Scan', url: '/home/blu', icon: 'bluetooth' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
  ];
  constructor(
    private statusBar: StatusBar,
    private platform: Platform,
    private sqliteService: SqliteService,
    private splashScreen: SplashScreen,
    private nativeAudio: NativeAudio,
    private wifiService: WifiService
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready()
      .then(() => {
        this.statusBar.styleDefault();
        this.sqliteService.createDataBase()
          .then(() => {
            // fechando a SplashScreen somente quando o banco for criado
            this.splashScreen.hide();
          })
          .catch(() =>{
            // ou se houver erro na criação do banco
            this.splashScreen.hide();
        });
        //this.listFirstUser();
        this.audio();
        this.wifiService.wifiVerifyIsEnabled();
    });
  }

  audio(){
    this.nativeAudio.preloadSimple('uniqueId1','assets/audio/beep1.mp3')
      .then((success) => {
        console.log('foi beep 1');
      }).catch((error) => console.log('error', error));
    this.nativeAudio.preloadSimple('uniqueId2','assets/audio/beep.mp3')
      .then((success) => {
        console.log('foi beep 2');
      }).catch((error) => console.log('error', error));
  }
}
