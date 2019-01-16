import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ClienteDB } from '../../providers/database/clientedb';
import { CompraDB } from '../../providers/database/compradb';
import { EditarClientePage } from '../editar-cliente/editar-cliente';

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
    public modalCtrl: ModalController,) {
  }

  ionViewWillEnter() {
    this.id = this.navParams.get('id');
    this.buscarCliente(parseInt(this.id));
    this.listarCompras(parseInt(this.id));
  }

  buscarCliente(id: number) {
    this.clientedb.buscarCliente(id).then((data: any) => {
      this.cliente = data;
    }, (error) => {
      console.log(error);
    })
  }

  listarCompras(id: number) {
    this.compradb.listarCompras(id).then((data: any) => {
      this.compras = data
    }, (error) => {
      console.log(error);
    })
  }

  editarCliente() {
    let modal = this.modalCtrl.create(EditarClientePage, {cliente: this.cliente});
    modal.present();
   
  }
  
  selecionarCompra(compraS: any) {
    this.navCtrl.push('DetalheCompraPage', { compraS: compraS });
  }

  novaCompra() {
    this.navCtrl.push('NovaCompraPage', { id: this.id });
  }
}

