import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
    children: [
      {
        path: '',
        redirectTo: '/settings/wifi',
        pathMatch: 'full'
      },
      {
        path: 'wifi',
        loadChildren: () => import('./tabs/wifi/wifi.module').then( m => m.WifiPageModule)
      },
      /*{
        path: 'bluetooth',
        loadChildren: () => import('./tabs/bluetooth/bluetooth.module').then( m => m.BluetoothPageModule)
      }*/
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
