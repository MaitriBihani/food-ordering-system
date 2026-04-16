package com.foodapp.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.foodapp.backend.model.Restaurant;
//import com.foodapp.backend.repository.RestaurantRepository;
import com.foodapp.backend.service.RestaurantService;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {

    @Autowired
private RestaurantService service;

@GetMapping
public List<Restaurant> getAllRestaurants(){
    return service.getAllRestaurants();
}
}