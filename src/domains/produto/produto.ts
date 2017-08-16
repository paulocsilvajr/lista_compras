
export class Produto{
    
    private _id: number;

    constructor(
        public nome: string,
        public marca: string,
        public unidade: string = 'UN',
        public valor: number = 0.0
    ){

    }

    set id(id: number){
        this._id = id;
    }

    get id(){
        return this._id;
    }

    get valorFormatado(){
        return this.valor.toFixed(2);
    }

    get descricao(){
        return `${this.nome} - ${this.marca}`
    }
}