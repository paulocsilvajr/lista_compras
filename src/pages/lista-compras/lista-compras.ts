import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Compra } from '../../domains/compra/compra';
// import { ProdutoCompra } from '../../domains/compra/produto-compra';
// import { Produto } from '../../domains/produto/produto';
import { DetalheCompraPage } from '../../pages/detalhe-compra/detalhe-compra';
import { CadastroCompraPage } from '../../pages/cadastro-compra/cadastro-compra';
import { ListaCompra } from '../../domains/compra/lista-compra';

import { CompraDao } from '../../domains/compra/compra-dao';

/**
 * Generated class for the ListaComprasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-compras',
  templateUrl: 'lista-compras.html',
})
export class ListaComprasPage {
  
  public listaCompras : ListaCompra = new ListaCompra();
  public total: boolean = false; 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _dao: CompraDao) {

    // this.listaExemplo();
    this.carregarLista();
  }

  private carregarLista(){
    return this._dao.listarCompras()
    .then( compras => {
      this.listaCompras.limparCompras();

      compras.forEach( compra => {
        this.listaCompras.adicionarCompra(compra)
      });
    })
    .catch( () =>
      this.listaCompras.limparCompras()
    );
  }

  public alertaExclusao(compra: Compra){
    this._alertCtrl.create({
      title: 'Atenção',
      subTitle: `Excluir a compra de ${compra.dataFormatada}`,
      buttons: [{
        text: 'Sim',
        handler: () => {
          this.excluirCompra(compra);
          console.log('Excluído ' + compra.dataFormatada);
        }
      },{
        text: 'Não'
      }]
    }).present();
  }

  public alertaAlteracao(compra: Compra){
    this._alertCtrl.create({
      title: 'Atenção',
      subTitle: `Alterar a compra de ${compra.dataFormatada}`,
      buttons: [{
        text: 'Sim',
        handler: () => {
          this.alterarCompra(compra);
          console.log('Alterado ' + compra.dataFormatada);          
        }
      },{
        text: 'Não'
      }]
    }).present();
  }

  private excluirCompra(compra: Compra){
    this.listaCompras.removerCompra(compra);

    // this._dao.salvarCompras(this.listaCompras.compras);
    this.salvarCompras();
  }

  private alterarCompra(compra: Compra){
    this.navCtrl.push(CadastroCompraPage, {
      listaCompras: this.listaCompras,
      compraSelecionada: compra
    });
  }

  public salvarCompras(){
    this._dao.salvarCompras(this.listaCompras.compras)
  }

  public exibirTotal(status: boolean){
    this.total = status;
  }

  detalharCompra(compra: Compra){
    this.navCtrl.push(DetalheCompraPage, {
      compraSelecionada: compra,
      listaCompra: this.listaCompras
    });
  }

  cadastrarCompra(){
    this.navCtrl.push(CadastroCompraPage, {
      listaCompras: this.listaCompras
    })
  }

  listarCompras(){
    return this.listaCompras.compras.reverse();
  }

  // private listaExemplo(){
  //   let produto1 = new Produto(20, 'Arroz', 'Castelao', 'saco', 10);
  //   let produto_compra1 = new ProdutoCompra(produto1, 2, produto1.valor);
  //   let produto2 = new Produto(21, 'Feijão', 'Esp', 'pt', 5);
  //   let produto_compra2 = new ProdutoCompra(produto2, 3, produto2.valor, true);
  //   let lista = [];
  //   lista.push(produto_compra1);
  //   lista.push(produto_compra2);
  //   let compra1 = new Compra(new Date(), lista);

  //   produto2 = new Produto(22, 'Feijão', 'Esp', 'pt', 5);
  //   produto_compra2 = new ProdutoCompra(produto2, 3, produto2.valor, true);
  //   lista = [];
  //   lista.push(produto_compra2);
  //   let compra2 = new Compra(new Date(2016, (2 - 1), 15), lista);

  //   produto2 = new Produto(23, 'Feijão', 'Esp', 'pt', 1);
  //   produto_compra2 = new ProdutoCompra(produto2, 10);
  //   lista = [];
  //   lista.push(produto_compra2);
  //   produto2 = new Produto(24, 'Feijão', 'Esp', 'pt', 2);
  //   produto_compra2 = new ProdutoCompra(produto2, 20, produto2.valor, true);
  //   lista.push(produto_compra2);
  //   produto2 = new Produto(25, 'Feijão', 'Esp', 'pt', 3);
  //   produto_compra2 = new ProdutoCompra(produto2, 30, produto2.valor, true);
  //   lista.push(produto_compra2);
  //   produto2 = new Produto(26, 'Feijão', 'Esp', 'pt', 4);
  //   produto_compra2 = new ProdutoCompra(produto2, 40);
  //   lista.push(produto_compra2);
  //   produto2 = new Produto(27, 'Feijão', 'Esp', 'pt', 5);
  //   produto_compra2 = new ProdutoCompra(produto2, 50, produto2.valor, true);
  //   lista.push(produto_compra2);
  //   produto2 = new Produto(28, 'Feijão', 'Esp', 'pt', 6);
  //   produto_compra2 = new ProdutoCompra(produto2, 60);
  //   lista.push(produto_compra2);
  //   produto2 = new Produto(29, 'Feijão', 'Esp', 'pt', 7);
  //   produto_compra2 = new ProdutoCompra(produto2, 70);
  //   lista.push(produto_compra2);
  //   produto2 = new Produto(30, 'Feijão', 'Esp', 'pt', 8);
  //   produto_compra2 = new ProdutoCompra(produto2, 80);
  //   lista.push(produto_compra2);
  //   produto2 = new Produto(31, 'Feijão', 'Esp', 'pt', 9);
  //   produto_compra2 = new ProdutoCompra(produto2, 90);
  //   lista.push(produto_compra2);
  //   produto2 = new Produto(32, 'Feijão', 'Esp', 'pt', 10);
  //   produto_compra2 = new ProdutoCompra(produto2, 100);
  //   lista.push(produto_compra2);
  //   produto2 = new Produto(33, 'Feijão', 'Esp', 'pt', 11);
  //   produto_compra2 = new ProdutoCompra(produto2, 110);
  //   lista.push(produto_compra2);
  //   produto2 = new Produto(34, 'Feijão', 'Esp', 'pt', 12);
  //   produto_compra2 = new ProdutoCompra(produto2, 120);
  //   lista.push(produto_compra2);
  //   let compra3 = new Compra(new Date(2000, 0, 31), lista);

  //   this.listaCompras.adicionarCompra(compra1);
  //   this.listaCompras.adicionarCompra(compra2);
  //   this.listaCompras.adicionarCompra(compra3);
  // }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ListaComprasPage ');
  // }

}
