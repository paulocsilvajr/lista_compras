import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Produto } from '../../domains/produto/produto';
import { ProdutoCompra } from '../../domains/compra/produto-compra';
import { Compra } from '../../domains/compra/compra';

/**
 * Generated class for the CadastroItemCompraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-item-compra',
  templateUrl: 'cadastro-item-compra.html',
})
export class CadastroItemCompraPage {

  public produto: Produto;
  public produtoCompra: ProdutoCompra;
  public compra: Compra;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.produto = this.navParams.get('produtoSelecionado');

    this.produtoCompra = new ProdutoCompra(this.produto);
    
    this.compra  = this.navParams.get('compraSelecionada');
  }

  inserirProduto(){
    this.compra.produtos.push(this.produtoCompra);

    this.navCtrl.pop()
    .then(() => this.navCtrl.pop());
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad CadastroItemCompraPage');
  // }

}
