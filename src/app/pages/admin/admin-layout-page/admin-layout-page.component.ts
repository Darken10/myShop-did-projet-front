import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {IUser} from "../../../../models/Interfaces";
import {LoginService} from "../../../services/auth/login.service";
import {StatistiqueService} from "../../../services/statistique/statistique.service";
import {UserCountByStatutResponse} from "../../../../models/Types";
import {Observable, ObservedValueOf} from "rxjs";

@Component({
  selector: 'app-admin-layout-page',
  standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './admin-layout-page.component.html',
  styleUrl: './admin-layout-page.component.css'
})
export class AdminLayoutPageComponent implements OnInit{

  private loginService : LoginService = inject(LoginService)
  user: IUser | null | undefined;

  ngOnInit(): void {
    this.loginService.getUser().subscribe(u=>{
      this.user  = u
    })
  }


}
