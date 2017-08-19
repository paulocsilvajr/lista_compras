import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Produto } from '../../domains/produto/produto';
import { ProdutoCompra } from '../../domains/compra/produto-compra';
import { Compra } from '../../domains/compra/compra';

@IonicPage()
@Component({
  selector: 'page-cadastro-item-compra',
  templateUrl: 'cadastro-item-compra.html',
})
export class CadastroItemCompraPage {

  public produto: Produto;
  public produtoCompra: ProdutoCompra;
  public compra: Compra;
  private alteracao: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.produtoCompra = this.navParams.get('produtoCompraSelecionado');

    if (this.produtoCompra == undefined){

      this.produto = this.navParams.get('produtoSelecionado');

      this.produtoCompra = new ProdutoCompra(this.produto);

      this.alteracao = false;

    } else {

      this.produto = this.produtoCompra.produto;

      this.alteracao = true;

    }

    this.compra  = this.navParams.get('compraSelecionada');

  }

  salvarProduto(){
    this.alteracao? this.alterarProduto(): this.inserirProduto();
  }

  inserirProduto(){
    this.compra.adicionarProduto(this.produtoCompra);

    this.navCtrl.pop()
    .then(() => this.navCtrl.pop());
  }

  alterarProduto(){
    this.compra.alterarProduto(this.produtoCompra);

    this.navCtrl.pop();
  }

}
