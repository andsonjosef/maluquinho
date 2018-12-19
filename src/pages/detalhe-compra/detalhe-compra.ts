import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemDB } from '../../providers/database/itemdb';
import { ParcelaDB } from '../../providers/database/parceladb.';

/**
 * Generated class for the DetalheCompraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhe-compra',
  templateUrl: 'detalhe-compra.html',
})
export class DetalheCompraPage {
  id
  private itens: any;
  private parcelas: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private parceladb: ParcelaDB,
    private itemdb: ItemDB) {
  }


  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.listarItens(this.id);
    this.listarParcelas(this.id);
    console.log('ionViewDidLoad DetalheCompraPage');
  }


  listarItens(id: number) {
    this.itemdb.listarItens(id).then((data: any) => {
      this.itens = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    })
  }

  listarParcelas(id: number) {
    this.parceladb.listarParcelaCompra(id).then((data: any) => {
      this.parcelas = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    })
  }
}
