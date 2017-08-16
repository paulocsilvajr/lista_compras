import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroCompraPage } from './cadastro-compra';

@NgModule({
  declarations: [
    CadastroCompraPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroCompraPage),
  ],
})
export class CadastroCompraPageModule {}
