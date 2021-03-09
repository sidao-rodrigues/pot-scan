import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WifiPageRoutingModule } from './wifi-routing.module';

import { WifiPage } from './wifi.page';
import { InfoWifiComponent } from 'src/app/components/info-wifi/info-wifi.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WifiPageRoutingModule
  ],
  declarations: [
    WifiPage,
    InfoWifiComponent
  ],
  entryComponents: [InfoWifiComponent]
})
export class WifiPageModule {}
