package com.foodapp.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodapp.backend.model.User;
import com.foodapp.backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    public User signup(User user){
        return repo.save(user);
    }

    public User login(String email, String password){

        User user = repo.findByEmail(email);

        if(user == null){
            throw new RuntimeException("User not found");
        }

        if(!user.getPassword().equals(password)){
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}