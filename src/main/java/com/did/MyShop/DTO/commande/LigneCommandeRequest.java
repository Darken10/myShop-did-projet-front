package com.did.MyShop.DTO.commande;


public record LigneCommandeRequest(
         Double prixUnitaire,
         Double quantity,
         Long commandeId,
         Long promotionId
) {
}
