import {Component, input} from '@angular/core';
import {CommandeStatutEnum, StatusPaiementEnum} from "../../../../models/Enums";

@Component({
  selector: 'app-statut-badge',
  standalone: true,
  imports: [],
  templateUrl: './statut-badge.component.html',
  styleUrl: './statut-badge.component.css'
})
export class StatutBadgeComponent {

    statut  = input<CommandeStatutEnum|StatusPaiementEnum>()
}
