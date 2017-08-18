import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Produto } from '../../domains/produto/produto';
import { ListaProduto } from '../../domains/produto/lista-produto';
import { ProdutoDao } from '../../domains/produto/produto-dao';

@IonicPage()
@Component({
  selector: 'page-cadastro-produto',
  templateUrl: 'cadastro-produto.html',
})
export class CadastroProdutoPage {

  public produto: Produto;
  public listaProdutos: ListaProduto;
  public alteracao: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _toast: ToastController,
    private _dao: ProdutoDao) {

    this.listaProdutos = this.navParams.get('listaProdutosSelecionada');

    this.produto = this.navParams.get('produtoSelecionado');

    if (this.produto == undefined){
      this.alteracao = false;
      this.produto = new Produto();
    } else
      this.alteracao = true;

  }

  salvarProduto(){
    if (this.produto.nome == ''){
      this._toast.create({
        message: 'Campo nome deve ser preenchido!',
        duration: 2000,
        position: 'middle'
      }).present();
    } else if (this.produto.unidade == ''){ 
      this.produto.unidade = 'UN'
    } else {

      if (this.alteracao)
        this._dao.salvarProdutos(this.listaProdutos.produtos);        
        // this.listaProdutos.alterarProduto(this.produto)
        else{
          this._dao.novoId().then( (id) => {
  
            this.produto._id = id;
  
            this.listaProdutos.adicionarProduto(this.produto);
  
            this._dao.salvarProdutos(this.listaProdutos.produtos);

          });
      }

      this.navCtrl.pop();
    }
  }
}
