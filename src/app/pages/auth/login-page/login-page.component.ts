import {Component, inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "../../../services/auth/login.service";
import {LoginCredentialType} from "../../../../models/Types";
import {IUser} from "../../../../models/Interfaces";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnDestroy{

  loginForm: FormGroup
  loginService: LoginService = inject(LoginService)
  loginSupciption: Subscription | undefined
  private router: Router = inject(Router);
  constructor() {
    this.loginForm = new FormGroup({
      "matricule": new FormControl<string>(""),
      "password": new FormControl<string>(""),
    })
  }

  invalideCredential:Boolean = false


  handleSubmit() {
    console.log(this.loginForm.value)
    this.loginSupciption = this.loginService.login(this.loginForm.value as LoginCredentialType)
      .subscribe({
        next:((res:IUser|null|undefined)=>{
          if (res){
            this.invalideCredential = false
            this.router.navigate(['/']).then(_ => {
              console.log(res)
            });
          }

        }),
        error:(error=>{
          this.invalideCredential = true
          if(error.status==0) console.error("Une erreur s'est produite!Verifier votre connexion internet");
          else {
            console.error(error.error["message:"]);
          }
        })
      })
  }

  ngOnDestroy(): void {
    this.loginSupciption?.unsubscribe()
  }
}
