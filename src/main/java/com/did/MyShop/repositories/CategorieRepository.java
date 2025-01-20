package com.did.MyShop.repositories;

import com.did.MyShop.entities.Produit.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategorieRepository extends JpaRepository<Category,Long> {
}
