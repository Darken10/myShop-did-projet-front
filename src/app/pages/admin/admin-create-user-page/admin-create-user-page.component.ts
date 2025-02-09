import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Genre, Role, UserStatusEnum} from "../../../../models/Enums";
import {UsersService} from "../../../services/users/users.service";
import {User} from "../../../../models/interfaceRequest";
import {AlertService} from "../../../services/global/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-create-user-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './admin-create-user-page.component.html',
  styleUrl: './admin-create-user-page.component.css'
})
export class AdminCreateUserPageComponent {
  private userService : UsersService = inject(UsersService)
  private router : Router = inject(Router)
  private alertService : AlertService = inject(AlertService)
  createUserForm: FormGroup = new FormGroup({
    firstName: new FormControl<string>('') ,
    lastName: new FormControl<string>('') ,
    genre: new FormControl<Genre>(Genre.MALE) ,
    dateNaissance: new FormControl<Date>(new Date()) ,
    email: new FormControl<string>('') ,
    phoneNumber: new FormControl<string>('') ,
    matricule: new FormControl<string>('') ,
    status: new FormControl<UserStatusEnum>(UserStatusEnum.EN_ATTENTE) ,
    rolesId: new FormControl<number[]>([]) ,
  });


  data = [
    { id: '1', label: Role.Admin  },
    { id: '2', label: Role.Caissier  },
    { id: '3', label: Role.Gestionnaire  }
  ];


  value : string  = ""
  protected readonly Genre = Genre;
  protected readonly Role = Role;

  handleCreateUser() {
    const credential = this.createUserForm.value as User
    this.userService.create(credential).subscribe(user=>{
      if (user) {
        this.alertService.show({
          type : 'success',
          message : "L'utilisateur a ete bien creer"
        })
        this.router.navigate(['/admin/users/'+user.id])
      }
    })
  }



}
