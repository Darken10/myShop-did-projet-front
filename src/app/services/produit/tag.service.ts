import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../constantes/ApiUrl";
import {catchError, Observable, of} from "rxjs";
import {ITag} from "../../../models/Interfaces";

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



}
