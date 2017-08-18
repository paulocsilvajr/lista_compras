import { Injectable,  } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Produto } from '../../domains/produto/produto';

@Injectable()
export class ProdutoDao{

    private _tabela: string = 'produtos';
    private _produtos: Produto[];
    private _novoId: number = 0;

    constructor(private _storage: Storage){

    }

    salvarProdutos(produtos: Produto[]){
        // console.log(produtos);
        
        return this._storage.set(this._tabela, produtos);
    }

    novoId(){
        return this.listarProdutos().then( () => this._novoId + 1);
    }

    produtoPorId(id: number){
        let produto: Produto;

        this._produtos.forEach( (p) => {
            if (p._id == id){
                produto = p;
                return;
            }
        });

        return produto;
    }

    listarProdutos(): Promise<Produto[]>{

        this._produtos = [];

        return this._storage.get(this._tabela)
        .then( listaProdutos => {

            listaProdutos.forEach( tupla => {
                let produto = new Produto(tupla._id, tupla.nome, tupla.marca, tupla.unidade, tupla.valor);
                this._produtos.push(produto);

                if (tupla._id > this._novoId)
                    this._novoId = tupla._id;

            });

            return this._produtos;
        })
        .catch( () => {
            this._novoId = 0;

            return this._produtos;
        });
    }
}