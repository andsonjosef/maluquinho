import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDB } from '../../providers/database/clientedb';

/**
 * Generated class for the ListarClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listar-cliente',
  templateUrl: 'listar-cliente.html',
})
export class ListarClientePage {

  private listaCliente: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: ClienteDB
  ) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ListarClientePage');
    this.listarClientes();
  }

  ionViewWillEnter() {
    this.listarClientes();
  }
  listarClientes() {
    this.database.listarClientes().then((data: any) => {
      console.log(data);
      this.listaCliente = data;
    }, (error) => {
      console.log(error);
    })
  }

  selecionarCliente(id: string) {
    this.navCtrl.push('DetalheClientePage', { id: id });
  }

  pesquisar(ev: any) {
    this.listarClientes();

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.listaCliente.nome = this.listaCliente.nome.filter((c) => {
        return (c.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
