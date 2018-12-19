import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheCompraPage } from './detalhe-compra';

@NgModule({
  declarations: [
    DetalheCompraPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheCompraPage),
  ],
})
export class DetalheCompraPageModule {}
