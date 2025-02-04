import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {initDismisses, initDropdowns, initFlowbite, initModals} from "flowbite";
import { OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID ,inject} from '@angular/core';
import {AlertComponent} from "./component/alert/alert/alert.component";
import {ScannerComponent} from "./component/scanner/scanner/scanner.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AlertComponent,
    ScannerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'myShop';
   private platformId: Object = inject(PLATFORM_ID);
   private router:Router = inject(Router)

  ngOnInit() {
     this.router.events.subscribe(event=>{
       if (event instanceof NavigationEnd){
         setTimeout(()=>{
           this.initScripts()
         },100)
       }
     })
    if (isPlatformBrowser(this.platformId)) {
      // Code dépendant du navigateur (comme Flowbite)
      initFlowbite(); // Appelle la méthode si nécessaire
    }

  }

  private initScripts() {
    initFlowbite()
  }
}
