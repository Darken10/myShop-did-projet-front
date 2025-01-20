package com.did.MyShop.entities.User;

import com.did.MyShop.enums.GenreUserEnum;
import com.did.MyShop.enums.StatusUserEnum;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private GenreUserEnum genre;
    private String email;
    private String dateNaissance;
    private String phoneNumber;
    private String matricule;
    private String password;

    @Enumerated(EnumType.STRING)
    private StatusUserEnum status;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles;

}
