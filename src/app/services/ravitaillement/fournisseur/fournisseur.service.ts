import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../../constantes/ApiUrl";
import {catchError, Observable, of} from "rxjs";
import {IFounisseur, IRavitaillement} from "../../../../models/Interfaces";
import {Fournisseur, Ravitaillement} from "../../../../models/interfaceRequest";

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  http:HttpClient = inject(HttpClient)
  private apiUrl:string = `${ApiUrl.BASE_URL}/fournisseurs`
  constructor() { }

  findAll(): Observable<IFounisseur[]> {
    return this.http.get<IFounisseur[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of([]);
        })
      );
  }

  public create(credential:Fournisseur):Observable<IFounisseur|null>{
    return this.http.post<IFounisseur>(this.apiUrl,credential)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of(null);
        })
      );
  }
}
