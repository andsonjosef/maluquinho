import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, ToastController, Platform, ModalController } from 'ionic-angular';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AlertaPage } from '../alerta/alerta';
import { DatePipe } from '@angular/common';
import { AlertaDB } from '../../providers/database/alertadb.';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private dataAlerta = "";
  private alerta: any
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    private sqliteDbCopy: SqliteDbCopy,
    public alertCtrl: AlertController,
    private androidPermissions: AndroidPermissions,
    private platform: Platform,
    private localNoti: LocalNotifications,
    public toastCtrl: ToastController,
    private alertadb: AlertaDB,
  ) {
    this.platform.ready().then((readySource) => {
      this.localNoti.on('click').subscribe(notification => {
        alert(notification);
        alert(notification.data);
      });
    });
  }


  ionViewWillEnter() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    this.listarAlerta()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListarClientePage');
    this.listarAlerta()
  }

  cadastrarCliente() {
    this.navCtrl.push('ClientePage');
  }

  horaAlerta() {
    let modal = this.modalCtrl.create(AlertaPage, null, {
      cssClass: "alerta-modal"
    })
    modal.present();
  }
  cobranca() {
    this.navCtrl.push('CobrancaPage');
  }

  listarCliente() {
    this.navCtrl.push('ListarClientePage');
  }

  relatorio() {
    this.navCtrl.push('RelatorioPage');
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

  carregarBackup() {
    let confirm = this.alertCtrl.create({
      title: 'Backup',
      message: 'Você realmente deseja carregar o backup? Os dados atuais serão substituidos!',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            let toasterro = this.toastCtrl.create({
              message: 'Erro ao carregar o backup.',
              duration: 2000,
              position: 'top'
            });

            let toastsucefull = this.toastCtrl.create({
              message: 'Backup carregado com secusso!.',
              duration: 2000,
              position: 'top'
            });
            this.sqliteDbCopy.copyDbFromStorage('maluquinho.db', 0, "/storage/emulated/0/maluquinho.db", true)
              .then((res: any) => toastsucefull.present(toastsucefull))
              .catch((error: any) => toasterro.present(toasterro));

          }
        }

      ]
    });
    confirm.present()
  }

  criarBackup() {

    let confirm = this.alertCtrl.create({
      title: 'Backup',
      message: 'Você realmente deseja criar um backup? Os dados atuais serão substituidos!',
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            let toasterro = this.toastCtrl.create({
              message: 'Erro ao criar o backup.',
              duration: 2000,
              position: 'top'
            });

            let toastsucefull = this.toastCtrl.create({
              message: 'Backup criado com secusso!.',
              duration: 2000,
              position: 'top'
            });
            this.sqliteDbCopy.copyDbToStorage('maluquinho.db', 0, "/storage/emulated/0/", true)
              .then((res: any) => toastsucefull.present(toastsucefull))
              .catch((error: any) => toasterro.present(toasterro));
          }
        }

      ]
    });
    confirm.present()
  }
}