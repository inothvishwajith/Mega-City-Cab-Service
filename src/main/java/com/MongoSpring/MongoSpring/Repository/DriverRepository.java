package com.MongoSpring.MongoSpring.Repository;

import com.MongoSpring.MongoSpring.Model.Driver;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DriverRepository extends MongoRepository<Driver, String> {
}
