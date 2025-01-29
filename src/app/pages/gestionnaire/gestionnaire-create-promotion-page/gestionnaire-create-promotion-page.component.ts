import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IProduit, IProduitMini} from "../../../../models/Interfaces";
import {Promotion} from "../../../../models/interfaceRequest";
import {ProduitService} from "../../../services/produit/produit/produit.service";
import {PromotionService} from "../../../services/produit/produit/promotion.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-gestionnaire-create-promotion-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './gestionnaire-create-promotion-page.component.html',
  styleUrl: './gestionnaire-create-promotion-page.component.css'
})
export class GestionnaireCreatePromotionPageComponent implements OnInit,OnDestroy{


  private produitService :ProduitService = inject(ProduitService)
  private promotionService :PromotionService = inject(PromotionService)
  private subscription :Subscription|undefined = undefined
  private router: Router = inject(Router);

  promotionCreateForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    reduction: new FormControl<number>(0),
    isPercent: new FormControl<boolean>(true),
    startDate: new FormControl<Date>(new Date()),
    endDate: new FormControl<Date>(new Date()),
    produitsId: new FormControl<number[]>([]),
  });

  produits: IProduitMini[] = [];


  handleCreatePromotion() {
    const credential = this.promotionCreateForm.value
    const subcr = this.promotionService.create(credential).subscribe(promo=>{
      if (promo){
        console.log(promo)
        this.router.navigate(["/gestionnaire/show-promotion/"+promo.id])
      }
    })
    this.subscription?.add(subcr)
    console.log(this.promotionCreateForm.value)
  }

  ngOnInit(): void {
    const subcr = this.produitService.findAllwithMinalData().subscribe(proMini=>{
      this.produits = proMini
      console.log(this.produits)
    })
    this.subscription?.add(subcr)
  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
