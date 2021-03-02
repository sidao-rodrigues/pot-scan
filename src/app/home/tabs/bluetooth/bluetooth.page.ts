import { Component, NgZone, OnInit } from '@angular/core';
import { BLE } from "@ionic-native/ble/ngx";


@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {

  public devices: any[] = [];

  constructor(
    private ble: BLE,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
  }

  scanBle(){
    this.devices = [];
    this.ble.scan([], 0.3).subscribe(device => {
      console.log('aqui: ',JSON.stringify(device));
    });
    /*this.ble.scan([], 30)
      .subscribe(device =>
        console.log('alguma coisa, pelo menos')

        //this.onDeviceDiscovered(device),
        //error => console.log(error)
      );*/
  }
  onDeviceDiscovered(device){
    console.log(`Discovered` + JSON.stringify(device, null, 2));
    this.ngZone.run(() =>{
      this.devices.push(device);
      console.log(device);
    });

  }

}
