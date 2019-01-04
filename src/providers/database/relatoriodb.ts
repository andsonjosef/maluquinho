import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';


/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RelatorioDB {
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
          "CREATE TABLE IF NOT EXISTS Relatorio (id INTEGER PRIMARY KEY AUTOINCREMENT, dtpagamento DATE NOT NULL, valor DOUBLE NOT NULL, idParcela INTEGER REFERENCES Parcela (id) NOT NULL);", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  listarTodoRelatorio() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM Relatorio", []).then((data) => {
        let arrayItens = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayItens.push({
              id: data.rows.item(i).id,
              dtpagamento: data.rows.item(i).dtpagamento,
              valor: data.rows.item(i).valor,
              idParcela: data.rows.item(i).idParcela,

            });
          }
        }
        resolve(arrayItens);
      }, (error) => {
        reject(error);
      })
    })
  }

  listarRelatorioFiltrado(inicio, fim) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM Relatorio WHERE dtpagamento BETWEEN ? and ?", [inicio, fim]).then((data) => {
        let arrayItens = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayItens.push({
              id: data.rows.item(i).id,
              dtpagamento: data.rows.item(i).dtpagamento,
              valor: data.rows.item(i).valor,
              idParcela: data.rows.item(i).idParcela,

            });
          }
        }
        resolve(arrayItens);
      }, (error) => {
        reject(error);
      })
    })
  }

  inserir(relatorio) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO Relatorio (dtpagamento,  valor, idParcela ) VALUES (?,?,?)";
      this.db.executeSql(sql, [relatorio.dtpagamento, relatorio.valor, relatorio.idParcela]).then((data) => {
        resolve(data);
        let id = data.insertId;
      }, (error) => {
        reject(error);
      });
    });
  }
}

