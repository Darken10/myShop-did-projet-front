import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {initFlowbite} from "flowbite";
import { OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID ,inject} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {ApiModule} from "./services/api.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'myShop';
   private platformId: Object = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Code dépendant du navigateur (comme Flowbite)
      initFlowbite(); // Appelle la méthode si nécessaire
    }
  }
}
