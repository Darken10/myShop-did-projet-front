import {IProduit, IPromotion} from "./Interfaces";

export type LoginCredentialType = {
  matricule: string;
  password: string;
}

export type AlertType = {
  type : "success"|"error"|"warning"|"info",
  message : string,
  time? : number
}

export type CartDataType = { quantite: number; produit: IProduit,promotion?:IPromotion|undefined, prixUnitaire?:number|undefined }

export type NewPasswordCredentialType = {
  password: string;
  jeton: string;
}

export type UserCountByStatutResponse = {active:number,en_attente:number,inactive:number}
export type UserCountResponse = {
  caissier: number;
  gestionnaire: number;
  admin: number;
}

export interface ProduitCategoriesTags {
  produit: number;
  categories: number;
  tags: number;
}

export interface StockStatut {
  en_stock: number;
  fini: number;
  carence: number;
}
