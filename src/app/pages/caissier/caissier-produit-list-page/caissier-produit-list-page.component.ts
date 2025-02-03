import {Component, inject} from '@angular/core';
import {ProduitService} from "../../../services/produit/produit/produit.service";
import {IClient, IProduit} from "../../../../models/Interfaces";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Modal, ModalOptions} from 'flowbite';
import {CommandeService} from "../../../services/produit/commande/commande.service";
import {ClientService} from "../../../services/produit/client/client.service";
import {Router} from "@angular/router";
import {FactureService} from "../../../services/global/facture/facture.service";
import {AlertService} from "../../../services/global/alert.service";
import {Commande, LigneCommandes} from "../../../../models/interfaceRequest";
import {CommandeStatutEnum} from "../../../../models/Enums";

@Component({
  selector: 'app-caissier-produit-list-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './caissier-produit-list-page.component.html',
  styleUrl: './caissier-produit-list-page.component.css'
})
export class CaissierProduitListPageComponent {

  private  produitService: ProduitService = inject(ProduitService)
  private  commandeService: CommandeService = inject(CommandeService)
  private  clientService: ClientService = inject(ClientService)
  private  factureService: FactureService = inject(FactureService)
  private  alertService: AlertService = inject(AlertService)
  private  router: Router = inject(Router)

  cartProduits: Map<number, {quantite: number,produit: IProduit}> = new Map()
  produits : IProduit[] = []
  produit : IProduit | undefined = undefined
  displayProduits : IProduit[] = []
  clients: IClient[] = [];
  createCommandeForm : FormGroup = new FormGroup({
    isNewClient : new FormControl(''),
    client : new FormGroup({
      name : new FormControl(''),
      phone : new FormControl(''),
      adress : new FormControl(''),
      solde  : new FormControl(0)
    }),
    clientId : new FormControl<number>(0),
  })

  commandeForm : FormGroup = new FormGroup({
    isNewClient : new FormControl(''),
  })


  currentPage  = 1;
  pageSize = 3
  /*
    $targetEl = null;
    options:ModalOptions = {
      placement: 'bottom-right',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
      closable: true,
    };
    instanceOptions = {
      id: 'voir-prouit-info',
      override: true
    };

    modal = new Modal(this.$targetEl, this.options, this.instanceOptions);

  */



  constructor() {
   /* this.modal._targetEl = document.getElementById('voir-prouit-info')*/
    this.produitService.findAll().subscribe((prod)=>{
      this.produits = prod
      console.log(this.produits)
      this.updateDisplayProduit()
    })
    this.clientService.findAll().subscribe((cls)=>{
      this.clients = cls
    })

    this.commandeService.findAll().subscribe(a=>{
      console.log(a)
    })



  }

  updateDisplayProduit(){
    const startIndex = (this.currentPage -1)*this.pageSize
    const endIndex = startIndex + this.pageSize
    this.displayProduits = this.produits.slice(startIndex,endIndex)
  }

  nextPage(){
    if (this.currentPage<Math.ceil(this.produits.length/this.pageSize)){
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
    return <IProduit>this.produits.find((p) => p.id === id)
  }

  onQuantiteChangeByInput($event: Event, id: number) {
    const inputValue = ($event.target as HTMLInputElement).value
    const quantite = Number(inputValue)
    if (!isNaN(quantite) && quantite > 0){
      this.cartProduits.set(id,{produit: this.getProduit(id), quantite: quantite})
    }else {
      this.cartProduits.has(id) ? this.cartProduits.delete(id) : '';
      ($event.target as HTMLInputElement).value = String(this.getQuantite(id));

    }

  }

  getTotalPriceByProduct(id: number){
    const cartProduit = this.cartProduits.get(id)
    if (cartProduit){
      return cartProduit?.quantite*cartProduit?.produit?.prix as number
    } else {
      return 0
    }
  }

  getGobaleTotalPrice(){
    let somme = 0
    this.cartProduits.forEach((a)=>{
      somme =  somme + this.getTotalPriceByProduct(a.produit.id)
    })
    return somme
  }

  EnregistreVente() {
    // TODO :  je doit enregistrer la vente
    /*this.commandeService.create()*/
    const creadential:Commande = this.getCredential()
    this.commandeService.create(creadential).subscribe((com)=>{
      if (com){
        this.factureService.generateFacture().subscribe(etat=>{
          if (etat){
            this.alertService.show({
              type : "success",
              message : "La facture a ete bien genere"
            })
          }
        })
      }
      else {
        this.alertService.show({
          type : "error",
          message : "Une erreur inatendu est arrive lors de la generation"
        })
      }

    })

    this.cartProduits.clear()
  }

  openProduitInfoModal(proId:number) {
/*    this.modal._targetEl =  document.getElementById('voir-prouit-info')
    this.modal.show()*/
    this.produit = this.produits.find((a)=>a.id===proId)

  }

  getCredential (): Commande{
    const credential:Commande = {
      clientId: this.createCommandeForm.value.clientId,
      description: "",
      status: CommandeStatutEnum.NEW,
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

  gotoFacture() {

    this.router.navigate(["/create-commande",{cart : this.cartProduits}])
  }
}
