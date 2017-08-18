import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { CadastroItemCompraPage } from '../../pages/cadastro-item-compra/cadastro-item-compra';
import { CadastroProdutoPage } from '../../pages/cadastro-produto/cadastro-produto';
import { Produto } from '../../domains/produto/produto';
import { Compra } from '../../domains/compra/compra';
import { ListaProduto } from '../../domains/produto/lista-produto';
import { ProdutoDao } from '../../domains/produto/produto-dao';

@IonicPage()
@Component({
  selector: 'page-pesquisa-produto',
  templateUrl: 'pesquisa-produto.html',
})

export class PesquisaProdutoPage {

  public listaProdutos: ListaProduto = new ListaProduto();
  public compra: Compra;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _dao: ProdutoDao
    ) {

    this.compra = this.navParams.get('compraSelecionada');
    
    this.listaProdutoExemplo();
    // this.carregarLista();


  }

  cadastrarItemCompra(produto: Produto){
    this.navCtrl.push(CadastroItemCompraPage, {
      produtoSelecionado: produto,
      compraSelecionada: this.compra
    });
  }

  pesquisar(event){
    // this.carregarLista();
    this.listaProdutoExemplo();

    var valor = event.target.value;

    if (valor && valor.trim() != ''){
      this.listaProdutos.filtrarProduto(valor);
    }
  }

  alterarProduto(produto: Produto){
    this.navCtrl.push(CadastroProdutoPage, {
      'listaProdutosSelecionada': this.listaProdutos,
      'produtoSelecionado': produto
    });
  }

  removerProduto(produto: Produto){
    this.listaProdutos.removerProduto(produto);
  }

  alertaAlteracao(produto: Produto){
    this._alertCtrl.create({
      title: 'Atenção',
      subTitle: `Alterar o produto ${produto.descricao}`,
      buttons: [{
        text: 'Sim',
        handler: () => {
          this.alterarProduto(produto);

          console.log('Alterado ' + produto.descricao);          
        }
      },{
        text: 'Não'
      }]
    }).present();
  }

  alertaRemocao(produto: Produto){
    this._alertCtrl.create({
      title: 'Atenção',
      subTitle: `Remover o produto ${produto.descricao}`,
      buttons: [{
        text: 'Sim',
        handler: () => {
          this.removerProduto(produto);

          console.log('Excluído ' + produto.descricao);          
        }
      },{
        text: 'Não'
      }]
    }).present();
  }

  cadastroProduto(){
    this.navCtrl.push(CadastroProdutoPage, {
      'listaProdutosSelecionada': this.listaProdutos
    });
  }

  listarProdutos(){
    return this.listaProdutos.produtos.reverse();
  }

  listaProdutoExemplo(){
    let lista: Produto[] = [
      new Produto('p1', 'm1', 'un', 2.1),
      new Produto('p2', 'm2', 'un', 2.2),
      new Produto('p3', 'm3', 'un', 2.3),
      new Produto('p4', 'm4', 'un', 2.4),
      new Produto('p5', 'm5', 'un', 2.5),
      new Produto('p6', 'm6', 'un', 2.6),
      new Produto('p7', 'm7', 'un', 2.7),
      new Produto('p8', 'm8', 'un', 2.8),
      new Produto('p9', 'm9', 'un', 2.9),
      new Produto('p10', 'm10', 'un', 2.10),
      new Produto('p11', 'm11', 'un', 2.11),
      new Produto('p12', 'm12', 'un', 2.12),
      new Produto('p13', 'm13', 'un', 2.13),
      new Produto('p14', 'm14', 'un', 2.14),
      new Produto('p15', 'm15', 'un', 2.15)
    ]

    lista.forEach(
      (produto) => this.listaProdutos.adicionarProduto(produto)
    );

  }

  carregarLista(){
    this._dao.listarProdutos().then( dado => {
      
      this.listaProdutos.limparProdutos();

      dado.forEach( produto => {
        this.listaProdutos.adicionarProduto(produto)
      });
    });
  }

}
