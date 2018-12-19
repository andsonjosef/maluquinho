import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ClienteDB } from '../../providers/database/clientedb';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteDTO } from '../../models/cliente.dto';
import { DatePipe } from '@angular/common';


@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {
  private listaCliente: any;
  private todo: FormGroup;
  date = new Date();
  cliente: ClienteDTO = {
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
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
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
    console.log(this.todo);

    this.database.cadastrarCliente(this.cliente).then((data) => {
      console.log(data);
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
