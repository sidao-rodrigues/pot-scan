import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WifiPageRoutingModule } from './wifi-routing.module';

import { WifiPage } from './wifi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    WifiPageRoutingModule
  ],
  declarations: [WifiPage]
})
export class WifiPageModule {}
