import { Produto } from '../../domains/produto/produto';

export class ProdutoCompra{

    constructor(
        public produto: Produto,
        public quantidade: number = 1,
        public valor: number = produto.valor,
        public comprado: boolean = false
    ){ }

}