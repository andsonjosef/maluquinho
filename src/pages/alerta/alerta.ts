import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertaDB } from '../../providers/database/alertadb.';
import { DatePipe } from '@angular/common';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-alerta',
  templateUrl: 'alerta.html',
})
export class AlertaPage {
  private horaS = '10:00'
  private dataAlerta = "";
  private alerta: any
  private hor: number = 0;
  private min: number = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private alertadb: AlertaDB,
    private localNoti: LocalNotifications,
  ) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad AlertaPage');
    this.listarAlerta()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertaPage');
    this.listarAlerta()
  }

  listarAlerta() {
    this.alertadb.dataAlerta().then((data: any) => {
      this.alerta = data;
    }, (error) => {
      console.log(error);
    })
  }

  definirAlerta() {
    this.alerta.hora = parseInt(this.horaS.substring(0, this.horaS.indexOf(":")));
    this.alerta.minuto = parseInt(this.horaS.substring(this.horaS.indexOf(":") + 1));
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
      console.log('error');
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
