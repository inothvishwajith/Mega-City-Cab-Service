package com.MongoSpring.MongoSpring.Controller;

import com.MongoSpring.MongoSpring.Model.Admin;
import com.MongoSpring.MongoSpring.Repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class AdminController {

    private final AdminRepo adminRepo;

    @Autowired
    public AdminController(AdminRepo adminRepo) {
        this.adminRepo = adminRepo;
    }

    // Register Admin
    @PostMapping("/administer")
    public ResponseEntity<String> registerAdmin(@RequestBody Admin admin) {
        Optional<Admin> existingAdmin = adminRepo.findByUsername(admin.getUsername());
        if (existingAdmin.isPresent()) {
            return new ResponseEntity<>("Username already exists!", HttpStatus.BAD_REQUEST);
        }

        // Ensure admin registration has userType = "2"
        admin.setUserType("1"); // 2 means Admin

        adminRepo.save(admin);
        return new ResponseEntity<>("Admin registered successfully!", HttpStatus.CREATED);
    }
}
