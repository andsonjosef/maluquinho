import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarClientePage } from './editar-cliente';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    EditarClientePage,
  ],
  imports: [
    IonicPageModule.forChild(EditarClientePage),
    BrMaskerModule
  ],
})
export class EditarClientePageModule {}
