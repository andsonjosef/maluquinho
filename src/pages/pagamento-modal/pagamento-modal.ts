import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { ParcelaDB } from '../../providers/database/parceladb.';
import { CompraDB } from '../../providers/database/compradb';
import { ItemDB } from '../../providers/database/itemdb';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertaDB } from '../../providers/database/alertadb.';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-pagamento-modal',
  templateUrl: 'pagamento-modal.html',
})
export class PagamentoModalPage {

  private dataAlerta = "";
  private alerta: any
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
    private alertadb: AlertaDB,
    private localNoti: LocalNotifications,
  ) {
    this.todo = this.formBuilder.group({
      desconto: ['', Validators.required],
      parcelas: ['', Validators.required],
      dataprimeira: ['', Validators.required],
    });
  }

  ionViewWillEnter() {
    this.listarAlerta()
  }

  ionViewDidLoad() {
    this.clienteId = this.navParams.get('clienteId');
    this.total = this.navParams.get('total');
    this.itens = this.navParams.get('itens');
    this.final = this.total - this.desconto;
    this.listarAlerta()
    console.log('ionViewDidLoad PagamentoModalPage' + this.clienteId);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  calcular() {
    this.final = this.total - this.desconto;
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
      this.navCtrl.popTo(this.navCtrl.getByIndex(1))
      
    
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
    this.definirAlerta();
    this.compra.dataCompra
  }

  listarAlerta() {
    this.alertadb.dataAlerta().then((data: any) => {
      this.alerta = data;
    }, (error) => {
      console.log(error);
    })
  }

  definirAlerta() {
    let date = new Date();
    let datePipe = new DatePipe('pt');
    let formatade = datePipe.transform(date, 'yyyy-MM-dd');
    if (date.getHours() >= this.alerta.hora) {
      if (date.getMinutes() > this.alerta.minuto) {
        this.alertadb.dataProximaDiaSeguinte(formatade).then((data: any) => {
          this.dataAlerta = data;
          this.alerta.dataAlerta = data;
        }, (error) => {
          console.log(error);
        })
      } else {
        this.alertadb.dataProxima(formatade).then((data: any) => {
          this.dataAlerta = data;
          this.alerta.dataAlerta = data;
        }, (error) => {
          console.log(error);
        })
      }
    } else {
      this.alertadb.dataProxima(formatade).then((data: any) => {
        this.dataAlerta = data;
        this.alerta.dataAlerta = data;
      }, (error) => {
        console.log(error);
      })
    }
    this.alerta.id = 1;
    let formddtaAlerta = datePipe.transform(this.dataAlerta, 'yyyy-MM-dd');
    this.alerta.dataAlerta = formddtaAlerta
    this.alertadb.apagar();
    this.alertadb.definirAlerta(this.alerta).then((data: any) => {
    }, (error) => {
      console.log(error);
    })
    this.listarAlerta()
    let dateAle = new Date()
    let ano = parseInt(this.alerta.dataAlerta.substring(0, this.alerta.dataAlerta.indexOf("-")));
    let mes = parseInt(this.alerta.dataAlerta.substring(this.alerta.dataAlerta.indexOf("-") + 1, this.alerta.dataAlerta.lastIndexOf("-")));
    let dia = parseInt(this.alerta.dataAlerta.substring(this.alerta.dataAlerta.lastIndexOf("-") + 1));
    dateAle.setFullYear(ano, mes - 1, dia)
    dateAle.setHours(this.alerta.hora, this.alerta.minuto, 0)
    this.localNoti.schedule({
      id: 1,
      title: 'Atenção',
      text: 'Existem novas cobranças para hoje.',
      trigger: { at: new Date(dateAle) },
    });
  }
}
