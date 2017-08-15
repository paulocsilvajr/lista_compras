import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Compra } from '../../domains/compra/compra';
import { ProdutoCompra } from '../../domains/compra/produto-compra';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.compra = this.navParams.get('compraSelecionada');

    this.quantidadeComprada = this.getQuantidadeComprada();

    this.verificarSeCompleto();
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



  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad DetalheCompraPage');
  // }

}
