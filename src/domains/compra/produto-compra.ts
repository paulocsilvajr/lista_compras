import { Produto } from '../../domains/produto/produto';

export class ProdutoCompra{
    constructor(
        private _produto: Produto,
        private _quantidade: number = 1,
        private _valor: number = _produto.valor,
        private _comprado: boolean = false
    ){

    }

    get produto(){
        return this._produto;
    }

    get quantidade(){
        return this._quantidade;
    }

    get valor(){
        return this._valor;
    }

    get comprado(){
        return this._comprado;
    }
}