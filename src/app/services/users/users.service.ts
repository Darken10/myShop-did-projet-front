import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../constantes/ApiUrl";
import {catchError, Observable, of} from "rxjs";
import {ICommande, IRole, IUser} from "../../../models/Interfaces";
import {User} from "../../../models/interfaceRequest";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  http:HttpClient = inject(HttpClient)
  private apiUrl:string = `${ApiUrl.BASE_URL}/users`
  constructor() { }

  findAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of([]);
        })
      );
  }

  public create(credential:User):Observable<IUser|null>{
    return this.http.post<IUser>(`${ApiUrl.BASE_URL}/auth/register`,credential)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du Post:', error);
          return of(null);
        })
      );
  }


  public find(id:number):Observable<IUser|null>{
    return this.http.get<IUser>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of(null);
        })
      );
  }


  public getCommandesByUser(id:number){
  return this.http.get<ICommande[]>(`${this.apiUrl}/vente-per-user/${id}`)
    .pipe(
      catchError(error => {
        console.error('Erreur lors du fetch:', error);
        return of(null);
      })
    );
  }
}
