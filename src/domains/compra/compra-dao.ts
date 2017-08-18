import { Injectable,  } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Compra } from '../../domains/compra/compra';
import { ProdutoCompra } from '../../domains/compra/produto-compra';
import { Produto } from '../../domains/produto/produto';

@Injectable()
export class CompraDao{

    private _tabela: string = 'compras';
    private _compras: Compra[];

    constructor(private _storage: Storage){

    }

    salvarCompras(compras: Compra[]){
        // console.log(produtos);
        
        return this._storage.set(this._tabela, compras);
    }

    listarCompras(): Promise<Compra[]>{

        this._compras = [];

        return this._storage.get(this._tabela)
        .then( listaCompras => {

            listaCompras.forEach( tupla => {

                let produtoCompra: ProdutoCompra[] = tupla._produtoCompra;
                produtoCompra.forEach( (item) => {
                    item.produto = new Produto(
                        item.produto._id,
                        item.produto.nome,
                        item.produto.marca,
                        item.produto.unidade,
                        item.produto.valor);
                });

                let compra = new Compra(
                    new Date(tupla._data),
                    produtoCompra)

                this._compras.push(compra);

            });

            return this._compras;
        })
        .catch( () => {
            return this._compras;
        });
    }
}