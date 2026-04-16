package com.foodapp.backend.dto;

import java.util.List;

public class OrderRequest {

    private int userId;
    private List<Item> items;

    // GETTERS & SETTERS (Outer class)

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    // INNER CLASS

    public static class Item {

        private int foodId;
        private int quantity;
        private double price;

        // GETTERS & SETTERS

        public int getFoodId() {
            return foodId;
        }

        public void setFoodId(int foodId) {
            this.foodId = foodId;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }
    }
}