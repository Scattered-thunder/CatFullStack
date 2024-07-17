package com.example.demo.controller;

import java.net.URI;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Cat;
import com.example.demo.entity.dto.CatRequest;
import com.example.demo.entity.dto.CatRequestWithImg;
import com.example.demo.exceptions.CatAlreadyExistsException;
import com.example.demo.exceptions.CatNotFoundException;
import com.example.demo.service.CatService;

@RestController
@RequestMapping("cats")
public class CatController {

    @Autowired
    CatService catService;

    @GetMapping
    public ResponseEntity<List<Cat>> fetchAllCats() {
        List<Cat> result = catService.fetchAllCats();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cat> findCatById(@PathVariable Long id) throws CatNotFoundException {
        Optional<Cat> result = catService.findCatById(id);
        if (result.isPresent()) {
            Cat cat = result.get();
            if (cat.getImage() != null) {
                try {
                    byte[] bytes = cat.getImage().getBytes(1, (int) cat.getImage().length());
                    String base64Image = Base64.getEncoder().encodeToString(bytes);
                    cat.setImageBase64(base64Image);
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            return ResponseEntity.ok(cat);
        } else {
            throw new CatNotFoundException();
        }
    }

    @PostMapping
    public ResponseEntity<Cat> createCatwithImg(@RequestBody CatRequestWithImg catRequest)
            throws CatAlreadyExistsException {
        Blob img = null;
        if (catRequest.getImg() != null) {
            String base64Image = catRequest.getImg().split(",")[1]; // removes the first part of the string
            try {
                byte[] imgBytes = Base64.getDecoder().decode(base64Image);
                img = new javax.sql.rowset.serial.SerialBlob(imgBytes);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        Cat result = catService.createCatwithImg(catRequest, img);
        return ResponseEntity.created(URI.create("/cats/" + result.getId())).body(result);
    }

    @PutMapping("/{id}")
    public void updateCat(@PathVariable Long id, @RequestBody CatRequestWithImg catRequest)
            throws CatNotFoundException {
        Blob img = null;
        if (catRequest.getImg() != null) {
            byte[] imgBytes = Base64.getDecoder().decode(catRequest.getImg());
            try {
                img = new javax.sql.rowset.serial.SerialBlob(imgBytes);
            } catch (Exception e) {
                e.printStackTrace();
            }
            catService.updateCat(id, catRequest, img);
            // return ResponseEntity.ok(result);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteCat(@PathVariable Long id) throws CatNotFoundException {
        catService.deleteCat(id);
    }

}

/*
 * @PostMapping
 * public ResponseEntity<Cat> createCat(@RequestBody CatRequest catRequest)
 * throws CatAlreadyExistsException {
 * Cat result = catService.createCat(catRequest);
 * return ResponseEntity.created(URI.create("/cats/" +
 * result.getId())).body(result);
 * }
 * 
 */

/*
 *
 * @PutMapping("/{id}")
 * public ResponseEntity<Cat> updateCat(@PathVariable Long id, @RequestBody
 * CatRequest catRequest)
 * throws CatNotFoundException {
 * Cat result = catService.updateCat(id, catRequest);
 * return ResponseEntity.ok(result);
 * }
 * 
 */