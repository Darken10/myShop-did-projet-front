import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {IUser} from "../../../../models/Interfaces";
import {LoginService} from "../../../services/auth/login.service";
import {StatistiqueService} from "../../../services/statistique/statistique.service";
import {UserCountByStatutResponse} from "../../../../models/Types";
import {Observable, ObservedValueOf} from "rxjs";
import {AlertService} from "../../../services/global/alert.service";

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
  private router : Router = inject(Router)
  private alertService: AlertService = inject(AlertService)
  user: IUser | null | undefined;

  ngOnInit(): void {
    this.loginService.getUser().subscribe(u=>{
      this.user  = u
    })
  }

  logout(){
    this.loginService.logout().subscribe({
      next:_=>{
        this.loginService.user.set(null);
        this.router.navigate(['/login']);

        this.alertService.show({
          type :'success',
          message : 'Vous avez ete deconnecter'
        })
        console.log("logout");
      },
      error:(error)=>{
        this.router.navigate(['/login']);
        this.alertService.show({
          type :'error',
          message : 'Une erreur a ete rencontre'
        })
        console.log("logout erreur",error);
      }
    });
  }


}
