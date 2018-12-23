import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  cadastrarCliente() {
    this.navCtrl.push('ClientePage');
  }
  cobranca() {
    this.navCtrl.push('CobrancaPage');
  }
  listarCliente() {
    this.navCtrl.push('ListarClientePage');
  }
  relatorio() {
    this.navCtrl.push('RelatorioPage');
  }
}