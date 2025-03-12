package com.MongoSpring.MongoSpring.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {

        @Id
        private String id;
        private String username;
        private String email;
        private String password;
        private String userType; // New field for user type
    }

