package com.did.MyShop.entities.Produit;

import com.did.MyShop.entities.Commande.Promotion;
import com.did.MyShop.entities.Ravitaillement.LigneRavitaillement;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String libelle;
    private double prix;
    private int stock;
    private String description;
    private String image;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToMany
    @JoinTable(
            name = "produit_tag",
            joinColumns = @JoinColumn(name = "produit_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags;
    @ManyToMany
    @JoinTable(
            name = "produit_promotion",
            joinColumns = @JoinColumn(name = "produit_id"),
            inverseJoinColumns = @JoinColumn(name = "promotion_id")
    )
    private Set<Promotion> promotions;
    @OneToMany(mappedBy = "produit")
    private List<LigneRavitaillement> ligneRavitaillements;
}
