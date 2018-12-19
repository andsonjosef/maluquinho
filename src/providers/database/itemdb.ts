import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { ClienteDTO } from '../../models/cliente.dto';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemDB {

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
          "CREATE TABLE IF NOT EXISTS Item (id INTEGER PRIMARY KEY AUTOINCREMENT, item STRING NOT NULL, quantidade NUMERIC NOT NULL DEFAULT (1), preco DOUBLE NOT NULL, idCompra INTEGER REFERENCES Compra (id) NOT NULL, total INTEGER);", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  listarItens(id) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM item where idCompra = ?", [id]).then((data) => {
        let arrayItens = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayItens.push({
              id: data.rows.item(i).id,
              item: data.rows.item(i).item,
              quantidade: data.rows.item(i).quantidade,
              preco: data.rows.item(i).preco,
              idCompra: data.rows.item(i).idCompra,
            });
          }
        }
        resolve(arrayItens);
      }, (error) => {
        reject(error);
      })
    })
  }

  buscarItem(id) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM item where id = ? ", [id]).then((data) => {
        let item;
        if (data.rows.length > 0) {
          item = {
            id: data.rows.item(0).id,
            item: data.rows.item(0).item,
            quantidade: data.rows.item(0).quantidade,
            preco: data.rows.item(0).preco,
            idCompra: data.rows.item(0).idCompra,
            total: data.rows.item(0).total
          };
        }
        resolve(item);
      }, (error) => {
        reject(error);
      })
    })
  }

  cadastrarItem(item) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO Item (item, quantidade, preco, idCompra ) VALUES (?,?,?,?)";
      this.db.executeSql(sql, [item.item, item.quantidade,  item.preco, item.idCompra ]).then((data) => {
        resolve(data);
        let  id = data.insertId;
      }, (error) => {
        reject(error);
      });
    });
  }
}

