import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ClienteDB } from '../../providers/database/clientedb';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteDTO } from '../../models/cliente.dto';


@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {
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


  cadastrarCliente() {

    this.database.cadastrarCliente(this.cliente).then((data) => {
      const alert = this.alertCtrl.create({
        title: 'Novo cliente!',
        subTitle: 'Cliente cadastrado com sucesso!',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push('ListarClientePage');

    }, (error) => {
      const alert = this.alertCtrl.create({
        title: 'Erro!',
        subTitle: 'Erro ao cadastrar o cliente!',
        buttons: ['OK']
      });
      alert.present();
      console.log(error);
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientePage');
  }

}
