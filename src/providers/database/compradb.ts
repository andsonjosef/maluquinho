import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompraDB {

  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(
    public storage: SQLite
  ) {
    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: "data.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql(
          "CREATE TABLE IF NOT EXISTS Compra (id INTEGER PRIMARY KEY AUTOINCREMENT, idCliente REFERENCES Cliente (id) NOT NULL, dataCompra DATE NOT NULL, status BOOLEAN DEFAULT (0),  primeiraParcela DATE, qtdParcelas INTEGER, total DOUBLE );", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  listarCompras(id) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM compra where idCliente = ?", [id]).then((data) => {
        let arrayCompras = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayCompras.push({
              id: data.rows.item(i).id,
              idCliente: data.rows.item(i).idCliente,
              dataCompra: data.rows.item(i).dataCompra,
              status: data.rows.item(i).status,
              primeiraParcela: data.rows.item(i).primeiraParcela,
              qtdParcelas: data.rows.item(i).qtdParcelas,
              total: data.rows.item(i).total,
            });
          }
        }
        resolve(arrayCompras);
      }, (error) => {
        reject(error);
      })
    })
  }

  buscarCompra(id) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM compra where id = ? ", [id]).then((data) => {
        let compra;
        if (data.rows.length > 0) {
          compra = {
            id: data.rows.item(0).id,
            idCliente: data.rows.item(0).idCliente,
            dataCompra: data.rows.item(0).dataCompra,
            status: data.rows.item(0).status,
            primeiraParcela: data.rows.item(0).primeiraParcela,
            qtdParcelas: data.rows.item(0).qtdParcelas,
            total: data.rows.item(0).total,
          };
          
        }
        resolve(compra);
      }, (error) => {
        reject(error);
      })
    })
  }

  cadastrarCompra(compra) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO compra (dataCompra, qtdParcelas, primeiraParcela, idCliente, total ) VALUES (?,?,?,?,?)";
      this.db.executeSql(sql, [compra.dataCompra, compra.qtdParcelas,  compra.primeiraParcela, compra.idCliente, compra.total ]).then((data) => {
        let  id = data.insertId;
        resolve(id);  
      }, (error) => {
        reject(error);
      });
    });
  }

  apagar(id) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM Compra where idCompra = ?";
      this.db.executeSql(sql, [id]).then((data) => {
        resolve(data);
       
      }, (error) => {
        reject(error);
      });
    });
  }
}

