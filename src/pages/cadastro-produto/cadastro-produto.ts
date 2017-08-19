import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Produto } from '../../domains/produto/produto';
import { ListaProduto } from '../../domains/produto/lista-produto';
import { ProdutoDao } from '../../domains/produto/produto-dao';

import { Keyboard } from '@ionic-native/keyboard';
// ionic cordova plugin add cordova-plugin-vibration
// npm install --save @ionic-native/vibration
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-cadastro-produto',
  templateUrl: 'cadastro-produto.html',
})
export class CadastroProdutoPage {

  @ViewChild('foco') inputEmFoco;  

  public produto: Produto;
  public listaProdutos: ListaProduto;
  public alteracao: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _toast: ToastController,
    private _dao: ProdutoDao,
    private keyboard: Keyboard,
    private vibration: Vibration) {

    this.listaProdutos = this.navParams.get('listaProdutosSelecionada');

    this.produto = this.navParams.get('produtoSelecionado');

    if (this.produto == undefined){
      this.alteracao = false;
      this.produto = new Produto();
    } else
      this.alteracao = true;

  }

  ionViewDidLoad(){
    setTimeout(() => {
      this.keyboard.show();
      this.inputEmFoco.setFocus();
    },1000); // 1 segundo.
  }

  salvarProduto(){
    if (this.produto.nome == ''){
      this._toast.create({
        message: 'Campo nome deve ser preenchido!',
        duration: 2000,
        position: 'middle'
      }).present()
      .then( () => {
        this.vibration.vibrate(1000);
        
        this.ionViewDidLoad();
      })
    } else {
      if (this.produto.unidade == '')
        this.produto.unidade = 'UN'

      if (String(this.produto.valor) == '')
        this.produto.valor = 0;

      if (this.alteracao)
        this._dao.salvarProdutos(this.listaProdutos.produtos);
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
