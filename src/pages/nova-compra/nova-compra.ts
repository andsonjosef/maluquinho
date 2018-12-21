import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Item, ModalController } from 'ionic-angular';
import { ItemDTO } from '../../models/item.dto';
import { CompraDB } from '../../providers/database/compradb';
import { ItemDB } from '../../providers/database/itemdb';
import { DatePipe } from '@angular/common';
import { PagamentoModalPage } from '../pagamento-modal/pagamento-modal';

/**
 * Generated class for the NovaCompraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nova-compra',
  templateUrl: 'nova-compra.html',
})
export class NovaCompraPage {
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

  itemN: string[] = []
  quantidades: number[] = []
  precos: number[] = []
  totalI: number[] = []
  idCompras: number[] = []
  rows: boolean[] = [];
  itens: any[] = [];
  clienteId;
  total: number = 0;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private compradb: CompraDB,
    public alertCtrl: AlertController,
    private itemdb: ItemDB) {
    this.rows = [false];
  }
  

  calcular(i) {
    this.precos[i] = parseInt(this.precos[i].toFixed(2));
    this.totalI[i] = (this.quantidades[i] * this.precos[i]);
    console.log("precp " + this.precos[i] + " quantidade " + this.precos[i] + " total " + this.totalI[i]);

  }
  addRow() {
    this.rows.push(false);
  }

  removeRow(i) {    
        this.itemN.splice(i, 1);
        this.quantidades.splice(i, 1);
        this.precos.splice(i, 1);
        this.idCompras.splice(i, 1);
        this.rows.splice(i, 1);
  }
  ionViewDidLoad() {
    this.clienteId = this.navParams.get('id');
    this.compra.idCliente = this.clienteId;
    console.log('ionViewDidLoad NovaCompraPage');
  }

  cadastrarCompra() {
    let date = new Date();
    let datePipe = new DatePipe('pt');
    let formatade = datePipe.transform(date, 'dd-MM-yyyy');

    this.compra.dataCompra = formatade;
    this.compradb.cadastrarCompra(this.compra).then((data: number) => {
      console.log("idCli");
      console.log(data);
      for (let i = 0; i < this.rows.length; i++) {
        this.item.item = this.itemN[i];
        this.item.quantidade = this.quantidades[i];
        this.item.preco = this.precos[i];
        this.item.idCompra = data;
        this.item.total = this.totalI[i];
        this.itemdb.cadastrarItem(this.item).then((data) => {
          console.log(data);
        }, (error) => {
          console.log(error);
        })
      }
      const alert = this.alertCtrl.create({
        title: 'Nova compra!',
        subTitle: 'Compra cadastrada com sucesso!',
        buttons: ['OK']
      });
      alert.present();

    }, (error) => {
      const alert = this.alertCtrl.create({
        title: 'Erro!',
        subTitle: 'Erro ao cadastrar a compra!',
        buttons: ['OK']
      });
      alert.present();
      console.log(error);
    })
    this.compra.dataCompra
  }

  openModal() {

    this.total = 0;
    let i = 0;
    while (i < this.rows.length) {
      this.item = {
        id: 0,
        item: this.itemN[i],
        quantidade: this.quantidades[i],
        preco: this.precos[i],
        idCompra: 0,
        total: this.quantidades[i] * this.precos[i],

      }
      this.total = this.total + (this.quantidades[i] * this.precos[i])

      this.itens[i] = this.item;
      i++;
    }


    let modal = this.modalCtrl.create(PagamentoModalPage, { total: this.total, itens: this.itens, clienteId: this.clienteId });
    modal.present();
  }

}
