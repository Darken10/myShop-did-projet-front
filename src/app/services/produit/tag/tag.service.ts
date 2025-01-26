import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../../constantes/ApiUrl";
import {catchError, Observable, of} from "rxjs";
import {ICategory, ITag} from "../../../../models/Interfaces";
import {Category, Tag} from "../../../../models/interfaceRequest";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  http:HttpClient = inject(HttpClient)
  private apiUrl:string = `${ApiUrl.BASE_URL}/tags`
  constructor() { }

  findAll(): Observable<ITag[]> {
    return this.http.get<ITag[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of([]);
        })
      );
  }

  public create(credential:Tag):Observable<ITag|null>{
    return this.http.post<ITag>(this.apiUrl,credential)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of(null);
        })
      );
  }



}
