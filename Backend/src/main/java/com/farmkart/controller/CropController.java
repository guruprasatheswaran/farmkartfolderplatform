package com.farmkart.controller;
 import com.farmkart.entity.Crop; 
 import com.farmkart.service.CropService; 
 import java.util.List; 
 import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/crops")
public class CropController {

    private final CropService service;

    public CropController(CropService service) {
        this.service = service;
    }

    @GetMapping
    public List<Crop> all(
            @RequestParam(required = false) String category) {

        return service.all(category);
    }

    @GetMapping("/{id}")
    public Crop one(
            @PathVariable Long id) {

        return service.one(id);
    }
}