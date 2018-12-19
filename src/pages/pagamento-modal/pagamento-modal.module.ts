import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagamentoModalPage } from './pagamento-modal';

@NgModule({
  declarations: [
    PagamentoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PagamentoModalPage),
  ],
})
export class PagamentoModalPageModule {}
