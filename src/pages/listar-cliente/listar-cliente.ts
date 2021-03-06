import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDB } from '../../providers/database/clientedb';

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
      this.listaCliente = data;
    }, (error) => {
      console.log(error);
    })
  }

  selecionarCliente(id: string) {
    this.navCtrl.push('DetalheClientePage', { id: id });
  }
  
  cadastrarCliente() {
    this.navCtrl.push('ClientePage');
  }
  pesquisar(ev: any) {
    this.listaCliente = [];
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.database.listarClientesNome(val).then((data: any) => {
        this.listaCliente = data;
      }, (error) => {
        console.log(error);
      })
    } else {
      this.listarClientes();
    }
  }

}
