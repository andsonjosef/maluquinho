import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RelatorioDB } from '../../providers/database/relatoriodb';

/**
 * Generated class for the RelatorioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html',
})
export class RelatorioPage {
  private relatorios: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public relatoriodb: RelatorioDB
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RelatorioPage');
    this.listarRelatorios();
  }

  listarRelatorios() {
    this.relatoriodb.listarTodoRelatorio().then((data: any) => {
      this.relatorios = data;
      console.log(data);
    }, (error) => {
      console.log(error);
    })
  }
}
