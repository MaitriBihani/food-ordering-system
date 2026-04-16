package com.foodapp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.foodapp.backend.model.Food;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Integer> {

    List<Food> findByRestaurantId(int restaurantId);
}