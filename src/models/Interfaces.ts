import {CommandeStatutEnum, Genre, StatusPaiementEnum, UniteProduitEnum, UserStatusEnum} from "./Enums";


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
  category : ICategory

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
  produit: IProduitMini;
  prixUnitaire : number
}

export interface ILigneRavitaillements extends ILigneRavitaillementsMini{

}

export interface IRavitaillement {
  id: number;
  createDate: Date;
  deliveredDate: Date;
  description : string
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
  status: StatusPaiementEnum;
  comment: string;
}

export interface IClient {
  id: number;
  name: string;
  phone: string;
  solde: number;
  adress: string;
}

export interface ICommande {
  id: number;
  client: IClient;
  description: string;
  status: CommandeStatutEnum;
  paiements: Ipaiement[];
  ligneCommandes: ILigneCommande[];
  createAt: string;
  user : IUser
}


export interface ILigneCommande {
  id: number;
  prixUnitaire: number;
  quantity: number;
  promotion : IPromotion
  produit: IProduitMini;
}
