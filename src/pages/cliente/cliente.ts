import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
    public toastCtrl: ToastController,
    public navParams: NavParams,
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
      this.navCtrl.push('ListarClientePage');
      let toast = this.toastCtrl.create({
        message: 'Cliente cadastrado com sucesso.',
        duration: 2000,
        position: 'top'
      });
  
      toast.present(toast);

    }, (error) => {
      let toast = this.toastCtrl.create({
        message: 'Erro ao cadastrar o cliente.',
        duration: 2000,
        position: 'top'
      });
  
      toast.present(toast);
      console.log(error);
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientePage');
  }

}
