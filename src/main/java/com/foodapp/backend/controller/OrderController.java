package com.foodapp.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.foodapp.backend.dto.OrderRequest;
import com.foodapp.backend.model.Orders;
import com.foodapp.backend.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {

    @GetMapping("/user/{userId}")
public List<Orders> getUserOrders(@PathVariable int userId){
    return service.getOrdersByUser(userId);
}

    @Autowired
    private OrderService service;

    @PostMapping
    public Orders placeOrder(@RequestBody OrderRequest request){
        return service.placeOrder(request);
    }
}