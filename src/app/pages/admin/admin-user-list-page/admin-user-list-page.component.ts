import {Component, inject, OnInit} from '@angular/core';
import {CommandeService} from "../../../services/produit/commande/commande.service";
import {TicketCaisseService} from "../../../services/ticketCaisse/ticket-caisse.service";
import {ICommande, IUser} from "../../../../models/Interfaces";
import {UsersService} from "../../../services/users/users.service";
import {DatePipe, UpperCasePipe} from "@angular/common";
import {UserStatusEnum} from "../../../../models/Enums";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-admin-user-list-page',
  standalone: true,
  imports: [
    UpperCasePipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './admin-user-list-page.component.html',
  styleUrl: './admin-user-list-page.component.css'
})
export class AdminUserLIstPageComponent implements OnInit{
  private userService:UsersService = inject(UsersService)
  users : IUser[] = []
  displayUsers : IUser[] = []

  currentPage  = 1;
  pageSize = 12

  ngOnInit() {
    this.userService.findAll().subscribe((users)=>{
      this.users = users
      this.updateDisplayUsers()
    })
  }

  updateDisplayUsers(){
    const startIndex = (this.currentPage -1)*this.pageSize
    const endIndex = startIndex + this.pageSize
    this.displayUsers = this.users.slice(startIndex,endIndex)
  }

  nextPage(){
    if (this.currentPage<Math.ceil(this.users.length/this.pageSize)){
      this.currentPage++;
      this.updateDisplayUsers()
    }
  }

  previousPage(){
    if (this.currentPage>1){
      this.currentPage--
      this.updateDisplayUsers()
    }
  }

  protected readonly UserStatusEnum = UserStatusEnum;
}
