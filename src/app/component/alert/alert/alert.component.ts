import {Component, inject, OnInit} from '@angular/core';
import {AlertService} from "../../../services/global/alert.service";
import {AsyncPipe} from "@angular/common";
import {AlertType} from "../../../../models/Types";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent  implements OnInit{
  alert : AlertType | null = null
  alertService:AlertService = inject(AlertService)

  ngOnInit(): void {
    this.alertService.alert$.subscribe(al=>{
      this.alert = al
    })
  }


}
