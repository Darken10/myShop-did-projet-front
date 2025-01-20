package com.did.MyShop.entities.Commande;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LigneCommande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double prixUnitaire;
    private Double quantity;
    @ManyToOne
    @JoinColumn(name = "commande_id")
    private Commande commande;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;

}
