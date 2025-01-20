package com.did.MyShop.entities.Commande;

import com.did.MyShop.enums.MethodePaiementEnum;
import com.did.MyShop.enums.StatusPaimentEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Paiement {
    @Id
    private Long id;
    @Enumerated(EnumType.STRING)
    private MethodePaiementEnum methode;
    private String reference;
    private Double amount;
    private LocalDateTime date;
    private StatusPaimentEnum status;
}
