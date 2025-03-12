package com.MongoSpring.MongoSpring.Controller;

import com.MongoSpring.MongoSpring.Model.User;
import com.MongoSpring.MongoSpring.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserRepo userRepo;

    // Register User
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        Optional<User> existingUser = userRepo.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return new ResponseEntity<>("Username already exists!", HttpStatus.BAD_REQUEST);
        }

        if (user.getUserType() == null || user.getUserType().isEmpty()) {
            user.setUserType("0"); // Default userType to "1" (Regular User)
        }

        userRepo.save(user);
        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }

    // Login User
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User user) {
        Optional<User> existingUser = userRepo.findByUsername(user.getUsername());
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful!");
            response.put("userType", existingUser.get().getUserType()); // Send userType
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>(Map.of("message", "Invalid username or password!"), HttpStatus.UNAUTHORIZED);
    }

}
