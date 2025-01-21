import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin-layout-page',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './admin-layout-page.component.html',
  styleUrl: './admin-layout-page.component.css'
})
export class AdminLayoutPageComponent {

}
