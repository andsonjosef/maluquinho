import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ItemDB } from '../../providers/database/itemdb';
import { ParcelaDB } from '../../providers/database/parceladb.';
import { DatePipe } from '@angular/common';
import { RelatorioDB } from '../../providers/database/relatoriodb';
import { ClienteDB } from '../../providers/database/clientedb';

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
  private itens: any;
  private parcelas: any;
  private cliente: any;
  private compra: any;

  relatorio;
  constructor(
    public toastCtrl: ToastController,
    public alerCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private parceladb: ParcelaDB,
    private itemdb: ItemDB,
    private clientedb: ClienteDB,
    private relatoriodb: RelatorioDB,
    public alertCtrl: AlertController) {
  }


  ionViewDidLoad() {
    this.compra = this.navParams.get('compraS');
    this.listarItens(this.compra.id);
    this.listarParcelas(this.compra.id);
    this.buscarCliente(this.compra.idCliente)
    console.log('ionViewDidLoad DetalheCompraPage');
  }

  ionViewWillEnter() {
    this.compra = this.navParams.get('compraS');
    this.listarItens(this.compra.id);
    this.listarParcelas(this.compra.id);
    this.buscarCliente(this.compra.idCliente)
  }

  listarItens(id: number) {
    this.itemdb.listarItens(id).then((data: any) => {
      this.itens = data;
    }, (error) => {
      console.log(error);
    })
  }

  buscarCliente(id: number) {
    this.clientedb.buscarCliente(id).then((data: any) => {
      this.cliente = data;
    }, (error) => {
      console.log(error);
    })
  }
  listarParcelas(id: number) {
    this.parceladb.listarParcelaCompra(id).then((data: any) => {
      this.parcelas = data;
    }, (error) => {
      console.log(error);
    })
  }

  pagar(id: number, valor: any) {

    let confirm = this.alerCtrl.create({
      title: 'Pagar',
      message: 'Você realmente deseja pagar essa parcela?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            let date = new Date();
            let datePipe = new DatePipe('pt');
            let formatade = datePipe.transform(date, 'yyyy-MM-dd');

            this.parceladb.pagarParcela(id).then((data: any) => {
              this.relatorio = {
                dtpagamento: formatade,
                valor: valor,
                idParcela: id
              }
              this.relatoriodb.inserir(this.relatorio).then((data: any) => {

              }, (error) => {
                let toast = this.toastCtrl.create({
                  message: 'Erro ao cadastrar o relatorio.',
                  duration: 2000,
                  position: 'top'
                });
            
                toast.present(toast);
                console.log(error);
              })
              let toast = this.toastCtrl.create({
                message: 'Parcela paga',
                duration: 2000,
                position: 'top'
              });
          
              toast.present(toast);
            }, (error) => {
              let toast = this.toastCtrl.create({
                message: 'Erro ao efetuar o pagamento.',
                duration: 2000,
                position: 'top'
              });
          
              toast.present(toast);
              console.log(error);
            })
            this.listarParcelas(this.compra.id);
            let toast = this.toastCtrl.create({
              message: 'Parcela paga.',
              duration: 2000,
              position: 'top'
            });
        
            toast.present(toast);

          }
        }
       
      ]
    });
    confirm.present()
  }
}
