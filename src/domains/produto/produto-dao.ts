import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Produto } from '../../domains/produto/produto';

@Injectable()
export class ProdutoDao{
    constructor(private _storage: Storage){
        this._storage.set('teste', {valor: 123});
    }
}