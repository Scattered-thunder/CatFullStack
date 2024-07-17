package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.exceptions.UserAlreadyExistException;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.repository.UserRepository;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getUsers() {
        return userRepository.findAll();
    };

    public Optional<User> getUserById(Long Id) throws UserNotFoundException {
        Optional<User> result = userRepository.findById(Id);
        if (result.isEmpty()) {
            throw new UserNotFoundException();
        } else {
            return userRepository.findById(Id);
        }
    };

    public Optional<User> getUserByUsername(String username) throws UserNotFoundException {
        List<User> users = userRepository.findByUsername(username);
        if (users.isEmpty()) {
            throw new UserNotFoundException();
        } else {
            return users.stream().findFirst();
        }
    };

    public User createUser(String username, String password) throws UserAlreadyExistException {
        List<User> users = userRepository.findByUsername(username);
        if (users.isEmpty())
            return userRepository.save(new User(username, password));
        throw new UserAlreadyExistException();
    };

    public void deleteUser(Long Id) throws UserNotFoundException {
        Optional<User> user = userRepository.findById(Id);
        if (user.isPresent())
            userRepository.deleteById(Id);
        else {
            throw new UserNotFoundException();
        }
    };

    public void updateUser(Long id, String username, String password) throws UserNotFoundException {
        Optional<User> users = userRepository.findById(id);
        if (users.isEmpty()) {
            throw new UserNotFoundException();
        }
        User user = users.get();
        user.setUsername(username);
        user.setPassword(password);
        userRepository.save(user);
    };

}
