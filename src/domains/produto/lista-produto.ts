import { Produto } from '../../domains/produto/produto';

export class ListaProduto{
    private lista: Produto[];

    constructor(){
        this.limparProdutos();
    }

    get produtos(){
        return this.lista;
    }

    adicionarProduto(produto: Produto){
        this.lista.push(produto);
    }

    removerProduto(produto: Produto){
        let indice: number = this.lista.indexOf(produto);

        this.lista.splice(indice, 1);
    }

    alterarProduto(produto: Produto){
        // lógica dao para alteração do produto
    }

    limparProdutos(){
        this.lista = [];
    }

    filtrarProduto(nomeProduto: string){
        this.lista = this.lista.filter( (produto) => {
            return (produto.nome.toLowerCase().indexOf(nomeProduto.toLowerCase()) > -1);
        });
    }

}