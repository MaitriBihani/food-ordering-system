# food-ordering-system
Full stack food ordering system project (learning purpose)


# 🍔 Food Ordering System – Full Project Documentation

## 1. 📌 Project Overview

The Food Ordering System is a full-stack web application that allows users to:

* Browse restaurants
* View food items
* Add items to cart
* Place orders
* View order history
* Manage profile
* Enhance user experience by allowing users to:
Search food items by name
Filter items based on price or category

The system is built using **Spring Boot (backend)** and **HTML, CSS, JavaScript (frontend)**.

---

## 2. 🛠️ Tech Stack

### 🔹 Backend

* Java
* Spring Boot
* Spring Web (REST APIs)
* Spring Data JPA
* Hibernate
* Maven

### 🔹 Frontend

* HTML
* CSS
* JavaScript (Vanilla JS)

### 🔹 Database

* (Likely) H2 / MySQL (based on configuration)

---

## 3. 📂 Project Structure

### Backend Structure

* `controller/` → Handles API requests

  * FoodController
  * RestaurantController
  * OrderController
  * UserController

* `service/` → Business logic

  * FoodService
  * RestaurantService
  * UserService

* `repository/` → Database interaction

  * FoodRepository
  * OrderRepository
  * UserRepository

* `model/` → Entity classes

  * Food
  * Restaurant
  * Order
  * OrderItem
  * User

* `resources/static/` → Frontend files

  * index.html
  * profile.html
  * help.html
  * order-history.html
  * JS & CSS files

---

## 4. 👤 User Functionalities

### 1. 🔐 Authentication

* User can login
* Basic validation for email/password

---

### 2. 🍽️ View Restaurants

* Displays list of restaurants
* Each restaurant has:

  * Name
  * Type (Fast Food, etc.)

---

### 3. 🍔 View Food Items

* Shows food items of selected restaurant
* Each item includes:

  * Name
  * Price
  * Add button

---

### 4. 🛒 Cart Management

* Add items to cart
* Increase/decrease quantity
* Remove item
* View total

---

### 5. 📦 Place Order

* User can place order from cart
* Order stored in backend

---

### 6. 📜 Order History

* Displays previous orders
* Shows items + total

---

### 7. 👤 Profile Page

* Displays user information
* Can be extended to edit profile

---

### 8. ❓ Help Page

* Provides instructions:

  * Select restaurant → Add items → Place order

---

### 9. 🍔 Navbar Features

* Logout button
* Hamburger menu

  * Profile
  * History
  * Help

---

## 5. 🔄 API Flow (Backend → Frontend)

1. Frontend sends request using `fetch()`
2. Backend controller receives request
3. Service layer processes logic
4. Repository interacts with database
5. Response sent back to frontend

---

## 6. ⚙️ Key Functional Logic

### Cart Logic

* Items stored in JS array
* Quantity updated dynamically
* Total calculated in real-time

---

### Order Logic

* Cart data sent to backend
* Backend creates Order + OrderItems
* Stored in database

---

### Navigation Logic

* JavaScript redirects pages:

```javascript
window.location.href = "profile.html";
```

---

## 7. ✅ Validations

### Frontend Validations

* Empty input check
* Required fields
* Button actions only when valid

### Backend Validations

* Data integrity (via JPA)
* Proper entity relationships

---

## 8. ⚠️ Constraints

* User must login before ordering
* Cart must not be empty to place order
* Valid restaurant must be selected
* Backend must be running for API calls

---

## 9. 🎨 UI Features

* Card-based layout for restaurants & food
* Responsive design using flexbox
* Red-themed navbar
* Dropdown menu (hamburger)

---

## 10. 🔐 Security (Basic)

* No advanced authentication (JWT not implemented)
* Can be extended in future

---

## 11. 🚀 Possible Improvements

* Add JWT authentication
* Payment integration
* Admin panel
* Responsive mobile UI


---

## 12. 🧠 Summary

This project demonstrates:

* Full-stack development
* REST API integration
* Frontend-backend communication
* Real-world application logic (cart, orders)

---

## 13. 📌 Conclusion

The Food Ordering System is a beginner-to-intermediate level full-stack project that covers:

* CRUD operations
* UI/UX basics
* Backend architecture
* Real-time interaction between frontend and backend

---

✔ Suitable for:

* Learning full-stack development
* Understanding system design basics

