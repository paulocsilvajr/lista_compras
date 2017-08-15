import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Compra } from '../../domains/compra/compra';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.compra = this.navParams.get('compraSelecionada');
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad DetalheCompraPage');
  // }

}
