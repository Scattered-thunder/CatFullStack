package com.example.demo.entity;

import java.sql.Blob;
import java.util.Base64;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Cat {

    public Cat() {

    }

    public Cat(String name, String color, int age) {
        this.name = name;
        this.color = color;
        this.age = age;
    }

    public void setImage(Blob image) {
        this.image = image;
    }

    public void setImageBase64(String base64Image) {
        this.Base64img = base64Image;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column
    private String name;

    @Column
    private String color;

    @Column
    private int age;

    @JsonIgnore
    @Column
    private Blob image;

    @Column
    private String Base64img;
}
