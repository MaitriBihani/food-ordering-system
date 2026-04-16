package com.foodapp.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import java.time.LocalDateTime;
import java.util.ArrayList;

import com.foodapp.backend.model.*;
import com.foodapp.backend.repository.*;
import com.foodapp.backend.dto.OrderRequest;

@Service
public class OrderService {

    @Autowired
    private OrdersRepository orderRepo;

    @Autowired
    private OrderItemRepository orderItemRepo;

    @Autowired
    private FoodRepository foodRepo;

   public Orders placeOrder(OrderRequest request) {

    Orders order = new Orders();
    order.setUserId(request.getUserId());
    order.setStatus("PLACED");
    order.setCreatedAt(LocalDateTime.now());

    double total = 0;

    Orders savedOrder = orderRepo.save(order);

    List<OrderItem> orderItems = new ArrayList<>();

    for (OrderRequest.Item item : request.getItems()) {

        Food food = foodRepo.findById(item.getFoodId()).get();

        OrderItem orderItem = new OrderItem();
        orderItem.setOrder(savedOrder);
        orderItem.setFood(food);
        orderItem.setQuantity(item.getQuantity());
        orderItem.setPrice(item.getPrice());

        total += item.getPrice() * item.getQuantity();

        orderItemRepo.save(orderItem);

        orderItems.add(orderItem);   
    }

    savedOrder.setItems(orderItems);  
    savedOrder.setTotalAmount(total);

    return orderRepo.save(savedOrder);
}
 public List<Orders> getOrdersByUser(int userId){
        return orderRepo.findByUserId(userId);
    }
}
