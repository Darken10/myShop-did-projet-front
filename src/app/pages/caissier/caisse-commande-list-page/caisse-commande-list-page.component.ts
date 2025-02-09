import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ICommande} from "../../../../models/Interfaces";
import {RouterLink} from "@angular/router";
import {CommandeService} from "../../../services/produit/commande/commande.service";
import {TicketCaisseService} from "../../../services/ticketCaisse/ticket-caisse.service";
import {StatutBadgeComponent} from "../../../component/StatutBadge/statut-badge/statut-badge.component";
import {CommandeStatutEnum, StatusPaiementEnum} from "../../../../models/Enums";

@Component({
  selector: 'app-caisse-commande-list-page',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    StatutBadgeComponent
  ],
  templateUrl: './caisse-commande-list-page.component.html',
  styleUrl: './caisse-commande-list-page.component.css'
})
export class CaisseCommandeListPageComponent {

  private commandeService:CommandeService = inject(CommandeService)
  ticketService: TicketCaisseService = inject(TicketCaisseService)
  commandes : ICommande[] = []
  displayCommandes : ICommande[] = []

  currentPage  = 1;
  pageSize = 12

  constructor() {
    /* this.modal._targetEl = document.getElementById('voir-prouit-info')*/
    this.commandeService.findAll().subscribe((prod)=>{
      this.commandes = prod
      this.updateDisplayCommande()
    })
  }


  updateDisplayCommande(){
    const startIndex = (this.currentPage -1)*this.pageSize
    const endIndex = startIndex + this.pageSize
    this.displayCommandes = this.commandes.slice(startIndex,endIndex)
  }

  nextPage(){
    if (this.currentPage<Math.ceil(this.commandes.length/this.pageSize)){
      this.currentPage++;
      this.updateDisplayCommande()
    }
  }

  previousPage(){
    if (this.currentPage>1){
      this.currentPage--
      this.updateDisplayCommande()
    }
  }

    protected readonly CommandeStatutEnum = CommandeStatutEnum;
    protected readonly StatusPaiementEnum = StatusPaiementEnum;
}
