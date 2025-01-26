import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProduitService} from "../../../services/produit/produit/produit.service";
import {IProduit} from "../../../../models/Interfaces";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

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


}
