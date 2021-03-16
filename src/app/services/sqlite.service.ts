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
        this.inserValuesDefault(db);
      })
      .catch(e => console.error('Erro ao criar banco de dados', e));
  }

  private createTables(db: SQLiteObject){
    db.sqlBatch([
      [`CREATE TABLE IF NOT EXISTS profile (
        _id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        pt DECIMAL(6,2) NOT NULL,
        gt DECIMAL(6,2) NOT NULL,
        gr DECIMAL(6,2) NOT NULL,
        d0 DECIMAL(6,2) NOT NULL,
        beta DECIMAL(6,2) NOT NULL
      )`],
      //['']
    ])
    .then(() => console.log('SQL Executada!'))
    .catch(e => console.error('Erro ao criar tabelas', e));
  }

  private inserValuesDefault(db: SQLiteObject){
    db.executeSql('SELECT COUNT(_id) AS qtd FROM profile', [])
      .then((data: any) => {
        if(data.rows.item(0).qtd == 0){
          let sqls = [
            ['INSERT INTO profile (_id, nome, pt, gt, gr, d0, beta) VALUES (?,?,?,?,?,?,?)', [1, 'Default 2.4GHz', 20.0, 0, 0, 1, 5.0]],
            ['INSERT INTO profile (_id, nome, pt, gt, gr, d0, beta) VALUES (?,?,?,?,?,?,?)', [2, 'Default 5.0GHz', 23.0, 0, 0, 1, 5.0]]
          ];

          db.sqlBatch(sqls)
            .then(() => console.log('Dados padrões incluídos tabela Profile'))
            .catch(e => console.error('erro ao incluir dados padrões tabela Profile', e));
        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de Profile', e));
  }
}
