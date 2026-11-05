package com.farmkart.controller;
 import com.farmkart.dto.*;
  import com.farmkart.service.ProfitService;
   import jakarta.validation.Valid; 
   import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/profit")
public class ProfitController {

    private final ProfitService service;

    public ProfitController(ProfitService service) {
        this.service = service;
    }

    @PostMapping("/calculate")
    public ProfitResponse calculate(
            @Valid @RequestBody ProfitRequest request) {

        return service.calculate(request);
    }
}