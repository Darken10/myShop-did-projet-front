import {Component, inject} from '@angular/core';
import {IProduit} from "../../../../models/Interfaces";
import {ProduitService} from "../../../services/produit/produit.service";


@Component({
  selector: 'app-caissier-dashbord-page',
  standalone: true,
  imports: [],
  templateUrl: './caissier-dashbord-page.component.html',
  styleUrl: './caissier-dashbord-page.component.css'
})
export class CaissierDashbordPageComponent {

  private  produitService: ProduitService = inject(ProduitService)

    cartProduits: Map<number, {quantite: number,produit: IProduit}> = new Map()
  produits : IProduit[] = []
  displayProduits : IProduit[] = []

  currentPage  = 1;
  pageSize = 3


  constructor() {
    this.produitService.findAll().subscribe((prod)=>{
      this.produits = prod
      console.log(this.produits)
    })
    this.updateDisplayProduit()
  }

  updateDisplayProduit(){
    const startIndex = (this.currentPage -1)*this.pageSize
    const endIndex = startIndex + this.pageSize
    this.displayProduits = this.produits.slice(startIndex,endIndex)
  }

  nextPage(){
    if (this.currentPage<Math.ceil(this.produits.length/this.pageSize)){
      this.currentPage++;
      this.updateDisplayProduit()
    }
  }

  previousPage(){
    if (this.currentPage>1){
      this.currentPage--
      this.updateDisplayProduit()
    }
  }

  getQuantite(id:number){
    return this.cartProduits.get(id)?.quantite || 0
  }
  incrementQuantite(id: number){

    const  currentQt = this.cartProduits.get(id)?.quantite || 0
    if (this.getProduit(id).stock>=currentQt+1){
      this.cartProduits.set(id,{quantite:currentQt+1,produit: this.getProduit(id)})
    }
  }
  decrementQuantite(id: number){
    const  currentQt = this.cartProduits.get(id)?.quantite || 0
    if (currentQt>0){
      this.cartProduits.set(id,{quantite:currentQt-1,produit: this.getProduit(id)})
    } else {
      this.cartProduits.has(id) ? this.cartProduits.delete(id) : ''
    }
  }

  getProduit(id: number): IProduit{
    return <IProduit>this.produits.find((p) => p.id === id)
  }

    onQuantiteChangeByInput($event: Event, id: number) {
      const inputValue = ($event.target as HTMLInputElement).value
      const quantite = Number(inputValue)
      if (!isNaN(quantite) && quantite > 0){
        this.cartProduits.set(id,{produit: this.getProduit(id), quantite: quantite})
      }else {
        this.cartProduits.has(id) ? this.cartProduits.delete(id) : '';
        ($event.target as HTMLInputElement).value = String(this.getQuantite(id));

      }

  }

  getTotalPriceByProduct(id: number){
    const cartProduit = this.cartProduits.get(id)
    if (cartProduit){
      return cartProduit?.quantite*cartProduit?.produit?.prix as number
    } else {
      return 0
    }
  }

  getGobaleTotalPrice(){
    let somme = 0
      this.cartProduits.forEach((a)=>{
        somme =  somme + this.getTotalPriceByProduct(a.produit.id)
    })
    return somme
  }

  EnregistreVente() {
    // TODO :  je doit enregistrer la vente
    console.log(this.cartProduits)
    this.cartProduits.clear()
  }
}
