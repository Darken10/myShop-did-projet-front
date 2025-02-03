import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {IProduit, IRavitaillement} from "../../../../models/Interfaces";
import {RavitaillementsService} from "../../../services/ravitaillement/ravitaillements.service";

@Component({
  selector: 'app-gestionnaire-liste-ravitaillement',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './gestionnaire-liste-ravitaillement.component.html',
  styleUrl: './gestionnaire-liste-ravitaillement.component.css'
})
export class GestionnaireListeRavitaillementComponent implements OnInit,OnDestroy{

  private  ravitaillementService : RavitaillementsService = inject(RavitaillementsService)
  ravitaillements : IRavitaillement[] = []
  displayRavitaillement : IRavitaillement[] = []


  currentPage  = 1;
  pageSize = 3

  ngOnInit(): void {
    this.ravitaillementService.findAll().subscribe((prod)=>{
      this.ravitaillements = prod
      console.log(this.ravitaillements)
      this.updateDisplayProduit()
    })
    this.updateDisplayProduit()
  }


  updateDisplayProduit(){
    const startIndex = (this.currentPage -1)*this.pageSize
    const endIndex = startIndex + this.pageSize
    console.log(this.ravitaillements,startIndex,endIndex)
    this.displayRavitaillement = this.ravitaillements.slice(startIndex,endIndex)
  }

  nextPage(){
    if (this.currentPage < Math.ceil(this.ravitaillements.length/this.pageSize)){
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
