import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CategoryService} from "../../../services/produit/category/category.service";
import {ICategory, ITag} from "../../../../models/Interfaces";
import {TagService} from "../../../services/produit/tag/tag.service";
import {Subscription} from "rxjs";
import {UniteProduitEnum} from "../../../../models/Enums";
import {UniteProduitEnumValues} from "../../../../functions/getEnumValues";
import {Category, Tag} from "../../../../models/interfaceRequest";
import {ProduitService} from "../../../services/produit/produit/produit.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../services/global/alert.service";

@Component({
  selector: 'app-gestionnaire-create-produit-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './gestionnaire-create-produit-page.component.html',
  styleUrl: './gestionnaire-create-produit-page.component.css'
})
export class GestionnaireCreateProduitPageComponent implements OnInit,OnDestroy{

  private categoryService:CategoryService = inject(CategoryService)
  private tagService:TagService = inject(TagService)
  private produitService:ProduitService = inject(ProduitService)
  private alertService:AlertService = inject(AlertService)
  private router:Router = inject(Router)
  private subscription: Subscription = new Subscription()
  protected readonly UniteProduitEnumValues = UniteProduitEnumValues;

  categories:ICategory[] = []
  tags:ITag[] = []
  produitCreateForm: FormGroup = new FormGroup({
    libelle: new FormControl<String>(''),
    description: new FormControl<String>(''),
    prix: new FormControl<number>(0),
    reference: new FormControl<String>(''),
    stock: new FormControl<number>(0),
    seuil: new FormControl<number>(0),
    image: new FormControl<any>(null),
    categoryId: new FormControl<number>(0),
    tagsId: new FormControl<number[]>([]),
    unite: new FormControl<UniteProduitEnum>(UniteProduitEnum.UNITE),
  })

  categoryCreateForm: FormGroup = new FormGroup({
    name: new FormControl<String>(''),
    description: new FormControl<String>(''),
  })

  tagCreateForm: FormGroup = new FormGroup({
    name: new FormControl<String>(''),
    description: new FormControl<String>(''),
  })


  ngOnInit(): void {
    const subscribeCat = this.categoryService.findAll().subscribe((cat)=>{
      this.categories = cat
    })
    this.subscription.add(subscribeCat)
    const subscribeTag= this.tagService.findAll().subscribe((tags)=>{
      this.tags = tags
    })
    this.subscription.add(subscribeTag)

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  handleCreateProduit() {
    const data = this.produitCreateForm.value
    const subscribe  = this.produitService.create(data).subscribe((prod)=>{
      if (prod){
        this.produitCreateForm.reset()
        this.router.navigate(["/gestionnaire/show-produit/" + prod.id]).then(r  =>console.log("navigation vers show-produit"))
        this.alertService.show({
          type : 'success',
          message : 'Le produit a bien été créé'
        })
      }
    })
    this.subscription.add(subscribe)
    console.log(this.produitCreateForm.value)
  }

  handleCreateCategorie() {
    const data = this.categoryCreateForm.value as Category
    const subscribe = this.categoryService.create(data).subscribe((cat)=>{
      if (cat){
        this.categories = [...this.categories,cat]
        this.produitCreateForm.patchValue({categoryId: cat.id})
        this.categoryCreateForm.reset()

      }
    })
    this.subscription.add(subscribe)
  }

  handleCreateTag() {
    const data = this.tagCreateForm.value as Tag
    const subscribe = this.tagService.create(data).subscribe((tag)=>{
      if (tag){
        this.tags = [...this.categories,tag]
        this.produitCreateForm.patchValue({tagsId: [...this.produitCreateForm.get('tagsId')?.value,tag.id]})
        this.tagCreateForm.reset()
      }
    })
    this.subscription.add(subscribe)
  }

  onImageChange(event:Event){
   const input = event.target as HTMLInputElement
    if (input.files && input.files.length>0){
      console.log(input.files)

      const reader = new FileReader()
      reader.readAsDataURL(input.files[0])
      reader.onload = ()=>{
        const base64 = reader.result as string
        this.produitCreateForm.patchValue({image: base64})
        console.log(base64)
      }
    }
  }


}
