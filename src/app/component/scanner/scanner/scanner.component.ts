import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {ZXingScannerComponent, ZXingScannerModule} from '@zxing/ngx-scanner';
import {BarcodeFormat} from '@zxing/browser'

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  standalone: true,
  imports: [
    ZXingScannerModule
  ],
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent {
  scannedProducts: any[] = [];
  barcodeFormat = [BarcodeFormat.QR_CODE,BarcodeFormat.CODABAR,BarcodeFormat.CODE_128]

  constructor(private http: HttpClient) {}

  onCodeScanned(code: string) {
    console.log("Code scanné:", code);

    this.http.get(`http://localhost:8080/api/produits/${code}`)
      .subscribe(response => {
        const product = response;
        this.scannedProducts.push(product);
      }, error => {
        console.log("Produit non trouvé !");
      });
  }

  removeProduct(index: number) {
    this.scannedProducts.splice(index, 1);
  }
}
