import { Injectable,  } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';

import { Produto } from '../../domains/produto/produto';

@Injectable()
export class ProdutoDao{

    private _tabela: string = 'produtos';
    private _produtos: Produto[];

    constructor(private _storage: Storage, private _loadingCtrl: LoadingController){

    }

    salvarProdutos(produtos: Produto[]){
        console.log(produtos);
        
        return this._storage.set(this._tabela, produtos);
    }

    listarProdutos(): Promise<Produto[]>{

        this._produtos = [];

        return this._storage.get(this._tabela)
        .then( dado => {

            dado.forEach( tupla => 
                this._produtos.push(new Produto(tupla.nome, tupla.marca, tupla.unidade, tupla.valor))
            );

            return this._produtos
        })
        .catch( () => {
            return this._produtos;
        });
    }
}