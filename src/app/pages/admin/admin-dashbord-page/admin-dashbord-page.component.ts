import {Component, inject, OnInit} from '@angular/core';
import {StatistiqueService} from "../../../services/statistique/statistique.service";
import {IUser} from "../../../../models/Interfaces";
import {UserCountByStatutResponse, UserCountResponse} from "../../../../models/Types";

@Component({
  selector: 'app-admin-dashbord-page',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashbord-page.component.html',
  styleUrl: './admin-dashbord-page.component.css'
})
export class AdminDashbordPageComponent implements OnInit{
  private statistiqueService : StatistiqueService = inject(StatistiqueService)
  user: IUser | null | undefined;
  userCountByStatus : UserCountByStatutResponse | undefined
  userCount : UserCountResponse | undefined

  ngOnInit(): void {
    this.statistiqueService.getUsersCountByStatut().subscribe(stat=>{
      this.userCountByStatus = stat
    })
    this.statistiqueService.getUsersCount().subscribe(stat=>{
      this.userCount = stat
    })
  }


}
