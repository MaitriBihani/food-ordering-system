package com.foodapp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.foodapp.backend.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
}