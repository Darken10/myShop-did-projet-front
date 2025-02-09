import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../constantes/ApiUrl";
import {IUser} from "../../../models/Interfaces";
import {catchError, map, Observable, of, tap} from "rxjs";
import {LoginCredentialType, NewPasswordCredentialType} from "../../../models/Types";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http=inject(HttpClient);
  private apiUrl:string = `${ApiUrl.BASE_URL}/auth`;
  user=signal<IUser|null|undefined>(undefined);

  constructor() { }


  login(credentials:LoginCredentialType):Observable<IUser|null|undefined>{
    return this.http.post(this.apiUrl+"/authenticate",credentials)
      .pipe(
        tap((res:any)=>{
          localStorage.setItem("token",res["token"]);
          this.user.set(res['user'] as IUser);
        }),
        map((res:any)=>{
          return this.user();
        })
      )
  }


  getUser():Observable<IUser|null|undefined>{
    return this.http.get<IUser>(ApiUrl.BASE_URL+"/users/me")
      .pipe(
        tap((res:any)=>{
          this.user.set(res as IUser);
        }),
        map((res:any)=>{
          return this.user();
        }),
      )
  }

  logout():Observable<null>{
    this.user.set(null);
    return this.http.get(this.apiUrl+"/logout")
      .pipe(
        tap((res:any)=>{
          localStorage.removeItem("token");
          this.user.set(null);
        })
      )
  }

  refreshUser(){
    this.getUser().subscribe({
      next:(res)=>{
        console.log("refresh user",res);
        // loginService.user.set(res as IPersonnel);
        return true;
      },
      error:(err)=>{
        return err;
      }
    })
  }

  changePassword(credential : NewPasswordCredentialType){
    return this.http.post<IUser>(this.apiUrl+"/reset-password/new-password",credential)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of(null);
        })
      )
  }
}
