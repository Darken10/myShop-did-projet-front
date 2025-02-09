import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {initFlowbite} from "flowbite";
import {AlertComponent} from "./component/alert/alert/alert.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AlertComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'myShop';
   private router:Router = inject(Router)

  ngOnInit() {
    initFlowbite()
     this.router.events.subscribe(event=>{
       this.initScripts()
     })

  }

  private initScripts() {
    initFlowbite()
  }
}
