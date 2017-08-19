import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Compra } from '../../domains/compra/compra';
import { ProdutoCompra } from '../../domains/compra/produto-compra';
import { PesquisaProdutoPage } from '../../pages/pesquisa-produto/pesquisa-produto';

import { CadastroItemCompraPage } from '../../pages/cadastro-item-compra/cadastro-item-compra';
import { ListaCompra } from '../../domains/compra/lista-compra';
import { CompraDao } from '../../domains/compra/compra-dao';


/**
 * Generated class for the DetalheCompraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhe-compra',
  templateUrl: 'detalhe-compra.html',
})
export class DetalheCompraPage {

  public compra: Compra;
  public quantidadeComprada: number = 0;
  public completo: boolean = false;
  private listaCompra: ListaCompra;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _alertCtrl: AlertController,
    private _dao: CompraDao) {
    this.compra = this.navParams.get('compraSelecionada');
    this.listaCompra = this.navParams.get('listaCompra');

    this.quantidadeComprada = this.getQuantidadeComprada();

    // this.verificarSeCompleto();
  }


  ionViewWillEnter(){
    this._dao.salvarCompras(this.listaCompra.compras);

    this.verificarSeCompleto();

    console.log('>>> Atualizado lista de compras');
    
  }

  private verificarSeCompleto(){
    if(this.quantidadeComprada == this.compra.produtos.length)
      this.completo = true;
    else
      this.completo = false;
  }

  getQuantidadeComprada(){
    let cont = 0;

    this.compra.produtos.forEach( item => {
      if(item.comprado)
        cont += 1;
    } );
    
    return cont;
  }

  atualizarComprados(ligado: boolean, item: ProdutoCompra){
    item.comprado = ligado;

    ligado? 
    this.quantidadeComprada++:
    this.quantidadeComprada--;

    this.verificarSeCompleto();
    
  }

  alertaExclusao(produto: ProdutoCompra){
    this._alertCtrl.create({
      title: 'Atenção',
      subTitle: `Remover o produto ${produto.produto.descricao}`,
      buttons: [{
        text: 'Sim',
        handler: () => {
          this.excluirProduto(produto);

          console.log('Excluído ' + produto.produto.descricao);          
        }
      },{
        text: 'Não'
      }]
    }).present();
  }

  alertaAlteracao(produto: ProdutoCompra){
    this._alertCtrl.create({
      title: 'Atenção',
      subTitle: `Alterar o produto ${produto.produto.descricao}`,
      buttons: [{
        text: 'Sim',
        handler: () => {
          this.alterarProduto(produto);

          console.log('Alterado ' + produto.produto.descricao);
        }
      },{
        text: 'Não'
      }]
    }).present();
  }

  private atualizarStatus(produto: ProdutoCompra){
    if (produto.comprado)
      this.quantidadeComprada = this.getQuantidadeComprada();
    else
      this.verificarSeCompleto();
  }

  private excluirProduto(produto: ProdutoCompra){
    this.compra.removerProduto(produto);

    this.atualizarStatus(produto);

    this._dao.salvarCompras(this.listaCompra.compras);
  }

  private alterarProduto(produto: ProdutoCompra){
    this.navCtrl.push(CadastroItemCompraPage, {
      produtoCompraSelecionado: produto, 
      compraSelecionada: this.compra
    });

    // this.atualizarStatus(produto);
  }

  public pesquisaProduto(compra: Compra){
    this.navCtrl.push(PesquisaProdutoPage, {
      compraSelecionada: compra
    });
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad DetalheCompraPage');
  // }

}
