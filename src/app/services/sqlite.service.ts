import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  constructor(private sqlite: SQLite) { }

  getDataBase(){
    return this.sqlite.create({
      name: 'pot_scan.db',
      location: 'default'
    });
  }

  createDataBase(){
    return this.getDataBase()
      .then((db: SQLiteObject) => {
        this.createTables(db);
      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject){
    db.sqlBatch([
      [''],
      ['']
    ])
    .then(() => console.log('SQL Executada!'))
    .catch(e => console.log(e));
  }
}
