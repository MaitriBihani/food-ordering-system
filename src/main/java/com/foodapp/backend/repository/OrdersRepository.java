package com.foodapp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.foodapp.backend.model.Orders;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
    List<Orders> findByUserId(int userId);
}