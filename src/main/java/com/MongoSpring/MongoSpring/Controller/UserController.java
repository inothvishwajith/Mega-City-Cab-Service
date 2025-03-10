package com.MongoSpring.MongoSpring.Controller;

import com.MongoSpring.MongoSpring.Model.User;
import com.MongoSpring.MongoSpring.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.Optional;

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
        userRepo.save(user);
        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }

    // Login User
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        Optional<User> existingUser = userRepo.findByUsername(user.getUsername());
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            return new ResponseEntity<>("Login successful!", HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid username or password!", HttpStatus.UNAUTHORIZED);
    }
}
