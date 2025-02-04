import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart/cart.service";
import {Subscription} from "rxjs";
import {IClient, IProduit} from "../../../../models/Interfaces";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Client, Commande} from "../../../../models/interfaceRequest";
import {CommandeStatutEnum} from "../../../../models/Enums";
import {ClientService} from "../../../services/produit/client/client.service";
import {CartDataType} from "../../../../models/Types";
import {AlertService} from "../../../services/global/alert.service";
import {CommandeService} from "../../../services/produit/commande/commande.service";
import {Router} from "@angular/router";

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

  private  cartService: CartService = inject(CartService)
  private  clientService: ClientService = inject(ClientService)
  private  alertService: AlertService = inject(AlertService)
  private  commandeService: CommandeService = inject(CommandeService)
  private  router: Router = inject(Router)
  private subcription = new Subscription()

  cartProduits : Map<number, CartDataType> = new Map()

  clients: IClient[] = [];
  createCommandeForm : FormGroup = new FormGroup({
    clientId : new FormControl<number>(1),
    description: new FormControl<string>(''),
    status: new FormControl<CommandeStatutEnum>(CommandeStatutEnum.NEW),
  })

  createClientForm = new FormGroup({
    name : new FormControl<string>(''),
    phone : new FormControl<string>(''),
    adress : new FormControl<string>(''),
    solde  : new FormControl<number>(0)
})




  ngOnInit(): void {

    this.clientService.findAll().subscribe((cls)=>{
      this.clients = cls
    })

    this.cartProduits = this.cartService.getCart()
    console.log(this.cartProduits)
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe()
  }


  getCredential (): Commande{
    const credential:Commande = {
      ...this.createCommandeForm.value,
      ligneCommandes: []
    }
    this.cartProduits.forEach((p)=>{
      credential.ligneCommandes.push({
        prixUnitaire: p.produit.prix,
        produitId: p.produit.id,
        quantity: p.quantite
        /* promotionsId: , */
      })
    })
    console.log(credential)
    return credential
  }

  getGobaleTotalPrice(){
    let somme = 0
    this.cartProduits.forEach((a)=>{
      somme =  somme + this.getTotalPriceByProduct(a.produit.id)
    })
    return somme
  }

  getTotalPriceByProduct(id: number){
    const cartProduit = this.cartProduits.get(id)
    if (cartProduit){
      return cartProduit?.quantite*cartProduit?.produit?.prix as number
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
        console.log(commande)
        this.alertService.show({type:"success",message:"Commande a bien ete passer"})
        this.router.navigate(['/produits-list'],{onSameUrlNavigation:'reload'})
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

  protected readonly CommandeStatutEnum = CommandeStatutEnum;
}

