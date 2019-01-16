import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteDB } from '../../providers/database/clientedb';

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
    public toastCtrl: ToastController,
    public navParams: NavParams,
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
     
      this.navCtrl.push('ListarClientePage');
      let toast = this.toastCtrl.create({
        message: 'Cliente editado com sucesso.',
        duration: 2000,
        position: 'top'
      }); 
      toast.present(toast);
    }, (error) => {
      let toast = this.toastCtrl.create({
        message: 'Erro ao editar o cliente.',
        duration: 2000,
        position: 'top'
      }); 
      toast.present(toast);
      console.log(error);
    })
  }

  ionViewDidLoad() {
    this.cliente = this.navParams.get('cliente');
    console.log('ionViewDidLoad ClientePage');
  }

}
