import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart/cart.service";
import {Subscription} from "rxjs";
import {IClient, IProduit} from "../../../../models/Interfaces";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Client, Commande, Paiement} from "../../../../models/interfaceRequest";
import {CommandeStatutEnum, MethodePaiementEnum, StatusPaiementEnum} from "../../../../models/Enums";
import {ClientService} from "../../../services/produit/client/client.service";
import {CartDataType} from "../../../../models/Types";
import {AlertService} from "../../../services/global/alert.service";
import {CommandeService} from "../../../services/produit/commande/commande.service";
import {Router} from "@angular/router";
import {TicketCaisseService} from "../../../services/ticketCaisse/ticket-caisse.service";
import {PaiementService} from "../../../services/paiement/paiement.service";

@Component({
  selector: 'app-caisse-create-commande',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './caisse-create-commande.component.html',
  styleUrl: './caisse-create-commande.component.css'
})
export class CaisseCreateCommandeComponent implements OnInit,OnDestroy{

  protected readonly CommandeStatutEnum = CommandeStatutEnum;
  protected readonly MethodePaiementEnum = MethodePaiementEnum;
  protected readonly StatusPaiementEnum = StatusPaiementEnum;

  private  cartService: CartService = inject(CartService)
  private  clientService: ClientService = inject(ClientService)
  private  alertService: AlertService = inject(AlertService)
  private  commandeService: CommandeService = inject(CommandeService)
  private paiementService: PaiementService = inject(PaiementService)
  private  router: Router = inject(Router)
  private subcription = new Subscription()

  cartProduits : Map<number, CartDataType> = new Map()

  clients: IClient[] = [];
  createCommandeForm : FormGroup = new FormGroup({
    clientId : new FormControl<number>(1),
    description: new FormControl<string>(''),
    status: new FormControl<CommandeStatutEnum>(CommandeStatutEnum.DELIVERED),
  })

  createClientForm = new FormGroup({
    name : new FormControl<string>(''),
    phone : new FormControl<string>(''),
    adress : new FormControl<string>(''),
    solde  : new FormControl<number>(0)
})

  createPaiementForm = new FormGroup({
    methode: new FormControl<MethodePaiementEnum>(MethodePaiementEnum.ESPECE),
    reference: new FormControl<string>(''),
    amount: new FormControl<number>(this.getGobaleTotalPrice()),
    status: new FormControl<StatusPaiementEnum>(StatusPaiementEnum.PAYER),
    comment: new FormControl<string>(''),
  })
  private ticketService: TicketCaisseService = inject(TicketCaisseService);

  ngOnInit(): void {

    this.clientService.findAll().subscribe((cls)=>{
      this.clients = cls
    })

    this.cartProduits = this.cartService.getCart()
    console.log(this.cartProduits)
    this.createPaiementForm.patchValue({amount: this.getGobaleTotalPrice()})
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe()
  }

  getCredential (): Commande{
    const credential:Commande = {
      ...this.createCommandeForm.value,
      status : this.createCommandeForm.value.status,
      ligneCommandes: []
    }
    this.cartProduits.forEach((p)=>{
      credential.ligneCommandes.push({
        prixUnitaire: p.produit.prix,
        produitId: p.produit.id,
        quantity: p.quantite,
        promotionsId : p.promotion?.id
      })
    })
    return credential
  }

  getGobaleTotalPrice(){
    let somme = 0
    this.cartProduits.forEach((a)=>{
      somme =  somme + this.getTotalPriceByProduct(a.produit.id)
    })

    return somme
  }

  getTotalPriceByProduct(id: number) {
    const cartProduit = this.cartProduits.get(id)
    if (cartProduit) {
      if (cartProduit.promotion) {
        return cartProduit?.quantite * (cartProduit.promotion.isPercent ? (cartProduit?.produit?.prix-cartProduit?.produit?.prix * cartProduit.promotion.reduction / 100) : cartProduit.promotion.reduction) as number
      } else {
        return cartProduit?.quantite * cartProduit?.produit?.prix as number
      }
    } else {
      return 0
    }
  }

  getQuantite(id:number){
    return this.cartProduits.get(id)?.quantite || 0
  }
  incrementQuantite(id: number){

    const  currentQt = this.cartProduits.get(id)?.quantite || 0
    if (this.getProduit(id).stock>=currentQt+1){
      this.cartProduits.set(id,{quantite:currentQt+1,produit: this.getProduit(id)})
    }
  }
  decrementQuantite(id: number){
    const  currentQt = this.cartProduits.get(id)?.quantite || 0
    if (currentQt>0){
      this.cartProduits.set(id,{quantite:currentQt-1,produit: this.getProduit(id)})
    } else {
      this.cartProduits.has(id) ? this.cartProduits.delete(id) : ''
    }
  }

  getProduit(id: number): IProduit{
    return <IProduit>this.cartProduits.get(id)?.produit
  }

  onQuantiteChangeByInput($event: Event, id: number) {
    const inputValue = ($event.target as HTMLInputElement).value
    const quantite = Number(inputValue)
    if (!isNaN(quantite) && quantite > 0) {
      this.cartProduits.set(id, {produit: this.getProduit(id), quantite: quantite})
    } else {
      this.cartProduits.has(id) ? this.cartProduits.delete(id) : '';
      ($event.target as HTMLInputElement).value = String(this.getQuantite(id));
    }
  }

  EnregistreVente() {
    const credential = this.getCredential()
    console.log(credential)
    this.commandeService.create(credential).subscribe(commande=>{
      if (commande){
        console.log("commade cree",commande)
        this.ticketService.generateAndPrintTicket(commande);
        if (commande.status!==CommandeStatutEnum.NEW){
          this.registerPaiement(commande.id)
        }
        this.alertService.show({type:"success",message:"Commande a bien ete passer"})
        this.cartService.clearCart()
        this.router.navigate(['/produits-list'],{onSameUrlNavigation:'reload'})
      }
    })
  }

  private registerPaiement(commadeId:number){
    const credential : Paiement = {
        ...this.createPaiementForm.value,
        commandeId: commadeId,
        date: new Date(),
      } as Paiement
    this.paiementService.create(credential).subscribe(paie=>{
      if (paie){
        console.log("paiement effectuer avec success",paie)
      }
    })
  }

  handleCreateClient() {
     const credential:Client = this.createClientForm.value as Client
    this.clientService.create(credential).subscribe((client)=>{
      if (client){
        this.clients = [...this.clients,client]
        this.createCommandeForm.patchValue({clientId : client.id})
        this.alertService.show( {
          type:"success",
          message:"Le client a été bien créer"
        })
      }
    })
  }

  onChangePromotionListe($event: Event, produitId: number){
    const inputValue = ($event.target as HTMLInputElement).value
    const promotionId = Number(inputValue)
    const cartData = this.cartProduits.get(produitId)

    if (cartData){
      const promotion = cartData.produit.promotions.find((promo)=>promo.id===promotionId)
      this.cartProduits.set(produitId,{...cartData,promotion:promotion})
      this.createPaiementForm.patchValue({amount: this.getGobaleTotalPrice()})
    }
  }

  generateFacture() {
    const ticketData = {
      date: new Date().toLocaleString(),
      caisse: 'Caisse 1',
      ticketNumber: '123456'.padStart(8,'0'),
      client: {
        name: 'Jean Dupont',
        phone: '+226 78 90 12 34'
      },
      items: [
        { name: 'Produit AProduit AProduit AProduit AProduit AProduit ', quantity: 2, price: 500, total: 1000 },
        { name: 'Produit B', quantity: 1, price: 1500, total: 1500 }
      ],
      total: 2500,
      paymentMethod: 'Carte bancaire',
      qrCodeData: 'https://mon-magasin.com/ticket/123456'
    };
/*
    this.ticketService.generateAndPrintTicket(ticketData);*/
  }


}

