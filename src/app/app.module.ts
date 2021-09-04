import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BLE } from '@ionic-native/ble/ngx';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { File } from '@ionic-native/file/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFirestoreModule  } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
// import { AngularFireModule } from "angularfire2";
// import { AngularFireDatabase } from "angularfire2/database";
// import { AngularFireStorageModule } from "angularfire2/storage";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabase,
    AngularFireStorageModule,
  ],
  providers: [
    NativeAudio,
    File,
    StatusBar,
    SplashScreen,
    BLE,
    BluetoothLE,
    BluetoothSerial,
    AndroidPermissions,
    SQLite,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
