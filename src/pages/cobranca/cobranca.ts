import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ParcelaDB } from '../../providers/database/parceladb.';
import { DatePipe } from '@angular/common';

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
  cobranca: string = "hoje";
  parcelas: any[] = [];
  parcelasAmanha: any[] = [];
  parcelasVencidas: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private parceladb: ParcelaDB, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CobrancaPage');
    this.vencimentoDia();
    this.amanha();
    this.vencidos();
  }

  vencimentoDia() {
    let date = new Date();
    let datePipe = new DatePipe('en-US');
    let formatade = datePipe.transform(date, 'yyyy-MM-dd');
    console.log("formatada " + formatade)
    this.parceladb.listarVencimentoDia(formatade).then((data: any) => {
      this.parcelas = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    })
  }

  vencidos() {
    let date = new Date();
    let datePipe = new DatePipe('en-US');
    let formatade = datePipe.transform(date, 'yyyy-MM-dd');
    console.log("formatada " + formatade)
    this.parceladb.listarVencidos(formatade).then((data: any) => {
      this.parcelasVencidas = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    })
  }

  amanha() {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    let datePipe = new DatePipe('en-US');
    let formatade = datePipe.transform(date, 'yyyy-MM-dd');
    console.log("formatada " + formatade)
    this.parceladb.listarParcelasAmanha(formatade).then((data: any) => {
      this.parcelasAmanha = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    })
  }
}
