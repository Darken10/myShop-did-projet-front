import {Genre, UniteProduitEnum, UserStatusEnum} from "./Enums";


export interface ICategory {
  id: number;
  name: string;
  description: string;
}

export interface ITag {
  id: number;
  name: string;
  description: string;
}

export interface  IProduit extends IProduitMini{
  image?: string;
  category: ICategory;
  tags: ITag[];
  promotions: IPromotion[];
  ligneRavitaillements: any[];
  seuil :number;
}

export interface IProduitMini{
  id: number;
  libelle: string;
  description?: string;
  reference: string
  prix: number;
  stock: number;
  unite: UniteProduitEnum;

}

export interface Role {
  id: number;
  libelle: string;
  description?: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  genre: Genre;
  dateNaissance?: Date;
  email: string;
  phoneNumber: string;
  matricule: string;
  status: UserStatusEnum;
  roles: Role[];
}

export interface IPromotion {
  id: number;
  name: string;
  description: string;
  reduction: number;
  isPercent: boolean;
  startDate: Date;
  endDate: Date;
  createDate: Date;
}

export interface IFullPromotion extends IPromotion{
  produits: IProduitMini[];
}


export interface IFounisseur {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
}


export interface ILigneRavitaillementsMini {
  id: number;
  quantite: number;
  produit: IProduit;
}

export interface ILigneRavitaillements extends ILigneRavitaillementsMini{

}

export interface IRavitaillement {
  id: number;
  createDate: Date;
  deliveredDate: Date;
  status: string;
  founisseur: IFounisseur;
  ligneRavitaillements: ILigneRavitaillementsMini[];
}

export interface Ipaiement {
  id: number;
  methode: string;
  reference: string;
  amount: number;
  date: string;
  status: string;
  comment: string;
}
