import { Produto } from '../../domains/produto/produto';

export class ListaProduto{
    public _lista: Produto[];

    constructor(){
        this.limparProdutos();
    }

    get produtos(){
        return this._lista;
    }

    adicionarProduto(produto: Produto){
        this._lista.push(produto);
    }

    removerProduto(produto: Produto){
        let indice: number = this._lista.indexOf(produto);

        this._lista.splice(indice, 1);
    }

    limparProdutos(){
        this._lista = [];
    }

    filtrarProduto(nomeProduto: string){
        return this._lista.filter( (produto) => {
            return (produto.nome.toLowerCase().indexOf(nomeProduto.toLowerCase()) > -1);
        });
    }

}