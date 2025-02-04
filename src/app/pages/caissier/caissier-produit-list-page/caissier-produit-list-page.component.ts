import {Component, inject} from '@angular/core';
import {ProduitService} from "../../../services/produit/produit/produit.service";
import {IProduit} from "../../../../models/Interfaces";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommandeService} from "../../../services/produit/commande/commande.service";
import {Router} from "@angular/router";
import {FactureService} from "../../../services/global/facture/facture.service";
import {AlertService} from "../../../services/global/alert.service";
import {CartService} from "../../../services/cart/cart.service";

@Component({
  selector: 'app-caissier-produit-list-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './caissier-produit-list-page.component.html',
  styleUrl: './caissier-produit-list-page.component.css'
})
export class CaissierProduitListPageComponent {

  private  produitService: ProduitService = inject(ProduitService)
  private  commandeService: CommandeService = inject(CommandeService)
  private  factureService: FactureService = inject(FactureService)
  private  alertService: AlertService = inject(AlertService)
  private  router: Router = inject(Router)
  private  cartService: CartService = inject(CartService)

  cartProduits: Map<number, {quantite: number,produit: IProduit}> = new Map()
  produits : IProduit[] = []
  produit : IProduit | undefined = undefined
  displayProduits : IProduit[] = []

  currentPage  = 1;
  pageSize = 3




  constructor() {
   /* this.modal._targetEl = document.getElementById('voir-prouit-info')*/
    this.produitService.findAll().subscribe((prod)=>{
      this.produits = prod
      console.log(this.produits)
      this.updateDisplayProduit()
    })
    this.commandeService.findAll().subscribe(a=>{
      console.log(a)
    })
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

  openProduitInfoModal(proId:number) {
/*    this.modal._targetEl =  document.getElementById('voir-prouit-info')
    this.modal.show()*/
    this.produit = this.produits.find((a)=>a.id===proId)
  }

  gotoFacture() {
    this.cartProduits.forEach((value, key, map)=>{
      this.cartService.addProduit(key,value)
    })
    this.router.navigate(["/create-commande"])
  }


}
