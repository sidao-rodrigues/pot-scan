import { Component, NgZone, OnInit } from '@angular/core';

import { BLE } from "@ionic-native/ble/ngx";
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { BluetoothSerial } from "@ionic-native/bluetooth-serial/ngx";

import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-bluetooth',
  templateUrl: './bluetooth.page.html',
  styleUrls: ['./bluetooth.page.scss'],
})
export class BluetoothPage implements OnInit {

  public devices: any[] = [];

  constructor(
    private ble: BLE,
    private bluetoothle: BluetoothLE,
    private bluetoothSerial: BluetoothSerial,
    private ngZone: NgZone,
    private plt: Platform,
     private androidPermissions: AndroidPermissions
  ) {
    //this.bluetoothle.stopScan();
    //this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.isLocationEnabled);
    /*
    let PERMISSIONS = [
      this.androidPermissions.PERMISSION.BLUETOOTH,
      this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
      //this.androidPermissions.PERMISSION.isLocationEnabled
    ];
    this.androidPermissions
      .checkPermission(PERMISSIONS[1]).then(
        result => {
          console.log('Has permission?',result.hasPermission)
          if(!result.hasPermission){
            this.androidPermissions.requestPermission(PERMISSIONS[1])
              .then((ok) => {
                console.log('foi: ', ok);
              })
              .catch((e) => console.log('error'));
          }
        });*/
  }

  ngOnInit() {
  }

  scanBle(){

    this.plt.ready().then((readySource) => {

      console.log('Platform ready from', readySource);
      /*
      this.bluetoothSerial.isEnabled()
        .then(success => {
          console.log('está ativo');
          this.bluetoothSerial.list()
            .then((success) => {
              console.log('aqui na lista: ', success);
            });
        }, error => {
          console.log('bluetooth desativado');
        });
        */
      //  { request: true, statusReceiver: false }
      this.bluetoothle.initialize().subscribe(ble => {
        //console.log('ble', ble.status)

        let params = {
          "services": [
            "180D",
            "180F"
          ],
          "allowDuplicates": true,
          "scanMode": this.bluetoothle.SCAN_MODE_LOW_LATENCY,
          "matchMode": this.bluetoothle.MATCH_MODE_AGGRESSIVE,
          "matchNum": this.bluetoothle.MATCH_NUM_MAX_ADVERTISEMENT,
          "callbackType": this.bluetoothle.CALLBACK_TYPE_ALL_MATCHES,
        };
        if(ble.status == 'enabled') {
          let p = {};
          this.bluetoothle.startScan(p)
            .subscribe(device => {
              //this.onDeviceDiscovered(device)
              console.log(device);
            });
        }
      });
      /*this.ble.scan([], 15).subscribe(device => {
        console.log(JSON.stringify(device));
        this.onDeviceDiscovered(device);
      });*/

    });


    /*
    console.log('deu alguma coisa');

    BLE.scan([], 5)
      .subscribe(device =>
        console.log('alguma coisa, pelo menos: ',device),
        error => console.log('error')
        //this.onDeviceDiscovered(device),
        //error => console.log(error)
      );*/
  }

  async stop() {
    let isScanning = await this.bluetoothle.isScanning();

    if(isScanning){
      this.bluetoothle.stopScan();
      console.log('parou');
    }
  }
  onDeviceDiscovered(device){
    console.log(`Discovered` + JSON.stringify(device, null, 2));
    this.ngZone.run(() =>{
      this.devices.push(device);
      console.log('dispositivos: ',this.devices);
    });

  }

}
