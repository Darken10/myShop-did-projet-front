import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../../constantes/ApiUrl";
import {catchError, Observable, of} from "rxjs";
import {ICategory, IProduit, ITag} from "../../../../models/Interfaces";
import {Category} from "../../../../models/interfaceRequest";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http:HttpClient = inject(HttpClient)
  private apiUrl:string = `${ApiUrl.BASE_URL}/categories`
  constructor() { }

  findAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of([]);
        })
      );
  }

  public create(credential:Category):Observable<ICategory|null>{
    return this.http.post<ICategory>(this.apiUrl,credential)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of(null);
        })
      );
  }
}
