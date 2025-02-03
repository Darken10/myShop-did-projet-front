import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../constantes/ApiUrl";
import {catchError, Observable, of} from "rxjs";
import {ICategory, IFullPromotion, IRavitaillement} from "../../../models/Interfaces";
import {Category, LigneRavitaillement, Ravitaillement} from "../../../models/interfaceRequest";

@Injectable({
  providedIn: 'root'
})
export class RavitaillementsService {
  http:HttpClient = inject(HttpClient)
  private apiUrl:string = `${ApiUrl.BASE_URL}/ravitaillements`
  constructor() { }

  findAll(): Observable<IRavitaillement[]> {
    return this.http.get<IRavitaillement[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of([]);
        })
      );
  }

  public create(credential:Ravitaillement):Observable<IRavitaillement|null>{
    return this.http.post<IRavitaillement>(this.apiUrl,credential)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of(null);
        })
      );
  }

  public addLigneRavitaillement(id:number,credential:LigneRavitaillement):Observable<IRavitaillement|null>{
    return this.http.post<IRavitaillement>(`${this.apiUrl}/${id}/add-ligne-ravitaillement`,credential)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du post:', error);
          return of(null);
        })
      );
  }

  public find(id:number):Observable<IRavitaillement|null>{
    return this.http.get<IRavitaillement>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of(null);
        })
      );
  }



}
