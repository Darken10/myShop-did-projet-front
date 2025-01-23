package com.did.MyShop.mappers.Commande;

import com.did.MyShop.DTO.commande.CommandeRequest;
import com.did.MyShop.DTO.commande.CommandeResponse;
import com.did.MyShop.entities.Commande.Client;
import com.did.MyShop.entities.Commande.Commande;
import com.did.MyShop.entities.User.User;
import com.did.MyShop.enums.StatusCommandEnum;

public class CommandeMapper {

    public static Commande toCommande (CommandeRequest request) {

        return Commande.builder()
                .client(getClient(request.clientId()))
                .user(new User())
                .status(StatusCommandEnum.NEW)
                .description(request.description())
                .build();

    };

    public static CommandeResponse toCommandeResponse (Commande commande) {
        return new CommandeResponse(
                commande.getId(),
                ClientMapper.toClientResponse(commande.getClient()),
                commande.getDescription(),
                commande.getStatus(),
                commande.getPaiements().stream().map((PaiementMapper::toPaiementResponse)).toList(),
                commande.getCreateAt()
        );
    }


    private static Client getClient(Long clientId) {
        Client client = new Client();
        client.setId(clientId);
        return client;
    }

}
