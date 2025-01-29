import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AlertType} from "../../../models/Types";


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSubject = new BehaviorSubject<AlertType|null>(null)
  alert$ = this.alertSubject.asObservable()
  constructor() {

  }


  show({type,message,time}:AlertType){
      this.alertSubject.next({type,message})
    setTimeout(()=>{
      this.clearAlert();
    },5000)

  }

   clearAlert() {
    this.alertSubject.next(null)
  }
}
