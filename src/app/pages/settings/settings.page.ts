import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  @ViewChild('tabs', {static: false}) tabs: IonTabs;
  public currentTab: string = 'WiFi';

  constructor() { }

  ngOnInit() {
  }

  setCurrentTab() {
    this.currentTab = this.tabs.getSelected() == 'wifi' ? 'WiFi' : 'Bluetooth';
  }

}
