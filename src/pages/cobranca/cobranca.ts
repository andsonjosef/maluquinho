import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParcelaDB } from '../../providers/database/parceladb.';
import { DatePipe } from '@angular/common';
import { CompraDB } from '../../providers/database/compradb';

/**
 * Generated class for the CobrancaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cobranca',
  templateUrl: 'cobranca.html',
})
export class CobrancaPage {
  private cobranca: string = "hoje";
  private parcelas: any[] = [];
  private parcelasAmanha: any[] = [];
  private parcelasVencidas: any[] = [];
  private compra: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private parceladb: ParcelaDB,
    private compradb: CompraDB, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CobrancaPage');
    this.vencimentoDia();
    this.amanha();
    this.vencidos();
    this.selecionarCompra(null);

  }

  ionViewWillEnter() {
    this.vencimentoDia();
    this.amanha();
    this.vencidos();
    this.selecionarCompra(null);
  }
  vencimentoDia() {
    let date = new Date();
    let datePipe = new DatePipe('en-US');
    let formatade = datePipe.transform(date, 'yyyy-MM-dd');
    this.parceladb.listarVencimentoDia(formatade).then((data: any) => {
      this.parcelas = data;
    }, (error) => {
      console.log(error);
    })
  }

  vencidos() {
    let date = new Date();
    let datePipe = new DatePipe('en-US');
    let formatade = datePipe.transform(date, 'yyyy-MM-dd');
    this.parceladb.listarVencidos(formatade).then((data: any) => {
      this.parcelasVencidas = data;
    }, (error) => {
      console.log(error);
    })
  }


  selecionarCompra(id: any) {

    this.compradb.buscarCompra(id).then((data: any) => {
      this.compra = data;
      if (id != null) {
        this.navCtrl.push('DetalheCompraPage', { compraS: this.compra });
      }
    }, (error) => {
      console.log(error);
    })

  }


  amanha() {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    let datePipe = new DatePipe('en-US');
    let formatade = datePipe.transform(date, 'yyyy-MM-dd');
    this.parceladb.listarParcelasAmanha(formatade).then((data: any) => {
      this.parcelasAmanha = data;
    }, (error) => {
      console.log(error);
    })
  }
}
