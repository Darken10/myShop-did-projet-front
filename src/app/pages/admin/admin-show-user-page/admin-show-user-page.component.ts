import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UsersService} from "../../../services/users/users.service";
import {ICommande, IUser} from "../../../../models/Interfaces";
import {DatePipe, UpperCasePipe} from "@angular/common";
import {StatutBadgeComponent} from "../../../component/StatutBadge/statut-badge/statut-badge.component";
import {ThousandSeparatorPipe} from "../../../pipes/Price/thousand-separator.pipe";
import {TicketCaisseService} from "../../../services/ticketCaisse/ticket-caisse.service";

@Component({
  selector: 'app-admin-show-user-page',
  standalone: true,
  imports: [
    DatePipe,
    StatutBadgeComponent,
    ThousandSeparatorPipe,
    UpperCasePipe,
    RouterLink
  ],
  templateUrl: './admin-show-user-page.component.html',
  styleUrl: './admin-show-user-page.component.css'
})

export class AdminShowUserPageComponent implements OnInit{
  private route :ActivatedRoute = inject(ActivatedRoute)
  private userService: UsersService = inject(UsersService)
   ticketService = inject(TicketCaisseService)
  user : IUser|undefined
  commandes : ICommande[] = []
  displayCommandes : ICommande[] = []

  ngOnInit(): void {
    const id:number = parseInt(this.route.snapshot.params['id'])
    this.userService.find(id).subscribe((u)=>{
      if (u) this.user = u
    })

    this.userService.getCommandesByUser(id).subscribe(coms=>{
      if (coms) this.commandes = coms
      console.log(coms)
      this.updateDisplayCommandes()
    })
  }


  users : IUser[] = []

  currentPage  = 1;
  pageSize = 12



  updateDisplayCommandes(){
    const startIndex = (this.currentPage -1)*this.pageSize
    const endIndex = startIndex + this.pageSize
    this.displayCommandes = this.commandes.slice(startIndex,endIndex)
  }

  nextPage(){
    if (this.currentPage<Math.ceil(this.commandes.length/this.pageSize)){
      this.currentPage++;
      this.updateDisplayCommandes()
    }
  }

  previousPage(){
    if (this.currentPage>1){
      this.currentPage--
      this.updateDisplayCommandes()
    }
  }



}
