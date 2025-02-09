import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ProduitService} from "../../../services/produit/produit/produit.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {PromotionService} from "../../../services/produit/produit/promotion.service";
import {ICommande, IProduit} from "../../../../models/Interfaces";
import {CommandeService} from "../../../services/produit/commande/commande.service";
import {StatutBadgeComponent} from "../../../component/StatutBadge/statut-badge/statut-badge.component";
import {TicketCaisseService} from "../../../services/ticketCaisse/ticket-caisse.service";
import {AlertService} from "../../../services/global/alert.service";
import {ThousandSeparatorPipe} from "../../../pipes/Price/thousand-separator.pipe";
import {FormatDateTimePipe} from "../../../pipes/formatDateTime/format-date-time.pipe";
import {DatePipe} from "@angular/common";
import {MethodePaiementEnum, StatusPaiementEnum} from "../../../../models/Enums";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {initModals} from "flowbite";
import {Paiement} from "../../../../models/interfaceRequest";
import {PaiementService} from "../../../services/paiement/paiement.service";

@Component({
  selector: 'app-caisse-show-commande-page',
  standalone: true,
  imports: [
    StatutBadgeComponent,
    ThousandSeparatorPipe,
    FormatDateTimePipe,
    DatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './caisse-show-commande-page.component.html',
  styleUrl: './caisse-show-commande-page.component.css'
})
export class CaisseShowCommandePageComponent implements OnInit,OnDestroy{
  private commandeService:CommandeService = inject(CommandeService)
  private activeRoute :ActivatedRoute = inject(ActivatedRoute)
  ticketService: TicketCaisseService = inject(TicketCaisseService);
  alertService: AlertService = inject(AlertService);
  private subscription:Subscription = new Subscription()
  protected readonly MethodePaiementEnum = MethodePaiementEnum;
  protected readonly StatusPaiementEnum = StatusPaiementEnum;
  commande : ICommande| undefined

  createPaiementForm = new FormGroup({
    methode: new FormControl<MethodePaiementEnum>(MethodePaiementEnum.ESPECE),
    reference: new FormControl<string>(''),
    amount: new FormControl<number>(0),
    status: new FormControl<StatusPaiementEnum>(StatusPaiementEnum.PAYER),
    comment: new FormControl<string>(''),
  })
  private paiementService: PaiementService = inject(PaiementService);


  ngOnInit(): void {
    const id:number = parseInt(this.activeRoute.snapshot.params['id'])
    this.commandeService.find(id).subscribe((c)=>{
      if (c) {
        this.commande = c
        initModals()
        this.createPaiementForm.patchValue({amount: this.ticketService.getMontantRestant(c)})
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  regenerFacture() {
    if (this.commande)
    this.ticketService.generateAndPrintTicket(this.commande).then(r => {
      this.alertService.show({
        type : "success",
        message : "La facture a ete bien re-generer"
      })
    })
  }

  totalePaiements() {
    let somme = 0
    this.commande?.paiements.forEach(paie=>{
      somme += paie.amount
    })
    return somme
  }

  CreatePaiement() {
    const credential : Paiement = {
      ...this.createPaiementForm.value,
      commandeId: this.commande?.id,
      date: new Date(),
    } as Paiement
    this.paiementService.create(credential).subscribe(paie=>{
      if (paie){
        this.alertService.show({
          type : "success",
          message : "paiement effectuer avec success"
        })
        this.createPaiementForm.reset()
        this.ngOnInit()
      }
    })
  }


  get isTotaliePayer(){
    if (this.commande)
    return this.ticketService.isTotaliePayer(this.commande)
    return false
  }
}
