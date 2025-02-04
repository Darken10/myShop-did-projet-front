import { Injectable } from '@angular/core';
import {IProduit} from "../../../models/Interfaces";
import {CartDataType} from "../../../models/Types";


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = "cartProduits"
  constructor() { }



/*  set cartProuit(data: Map<number, { quantite: number; produit: IProduit }>){
      sessionStorage.setItem("cartData",JSON.stringify(Object.fromEntries(data)))
  }

  get cartProuit (): Map<number, { quantite: number; produit: IProduit }> {
    const storeData = sessionStorage.getItem("cartData")
    if (!storeData) {
      return new Map()
    }
    return JSON.parse(storeData)
  }

/!*  add(data:CartDataType){
    const old = this.cartProuit.find(a=>a.produit.id===data.produit.id)
    if (old){
      //TODO :
    }
    this.cartProuit.push(data)
  }*!/*/


  getCart() : Map<number, CartDataType>{
    const storedData = sessionStorage.getItem(this.storageKey)
    if (storedData){
      return new Map<number, CartDataType>(Object.entries(JSON.parse(storedData)).map(([key,value])=>[Number(key),value as CartDataType]))
    }
    return new Map<number, CartDataType>()
  }

  addProduit(produitId:number,produitData:CartDataType){
    let cart = this.getCart()
    cart.set(produitId,produitData)
    this.saveCart(cart)
  }

  removeProduit(produitId:number){
    let cart  = this.getCart()
    cart.delete(produitId)
    this.saveCart(cart)
  }

  clearCart(){
    sessionStorage.removeItem(this.storageKey)
  }

  private saveCart(cart:Map<number,CartDataType>){
    sessionStorage.setItem(this.storageKey,JSON.stringify(Object.fromEntries(cart)))
  }


}

