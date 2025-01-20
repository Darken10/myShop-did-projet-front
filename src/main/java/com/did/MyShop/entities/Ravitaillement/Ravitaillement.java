package com.did.MyShop.entities.Ravitaillement;

import com.did.MyShop.enums.StatusRavitaillement;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Ravitaillement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime createDate;
    private LocalDateTime deliveredDate;
    private StatusRavitaillement  status;

}
