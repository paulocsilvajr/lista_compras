import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Compra } from '../../domains/compra/compra';
import { ProdutoCompra } from '../../domains/compra/produto-compra';
import { Produto } from '../../domains/produto/produto';
import { DetalheCompraPage } from '../../pages/detalhe-compra/detalhe-compra';

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
  
  public listaCompras : Compra[] = [];
  public total: boolean = false; 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController) {

    this.listaExemplo();
  }

  public alerta(compra: Compra){
    this._alertCtrl.create({
      title: 'Atenção',
      subTitle: `Excluir a compra de ${compra.dataFormatada}`,
      buttons: [{
        text: 'Sim',
        handler: () => {
          console.log('Excluído ' + compra.dataFormatada);
          this.excluirCompra(compra);
        }
      },{
        text: 'Não'
      }]
    }).present();
  }

  private excluirCompra(compra: Compra){
    let posicao = this.listaCompras.indexOf(compra);

    this.listaCompras.splice(posicao, 1);
  }

  public exibirTotal(status: boolean){
    this.total = status;
  }

  private listaExemplo(){
    let produto1 = new Produto('Arroz', 'Castelao', 'saco', 10);
    let produto_compra1 = new ProdutoCompra(produto1, 2, produto1.valor);
    let produto2 = new Produto('Feijão', 'Esp', 'pt', 5);
    let produto_compra2 = new ProdutoCompra(produto2, 3, produto2.valor, true);
    let lista = [];
    lista.push(produto_compra1);
    lista.push(produto_compra2);
    let compra1 = new Compra(new Date(), lista);

    produto2 = new Produto('Feijão', 'Esp', 'pt', 5);
    produto_compra2 = new ProdutoCompra(produto2, 3, produto2.valor, true);
    lista = [];
    lista.push(produto_compra2);
    let compra2 = new Compra(new Date(), lista);

    produto2 = new Produto('Feijão', 'Esp', 'pt', 1);
    produto_compra2 = new ProdutoCompra(produto2, 10);
    lista = [];
    lista.push(produto_compra2);
    produto2 = new Produto('Feijão', 'Esp', 'pt', 2);
    produto_compra2 = new ProdutoCompra(produto2, 20, produto2.valor, true);
    lista.push(produto_compra2);
    produto2 = new Produto('Feijão', 'Esp', 'pt', 3);
    produto_compra2 = new ProdutoCompra(produto2, 30, produto2.valor, true);
    lista.push(produto_compra2);
    produto2 = new Produto('Feijão', 'Esp', 'pt', 4);
    produto_compra2 = new ProdutoCompra(produto2, 40);
    lista.push(produto_compra2);
    produto2 = new Produto('Feijão', 'Esp', 'pt', 5);
    produto_compra2 = new ProdutoCompra(produto2, 50, produto2.valor, true);
    lista.push(produto_compra2);
    produto2 = new Produto('Feijão', 'Esp', 'pt', 6);
    produto_compra2 = new ProdutoCompra(produto2, 60);
    lista.push(produto_compra2);
    produto2 = new Produto('Feijão', 'Esp', 'pt', 7);
    produto_compra2 = new ProdutoCompra(produto2, 70);
    lista.push(produto_compra2);
    produto2 = new Produto('Feijão', 'Esp', 'pt', 8);
    produto_compra2 = new ProdutoCompra(produto2, 80);
    lista.push(produto_compra2);
    produto2 = new Produto('Feijão', 'Esp', 'pt', 9);
    produto_compra2 = new ProdutoCompra(produto2, 90);
    lista.push(produto_compra2);
    produto2 = new Produto('Feijão', 'Esp', 'pt', 10);
    produto_compra2 = new ProdutoCompra(produto2, 100);
    lista.push(produto_compra2);
    produto2 = new Produto('Feijão', 'Esp', 'pt', 11);
    produto_compra2 = new ProdutoCompra(produto2, 110);
    lista.push(produto_compra2);
    produto2 = new Produto('Feijão', 'Esp', 'pt', 12);
    produto_compra2 = new ProdutoCompra(produto2, 120);
    lista.push(produto_compra2);
    let compra3 = new Compra(new Date(), lista);

    this.listaCompras.push(compra1);
    this.listaCompras.push(compra2);
    this.listaCompras.push(compra3);
  }

  detalharCompra(compra: Compra){
    this.navCtrl.push(DetalheCompraPage, 
      { compraSelecionada: compra });
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ListaComprasPage ');
  // }

}
