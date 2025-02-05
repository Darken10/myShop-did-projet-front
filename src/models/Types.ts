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
