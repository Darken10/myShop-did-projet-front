package com.did.MyShop.entities.Commande;

import com.did.MyShop.entities.Produit.Produit;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Double reduction;
    private Boolean isPercent;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createDate;
    @ManyToMany(mappedBy = "promotions")
    @JsonIgnore
    private Set<Produit> produits;


}
