// role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {LoginService} from "../../services/auth/login.service";
import {IUser} from "../../../models/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Les rôles attendus, définis dans la configuration de la route (data.expectedRoles)
    const expectedRoles = route.data['expectedRoles'] as string[];

    // Utilisation de getUser() qui renvoie un Observable<IUser|null|undefined>
    return this.loginService.getUser().pipe(
      map((user: IUser | null | undefined) => {
        // Si l'utilisateur n'est pas défini, rediriger vers /login
        if (!user) {
        console.log("depuis role",user)
          this.router.navigate(['/login']);
          return false;
        }
        // Vérifier que l'utilisateur possède au moins un rôle dont le libellé figure dans expectedRoles
        const hasRole = user.roles && user.roles.some(role => expectedRoles.includes(role.libelle));
        if (!hasRole) {
          this.router.navigate(['/forbiden']);
          return false;
        }
        return true;
      }),
      // En cas d'erreur lors de l'obtention de l'utilisateur, rediriger vers /login et retourner false
      catchError(error => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
