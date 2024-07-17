package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.User;
import com.example.demo.exceptions.UserAlreadyExistException;
import com.example.demo.exceptions.UserNotFoundException;

public interface UserService {

    public List<User> getUsers();

    public Optional<User> getUserById(Long Id) throws UserNotFoundException;

    public Optional<User> getUserByUsername(String username) throws UserNotFoundException;

    public User createUser(String username, String password) throws UserAlreadyExistException;

    public void deleteUser(Long Id) throws UserNotFoundException;

    public void updateUser(Long Id, String name, String surname) throws UserNotFoundException;

}
