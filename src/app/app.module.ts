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


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
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
