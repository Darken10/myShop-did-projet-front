import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {PromotionService} from "../../../services/produit/produit/promotion.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../services/global/alert.service";
import {Subscription} from "rxjs";
import {IFullPromotion, IProduit, IRavitaillement} from "../../../../models/Interfaces";
import {RavitaillementsService} from "../../../services/ravitaillement/ravitaillements.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ProduitService} from "../../../services/produit/produit/produit.service";

@Component({
  selector: 'app-gestionnaire-show-ravitaillement',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './gestionnaire-show-ravitaillement.component.html',
  styleUrl: './gestionnaire-show-ravitaillement.component.css'
})
export class GestionnaireShowRavitaillementComponent implements OnInit,OnDestroy{

  private ravitaillementService:RavitaillementsService = inject(RavitaillementsService)
  private produitService:ProduitService = inject(ProduitService)
  private activeRoute :ActivatedRoute = inject(ActivatedRoute)
  private alertService :AlertService = inject(AlertService)
  private subscription:Subscription = new Subscription()
  ravitaillement : IRavitaillement|undefined
  addLigneRavitaillementForm: FormGroup = new FormGroup({
    quantite: new FormControl(''),
    produitId: new FormControl(''),
    prixUnitaire : new FormControl('')
  });
  produits: IProduit[] = [];

  ngOnInit(): void {
    const id:number = parseInt(this.activeRoute.snapshot.params['id'])
    const subscribe = this.ravitaillementService.find(id).subscribe((rav)=>{
      if (rav) this.ravitaillement = rav
    })
    const subscribe1 = this.produitService.findAll().subscribe(prod=>{
      this.produits = prod
    })

    this.subscription.add(subscribe)
    this.subscription.add(subscribe1)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  retirerProduit(prodId:number){
    console.log('retirer : ',prodId)
  }

  getPrice(id: number) {
    const ls = this.ravitaillement?.ligneRavitaillements.find((l)=>l.id ===id)
    if (ls){
      return ls.quantite * ls.prixUnitaire
    } else {
      return '-'
    }
  }

  handleAddRavitaillement() {
    const credential = this.addLigneRavitaillementForm.value
    if (this.ravitaillement){
      this.ravitaillementService.addLigneRavitaillement(this.ravitaillement.id,credential).subscribe((ra)=>{
        if (ra){
          this.ravitaillement = ra
        }
      })
    }
  }
}
