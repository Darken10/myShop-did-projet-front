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

export interface  IProduit{
  id: number;
  libelle: string;
  description?: string;
  prix: number;
  stock: number;
  image?: string;
  category: ICategory;
  tags: ITag[];
  promotions: any[];
  ligneRavitaillements: any[];
  seuil :number;
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
