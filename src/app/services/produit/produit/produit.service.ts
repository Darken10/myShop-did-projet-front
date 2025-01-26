import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../../constantes/ApiUrl";
import {catchError, Observable, of} from "rxjs";
import {ICategory, IProduit} from "../../../../models/Interfaces";
import {Category, Produit} from "../../../../models/interfaceRequest";

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

  public create(credential:Produit):Observable<IProduit|null>{
    return this.http.post<IProduit>(this.apiUrl,credential)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du post:', error);
          return of(null);
        })
      );
  }

  public find(id:number):Observable<IProduit|null>{
    return this.http.get<IProduit>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of(null);
        })
      );
  }
}
