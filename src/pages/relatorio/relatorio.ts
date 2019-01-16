import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RelatorioDB } from '../../providers/database/relatoriodb';
import { DatePipe } from '@angular/common';


@IonicPage()
@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html',
})
export class RelatorioPage {
  private relatorios: any;
  private inicio: Date;
  private fim: Date;
  private total = 0;
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
  ionViewWillEnter() {
    this.listarRelatorios();
  }

  listarRelatorios() {
    this.relatoriodb.listarTodoRelatorio().then((data: any) => {
      this.relatorios = data;
      this.total = 0;
      for(let i = 0; i < this.relatorios.length; i++){
        this.total = this.total + this.relatorios[i].valor
      }
    }, (error) => {
      console.log(error);
    })
  }

  filtrar() {
    let dateInicio = new Date(this.inicio);
    let dateFim = new Date(this.fim);
    let datePipe = new DatePipe('pt');
    let inicioformatado = datePipe.transform(dateInicio, 'yyyy-MM-dd');
    let fimformatado = datePipe.transform(dateFim, 'yyyy-MM-dd');
    this.relatoriodb.listarRelatorioFiltrado(inicioformatado, fimformatado).then((data: any) => {
      this.relatorios = data;
      this.total = 0;
      for(let i = 0; i < this.relatorios.length; i++){
        this.total = this.total + this.relatorios[i].valor
      }
    }, (error) => {
      console.log(error);
    })
  }
}
