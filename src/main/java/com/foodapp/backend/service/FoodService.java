package com.foodapp.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.foodapp.backend.model.Food;
import com.foodapp.backend.repository.FoodRepository;

@Service
public class FoodService {

    @Autowired
    private FoodRepository repo;

    public List<Food> getFoodByRestaurant(int restaurantId){
        return repo.findByRestaurantId(restaurantId);
    }
}