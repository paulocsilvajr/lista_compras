import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';
import { ListaComprasPage } from '../pages/lista-compras/lista-compras';
import { PesquisaProdutoPage } from '../pages/pesquisa-produto/pesquisa-produto';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  // rootPage:any = HomePage;
  rootPage: any = ListaComprasPage;

  public paginas = [
    { titulo: 'Home', componente: ListaComprasPage },
    { titulo: 'Produtos', componente: PesquisaProdutoPage }
  ];

  // captura o compomente do tipo nav na HomePage
  @ViewChild(Nav) public nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrirPagina(pagina){
    // método para abrir um item no menu a partir de atributo páginas[] depois do (click)
    // this.nav.push(pagina.componente);

    if(pagina.titulo == 'Home'){
      this.nav.setRoot(ListaComprasPage);
    }else{
      this.nav.push(pagina.componente);
    }
  }
}

