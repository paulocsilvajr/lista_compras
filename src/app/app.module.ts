import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// imports usuário
import { CadastroCompraPage } from '../pages/cadastro-compra/cadastro-compra';
import { CadastroItemCompraPage } from '../pages/cadastro-item-compra/cadastro-item-compra';
import { CadastroProdutoPage } from '../pages/cadastro-produto/cadastro-produto';
import { DetalheCompraPage } from '../pages/detalhe-compra/detalhe-compra';
import { ListaComprasPage } from '../pages/lista-compras/lista-compras';
import { PesquisaProdutoPage } from '../pages/pesquisa-produto/pesquisa-produto';

import { ProdutoDao } from '../domains/produto/produto-dao';
import { CompraDao} from '../domains/compra/compra-dao';

import { Keyboard } from '@ionic-native/keyboard';
import { Vibration } from '@ionic-native/vibration';

import { Storage } from '@ionic/storage';

function providerStorageProdutos(){
  return new Storage({
    name: 'listacompras',
    storeName: 'dados'
  });
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CadastroCompraPage,
    CadastroItemCompraPage,
    CadastroProdutoPage,
    DetalheCompraPage,
    ListaComprasPage,
    PesquisaProdutoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CadastroCompraPage,
    CadastroItemCompraPage,
    CadastroProdutoPage,
    DetalheCompraPage,
    ListaComprasPage,
    PesquisaProdutoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: Storage, useFactory: providerStorageProdutos},
    ProdutoDao,
    CompraDao,
    Keyboard,
    Vibration
  ]
})
export class AppModule {}
