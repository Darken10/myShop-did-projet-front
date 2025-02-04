import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../../constantes/ApiUrl";
import {catchError, Observable, of} from "rxjs";
import {IClient} from "../../../../models/Interfaces";
import {Client} from "../../../../models/interfaceRequest";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  http:HttpClient = inject(HttpClient)
  private apiUrl:string = `${ApiUrl.BASE_URL}/clients`
  constructor() { }

  findAll(): Observable<IClient[]> {
    return this.http.get<IClient[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of([]);
        })
      );
  }

  public create(credential:Client):Observable<IClient|null>{
    return this.http.post<IClient>(this.apiUrl,credential)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du Post:', error);
          return of(null);
        })
      );
  }
}
