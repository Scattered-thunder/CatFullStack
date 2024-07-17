package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Cat;

@Repository
public interface CatRepository extends JpaRepository<Cat, Long> {

    @Query("SELECT c FROM Cat c WHERE c.name = ?1")
    Optional<Cat> findByName(String name);

}
