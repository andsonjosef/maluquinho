import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { ClienteDTO } from '../../models/cliente.dto';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ParcelaDB {

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
          "CREATE TABLE IF NOT EXISTS Parcela (id INTEGER PRIMARY KEY AUTOINCREMENT, vencimento DATE NOT NULL, parcela STRING NOT NULL, preco DOUBLE NOT NULL, status BOOLEAN DEFAULT (0), idCompra INTEGER REFERENCES Compra (id) NOT NULL);", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  listarParcelaCompra(id) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM Parcela where idCompra = ?", [id]).then((data) => {
        let arrayItens = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayItens.push({
              id: data.rows.item(i).id,
              parcela: data.rows.item(i).parcela,
              status: data.rows.item(i).status,
              preco: data.rows.item(i).preco,
              vencimento: data.rows.item(i).vencimento,
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

  listarVencimentoDia(dataV) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM parcela p, cliente c, compra co where c.id = co.idCliente and co.id = p.idCompra and p.vencimento = ? and p.status = 0 ", [dataV]).then((data) => {
        let arrayItens = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {

            arrayItens.push({
              idParcela: data.rows.item(i).id,
              parcela: data.rows.item(i).parcela,
              statusParcela: data.rows.item(i).status,
              preco: data.rows.item(i).preco,
              vencimento: data.rows.item(i).vencimento,
              idCliente: data.rows.item(i).idCliente,
              nome: data.rows.item(i).nome,
              cpf: data.rows.item(i).cpf,
              rg: data.rows.item(i).rg,
              bairro: data.rows.item(i).bairro,
              numero: data.rows.item(i).numero,
              rua: data.rows.item(i).rua,
              quadra: data.rows.item(i).quadra,
              complemento: data.rows.item(i).complemento,
              telefone: data.rows.item(i).telefone,
              idCompra: data.rows.item(i).idCompra,
              dataCompra: data.rows.item(i).dataCompra,
              statusCompra: data.rows.item(i).status1,
              primeiraParcela: data.rows.item(i).primeiraParcela,
              qtdParcelas: data.rows.item(i).qtdParcelas,
              total: data.rows.item(i).total,

            });
          }
        }
        resolve(arrayItens);
      }, (error) => {
        reject(error);
      })
    })
  }

  listarVencidos(dataV) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM parcela p, cliente c, compra co where c.id = co.idCliente and co.id = p.idCompra and p.vencimento < ? and p.status = 0 ", [dataV]).then((data) => {
        let arrayItens = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {

            arrayItens.push({
              idParcela: data.rows.item(i).id,
              parcela: data.rows.item(i).parcela,
              statusParcela: data.rows.item(i).status,
              preco: data.rows.item(i).preco,
              vencimento: data.rows.item(i).vencimento,
              idCliente: data.rows.item(i).idCliente,
              nome: data.rows.item(i).nome,
              cpf: data.rows.item(i).cpf,
              rg: data.rows.item(i).rg,
              bairro: data.rows.item(i).bairro,
              numero: data.rows.item(i).numero,
              rua: data.rows.item(i).rua,
              quadra: data.rows.item(i).quadra,
              complemento: data.rows.item(i).complemento,
              telefone: data.rows.item(i).telefone,
              idCompra: data.rows.item(i).idCompra,
              dataCompra: data.rows.item(i).dataCompra,
              statusCompra: data.rows.item(i).status1,
              primeiraParcela: data.rows.item(i).primeiraParcela,
              qtdParcelas: data.rows.item(i).qtdParcelas,
              total: data.rows.item(i).total,

            });
          }
        }
        resolve(arrayItens);
      }, (error) => {
        reject(error);
      })
    })
  }

  listarParcelasAmanha(dataV) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM parcela p, cliente c, compra co where c.id = co.idCliente and co.id = p.idCompra and p.vencimento = ? and p.status = 0 ", [dataV]).then((data) => {
        let arrayItens = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {

            arrayItens.push({
              idParcela: data.rows.item(i).id,
              parcela: data.rows.item(i).parcela,
              statusParcela: data.rows.item(i).status,
              preco: data.rows.item(i).preco,
              vencimento: data.rows.item(i).vencimento,
              idCliente: data.rows.item(i).idCliente,
              nome: data.rows.item(i).nome,
              cpf: data.rows.item(i).cpf,
              rg: data.rows.item(i).rg,
              bairro: data.rows.item(i).bairro,
              numero: data.rows.item(i).numero,
              rua: data.rows.item(i).rua,
              quadra: data.rows.item(i).quadra,
              complemento: data.rows.item(i).complemento,
              telefone: data.rows.item(i).telefone,
              idCompra: data.rows.item(i).idCompra,
              dataCompra: data.rows.item(i).dataCompra,
              statusCompra: data.rows.item(i).status1,
              primeiraParcela: data.rows.item(i).primeiraParcela,
              qtdParcelas: data.rows.item(i).qtdParcelas,
              total: data.rows.item(i).total,

            });
          }
        }
        resolve(arrayItens);
      }, (error) => {
        reject(error);
      })
    })
  }

  cadastrarParcela(parcela) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO parcela (parcela,  preco, vencimento, idCompra ) VALUES (?,?,?,?)";
      this.db.executeSql(sql, [parcela.parcela, parcela.preco, parcela.vencimento, parcela.idCompra]).then((data) => {
        resolve(data);
        let id = data.insertId;
      }, (error) => {
        reject(error);
      });
    });
  }

  editarParcela(parcela) {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE parcela SET vencimento = ?, preco = ?  WHERE id = ?";
      this.db.executeSql(sql, [parcela.vencimento,  parcela.preco, parcela.id]).then((data) => {
        resolve(data);
      
      }, (error) => {
        reject(error);
      });
    });
  }

  pagarParcela(id) {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE parcela SET status = 1 WHERE id = ?";
      this.db.executeSql(sql, [id]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  apagar(id) {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM Parcela where idCompra = ?";
      this.db.executeSql(sql, [id]).then((data) => {
        resolve(data);
       
      }, (error) => {
        reject(error);
      });
    });
  }
}

