import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, LoadingController } from '@ionic/angular';

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
    private loadingController: LoadingController
    ) { }

  ngOnInit() {
  }

  setCurrentTab() {
    this.currentTab = this.tabs.getSelected() == 'wifi' ? 'WiFi' : 'Bluetooth';
  }

  /*
  DATA SCAN BLUETOOTH

  */

}
