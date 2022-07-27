package com.nodejs.test.nodejs.repositories;

import java.util.List;

import com.nodejs.test.nodejs.models.Producto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
    public List<Producto> findByTitle(String criteria);
}
