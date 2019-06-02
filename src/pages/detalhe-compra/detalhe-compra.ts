import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ItemDB } from '../../providers/database/itemdb';
import { ParcelaDB } from '../../providers/database/parceladb.';
import { DatePipe } from '@angular/common';
import { RelatorioDB } from '../../providers/database/relatoriodb';
import { ClienteDB } from '../../providers/database/clientedb';
import { CompraDB } from '../../providers/database/compradb';

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
    public navCtrl: NavController,
    public navParams: NavParams,
    private parceladb: ParcelaDB,
    private itemdb: ItemDB,
    private clientedb: ClienteDB,
    private compradb: CompraDB,
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

  apagar() {
    
    let confirm = this.alertCtrl.create({
      title: 'Pagar',
      message: 'Você realmente deseja apagar essa Compra?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log("tamanho " + this.parcelas.length)
            for (let i = 0; i < this.parcelas.length; i++) {
              if (this.parcelas[i].status == 1) {
                this.relatoriodb.apagar(this.parcelas[i].id)
              }
            }
            this.parceladb.apagar(this.compra.id)
            this.itemdb.apagar(this.compra.id)
            this.compradb.apagar(this.compra.id)
            this.navCtrl.push('DetalheClientePage', { id: this.cliente.id });
          }
        }

      ]
    });
    confirm.present()
  }
  pagar(id: number, valor: any) {

    let confirm = this.alertCtrl.create({
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

  selecionarData(p) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Editar');
    alert.addInput({
      name: 'preco',
      type: 'number',
      value: p.preco
    });
    alert.addInput({
      name: 'date',
      type: 'date',
      value: p.vencimento
    });
    alert.addButton('Cancelar');
    alert.addButton({
      text: 'Confirmar',
      handler: data => {
        console.log(data.date);
        p.preco = data.preco;
        p.vencimento = data.date;
        this.editarParcela(p);
      }
    });
    alert.present();
  }

  editarParcela(p) {
    console.log(p);
    this.parceladb.editarParcela(p).then((data) => {
      this.listarItens(this.compra.id);
      this.listarParcelas(this.compra.id);
      let novoTotal = 0;
      for(let i = 0; i < this.parcelas.length; i++){
        novoTotal = novoTotal + this.parcelas[i].preco
      }
      this.compradb.editarCompra(novoTotal, this.parcelas[0].id);
      let toast = this.toastCtrl.create({
        message: 'Parcela alterada.',
        duration: 2000,
        position: 'top'
      });

      toast.present(toast);

    }, (error) => {
      console.log(error);
      let toast = this.toastCtrl.create({
        message: 'Erro ao alterar a Parcela.',
        duration: 2000,
        position: 'top'
      });

      toast.present(toast);

    })
  }
}
