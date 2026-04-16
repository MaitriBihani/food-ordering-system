package com.foodapp.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.foodapp.backend.model.Restaurant;
import com.foodapp.backend.repository.RestaurantRepository;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository repo;

    public List<Restaurant> getAllRestaurants(){
        return repo.findAll();
    }
}