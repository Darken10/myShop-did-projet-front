import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {LoginService} from "../../../services/auth/login.service";
import {IUser} from "../../../../models/Interfaces";

@Component({
  selector: 'app-gestionnaire-layout-page',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './gestionnaire-layout-page.component.html',
  styleUrl: './gestionnaire-layout-page.component.css'
})
export class GestionnaireLayoutPageComponent implements OnInit{

  private loginService : LoginService = inject(LoginService)
  user: IUser | null | undefined;

  ngOnInit(): void {
    this.loginService.getUser().subscribe(u=>{
      this.user  = u
    })
  }


}
