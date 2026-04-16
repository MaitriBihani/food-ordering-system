package com.foodapp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.foodapp.backend.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);
}