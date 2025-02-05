import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../../constantes/ApiUrl";
import {catchError, Observable, of} from "rxjs";
import {ICommande, IProduit} from "../../../../models/Interfaces";
import {Commande} from "../../../../models/interfaceRequest";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  http:HttpClient = inject(HttpClient)
  private apiUrl:string = `${ApiUrl.BASE_URL}/commandes`
  constructor() { }

  findAll(): Observable<ICommande[]> {
    return this.http.get<ICommande[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of([]);
        })
      );
  }

  public create(credential:Commande):Observable<ICommande|null>{
    return this.http.post<ICommande>(this.apiUrl,credential)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du Post:', error);
          return of(null);
        })
      );
  }

  public find(id:number):Observable<ICommande|null>{
    return this.http.get<ICommande>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of(null);
        })
      );
  }
}
