package com.MongoSpring.MongoSpring.Controller;

import com.MongoSpring.MongoSpring.Model.Driver;
import com.MongoSpring.MongoSpring.Repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    @Autowired
    private DriverRepository driverRepository;


    @GetMapping
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    // Add a new driver
    @PostMapping
    public Driver addDriver(@RequestBody Driver driver) {
        return driverRepository.save(driver);
    }


    @PutMapping("/{id}")
    public Driver updateDriver(@PathVariable String id, @RequestBody Driver updatedDriver) {
        Optional<Driver> existingDriver = driverRepository.findById(id);
        if (existingDriver.isPresent()) {
            Driver driver = existingDriver.get();
            driver.setName(updatedDriver.getName());
            driver.setLicense(updatedDriver.getLicense());
            driver.setIdNumber(updatedDriver.getIdNumber());
            driver.setAddress(updatedDriver.getAddress());
            return driverRepository.save(driver);
        }
        return null; // Handle not found case properly
    }


    @DeleteMapping("/{id}")
    public void deleteDriver(@PathVariable String id) {
        driverRepository.deleteById(id);
    }
}
