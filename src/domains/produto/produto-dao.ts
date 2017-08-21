import { Injectable,  } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Produto } from '../../domains/produto/produto';

@Injectable()
export class ProdutoDao{

    private _tabela: string = 'produtos';
    private _id: string = '_novoIdProduto';
    private _produtos: Produto[];
    private _novoId: number;
    private _idInicial: number = 1;

    constructor(private _storage: Storage){ }

    salvarProdutos(produtos: Produto[]){
        return this._storage.set(this._tabela, produtos);
    }

    novoId(){
        return this._storage.get(this._id)
        .then( (id) => {
            if (id  == null)
                id = this._novoId;

            this._novoId = id + 1;

            this._storage.set(this._id, this._novoId);

            return id; 
        });
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

            });

            return this._produtos;
        })
        .catch( () => {
            this._novoId = this._idInicial;

            return this._produtos;
        });
    }
}