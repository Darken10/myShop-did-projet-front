

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
}

