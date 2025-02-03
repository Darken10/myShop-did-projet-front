import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor() { }

  generateFacture():Observable<boolean>{
    // TODO: Generate facture
    return of(true)
  }
}
