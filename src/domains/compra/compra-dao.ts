import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Compra } from '../../domains/compra/compra';

@Injectable()
export class CompraDao{
    constructor(private _storage: Storage){
        // this._storage.set('teste2', {valor: 456});
    }
}