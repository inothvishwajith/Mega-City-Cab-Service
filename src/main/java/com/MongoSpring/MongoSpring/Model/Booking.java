package com.MongoSpring.MongoSpring.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Booking")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    private String id;
    private String name;
    private String phone;
    private String idNumber;
    private String destination;
    private double distance;
    private double totalPrice;
    private String cabId;
    private String cabName;
    private boolean confirmed; // Added confirmation status
}
