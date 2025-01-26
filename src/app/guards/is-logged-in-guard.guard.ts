import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "../services/auth/login.service";
import {IUser} from "../../models/Interfaces";
import {UserStatusEnum} from "../../models/Enums";

export const isLoggedInGuardGuard: CanActivateFn = (route, state) => {
  const loginService=inject(LoginService);
  const router=inject(Router);

  console.log("user",loginService.user());
  if(loginService.user()=== undefined){
    loginService.getUser().subscribe({
      next:(res)=>{
        console.log("resultat",res);
        loginService.user.set(res as IUser);
        return true;
      },
      error:(err)=>{
        router.navigate(['/login']);
        return false;
      }
    })
  }else if(loginService.user()=== null){
    router.navigate(['/login']);
    return false;
  }
  return true;
};
