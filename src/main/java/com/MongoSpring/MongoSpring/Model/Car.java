package com.MongoSpring.MongoSpring.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Car")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    private String id;
    private String cabName;
    private String cabModel;
    private String cabRegNumber;
    private String cabOwner;
    private String cabDescription;
    private String cabRate;
    private String cabFuelType;
    private String cabImage;  // Store as Base64 string
}
