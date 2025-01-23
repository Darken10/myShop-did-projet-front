import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../constantes/ApiUrl";
import {catchError, Observable, of} from "rxjs";
import {IProduit} from "../../../models/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  http:HttpClient = inject(HttpClient)
  private apiUrl:string = `${ApiUrl.BASE_URL}/produits`
  constructor() { }

  findAll(): Observable<IProduit[]> {
    return this.http.get<IProduit[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of([]);
        })
      );
  }
}
