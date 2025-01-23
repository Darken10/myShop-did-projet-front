package com.did.MyShop.mappers.Commande;


import com.did.MyShop.DTO.commande.CommandeRequest;
import com.did.MyShop.DTO.commande.LigneCommandeRequest;
import com.did.MyShop.DTO.commande.LigneCommandeResponse;
import com.did.MyShop.entities.Commande.Commande;
import com.did.MyShop.entities.Commande.LigneCommande;
import com.did.MyShop.entities.Commande.Promotion;

public class LigneCommandeMapper {

    public static LigneCommande toLigneCommande (LigneCommandeRequest request) {

        return LigneCommande.builder()
                .commande(getCommande(request.commandeId()))
                .prixUnitaire(request.prixUnitaire())
                .quantity(request.quantity())
                .promotion(getPromotion(request.promotionId()))
                .build();

    };

    public static LigneCommandeResponse toLigneCommandeResponse (LigneCommande ligneCommande) {
        return new LigneCommandeResponse(
                ligneCommande.getId(),
                ligneCommande.getPrixUnitaire(),
                ligneCommande.getQuantity()
        );
    }

    private static Commande getCommande(Long commandeId) {
        Commande commande = new Commande();
        commande.setId(commandeId);
        return commande;
    }

    private static Promotion getPromotion (Long promotionId) {
        Promotion promotion = new Promotion();
        promotion.setId(promotionId);
        return promotion;
    }
}
