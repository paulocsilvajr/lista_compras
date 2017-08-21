import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Compra } from '../../domains/compra/compra';
import { DetalheCompraPage } from '../../pages/detalhe-compra/detalhe-compra';
import { CadastroCompraPage } from '../../pages/cadastro-compra/cadastro-compra';
import { ListaCompra } from '../../domains/compra/lista-compra';

import { CompraDao } from '../../domains/compra/compra-dao';

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
    private _loadingCtrl: LoadingController,
    private _dao: CompraDao) {

  }

  ngOnInit(){
    this.carregarLista();
  }

  private carregarLista(){
    console.log('>>> Carregado lista de compra');

    let loading = this._loadingCtrl.create({
      content: 'Carregando compras...'
    });
    loading.present();

    return this._dao.listarCompras()
    .then( compras => {
      this.listaCompras.limparCompras();

      compras.forEach( compra => {
        this.listaCompras.adicionarCompra(compra)
      });

      loading.dismiss();
    })
    .catch( () =>{
      this.listaCompras.limparCompras();
      
      loading.dismiss();
    });
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

}
