import {Component, inject} from '@angular/core';
import {ScannerComponent} from "../../../component/scanner/scanner/scanner.component";

@Component({
  selector: 'app-admin-dashbord-page',
  standalone: true,
  imports: [
    ScannerComponent
  ],
  templateUrl: './admin-dashbord-page.component.html',
  styleUrl: './admin-dashbord-page.component.css'
})
export class AdminDashbordPageComponent {

}
