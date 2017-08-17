import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CadastroItemCompraPage } from '../../pages/cadastro-item-compra/cadastro-item-compra';
import { Produto } from '../../domains/produto/produto';
import { Compra } from '../../domains/compra/compra';

import { ListaProduto } from '../../domains/produto/lista-produto';

/**
 * Generated class for the PesquisaProdutoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pesquisa-produto',
  templateUrl: 'pesquisa-produto.html',
})

export class PesquisaProdutoPage {

  public listaProdutos: ListaProduto = new ListaProduto();
  public compra: Compra;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.compra = this.navParams.get('compraSelecionada');

    this.listaProdutoExemplo();

  }

  cadastrarItemCompra(produto: Produto){
    this.navCtrl.push(CadastroItemCompraPage, {
      produtoSelecionado: produto,
      compraSelecionada: this.compra
    });
  }

  pesquisar(event){
    this.listaProdutoExemplo();

    var valor = event.target.value;

    if (valor && valor.trim() != ''){
      this.listaProdutos.filtrarProduto(valor);
      // this.listaProdutos = this.listaProdutos.filter( (produto) => {
      //   return (produto.nome.toLowerCase().indexOf(valor.toLowerCase()) > -1);
      // });
    }
  }

  listaProdutoExemplo(){
    let lista: Produto[] = [
      new Produto('p1', 'm1', 'un', 2.5),
      new Produto('p2', 'm2', 'un', 2.5),
      new Produto('p3', 'm3', 'un', 2.5),
      new Produto('p4', 'm4', 'un', 2.5),
      new Produto('p5', 'm5', 'un', 2.5),
      new Produto('p6', 'm6', 'un', 2.5),
      new Produto('p7', 'm7', 'un', 2.5),
      new Produto('p8', 'm8', 'un', 2.5),
      new Produto('p9', 'm9', 'un', 2.5),
      new Produto('p10', 'm10', 'un', 2.5),
      new Produto('p11', 'm11', 'un', 2.5),
      new Produto('p12', 'm12', 'un', 2.5),
      new Produto('p13', 'm13', 'un', 2.5),
      new Produto('p14', 'm14', 'un', 2.5),
      new Produto('p15', 'm15', 'un', 2.5)
    ]

    lista.forEach(
      (produto) => this.listaProdutos.adicionarProduto(produto)
    );

  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad PesquisaProdutoPage');
  // }

}
