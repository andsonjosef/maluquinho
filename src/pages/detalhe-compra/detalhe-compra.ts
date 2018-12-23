import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ItemDB } from '../../providers/database/itemdb';
import { ParcelaDB } from '../../providers/database/parceladb.';
import { DatePipe } from '@angular/common';
import { RelatorioDB } from '../../providers/database/relatoriodb';

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
  relatorio;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private parceladb: ParcelaDB,
    private itemdb: ItemDB,
    private relatoriodb: RelatorioDB,
    public alertCtrl: AlertController) {
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

  pagar(id: number, valor: any) {
    let date = new Date();
    let datePipe = new DatePipe('pt');
    let formatade = datePipe.transform(date, 'dd-MM-yyyy');

    this.parceladb.pagarParcela(id).then((data: any) => {
      console.log(data);
      this.relatorio = {
        dtpagamento: formatade,
        valor: valor,
        idParcela: id
      }
      this.relatoriodb.inserir(this.relatorio).then((data: any) => {
        console.log(data);

      }, (error) => {
        const alert = this.alertCtrl.create({
          title: 'Erro!',
          subTitle: 'Erro ao inserir no relatorio!',
          buttons: ['OK']
        });
        alert.present();
        console.log(error);
      })
    }, (error) => {
      const alert = this.alertCtrl.create({
        title: 'Erro!',
        subTitle: 'Erro ao pagar!',
        buttons: ['OK']
      });
      alert.present();
      console.log(error);
    })
  }
}
