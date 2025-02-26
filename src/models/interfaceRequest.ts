import {
  CommandeStatutEnum,
  Genre,
  MethodePaiementEnum,
  StatusPaiementEnum,
  UniteProduitEnum,
  UserStatusEnum
} from "./Enums";

export interface Produit {
  libelle: string;
  description: string;
  prix: number;
  stock: number;
  image: string;
  categoryId: number;
  tagsId: number[];
  unite : UniteProduitEnum
  seuil :number;
}

export interface Category {
  name: string;
  description: string;
}

export interface Tag {
  name: string;
  description: string;
}


export interface Promotion {
  name: string;
  description: string;
  reduction: number;
  isPercent: boolean;
  startDate: Date;
  endDate: Date;
  produitsId: number[];
}

export interface LigneRavitaillement {
  quantite: number;
  produitId: number;
  prixUnitaire : number
}

export interface Fournisseur {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  description? : string
}

export interface Ravitaillement {
  createDate?: Date;
  deliveredDate?: Date;
  status: string;
  fournisseurId: number;
}

export interface Paiement {
  methode: MethodePaiementEnum;
  reference: string;
  amount: number;
  commandeId: number;
  status: StatusPaiementEnum;
  date?: Date;
  comment?: string;
}


export interface LigneCommandes {
  prixUnitaire: number;
  quantity: number;
  produitId: number;
  promotionsId?: number;
}

export interface Commande {
  clientId: number;
  description: string;
  status: CommandeStatutEnum;
  ligneCommandes: LigneCommandes[];
}


export interface Client {
  name: string;
  phone?: string;
  solde?: number;
  adress?: string;
}

export interface User {
  firstName: string;
  lastName: string;
  genre: Genre;
  dateNaissance: Date;
  email: string;
  phoneNumber: string;
  matricule: string;
  status: UserStatusEnum;
  rolesId: number[];
}


