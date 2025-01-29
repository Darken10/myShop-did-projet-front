import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../../constantes/ApiUrl";
import {catchError, Observable, of} from "rxjs";
import {IFullPromotion, IPromotion} from "../../../../models/Interfaces";
import {Promotion} from "../../../../models/interfaceRequest";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  http:HttpClient = inject(HttpClient)
  private apiUrl:string = `${ApiUrl.BASE_URL}/promotions`
  constructor() { }

  findAll(): Observable<IPromotion[]> {
    return this.http.get<IPromotion[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of([]);
        })
      );
  }

  public create(credential:Promotion):Observable<IPromotion|null>{
    return this.http.post<IPromotion>(this.apiUrl,credential)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du post:', error);
          return of(null);
        })
      );
  }

  public find(id:number):Observable<IFullPromotion|null>{
    return this.http.get<IFullPromotion>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of(null);
        })
      );
  }

  public retirer(promoId:number,prodId:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/${promoId}/retire/${prodId}`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of(null);
        })
      );
  }



}
