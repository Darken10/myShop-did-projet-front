import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {IPromotion} from "../../../../models/Interfaces";
import {PromotionService} from "../../../services/produit/produit/promotion.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-gestionnaire-promotion-list-page',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './gestionnaire-promotion-list-page.component.html',
  styleUrl: './gestionnaire-promotion-list-page.component.css'
})
export class GestionnairePromotionListPageComponent implements OnInit,OnDestroy{

  private promotionService :PromotionService = inject(PromotionService)
  private  subscription:Subscription|undefined = undefined

  promotions: IPromotion[] = [];
  displayPromotion: IPromotion[] = [];
  currentPage: number = 1;
  pageSize: number = 3;


  nextPage(){
    if (this.currentPage < Math.ceil(this.promotions.length/this.pageSize)){
      this.currentPage++;
      this.updateDisplayPromotion()
    }
  }

  previousPage(){
    if (this.currentPage>1){
      this.currentPage--
      this.updateDisplayPromotion()
    }
  }

  ngOnInit(): void {
    const sub = this.promotionService.findAll().subscribe(promos=>{
      this.promotions = promos

      this.updateDisplayPromotion()
    })
    this.subscription?.add(sub)

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  private updateDisplayPromotion() {
    const startIndex = (this.currentPage -1)*this.pageSize
    const endIndex = startIndex + this.pageSize
    console.log(this.promotions,startIndex,endIndex)
    this.displayPromotion = this.promotions.slice(startIndex,endIndex)
  }
}
