
export class Produto{
    
    private _id: number = 0;

    constructor(
        public nome: string = '',
        public marca: string = '',
        public unidade: string = 'UN',
        public valor: number = 0.0
    ){ }

    set id(id: number){
        this._id = id;
    }

    get id(){
        return this._id;
    }

    get valorFormatado(){
        return this.valor.toFixed(2);
    }

    get unidadeFormatada(){
        return this.unidade.substr(0,2);
    }

    get descricao(){
        if (this.marca != '')
            return `${this.nome} - ${this.marca}`
        else 
            return this.nome
    }
}