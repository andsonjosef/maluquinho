import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { ClienteDTO } from '../../models/cliente.dto';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClienteDB {

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
          "CREATE TABLE IF NOT EXISTS Cliente (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cpf text, rg text, bairro text, numero text, rua text, quadra text, complemento text, telefone text); ", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  cadastrarCliente(cliente: ClienteDTO) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO cliente (nome, cpf, rg, bairro, numero , rua, quadra, complemento, telefone ) VALUES (?,?,?,?,?,?,?, ?, ?)";
      this.db.executeSql(sql, [cliente.nome, cliente.cpf, cliente.rg, cliente.bairro, cliente.numero, cliente.rua, cliente.quadra, cliente.complemento, cliente.telefone]).then((data) => {
        resolve(data);
        let id = data.insertId;
      }, (error) => {
        reject(error);
      });
    });
  }

  editarCliente(cliente: ClienteDTO) {
    return new Promise((resolve, reject) => {
      let sql = "UPDATE cliente SET nome = ?, cpf = ?, rg = ?, bairro = ?, numero = ? , rua = ?, quadra = ?, complemento = ?, telefone = ? WHERE id = ?";
      this.db.executeSql(sql, [cliente.nome, cliente.cpf, cliente.rg, cliente.bairro, cliente.numero, cliente.rua, cliente.quadra, cliente.complemento, cliente.telefone, cliente.id]).then((data) => {
        resolve(data);
      
      }, (error) => {
        reject(error);
      });
    });
  }
  listarClientes() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM cliente ORDER BY nome", []).then((data) => {
        let arrayClientes = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayClientes.push({
              id: data.rows.item(i).id,
              nome: data.rows.item(i).nome,
              cpf: data.rows.item(i).cpf,
              rg: data.rows.item(i).rg,
              bairro: data.rows.item(i).bairro,
              numero: data.rows.item(i).numero,
              rua: data.rows.item(i).rua,
              quadra: data.rows.item(i).quadra,
              complemento: data.rows.item(i).complemento,
              telefone: data.rows.item(i).telefone

            });
          }
        }
        resolve(arrayClientes);
      }, (error) => {
        reject(error);
      })
    })
  }

  listarClientesNome(nome) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM cliente where nome like ? ORDER BY nome", [ "%" + nome + "%"]).then((data) => {
        let arrayClientes = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayClientes.push({
              id: data.rows.item(i).id,
              nome: data.rows.item(i).nome,
              cpf: data.rows.item(i).cpf,
              rg: data.rows.item(i).rg,
              bairro: data.rows.item(i).bairro,
              numero: data.rows.item(i).numero,
              rua: data.rows.item(i).rua,
              quadra: data.rows.item(i).quadra,
              complemento: data.rows.item(i).complemento,
              telefone: data.rows.item(i).telefone

            });
          }
        }
        resolve(arrayClientes);
      }, (error) => {
        reject(error);
      })
    })
  }

  buscarCliente(id) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM cliente where id = ? ", [id]).then((data) => {
        let cliente;
        if (data.rows.length > 0) {
          cliente = {
            id: data.rows.item(0).id,
            nome: data.rows.item(0).nome,
            cpf: data.rows.item(0).cpf,
            rg: data.rows.item(0).rg,
            bairro: data.rows.item(0).bairro,
            numero: data.rows.item(0).numero,
            rua: data.rows.item(0).rua,
            quadra: data.rows.item(0).quadra,
            complemento: data.rows.item(0).complemento,
            telefone: data.rows.item(0).telefone
          };
        }
        resolve(cliente);
      }, (error) => {
        reject(error);
      })
    })
  }



}

