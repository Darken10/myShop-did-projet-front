import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProduitService} from "../../../services/produit/produit/produit.service";
import {IProduit} from "../../../../models/Interfaces";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {PromotionService} from "../../../services/produit/produit/promotion.service";
@Component({
  selector: 'app-gestionnaire-show-produit-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './gestionnaire-show-produit-page.component.html',
  styleUrl: './gestionnaire-show-produit-page.component.css'
})
export class GestionnaireShowProduitPageComponent implements OnInit,OnDestroy{

  private produitServer:ProduitService = inject(ProduitService)
  private activeRoute :ActivatedRoute = inject(ActivatedRoute)
  private subscription:Subscription = new Subscription()
  private promoService: PromotionService = inject(PromotionService);
  produit : IProduit|undefined

  ngOnInit(): void {
    const id:number = parseInt(this.activeRoute.snapshot.params['id'])
    this.subscription.add(
      this.produitServer.find(id).subscribe((p)=>{
        if (p) this.produit = p
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


  getPrice(reduction:number,isPercent:boolean) {
    if (this.produit){
      if (isPercent){
        return this.produit?.prix - reduction*this.produit?.prix/100
      } else {
        return this.produit?.prix
      }
    }
    return 0
  }

  retirerProduit(id: number) {
    if (this.produit){
      const a = this.promoService.retirer(id,this.produit.id).subscribe((p)=>{
        if (this.produit){
          console.log('oko')
          this.produit.promotions =  this.produit.promotions.filter((p)=>p.id !==id)
        }
      })
      this.subscription.add(a)
    }
  }
}
