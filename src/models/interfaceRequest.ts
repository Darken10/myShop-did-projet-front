import {UniteProduitEnum} from "./Enums";

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

