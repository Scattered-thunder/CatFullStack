package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity

public class Client {

    public Client() {

    }

    public Client(String name, String surname, String country, String mail) {

        this.Name = name;
        this.Surname = surname;
        this.Country = country;
        this.Mail = mail;

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String Name;
    @Column
    private String Surname;
    @Column
    private String Country;
    @Column
    private String Mail;

}
