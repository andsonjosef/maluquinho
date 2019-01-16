import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertaDB {

  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(
    public storage: SQLite
  ) {
    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: "maluquinho.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql(
          "CREATE TABLE IF NOT EXISTS Alerta (id INTEGER PRIMARY KEY , dataAlerta DATE NULL, hora INTEGER NULL,  minuto INTEGER NULL)", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  dataProxima(dataAlerta) {

    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT vencimento FROM parcela WHERE vencimento >= ? and status = 0 order by vencimento LIMIT 1 ", [dataAlerta]).then((data) => {
        if (data.rows.length > 0) {
          dataAlerta = data.rows.item(0).vencimento
        }
        resolve(dataAlerta);
      }, (error) => {
        reject(error);
      })
    })
  }

  dataProximaDiaSeguinte(dataAlerta) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT vencimento FROM parcela WHERE vencimento > ? and status = 0 order by vencimento LIMIT 1 ", [dataAlerta]).then((data) => {
        if (data.rows.length > 0) {
          dataAlerta = data.rows.item(0).vencimento
        }
        resolve(dataAlerta);
      }, (error) => {
        reject(error);
      })
    })
  }
  dataAlerta() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM Alerta WHERE id = 1 ", []).then((data) => {
        let dataAler;
        if (data.rows.length > 0) {
          dataAler = {
            id: data.rows.item(0).id,
            dataAlerta: data.rows.item(0).dataAlerta,
            hora: data.rows.item(0).hora,
            minuto: data.rows.item(0).minuto
          }
        } else {
          dataAler = {
            id: 0,
            dataAlerta: "",
            hora: 10,
            minuto: 0
          }
        }
        resolve(dataAler);
      }, (error) => {
        reject(error);
      })
    })
  }

  definirAlerta(alerta) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO alerta (dataAlerta, hora, minuto, id ) VALUES (?,?,?,?)";
      this.db.executeSql(sql, [alerta.dataAlerta, alerta.hora, alerta.minuto, 1]).then((data) => {
        resolve(data);
        let id = data.insertId;
      }, (error) => {
        reject(error);
      });
    });
  }

  apagar() {
    return new Promise((resolve, reject) => {
      let sql = "Delete from alerta";
      this.db.executeSql(sql, []).then((data) => {
        resolve(data);

      }, (error) => {
        reject(error);
      });
    });
  }
}

