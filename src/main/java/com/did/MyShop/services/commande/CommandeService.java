package com.did.MyShop.services.commande;


import com.did.MyShop.DTO.commande.CommandeRequest;
import com.did.MyShop.DTO.commande.CommandeResponse;
import com.did.MyShop.Exceptions.RessourceNotFoundException;
import com.did.MyShop.entities.Commande.Commande;
import com.did.MyShop.mappers.Commande.CommandeMapper;
import com.did.MyShop.repositories.commande.CommandeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CommandeService {

    CommandeRepository commandeRepository;

    public List<CommandeResponse> findAll(){
        return commandeRepository.findAll().stream().map(CommandeMapper::toCommandeResponse).collect(Collectors.toList());
    }

    public CommandeResponse findById(Long id){
        return CommandeMapper.toCommandeResponse(getCommande(id));
    }


    public CommandeResponse create(CommandeRequest commandeRequest){
        Commande commande = CommandeMapper.toCommande(commandeRequest);
        commandeRepository.save(commande);
        return CommandeMapper.toCommandeResponse(commande);
    }

    public CommandeResponse update(Long id,CommandeRequest commandeRequest){
        Commande commande = getCommande(id);
        commande.setId(id);
        commande.setDescription(commandeRequest.description());
        commande.setStatus(commandeRequest.status());
        commandeRepository.save(commande);
        return CommandeMapper.toCommandeResponse(commande);
    }

    public void delete(Long id){
        commandeRepository.delete(getCommande(id));
    }

    private Commande getCommande(Long id){
        return commandeRepository.findById(id).orElseThrow(()->new RessourceNotFoundException("Commande n°"+id +" non trouve"));
    }


}
