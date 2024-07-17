package com.example.demo.controller;

import java.net.URI;
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

import com.example.demo.entity.User;
import com.example.demo.entity.dto.UserRequest;
import com.example.demo.exceptions.UserAlreadyExistException;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired

    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @GetMapping("/{Id}")
    public ResponseEntity<User> getUserById(@PathVariable Long Id) throws UserNotFoundException {
        Optional<User> result = userService.getUserById(Id);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            throw new UserNotFoundException();
        }
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) throws UserNotFoundException {
        Optional<User> result = userService.getUserByUsername(username);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            throw new UserNotFoundException();
        }
    }

    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody UserRequest userRequest) throws UserAlreadyExistException {
        User result = userService.createUser(userRequest.getUsername(), userRequest.getPassword());
        return ResponseEntity.created(URI.create("/users" + result.getId())).body(result);
    }

    @DeleteMapping("/{Id}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long Id) throws UserNotFoundException {
        userService.deleteUser(Id);
        return ResponseEntity.noContent().build();
    };

    @PutMapping("/{Id}")
    public ResponseEntity<Object> updateUser(@PathVariable Long Id, @RequestBody UserRequest userRequest)
            throws UserNotFoundException {
        userService.updateUser(Id, userRequest.getUsername(), userRequest.getPassword());
        return ResponseEntity.noContent().build();
    };

}
