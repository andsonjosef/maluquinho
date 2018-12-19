import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaCompraPage } from './nova-compra';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    NovaCompraPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaCompraPage),
    BrMaskerModule
  ],
})
export class NovaCompraPageModule {}
