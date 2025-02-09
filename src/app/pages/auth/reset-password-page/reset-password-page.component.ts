import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "../../../services/auth/login.service";
import {AlertService} from "../../../services/global/alert.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css'
})
export class ResetPasswordPageComponent {
  private loginService: LoginService = inject(LoginService)
  private alertService: AlertService = inject(AlertService)
  private router: Router = inject(Router)
  private route: ActivatedRoute = inject(ActivatedRoute)
  newPwdForm: FormGroup = new FormGroup({
    password : new FormControl<string>(''),
    comfirmation : new FormControl<string>(''),
  });
  isNotValide: boolean = false;
  jeton : string = ""

  handleResetPassword() {
      this.route.queryParams.subscribe(params=> {
        this.jeton = params['jeton']
      })
    if (this.isSame()){
      this.isNotValide = false
      this.loginService.changePassword({...this.newPwdForm.value,jeton:this.jeton}).subscribe((user)=>{
        if (user){
          this.alertService.show({
            type: "success",
            message : "Le mot de passe a ete mise a jour avec succes"
          })
          this.router.navigate(['/login'])
        }
      })
      console.log(this.newPwdForm.value)
    } else {
      this.isNotValide = true
    }
  }

  isSame = ()=>{

    const data =  this.newPwdForm.value
    return data.password!=='' && data.password===data.comfirmation
  }

}
