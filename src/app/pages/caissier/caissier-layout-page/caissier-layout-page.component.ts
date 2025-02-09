import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {LoginService} from "../../../services/auth/login.service";
import {IUser} from "../../../../models/Interfaces";

@Component({
  selector: 'app-caissier-layout-page',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './caissier-layout-page.component.html',
  styleUrl: './caissier-layout-page.component.css'
})
export class CaissierLayoutPageComponent  implements OnInit{

  private loginService : LoginService = inject(LoginService)
  user: IUser | null | undefined;

  ngOnInit(): void {
    this.loginService.getUser().subscribe(u=>{
      this.user  = u
    })
  }


}
