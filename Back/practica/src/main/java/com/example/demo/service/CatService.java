package com.example.demo.service;

import java.sql.Blob;
import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Cat;
import com.example.demo.entity.dto.CatRequest;
import com.example.demo.entity.dto.CatRequestWithImg;
import com.example.demo.exceptions.CatAlreadyExistsException;
import com.example.demo.exceptions.CatNotFoundException;

public interface CatService {

    public List<Cat> fetchAllCats();

    public Optional<Cat> findCatById(Long id) throws CatNotFoundException;

    public Cat createCatwithImg(CatRequestWithImg catRequest, Blob catImage) throws CatAlreadyExistsException;

    public void updateCat(Long id, CatRequestWithImg catRequest, Blob catImage) throws CatNotFoundException;

    public void deleteCat(Long id) throws CatNotFoundException;

}

// public Cat createCat(CatRequestWithImg catRequest) throws
// CatAlreadyExistsException;
