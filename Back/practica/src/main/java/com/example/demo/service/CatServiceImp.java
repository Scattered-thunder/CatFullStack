package com.example.demo.service;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Cat;
import com.example.demo.entity.dto.CatRequest;
import com.example.demo.entity.dto.CatRequestWithImg;
import com.example.demo.exceptions.CatAlreadyExistsException;
import com.example.demo.exceptions.CatNotFoundException;
import com.example.demo.repository.CatRepository;

@Service
public class CatServiceImp implements CatService {

    @Autowired
    private CatRepository catRepository;

    @Override
    public List<Cat> fetchAllCats() {
        List<Cat> cats = catRepository.findAll();
        cats.forEach(cat -> {
            if (cat.getImage() != null) {
                try {
                    byte[] bytes = cat.getImage().getBytes(1, (int) cat.getImage().length());
                    String base64Image = Base64.getEncoder().encodeToString(bytes);
                    cat.setImageBase64(base64Image);
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        });
        return cats;
    }

    @Override
    public Optional<Cat> findCatById(Long id) throws CatNotFoundException {
        Optional<Cat> cat = catRepository.findById(id);
        if (cat.isPresent()) {
            return cat;
        } else {
            throw new CatNotFoundException();
        }
    }

    @Override
    public Cat createCatwithImg(CatRequestWithImg catRequest, Blob catImg) throws CatAlreadyExistsException {
        Optional<Cat> cat = catRepository.findByName(catRequest.getName());
        if (cat.isPresent()) {
            throw new CatAlreadyExistsException();
        } else {
            Cat newCat = new Cat();
            newCat.setName(catRequest.getName());
            newCat.setColor(catRequest.getColor());
            newCat.setAge(catRequest.getAge());
            newCat.setImage(catImg);
            return catRepository.save(newCat);
        }
    }

    @Override
    public void updateCat(Long id, CatRequestWithImg catRequest, Blob catImg) throws CatNotFoundException {
        Optional<Cat> updateCat = catRepository.findById(id);
        if (updateCat.isPresent()) {
            Cat toUpdateCat = updateCat.get();
            toUpdateCat.setName(catRequest.getName());
            toUpdateCat.setColor(catRequest.getColor());
            toUpdateCat.setAge(catRequest.getAge());
            // return toUpdateCat; // Returns cat for further processing
        } else {
            throw new CatNotFoundException();
        }
    }

    @Override
    public void deleteCat(Long id) throws CatNotFoundException {
        Optional<Cat> cat = catRepository.findById(id);
        if (cat.isPresent()) {
            catRepository.deleteById(id);
        } else {
            throw new CatNotFoundException();
        }
    }

}
