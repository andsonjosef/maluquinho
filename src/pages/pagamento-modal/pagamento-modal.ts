import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ItemDTO } from '../../models/item.dto';
import { DatePipe } from '@angular/common';
import { ParcelaDB } from '../../providers/database/parceladb.';
import { CompraDB } from '../../providers/database/compradb';
import { ItemDB } from '../../providers/database/itemdb';
import { parseDate } from 'ionic-angular/umd/util/datetime-util';

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
    total: 0,
  }

  item = {
    id: 0,
    item: "",
    quantidade: 0,
    preco: 0,
    idCompra: 0,
    total: 0,
  }

  parcela = {
    id: 0,
    parcela: "",
    status: 0,
    preco: 0,
    idCompra: 0,
    vencimento: new Date()
  }
  itens: any[] = [];
  clienteId;
  compraId;
  total: number = 0;
  desconto: number = 0;
  final: number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private compradb: CompraDB,
    public alertCtrl: AlertController,
    private itemdb: ItemDB,
    private parceladb: ParcelaDB,
  ) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  calcular() {
    this.final = this.total - this.desconto;
  }
  ionViewDidLoad() {
    this.clienteId = this.navParams.get('clienteId');
    this.total = this.navParams.get('total');
    this.itens = this.navParams.get('itens');
    this.final = this.total - this.desconto;
    console.log('ionViewDidLoad PagamentoModalPage' + this.clienteId);
  }

  cadastrarCompra() {
    console.log("data esc " + this.compra.primeiraParcela);
    let date = new Date();
    let datePipe = new DatePipe('en-US');
    let formatade = datePipe.transform(date, 'dd-MM-yyyy');
    let formatadep = datePipe.transform(this.compra.primeiraParcela, 'dd-MM-yyyy');
    console.log("data esc for " + this.compra.primeiraParcela);
    this.compra.dataCompra = formatade;
    this.compra.total = this.final;
    this.compra.idCliente = this.clienteId;
    console.log("this.compra");

    console.log(this.compra);
    this.compradb.cadastrarCompra(this.compra).then((data: number) => {
      console.log(data);
      this.compraId = data;
      for (let i = 0; i < this.itens.length; i++) {
        console.log("this.itens[i]");

        console.log(this.itens[i]);
        this.itens[i].idCompra = this.compraId;
        this.itemdb.cadastrarItem(this.itens[i]).then((data) => {
          console.log(data);


        }, (error) => {
          console.log(error);
        })
      }

      for (let i = 0; i < this.compra.qtdParcelas; i++) {
        let date = new Date(this.compra.primeiraParcela);

        var month = date.getMonth();
        date.setMonth(month + i);

        this.parcela = {
          id: 0,
          parcela: (i + 1) + "/" + this.compra.qtdParcelas,
          status: 0,
          preco: this.final / this.compra.qtdParcelas,
          idCompra: 0,
          vencimento: date

        }
        console.log("this.parcela");

        this.parcela.idCompra = this.compraId;
        console.log(this.parcela);
        this.parceladb.cadastrarParcela(this.parcela).then((data) => {
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
      this.navCtrl.setRoot('DetalheClientePage', { id: this.clienteId });

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

}
