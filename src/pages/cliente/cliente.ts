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
  private validar: boolean;
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

    this.validar = this.validarCpf(this.cliente.cpf);
    if (this.validar == false) {
      let toast = this.toastCtrl.create({
        message: 'CPF invalido',
        duration: 2000,
        position: 'top'
      });
      toast.present(toast);
    } else {
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
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientePage');
  }

  validarCpf(cpf: string): boolean {
    cpf = cpf.replace(".", "");
    cpf = cpf.replace(".", "");
    cpf = cpf.replace("-", "");
    console.log("cpf " + cpf)
    if (cpf == null) {
      return false;
    }
    if (cpf.length != 11) {
      return false;
    }

    if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
      return false;
    }
    let numero: number = 0;
    let caracter: string = '';
    let numeros: string = '0123456789';
    let j: number = 10;
    let somatorio: number = 0;
    let resto: number = 0;
    let digito1: number = 0;
    let digito2: number = 0;
    let cpfAux: string = '';
    cpfAux = cpf.substring(0, 9);
    for (let i: number = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) == -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i: number = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf != cpfAux) {
      return false;
    }
    else {
      return true;
    }
  }

}
