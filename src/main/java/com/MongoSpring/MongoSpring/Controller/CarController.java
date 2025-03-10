package com.MongoSpring.MongoSpring.Controller;

import com.MongoSpring.MongoSpring.Model.Car;
import com.MongoSpring.MongoSpring.Repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend to access backend
@RestController
@RequestMapping("/api/cabs")
public class CarController {
    @Autowired
    private CarRepository carRepository;

    // Get all cabs
    @GetMapping
    public List<Car> getAllCabs() {
        return carRepository.findAll();
    }

    // Add a new cab
    @PostMapping
    public Car addCab(@RequestBody Car cab) {
        return carRepository.save(cab);
    }

    // Get a cab by ID
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCabById(@PathVariable String id) {
        Optional<Car> cab = carRepository.findById(id);
        return cab.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update an existing cab
    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCab(@PathVariable String id, @RequestBody Car updatedCab) {
        Optional<Car> existingCab = carRepository.findById(id);
        if (existingCab.isPresent()) {
            Car cab = existingCab.get();
            cab.setCabName(updatedCab.getCabName());
            cab.setCabModel(updatedCab.getCabModel());
            cab.setCabRegNumber(updatedCab.getCabRegNumber());
            cab.setCabOwner(updatedCab.getCabOwner());
            cab.setCabDescription(updatedCab.getCabDescription());
            cab.setCabRate(updatedCab.getCabRate());
            cab.setCabFuelType(updatedCab.getCabFuelType());
            cab.setCabImage(updatedCab.getCabImage());
            return ResponseEntity.ok(carRepository.save(cab));
        }
        return ResponseEntity.notFound().build();
    }

    // Delete a cab
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCab(@PathVariable String id) {
        if (carRepository.existsById(id)) {
            carRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
