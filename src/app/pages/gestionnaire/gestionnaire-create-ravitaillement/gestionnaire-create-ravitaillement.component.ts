import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IFounisseur} from "../../../../models/Interfaces";
import {Fournisseur, Ravitaillement} from "../../../../models/interfaceRequest";
import {FournisseurService} from "../../../services/ravitaillement/fournisseur/fournisseur.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../services/global/alert.service";
import {RavitaillementsService} from "../../../services/ravitaillement/ravitaillements.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-gestionnaire-create-ravitaillement',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './gestionnaire-create-ravitaillement.component.html',
  styleUrl: './gestionnaire-create-ravitaillement.component.css'
})
export class GestionnaireCreateRavitaillementComponent implements OnInit,OnDestroy{

  private fournisseurService :FournisseurService = inject(FournisseurService)
  private ravitaillementService :RavitaillementsService = inject(RavitaillementsService)
  private alertService :AlertService = inject(AlertService)
  private router :Router = inject(Router)
  private subscription :Subscription = new Subscription()
  fournisseurs: IFounisseur[] = [];
  ravitaillementCreateForm: FormGroup = new FormGroup({
    fournisseurId: new FormControl<number|null>(null,[Validators.required]),
    deliveredDate: new FormControl<Date|null>(null,[Validators.required]),
    description : new FormControl<string>('')
  });

  fournisseurCreateForm :FormGroup =  new FormGroup({
    name: new FormControl<String>(''),
    address: new FormControl<String>(''),
    phoneNumber: new FormControl<String>(''),
    email: new FormControl<String>(''),
    description: new FormControl<String>(''),
})



  handleCreateRavtitaillement() {
    if (this.ravitaillementCreateForm.valid){
      const credential :Ravitaillement = this.ravitaillementCreateForm.value
      const sub = this.ravitaillementService.create(credential).subscribe((ravitaillement)=>{
        if(ravitaillement){
          this.alertService.show({
            type: "success",
            message: "Le ravitaillement a ete bien creer"
          })
          this.router.navigate(["/gestionnaire/show-ravitaillement/" + ravitaillement.id])
        } else {
          this.alertService.show({
            type: "error",
            message: "Une erreur inconnu est survenu"
          })
        }
      })
      this.subscription.add(sub)
    }
  }

  handleCreateFournisseur() {
    if (this.fournisseurCreateForm.valid){
      const credential :Fournisseur = this.fournisseurCreateForm.value
      const sub = this.fournisseurService.create(credential).subscribe((fournisseur)=>{
        if(fournisseur){
          this.alertService.show({
            type: "success",
            message: "Le fournisseur a ete bien creer"
          })
          this.fournisseurs = [...this.fournisseurs,fournisseur]
          this.ravitaillementCreateForm.patchValue({
            fournisseurId : fournisseur.id
          })
        } else {
          this.alertService.show({
            type: "error",
            message: "Une erreur inconnu est survenu"
          })
        }
      })
      this.subscription.add(sub)
    }
  }

  ngOnInit(): void {
    const sub = this.fournisseurService.findAll().subscribe(f =>{
      this.fournisseurs = f
    })

    this.subscription.add(sub)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
