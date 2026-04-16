package com.foodapp.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.foodapp.backend.model.Food;
//import com.foodapp.backend.repository.FoodRepository;
import com.foodapp.backend.service.FoodService;

@RestController
@RequestMapping("/food")
public class FoodController {

    @Autowired
private FoodService service;    

    @GetMapping("/{restaurantId}")
public List<Food> getFoodByRestaurant(@PathVariable int restaurantId){
    return service.getFoodByRestaurant(restaurantId);
}
}