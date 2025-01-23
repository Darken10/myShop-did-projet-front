package com.did.MyShop.DTO.commande;


public record LigneCommandeResponse(
        Long id,
         Double prixUnitaire,
         Double quantity
) {
}
