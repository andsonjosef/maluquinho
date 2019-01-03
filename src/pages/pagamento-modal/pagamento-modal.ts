import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { ItemDTO } from '../../models/item.dto';
import { DatePipe } from '@angular/common';
import { ParcelaDB } from '../../providers/database/parceladb.';
import { CompraDB } from '../../providers/database/compradb';
import { ItemDB } from '../../providers/database/itemdb';
import { parseDate } from 'ionic-angular/umd/util/datetime-util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
 private compra = {
    id: "",
    idCliente: "",
    dataCompra: "",
    status: "",
    primeiraParcela: "",
    qtdParcelas: 1,
    total: 0,
  }

 private item = {
    id: 0,
    item: "",
    quantidade: 0,
    preco: 0,
    idCompra: 0,
    total: 0,
  }

 private parcela = {
    id: 0,
    parcela: "",
    status: 0,
    preco: 0,
    idCompra: 0,
    vencimento: ""
  }
  private itens: any[] = [];
  private clienteId;
  private compraId;
  private total: number = 0;
  private desconto: number = 0;
  private final: number = 0;
  private todo: FormGroup;

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private compradb: CompraDB,
    public alertCtrl: AlertController,
    private itemdb: ItemDB,
    private parceladb: ParcelaDB,
    private formBuilder: FormBuilder,
  ) {
    this.todo = this.formBuilder.group({
      desconto: ['', Validators.required],
      parcelas: ['', Validators.required],
      dataprimeira: ['', Validators.required],
    });
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
    let date = new Date();
    let datePipe = new DatePipe('en-US');
    let formatade = datePipe.transform(date, 'dd-MM-yyyy');
    let formatadep = datePipe.transform(this.compra.primeiraParcela, 'dd-MM-yyyy');
    this.compra.dataCompra = formatade;
    this.compra.total = this.final;
    this.compra.idCliente = this.clienteId;

    this.compradb.cadastrarCompra(this.compra).then((data: number) => {
      this.compraId = data;
      for (let i = 0; i < this.itens.length; i++) {
        this.itens[i].idCompra = this.compraId;
        this.itemdb.cadastrarItem(this.itens[i]).then((data) => {
        }, (error) => {
          console.log(error);
        })
      }

      for (let i = 0; i < this.compra.qtdParcelas; i++) {
        let date = new Date(this.compra.primeiraParcela);
        var month = date.getMonth();
        date.setMonth(month + i);
        date.setDate(date.getDate() + 1);
        let datePipe = new DatePipe('pt');
        let formatade = datePipe.transform(date, 'yyyy-MM-dd');
        this.parcela = {
          id: 0,
          parcela: (i + 1) + "/" + this.compra.qtdParcelas,
          status: 0,
          preco: this.final / this.compra.qtdParcelas,
          idCompra: 0,
          vencimento: formatade
        }
        this.parcela.idCompra = this.compraId;
        this.parceladb.cadastrarParcela(this.parcela).then((data) => {
        }, (error) => {
          console.log(error);
        })
      }

      this.navCtrl.setRoot('DetalheClientePage', { id: this.clienteId });
      let toast = this.toastCtrl.create({
        message: 'Compra cadastrada com sucesso.',
        duration: 2000,
        position: 'top'
      });
  
      toast.present(toast);
    }, (error) => {
      let toast = this.toastCtrl.create({
        message: 'Erro ao cadastrar a compra.',
        duration: 2000,
        position: 'top'
      });
  
      toast.present(toast);
      console.log(error);
    })
    this.compra.dataCompra
  }

}
