import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

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
export class GestionnaireLayoutPageComponent {

}
