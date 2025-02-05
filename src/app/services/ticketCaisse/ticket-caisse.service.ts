import { Injectable } from '@angular/core';
import autoTable from "jspdf-autotable";
import QRCode from 'qrcode-generator';
import jsPDF from "jspdf";
import {ICommande, ILigneCommande} from "../../../models/Interfaces";


@Injectable({
  providedIn: 'root'
})
export class TicketCaisseService {

  private qrUrlBase = "https://localhost:4200/ticket"
  constructor() { }

  async generateAndPrintTicket(commande:ICommande) {
    // Taille du ticket : 80mm de large, hauteur ajustable
    const pageWidth = 80;
    let pageHeight = 180; // Ajustable selon le contenu

    const doc = new jsPDF({
      unit: 'mm',
      format: [pageWidth, pageHeight]
    });

    let y = 10;

    // Titre et informations du magasin
    doc.setFontSize(12);
    doc.text('Mon Magasin', pageWidth / 2, y, { align: 'center' });
    y += 5;
    doc.setFontSize(8);
    doc.text('123 Rue Commerce, Ville', pageWidth / 2, y, { align: 'center' });
    y += 4;
    doc.text('Téléphone: +226 12 34 56 78', pageWidth / 2, y, { align: 'center' });
    y += 6;
    doc.text('--------------------------------', pageWidth / 2, y, { align: 'center' });

    y += 5;
    doc.text(`Date: ${commande.createAt}`, 10, y);
    y += 4;
    doc.text(`Caisse: ${commande.user.firstName} ${commande.user.lastName}`, 10, y);
    y += 4;
    doc.text(`Ticket N°: ${commande.id.toString().padStart(6,"0")}`, 10, y);

    y += 6;
    doc.text('--------------------------------', pageWidth / 2, y, { align: 'center' });
    y += 5;

    // Informations du client
    doc.setFontSize(9);
    doc.text('Client:', 10, y);
    y += 4;
    doc.text(`Nom: ${commande.client.name}`, 10, y);
    y += 4;
    doc.text(`Téléphone: ${commande.client.phone}`, 10, y);
    y += 6;
    doc.text('--------------------------------', pageWidth / 2, y, { align: 'center' });
    y += 5;

    // Description de la commande
    doc.setFontSize(9);
    doc.text('Commande:', 10, y);
    y += 4;

    autoTable(doc, {
      startY: y,
      head: [['Désignation', 'Qté',  'Total']],
      body: commande.ligneCommandes.map((item: ILigneCommande) => [
        item.produit.libelle, item.quantity,  `${this.getTotalPriceByProduct(item)} FCFA`
      ]),
      theme: 'plain',
      styles: { fontSize: 8, cellPadding: 1 },
      headStyles: { fontSize: 8, fontStyle: 'bold' }
    });

    let finalY = (doc as any).lastAutoTable.finalY + 5;
    if (finalY > pageHeight) {
      pageHeight = finalY + 40;
      doc.internal.pageSize.height = pageHeight;
    }

    // Totaux et mode de paiement
    doc.text(`Total: ${this.getGobaleTotalPrice(commande.ligneCommandes)} FCFA`, 10, finalY);
    finalY += 5;
    commande.paiements.forEach((paye)=>{
      doc.text(`Mode de paiement: ${paye.methode}`, 10, finalY);
      finalY += 5;
      doc.text(`Montant: ${paye.amount}`, 10, finalY);
      finalY += 5;
      doc.text(`===============================`, 10, finalY);
      finalY += 5;
    })
    doc.text('Merci pour votre confiance !', pageWidth / 2, finalY, { align: 'center' });

    finalY += 10;

    // Génération du QR Code
    const qr = QRCode(4, 'L');
    qr.addData(`${this.qrUrlBase}/${commande.id}`);
    qr.make();

    const qrSize = 40;
    const qrBase64 = qr.createDataURL(4);

    doc.addImage(qrBase64, 'PNG', (pageWidth - qrSize) / 2, finalY, qrSize, qrSize);

    // Impression
    doc.autoPrint();
    const pdfUrl = doc.output('bloburl');
    window.open(pdfUrl, '_blank');
    console.log("commande",commande)
  }

  async generateAndPrintTicket2(ticketData: any) {
    const pageWidth = 80;
    let pageHeight = 180;

    const doc = new jsPDF({
      unit: 'mm',
      format: [pageWidth, pageHeight]
    });

    let y = 10;

    // ✅ Utilisation de la police monospace pour tickets de caisse
    doc.setFont('courier', 'bold');
    doc.setFontSize(12);
    doc.text('Mon Magasin', pageWidth / 2, y, { align: 'center' });
    y += 5;
    doc.setFontSize(9);
    doc.setFont('courier', 'normal');
    doc.text('123 Rue Commerce, Ville', pageWidth / 2, y, { align: 'center' });
    y += 4;
    doc.text('Tel: +226 12 34 56 78', pageWidth / 2, y, { align: 'center' });
    y += 6;
    doc.text('----------------------------', pageWidth / 2, y, { align: 'center' });

    y += 5;
    doc.text(`Date: ${ticketData.date}`, 10, y);
    y += 4;
    doc.text(`Caisse: ${ticketData.caisse}`, 10, y);
    y += 4;
    doc.text(`Ticket N°: ${ticketData.ticketNumber}`, 10, y);

    y += 6;
    doc.text('----------------------------', pageWidth / 2, y, { align: 'center' });
    y += 5;

    // ✅ Infos Client
    doc.setFont('courier', 'bold');
    doc.text('Client:', 10, y);
    y += 4;
    doc.setFont('courier', 'normal');
    doc.text(`Nom: ${ticketData.client.name}`, 10, y);
    y += 4;
    doc.text(`Téléphone: ${ticketData.client.phone}`, 10, y);
    y += 6;
    doc.text('----------------------------', pageWidth / 2, y, { align: 'center' });
    y += 5;

    // ✅ Détails de la commande
    doc.setFont('courier', 'bold');
    doc.text('Commande:', 10, y);
    y += 4;

    autoTable(doc, {
      startY: y,
      head: [['Désignation', 'Qté', 'P.U', 'Total']],
      body: ticketData.items.map((item: any) => [
        item.name, item.quantity, `${item.price} FCFA`, `${item.total} FCFA`
      ]),
      theme: 'plain',
      styles: { font: 'courier', fontSize: 9, cellPadding: 1 },
      headStyles: { fontStyle: 'bold' }
    });

    let finalY = (doc as any).lastAutoTable.finalY + 5;
    if (finalY > pageHeight) {
      pageHeight = finalY + 40;
      doc.internal.pageSize.height = pageHeight;
    }

    // ✅ Totaux et mode de paiement
    doc.setFont('courier', 'bold');
    doc.text(`Total: ${ticketData.total} FCFA`, 10, finalY);
    finalY += 5;
    doc.text(`Mode de paiement: ${ticketData.paymentMethod}`, 10, finalY);
    finalY += 5;
    doc.text('Merci pour votre visite !', pageWidth / 2, finalY, { align: 'center' });

    finalY += 10;

    // ✅ Génération du QR Code
    const qr = QRCode(4, 'L');
    qr.addData(ticketData.qrCodeData);
    qr.make();

    const qrSize = 40;
    const qrBase64 = qr.createDataURL(4);

    doc.addImage(qrBase64, 'PNG', (pageWidth - qrSize) / 2, finalY, qrSize, qrSize);

    // ✅ Impression directe
    doc.autoPrint();
    const pdfUrl = doc.output('bloburl');
    window.open(pdfUrl, '_blank');
  }


  getTotalPriceByProduct(ligne: ILigneCommande) {
    if (ligne.promotion){
      if (ligne.promotion.isPercent ){
        return  (ligne.prixUnitaire + ligne.prixUnitaire * ligne.promotion.reduction/100)*ligne.quantity
      } else {
        return ligne.quantity * ligne.promotion.reduction
      }
    }
    return ligne.quantity * ligne.prixUnitaire

  }

  getGobaleTotalPrice(lignes: ILigneCommande[]){
    let somme = 0
    lignes.forEach((ligne)=>{
      somme =  somme + this.getTotalPriceByProduct(ligne)
    })
    return somme
  }

}
