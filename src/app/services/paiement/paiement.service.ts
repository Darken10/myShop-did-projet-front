import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../constantes/ApiUrl";
import {catchError, Observable, of} from "rxjs";
import {Ipaiement} from "../../../models/Interfaces";
import {Paiement} from "../../../models/interfaceRequest";

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  http:HttpClient = inject(HttpClient)
  private apiUrl:string = `${ApiUrl.BASE_URL}/paiements`
  constructor() { }

  findAll(): Observable<Ipaiement[]> {
    return this.http.get<Ipaiement[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of([]);
        })
      );
  }

  public create(credential:Paiement):Observable<Ipaiement|null>{
    return this.http.post<Ipaiement>(this.apiUrl,credential)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of(null);
        })
      );
  }
}
