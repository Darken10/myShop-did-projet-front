import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

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
export class CaissierLayoutPageComponent {

}
