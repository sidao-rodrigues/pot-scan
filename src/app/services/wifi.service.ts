import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Profile } from '../models/profile.model';
import { SqliteService } from './sqlite.service';

declare var WifiWizard2: any;

@Injectable({
  providedIn: 'root'
})
export class WifiService {

  public wifis: any = [];
  public wifiIsEnabled: boolean = false;
  public buttons = false;

  constructor(
    private sqliteService: SqliteService
  ) { }

  async scanWifi(){
    await WifiWizard2.scan()
      .then(() =>{
        WifiWizard2.getScanResults()
          .then((res) => {
              //this.wifis = res.sort((a,b) => { return -a.level+b.level });
              this.wifis = res.sort((a, b) => (a.level > b.level) ? -1 : 1);
            })
            .catch((e) => {
              console.log(e);
            })
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async wifiVerifyIsEnabled(){
    await WifiWizard2.isWifiEnabled()
      .then((isEnable) => {
        this.wifiIsEnabled = isEnable;
      })
      .catch((e) => console.log(e));
  }

  setEnabledWifi(enabled: boolean){
    WifiWizard2.setWifiEnabled(enabled)
      .then(() => {
        this.wifiIsEnabled = enabled;
      })
      .catch((e) => console.log(e));
  }

  calculatorDistancyDefaultValues(rede, beta){
    let d0 = 1, gr = 0, gt = 0, pt = 20, pr = rede.level;

    let pl = 32.44 + (20 * Math.log10(d0/1000)) + (20 * Math.log10(rede.frequency));
    let pr0 = pt + gt + gr - pl;
    let logD = ((pr0 - pr)/(10 * beta)) + Math.log10(d0);
    let distance = Math.pow(10, logD);
    return distance;
  }

  /*Data Base CRUD*/

  async getAllProfiles(){
    var profiles: Array<Profile> = [];

    return await this.sqliteService.getDataBase()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM profile ORDER BY _id ASC';

        return db.executeSql(sql, [])
          .then((data) => {
            if(data.rows.length > 0){
              for(let x=0; x < data.rows.length; x++){
                profiles.push(this.convertProfile(data.rows.item(x)));
              }
              return profiles;
            } else {
              return [];
            }
          })
          .catch((e) => console.error('Erro ao listar SQL', e));
      })
      .catch((e) => console.error('Erro ao acessar DB', e));
  }

  getQtdMaxProfile(){
    return this.sqliteService.getDataBase()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT COUNT(*) AS qtd FROM profile';

        return db.executeSql(sql,[])
          .then((data: any) => {
            return data.rows.item(0).qtd;
          })
          .catch((e) => console.error('Erro ao executar SQL', e));
      })
      .catch((e) => console.error('Erro ao acessar DB', e));
  }

  private convertProfile(profile){
    let pro = new Profile();

    pro._id = profile._id;
    pro.nome = profile.nome;
    pro.pt = profile.pt;
    pro.gt = profile.gt;
    pro.gr = profile.gr;
    pro.d0 = profile.d0;
    pro.beta = profile.beta;
    return pro;
  }
}
