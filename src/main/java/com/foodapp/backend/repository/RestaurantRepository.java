package com.foodapp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.foodapp.backend.model.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
}