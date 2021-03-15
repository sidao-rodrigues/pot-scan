import { Component } from '@angular/core';
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
  constructor() {}
}
