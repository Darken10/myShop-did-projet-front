import {inject, Injectable} from '@angular/core';
import {ICategory} from "../../../models/Interfaces";
import {catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiUrl} from "../../../constantes/ApiUrl";
import {ProduitCategoriesTags, StockStatut, UserCountByStatutResponse, UserCountResponse} from "../../../models/Types";

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
  http:HttpClient = inject(HttpClient)
  private apiUrl:string = `${ApiUrl.BASE_URL}`
  constructor() { }

  public getChiffreAffaireParJourSemaine(userId:number,date : Date){
    const dateFormated :string = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`
    console.log("Date : ",dateFormated, "User Id",userId)
    return this.http.get<any>(`${this.apiUrl}/statistiques/chiffre-affaire-caissier-semaine?userId=${userId}&startDate=${dateFormated}`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of({});
        })
      );
  }

  public getMontantPaiementParJourSemaine(userId:number,date : Date){
    const dateFormated :string = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`
    console.log("Date : ",dateFormated, "User Id",userId)
    return this.http.get<any>(`${this.apiUrl}/statistiques/montant-paiement-caissier-semaine?userId=${userId}&startDate=${dateFormated}`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of({});
        })
      );
  }

  public getUsersCount(){
    return this.http.get<UserCountResponse>(`${this.apiUrl}/statistiques/user-count`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          const a :UserCountResponse ={
            caissier :0,
            gestionnaire : 0,
            admin : 0
          }
          return of(a);
        })
      );
  }

  public getUsersCountByStatut(){
    return this.http.get<UserCountByStatutResponse>(`${this.apiUrl}/statistiques/user-count-status`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          const a :UserCountByStatutResponse ={
            active :0,
            en_attente : 0,
            inactive : 0
          }
          return of(a);
        })
      );
  }

  public getProduitCategoriesTags(){
    return this.http.get<ProduitCategoriesTags>(`${this.apiUrl}/statistiques/count-produit-categories-tags`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          const a :ProduitCategoriesTags ={
            categories :0,
            tags : 0,
            produit : 0
          }
          return of(a);
        })
      );
  }

  public getStockStatut(){
    return this.http.get<StockStatut>(`${this.apiUrl}/statistiques/count-stock-statut`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          const a :StockStatut ={
            carence :0,
            fini : 0,
            en_stock : 0
          }
          return of(a);
        })
      );
  }


  getChiffreAffaireParJourSemainePourTous( date: Date) {
    const dateFormated :string = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`
    console.log("Date : ",dateFormated)
    return this.http.get<any>(`${this.apiUrl}/statistiques/montant-paiement-caissier-semaine-pour-tous?startDate=${dateFormated}`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of({});
        })
      );
  }

  getMontantPaiementParJourSemainePourTous(date: Date) {
    const dateFormated :string = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`
    console.log("Date : ",dateFormated)
    return this.http.get<any>(`${this.apiUrl}/statistiques/montant-paiement-caissier-semaine-pour-tous?startDate=${dateFormated}`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du fetch:', error);
          return of({});
        })
      );
  }
}
