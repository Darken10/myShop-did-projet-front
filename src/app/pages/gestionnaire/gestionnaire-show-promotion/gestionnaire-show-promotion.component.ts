import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {IFullPromotion, IProduit, IPromotion} from "../../../../models/Interfaces";
import {ProduitService} from "../../../services/produit/produit/produit.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {PromotionService} from "../../../services/produit/produit/promotion.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertService} from "../../../services/global/alert.service";

@Component({
  selector: 'app-gestionnaire-show-promotion',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './gestionnaire-show-promotion.component.html',
  styleUrl: './gestionnaire-show-promotion.component.css'
})
export class GestionnaireShowPromotionComponent implements OnInit,OnDestroy{
  private promoService:PromotionService = inject(PromotionService)
  private activeRoute :ActivatedRoute = inject(ActivatedRoute)
  private alertService :AlertService = inject(AlertService)
  private subscription:Subscription = new Subscription()
  promotion : IFullPromotion|undefined

  ngOnInit(): void {
    const id:number = parseInt(this.activeRoute.snapshot.params['id'])
    this.subscription.add(
      this.promoService.find(id).subscribe((p)=>{
        if (p) this.promotion = p
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getPrice(prix: number) {
    if (this.promotion?.isPercent){
      return prix - this.promotion.reduction*prix/100
    } else {
      return prix
    }
  }

  retirerProduit(prodId:number){
    if (this.promotion){
      const a = this.promoService.retirer(this.promotion?.id,prodId).subscribe((p)=>{
        if (this.promotion){
          console.log('oko')
          this.promotion.produits =  this.promotion.produits.filter((p)=>p.id !==prodId)
        }
      })
      this.subscription.add(a)
    }
  }

}
