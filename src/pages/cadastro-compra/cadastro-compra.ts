import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ListaCompra } from '../../domains/compra/lista-compra';
import { Compra } from '../../domains/compra/compra';
import { CompraDao } from '../../domains/compra/compra-dao';

// cordova plugin add ionic-plugin-keyboard --save
// npm install --save @ionic-native/keyboard
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage()
@Component({
  selector: 'page-cadastro-compra',
  templateUrl: 'cadastro-compra.html',
})

export class CadastroCompraPage {

  @ViewChild('foco') inputEmFoco;

  private listaCompras: ListaCompra;
  public compra: Compra;
  private alteracao: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _dao: CompraDao,
    private keyboard: Keyboard) {

    this.listaCompras = this.navParams.get('listaCompras');
    let compra = this.navParams.get('compraSelecionada');

    if (compra == undefined){
      this.alteracao = false;

      this.compra = new Compra();
    } else {
      this.alteracao = true;

      this.compra = compra;
    }

  }

  ionViewDidLoad(){
    setTimeout(() => {
      this.keyboard.show();
      this.inputEmFoco.setFocus();
    },1000); // 1 segundo.
  }

  salvarCompra(){
    if (this.alteracao){
      this._dao.salvarCompras(this.listaCompras.compras);
    } else {
      this.listaCompras.adicionarCompra(this.compra);

      this._dao.salvarCompras(this.listaCompras.compras);
    }

    this.navCtrl.pop();
  }

}
