import { Produto } from '../../domains/produto/produto';

export class ProdutoCompra{

    private _id: number = 0;

    constructor(
        public produto: Produto,
        public quantidade: number = 1,
        public valor: number = produto.valor,
        public comprado: boolean = false
    ){ }

    get id(){
        return this._id;
    }

    set id(id: number){
        this._id = id;
    }

}