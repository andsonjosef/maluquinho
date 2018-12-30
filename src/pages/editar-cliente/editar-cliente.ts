import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteDB } from '../../providers/database/clientedb';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the EditarClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-cliente',
  templateUrl: 'editar-cliente.html',
})
export class EditarClientePage {
  private listaCliente: any;
  private todo: FormGroup;
  private date = new Date();
  private cliente: ClienteDTO = {
    id: 0,
    nome: "",
    cpf: "",
    rg: "",
    bairro: "",
    numero: "",
    rua: "",
    quadra: "",
    complemento: "",
    telefone: ""
  };


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private database: ClienteDB,
    private formBuilder: FormBuilder,
    public viewCtrl: ViewController,
  ) {
    this.todo = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      bairro: ['', Validators.required],
      numero: ['', Validators.required],
      rua: ['', Validators.required],
      quadra: ['', Validators.required],
      complemento: ['', Validators.required],
      telefone: ['', Validators.required],

    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  editarCliente() {

    this.database.editarCliente(this.cliente).then((data) => {
      const alert = this.alertCtrl.create({
        title: 'Novo cliente!',
        subTitle: 'Cliente editado com sucesso!',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push('ListarClientePage');

    }, (error) => {
      const alert = this.alertCtrl.create({
        title: 'Erro!',
        subTitle: 'Erro ao editar o cliente!',
        buttons: ['OK']
      });
      alert.present();
      console.log(error);
    })
  }


  ionViewDidLoad() {
    this.cliente = this.navParams.get('cliente');
    console.log('ionViewDidLoad ClientePage');
  }

}
