import { Compra } from '../../domains/compra/compra';

export class ListaCompra{
    private _compras: Compra[]

    constructor(){
        this.limparCompras();
    }

    adicionarCompra(compra: Compra){
        this._compras.push(compra);
    }

    alterarCompra(compra: Compra){
        // lógica de alteração no banco
    }

    removerCompra(compra: Compra){
        let posicao = this._compras.indexOf(compra);

        this._compras.splice(posicao, 1);
    }

    limparCompras(){
        this._compras = [];
    }

    get compras(){
        return this._compras;
    }
}