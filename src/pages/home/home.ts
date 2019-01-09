import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, ToastController } from 'ionic-angular';
import { SqliteDbCopy } from '@ionic-native/sqlite-db-copy';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    private sqliteDbCopy: SqliteDbCopy,
    public alertCtrl: AlertController,
    private androidPermissions: AndroidPermissions,
    public toastCtrl: ToastController,) {

  }



  ionViewWillEnter() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then( 
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

  }
  cadastrarCliente() {
    this.navCtrl.push('ClientePage');
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
              .catch((error: any) =>  toasterro.present(toasterro));
             
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