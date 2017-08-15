
export class Produto{
    
    private _id: number;

    constructor(
        private _nome: string,
        private _marca: string,
        private _unidade: string = 'UN',
        private _valor: number = 0.0
    ){

    }

    set id(id: number){
        this._id = id;
    }

    get id(){
        return this._id;
    }

    get nome(){
        return this._nome;
    }

    get marca(){
        return this._marca;
    }

    get unidade(){
        return this._unidade;
    }

    get valor(){
        return this._valor; 
    }

    get descricao(){
        return `${this.nome} - ${this.marca}`
    }
}