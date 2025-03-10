package com.MongoSpring.MongoSpring.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Driver")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Driver {
    @Id
    private String id;
    private String name;
    private String license;
    private String idNumber;
    private String address;
}
