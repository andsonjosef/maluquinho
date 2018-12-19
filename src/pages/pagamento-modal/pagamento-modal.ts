import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ItemDTO } from '../../models/item.dto';

/**
 * Generated class for the PagamentoModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagamento-modal',
  templateUrl: 'pagamento-modal.html',
})
export class PagamentoModalPage {
  compra = {
    id: "",
    idCliente: "",
    dataCompra: "",
    status: "",
    primeiraParcela: "",
    qtdParcelas: 1,
    total: "",
  }

  item = {
    id: 0,
    item: "",
    quantidade: 0,
    preco: 0,
    idCompra: 0,
    total: 0,

  }
  itens: any[] =[];

  total:number = 0;
  desconto:number = 0;
  final:number = 0;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  calcular() {
    this.final = this.total - this.desconto;
  }
  ionViewDidLoad() {
   
    this.total = this.navParams.get('total');
    this.itens = this.navParams.get('itens');
    this.final = this.total - this.desconto;
    console.log('ionViewDidLoad PagamentoModalPage' + this.total);
  }

}
