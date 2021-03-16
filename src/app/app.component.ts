import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SqliteService } from './services/sqlite.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
    });
  }
}
