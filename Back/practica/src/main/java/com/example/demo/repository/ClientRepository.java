package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    @Query(value = "select c from Client c where LOWER(c.Mail) = LOWER(?1)")
    List<Client> findByMail(String Mail);

}
