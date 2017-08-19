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
  public titulo: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _dao: ProdutoDao) {

    this.compra = this.navParams.get('compraSelecionada');

  }

  ngOnInit(){
    this.carregarLista();

    if (this.compra == undefined)
      this.titulo = "Lista de produtos cadastrados"
    else
      this.titulo = "Pesquisa de Produtos"
  }

  cadastrarItemCompra(produto: Produto){
    if (this.compra != undefined){

      this.navCtrl.push(CadastroItemCompraPage, {
        produtoSelecionado: produto,
        compraSelecionada: this.compra
      });

    }
  }

  pesquisar(event){
    this.carregarLista().then( () => {
      var valor = event.target.value;
      
      if (valor && valor.trim() != ''){
        this.listaProdutos.filtrarProduto(valor);
      }
    });
  }

  alterarProduto(produto: Produto){
    this.navCtrl.push(CadastroProdutoPage, {
      'listaProdutosSelecionada': this.listaProdutos,
      'produtoSelecionado': produto
    });
  }

  removerProduto(produto: Produto){
    this.listaProdutos.removerProduto(produto);

    this._dao.salvarProdutos(this.listaProdutos.produtos);
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

  carregarLista(){
    return this._dao.listarProdutos()
    .then( produtos => {
      
      this.listaProdutos.limparProdutos();

      produtos.forEach( produto => {
        this.listaProdutos.adicionarProduto(produto)
      });
    })
    .catch( () => 
      this.listaProdutos.limparProdutos()
    );
  }

}
