package com.did.MyShop.entities.Produit;

import com.did.MyShop.entities.Commande.Promotion;
import jakarta.persistence.*;
import lombok.*;

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
    private Set<Tag> tags;
    @ManyToMany
    private Set<Promotion> promotions;
}
