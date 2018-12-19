import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientePage } from './cliente';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    ClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ClientePage),
    BrMaskerModule
  ],
})
export class ClientePageModule {}
