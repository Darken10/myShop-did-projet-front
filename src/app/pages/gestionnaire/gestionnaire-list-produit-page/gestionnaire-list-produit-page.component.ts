import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ProduitService} from "../../../services/produit/produit/produit.service";
import {Subscription} from "rxjs";
import {IProduit} from "../../../../models/Interfaces";
import {Event, RouterLink} from "@angular/router";

@Component({
  selector: 'app-gestionnaire-list-produit-page',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './gestionnaire-list-produit-page.component.html',
  styleUrl: './gestionnaire-list-produit-page.component.css'
})
export class GestionnaireListProduitPageComponent implements OnInit,OnDestroy{
  private  produitService: ProduitService = inject(ProduitService)

  produits : IProduit[] = []
  displayProduits : IProduit[] = []

  currentPage  = 1;
  pageSize = 3

  constructor() {  }

  ngOnInit(): void {
    this.produitService.findAll().subscribe((prod)=>{
      this.produits = prod
      console.log(this.produits)
      this.updateDisplayProduit()
    })
    this.updateDisplayProduit()
  }


  updateDisplayProduit(){
    const startIndex = (this.currentPage -1)*this.pageSize
    const endIndex = startIndex + this.pageSize
    console.log(this.produits,startIndex,endIndex)
    this.displayProduits = this.produits.slice(startIndex,endIndex)
  }

  nextPage(){
    if (this.currentPage < Math.ceil(this.produits.length/this.pageSize)){
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


  ngOnDestroy(): void {
  }


}
