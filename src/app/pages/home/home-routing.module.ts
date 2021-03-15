import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPage,
    children: [
      {
        path: '',
        redirectTo: '/home/wifi',
        pathMatch: 'full'
      },
      {
        path: 'wifi',
        loadChildren: () => import('./tabs/wifi/wifi.module').then( m => m.WifiPageModule)
      },
      {
        path: 'bluetooth',
        loadChildren: () => import('./tabs/bluetooth/bluetooth.module').then( m => m.BluetoothPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
