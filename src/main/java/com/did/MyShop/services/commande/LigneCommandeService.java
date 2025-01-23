package com.did.MyShop.services.commande;



import com.did.MyShop.DTO.commande.LigneCommandeRequest;
import com.did.MyShop.Exceptions.RessourceNotFoundException;
import com.did.MyShop.entities.Commande.LigneCommande;
import com.did.MyShop.entities.Commande.Promotion;
import com.did.MyShop.mappers.Commande.LigneCommandeMapper;
import com.did.MyShop.repositories.commande.LigneCommandeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.did.MyShop.DTO.commande.LigneCommandeResponse;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LigneCommandeService {

    LigneCommandeRepository ligneCommandeRepository;

    public List<LigneCommandeResponse> findAll(){
        return ligneCommandeRepository.findAll().stream().map(LigneCommandeMapper::toLigneCommandeResponse).collect(Collectors.toList());
    }

    public LigneCommandeResponse findById(Long id){
        return LigneCommandeMapper.toLigneCommandeResponse(getLigneCommande(id));
    }


    public LigneCommandeResponse create(LigneCommandeRequest commandeRequest){
        LigneCommande ligneCommande = LigneCommandeMapper.toLigneCommande(commandeRequest);
        ligneCommandeRepository.save(ligneCommande);
        return LigneCommandeMapper.toLigneCommandeResponse(ligneCommande);
    }

    public LigneCommandeResponse update(Long id,LigneCommandeRequest ligneCommandeRequest){
        LigneCommande ligneCommande = getLigneCommande(id);
        ligneCommande.setId(id);
        ligneCommande.setPrixUnitaire(ligneCommandeRequest.prixUnitaire());
        Promotion promotion = new Promotion();
        promotion.setId(ligneCommandeRequest.promotionId());
        ligneCommande.setPromotion(promotion);
        ligneCommandeRepository.save(ligneCommande);
        return LigneCommandeMapper.toLigneCommandeResponse(ligneCommande);
    }

    public void delete(Long id){
        ligneCommandeRepository.delete(getLigneCommande(id));
    }

    private LigneCommande getLigneCommande(Long id){
        return ligneCommandeRepository.findById(id).orElseThrow(()->new RessourceNotFoundException("Commande n°"+id +" non trouve"));
    }

}
