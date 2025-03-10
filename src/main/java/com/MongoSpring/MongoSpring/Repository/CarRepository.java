package com.MongoSpring.MongoSpring.Repository;

import com.MongoSpring.MongoSpring.Model.Car;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends MongoRepository<Car, String> {
}
