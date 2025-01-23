export class Produit {
  constructor(
    public  libelle: string,
    public  prix: number,
    public  stock: number,
    public  categoryId: number,
    public  tagsId: number[],
    public  image?: string,
    public description?: string
  ) {
  }
}
