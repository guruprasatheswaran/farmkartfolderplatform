package com.farmkart.service;

import com.farmkart.entity.Crop;
import com.farmkart.exception.NotFoundException;
import com.farmkart.repository.CropRepository;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CropService {

    private final CropRepository crops;
 public CropService(CropRepository crops) {
        this.crops = crops;
    }

   
    public List<Crop> all(String category) {

        return category == null || category.isBlank()
                ? crops.findAll()
                : crops.findByCategoryIgnoreCase(category);
    }

    public Crop one(Long id) {

        return crops.findById(id)
                .orElseThrow(() ->
                        new NotFoundException("Crop not found.")
                );
    }
}