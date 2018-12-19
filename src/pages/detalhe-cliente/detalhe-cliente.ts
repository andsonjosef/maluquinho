import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDB } from '../../providers/database/clientedb';
import { ClienteDTO } from '../../models/cliente.dto';
import { CompraDB } from '../../providers/database/compradb';
import { ItemDB } from '../../providers/database/itemdb';

/**
 * Generated class for the DetalheClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhe-cliente',
  templateUrl: 'detalhe-cliente.html',
})
export class DetalheClientePage {
  private cliente: any;
  private compras: any;
  id;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientedb: ClienteDB,
    private compradb: CompraDB,
    private itemdb: ItemDB) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad DetalheClientePage');
    this.id = this.navParams.get('id');
    console.log('id ' + this.id);
    this.buscarCliente(parseInt(this.id));
    this.listarCompras(parseInt(this.id));
  }


  buscarCliente(id: number) {
    this.clientedb.buscarCliente(id).then((data: any) => {
      console.log(data);
      this.cliente = data;
    }, (error) => {
      console.log(error);
    })
  }

  listarCompras(id: number) {
    this.compradb.listarCompras(id).then((data: any) => {

      this.compras = data;
      console.log(data);
      console.log("compras " + this.compras.length);
      console.log(this.compras);
    }, (error) => {
      console.log(error);
    })
  }

  selecionarCompra(id: string) {
    this.navCtrl.push('DetalheCompraPage', { id: id });
  }

  novaCompra() {
    this.navCtrl.push('NovaCompraPage', { id: this.id });
  }
}
